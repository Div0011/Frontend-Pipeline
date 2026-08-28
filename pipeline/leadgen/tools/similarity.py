"""
ICP Similarity scoring — "Find businesses like SmashGuys, not just burger restaurants."

Computes a cosine similarity between each candidate lead's structured profile
and the reference client profile (SmashGuys), using deterministic feature vectors
(no embedding model required for MVP — embedding can be swapped in later).

Feature vector (13 dimensions, all normalized 0-1):
  0. rating_norm           (rating / 5.0)
  1. review_count_norm     (log10(review_count+1) / log10(10000))
  2. price_level_norm      (price_level / 4.0)
  3. is_independent        (1 if independent, 0 if not)
  4. website_quality_inv   (1 - overall_website_score / 10)   ← low site = similar to SmashGuys
  5. redesign_opp_norm     (redesign_opportunity / 10)
  6. has_social            (1 if social_links, 0 if not)
  7. has_phone             (1 if phone found, 0 if not)
  8. visual_inv            (1 - visual_score / 10)
  9. mobile_inv            (1 - mobile_score / 10)
  10. seo_inv              (1 - seo_score / 10)
  11. branding_inv         (1 - branding_score / 10)
  12. has_physical_presence (always 1 for leads that passed ICP filter)

The reference vector is precomputed from smashguys.json and cached.
"""

from __future__ import annotations

import json
import logging
import math
import os
from functools import lru_cache
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from pipeline.leadgen.schemas import CandidateLead, WebsiteAudit

logger = logging.getLogger("pipeline.leadgen.tools.similarity")

_SMASHGUYS_JSON = os.path.join(os.path.dirname(__file__), "..", "reference", "smashguys.json")


@lru_cache(maxsize=1)
def _load_smashguys() -> dict:
    path = os.path.normpath(_SMASHGUYS_JSON)
    try:
        with open(path) as f:
            return json.load(f)
    except Exception as exc:
        logger.error("Could not load SmashGuys reference: %s", exc)
        return {}


def _reference_vector() -> list[float]:
    """Precomputed feature vector from smashguys.json."""
    sg = _load_smashguys()
    wb = sg.get("website_quality_before", {})

    def lognorm(v: float, cap: float = 10000.0) -> float:
        return math.log10(max(1, v) + 1) / math.log10(cap + 1)

    return [
        sg.get("rating", 4.7) / 5.0,
        lognorm(sg.get("review_count", 620)),
        sg.get("price_level", 2) / 4.0,
        1.0 if sg.get("reference_features", {}).get("independent_not_chain") else 0.0,
        1.0 - wb.get("overall", 3.8) / 10.0,
        sg.get("redesign_opportunity_before", 9.1) / 10.0,
        1.0 if sg.get("reference_features", {}).get("active_social_media") else 0.0,
        1.0,  # phone assumed
        1.0 - wb.get("visual_design", 3.5) / 10.0,
        1.0 - wb.get("mobile", 3.0) / 10.0,
        1.0 - wb.get("seo", 2.5) / 10.0,
        1.0 - wb.get("branding", 3.5) / 10.0,
        1.0,  # physical presence
    ]


def _candidate_vector(
    candidate: "CandidateLead",
    audit: "WebsiteAudit",
) -> list[float]:
    def lognorm(v: float, cap: float = 10000.0) -> float:
        return math.log10(max(1, v) + 1) / math.log10(cap + 1)

    has_social = bool(getattr(candidate, "social_links", None))
    has_phone = bool(getattr(candidate, "phone", None))
    price_level = getattr(candidate, "price_level", 2) or 2

    return [
        candidate.rating / 5.0,
        lognorm(candidate.review_count),
        price_level / 4.0,
        1.0 if candidate.is_independent else 0.0,
        1.0 - audit.overall_website_score / 10.0,
        audit.redesign_opportunity / 10.0,
        1.0 if has_social else 0.0,
        1.0 if has_phone else 0.0,
        1.0 - audit.visual_design / 10.0,
        1.0 - audit.mobile / 10.0,
        1.0 - audit.seo / 10.0,
        1.0 - audit.branding / 10.0,
        1.0,  # physical presence guaranteed by ICP filter
    ]


def _cosine(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = math.sqrt(sum(x * x for x in a))
    mag_b = math.sqrt(sum(y * y for y in b))
    if mag_a == 0 or mag_b == 0:
        return 0.0
    return dot / (mag_a * mag_b)


def compute_icp_similarity(
    candidate: "CandidateLead",
    audit: "WebsiteAudit",
) -> float:
    """Return cosine similarity [0-1] between candidate and SmashGuys reference.

    0.0 = nothing in common with our ideal client.
    1.0 = nearly identical profile to SmashGuys.
    Typical qualified leads will score 0.7–0.95.
    """
    try:
        ref = _reference_vector()
        cand = _candidate_vector(candidate, audit)
        sim = _cosine(ref, cand)
        return round(sim, 3)
    except Exception as exc:
        logger.warning("ICP similarity computation failed: %s", exc)
        return 0.5  # neutral fallback
