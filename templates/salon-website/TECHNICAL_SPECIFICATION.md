# Salon Cinematic Website — Comprehensive Technical Specification & Implementation Plan

## 1. Current State Analysis

### 1.1 Existing Architecture

The project at `projects/salon-website/` is a Next.js 15 + React 19 application with the following core infrastructure already built:

| Component | File | Status |
|-----------|------|--------|
| Lenis smooth scroll + GSAP ticker integration | `components/LenisProvider.tsx` | ✅ Working (duration: 3.8s, wheelMultiplier: 0.65) |
| Canvas-based frame renderer with preloader | `components/FrameSequence.tsx` | ✅ Working (pinDistanceVh: 140, scrub: 0.15) |
| Master 4-video scroll orchestrator | `components/CinematicViewportEngine.tsx` | ✅ Working (2200vh total track) |
| Golden mist curtain transition | `components/FogTransition.tsx` | ✅ Working (localized right-corner) |
| Fullscreen magazine drawer (5 inner pages) | `components/MagazineDrawer.tsx` | ✅ Working (establishment, staff, pricing, testimonials, booking) |
| Transparent footer with BOOK NOW CTA | `components/SalonFooter.tsx` | ✅ Working |
| Interactive water ripple canvas | `components/WaterRippleCanvas.tsx` | ✅ Working (mouse move + click ripples) |
| Reduced motion accessibility hook | `components/shared/useReducedMotion.ts` | ✅ Working |
| Frame manifest (4 video folders) | `lib/frame-manifest.json` | ✅ Working |
| 912 extracted JPEG frames across 4 folders | `public/frames/` | ✅ Working |

### 1.2 Critical Bug Found

**`LenisProvider.tsx:15`** — The memory record claimed a `lenensRef` typo, but the actual code correctly uses `lenisRef`. No build-blocking typo exists. The build passes cleanly.

### 1.3 Frame Counts from Manifest

| Video | Folder Key | Frame Count |
|-------|-----------|-------------|
| Video 1: Entering reception | `Entering_hair_salon_reception_space_202608100125_frames` | 192 |
| Video 2: Panning reception | `Camera_panning_salon_reception_l…_202608100125_frames` | 240 |
| Video 3: Moving past salon | `Camera_moving_past_hair_salon_202608100125_frames` | 240 |
| Video 4: Tracking interior | `Camera_tracking_hair_salon_interior_202608100125_frames` | 240 |

### 1.4 Gap Analysis: Current vs. Required

| Requirement | Current State | Gap |
|-------------|--------------|-----|
| Initial button removed on click + ripple + thumb icon → Frame 80 | Button triggers auto-scroll to ~frame 75, title reveals | Need thumb icon overlay, exact Frame 80 target, button DOM removal |
| Salon name appears at Frame 80 | Title reveals at frame ~75 (0.055 progress) | Shift to exact Frame 80 trigger |
| Frame 180: text-only link + ripple | No Frame 180 trigger exists | New trigger + UI element needed |
| Golden fog sweeps across full screen | Golden mist exists but is localized + scale-based | Need full-screen sweep animation |
| Video 2 divided into 3 fade sections | Video 2 plays as single continuous sequence | Need section partitioning + crossfades |
| White circular dot navigation with fullscreen expansion | Edge orbs exist (56px, halfway off-screen) | Replace/ supplement with centered dot navigation + expansion |
| Inner pages with "Back to the Salon" preserving scroll position | MagazineDrawer exists but uses `onClose` (no scroll restoration) | Need scroll position memory + restoration |
| Video 3: equipment trigger on third-to-last page of Video 2 | No such trigger exists | New trigger at calculated frame |
| Video 3: white circular arrow buttons → inner pages | No arrow buttons exist | New UI elements + expansion animation |
| Video 4: "Now let's move to the end" text | No such text exists | New text overlay |
| Footer animation: elements rise into view | Footer rises at 0.90 progress | Align with Video 4 entry |
| "Book an Appointment Now" fixed for final 30 frames | BOOK NOW button exists in footer | Make it fixed-position, visible only for last 30 frames |
| Strict minimalism: no large text blocks on video backgrounds | Orbs have large opposite headings | Move text into inner pages only |

---

