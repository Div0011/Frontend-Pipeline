"""
Lead-gen configuration.

Reads the lead-gen specific variables already present in `.env`:
  GOOGLE_PLACES_API_KEY, RESEND_API_KEY, LEADGEN_NEGATIVE_BRANDS,
  LEADGEN_NATIONAL_CHAIN_THRESHOLD, LEADGEN_REQUIRE_HUMAN_REVIEW,
  LEADGEN_ENABLE_REDESIGN, LEADGEN_ENABLE_EMAIL, LEADGEN_DEMO_BASE_URL

Plus the parent pipeline's `search_provider` / `search_api_key` (Tavily) for
web research and `enable_playwright` for screenshots.
"""

from __future__ import annotations

import os
from functools import lru_cache
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings

from pipeline.leadgen.schemas import IcpConfig


class LeadgenSettings(BaseSettings):
    model_config = {"env_file": ".env", "env_file_encoding": "utf-8", "extra": "ignore", "case_sensitive": False}

    google_places_api_key: str | None = Field(default=None, alias="GOOGLE_PLACES_API_KEY")
    tavily_api_key: str | None = Field(default=None, alias="TAVILY_API_KEY")
    firecrawl_api_key: str | None = Field(default=None, alias="FIRECRAWL_API_KEY")
    resend_api_key: str | None = Field(default=None, alias="RESEND_API_KEY")
    negative_brands_raw: str = Field(
        default="mcdonald's, kfc, burger king, domino's, pizza hut, subway, wendy's, five guys",
        alias="LEADGEN_NEGATIVE_BRANDS",
    )
    national_chain_threshold: int = Field(default=20, alias="LEADGEN_NATIONAL_CHAIN_THRESHOLD")
    require_human_review: bool = Field(default=True, alias="LEADGEN_REQUIRE_HUMAN_REVIEW")
    enable_redesign: bool = Field(default=False, alias="LEADGEN_ENABLE_REDESIGN")
    enable_email: bool = Field(default=False, alias="LEADGEN_ENABLE_EMAIL")
    demo_base_url: str = Field(default="https://preview.wishgranters.com", alias="LEADGEN_DEMO_BASE_URL")
    email_from_address: str = Field(
        default="outreach@wishgranters.com",
        alias="LEADGEN_EMAIL_FROM",
        description="Verified Resend sender address.",
    )
    max_emails_per_run: int = Field(
        default=10,
        alias="LEADGEN_MAX_EMAILS_PER_RUN",
        description="Hard cap on emails sent in a single campaign run.",
    )

    @property
    def negative_brands(self) -> List[str]:
        return [b.strip().lower() for b in self.negative_brands_raw.split(",") if b.strip()]

    @property
    def has_places(self) -> bool:
        return bool(self.google_places_api_key)

    @property
    def has_resend(self) -> bool:
        return bool(self.resend_api_key)

    @property
    def has_tavily(self) -> bool:
        return bool(self.tavily_api_key)

    @property
    def has_firecrawl(self) -> bool:
        return bool(self.firecrawl_api_key)


@lru_cache
def get_leadgen_settings() -> LeadgenSettings:
    return LeadgenSettings()


def build_default_icp(campaign_id: str = "campaign-001") -> IcpConfig:
    """The first, deliberately narrow experiment: independents only, one city."""
    s = get_leadgen_settings()
    return IcpConfig(
        campaign_id=campaign_id,
        industry="independent burger restaurants",
        geography="Austin, Texas",
        discovery_query="independent burger restaurants in Austin",
        target_business_types=["independent_restaurant"],
        max_results=10,
        negative_brands=s.negative_brands,
        national_chain_threshold=s.national_chain_threshold,
    )
