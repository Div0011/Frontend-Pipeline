# Cinematic Scroll-Driven Website — Technical Storyboard & Animation Sequence

## Design Direction
- **Aesthetic**: Minimalist, quiet luxury — inspired by arch-studious.com
- **Principles**: No borders, no decorative elements, no shadows. Pure typography, whitespace, and motion.
- **Treatment**: Every element stripped to its essential form. Icons are glyphs, not illustrations. Interactions are subtle, not decorative.

## Reference Inspiration
- **Smash Guys**: scroll-based frame scrubber, pinned sections, smooth frame interpolation
- **https://sixb-dentaire.fr/**: minimal medical aesthetic, generous whitespace, restrained typography
- **https://lusion.co/**: immersive scroll narrative, heavy motion, layered depth, post-processing feel
- **https://arch-studious.com/**: brutalist-minimal typography, no borders, no decoration, pure content-first hierarchy
- **Awwwards 2024-2025 trends**: scrollytelling, pin+scrub, fog/mist transitions, instant cuts, reduced-motion fallbacks

---

## 1. Overall Architecture

```
page.tsx (orchestrator)
├── LenisProvider (smooth scroll)
├── HeroSection (FrameSeq 1 — Entering reception)
│   ├── ScrollTrigger: pin 150vh, autoplay frames 0→90
│   ├── Auto-stop at frame 90 → scroll scrub activates
│   ├── "Enter the Resting Area" CTA appears at frame 180
│   └── Icon: minimalist glyph, no border, no decoration
├── MistTransition (subtle fog, 140vh hold)
├── SectionTwo (FrameSeq 2 — Reception panning)
│   └── ScrollTrigger: pin 150vh, scrub frames 0→N
│   └── Content overlay: fade-in/out text block (no containers)
│   └── Nav arrows: glyph-only, no borders
├── MistTransition (second mist, 140vh hold)
├── SectionThree (FrameSeq 3 — Moving past salon)
│   └── ScrollTrigger: pin 150vh, scrub frames 0→N
│   └── Content overlay: payment/utility info, minimal glyphs
├── SectionFour (FrameSeq 4 — Tracking interior)
│   └── ScrollTrigger: pin 150vh, scrub frames 0→N
│   └── Content overlay: final CTA (text-only, no border)
└── Footer (revealed on final frame, transparent)
```

**Design Direction**: Arch-studious minimalism — no borders, no shadows, no decorative elements. Pure typography, whitespace, and restrained motion.

---

## 2. Scroll Timeline & Section Durations

| Section | Component | Pin Distance | Transition | Notes |
|---------|-----------|--------------|------------|-------|
| 1 | `FrameSequence` (Entering) | 200vh | — | Hero + brand reveal. Autoplay 0→90, scroll 90→N. CTA at 175. |
| 2 | `MistTransition` | 180vh | White/gold mist | Restrained opacity (0→0.6), no heavy blur |
| 3 | `FrameSequence` (Panning reception) | 200vh | — | Quality/services content + nav glyphs |
| 4 | `MistTransition` | 180vh | Golden mist | Second atmospheric transition |
| 5 | `FrameSequence` (Moving past) | 200vh | — | Payment/utility info, minimal glyphs |
| 6 | `FrameSequence` (Tracking interior) | 200vh | Instant cut from 3 | Final frame + CTA |
| 7 | `Footer` | — | Reveal on last frame | Transparent, no borders |

**Total scroll distance**: ~2000vh of active scroll experience (increased from 1400vh for slower frame advancement).

**Scroll Speed**: Lenis `duration: 2.8` provides slow, luxurious scroll feel. Frames advance ~2.2vh per frame (vs ~1.5vh previously).

**Aesthetic Notes**:
- No borders on any element
- No shadows, no glows, no decorative containers
- Icons are glyphs (→, ↓, ←) or minimal SVG paths
- Typography: system sans-serif, weight 200–300, generous tracking
- Colors: white text on transparent, subtle opacity shifts
- Motion: scale 1→1.04 max, translateY 30px max, no heavy effects

---

## 3. Component Specifications

### 3.1 FrameSequence Component

**Purpose**: Replace direct video playback with scroll-based image sequence scrubbing.

