"""
Campaign report generator.

Produces:
  1. Rich ASCII scorecard (printed to stdout / logger)
  2. Structured JSON export (optional --output flag)
  3. Markdown report with per-lead scorecard table and funnel stats
"""

from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from typing import Any, Dict, List

from pipeline.leadgen.schemas import LeadCandidate, OutreachPackage


# ── ASCII scorecard ────────────────────────────────────────────────────────────

def _bar(score: float, max_score: float = 10.0, width: int = 20) -> str:
    """Render a simple ASCII progress bar."""
    filled = int(round((score / max_score) * width))
    return "█" * filled + "░" * (width - filled)


def _tier_emoji(tier: str) -> str:
    return {"Priority": "🔥", "Good prospect": "✅", "Maybe": "🟡", "Reject": "❌"}.get(tier, "❓")


def print_summary(values: Dict[str, Any]) -> None:
    """Print a rich ASCII campaign summary to stdout."""
    scored: List[LeadCandidate] = values.get("scored", [])
    outreach: List[OutreachPackage] = values.get("outreach", [])
    stats = values.get("stats", {})
    qualified = [s for s in scored if s.decision == "QUALIFY"]
    rejected = [s for s in scored if s.decision == "REJECT"]
    early_rejected = [
        c for c in values.get("candidates", [])
        if c.rejection_reasons and c.business_name not in {s.business_name for s in scored}
    ]

    print("\n" + "=" * 62)
    print("  LEAD CAMPAIGN SUMMARY")
    print("=" * 62)
    print(f"  Discovered   : {stats.get('discovered', '?')}  "
          f"(Places: {stats.get('places_raw', '?')} + Tavily: {stats.get('tavily_raw', '?')})")
    print(f"  Candidates   : {stats.get('candidates', '?')}")
    print(f"  Audited      : {stats.get('audited', '?')}")
    print(f"  Scored       : {len(scored)}  "
          f"(QUALIFY: {len(qualified)} · REJECT: {len(rejected)})")
    print(f"  Outreach pkgs: {len(outreach)}")
    print(f"  Emails sent  : {stats.get('emails_sent', 0)}")
    print(f"  Redesigns    : {stats.get('redesign_triggered', 0)}")
    print("=" * 62)

    if qualified:
        print("\n  TOP QUALIFIED LEADS\n")
        print(f"  {'SCORE':>5}  {'TIER':<14}  {'BUSINESS':<30}  {'SITE':>4}  {'OPP':>4}  {'ICP':>4}")
        print("  " + "-" * 65)
        for lc in qualified[:10]:
            tier_tag = f"{_tier_emoji(lc.tier)} {lc.tier}"
            icp = f"{lc.icp_similarity_score:.2f}" if hasattr(lc, "icp_similarity_score") else " n/a"
            print(f"  [{lc.overall_lead_score:>3}]  {tier_tag:<14}  {lc.business_name:<30}  "
                  f"{lc.overall_website_score:>4.1f}  {lc.redesign_opportunity:>4.1f}  {icp:>4}")
            if lc.redesign_opportunities:
                opps = ", ".join(lc.redesign_opportunities[:3])
                print(f"          ↳ {opps}")
            if lc.contact_email:
                print(f"          ✉ {lc.contact_email}"
                      + (f" ({lc.contact_name})" if lc.contact_name else ""))
        print()

    if rejected or early_rejected:
        print("  REJECTED (sample)\n")
        for lc in rejected[:6]:
            reason = ", ".join(lc.rejection_reasons[:2]) or "low score"
            print(f"  ✗ {lc.business_name}: {reason}")
        for c in early_rejected[:6]:
            reason = ", ".join(c.rejection_reasons[:2])
            print(f"  ✗ {c.business_name} [{c.classification_method or 'dedup'}]: {reason}")
        print()

    print("=" * 62 + "\n")


# ── Markdown report ───────────────────────────────────────────────────────────

def _md_score_bar(score: float, max_score: float = 10.0) -> str:
    """Markdown-safe bar for the scorecard table."""
    pct = int(round((score / max_score) * 10))
    return "🟩" * pct + "⬜" * (10 - pct)


