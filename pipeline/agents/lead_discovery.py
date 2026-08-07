"""
Lead Discovery agent node.

Discovers and ranks qualified prospects using brand research and website
analysis. Delivers a prioritized lead list with personalized pitches.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize, use_live_tools
from pipeline.agents.classification import _cached_tool
from pipeline.schemas import LeadReport
from pipeline.state import RedesignState
from pipeline.tools import web_search


def lead_discovery(state: RedesignState) -> dict:
    live = ""
    if use_live_tools():
        queries = [
            f"{state.brand.industry_trends[0] if state.brand and state.brand.industry_trends else 'business'} companies {state.url or ''}",
            f"{state.brand.competitors[0] if state.brand and state.brand.competitors else 'startups'} LinkedIn",
            f"{state.brand.competitors[0] if state.brand and state.brand.competitors else 'agencies'} Clutch.co",
            f"{state.brand.competitors[0] if state.brand and state.brand.competitors else 'startups'} Crunchbase",
        ]
        for q in queries:
            res = _cached_tool(state, "lead_discovery", q, web_search, q)
            for r in res.results:
                live += f"- {r.get('title')}: {r.get('snippet')}\n"
    out = call_agent_model("lead_discovery", state, LeadReport, live)
    return finalize("lead_discovery", state, "lead", out,
                    emit("lead", "lead_discovery", "Lead discovery complete"))
