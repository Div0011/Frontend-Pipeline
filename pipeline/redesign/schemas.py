"""
Typed contracts for the platform.

These Pydantic models serve three purposes:
  1. **Structured outputs** — every agent returns a validated, strongly-typed
     object (LangGraph `with_structured_output`), eliminating free-form text
     drift between agents.
  2. **Shared memory** — each agent's output lives in the graph state under a
     dedicated channel; downstream agents read it as context.
  3. **Persistence** — these models are what we serialize to PostgreSQL and the
     long-term LangGraph Store.
"""

from __future__ import annotations

from enum import Enum
from typing import Annotated, Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field

from langgraph.graph.message import add_messages


# ── Small shared value objects ────────────────────────────────────────
class Severity(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


class Issue(BaseModel):
    agent: str = Field(description="Agent responsible for the defect.")
    severity: Severity = Severity.medium
    title: str
    detail: str = ""
    recommendation: str = ""


class ColorToken(BaseModel):
    name: str
    hex: str
    role: str = Field(description="e.g. background, accent, text, surface")


class TypeToken(BaseModel):
    name: str
    family: str
    usage: str
    weight: str = "400"


# ── 2. Website Analysis Agent ────────────────────────────────────────
class WebsiteAnalysisOutput(BaseModel):
    pages_crawled: List[str] = Field(default_factory=list)
    desktop_screenshot: Optional[str] = None
    mobile_screenshot: Optional[str] = None
    detected_colors: List[ColorToken] = Field(default_factory=list)
    detected_typography: List[TypeToken] = Field(default_factory=list)
    spacing_system: Dict[str, str] = Field(default_factory=dict)
    navigation: str = ""
    branding: str = ""
    content_hierarchy: str = ""
    responsiveness: str = ""
    ui_audit: str = ""
    ux_audit: str = ""
    weaknesses: List[str] = Field(default_factory=list)


# ── 3. SEO Agent ─────────────────────────────────────────────────────
class SeoReport(BaseModel):
    headings_analysis: str = ""
    metadata: str = ""
    semantic_html: str = ""
    schema_org: str = ""
    core_web_vitals: Dict[str, str] = Field(default_factory=dict)
    accessibility: str = ""
    page_speed: str = ""
    keyword_opportunities: List[str] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)


# ── 4. Brand Research Agent ──────────────────────────────────────────
class BrandDna(BaseModel):
    company_overview: str = ""
    products: List[str] = Field(default_factory=list)
    competitors: List[str] = Field(default_factory=list)
    audience: str = ""
    positioning: str = ""
    messaging: str = ""
    brand_pillars: List[str] = Field(default_factory=list)
    voice_tone: str = ""
    visual_directions: List[str] = Field(default_factory=list)
    industry_trends: List[str] = Field(default_factory=list)


# ── 5. Creative Director Agent ───────────────────────────────────────
class Moodboard(BaseModel):
    title: str
    references: List[str] = Field(default_factory=list)
    rationale: str = ""


class CreativeDirection(BaseModel):
    art_direction: str = ""
    moodboards: List[Moodboard] = Field(default_factory=list)
    typography_direction: str = ""
    color_system: List[ColorToken] = Field(default_factory=list)
    storytelling: str = ""
    layout_philosophy: str = ""
    visual_hierarchy: str = ""
    interaction_philosophy: str = ""
    design_principles: List[str] = Field(default_factory=list)


# ── 6. UX Agent ──────────────────────────────────────────────────────
class WireframeSection(BaseModel):
    name: str
    purpose: str
    content_blocks: List[str] = Field(default_factory=list)
    cta: Optional[str] = None


class UxPlan(BaseModel):
    sitemap: List[str] = Field(default_factory=list)
    information_architecture: str = ""
    homepage_flow: str = ""
    wireframes: List[WireframeSection] = Field(default_factory=list)
    cta_hierarchy: str = ""
    conversion_strategy: str = ""


# ── 7. UI Design Agent ───────────────────────────────────────────────
class ComponentSpec(BaseModel):
    name: str
    description: str = ""
    variants: List[str] = Field(default_factory=list)


class UiDesign(BaseModel):
    design_system: dict = Field(default_factory=dict, description="Design system rules and tokens")
    spacing_system: Dict[str, Any] = Field(default_factory=dict, description="4pt-based spacing scale")
    typography_scale: List[TypeToken] = Field(default_factory=list)
    color_palette: List[ColorToken] = Field(default_factory=list)
    components: List[ComponentSpec] = Field(default_factory=list)
    responsive_layouts: list = Field(default_factory=list, description="Breakpoint layout descriptions")


# ── 8. Motion Design Agent ───────────────────────────────────────────
class AnimationSpec(BaseModel):
    name: str
    trigger: str = Field(description="scroll | hover | load | cursor")
    library: str = Field(description="gsap | framer-motion | lenis | css")
    description: str = ""
    performance_budget_ms: int = 16


