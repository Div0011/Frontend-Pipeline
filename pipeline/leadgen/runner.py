"""
CLI runner for the lead-gen campaign.

Runs the full discovery → qualification → outreach flow.

Usage:
  # Default: Austin burger independents (mock data when no API keys set)
  python -m pipeline.leadgen.runner

  # Custom vertical + geography
  python -m pipeline.leadgen.runner --industry "hair salons" --geo "Austin, Texas"

  # Export full results to JSON
  python -m pipeline.leadgen.runner --output reports/campaign_001.json

  # Dry-run: run all qualification, skip outreach/email
  python -m pipeline.leadgen.runner --dry-run

  # Skip human-approval gate (CI/testing)
  python -m pipeline.leadgen.runner --no-auto-approve

Flags:
  --industry       ICP industry string (default: "independent burger restaurants")
  --geo            Target geography (default: "Austin, Texas")
  --max            Max qualified leads to return (default: 10)
  --campaign-id    Stable campaign identifier (default: "campaign-001")
  --output PATH    Write full structured results to a JSON file
  --md PATH        Write a markdown campaign report to a file
  --dry-run        Qualification only — no outreach/email/redesign triggers
  --no-auto-approve  Require explicit human decisions (don't auto-approve in runner)
"""

from __future__ import annotations

import argparse
import logging
import os
from typing import Any, Dict

from langgraph.types import Command

from pipeline.leadgen.config import build_default_icp, get_leadgen_settings
from pipeline.leadgen.graph import get_graph
from pipeline.leadgen.reporting.campaign_report import (
    export_json,
    generate_markdown_report,
    print_summary,
)

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
logger = logging.getLogger("pipeline.leadgen.runner")


def run_campaign(icp, auto_approve: bool = True, dry_run: bool = False) -> Dict[str, Any]:
    app = get_graph()
    thread = {"configurable": {"thread_id": icp.campaign_id}}
    inputs = {"icp": icp, "campaign_id": icp.campaign_id}

    if dry_run:
        logger.info("DRY RUN: outreach and email disabled for this run.")
        # Temporarily override enable_email/enable_redesign via env — simpler than
        # threading a flag through the entire graph.
        os.environ["LEADGEN_ENABLE_EMAIL"] = "false"
        os.environ["LEADGEN_ENABLE_REDESIGN"] = "false"
        # Flush the settings cache so the override takes effect.
        try:
            get_leadgen_settings.cache_clear()
        except AttributeError:
            pass

    # First pass — runs until human_review interrupt (or to END).
    for _ in app.stream(inputs, thread, stream_mode="updates"):
        pass

    # Handle the human-approval interrupt if present.
    state = app.get_state(thread)
    while state.next:  # graph is paused on a node (the interrupt)
        decisions: Dict[str, str] = {}
        for task in state.tasks:
            for intr in getattr(task, "interrupts", []):
                for p in intr.value.get("pending", []):
                    decisions[p["business_name"]] = "approve" if auto_approve else "reject"
        if not decisions:
            break
        app.invoke(Command(resume=decisions), thread)
        state = app.get_state(thread)

    return state.values


def main() -> None:
    ap = argparse.ArgumentParser(description="Run a lead discovery + qualification campaign")
    ap.add_argument("--industry", default="independent burger restaurants")
    ap.add_argument("--geo", "--geography", dest="geo", default="Austin, Texas")
    ap.add_argument("--max", type=int, default=10)
    ap.add_argument("--campaign-id", default="campaign-001")
    ap.add_argument("--output", default=None, help="Write full JSON result to this path")
    ap.add_argument("--md", default=None, help="Write markdown report to this path")
    ap.add_argument("--dry-run", dest="dry_run", action="store_true",
                    help="Qualification only — skip outreach/email/redesign")
    ap.add_argument("--no-auto-approve", dest="auto_approve", action="store_false",
                    help="Do not auto-approve human-review gate (useful for testing the gate)")
    args = ap.parse_args()

    icp = build_default_icp(args.campaign_id)
    icp.industry = args.industry
    icp.geography = args.geo
    icp.discovery_query = f"{args.industry} in {args.geo}"
    icp.max_results = args.max

    values = run_campaign(icp, auto_approve=args.auto_approve, dry_run=args.dry_run)
    print_summary(values)

    if args.output:
        export_json(values, args.output)
        print(f"JSON export written → {args.output}")

    if args.md:
        md = generate_markdown_report(values, campaign_id=args.campaign_id)
        os.makedirs(os.path.dirname(os.path.abspath(args.md)), exist_ok=True)
        with open(args.md, "w") as f:
            f.write(md)
        print(f"Markdown report written → {args.md}")


if __name__ == "__main__":
    main()
