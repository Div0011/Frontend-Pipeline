"""
Human Review gate — the explicit approval checkpoint BEFORE any outreach.

This uses LangGraph's ``interrupt()``. The graph pauses here; an operator calls
the API with ``Command(resume=decisions)`` where ``decisions`` maps
business_name -> "approve" | "reject". Until then, no email is built/sent.

This is intentionally a hard gate in v1: the agent does NOT auto-send. We want
to see whether the leads are actually good before allowing autonomous outreach.
"""

from __future__ import annotations

import logging

from langgraph.types import interrupt

from pipeline.leadgen.agents.base import emit, finalize
from pipeline.leadgen.config import get_leadgen_settings
from pipeline.leadgen.schemas import LeadCandidate

logger = logging.getLogger("pipeline.leadgen.agents.human_review")


def human_review(state) -> dict:
    settings = get_leadgen_settings()
    if not settings.require_human_review:
        return {
            **finalize("human_review"),
            "events": [emit("human_review", "human_review", "Human review disabled — auto-approving all qualified leads.", "info")],
        }

    pending = [
        {"business_name": lc.business_name, "score": lc.overall_lead_score, "tier": lc.tier,
         "website": lc.website_url, "opportunities": lc.redesign_opportunities}
        for lc in state.scored if lc.decision == "QUALIFY"
    ]

    payload = {
        "type": "lead_approval_required",
        "campaign_id": state.campaign_id,
        "pending": pending,
        "prompt": "Review the qualified leads and approve/reject each before outreach.",
    }
    decisions = interrupt(payload)  # pauses the graph here
    reviews = decisions if isinstance(decisions, dict) else {}
    return {
        **finalize("human_review"),
        "human_reviews": {k: str(v) for k, v in reviews.items()},
        "events": [emit("human_review", "human_review", f"Received {len(reviews)} human decisions.", "success")],
    }
