# Cinematic Scroll Effects & Interactive UI Ideas

A living reference of scroll-based effects, micro-interactions, and high-end UI patterns researched from jomor.design, fullPage.js, Slider Revolution, and award-winning agency sites.

---

## 1. Scroll-Driven Animation Patterns

### A. Parallax Depth Layers
- **Concept**: Multiple layers move at different speeds on scroll to create depth illusion.
- **Implementation**: GSAP `scrub` tied to `ScrollTrigger` with different `y` velocities per layer.
- **Use case**: Hero background emoji, floating shapes, section dividers.
- **File**: `components/ParallaxSection.tsx`

### B. Scroll Sequence / Frame Change
- **Concept**: Content morphs or replaces frame-by-frame as user scrolls (like flipbook).
- **Implementation**: Canvas/WebGL frame scrubbing or CSS `clip-path` + `transform` keyframes tied to scroll progress.
- **Use case**: Product showcases, hero text metamorphosis, before/after reveals.
- **Reference**: Medium — "The Cinematic Magic of Scroll Sequence Animation"

### C. Sticky Stack / Cover Transitions
- **Concept**: Sections stack or cover each other with 3D transforms during scroll.
- **CSS**: `position: sticky`, `transform: scale() rotateX() translateZ()`
- **JS**: fullPage.js stack, cover, cube, vortex, carousel3d effects.
- **Use case**: Full-page storytelling, product launches.

### D. Text Reveal on Scroll
- **Concept**: Letters or words animate in as they enter viewport.
- **Implementation**: Split text into chars/words, stagger `y`, `opacity`, `rotateX` with `ScrollTrigger`.
- **Reference**: jomor.design nav letter-split animation.

### E. Horizontal Scroll Snap
- **Concept**: Vertical scroll drives horizontal carousel.
- **Implementation**: `scroll-snap-type: x mandatory` + GSAP horizontal proxy.
- **Use case**: Menu cards, portfolio galleries, feature showcases.
- **Reference**: Tokenology, CURATR PARIS horizontal scroll.

---

## 2. Micro-Interactions

### A. Custom Cursor
- **Concept**: Branded cursor replaces default pointer; morphs on hover over interactive elements.
- **Implementation**: Fixed `div` following `mousemove` with `mix-blend-mode: difference` or brand color.
- **State changes**: Small dot → large circle on hover; magnetic snap to buttons.
- **File**: `components/CustomCursor.tsx`
- **Reference**: jomor.design, Magnetism, Dala, Pest Stop Boys

### B. Hover Stickers / Pop-Out Badges
- **Concept**: Decorative sticker appears adjacent to hovered item.
- **Implementation**: Absolute positioned element with `group-hover` opacity/transform.
- **Use case**: Menu items with food emoji stickers, product badges.
- **File**: `components/MenuSticker.tsx`

### C. Magnetic Buttons
- **Concept**: Button subtly moves toward cursor before click.
- **Implementation**: `mousemove` maps to `translate()` with lerp/easing.
- **Reference**: jomor.design interactive CSS rotation micro-interactions.

### D. Cursor Blend Modes
- **Concept**: Cursor color inverts or blends with background.
- **Implementation**: `mix-blend-mode: difference`, `exclusion`, or `multiply`.
- **Use case**: Dark/light section transitions.

---

## 3. Cinematic Section Design

### A. Marquee Ticker Strips
- **Concept**: Infinite scrolling text band with brand keywords.
- **Implementation**: Duplicated content + CSS `@keyframes marquee` or GSAP `to` with `repeat: -1`.
- **File**: `components/Hero.tsx` bottom marquee.

### B. Scroll Progress Indicator
- **Concept**: Thin progress bar at top showing page scroll position.
- **Implementation**: Fixed div with width bound to `scrollTop / (scrollHeight - clientHeight)`.
- **File**: `components/ScrollProgress.tsx`

### C. Grain / Noise Texture Overlay
- **Concept**: Subtle film grain adds analog warmth.
- **Implementation**: SVG `feTurbulence` filter as base64 data URI in `::before` pseudo-element.
- **File**: `app/globals.css` `.texture-grain`

### D. Checkerboard / Pattern Accents
- **Concept**: Retro diner-style two-tone checkerboard or diagonal stripes.
- **Implementation**: CSS `linear-gradient` background patterns.
- **File**: `app/globals.css` `.checkerboard`

### E. Kinetic Typography
- **Concept**: Large display type with mixed weights and script accents.
- **Fonts**: Condensed bold display (Oswald) + handwritten script (Caveat) + clean body (Inter).
- **Use case**: Hero headlines, section titles, menu category headers.

