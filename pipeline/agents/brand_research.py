"""
Brand Research agent node.

Researches company overview, competitors, audience, positioning, and brand
pillars via web search. Synthesizes into Brand DNA.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize, use_live_tools
from pipeline.agents.classification import _cached_tool
from pipeline.schemas import BrandDna
from pipeline.state import RedesignState
from pipeline.tools import web_search


def brand_research(state: RedesignState) -> dict:
    live = ""
    if use_live_tools():
        queries = [f"{state.url or state.request} company overview",
                   f"{state.url or state.request} competitors", f"{state.url or state.request} reviews"]
        for q in queries:
            res = _cached_tool(state, "brand_research", q, web_search, q)
            for r in res.results:
                live += f"- {r.get('title')}: {r.get('snippet')}\n"
    out = call_agent_model("brand_research", state, BrandDna, live)
    return finalize("brand_research", state, "brand", out,
                    emit("research", "brand_research", "Brand DNA compiled"))
