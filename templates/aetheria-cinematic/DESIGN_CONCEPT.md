# Aetheria Museum — Cinematic Design Concept & Structural Blueprint

> **Project:** Aetheria Museum — High-End Institutional Cinematic Website
> **Genre:** Genre 1 (Full Scroll-Camera) with Genre 0 (Cinematic Without Generated Media) fallback principles
> **Reference Caliber:** History of Animation (scrollytelling), 1 Place Vendôme (restrained luxury), Canals Amsterdam (atmospheric pacing), L'Oréal (institutional gravitas), Hadaka (intentional negative space)
> **Status:** Design concept — ready for implementation

---

## 1. Design Concept & Art Direction

### 1.1 Core Thesis

A museum website should feel like walking through a series of darkened gallery rooms,
where each artwork is revealed through controlled light and space. The screen is not
a billboard — it is a series of exhibition chambers. The user does not "browse" a
collection; they are guided through a curated narrative arc by a custodian who knows
exactly when to pull back the velvet rope.

### 1.2 The Big Idea

**"Light as Architecture"** — the website uses luminosity, fog, and depth-of-field
as structural elements. Artworks emerge from darkness through a single shaft of
virtual light. Scroll position controls not just what is visible, but how much light
falls on it. The experience is less about the collection as data and more about the
act of discovery itself.

### 1.3 Emotional Tone

- **Reverent** — the pacing demands attention; nothing rushes the user
- **Atmospheric** — layered fog, soft gradients, and depth create physical presence
- **Editorial** — typography is as considered as the wall text beside a Rothko
- **Mysterious** — partial reveals, curtains of darkness, controlled illumination
- **Prestigious** — every choice signals that this institution has nothing to prove

### 1.4 Art Direction Statement

Dark charcoal walls. A single amber-gold accent — the color of a halogen spotlight
on oil paint. Typography set in a refined serif with tight optical spacing, as though
each headline were letterpress-printed on a museum label. Artworks float in deep
negative space, arriving not with a fade but with the slow sweep of a gallery
guardian's flashlight. The scroll is damped and heavy — the user feels the weight
of the building. Background audio (optional, user-initiated) is the sound of a
large, empty stone room: distant footstep echo, HVAC hum, the almost-silence of
reverence.

---

## 2. Structural Blueprint

### 2.1 Page Architecture — "The Exhibition Walk"

The homepage is a single narrative arc structured as a physical walk through a museum:

| Section | Scroll Zone | Narrative Function | Visual Treatment |
|---------|------------|-------------------|------------------|
| **Cold Open** | 0%–15% | Brand statement — the museum announces itself before showing anything | Full-bleed fog overlay, single line of type emerging from darkness |
| **Current Exhibition** | 15%–35% | The flagship exhibition — immersive, dominant, unmissable | Full-viewport artwork with parallax depth layers, scroll-driven light reveal |
| **The Collection** | 35%–60% | Curated highlights — the museum's voice, not a catalog | Asymmetric editorial grid, each artwork in its own "gallery wall" |
| **Visit & Experience** | 60%–75% | Practical information elevated to the same visual register as the art | Generous whitespace, refined serif body text, amber accents on CTAs |
| **Footer / Closing** | 75%–100% | Departure — the feeling of leaving a meaningful space | Slow fade to near-black, single contact line, no clutter |

### 2.2 Component Hierarchy

```
app/
├── layout.tsx                    # Root layout, fonts, metadata, LenisProvider
├── page.tsx                      # Composed homepage — the exhibition walk
├── globals.css                   # Design tokens, resets, depth-of-field system
└── components/
    ├── marketing/
    │   ├── MuseumNav.tsx         # Fixed nav with scroll-aware transparency/blur
    │   ├── HeroFog.tsx           # Full-screen fog + spotlight reveal for cold open
    │   ├── ExhibitionHero.tsx    # Full-viewport artwork with parallax depth layers
    │   ├── CollectionGrid.tsx    # Asymmetric editorial grid, gallery-wall cards
    │   ├── VisitSection.tsx      # Practical info with elevated editorial treatment
    │   ├── MuseumFooter.tsx      # Minimal closing, single-column
    │   ├── CustomCursor.tsx      # Contextual cursor (spotlight / label modes)
    │   ├── FilmGrainOverlay.tsx  # Subtle grain for physical texture
    │   └── DepthOfField.tsx      # Layered fog/blur system for scroll-driven DOF
    └── lib/
        ├── lenis.ts              # Smooth scroll with museum-appropriate damping
        ├── motion.ts             # GSAP ScrollTrigger choreography
        └── types.ts              # Design tokens, component props
```

