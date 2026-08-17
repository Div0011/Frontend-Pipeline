"""
LangGraph orchestrator — the nervous system of the platform.

Topology
--------
START → planner → supervisor ⇄ (agents → post_agent → supervisor)
                        │
                        ├─(all required done)→ [approval] → synthesizer → END
                        └─(approval disabled)────────────→ synthesizer → END

Key mechanisms
--------------
* **Parallel fan-out**: the supervisor returns ``Command(goto=[Send(agent, state), …])``
  for every *ready* task (dependencies satisfied, not yet done/running). LangGraph
  executes the branches concurrently on its thread pool.
* **Dependency enforcement**: readiness is computed from ``task_status`` + each
  task's ``depends_on``. The analysis phase (analysis/seo/brand) therefore runs in
  parallel; creative/ux wait for them; ui/motion wait for creative; etc.
* **QA retry loop**: ``post_agent`` inspects the QA result. On failure (and retries
  remaining) it routes the weakest agent back to work, then re-runs QA — fully
  automatic, no human in the loop. After ``max_qa_retries`` it escalates (delivers
  with defects noted).
* **Per-agent retry**: ``wrap_agent`` retries the LLM/tool call on exception, then
  records a ``failed`` status so the supervisor can degrade gracefully instead of
  looping forever.
* **Human approval**: the ``approval`` node calls ``interrupt()``; the API resumes
  with ``Command(resume=decision)``.
* **Checkpointing / resume**: every step is persisted to the checkpointer, so a
  crashed or paused run resumes exactly where it left off.
"""

from __future__ import annotations

import logging
from typing import Any, Dict

from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, START, StateGraph
from langgraph.types import Command, Send, interrupt

from redesign.agents import (
    brand_research,
    creative_director,
    engineering,
    lead_discovery,
    motion,
    planner,
    qa,
    seo,
    ui,
    ux,
    website_analysis,
)
from redesign.agents.base import emit
from redesign.config import get_settings
from redesign.memory import get_checkpointer, get_store
from redesign.reporting import render_design_brief, reports_for_state
from redesign.schemas import FinalArtifact, TaskStatus
from redesign.state import RedesignState
from redesign.storage import ArtifactStore

logger = logging.getLogger("redesign.orchestrator")

AGENT_NODES: Dict[str, Any] = {
    "website_analysis": website_analysis,
    "seo": seo,
    "brand_research": brand_research,
    "lead_discovery": lead_discovery,
    "creative_director": creative_director,
    "ux": ux,
    "ui": ui,
    "motion": motion,
    "engineering": engineering,
    "qa": qa,
}


# ── Per-agent retry wrapper ──────────────────────────────────────────
def _resolve_agent_id(state: RedesignState, name: str) -> str | None:
    """Map a QA ``weakest_agent`` value to a real task id.

    Real LLMs occasionally return a friendly label (e.g. "Developer") instead
    of the exact node id ("engineering"). We match exactly first, then by
    case-insensitive substring, falling back to None so the caller can escalate
    rather than navigate to a non-existent node (which silently ends the graph).
    """
    if not name:
        return None
    ids = [t.id for t in (state.plan.tasks if state.plan else [])]
    if name in ids:
        return name
    low = name.lower()
    for tid in ids:
        if tid.lower() == low or tid.lower() in low or low in tid.lower():
            return tid
    return None


def wrap_agent(agent_id: str, fn):
    def node(state: RedesignState) -> dict:
        import time

        settings = get_settings()
        attempts = settings.max_agent_retries + 1
        last_exc: Exception | None = None
        for attempt in range(attempts):
            try:
                return fn(state)
            except Exception as exc:  # transient LLM/tool errors
                last_exc = exc
                logger.error("agent %s attempt %d failed: %s", agent_id, attempt, exc)
                # Rate-limit friendly backoff: wait longer on 429s so free-tier
                # providers (e.g. Groq 12k-TPM) can refill between calls.
                msg = str(exc).lower()
                if "429" in msg or "rate limit" in msg or "resource_exhausted" in msg:
                    wait = min(2 ** (attempt + 2), 30) + attempt
                    logger.warning("agent %s rate-limited; backing off %.1fs", agent_id, wait)
                    time.sleep(wait)
                elif attempt < attempts - 1:
                    time.sleep(min(2 ** attempt, 8))
        # Permanent failure → mark blocked, let supervisor degrade gracefully.
        return {
            "task_status": {agent_id: TaskStatus.failed.value},
            "events": [
                emit("error", agent_id, f"{agent_id} failed after {attempts} attempts: {last_exc}", "error")
            ],
        }

    node.__name__ = f"wrapped_{agent_id}"
    return node


