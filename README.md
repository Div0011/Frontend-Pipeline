# Frontend Pipeline

> **Cinematic AI-Driven Web Application Redesign Engine**
> An end-to-end, multi-agent platform that transforms any website into a high-end, cinematic, ultra-modern digital storefront — from a single natural-language prompt.

---

## What It Does

Frontend Pipeline is a production-grade **LangGraph orchestration platform** that behaves like a premium digital agency. You provide a single sentence — for example, *"Redesign the homepage of https://example.com into a cinematic, award-winning website"* — and the platform autonomously plans, executes, reviews, and assembles the redesign:

1. **Crawls** the target site and captures screenshots
2. **Researches** brand DNA, competitors, and SEO landscape
3. **Directs** the art direction, typography, color system, and cinematic mechanic
4. **Designs** the UX sitemap, wireframes, UI components, and motion choreography
5. **Engineers** the full production Next.js codebase
6. **QA's** the output across 10 dimensions (including genericness, mobile performance, and scroll reversibility)
7. **Delivers** a zipped, build-verified project with reports

Every step is checkpointed for crash-resilience, streamed live to the client, and routed to the specific specialist agent trained for that function.

---

## Architecture

### High-Level Topology

```text
Client (web / CLI)
    │
    ▼
API Layer (FastAPI + WebSocket)
    │
    ▼
Orchestration Layer (LangGraph StateGraph)
    │
    ├── planner → supervisor ⇄ (agents → post_agent → supervisor)
    │                    └─► [approval] ─► synthesizer ─► END
    │
    ├── Parallel fan-out (Send)
    ├── Dependency-enforced scheduling
    ├── QA retry loop (auto-rework weakest agent)
    ├── Human-in-the-loop approval gate
    └── Durable checkpointing (pause / resume / crash-recovery)
    │
    ▼
Tool Layer
    ├── crawl (httpx + BeautifulSoup)
    ├── screenshot (Playwright)
    ├── vision (VLM screenshot analysis)
    ├── lighthouse (performance audit)
    └── web_search (brand / competitive research)
    │
    ▼
Persistence Layer
    ├── PostgreSQL (checkpoints, long-term store, job registry)
    ├── Redis (pub/sub live progress, job queue)
    └── Object store (generated code, screenshots, zips)
```

### Agent System

Ten specialist agents, each a single-responsibility LangGraph node. Every agent shares the same shape: *gather context → (optional) run tools → call structured LLM → write owned state channel + bookkeeping*.

| # | Agent | Owns (State Channel) | Key Inputs | Tools |
|---|-------|----------------------|------------|-------|
| 1 | **Master Orchestrator** (planner + supervisor) | `plan`, scheduling | request | — |
| 2 | Website Analysis | `analysis` | url | crawl, screenshot, vision |
| 3 | SEO | `seo` | url, analysis | crawl, lighthouse |
| 4 | Brand Research | `brand` | url, intent | web_search |
| 5 | Lead Discovery | `lead` | brand, analysis | web_search |
| 6 | Creative Director | `creative` | brand, analysis, seo | — |
| 7 | UX | `ux` | brand, creative, analysis | — |
| 8 | UI Design | `ui` | creative, ux, brand | — |
| 9 | Motion Design | `motion` | creative, ui, ux | — |
| 10 | Frontend Engineering | `engineering` | ui, motion, ux, seo, creative | — |
| 11 | QA | `qa` | engineering, ui, motion, seo, creative | — |

**Dependency DAG:**
- **Analysis phase** (Website Analysis, SEO, Brand Research) runs in parallel
- Lead Discovery waits for Brand Research + Website Analysis
- Creative Director waits for all analysis
- UX waits for Brand Research + Creative Director
- UI Design waits for Creative Director + UX
- Motion Design waits for Creative Director + UI Design
- Engineering waits for UI + Motion + UX
- QA waits for Engineering
- On QA failure, the weakest agent is automatically routed back for targeted rework

---

## Repository Structure

