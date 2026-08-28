"""
Discovery Coordinator — merges Places + Tavily results into one candidate pool.

Runs Places and Tavily discovery sequentially (LangGraph parallelism can be
added later; the coordinator handles the merge + light dedup of sources here
before the full dedup node runs).
"""

from __future__ import annotations

import logging

from pipeline.leadgen.agents.base import emit, finalize
from pipeline.leadgen.schemas import BusinessListing
from pipeline.leadgen.tools.places import discover_businesses
from pipeline.leadgen.tools.tavily import search_businesses as tavily_search

logger = logging.getLogger("pipeline.leadgen.agents.discovery_coordinator")


def _domain(url: str | None) -> str:
    if not url:
        return ""
    from urllib.parse import urlparse
    try:
        net = urlparse(url).netloc.lower()
        return net[4:] if net.startswith("www.") else net
    except Exception:
        return ""


def discovery(state) -> dict:
    """Single discovery node: Places primary + Tavily supplement."""
    icp = state.icp
    max_raw = max(icp.max_results * 5, 50)

    # Places — primary (has rating, review count, place_id, location signal).
    places_listings: list[BusinessListing] = discover_businesses(
        icp.discovery_query, icp.geography, max_results=max_raw
    )

    # Tavily — supplement (may surface businesses not in Places index).
    tavily_listings: list[BusinessListing] = tavily_search(
        icp.discovery_query, icp.geography, max_results=20
    )

    # Light merge dedup: skip Tavily results already in Places by domain.
    places_domains = {_domain(b.website) for b in places_listings if b.website}
    merged: list[BusinessListing] = list(places_listings)
    for b in tavily_listings:
        dom = _domain(b.website)
        if dom and dom not in places_domains:
            merged.append(b)
            places_domains.add(dom)

    events = [emit(
        "discovery", "discovery_coordinator",
        f"Discovered {len(places_listings)} from Places + {len(tavily_listings)} from Tavily "
        f"= {len(merged)} merged (pre-dedup) for '{icp.discovery_query}'",
        "success",
    )]

    return {
        **finalize("discovery"),
        "discovered": merged,
        "stats": {
            "discovered": len(merged),
            "places_raw": len(places_listings),
            "tavily_raw": len(tavily_listings),
        },
        "events": events,
    }