# ── Supervisor (router / scheduler) ──────────────────────────────────
def supervisor(state: RedesignState) -> Command:
    plan = state.plan
    if plan is None:
        return Command(goto="planner")

    status = state.task_status
    required = [t for t in plan.tasks if t.required]

    done_required = all(status.get(t.id) == TaskStatus.done.value for t in required)
    blocked_done = all(
        status.get(t.id) in (TaskStatus.done.value, TaskStatus.failed.value) for t in required
    )

    if done_required or blocked_done:
        if get_settings().human_approval_enabled and not state.human_review:
            return Command(goto="approval")
        return Command(goto="synthesizer")

    ready = []
    for t in plan.tasks:
        st = status.get(t.id)
        if st in (TaskStatus.done.value, TaskStatus.running.value, TaskStatus.failed.value):
            continue
        if all(status.get(d) == TaskStatus.done.value for d in t.depends_on):
            ready.append(t)

    if not ready:
        # No progress possible but not all required done → deliver what we have.
        logger.warning("supervisor deadlock guard triggered; synthesizing")
        return Command(goto="synthesizer")

    # When parallelism is disabled (e.g. tight free-tier rate limits), dispatch
    # a single ready task at a time. post_agent always routes back to the
    # supervisor after a non-QA agent, so the graph self-paces through tasks.
    if not get_settings().parallel_execution:
        ready = ready[:1]

    updates = {"task_status": {t.id: TaskStatus.running.value for t in ready}}
    sends = [Send(t.agent, state) for t in ready]
    logger.info("supervisor dispatching: %s", [t.agent for t in ready])
    return Command(update=updates, goto=sends)


# ── post_agent router (handles QA retry loop) ────────────────────────
def post_agent(state: RedesignState) -> Command:
    last = state.last_completed
    settings = get_settings()

    # QA just finished.
    if last == "qa" and state.qa is not None and not state.qa.passed:
        if state.qa_failures < settings.max_qa_retries and state.qa.weakest_agent:
            target = _resolve_agent_id(state, state.qa.weakest_agent)
            if target is None:
                # QA named an agent we don't have → can't rework, escalate.
                logger.warning("QA named unknown agent %r; escalating", state.qa.weakest_agent)
                return Command(
                    goto="supervisor",
                    update={"events": [emit("escalate", "qa", "QA named unknown agent; delivering with defects")]},
                )
            logger.info("QA failed → reworking %s (attempt %d)", target, state.qa_failures + 1)
            return Command(
                update={
                    "qa_failures": state.qa_failures + 1,
                    "pending_rework": target,
                    "task_status": {target: TaskStatus.pending.value, "qa": TaskStatus.pending.value},
                    "events": [emit("rework", "qa", f"Routing back to {target} for fixes")],
                },
                goto=target,
            )
        # Escalate: deliver with defects noted.
        return Command(
            goto="supervisor",
            update={"events": [emit("escalate", "qa", "QA retries exhausted; delivering with defects")]},
        )

    # The reworked agent just finished → re-run QA on the improved output.
    if state.pending_rework and last == state.pending_rework:
        return Command(update={"pending_rework": None}, goto="qa")

    return Command(goto="supervisor")


# ── Human approval checkpoint ────────────────────────────────────────
def approval(state: RedesignState) -> dict:
    payload = {
        "type": "approval_required",
        "project_id": state.project_id,
        "url": state.url,
        "art_direction": state.creative.art_direction if state.creative else None,
        "qa_passed": state.qa.passed if state.qa else None,
        "prompt": "Approve the current design direction and proceed to code generation?",
    }
    decision = interrupt(payload)
    return {
        "human_review": decision if isinstance(decision, dict) else {"decision": decision},
        "events": [emit("approval", "orchestrator", f"Human decision: {decision}")],
    }


# ── Synthesizer (final assembly) ─────────────────────────────────────
def synthesizer(state: RedesignState) -> dict:
    store = ArtifactStore(state.project_id)

    reports = reports_for_state(state)
    for name, md in reports.items():
        store.write_report(name, md)

    manifest: list[str] = []
    if state.engineering and state.engineering.files:
        manifest = store.save_project_files(state.engineering.files)
    store.write_report("design_brief", render_design_brief(state))
    zip_path = store.zip()

    qa_score = state.qa.overall_score if state.qa else 0.0
    artifact = FinalArtifact(
        project_id=state.project_id,
        url=state.url,
        summary=state.plan.goal if state.plan else state.request,
        design_brief=render_design_brief(state),
        artifacts_path=store.path,
        file_manifest=manifest,
        qa_score=qa_score,
        reports={k: f"reports/{k}.md" for k in reports},
    )
    return {
        "final_artifact": artifact,
        "events": [emit("done", "orchestrator", f"Delivered to {store.path} (zip: {zip_path})", "success")],
    }


# ── Graph construction ───────────────────────────────────────────────
def build_graph(checkpointer=None, store=None):
    g = StateGraph(RedesignState)

    g.add_node("planner", planner)
    g.add_node("supervisor", supervisor)
    g.add_node("post_agent", post_agent)
    g.add_node("approval", approval)
    g.add_node("synthesizer", synthesizer)

    for agent_id, fn in AGENT_NODES.items():
        g.add_node(agent_id, wrap_agent(agent_id, fn))
        g.add_edge(agent_id, "post_agent")

    g.add_edge(START, "planner")
    g.add_edge("planner", "supervisor")
    g.add_edge("approval", "synthesizer")
    g.add_edge("synthesizer", END)

    cp = checkpointer or get_checkpointer()
    st = store or get_store()
    return g.compile(checkpointer=cp, store=st)


def get_graph():
    """Cached compiled graph (singleton per process)."""
    if get_graph._instance is None:
        get_graph._instance = build_graph()
    return get_graph._instance


get_graph._instance = None
