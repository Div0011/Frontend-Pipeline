# Cross-Template Patterns (All 15 Reference Sites)

> Universal design and motion patterns extracted from 15 premium reference sites across 5 industries.

---

## 1. Split-Text Animation Pattern

**Source:** Kieran Clarke, Imaginastudio, Minh Pham, Obys Agency

```tsx
// The universal line-split reveal pattern
<div className="overflow-hidden">           {/* .ln_ container — clips the overflow */}
  <div ref={lineRef} className="translate-y-full">
    {/* .ln element — starts below, slides up */}
    Animated Content
  </div>
```

**Implementation:**
- Container: `overflow-hidden` + `will-change: contents`
- Inner element: `transform: translateY(102%)` → `translateY(0)` via GSAP
- Letter-level splitting: `<span>` per character with staggered `opacity + y` animation

**Escape hatch (prefers-reduced-motion):**
```css
@media (prefers-reduced-motion: reduce) {
  .ln_, .ln { overflow: visible; transform: none !important; opacity: 1 !important; }
}
```

---

## 2. Numbered Editorial Section Pattern

**Source:** Imaginastudio (01-07), Kieran Clarke (01-05), Invisible Moscow (01-06), History of Animation

**Markup:**
```html
<section className="chapter" data-chapter="01">
  <span className="chapter-number">01</span>
  <span className="chapter-label">Films & Storytelling</span>
</section>
```

**Why it works:** Creates instant documentary/journalistic credibility. The numbering implies curation and editorial rigor.

**JS Implementation:**
```css
.chapter-number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--accent);
}
```

---

## 3. Three-Viewport Work Grid Pattern

**Source:** Obys Agency (ho-wo-0/1/2)

| Mode | Layout | Scroll Direction | Use Case |
|------|--------|-----------------|----------|
| Vertical Strip | Left-aligned single column | Vertical | Mobile default |
| Horizontal Strip | Side-scrolling row with offset margins | Horizontal | Desktop browsing |
| Grid | CSS Grid with explicit row/column placement | Vertical | Gallery view |

**Toggle Implementation:**
```tsx
const [viewMode, setViewMode] = useState<'vertical' | 'horizontal' | 'grid'>('grid');
// Switch className on grid container
<div className={cn(
  viewMode === 'grid' && 'grid grid-cols-3',
  viewMode === 'vertical' && 'flex flex-col',
  viewMode === 'horizontal' && 'flex overflow-x-auto'
)}>
```

---

## 4. Preloader Pattern

**Source:** Obys (progress bar), Locomotive (word-by-word reveal), Resn (SVG drop), Lusion (digit cycling)

| Type | Example | When to Use |
|------|---------|------------|
| Progress Bar | Black screen, white bar fills | Asset-heavy (videos, 3D) |
| Word-by-word | "Digital" → "Digital-First" → "Digital-First Agency" | Brand narrative building |
| Digit Counter | `00` → `99` cycling digits | Tech/studio feel |
| Concentric Zoom | Layered circles expanding | Pop/playful brands |

**Universal structure:**
```tsx
// Preloader manages its own progress state
const [progress, setProgress] = useState(0);
useEffect(() => {
  const updateProgress = (pct: number) => setProgress(Math.min(pct, 100));
  // Subscribe to loading events
  return () => unsubscribe();
}, []);
// Auto-dismiss when progress === 100
useEffect(() => {
  if (progress >= 100) {
    gsap.to(preloaderRef.current, { opacity: 0, duration: 0.6, delay: 0.3 });
  }
}, [progress]);
```

---

## 5. Scroll-Narrative Patterns

| Pattern | Use Case | Implementation | Scroll-Reversibility |
|---------|----------|---------------|---------------------|
| **GSAP ScrollTrigger scrub** | Progress-driven animation (morph, 3D rotate, frame sequence) | `scrub: 1.2`, `ease: "none"` | ✅ Fully reversible |
| **ScrollTrigger trigger (once)** | One-shot reveals (fade-in, counters) | `start: "top 82%", once: true` | ❌ One-way |
| **Pin + Scrub** | Sticky sections with visual change | `pin: true, scrub: 1, end: "+=250%"` | ✅ Reversible |
| **Lenis smooth scroll** | All scroll-driven sites | `duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` | ✅ Default |

