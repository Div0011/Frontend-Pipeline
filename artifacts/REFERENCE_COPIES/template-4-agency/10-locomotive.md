# Pattern Analysis: Locomotive (locomotive.ca) — Creative Agency

## Genre: Marketing / Creative Agency — Genre 4

## Core Architecture
- **Stack:** Craft CMS (PHP) + Twig templating + GSAP + custom scroll system
- **Own Lenis:** They created the Lenis smooth scroll library (originally `@studio-freight/lenis`)
- **Approach:** Brand-forward with agency-level restraint

## Key Mechanical Patterns (From HTML Analysis)

### 1. Preloader with Typography Animation
- Black full-screen preloader
- Animated text building itself word by word:
  - "Digital" → "Digital-First" → "Digital-First Design" → "Digital-First Agency"
  - "Based" → "Based in" → "Based in Montreal" → "Based in Montreal, Canada"
- Each word line is on a separate `<div>`, revealed sequentially
- `window.preloaderPromise` with `setTimeout(resolve, 1200)` ensures minimum 1.2s display
- Logo scale animation: `scale(0.9)` → `scale(1)` with `cubic-bezier(0.215, 0.61, 0.355, 1)`

### 2. Theme System
- `data-theme` attribute on `<html>`: `default`, `dark`, `primary`, `secondary`
- Each theme swaps `--color` and `--color-bg` CSS custom properties
- Smooth transition: `transition: background-color .3s cubic-bezier(0.215, 0.61, 0.355, 1)`
- Different sections have different theme states

### 3. Scroll Architecture
- `html.has-scroll-smooth` class: `overflow: hidden; position: fixed; top:0; left:0; right:0; bottom:0`
- Container-based scroll system (not body scroll)
- Lenis 1.x pattern: fixed html, transformed wrapper

### 4. Header Pattern
- Logo + nav links + CTA button
- "Let's talk" CTA with `data-hover-shuffle` (character scramble on hover)
- Menu items: Work, Agency, Careers, Store (external)
- Mobile: hamburger toggler with open/close label attributes

### 5. Viewport Scaling Strategy
- `font-size` on `:root` changes at breakpoints:
  - 1600-1999px: 17px
  - 2000-2399px: 19px
  - 2400px+: 21px
  - This means `rem` values scale with viewport automatically

## Why It Works
- Preloader text builds brand narrative before content loads
- Theme system creates visual variety without complex animations
- Own scroll library shows technical authority
- Hover-shuffle adds crafted detail without being gimmicky

## Extraction For Template 4
- Typography-building preloader (word-by-word reveal)
- Theme system with CSS custom properties
- Hover-shuffle text effect on CTAs
- Lenis 1.x scroll architecture
