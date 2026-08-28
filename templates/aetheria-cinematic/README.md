# Aetheria Museum — Cinematic Website

> **Genre:** Hybrid Genre 1 (scroll-camera narrative) + Genre 0 (DOM/CSS production, no WebGL)
> **Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + GSAP + Lenis
> **Port:** 3471

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3471

## Build

```bash
npm run build
npm run start
```

## Design Concept

See `DESIGN_CONCEPT.md` for the full design concept, art direction, color palette, typography system, motion specs, and structural blueprint.

## Key Features

- **"Light as Architecture"** — cinematic museum experience using luminosity, fog, and depth-of-field as structural elements
- **Lenis smooth scroll** at `duration: 1.8` for heavy, deliberate gallery pacing
- **GSAP ScrollTrigger scrub** on all scroll-bound reveals (fully reversible)
- **3-layer parallax** (background 0.3x, midground 0.6x, foreground 1.0x) on exhibition hero
- **Depth-of-field** via CSS `filter: blur()` + `brightness()` on parallax layers
- **Fog system** using layered CSS gradients with scroll-driven opacity
- **Spotlight reveal** — `radial-gradient` position tied to scroll progress
- **Custom cursor** — amber "flashlight" dot (expands on art, shrinks on text)
- **Film grain overlay** — subtle SVG noise texture for physicality
- **Museum label pattern** — institutional typography for artworks
- **Image zoom** — "viewing room" modal with dark periphery blur

## Color Palette

| Token | Hex | Role |
|-------|-----|------|
| Void | `#0a0a0c` | Background, deepest shadows |
| Charcoal | `#141413` | Surface, elevated shadows |
| Stone | `#1a1a1e` | Secondary surface |
| Bone | `#f5f2eb` | Primary text |
| Bone Dim | `#b8b4a8` | Secondary text |
| Amber | `#c9a96e` | Accent — the spotlight |

## Typography

- **Display:** Cormorant Garamond Light (8–12vw, negative letter-spacing)
- **Body:** Cormorant Garamond Regular (1.25rem)
- **UI:** Inter Light (navigation, metadata)
- **Mono:** JetBrains Mono (accession numbers, technical metadata)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Homepage composition
│   └── globals.css       # Design tokens, resets, DOF system
├── components/
│   ├── sections/
│   │   ├── MuseumNav.tsx
│   │   ├── HeroFog.tsx
│   │   ├── ExhibitionHero.tsx
│   │   ├── CollectionGrid.tsx
│   │   ├── VisitSection.tsx
│   │   └── MuseumFooter.tsx
│   └── ui/
│       ├── CustomCursor.tsx
│       ├── FilmGrainOverlay.tsx
│       └── LenisProvider.tsx
└── lib/
    └── motion.ts         # GSAP + ScrollTrigger utilities
```

## Accessibility

- `prefers-reduced-motion` respected (all animations fall back to static)
- Keyboard navigation on all interactive elements
- Semantic HTML (`<article>`, `<section>`, `<nav>`, `<time>`)
- Descriptive alt text on all images
- Focus management in image zoom modal

## Performance Targets

- TTI < 2.5s
- Lighthouse Performance > 85
- 60fps on mid-range mobile
- < 300KB per above-fold image