### 2.3 Animation Timeline

| Time | Event | Target | Duration | Easing |
|------|-------|--------|----------|--------|
| 0.0s | Page load — fog fully opaque | HeroFog | 2.0s | expo.out |
| 0.8s | Fog begins clearing, first artwork hint appears | ExhibitionHero | 1.5s | power2.out |
| 1.5s | MuseumNav fades in with blur backdrop | MuseumNav | 0.8s | power3.inOut |
| 2.5s | Cold open text fully visible | HeroFog text layer | 1.2s | expo.out |
| 3.5s | Preloader dismissed; user can scroll | Global | — | — |
| Scroll 15% | Exhibition artwork pinned, scroll drives light intensity | ExhibitionHero | Scrub | linear |
| Scroll 35% | Collection grid items stagger in | CollectionGrid | 0.8s per item | expo.out |
| Scroll 60% | Visit section content reveals with vertical drift | VisitSection | 1.0s | expo.out |
| Scroll 75%+ | Footer fades in, background darkens | MuseumFooter | 1.5s | power2.inOut |

---

## 3. Cinematic Storytelling Techniques

### 3.1 Scroll Engine & Physics

**Lenis configuration — "Gallery Damping"**
```ts
const lenis = new Lenis({
  duration: 1.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});
```

Longer duration (`1.8s`) than typical cinematic sites. The user should feel the weight
of the space — scrolling is not snappy, it is deliberate, like turning a heavy
gallery door.

### 3.2 Parallax Depth System

Three-layer parallax on every full-bleed artwork section:

| Layer | Scroll Rate | Content | Purpose |
|-------|-------------|---------|---------|
| Background | 0.3x | Deep room tone, distant architectural elements | Establishes physical space |
| Midground | 0.6x | The artwork itself, framed | The focal point |
| Foreground | 1.0x | Fog, light shafts, floating dust particles | Atmosphere and depth cue |

Implementation: GSAP ScrollTrigger with `scrub: 1.2` drives `y` translations on each
layer independently. No `useScroll` from R3F — this is pure DOM parallax, keeping
the site Genre 0-compatible while still achieving depth.

### 3.3 Depth-of-Field Visual Effects

Achieved through CSS and layered DOM, not WebGL:

**Scroll-driven blur gradient:**
```css
.dof-layer--background {
  filter: blur(8px) brightness(0.6);
  transform: scale(1.05);
}

.dof-layer--midground {
  filter: blur(0px) brightness(1.0);
  transform: scale(1.0);
}

.dof-layer--foreground {
  filter: blur(12px) brightness(0.3);
  opacity: 0.4;
  mix-blend-mode: screen;
}
```

As the user scrolls, GSAP interpolates the `brightness` and `blur` values between
layers, simulating a camera rack focus. The artwork starts slightly out of focus
in a dark room and sharpens as the user approaches — mimicking the act of walking
closer to a painting.

### 3.4 Spotlight / Light Reveal

Each exhibition section has a CSS radial gradient that acts as a "spotlight":

```css
.spotlight-overlay {
  background: radial-gradient(
    circle at var(--spotlight-x, 50%) var(--spotlight-y, 30%),
    transparent 0%,
    rgba(10, 10, 10, 0.4) 30%,
    rgba(10, 10, 10, 0.85) 60%,
    rgb(10, 10, 10) 100%
  );
  mix-blend-mode: multiply;
}
```

The spotlight position is tied to scroll progress — as the user scrolls, the light
"sweeps" across the artwork, revealing details in a controlled, cinematic manner.

### 3.5 Fog & Atmosphere

Multi-layered fog using CSS gradients and `backdrop-filter`:

