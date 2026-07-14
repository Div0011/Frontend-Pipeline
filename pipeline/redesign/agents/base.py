"""
Agent helpers.

Each specialist agent is a LangGraph *node*: a pure function
``(RedesignState) -> dict`` that (1) gathers context, (2) optionally runs tools,
(3) calls its structured LLM, and (4) returns the slice of state it owns.

The heavy lifting is shared here so individual agents stay declarative.
"""

from __future__ import annotations

import logging
from typing import Any, Callable, Optional, Type

from langchain_core.runnables import Runnable
from pydantic import BaseModel

from redesign.config import get_settings
from redesign.context import build_context, render_prompt
from redesign.llm import get_structured_model
from redesign.schemas import Event, TaskStatus

logger = logging.getLogger("redesign.agents")


def use_live_tools() -> bool:
    return get_settings().has_real_llm


def emit(step: str, agent: str, message: str, level: str = "info") -> Event:
    return Event(step=step, agent=agent, message=message, level=level)


def build_prompt(agent_id: str, state: Any) -> str:
    ctx = build_context(state)
    prompt = render_prompt(agent_id, **ctx)
    return prompt


def call_agent_model(
    agent_id: str, state: Any, schema: Type[BaseModel], live_context: str = ""
) -> BaseModel:
    """Render the prompt, attach any live tool data, and invoke the model."""
    ctx = build_context(state)
    prompt = render_prompt(agent_id, **ctx)
    if live_context:
        prompt = f"{prompt}\n\n## Live tool data\n{live_context}"
    model: Runnable = get_structured_model(
        schema, {"url": state.url, "brand": (ctx["brand"][:300] or None)}
    )
    result = model.invoke(prompt)
    logger.info("agent %s produced %s", agent_id, type(result).__name__)
    return result


def finalize(
    agent_id: str,
    state: Any,
    output_field: str,
    output: BaseModel,
    event: Event,
    extra: Optional[dict] = None,
) -> dict:
    """Build the state update that records the agent's output + bookkeeping."""
    update: dict[str, Any] = {
        output_field: output,
        "task_status": {agent_id: TaskStatus.done.value},
        "last_completed": agent_id,
        "events": [event],
    }
    if extra:
        update.update(extra)
    return update
