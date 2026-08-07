"""
Planner agent node.

Builds the task graph with explicit operation sequences, agent
responsibilities, and task-delegation routing.

Topology is fixed & validated in code; the LLM (when enabled) may refine
goal/notes, but dependencies are never trusted to free-form generation —
that is a deliberate reliability choice.
"""

from __future__ import annotations

from pipeline.agents.base import emit
from pipeline.agents.classification import _URL_RE, classify_genre, classify_template
from pipeline.schemas import Task, TaskPlan, TaskStatus
from pipeline.state import RedesignState


def planner(state: RedesignState) -> dict:
    url_match = _URL_RE.search(state.request)
    url = url_match.group(0) if url_match else None
    genre, genre_rationale = classify_genre(state.request, url)

    tasks = [
        Task(
            id="website_analysis", agent="website_analysis", depends_on=[],
            operation_sequence=["crawl_site", "capture_screenshot", "analyze_image", "llm_analysis"],
            responsibility="Crawl the target URL, capture screenshots, run vision analysis, and produce a structured UI/UX audit with detected design tokens.",
            delegation_routing=["seo", "brand_research", "lead_discovery", "creative_director", "ux"],
        ),
        Task(
            id="seo", agent="seo", depends_on=[],
            operation_sequence=["crawl_website", "run_lighthouse", "llm_seo_analysis"],
            responsibility="Analyze SEO structure, meta tags, headings, Core Web Vitals, and accessibility. Produce a prioritized recommendations list.",
            delegation_routing=["creative_director", "engineering", "qa"],
        ),
        Task(
            id="brand_research", agent="brand_research", depends_on=[],
            operation_sequence=["web_search_company", "web_search_competitors", "web_search_reviews", "llm_brand_synthesis"],
            responsibility="Research company overview, competitors, audience, positioning, and brand pillars via web search. Synthesize into Brand DNA.",
            delegation_routing=["lead_discovery", "creative_director", "ux", "ui"],
        ),
        Task(
            id="lead_discovery", agent="lead_discovery", depends_on=["brand_research", "website_analysis"],
            operation_sequence=["web_search_prospects", "score_prospects", "rank_prospects"],
            responsibility="Discover and rank qualified prospects using brand research and website analysis. Deliver a prioritized lead list with personalized pitches.",
            delegation_routing=[],
        ),
        Task(
            id="creative_director", agent="creative_director",
            depends_on=["website_analysis", "seo", "brand_research"],
            operation_sequence=["review_upstream_outputs", "select_genre_mechanic", "define_art_direction", "produce_phase1_plan"],
            responsibility="Synthesize all upstream analysis into a cinematic art direction. Select the genre mechanic, define moodboards/typography/color, and produce the Phase 1 structured implementation plan.",
            delegation_routing=["ux", "ui", "motion", "engineering", "qa"],
        ),
        Task(
            id="ux", agent="ux",
            depends_on=["website_analysis", "brand_research", "creative_director"],
            operation_sequence=["review_creative_direction", "design_sitemap", "define_wireframes", "plan_cta_hierarchy"],
            responsibility="Design the information architecture, sitemap, homepage flow, wireframes, and conversion strategy aligned with the creative direction.",
            delegation_routing=["ui", "motion", "engineering", "qa"],
        ),
        Task(
            id="ui", agent="ui", depends_on=["creative_director", "ux"],
            operation_sequence=["review_creative_and_ux", "define_design_system", "specify_components", "define_responsive_layouts"],
            responsibility="Produce the design system: spacing scale, typography scale, color palette, component specs, and responsive layouts.",
            delegation_routing=["motion", "engineering", "qa"],
        ),
        Task(
            id="motion", agent="motion", depends_on=["creative_director", "ui"],
            operation_sequence=["review_ui_and_creative", "define_animation_specs", "build_structured_timeline", "specify_easing_library"],
            responsibility="Define animation specs, scroll narrative, cursor interactions, structured timeline, and easing library. Must align with UI tokens and creative direction.",
            delegation_routing=["engineering", "qa"],
        ),
        Task(
            id="engineering", agent="engineering",
            depends_on=["ui", "motion", "ux"],
            operation_sequence=["review_all_design_specs", "generate_file_manifest", "implement_components", "implement_animations", "run_tsc_check"],
            responsibility="Generate production-ready Next.js + React + TypeScript code. Implement components, animations, and scroll choreography. Run automated build verification.",
            delegation_routing=["qa"],
        ),
        Task(
            id="qa", agent="qa", depends_on=["engineering"],
            operation_sequence=["review_engineering_output", "score_quality_dimensions", "check_genericness", "check_mobile_performance", "check_scroll_reversibility", "produce_rework_instructions"],
            responsibility="Audit the generated code against 10 quality dimensions including genericness, mobile performance, and scroll reversibility. Produce targeted rework instructions if QA fails.",
            delegation_routing=[],
        ),
    ]
    template_id = classify_template(state.request)
    plan = TaskPlan(
        goal=state.request,
        url=url,
        tasks=tasks,
        notes=f"Standard redesign topology with lead discovery phase. Parallel analysis phase. Cinematic template: {template_id}",
        genre=genre,
        genre_rationale=genre_rationale,
    )
    return {
        "plan": plan,
        "url": url,
        "genre": genre,
        "task_status": {t.id: TaskStatus.pending.value for t in tasks},
        "events": [
            emit(
                "plan",
                "orchestrator",
                f"Planned {len(tasks)} tasks for {url or 'N/A'} as {genre} (template: {template_id})"
            )
        ],
    }
