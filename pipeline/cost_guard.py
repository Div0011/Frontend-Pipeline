"""
Cost guard — prevents runaway LLM spend during pipeline execution.

Tracks per-run token usage and enforces a daily budget. Raises BudgetExceeded
when the limit is hit so the orchestrator can degrade gracefully instead of
burning money in a retry loop.
"""

from __future__ import annotations

import logging
import os
from dataclasses import dataclass, field
from datetime import date
from typing import Optional

logger = logging.getLogger("pipeline.cost_guard")


class BudgetExceeded(Exception):
    pass


@dataclass
class UsageRecord:
    model: str
    tokens_in: int = 0
    tokens_out: int = 0


# Rough per-1M-token costs (USD). Update as pricing changes.
MODEL_PRICING: dict[str, tuple[float, float]] = {
    "gpt-4o": (2.50, 10.00),
    "gpt-4o-mini": (0.15, 0.60),
    "claude-opus-4-20250514": (15.00, 75.00),
    "claude-sonnet-4-20250514": (3.00, 15.00),
    "gemini-2.5-pro": (1.25, 10.00),
    "gemini-2.5-flash": (0.15, 0.60),
    "llama3-70b": (0.80, 0.80),
    "default": (1.00, 3.00),
}


def _estimate_cost(model: str, tokens_in: int, tokens_out: int) -> float:
    key = model.lower()
    for k, (in_price, out_price) in MODEL_PRICING.items():
        if k in key:
            return (tokens_in / 1_000_000) * in_price + (tokens_out / 1_000_000) * out_price
    in_price, out_price = MODEL_PRICING["default"]
    return (tokens_in / 1_000_000) * in_price + (tokens_out / 1_000_000) * out_price


class CostGuard:
    _instance: Optional[CostGuard] = None

    def __init__(self, daily_budget_usd: float):
        self.daily_budget = daily_budget_usd
        self.today = date.today()
        self.spent = 0.0
        self.records: list[UsageRecord] = []

    @classmethod
    def get_instance(cls) -> CostGuard:
        if cls._instance is None or cls._instance.today != date.today():
            from pipeline.config import get_settings
            cls._instance = cls(get_settings().daily_llm_budget_usd)
        return cls._instance

    def record(self, model: str, tokens_in: int = 0, tokens_out: int = 0) -> float:
        cost = _estimate_cost(model, tokens_in, tokens_out)
        self.spent += cost
        self.records.append(UsageRecord(model=model, tokens_in=tokens_in, tokens_out=tokens_out))
        logger.debug("CostGuard: +$%.4f for %s (%din/%dout). Total today: $%.4f / $%.2f",
                     cost, model, tokens_in, tokens_out, self.spent, self.daily_budget)
        if self.spent > self.daily_budget:
            raise BudgetExceeded(
                f"Daily LLM budget ${self.daily_budget:.2f} exceeded (${self.spent:.2f})"
            )
        return cost

    def reset(self) -> None:
        self.today = date.today()
        self.spent = 0.0
        self.records = []
