"""
Agent helpers.

Each specialist agent is a LangGraph *node*: a pure function
``(RedesignState) -> dict`` that (1) gathers context, (2) optionally runs tools,
(3) calls its structured LLM, and (4) returns the slice of state it owns.

The heavy lifting is shared here so individual agents stay declarative.
"""

from __future__ import annotations

import functools
import logging
from typing import Any, Callable, Optional, Type

from langchain_core.runnables import Runnable
from pydantic import BaseModel

from pipeline.config import get_settings
from pipeline.context import build_context, render_prompt
from pipeline.llm import get_structured_model
from pipeline.schemas import Event, TaskStatus

logger = logging.getLogger("pipeline.agents")


def use_live_tools() -> bool:
    return get_settings().has_real_llm


def emit(step: str, agent: str, message: str, level: str = "info") -> Event:
    return Event(step=step, agent=agent, message=message, level=level)


def build_prompt(agent_id: str, state: Any) -> str:
    prompt = render_prompt(agent_id, **build_context(state))
    return prompt


@functools.lru_cache(maxsize=32)
def _cached_get_structured_model(schema_name: str, agent_id: str, provider: str, model: str) -> Runnable:
    """Cache structured model instances to avoid repeated ``with_structured_output`` calls."""
    from pipeline.schemas import _SCHEMA_REGISTRY  # noqa: F401 – ensure registry is populated
    schema = _SCHEMA_REGISTRY.get(schema_name)
    if schema is None:
        raise ValueError(f"Unknown schema for caching: {schema_name}")
    return get_structured_model(schema, agent_id=agent_id)


def call_agent_model(
    agent_id: str, state: Any, schema: Type[BaseModel], live_context: str = ""
) -> BaseModel:
    """Render the prompt, attach any live tool data, and invoke the model."""
    ctx = build_context(state)
    prompt = render_prompt(agent_id, **ctx)
    if live_context:
        prompt = f"{prompt}\n\n## Live tool data\n{live_context}"
    if ctx.get("rework_context"):
        prompt = f"{prompt}\n{ctx['rework_context']}"
    settings = get_settings()
    provider, model = (settings.llm_provider, settings.llm_model)
    if settings.agent_models.get(agent_id):
        from pipeline.llm import _parse_model_override
        provider, model = _parse_model_override(settings.agent_models[agent_id])
    runnable = _cached_get_structured_model(schema.__name__, agent_id, provider, model)
    result = runnable.invoke(prompt)
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
