"""
UI agent node.

Produces the design system: spacing scale, typography scale, color palette,
component specs, and responsive layouts.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize
from pipeline.schemas import UiDesign
from pipeline.state import RedesignState


def ui(state: RedesignState) -> dict:
    out = call_agent_model("ui", state, UiDesign)
    return finalize("ui", state, "ui", out,
                    emit("ui", "ui", "Design system complete"))
