"""
Prompt template registry.

Prompts live as editable Markdown files in this directory. They contain
`{placeholder}` tokens filled at call time. Keeping them on disk means
non-engineers (design leads, PMs) can tune agent behaviour without touching code.
"""

from __future__ import annotations

import os
import re
from functools import lru_cache
from pathlib import Path

PROMPT_DIR = Path(__file__).parent

# Logical agent name -> prompt filename
PROMPT_FILES: dict[str, str] = {
    "planner": "planner.md",
    "website_analysis": "website_analysis.md",
    "seo": "seo.md",
    "brand_research": "brand_research.md",
    "lead_discovery": "lead_discovery.md",
    "creative_director": "creative_director.md",
    "ux": "ux.md",
    "ui": "ui.md",
    "motion": "motion.md",
    "engineering": "engineering.md",
    "qa": "qa.md",
}

# Only substitute simple {token} placeholders we define. Any other braces
# (e.g. JSON examples in the engineering prompt) are left untouched — this
# avoids str.format() choking on literal curly braces in the prompts.
_TOKEN = re.compile(r"\{(\w+)\}")


@lru_cache(maxsize=len(PROMPT_FILES) + 4)
def _load(name: str) -> str:
    path = PROMPT_DIR / PROMPT_FILES[name]
    return path.read_text(encoding="utf-8")


def render_prompt(agent: str, **kwargs: str) -> str:
    """Render an agent's prompt, substituting only known {token} placeholders."""
    template = _load(agent)

    def repl(m: re.Match) -> str:
        key = m.group(1)
        return str(kwargs[key]) if key in kwargs else m.group(0)

    return _TOKEN.sub(repl, template)


def available_prompts() -> list[str]:
    return sorted(PROMPT_FILES)
