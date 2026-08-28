"""
Business Classifier — the PRIMARY chain filter is the Places location count.

This node decides independent vs chain/regional/franchise/enterprise using the
Places location-count signal first, and only consults an LLM as a *second
opinion*. In simulation/mock mode the location signal comes straight from the
seed data, so the decision is fully deterministic and testable.

Decision rules (in order):
  1. Hard-negative brand name            -> chain, REJECT (hardcoded_negative)
  2. location_count >= threshold        -> chain, REJECT (places_location_count)
  3. 1 < location_count < threshold      -> regional_chain, REJECT (target is independents only)
  4. location_count <= 1                -> independent_restaurant, KEEP
"""

from __future__ import annotations

import logging

from pipeline.leadgen.agents.base import emit, finalize, use_live_tools, call_lead_agent
from pipeline.leadgen.schemas import BusinessClassification, CandidateLead

logger = logging.getLogger("pipeline.leadgen.agents.classifier")


def _classify_from_location(name: str, location_count: int, threshold: int) -> BusinessClassification:
    nkey = name.lower()
    # Rule 1 handled by caller (negative list). Here we only do the count logic.
    if location_count >= threshold:
        bt = "enterprise_brand" if location_count >= threshold * 2 else "regional_chain"
        return BusinessClassification(
            business_name=name,
            business_type=bt,
            is_independent=False,
            is_chain=True,
            chain_confidence=min(1.0, 0.5 + location_count / (threshold * 3)),
            location_count=location_count,
            classification_method="places_location_count",
            local_presence=True,
            rationale=f"{location_count} distinct Places locations → chain by primary signal.",
            reject=True,
            rejection_reasons=[f"Chain by location count ({location_count} locations >= {threshold})"],
        )
    if location_count > 1:
        return BusinessClassification(
            business_name=name,
            business_type="regional_chain",
            is_independent=False,
            is_chain=True,
            chain_confidence=0.4 + min(0.4, location_count / threshold),
            location_count=location_count,
            classification_method="places_location_count",
            local_presence=True,
            rationale=f"{location_count} locations → regional chain (target is independents only).",
            reject=True,
            rejection_reasons=["Regional/multi-location chain (target is independent restaurants only)"],
        )
    return BusinessClassification(
        business_name=name,
        business_type="independent_restaurant",
        is_independent=True,
        is_chain=False,
        chain_confidence=0.0,
        location_count=location_count,
        classification_method="places_location_count",
        local_presence=True,
        rationale="Single Places location → independent.",
        reject=False,
    )


def classifier(state) -> dict:
    icp = state.icp
    from pipeline.leadgen.tools.places import count_locations_for_name

    updated: list[CandidateLead] = []
    rejected = 0

    for c in state.candidates:
        # Rule 1: hard-negative brand.
        if any(neg in c.business_name.lower() for neg in icp.negative_brands):
            cls = BusinessClassification(
                business_name=c.business_name,
                business_type="enterprise_brand",
                is_independent=False,
                is_chain=True,
                chain_confidence=1.0,
                location_count=c.location_count,
                classification_method="hardcoded_negative",
                rationale="Brand name matches the hard-negative blocklist.",
                reject=True,
                rejection_reasons=["Hard-negative brand (franchise/chain in blocklist)"],
            )
        else:
            # Primary signal: location count.
            location_count = c.location_count
            if location_count <= 1 and use_live_tools() is False:
                # mock mode already carries a real signal; live mode refines it:
                pass
            if use_live_tools():
                location_count = count_locations_for_name(c.business_name) or location_count
            cls = _classify_from_location(c.business_name, location_count, icp.national_chain_threshold)

            # Second opinion (LLM) — does NOT override the places decision.
            if use_live_tools():
                try:
                    hint = call_lead_agent("classifier", state, BusinessClassification,
                                            live_context=f"Business: {c.business_name}\nWebsite: {c.website_url}")
                    # Reconcile: keep places as source of truth; use LLM only to
                    # soften chain_confidence when places is ambiguous (1<count<threshold).
                    if not cls.reject and hint and hint.chain_confidence > 0.7:
                        cls.chain_confidence = max(cls.chain_confidence, hint.chain_confidence * 0.6)
                        cls.rationale += f" | LLM second opinion: {hint.rationale}"
                except Exception as exc:
                    logger.warning("classifier LLM second opinion failed: %s", exc)

        c.business_type = cls.business_type
        c.is_independent = cls.is_independent
        c.is_chain = cls.is_chain
        c.chain_confidence = cls.chain_confidence
        c.location_count = cls.location_count
        c.classification_method = cls.classification_method
        if cls.reject:
            c.rejection_reasons = list(set(c.rejection_reasons + cls.rejection_reasons))
            rejected += 1
        updated.append(c)

    return {
        **finalize("classifier"),
        "candidates": updated,
        "stats": {"classifier_rejected": rejected, "classifier_kept": len(updated) - rejected},
        "events": [emit("classifier", "classifier",
                         f"Classified {len(updated)} candidates; {rejected} rejected as chains/franchises "
                         f"(primary signal: Places location count).", "info")],
    }
