"""
Website crawler tool for the lead-gen layer.

Primary: Firecrawl `/scrape` API — returns full markdown, metadata, links,
and optional screenshots. Richer signal than raw httpx/BeautifulSoup.

Fallback: httpx + BeautifulSoup when FIRECRAWL_API_KEY is absent.

The output CrawlResult is consumed by the website_audit node to build
the LLM prompt context for the 7-dimension audit.

Firecrawl docs: https://docs.firecrawl.dev/api-reference/endpoint/scrape
"""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional
from urllib.parse import urljoin, urlparse

import httpx

from pipeline.leadgen.config import get_leadgen_settings

logger = logging.getLogger("pipeline.leadgen.tools.crawler")

_FIRECRAWL_SCRAPE = "https://api.firecrawl.dev/v1/scrape"
_FIRECRAWL_MAP = "https://api.firecrawl.dev/v1/map"

_DEFAULT_TIMEOUT = 30
_MAX_MARKDOWN_LEN = 8000  # Truncate before sending to LLM


@dataclass
class CrawlResult:
    url: str
    title: str = ""
    meta_description: str = ""
    h1: str = ""
    h2s: List[str] = field(default_factory=list)
    markdown: str = ""
    html_len: int = 0
    links: List[str] = field(default_factory=list)
    schema_types: List[str] = field(default_factory=list)
    has_online_ordering: bool = False
    has_menu_page: bool = False
    has_contact_page: bool = False
    detected_fonts: List[str] = field(default_factory=list)
    image_count: int = 0
    images_without_alt: int = 0
    social_links: List[str] = field(default_factory=list)
    phone: Optional[str] = None
    email: Optional[str] = None
    source: str = "fallback"
    error: Optional[str] = None


_SOCIAL_DOMAINS = frozenset([
    "instagram.com", "facebook.com", "tiktok.com", "twitter.com",
    "x.com", "youtube.com", "pinterest.com", "linkedin.com",
])
_ORDERING_KEYWORDS = frozenset([
    "order online", "order now", "doordash", "ubereats", "grubhub", "toast",
    "square online", "online ordering", "order pickup", "add to cart",
])
_PHONE_RE = re.compile(r"\(?\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}")
_EMAIL_RE = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")


def _has_key() -> bool:
    s = get_leadgen_settings()
    return bool(getattr(s, "firecrawl_api_key", None))


def _api_key() -> str:
    return get_leadgen_settings().firecrawl_api_key or ""


# ── Firecrawl path ────────────────────────────────────────────────────────────

def _crawl_via_firecrawl(url: str) -> CrawlResult:
    headers = {"Authorization": f"Bearer {_api_key()}", "Content-Type": "application/json"}
    payload = {
        "url": url,
        "formats": ["markdown", "html", "links", "metadata"],
        "actions": [],
        "waitFor": 1500,
        "timeout": 25000,
    }
    resp = httpx.post(_FIRECRAWL_SCRAPE, json=payload, headers=headers, timeout=_DEFAULT_TIMEOUT + 10)
    resp.raise_for_status()
    data = resp.json().get("data", {})

    metadata = data.get("metadata", {})
    markdown = data.get("markdown", "")[:_MAX_MARKDOWN_LEN]
    html = data.get("html", "")
    links = data.get("links", [])

    # Parse social links and ordering hints from link list.
    social = [l for l in links if any(sd in l for sd in _SOCIAL_DOMAINS)]
    ordering = any(k in (markdown + html).lower() for k in _ORDERING_KEYWORDS)
    has_menu = any("menu" in l.lower() for l in links)
    has_contact = any("contact" in l.lower() for l in links)

    # Extract phone + email from markdown.
    phones = _PHONE_RE.findall(markdown)
    emails = _EMAIL_RE.findall(markdown)

    # Count images without alt.
    img_total = html.lower().count("<img")
    img_no_alt = html.lower().count("<img") - html.lower().count("alt=")
    img_no_alt = max(0, img_no_alt)

    # Schema.org types from JSON-LD in HTML.
    schema_types = re.findall(r'"@type"\s*:\s*"([^"]+)"', html)

    # H2 headings from markdown.
    h2s = re.findall(r"^##\s+(.+)", markdown, re.MULTILINE)

    return CrawlResult(
        url=url,
        title=metadata.get("title", ""),
        meta_description=metadata.get("description", ""),
        h1=metadata.get("ogTitle", "") or (re.findall(r"^#\s+(.+)", markdown, re.MULTILINE) or [""])[0],
        h2s=h2s[:8],
        markdown=markdown,
        html_len=len(html),
        links=links[:30],
        schema_types=list(set(schema_types))[:10],
        has_online_ordering=ordering,
        has_menu_page=has_menu,
        has_contact_page=has_contact,
        image_count=img_total,
        images_without_alt=img_no_alt,
        social_links=social[:5],
        phone=phones[0] if phones else None,
        email=emails[0] if emails else None,
        source="firecrawl",
    )


