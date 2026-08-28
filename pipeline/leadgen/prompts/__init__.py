"""
Lead-gen prompt registry.

Prompts are editable Markdown files in this directory, mirroring
pipeline/prompts/__init__.py. They use {token} placeholders filled at call time.
"""

from __future__ import annotations

import re
from functools import lru_cache
from pathlib import Path

PROMPT_DIR = Path(__file__).parent

PROMPT_FILES: dict[str, str] = {
    "discovery": "discovery.md",
    "dedup": "dedup.md",
    "classifier": "classifier.md",
    "crawler": "crawler.md",
    "audit": "audit.md",
    "scorer": "scorer.md",
    "outreach": "outreach.md",
}

_TOKEN = re.compile(r"\{(\w+)\}")


@lru_cache(maxsize=len(PROMPT_FILES) + 4)
def _load(name: str) -> str:
    path = PROMPT_DIR / PROMPT_FILES[name]
    return path.read_text(encoding="utf-8")


def render_prompt(agent: str, **kwargs: str) -> str:
    template = _load(agent)

    def repl(m: re.Match) -> str:
        key = m.group(1)
        return str(kwargs[key]) if key in kwargs else m.group(0)

    return _TOKEN.sub(repl, template)


def available_prompts() -> list[str]:
    return sorted(PROMPT_FILES)