**Props**:
- `folder: string` — frame folder name under `public/frames/`
- `poster?: string` — fallback image for reduced-motion / loading state
- `scrimOpacity?: number` — dark overlay opacity (0–1)
- `pinDistanceVh?: number` — scroll pin distance in vh
- `children?: ReactNode` — overlay content
- `triggerFrame?: number` — frame index at which to pause autoplay and enable scroll scrub (default: 90)
- `buttonFrame?: number` — frame index at which to reveal the CTA button (default: 180)

**Behavior**:
1. On mount, load frame list from `lib/frame-manifest.json` (or fallback to pattern `/frames/${folder}/frame_######.jpeg`)
2. **Auto-stop mechanism**: Sequence plays autonomously from frame 0. Once `triggerFrame` (frame 90) is reached, autoplay pauses and the scroll-based scrub mechanism activates. User scroll progress now controls frame advancement.
3. **Button trigger**: When scroll progress reaches `buttonFrame` (frame 180), the "Enter the Resting Area" CTA button fades in with a minimal scale + opacity transition.
4. Use `requestAnimationFrame` loop to swap `img.src` based on ScrollTrigger progress (only after autoplay stop)
5. Pin section for `pinDistanceVh` vh of scroll
6. Animate image scale 1→1.04 on entrance (subtle, no heavy effects)
7. Animate children: fade in + y:30→0, fade out + y:-20 on exit (minimal motion)
8. `prefers-reduced-motion`: show poster as static background, skip RAF loop

**Minimalist Icon/Arrow Style**:
- No borders, no decorative containers
- Pure text/unicode glyphs (→, ↓, ←) or simple SVG paths
- Color: `rgba(255,255,255,0.5)` → `rgba(255,255,255,1)` on hover
- Hover: opacity 0.5→1, scale 1→1.05, no background, no shadow
- Font: system sans-serif, weight 200–300, tracking-wide
- Spacing: generous whitespace around glyphs

**Key Code Pattern**:
```tsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    let targetIndex = 0;
    let raf: number;
    const total = frames.length;
    let autoplayStopped = false;
    let ctaRevealed = false;

    const updateFrame = () => {
      const idx = Math.max(0, Math.min(total - 1, Math.round(targetIndex)));
      if (img.dataset.index !== String(idx)) {
        img.dataset.index = String(idx);
        img.src = frames[idx];

        // Auto-stop at trigger frame
        if (!autoplayStopped && idx >= (triggerFrame ?? 90)) {
          autoplayStopped = true;
          gsap.to(img, { scale: 1.04, duration: 1.2, ease: 'power2.out' });
        }

        // Reveal CTA at button frame
        if (!ctaRevealed && idx >= (buttonFrame ?? 180)) {
          ctaRevealed = true;
          gsap.to(ctaRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
        }
      }
      raf = requestAnimationFrame(updateFrame);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: `+=${pinDistanceVh}vh`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (autoplayStopped) {
            targetIndex = self.progress * (total - 1);
          }
        },
      },
    });

    raf = requestAnimationFrame(updateFrame);
    // ... animations
  }, wrap);

  return () => ctx.revert();
}, [frames, pinDistanceVh, scrimOpacity, triggerFrame, buttonFrame]);
```

---

### 3.2 MistTransition Component

**Purpose**: Full-screen atmospheric fog/mist transition between sections.

**Props**:
- `heightVh?: number` — mist hold duration in vh (default 140)
- `color?: string` — mist color (default white/golden gradient)
- `intensity?: number` — opacity peak (default 0.9)

**Behavior**:
1. Full-screen overlay (`position: fixed; inset: 0`)
2. Pinned for `heightVh` vh using ScrollTrigger
3. GSAP timeline:
   - 0%→20%: mist opacity 0→1 (fog rolls in)
   - 20%→80%: hold at full opacity (user scrolls through mist)
   - 80%→100%: mist opacity 1→0 (fog clears)
4. Use `backdrop-filter: blur(8px)` + `mix-blend-mode: screen` for atmospheric feel
5. Add subtle noise texture overlay for realism

**CSS**:
```css
.mist-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, transparent 70%);
  backdrop-filter: blur(12px);
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 50;
  opacity: 0;
}
```

---

### 3.3 LenisProvider

**Purpose**: Smooth scroll wrapper that integrates with GSAP ScrollTrigger.

