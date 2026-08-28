"""
Contact discovery tool for the lead-gen layer.

Attempts to find legitimate, publicly available business contact info:
  1. Scrape /contact, /about, /footer paths of the business website
  2. Extract mailto: links and visible email patterns
  3. Extract owner/business name from About page copy
  4. Use Tavily Extract as a supplementary source
  5. Use Google Places Details API for contact URL + phone

Data collected is strictly what is publicly available for business contact
purposes. No inference of personal home addresses, private social profiles,
or identity beyond what the business itself publishes.

Contact quality drives the `contactability_score` on the lead:
  - business email found: +50 pts
  - owner name found: +20 pts
  - phone found: +15 pts
  - only website form / no direct contact: base 15 pts
"""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass, field
from typing import List, Optional
from urllib.parse import urljoin, urlparse

import httpx

from pipeline.leadgen.config import get_leadgen_settings

logger = logging.getLogger("pipeline.leadgen.tools.contact_finder")

_PHONE_RE = re.compile(r"\(?\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}")
_EMAIL_RE = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")

_PERSONAL_DOMAINS = frozenset([
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
    "icloud.com", "me.com", "protonmail.com", "aol.com",
])

# Pages likely to contain contact info.
_CONTACT_PATHS = ["/contact", "/contact-us", "/about", "/about-us", "/info"]

_OWNER_WORDS = re.compile(
    r"(?:owned?\s+by|founder|owner|chef|operator|meet\s+(?:the\s+)?(?:owner|team|chef))"
    r"\s*[:\-–]?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})",
    re.IGNORECASE,
)


@dataclass
class ContactResult:
    contact_email: Optional[str] = None
    contact_name: Optional[str] = None
    phone: Optional[str] = None
    contact_source: str = "none"
    social_links: List[str] = field(default_factory=list)
    contactability_score: float = 0.0
    notes: str = ""


def _is_personal_email(email: str) -> bool:
    domain = email.split("@")[-1].lower()
    return domain in _PERSONAL_DOMAINS


def _scrape_page(url: str) -> str:
    """Fetch a page and return visible text (best-effort)."""
    headers = {"User-Agent": "Mozilla/5.0 (Wishgranters LeadBot/1.0; +https://wishgranters.com)"}
    try:
        resp = httpx.get(url, headers=headers, timeout=12, follow_redirects=True)
        if resp.status_code >= 400:
            return ""
        # Strip HTML tags roughly.
        text = re.sub(r"<[^>]+>", " ", resp.text)
        return re.sub(r"\s+", " ", text)[:6000]
    except Exception:
        return ""


def _find_email_in_text(text: str, prefer_business: bool = True) -> Optional[str]:
    emails = _EMAIL_RE.findall(text)
    # Filter out image filenames, noreply, etc.
    emails = [e for e in emails if "." in e.split("@")[-1] and "noreply" not in e.lower()
              and "example" not in e.lower() and len(e) < 80]
    if prefer_business:
        business = [e for e in emails if not _is_personal_email(e)]
        if business:
            return business[0]
    return emails[0] if emails else None


def _find_owner_name(text: str) -> Optional[str]:
    match = _OWNER_WORDS.search(text)
    if match:
        name = match.group(1).strip()
        # Basic sanity: 2-4 words, no all-caps.
        parts = name.split()
        if 1 <= len(parts) <= 4 and not name.isupper():
            return name
    return None


def _places_contact(place_id: str) -> dict:
    """Fetch contact info from Google Places Details API."""
    s = get_leadgen_settings()
    if not s.has_places or not place_id:
        return {}
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    try:
        resp = httpx.get(
            url,
            params={"place_id": place_id, "fields": "website,formatted_phone_number", "key": s.google_places_api_key},
            timeout=15,
        )
        result = resp.json().get("result", {})
        return {
            "website": result.get("website"),
            "phone": result.get("formatted_phone_number"),
        }
    except Exception as exc:
        logger.warning("Places details failed for %s: %s", place_id, exc)
        return {}


def _social_from_text(text: str) -> List[str]:
    _social_domains = ["instagram.com", "facebook.com", "tiktok.com", "twitter.com", "x.com"]
    found = []
    for m in re.finditer(r"https?://[^\s\"'<>]+", text):
        url = m.group(0)
        if any(sd in url for sd in _social_domains):
            found.append(url)
    return list(set(found))[:5]


def discover(
    website_url: Optional[str],
    place_id: Optional[str] = None,
    business_name: str = "",
) -> ContactResult:
    """Main entry point: try all methods, return the best ContactResult."""
    result = ContactResult()

    if not website_url:
        # Try Places for phone at minimum.
        if place_id:
            d = _places_contact(place_id)
            result.phone = d.get("phone")
            result.contact_source = "places_only"
            result.contactability_score = 20.0 if result.phone else 5.0
        return result

    # Try Tavily Extract first if key is available.
    try:
        from pipeline.leadgen.tools.tavily import research_business
        tavily_data = research_business(business_name, website_url)
        if tavily_data.get("email_hint"):
            result.contact_email = tavily_data["email_hint"]
            result.contact_source = "tavily"
        if tavily_data.get("social_links"):
            result.social_links = tavily_data["social_links"]
    except Exception as exc:
        logger.debug("Tavily extract skipped: %s", exc)

    # Scrape website contact/about pages.
    base = website_url.rstrip("/")
    combined_text = ""
    for path in _CONTACT_PATHS:
        text = _scrape_page(base + path)
        if text:
            combined_text += " " + text
            if not result.contact_email:
                found = _find_email_in_text(text)
                if found:
                    result.contact_email = found
                    result.contact_source = f"scraped:{path}"
            if not result.contact_name:
                result.contact_name = _find_owner_name(text)
            if not result.phone:
                phones = _PHONE_RE.findall(text)
                result.phone = phones[0] if phones else None
            if combined_text and result.contact_email and result.contact_name and result.phone:
                break  # Got everything we need.

    # Also scrape the homepage if we haven't found email yet.
    if not result.contact_email:
        homepage_text = _scrape_page(base)
        if homepage_text:
            result.contact_email = _find_email_in_text(homepage_text)
            if not result.contact_source or result.contact_source == "none":
                result.contact_source = "homepage"
            social = _social_from_text(homepage_text)
            if social and not result.social_links:
                result.social_links = social
            if not result.contact_name:
                result.contact_name = _find_owner_name(homepage_text)
            if not result.phone:
                phones = _PHONE_RE.findall(homepage_text)
                result.phone = phones[0] if phones else None

    # Supplement with Places Details.
    if place_id:
        d = _places_contact(place_id)
        if d.get("phone") and not result.phone:
            result.phone = d["phone"]

    # Compute contactability score.
    score = 15.0  # base: has website
    if result.contact_email:
        score += 50.0
    if result.contact_name:
        score += 20.0
    if result.phone:
        score += 15.0
    if result.social_links:
        score += 10.0 * min(1.0, len(result.social_links) / 2)

    result.contactability_score = min(100.0, score)
    if not result.contact_source or result.contact_source == "none":
        result.contact_source = "website_only"

    logger.info(
        "Contact for %s: email=%s name=%s phone=%s score=%.0f",
        business_name,
        bool(result.contact_email),
        bool(result.contact_name),
        bool(result.phone),
        result.contactability_score,
    )
    return result
