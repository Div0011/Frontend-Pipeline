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
    # Design tokens extracted from raw HTML/CSS (crawl layer).
    raw_design_tokens: Dict[str, List[str]] = Field(
        default_factory=dict,
        description="Concrete tokens from HTML/CSS: {colors: [...], fonts: [...], spacing: [...]}",
    )
    # Design tokens extracted from vision analysis (screenshot layer).
    vision_design_tokens: Dict[str, List[str]] = Field(
        default_factory=dict,
        description="Concrete tokens from vision model: {colors: [...], fonts: [...], spacing: [...], layout_notes: [...]}",
    )


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


class CameraWaypoint(BaseModel):
    """One chapter in a Genre 1 scroll-camera sequence."""
    chapter: int = Field(description="1-indexed chapter number")
    label: str = Field(description="Narrative beat label, e.g. 'Cold open — brand reveal'")
    position: List[float] = Field(
        default_factory=lambda: [0.0, 0.0, 10.0],
        description="Camera [x, y, z] world position",
    )
    look_at: List[float] = Field(
        default_factory=lambda: [0.0, 0.0, 0.0],
        description="Camera look-at [x, y, z] target",
    )
    lighting_mood: str = Field(default="", description="Color temperature + mood for this chapter")
    dom_overlay: str = Field(default="", description="Copy/headline that appears over the 3D scene at this waypoint")


class CreativeDirection(BaseModel):
    # Genre echoed from planner — downstream agents use this to branch implementation.
    genre: str = Field(
        default="genre_0",
        description=(
            "Echoed from TaskPlan.genre. Do not change. "
            "genre_0 = Cinematic Without Generated Media; "
            "genre_1 = Full Scroll-Camera; "
            "genre_2 = Restrained Centerpiece; "
            "genre_2b = Kinetic-Type-Led."
        ),
    )
    art_direction: str = ""
    moodboards: List[Moodboard] = Field(default_factory=list)
    typography_direction: str = ""
    color_system: List[ColorToken] = Field(default_factory=list)
    storytelling: str = ""
    layout_philosophy: str = ""
    visual_hierarchy: str = ""
    interaction_philosophy: str = ""
    design_principles: List[str] = Field(default_factory=list)
    # Cinematic-specific fields
    cinematic_mechanic: str = Field(
        default="",
        description=(
            "The specific named pattern being used, e.g. "
            "'Hubtown single-monolith + mouse-reveal (Genre 2)', "
            "'Year of Greta scroll-camera 5-chapter path (Genre 1)', "
            "'Obys kinetic-type, zero WebGL (Genre 2b)'. "
            "Must cite a reference site, not a generic description."
        ),
    )
    chapter_waypoints: List[CameraWaypoint] = Field(
        default_factory=list,
        description=(
            "Genre 1 only: 4-6 camera waypoints (position + lookAt per chapter). "
            "Engineering consumes this directly as the WAYPOINTS array in CameraRig. "
            "Empty for Genre 2/2b."
        ),
    )
    centerpiece_spec: str = Field(
        default="",
        description=(
            "Genre 2 only: description of the single 3D hero object — geometry, "
            "material, lighting, mouse/scroll-reveal interaction, fallback. "
            "Empty for Genre 1/2b."
        ),
    )
    self_critique: str = Field(
        default="",
        description=(
            "Required: a paragraph stating specifically how each output field "
            "avoids each item on the banned-generic-patterns list, and which "
            "reference site's mechanic grounds the art direction. "
            "If this is empty, the output is invalid."
        ),
    )
    phase1_plan: Optional[Phase1Plan] = Field(
        default=None,
        description=(
            "Required before implementation: structured 10-section plan covering "
            "design rationale, page architecture, component hierarchy, animation timeline, "
            "scroll choreography, state management, asset loading, accessibility, "
            "performance budget, and mobile adaptation. If this is None, implementation is blocked."
        ),
    )