**Implementation**:
```tsx
'use client';
import { ReactLenis } from '@studio-freight/lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      options={{
        duration: 2.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      }}
      root
    >
      {children}
    </ReactLenis>
  );
}
```

**Scroll Speed**: `duration: 2.8` provides a slow, luxurious scroll feel. Frames advance gradually per scroll unit.

---

## 4. Animation Sequence — Detailed Timing

### Phase 1: Hero & Brand Reveal (Section 1) — Auto-Stop at Frame 90
```
Scroll Progress: 0% → 100% of 200vh
─────────────────────────────────────
0.00 - 0.15  [Entrance] FrameSeq fades in: opacity 0→1, scale 1→1.04 (subtle)
0.05 - 0.35  [Text] Eyebrow, headline, subhead fade in + y:30→0 (stagger 0.1s)
0.35 - 0.52  [Auto-Stop] Autoplay halts at frame 90. Scroll scrub takes over.
             User scroll now controls frame advancement.
             LUMIÈRE title is visible and stays until user scrolls past.
0.52 - 1.00  [Scroll Scrub] Frame advances 90→N via user scroll only.
             "Enter the Resting Area" button appears at frame 175 (minimal fade + scale).
0.70 - 1.00  [Exit] Text fades out + y:-20, frame continues to last frame

Key mechanics:
- Auto-scroll: 6s smooth glide from frame 0 → frame 90 via Lenis scrollTo
- triggerFrame: 90 (autoplay stops, scroll activates)
- buttonFrame: 175 (CTA fades in)
- Master timeline: 2000vh total (slower frame advancement)
- Lenis duration: 2.8s (luxurious, slow scroll feel)
```

### Phase 2: First Mist Transition
```
Scroll Progress: 0% → 100% of 140vh
─────────────────────────────────────
0.00 - 0.20  [Roll In] Mist opacity 0→0.6 (restrained, not full coverage)
0.20 - 0.80  [Hold] Subtle mist, previous frame visible beneath
0.80 - 1.00  [Clear] Mist opacity 0.6→0
```

### Phase 3: Reception Panning + Content (Section 2)
```
Scroll Progress: 0% → 100% of 150vh
─────────────────────────────────────
0.00 - 0.10  [Entrance] FrameSeq fades in from mist, scale 1→1.04
0.05 - 0.30  [Text] "01 — Arrival", headline, body fade in (left-aligned)
             No containers, no backgrounds — pure text on transparent layer
0.30 - 0.70  [Hold] Content visible, frame plays
0.70 - 1.00  [Exit] Content fades out + y:-20, frame continues
```

### Phase 4: Second Mist Transition
```
Scroll Progress: 0% → 100% of 140vh
─────────────────────────────────────
[Same as Phase 2, slightly warmer golden tone]
```

### Phase 5: Moving Past + Utility Info (Section 3)
```
Scroll Progress: 0% → 100% of 150vh
─────────────────────────────────────
0.00 - 0.10  [Entrance] FrameSeq fades in from mist
0.05 - 0.30  [Text] "02 — Craft", headline, body fade in (right-aligned)
             Payment icons: minimal monochrome glyphs, no containers
0.30 - 0.70  [Hold] Content visible
0.70 - 1.00  [Exit] Content fades out, INSTANT CUT to Section 4
```

### Phase 6: Tracking Interior + Final CTA (Section 4)
```
Scroll Progress: 0% → 100% of 150vh
─────────────────────────────────────
0.00 - 0.10  [Instant] No fade, direct frame swap from Section 3
0.05 - 0.30  [Text] "03 — The Space", headline, CTA button fade in
             CTA: text-only, no border, no background, no shadow
0.30 - 0.70  [Hold] Final frame + CTA visible
0.70 - 1.00  [Exit] Content fades out
```

### Phase 7: Footer Reveal
```
Scroll Progress: Final frames complete
─────────────────────────────────────
Footer slides up from bottom (transform: translateY(100%)→0)
Duration: 80vh of scroll
Easing: power2.out
Style: Transparent background, minimal typography, no borders
```

---

## 5. Content Overlay Layout

**Design Principles**: No borders, no background boxes, no shadows. Pure typography on transparent layers. Generous whitespace. Arch-studious minimalism.

