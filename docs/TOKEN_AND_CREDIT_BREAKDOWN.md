# Token Consumption & Credit Usage — Detailed Breakdown

> **Document scope:** Per-stage token consumption, API/credit costs, tool/infrastructure costs, cost tiers, monthly scaling, and the engineering decisions that keep the pipeline efficient.

---

## Table of Contents

1. [Pipeline Stages](#1-pipeline-stages)
2. [Per-Stage Token Consumption](#2-per-stage-token-consumption)
3. [Per-Stage Credit / API Cost](#3-per-stage-credit--api-cost)
4. [Tool & Infrastructure Costs](#4-tool--infrastructure-costs)
5. [Cost Tiers](#5-cost-tiers)
6. [Monthly Scaling](#6-monthly-scaling)
7. [Cost-Efficiency Design Decisions](#8-cost-efficiency-design-decisions)

---

## 1. Pipeline Stages

The LangGraph orchestrator contains **15 total nodes**: 5 orchestration nodes and 10 specialist agent nodes.

| # | Stage | Node Type | Role |
|---|-------|-----------|------|
| 1 | `planner` | Orchestration | Builds & validates the task DAG; deterministic, no LLM call |
| 2 | `website_analysis` | Specialist | Forensic UI/UX audit, screenshots, vision analysis |
| 3 | `seo` | Specialist | SEO audit + Core Web Vitals plan |
| 4 | `brand_research` | Specialist | Brand DNA extraction + competitor analysis |
| 5 | `lead_discovery` | Specialist | Prospect discovery, scoring, and ranking |
| 6 | `supervisor` | Orchestration | Dependency-aware router; dispatches ready tasks in parallel via `Send` |
| 7 | `creative_director` | Specialist | Art direction, moodboards, color/typography systems |
| 8 | `ux` | Specialist | Sitemap, wireframes, CTA hierarchy |
| 9 | `ui` | Specialist | Design tokens, components, responsive layouts |
| 10 | `motion` | Specialist | Animation specs (GSAP / Framer Motion / Lenis) |
| 11 | `engineering` | Specialist | Production Next.js + React + TypeScript code generation |
| 12 | `qa` | Specialist | 7-dimension quality gate; triggers rework loop on failure |
| 13 | `post_agent` | Orchestration | Routes completed agents back to `supervisor`; handles QA retries |
| 14 | `approval` | Orchestration | Optional human-in-the-loop interrupt gate |
| 15 | `synthesizer` | Orchestration | Saves files, renders Markdown reports, zips the project, emits `FinalArtifact` |

**Execution order:** `website_analysis`, `seo`, and `brand_research` run in parallel. `lead_discovery` waits for `brand_research` + `website_analysis`. `creative_director` waits for the parallel analysis phase. `ux` waits for `website_analysis`, `brand_research`, and `creative_director`. `ui` and `motion` run in parallel after `creative_director`. `engineering` waits for `ui`, `motion`, and `ux`. `qa` runs after `engineering`; on failure it routes back to the weakest agent for rework, then re-runs `qa` automatically (up to 3 retries).

---

## 2. Per-Stage Token Consumption

**Total per website: ~600,000 tokens**

| Stage | Input Tokens | Output Tokens | Total Tokens | % of Pipeline | Primary Model |
|-------|-------------|--------------|-------------|---------------|---------------|
| `planner`            | ~2,000       | ~1,000       | ~3,000       | <1% | None (deterministic) |
| `website_analysis`   | ~25,000      | ~15,000      | ~40,000      | ~7% | Sonnet 5 (vision-capable) |
| `seo`                | ~20,000      | ~10,000      | ~30,000      | ~5% | Haiku 4.5 |
| `brand_research`     | ~15,000      | ~8,000       | ~23,000      | ~4% | Haiku 4.5 |
| `lead_discovery`     | ~12,000      | ~6,000       | ~18,000      | ~3% | Haiku 4.5 |
| `creative_director`  | ~30,000      | ~25,000      | ~55,000      | ~9% | **Opus 4.8** |
| `ux`                 | ~20,000      | ~15,000      | ~35,000      | ~6% | Sonnet 5 |
| `ui`                 | ~25,000      | ~20,000      | ~45,000      | ~8% | Sonnet 5 |
| `motion`             | ~18,000      | ~12,000      | ~30,000      | ~5% | Sonnet 5 |
| `engineering`        | ~60,000      | ~150,000     | ~210,000     | **~35%** | Sonnet 5 (escalates to Opus 4.8 on QA failure) |
| `qa`                 | ~15,000      | ~10,000      | ~25,000      | ~4% | Haiku 4.5 |
| `synthesizer`        | ~5,000       | ~3,000       | ~8,000       | ~1% | None (deterministic) |
| `retry_loops`        | variable     | variable     | ~50,000–100,000 | ~8–17% | Varies by failing agent |

**Engineering is the dominant token consumer (~35%)** because it generates the full multi-file Next.js codebase (40–80 files per project). **Creative Director is the second highest (~9%)** due to Opus 4.8's longer reasoning traces for art direction and taste-level decisions.

---

## 3. Per-Stage Credit / API Cost

Using current per-1M-token pricing (Anthropic rate card):

| Stage | Model | Input Rate | Output Rate | Input Cost | Output Cost | **Stage Cost** |
|-------|-------|-----------|-------------|-----------|-------------|---------------|
| `planner` | — | — | — | $0.00 | $0.00 | **$0.00** |
| `website_analysis` | Sonnet 5 | $3.00 | $15.00 | $0.075 | $0.225 | **$0.30** |
| `seo` | Haiku 4.5 | $0.80 | $4.00 | $0.016 | $0.040 | **$0.06** |
| `brand_research` | Haiku 4.5 | $0.80 | $4.00 | $0.012 | $0.032 | **$0.05** |
| `lead_discovery` | Haiku 4.5 | $0.80 | $4.00 | $0.010 | $0.024 | **$0.04** |
| `creative_director` | Opus 4.8 | $5.00 | $25.00 | $0.150 | $0.625 | **$0.78** |
| `ux` | Sonnet 5 | $3.00 | $15.00 | $0.060 | $0.225 | **$0.29** |
| `ui` | Sonnet 5 | $3.00 | $15.00 | $0.075 | $0.300 | **$0.38** |
| `motion` | Sonnet 5 | $3.00 | $15.00 | $0.054 | $0.180 | **$0.23** |
| `engineering` | Sonnet 5 | $3.00 | $15.00 | $0.180 | $2.250 | **$2.43** |
| `qa` | Haiku 4.5 | $0.80 | $4.00 | $0.012 | $0.040 | **$0.06** |
| `synthesizer` | — | — | — | $0.00 | $0.00 | **$0.00** |
| `retry_loops` | Varies | — | — | — | — | **~$1.00–$6.00** |

**Total per website (no retries): ~$4.60**  
**Total per website (with 1 QA retry): ~$5.60–$6.60**  
**Total per website (worst case, 3 retries): ~$10.60**

> **Note:** Engineering output is where costs spike. A single QA failure triggers Opus 4.8 rework (~$1.00–$2.00) plus re-running Engineering (~$2.43). The retry loop is capped at 3 attempts.

---

## 4. Tool & Infrastructure Costs

| Tool / Service | Purpose | Free Tier | Cost if Paid | Notes |
|---------------|---------|-----------|-------------|-------|
| **Playwright** | Screenshots + browser automation | Free | Free | Open-source, runs locally or in CI |
| **Lighthouse CLI** | Performance + SEO audit | Free | Free | Open-source |
| **Tavily Search** | Web search | Free (1k searches/mo) | $30/mo (50k), $100/mo (500k) | Primary search provider |
| **Serper** | Web search | Free (2.5k/mo) | $50/mo (5k), $99/mo (15k) | Alternative search provider |
| **PostgreSQL** | Checkpointing + event log | Free (local) | ~$7/mo (Railway) | Shared across all pipeline runs |
| **Redis** | Pub/sub + job queue | Free (local) | ~$5/mo (Railway) | Shared across all pipeline runs |
| **S3 / Cloudflare R2** | Artifact storage | Free tier | ~$0.01/GB | For large screenshot/artifact storage |
| **Docker** | Containerization | Free | Free | Standard container runtime |
| **GitHub Actions** | CI/CD for deployment | Free (2k min/mo) | $0.008/min | Used for Pages deployment |

**Infrastructure per month (local): $0**  
**Infrastructure per month (managed): ~$12–$25**

---

## 5. Cost Tiers

| Tier | Model Setup | Cost Per Site | Quality Score | Best For |
|------|-------------|---------------|---------------|----------|
| **Free / Simulation** | Groq Llama 3.3 70B | **$0.00** | 5/10 | Prototyping, offline testing, topology validation |
| **Budget** | Gemini 2.0 Flash + Haiku 4.5 | **$0.10–$0.30** | 6/10 | Internal drafts, mockups, proof-of-concept |
| **Standard (Recommended)** | Sonnet 5 + Haiku 4.5 | **$0.60–$1.30** | 8/10 | Production client deliveries |
| **Premium** | Sonnet 5 + Haiku 4.5 + Opus 4.8 | **$1.00–$1.80** | 9/10 | Award-caliber work, high-profile clients |
| **Enterprise** | Opus 4.8 escalation + Sonnet 5 + Haiku 4.5 | **$2.00–$4.00** | 9.5/10 | High-stakes pitches, Fortune 500 clients |

> **Do NOT use Fable 5 for Engineering.** It costs $10/$50 per million tokens and is massive overkill for React/Tailwind scaffolding. The Engineering agent performs structured-output code generation, not frontier reasoning.

---

## 6. Monthly Scaling

| Monthly Volume | API Cost | Infrastructure | **Total Monthly** |
|----------------|----------|----------------|------------------|
| 1 website | ~$1.00 | $12 | **$13** |
| 5 websites | ~$5.00 | $12 | **$17** |
| 10 websites | ~$10.00 | $12 | **$22** |
| 20 websites | ~$20.00 | $25 | **$45** |
| 50 websites | ~$50.00 | $50 | **$100** |

**Cheapest setup that still produces production-quality code:** Sonnet 5 for Engineering + Haiku 4.5 for everything else. That combination is ~$0.30–$0.80 per site and produces build-passing code. Add Opus 4.8 for Creative Director if you want the cinematic "taste" upgrade (~$1.00–$1.50 total per site).

---

## 7. Cost-Efficiency Design Decisions

### 7.1 Context Slicing Per Agent

`pipeline/context.py` explicitly documents this as the primary token-cost control mechanism. Each agent receives only the context it needs from the shared state, preventing prompt bloat from cascading state history.

```python
# pipeline/context.py
# "This keeps prompts focused and token costs down"
```

### 7.2 Hard Token Caps

`pipeline/llm.py` hardcodes `max_tokens=8192` for all providers (OpenAI, Anthropic, Groq) and `max_output_tokens=8192` for Google. This prevents runaway generation on any single LLM call.

```python
# pipeline/llm.py
max_tokens=8192,
max_output_tokens=8192,
```

### 7.3 Parallel Execution in Analysis Phase

`website_analysis`, `seo`, and `brand_research` run simultaneously via LangGraph `Send`. This reduces wall-clock time without increasing total token cost.

### 7.4 Model Routing by Task Complexity

- **Haiku 4.5** for SEO, Brand Research, Lead Discovery, QA — cheap, fast, structured-output-capable.
- **Sonnet 5** for UX, UI, Motion, Engineering — balanced quality and cost for structured generation.
- **Opus 4.8** for Creative Director only — the "taste bottleneck" where quality difference justifies the 5–10x cost premium. Also used for Engineering escalation on QA failure.

### 7.5 QA Retry Loop with Escalation

When QA fails, the system automatically routes back to the weakest agent and re-runs QA. Engineering failures escalate to Opus 4.8 for rework. The loop is capped at 3 retries, bounding worst-case cost.

### 7.6 Simulation Mode

The pipeline supports a zero-cost simulation mode that runs the full orchestration without API calls, validating topology, retry logic, and state transitions at no expense.

### 7.7 Checkpointed State

LangGraph checkpointing persists state to PostgreSQL/Redis after each node. If the process crashes or is interrupted, it resumes from the last checkpoint rather than restarting — meaning crashed runs cost nothing extra.

### 7.8 Structured Output Contracts

Every agent returns a validated Pydantic model (`pipeline/schemas.py`). LangGraph `with_structured_output` ensures the LLM emits exactly the schema, reducing token waste from verbose free-form responses and eliminating the need for post-processing parsing.

---

## Appendix: Model Pricing Reference (per 1M tokens)

| Provider | Model | Input Price | Output Price | Context Window | Best For |
|----------|-------|-------------|--------------|----------------|----------|
| **OpenAI** | GPT-4o | $2.50 | $10.00 | 128k | General purpose |
| **OpenAI** | GPT-4o-mini | $0.15 | $0.60 | 128k | Cheap fallback |
| **OpenAI** | o1 | $15.00 | $60.00 | 200k | Complex reasoning |
| **Anthropic** | Claude Sonnet 4 | $3.00 | $15.00 | 200k | Code generation |
| **Anthropic** | Claude Haiku 3.5 | $0.80 | $4.00 | 200k | Fast/cheap agents |
| **Anthropic** | Claude Sonnet 5 | $3.00 | $15.00 | 200k | Primary engineering/UX/UI |
| **Anthropic** | Claude Opus 4.8 | $5.00 | $25.00 | 200k | Creative direction, escalation |
| **Google** | Gemini 2.0 Flash | Free | Free | 1M | Budget option |
| **Google** | Gemini 2.0 Pro | $1.25 (text) / $2.50 (vision) | $10.00 | 2M | Best Google model |
| **Groq** | Llama 3.3 70B | Free | Free | 128k | Fast inference, simulation |
| **Groq** | Llama 3.1 8B | Free | Free | 128k | Very fast inference |

---

*Last updated: 2026-07-16*
