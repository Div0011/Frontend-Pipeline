"""
Lead Scorer — the qualification brain (deterministic code, no LLM).

Turns (CandidateLead + WebsiteAudit) into a decision-ready LeadCandidate with:
  * multi-dimensional website scores (the "is the site bad?" answer), and
  * commercial-potential dimensions (the "is it worth US approaching THEM?" answer).

These are SEPARATE questions. A bad site with no commercial leverage is a REJECT.
The composite is a weighted sum from the ICP's `scoring_weights`, so the
definition of a "good prospect" is tunable without touching code.
"""

from __future__ import annotations

import logging
import math

from pipeline.leadgen.agents.base import emit, finalize
from pipeline.leadgen.schemas import CandidateLead, CommercialScores, LeadCandidate, WebsiteAudit

logger = logging.getLogger("pipeline.leadgen.agents.scorer")

_STRONG_SITE_THRESHOLD = 7.5  # overall_website_score at/above this => "already strong" => reject
_NO_UPSIDE_OPP = 3.0  # redesign_opportunity below this => nothing to sell into => reject


def _mean7(a: WebsiteAudit) -> float:
    return (a.visual_design + a.ux + a.mobile + a.seo + a.performance + a.content + a.branding) / 7.0


def score_one(c: CandidateLead, audit: WebsiteAudit, icp) -> LeadCandidate:
    ow = _mean7(audit)
    website_quality = round(ow, 1)

    # Enhanced business quality: rating + review volume + price signal + photo pride + digital hygiene.
    rating_component = (c.rating / 5.0) * 50  # max 50
    review_component = min(20.0, math.log10(c.review_count + 1) * 7)  # max 20
    price_bonus = (getattr(c, "price_level", None) or 2) * 3  # max 12 (price 4 = 12)
    photo_bonus = min(8.0, (getattr(c, "photo_count", 0) or 0) / 10)  # max 8
    hours_bonus = 5.0 if getattr(c, "hours_complete", False) else 0.0
    business_quality = round(min(100.0, rating_component + review_component + price_bonus + photo_bonus + hours_bonus), 1)

    redesign_opp = round(audit.redesign_opportunity * 10, 1)
    seo_opp = round((10 - audit.seo) * 10, 1)
    brand_pot = round((10 - audit.branding) * 10, 1)

    # ICP similarity: cosine similarity to SmashGuys reference profile.
    try:
        from pipeline.leadgen.tools.similarity import compute_icp_similarity
        icp_sim = compute_icp_similarity(c, audit)
    except Exception as exc:
        logger.warning("ICP similarity skipped: %s", exc)
        icp_sim = 0.5

    # Commercial fit blends UX+content with ICP similarity.
    ux_content = (audit.ux + audit.content) / 2.0
    commercial_fit = round(ux_content * 5 + icp_sim * 50, 1)  # 0-100
    commercial_fit = min(100.0, commercial_fit)

    # Contactability: use real score from contact_discovery if available; otherwise flat.
    real_contact_score = getattr(c, "contactability_score", None)
    if real_contact_score and real_contact_score > 0:
        contactability = min(100.0, real_contact_score)
    else:
        contactability = 80.0 if c.website_exists else 0.0

    w = icp.scoring_weights
    final = int(round(
        w.get("business_quality", 0.15) * business_quality
        + w.get("website_quality", 0.25) * website_quality * 10
        + w.get("redesign_opportunity", 0.20) * redesign_opp
        + w.get("seo_opportunity", 0.15) * seo_opp
        + w.get("brand_potential", 0.10) * brand_pot
        + w.get("commercial_fit", 0.10) * commercial_fit
        + w.get("contactability", 0.05) * contactability
    ))
    final = max(0, min(100, final))

    if final >= icp.tier_priority:
        tier = "Priority"
    elif final >= icp.tier_good:
        tier = "Good prospect"
    elif final >= icp.tier_maybe:
        tier = "Maybe"
    else:
        tier = "Reject"

    # Rejection logic (independent of tier):
    reasons = list(c.rejection_reasons)
    if ow >= _STRONG_SITE_THRESHOLD:
        reasons.append("Website is already exceptionally strong — little commercial upside")
    if audit.redesign_opportunity < _NO_UPSIDE_OPP and ow >= 6.0:
        reasons.append("Low redesign opportunity — insufficient commercial upside to justify outreach")
    decision = "REJECT" if (reasons or tier == "Reject") else "QUALIFY"

    cs = CommercialScores(
        business_quality=business_quality,
        website_quality=website_quality * 10,
        redesign_opportunity=redesign_opp,
        seo_opportunity=seo_opp,
        brand_potential=brand_pot,
        commercial_fit=commercial_fit,
        contactability=contactability,
        final_lead_score=final,
        tier=tier,
    )

    return LeadCandidate(
        business_name=c.business_name,
        industry=c.industry,
        location=c.location,
        website_url=c.website_url,
        business_type=c.business_type,
        is_independent=c.is_independent,
        is_chain=c.is_chain,
        chain_confidence=c.chain_confidence,
        website_exists=c.website_exists,
        website_quality_score=website_quality,
        visual_score=audit.visual_design,
        ux_score=audit.ux,
        seo_score=audit.seo,
        mobile_score=audit.mobile,
        performance_score=audit.performance,
        content_score=audit.content,
        branding_score=audit.branding,
        overall_website_score=website_quality,
        redesign_opportunity=audit.redesign_opportunity,
        redesign_opportunities=audit.redesign_opportunities if decision == "QUALIFY" else [],
        commercial_fit_score=commercial_fit,
        contactability_score=contactability,
        business_quality_score=business_quality,
        seo_opportunity_score=seo_opp,
        brand_potential_score=brand_pot,
        icp_similarity_score=icp_sim,
        overall_lead_score=final,
        tier=tier,
        rejection_reasons=reasons,
        recommended_services=audit.redesign_opportunities if decision == "QUALIFY" else [],
        decision=decision,
        before_screenshot=audit.before_screenshot,
        mobile_screenshot=audit.mobile_screenshot,
        # Propagate contact fields from the candidate.
        contact_email=getattr(c, "contact_email", None),
        contact_name=getattr(c, "contact_name", None),
        phone=getattr(c, "phone", None),
        social_links=getattr(c, "social_links", []),
    ), cs


def scorer(state) -> dict:
    icp = state.icp
    cand_by_name = {c.business_name: c for c in state.candidates}
    scored: list[LeadCandidate] = []
    qualified = 0

    for name, audit in state.audits.items():
        c = cand_by_name.get(name)
        if c is None:
            continue
        lc, _cs = score_one(c, audit, icp)
        if lc.decision == "QUALIFY":
            qualified += 1
        scored.append(lc)

    # Sort by score desc so the "top N" is deterministic.
    scored.sort(key=lambda x: x.overall_lead_score, reverse=True)

    return {
        **finalize("scorer"),
        "scored": scored,
        "stats": {"scored": len(scored), "qualified": qualified},
        "events": [emit("scorer", "scorer",
                         f"Scored {len(scored)} leads; {qualified} QUALIFIED, "
                         f"{len(scored) - qualified} REJECTED.", "success")],
    }
