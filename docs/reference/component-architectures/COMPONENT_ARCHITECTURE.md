# Component Architecture Patterns

> Reusable component blueprints across all 5 template types, extracted from 15 reference sites and verified in 5 built Next.js projects.

---

## Universal Component Layer Pattern

```
Component Layer Pattern (All Templates)
├── Layout Layer (root.tsx + globals.css)
│   ├── Font variables (display, sans, mono)
│   ├── Global styles + prefers-reduced-motion media query
│   └── LenisProvider wraps children
├── Section Layer (page.tsx composes sections)
│   ├── Hero — first viewport, video/canvas/3D + typography
│   ├── Feature/Grid — content blocks with scroll-reveal
│   ├── Narrative — scroll-driven timeline/story
│   └── CTA/Footer — conversion + branding
├── Three/Canvas Layer (isolated in sections)
│   ├── R3F Scene — useFrame for progress-driven animation
│   ├── Canvas Scrubber — Image[] + canvas drawImage
│   └── Fallback — prefers-reduced-motion: static SVG/Image
└── Motion Layer (lib/motion.ts)
    ├── useReveal hook — GSAP from with ScrollTrigger (once)
    ├── initReveals — data-reveal attribute batch init
    └── prefers-reduced-motion: gsap.set (skip animation)
```

---

## Component Catalog by Template

### Template 1: Film Portfolio

| Component | Pattern | Status | File |
|-----------|---------|--------|------|
| `Preloader` | Concentric rings + percentage counter, GSAP timeline auto-dismiss | ✅ Built | `src/components/Preloader.tsx` |
| `Hero` | character-level split with `ref={(el) => refs[i]=el}`, blur+y stagger | ✅ Built | `src/components/Hero.tsx` |
| `ProjectGrid` | `AnimatePresence` layout grid with perspective hover (12° rotateX/Y) | ✅ Built | `src/components/ProjectGrid.tsx` |
| `WorkGrid` | 3-viewport toggle: vertical strip, horizontal strip, CSS grid | ⬜ Planned | `src/components/WorkGrid.tsx` |
| `ProjectOverlay` | Clip-path morph: circle(0%) → circle(100%), video inside | ⬜ Planned | `src/components/ProjectOverlay.tsx` |
| `useReducedMotion` | window.matchMedia hook + GSAP fallback | ✅ Built | `src/hooks/useReducedMotion.ts` |
| `LenisProvider` | Client wrapper for Lenis smooth scroll | ✅ Built | `src/components/providers/LenisProvider.tsx` |

### Template 2: SaaS Launch

| Component | Pattern | Status | File |
|-----------|---------|--------|------|
| `Scene` (R3F) | `useFrame` progress-driven lerp, camera position direct set, `enableRotate: false` | ✅ Built | `src/components/three/Scene.tsx` |
| `Hero` | Full-viewport 3D + tagline overlay | ✅ Built | `src/components/sections/Hero.tsx` |
| `Features` | Pinned scroll section + side-by-side 3D scene + feature list | ✅ Built | `src/components/sections/Features.tsx` |
| `Pricing` | Grid with popular badge, `data-reveal` stagger on scroll | ✅ Built | `src/components/sections/Pricing.tsx` |
| `Testimonials` | Scroll-triggered stat counters | ✅ Built | `src/components/sections/Testimonials.tsx` |
| `Cta` | Email CTA with micro-interactions | ✅ Built | `src/components/sections/Cta.tsx` |
| `Navigation` | Fixed header with scroll-aware theme | ✅ Built | `src/components/Navigation.tsx` |

### Template 3: Corporate

