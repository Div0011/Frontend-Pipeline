"""
Typed contracts for the Lead Discovery + Qualification + Outreach layer.

Design principles (mirrors pipeline/schemas.py):
  * Every agent returns a validated Pydantic object — no free-form prose drift.
  * The qualification logic is *real code*, not an LLM. The LLM is only used
    for the subjective audits (visual / UX / SEO / technical) and the final
    outreach copy.
  * The single most important distinction in this module is between:
      - WEBSITE QUALITY  (is the site bad?) and
      - COMMERCIAL VALUE (is it worth *us* approaching *them*?)
    A bad site with no commercial leverage is a REJECT, not a prospect.

Qualification flow produces, in order:
  BusinessListing  -> raw Places/web results
  CandidateLead    -> after dedup + business classification
  WebsiteAudit     -> multi-dimensional audit (NOT a single score)
  CommercialScores -> commercial-potential dimensions
  LeadCandidate    -> the unified, decision-ready record (per spec)
"""

from __future__ import annotations

from enum import Enum
from typing import Annotated, Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field


# ── ICP (Ideal Customer Profile) ──────────────────────────────────────
class IcpConfig(BaseModel):
    """The narrow, explicit definition of who we want to approach.

    Start narrow: one industry, one city, independents only.
    """

    campaign_id: str = Field(default="campaign-001", description="Stable id for this outreach campaign")
    industry: str = Field(default="independent burger restaurants", description="Primary vertical")
    geography: str = Field(default="Austin, Texas", description="City / region to target")
    discovery_query: str = Field(
        default="independent burger restaurants in Austin",
        description="Places Text Search query.",
    )
    target_business_types: List[str] = Field(
        default_factory=lambda: ["independent_restaurant"],
        description="Accepted business_type values from BusinessClassification.",
    )
    max_results: int = Field(default=10, description="How many qualified leads to return.")
    # Explicit negative criteria — the agent is told what to REJECT.
    negative_brands: List[str] = Field(
        default_factory=lambda: [
            "mcdonald's", "kfc", "burger king", "domino's", "pizza hut", "subway",
            "wendy's", "five guys", "sonic", "arby's", "jack in the box", "whataburger",
            "shake shack", "hardee's", "carl's jr", "dairy queen", "chick-fil-a", "taco bell", "popeyes",
        ],
        description="Hard-reject brand names (case-insensitive substring match).",
    )
    negative_criteria: List[str] = Field(
        default_factory=lambda: [
            "large national/international chains",
            "franchises where the website is controlled centrally",
            "businesses without a legitimate website",
            "businesses with an exceptionally strong website",
            "businesses that are obviously inactive / closed",
            "duplicate locations of the same business",
        ]
    )
    require_website: bool = True
    require_local_presence: bool = True
    min_rating: float = 3.5
    min_reviews: int = 30
    # Maximum number of leads that trigger the expensive redesign pipeline.
    max_redesign_triggers: int = Field(
        default=5,
        description="Only the top-N QUALIFY leads trigger the redesign pipeline.",
    )
    # Primary chain filter: number of distinct Places locations for one brand name.
    national_chain_threshold: int = Field(
        default=20,
        description="If a brand name yields >= this many distinct Places locations, treat as a chain.",
    )
    # Scoring weights for the commercial-potential composite (must sum to ~1.0).
    scoring_weights: Dict[str, float] = Field(
        default_factory=lambda: {
            "business_quality": 0.15,
            "website_quality": 0.25,
            "redesign_opportunity": 0.20,
            "seo_opportunity": 0.15,
            "brand_potential": 0.10,
            "commercial_fit": 0.10,
            "contactability": 0.05,
        }
    )
    # Tier thresholds on the 0-100 final score.
    tier_priority: int = 85
    tier_good: int = 70
    tier_maybe: int = 55
    # Reference client used to teach the agent "what a good prospect looks like".
    reference_client: str = "SmashGuys"


