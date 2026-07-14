"""
Website crawling / scraping tool.

Uses httpx + BeautifulSoup (always available). Playwright is used only for
screenshots (see screenshot.py). The crawler extracts the analytical surface
the Website Analysis and SEO agents need: headings, metadata, links, schema.
"""

from __future__ import annotations

import logging
from collections import deque
from dataclasses import dataclass, field
from typing import Any
from urllib.parse import urljoin, urlparse

import httpx
from bs4 import BeautifulSoup

logger = logging.getLogger("redesign.tools.crawl")

_HEADING_TAGS = ("h1", "h2", "h3", "h4", "h5", "h6")


@dataclass
class CrawlResult:
    url: str
    status: int
    title: str = ""
    meta: dict[str, str] = field(default_factory=dict)
    headings: dict[str, list[str]] = field(default_factory=dict)
    links: list[str] = field(default_factory=list)
    internal_links: list[str] = field(default_factory=list)
    schema_org: list[dict[str, Any]] = field(default_factory=list)
    html_len: int = 0
    error: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "url": self.url,
            "status": self.status,
            "title": self.title,
            "meta": self.meta,
            "headings": self.headings,
            "links": self.links[:50],
            "internal_links": self.internal_links[:50],
            "schema_org": self.schema_org,
            "html_len": self.html_len,
            "error": self.error,
        }


def crawl_website(url: str, timeout: float = 20.0) -> CrawlResult:
    """Fetch and parse a single page. Network/parse failures degrade gracefully."""
    result = CrawlResult(url=url, status=0)
    try:
        resp = httpx.get(
            url,
            timeout=timeout,
            follow_redirects=True,
            headers={"User-Agent": "RedesignBot/0.1 (+https://example.com/bot)"},
        )
        result.status = resp.status_code
        if resp.status_code >= 400:
            result.error = f"HTTP {resp.status_code}"
            return result
        soup = BeautifulSoup(resp.text, "html.parser")
        result.html_len = len(resp.text)

        result.title = (soup.title.string or "").strip() if soup.title else ""

        for tag in ("description", "keywords", "og:title", "og:image", "twitter:card"):
            el = soup.find("meta", attrs={"name": tag}) or soup.find(
                "meta", attrs={"property": tag}
            )
            if el and el.get("content"):
                result.meta[tag] = el["content"].strip()

        for h in _HEADING_TAGS:
            result.headings[h] = [
                t.get_text(strip=True) for t in soup.find_all(h) if t.get_text(strip=True)
            ]

        base = f"{urlparse(url).scheme}://{urlparse(url).netloc}"
        seen: set[str] = set()
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            abs_url = urljoin(base, href)
            parsed = urlparse(abs_url)
            if parsed.scheme in ("http", "https"):
                if abs_url not in seen:
                    seen.add(abs_url)
                    result.links.append(abs_url)
                    if parsed.netloc == urlparse(url).netloc:
                        result.internal_links.append(abs_url)

        for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
            try:
                import json

                result.schema_org.append(json.loads(script.string or "{}"))
            except Exception:
                pass
    except Exception as exc:  # network/resolution failures
        logger.warning("crawl failed for %s: %s", url, exc)
        result.error = str(exc)
    return result


# ── Deep, whole-site crawl ───────────────────────────────────────────
# Reads the entire site (homepage + followed internal links) so the redesign
# starts from full evidence rather than a single landing page.
@dataclass
class SiteCrawl:
    seed: str
    pages: list[dict[str, Any]] = field(default_factory=list)
    nav: list[str] = field(default_factory=list)
    schema_org: list[dict[str, Any]] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)
    pages_crawled: int = 0

    def summary(self, max_headings: int = 40, max_copy: int = 1200) -> str:
        """Bounded text view of the whole site for agent prompts."""
        lines: list[str] = [f"Seed: {self.seed}", f"Pages crawled: {self.pages_crawled}"]
        all_h: list[str] = []
        copy = ""
        for i, p in enumerate(self.pages[:12]):
            lines.append(f"\n## Page {i + 1}: {p.get('url', '')}")
            if p.get("title"):
                lines.append(f"  title: {p['title']}")
            if p.get("meta_description"):
                lines.append(f"  meta: {p['meta_description'][:200]}")
            for h, vals in p.get("headings", {}).items():
                for v in vals:
                    if v not in all_h:
                        all_h.append(v)
            if p.get("copy"):
                copy += p["copy"] + "\n"
        lines.append("\n## Headings across the site")
        lines.extend(f"- {h}" for h in all_h[:max_headings])
        if self.nav:
            lines.append("\n## Navigation labels")
            lines.extend(f"- {n}" for n in self.nav[:40])
        if self.schema_org:
            types = {s.get("@type") for s in self.schema_org if isinstance(s, dict)}
            lines.append(f"\n## Structured data types: {sorted(t for t in types if t)}")
        lines.append(f"\n## Sampled copy (first {max_copy} chars)\n{copy[:max_copy]}")
        return "\n".join(lines)


def crawl_site(url: str, max_pages: int = 8, timeout: float = 15.0) -> SiteCrawl:
    """BFS-crawl the same-domain site starting at ``url``.

    Returns aggregated headings, nav, copy and schema for every reachable
    internal page (capped at ``max_pages``). Each page reuses the
    single-page parser; failures are recorded, never fatal.
    """
    site = SiteCrawl(seed=url)
    try:
        root = urlparse(url)
        base = f"{root.scheme}://{root.netloc}"
    except Exception as exc:
        site.errors.append(str(exc))
        return site

    seen: set[str] = set()
    queue: deque[str] = deque([url])
    while queue and len(seen) < max_pages:
        current = queue.popleft()
        if current in seen:
            continue
        seen.add(current)
        page = crawl_website(current, timeout=timeout)
        site.pages_crawled += 1
        rec: dict[str, Any] = {
            "url": current,
            "title": page.title,
            "meta_description": page.meta.get("description", ""),
            "headings": page.headings,
        }
        # Pull a bounded copy sample from the visible text.
        try:
            soup = BeautifulSoup(_fetch_text(current, timeout), "html.parser")
            text = soup.get_text(" ", strip=True)
            rec["copy"] = text[:1500]
        except Exception:
            rec["copy"] = ""
        site.pages.append(rec)
        for s in page.schema_org:
            if isinstance(s, dict) and s.get("@type"):
                site.schema_org.append(s)
        # Navigation: anchor text of header/nav/footer links.
        if not site.nav and page.internal_links:
            site.nav = [u for u in page.internal_links[:40]]
        # Enqueue same-domain internals for the next layer.
        for link in page.internal_links:
            if link not in seen and urlparse(link).netloc == root.netloc:
                queue.append(link)
    return site


def _fetch_text(url: str, timeout: float) -> str:
    try:
        return httpx.get(url, timeout=timeout, follow_redirects=True,
                         headers={"User-Agent": "RedesignBot/0.1"}).text
    except Exception:
        return ""
