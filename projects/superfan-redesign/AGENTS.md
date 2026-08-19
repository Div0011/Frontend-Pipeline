# Superfan Redesign — Agent Guide

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` (or `npx next dev -p 3480`) | Start dev server at http://localhost:3480 |
| `npx tsc --noEmit` | TypeScript typecheck |
| `npx next build` | Production build |
| `npx next lint` | Lint (interactive ESLint config prompt on first run) |
| `./scripts/encode-videos.sh <input.mp4>` | Encode video to HLS adaptive streaming (1080p + 480p) |

## Project Structure

```
app/
  page.tsx          — Main page: ScrollColorMorph + AmbientBackground + 9 chapters
  layout.tsx        — Root layout (Lenis+GSAP, scroll progress bar, cursor, nav, footer)
components/
  chapters/         — Scroll-driven sections (ColdOpen, ProductShowcase, BrandStatement, TechnologySection, etc.)
  shared/           — Reusable: ScrollyVideo, AmbientBackground, CustomCursor, MagneticElement, ScrollColorMorph
  layout/           — Navigation, Footer
lib/
  data.ts           — Product, Review, FAQ data (all media is .mp4 video)
  cart-context.tsx  — Cart state management
styles/
  globals.css       — Global CSS with new blue/white palette tokens, animations
  design-tokens.css — Full design token system (surfaces, blues, whites, gradients, easing)
  /public/media/    — All video assets (no static images)
scripts/
  encode-videos.sh  — ffmpeg pipeline for HLS adaptive streaming
pipeline/
  DISCOVERY_QUESTIONNAIRE.md — Pre-redesign intake form
  DESIGN_REFERENCE_ARCHIVE.md — Smashguys/Ferrari/CANALS reference patterns
```

## User Journey (Section Order)

| Order | Chapter | Component | id |
|-------|---------|-----------|-----|
| 1 | Hero (Hook) | ColdOpen (ScrollyVideo) | — |
| 2 | Product Show | ProductShowcase | `#showcase` |
| 3 | How It Works: Brand intro | BrandStatement | `#brand-statement` |
| 3 | How It Works: Tech exploded view | TechnologySection (ScrollyVideo) | `#technology` |
| 4 | Impact: Energy savings | EnergySavingsCalculator | `#calculator` |
| 4 | Impact: Environmental | SmokeDynamicsSection (ScrollyVideo) | `#smoke-defense` |
| 5 | Social Proof | Testimonials | `#testimonials` |
| 5 | Social Proof | AwardsSection | `#awards` |
| 6 | Configurator: Smart tech | SmartTechExplorer | `#smart-tech` |
| 6 | Configurator: Collection | ProductGrid | `#collection` |
| 7 | FAQ | FAQSection | `#faq` |
| 8 | CTA (Conversion) | CTASection + CloseSection | — |

## Key Patterns

- **ScrollyVideo**: Uses GSAP ScrollTrigger with `pin: true` and `scrub: 0.4`. Video `currentTime` mapped to `self.progress` via RAF-throttled `seekVideo`. Stage text fades via GSAP tweens with `overwrite: true` (prevents stuck transitions during fast scroll)
- **ScrollColorMorph**: Background div with color stops interpolated via GSAP ScrollTrigger. Smooth color transition as user scrolls through chapters
- **AmbientBackground**: 3-layer parallax (mouse-follow at different depth ratios) + 120 canvas particles with mouse attraction + velocity-based spark emission + scroll-reactive grid lines. All at `z-index: 0` behind content
- **CustomCursor**: Triple-layer (velocity-scaled dot + white hover ring + trailing cyan ring), scales with mouse velocity, glow intensifies on interactive elements
- **MagneticElement**: Wrapper component that makes any element magnetically pull toward cursor on mousemove
- **ProductCard**: 3D tilt (rotateX/rotateY) based on mouse position + mouse-follow spotlight glow + hover video playback
- **prefers-reduced-motion**: Hook disables all parallax, tilt, magnetics, and background effects if user prefers reduced motion
- **Color palette**: `--color-surface-void: #0a192f` (deep navy bg), `--color-primary-blue: #0052cc` (royal blue), `--color-cyan-glow: #00d4ff` (cyan), `--color-white: #ffffff` (primary text)

