# Pattern Analysis: Hubtown (by Unseen Studio) — SaaS Product Launch

## Genre: SaaS Product Launch — Single 3D Centerpiece (Genre 2)

## Core Architecture
- **Stack:** Next.js + React Three Fiber + GSAP + Lenis
- **Approach:** One confident 3D centerpiece doing all the work
- Nothing else competes with the 3D object — it's the hero

## Key Mechanical Patterns

### 1. Single 3D Centerpiece
- One 3D object (abstract geometric form) as the visual focus
- Object occupies ~40% of viewport on desktop
- Object has different states: idle rotation → scroll response → feature alignment
- Camera slowly orbits the object at idle (10s per full rotation)

### 2. Scroll → Object State Changes
- Scroll progress maps to object transformations:
  - 0-20%: Object rotates slowly, material shifts from matte to emissive
  - 20-40%: Object disassembles into geometric components
  - 40-60%: Components rearrange into feature layout
  - 60-80%: Components merge into final form
  - 80-100%: Object pulses/glows for CTA
- Each state change tied to text section appearing

### 3. Minimal UI Philosophy
- No sticky headers during scroll narrative
- Only the 3D object + section text
- Text is left-aligned, white on dark background
- Sans-serif, lightweight font for clean look
- CTA appears only at the bottom

### 4. Color & Lighting
- Dark background (#0A0A0F)
- Object emissive material with glow effect
- Subtle bloom post-processing on the object
- Ambient light + single directional light for depth

## Why It Works
- Single focus means no cognitive competition
- Object transformation tells the product story visually
- Dark background + emissive material feels premium
- Minimal text means user actually reads it

## Extraction For Template 2
- R3F single centerpiece with multiple states
- 3D object transformations mapped to scroll progress
- Camera orbit at idle + scroll-driven orbit override
- Minimal UI: just object + text, no navigation chrome
- Bloom/glow post-processing for premium feel