```text
Frontend Pipeline/
├── pipeline/                       # Core orchestration engine (LangGraph + FastAPI)
│   ├── __init__.py
│   ├── config.py                   # Central settings (pydantic-settings)
│   ├── state.py                    # LangGraph shared state (RedesignState)
│   ├── schemas.py                  # Pydantic contracts for all agents & state channels
│   ├── orchestrator.py             # LangGraph StateGraph construction + routing
│   ├── runner.py                   # Async execution engine (stream / run / resume)
│   ├── llm.py                      # Multi-provider LLM abstraction
│   ├── context.py                  # Context assembly & per-agent prompt rendering
│   ├── cost_guard.py               # Token & credit budget guardrails
│   ├── observability.py            # Telemetry, LangSmith tracing & structured logs
│   ├── memory.py                   # Checkpointer + long-term Store
│   ├── reporting.py                # Redesign summary report generator
│   ├── storage.py                  # ArtifactStore (code, media buffers, zips)
│   ├── agents/                     # Specialist agent nodes
│   │   ├── __init__.py
│   │   ├── base.py                 # Shared agent helpers (emit, finalize, call_agent_model)
│   │   ├── planner.py              # Master Orchestrator
│   │   ├── website_analysis.py     # Site crawler + vision analyzer
│   │   ├── seo.py                  # SEO & metadata strategist
│   │   ├── brand_research.py       # Brand DNA & competitive research
│   │   ├── lead_discovery.py       # Conversion & intent intelligence
│   │   ├── creative_director.py    # Art direction & aesthetic mechanics
│   │   ├── ux.py                   # Sitemap & information architecture
│   │   ├── ui.py                   # Design system & component tokens
│   │   ├── motion.py               # Physics choreography & scroll timelines
│   │   ├── engineering.py          # Next.js code assembly & generation
│   │   ├── qa.py                   # 10-dimension automated quality gate
│   │   └── classification.py       # Brand archetype & style classifier
│   ├── tools/                      # Execution tools
│   │   ├── __init__.py
│   │   ├── crawl.py                # Whole-site crawler (httpx + BeautifulSoup)
│   │   ├── screenshot.py           # Playwright screenshot capture
│   │   ├── vision.py               # VLM-powered screenshot analysis
│   │   ├── lighthouse.py           # Lighthouse performance audit
│   │   ├── search.py               # Web search (Tavily / Serper / mock)
│   │   └── media.py                # Media processing (WebP frame extraction)
│   ├── prompts/                    # System prompt templates & cinematic mechanics
│   ├── api/                        # FastAPI + WebSocket service
│   ├── scripts/                    # CLI execution entry points & helper utilities
│   ├── reference/                  # Design pattern archives & component tokens
│   └── migrations/                 # PostgreSQL database migrations
│
├── projects/                       # Generated & active web applications (Self-contained)
│   ├── salon-website/              # LUMIÈRE Haute Coiffure Paris (Live Production)
│   ├── smashguys/                  # Smash Guys Culinary (3D / Motion)
│   ├── smashguys-prototype/        # Interactive sticker & physics prototype
│   ├── soda-company/               # Craft Soda Brand & Experience
│   ├── superfan-redesign/          # Superfan BLDC Ceiling Fans
│   ├── fabroar/                    # Fabroar Luxury Apparel
│   ├── aetheria-cinematic/         # Aetheria Architecture
│   ├── arch-studio/                # Arch Studio Portfolio
│   ├── hotel-cinematic/            # Luxury Hospitality
│   ├── ocean-resort/               # Ocean Resort Hospitality
│   ├── rajmahal-palace/            # Heritage Hospitality
│   ├── razorpay/                   # Razorpay Fintech Redesign
│   ├── shift-ease/                 # Logistics & Relocation
│   ├── kinoatwork/                 # Kino At Work Film Agency
│   ├── zerzurastudio/              # Zerzura Creative Studio
│   ├── gym-futuristic/             # Futuristic Fitness
│   ├── template-1-film-portfolio/  # Template 1: Film Portfolio
│   ├── template-2-saas-launch/     # Template 2: SaaS Launch
│   ├── template-3-corporate/       # Template 3: Corporate
│   ├── template-4-agency/          # Template 4: Agency Editorial
│   └── template-5-product/         # Template 5: Product Launch
│
├── docs/                           # Central documentation hub
│   ├── ARCHITECTURE.md             # Deep system architecture & DAG specification
│   ├── PIPELINE_GUIDE.md           # Operational runbook & CLI commands
│   ├── FIVE_TEMPLATE_PROMPTS_SPEC.md # Standard prompt library
│   ├── CINEMATIC_REFERENCE_ANALYSIS.md # Motion, physics & 3D reference guide
│   ├── TOKEN_AND_CREDIT_BREAKDOWN.md # Cost breakdown & LLM model routing
│   ├── PROPOSAL.md                 # System architecture proposal
│   ├── GENERATION_LIST.md          # Generated site catalog
│   └── reference/                  # Pattern archives & QA guardrails
│
├── tests/                          # Automated test suites
│   ├── test_orchestrator.py        # Graph compilation & DAG routing
│   └── test_cinematic_templates.py # Template schema & prompt verification
│
├── reports/                        # Pipeline execution outputs & deliverables
│   ├── brand.md
│   ├── creative.md
│   ├── engineering.md
│   ├── lead.md
│   ├── motion.md
│   ├── qa.md
│   ├── seo.md
│   ├── ui.md
│   ├── ux.md
│   └── website_analysis.md
│
├── artifacts/                      # Assets, reference copies & benchmarks
│   ├── designs/                    # UI/UX design deliverables
│   ├── projects/                   # Pipeline test artifacts & build zips
│   ├── screenshots/                # Visual benchmarks & crawl captures
│   ├── skills/                     # Skill asset backups
│   ├── vendor_references/          # Vendor reference libraries (LangGraph, Scrapling)
│   └── REFERENCE_COPIES/           # Template reference copies (1-9)
│
├── .agents/                        # Agent system skills & capabilities
│   └── skills/                     # 114 specialized agent skills
│
├── Dockerfile                      # Container build definition
├── docker-compose.yml              # Local infrastructure (Postgres + Redis + API)
├── requirements.txt                # Python environment dependencies
├── pytest.ini                      # Pytest test runner configuration
├── .env                            # Environment secrets & API keys
└── README.md                       # Comprehensive documentation

```

