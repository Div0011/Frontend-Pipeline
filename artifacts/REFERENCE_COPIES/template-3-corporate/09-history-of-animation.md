# Pattern Analysis: Locomotive (locomotive.ca) — Creative Agency

## Genre: Marketing / Creative Agency — Genre 1

## Core Architecture
- **Stack:** Craft CMS + Twig templating + custom JS
- **Scroll:** Custom built (pre-dates Lenis), but pioneered the smooth-scroll pattern
- **Preloader:** Typography-write animation with logo scale-in

## Key Mechanical Patterns

### 1. Preloader as Brand Statement
- Black preloader with logo animation (scale 0.9 → 1, opacity fade)
- `preloaderEnterPromise` pattern: minimum 1.2s display, resolves when assets loaded
- Preloader shows different text on subsequent navigations (quickpreload)

### 2. Header Theme Switching
- `data-theme` attribute on `<html>` changes on scroll (dark → primary red → secondary blue → lisa white)
- Each theme defines `--color` and `--color-bg` CSS custom properties
- Transition: `background-color .3s cubic-bezier(0.215, 0.61, 0.355, 1)`
- Logo, menu, CTA all re-color automatically via CSS variables

### 3. Project Grid With Hover States
- Grid items with `data-hover-shuffle` text effect
- Hover triggers character shuffle animation on link text
- Aspect-ratio varied grid (not uniform) for visual rhythm

### 4. Work Showcase
- Full-viewport work entries with scroll-driven reveals
- Each project entry: full-bleed image/video + title + category + year
- Categories filterable via URL parameter

## Why It Works
- Preloader feels like brand immersion, not a loading screen
- Theme switching makes each section feel distinct without layout changes
- `data-hover-shuffle` adds playful micro-interaction without being distracting

## Extraction For Template 4
- CSS custom property theme system (light/dark/accent)
- Smooth theme transitions on scroll section boundaries
- Hover-shuffle text effect on navigation/links
- Preloader with brand-first animation
- Aspect-ratio varied project grid
</content>

