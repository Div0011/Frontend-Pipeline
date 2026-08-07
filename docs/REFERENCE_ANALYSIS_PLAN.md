# Comprehensive Edit Plan — Phase 2 Completion

## Information Gathered

### Phase 1 Status ✅ — COMPLETE
All 15 reference pattern analysis documents across 5 templates are done.

### Phase 2 Status ⬜ — IN PROGRESS
All 5 Next.js projects are scaffolded with basic components but missing key interactivity features. Below is a detailed analysis of each template's current state vs. reference requirements.

---

## Template 1: Film Portfolio (Genre: Obys Agency + Minh Pham + Imagina Studio)

**References:** 01-obys-agency (typography-led), 02-minh-pham-portfolio (GSAP+WebGL), 03-imagina-studio (grid-to-fullscreen video morph)

**Current State:**
- ✅ Hero with character-level typography reveal (Obys-style)
- ✅ Imagina-style video morph (grid→fullscreen on scroll)
- ✅ ProjectGrid basic structure
- ✅ CaseStudy component
- ✅ LenisProvider + GSAP ScrollTrigger
- ✅ Preloader component (exists but may need interactivity)
- ✅ CustomCursor

**What's Missing:**
- ❌ **Line-split typography** — Hero uses character-level but needs the line-split effect where text splits apart on scroll
- ❌ **3-viewport work grid** — Current ProjectGrid is a simple list; needs vertical/horizontal/grid layout toggle
- ❌ **Clip-path morph transitions** (Imagina-style) — Project thumbnails don't morph to fullscreen
- ❌ **Project detail/overlay view** — No detail page or overlay exists
- ❌ **`prefers-reduced-motion` fallback** — CSS exists in globals but components don't respect it properly

**Files to Create:**
1. `src/components/WorkGrid.tsx` — 3-viewport layout grid (vertical/horizontal/grid toggle)
2. `src/components/ProjectOverlay.tsx` — Full-screen project detail overlay with clip-path morph
3. `src/hooks/useReducedMotion.ts` — Hook for reduced motion detection

**Files to Edit:**
1. `src/app/page.tsx` — Integrate WorkGrid, ProjectOverlay
2. `src/components/ProjectGrid.tsx` — Convert to support layout toggle
3. `src/components/Hero.tsx` — Add line-split scroll effect, add reduced-motion guard
4. `src/lib/motion.ts` — Add utility functions (line-split, clip-path)
5. `src/app/globals.css` — Add work-grid layout styles

---

## Template 2: SaaS Product Launch (Genre: Jeton + Hubtown + Lusion)

**References:** 04-jeton (fintech restraint), 05-hubtown (3D centerpiece), 06-lusion (real-time 3D scroll)

**Current State:**
- ✅ Navigation, Hero, Features, Pricing, Testimonials, CTA, Footer
- ✅ R3F Scene with 3D abstract centerpiece
- ✅ Scroll-driven explode/assemble mechanic
- ✅ LenisProvider + GSAP ScrollTrigger
- ✅ Fallback SVG images for reduced motion

**What's Missing (4 specific bugs + interactivity):**
- ❌ **Bug 1: explode/assemble lerp** — Current `progressRef` approach doesn't smoothly lerp; needs Template 5's `ComponentPart` pattern (progress-driven lerp inside `useFrame`, not external `blocksRef` approach)
- ❌ **Bug 2: camera gsap.to() in onUpdate** — Camera uses `gsap.to()` on position inside useFrame; should `set camera.position` directly and let `scrub` provide smoothing
- ❌ **Bug 3: OrbitControls rotate not disabled** — During scroll-driven sections, `enableRotate: false` is not set
- ❌ **Bug 4: Real WebP fallbacks** — Fallback SVGs exist but real WebP images not wired
- ❌ **Feature section scroll interactivity** — Features lack per-item scroll-triggered highlights matching Jeton's precision
- ❌ **Pricing horizontal comparison scroll** — No sticky-header horizontal scroll comparison
- ❌ **CTA micro-interactions** — CTA section lacks animated counters and hover effects

**Files to Edit:**
1. `src/components/three/Scene.tsx` — Major rewrite: fix lerp pattern, camera position direct set, OrbitControls disable
2. `src/components/sections/Features.tsx` — Add per-feature scroll-triggered highlights, counter animations
3. `src/components/sections/Pricing.tsx` — Add horizontal scroll comparison with sticky headers
4. `src/components/sections/Cta.tsx` — Add micro-interactions (counters, hover effects)
5. `src/components/sections/Hero.tsx` — Add 3D parallax tie-in with Scene

---

## Template 3: Corporate / Institutional (Genre: L'Oréal + Canals + History of Animation)

**References:** 07-loreal-mediaroom (institutional gravitas), 08-canals-amsterdam (atmospheric), 09-history-of-animation (chapter numbering)

**Current State:**
- ✅ Navigation with chapter sections
- ✅ Hero, OurStory, Expertise, Leadership, TrustSignals, Contact, Footer
- ✅ BackgroundScene with 3D atmospheric icosahedron
- ✅ Chapter-based layout structure
- ✅ LenisProvider

**What's Missing:**
- ❌ **Chapter navigation with progress indicator** — No side navigation showing current chapter (1/4, 2/4, etc.)
- ❌ **Environmental lighting transitions** — BackgroundScene color/fog transitions exist but chapters don't trigger them via scroll
- ❌ **Atmospheric background media layers** — No Ken Burns background images/videos per chapter
- ❌ **Chapter numbering display** — No visible "Chapter 01 / 04" style numbering
- ❌ **`prefers-reduced-motion` fallback** — No reduced-motion handling (crossfade only, no autoplay video)
- ❌ **Zig-zag layout rhythm** (History of Animation pattern) — Content sections are flat, no alternating layout

