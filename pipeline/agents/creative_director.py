"""
Creative Director agent node.

Synthesizes all upstream analysis into a cinematic art direction. Selects
the genre mechanic, defines moodboards/typography/color, and produces the
Phase 1 structured implementation plan.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize
from pipeline.schemas import CreativeDirection
from pipeline.state import RedesignState


def creative_director(state: RedesignState) -> dict:
    out = call_agent_model("creative_director", state, CreativeDirection)
    return finalize("creative_director", state, "creative", out,
                    emit("direct", "creative_director", "Art direction defined"))
