"""
Lighthouse / PageSpeed Insights audit tool.

Primary: Google PageSpeed Insights API (no install, just a key).
Fallback: lighthouse CLI (requires Node.js + lighthouse npm package).
Emergency fallback: returns None (audit continues without perf data).

Sets the `performance` and part of the `seo` audit dimensions with
hard, verifiable numbers instead of LLM guesses.

PageSpeed API docs: https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed
"""

from __future__ import annotations

import json
import logging
import os
import shutil
import subprocess
import tempfile
from dataclasses import dataclass, field
from typing import Dict, List, Optional

import httpx

from pipeline.leadgen.config import get_leadgen_settings

logger = logging.getLogger("pipeline.leadgen.tools.lighthouse")

_PSI_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"


@dataclass
class LighthouseResult:
    url: str
    # Core Web Vitals
    lcp_ms: Optional[float] = None         # Largest Contentful Paint
    fcp_ms: Optional[float] = None         # First Contentful Paint
    cls_score: Optional[float] = None      # Cumulative Layout Shift
    tbt_ms: Optional[float] = None         # Total Blocking Time
    speed_index_ms: Optional[float] = None
    # Category scores 0-100
    performance_score: Optional[int] = None
    seo_score: Optional[int] = None
    accessibility_score: Optional[int] = None
    best_practices_score: Optional[int] = None
    # Specific audit failures (human-readable)
    failed_audits: List[str] = field(default_factory=list)
    # Mobile vs desktop
    strategy: str = "mobile"
    source: str = "pagespeed"
    error: Optional[str] = None


def _has_psi_key() -> bool:
    s = get_leadgen_settings()
    return bool(getattr(s, "google_places_api_key", None))  # reuse the GCP key


def _psi_key() -> str:
    return get_leadgen_settings().google_places_api_key or ""


def _score_to_100(v) -> Optional[int]:
    if v is None:
        return None
    return int(round(float(v) * 100))


def _ms(v) -> Optional[float]:
    if v is None:
        return None
    # PSI returns numeric_value in milliseconds already.
    return round(float(v), 0)


def _run_pagespeed(url: str, strategy: str = "mobile") -> LighthouseResult:
    """Call Google PageSpeed Insights API."""
    params = {
        "url": url,
        "strategy": strategy,
        "category": ["performance", "seo", "accessibility", "best-practices"],
    }
    if _has_psi_key():
        params["key"] = _psi_key()

    try:
        resp = httpx.get(_PSI_URL, params=params, timeout=45)
        resp.raise_for_status()
        data = resp.json()
    except Exception as exc:
        return LighthouseResult(url=url, strategy=strategy, source="pagespeed", error=str(exc))

    cats = data.get("lighthouseResult", {}).get("categories", {})
    audits = data.get("lighthouseResult", {}).get("audits", {})

    def audit_val(key: str) -> Optional[float]:
        a = audits.get(key, {})
        return a.get("numericValue")

    # Collect failed audits (score < 0.9).
    failed: List[str] = []
    important_audits = [
        "first-contentful-paint", "largest-contentful-paint", "total-blocking-time",
        "cumulative-layout-shift", "speed-index", "interactive",
        "meta-description", "document-title", "image-alt", "link-text",
        "robots-txt", "http-status-code", "is-on-https",
        "tap-targets", "viewport", "font-size",
        "uses-responsive-images", "unused-javascript", "unused-css-rules",
    ]
    for key in important_audits:
        a = audits.get(key, {})
        score = a.get("score")
        if score is not None and float(score) < 0.9:
            title = a.get("title", key)
            failed.append(title)

    return LighthouseResult(
        url=url,
        lcp_ms=_ms(audit_val("largest-contentful-paint")),
        fcp_ms=_ms(audit_val("first-contentful-paint")),
        cls_score=audit_val("cumulative-layout-shift"),
        tbt_ms=_ms(audit_val("total-blocking-time")),
        speed_index_ms=_ms(audit_val("speed-index")),
        performance_score=_score_to_100(cats.get("performance", {}).get("score")),
        seo_score=_score_to_100(cats.get("seo", {}).get("score")),
        accessibility_score=_score_to_100(cats.get("accessibility", {}).get("score")),
        best_practices_score=_score_to_100(cats.get("best-practices", {}).get("score")),
        failed_audits=failed[:15],
        strategy=strategy,
        source="pagespeed",
    )


