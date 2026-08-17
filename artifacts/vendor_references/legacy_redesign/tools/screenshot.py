"""
Screenshot capture via Playwright (desktop + mobile).

Playwright is optional. When unavailable or disabled we return a graceful
placeholder so the pipeline still completes. Screenshots are written to
``<artifacts_root>/screenshots/<project_id>/``.
"""

from __future__ import annotations

import logging
import os
from pathlib import Path

from redesign.config import get_settings

logger = logging.getLogger("redesign.tools.screenshot")


def capture_screenshot(url: str, project_id: str) -> dict[str, str | None]:
    settings = get_settings()
    out_dir = Path(settings.artifacts_root) / "screenshots" / project_id
    out_dir.mkdir(parents=True, exist_ok=True)
    desktop = str(out_dir / "desktop.png")
    mobile = str(out_dir / "mobile.png")

    if not settings.enable_playwright:
        logger.info("playwright disabled; skipping screenshots for %s", url)
        return {"desktop": None, "mobile": None, "note": "playwright disabled"}

    try:
        from playwright.sync_api import sync_playwright
    except Exception as exc:
        logger.warning("playwright not installed: %s", exc)
        return {"desktop": None, "mobile": None, "note": "playwright unavailable"}

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(args=["--no-sandbox"])
            page = browser.new_page(viewport={"width": 1440, "height": 900})
            page.goto(url, wait_until="networkidle", timeout=30000)
            page.screenshot(path=desktop, full_page=False)
            mpage = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True)
            mpage.goto(url, wait_until="networkidle", timeout=30000)
            mpage.screenshot(path=mobile, full_page=False)
            browser.close()
        return {"desktop": desktop, "mobile": mobile}
    except Exception as exc:
        logger.warning("screenshot failed for %s: %s", url, exc)
        return {"desktop": None, "mobile": None, "note": str(exc)}