# ── Business listing (raw discovery output) ───────────────────────────
class BusinessListing(BaseModel):
    name: str
    address: str = ""
    website: Optional[str] = None
    rating: float = 0.0
    review_count: int = 0
    place_id: Optional[str] = None
    google_maps_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    types: List[str] = Field(default_factory=list)
    source: str = "places"
    # Pre-classification signals computed at discovery time.
    location_count_signal: int = Field(
        default=1,
        description="How many distinct Places results share this brand name "
        "(the primary, most reliable chain signal — NOT an LLM guess).",
    )
    # Enhanced signals from Places Details API.
    price_level: Optional[int] = Field(
        default=None, ge=0, le=4,
        description="Google Places price level (0=free, 1=inexpensive, 2=moderate, 3=expensive, 4=very expensive).",
    )
    photo_count: int = Field(
        default=0,
        description="Number of photos on the Google Places listing. High count signals presentation pride.",
    )
    hours_complete: bool = Field(
        default=False,
        description="True if Google Places shows complete opening hours. False signals poor digital hygiene.",
    )
    notes: str = ""


# ── Business classification ────────────────────────────────────────────
BusinessType = Literal[
    "independent_restaurant",
    "regional_chain",
    "franchise",
    "enterprise_brand",
    "unknown",
]


class BusinessClassification(BaseModel):
    business_name: str
    business_type: BusinessType = "unknown"
    is_independent: bool = True
    is_chain: bool = False
    chain_confidence: float = Field(
        default=0.0, ge=0.0, le=1.0,
        description="Confidence the business is a chain/franchise (0 independent -> 1 chain).",
    )
    location_count: int = Field(
        default=1,
        description="Distinct Places locations for this brand name (PRIMARY filter).",
    )
    classification_method: Literal[
        "places_location_count", "hardcoded_negative", "llm", "manual"
    ] = "places_location_count"
    local_presence: bool = True
    rationale: str = ""
    reject: bool = False
    rejection_reasons: List[str] = Field(default_factory=list)


# ── Candidate lead (after dedup + classification, pre-audit) ───────────
class CandidateLead(BaseModel):
    business_name: str
    industry: str = ""
    location: str = ""
    website_url: Optional[str] = None
    place_id: Optional[str] = None
    rating: float = 0.0
    review_count: int = 0
    business_type: BusinessType = "unknown"
    is_independent: bool = True
    is_chain: bool = False
    chain_confidence: float = 0.0
    location_count: int = 1
    classification_method: str = ""
    website_exists: bool = False
    rejection_reasons: List[str] = Field(default_factory=list)
    # Enhanced business signals.
    price_level: Optional[int] = None
    photo_count: int = 0
    hours_complete: bool = False
    # Contact discovery fields (populated by contact_discovery node).
    contact_email: Optional[str] = None
    contact_name: Optional[str] = None
    phone: Optional[str] = None
    social_links: List[str] = Field(default_factory=list)
    contact_source: str = "none"
    contactability_score: float = 0.0


# ── Multi-dimensional website audit (NOT a single score) ───────────────
class WebsiteAudit(BaseModel):
    """Captures the analytical surface per dimension. All sub-scores 0-10.

    `overall_website_score` is the mean of the quality dimensions and answers
    'is the site bad?'. `redesign_opportunity` is a SEPARATE judgment that
    answers 'is there leverage to improve it?' — a site can be mediocre but
    have little commercial upside, or be bad but impossible to sell into.
    """

    url: str
    visual_design: float = Field(default=5.0, ge=0.0, le=10.0)
    ux: float = Field(default=5.0, ge=0.0, le=10.0)
    mobile: float = Field(default=5.0, ge=0.0, le=10.0)
    seo: float = Field(default=5.0, ge=0.0, le=10.0)
    performance: float = Field(default=5.0, ge=0.0, le=10.0)
    content: float = Field(default=5.0, ge=0.0, le=10.0)
    branding: float = Field(default=5.0, ge=0.0, le=10.0)

    overall_website_score: float = Field(
        default=0.0, ge=0.0, le=10.0,
        description="Mean of the seven quality dimensions (0-10).",
    )
    redesign_opportunity: float = Field(
        default=5.0, ge=0.0, le=10.0,
        description="Separate 0-10 judgment of how much upside a redesign unlocks.",
    )

    strengths: List[str] = Field(default_factory=list)
    weaknesses: List[str] = Field(default_factory=list)
    redesign_opportunities: List[str] = Field(default_factory=list)
    # Evidence captured for the outreach package.
    before_screenshot: Optional[str] = None
    mobile_screenshot: Optional[str] = None
    audit_notes: str = ""
    audit_method: Literal["llm_vision", "crawl_heuristic", "mock"] = "mock"