## 2. Technical Specification

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SALON CINEMATIC ENGINE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ LenisProvider │───▶│ Cinematic    │───▶│  Canvas      │  │
│  │ (smooth      │    │ Viewport     │    │  Renderer    │  │
│  │  scroll)     │    │ Engine       │    │  (4 videos)  │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                    │          │
│         │            ┌──────────────┐    ┌──────────────┐  │
│         │            │ Master TL    │    │  Magazine    │  │
│         │            │ (2200vh)     │    │  Drawer      │  │
│         │            │              │    │  (inner      │  │
│         │            │ 4 acts +     │    │  pages)      │  │
│         │            │ 3 mist       │    │              │  │
│         │            │ transitions  │    │              │  │
│         │            └──────────────┘    └──────────────┘  │
│         │                   │                    │          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ WaterRipple  │    │ FogTransition│    │  Salon       │  │
│  │ Canvas       │    │ (right-corner│    │  Footer      │  │
│  │ (interactive)│    │  localized)  │    │  (transparent│  │
│  │              │    │              │    │   + CTA)     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 State Management Specification

```typescript
// Navigation state machine
interface NavigationState {
  currentVideo: 0 | 1 | 2 | 3;
  currentFrame: number;
  scrollPositionY: number;        // Preserved before inner page open
  reducedMotion: boolean;
  activeInnerPage: MagazinePageType | null;
  isTransitioning: boolean;
  isOnFirstFrame: boolean;
}

// Magazine page types (extend existing)
type MagazinePageType = 
  | 'hero'           // Existing
  | 'establishment'  // Existing
  | 'staff'          // Existing
  | 'pricing'        // Existing
  | 'testimonials'   // Existing
  | 'booking'        // Existing
  | 'equipment'      // NEW — Video 3 inner page
  | 'sitting'        // NEW — Video 3 inner page
  | null;
```

### 2.3 Frame Trigger Map

| Trigger Point | Video | Frame | Action | UI Element |
|--------------|-------|-------|--------|-----------|
| Initial load | 1 | 0 | Show "Click here to enter the resting area" button | Fixed center button |
| Button click | 1 | 0→80 | Remove button, show ripple + thumb, auto-scroll to Frame 80 | Ripple animation + thumb icon |
| Frame 80 | 1 | 80 | Reveal salon name "LUMIÈRE" | Hero title overlay |
| Frame 180 | 2 | 180 | Show text-only link + ripple | "Click here to view the resting area" |
| Golden fog sweep | 2 | 180 | Full-screen golden fog transition | SVG feTurbulence + CSS clip-path |
| Video 2 section 1→2 | 2 | ~80 | Fade-out previous section | Crossfade overlay |
| Video 2 section 2→3 | 2 | ~160 | Fade-out previous section | Crossfade overlay |
| Dot click (any) | 2 | current | Fullscreen white circle expansion → inner page | Sphere inflation animation |
| "Back to the Salon" | any | preserved | Return to exact scroll position | Lenis scrollTo |
| Third-to-last page | 2 | ~220 | Show ripple button | "Let's see the equipment and sitting area" |
| Button click | 2→3 | transition | Full-screen golden overlay | Mist curtain |
| Video 3 equal parts | 3 | 0/80/160 | White circular arrow buttons | Fixed position arrows |
| Arrow click | 3 | current | White fullscreen expansion → inner page | Sphere inflation (white) |
| Video 4 entry | 4 | 0 | Show "Now let's move to the end of the journey" | Text overlay |
| Footer rise | 4 | ~200 | Footer elements animate into view | GSAP y: 60 → 0 |
| Final 30 frames | 4 | 210-240 | Fixed "Book an Appointment Now" button | Fixed bottom CTA |

### 2.4 Golden Fog Transition System

**Current:** `FogTransition.tsx` implements a localized right-corner fog using `radial-gradient` with scale animation.

**Required Enhancement:** Full-screen sweep from one edge to cover entire page.

```typescript
// New: GoldenFogSweep component
interface GoldenFogSweepProps {
  triggerFrame: number;
  direction: 'left' | 'right' | 'top' | 'bottom';
  duration: number; // frames
  onComplete: () => void;
}

// Implementation approach:
// 1. SVG feTurbulence texture layer for organic fog grain
// 2. CSS clip-path animation for directional sweep
// 3. GSAP timeline synced to scroll progress
// 4. Velocity-aware timing (slower scroll = longer fog duration)
```

### 2.5 Dot Navigation System

