"""
Web search tool for the Brand Research agent.

Provider is configurable: tavily | serper | mock. The mock provider returns
deterministic, clearly-labelled results so the pipeline runs offline. Real
providers are wired through their HTTP APIs.
"""

from __future__ import annotations

import logging
import os
from dataclasses import dataclass, field

import httpx

from pipeline.config import get_settings

logger = logging.getLogger("pipeline.tools.search")


@dataclass
class SearchResult:
    query: str
    results: list[dict] = field(default_factory=list)
    note: str = ""


def web_search(query: str, max_results: int = 6) -> SearchResult:
    settings = get_settings()
    provider = settings.search_provider

    if provider == "mock" or not settings.search_api_key:
        return SearchResult(
            query=query,
            results=[
                {
                    "title": f"[mock] {query} — overview",
                    "url": "https://example.com/mock",
                    "snippet": (
                        f"Mock search result for '{query}'. Configure SEARCH_PROVIDER="
                        f"tavily|serper with SEARCH_API_KEY for live web data."
                    ),
                }
            ],
            note="mock provider",
        )

    headers = {"Authorization": f"Bearer {settings.search_api_key}"}
    try:
        if provider == "tavily":
            resp = httpx.post(
                "https://api.tavily.com/search",
                json={"query": query, "max_results": max_results},
                headers=headers,
                timeout=20,
            )
            data = resp.json()
            results = [
                {"title": r.get("title", ""), "url": r.get("url", ""), "snippet": r.get("content", "")}
                for r in data.get("results", [])
            ]
        else:  # serper
            resp = httpx.post(
                "https://google.serper.dev/search",
                json={"q": query, "num": max_results},
                headers={**headers, "X-Serper-Location": "us"},
                timeout=20,
            )
            data = resp.json()
            results = [
                {"title": r.get("title", ""), "url": r.get("link", ""), "snippet": r.get("snippet", "")}
                for r in data.get("organic", [])
            ]
        return SearchResult(query=query, results=results)
    except Exception as exc:
        logger.warning("search failed (%s): %s", provider, exc)
        return SearchResult(query=query, results=[], note=str(exc))
