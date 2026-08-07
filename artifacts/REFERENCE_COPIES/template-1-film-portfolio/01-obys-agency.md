# Pattern Analysis: Obys Agency (obys.agency)

## Genre: Creative / Film Portfolio — Kinetic-Type-Led (Genre 2b)

## Core Architecture
- **Stack:** Custom JS (no framework), GL canvas for WebGL background, custom CSS grid system
- **No React/Vue/Svelte** — hand-crafted vanilla JS with GSAP-like scroll handling
- **Preloader:** Black full-screen loader with progress bar (`#preloader-prg`), custom font load detection
- **Layout system:** CSS custom properties (`--m-x`, `--w(2,1)`) for responsive sizing without media queries per breakpoint

## Key Mechanical Patterns

### 1. Three-Viewport Work Grid (Signature Mechanic)
- **Vertical Strip** (`ho-wo-0`): Left-aligned thumbnail strip, scroll-triggered
- **Horizontal Strip** (`ho-wo-1`): Side-scrolling work thumbnails with varying `margin-left` offsets creating a fluid organic drift
- **Grid** (`ho-wo-2`): Complex CSS Grid layout with explicit `grid-row`/`grid-column` positioning, responsive variants (`-l, -m, -s, -xs`) per breakpoint
- **Why it works:** Three different ways to browse work — user chooses. No single layout forces itself on all viewport sizes.

### 2. Typography as Interface
- Custom font `ObysSans4.woff2` — bespoke brand face
- Line-split animation system: `.ln_` (overflow hidden container) > `.ln` (translated element with `will-change: transform`)
- Hover-shuffle text effect on navigation links
- **Line reveal pattern:** Elements pre-translated `translateY(102%)`, animated to `translateY(0)` on scroll/view

### 3. Obsidian Minimalism
- Color: Pure black `#000` + pure white `#fff` + content images only
- No accent color, no gradients, no rounded corners
- Rhythm created by aspect-ratio variations in thumbnail grid (1.00, 0.80, 0.67, 1.50)

### 4. Preloader Flow
1. Fade in preloader with `mix-blend-mode:difference` progress bar
2. Load fonts + critical assets
3. Animate progress bar width
4. `#preloader-bg` (full-screen black) fades out revealing page

### 5. Header Behavior
- Fixed header with logo SVG, work/about links, real-time clock, contact button
- Contact opens email client, no contact form
- Minimal navigation — only 2 menu items (Work, About)

## Design Decisions
- **No 3D** — intentionally avoids the ubiquitous WebGL trend. The "signature" is typography-heavy editorial layout.
- **No mobile hamburger** — nav collapses differently, inline on desktop
- **Infinite scroll thumbnail loop** — work items duplicated in markup for seamless loop feel
- **Image loading strategy:** Responsive `srcSet` with 5 breakpoints per image, lazy loading

## What To Extract For Template 1
- The three-viewport grid system (vertical/horizontal/grid toggle) — implement as tab-based view switcher
- Line-split typography reveal pattern
- Preloader with progress tracking
- Bespoke font integration strategy
- No-3D, typography-led approach as counterpoint to default Three.js portfolio

## How To Build (Next.js)
- Use `"use client"` for scroll-driven components
- Lenis for smooth scroll, GSAP ScrollTrigger for reveals
- CSS Grid for gallery layouts, Framer Motion for line-split animations
- Preloader as client component with progress state managed via zustand or context