### Section 2 — Quality/Services
```
┌─────────────────────────────────────────────┐
│ 01 — Arrival                                │
│                                             │
│ A space designed                            │
│ to slow you down                            │
│                                             │
│ Step through our doors and feel             │
│ the noise of the city fall away.            │
│                                             │
│                           [Explore Chair →] │
│                           [View Menu →]     │
└─────────────────────────────────────────────┘

- No container border or background
- Text: system sans-serif, weight 300, tracking 0.05em
- Links: underline-only, no buttons, no backgrounds
- Opacity: 0.9 on text, 1.0 on hover
```

### Section 3 — Payment/Utility
```
┌─────────────────────────────────────────────┐
│                              02 — Craft     │
│                                             │
│                     Every chair,            │
│                     every detail,           │
│                     considered              │
│                                             │
│ Our stylists bring years of                 │
│ European training to every cut.             │
│                                             │
│                     [Visa] [Mastercard]     │
│                     [Apple Pay] [Cash]      │
│                     [Insurance] [Gift cards]│
└─────────────────────────────────────────────┘

- Payment icons: minimal monochrome glyphs, no color fills
- No containers, no borders around icons
```

### Section 4 — Final CTA (Frame 180 Trigger)
```
┌─────────────────────────────────────────────┐
│ 03 — The Space                              │
│                                             │
│ Built for the work                          │
│ that happens here                           │
│                                             │
│         [ Enter the Resting Area → ]        │
│         ↑ Appears at frame 180              │
│                                             │
│                           Scroll to top ↑   │
└─────────────────────────────────────────────┘

- CTA button: text-only, no border, no background, no shadow
- Hover: opacity 0.6→1, letter-spacing 0.05em→0.15em
- Appears precisely at frame 180 via `buttonFrame` prop
```

---

## 6. Navigation Arrows Design

**Style**: Ultra-minimalist glyphs. No borders, no containers, no decorative elements. Pure typographic marks.

**Treatment**:
- Unicode arrows (→, ←) or thin SVG paths (1px stroke, no fill)
- Color: `rgba(255,255,255,0.4)` → `rgba(255,255,255,1)` on hover
- Hover: opacity shift only. No scale, no glow, no background.
- Font: system sans-serif, weight 200, tracking 0.2em
- Spacing: 3rem vertical gap, 2rem from viewport edge

**Placement**:
- Fixed to right side of viewport during Section 2 and Section 3
- Vertical stack: 2 glyphs (top: "Menu", bottom: "Book")
- On hover: opacity 0.4→1, letter-spacing 0.2em→0.3em (subtle expansion)

**Implementation**:
```tsx
<nav style={{
  position: 'fixed',
  right: '2rem',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
}}>
  <a href="/menu" style={{
    color: 'rgba(255,255,255,0.4)',
    fontSize: '1.2rem',
    fontWeight: 200,
    letterSpacing: '0.2em',
    textDecoration: 'none',
    transition: 'opacity 0.4s ease, letter-spacing 0.4s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.letterSpacing = '0.3em';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.opacity = '0.4';
    e.currentTarget.style.letterSpacing = '0.2em';
  }}
  >→</a>
  <a href="/book" style={{ /* same treatment */ }}>↓</a>
</nav>
```

---

## 7. GSAP ScrollTrigger Configuration

### Global Settings
```ts
gsap.registerPlugin(ScrollTrigger);

// Refresh on route change / resize
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  anticipatePin: 1,
  invalidateOnRefresh: true,
});

// Refresh on window resize (debounced)
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
```

### FrameSequence ScrollTrigger Pattern
```ts
scrollTrigger: {
  trigger: wrapRef.current,
  start: 'top top',
  end: `+=${pinDistanceVh}vh`,
  pin: true,
  scrub: 0.5, // Smooth interpolation
  anticipatePin: 1, // Prevent layout shift
  invalidateOnRefresh: true,
  onUpdate: (self) => {
    targetIndex = self.progress * (totalFrames - 1);
  },
}
```