def generate_markdown_report(values: Dict[str, Any], campaign_id: str = "campaign") -> str:
    scored: List[LeadCandidate] = values.get("scored", [])
    stats = values.get("stats", {})
    qualified = [s for s in scored if s.decision == "QUALIFY"]
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    lines = [
        f"# Lead Campaign Report — {campaign_id}",
        f"_Generated: {ts}_",
        "",
        "## Funnel Summary",
        "",
        f"| Stage | Count |",
        f"|-------|-------|",
        f"| Discovered | {stats.get('discovered', '?')} (Places: {stats.get('places_raw', '?')} + Tavily: {stats.get('tavily_raw', '?')}) |",
        f"| Candidates (post-dedup) | {stats.get('candidates', '?')} |",
        f"| Chain/franchise rejected | {stats.get('classifier_rejected', '?')} |",
        f"| Websites audited | {stats.get('audited', '?')} |",
        f"| Scored | {len(scored)} |",
        f"| **QUALIFY** | **{len(qualified)}** |",
        f"| Outreach packages | {stats.get('outreach_packages', '?')} |",
        f"| Emails sent | {stats.get('emails_sent', 0)} |",
        f"| Redesigns triggered | {stats.get('redesign_triggered', 0)} |",
        "",
        "---",
        "",
        "## Qualified Leads — Scorecard",
        "",
        "| # | Business | Score | Tier | Site | Opp | ICP | Contact | Services |",
        "|---|----------|-------|------|------|-----|-----|---------|----------|",
    ]

    for i, lc in enumerate(qualified, 1):
        icp = f"{lc.icp_similarity_score:.2f}" if hasattr(lc, "icp_similarity_score") else "n/a"
        contact = "✉" if lc.contact_email else "—"
        if lc.contact_name and lc.contact_email:
            contact = f"✉ {lc.contact_name}"
        services = ", ".join(lc.recommended_services[:2]) or "—"
        lines.append(
            f"| {i} | [{lc.business_name}]({lc.website_url or '#'}) | **{lc.overall_lead_score}** | "
            f"{_tier_emoji(lc.tier)} {lc.tier} | {lc.overall_website_score:.1f}/10 | "
            f"{lc.redesign_opportunity:.1f}/10 | {icp} | {contact} | {services} |"
        )

    if qualified:
        lines += [
            "",
            "### Dimension Breakdown",
            "",
            "| Business | Visual | UX | Mobile | SEO | Perf | Content | Brand |",
            "|----------|--------|----|--------|-----|------|---------|-------|",
        ]
        for lc in qualified:
            lines.append(
                f"| {lc.business_name} | {lc.visual_score:.1f} | {lc.ux_score:.1f} | "
                f"{lc.mobile_score:.1f} | {lc.seo_score:.1f} | {lc.performance_score:.1f} | "
                f"{lc.content_score:.1f} | {lc.branding_score:.1f} |"
            )

    lines += ["", "---", "", "## Rejected Leads", ""]
    rejected = [s for s in scored if s.decision == "REJECT"]
    if rejected:
        lines.append("| Business | Reason |")
        lines.append("|----------|--------|")
        for lc in rejected:
            reason = "; ".join(lc.rejection_reasons[:2]) or "Low score"
            lines.append(f"| {lc.business_name} | {reason} |")

    lines += ["", "---", f"_End of report — {campaign_id}_"]
    return "\n".join(lines)


# ── JSON export ───────────────────────────────────────────────────────────────

def export_json(values: Dict[str, Any], output_path: str) -> None:
    """Serialize the full campaign result to a JSON file."""
    def _serialize(obj):
        if hasattr(obj, "model_dump"):
            return obj.model_dump()
        if isinstance(obj, list):
            return [_serialize(x) for x in obj]
        if isinstance(obj, dict):
            return {k: _serialize(v) for k, v in obj.items()}
        return obj

    serializable = {k: _serialize(v) for k, v in values.items()}
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(serializable, f, indent=2, default=str)
