# Lusion (lusion.co) — Reference Site Analysis

> **Source:** Raw HTML extracted from lusion.co homepage, about page, and projects page.
> **Relevance:** Template 2 (SaaS Product Launch) — Real-time 3D object scroll integration

---

## Architecture

- **Framework:** Astro (detected from `_astro/` build output with hashed CSS/JS files)
- **Preloader:** Full-screen black loader with 3-digit percentage counter (`#preloader-percent-digits`)
  - Each digit has its own container with `.preloader-percent-digit-num` elements cycled via CSS transforms
- **Scroll Navigation:** Custom scroll-nav with 5 cross-lines (`#scroll-nav-cross-line` with `.scroll-nav-cross`)
- **Scroll Indicator:** Vertical progress bar (`#scroll-indicator-bar`)
- **Video Overlay:** Vimeo integration with custom controls (play/pause, progress bar, mute)

## Key Patterns

### 1. 3-Digit Percentage Preloader
```html
<div id="preloader-percent-digits">
  <div class="preloader-percent-digit">
    <div class="preloader-percent-digit-num">0</div>
    <div class="preloader-percent-digit-num">0</div>
  <div class="preloader-percent-digit">
    <div class="preloader-percent-digit-num">0</div>
    <div class="preloader-percent-digit-num">0</div>
  <div class="preloader-percent-digit">
    <div class="preloader-percent-digit-num">0</div>
    <div class="preloader-percent-digit-num">0</div>
</div>
```

### 2. Video Overlay with Custom Controls
- Full-screen Vimeo embed
- Custom play/pause, mute buttons
- Progress bar with active/bg tracks
- Custom cursor with expand/contract state
- Mobile close button (SVG X icon)
- Input blocker during overlay

### 3. Layout Patterns
- Background SVG `#bg-noise.svg` for texture
- SVG arrow icons for navigation (right-pointing arrow path)
- Full-viewport sections with sticky scroll
- Client logo grid (14 brand logos as inline SVGs)
- Project cards with arrow hover interaction

### 4. Brand Assets (from about page)
- Logo: Text-based with arrow icon
- Typography: Display font with expressive letter-spacing
- Color: Dark background with white text, accent via project content

### 5. Project Page Structure
- Filtered project grid
- Client logo grid integrating brand partnerships
- Each project has a dedicated page under `/projects/`

## Cross-Template Patterns

| Pattern | Shared With | Implementation |
|---------|------------|---------------|
| Digit-cycle preloader | Lusion, Resn | CSS transform on .preloader-percent-digit-num |
| Video overlay | Lusion, Imagina Studio | Full-screen + custom controls |
| Custom cursor | Lusion, Resn, Active Theory | Canvas-based cursor rendering |
| Scroll navigation | Lusion, History of Animation | Section indicator + progress bar |

## Lusion-Specific Patterns for Template 2

1. **Single 3D centerpiece** on homepage (the 3D object IS the hero, not decoration)
2. **Video overlay** with custom controls for case studies
3. **Client logo grid** as trust signal section
4. **Section-based scroll navigation** with 5 cross markers
5. **Minimal text overlay** on 3D — let the object speak