```css
.fog-layer {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 40%),
    radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 100%);
  pointer-events: none;
  mix-blend-mode: multiply;
}
```

Fog opacity is scroll-driven — dense at section boundaries (transitions), thin
within sections (allowing the artwork to breathe).

### 3.6 Micro-Interactions

| Interaction | Trigger | Response | Purpose |
|-------------|---------|----------|---------|
| **Label reveal** | Hover on artwork thumbnail | Thin amber line expands into a museum-style label (title, artist, year, medium) | Information hierarchy — details emerge only on request |
| **Cursor modes** | Hovering artwork vs. text vs. nav | Crosshair over art → text cursor over body → arrow over links | Contextual awareness without explicit UI |
| **Image zoom** | Click on artwork in collection grid | Smooth zoom to 90% viewport with darkening periphery | Focus — the user enters a private viewing room |
| **Chapter indicator** | Scroll position | Thin amber progress bar at very top of viewport | Orientation — where am I in the exhibition walk? |

---

## 4. Color Palette

### 4.1 Primary Palette

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--color-void` | `#0a0a0c` | Background, deepest shadows | Page background, section backgrounds, fog base |
| `--color-charcoal` | `#141413` | Surface, elevated shadows | Cards, nav backdrop, elevated surfaces |
| `--color-stone` | `#1a1a1e` | Secondary surface | Borders, dividers, subtle UI elements |
| `--color-bone` | `#f5f2eb` | Primary text | Headlines, body text on dark backgrounds |
| `--color-bone-dim` | `#b8b4a8` | Secondary text | Captions, metadata, muted information |
| `--color-amber` | `#c9a96e` | Accent — the spotlight | CTAs, hover states, active indicators, label lines |
| `--color-amber-glow` | `rgba(201, 169, 110, 0.15)` | Accent atmosphere | Spotlight halos, hover glows, ambient light |

### 4.2 Gradient & Atmosphere System

| Gradient | CSS | Purpose |
|----------|-----|---------|
| **Room tone** | `linear-gradient(to bottom, #0a0a0c 0%, #141413 50%, #0a0a0c 100%)` | Subtle vertical depth in sections |
| **Fog densification** | `radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.6) 100%)` | Vignette and atmospheric edge darkening |
| **Spotlight cone** | `radial-gradient(circle at 50% 30%, transparent 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.9) 100%)` | Simulated gallery lighting |
| **Amber wash** | `linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 50%)` | Subtle warmth overlay on artwork sections |

**Palette constraints:**
- No pure white (`#ffffff`) anywhere — use `--color-bone` (`#f5f2eb`) for all light values
- No blue/indigo/purple — this is a warm, amber-lit institution
- No gradient blobs as primary visual — gradients serve atmosphere only
- Maximum one accent hue (amber) — all color interest comes from the photography/art itself

---

## 5. Typography

### 5.1 Type System

| Role | Typeface | Weight | Size (desktop) | Size (mobile) | Letter-spacing | Line-height | Usage |
|------|----------|--------|----------------|---------------|----------------|------------|-------|
| **Display** | *Cormorant Garamond* | 300 (Light) | 8–12vw | 10–14vw | -0.02em to -0.04em | 1.0 | Exhibition titles, hero statements, section headers |
| **Serif Body** | *Cormorant Garamond* | 400 (Regular) | 1.25rem | 1.125rem | 0.01em | 1.6 | Body text, descriptions, labels |
| **Sans UI** | *Inter* | 300 (Light) | 0.875rem | 0.8125rem | 0.02em | 1.5 | Nav, metadata, captions, UI elements |
| **Mono** | *JetBrains Mono* | 400 (Regular) | 0.75rem | 0.6875rem | 0.05em | 1.4 | Artwork IDs, accession numbers, technical metadata |

### 5.2 Typographic Hierarchy Rules

1. **Scale contrast is mandatory.** Display type at 8–12vw against body at 1.25rem
   creates the optical tension of a gallery wall label beside a monumental painting.
2. **Negative letter-spacing on headlines only.** Tight or negative spacing on display
   type creates density and prestige; body text stays comfortably readable.
3. **One serif face, two weights.** Cormorant Garamond Light for drama, Regular for
   reading. No third serif weight — restraint in the typeface itself.
