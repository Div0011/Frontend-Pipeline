"""
Context assembly — the "shared memory" read path.

Each agent only needs a slice of what came before it. ``build_context`` extracts
exactly the upstream outputs a given agent depends on and renders them as
human-readable text for the prompt. This keeps prompts focused and token costs
down, and is the mechanism for agent-to-agent communication.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from pipeline.prompts import render_prompt, get_synthesis_prompt, get_template
from pipeline.state import RedesignState

# North-star references the user wants the redesign to aspire to. These are
# deliberately high-end, opinionated references — the Creative Director and UI
# agents treat them as the caliber of craft to hit, NOT templates to copy.
# Detailed pattern archives for each reference are stored in DESIGN_REFERENCE_ARCHIVE.md.
DESIGN_REFERENCES = """Reference caliber (do NOT clone — match the *craft*, not the pixels):
- https://canals-amsterdam.com/  — immersive editorial storytelling, atmospheric visuals, cinematic pacing, sophisticated color grading
- https://www.snowhouse.studio/year-in-review-2024  — bold year-in-review narrative, project grid with hover reveals, playful SVG illustrations, editorial typography, section dividers, team grids with image cards
- https://sixb-dentaire.fr/  — warm human-centered design, service cards with iconography, professional photography, gentle animations, approachable trust signals
- https://www.loreal.com/en/mediaroom  — luxury corporate editorial, mega-menu sophistication, restrained palette with strategic accents, media-first layouts, premium typography
- https://hadaka.jp/  — Japanese minimalist philosophy, raw creative authenticity, stark contrast, artistic portfolio presentation, intentional negative space, cinematic WITHOUT generated media
- https://www.1-placevendome.com/en/  — ultra-luxury editorial, immersive room showcases paired with curated quotes, crystal/light metaphors, sophisticated serif typography, jewel-tone accents, restraint as luxury signal
- https://history-of-animation.webflow.io/  — scrollytelling mastery, timeline-driven narrative, chapter-based sections, rich illustration integration, educational yet visually stunning progression
- https://gyre-omotesando.com/artandgallery/shibuya/  — Japanese art-gallery minimalism, curator dialogue presentation, exhibition storytelling, artist profile grids with editorial photography
- https://mustsociete.com/  — complex multi-brand mega-menu navigation, seasonal collection storytelling, lifestyle retail sophistication, category-heavy organization
- https://unveranosinti.tilda.ws/  — immersive music album experience, nostalgic summer color palette, playful Spanish typography, fandom-site authenticity, chart/social-proof integration
- https://momw.webflow.io/  — e-commerce hero showcase with lifestyle imagery, trust badge grid, countdown scarcity timers, review carousel social proof, FAQ accordion
- https://whatishoarding.com/  — serious educational tone for mental health, clinical image grids, statistical highlight blocks, awareness-campaign storytelling
- https://www.msport-raptor.com/  — split-screen automotive hero, driver reveal cards, technical specification sections, performance metrics, motorsport energy with engineering precision
- https://www.theo.be/  — playful custom cursor effects (heart trail), brand family navigation with numbered slides, minimalist mega-menu, wishlist growth mechanics, optician store locator
- https://motion.zajno.com/  — motion design education through scrollytelling, interactive before/after animation demos, chapter-based principle breakdowns, technical but visual learning
- https://theyearofgreta.com/  — scroll-bound 3D path timeline, low-poly environmental storytelling, WebGL/Three.js integration, cinematic audio-visual pacing
- https://webflow.com/made-in-webflow/website/vertigo1958  — interactive 3D camera tracking, Spline/Blender scene integration, atmospheric retro-cinema styling, spiral motifs
- https://webflow.com/made-in-webflow/website/imaginastudio-agency-website-l0uy1lj7  — seamless video-morph transitions, film reel scroll effects, high-end editorial layouts, morphing grids
- https://webflow.com/made-in-webflow/website/invisible-moscow-landing  — slow-inertia immersive audio-performance walk, layered multi-plane parallax, narrative-first atmosphere
- https://webflow.com/made-in-webflow/website/kierans-dandy-site  — high-fidelity 3D mechanical models (tracking cars/bikes), custom cursor, horizontal scroll layouts, brutalist editorial structure
- https://obys.agency/  — typography-led editorial motion, kinetic type carrying the entire experience, NO heavy WebGL, restraint as feature, proves type alone can be cinematic

