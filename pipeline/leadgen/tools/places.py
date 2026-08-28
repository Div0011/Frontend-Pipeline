"""
Business discovery tool.

Primary source: Google Places Text Search API. Falls back to deterministic
mock seed data when no API key is configured (so the whole pipeline runs
offline / in simulation).

Chain detection — the important bit
-----------------------------------
We do NOT rely on an LLM to decide "is this a franchise?". LLM classifiers
misfire on regional chains with cute names that don't *look* corporate (a
6-location local burger spot won't be flagged by name alone).

The PRIMARY, most reliable signal is the **Places location count**: how many
distinct Places results share this brand name across the region. A single
independent restaurant returns ~1. A regional chain returns several. A national
brand returns dozens. The LLM classifier (run later) is only a *second opinion*.
"""

from __future__ import annotations

import logging
import os
from typing import List

import httpx

from pipeline.leadgen.config import get_leadgen_settings
from pipeline.leadgen.schemas import BusinessListing

logger = logging.getLogger("pipeline.leadgen.tools.places")

_TEXTSEARCH = "https://maps.googleapis.com/maps/api/place/textsearch/json"


# ── Mock seed data — burger restaurants (Austin) ────────────────────────────
# 26 entries with intentional edge cases:
#   - Chains rejected by location count (P-Terry's: 18, Hopdoddy: 22, Whataburger: 900)
#   - Hard-negative brand name (Whataburger in list)
#   - No website → rejected at dedup (Crown & Anchor)
#   - Low rating → rejected at dedup (Lone Star Patty Works)
#   - Low reviews → rejected at dedup (Texas Monthly Barbeque)
#   - Duplicate domain (Dirty Martin's listed twice with same URL)
#   - Strong existing site → rejected at scorer (Arlo's has strong web presence)
#   - Ambiguous 6-location regional chain (East Side Smash Co: caught by location count, not name)
#   - Social-only presence, no formal website (SouthBridge Smash)
_MOCK_BURGER_BUSINESSES: List[dict] = [
    # ── Chains → rejected by Places location count ──────────────────────────
    {"name": "P-Terry's Burger Stand", "address": "Austin, TX", "website": "https://pterrys.com",
     "rating": 4.6, "reviews": 4200, "location_count_signal": 18, "price_level": 1, "photo_count": 95,
     "hours_complete": True, "types": ["restaurant", "burger_restaurant"]},
    {"name": "Hopdoddy Burger Bar", "address": "Austin, TX", "website": "https://hopdoddy.com",
     "rating": 4.4, "reviews": 6100, "location_count_signal": 22, "price_level": 2, "photo_count": 120,
     "hours_complete": True, "types": ["restaurant", "burger_restaurant"]},

    # ── Hard-negative brand name → rejected at dedup ────────────────────────
    {"name": "Whataburger", "address": "Austin, TX", "website": "https://whataburger.com",
     "rating": 4.3, "reviews": 12000, "location_count_signal": 900, "price_level": 1, "photo_count": 200,
     "hours_complete": True, "types": ["restaurant", "burger_restaurant"]},

    # ── No website → rejected at dedup ─────────────────────────────────────
    {"name": "Crown & Anchor Pub", "address": "Austin, TX", "website": None,
     "rating": 4.3, "reviews": 410, "location_count_signal": 1, "price_level": 1, "photo_count": 30,
     "hours_complete": False, "types": ["restaurant", "bar"]},

    # ── Low rating → rejected at dedup ─────────────────────────────────────
    {"name": "Lone Star Patty Works", "address": "Austin, TX", "website": "https://lonestarpatty.example.com",
     "rating": 2.9, "reviews": 40, "location_count_signal": 1, "price_level": 1, "photo_count": 5,
     "hours_complete": False, "types": ["restaurant"]},

    # ── Low review count → rejected at dedup ───────────────────────────────
    {"name": "Texas Monthly Barbeque Co", "address": "Austin, TX", "website": "https://txmonthlybbq.example.com",
     "rating": 4.2, "reviews": 22, "location_count_signal": 1, "price_level": 2, "photo_count": 8,
     "hours_complete": False, "types": ["restaurant", "barbecue"]},

    # ── Duplicate domain (same URL, different name) → caught at dedup ───────
    {"name": "Dirty Martin's Kantina - Downtown", "address": "Austin, TX", "website": "https://dirtymartins.com",
     "rating": 4.5, "reviews": 1800, "location_count_signal": 1, "price_level": 1, "photo_count": 55,
     "hours_complete": True, "types": ["restaurant"]},

    # ── Ambiguous 6-location regional chain → caught by location count ───────
    # A cute name; LLM alone would NOT flag this. location_count=6 catches it.
    {"name": "East Side Smash Co", "address": "Austin, TX", "website": "https://eastsidesmash.co",
     "rating": 4.8, "reviews": 1240, "location_count_signal": 6, "price_level": 2, "photo_count": 82,
     "hours_complete": True, "types": ["restaurant", "burger_restaurant"]},

    # ── Strong existing site → qualifier passes but scorer rejects ───────────
    # Arlo's has a genuinely excellent website. Little upside to sell.
    {"name": "Arlo's Vegan Burgers", "address": "Austin, TX", "website": "https://arlosburger.com",
     "rating": 4.7, "reviews": 2100, "location_count_signal": 2, "price_level": 2, "photo_count": 130,
     "hours_complete": True, "types": ["restaurant", "burger_restaurant"]},

    # ── INDEPENDENT, QUALIFY CANDIDATES ────────────────────────────────────
    {"name": "Dirty Martin's Kantina", "address": "2808 Guadalupe St, Austin, TX",
     "website": "https://dirtymartins.com",
     "rating": 4.5, "reviews": 1800, "location_count_signal": 1, "price_level": 1, "photo_count": 55,
     "hours_complete": True, "types": ["restaurant"]},
    {"name": "Casino El Camino", "address": "517 E 6th St, Austin, TX",
     "website": "https://casinoelcamino.com",
     "rating": 4.4, "reviews": 3500, "location_count_signal": 1, "price_level": 1, "photo_count": 70,
     "hours_complete": True, "types": ["restaurant", "bar"]},
    {"name": "Jewboy Burgers", "address": "5111 Airport Blvd, Austin, TX",
     "website": "https://jewboyburgers.com",
     "rating": 4.7, "reviews": 950, "location_count_signal": 1, "price_level": 2, "photo_count": 60,
     "hours_complete": True, "types": ["restaurant", "burger_restaurant"]},
    {"name": "Mi Trailita", "address": "Austin, TX",
     "website": "https://mitrailita.example.com",
     "rating": 4.6, "reviews": 720, "location_count_signal": 1, "price_level": 1, "photo_count": 35,
     "hours_complete": False, "types": ["restaurant"]},
    {"name": "The Ruby Quarter", "address": "Austin, TX",
     "website": "https://therubyquarter.com",
     "rating": 4.5, "reviews": 380, "location_count_signal": 1, "price_level": 2, "photo_count": 45,
     "hours_complete": False, "types": ["restaurant"]},
    {"name": "Griff's Hamburgers", "address": "Austin, TX",
     "website": "https://griffsburgers.example.com",
     "rating": 4.4, "reviews": 520, "location_count_signal": 1, "price_level": 1, "photo_count": 28,
     "hours_complete": False, "types": ["restaurant", "burger_restaurant"]},
    {"name": "The Parlor Room Burgers", "address": "Austin, TX",
     "website": "https://parlorroom.example.com",
     "rating": 4.6, "reviews": 890, "location_count_signal": 1, "price_level": 2, "photo_count": 50,
     "hours_complete": True, "types": ["restaurant"]},
    {"name": "Noble Sandwich Co", "address": "Austin, TX",
     "website": "https://noblesandwich.com",
     "rating": 4.5, "reviews": 1100, "location_count_signal": 2, "price_level": 2, "photo_count": 65,
     "hours_complete": True, "types": ["restaurant", "sandwich_shop"]},
    {"name": "Hut's Hamburgers", "address": "Austin, TX",
     "website": "https://hutshamburgers.example.com",
     "rating": 4.3, "reviews": 1600, "location_count_signal": 1, "price_level": 1, "photo_count": 40,
     "hours_complete": True, "types": ["restaurant", "burger_restaurant"]},
    {"name": "Dan's Hamburgers", "address": "Austin, TX",
     "website": "https://danshamburgers.example.com",
     "rating": 4.4, "reviews": 780, "location_count_signal": 1, "price_level": 1, "photo_count": 20,
     "hours_complete": False, "types": ["restaurant", "burger_restaurant"]},
    {"name": "Kerbey Lane Cafe", "address": "Austin, TX",
     "website": "https://kerbeylanecafe.com",
     "rating": 4.3, "reviews": 3200, "location_count_signal": 4, "price_level": 2, "photo_count": 85,
     "hours_complete": True, "types": ["restaurant", "cafe"]},
    # Social-only presence (website exists but is a FB page link — treated as having a site)
    {"name": "SouthBridge Smash Burgers", "address": "Austin, TX",
     "website": "https://southbridgesmash.example.com",
     "rating": 4.5, "reviews": 310, "location_count_signal": 1, "price_level": 1, "photo_count": 15,
     "hours_complete": False, "types": ["restaurant", "burger_restaurant"]},
]