# ── 5b. Phase 1 Implementation Plan ─────────────────────────────────
class Phase1Plan(BaseModel):
    design_rationale: str = Field(
        description="The 'why' behind every intended interaction. Max 300 words."
    )
    page_architecture: str = Field(
        description="High-level structure and flow of the page. Max 200 words."
    )
    component_hierarchy: List[str] = Field(
        default_factory=list,
        description="Breakdown of reusable UI elements. List of component names.",
    )
    animation_timeline: str = Field(
        description="Orchestration of sequences (load → scroll → hover). Max 300 words."
    )
    scroll_choreography: str = Field(
        description="How motion maps to user navigation. Max 200 words."
    )
    state_management_strategy: str = Field(
        description="How complex UI/3D states are handled. Max 200 words."
    )
    asset_loading_strategy: str = Field(
        description="How heavy media/3D assets are loaded. Max 200 words."
    )
    accessibility_plan: str = Field(
        description="How motion and depth do not compromise usability. Max 200 words."
    )
    performance_budget: str = Field(
        description="Targets for frame rates, load times, and memory. Max 200 words."
    )
    mobile_adaptation_strategy: str = Field(
        description="How desktop/canvas experiences translate to touch. Max 200 words."
    )
    notes: Optional[str] = Field(
        default=None,
        description="Optional additional context or constraints.",
    )


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
    waypoints: List[Dict[str, Any]] = Field(
        default_factory=list,
        description="Structured waypoints: [{progress, property, from, to, easing}]",
    )
    timing: Dict[str, Any] = Field(
        default_factory=dict,
        description="Structured timing: {duration, stagger, repeat, yoyo}",
    )


class MotionDesign(BaseModel):
    animations: List[AnimationSpec] = Field(default_factory=list)
    scroll_narrative: str = ""
    cursor_interactions: str = ""
    performance_budget: str = ""
    structured_timeline: List[Dict[str, Any]] = Field(
        default_factory=list,
        description="Ordered sequence of animation events with exact timing values.",
    )
    easing_library: Dict[str, str] = Field(
        default_factory=dict,
        description="Named easing curves mapped to values, e.g. {smooth: 'power3.inOut'}",
    )


# ── 9. Frontend Engineering Agent ────────────────────────────────────
class FileManifestItem(BaseModel):
    path: str = Field(description="Relative file path, e.g. components/marketing/CanvasScrubber.tsx")
    description: str = Field(description="Short description of purpose")


class FileManifest(BaseModel):
    files: List[FileManifestItem] = Field(default_factory=list)


class FileBatchCode(BaseModel):
    files: Dict[str, str] = Field(default_factory=dict, description="Generated file path -> file content")


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
    # 8th dimension — genericness check.
    # < 0.8 alone is sufficient to fail the build and route back to creative_director.
    genericness: float = Field(
        default=0.0,
        description=(
            "How non-generic is the output? 1.0 = distinct, deliberate, citable. "
            "Deduct per detected banned pattern: centered-hero (-0.3), "
            "gradient-blob (-0.3), three-identical-feature-cards (-0.2), "
            "logo-wall (-0.15), generic-fade-in-entrance (-0.2), "
            "genre-mismatch (instant 0.0). Must be >= 0.8 to pass."
        ),
    )
    # 9th dimension — mobile performance.
    mobile_performance: float = Field(
        default=0.0,
        description=(
            "Does the mobile experience preserve motion intent without bloat? "
            "Checks: no overflow, < 2s simulated 3G TTI, scroll-bound animations "
            "use 2D fallbacks (frame sequences / video scrub), no disabled sections. "
            "Must be >= 0.8 to pass."
        ),
    )
    # 10th dimension — scroll reversibility.
    scroll_reversibility: float = Field(
        default=0.0,
        description=(
            "Genre 1 only: scroll backward must retrace the exact camera path. "
            "Genre 2/2b: scroll-bound reveals must reverse smoothly (no IntersectionObserver-only). "
            "Must be >= 0.8 to pass."
        ),
    )