class MotionDesign(BaseModel):
    animations: List[AnimationSpec] = Field(default_factory=list)
    scroll_narrative: str = ""
    cursor_interactions: str = ""
    performance_budget: str = ""


# ── 9. Frontend Engineering Agent ────────────────────────────────────
class FrontendCode(BaseModel):
    stack: str = "Next.js + React + TypeScript + Tailwind CSS + GSAP + Framer Motion + Lenis + Three.js + @react-three/fiber + @react-three/drei"
    files: Dict[str, str] = Field(
        default_factory=dict,
        description="Map of file path -> file contents for the generated site.",
    )
    notes: str = ""
    build_instructions: str = ""


# ── 10. QA Agent ─────────────────────────────────────────────────────
class QaScores(BaseModel):
    responsiveness: float = 0.0
    lighthouse: float = 0.0
    accessibility: float = 0.0
    seo: float = 0.0
    performance: float = 0.0
    animation: float = 0.0
    consistency: float = 0.0


class QaReport(BaseModel):
    passed: bool = False
    overall_score: float = 0.0
    scores: QaScores = Field(default_factory=QaScores)
    issues: List[Issue] = Field(default_factory=list)
    weakest_agent: Optional[str] = None
    recommendation: str = ""


# ── 11. Lead Discovery Agent ───────────────────────────────────────────
class LeadProspect(BaseModel):
    rank: int = Field(description="Ranking 1-20 within this prospect list")
    company_name: str = Field(description="Legal / trading name")
    website: str = Field(description="Homepage URL")
    industry: str = Field(description="Primary industry vertical")
    location: str = Field(description="HQ city/country or remote")
    employees: str = Field(description="Estimated headcount band, e.g. 51-200")
    revenue_band: str = Field(description="Estimated revenue band if available")
    business_maturity: str = Field(description="Startup / Growth / Enterprise / Legacy")
    seo_score: float = Field(description="0-100 SEO health score")
    design_score: float = Field(description="0-100 design/UX quality score")
    lead_score: float = Field(description="0-100 composite lead score")
    score_breakdown: str = Field(description="1-2 sentence rationale for the lead score")
    pain_points: List[str] = Field(default_factory=list, description="Identified website/brand weaknesses")
    personalized_pitch: str = Field(description="1 paragraph personalized redesign proposal")


class LeadReport(BaseModel):
    source_platforms: List[str] = Field(default_factory=list, description="Data sources used, e.g. Google Maps, LinkedIn, Clutch, Crunchbase")
    total_prospects_found: int = Field(description="Total companies discovered before ranking")
    filter_criteria: str = Field(description="Keywords, geography, and filters applied")
    top_prospects: List[LeadProspect] = Field(default_factory=list, description="Top 20 ranked prospects")
    market_summary: str = Field(description="2-3 sentence summary of the addressable market")


# ── Planning / orchestration ─────────────────────────────────────────
class TaskStatus(str, Enum):
    pending = "pending"
    running = "running"
    done = "done"
    failed = "failed"


class Task(BaseModel):
    id: str
    agent: str
    depends_on: List[str] = Field(default_factory=list)
    required: bool = True


class TaskPlan(BaseModel):
    """The task graph produced by the Master Orchestrator (planner)."""
    goal: str
    url: Optional[str] = None
    tasks: List[Task] = Field(default_factory=list)
    notes: str = ""


class Event(BaseModel):
    step: str
    agent: str
    message: str
    level: Literal["info", "warn", "error", "success"] = "info"
    data: Dict[str, Any] = Field(default_factory=dict)


# ── Final deliverable ────────────────────────────────────────────────
class FinalArtifact(BaseModel):
    project_id: str
    url: Optional[str]
    summary: str
    design_brief: str
    artifacts_path: str
    file_manifest: List[str] = Field(default_factory=list)
    qa_score: float = 0.0
    reports: Dict[str, str] = Field(default_factory=dict)


# ── Reducer helpers for shared, concurrency-safe channels ────────────
def _merge_status(existing: Dict[str, str] | None, update: Dict[str, str] | None) -> Dict[str, str]:
    out = dict(existing or {})
    out.update(update or {})
    return out


def _extend_no_dup(existing: List[str] | None, update: List[str] | None) -> List[str]:
    base = list(existing or [])
    for x in (update or []):
        if x not in base:
            base.append(x)
    return base


def _merge_events(existing: List[Event] | None, update: List[Event] | None) -> List[Event]:
    return (existing or []) + (update or [])


def _last_str(existing: str | None, update: str | None) -> str | None:
    """Reducer for ``last_completed``.

    Several agents can finish in the *same* super-step (parallel fan-out), so the
    channel must accept multiple writes and keep the most recent non-null one
    instead of raising LangGraph's 'only one value per step' error.
    """
    return update if update is not None else existing
