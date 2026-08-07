"""
SEO agent node.

Analyzes SEO structure, meta tags, headings, Core Web Vitals, and
accessibility. Produces a prioritized recommendations list.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize, use_live_tools
from pipeline.agents.classification import _cached_tool
from pipeline.schemas import SeoReport
from pipeline.state import RedesignState
from pipeline.tools import crawl_website, run_lighthouse


def seo(state: RedesignState) -> dict:
    live = ""
    if use_live_tools() and state.url:
        crawl = _cached_tool(state, "seo", "crawl", crawl_website, state.url)
        lh = _cached_tool(state, "seo", "lighthouse", run_lighthouse, state.url)
        live = f"Title: {crawl.title!r}\nMeta: {crawl.meta}\n"
        live += f"h1 count: {len(crawl.headings.get('h1', []))}\n"
        live += f"Lighthouse: {lh}\n"
    out = call_agent_model("seo", state, SeoReport, live)
    return finalize("seo", state, "seo", out,
                    emit("seo", "seo", "SEO & performance report complete"))