def _run_lighthouse_cli(url: str) -> LighthouseResult:
    """Shell out to Lighthouse CLI (requires: npm install -g lighthouse)."""
    if not shutil.which("lighthouse"):
        return LighthouseResult(url=url, error="lighthouse CLI not found")
    with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as f:
        out_path = f.name
    try:
        subprocess.run(
            [
                "lighthouse", url,
                "--output=json", f"--output-path={out_path}",
                "--quiet", "--chrome-flags=--headless",
                "--only-categories=performance,seo,accessibility,best-practices",
            ],
            capture_output=True, text=True, timeout=90, check=True,
        )
        with open(out_path) as f:
            data = json.load(f)

        cats = data.get("categories", {})
        audits = data.get("audits", {})

        def nv(key: str):
            return audits.get(key, {}).get("numericValue")

        failed = []
        for key, audit in audits.items():
            s = audit.get("score")
            if s is not None and float(s) < 0.9 and audit.get("scoreDisplayMode") == "binary":
                failed.append(audit.get("title", key))

        return LighthouseResult(
            url=url,
            lcp_ms=_ms(nv("largest-contentful-paint")),
            fcp_ms=_ms(nv("first-contentful-paint")),
            cls_score=nv("cumulative-layout-shift"),
            tbt_ms=_ms(nv("total-blocking-time")),
            speed_index_ms=_ms(nv("speed-index")),
            performance_score=_score_to_100(cats.get("performance", {}).get("score")),
            seo_score=_score_to_100(cats.get("seo", {}).get("score")),
            accessibility_score=_score_to_100(cats.get("accessibility", {}).get("score")),
            best_practices_score=_score_to_100(cats.get("best-practices", {}).get("score")),
            failed_audits=failed[:15],
            strategy="mobile",
            source="lighthouse_cli",
        )
    except Exception as exc:
        return LighthouseResult(url=url, error=str(exc), source="lighthouse_cli")
    finally:
        if os.path.exists(out_path):
            os.unlink(out_path)


def audit(url: str, strategy: str = "mobile") -> Optional[LighthouseResult]:
    """Run a Lighthouse/PSI audit. Returns None if no method is available."""
    # Try PageSpeed Insights API first (no install requirement).
    result = _run_pagespeed(url, strategy)
    if result.performance_score is not None:
        logger.info(
            "PSI audit for %s: perf=%s seo=%s a11y=%s",
            url, result.performance_score, result.seo_score, result.accessibility_score,
        )
        return result

    # Try CLI fallback.
    logger.info("PSI API unavailable; trying Lighthouse CLI for %s", url)
    result = _run_lighthouse_cli(url)
    if result.performance_score is not None:
        return result

    logger.warning("No Lighthouse method succeeded for %s: %s", url, result.error)
    return None


def format_for_audit(lr: Optional[LighthouseResult]) -> str:
    """Format a LighthouseResult into a structured string for the LLM audit prompt."""
    if lr is None or lr.error:
        return "Lighthouse/PSI data: not available"
    lines = [
        "--- Lighthouse / PageSpeed Insights ---",
        f"Strategy: {lr.strategy}",
        f"Performance score: {lr.performance_score}/100",
        f"SEO score: {lr.seo_score}/100",
        f"Accessibility score: {lr.accessibility_score}/100",
        f"Best practices score: {lr.best_practices_score}/100",
        f"LCP: {lr.lcp_ms}ms" if lr.lcp_ms else "LCP: unknown",
        f"FCP: {lr.fcp_ms}ms" if lr.fcp_ms else "FCP: unknown",
        f"CLS: {lr.cls_score}" if lr.cls_score is not None else "CLS: unknown",
        f"TBT: {lr.tbt_ms}ms" if lr.tbt_ms else "TBT: unknown",
        f"Speed Index: {lr.speed_index_ms}ms" if lr.speed_index_ms else "",
        f"Failed audits: {'; '.join(lr.failed_audits) or 'none'}",
    ]
    return "\n".join(l for l in lines if l)


def performance_score_to_10(lr: Optional[LighthouseResult]) -> Optional[float]:
    """Convert PSI 0-100 performance score to the 0-10 audit scale."""
    if lr is None or lr.performance_score is None:
        return None
    return round(lr.performance_score / 10.0, 1)


def seo_score_to_10(lr: Optional[LighthouseResult]) -> Optional[float]:
    """Convert PSI 0-100 SEO score to the 0-10 audit scale."""
    if lr is None or lr.seo_score is None:
        return None
    return round(lr.seo_score / 10.0, 1)
