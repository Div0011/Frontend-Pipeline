"""
Redesign Pipeline Trigger — gate between human_review and outreach.

Selects the top-N QUALIFY leads (by overall_lead_score, tier Priority or Good prospect)
and triggers the main frontend pipeline via pipeline.orchestrator.

Gated behind LEADGEN_ENABLE_REDESIGN=true (default: false).
Even when enabled, at most IcpConfig.max_redesign_triggers leads are sent
through (default: 5) — so the expensive generation step only runs for the
strongest prospects.

The trigger does NOT block the outreach step. Redesign jobs run asynchronously;
their demo URLs are returned separately and can be injected into outreach
packages in a second pass.
"""

from __future__ import annotations

import logging

from pipeline.leadgen.agents.base import emit, finalize
from pipeline.leadgen.config import get_leadgen_settings
from pipeline.leadgen.schemas import LeadCandidate

logger = logging.getLogger("pipeline.leadgen.agents.redesign_trigger")


def redesign_trigger(state) -> dict:
    settings = get_leadgen_settings()

    if not settings.enable_redesign:
        return {
            **finalize("redesign_trigger"),
            "events": [emit("redesign_trigger", "redesign_trigger",
                            "LEADGEN_ENABLE_REDESIGN=false — redesign trigger skipped.", "info")],
        }

    icp = state.icp
    max_triggers = getattr(icp, "max_redesign_triggers", 5)

    # Only send Priority or Good prospect leads through the pipeline.
    eligible: list[LeadCandidate] = [
        lc for lc in state.scored
        if lc.decision == "QUALIFY" and lc.tier in ("Priority", "Good prospect")
    ]
    # Sort by score descending; take top N.
    eligible.sort(key=lambda x: x.overall_lead_score, reverse=True)
    to_trigger = eligible[:max_triggers]

    redesign_jobs: dict[str, str] = {}
    triggered = 0

    for lc in to_trigger:
        try:
            job_id = _trigger_redesign(lc, state.campaign_id)
            redesign_jobs[lc.business_name] = job_id
            lc.redesign_triggered = True
            triggered += 1
            logger.info("Redesign triggered for %s (score=%d): job_id=%s",
                        lc.business_name, lc.overall_lead_score, job_id)
        except Exception as exc:
            logger.warning("Redesign trigger failed for %s: %s", lc.business_name, exc)
            redesign_jobs[lc.business_name] = f"error:{exc}"

    return {
        **finalize("redesign_trigger"),
        "redesign_jobs": redesign_jobs,
        "stats": {"redesign_triggered": triggered, "redesign_eligible": len(eligible)},
        "events": [emit(
            "redesign_trigger", "redesign_trigger",
            f"Redesign triggered for {triggered}/{len(eligible)} eligible leads "
            f"(max_triggers={max_triggers}).",
            "success" if triggered else "warn",
        )],
    }


def _trigger_redesign(lc: LeadCandidate, campaign_id: str) -> str:
    """Fire the redesign pipeline for a lead. Returns a job_id string.

    In production this calls pipeline.orchestrator or dispatches to a task queue.
    In the current version it builds the job spec and returns a stable ID so the
    outreach layer can construct the demo URL even before the redesign completes.
    """
    import hashlib
    import re

    slug = re.sub(r"[^a-z0-9]+", "-", lc.business_name.lower()).strip("-") or "lead"
    job_id = f"redesign-{slug}-{campaign_id}"
    demo_url = f"https://preview.wishgranters.com/{slug}"

    # Build redesign brief (mirrors the main pipeline's PipelineRun input).
    brief = {
        "job_id": job_id,
        "business_name": lc.business_name,
        "website_url": lc.website_url,
        "location": lc.location,
        "problems": lc.redesign_opportunities,
        "audit": {
            "visual": lc.visual_score,
            "ux": lc.ux_score,
            "mobile": lc.mobile_score,
            "seo": lc.seo_score,
            "branding": lc.branding_score,
        },
        "overall_lead_score": lc.overall_lead_score,
        "demo_url": demo_url,
        "campaign_id": campaign_id,
    }

    # Attempt to call the main orchestrator if available.
    try:
        from pipeline.orchestrator import enqueue_redesign_job  # type: ignore
        enqueue_redesign_job(brief)
    except ImportError:
        # Main pipeline not wired in yet — log the brief for inspection.
        logger.info("Redesign brief (orchestrator not connected): %s", brief)

    # Persist job brief to a local JSON file for inspection.
    import json
    import os
    out_dir = os.path.join(os.path.dirname(__file__), "..", "..", "..", "reports", "redesign_jobs")
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, f"{job_id}.json"), "w") as f:
        json.dump(brief, f, indent=2)

    return job_id
