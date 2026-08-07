# Pattern Analysis: Resn (resn.co.nz) — Creative Agency

## Genre: Marketing / Creative Agency — Playful Interactive 3D (Genre 4)

## Core Architecture
- **Stack:** Custom build (Canvas2D/WebGL) + RequireJS loader
- **Approach:** Playful, interactive 3D concept work with loose energy
- Full-screen canvas with DOM overlay elements

## Key Mechanical Patterns (From HTML Analysis)

### 1. Full-Canvas Architecture
- `#Stage` or canvas-based primary rendering
- Body: `background: black` during loading
- Loader: SVG drop animation (`.loader__drop`) with progress bar
- Preloader has two layers: background (gray #282828) + progress (white)
- Modules loaded via RequireJS (`data-main` attribute)

### 2. Progressive Enhancement
- Browser detection script checks for IE10 or below → shows old-browser message
- Modernizr for feature detection
- `es6-shim.min.js` for ES6 compatibility
- Separate critical CSS inline + full styles lazy-loaded

### 3. Loading Experience
- `loader` div with centered SVG drop animation
- Progress bar at bottom (fixed 100% width, 1px height)
- `bar-background` (gray) and `bar-progress` (white) layers
- Loader opacity fades out on completion

### 4. Interactive 3D Concept Work
- Playful cursor-driven interactions (objects respond to mouse)
- Looser, less structured energy compared to Active Theory
- Experimental layouts (non-grid, overlapping elements)
- Color palettes: bold, varied per project

### 5. Layout Experiments
- Hero: Full-screen canvas with animated 3D scene
- Projects: Custom layouts, not standard grids
- Each project has unique interaction mechanic (not template-based)
- Typography: Large, overlapping, animated

## Why It Works
- Playful energy differentiates from serious agency sites
- Each project gets its own interaction design
- Full-canvas approach creates immersive first impression
- Loading experience sets playful tone from the start

## Extraction For Template 4
- Modular loader with SVG animations
- Feature detection + progressive enhancement
- Playful cursor-driven 3D interactions
- Non-grid, experimental project layouts
- Bold color palettes per project/project type
- RequireJS/AMD module loading pattern for performance