# ── httpx + BeautifulSoup fallback ───────────────────────────────────────────

def _crawl_via_httpx(url: str) -> CrawlResult:
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        return CrawlResult(url=url, error="BeautifulSoup not installed; install beautifulsoup4")

    headers = {"User-Agent": "Mozilla/5.0 (Wishgranters LeadBot/1.0; +https://wishgranters.com)"}
    try:
        resp = httpx.get(url, headers=headers, timeout=15, follow_redirects=True)
        html = resp.text
    except Exception as exc:
        return CrawlResult(url=url, error=str(exc))

    soup = BeautifulSoup(html, "html.parser")

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    meta_desc_tag = soup.find("meta", attrs={"name": re.compile("description", re.I)})
    meta_desc = meta_desc_tag.get("content", "").strip() if meta_desc_tag else ""
    h1_tags = soup.find_all("h1")
    h1 = h1_tags[0].get_text(strip=True) if h1_tags else ""
    h2s = [t.get_text(strip=True) for t in soup.find_all("h2")][:8]

    # Links.
    links = [a.get("href", "") for a in soup.find_all("a", href=True)]
    abs_links = []
    for l in links:
        if l.startswith("http"):
            abs_links.append(l)
        elif l.startswith("/"):
            abs_links.append(urljoin(url, l))

    social = [l for l in abs_links if any(sd in l for sd in _SOCIAL_DOMAINS)]
    text = soup.get_text(" ", strip=True)
    ordering = any(k in text.lower() for k in _ORDERING_KEYWORDS)
    has_menu = any("menu" in l.lower() for l in abs_links)
    has_contact = any("contact" in l.lower() for l in abs_links)

    phones = _PHONE_RE.findall(text)
    emails = _EMAIL_RE.findall(text)

    imgs = soup.find_all("img")
    imgs_no_alt = sum(1 for i in imgs if not i.get("alt", "").strip())

    schema_types = re.findall(r'"@type"\s*:\s*"([^"]+)"', html)

    # Rough markdown: just the visible text, trimmed.
    markdown = text[:_MAX_MARKDOWN_LEN]

    return CrawlResult(
        url=url,
        title=title,
        meta_description=meta_desc,
        h1=h1,
        h2s=h2s,
        markdown=markdown,
        html_len=len(html),
        links=abs_links[:30],
        schema_types=list(set(schema_types))[:10],
        has_online_ordering=ordering,
        has_menu_page=has_menu,
        has_contact_page=has_contact,
        image_count=len(imgs),
        images_without_alt=imgs_no_alt,
        social_links=social[:5],
        phone=phones[0] if phones else None,
        email=emails[0] if emails else None,
        source="httpx",
    )


# ── Public interface ──────────────────────────────────────────────────────────

def crawl(url: str) -> CrawlResult:
    """Crawl a business website. Prefers Firecrawl, falls back to httpx."""
    if _has_key():
        try:
            return _crawl_via_firecrawl(url)
        except Exception as exc:
            logger.warning("Firecrawl failed for %s (%s); falling back to httpx", url, exc)
    return _crawl_via_httpx(url)


def format_for_audit(cr: CrawlResult) -> str:
    """Format a CrawlResult into a structured string for the LLM audit prompt."""
    lines = [
        f"URL: {cr.url}",
        f"Title: {cr.title}",
        f"Meta description: {cr.meta_description or '(missing)'}",
        f"H1: {cr.h1 or '(missing)'}",
        f"H2s: {', '.join(cr.h2s) or '(none)'}",
        f"Schema types: {', '.join(cr.schema_types) or '(none)'}",
        f"Has online ordering: {cr.has_online_ordering}",
        f"Has menu page: {cr.has_menu_page}",
        f"Has contact page: {cr.has_contact_page}",
        f"Images: {cr.image_count} ({cr.images_without_alt} without alt text)",
        f"Social links: {', '.join(cr.social_links) or 'none'}",
        f"Phone found: {cr.phone or 'no'}",
        f"HTML size: {cr.html_len} bytes",
        f"Crawl source: {cr.source}",
        "",
        "--- Page content (truncated) ---",
        cr.markdown[:3000],
    ]
    return "\n".join(lines)