# ── Alternative vertical mock datasets ───────────────────────────────────────

_MOCK_SALON_BUSINESSES: List[dict] = [
    {"name": "Milk + Honey Spa", "address": "Austin, TX", "website": "https://milkandhoneyspa.com",
     "rating": 4.7, "reviews": 1200, "location_count_signal": 3, "price_level": 3, "photo_count": 90, "hours_complete": True},
    {"name": "Shag Barbershop", "address": "Austin, TX", "website": "https://shagbarbershop.example.com",
     "rating": 4.6, "reviews": 560, "location_count_signal": 1, "price_level": 2, "photo_count": 40, "hours_complete": True},
    {"name": "The Parlor Salon", "address": "Austin, TX", "website": "https://parlorhair.example.com",
     "rating": 4.5, "reviews": 380, "location_count_signal": 1, "price_level": 2, "photo_count": 30, "hours_complete": False},
    {"name": "Supercuts", "address": "Austin, TX", "website": "https://supercuts.com",
     "rating": 3.9, "reviews": 800, "location_count_signal": 150, "price_level": 1, "photo_count": 10, "hours_complete": True},
    {"name": "Lady Bird Lash Studio", "address": "Austin, TX", "website": "https://ladybirdlash.example.com",
     "rating": 4.8, "reviews": 420, "location_count_signal": 1, "price_level": 2, "photo_count": 55, "hours_complete": True},
]