---

## Quick Start

### Prerequisites

- **Python** 3.11+ (with `uv` or `pip`)
- **Node.js** 18+ (for generated projects)
- **PostgreSQL** 16+ (with pgvector) — optional, for persistent checkpointing
- **Redis** 7+ — optional, for live progress streaming

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Frontend Pipeline"

# Install Python dependencies
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Install Node.js motion libraries (used by generated projects)
npm install
```

### Environment Configuration

Copy `.env` and configure at minimum:

```bash
# LLM provider: openai | anthropic | google | groq | ollama | huggingface | simulation
LLM_PROVIDER=simulation

# For production runs, set a real provider + API key:
# LLM_PROVIDER=openai
# OPENAI_API_KEY=sk-...

# Search provider: tavily | serper | mock
SEARCH_PROVIDER=mock
```

### Run the Pipeline

**CLI (single redesign):**
```bash
python -m pipeline.scripts.run_pipeline "Redesign https://example.com into a cinematic luxury storefront"
```

**API server (FastAPI + WebSocket):**
```bash
uvicorn pipeline.api.main:app --host 0.0.0.0 --port 8000
```

**Submit a redesign via API:**
```bash
curl -X POST http://localhost:8000/api/redesign \
  -H "Content-Type: application/json" \
  -d '{"request": "Redesign https://example.com into a cinematic luxury storefront"}'
