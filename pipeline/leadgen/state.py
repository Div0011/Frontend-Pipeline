"""
The LangGraph state for the Lead Discovery + Qualification + Outreach run.

Mirrors pipeline/state.py: each agent owns its own channel, shared channels use
merge/append reducers so concurrent branches compose instead of racing.
"""

from __future__ import annotations

from typing import Annotated, Any, Dict, List, Optional

from pydantic import BaseModel, Field

from pipeline.leadgen.schemas import (
    BusinessListing,
    CandidateLead,
    IcpConfig,
    LeadCandidate,
    LeadEvent,
    OutreachPackage,
    WebsiteAudit,
    _extend_no_dup,
    _last_str,
    _merge_events,
    _merge_status,
)


class LeadGenState(BaseModel):
    # ── Inputs ───────────────────────────────────────────────────────
    icp: IcpConfig = Field(default_factory=IcpConfig)
    campaign_id: str = "campaign-001"

    # ── Observability ────────────────────────────────────────────────
    events: Annotated[List[LeadEvent], _merge_events] = Field(default_factory=list)
    last_completed: Annotated[Optional[str], _last_str] = None
    error: Optional[str] = None

    # ── Discovery → qualification pipeline (one entry per business) ──
    discovered: Annotated[List[BusinessListing], _extend_no_dup] = Field(default_factory=list)
    candidates: Annotated[List[CandidateLead], _extend_no_dup] = Field(default_factory=list)
    audits: Annotated[Dict[str, WebsiteAudit], _merge_status] = Field(default_factory=dict)
    scored: Annotated[List[LeadCandidate], _extend_no_dup] = Field(default_factory=list)
    outreach: Annotated[List[OutreachPackage], _extend_no_dup] = Field(default_factory=list)

    # ── Human-in-the-loop ────────────────────────────────────────────
    human_reviews: Annotated[Dict[str, str], _merge_status] = Field(default_factory=dict)

    # ── Redesign pipeline tracking ───────────────────────────────────
    redesign_jobs: Annotated[Dict[str, str], _merge_status] = Field(
        default_factory=dict,
        description="Maps business_name -> redesign job_id for leads that triggered a redesign.",
    )

    # ── Counters (for the run summary) ───────────────────────────────
    stats: Annotated[Dict[str, int], _merge_status] = Field(default_factory=dict)

    model_config = {"arbitrary_types_allowed": True}