```typescript
// NEW: DotNavigation component
interface DotNavigationProps {
  videoIndex: 2; // Only on Video 2
  sections: {
    id: MagazinePageType;
    label: string;
    position: { x: string; y: string }; // Viewport position
  }[];
  onDotClick: (page: MagazinePageType, origin: string) => void;
}

// Visual spec:
// - Plain white circle: 24px diameter
// - No border, no shadow, no label
// - Positioned at viewport edge intersections
// - Hover: scale(1.3), cursor: pointer
// - Click: clip-path circle(3% → 160%) expansion
// - Expansion color: white → inner page background
```

### 2.6 Scroll Position Preservation

```typescript
// NEW: useScrollPositionMemory hook
interface ScrollPositionMemory {
  savePosition: () => { y: number; videoIndex: number; frame: number };
  restorePosition: (pos: SavedPosition) => void;
  clearPosition: () => void;
}

// Implementation:
// 1. On inner page open: save window.scrollY + current video/frame
// 2. Store in Zustand or ref (not URL — no deep linking required)
// 3. On "Back to the Salon": Lenis.scrollTo(savedY, { immediate: false })
// 4. Ensure canvas redraws correct frame at restored position
```

### 2.7 Video 3 Arrow Navigation

```typescript
// NEW: Video3ArrowNavigation component
interface Video3ArrowProps {
  videoFrames: number; // 240
  onArrowClick: (sectionIndex: number) => void;
}

// Visual spec:
// - White circle: 48px diameter
// - Contains arrow icon (→ or ↓ depending on section)
// - Position: left-center, right-center, bottom-center
// - Click: white fullscreen expansion → inner page
// - Inner page has minimal "Back" button
```

### 2.8 Footer Animation Specification

```typescript
// CURRENT: SalonFooter rises at 0.90 progress with y: 60 → 0
// REQUIRED: Align with Video 4 entry + fixed booking button

// New footer structure:
<footer>
  <h2>LUMIÈRE</h2>           // Rises first (0.82-0.86)
  <p>subtitle</p>              // Rises second (0.86-0.90)
  <button>BOOK NOW</button>    // Fixed position, appears at frame 210
  <p>copyright</p>             // Rises last (0.90-0.94)
</footer>

// Fixed booking button spec:
// - Position: fixed, bottom: 2rem, right: 2rem
// - z-index: 100
// - Visible only when videoIndex === 3 && currentFrame >= 210
// - Golden gradient background
// - Click → open booking inner page
```

### 2.9 Design Token System (Extend Existing)

```css
/* Existing tokens from MagazineDrawer */
--color-gold: #b8860b;
--color-gold-light: #e6c687;
--color-cream: #faf8f2;
--color-white: #ffffff;
--color-black: #111111;
--font-display: var(--font-display); /* Serif */
--font-body: var(--font-body);       /* Sans-serif */

/* NEW tokens for video scroll UI */
--color-dot: #ffffff;
--color-dot-hover: #e6c687;
--color-fog-gold: #e6c687;
--color-fog-deep: #b8860b;
--color-arrow-bg: #ffffff;
--color-arrow-icon: #0b0b0c;
--radius-dot: 50%;
--radius-button: 100px;
--transition-expansion: 0.9s cubic-bezier(0.16, 1, 0.3, 1);
--transition-fade: 0.35s ease-out;
```

---

## 3. Implementation Plan

### Phase 1: Initial Interaction & Frame 80 Trigger (Video 1)

**Files to modify:**
- `components/CinematicViewportEngine.tsx`
- `components/WaterRippleCanvas.tsx` (extend for custom thumb icon)
- `components/shared/useScrollPositionMemory.ts` (NEW)

**Steps:**

1. **Create `useScrollPositionMemory` hook** (`components/shared/useScrollPositionMemory.ts`):
   - Save `window.scrollY`, `videoIndex`, `frameIndex` before inner page open
   - Restore via `lenisRef.current?.scrollTo(savedY)` on close
   - Trigger canvas redraw at restored frame

2. **Modify initial button in `CinematicViewportEngine.tsx:490-536`:**
   - Change text from "CLICK TO ENTER ATELIER" to "Click here to enter the resting area"
   - On click: remove button from DOM (`setIsOnFirstFrame(false)` + `pointerEvents: none`)
   - Spawn ripple effect at click coordinates via `WaterRippleCanvas`
   - Show customized thumb icon (SVG) pointing toward ripple area
   - Trigger `handleStartWalking` but target Frame 80 instead of ~75

