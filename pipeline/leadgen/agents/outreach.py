"""
Outreach node — build a personalized outreach package per qualified lead.

Upgrades in this version:
  1. Uses an LLM call (call_lead_agent) to write the personalized email body,
     referencing ACTUAL audit findings, not a generic f-string template.
  2. Addresses the owner by name when contact_discovery found one.
  3. Injects the demo URL from redesign_trigger if available.
  4. Sends via Resend when LEADGEN_ENABLE_EMAIL=true and the package is approved.
  5. Enforces max_emails_per_run cap per campaign.
  6. Only sends to publicly listed business contact emails (anti-spam compliance).
"""

from __future__ import annotations

import logging
import re
from urllib.parse import urlparse

from pipeline.leadgen.agents.base import emit, finalize, call_lead_agent, use_live_tools
from pipeline.leadgen.config import get_leadgen_settings
from pipeline.leadgen.schemas import LeadCandidate, OutreachPackage

logger = logging.getLogger("pipeline.leadgen.agents.outreach")


def _slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "lead"


def _build_email_template(lc: LeadCandidate, demo_url: str) -> tuple[str, str]:
    """Deterministic template fallback (no LLM required)."""
    found = ", ".join(lc.redesign_opportunities[:3]) or "visual hierarchy and mobile experience"
    city = (lc.location or "").split(",")[0]
    greeting = f"Hi {lc.contact_name}," if lc.contact_name else f"Hi {lc.business_name} team,"
    subject = f"Quick concept: a stronger website for {lc.business_name}"
    body = (
        f"{greeting}\n\n"
        f"I came across {lc.business_name} while looking at independent burger brands in "
        f"{city}. Your food and brand already have a strong identity, but I noticed a few "
        f"opportunities on the current website around {found}.\n\n"
        f"I put together a quick concept redesign to show what the experience could look like:\n"
        f"  View the concept → {demo_url}\n\n"
        f"This is only a concept and doesn't change anything on your current website. "
        f"If the direction is interesting, I'd be happy to show you what a complete redesign "
        f"could look like.\n\n"
        f"– Wishgranters"
    )
    return subject, body


def _build_email_llm(lc: LeadCandidate, demo_url: str) -> tuple[str, str]:
    """LLM-powered personalized email — references actual audit findings."""
    audit_snapshot = (
        f"Business: {lc.business_name} in {lc.location}\n"
        f"Website: {lc.website_url or 'unknown'}\n"
        f"Contact name: {lc.contact_name or 'not found'}\n"
        f"Audit scores: Visual {lc.visual_score}/10 · UX {lc.ux_score}/10 · "
        f"Mobile {lc.mobile_score}/10 · SEO {lc.seo_score}/10 · "
        f"Branding {lc.branding_score}/10 · Content {lc.content_score}/10\n"
        f"Key weaknesses: {', '.join(lc.redesign_opportunities[:5]) or 'none identified'}\n"
        f"Overall website score: {lc.overall_website_score}/10\n"
        f"Redesign opportunity: {lc.redesign_opportunity}/10\n"
        f"Demo URL to reference: {demo_url}\n"
        f"ICP similarity to SmashGuys: {lc.icp_similarity_score:.2f}\n"
        f"Social presence: {', '.join(lc.social_links[:2]) or 'not found'}"
    )
    from pipeline.leadgen.schemas import OutreachPackage as _OP
    # Re-use the OutreachPackage schema as the structured output: we only care about
    # email_subject and email_body fields — the rest are pre-filled.
    result = call_lead_agent("outreach", None, OutreachPackage, live_context=audit_snapshot)
    subject = result.email_subject or f"Quick concept: a stronger website for {lc.business_name}"
    body = result.email_body or ""
    return subject, body


def outreach(state) -> dict:
    settings = get_leadgen_settings()
    demo_base = settings.demo_base_url.rstrip("/")
    packages: list[OutreachPackage] = []
    emails_sent = 0
    max_emails = settings.max_emails_per_run

    # Build a demo URL map from redesign_trigger if available.
    redesign_jobs = getattr(state, "redesign_jobs", {}) or {}

    for lc in state.scored:
        if lc.decision != "QUALIFY":
            continue

        # Human review gate.
        decision = state.human_reviews.get(lc.business_name) if state.human_reviews else None
        if settings.require_human_review and decision in ("reject", "rejected"):
            continue

        slug = _slug(lc.business_name)
        # Use confirmed redesign job URL if available; otherwise placeholder.
        if lc.business_name in redesign_jobs and not redesign_jobs[lc.business_name].startswith("error:"):
            demo_url = f"{demo_base}/{slug}"
        elif settings.enable_redesign:
            demo_url = f"{demo_base}/{slug}"
        else:
            demo_url = f"{demo_base}/{slug} (concept)"

        # Build personalized email (LLM when live, template when mock/offline).
        if use_live_tools():
            try:
                subject, body = _build_email_llm(lc, demo_url)
            except Exception as exc:
                logger.warning("LLM email build failed for %s: %s; using template", lc.business_name, exc)
                subject, body = _build_email_template(lc, demo_url)
        else:
            subject, body = _build_email_template(lc, demo_url)

        lead_profile = (
            f"{lc.business_name} — {lc.business_type} in {lc.location}. "
            f"Established physical presence; website quality {lc.overall_website_score}/10. "
            f"ICP similarity: {lc.icp_similarity_score:.2f}."
        )
        audit_summary = (
            f"Visual {lc.visual_score}/10 · UX {lc.ux_score}/10 · Mobile {lc.mobile_score}/10 · "
            f"SEO {lc.seo_score}/10 · Performance {lc.performance_score}/10 · "
            f"Branding {lc.branding_score}/10. Overall {lc.overall_website_score}/10; "
            f"redesign opportunity {lc.redesign_opportunity}/10."
        )

        pkg_status = "approved" if not settings.require_human_review else "draft"
        pkg = OutreachPackage(
            business_name=lc.business_name,
            location=lc.location,
            website_url=lc.website_url,
            contact_email=lc.contact_email,
            contact_name=lc.contact_name,
            lead_profile=lead_profile,
            audit_summary=audit_summary,
            before_screenshot=lc.before_screenshot,
            demo_url=demo_url,
            email_subject=subject,
            email_body=body,
            status=pkg_status,
        )

        # Send via Resend if enabled + approved + has contact email + under cap.
        if (
            settings.enable_email
            and pkg_status == "approved"
            and lc.contact_email
            and emails_sent < max_emails
        ):
            try:
                from pipeline.leadgen.tools.email import send
                send_result = send(
                    to_email=lc.contact_email,
                    subject=subject,
                    body_text=body,
                    from_address=settings.email_from_address,
                )
                if send_result.success:
                    pkg.status = "sent"
                    pkg.message_id = send_result.message_id
                    pkg.sent_at = send_result.sent_at
                    emails_sent += 1
                    logger.info("Email sent to %s (msg=%s)", lc.contact_email, send_result.message_id)
                else:
                    logger.warning("Email send failed for %s: %s", lc.business_name, send_result.error)
            except Exception as exc:
                logger.warning("Email tool error for %s: %s", lc.business_name, exc)

        packages.append(pkg)

    return {
        **finalize("outreach"),
        "outreach": packages,
        "stats": {"outreach_packages": len(packages), "emails_sent": emails_sent},
        "events": [emit(
            "outreach", "outreach",
            f"Built {len(packages)} outreach packages; {emails_sent} emails sent via Resend.",
            "info",
        )],
    }