class QaReport(BaseModel):
    passed: bool = False
    overall_score: float = 0.0
    scores: QaScores = Field(default_factory=QaScores)
    issues: List[Issue] = Field(default_factory=list)
    weakest_agent: Optional[str] = None
    recommendation: str = ""
    # Genericness detail — which banned patterns were detected.
    genericness_triggers: List[str] = Field(
        default_factory=list,
        description=(
            "Specific banned patterns detected, e.g. ['centered-hero', 'gradient-blob']. "
            "Populated when genericness < 0.8. Drives targeted rework instructions."
        ),
    )
    # Mobile performance detail — specific mobile failures.
    mobile_triggers: List[str] = Field(
        default_factory=list,
        description=(
            "Specific mobile failures detected, e.g. ['overflow-x', 'no-3d-fallback', 'tti>2s']. "
            "Populated when mobile_performance < 0.8."
        ),
    )
    genre_sync_check: str = Field(
        default="",
        description=(
            "Genre 1 only: confirm that scroll reverses smoothly and that exactly "
            "one Lenis scroll-progress value feeds GSAP + R3F camera + DOM overlays. "
            "'PASS' or a specific failure description."
        ),
    )
    # Targeted rework instructions for the weakest agent.
    rework_instructions: str = Field(
        default="",
        description=(
            "Specific, actionable instructions for the agent receiving the rework. "
            "Reference exact failing checks, file paths, and expected fixes. "
            "Not vague — must be executable without guesswork."
        ),
    )


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
    operation_sequence: List[str] = Field(
        default_factory=list,
        description="Explicit ordered steps this agent performs before producing its output.",
    )
    responsibility: str = Field(
        default="",
        description="Human-readable description of what this agent is responsible for delivering.",
    )
    delegation_routing: List[str] = Field(
        default_factory=list,
        description="Agent IDs that consume this task's output. Used for downstream context routing.",
    )


class TaskPlan(BaseModel):
    """The task graph produced by the Master Orchestrator (planner)."""
    goal: str
    url: Optional[str] = None
    tasks: List[Task] = Field(default_factory=list)
    notes: str = ""
    # Genre classification — set by planner, read by all downstream agents.
    genre: Literal["genre_0", "genre_1", "genre_2", "genre_2b"] = Field(
        default="genre_0",
        description=(
            "genre_0 = Cinematic Without Generated Media (typography/pacing/grading/restraint, no 3D/video); "
            "genre_1 = Full Scroll-Camera (journey/chronology/automotive/heritage); "
            "genre_2 = Restrained Centerpiece (B2B/fintech/corporate/conventional); "
            "genre_2b = Kinetic-Type-Led (editorial/agency, no WebGL). "
            "Default to genre_0 when video/3D unavailable and brief doesn't explicitly require them."
        ),
    )
    genre_rationale: str = Field(
        default="",
        description="1-2 sentences explaining why this genre fits the brief signals.",
    )


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


# ── Schema registry for model caching ────────────────────────────────
_SCHEMA_REGISTRY: dict[str, type[BaseModel]] = {}


def _register_schema(name: str, schema: type[BaseModel]) -> None:
    _SCHEMA_REGISTRY[name] = schema


for _name, _schema in {
    "WebsiteAnalysisOutput": WebsiteAnalysisOutput,
    "SeoReport": SeoReport,
    "BrandDna": BrandDna,
    "LeadReport": LeadReport,
    "CreativeDirection": CreativeDirection,
    "Phase1Plan": Phase1Plan,
    "UxPlan": UxPlan,
    "UiDesign": UiDesign,
    "MotionDesign": MotionDesign,
    "FrontendCode": FrontendCode,
    "QaReport": QaReport,
}.items():
    _register_schema(_name, _schema)
