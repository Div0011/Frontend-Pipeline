# Motion Token Library

> Universal motion values extracted from 15 reference sites and 5 built template projects.

---

## Duration Tokens

| Token | Value | Context | Template Usage |
|-------|-------|---------|---------------|
| `reveal-duration` | 1.2s | Standard scroll-reveal animation | All templates |
| `scrub-duration` | 1.0–1.2s | Lenis + GSAP scrub tie | T2, T5 (3D scroll) |
| `fast-reveal` | 0.6s | Quick entry (nav links, small elements) | All templates |
| `hero-reveal` | 1.8s | Hero section entry sequence | T1 (hero text) |
| `preloader-min` | 1.2s | Minimum preloader display time | T4 (Locomotive-style) |
| `morph-transition` | 1.2s | Clip-path morph overlay | T1 (project transitions) |
| `frame-scrub` | 0.5s | Canvas frame sequence scrub friction | T5 (disassembly) |

## Easing Tokens

| Token | Value | When to Use |
|-------|-------|------------|
| `reveal-ease` | `power3.out` | Standard entry animations |
| `scrub-ease` | `none` | Progress-driven scroll (linear mapping) |
| `morph-ease` | `power4.inOut` | Clip-path morph transitions |
| `spring-stiff` | `stiffness: 400, damping: 10` | Elastic bounces on release |
| `spring-soft` | `stiffness: 200, damping: 20` | Gentle physics interactions |
| `expo-ease` | `expo.out` | High-impact hero reveals |
| `lerp-factor` | `0.05` | useFrame camera smoothing factor |

## Stagger Tokens

| Token | Value | Application |
|-------|-------|------------|
| `char-stagger` | 0.025s | Character-level animations |
| `word-stagger` | 0.08s | Word-level animations |
| `grid-stagger` | 0.1s | Grid item reveals |
| `section-stagger` | 0.15s | Multi-section entry sequences |
| `block-stagger` | `(index / total) * 0.25` | 3D block explode/assemble delays |

## Spatial Tokens

| Token | Value | Context |
|-------|-------|---------|
| `reveal-y` | 30px (clamp: 14%) | Standard slide-up distance |
| `perspective-rotate` | 12° | Card hover effect (rotateX/Y) |
| `blur-amount` | 10px | Blur-in reveal for hero text |
| `scale-morph` | `circle(0%) → circle(100%)` | Clip-path morph range |

## 3D Tokens

| Token | Value | Context |
|-------|-------|---------|
| `camera-lerp` | 0.05 | Smooth camera position interpolation |
| `orbit-speed` | 0.5 | Slow idle rotation (rad/s) |
| `explode-distance` | 3.0 | Component explosion distance (units) |
| `camera-z-base` | 5.0 | Default camera Z position |
| `camera-z-zoom` | 2.0 | Close-up camera Z position |

## Performance Tokens

| Token | Value | Context |
|-------|-------|---------|
| `frame-total` | 300 | Max frames for canvas sequence |
| `frame-quality` | 80 | WebP compression quality |
| `preload-batch` | 30–60 | Initial frames to eager-load |
| `mobile-breakpoint` | 768px | Responsive trigger |
| `fps-target` | 60 | Performance target (mid-range) |
| `mobile-fps-target` | 30 | Reduced frame rate on mobile |

## prefers-reduced-motion Fallbacks

```css
@media (prefers-reduced-motion: reduce) {
  /* Skip all GSAP animations — set to final state immediately */
  .reveal-target { opacity: 1; transform: none; }
  /* Disable video autoplay */
  video[autoplay] { display: none; }
  /* Show static poster instead */
  .video-poster { display: block; }
  /* Disable parallax */
  .parallax-layer { transform: none !important; }
  /* Disable 3D scene */
  .three-scene { display: none; }
  /* Show static fallback */
  .three-fallback { display: block; }
}
```

## CSS Custom Properties (globals.css pattern)

```css
:root {
  --reveal-duration: 1.2s;
  --reveal-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --scrub-duration: 1.0s;
  --char-stagger: 25ms;
  --grid-stagger: 100ms;
  --mobile-breakpoint: 768px;
}
```

## Usage In Components

```tsx
// lib/motion.ts
export const tokens = {
  reveal: { duration: 1.2, ease: 'power3.out', y: 30 },
  scrub: { duration: 1.0, ease: 'none' },
  morph: { duration: 1.2, ease: 'power4.inOut' },
  stagger: {
    char: 0.025,
    word: 0.08,
    grid: 0.1,
  },
} as const;
