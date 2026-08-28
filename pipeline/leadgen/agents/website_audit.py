"""
Website Audit node — crawl + multi-dimensional audit -> WebsiteAudit.

For each non-rejected candidate WITH a website we:
  1. Crawl it (real: httpx/BeautifulSoup; mock: skip).
  2. Capture desktop + mobile screenshots (real: Playwright; mock: None).
  3. Score 7 dimensions (visual / ux / mobile / seo / performance / content /
     branding) PLUS a separate `redesign_opportunity` judgment.

Crucially we do NOT collapse this to one number here — the scorer handles the
composite. In simulation mode we produce deterministic mock scores derived from
the business name so the run is reproducible and testable.
"""

from __future__ import annotations

import hashlib
import logging

from pipeline.leadgen.agents.base import emit, finalize, use_live_tools, call_lead_agent
from pipeline.leadgen.config import get_leadgen_settings
from pipeline.leadgen.schemas import CandidateLead, WebsiteAudit

logger = logging.getLogger("pipeline.leadgen.agents.audit")

_SETTINGS = None


def _settings():
    global _SETTINGS
    if _SETTINGS is None:
        _SETTINGS = get_leadgen_settings()
    return _SETTINGS


def _mock_audit(c: CandidateLead) -> WebsiteAudit:
    """Deterministic mock audit. Stable across runs for the same business."""
    h = int(hashlib.sha256(c.business_name.encode()).hexdigest(), 16)
    # quality float in [0,1): most independents are weak; a few are strong.
    quality = (h % 1000) / 1000.0
    # Push most independents low (good opportunity), ~15% high (reject: strong site).
    if quality > 0.85:
        base = 8.5 + (quality - 0.85) * 10  # 8.5–9.5 (exceptionally strong)
        opportunity = 2.0 + (1 - quality) * 2
    else:
        base = 2.5 + quality * 5.5  # 2.5–8.0 (mostly weak)
        opportunity = 7.5 + (1 - quality) * 2.5
    audit = WebsiteAudit(
        url=c.website_url or "",
        visual_design=round(min(10.0, base + 0.3), 1),
        ux=round(min(10.0, base - 0.4), 1),
        mobile=round(min(10.0, base - 0.8), 1),
        seo=round(min(10.0, base - 1.2), 1),
        performance=round(min(10.0, base + 0.2), 1),
        content=round(min(10.0, base - 0.2), 1),
        branding=round(min(10.0, base - 0.6), 1),
        redesign_opportunity=round(min(10.0, opportunity), 1),
        audit_method="mock",
        audit_notes="Deterministic mock audit (no LLM). Scores derived from business name hash.",
    )
    if base >= 8.5:
        audit.weaknesses = ["Very polished existing site — little upside to sell"]
        audit.redesign_opportunities = []
        audit.strengths = ["Strong visual identity", "Clear navigation", "Good performance"]
    else:
        audit.weaknesses = [
            "Outdated visual design",
            "Weak mobile experience",
            "Poor local SEO / no schema",
            "Generic typography",
            "No clear online-ordering CTA",
        ]
        audit.redesign_opportunities = [
            "homepage redesign",
            "mobile UX",
            "local SEO",
            "online-ordering CTA",
            "brand storytelling",
        ]
    return audit


def _real_audit(c: CandidateLead) -> WebsiteAudit:
    """Real crawl + Lighthouse + (optional) vision audit."""
    from pipeline.tools import capture_screenshot
    from pipeline.config import get_settings
    from pipeline.leadgen.tools.crawler import crawl, format_for_audit as crawl_fmt
    from pipeline.leadgen.tools.lighthouse import audit as lh_audit, format_for_audit as lh_fmt
    from pipeline.leadgen.tools.lighthouse import performance_score_to_10, seo_score_to_10

    url = c.website_url
    # Crawl via Firecrawl (falls back to httpx if no key).
    crawl_result = crawl(url)
    crawl_context = crawl_fmt(crawl_result)

    # Lighthouse / PageSpeed — hard performance numbers.
    lh_result = lh_audit(url, strategy="mobile")
    lh_context = lh_fmt(lh_result)

    # Screenshots via Playwright (if enabled).
    shots = (
        capture_screenshot(url, c.business_name)
        if get_settings().enable_playwright
        else {"desktop": None, "mobile": None}
    )

    live = (
        f"{crawl_context}\n\n"
        f"{lh_context}\n\n"
        f"Contact page found: {crawl_result.has_contact_page}\n"
        f"Online ordering found: {crawl_result.has_online_ordering}\n"
        f"Menu page found: {crawl_result.has_menu_page}\n"
        f"Schema types: {', '.join(crawl_result.schema_types) or 'none'}\n"
        f"Images without alt: {crawl_result.images_without_alt}/{crawl_result.image_count}"
    )

    audit = call_lead_agent("audit", None, WebsiteAudit, live_context=live)
    audit.url = url
    audit.before_screenshot = shots.get("desktop")
    audit.mobile_screenshot = shots.get("mobile")
    audit.audit_method = "llm_vision"

    # Override performance and SEO with hard Lighthouse numbers when available.
    perf_hard = performance_score_to_10(lh_result)
    seo_hard = seo_score_to_10(lh_result)
    if perf_hard is not None:
        audit.performance = perf_hard
    if seo_hard is not None:
        # Blend: 60% Lighthouse hard score + 40% LLM judgment (content quality, etc.)
        audit.seo = round(0.6 * seo_hard + 0.4 * audit.seo, 1)

    return audit


def website_audit(state) -> dict:
    audits: dict[str, WebsiteAudit] = {}
    processed = 0
    skipped_no_site = 0

    for c in state.candidates:
        if c.rejection_reasons:
            continue
        if not c.website_exists or not c.website_url:
            skipped_no_site += 1
            continue
        try:
            audit = _real_audit(c) if use_live_tools() else _mock_audit(c)
        except Exception as exc:
            logger.warning("audit failed for %s: %s", c.business_name, exc)
            audit = _mock_audit(c)
        audits[c.business_name] = audit
        processed += 1

    return {
        **finalize("website_audit"),
        "audits": audits,
        "stats": {"audited": processed, "audit_skipped_no_site": skipped_no_site},
        "events": [emit("website_audit", "website_audit",
                        f"Audited {processed} websites ({skipped_no_site} skipped — no site).", "info")],
    }
