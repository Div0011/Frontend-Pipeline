"""
Execution helpers: run / stream / resume a redesign job.

These wrap the compiled LangGraph and expose a clean async interface used by
both the CLI and the FastAPI layer. Streaming is implemented with
``graph.astream(stream_mode="updates")`` plus the ``events`` channel the agents
populate, giving the client a live, human-readable progress feed.
"""

from __future__ import annotations

import uuid
from typing import Any, AsyncIterator, Optional

from langchain_core.runnables import RunnableConfig
from langgraph.types import Command

from redesign.orchestrator import get_graph
from redesign.schemas import FinalArtifact
from redesign.state import RedesignState


def _config(project_id: str) -> RunnableConfig:
    return {"configurable": {"thread_id": project_id}, "recursion_limit": 200}


async def stream_redesign(request: str, project_id: Optional[str] = None) -> AsyncIterator[dict]:
    """Yield progress events as the graph runs, ending with ``{"type":"result"}``."""
    pid = project_id or uuid.uuid4().hex
    graph = get_graph()
    initial: dict = {
        "request": request,
        "project_id": pid,
        "task_status": {},
        "events": [],
    }
    try:
        async for chunk in graph.astream(initial, _config(pid), stream_mode="updates"):
            for node, update in chunk.items():
                if node == "__interrupt__":
                    yield {"type": "interrupt", "payload": update}
                    return
                events = (update or {}).get("events") or []
                for ev in events:
                    yield {
                        "type": "event",
                        "agent": ev.agent,
                        "step": ev.step,
                        "message": ev.message,
                        "level": ev.level,
                    }
        # Final state snapshot.
        state = await graph.aget_state(_config(pid))
        artifact = (state.values or {}).get("final_artifact")
        yield {"type": "result", "project_id": pid, "artifact": _as_dict(artifact)}
    except Exception as exc:
        yield {"type": "error", "message": str(exc)}


async def run_redesign(request: str, project_id: Optional[str] = None) -> FinalArtifact | dict:
    """Run to completion and return the final artifact (no streaming)."""
    final = None
    async for msg in stream_redesign(request, project_id):
        if msg["type"] == "result":
            final = msg.get("artifact")
    return final


async def resume_redesign(thread_id: str, decision: Any) -> dict:
    """Resume a run paused at a human-approval interrupt."""
    graph = get_graph()
    async for chunk in graph.astream(Command(resume=decision), _config(thread_id), stream_mode="updates"):
        for node, update in chunk.items():
            if node == "__interrupt__":
                return {"type": "interrupt", "payload": update}
            for ev in (update or {}).get("events") or []:
                pass
    state = await graph.aget_state(_config(thread_id))
    return {"type": "result", "artifact": _as_dict((state.values or {}).get("final_artifact"))}


def _as_dict(obj: Any) -> Optional[dict]:
    if obj is None:
        return None
    if hasattr(obj, "model_dump"):
        return obj.model_dump(mode="json")
    return obj


def get_state_snapshot(thread_id: str) -> RedesignState | None:
    import asyncio

    graph = get_graph()
    try:
        snap = asyncio.get_event_loop().run_until_complete(graph.aget_state(_config(thread_id)))
        return snap.values
    except RuntimeError:
        snap = asyncio.run(graph.aget_state(_config(thread_id)))
        return snap.values