**Golden Rule for 3D scroll:**
If a visual state changes as the user scrolls (3D explode, video morph, frame sequence), ALWAYS use `scrub` — never gsap timers or external progress setters. Set `camera.position` directly in `useFrame` rather than `gsap.to()` within `onUpdate`.

---

## 6. 3D Integration Patterns

| Method | Tool | Template Use | Production Readiness |
|--------|------|-------------|---------------------|
| **R3F + useFrame lerp** | `@react-three/fiber` | T2 (abstract 3D), T5 (product explode) | ✅ Production |
| **Spline embed** | `@splinetool/react-spline` | Vertigo-style hero 3D | ✅ Production |
| **Canvas frame sequence** | HTML5 `<canvas>` + Image[] | T5 (frame-disassembly) | ✅ Production |
| **Three.js custom** | Bundled THREE global | The Year of Greta | ⚠️ Complex |
| **Post-processing** | `@react-three/postprocessing` | Bloom, CA, vignette | ✅ Production |

**R3F Best Practices (from built templates):**
```tsx
// ✅ DO: Set camera.position directly in useFrame
useFrame((state, delta) => {
  const t = Math.min(1, Math.max(0, scrollProgress));
  camera.position.lerp(targetPositions[currentSection], 0.05);
  camera.lookAt(0, 0, 0);
});

// ❌ DON'T: Use gsap.to() on camera inside onUpdate
// ❌ DON'T: Let OrbitControls enableRotate during scroll sections
```

---

## 7. Theme / Color System Pattern

**Source:** Locomotive (data-theme attribute)

```tsx
// CSS custom properties per theme
[data-theme="dark"] {
  --color: #f5f5fc;
  --color-bg: #080711;
  --accent: #6c5ce7;
}
[data-theme="light"] {
  --color: #080711;
  --color-bg: #faf9f4;
  --accent: #e0a96d;
}

// React implementation
const [theme, setTheme] = useState<'dark' | 'light'>('dark');
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
// Sections call setTheme() via IntersectionObserver
```

---

## 8. Hover-Shuffle Text Effect

**Source:** Locomotive, Kieran Clarke

```tsx
// Character scramble on hover
const shuffleText = (el: HTMLElement) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const original = el.dataset.original || el.textContent || '';
  el.dataset.original = original;
  let iterations = 0;
  const interval = setInterval(() => {
    el.textContent = original
      .split('')
      .map((char, i) => i < iterations ? char : chars[Math.floor(Math.random() * 26)])
      .join('');
    iterations += 1/3;
    if (iterations >= original.length) {
      clearInterval(interval);
      el.textContent = original;
    }
  }, 30);
};
```

---

## 9. Full-Screen Media Morph Pattern

**Source:** Imaginastudio, Minh Pham

```tsx
// Clip-path morph from grid thumbnail to fullscreen
onClick={() => {
  gsap.to(overlayRef.current, {
    clipPath: 'circle(100%)',
    duration: 1.2,
    ease: 'power4.inOut'
  });
  // Load video inside the morph
}}
// Initial state
overlay: { clipPath: 'circle(0%)' }
// Expanded state
overlay: { clipPath: 'circle(100%)' }
```

---

## 10. Custom Cursor Pattern

**Source:** Resn, Active Theory (all agency templates)

```css
@media (pointer: fine) {
  *, *:hover, *:active, a, button { cursor: none !important; }
}
```

**Color auto-inversion logic:**
```tsx
const isDark = !!el.closest('[data-theme="dark"], .bg-dark, canvas');
const cursorColor = isDark ? '#d4ff00' : '#141413';
```

---

## 11. Mobile Adaptation Patterns

| Element | Desktop | Mobile |
|---------|---------|--------|
| 3D Scene | Full viewport, interactive | Hidden (0x0 canvas) or static poster |
| Work Grid | 3-column grid | Single vertical column |
| Split text | Character-level | Word-level (reduce DOM nodes) |
| Horizontal scroll | Scroll horizontally | Swipe or tap navigation |
| Frame sequences | 300 frames, 60fps | 150 frames, 30fps subsampled |
| Navigation | Inline links | Full-screen overlay menu |
