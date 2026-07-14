# Autonomous Multi-Agent Website Redesign Platform

An **agent-native orchestration platform** built on [LangGraph](https://github.com/langchain-ai/langgraph)
that behaves like a premium digital agency. Give it one prompt —

> *“Redesign the homepage of https://example.com into a cinematic,
> award-winning website.”*

— and it autonomously plans, crawls, researches, art-directs, designs, engineers
and QA-tests the redesign, then delivers a production-ready Next.js project plus
a full set of strategy reports.

## What's inside

10 specialised agents coordinated by a Master Orchestrator:

`Planner/Supervisor` → `Website Analysis` · `SEO` · `Brand Research` (parallel)
→ `Creative Director` → `UX` → `UI Design` · `Motion Design` → `Frontend
Engineering` → `QA` → `Synthesizer`.

Features: **parallel execution**, **automatic QA retry loop**, **checkpointed
state** (pause/resume/crash-recovery), **human-approval checkpoints**, **shared
memory**, **streaming progress** (WebSocket/SSE), and **structured outputs**
every agent.

## Quick start

```bash
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt

# Runs fully OFFLINE with deterministic, templated outputs — no API keys needed.
export LLM_PROVIDER=simulation
python scripts/run_pipeline.py "Redesign https://example.com into a cinematic site"

# For real generation:
#   export LLM_PROVIDER=openai
#   export OPENAI_API_KEY=sk-...
```

### API + dashboard

```bash
uvicorn redesign.api.main:app --reload
# → http://localhost:8000/docs
```

### Docker (Postgres + Redis + API)

```bash
docker compose up --build
```

## Architecture

See **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — it covers the system &
agent architecture, workflow diagrams, folder structure, tech-stack trade-offs,
DB schema, memory architecture, prompt templates, tools, API, state management,
failure recovery, retry strategy, security, scalability, roadmap, MVP and
production deployment.

## Project layout

```
redesign/   package: config, schemas, state, llm, memory, storage,
            orchestrator, runner, agents/, tools/, prompts/, api/
scripts/    CLI runner
tests/      offline simulation tests
migrations/ Postgres schema
docs/       full architecture document
```

## Tests

```bash
pytest -q
```

## License

See `LICENSE`.