4. **Inter is the functional layer only.** Never use Inter for headlines or display
   purposes. It exists for navigation, captions, and metadata — the "gallery plaque"
   functionality.
5. **Mono for institutional authority.** Accession numbers, dates, and dimensions in
   JetBrains Mono signal: this is data, not emotion. The contrast between the
   emotional serif and the clinical mono reinforces the museum's dual role as
   aesthetic and scholarly institution.

### 5.3 Museum Label Pattern

Every artwork reference uses the institutional label format:

```
[ARTWORK TITLE IN DISPLAY SERIF, LIGHT, 2.5REM]
Artist Name [Regular, 1.1REM] · 2024 [Mono, 0.75REM]
Oil on linen, 180 × 240 cm [Regular, 0.9REM, --color-bone-dim]
```

This pattern appears in collection grids, exhibition overlays, and hover states.
It is the typographic equivalent of a gallery wall label — functional, refined,
institutional.

---

## 6. Layout Philosophy

### 6.1 Grid System

**Desktop (≥1024px):**
- **12-column grid** with 24px gutters
- **Margins:** 8vw on either side (≈140px at 1440px, ≈110px at 1120px)
- **Content max-width:** 1440px centered
- **Breakouts:** Exhibition artwork breaks out to 95vw; collection grid respects 8vw margins

**Tablet (768px–1023px):**
- **8-column grid** with 20px gutters
- **Margins:** 6vw
- Artwork images scale to 90vw with preserved aspect ratio

**Mobile (<768px):**
- **4-column grid** with 16px gutters
- **Margins:** 5vw
- Single-column flow; no horizontal scroll; all parallax reduced to 0.2x

### 6.2 Whitespace Rules

1. **Minimum 160px vertical padding between sections** at desktop. Museum sections
   breathe — they do not crowd.
2. **Artwork breathing room.** No artwork sits closer than 80px to any text element.
   The image is the hero; text is secondary.
3. **Single focal point per viewport.** If a section contains two large images, one
   must be visually subordinate (smaller, dimmer, offset).
4. **"Arriving late" content.** Key text appears after the user has spent 2–3 seconds
   with the artwork. The scroll pauses; the image registers; then the label appears.

### 6.3 Image Treatment

| Treatment | CSS | Purpose |
|-----------|-----|---------|
| **Base grade** | `filter: contrast(1.05) saturate(0.9) brightness(0.95);` | Unified tonal quality across all photography |
| **Duotone overlay** | `mix-blend-mode: multiply` with amber gradient at 8% opacity | Warmth and cohesion |
| **Depth blur** | `filter: blur(2px)` on background parallax layers | Simulated depth-of-field |
| **Vignette** | `box-shadow: inset 0 0 200px rgba(10,10,10,0.8);` | Focuses attention on center of artwork |
| **No border-radius on artwork frames** | `border-radius: 0` | Rectangular = institutional, deliberate |

---

## 7. Motion System

### 7.1 Scroll Choreography — "The Curator's Pace"

The scroll is the custodian. It moves slowly, deliberately, and never surprises.

| Section | Scroll Behavior | Easing | Duration |
|---------|----------------|--------|----------|
| Cold Open → Exhibition | Slow reveal, fog clears over 8% scroll distance | expo.out | 1.5s equivalent |
| Exhibition (pinned) | Artwork pinned for 20% scroll; light sweeps across | linear scrub | scrub: 1.2 |
| Exhibition → Collection | Smooth unpin, fog densifies at boundary | power3.inOut | 1.0s |
| Collection grid | Items stagger in at 0.08s intervals | expo.out | 0.8s per item |
| Collection → Visit | Vertical drift of text elements | power2.out | 1.2s |
| Visit → Footer | Content fades, background darkens | power2.inOut | 1.5s |

### 7.2 Animation Specifications (Machine-Readable)

