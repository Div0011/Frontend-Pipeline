"""
UX agent node.

Designs the information architecture, sitemap, homepage flow, wireframes,
and conversion strategy aligned with the creative direction.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize
from pipeline.schemas import UxPlan
from pipeline.state import RedesignState


def ux(state: RedesignState) -> dict:
    out = call_agent_model("ux", state, UxPlan)
    return finalize("ux", state, "ux", out,
                    emit("ux", "ux", "Sitemap, IA & wireframes complete"))