3. **Update Frame 80 trigger in master timeline (`CinematicViewportEngine.tsx:279-283`):**
   - Current: hero text reveals at 0.055 progress (~frame 75)
   - Change to: reveal at exact Frame 80 progress = `80 / buf1Len`
   - Calculate: `frame80Progress = 80 / 192 ≈ 0.417` of video 1 segment
   - Map to master timeline: video 1 segment is 0.00-0.22, so Frame 80 = `0.00 + (80/192) * 0.22 ≈ 0.092`

4. **Add thumb icon component:**
   - SVG thumb pointing down/right toward ripple
   - Fixed position, appears after button click
   - Fades out as scroll progresses

### Phase 2: Mid-Scroll Transitions (Video 2)

**Files to modify:**
- `components/CinematicViewportEngine.tsx`
- `components/FogTransition.tsx`
- `components/MagazineDrawer.tsx`

**New files:**
- `components/DotNavigation.tsx` (NEW)
- `components/GoldenFogSweep.tsx` (NEW)

**Steps:**

1. **Create `GoldenFogSweep` component:**
   - SVG `feTurbulence` filter for organic fog texture
   - Full-screen overlay with `clip-path: circle()` animation
   - Directional sweep: right-to-left by default
   - Synced to master timeline at Frame 180 transition zone

2. **Create `DotNavigation` component:**
   - 3-5 plain white circular buttons (24px)
   - Positioned at calculated viewport coordinates
   - Each maps to a `MagazinePageType`
   - Click triggers sphere inflation animation
   - Hide during reduced motion

3. **Divide Video 2 into 3 sections:**
   - Section 1: Frames 0-79 (0.30-0.40 in master timeline)
   - Section 2: Frames 80-159 (0.40-0.50 in master timeline)
   - Section 3: Frames 160-239 (0.50-0.56 in master timeline)
   - Add crossfade overlays between sections

4. **Add Frame 180 text link trigger:**
   - Text-only: "Click here to view the resting area"
   - Ripple effect on hover/click
   - Position: center-screen, minimal styling

5. **Update `MagazineDrawer` close behavior:**
   - On close: call `restoreScrollPosition()` instead of just `setActivePage(null)`
   - Ensure canvas redraws at correct frame after restoration

### Phase 3: Equipment & Sitting Area (Video 3)

**Files to modify:**
- `components/CinematicViewportEngine.tsx`

**New files:**
- `components/Video3ArrowNav.tsx` (NEW)
- `components/EquipmentDrawer.tsx` (NEW)
- `components/SittingDrawer.tsx` (NEW)

**Steps:**

1. **Calculate third-to-last page of Video 2:**
   - Video 2 has 240 frames
   - Third-to-last page = frame 240 - (3 * section_size)
   - If 3 equal sections: section_size = 80, third-to-last = frame 160
   - Add trigger at master timeline progress: `0.40 + (160/240) * 0.20 ≈ 0.567`

2. **Create ripple button at calculated trigger:**
   - Text: "Let's see the equipment and sitting area"
   - Ripple effect on hover
   - Click → full-screen golden overlay → transition to Video 3

3. **Create `Video3ArrowNav` component:**
   - Divide Video 3 (240 frames) into 3 equal parts: 0-79, 80-159, 160-239
   - Part 1: Left-center white circle with right arrow (→)
   - Part 2: Right-center white circle with left arrow (←)
   - Part 3: Bottom-center white circle with up arrow (↑)
   - Each arrow click → white fullscreen expansion → inner page

4. **Create `EquipmentDrawer` and `SittingDrawer`:**
   - Minimalist white background
   - Curated web images/videos of equipment
   - Minimal "Back" button (golden, bottom-center)
   - Preserve scroll position on open/close

### Phase 4: Journey's End (Video 4)

**Files to modify:**
- `components/CinematicViewportEngine.tsx`
- `components/SalonFooter.tsx`

**Steps:**

1. **Add "Now let's move to the end of the journey" text:**
   - Appears when Video 4 starts (master timeline 0.80)
   - Fades in quickly, fades out as footer rises
   - Position: center-screen, minimal typography