```json
{
  "animations": [
    {
      "name": "fog-clear",
      "trigger": "load",
      "library": "gsap",
      "description": "Cold open fog overlay fades from opaque to transparent",
      "performance_budget_ms": 16,
      "waypoints": [
        {"progress": 0.0, "property": "opacity", "from": 1, "to": 0, "easing": "expo.out"},
        {"progress": 0.3, "property": "blur", "from": 20, "to": 0, "easing": "power2.out"}
      ],
      "timing": {"duration": 2.0, "stagger": 0, "repeat": 0, "yoyo": false}
    },
    {
      "name": "exhibition-light-sweep",
      "trigger": "scroll",
      "library": "gsap",
      "description": "Spotlight gradient position sweeps across artwork as user scrolls through pinned section",
      "performance_budget_ms": 16,
      "waypoints": [
        {"progress": 0.0, "property": "background-position", "from": "50% 0%", "to": "50% 100%", "easing": "linear"},
        {"progress": 0.0, "property": "opacity", "from": 0.6, "to": 1, "easing": "power1.in"}
      ],
      "timing": {"duration": 0, "stagger": 0, "repeat": 0, "yoyo": false}
    },
    {
      "name": "collection-stagger",
      "trigger": "scroll",
      "library": "gsap",
      "description": "Collection grid items reveal with vertical drift and opacity fade",
      "performance_budget_ms": 16,
      "waypoints": [
        {"progress": 0.0, "property": "y", "from": 60, "to": 0, "easing": "expo.out"},
        {"progress": 0.0, "property": "opacity", "from": 0, "to": 1, "easing": "power2.out"}
      ],
      "timing": {"duration": 0.8, "stagger": 0.08, "repeat": 0, "yoyo": false}
    }
  ],
  "structured_timeline": [
    {"time": "0.0s", "event": "preloader-exit", "target": "hero-fog", "duration": 2.0},
    {"time": "0.8s", "event": "fog-clear", "target": "hero-fog", "duration": 1.5},
    {"time": "1.5s", "event": "nav-fade-in", "target": "museum-nav", "duration": 0.8},
    {"time": "2.5s", "event": "hero-text-reveal", "target": "hero-fog-text", "duration": 1.2}
  ],
  "easing_library": {
    "smooth": "expo.out",
    "snappy": "back.out(1.7)",
    "dramatic": "power3.inOut",
    "scroll": "linear",
    "reveal": "power2.out",
    "fog": "expo.out"
  }
}
```

### 7.3 Micro-Interaction Details

**Custom Cursor — "The Flashlight"**
- Desktop only (`@media (pointer: fine)`); touch devices use native touch
- Default state: small amber dot (4px), low opacity
- Hovering artwork: expands to 24px amber circle with `mix-blend-mode: screen`
- Hovering text/nav: shrinks to 2px dot, high contrast
- Clicking artwork: brief flash (0.3s opacity pulse) simulating a camera flash in a dark room
- `cursor: none !important` applied globally for desktop

**Magnetic Buttons**
- CTAs in the Visit section use a subtle magnetic pull (8px max displacement)
- Trigger: cursor within 60px of button center
- Easing: `back.out(1.2)` on release — a refined snap, not a spring

**Image Zoom — "The Viewing Room"**
- Clicking any collection artwork triggers:
  1. Dark overlay fades in (0.4s, `power2.inOut`)
  2. Artwork scales from grid position to 90vw centered (0.8s, `expo.out`)
  3. Caption fades in below artwork (0.6s delay, 0.6s duration)
  4. Background blurs (`backdrop-filter: blur(20px)`)
- Close: reverse sequence, artwork returns to grid position
- Escape key or click-outside dismisses

---

## 8. Technical Architecture

### 8.1 Stack (Mandatory)

- **Framework:** Next.js 16 App Router (static export)
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Motion:** GSAP 3.15 + ScrollTrigger + Lenis 1.3
- **Typography:** `next/font/google` (Cormorant Garamond, Inter, JetBrains Mono)
- **Images:** `next/image` with WebP/AVIF optimization
- **Deploy:** Vercel static export

### 8.2 Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| **TTI** | < 2.5s | Museum audiences expect instantaneity despite the slow aesthetic |
| **Lighthouse Performance** | > 85 | Heavy imagery requires optimization discipline |
| **Frame rate** | 60fps | Lenis + GSAP must hold on mid-range mobile |
| **Image payload** | < 300KB per above-fold image | WebP with `quality: 80`, `fit: cover` |
| **Font payload** | < 150KB total | Subset Cormorant Garamond to required weights only |
| **JS bundle** | < 120KB initial | Code-split all below-fold sections |

