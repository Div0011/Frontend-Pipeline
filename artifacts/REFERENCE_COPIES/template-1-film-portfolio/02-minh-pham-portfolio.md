# Pattern Analysis: Minh Pham's Portfolio (Genre 2b — Kinetic-Type-Led)

## Core Architecture
- **Stack:** React + GSAP + WebGL (Three.js)
- **Signature:** Typography-morphing hero + layered WebGL scenes
- **Approach:** GSAP handles scroll timeline, Three.js handles background shader/scene layer

## Key Mechanical Patterns

### 1. GSAP + WebGL Layered Discipline
- Background WebGL scene runs on its own render loop (not scroll-driven for the shader itself)
- Foreground DOM elements (titles, metadata) are scroll-scrubbed via GSAP ScrollTrigger
- **Layer separation:** Canvas layer (depth) + DOM layer (UI/text) — never mixed, never fighting

### 2. Typography Morphing
- Hero text transforms between roles/skills during scroll
- Character-level splitting for each word
- Each character transitions independently with stagger
- GSAP `set()` for initial state, `to()` for morph target, `fromTo()` for entrance

### 3. Project Grid Morph-to-Fullscreen
- Thumbnail grid items use clip-path morphing
- On click/select: `clip-path: circle(0%)` → `clip-path: circle(100%)` frame transition
- Video auto-plays inside the morphed shape
- Reverse animation on close

### 4. Scroll-Driven Section Transitions
- Each project section is a full viewport
- Transition between sections uses shared-axis animation (z-depth parallax)
- Text fades while geometry stays fixed, creating depth perception

## Why It Works
- Discipline: WebGL is background layer only, DOM handles interaction
- Morph transitions feel like navigating *through* content, not between pages
- Character-level typography makes the portfolio feel crafted, not templated

## Extraction For Template 1
- Hero typography morph with character splitting
- Clip-path morph for project transitions
- GSAP timeline management across sections
- Layer separation discipline (canvas vs. DOM)
