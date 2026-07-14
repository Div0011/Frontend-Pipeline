# Cinematic Website

This repository contains two things:

1. **`/`** — The live **SmashGuys** website (Next.js 15 + Tailwind CSS 4 + GSAP + Lenis)
2. **`/pipeline`** — The **Frontend Pipeline** that built it (multi-agent LangGraph orchestration)

---

## Live Site

The `main` branch contains the SmashGuys website. GitHub Pages automatically deploys it via the workflow in `.github/workflows/deploy.yml`.

**Local development:**

```bash
npm install
npm run dev
# → http://localhost:3000
```

**Production build:**

```bash
npm run build
npm run start
```

---

## Frontend Pipeline

The `pipeline/` directory contains the autonomous multi-agent website redesign platform.

**Quick start:**

```bash
cd pipeline
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium

# Simulation mode (no API keys)
python scripts/run_pipeline.py "Redesign https://example.com into a cinematic site"

# Production mode
export LLM_PROVIDER=anthropic
export ANTHROPIC_API_KEY=sk-ant-...
python scripts/run_pipeline.py "Redesign https://example.com into a cinematic site"
```

See `pipeline/docs/PROPOSAL.md` for the full business proposal, cost margins, and architecture.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | GSAP ScrollTrigger, Framer Motion, Lenis |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Fonts | Playfair Display, Inter, Caveat |
| Orchestration | LangGraph + LangChain |

---

## License

See `pipeline/LICENSE` for details.
