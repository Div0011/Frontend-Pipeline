# CINEMATIC WEBSITE PIPELINE — 5 TEMPLATE PROMPTS
## 14 Reference Sites Analyzed → Generalized Build Instructions for AI Agents

### EXECUTIVE SUMMARY
This document extracts the core craft patterns across all 14 reference websites for the 5 templates in the Frontend Pipeline repository.

---

## TEMPLATE 1: FILM / CREATIVE PORTFOLIO
**Ceiling:** Obys Agency | Minh Pham | Imagina Studio  
**Genre:** Genre 2b (Kinetic-Type-Led) OR Genre 2 (Restrained Centerpiece)

### Core Mechanics & Requirements
1. **The "Two Narratives" Pattern (Obys):** Every section has a formal and a concealed version. Concealed layers are revealed through hover or scroll.
2. **Typography Architecture:**
   - Display typeface (800–900 weight, 8vw–15vw, tight leading 0.9–1.1, negative tracking -0.02em to -0.05em).
   - Body typeface (400 weight, line-height 1.5–1.7).
   - Motion: character-by-character reveal (0.03s stagger), mask line-split reveals.
3. **Video-Morph Pattern (Imagina Studio):** Asymmetric thumbnail grid expanding to full-screen viewports; scroll scrubs video timeline.
4. **WebGL Restraint (Minh Pham):** 3D frames content; subtle background noise/gradient shaders, cursor-following light source.
5. **Interaction & Color:**
   - Custom `mix-blend-mode: difference` cursor with contextual labels ("VIEW", "PLAY", "READ").
   - Maximum 3 colors total (`#0a0a0a` background, `#ffffff` primary, accent).

---

## TEMPLATE 2: SAAS PRODUCT LAUNCH
**Ceiling:** Jeton Fintech | Hubtown by Unseen Studio | Lusion  
**Genre:** Genre 2 (Restrained Centerpiece)

### Core Mechanics & Requirements
1. **The "Confident Centerpiece" Pattern:** Single 3D monolith visualization with mouse-reveal lighting/geometry details.
2. **Scroll-Scrubbed Feature Discovery (Jeton):** Pinned scroll sections with alternating feature scenes.
3. **Visual Trust Signals:** Clean, spacious layout, rounded cards (8–16px), SOC 2 / GDPR compliance badges, partner logo grid, verified stat counters.
4. **Color & Typography:** Legibility first (Inter / Geist), 1 strong accent color + neutrals.

---

## TEMPLATE 3: CORPORATE / INSTITUTIONAL
**Ceiling:** L'Oréal Mediaroom | Canals Amsterdam | History of Animation  
**Genre:** Genre 2 (Restrained Centerpiece) or Genre 2b (Kinetic-Type-Led)

### Core Mechanics & Requirements
1. **Institutional Gravitas Pattern:** Generous whitespace, editorial serif hierarchy (Tiempos / Playfair), subtle fade-ups.
2. **Atmospheric Color Grading (Canals):** Scroll-driven CSS custom property background morphing (`#0a0a0a` → `#1a1a2e` → `#16213e`).
3. **Chapter-Based Scrollytelling (History of Animation):**
   - 4–8 structured chapters.
   - Giant outlined background chapter numbers (20vw–30vw, stroke-only, 0.05–0.1 opacity, 0.2x parallax).
   - Alternating zig-zag layout rhythm.
4. **Mega-Menu System (L'Oréal):** Dropdown menu with category columns, sub-links, and featured media cards.

---

## TEMPLATE 4: MARKETING / CREATIVE AGENCY
**Ceiling:** Locomotive | Active Theory | Resn  
**Genre:** Genre 1 (Full Scroll-Camera) OR Genre 2 (Restrained Centerpiece)

### Core Mechanics & Requirements
1. **The "Studio as Portfolio" Pattern:** The site itself is the portfolio piece. Every interaction demonstrates craft.
2. **L.I.S.A. & Team Humanization (Locomotive):** Interactive contact character/assistant with voice/text responses + 3D/interactive team cards with hover fun facts & quotes.
3. **Active Theory & Resn 3D Concepts:** Multi-environment 3D story or whimsical 3D interactions framing agency case studies.
4. **Typography & Aesthetics:** Bold grotesque typography (Neue Montreal / Söhne style), high contrast, dark mode.

---

## TEMPLATE 5: PHYSICAL PRODUCT / E-COMMERCE DISASSEMBLY
**Ceiling:** Kieran Clarke | Vertigo 1958 Tribute  
**Genre:** Genre 1 (Full Scroll-Camera)

### Core Mechanics & Requirements
1. **The "Product as Journey" Pattern:** High-fidelity 3D mechanical model with scroll-driven exploded assembly/disassembly.
2. **Interactive Node Inspection:** Clickable node hotspots revealing laser-etched hardware module specifications.
3. **Hardware Configurator:** Finish selector (Titanium, Obsidian, Silver) with material transitions.
4. **Purchase CTA:** Clear reservation/order module with pricing breakdown.
