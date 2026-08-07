#!/usr/bin/env python
"""CLI: run a redesign from a single prompt.

Examples
--------
  python scripts/run_pipeline.py "Redesign https://example.com into a cinematic site"
  python scripts/run_pipeline.py "Redesign https://acme.com" --project acme-1 --json

Uses simulation mode by default (no API keys). Set LLM_PROVIDER=openai in .env
for real generation.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import sys
from pathlib import Path

# Allow running as `python scripts/run_pipeline.py` from the repo root.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from pipeline.runner import run_redesign


async def main() -> None:
    ap = argparse.ArgumentParser(description="Autonomous Website Redesign Platform")
    ap.add_argument("request", help="Natural-language redesign request")
    ap.add_argument("--project", default=None, help="Project id (thread id)")
    ap.add_argument("--json", action="store_true", help="Print final artifact as JSON")
    args = ap.parse_args()

    artifact = await run_redesign(args.request, args.project)
    if args.json:
        print(json.dumps(artifact, indent=2, default=str))
    else:
        print("\n✅ Redesign complete")
        print(f"  project : {artifact['project_id']}")
        print(f"  url     : {artifact['url']}")
        print(f"  qa score: {artifact['qa_score']}")
        print(f"  files   : {len(artifact['file_manifest'])}")
        print(f"  reports : {', '.join(artifact['reports'].keys())}")
        print(f"  path    : {artifact['artifacts_path']}")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        sys.exit(130)
