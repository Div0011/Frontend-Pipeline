"""
The ten specialist agent nodes + the Master Orchestrator planner.

Each node is a LangGraph-compatible ``(state) -> update`` function. They are
deliberately thin: context assembly, tool use and the structured-LLM call all
live in :mod:`redesign.agents.base`.
"""

from __future__ import annotations

import logging
import re
from typing import Any

from redesign.agents.base import (
    call_agent_model,
    emit,
    finalize,
    use_live_tools,
)
from redesign.schemas import (
    BrandDna,
    CreativeDirection,
    FrontendCode,
    LeadReport,
    MotionDesign,
    QaReport,
    SeoReport,
    Task,
    TaskPlan,
    TaskStatus,
    UxPlan,
    WebsiteAnalysisOutput,
    UiDesign,
)
from redesign.state import RedesignState
from redesign.tools import (
    analyze_image,
    capture_screenshot,
    crawl_website,
    crawl_site,
    run_lighthouse,
    web_search,
)

logger = logging.getLogger("redesign.agents")

_URL_RE = re.compile(r"https?://[^\s'\"]+")


# ── Master Orchestrator: planner ─────────────────────────────────────
def planner(state: RedesignState) -> dict:
    """Build the task graph. Topology is fixed & validated in code; the LLM
    (when enabled) may refine goal/notes, but dependencies are never trusted to
    free-form generation — that is a deliberate reliability choice."""
    url_match = _URL_RE.search(state.request)
    url = url_match.group(0) if url_match else None

    tasks = [
        Task(id="website_analysis", agent="website_analysis", depends_on=[]),
        Task(id="seo", agent="seo", depends_on=[]),
        Task(id="brand_research", agent="brand_research", depends_on=[]),
        Task(id="lead_discovery", agent="lead_discovery", depends_on=["brand_research", "website_analysis"]),
        Task(id="creative_director", agent="creative_director",
             depends_on=["website_analysis", "seo", "brand_research"]),
        Task(id="ux", agent="ux",
             depends_on=["website_analysis", "brand_research", "creative_director"]),
        Task(id="ui", agent="ui", depends_on=["creative_director", "ux"]),
        Task(id="motion", agent="motion", depends_on=["creative_director", "ui"]),
        Task(id="engineering", agent="engineering",
             depends_on=["ui", "motion", "ux"]),
        Task(id="qa", agent="qa", depends_on=["engineering"]),
    ]
    plan = TaskPlan(goal=state.request, url=url, tasks=tasks,
                    notes="Standard redesign topology with lead discovery phase. Parallel analysis phase.")
    return {
        "plan": plan,
        "url": url,
        "task_status": {t.id: TaskStatus.pending.value for t in tasks},
        "events": [emit("plan", "orchestrator", f"Planned {len(tasks)} tasks for {url or 'N/A'}")],
    }


# ── 2. Website Analysis ──────────────────────────────────────────────
def website_analysis(state: RedesignState) -> dict:
    live = ""
    if use_live_tools() and state.url:
        # Read the ENTIRE site (homepage + followed internal links).
        site = crawl_site(state.url, max_pages=8)
        crawl = site.pages[0] if site.pages else None
        shots = capture_screenshot(state.url, state.project_id)
        live = f"Whole-site crawl: {site.pages_crawled} pages from {state.url}\n"
        if crawl:
            live += f"Home title: {crawl.get('title', '')!r}\n"
        live += f"Site summary (all pages):\n{site.summary()}\n"
        live += f"Screenshots: {shots}\n"
        if shots.get("desktop"):
            live += "Vision: " + analyze_image(shots["desktop"])
    out = call_agent_model("website_analysis", state, WebsiteAnalysisOutput, live)
    return finalize("website_analysis", state, "analysis", out,
                    emit("analyze", "website_analysis", "UI/UX audit complete"))