For detailed pattern breakdowns and cross-site innovation recipes, consult DESIGN_REFERENCE_ARCHIVE.md.

Genre 0 rule: when video/3D assets are unavailable, cinematic quality must come from
typography, pacing, grading, and restraint — NOT from a placeholder video or
decorative 3D object. Apply: oversized display typography as structural element;
single consistent CSS-filter grade across all photography; unconventional masking/cropping
on ordinary images; generous negative space (single focal point per screen); custom
easing on every transition (never default ease-in-out); chapter-paced content structure
(cold open → beat → beat → close) even without a literal camera. Test: does the site
feel deliberate and paced, or like a template with animations added? If uncertain,
remove an element rather than add one — restraint is the default lever.

Anti-patterns to reject (these read as "AI-generated"): centered hero with a single
gradient blob, three generic feature cards, a wall of logos, "AI-powered" buzz,
stock-photo testimonials, system-font everything, a safe blue/indigo palette,
and rounded-everything SaaS conventions."""

# ── Cinematic reference slices ────────────────────────────────────────
# Load the full reference file once and slice it into genre-specific chunks
# so each prompt gets only the relevant technical specification, not the
# whole document. This keeps token cost down and grounding specificity high.

_CINEMATIC_REF_PATH = Path(__file__).parent / "CINEMATIC_3D_SCROLL_REFERENCE.md"
_SKILLS_REF_PATH = Path(__file__).parent / "EXTERNAL_SKILLS_REFERENCE.md"

try:
    _CINEMATIC_REF_FULL = _CINEMATIC_REF_PATH.read_text(encoding="utf-8")
except FileNotFoundError:
    _CINEMATIC_REF_FULL = "(CINEMATIC_3D_SCROLL_REFERENCE.md not found)"

try:
    _SKILLS_REF_FULL = _SKILLS_REF_PATH.read_text(encoding="utf-8")
except FileNotFoundError:
    _SKILLS_REF_FULL = "(EXTERNAL_SKILLS_REFERENCE.md not found)"


def _slice_cinematic_reference(genre: str | None) -> str:
    """Return the genre-relevant sections of the cinematic reference.

    Every slice always includes §0 (genre classification), §3 (quality bar),
    §5 (scroll engine + concrete numbers), and §6 (performance budget) since
    those apply to all genres.  The genre-specific mechanic section (§1, §2,
    or §4) is prepended so it appears first for the model.
    """
    full = _CINEMATIC_REF_FULL

    # Extract sections by their h2 headings.
    sections: dict[str, str] = {}
    pattern = re.compile(r"(## \d+\..*?)(?=## \d+\.|\Z)", re.DOTALL)
    for m in pattern.finditer(full):
        heading = m.group(0).split("\n")[0].strip()
        sections[heading] = m.group(0).strip()

    # §0 is before the first numbered heading; grab it separately.
    sec0_match = re.search(r"(## 0\..*?)(?=## 1\.)", full, re.DOTALL)
    sec0 = sec0_match.group(0).strip() if sec0_match else ""

    genre_section_map = {
        "genre_0": "## 9.",
        "genre_1": "## 1.",
        "genre_2": "## 2.",
        "genre_2b": "## 4.",
    }
    always_include = {"## 3.", "## 5.", "## 6.", "## 7.", "## 8."}

    target_prefix = genre_section_map.get(genre or "genre_2", "## 2.")

    parts = [sec0] if sec0 else []
    # Genre-specific section first for prominence.
    for heading, content in sections.items():
        if heading.startswith(target_prefix):
            parts.append(content)
            break
    # Always-included sections.
    for heading, content in sections.items():
        if any(heading.startswith(p) for p in always_include):
            parts.append(content)

    if not parts:
        return full  # Fallback: return everything.
    return "\n\n---\n\n".join(parts)


def _summarize(obj: Any) -> str:
    if obj is None:
        return "(not available yet)"
    if isinstance(obj, str):
        return obj
    if isinstance(obj, dict):
        return "\n".join(f"- {k}: {v}" for k, v in obj.items())
    # Pydantic model -> concise view
    try:
        return obj.model_dump_json(indent=2, exclude_none=True)
    except Exception:
        return str(obj)


# Which upstream outputs each agent consumes.
DEPENDS_ON: dict[str, list[str]] = {
    "website_analysis": [],
    "seo": ["analysis"],
    "brand_research": [],
    "lead_discovery": ["brand", "analysis"],
    "creative_director": ["brand", "analysis", "seo"],
    "ux": ["brand", "creative", "analysis"],
    "ui": ["creative", "ux", "brand"],
    "motion": ["creative", "ui", "ux"],
    "engineering": ["ui", "motion", "ux", "seo", "creative"],
    "qa": ["engineering", "ui", "motion", "seo", "creative"],
}


def build_context(state: RedesignState) -> dict[str, str]:
    """Return rendered placeholder values for the current state."""
    brand = _summarize(state.brand) if state.brand else ""
    analysis = _summarize(state.analysis) if state.analysis else ""
    seo = _summarize(state.seo) if state.seo else ""
    lead = _summarize(state.lead) if state.lead else ""
    creative = _summarize(state.creative) if state.creative else ""
    ux = _summarize(state.ux) if state.ux else ""
    ui = _summarize(state.ui) if state.ui else ""
    motion = _summarize(state.motion) if state.motion else ""
    engineering = _summarize(state.engineering) if state.engineering else ""
    phase1_plan = _summarize(state.phase1_plan) if state.phase1_plan else ""

    # Inject prior brand DNA from long-term store for repeat clients.
    prior_brand = ""
    if state.url and state.brand is None:
        try:
            from pipeline.memory import get_store
            store = get_store()
            brand_key = f"brand:{state.url}"
            result = store.get(namespace=("brand",), key=brand_key)
            if result and result.value:
                prior_brand = _summarize(result.value)
        except Exception:
            pass

    if prior_brand:
        brand = f"## Prior brand DNA (from previous redesign)\n{prior_brand}\n\n## Current research\n{brand}"

    # Genre may come from the top-level channel (set after planner runs) or,
    # if the planner just finished, from plan.genre directly.
    genre = state.genre or (state.plan.genre if state.plan else None) or "genre_0"

    # Try to infer template from request keywords, or default to 'creative_portfolio'
    request_lower = (state.request or "").lower()
    template_id = "creative_portfolio"
    if any(k in request_lower for k in ("saas", "product launch", "b2b", "software", "app")):
        template_id = "saas_product_launch"
    elif any(k in request_lower for k in ("corporate", "institutional", "company", "enterprise")):
        template_id = "corporate_institutional"
    elif any(k in request_lower for k in ("agency", "creative agency", "marketing agency")):
        template_id = "creative_agency"
    elif any(k in request_lower for k in ("product", "e-commerce", "ecommerce", "shop")):
        template_id = "consumer_product_ecommerce"
    elif any(k in request_lower for k in ("minimal", "editorial", "typography-led", "typography led", "no 3d", "no webgl", "restraint", "hadaka", "obys")):
        template_id = "minimal_editorial"

    template = get_template(template_id)
    synthesis_prompt = get_synthesis_prompt(template_id, state.request)

    intent = state.request

    # Inject rework payload if this agent is receiving a QA-targeted rework.
    rework_context = ""
    if state.rework_payload and state.pending_rework:
        rp = state.rework_payload
        rework_context = (
            f"\n\n## QA Rework Payload\n"
            f"You are receiving a targeted rework from QA. "
            f"Failing checks: {rp.get('failing_checks', [])}\n"
            f"Instructions: {rp.get('instructions', '')}"
        )

    return {
        "url": state.url or "",
        "brand": brand,
        "analysis": analysis,
        "seo": seo,
        "lead": lead,
        "creative": creative,
        "ux": ux,
        "ui": ui,
        "motion": motion,
        "engineering": engineering,
        "context": intent,
        "references": DESIGN_REFERENCES,
        # New tokens — genre classification + targeted cinematic reference slice.
        "genre": genre,
        "cinematic_reference": _slice_cinematic_reference(genre),
        # Template-specific synthesis prompts
        "template_id": template_id,
        "template_title": template.get("title", ""),
        "template_creative_direction": template.get("creative_direction", ""),
        "template_ux_philosophy": template.get("ux_philosophy", ""),
        "template_technical_architecture": template.get("technical_architecture", ""),
        "template_motion_system": template.get("motion_system", ""),
        "template_performance_rules": template.get("performance_rules", ""),
        "synthesis_prompt": synthesis_prompt,
        "creative_plan": phase1_plan,
        "rework_context": rework_context,
        "external_skills": _SKILLS_REF_FULL,
    }


def render_agent_prompt(agent: str, state: RedesignState) -> str:
    """Render the agent's system prompt with the context it needs."""
    ctx = build_context(state)
    return render_prompt(agent, **ctx)
