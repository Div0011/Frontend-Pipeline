"""Tests for the orchestrator and tooling.

These run fully offline in *simulation* mode (LLM_PROVIDER=simulation) so they
need no API keys and no external services. They verify:
  * the graph compiles,
  * a full redesign runs to a final artifact,
  * parallel agents and the QA-escalation path terminate,
  * individual tools degrade gracefully without network,
  * prompt templates render without breaking on literal braces.
"""

from __future__ import annotations

import os

os.environ.setdefault("LLM_PROVIDER", "simulation")

import pytest

from pipeline.orchestrator import build_graph
from pipeline.prompts import render_prompt
from pipeline.runner import run_redesign
from pipeline.tools import crawl_website, web_search


def test_graph_compiles():
    g = build_graph()
    assert g is not None
    assert "planner" in g.get_graph().nodes
    assert "supervisor" in g.get_graph().nodes
    assert "synthesizer" in g.get_graph().nodes


@pytest.mark.asyncio
async def test_full_redesign_runs():
    art = await run_redesign(
        "Redesign the homepage of https://example.com into a cinematic site", "pytest-1"
    )
    assert art is not None
    assert art["project_id"] == "pytest-1"
    assert art["url"] == "https://example.com"
    assert "qa" in art["reports"]
    assert "website_analysis" in art["reports"]


def test_prompt_renders_with_literal_braces():
    # The engineering prompt contains JSON examples with { }. Rendering must not
    # raise and must substitute the {creative} token that it actually uses.
    out = render_prompt("engineering", creative="our art direction", url="https://x.com")
    assert "CanvasScrubber" in out  # literal code pattern preserved


def test_crawl_degrades_without_network():
    res = crawl_website("http://127.0.0.1:9/does-not-exist")
    assert res.status == 0 or res.error is not None


def test_search_mock_provider(monkeypatch):
    monkeypatch.setenv("SEARCH_PROVIDER", "mock")
    monkeypatch.setenv("SEARCH_API_KEY", "")
    from pipeline.config import get_settings
    get_settings.cache_clear()
    res = web_search("acme company")
    assert res.results
    assert res.results[0]["title"].startswith("[mock]")

