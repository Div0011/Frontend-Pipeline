# The Master Playbook: Building High-End Cinematic Scrollytelling Websites

> **Purpose:** This document serves as the definitive reference guide and step-by-step master manual for the Frontend Pipeline. It details how to analyze a brand, produce and process video frame sequences, engineer high-performance canvas scrollytelling architectures, design kinetic interactive elements, optimize for mobile viewports, and deploy production builds to Vercel.

---

## Table of Contents
1. [Phase 1: Website Analysis & Deconstruction](#1-website-analysis--deconstruction)
2. [Phase 2: Video Production & Frame Sequence Extraction](#2-video-production--frame-sequence-extraction)
3. [Phase 3: Canvas Scrollytelling & Frame Placement Architecture](#3-canvas-scrollytelling--frame-placement-architecture)
4. [Phase 4: Design Systems, Cursor Dynamics & Element Sourcing](#4-design-systems-cursor-dynamics--element-sourcing)
5. [Phase 5: Building High-End Interactive Scroll Components](#5-building-high-end-interactive-scroll-components)
6. [Phase 6: Mobile Viewport & Performance Optimization](#6-mobile-viewport--performance-optimization)
7. [Phase 7: Build Verification & Vercel Deployment](#7-build-verification--vercel-deployment)
8. [Phase 8: Cross-Template Patterns & Motion Token Library](#8-cross-template-patterns--motion-token-library)
9. [Phase 9: Image + Typography Layering](#9-image--typography-layering)

---

## 1. Website Analysis & Deconstruction

### 1.1 Structural Audit & Brand Archetypes
Before writing a single line of code, deconstruct the target brand into core visual and functional pillars:
- **Brand Archetype Identification:** Determine the mood (e.g., *Smash Guys* = Pop-Art + American Diner + Modern Atelier Craft).
- **Color Contrast Strategy:** Establish light, dark, and pop accent tokens.
  - Dark Charcoal (`#141413`): High-end obsidian griddle feel.
  - Golden Yolk (`#F5C418`): Energetic pop accent.
  - Light Bone (`#FAF9F4`): Warm, premium background alternative to plain white.
- **Typography Hierarchy:** Pair an impactful display font (e.g., *Syne*, *Outfit*, or *Clash Display*) with a clean geometric serif/sans for body text, and a monospace font for technical metadata.

### 1.2 Storyboarding & Scroll Flow Mapping
Map out the rhythm of the website using sticky viewports:
1. **Hero Viewport (0%–100% scroll):** Primary video frame sequence (e.g., Burger smash orbit).
2. **Brand Manifesto Section:** Massive typography with interactive particle griddle slider.
3. **Kinetic Text Section:** Press-and-hold interactive font deformations.
4. **Exhibition Stack Section:** Scroll-driven ingredient assembly (Atelier Assembly).
5. **Secondary Frame Viewport:** Product frame sequence (e.g., Smoothie pour & splash).
6. **Interactive Menu Board:** 80/20 horizontal category tiles + full-screen overlay.
7. **Atelier Locations & Busy Hours:** Real-time interactive radar and live indicators.
8. **Rebuilt Footer:** High-contrast diner layout.

---

## 2. Video Production & Frame Sequence Extraction

### 2.1 Video Source Acquisition
To achieve Apple- or Lusion-grade scrollytelling, high-fps 3D camera orbits or high-resolution product footage is required:
- **3D Render Sequences:** Cinema4D / Blender camera turntable export at 60fps or 30fps.
- **Physical Footage:** 4K video recording scaled down for web scrubbing.

### 2.2 Breaking Video into WebP Frame Sequences
Use **FFmpeg** to extract high-quality, lightweight WebP frames with zero quality loss and exact 6-digit zero-padded naming:

```bash
# Command to extract WebP frames at 30fps with 80% quality
ffmpeg -i input_video.mp4 \
  -vf "fps=30,scale=1920:-1" \
  -c:v libwebp \
  -quality 80 \
  -compression_level 6 \
  public/frames/burger/frame_%06d.webp
```

#### Output Directory Structure:
```
public/
└── frames/
    ├── burger/
    │   ├── frame_000000.webp
    │   ├── frame_000001.webp
    │   └── ... (248 frames)
    └── smoothie/
        ├── frame_000000.webp
        ├── frame_000001.webp
        └── ... (248 frames)
```

### 2.3 Eager Frame Preloading Strategy
Loading 250+ frames over a mobile network can cause scrub lag if not preloaded efficiently:
1. **Critical Batch Preloading:** Preload the first 30–60 frames of each sequence eagerly during the preloader screen.
2. **Idle Subsampling:** Load remaining frames asynchronously in the background while the user reads the initial hero text.

---

## 3. Canvas Scrollytelling & Frame Placement Architecture

### 3.1 The Pure React Canvas Scrubber Pattern
To eliminate layout thrashing and DOM mutation lag during GSAP scroll scrubbing:
- **Separation of Concerns:** GSAP manages scroll triggers and updates a single React `progress` state (`0.0` to `1.0`).
- **HTML5 Canvas Rendering:** An HTML5 `<canvas>` element draws the frame corresponding to `Math.floor(progress * (totalFrames - 1))` on `requestAnimationFrame`.

```tsx
// CanvasScrubber.tsx Core Loop
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const frameIndex = Math.min(
    totalFrames - 1,
    Math.floor(progress * totalFrames)
  );

  const img = loadedImagesRef.current[frameIndex];
  if (img && img.complete) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw image centered & object-fit cover/contain
    drawCover(ctx, img, canvas.width, canvas.height);
  }
}, [progress, totalFrames]);
```

### 3.2 Mobile Viewport Lock (`100svh`)
Avoid `100vh` jumpiness caused by mobile browser address bar resizing:
```tsx
// Lock sticky viewports to Small Viewport Height
<div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-char">
  <canvas ref={canvasRef} className="w-full h-full object-cover" />
</div>
```

---

## 4. Design Systems, Cursor Dynamics & Element Sourcing

### 4.1 Sourcing Design Assets & Inspiration
Where to find elements, patterns, and motion design references:
- **Figma Community:** Search for "Diner UI", "Pop Art Web", "Streetwear Landing Page".
- **Awwwards & Lusion / Resn:** Analyze frame transitions, kinetic fonts, and WebGL overlays.
- **Google Fonts:** Sourcing pairings like *Syne* + *DM Sans* + *JetBrains Mono*.

### 4.2 Pixelated Retro Custom Cursor with Auto-Color Inversion
Implement a 8-bit retro pixelated cursor that automatically adapts its color based on background contrast:

```tsx
// Color Detection Logic in CustomCursor.tsx
const onOver = (e: MouseEvent) => {
  const el = e.target as Element;
  if (!el) return;

  // Detect dark vs yellow/light background containers
  const isDark = !!el.closest(".bg-char, .bg-char-soft, [data-theme='dark'], canvas");
  setIsDarkBg(isDark);
};

// Apply colors dynamically:
// Over Dark Background -> Yellow Cursor (#F5C418)
// Over Yellow / Light Background -> Obsidian Black Cursor (#141413)
const cursorColor = isDarkBg ? "#F5C418" : "#141413";
```

### 4.3 Unconditional Default Cursor Suppression
To prevent the browser's standard arrow/hand cursor from flickering over custom cursor elements:

```css
/* app/globals.css */
@media (pointer: fine) {
  *, *:hover, *:active, *:focus, a, button, select, input, label {
    cursor: none !important;
  }
}
```
*Note: Touch devices (`pointer: coarse`) bypass this rule so standard touch gestures work natively.*

---

## 5. Building High-End Interactive Scroll Components

### 5.1 Exhibition Stack Assembly (`AtelierAssembly.tsx`)
A completely scroll-driven burger assembly component where burger layers drop into place as the user scrolls:
- **Scroll Mapping:** Each ingredient layer (crown, pickles, patties, cheddar, heel) is mapped to a scroll percentage slice (`startPct` to `endPct`).
- **Dynamic Physics:** Items fall from `-500px` to their target stacked `Y` offset with an exponential easing curve.
- **Spec Card Updates:** A side panel displays live sourcing info for whichever ingredient is currently landing.

### 5.2 Kinetic Hold-and-Squeeze Typography (`ScrollytellingText.tsx`)
Interactive text that reacts to user interaction:
- **Hold Mechanics:** Pressing down on the "PRESS HARD" text triggers a 2-second squeeze animation (`scaleY: 0.4`, `scaleX: 1.3`).
- **Bounce Release:** Releasing the button triggers an elastic spring animation (`type: "spring"`, `stiffness: 400`, `damping: 10`) that bounces the letters back into position.

### 5.3 Horizontal Accordion Menu Tiles (`SignatureMenu.tsx`)
- **80/20 Layout:** 80% width dedicated to 4 expandable category tiles (Burgers, Sides, Drinks, Desserts) and 20% to a persistent "Full Menu" yellow button.
- **Hover/Tap Expansion:** Hovering or tapping a category tile expands its flex width from `flex-[0.7]` to `flex-[1.8]`, zooming in a circular food close-up graphic.
- **Full-Screen Yellow Menu Overlay:** Clicking the 20% button opens a full-screen yellow modal displaying all items grouped by category with dietary notes.

### 5.4 Concentric Zooming Preloader (`Preloader.tsx`)
- **Animation:** Staggered concentric yellow and charcoal circles continuously zooming out using Framer Motion repeat loops.
- **Progress Tracking:** Displays live asset preloading percentages.

---

## 6. Mobile Viewport & Performance Optimization

1. **Responsive Ingredient Scaling:** In `AtelierAssembly.tsx`, detect viewport width (`window.innerWidth < 768`) and scale ingredient SVGs down by 20% while tightening vertical offsets from `42px` to `22px`.
2. **Text Alignment Adjustments:** Align Stage 3 text cards to the left on mobile viewports (`text-left lg:text-right`) for better readability.
3. **Touch Accordion Toggles:** Allow tap-to-toggle accordion states on touchscreens.

---

## 7. Build Verification & Vercel Deployment

### 7.1 Pre-Flight Build Verification
Always run TypeScript compilation and Next.js production builds locally before pushing:
```bash
npx tsc --noEmit && npm run build
```

### 7.2 Automated Vercel Production Deployment
Deploy directly via Vercel CLI in non-interactive production mode:
```bash
npx vercel --prod --yes
```

---

## 8. Cross-Template Patterns & Motion Token Library

### 8.1 The 9-Industry Template Architecture
The Frontend Pipeline produces 9 distinct template archetypes, each synthesizing 3 reference sites:

| Template | Industry | Reference Sites | Tech Stack Signature | Color Unity |
|---|---|---|---|---|
| **Template 1** | Film / Creative Portfolio | Obys Agency, Minh Pham, Imagina Studio | GSAP + Lenis + `useRef` Canvas | Dark base (`#0a0a0c`), violet accent (`#6c5ce7`), amber-gold (`#e0a96d`) |
| **Template 2** | SaaS Product Launch | Jeton, Hubtown (Unseen Studio), Lusion | R3F + `useFrame` lerp + OrbitControls | Deep indigo (`#080711`), purple gradient, emerald stat highlights |
| **Template 3** | Corporate / Institutional | L'Oréal, Canals Amsterdam, History of Animation | Playfair Display + Inter + GSAP timeline | Charcoal (`#09090b`), muted accent, warm metallics |
| **Template 4** | Creative Agency | Locomotive, Active Theory, Resn | Horizontal panel-slide + Lenis + GSAP snap | Void black (`#060609`), neon lime (`#d4ff00`), showreel video backdrop |
| **Template 5** | Physical Product / E-commerce | Kieran Clarke, Vertigo 1958, Lusion Product | Canvas frame sequence + GSAP scrub + 300-frame preload | Obsidian (`#0a0a0c`), kinetic orange (`#ff5a00`), hardware tech specs |
| **Template 6** | Museum / Cultural Institution | Elektra Virtual Museum, The Unconventional Gallery | Editorial scroll pacing + GSAP scroll-driven card stack | Warm neutral (`#1a1a1e`), amber accent (`#d4af37`), noise texture overlayer |
| **Template 7** | Music / Artist Site | Mola Zone (Studio 9P, for Yame's album Ebe'm) | Three.js/WebGL/GSAP + Blender-modeled scenes + audio-sync | Void black with track-based environment presets (pastel, caustic blue, warm orange, cosmic) |
| **Template 8** | Luxury Real Estate | "Ever" (by Vide Infra), Elyse Residence | R3F camera path narrative + GSAP opacity stacking + Lenis | Underexposed warm editorial (`rgba(180,140,100,0.08)`), whisper-thin type |
| **Template 9** | Fashion / Apparel E-commerce | Quechua 2025 Lookbook (Decathlon) | GSAP clip-path reveals + magazine spread layouts + hover overlay | High-contrast editorial, gold accent (`#d4af37`), noise grain texture |

### 8.2 Scroll Narrative Patterns (Scrub vs. Trigger)

| Pattern | When to Use | Implementation | Scroll-Reversibility |
|---|---|---|---|
| **GSAP ScrollTrigger scrub** | Seamless progress-driven animation (video morph, frame sequence, 3D rotation) | `scrub: 1.2` or `scrub: 0.5` with `ease: "none"` | ✅ Fully reversible |
| **GSAP ScrollTrigger trigger (once)** | One-shot reveals on first appearance (typography fade-in, stat counters) | `start: "top 82%", once: true` | ❌ One-way only |
| **ScrollTrigger pin + scrub** | Sticky sections with continuous visual change | `pin: true, scrub: 1, end: "+=250%"` | ✅ Reversible with scrub |
| **Lenis smooth scroll** | All scroll-driven sites — provides inertia and decouples animation from native scroll | `duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` | ✅ Reversible by default |

**Golden Rule:** If a visual state changes as the user scrolls (3D explode, video morph, frame sequence), ALWAYS use `scrub` — never gsap timers or external progress setters. Set `camera.position` directly in `useFrame` rather than gsap.to within onUpdate.

### 8.3 Component Architecture Patterns

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

### 8.4 Motion Token Library

| Token | Value | Notes |
|---|---|---|
| `reveal-duration` | 1.2s | Standard scroll-reveal duration |
| `reveal-y` | 14% | Standard slide-up distance |
| `reveal-ease` | `expo.out` | Ease for most entry animations |
| `scrub-duration` | 1.0–1.2s | Lenis + GSAP scrub tie |
| `stagger-reveal` | 0.05–0.1s | Character/grid item stagger |
| `card-hover-lift` | 12° (rotateX/Y) | Perspective hover effect (Template 1) |
| `3d-lerp-speed` | 0.05 | useFrame lerp factor for camera smoothing (Template 2) |
| `block-stagger` | `(index / total) * 0.25` | Explode/assemble block delay (Template 2) |
| `frame-total` | 300 | Canvas sequence frame count (Template 5) |
| `preload-batch` | 30–60 | Initial frames to eager-load |
| `mobile-breakpoint` | 768px | Responsive adaptation trigger |

### 8.5 Genericness Check Criteria
Flag these patterns as rework triggers (not just code-review notes):

1. **Centered hero with gradient blob** — If hero has `bg-gradient-to-r` and a centered `<h1>` with no media background, flag for rework.
2. **Rounded cards with white background** — If feature cards use `rounded-2xl bg-white shadow-lg`, flag for rework — all templates use dark themes.
3. **Unsplash placeholder images** — In production builds, ALL images must be self-hosted or real client assets (WebP preferred).
4. **Empty hover states** — Every interactive element (button, card, link) must have a defined hover/active state.
5. **No prefers-reduced-motion** — Every section with animation must have a `(prefers-reduced-motion: reduce)` media query fallback.

### 8.6 Component Pattern Library (from built templates)

| Component | Template | Pattern |
|---|---|---|
| `Preloader` | T1 | Concentric rings + percentage counter, GSAP timeline auto-dismiss |
| `Hero` | T1 | character-level split with `ref={(el) => refs[i]=el}`, blur+y stagger |
| `ProjectGrid` | T1 | `AnimatePresence` layout grid with perspective hover (12° rotateX/Y) |
| `Scene` (R3F) | T2 | `useFrame` progress-driven lerp, camera position set directly, `enableRotate: false` |
| `Features` | T2 | Pinned scroll section + side-by-side 3D scene + feature list |
| `Pricing` | T2 | Grid with popular badge, `data-reveal` stagger on scroll |
| `OurStory` | T3 | Timeline with alternating cards, `useRef` + gsap.context, zig-zag layout |
| `AgencyPortfolio` | T4 | Horizontal panel-slide with `x: -(scrollWidth - innerWidth)`, `snap: 1/(n-1)` |
| `CustomCursor` | T4 | Color auto-inversion based on background, `cursor: none !important` |
| `DisassemblySection` | T5 | 300-frame canvas scrubber, 4 spec cards with range-based visibility |

---


---

## 9. Image + Typography Layering

> Universal rules for placing text over images across all 9 template genres, extracted from reference site analysis and built template testing.

### 9.1 Text-on-Image Legibility Rules

#### Minimum Scrim Opacity
When placing text directly on an image, ALWAYS apply a scrim overlay to ensure WCAG AA contrast (4.5:1 for body text, 3:1 for large/display text):

| Background Type | Minimum Opacity | Technique | Use Case |
|---|---|---|---|
| Light image (sky, sand, white walls) | 50% black gradient | `background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)` | Body text over bright backgrounds |
| Dark image (night, shadows, interiors) | 30% black gradient | `rgba(0,0,0,0.3)` single-layer scrim | Display/headline text only |
| Mixed-contrast image | 40% black base + 15% accent color overlay | `rgba(0,0,0,0.4)` + `rgba(accent, 0.15)` layered | General purpose |
| Product close-up | 20% black gradient + dedicated caption zone below | Scrim only for labels overlaying fabric/texture | E-commerce / fashion lookbook |

**Golden Rule:** Text should NEVER sit on a pure image without a gradient overlay or solid-color caption zone. If the image changes (responsive crop, different asset), the overlay must be applied generically — not positioned for one specific image.

#### Gradient Overlay Patterns

```
Preferred gradient patterns for text-on-image (from most to least used):
+-------------------------------------------------+
|  1. Bottom-to-top black gradient                |  <- Most versatile
|     linear-gradient(to top, rgba(0,0,0,0.6) 0%,  |  Text sits at bottom third
|                        rgba(0,0,0,0.1) 60%,      |
|                        transparent 100%)          |
+-------------------------------------------------+
|  2. Full-screen dark overlay + vignette         |  <- For hero sections
|     rgba(0,0,0,0.3) + radial-gradient(circle,    |  Text can be centered
|     transparent 50%, rgba(0,0,0,0.4) 100%)       |
+-------------------------------------------------+
|  3. Side gradient for left/right text placement |  <- For editorial spreads
|     linear-gradient(to left, transparent 40%,     |  Text on the dark side
|                        rgba(0,0,0,0.5) 100%)      |
+-------------------------------------------------+
|  4. Top-and-bottom double gradient               |  <- For centered composition
|     linear-gradient(to top, ...) +                |  Text in safe middle zone
|     linear-gradient(to bottom, ...)               |
+-------------------------------------------------+
```

### 9.2 When Text Should Sit Over an Image vs. Beside It

| Scenario | Text Placement | Why |
|---|---|---|
| Hero / first viewport | Centered over image with 40% scrim | Maximum impact; the image sets the emotional tone |
| Exhibition / museum card | Below image in dedicated caption zone | Artwork must be seen unobstructed; text is secondary |
| Editorial / magazine layout | Beside image (split-screen) or in bottom 20% overlay | Mimics print editorial; preserves full image fidelity |
| Product detail / spec | Beside image or floating over 20% scrim | Text is functional (specs, price); needs high legibility |
| Breather / transitional | Single word over full-bleed image | Word IS the design element; transparency adds depth |
| Gallery grid | In overlay on hover only | Grid should show images cleanly; text on interaction |
| Lookbook spread | Below or beside with staggered entry | Magazine-style; text and image are separate content layers |

### 9.3 Z-Index / Stacking Conventions

Definitive stacking order for all templates, from highest to lowest Z:

| z-index Range | Elements | Notes |
|---|---|---|
| `z-[100-200]` | Modals, full-screen overlays, menu panels | Always on top; uses `pointer-events: auto` on container, `none` on backdrop |
| `z-[80-99]` | Custom cursor element | Must be above all interactive elements to suppress default cursor |
| `z-[60-79]` | Navigation (sticky/fixed headers, bottom nav strip) | Above content but below modals and cursor |
| `z-[40-59]` | Floating UI (progress bars, scroll indicators, "now playing" overlays) | Semi-transparent, `pointer-events: none` on container |
| `z-[10-39]` | DOM content (typography, cards, grids, text overlays) | Primary interactive layer |
| `z-[5-9]` | Scrim/overlay gradients | Between content and media layers |
| `z-[1-4]` | Background media (images, video, canvas, WebGL, particles) | Base visual layer |
| `z-0` or `auto` | Page background / body | Default |

**Implementation in Tailwind:**
```tsx
{/* Example stacking in a Hero section */}
<header className="relative h-screen">
  {/* Layer 0: Background */}
  <div className="absolute inset-0 z-[1]">
    <canvas /> {/* or <img /> or <ThreeCanvas /> */}
  </div>

  {/* Layer 1: Gradient scrim */}
  <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/50 to-transparent" />

  {/* Layer 2: Typography */}
  <div className="relative z-[20] flex items-center justify-center h-full">
    <h1 className="text-white">Hero Title</h1>
  </div>

  {/* Layer 3: Navigation (fixed, above this section) */}
  {/* Navigation should be in the layout, outside this section, at z-[70] */}
</header>
```

### 9.4 Safe-Zone Guidance for Photo Composition

These rules generalize across different images — they are NOT tied to one specific asset.

```
+---------------------------------------------+
|  +-----------------------------------------+ |
|  |  AVOID: Faces (eyes, mouth, 70%        | |
|  |  of head area) — text creates visual    | |
|  |  clutter over facial features           | |
|  +-----------------------------------------+ |
|  +-----------------------------------------+ |
|  |  AVOID: Product focal points (logo,     | |
|  |  hero product, main subject) — defeats  | |
|  |  the purpose of the product shot        | |
|  +-----------------------------------------+ |
|  +-----------------------------------------+ |
|  |  SAFE: Bottom 20% of frame              | |
|  |  SAFE: Top 10% of frame                 | |
|  |  SAFE: Left/right edges (15% each)      | |
|  |  SAFE: Between subjects (negative       | |
|  |  space areas)                           | |
|  +-----------------------------------------+ |
+---------------------------------------------+
```

**Rule of Thumb:** Place text in the "quiet" third of an image. If the image has no quiet zone, use a dedicated caption zone below or beside the image instead of an overlay.

**Implementation check — before committing text-on-image:**
```tsx
// SafeZoneCheck.tsx — Visual debugging overlay (development only)
export function SafeZoneGuide() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[100]">
      {/* Top hazard zone */}
      <div className="absolute top-0 left-0 right-0 h-[10%] bg-red-500/10 border-b border-red-400/30" />
      {/* Bottom safe zone */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-green-500/10 border-t border-green-400/30 flex items-end p-4">
        <span className="text-[0.5rem] text-green-400 font-mono">TEXT SAFE ZONE</span>
      </div>
      {/* Center hazard (face/product area) */}
      <div className="absolute top-[20%] left-[10%] right-[10%] h-[60%] border-2 border-dashed border-red-400/20 flex items-center justify-center">
        <span className="text-[0.5rem] text-red-400/40 font-mono">AVOID TEXT - FACE / FOCAL POINT</span>
      </div>
      {/* Side safe zones */}
      <div className="absolute top-0 left-0 w-[15%] h-full bg-green-500/5" />
      <div className="absolute top-0 right-0 w-[15%] h-full bg-green-500/5" />
    </div>
  );
}
```

### 9.5 Template-Specific Image + Typography Rules

| Template | Text Placement Rule | Scrim Standard | Exception |
|---|---|---|---|
| T1 Film Portfolio | Text left-aligned beside project images | 30% black gradient overlay on hover | Hero: centered with 40% scrim |
| T2 SaaS Launch | Text right panel, 3D left side | No scrim (text is on solid dark background) | Feature highlights: text over 3D at 20% opacity overlay |
| T3 Corporate | Text in dedicated caption zones below images | 40% black gradient for hero images | Pull quotes: overlaying image with 50% scrim |
| T4 Creative Agency | Text on solid backgrounds, images in separate panels | 30% black on hover states only | Showreel: text over video with 30% scrim |
| T5 Physical Product | Text beside product with spec cards | 20% scrim for product labels | Exploded view: labels directly on parts with thin outline |
| T6 Museum | Text below artwork in caption zones | 30% gradient card entry, text never overlays artwork | Title: minimal overlay at bottom 10% with 60% scrim |
| T7 Music Artist | Text as 3D floating labels in world space | No scrim (3D world is the background) | "Now playing" overlay: 60% black backdrop blur |
| T8 Luxury Real Estate | Text at bottom 15% with 50% gradient | 50% black gradient always on hero images | Breather sections: single word at center with 30% gradient |
| T9 Fashion Lookbook | Text in overlay on hover only (editorial) | 20% gradient on hover for product labels | Captions: below image, never overlaying fabric/fit |
