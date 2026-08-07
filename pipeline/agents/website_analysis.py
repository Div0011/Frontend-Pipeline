"""
Website Analysis agent node.

Crawls the target URL, captures screenshots, runs vision analysis, and
produces a structured UI/UX audit with detected design tokens.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize, use_live_tools
from pipeline.agents.classification import _cached_tool
from pipeline.schemas import WebsiteAnalysisOutput
from pipeline.state import RedesignState
from pipeline.tools import (
    analyze_image,
    capture_screenshot,
    crawl_site,
    extract_design_tokens_from_image,
)


def website_analysis(state: RedesignState) -> dict:
    live = ""
    raw_tokens: dict[str, list[str]] = {"colors": [], "fonts": [], "spacing": []}
    vision_tokens: dict[str, list[str]] = {"colors": [], "fonts": [], "spacing": [], "layout_notes": []}
    if use_live_tools() and state.url:
        site = _cached_tool(state, "website_analysis", "crawl", crawl_site, state.url, max_pages=8)
        crawl = site.pages[0] if site.pages else None
        shots = _cached_tool(state, "website_analysis", "screenshot", capture_screenshot, state.url, state.project_id)
        live = f"Whole-site crawl: {site.pages_crawled} pages from {state.url}\n"
        if crawl:
            live += f"Home title: {crawl.get('title', '')!r}\n"
            raw_tokens = {
                "colors": crawl.get("detected_colors", []),
                "fonts": crawl.get("detected_fonts", []),
                "spacing": crawl.get("detected_spacing", []),
            }
        live += f"Site summary (all pages):\n{site.summary()}\n"
        live += f"Screenshots: {shots}\n"
        if shots.get("desktop"):
            live += "Vision: " + analyze_image(shots["desktop"])
            vision_tokens = extract_design_tokens_from_image(shots["desktop"])
    out = call_agent_model("website_analysis", state, WebsiteAnalysisOutput, live)
    if not out.raw_design_tokens and raw_tokens:
        out.raw_design_tokens = raw_tokens
    if not out.vision_design_tokens and vision_tokens:
        out.vision_design_tokens = vision_tokens
    return finalize("website_analysis", state, "analysis", out,
                    emit("analyze", "website_analysis", "UI/UX audit complete"))