---

## 4. Advanced Techniques (Future Implementation)

### A. WebGL Distortion Transitions
- **Concept**: Sections blend with RGB split, pixel sorting, or liquid distortion.
- **Tech**: Three.js + custom shaders, fullPage.js cinematic effects.
- **Use case**: Hero to menu transition, image galleries.

### B. Locomotive Scroll + ScrollTrigger Bridge
- **Concept**: Virtual scroll container with inertia, proxied to GSAP.
- **Implementation**: `lenis` or `locomotive-scroll` + `scrollerProxy`.
- **Benefit**: Smooth inertia + precise scroll-triggered animations.
- **Note**: Current project uses LenisProvider but not proxied to ScrollTrigger yet.

### C. Video Background Scrub
- **Concept**: Video playback tied to scroll position.
- **Implementation**: `<video>` element with `currentTime` bound to scroll progress.
- **Use case**: Hero background, product demos.

### D. Scroll-Based Color Shift
- **Concept**: Background/theme transitions as user scrolls through sections.
- **Implementation**: CSS variables updated via ScrollTrigger or `animation-timeline`.
- **Use case**: Dark → light → brand color transitions.

### E. Image Parallax Gallery
- **Concept**: Images in a grid move at different parallax speeds.
- **Implementation**: Staggered `data-speed` attributes + `y` transforms on scroll.
- **Use case**: Location photos, food gallery, chef stories.

---

## 5. Food Website Specific Ideas

### A. Floating Ingredient Particles
- **Concept**: Small ingredient icons (lettuce, tomato, cheese) float upward in hero.
- **Implementation**: CSS keyframes with random delays or JS particle system.
- **Use case**: Hero background, menu section accents.

### B. Interactive Menu Cards with Image Reveal
- **Concept**: Hovering over menu item reveals a circular food photo behind/around the text.
- **Implementation**: `::before` pseudo-element with `background-image` + `scale` on hover.
- **Note**: Current `MenuSticker` uses emoji; upgrade to real photos via AI generation.

### C. Nutrition / Allergen Badge System
- **Concept**: Color-coded badges (SPICY, NUTS, EGG, CHEF) with custom icons.
- **Implementation**: Inline SVG icons + pill-shaped badges.
- **File**: `components/Badge.tsx`

### D. Order Flow Animation
- **Concept**: Cart icon bounces, checkmark animates, confetti on order.
- **Implementation**: Framer Motion or GSAP timeline on button click.
- **Use case**: "Order Now" CTA feedback.

---

## 6. Performance & Accessibility

- Always respect `prefers-reduced-motion`.
- Use `transform` and `opacity` only for 60fps animations.
- Keep custom cursor hidden on touch devices (`@media (pointer: coarse)`).
- Lazy-load images and non-critical animations.
- Debounce scroll handlers; use `{ passive: true }`.

---

## 7. Reference Sites & Repos

| Site / Repo | Techniques |
|-------------|-----------|
| jomor.design | Letter-split nav, parallax video cursor, Locomotive Scroll proxy, micro-interactions |
| fullPage.js scroll-effects | 80+ CSS + cinematic scroll transitions |
| RefreshoCreative | Video-to-scroll technology, scrollytelling |
| Cinematic-UI (GitHub) | Parallax scenes, animated chapter cards, choice-based scroll |
| Slider Revolution cursor guide | Animated cursor, magnetism, blend modes |
| wpdean.com/css-scroll-effects | CSS `animation-timeline`, scroll snap, parallax backgrounds |

---

## 8. Implementation Status in SmashGuys v3

| Feature | Status |
|---------|--------|
| Custom cursor | ✅ Implemented (`CustomCursor.tsx`) |
| Scroll progress bar | ✅ Implemented (`ScrollProgress.tsx`) |
| Parallax sections | ✅ Implemented (`ParallaxSection.tsx`) |
| Hero scroll scrub | ✅ Title fades/scales on scroll |
| Marquee ticker | ✅ Infinite scrolling brand keywords |
| Hover stickers | ✅ Emoji-based stickers on menu items |
| Badge system | ✅ SVG icons for CHEF, SPICY, NUTS, EGG, MUST |
| Lenis smooth scroll | ✅ Integrated via `LenisProvider` |
| GSAP ScrollTrigger | ✅ Reveal + parallax animations |
| Horizontal showcase | ✅ Snap-scroll featured cards |
| Grain texture | ✅ SVG noise overlay |
| Checkerboard | ✅ CSS pattern accents |

---

*Last updated: 2026-07-13*