2. **Update footer animation timing:**
   - Current: rises at 0.90
   - New: stagger rise starting at 0.82
   - Title: 0.82-0.86
   - Subtitle: 0.86-0.90
   - CTA button: 0.90-0.94
   - Copyright: 0.94-0.98

3. **Make BOOK NOW button fixed for final 30 frames:**
   - Add `position: fixed` style when `videoIndex === 3 && frame >= 210`
   - z-index: 100
   - Golden gradient, rounded pill shape
   - Click → open booking inner page
   - Ensure it doesn't interfere with scroll

### Phase 5: General Design Constraints & Polish

**Files to modify:**
- `components/CinematicViewportEngine.tsx` (remove large text from orbs)
- `app/globals.css` (add animation keyframes)

**Steps:**

1. **Remove large text blocks from video backgrounds:**
   - Current orbs have opposite bold headings (e.g., "A Sanctuary Built to Slow You Down")
   - Move ALL text into inner pages only
   - Keep orbs as pure visual navigation dots (no labels)

2. **Add animation keyframes to `globals.css`:**
   ```css
   @keyframes floatSoft {
     0%, 100% { transform: translateY(0); }
     50% { transform: translateY(-8px); }
   }
   
   @keyframes rippleExpand {
     0% { transform: scale(0); opacity: 0.6; }
     100% { transform: scale(1); opacity: 0; }
   }
   
   @keyframes fogSweep {
     0% { clip-path: circle(0% at 100% 0%); }
     100% { clip-path: circle(160% at 100% 0%); }
   }
   
   @keyframes dotPulse {
     0%, 100% { transform: scale(1); }
     50% { transform: scale(1.2); }
   }
   ```

