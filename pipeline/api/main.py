"""
FastAPI service.

Endpoints
---------
* ``POST /api/redesign``        — submit a request, get a ``project_id``.
* ``GET  /api/pipeline/{id}``    — poll status / final artifact.
* ``WS   /api/pipeline/{id}/ws`` — live progress stream; supports resume when a
                                   human-approval interrupt fires.
* ``POST /api/pipeline/{id}/resume`` — resume a paused run with a decision.

The WebSocket is the primary interface: it runs the graph and pushes progress
events as they happen. When the run hits a human-approval checkpoint the server
emits an ``interrupt`` frame and waits for the client to send a ``resume`` frame.
"""

from __future__ import annotations

import json
import uuid
from typing import Any, Optional

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel

from pipeline.config import get_settings
from pipeline.runner import get_state_snapshot, resume_redesign, stream_redesign

app = FastAPI(title="Autonomous Website Redesign Platform", version="0.1.0")


class RedesignRequest(BaseModel):
    request: str
    project_id: Optional[str] = None


class ResumeRequest(BaseModel):
    decision: Any


@app.get("/health")
def health():
    return {"status": "ok", "provider": get_settings().llm_provider}


@app.post("/api/redesign")
async def submit(body: RedesignRequest):
    pid = body.project_id or uuid.uuid4().hex
    # Kick off the run in the background; client streams via WS or polls.
    return {"project_id": pid, "request": body.request, "status": "running"}


@app.get("/api/pipeline/{project_id}")
def status(project_id: str):
    snap = get_state_snapshot(project_id)
    if snap is None:
        raise HTTPException(status_code=404, detail="Unknown project_id")
    artifact = snap.get("final_artifact")
    return {
        "project_id": project_id,
        "task_status": snap.get("task_status", {}),
        "done": artifact is not None,
        "artifact": artifact.model_dump(mode="json") if hasattr(artifact, "model_dump") else artifact,
    }


@app.post("/api/pipeline/{project_id}/resume")
async def resume(project_id: str, body: ResumeRequest):
    result = await resume_redesign(project_id, body.decision)
    return result


@app.websocket("/api/pipeline/{project_id}/ws")
async def ws_stream(websocket: WebSocket, project_id: str, request: str = ""):
    await websocket.accept()
    try:
        async for msg in stream_redesign(request or f"Redesign {project_id}", project_id):
            await websocket.send_text(json.dumps(msg, default=str))
            if msg["type"] == "interrupt":
                # Wait for the client's resume decision.
                data = await websocket.receive_text()
                client_msg = json.loads(data)
                if client_msg.get("type") == "resume":
                    async for rmsg in resume_redesign(project_id, client_msg.get("decision")):
                        await websocket.send_text(json.dumps(rmsg, default=str))
    except WebSocketDisconnect:
        return
    except Exception as exc:
        await websocket.send_text(json.dumps({"type": "error", "message": str(exc)}))
