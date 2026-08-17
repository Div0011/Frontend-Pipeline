"""
The LangGraph state — the single shared memory of the workflow.

Design notes:
  * Per-agent outputs each get their OWN channel (``analysis``, ``seo`` …). This
    is what makes parallel execution safe: independent agents never write to the
    same channel, so there are no reducer races.
  * ``task_status`` / ``retry_counts`` use merge reducers so supervisor and agent
    updates compose predictably across concurrent branches.
  * ``messages`` and ``events`` use sequence reducers (append).
  * ``pending_rework`` + ``last_completed`` implement the QA retry loop.
"""

from __future__ import annotations

from typing import Annotated, Any, Dict, List, Optional

from langgraph.graph.message import add_messages
from pydantic import BaseModel, Field

from redesign.schemas import (
    BrandDna,
    CreativeDirection,
    Event,
    FinalArtifact,
    FrontendCode,
    LeadReport,
    MotionDesign,
    QaReport,
    SeoReport,
    TaskPlan,
    UiDesign,
    UxPlan,
    WebsiteAnalysisOutput,
    _last_str,
    _merge_events,
    _merge_status,
)


class RedesignState(BaseModel):
    # ── Inputs ───────────────────────────────────────────────────────
    request: str = ""
    project_id: str = ""
    url: Optional[str] = None

    # ── Plan (Master Orchestrator output) ────────────────────────────
    plan: Optional[TaskPlan] = None

    # ── Conversation / observability ─────────────────────────────────
    messages: Annotated[List[Any], add_messages] = Field(default_factory=list)
    events: Annotated[List[Event], _merge_events] = Field(default_factory=list)

    # ── Task tracking ────────────────────────────────────────────────
    task_status: Annotated[Dict[str, str], _merge_status] = Field(default_factory=dict)
    retry_counts: Annotated[Dict[str, int], _merge_status] = Field(default_factory=dict)
    qa_failures: int = 0
    pending_rework: Optional[str] = None
    last_completed: Annotated[Optional[str], _last_str] = None

    # ── Shared memory: one channel per agent output ──────────────────
    analysis: Optional[WebsiteAnalysisOutput] = None
    seo: Optional[SeoReport] = None
    brand: Optional[BrandDna] = None
    lead: Optional[LeadReport] = None
    creative: Optional[CreativeDirection] = None
    ux: Optional[UxPlan] = None
    ui: Optional[UiDesign] = None
    motion: Optional[MotionDesign] = None
    engineering: Optional[FrontendCode] = None
    qa: Optional[QaReport] = None

    # ── Human-in-the-loop / final ─────────────────────────────────────
    human_review: Optional[Dict[str, Any]] = None
    final_artifact: Optional[FinalArtifact] = None
    error: Optional[str] = None

    model_config = {"arbitrary_types_allowed": True}
