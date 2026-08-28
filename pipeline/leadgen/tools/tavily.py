"""
Tavily web research tool for the lead-gen layer.

Supplements Google Places discovery with Tavily Search results.
Tavily's APIs are explicitly designed for AI/agent workflows and
return structured data including URLs, titles, and optional content.

Falls back to an empty list (no crash) when TAVILY_API_KEY is absent,
so the pipeline continues with Places-only data in simulation mode.

API docs: https://docs.tavily.com/docs/tavily-api/rest_api
"""

from __future__ import annotations

import logging
from typing import List, Optional
from urllib.parse import urlparse

import httpx

from pipeline.leadgen.config import get_leadgen_settings
from pipeline.leadgen.schemas import BusinessListing

logger = logging.getLogger("pipeline.leadgen.tools.tavily")

_SEARCH_URL = "https://api.tavily.com/search"
_EXTRACT_URL = "https://api.tavily.com/extract"

# Social link domains used to detect social presence at discovery time.
_SOCIAL_DOMAINS = frozenset([
    "instagram.com", "facebook.com", "tiktok.com", "twitter.com",
    "x.com", "yelp.com", "tripadvisor.com", "youtube.com",
])


def _has_key() -> bool:
    s = get_leadgen_settings()
    return bool(getattr(s, "tavily_api_key", None))


def _api_key() -> str:
    return get_leadgen_settings().tavily_api_key or ""


def _extract_website(result: dict) -> Optional[str]:
    """Try to extract a direct website URL from a Tavily result.

    Tavily returns the URL of the page it found (which could be a Yelp
    listing, Google Maps link, etc.). We try to get the actual business
    website from the result content when possible.
    """
    url = result.get("url", "")
    # Skip aggregator URLs — we want the business's own site.
    skip_domains = {"yelp.com", "tripadvisor.com", "google.com", "facebook.com",
                    "doordash.com", "ubereats.com", "grubhub.com", "opentable.com",
                    "zomato.com", "foursquare.com", "yellowpages.com"}
    try:
        domain = urlparse(url).netloc.lower().lstrip("www.")
        if any(sd in domain for sd in skip_domains):
            return None
    except Exception:
        pass
    return url if url.startswith("http") else None


def _social_links_from_content(content: str) -> List[str]:
    """Extract social media profile links mentioned in result content."""
    links: List[str] = []
    for line in (content or "").split():
        for sd in _SOCIAL_DOMAINS:
            if sd in line and line.startswith("http"):
                links.append(line.strip(".,)\"'"))
    return list(set(links))[:5]


def search_businesses(query: str, geography: str, max_results: int = 10) -> List[BusinessListing]:
    """Search Tavily for candidate businesses matching the ICP query.

    Returns BusinessListing objects (source="tavily") that are merged
    with Places results in the discovery coordinator node.
    """
    if not _has_key():
        logger.info("TAVILY_API_KEY absent → skipping Tavily web research")
        return []

    full_query = f"{query} in {geography} restaurant website"
    try:
        resp = httpx.post(
            _SEARCH_URL,
            json={
                "api_key": _api_key(),
                "query": full_query,
                "search_depth": "basic",
                "include_answer": False,
                "max_results": max_results,
                "include_domains": [],
                "exclude_domains": ["google.com", "yelp.com", "doordash.com",
                                    "ubereats.com", "grubhub.com", "tripadvisor.com"],
            },
            timeout=30,
        )
        data = resp.json()
        results = data.get("results", [])
    except Exception as exc:
        logger.warning("Tavily search failed: %s", exc)
        return []

    listings: List[BusinessListing] = []
    for r in results:
        website = _extract_website(r)
        if not website:
            continue
        name = r.get("title", "").split(" - ")[0].split(" | ")[0].strip()
        if not name:
            continue
        content = r.get("content", "")
        social = _social_links_from_content(content)
        listings.append(BusinessListing(
            name=name,
            address=geography,
            website=website,
            rating=0.0,   # Tavily doesn't return ratings; will be enriched later
            review_count=0,
            types=["restaurant"],
            source="tavily",
            location_count_signal=1,
            notes=f"Tavily web result. Social links: {social}" if social else "Tavily web result.",
        ))
    logger.info("Tavily returned %d candidate websites for '%s'", len(listings), query)
    return listings


def research_business(name: str, website: str) -> dict:
    """Use Tavily Extract to pull structured info from a business website.

    Returns a dict with keys: social_links, phone, email_hint, description.
    Used by the contact discovery layer (not the discovery coordinator).
    """
    if not _has_key() or not website:
        return {}

    try:
        resp = httpx.post(
            _EXTRACT_URL,
            json={
                "api_key": _api_key(),
                "urls": [website],
            },
            timeout=30,
        )
        data = resp.json()
        results = data.get("results", [])
        if not results:
            return {}
        content = results[0].get("raw_content", "")
        social = _social_links_from_content(content)
        # Very rough email hint extraction (mailto: or pattern).
        import re
        emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", content)
        return {
            "social_links": social,
            "email_hint": emails[0] if emails else None,
            "description": content[:500].strip(),
        }
    except Exception as exc:
        logger.warning("Tavily extract failed for %s: %s", website, exc)
        return {}
