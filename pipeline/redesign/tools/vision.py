"""
Vision tool: describe a screenshot with a multimodal model.

Used by the Website Analysis agent when a vision model is configured. When no
vision model is available we return a neutral note so the agent proceeds with
the crawl-derived evidence only.
"""

from __future__ import annotations

import logging

from redesign.llm import get_vision_model

logger = logging.getLogger("redesign.tools.vision")


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
