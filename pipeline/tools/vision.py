"""
Vision tool: describe a screenshot with a multimodal model.

Used by the Website Analysis agent when a vision model is configured. When no
vision model is available we return a neutral note so the agent proceeds with
the crawl-derived evidence only.
"""

from __future__ import annotations

import logging

from pipeline.llm import get_vision_model

logger = logging.getLogger("pipeline.tools.vision")


def analyze_image(path: str, question: str = "Describe the visual design.") -> str:
    model = get_vision_model()
    if model is None:
        return (
            "Vision analysis skipped (no VISION_PROVIDER configured). "
            "Rely on crawl-derived structure and metadata."
        )
    try:
        from langchain_core.messages import HumanMessage

        msg = HumanMessage(
            content=[
                {"type": "text", "text": question},
                {"type": "image_url", "image_url": {"url": f"file://{path}"}},
            ]
        )
        return model.invoke([msg]).content
    except Exception as exc:
        logger.warning("vision analysis failed: %s", exc)
        return f"Vision analysis failed: {exc}"


def extract_design_tokens_from_image(path: str) -> dict[str, list[str]]:
    """Use a vision model to extract concrete design tokens from a screenshot.

    Returns a dict with keys: colors, fonts, spacing, layout_notes.
    """
    model = get_vision_model()
    if model is None:
        return {"colors": [], "fonts": [], "spacing": [], "layout_notes": []}
    try:
        from langchain_core.messages import HumanMessage

        question = (
            "Analyze this website screenshot and extract concrete design tokens. "
            "Return ONLY a JSON object with these keys:\n"
            '{"colors": ["#hex1", "#hex2"], "fonts": ["Font Name", ...], '
            '"spacing": ["24px", "48px", ...], "layout_notes": ["3-column grid", ...]}\n'
            "Focus on: dominant background colors, accent colors, headline font family, "
            "body font family, visible spacing values (padding/margins), and layout structure."
        )
        msg = HumanMessage(
            content=[
                {"type": "text", "text": question},
                {"type": "image_url", "image_url": {"url": f"file://{path}"}},
            ]
        )
        raw = model.invoke([msg]).content
        import json, re
        m = re.search(r"\{.*\}", raw, re.DOTALL)
        if m:
            return json.loads(m.group(0))
        return {"colors": [], "fonts": [], "spacing": [], "layout_notes": []}
    except Exception as exc:
        logger.warning("design token extraction failed: %s", exc)
        return {"colors": [], "fonts": [], "spacing": [], "layout_notes": []}

