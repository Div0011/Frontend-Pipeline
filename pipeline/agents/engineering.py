"""
Engineering agent node.

Generates production-ready Next.js + React + TypeScript code. Implements
components, animations, and scroll choreography. Run automated build
verification.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize
from pipeline.schemas import FrontendCode, TaskStatus
from pipeline.state import RedesignState


def engineering(state: RedesignState) -> dict:
    # Runtime gate: enforce Phase 1 plan presence before code generation.
    # In simulation mode, the structured output simulation does not populate
    # nested Phase1Plan on CreativeDirection by default, so allow bypass.
    settings = None
    try:
        from pipeline.config import get_settings
        settings = get_settings()
    except Exception:
        pass
    skip_plan = not (settings and settings.has_real_llm)

    plan_source = state.phase1_plan or (state.creative.phase1_plan if state.creative else None)
    if not plan_source and not skip_plan:
        return {
            "task_status": {"engineering": TaskStatus.failed.value},
            "events": [
                emit(
                    "error",
                    "engineering",
                    "BLOCKED: No Phase1Plan present. Creative Director must produce the "
                    "structured implementation plan before Engineering can proceed.",
                    "error",
                )
            ],
        }
    out = call_agent_model("engineering", state, FrontendCode)
    return finalize("engineering", state, "engineering", out,
                    emit("build", "engineering", "Production code generated"))