### 8.3 Accessibility Plan

1. **`prefers-reduced-motion`:** All scroll-driven animations fall back to static
   positions. Fog clears instantly. Parallax disabled. Stagger becomes simultaneous.
2. **`prefers-color-scheme`:** Dark mode is the only mode (museum walls are dark).
   No light mode toggle — the aesthetic is non-negotiable.
3. **Keyboard navigation:** All interactive elements (artwork zoom, nav, CTAs) fully
   keyboard accessible with visible focus rings (amber, 2px offset).
4. **Alt text:** Every artwork image has descriptive alt text: title, artist, date,
   medium — the same information as the visual label.
5. **Semantic HTML:** `<article>` for artworks, `<section>` for exhibition rooms,
   `<nav>` for navigation, `<time>` for dates.
6. **Focus management:** Image zoom traps focus within the modal; Escape returns focus
   to trigger element.

### 8.4 Mobile Adaptation Strategy

| Desktop Feature | Mobile Adaptation | Rationale |
|-----------------|-------------------|-----------|
| 3-layer parallax | Single layer at 0.2x scroll rate | Reduces paint/layout cost |
| Fog overlays | Static gradient, opacity reduced to 30% | GPU-friendly, still atmospheric |
| Custom cursor | Native touch; no cursor element | `pointer: coarse` media query |
| Image zoom | Full-screen lightbox (native `<dialog>`) | Native accessibility, no custom scroll lock |
| Stagger animations | Simultaneous reveal, 0.4s duration | Faster perceived performance |
| Exhibition pin | Reduced to 15% scroll distance | Prevents excessive scroll bar length |

**Mobile breakpoints:**
- No horizontal overflow at 320px, 375px, 768px
- All tap targets ≥ 44px
- Images scale with `object-fit: cover` and `aspect-ratio` preservation
- Typography scales down but maintains optical contrast (display still 10–14vw)

---

## 9. Implementation Plan

### 9.1 Design Rationale

Every interaction in this design serves one of three purposes:
1. **Atmosphere** — fog, grain, vignette, depth-of-field create the physical sensation of a gallery
2. **Discovery** — scroll-driven reveals, spotlight sweeps, and staggered entrances control the user's attention
3. **Institutional authority** — serif typography, museum label patterns, mono metadata, and restrained color signal scholarly prestige

No animation exists solely for visual flair. If an element cannot justify its motion
through one of these three purposes, it is removed.

### 9.2 Page Architecture

Single-page narrative arc: Cold Open → Current Exhibition → The Collection →
Visit & Experience → Closing. Each section is an independent "gallery room" connected
by fog transitions. No page reloads. No modals for primary navigation.

### 9.3 Component Hierarchy

1. **MuseumNav** — Fixed, scroll-aware blur backdrop, amber active indicator
2. **HeroFog** — Full-screen fog overlay with centered display type
3. **ExhibitionHero** — Pinned section, 3-layer parallax artwork, scroll-driven spotlight
4. **CollectionGrid** — Asymmetric editorial grid, hover label reveals, click-to-zoom
5. **VisitSection** — Elevated practical information, amber CTAs, generous whitespace
6. **MuseumFooter** — Minimal closing, single-column contact
7. **FilmGrainOverlay** — Fixed, pointer-events-none, SVG noise data URI
8. **DepthOfField** — Scroll-driven blur/brightness on parallax layers
9. **CustomCursor** — Contextual cursor states (desktop only)

### 9.4 Animation Timeline

Load sequence (2.5s): fog clears → nav appears → hero text reveals → scroll enabled.
Scroll sequence: each section pinned or revealed with specific GSAP ScrollTrigger
configurations. See §7.2 for machine-readable specs.

### 9.5 Scroll Choreography

Lenis as single scroll truth (`duration: 1.8`). GSAP ScrollTrigger with `scrub`
drives all scroll-bound animation. No separate scroll listeners. No IntersectionObserver
for primary reveals — scroll reversibility is non-negotiable.

