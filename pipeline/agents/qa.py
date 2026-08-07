"""
QA agent node.

Audits the generated code against 10 quality dimensions including genericness,
mobile performance, and scroll reversibility. Produces targeted rework
instructions if QA fails.
"""

from __future__ import annotations

from pipeline.agents.base import call_agent_model, emit, finalize
from pipeline.schemas import QaReport
from pipeline.state import RedesignState


def qa(state: RedesignState) -> dict:
    out = call_agent_model("qa", state, QaReport)
    level = "success" if out.passed else "warn"
    return finalize(
        "qa", state, "qa", out,
        emit("qa", "qa", f"QA {'passed' if out.passed else 'failed'} "
             f"(score {out.overall_score})", level),
    )