# ── 3. SEO ───────────────────────────────────────────────────────────
def seo(state: RedesignState) -> dict:
    live = ""
    if use_live_tools() and state.url:
        crawl = crawl_website(state.url)
        lh = run_lighthouse(state.url)
        live = f"Title: {crawl.title!r}\nMeta: {crawl.meta}\n"
        live += f"h1 count: {len(crawl.headings.get('h1', []))}\n"
        live += f"Lighthouse: {lh}\n"
    out = call_agent_model("seo", state, SeoReport, live)
    return finalize("seo", state, "seo", out,
                    emit("seo", "seo", "SEO & performance report complete"))


# ── 4. Brand Research ────────────────────────────────────────────────
def brand_research(state: RedesignState) -> dict:
    live = ""
    if use_live_tools():
        queries = [f"{state.url or state.request} company overview",
                   f"{state.url or ''} competitors", f"{state.url or ''} reviews"]
        for q in queries:
            res = web_search(q)
            for r in res.results:
                live += f"- {r.get('title')}: {r.get('snippet')}\n"
    out = call_agent_model("brand_research", state, BrandDna, live)
    return finalize("brand_research", state, "brand", out,
                    emit("research", "brand_research", "Brand DNA compiled"))


# ── 4b. Lead Discovery ───────────────────────────────────────────────
def lead_discovery(state: RedesignState) -> dict:
    live = ""
    if use_live_tools():
        queries = [
            f"{state.brand.industry_trends[0] if state.brand and state.brand.industry_trends else 'business'} companies {state.url or ''}",
            f"{state.brand.competitors[0] if state.brand and state.brand.competitors else 'startups'} LinkedIn",
            f"{state.brand.competitors[0] if state.brand and state.brand.competitors else 'agencies'} Clutch.co",
            f"{state.brand.competitors[0] if state.brand and state.brand.competitors else 'startups'} Crunchbase",
        ]
        for q in queries:
            res = web_search(q)
            for r in res.results:
                live += f"- {r.get('title')}: {r.get('snippet')}\n"
    out = call_agent_model("lead_discovery", state, LeadReport, live)
    return finalize("lead_discovery", state, "lead", out,
                    emit("lead", "lead_discovery", "Lead discovery complete"))


# ── 5. Creative Director ─────────────────────────────────────────────
def creative_director(state: RedesignState) -> dict:
    out = call_agent_model("creative_director", state, CreativeDirection)
    return finalize("creative_director", state, "creative", out,
                    emit("direct", "creative_director", "Art direction defined"))


# ── 6. UX ────────────────────────────────────────────────────────────
def ux(state: RedesignState) -> dict:
    out = call_agent_model("ux", state, UxPlan)
    return finalize("ux", state, "ux", out,
                    emit("ux", "ux", "Sitemap, IA & wireframes complete"))


# ── 7. UI Design ─────────────────────────────────────────────────────
def ui(state: RedesignState) -> dict:
    out = call_agent_model("ui", state, UiDesign)
    return finalize("ui", state, "ui", out,
                    emit("ui", "ui", "Design system complete"))


# ── 8. Motion Design ─────────────────────────────────────────────────
def motion(state: RedesignState) -> dict:
    out = call_agent_model("motion", state, MotionDesign)
    return finalize("motion", state, "motion", out,
                    emit("motion", "motion", "Motion & interaction spec complete"))


# ── 9. Frontend Engineering ──────────────────────────────────────────
def engineering(state: RedesignState) -> dict:
    out = call_agent_model("engineering", state, FrontendCode)
    return finalize("engineering", state, "engineering", out,
                    emit("build", "engineering", "Production code generated"))


# ── 10. QA ───────────────────────────────────────────────────────────
def qa(state: RedesignState) -> dict:
    out = call_agent_model("qa", state, QaReport)
    level = "success" if out.passed else "warn"
    return finalize(
        "qa", state, "qa", out,
        emit("qa", "qa", f"QA {'passed' if out.passed else 'failed'} "
             f"(score {out.overall_score})", level),
    )


ALL_AGENT_NODES = {
    "website_analysis": website_analysis,
    "seo": seo,
    "brand_research": brand_research,
    "lead_discovery": lead_discovery,
    "creative_director": creative_director,
    "ux": ux,
    "ui": ui,
    "motion": motion,
    "engineering": engineering,
    "qa": qa,
}
