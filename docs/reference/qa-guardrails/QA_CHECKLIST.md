# QA Guardrails & Pre-Deployment Checklist

> Automated quality checks for the Frontend Pipeline. Run before every production build.

---

## 1. Genericness Check 🔴

Flag these patterns as rework triggers (not just code-review notes):

| Pattern | Why It's Generic | Fix |
|---------|-----------------|-----|
| Centered hero with gradient blob | `bg-gradient-to-r` + centered `<h1>` with no media background | Replace with video/3D frame/canvas sequence background |
| Rounded cards with white background | `rounded-2xl bg-white shadow-lg` on dark templates | Use template-specific card styles (glassmorphism, border-only, editorial shadow) |
| Unsplash placeholder images | External CDN images in production | All images must be self-hosted WebP |
| Empty hover states | Buttons/links with no interactive feedback | Define hover/active for every interactive element |
| No prefers-reduced-motion | Missing animation fallbacks | Add `@media (prefers-reduced-motion: reduce)` for every animated section |
| Purple gradient hero | Overused generic "cinematic" trope | Use template-specific accent colors |
| `rotate-45` decorative elements | Arbitrary rotated elements add noise | Every element must serve content/purpose |

**Script command:**
```bash
grep -rn "bg-gradient-to-r\|rounded-2xl\|unsplash\|rotate-45" src/ --include="*.tsx" --include="*.css"
```

---

## 2. Scroll-Reversibility Check 🌀

**Test:** Scroll backward at any point. Does the animation reverse smoothly?

| Pattern | Reversible? | Implementation |
|---------|------------|---------------|
| `scrub: 1.0` | ✅ Yes | GSAP handles reverse |
| `scrub: 1.5` with `ease: "none"` | ✅ Yes | Linear mapping ensures smooth reversal |
| `trigger` with `once: true` | ❌ No | One-directional only |
| `useFrame` lerp (R3F) | ✅ Yes | Lerp handles both directions |
| Canvas frame sequence | ✅ Yes | `Math.floor(progress * totalFrames)` works both ways |
| gsap.timeline with play() | ❌ No | Replace with ScrollTrigger scrub |

**Detection command:**
```bash
grep -rn "\.play\|\.reverse\|\.progress" src/ --include="*.tsx" --include="*.js"
```

---

## 3. Mobile Performance Check 📱

| Check | Target | How to Verify |
|-------|--------|--------------|
| 60fps on desktop | ✅ Pass | DevTools Performance tab |
| 30+ fps on mid-range mobile | ✅ Pass | Chrome DevTools throttling (6x CPU slowdown) |
| No layout thrashing | ✅ Pass | No forced reflows in animation loop |
| Total bundle < 500KB JS | ✅ Pass | `next build` output |
| No unoptimized images | ✅ Pass | All images WebP, lazy-loaded |
| 3D Scene mobile fallback | ✅ Check | 3D hidden or static poster frame |
| Frame count reduced on mobile | ✅ Check | `totalFrames * 0.5` for frame sequences |

**Mobile detection code:**
```tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const totalFrames = isMobile ? FULL_FRAMES * 0.5 : FULL_FRAMES; // Subsample on mobile
```

---

## 4. Accessibility Checks ♿

| Check | Standard | Implementation |
|-------|---------|---------------|
| prefers-reduced-motion | WCAG 2.1 | `@media (prefers-reduced-motion: reduce)` blocks |
| prefers-reduced-transparency | WCAG 2.1 | Fall back to solid backgrounds |
| Keyboard navigation | WCAG 2.1 | All interactive elements reachable via Tab |
| Focus indicators | WCAG 2.1 | Visible `:focus-visible` outlines |
| Video autoplay | WCAG 2.1 | No autoplay with sound; `prefers-reduced-motion` blocks autoplay video |
| Touch targets | WCAG 2.1 | Minimum 44x44px for interactive elements |

**Reduced motion CSS template:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .reveal-target { opacity: 1; transform: none !important; }
  video[autoplay] { display: none; }
  .three-scene { display: none; }
  .three-fallback { display: block; }
  .parallax-layer { transform: none !important; }
}
```

---

## 5. Build Verification Checklist

- [ ] `npx tsc --noEmit` — no TypeScript errors
- [ ] `npm run build` — successful production build
- [ ] All images self-hosted (grep for `unsplash`, `placeholder.com`)
- [ ] All 3D scenes have mobile fallbacks
- [ ] All animated sections have `prefers-reduced-motion` fallback
- [ ] Scroll-reversibility verified (scroll backward test)
- [ ] No `gsap.to()` calls on camera/R3F objects inside `onUpdate`
- [ ] `OrbitControls.enableRotate = false` during scroll sections
- [ ] `sectionRef.current` null-guarded (`const el = sectionRef.current; if (!el) return;`)

---

## 6. Console Warning Check

Before final build, check for:
```bash
grep -rn "console.warn\|console.error\|Warning:" .next/build-manifest.json 2>/dev/null || echo "No warnings"
```

Common warnings to address:
- "React does not recognize the X prop on a DOM element" → destructure props
- "findDOMNode is deprecated" → use `ref` callbacks
- "Can't perform a React state update on an unmounted component" → cleanup effects
- Images missing `width`/`height` → add dimensions