```

**Stream progress via WebSocket:**
```bash
ws://localhost:8000/api/redesign/{project_id}/ws?request=Redesign+https://example.com
```

### Run Tests

```bash
pytest tests/ -v
```

---

## Design System & Cinematic Genres

The pipeline supports four cinematic genres, automatically classified from the brief:

| Genre | Name | When to Use | Key Mechanic |
|-------|------|-------------|--------------|
| **0** | Cinematic Without Generated Media | No 3D/video assets available; restraint-focused | Typography, pacing, grading, film grain |
| **1** | Full Scroll-Camera | Spatial product with narrative chronology | Scroll-driven 3D camera path (5+ chapters) |
| **2** | Restrained Centerpiece | Physical product without narrative journey | Single hero 3D object + mouse-reveal |
| **2b** | Kinetic-Type-Led | Editorial / agency / information-first | Kinetic typography as the motion system |

**Genre 0 anti-patterns (AI-slop signals to reject):**
- Centered hero with a single gradient blob
- Three identical feature cards
- Wall of logos
- "AI-powered" buzzwords
- Stock-photo testimonials
- System-font everything
- Safe blue/indigo palette
- Rounded-everything SaaS conventions

---

## Configuration Reference

All runtime behavior is driven by environment variables and `pipeline/config.py`.

| Variable | Default | Description |
|----------|---------|-------------|
| `LLM_PROVIDER` | `simulation` | LLM backend: `openai`, `anthropic`, `google`, `groq`, `ollama`, `huggingface`, `simulation` |
| `LLM_MODEL` | `gpt-4o` | Model identifier |
| `LLM_TEMPERATURE` | `0.4` | Generation temperature |
| `OPENAI_API_KEY` | — | API key for OpenAI |
| `ANTHROPIC_API_KEY` | — | API key for Anthropic |
| `GOOGLE_API_KEY` | — | API key for Google |
| `GROQ_API_KEY` | — | API key for Groq |
| `OLLAMA_BASE_URL` | — | Base URL for Ollama |
| `VISION_PROVIDER` | `none` | Vision model provider |
| `SEARCH_PROVIDER` | `mock` | Search backend: `tavily`, `serper`, `mock` |
| `POSTGRES_DSN` | `postgresql://...` | PostgreSQL connection string |
| `REDIS_URL` | `redis://...` | Redis connection string |
| `ARTIFACTS_ROOT` | `./artifacts` | Output directory for generated code |
| `HUMAN_APPROVAL_ENABLED` | `false` | Enable human-in-the-loop approval gate |
| `MAX_QA_RETRIES` | `3` | Maximum QA rework cycles |
| `MAX_AGENT_RETRIES` | `2` | Maximum per-agent retry attempts |
| `PARALLEL_EXECUTION` | `true` | Enable parallel agent fan-out |
| `ENABLE_PLAYWRIGHT` | `true` | Enable Playwright screenshot / crawling |

---

## Agent Optimization & Performance

The pipeline implements several performance and reliability patterns:

- **Per-agent retry wrapper**: Every agent is wrapped with exponential backoff + rate-limit awareness (429 / resource_exhausted detection).
- **Parallel fan-out**: Independent agents run concurrently via LangGraph's `Send` primitive.
- **Dependency enforcement**: Readiness is computed from `task_status` + `depends_on`, preventing race conditions.
- **QA retry loop**: On failure, QA routes the weakest agent back with specific, structured failure detail — not blind regeneration.
- **Deadlock guard**: If no progress is possible, the supervisor synthesizes what it has rather than looping forever.
- **Checkpointing**: Every step is persisted; crashed or paused runs resume exactly where they left off.

---

## Extending the Pipeline

### Adding a New Agent

1. Define the output schema in `pipeline/schemas.py`
2. Add the agent node function in `pipeline/agents/nodes.py`
3. Register the node in `pipeline/orchestrator.py` (`AGENT_NODES`)
4. Add the prompt template in `pipeline/prompts/<agent_name>.md`
5. Add the task to the planner's `tasks` list with correct `depends_on`

### Adding a New Tool

1. Implement the tool function in `pipeline/tools/<tool_name>.py`
2. Export it from `pipeline/tools/__init__.py`
3. Import and invoke it from the relevant agent node

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Orchestration | LangGraph, LangChain |
| API | FastAPI, WebSocket, SSE |
| LLM Providers | OpenAI, Anthropic, Google, Groq, Ollama, HuggingFace |
| Structured Output | Pydantic v2, LangChain `with_structured_output` |
| Persistence | PostgreSQL + pgvector, Redis |
| Crawling / Scraping | httpx, BeautifulSoup4, Playwright |
| Vision | OpenAI GPT-4o, Anthropic Claude, Google Gemini |
| Generated Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, GSAP, Framer Motion, Lenis, Three.js, React Three Fiber |
| Testing | pytest, pytest-asyncio |

---

## Generated Projects Showcase

| Project | Description | Stack |
|---------|-------------|-------|
| **Superfan** | India's first BLDC ceiling fan — cinematic storefront with 360° visualizer | Next.js, React, TypeScript, Lenis, Lucide |
| **Fabroar** | Premium graphic apparel — customizer + luxury editorial | Next.js, Tailwind, Lenis |
| **Aetheria** | Luxury architectural platform | Next.js, React, TypeScript |
| **Arch Studio** | Architecture portfolio | Next.js, React, TypeScript |
| **Smash Guys** | Culinary brand identity | Next.js, React, TypeScript |
| **Ocean Resort** | Luxury hospitality storefront | Next.js, React, TypeScript |
| **Templates 1–5** | Industry starter kits (Film, SaaS, Editorial, Corporate, Product) | Next.js, React, TypeScript |

---

## License

Built with Advanced Agentic Coding architecture for high-end web application development.
