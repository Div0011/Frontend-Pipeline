"""Dedup + preliminary filter — BusinessListing[] -> CandidateLead[].

Rejects on explicit negative criteria BEFORE any expensive crawling:
  * hard-negative brand name (McDonald's, KFC, ...)
  * duplicate businesses (same name or same website)
  * no website when require_website
  * too few reviews / low rating when require_local_presence (no real presence)
"""

from __future__ import annotations

from urllib.parse import urlparse

from pipeline.leadgen.agents.base import emit, finalize
from pipeline.leadgen.schemas import CandidateLead


def _norm_domain(url: str | None) -> str:
    if not url:
        return ""
    try:
        net = urlparse(url).netloc.lower()
        return net[4:] if net.startswith("www.") else net
    except Exception:
        return ""


def _name_key(name: str) -> str:
    return name.lower().strip()


def dedup(state) -> dict:
    icp = state.icp
    seen_names: set[str] = set()
    seen_domains: set[str] = set()
    candidates: list[CandidateLead] = []
    rejected = 0

    for b in state.discovered:
        reasons: list[str] = []
        nkey = _name_key(b.name)

        # Hard-negative brand list (case-insensitive substring).
        if any(neg in nkey for neg in icp.negative_brands):
            reasons.append(f"Hard-negative brand name matches blocklist ({b.name})")

        # Duplicate detection.
        dom = _norm_domain(b.website)
        if nkey in seen_names:
            reasons.append("Duplicate business (same name)")
        elif dom and dom in seen_domains:
            reasons.append("Duplicate business (same website domain)")

        # Website requirement.
        website_exists = bool(b.website)
        if icp.require_website and not website_exists:
            reasons.append("No legitimate website")

        # Local-presence requirement.
        if icp.require_local_presence:
            if b.rating < icp.min_rating:
                reasons.append(f"Rating {b.rating} below minimum {icp.min_rating} (no real presence)")
            if b.review_count < icp.min_reviews:
                reasons.append(f"Only {b.review_count} reviews (below {icp.min_reviews}; likely inactive)")

        is_dup = bool(reasons)
        if not is_dup:
            seen_names.add(nkey)
            if dom:
                seen_domains.add(dom)

        cand = CandidateLead(
            business_name=b.name,
            industry=icp.industry,
            location=icp.geography,
            website_url=b.website,
            place_id=b.place_id,
            rating=b.rating,
            review_count=b.review_count,
            website_exists=website_exists,
            # Carry the discovery-time location signal through for the classifier.
            location_count=b.location_count_signal,
            rejection_reasons=reasons,
        )
        if is_dup:
            rejected += 1
            continue
        candidates.append(cand)

    return {
        **finalize("dedup"),
        "candidates": candidates,
        "stats": {"candidates": len(candidates), "dedup_rejected": rejected},
        "events": [emit("dedup", "dedup", f"{len(candidates)} candidates kept, {rejected} rejected at dedup", "info")],
    }