# ── Commercial-potential dimensions ────────────────────────────────────
class CommercialScores(BaseModel):
    """Each dimension 0-100. The FINAL score is a weighted composite."""

    business_quality: float = Field(default=50.0, ge=0.0, le=100.0)
    website_quality: float = Field(default=50.0, ge=0.0, le=100.0)
    redesign_opportunity: float = Field(default=50.0, ge=0.0, le=100.0)
    seo_opportunity: float = Field(default=50.0, ge=0.0, le=100.0)
    brand_potential: float = Field(default=50.0, ge=0.0, le=100.0)
    commercial_fit: float = Field(default=50.0, ge=0.0, le=100.0)
    contactability: float = Field(default=50.0, ge=0.0, le=100.0)

    final_lead_score: int = Field(default=0, ge=0, le=100)
    tier: Literal["Priority", "Good prospect", "Maybe", "Reject"] = "Reject"


# ── LeadCandidate — the unified, decision-ready record (per spec) ──────
class LeadCandidate(BaseModel):
    business_name: str
    industry: str = ""
    location: str = ""
    website_url: Optional[str] = None
    business_type: BusinessType = "unknown"
    is_independent: bool = True
    is_chain: bool = False
    chain_confidence: float = 0.0

    website_exists: bool = False
    website_quality_score: float = 0.0  # 0-10
    visual_score: float = 0.0
    ux_score: float = 0.0
    seo_score: float = 0.0
    mobile_score: float = 0.0
    performance_score: float = 0.0
    content_score: float = 0.0
    branding_score: float = 0.0
    overall_website_score: float = 0.0  # 0-10
    redesign_opportunity: float = 0.0  # 0-10

    redesign_opportunities: List[str] = Field(default_factory=list)
    commercial_fit_score: float = 0.0
    contactability_score: float = 0.0
    business_quality_score: float = 0.0
    seo_opportunity_score: float = 0.0
    brand_potential_score: float = 0.0
    icp_similarity_score: float = Field(
        default=0.5,
        description="Cosine similarity to the SmashGuys reference ICP profile (0-1).",
    )

    overall_lead_score: int = 0
    tier: Literal["Priority", "Good prospect", "Maybe", "Reject"] = "Reject"
    rejection_reasons: List[str] = Field(default_factory=list)
    recommended_services: List[str] = Field(default_factory=list)
    decision: Literal["QUALIFY", "REJECT"] = "REJECT"

    # Redesign pipeline tracking.
    redesign_triggered: bool = False
    redesign_job_id: Optional[str] = None

    # Contact info (from contact_discovery node).
    contact_email: Optional[str] = None
    contact_name: Optional[str] = None
    phone: Optional[str] = None
    social_links: List[str] = Field(default_factory=list)

    # Evidence pointers for the outreach package.
    before_screenshot: Optional[str] = None
    mobile_screenshot: Optional[str] = None


# ── Outreach package ───────────────────────────────────────────────────
class OutreachPackage(BaseModel):
    business_name: str
    location: str = ""
    website_url: Optional[str] = None
    contact_email: Optional[str] = None
    contact_name: Optional[str] = None
    lead_profile: str = ""
    audit_summary: str = ""
    before_screenshot: Optional[str] = None
    after_screenshot: Optional[str] = None  # set after demo deploy
    demo_url: Optional[str] = None  # set after redesign_trigger
    email_subject: str = ""
    email_body: str = ""
    status: Literal["draft", "approved", "sent", "rejected"] = "draft"
    human_review_decision: Optional[str] = None
    # Resend tracking.
    message_id: Optional[str] = None
    sent_at: Optional[str] = None


# ── Shared event type for observability ────────────────────────────────
class LeadEvent(BaseModel):
    step: str
    agent: str
    message: str
    level: Literal["info", "warn", "error", "success"] = "info"


# ── Reducer helpers (concurrency-safe shared channels) ─────────────────
def _merge_status(existing: Dict[str, str] | None, update: Dict[str, str] | None) -> Dict[str, str]:
    out = dict(existing or {})
    out.update(update or {})
    return out


def _extend_no_dup(existing: list | None, update: list | None) -> list:
    base = list(existing or [])
    for x in (update or []):
        if x not in base:
            base.append(x)
    return base


def _merge_events(existing: list | None, update: list | None) -> list:
    return (existing or []) + (update or [])


def _last_str(existing: str | None, update: str | None) -> str | None:
    return update if update is not None else existing
