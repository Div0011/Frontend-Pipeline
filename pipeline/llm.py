"""
LLM abstraction.

Two execution modes:
  * `simulation`  — deterministic, templated outputs. Lets the full
    orchestration run end-to-end with zero external dependencies (no API keys,
    no network). Used for demos, tests and CI.
  * `openai` / `anthropic` — production-grade generation via LangChain's
    `with_structured_output`, which constrains the model to the agent's Pydantic
    schema.

Every agent calls ``get_structured_model(schema)`` and then `.invoke(prompt)`.
Swapping providers never touches agent code.
"""

from __future__ import annotations

import logging
import re
from typing import Any, Optional, Type, TypeVar, Union

from langchain_core.language_models import BaseChatModel
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.runnables import Runnable
from pydantic import BaseModel

from pipeline.config import get_settings

logger = logging.getLogger("pipeline.llm")

T = TypeVar("T", bound=BaseModel)


class SimRunnable(Runnable):
    """Returns a populated instance of ``schema`` using environment-aware
    templates. Deterministic so tests are stable."""

    def __init__(self, schema: Type[BaseModel], context: dict):
        self.schema = schema
        self.context = context

    def invoke(self, _input: Any, config: Any = None) -> BaseModel:
        return _simulate(self.schema, self.context)


def _extract_json(text: str) -> str:
    """Pull the first balanced ``{...}`` JSON object out of a model reply.

    Local models frequently wrap JSON in ```json fences or trail it with prose;
    this recovers the object so Pydantic can validate it.
    """
    if not isinstance(text, str):
        try:
            text = "".join(getattr(c, "text", str(c)) for c in text) if isinstance(text, list) else str(text)
        except Exception:
            text = str(text)
    text = text.strip()
    # Strip ```json ... ``` (or bare ```) fences.
    if text.startswith("```"):
        text = re.sub(r"^```[a-zA-Z]*\s*", "", text)
        text = re.sub(r"\s*```\s*$", "", text).strip()
    start, end = text.find("{"), text.rfind("}")
    if start != -1 and end > start:
        text = text[start : end + 1]
    return text


class RobustStructuredRunnable(Runnable):
    """Structured-output wrapper for models with flaky JSON (local Ollama /
    Hugging Face). Tries the native ``with_structured_output`` first; on parse
    failure it re-invokes raw and repairs the JSON before Pydantic validation.
    """

    def __init__(self, model: BaseChatModel, schema: Type[BaseModel], context: dict):
        self.model = model
        self.schema = schema
        self.context = context

    def invoke(self, prompt: Any, config: Any = None) -> BaseModel:
        try:
            return self.model.with_structured_output(self.schema).invoke(prompt)
        except Exception as exc:  # native path failed (truncated/garbled JSON)
            logger.warning("structured_output failed (%s); using repair fallback", exc)
        messages = [
            SystemMessage(
                content="Respond with ONLY a single valid JSON object matching the "
                "requested schema. No explanations, no markdown code fences."
            ),
            HumanMessage(content=prompt if isinstance(prompt, str) else str(prompt)),
        ]
        resp = self.model.invoke(messages, config)
        content = getattr(resp, "content", resp)
        try:
            return self.schema.model_validate_json(_extract_json(content))
        except Exception as exc2:
            raise ValueError(f"Could not parse model JSON output: {exc2}") from exc2


def _simulate(schema: Type[BaseModel], ctx: dict) -> BaseModel:
    """Build a plausible instance of ``schema`` from field defaults + context.

    Required fields without a default are filled with context-aware strings so
    the simulation never raises validation errors.
    """
    url = ctx.get("url", "https://example.com")
    brand = ctx.get("brand") or "the brand"
    data: dict[str, Any] = {}
    for name, field in schema.model_fields.items():
        ann = field.annotation
        # Required field (no default at all): synthesise a value.
        if field.is_required():
            if ann is str or (isinstance(ann, type) and issubclass(ann, str)):
                data[name] = field.description or f"{name} for {brand} ({url})"
            elif ann is int or (isinstance(ann, type) and issubclass(ann, int)):
                data[name] = 1
            elif ann is float or (isinstance(ann, type) and issubclass(ann, float)):
                data[name] = 0.8
            elif ann is bool or (isinstance(ann, type) and issubclass(ann, bool)):
                data[name] = True
            continue
        # Optional fields with an explicit empty-string default: enrich so the
        # generated reports are readable in simulation mode. Fields defaulting to
        # None (e.g. Optional[str] = None) are intentionally left as None.
        if field.default == "" and (ann is str or str in getattr(ann, "__args__", ())):
            data[name] = field.description or f"{name} for {brand} ({url})"
    try:
        return schema(**data)
    except Exception as exc:  # pragma: no cover - defensive
        logger.warning("simulate fallback for %s: %s", schema.__name__, exc)
        return schema()


