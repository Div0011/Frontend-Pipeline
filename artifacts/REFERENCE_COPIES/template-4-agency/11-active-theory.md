# Pattern Analysis: Active Theory (activetheory.net) — Creative Agency

## Genre: Marketing / Creative Agency — Game-Grade WebGL (Genre 4)

## Core Architecture
- **Stack:** Custom WebGL engine + React UI overlay + GSAP
- **Approach:** Nothing decorative — every element has a functional reason
- **Full-screen canvas:** The entire site is a WebGL experience with DOM overlay

## Key Mechanical Patterns (From HTML Analysis)

### 1. Full-Viewport WebGL Canvas
- `#Stage` div takes `width:100%; height:100%; overflow:hidden; touch-action:none`
- Canvas is the primary render surface
- DOM elements are absolutely positioned overlay
- Font: NBArchitektStd (Regular 400, Light 300, Bold 700) — bespoke choice

### 2. Feature Detection / Progressive Enhancement
- Feature detects: `env(safe-area-inset-*)`, optional chaining `?.`
- Unsupported browsers redirect to `unsupported.html`
- Touch devices (`touch-action: none` on `#Stage *`) vs desktop
- iOS detection: `.ios` class enables `overflow:visible` on stage

### 3. Asset Preloading Strategy
- `window._CACHE_` timestamp for cache busting
- `<link rel="preload" as="script">` for critical JS
- Async script loading for main app
- CSS inlines critical styles, loads main stylesheet lazily

### 4. Project Grid Reveal
- Projects revealed with aggressive stagger (40-60ms between items)
- Staggered entry from different directions (left, right, bottom)
- Thumbnails use aspect-ratio containment
- Each project tile has hover state that previews video

### 5. Scroll Architecture
- Custom scroll system built on Lenis principles
- Full-viewport sections with snap points
- Progress tracked on `:root` as `--baropacity` CSS variable (scrollbar opacity)

## Why It Works
- "Game-grade" feel comes from treating the browser as a game engine
- Progressive enhancement ensures performance on target devices
- Aggressive stagger makes grid feel alive, not mechanical
- Font choice (NBArchitekt) is distinctive without being distracting

## Extraction For Template 4
- Full-viewport WebGL canvas architecture
- Aggressive stagger patterns for grid reveals (40-60ms)
- Progressive enhancement / feature detection
- Asset caching strategy with version timestamp
- Custom scroll system with section snapping
- Bespoke font integration for brand distinction
