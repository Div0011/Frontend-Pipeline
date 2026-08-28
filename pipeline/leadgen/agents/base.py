"""
Agent helpers for the lead-gen layer.

Mirrors pipeline/agents/base.py but uses the lead-gen prompt registry. Each
specialist agent is a LangGraph node: (LeadGenState) -> dict.
"""

from __future__ import annotations

import functools
import logging
from typing import Any, Type

from langchain_core.runnables import Runnable
from pydantic import BaseModel

from pipeline.config import get_settings
from pipeline.leadgen.prompts import render_prompt
from pipeline.leadgen.schemas import LeadEvent
from pipeline.llm import get_structured_model

logger = logging.getLogger("pipeline.leadgen.agents")


def emit(step: str, agent: str, message: str, level: str = "info") -> LeadEvent:
    return LeadEvent(step=step, agent=agent, message=message, level=level)


def call_lead_agent(agent_id: str, state: Any, schema: Type[BaseModel], live_context: str = "") -> BaseModel:
    """Render the lead-gen prompt, attach live tool data, invoke the structured model."""
    icp = getattr(state, "icp", None)
    ctx = {
        "icp": icp.model_dump_json(indent=2, exclude_none=True) if icp else "",
        "geography": icp.geography if icp else "",
        "industry": icp.industry if icp else "",
    }
    prompt = render_prompt(agent_id, **ctx)
    if live_context:
        prompt = f"{prompt}\n\n## Live tool data\n{live_context}"
    runnable: Runnable = get_structured_model(schema, agent_id=agent_id)
    return runnable.invoke(prompt)


def finalize(agent_id: str, extra: dict | None = None) -> dict:
    """Build the bookkeeping slice (last_completed + event) for a node return."""
    update: dict[str, Any] = {"last_completed": agent_id, "events": []}
    if extra:
        update.update(extra)
    return update


def use_live_tools() -> bool:
    return get_settings().has_real_llm