_MOCK_DENTIST_BUSINESSES: List[dict] = [
    {"name": "Austin Family Dental", "address": "Austin, TX", "website": "https://austinfamilydental.example.com",
     "rating": 4.7, "reviews": 340, "location_count_signal": 1, "price_level": 2, "photo_count": 25, "hours_complete": True},
    {"name": "Aspen Dental", "address": "Austin, TX", "website": "https://aspendental.com",
     "rating": 3.9, "reviews": 600, "location_count_signal": 200, "price_level": 2, "photo_count": 15, "hours_complete": True},
    {"name": "South Congress Smiles", "address": "Austin, TX", "website": "https://sococsmiles.example.com",
     "rating": 4.8, "reviews": 290, "location_count_signal": 1, "price_level": 3, "photo_count": 35, "hours_complete": False},
    {"name": "Brentwood Dental Clinic", "address": "Austin, TX", "website": "https://brentwooddental.example.com",
     "rating": 4.5, "reviews": 180, "location_count_signal": 1, "price_level": 2, "photo_count": 18, "hours_complete": True},
]

_MOCK_GYM_BUSINESSES: List[dict] = [
    {"name": "Crunch Fitness", "address": "Austin, TX", "website": "https://crunch.com",
     "rating": 4.1, "reviews": 900, "location_count_signal": 350, "price_level": 1, "photo_count": 40, "hours_complete": True},
    {"name": "Austin Bouldering Project", "address": "Austin, TX", "website": "https://austinbouldering.com",
     "rating": 4.8, "reviews": 1500, "location_count_signal": 2, "price_level": 2, "photo_count": 110, "hours_complete": True},
    {"name": "Westlake CrossFit", "address": "Austin, TX", "website": "https://westlakecrossfit.example.com",
     "rating": 4.7, "reviews": 280, "location_count_signal": 1, "price_level": 3, "photo_count": 30, "hours_complete": False},
    {"name": "Planet Fitness", "address": "Austin, TX", "website": "https://planetfitness.com",
     "rating": 3.8, "reviews": 1200, "location_count_signal": 800, "price_level": 1, "photo_count": 20, "hours_complete": True},
    {"name": "Hyde Park Gym", "address": "Austin, TX", "website": "https://hydeparkgym.example.com",
     "rating": 4.5, "reviews": 350, "location_count_signal": 1, "price_level": 2, "photo_count": 22, "hours_complete": True},
]

_MOCK_CAFE_BUSINESSES: List[dict] = [
    {"name": "Starbucks", "address": "Austin, TX", "website": "https://starbucks.com",
     "rating": 4.0, "reviews": 5000, "location_count_signal": 3000, "price_level": 2, "photo_count": 50, "hours_complete": True},
    {"name": "Bouldin Creek Cafe", "address": "Austin, TX", "website": "https://bouldincreekcafe.com",
     "rating": 4.5, "reviews": 1800, "location_count_signal": 1, "price_level": 1, "photo_count": 75, "hours_complete": True},
    {"name": "Epoch Coffee", "address": "Austin, TX", "website": "https://epochcoffee.example.com",
     "rating": 4.6, "reviews": 920, "location_count_signal": 2, "price_level": 1, "photo_count": 55, "hours_complete": False},
    {"name": "Jo's Coffee", "address": "Austin, TX", "website": "https://joscoffee.example.com",
     "rating": 4.5, "reviews": 2100, "location_count_signal": 2, "price_level": 1, "photo_count": 80, "hours_complete": True},
    {"name": "Bennu Coffee", "address": "Austin, TX", "website": "https://bennucoffee.example.com",
     "rating": 4.4, "reviews": 580, "location_count_signal": 1, "price_level": 1, "photo_count": 42, "hours_complete": False},
]

