"""
LangGraph topology for the Lead Discovery + Qualification + Outreach layer.

Updated topology:

    START
      │
      ▼
    discovery  (Places primary + Tavily supplement, merged)
      │
      ▼
    dedup
      │
      ▼
    classifier  (Places location count primary; LLM second opinion)
      │
      ▼
    contact_discovery  (email, owner name, phone, social links)
      │
      ▼
    website_audit  (Firecrawl crawler + Lighthouse/PSI + LLM vision)
      │
      ▼
    scorer  (ICP similarity + enhanced business quality + real contactability)
      │
      ├── [require_human_review=true]  → human_review ─┐
      └── [require_human_review=false] ──────────────────┤
                                                         ▼
                                               redesign_trigger  (gated: LEADGEN_ENABLE_REDESIGN)
                                                         │
                                                         ▼
                                                      outreach  (LLM email + Resend)
                                                         │
                                                         ▼
                                                        END

The expensive frontend (redesign) pipeline is gated behind LEADGEN_ENABLE_REDESIGN=true
AND only fires for top-N Priority/Good prospect leads. Email is gated behind
LEADGEN_ENABLE_EMAIL=true. Both default to false.
"""

from __future__ import annotations

import logging

from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, START, StateGraph

from pipeline.leadgen.agents import (
    classifier,
    dedup,
    human_review,
    outreach,
    scorer,
    website_audit,
)
from pipeline.leadgen.agents.contact_discovery import contact_discovery
from pipeline.leadgen.agents.discovery import discovery
from pipeline.leadgen.agents.redesign_trigger import redesign_trigger
from pipeline.leadgen.config import get_leadgen_settings
from pipeline.leadgen.state import LeadGenState

logger = logging.getLogger("pipeline.leadgen.graph")


def _router_after_scorer(state: LeadGenState) -> str:
    return "human_review" if get_leadgen_settings().require_human_review else "redesign_trigger"


def build_graph(checkpointer=None):
    g = StateGraph(LeadGenState)

    # Register all nodes.
    g.add_node("discovery", discovery)
    g.add_node("dedup", dedup)
    g.add_node("classifier", classifier)
    g.add_node("contact_discovery", contact_discovery)
    g.add_node("website_audit", website_audit)
    g.add_node("scorer", scorer)
    g.add_node("human_review", human_review)
    g.add_node("redesign_trigger", redesign_trigger)
    g.add_node("outreach", outreach)

    # Wire the happy path.
    g.add_edge(START, "discovery")
    g.add_edge("discovery", "dedup")
    g.add_edge("dedup", "classifier")
    g.add_edge("classifier", "contact_discovery")
    g.add_edge("contact_discovery", "website_audit")
    g.add_edge("website_audit", "scorer")

    # After scorer: human review gate (conditional).
    g.add_conditional_edges(
        "scorer",
        _router_after_scorer,
        {"human_review": "human_review", "redesign_trigger": "redesign_trigger"},
    )
    g.add_edge("human_review", "redesign_trigger")
    g.add_edge("redesign_trigger", "outreach")
    g.add_edge("outreach", END)

    cp = checkpointer or MemorySaver()
    return g.compile(checkpointer=cp)


def get_graph():
    if get_graph._instance is None:
        get_graph._instance = build_graph()
    return get_graph._instance


get_graph._instance = None