### MistTransition ScrollTrigger Pattern
```ts
scrollTrigger: {
  trigger: mistRef.current,
  start: 'top top',
  end: `+=${heightVh}vh`,
  pin: true,
  scrub: 0.8, // Slower, more atmospheric
  onUpdate: (self) => {
    // Map progress to mist opacity curve
    const opacity = self.progress < 0.5
      ? self.progress * 2  // 0→1
      : (1 - self.progress) * 2; // 1→0
    gsap.set(mistRef.current, { opacity });
  },
}
```

---

## 8. CSS Animation Strategies

**Design Direction**: All animations minimal. No shadows, no borders, no decorative elements. Pure motion and opacity.

### 8.1 Frame Crossfade (Instant Cut)
```css
.frame-crossfade {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.05s linear;
}
.frame-crossfade.active {
  opacity: 1;
}
```

### 8.2 Text Entrance/Exit
```css
.text-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.text-reveal.visible {
  opacity: 0.9;
  transform: translateY(0);
}
.text-reveal.exit {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.4s ease-in, transform 0.4s ease-in;
}
```

### 8.3 Mist Animation
```css
.mist-layer {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%);
  backdrop-filter: blur(8px);
  mix-blend-mode: screen;
  opacity: 0;
  pointer-events: none;
  z-index: 50;
  will-change: opacity;
}
```

### 8.4 CTA Button (Minimalist)
```css
.cta-minimal {
  display: inline-block;
  color: rgba(255,255,255,0.8);
  font-family: system-ui, sans-serif;
  font-weight: 300;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: opacity 0.4s ease, letter-spacing 0.4s ease;
}
.cta-minimal:hover {
  opacity: 1;
  letter-spacing: 0.25em;
}
```

### 8.5 Nav Glyphs (No Decoration)
```css
.nav-glyph {
  color: rgba(255,255,255,0.4);
  font-family: system-ui, sans-serif;
  font-weight: 200;
  font-size: 1.2rem;
  text-decoration: none;
  letter-spacing: 0.2em;
  transition: color 0.4s ease, letter-spacing 0.4s ease;
  line-height: 1;
}
.nav-glyph:hover {
  color: rgba(255,255,255,1);
  letter-spacing: 0.3em;
}
```

---

## 9. Performance Optimization

### 9.1 Frame Loading Strategy
- **Manifest preload**: Load `frame-manifest.json` in `_app.tsx` or layout
- **Progressive loading**: Preload next 10 frames ahead of current index
- **Memory management**: Revoke object URLs / clear src after section exits
- **WebP/AVIF**: Convert frames to modern formats for 30-50% size reduction

```ts
// Preload next N frames
const preloadFrames = (frames: string[], currentIndex: number, count = 10) => {
  for (let i = currentIndex + 1; i < Math.min(currentIndex + count, frames.length); i++) {
    const img = new Image();
    img.src = frames[i];
  }
};
```

### 9.2 RAF Loop Cleanup
```ts
useEffect(() => {
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, []);
```

### 9.3 Reduced Motion Fallback
```ts
const prefersReduced = useReducedMotion();

if (prefersReduced) {
  return (
    <section style={{ backgroundImage: `url(${poster})`, backgroundSize: 'cover' }}>
      {children}
    </section>
  );
}
```

### 9.4 Lazy Initialization
- Only initialize ScrollTrigger for sections in viewport
- Use `IntersectionObserver` to defer FrameSequence initialization
- Debounce ScrollTrigger.refresh() on resize

---

## 10. File Structure

