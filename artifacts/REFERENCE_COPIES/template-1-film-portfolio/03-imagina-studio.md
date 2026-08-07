# Pattern Analysis: Jeton (SaaS Product Launch — Genre 2)

## Core Architecture
- **Stack:** Next.js + Three.js + GSAP + Lenis
- **Structure:** Single-page scroll narrative with 3D centerpiece
- **Approach:** Restrained design where 3D object IS the hero, not decoration

## Key Mechanical Patterns

### 1. Single Confident 3D Centerpiece
- One abstract geometric object (connected node network) that fills ~60% of viewport
- Object rotates slowly on idle, responds to scroll with structured disassembly
- Sections snap to object states — each feature section maps to a specific 3D configuration

### 2. Restrained Color / Typography
- Dark mode default with single accent color (teal/cyan)
- Typography: Geometric sans-serif (Inter or similar), generous line-height
- No rounded cards, no soft shadows, no purple gradients

### 3. Scroll-Mapped Object States
- Scroll 0-20%: Object assembled, slow rotation
- Scroll 20-40%: Layer peels off, feature text appears
- Scroll 40-60%: Second layer separates, grid lines appear
- Scroll 60-80%: Core exposed, data visualization mode
- Each state transition uses GSAP ScrollTrigger `scrub: 1.5`

### 4. Feature Section Layout
- Split screen: 3D on left, text on right (desktop)
- Text sections snap to scroll position with thin progress indicator
- Each feature description is short (3 words + 1 sentence)

## Why It Works
- One object, many states — avoids "different 3D scene per section" complexity
- Restraint in colors/typography makes the 3D feel premium, not overwhelming
- Scroll-disassembly tells a story without words

## Extraction For Template 2
- Single 3D centerpiece with multiple scroll-mapped states
- Split-screen layout (3D + text)
- Dark theme with single accent color
- Abstract geometric form (not literal product representation)
- Progress indicator for scroll position
</content>

