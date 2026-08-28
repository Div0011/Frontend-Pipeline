"""
Contact Discovery node — run after classifier, before website_audit.

For each non-rejected candidate WITH a website, finds:
  - Business contact email (from website scrape / Tavily / Places)
  - Owner/operator name (from About page copy)
  - Phone number
  - Social media links

Updates CandidateLead with contact fields and real contactability_score.
"""

from __future__ import annotations

import logging

from pipeline.leadgen.agents.base import emit, finalize, use_live_tools
from pipeline.leadgen.schemas import CandidateLead
from pipeline.leadgen.tools.contact_finder import ContactResult, discover

logger = logging.getLogger("pipeline.leadgen.agents.contact_discovery")


def contact_discovery(state) -> dict:
    updated: list[CandidateLead] = []
    found_emails = 0

    for c in state.candidates:
        if c.rejection_reasons:
            updated.append(c)
            continue

        if use_live_tools() and c.website_url:
            try:
                cr: ContactResult = discover(
                    website_url=c.website_url,
                    place_id=c.place_id,
                    business_name=c.business_name,
                )
                # Attach contact fields to the candidate.
                if cr.contact_email:
                    c.contact_email = cr.contact_email
                    found_emails += 1
                if cr.contact_name:
                    c.contact_name = cr.contact_name
                if cr.phone:
                    c.phone = cr.phone
                if cr.social_links:
                    c.social_links = cr.social_links
                c.contact_source = cr.contact_source
                c.contactability_score = cr.contactability_score
            except Exception as exc:
                logger.warning("Contact discovery failed for %s: %s", c.business_name, exc)
                c.contactability_score = 20.0  # has website, nothing else found
        else:
            # Mock / no-live-tools: assign a plausible score.
            c.contactability_score = 60.0 if c.website_url else 0.0
            c.contact_source = "mock"

        updated.append(c)

    return {
        **finalize("contact_discovery"),
        "candidates": updated,
        "stats": {"contact_emails_found": found_emails},
        "events": [emit(
            "contact_discovery", "contact_discovery",
            f"Contact discovery complete: {found_emails}/{len([c for c in updated if not c.rejection_reasons])} "
            f"business emails found.",
            "info",
        )],
    }