```
projects/salon-website/
├── app/
│   ├── page.tsx                    # Main orchestrator
│   └── layout.tsx                  # Fonts, metadata
├── components/
│   ├── FrameSequence.tsx           # Scroll-based frame scrubber
│   │   ├── Auto-stop at frame 90 (triggerFrame)
│   │   └── CTA reveal at frame 180 (buttonFrame)
│   ├── MistTransition.tsx          # Atmospheric fog overlay
│   ├── LenisProvider.tsx           # Smooth scroll wrapper
│   ├── SalonFooter.tsx             # Footer component
│   ├── NavArrows.tsx               # Fixed navigation arrows (glyph-only)
│   └── shared/
│       └── useReducedMotion.ts     # Accessibility hook
├── lib/
│   └── frame-manifest.json         # Frame paths by folder
├── public/
│   ├── frames/
│   │   ├── Entering_hair_salon_reception_space_202608100125_frames/
│   │   ├── Camera_panning_salon_reception_l…_202608100125_frames/
│   │   ├── Camera_moving_past_hair_salon_202608100125_frames/
│   │   └── Camera_tracking_hair_salon_interior_202608100125_frames/
│   └── videos/                     # (optional fallback)
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 11. Key Implementation Notes

### 11.1 Scroll Direction
- User scrolls **down** → content progresses forward
- No scroll-jacking; Lenis provides smooth but native-feeling scroll
- Pin + scrub gives "video playback" feel without blocking scroll

### 11.2 Frame Counts
- Entering: 192 frames @ 30fps = 6.4s of footage
- Panning: 240 frames @ 30fps = 8s of footage
- Moving past: 240 frames @ 30fps = 8s of footage
- Tracking: 240 frames @ 30fps = 8s of footage

### 11.3 Auto-Stop & Button Trigger Logic
- **Auto-stop frame**: 90 (configurable via `triggerFrame` prop)
  - Sequence plays autonomously from frame 0
  - At frame 90, RAF loop continues but `targetIndex` is now driven by scroll progress
  - Visual cue: subtle scale pulse (1→1.04) signals transition to scroll control
- **CTA button frame**: 180 (configurable via `buttonFrame` prop)
  - "Enter the Resting Area" fades in at exactly frame 180
  - Animation: opacity 0→1, scale 0.95→1, duration 0.8s, ease: power2.out
  - Style: text-only, no border, no background, no shadow
- **Fallback**: If total frames < 180, CTA appears at 70% progress

### 11.4 Minimalist Style Rules
- **Icons**: Unicode glyphs or 1px SVG paths. No containers, no borders, no fills.
- **Buttons**: Text-only. No background, no border, no shadow. Hover: opacity + letter-spacing.
- **Typography**: System sans-serif, weight 200–300, tracking 0.05–0.2em.
- **Colors**: White text `rgba(255,255,255,0.6)` → `rgba(255,255,255,1)` on hover.
- **Motion**: scale max 1.04, translateY max 30px, duration 0.4–0.8s, ease: power2.out.
- **Spacing**: Generous whitespace. No crowded layouts.

### 11.5 Responsive Behavior
- Mobile: Reduce pin distance to 100vh, reduce frame resolution
- Tablet: Pin distance 120vh, full resolution
- Desktop: Pin distance 150vh, full resolution
- All devices: maintain minimalist treatment (no borders, no shadows)

### 11.6 Accessibility
- `prefers-reduced-motion`: Show static poster images, disable ScrollTrigger scrub
- Keyboard navigation: Ensure CTA buttons are focusable (visible focus ring: 1px solid white)
- Screen reader: Overlay text is in DOM, images have `aria-hidden="true"`
- Icons: Add `aria-label` to navigation glyphs

### 11.7 Browser Support
- GSAP ScrollTrigger: Chrome, Firefox, Safari, Edge (all modern)
- Lenis: Chrome, Firefox, Safari, Edge
- `backdrop-filter`: Safari 9+, Chrome 76+, Firefox 103+ (with fallback)

---

## 12. Next Steps

1. **Implement FrameSequence auto-stop mechanism** — autoplay to frame 90, then yield to scroll scrub
2. **Add CTA button trigger at frame 180** — minimal text-only button, no border/background/shadow
3. **Strip all decorative elements** — remove borders, shadows, containers from icons, buttons, nav
4. **Implement MistTransition** with restrained opacity (0→0.6) and minimal blur
5. **Add NavArrows component** with glyph-only style, no containers
6. **Optimize frame loading** with preloading and memory management
7. **Add reduced-motion fallbacks** for all animated sections
8. **Test on mobile** (iOS Safari, Chrome Android) for touch scroll performance
9. **Convert frames to WebP** for 30-50% size reduction
10. **Add loading states** with skeleton screens while frames load
11. **Implement footer reveal** with scroll-driven slide-up animation
12. **Verify arch-studious minimalism** — no borders, no shadows, pure typography

---

## 13. Reference URLs
- Smash Guys: scroll-based frame scrubber implementation
- https://sixb-dentaire.fr/ — minimal medical aesthetic
- https://lusion.co/ — immersive scroll narrative
- https://www.awwwards.com/ — award-winning scroll experiences