**Files to Edit:**
1. `src/components/sections/Navigation.tsx` — Add chapter progress indicator
2. `src/components/three/BackgroundScene.tsx` — Wire chapter progress to environmental transitions
3. `src/app/page.tsx` — Add chapter context provider
4. `src/components/sections/Hero.tsx` — Add Ken Burns background
5. `src/components/sections/ChapterTwo.tsx` — Add atmospheric image layers, zig-zag layout
6. `src/components/sections/ChapterThree.tsx` — Add atmospheric image layers, zig-zag layout
7. `src/components/sections/ChapterFour.tsx` — Add atmospheric image layers, zig-zag layout
8. `src/components/providers/LenisProvider.tsx` — Add reduced-motion detection

**Files to Create:**
1. `src/context/ChapterContext.tsx` — Track current chapter for cross-component sync
2. `src/components/sections/ChapterProgress.tsx` — Visual chapter indicator

---

## Template 4: Creative Agency (Genre: Locomotive + Active Theory + Resn)

**References:** 10-locomotive (brand-forward), 11-active-theory (game-grade WebGL), 12-resn (playful 3D)

**Current State:**
- ✅ Hero with showreel background, mute/play controls
- ✅ Navigation with custom cursor
- ✅ BackgroundCanvas (placeholder)
- ✅ AgencyPortfolio component
- ✅ TransitionOverlay
- ✅ Services, Clients, Contact sections

**What's Missing:**
- ❌ **Project grid with aggressive stagger** — Current project grid has no scroll-triggered stagger animation
- ❌ **Showreel player integration** — Hero has video controls but no dedicated showreel player with progress bar
- ❌ **Full-screen project overlay** — No overlay when clicking projects
- ❌ **Energy-driven hero** — Hero lacks Locomotive's brand-forward motion energy
- ❌ **Reduced-motion fallback** — No crossfade-only mode, showreel autoplays
- ❌ **Active Theory-style WebGL interactions** — BackgroundCanvas is a placeholder with no actual 3D

**Files to Edit:**
1. `src/components/AgencyPortfolio.tsx` — Add aggressive stagger to project grid, integrate project overlay
2. `src/components/hero.tsx` — Add energy-driven motion (brand statement reveal, scroll-triggered text effects)
3. `src/components/BackgroundCanvas.tsx` — Replace placeholder with real WebGL particles/geometry
4. `src/app/globals.css` — Add stagger animation utilities
5. `src/lib/motion.ts` — Add stagger/reveal helpers

**Files to Create:**
1. `src/components/ShowreelPlayer.tsx` — Full showreel player with scrub progress
2. `src/components/ProjectOverlay.tsx` — Full-screen project overlay with transition
3. `src/components/EnergyHero.tsx` — Refactored hero with brand-forward motion

---

## Template 5: Physical Product / E-commerce (Genre: Kieran Clarke + Vertigo 1958 + Lusion Product)

**References:** 13-kieran-clarke (mechanical disassembly), 14-vertigo-1958 (Spline camera tracking), 15-lusion-product (persistent 3D with material transitions)

**Current State:**
- ✅ Hero
- ✅ DisassemblySection
- ✅ HotspotExplorer
- ✅ TechSpecs
- ✅ Footer
- ✅ LenisProvider
- ✅ 86 WebP frames for product animation

**What's Missing:**
- ❌ **Product 3D viewer with scroll disassembly** — DisassemblySection exists but lacks proper R3F integration with scroll scrub
- ❌ **Scroll-scrubbed exploded view** — No real 3D product model being exploded on scroll
- ❌ **OrbitControls rotate not disabled during scroll sections**
- ❌ **Feature callouts with camera choreography** — HotspotExplorer lacks camera movement tie-in
- ❌ **CTA/purchase section** — No purchase CTA at bottom
- ❌ **Persistent 3D object with material transitions** (Lusion pattern) — No material color/roughness change on scroll

**Files to Create:**
1. `src/components/three/ProductScene.tsx` — R3F scene with scroll-driven exploded view
2. `src/components/three/ComponentPart.tsx` — Individual product part with progress-driven lerp
3. `src/components/sections/PurchaseCta.tsx` — Purchase CTA section

**Files to Edit:**
1. `src/app/page.tsx` — Integrate ProductScene and PurchaseCta
2. `src/components/sections/DisassemblySection.tsx` — Wire to ProductScene, fix scroll scrub
3. `src/components/sections/HotspotExplorer.tsx` — Add camera choreography tie-in
4. `src/components/sections/TechSpecs.tsx` — Add material transition effects
5. `src/app/globals.css` — Add product viewer styles

---

## Phase 3: Quality & QA Guardrails (Not Started)

**What's Needed:**
- ❌ Genericness check script — flag centered-hero/rounded-card/gradient-blob patterns
- ❌ Scroll-reversibility check — ensure scrolling backward reverses smoothly
- ❌ Real-device mobile performance check
- ❌ Expanded reference.md with cross-template patterns + motion token library

---

## Summary

| Template | Current State | Files to Create | Files to Edit |
|----------|---------------|-----------------|---------------|
| 1. Film Portfolio | ~50% done | 3 | 5 |
| 2. SaaS Launch | ~40% done (with 4 bugs) | 0 | 6 |
| 3. Corporate | ~40% done | 2 | 8 |
| 4. Agency | ~35% done | 3 | 5 |
| 5. Product | ~30% done | 3 | 5 |

**Estimated total work:** ~11 new files, ~29 file edits
