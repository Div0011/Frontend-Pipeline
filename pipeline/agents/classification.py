"""
Shared classification helpers for the agent system.

This module holds the pure, cacheable pieces that were extracted from the
monolithic agent node module so they can be shared by multiple agents:

* ``_URL_RE`` — regex for extracting URLs from requests
* ``_cached_tool`` — per-project tool result cache so parallel agents never
  re-crawl the same URL or re-capture the same screenshot
* ``classify_genre`` — the genre decision tree (was ``_classify_genre``)
* ``classify_template`` — the template classifier (was ``_classify_template``)

All classification functions are deterministic and cached with
:func:`functools.lru_cache`.
"""

from __future__ import annotations

import functools
import re
from typing import Any

from pipeline.state import RedesignState

_URL_RE = re.compile(r"https?://[^\s'\"]+")


# ── Tool result cache ─────────────────────────────────────────────────
_tool_cache: dict[tuple[str, str, str], Any] = {}


def _cached_tool(state: RedesignState, tool_name: str, key: str, fn, *args, **kwargs) -> Any:
    """Return a cached tool result, or call ``fn`` and cache it."""
    cache_key = (state.project_id, tool_name, key)
    if cache_key not in _tool_cache:
        _tool_cache[cache_key] = fn(*args, **kwargs)
    return _tool_cache[cache_key]


# ── Genre / template classification (cached) ─────────────────────────
@functools.lru_cache(maxsize=128)
def classify_genre(request: str, url: str | None) -> tuple[str, str]:
    """Return the genre branch and a short rationale for the planner.

    Uses a concrete decision tree to prevent hallucinating Genre 1 for brands
    that have no spatial journey to tell. Results are cached because the
    decision tree is deterministic.
    """
    brief = f"{request} {url or ''}".lower()

    no_3d_signals = any(
        signal in brief for signal in (
            "no 3d", "no webgl", "no three.js", "no video",
            "minimal", "editorial", "typography-led", "typography led",
            "restraint", "japanese", "hadaka", "obys", "cinematic without",
            "no generated", "no assets", "stock photos", "ordinary photos",
        )
    )
    if no_3d_signals:
        return (
            "genre_0",
            "Brief explicitly requests no 3D/video or signals restraint/editorial/typography-led — Genre 0 (cinematic without generated media) is correct.",
        )

    has_spatial_product = any(
        signal in brief for signal in (
            "journey", "chronology", "timeline", "explore", "scroll-camera",
            "cinematic", "story", "heritage", "automotive", "museum",
            "spatial", "experience", "fly through", "3d tour", "walk through",
        )
    )
    if has_spatial_product:
        has_journey = any(
            signal in brief for signal in (
                "history", "evolution", "process", "timeline", "chapter",
                "story", "narrative", "journey", "legacy", "from", "to",
            )
        )
        if has_journey:
            return (
                "genre_1",
                "Brief explicitly references a spatial product with narrative chronology — scroll-camera is the correct vehicle.",
            )
        return (
            "genre_2",
            "Physical product present but no narrative journey — restraint is correct. Use single hero object + mouse-reveal.",
        )

    is_informational = any(
        signal in brief for signal in (
            "b2b", "fintech", "saas", "developer tool", "corporate",
            "professional service", "platform", "api", "dashboard",
            "enterprise", "software", "app", "tech",
        )
    )
    if is_informational:
        is_typographic = any(
            signal in brief for signal in (
                "editorial", "agency", "portfolio", "kinetic type",
                "typography", "magazine", "journal", "publication",
            )
        )
        if is_typographic:
            return (
                "genre_2b",
                "Informational content where typography itself is the motion system — kinetic-type-led is appropriate.",
            )
        return (
            "genre_2",
            "Informational B2B/tech brief — conventional sections with one restrained 3D moment for gravitas.",
        )

    is_food_or_lifestyle = any(
        signal in brief for signal in (
            "restaurant", "burger", "food", "kitchen", "menu", "cafe",
            "bakery", "pizza", "sushi", "coffee", "bar", "pub", "dining",
            "recipe", "chef", "culinary", "taco", "ramen", "wine", "brewery",
            "fitness", "gym", "yoga", "wellness", "spa", "hotel",
        )
    )
    if is_food_or_lifestyle:
        return (
            "genre_2",
            "Food/lifestyle brand — Genre 2 with food-cinema hero (single hero object + mouse-reveal, no scroll-camera).",
        )

    return (
        "genre_0",
        "Default: no explicit spatial journey or typographic drama signals detected — Genre 0 is the safe, cinematic choice without generated media.",
    )


@functools.lru_cache(maxsize=128)
def classify_template(request: str) -> str:
    """Return the cinematic template ID that best matches the brief."""
    brief = request.lower()
    if any(k in brief for k in ("saas", "b2b", "software", "app", "developer tool", "platform", "dashboard")):
        return "saas_product_launch"
    if any(k in brief for k in ("corporate", "institutional", "enterprise", "heritage", "company")):
        return "corporate_institutional"
    if any(k in brief for k in ("agency", "marketing agency", "creative agency")):
        return "creative_agency"
    if any(k in brief for k in ("product", "e-commerce", "ecommerce", "shop", "hardware", "device")):
        return "consumer_product_ecommerce"
    if any(k in brief for k in ("minimal", "editorial", "typography-led", "typography led", "no 3d", "no webgl", "restraint", "hadaka", "obys")):
        return "minimal_editorial"
    return "creative_portfolio"
