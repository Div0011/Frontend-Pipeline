"""
Lead Discovery + Qualification + Outreach layer.

Public surface:
  * build_graph / get_graph — LangGraph compiled graph
  * run_campaign          — convenience runner (handles the human-approval interrupt)
  * schemas / config      — contracts + ICP defaults

Entry point: `python -m pipeline.leadgen.runner`
"""

from pipeline.leadgen.config import build_default_icp, get_leadgen_settings
from pipeline.leadgen.graph import build_graph, get_graph
from pipeline.leadgen.schemas import (
    BusinessClassification,
    BusinessListing,
    CandidateLead,
    CommercialScores,
    IcpConfig,
    LeadCandidate,
    LeadEvent,
    OutreachPackage,
    WebsiteAudit,
)

__all__ = [
    "build_graph",
    "get_graph",
    "build_default_icp",
    "get_leadgen_settings",
    "IcpConfig",
    "BusinessListing",
    "CandidateLead",
    "BusinessClassification",
    "WebsiteAudit",
    "CommercialScores",
    "LeadCandidate",
    "OutreachPackage",
    "LeadEvent",
]
