# Smash Guys — Brief Ingestion Template

Use this template when the pipeline receives a brief for Smash Guys or any
similar food/cuisine/fitness/lifestyle brand. This overrides the default
genre classification and locks the creative direction.

---

## [CLIENT]

- Name: Smash Guys
- Industry: Food / Quick Service Restaurant
- Location: Bangalore, India
- Tone: Bold, energetic, appetite-driven

## [CONTENT_INVENTORY]

- Sections: Hero, Interactive Menu, Story/Origin, Cinematic Process, Locations, Order CTA
- Assets: Product photography, kitchen video, team photos, location map
- No chronological journey → **Genre 2 confirmed**

## [TECHNICAL_CONSTRAINTS]

- Budget: Mid-tier (no 6-month WebGL build)
- Timeline: 4–6 weeks
- Mobile traffic: ~70% (India market) → fallback critical
- Performance: 3s interactive on 4G

## [PIPELINE_OUTPUT]

- Genre: **2 (Restrained Centerpiece)**
- 3D Budget: Single hero object (sizzling patty with steam)
- Motion System: GSAP + Lenis, no R3F scene graph
- Fallback: Video loop hero + CSS scroll animations
- Reference Mash: Hubtown (monolith) + Imagina (video-morph) + Canals (grading)

## [SMASH_GUYS_GENRE_2_VARIANT]

  - Single 3D hero: Sizzling patty with steam particles (WebGL or high-quality video loop)
  - Signature interaction: Mouse-reveal "layers" of the burger (bun → patty → cheese → sauce)
  - Everything else: GSAP-choreographed DOM with food-cinema motion language
  - Color: Dark theme + aggressive red accents (existing palette)
  - Audio: Subtle sizzle ambient (user-initiated unmute)

## [MANDATORY RULES]

1. Do NOT classify as Genre 1 regardless of keyword matches ("menu", "kitchen", "food")
2. Do NOT build a scroll-camera 3D kitchen tour
3. Hero must load in < 2s on 4G — no 5MB Draco models
4. Mobile fallback must be a video loop or 2D canvas, not a disabled 3D canvas
5. All scroll animations must reverse smoothly on backward scroll