# Dispatch table: maps industry keywords → mock dataset
_VERTICAL_MOCK: dict = {
    "burger": _MOCK_BURGER_BUSINESSES,
    "restaurant": _MOCK_BURGER_BUSINESSES,
    "salon": _MOCK_SALON_BUSINESSES,
    "barbershop": _MOCK_SALON_BUSINESSES,
    "hair": _MOCK_SALON_BUSINESSES,
    "spa": _MOCK_SALON_BUSINESSES,
    "dentist": _MOCK_DENTIST_BUSINESSES,
    "dental": _MOCK_DENTIST_BUSINESSES,
    "gym": _MOCK_GYM_BUSINESSES,
    "fitness": _MOCK_GYM_BUSINESSES,
    "crossfit": _MOCK_GYM_BUSINESSES,
    "cafe": _MOCK_CAFE_BUSINESSES,
    "coffee": _MOCK_CAFE_BUSINESSES,
}


def _select_mock_dataset(query: str) -> List[dict]:
    q = query.lower()
    for keyword, dataset in _VERTICAL_MOCK.items():
        if keyword in q:
            return dataset
    return _MOCK_BURGER_BUSINESSES  # default


def _mock_discover(query: str, geography: str) -> List[BusinessListing]:
    geo = geography or "Austin, Texas"
    dataset = _select_mock_dataset(query)
    out: List[BusinessListing] = []
    for b in dataset:
        out.append(
            BusinessListing(
                name=b["name"],
                address=b.get("address", geo),
                website=b.get("website"),
                rating=b["rating"],
                review_count=b["reviews"],
                types=b.get("types", ["restaurant"]),
                location_count_signal=b.get("location_count_signal", 1),
                price_level=b.get("price_level"),
                photo_count=b.get("photo_count", 0),
                hours_complete=b.get("hours_complete", False),
                source="mock",
                notes=f"mock seed for {geo} ({query})",
            )
        )
    return out


def discover_businesses(query: str, geography: str, max_results: int = 20) -> List[BusinessListing]:
    """Text Search for candidate businesses. Returns raw listings (pre-filter)."""
    settings = get_leadgen_settings()
    if not settings.has_places:
        logger.info("GOOGLE_PLACES_API_KEY empty → using mock seed data for %s", geography)
        return _mock_discover(query, geography)

    full_query = f"{query} in {geography}" if geography else query
    try:
        resp = httpx.get(
            _TEXTSEARCH,
            params={"query": full_query, "type": "restaurant", "maxprice": 4, "key": settings.google_places_api_key},
            timeout=20,
        )
        data = resp.json()
        results = data.get("results", [])
        out: List[BusinessListing] = []
        for r in results[:max_results]:
            geo2 = r.get("geometry", {}).get("location", {})
            out.append(
                BusinessListing(
                    name=r.get("name", ""),
                    address=r.get("formatted_address", ""),
                    website=r.get("website"),
                    rating=float(r.get("rating", 0.0) or 0.0),
                    review_count=int(r.get("user_ratings_total", 0) or 0),
                    place_id=r.get("place_id"),
                    google_maps_url=r.get("url"),
                    latitude=geo2.get("lat"),
                    longitude=geo2.get("lng"),
                    types=r.get("types", []),
                    source="places",
                    location_count_signal=1,  # refined later by count_locations_for_name()
                )
            )
        return out
    except Exception as exc:
        logger.warning("Places discovery failed (%s); falling back to mock", exc)
        return _mock_discover(query, geography)


def count_locations_for_name(name: str) -> int:
    """PRIMARY chain signal: how many distinct Places locations share this name.

    A single independent restaurant → ~1. A regional chain → several. A
    national brand → dozens. This is the source of truth for `is_chain`,
    not an LLM guess.
    """
    settings = get_leadgen_settings()
    if not settings.has_places:
        # In mock mode the seed already carries a location_count_signal; the
        # classifier passes it through. We still expose this for symmetry.
        return 1

    try:
        total = 0
        next_token = None
        for _ in range(3):  # up to 60 results
            params = {"query": name, "key": settings.google_places_api_key}
            if next_token:
                params["pagetoken"] = next_token
            resp = httpx.get(_TEXTSEARCH, params=params, timeout=20)
            data = resp.json()
            total += len(data.get("results", []))
            next_token = data.get("next_page_token")
            if not next_token:
                break
        return max(1, total)
    except Exception as exc:
        logger.warning("location count failed for %r: %s", name, exc)
        return 1
