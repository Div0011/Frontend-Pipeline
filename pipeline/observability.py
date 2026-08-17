"""
Observability — OpenTelemetry tracing for the pipeline.

Wraps each agent node in a span so runs can be debugged post-hoc:
which agent ran, how long it took, and whether it retried.
"""

from __future__ import annotations

import logging
import os
from typing import Any

logger = logging.getLogger("pipeline.observability")

_tracer = None


def get_tracer():
    global _tracer
    if _tracer is not None:
        return _tracer

    try:
        from opentelemetry import trace
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import BatchSpanProcessor
        from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

        endpoint = os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT")
        if endpoint:
            provider = TracerProvider()
            provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter(endpoint=endpoint)))
            trace.set_tracer_provider(provider)
            logger.info("OpenTelemetry tracing enabled (endpoint=%s)", endpoint)
        else:
            from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor
            provider = TracerProvider()
            provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
            trace.set_tracer_provider(provider)
            logger.info("OpenTelemetry tracing enabled (console exporter)")

        _tracer = trace.get_tracer("pipeline")
    except Exception as exc:
        logger.warning("OpenTelemetry unavailable (%s); tracing disabled", exc)
        _tracer = None

    return _tracer


def trace_agent(agent_id: str, fn):
    """Wrap an agent node fn with an OTel span."""
    def wrapper(state: Any) -> dict:
        tracer = get_tracer()
        if tracer is None:
            return fn(state)
        with tracer.start_as_current_span(agent_id) as span:
            span.set_attribute("agent_id", agent_id)
            span.set_attribute("project_id", getattr(state, "project_id", None))
            try:
                result = fn(state)
                span.set_attribute("status", "ok")
                return result
            except Exception as exc:
                span.set_attribute("status", "error")
                span.set_attribute("error", str(exc))
                raise
    wrapper.__name__ = f"traced_{agent_id}"
    return wrapper
