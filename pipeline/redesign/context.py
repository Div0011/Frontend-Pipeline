"""
Context assembly — the "shared memory" read path.

Each agent only needs a slice of what came before it. ``build_context`` extracts
exactly the upstream outputs a given agent depends on and renders them as
human-readable text for the prompt. This keeps prompts focused and token costs
down, and is the mechanism for agent-to-agent communication.
"""

from __future__ import annotations

from typing import Any

from redesign.prompts import render_prompt
from redesign.state import RedesignState

# North-star references the user wants the redesign to aspire to. These are
# deliberately high-end, opinionated references — the Creative Director and UI
# agents treat them as the caliber of craft to hit, NOT templates to copy.
# Detailed pattern archives for each reference are stored in DESIGN_REFERENCE_ARCHIVE.md.
DESIGN_REFERENCES = """Reference caliber (do NOT clone — match the *craft*, not the pixels):
- https://canals-amsterdam.com/  — immersive editorial storytelling, atmospheric visuals, cinematic pacing, sophisticated color grading
- https://www.snowhouse.studio/year-in-review-2024  — bold year-in-review narrative, project grid with hover reveals, playful SVG illustrations, editorial typography, section dividers, team grids with image cards
- https://sixb-dentaire.fr/  — warm human-centered design, service cards with iconography, professional photography, gentle animations, approachable trust signals
- https://www.loreal.com/en/mediaroom  — luxury corporate editorial, mega-menu sophistication, restrained palette with strategic accents, media-first layouts, premium typography
- https://hadaka.jp/  — Japanese minimalist philosophy, raw creative authenticity, stark contrast, artistic portfolio presentation, intentional negative space
- https://www.1-placevendome.com/en/  — ultra-luxury editorial, immersive room showcases paired with curated quotes, crystal/light metaphors, sophisticated serif typography, jewel-tone accents
- https://history-of-animation.webflow.io/  — scrollytelling mastery, timeline-driven narrative, chapter-based sections, rich illustration integration, educational yet visually stunning progression
- https://gyre-omotesando.com/artandgallery/shibuya/  — Japanese art-gallery minimalism, curator dialogue presentation, exhibition storytelling, artist profile grids with editorial photography
- https://mustsociete.com/  — complex multi-brand mega-menu navigation, seasonal collection storytelling, lifestyle retail sophistication, category-heavy organization
- https://unveranosinti.tilda.ws/  — immersive music album experience, nostalgic summer color palette, playful Spanish typography, fandom-site authenticity, chart/social-proof integration
- https://momw.webflow.io/  — e-commerce hero showcase with lifestyle imagery, trust badge grid, countdown scarcity timers, review carousel social proof, FAQ accordion
- https://whatishoarding.com/  — serious educational tone for mental health, clinical image grids, statistical highlight blocks, awareness-campaign storytelling
- https://www.msport-raptor.com/  — split-screen automotive hero, driver reveal cards, technical specification sections, performance metrics, motorsport energy with engineering precision
- https://www.theo.be/  — playful custom cursor effects (heart trail), brand family navigation with numbered slides, minimalist mega-menu, wishlist growth mechanics, optician store locator
- https://motion.zajno.com/  — motion design education through scrollytelling, interactive before/after animation demos, chapter-based principle breakdowns, technical but visual learning

For detailed pattern breakdowns and cross-site innovation recipes, consult DESIGN_REFERENCE_ARCHIVE.md.

Anti-patterns to reject (these read as "AI-generated"): centered hero with a single
gradient blob, three generic feature cards, a wall of logos, "AI-powered" buzz,
stock-photo testimonials, system-font everything, a safe blue/indigo palette,
and rounded-everything SaaS conventions."""


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

    intent = state.request
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
    }


def render_agent_prompt(agent: str, state: RedesignState) -> str:
    """Render the agent's system prompt with the context it needs."""
    ctx = build_context(state)
    return render_prompt(agent, **ctx)