3. **Accessibility audit:**
   - Ensure all interactive elements have `aria-label`
   - Verify `prefers-reduced-motion` disables all animations
   - Check color contrast ratios (gold on dark: #e6c687 on #0b0b0c = ~8.5:1 ✅)
   - Ensure keyboard navigation works for all buttons

4. **Performance optimization:**
   - Verify WebP frame format (currently JPEG — consider conversion)
   - Implement frame prefetching (preload next 10 frames ahead)
   - Add `loading="lazy"` to inner page images
   - Code-split MagazineDrawer, EquipmentDrawer, SittingDrawer

---

## 4. Skills Reference Map

| Skill | Application |
|-------|-------------|
| **gsap-scrolltrigger** | Core scroll-driven animations, pin/scrub, master timeline |
| **motion-framer** | Alternative for micro-interactions if GSAP insufficient |
| **design-system** | 3-tier token architecture (primitive → semantic → component) |
| **clean-code** | Component decomposition, single responsibility |
| **performance** | Core Web Vitals, frame preloading, code splitting |
| **a11y-audit** | WCAG 2.2 AA compliance, reduced motion, keyboard nav |
| **refactoring-ui** | Visual hierarchy, spacing, dark mode refinement |
| **web-typography** | Font pairing, responsive type scale, loading strategy |
| **top-design** | Cinematic scroll experience, scroll-driven composition |
| **modern-web-design** | 2024-2025 trends, micro-interactions, scrollytelling |

---

## 5. File Structure (Final)

```
projects/salon-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── LenisProvider.tsx
│   ├── FrameSequence.tsx
│   ├── CinematicViewportEngine.tsx  ← MASTER ORCHESTRATOR (heavy modifications)
│   ├── MagazineDrawer.tsx           ← Extend with equipment/sitting pages
│   ├── FogTransition.tsx            ← Enhance to GoldenFogSweep
│   ├── SalonFooter.tsx              ← Update animation timing + fixed CTA
│   ├── WaterRippleCanvas.tsx        ← Extend for custom thumb icon
│   ├── CustomCursor.tsx
│   ├── AudioEngine.tsx
│   ├── NavArrows.tsx
│   ├── BookingModal.tsx
│   ├── Header.tsx
│   ├── TreatmentMenu.tsx
│   ├── BeforeAfterSlider.tsx
│   ├── SubpageDrawer.tsx
│   ├── shared/
│   │   └── useReducedMotion.ts
│   ├── shared/
│   │   └── useScrollPositionMemory.ts  ← NEW
│   ├── DotNavigation.tsx             ← NEW
│   ├── GoldenFogSweep.tsx            ← NEW
│   ├── Video3ArrowNav.tsx            ← NEW
│   ├── EquipmentDrawer.tsx           ← NEW
│   └── SittingDrawer.tsx             ← NEW
├── lib/
│   ├── frame-manifest.json
│   └── types.d.ts
├── public/
│   └── frames/
│       ├── Entering_hair_salon_reception_space_202608100125_frames/ (192 frames)
│       ├── Camera_panning_salon_reception_l…_202608100125_frames/ (240 frames)
│       ├── Camera_moving_past_hair_salon_202608100125_frames/ (240 frames)
│       └── Camera_tracking_hair_salon_interior_202608100125_frames/ (240 frames)
├── package.json
└── tsconfig.json
```

---

## 6. Verification Checklist

- [ ] `npm run build` passes cleanly
- [ ] `npm run lint` passes with zero errors
- [ ] Initial button click removes button, shows ripple + thumb, scrolls to Frame 80
- [ ] Salon name "LUMIÈRE" appears precisely at Frame 80
- [ ] Frame 180 triggers text-only link with ripple effect
- [ ] Golden fog sweeps full screen at Frame 180 transition
- [ ] Video 2 has 3 distinct sections with fade transitions
- [ ] White dot navigation visible on Video 2
- [ ] Dot click triggers fullscreen white expansion
- [ ] Inner pages load with minimalist magazine design
- [ ] "Back to the Salon" returns to exact scroll position
- [ ] Third-to-last page of Video 2 shows equipment ripple button
- [ ] Golden overlay transitions to Video 3
- [ ] Video 3 has 3 white circular arrow buttons
- [ ] Arrow clicks open equipment/sitting inner pages
- [ ] "Now let's move to the end of the journey" appears at Video 4 entry
- [ ] Footer elements rise in staggered sequence
- [ ] "Book an Appointment Now" fixed for final 30 frames
- [ ] No large text blocks on video backgrounds
- [ ] All animations respect `prefers-reduced-motion`
- [ ] All interactive elements have `aria-label`
- [ ] Color contrast ratios meet WCAG 2.2 AA (≥4.5:1 for normal text)
- [ ] Scroll velocity-aware transition timing
- [ ] Frame preloading loads next 10 frames ahead

---

## 7. Code Reference Index

| File | Line(s) | Current Code | Required Change |
|------|---------|--------------|-----------------|
| `CinematicViewportEngine.tsx` | 188-201 | `handleStartWalking` scrolls to `window.innerHeight * 1.55` | Change target to Frame 80 equivalent |
| `CinematicViewportEngine.tsx` | 251-272 | Video 1 timeline: `buf1Len - 1` frames over 0.22 duration | Add exact Frame 80 trigger at `0.00 + (80/192)*0.22` |
| `CinematicViewportEngine.tsx` | 279-283 | Hero text reveals at 0.055 (~frame 75) | Shift to 0.092 (~frame 80) |
| `CinematicViewportEngine.tsx` | 288-301 | Golden mist at 0.22-0.30 | Add full-screen sweep variant |
| `CinematicViewportEngine.tsx` | 307-318 | Video 2 plays 0.30-0.50 | Partition into 3 sections with crossfades |
| `CinematicViewportEngine.tsx` | 490-536 | Initial button: "CLICK TO ENTER ATELIER" | Change text, add thumb icon, remove on click |
| `CinematicViewportEngine.tsx` | 605-821 | Edge orbs with large headings | Replace with dot navigation, move text to inner pages |
| `CinematicViewportEngine.tsx` | 826-841 | Footer rises at 0.90 | Stagger: title 0.82, subtitle 0.86, CTA 0.90, copyright 0.94 |
| `MagazineDrawer.tsx` | 56-70 | `onClose` just sets `activePage` to null | Add scroll position restoration |
| `FogTransition.tsx` | 84-98 | Right-corner localized fog | Enhance to full-screen sweep with SVG texture |
| `SalonFooter.tsx` | 46-78 | BOOK NOW button in footer flow | Make fixed-position for frames 210-240 |
| `WaterRippleCanvas.tsx` | 39-52 | Generic ripple on click | Extend for custom thumb icon spawn |
| `FrameSequence.tsx` | 53-113 | Preloads frames with 4s fallback | Add next-10-frames prefetching |

---

*Document generated: 2026-08-11*
*Project: Frontend Pipeline / projects/salon-website/*
*Stack: Next.js 15, React 19, GSAP 3.15, Lenis 1.3.25, TypeScript 5.8*
