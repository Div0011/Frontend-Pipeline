"""
Central configuration for the Autonomous Website Redesign Platform.

All runtime behaviour is driven by environment variables (see .env.example).
Settings are validated with pydantic-settings so misconfiguration fails fast.
"""

from __future__ import annotations

import os
from functools import lru_cache
from typing import Dict, Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore", case_sensitive=False
    )

    # ── LLM provider ────────────────────────────────────────────────
    # "openai" | "anthropic" | "simulation"
    # "simulation" runs the entire pipeline with deterministic, templated
    # outputs so the orchestration can be exercised without API keys.
    llm_provider: Literal[
        "openai",
        "anthropic",
        "google",
        "groq",
        "ollama",
        "huggingface",
        "simulation",
    ] = "simulation"
    llm_model: str = "gpt-4o"
    llm_temperature: float = 0.4
    llm_api_key: str | None = Field(default=None, alias="OPENAI_API_KEY")
    anthropic_api_key: str | None = None
    google_api_key: str | None = Field(default=None, alias="GOOGLE_API_KEY")
    groq_api_key: str | None = Field(default=None, alias="GROQ_API_KEY")
    ollama_base_url: str | None = Field(default=None, alias="OLLAMA_BASE_URL")
    hf_api_key: str | None = Field(default=None, alias="HF_API_KEY")
    llm_base_url: str | None = None

    # ── Per-agent model overrides ───────────────────────────────────
    # When set, these override llm_model for the specific agent.
    # Supported agents: creative_director, ux, ui, motion, engineering, qa,
    #                    seo, brand_research, website_analysis, lead_discovery
    # Format: provider/model, e.g. "anthropic/claude-opus-4-20250514"
    # Leave empty to fall back to the global llm_model.
    agent_models: Dict[str, str] = Field(
        default_factory=dict,
        description="Per-agent model overrides as 'provider/model' strings.",
    )

    # Mode used by agents that need a vision model (screenshot analysis).
    vision_provider: Literal["openai", "anthropic", "google", "none"] = "none"
    vision_model: str = "gpt-4o"

    # ── Search tool ─────────────────────────────────────────────────
    # "tavily" | "serper" | "mock"
    search_provider: Literal["tavily", "serper", "mock"] = "mock"
    search_api_key: str | None = None

    # ── Persistence ─────────────────────────────────────────────────
    postgres_dsn: str = Field(
        default="postgresql://pipeline:redesign@localhost:5432/redesign"
    )
    redis_url: str = "redis://localhost:6379/0"

    # ── Object / artifact storage ───────────────────────────────────
    # Local directory used for generated code, screenshots and zips.
    artifacts_root: str = "./artifacts"
    # Optional S3 bucket for production (leave empty to use local disk).
    s3_bucket: str | None = None

    # ── Orchestration behaviour ─────────────────────────────────────
    human_approval_enabled: bool = False
    max_qa_retries: int = 3
    max_agent_retries: int = 2
    enable_playwright: bool = True
    # Run independent agents truly concurrently (thread pool inside LangGraph).
    parallel_execution: bool = True

    # ── Stitch MCP Integration ──────────────────────────────────────────
    enable_stitch: bool = False
    stitch_api_key: str = ""
    stitch_mcp_url: str = "https://stitch.googleapis.com/mcp"

    # ── Server ──────────────────────────────────────────────────────
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    log_level: str = "INFO"

    @property
    def has_real_llm(self) -> bool:
        return self.llm_provider in {
            "openai",
            "anthropic",
            "google",
            "groq",
            "ollama",
            "huggingface",
        }


@lru_cache
def get_settings() -> Settings:
    return Settings()


def set_env_defaults() -> None:
    """Ensure required env vars have sensible dev defaults for first run."""
    os.environ.setdefault("LLM_PROVIDER", "simulation")
    os.environ.setdefault("ARTIFACTS_ROOT", "./artifacts")
