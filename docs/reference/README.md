# 📚 Frontend Pipeline Reference Library

> **Purpose:** Central, structured reference for the cinematic website generation pipeline. All knowledge extracted from 15 premium reference sites, organized for fast agent consumption during template generation.

## 📂 Directory Structure

```
reference/
├── README.md                         # ← This file — master index
├── patterns/                         # Cross-template design & motion patterns
│   ├── CROSS_TEMPLATE_PATTERNS.md    # Universal patterns across all 15 sites
│   ├── SPLIT_TEXT_PATTERN.md         # Split-text animation implementation
│   ├── SCROLL_NARRATIVE_PATTERNS.md  # ScrollTrigger vs scrub patterns
│   └── THREE_D_INTEGRATION.md        # 3D/WebGL integration strategies
├── prompts/                          # AI generation prompts for each template
│   ├── TEMPLATE_PROMPTS.md           # 5 template prompts with tech stacks
│   ├── ASSET_GENERATION.md           # AI tools for video/image/3D generation
│   └── PREFLIGHT_INSTRUCTIONS.md     # Pre-build instructions for agents
├── motion-tokens/
│   └── MOTION_TOKEN_LIBRARY.md       # Universal motion values (durations, eases, staggers)
├── component-architectures/
│   └── COMPONENT_ARCHITECTURE.md     # Reusable component patterns by template
├── templates/                        # Template-specific synthesis docs
│   ├── film-portfolio/
│   │   ├── SYNTHESIS.md              # Obys + Minh Pham + Imagina synthesis
│   │   └── COMPONENTS.md             # Preloader, Hero, ProjectGrid, WorkGrid, ProjectOverlay
│   ├── saas-launch/
│   │   ├── SYNTHESIS.md              # Jeton + Hubtown + Lusion synthesis
│   │   └── COMPONENTS.md             # R3F Scene, Features, Pricing, CTA
│   ├── corporate/
│   │   ├── SYNTHESIS.md              # L'Oréal + Canals + History synthesis
│   │   └── COMPONENTS.md             # Chapter scrollytelling, ChapterProgress, BackgroundScene
│   ├── agency/
│   │   ├── SYNTHESIS.md              # Locomotive + Active Theory + Resn synthesis
│   │   └── COMPONENTS.md             # AgencyPortfolio, ShowreelPlayer, CustomCursor
│   └── product/
│       ├── SYNTHESIS.md              # Kieran Clarke + Vertigo + Lusion Product synthesis
│       └── COMPONENTS.md             # DisassemblySection, ProductScene, ComponentPart
├── qa-guardrails/
│   └── QA_CHECKLIST.md               # Genericness, scroll-reversibility, mobile perf checks
└── LUSION_REFERENCE_SITE.md          # Raw extracted patterns from lusion.co (template-2 reference)
```

## 🔗 Key Documents

| Document | What It Contains | When To Use |
|---|---|---|
| `docs/CINEMATIC_5_TEMPLATES_PROMPT_LIBRARY.md` | 5 template generation prompts + AI asset tools | Starting a new template build |
| `docs/CINEMATIC_REFERENCE_ANALYSIS.md` | Deep analysis of 5 cinematic reference sites | Understanding reference quality bar |
| `reference.md` (root) | Master playbook — full pipeline reference | Any phase of pipeline operation |
| `reference/patterns/CROSS_TEMPLATE_PATTERNS.md` | Universal motion & design patterns | Designing component interactions |
| `reference/motion-tokens/MOTION_TOKEN_LIBRARY.md` | Standard animation values | Standardizing animation parameters |
| `reference/component-architectures/COMPONENT_ARCHITECTURE.md` | Reusable component blueprints | Component implementation |
| `reference/qa-guardrails/QA_CHECKLIST.md` | Pre-deployment quality checklist | Build verification |

## 🏗️ Pipeline Integration

The reference library feeds into the `pipeline/` orchestrator pipeline at specific stages:

1. **Planning Stage** → Consumes `prompts/TEMPLATE_PROMPTS.md` + template `SYNTHESIS.md`
2. **Design Stage** → Consumes `patterns/*.md` + `motion-tokens/*.md`
3. **Engineering Stage** → Consumes `component-architectures/*.md` + template `COMPONENTS.md`
4. **QA Stage** → Consumes `qa-guardrails/QA_CHECKLIST.md`

## 📋 Legend

| Icon | Meaning |
|---|---|
| ✅ | Pattern verified in built template |
| ⬜ | Pattern identified but not yet built |
| 🔧 | Pattern needs debugging/fix |
| 📐 | Design pattern (not code) |