### 9.6 State Management Strategy

No global state management required. React Server Components for all static content.
Client components only for: Lenis init, GSAP ScrollTrigger contexts, CustomCursor,
image zoom modal. State is local to each interactive component.

### 9.7 Asset Loading Strategy

- **Fonts:** `next/font/google` with `font-display: swap`; preload display face
- **Images:** `next/image` with `placeholder="blur"` for collection grid; lazy-load
  all below-fold artwork with `loading="lazy"`
- **Priority:** Hero exhibition artwork loads first; collection grid loads on demand
- **No 3D assets** — this is a Genre 0/1 hybrid that achieves depth through DOM
  layering and CSS, not WebGL

### 9.8 Accessibility Plan

See §8.3. Key points: `prefers-reduced-motion` fallbacks, keyboard navigation,
semantic HTML, descriptive alt text, focus management in image zoom.

### 9.9 Performance Budget

See §8.2. Key targets: TTI < 2.5s, Lighthouse Performance > 85, 60fps on
mid-range mobile, < 300KB per above-fold image.

### 9.10 Mobile Adaptation Strategy

See §8.4. Key adaptations: reduced parallax, static fog, native touch handling,
simultaneous stagger reveals, shorter pin distances.

---

## 10. Anti-Patterns (Hard Rejections)

The following patterns cause automatic rejection of any implementation:

1. **Centered hero with gradient blob** — the hero is full-bleed artwork with fog, not a centered headline on a gradient
2. **Three identical feature cards** — the collection grid is asymmetric and editorial
3. **Generic fade-in entrance** — all reveals are scroll-path-bound with specific easing curves
4. **Logo wall** — no social proof clutter; institutional authority is communicated through design restraint
5. **Stock-photo testimonial grid** — visitor quotes, if present, are set in the editorial serif within the Visit section, not a grid of faces
6. **"AI-powered" or "next-generation" headline** — the institution's language is timeless, not trendy
7. **Framer-template motion** — no spring-bounce on cards, no floating emojis, no confetti
8. **System-font everything** — Cormorant Garamond + Inter + JetBrains Mono only
9. **Safe blue/indigo/purple palette** — the palette is warm charcoal + amber-gold
10. **Scroll hijacking** — Lenis enhances scroll; user can always override with trackpad gestures

---

## 11. Genre Classification Rationale

This brief maps to **Genre 1 (Full Scroll-Camera)** for the exhibition narrative
structure — scroll position drives a virtual "camera" through exhibition rooms with
lighting/color mood shifts between chapters. However, the implementation uses **DOM
parallax and CSS depth effects rather than WebGL**, aligning with Genre 0's
restraint principles. The result is a hybrid: the narrative structure of Genre 1
(scroll-driven chapters, pinned sections, atmospheric transitions) achieved through
the production-friendly techniques of Genre 0 (CSS filters, layered DOM, GSAP scrub).

This is the correct choice because:
- A museum's "journey" is chronological/curatorial — it genuinely has chapters
- Video/3D assets are not required to achieve depth — fog, blur, and parallax suffice
- The hybrid approach delivers cinematic impact without WebGL's performance risk
- Mobile fallback is trivial: reduce parallax rates, static fog gradient

---

## 12. Reference Grounding

| Design Choice | Reference Site | Pattern Borrowed |
|---------------|----------------|------------------|
| Slow-inertia scroll + fog | Invisible Moscow | Atmospheric scroll pacing, layered depth |
| Editorial restraint + amber accent | 1 Place Vendôme | Luxury whitespace, jewel-tone as single accent |
| Institutional gravitas + mega-menu | L'Oréal Mediaroom | Corporate editorial, premium typography |
| Chapter-based scrollytelling | History of Animation | Exhibition-as-narrative-arc structure |
| Intentional negative space | Hadaka | Every element earns its place; silence as design element |
| Typography as visual centerpiece | Obys Agency | Display type carrying emotional weight without decoration |
| Cinematic color grading | Canals Amsterdam | Muted tones, selective warmth, atmospheric depth |

---

*Document generated as part of the Aetheria Museum cinematic redesign pipeline.
Next step: Phase 1 implementation plan → Engineering code generation.*
