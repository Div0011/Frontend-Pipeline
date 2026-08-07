"""Agent node registry."""

from pipeline.agents.brand_research import brand_research
from pipeline.agents.creative_director import creative_director
from pipeline.agents.engineering import engineering
from pipeline.agents.lead_discovery import lead_discovery
from pipeline.agents.planner import planner
from pipeline.agents.qa import qa
from pipeline.agents.seo import seo
from pipeline.agents.ui import ui
from pipeline.agents.motion import motion
from pipeline.agents.ux import ux
from pipeline.agents.website_analysis import website_analysis

ALL_AGENT_NODES = {
    "website_analysis": website_analysis,
    "seo": seo,
    "brand_research": brand_research,
    "lead_discovery": lead_discovery,
    "creative_director": creative_director,
    "ux": ux,
    "ui": ui,
    "motion": motion,
    "engineering": engineering,
    "qa": qa,
}

__all__ = [
    "planner",
    "website_analysis",
    "seo",
    "brand_research",
    "lead_discovery",
    "creative_director",
    "ux",
    "ui",
    "motion",
    "engineering",
    "qa",
    "ALL_AGENT_NODES",
]
