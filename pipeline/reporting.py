"""
Render structured agent outputs into human-readable Markdown reports that get
written to the project's ``reports/`` folder and referenced by the final artifact.
"""

from __future__ import annotations

from typing import Dict

from pipeline.state import RedesignState


def _md(title: str, body: str) -> str:
    return f"# {title}\n\n{body}\n"


def _fmt_value(v: Any) -> str:
    if isinstance(v, dict):
        return "\n".join(f"- {k}: {_fmt_value(vv)}" for k, vv in v.items())
    if isinstance(v, list):
        return "\n".join(f"- {_fmt_value(i)}" for i in v)
    return str(v)


def reports_for_state(state: RedesignState) -> Dict[str, str]:
    out: Dict[str, str] = {}

    if state.analysis:
        a = state.analysis
        out["website_analysis"] = _md(
            "Website Analysis — UI/UX Audit",
            f"**Pages crawled:** {', '.join(a.pages_crawled) or 'n/a'}\n\n"
            f"## UI Audit\n{a.ui_audit}\n\n## UX Audit\n{a.ux_audit}\n\n"
            f"## Weaknesses\n" + "\n".join(f"- {w}" for w in a.weaknesses)
            + f"\n\n**Responsiveness:** {a.responsiveness}\n**Branding:** {a.branding}",
        )

    if state.seo:
        s = state.seo
        out["seo"] = _md(
            "SEO & Performance Report",
            f"## Headings\n{s.headings_analysis}\n\n## Metadata\n{s.metadata}\n\n"
            f"## Semantic HTML\n{s.semantic_html}\n\n## Schema.org\n{s.schema_org}\n\n"
            f"## Core Web Vitals\n" + "\n".join(f"- {k}: {v}" for k, v in s.core_web_vitals.items())
            + f"\n\n## Accessibility\n{s.accessibility}\n\n## Page Speed\n{s.page_speed}\n\n"
            f"## Keyword Opportunities\n" + "\n".join(f"- {k}" for k in s.keyword_opportunities)
            + f"\n\n## Recommendations\n" + "\n".join(f"- {r}" for r in s.recommendations),
        )

    if state.brand:
        b = state.brand
        out["brand"] = _md(
            "Brand DNA",
            f"{b.company_overview}\n\n**Products:** {', '.join(b.products)}\n"
            f"**Competitors:** {', '.join(b.competitors)}\n\n**Audience:** {b.audience}\n\n"
            f"**Positioning:** {b.positioning}\n\n**Messaging:** {b.messaging}\n\n"
            f"**Voice & Tone:** {b.voice_tone}\n\n**Brand Pillars:**\n"
            + "\n".join(f"- {p}" for p in b.brand_pillars)
            + f"\n\n**Visual Directions:**\n" + "\n".join(f"- {v}" for v in b.visual_directions)
            + f"\n\n**Industry Trends:**\n" + "\n".join(f"- {t}" for t in b.industry_trends),
        )

    if state.lead:
        l = state.lead
        out["lead"] = _md(
            "Lead Discovery Report",
            f"**Platforms:** {', '.join(l.source_platforms)}\n\n"
            f"**Prospects found:** {l.total_prospects_found}\n\n"
            f"**Filters:** {l.filter_criteria}\n\n"
            f"## Market Summary\n{l.market_summary}\n\n"
            f"## Top {len(l.top_prospects)} Prospects\n"
            + "\n".join(
                f"### {p.rank}. {p.company_name} — Lead Score: {p.lead_score}\n"
                f"**Website:** {p.website}\n"
                f"**Industry:** {p.industry} | **Location:** {p.location} | **Employees:** {p.employees}\n"
                f"**Maturity:** {p.business_maturity} | **SEO:** {p.seo_score} | **Design:** {p.design_score}\n"
                f"**Pain Points:** " + "; ".join(p.pain_points) + "\n"
                f"**Pitch:** {p.personalized_pitch}\n"
                for p in l.top_prospects
            ),
        )

    if state.creative:
        c = state.creative
        out["creative"] = _md(
            "Creative Direction",
            f"## Art Direction\n{c.art_direction}\n\n## Storytelling\n{c.storytelling}\n\n"
            f"## Typography Direction\n{c.typography_direction}\n\n"
            f"## Layout Philosophy\n{c.layout_philosophy}\n\n"
            f"## Visual Hierarchy\n{c.visual_hierarchy}\n\n"
            f"## Interaction Philosophy\n{c.interaction_philosophy}\n\n"
            f"## Design Principles\n" + "\n".join(f"- {p}" for p in c.design_principles)
            + "\n\n## Moodboards\n"
            + "\n".join(f"### {m.title}\n{m.rationale}\n" for m in c.moodboards),
        )

    if state.ux:
        u = state.ux
        out["ux"] = _md(
            "UX Plan",
            f"## Sitemap\n" + "\n".join(f"- {s}" for s in u.sitemap)
            + f"\n\n## Information Architecture\n{u.information_architecture}\n\n"
            f"## Homepage Flow\n{u.homepage_flow}\n\n## CTA Hierarchy\n{u.cta_hierarchy}\n\n"
            f"## Conversion Strategy\n{u.conversion_strategy}\n\n## Wireframes\n"
            + "\n".join(f"### {w.name}\n{w.purpose}\nCTA: {w.cta or 'n/a'}\n" for w in u.wireframes),
        )

    if state.ui:
        d = state.ui
        out["ui"] = _md(
            "UI Design System",
            _fmt_value(d.design_system) + "\n\n## Spacing\n"
            + "\n".join(f"- {k}: {_fmt_value(v)}" for k, v in d.spacing_system.items())
            + f"\n\n## Color Palette\n"
            + "\n".join(f"- {c.name}: {c.hex} ({c.role})" for c in d.color_palette)
            + f"\n\n## Components\n"
            + "\n".join(f"### {c.name}\n{c.description}\nVariants: {', '.join(c.variants)}\n" for c in d.components)
            + f"\n\n## Responsive Layouts\n{_fmt_value(d.responsive_layouts)}",
        )

    if state.motion:
        m = state.motion
        out["motion"] = _md(
            "Motion & Interaction Design",
            f"## Scroll Narrative\n{m.scroll_narrative}\n\n## Cursor Interactions\n{m.cursor_interactions}\n\n"
            f"## Performance Budget\n{m.performance_budget}\n\n## Animations\n"
            + "\n".join(f"### {a.name} ({a.library}/{a.trigger})\n{a.description}\n" for a in m.animations),
        )

    if state.engineering:
        e = state.engineering
        out["engineering"] = _md(
            "Frontend Engineering",
            f"**Stack:** {e.stack}\n\n{e.notes}\n\n## Files\n"
            + "\n".join(f"- `{p}`" for p in e.files.keys())
            + f"\n\n## Build\n{e.build_instructions}",
        )

    if state.qa:
        q = state.qa
        out["qa"] = _md(
            "QA Report",
            f"**Passed:** {q.passed} — **Score:** {q.overall_score}\n\n"
            f"## Scores\n" + "\n".join(f"- {k}: {v}" for k, v in q.scores.model_dump().items())
            + f"\n\n## Issues\n"
            + "\n".join(f"- [{i.severity.value}] {i.agent}: {i.title} — {i.recommendation}" for i in q.issues)
            + f"\n\n{q.recommendation}",
        )

    return out


def render_design_brief(state: RedesignState) -> str:
    goal = state.plan.goal if state.plan else state.request
    creative = state.creative.art_direction if state.creative else ""
    qa = f"QA score: {state.qa.overall_score} (passed={state.qa.passed})" if state.qa else ""
    return (
        f"# Redesign Brief\n\n**Goal:** {goal}\n\n"
        f"**Art Direction:** {creative}\n\n{qa}\n\n"
        "Generated autonomously by the Multi-Agent Website Redesign Platform."
    )