def _parse_model_override(model_str: str) -> tuple[str, str]:
    """Parse 'provider/model' into (provider, model)."""
    if "/" in model_str:
        provider, model = model_str.split("/", 1)
        return provider.strip(), model.strip()
    return "", model_str.strip()


def get_model_for_agent(agent_id: str) -> tuple[str, str]:
    """Resolve the provider + model for a specific agent.

    Priority:
    1. Per-agent override from config (agent_models[agent_id])
    2. Global llm_provider + llm_model
    """
    settings = get_settings()
    override = settings.agent_models.get(agent_id)
    if override:
        return _parse_model_override(override)
    return settings.llm_provider, settings.llm_model


def _real_model(provider: str | None = None, model: str | None = None) -> BaseChatModel:
    settings = get_settings()
    prov = provider or settings.llm_provider
    mod = model or settings.llm_model

    if prov == "anthropic":
        from langchain_anthropic import ChatAnthropic

        return ChatAnthropic(
            model=mod,
            temperature=settings.llm_temperature,
            api_key=settings.anthropic_api_key,
            max_tokens=8192,
        )
    if prov == "google":
        from langchain_google_genai import ChatGoogleGenerativeAI

        m = mod
        if not m.startswith("gemini"):
            m = "gemini-2.0-flash"
        return ChatGoogleGenerativeAI(
            model=m,
            temperature=settings.llm_temperature,
            google_api_key=settings.google_api_key,
            max_output_tokens=8192,
        )
    if prov == "groq":
        from langchain_groq import ChatGroq

        return ChatGroq(
            model=mod,
            temperature=settings.llm_temperature,
            api_key=settings.groq_api_key,
            max_tokens=8192,
        )
    if prov == "ollama":
        from langchain_ollama import ChatOllama

        kwargs: dict = {
            "model": mod,
            "temperature": settings.llm_temperature,
            "num_ctx": 16384,
        }
        if settings.ollama_base_url:
            kwargs["base_url"] = settings.ollama_base_url
        return ChatOllama(**kwargs)
    if prov == "huggingface":
        from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint

        m = mod or "meta-llama/Llama-3.1-8B-Instruct"
        endpoint = HuggingFaceEndpoint(
            model=m,
            huggingfacehub_api_token=settings.hf_api_key,
            task="text-generation",
        )
        return ChatHuggingFace(llm=endpoint, model=m)
    from langchain_openai import ChatOpenAI

    return ChatOpenAI(
        model=mod,
        temperature=settings.llm_temperature,
        api_key=settings.llm_api_key,
        base_url=settings.llm_base_url,
        max_tokens=8192,
    )


def get_structured_model(schema: Type[T], context: dict | None = None, agent_id: str = "") -> Runnable:
    """Return a runnable that yields an instance of ``schema``.

    In simulation mode this is a :class:`SimRunnable`. In real mode it is the
    chat model bound to the schema via ``with_structured_output``.
    """
    ctx = context or {}
    settings = get_settings()
    if not settings.has_real_llm:
        return SimRunnable(schema, ctx)

    provider, model = get_model_for_agent(agent_id) if agent_id else (settings.llm_provider, settings.llm_model)
    m = _real_model(provider, model)

    # Local / flaky-JSON providers get the repair-capable wrapper; the
    # hosted APIs (openai/anthropic/google/groq) use native structured output.
    if provider in {"ollama", "huggingface"}:
        return RobustStructuredRunnable(m, schema, ctx)
    return m.with_structured_output(schema)


def get_vision_model() -> BaseChatModel | None:
    """Optional vision model used for screenshot analysis. Returns None when
    vision is disabled (simulation)."""
    settings = get_settings()
    if settings.vision_provider in (None, "none"):
        return None
    if settings.vision_provider == "anthropic":
        from langchain_anthropic import ChatAnthropic

        return ChatAnthropic(model=settings.vision_model, api_key=settings.anthropic_api_key)
    if settings.vision_provider == "google":
        from langchain_google_genai import ChatGoogleGenerativeAI

        vmodel = settings.vision_model
        if not vmodel.startswith("gemini"):
            vmodel = "gemini-2.0-flash"
        return ChatGoogleGenerativeAI(
            model=vmodel, google_api_key=settings.google_api_key
        )
    from langchain_openai import ChatOpenAI

    return ChatOpenAI(model=settings.vision_model, api_key=settings.llm_api_key)