| Component | Pattern | Status | File |
|-----------|---------|--------|------|
| `Navigation` | Chapter-aware nav with progress indicators | ✅ Built | `src/components/sections/Navigation.tsx` |
| `Hero` | Ken Burns atmospheric background + title | ✅ Built | `src/components/sections/Hero.tsx` |
| `OurStory` | Timeline with alternating cards, `useRef` + gsap.context | ✅ Built | `src/components/sections/OurStory.tsx` |
| `Expertise` | Grid of service cards with hover reveals | ✅ Built | `src/components/sections/Expertise.tsx` |
| `Leadership` | Team grid with bio reveals | ✅ Built | `src/components/sections/Leadership.tsx` |
| `ChapterTwo` | Zig-zag editorial section | ✅ Built | `src/components/sections/ChapterTwo.tsx` |
| `ChapterThree` | Atmospheric media + text overlay | ✅ Built | `src/components/sections/ChapterThree.tsx` |
| `ChapterFour` | Forward vision section (was broken, FIXED) | ✅ Built | `src/components/sections/ChapterFour.tsx` |
| `BackgroundScene` | Atmospheric 3D particles/env | ✅ Built | `src/components/three/BackgroundScene.tsx` |
| `ChapterProgress` | Visual scroll progress bar | ⬜ Planned | `src/components/sections/ChapterProgress.tsx` |

### Template 4: Creative Agency

| Component | Pattern | Status | File |
|-----------|---------|--------|------|
| `CustomCursor` | Color auto-inversion, `cursor: none` | ✅ Built | `src/components/CustomCursor.tsx` |
| `Navigation` | Fixed with hover-shuffle links | ✅ Built | `src/components/Navigation.tsx` |
| `AgencyPortfolio` | Horizontal panel-slide with Lenis snap | ✅ Built | `src/components/AgencyPortfolio.tsx` |
| `BackgroundCanvas` | WebGL particle canvas layer | ✅ Built | `src/components/BackgroundCanvas.tsx` |
| `TransitionOverlay` | Section morph transition | ✅ Built | `src/components/TransitionOverlay.tsx` |
| `ShowreelPlayer` | Immersive showreel with controls | ⬜ Planned | `src/components/ShowreelPlayer.tsx` |
| `ProjectOverlay` | Full-screen project overlay | ⬜ Planned | `src/components/ProjectOverlay.tsx` |

### Template 5: Physical Product

| Component | Pattern | Status | File |
|-----------|---------|--------|------|
| `Hero` | Product hero with 3D or frame-sequence | ✅ Built | `src/components/sections/Hero.tsx` |
| `DisassemblySection` | 300-frame canvas scrubber with 4 spec cards | ✅ Built | `src/components/sections/DisassemblySection.tsx` |
| `HotspotExplorer` | Interactive product callouts | ✅ Built | `src/components/sections/HotspotExplorer.tsx` |
| `TechSpecs` | Product specifications | ✅ Built | `src/components/sections/TechSpecs.tsx` |
| `ProductScene` | R3F scroll-driven product viewer | ⬜ Planned | `src/components/three/ProductScene.tsx` |
| `ComponentPart` | Progress-driven lerp for explode/assemble | ⬜ Planned | `src/components/three/ComponentPart.tsx` |
| `PurchaseCta` | Purchase section with CTA | ⬜ Planned | `src/components/sections/PurchaseCta.tsx` |

---

## Verified Component Patterns (from successful builds)

### Canvas Scrubber (Template 5)
```tsx
// Core loop for frame-sequence rendering
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
  const img = loadedImagesRef.current[frameIndex];
  if (img?.complete) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCover(ctx, img, canvas.width, canvas.height);
  }
}, [progress, totalFrames]);
```

### Lenis Provider (All Templates)
```tsx
"use client";
import { ReactLenis } from "lenis/react";
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children}
    </ReactLenis>
  );
}
```

### useReducedMotion Hook (Template 1)
```tsx
"use client";
import { useEffect, useState } from "react";
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}
```

### R3F Scene with safe null ref (Template 2)
```tsx
// ✅ ALWAYS guard sectionRef.current before use
const el = sectionRef.current;
if (!el) return;
const ctx = gsap.context(() => { ... }, el);
return () => ctx.revert();
