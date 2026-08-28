# Cinematic Website Architecture v2 — Master Training & Production Standards

> This document serves as the golden training and reference specification for generating and maintaining all websites in the pipeline.

---

## 1. Core Architectural Pillars

### 1.1 The Shot Grammar (Universal Visual Language)
Every website in the portfolio follows the same camera language:
- **Dolly-Scroll Parallax**: Foreground/midground/background layers move at calibrated scroll ratios, simulating a camera push-in.
- **Rack-Focus Hover**: Hovering an item sharpens the target while applying subtle ambient focus blur (`filter: blur(1px) opacity(60%)`) to sibling elements.
- **Match-Cut Sequences**: Layout transitions seamlessly carry elements from hero sequences into menu/order CTAs.
- **Color Grade Curves**: Desaturated/cool tones during establish beats, warming to rich, saturated tones during craft and invite moments.

### 1.2 Three Signature Sequences (Bespoke Hero Engines)
Rather than disparate one-off widgets, every website features one of three deeply polished 3-beat sequence engines (**Establish $\rightarrow$ Interrogate $\rightarrow$ Invite**):

#### **Sequence A: Deconstruction & Reveal (`SignatureDeconstruct.tsx`)**
- **Establish**: Wide plated shot of signature dish with architectural overview.
- **Interrogate**: Interactive 3D exploded layer view (Bun $\rightarrow$ Sauce $\rightarrow$ Smashed Patty $\rightarrow$ Melted Cheese $\rightarrow$ Pickles) with real-time temperature, sear metrics, and provenance telemetry.
- **Invite**: Direct match-cut into the menu CTA.
- **Assigned Brands**: *Beyondburg Inc.* (`#22C55E`), *Dirty Martin's Kum-Bak* (`#E5A93C`), *Pedroso's Pizza* (`#F2C777`), *Burger Seigneur* (`#55A630`).

#### **Sequence B: Temporal / Heritage Time-Slip (`OriginTimeSlip.tsx`)**
- **Establish**: Modern culinary atelier introduction.
- **Interrogate**: Interactive chronological time dial ($1973 \rightarrow 1998 \rightarrow 2026$) shifting color grade to vintage sepia with archival photographs and historical menu pricing.
- **Invite**: Grade snaps back to full present-day color contrast on "Order The Classic" CTA.
- **Assigned Brands**: *Dan's Hamburgers* (`#EF4444`, 1973), *Casino El Camino* (`#EF4444`, 1994), *Pool Burger* (`#38BDF8`), *Sour Duck Market* (`#E5A93C`).

#### **Sequence C: Craft & Build Matrix (`CraftMatrixBuilder.tsx`)**
- **Establish**: Raw ingredients station with real-time macro & calorie telemetry.
- **Interrogate**: 4-step precision customizer (Bun $\rightarrow$ Patty $\rightarrow$ Cheese $\rightarrow$ Sauce) compiling live into an atelier spec receipt ticket with running price totals.
- **Invite**: "Order Custom Build" ticket action with acoustic sizzle feedback.
- **Assigned Brands**: *Truffles Bangalore* (`#FFE500`), *JewBoy Burgers* (`#FFFFFF`), *Good Flippin' Burgers* (`#F59E0B`), *NADC Burger* (`#EF4444`), *Burger Elite* (`#22C55E`), *Biggies Burger* (`#FFE500`).

---

## 2. Color, Contrast & Surface Rules

### 2.1 Over Images, Video & Canvas Scrubber Overlays
- **Headings (`h1, h2, h3`)**: Brand Primary Color or Crisp White (`#FFFFFF`) with multi-layered glow and drop shadow:
  ```css
  [data-image-overlay] h1, [data-image-overlay] h2, [data-image-overlay] h3 {
    color: var(--primary) !important;
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px color-mix(in srgb, var(--primary) 70%, transparent) !important;
  }
  ```
- **Subtexts & Descriptions**: Pure Crisp White (`#FFFFFF`) or `text-stone-200` with drop-shadow (`0 2px 12px rgba(0,0,0,0.95)`). **Never dark text on dark canvas.**

### 2.2 On Light Backgrounds / Light Surfaces
- **Headings**: Deep Charcoal (`#0A0A0A` / `#1A1A1A`) or Dark Brand Accent.
- **Descriptions & Copy**: High-contrast Dark Charcoal (`#2A2A2A` / `#374151`).

### 2.3 On Dark Backgrounds / Obsidian Cards
- **Headings**: Luminous Brand Accent or Crisp White.
- **Descriptions**: Bright, readable off-white (`text-stone-200` / `rgba(255, 255, 255, 0.85)`).

### 2.4 Monochromatic Adaptive Cursor (`CustomCursor.tsx`)
- Detects underlying DOM element luminance in real time.
- Over **Red / Warm / Yellow** backgrounds $\rightarrow$ Inverts to **Deep Black (`#0A0A0A`)** or **Crisp White (`#FFFFFF`)**.
- Over **Dark / Obsidian / Canvas** $\rightarrow$ Illuminates in **Brand Primary Accent (`var(--primary)`)**.
- Over **White / Light Footers** $\rightarrow$ Snaps to **Deep Black (`#0A0A0A`)**.

---

## 3. Editorial Minimalist Menu Card Architecture (`/menu/page.tsx`)

- **Zero Boxy Tiles**: No heavy box cards, no chunky rectangular tiles.
- **Physical Menu Card Sheet**:
  - Section headers: `01. BURGERS & SMASHES`, `02. SIDES & CRUNCH` with fine hairline divider rules.
  - Clean line items: Dish name on left, leader space, currency price on right (`style={{ color: var(--primary) }}`), and discreet `+` button.
  - Descriptions directly beneath dish titles in refined, readable copy (`text-stone-600 dark:text-stone-400`).
  - Top category filter: Clean horizontal text pill strip (`All`, `Burgers`, `Sides`, `Desserts`).

---

## 4. Strict Preservation Constraints

1. **Footer Integrity**: `Footer.tsx` (centered 2-line `PixelText`, hours, newsletter, typography, and monochromatic styling) must **NEVER be modified or replaced**.
2. **Frame Scroll Integrity**: `CanvasScrubber.tsx`, `CinematicHero.tsx`, and `CinematicSmoothie.tsx` (60fps canvas scrubbing, frame caching, and scroll distance) must **NEVER be modified or replaced**.
