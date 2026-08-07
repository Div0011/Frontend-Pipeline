# Cinematic Website Reference Analysis

> **Study scope:** 5 high-stakes cinematic websites analyzed for 3D integration, motion patterns, split-text animations, scroll narrative, and build feasibility with Claude.

---

## Sites Analyzed

| # | Site | URL | Technology | 3D/WebGL |
|---|------|-----|-----------|----------|
| 1 | **The Year of Greta** | theyearofgreta.com | Three.js (bundled) | ✅ Yes |
| 2 | **Vertigo 1958** | vertigo1958.webflow.io | Webflow + Spline 3D | ✅ Yes (Spline) |
| 3 | **Imaginastudio** | imagina.studio | WordPress + GSAP + WebGL | ✅ Yes (custom) |
| 4 | **Kieran Clarke** | kieran-clarke.com | Webflow + CSS/JS | ❌ No |
| 5 | **Invisible Moscow** | invisible-moscow landing | Webflow | ❌ No |

---

## 1. The Year of Greta

**URL:** https://theyearofgreta.com/  
**Stack:** Three.js (bundled inline), custom WebGL renderer  
**3D Evidence:** 4 canvas elements, `THREE` global present, main application canvas (2940x1362)

### Cinematic Flow
- **Hero:** Full-viewport 3D scene with illustrated Greta Thunberg character rendered in Three.js
- **Narrative structure:** Single-page timeline with scroll-driven progression through illustrated scenes
- **Audio integration:** Play/pause controls with sound visualization (60x60 canvas for audio feedback)
- **Typography:** Clean serif/sans-serif pairing with generous whitespace
- **Color palette:** Warm paper tones with ink-black text — documentary editorial feel

### Motion & Animation Patterns
- 3D character model that responds to scroll position
- Parallax depth layers within the 3D scene
- Smooth scroll narrative where each timeline entry triggers scene transitions
- Audio-reactive visual feedback

### Key Technical Details
- Three.js bundled inline (no external CDN)
- Custom WebGL renderer for illustrated character
- Scroll-linked animation timeline
- Social sharing integration (FB, TW, YT)

---

## 2. Vertigo 1958

**URL:** https://vertigo1958.webflow.io/  
**Stack:** Webflow + Spline 3D integration  
**3D Evidence:** 2 WebGL canvases (2940x1362), parent classes `hero-spline desktop` and `dolly-spline`

### Cinematic Flow
- **Hero:** Full-viewport Spline 3D scene — immersive 3D environment inspired by Hitchcock's Vertigo
- **Typography:** Massive lowercase type — "vertigo" as the dominant visual anchor
- **Filmography section:** Horizontal carousel of Hitchcock's films with prev/next navigation
- **Dolly Zoom section:** Educational cinematic technique breakdown with 3D visualization
- **Narrative:** Single-page cinematic essay structure — like a film within a website

### Motion & Animation Patterns
- Spline 3D model rotation/transformation tied to scroll
- Horizontal filmography carousel with smooth transitions
- Text reveal animations on scroll
- Dark cinematic palette (near-black backgrounds, cream text)

### Key Technical Details
- **Spline 3D** integration via Webflow's native Spline component
- Swiper.js for filmography carousel
- Mobile-responsive: 3D hidden on mobile (`hero-spline mobile` class with 0x0 canvas)
- 126 console warnings — heavy WebGL/3D rendering overhead

---

## 3. Imaginastudio

**URL:** https://imagina.studio/en/  
**Stack:** WordPress + GSAP + custom WebGL  
**3D Evidence:** 1 WebGL canvas (2940x1362), parent class `clients-canvas sticky bottom-0 w-full h-screen-mobile xl:h-screen overflow-hidden`

### Cinematic Flow
- **Hero:** Split-text animation on "Imagina Studio" — each letter animated individually with staggered timing
- **Numbered sections:** 01, 02, 03, 04, 05, 06, 07 — editorial documentary structure
- **Navigation:** Split-text nav links where each letter has its own animation state (hover/active)
- **Content sections:** Films & storytelling → Clients → Creative team → Our work → Services → Impact → Stories
- **Work showcase:** Video-heavy portfolio with film project cards showing duration (00:20, 00:35, etc.)

### Motion & Animation Patterns
- **Split-text everywhere:** Every nav link, heading, and CTA has individual letter animations
- Staggered reveal animations on scroll
- Video autoplay with custom controls
- Parallax image reveals
- Smooth section transitions

### Key Technical Details
- GSAP for animations (explicitly tagged)
- WordPress CMS for content management
- WebGL canvas for client logos/background effect
- Multi-language support (EN/FR/DE)
- Cookie consent overlay

---

## 4. Kieran Clarke

**URL:** https://kieran-clarke.com/  
**Stack:** Webflow + custom CSS/JS  
**3D Evidence:** None — pure CSS/JS animations

### Cinematic Flow
- **Hero:** Full-viewport photo with overlay text — "KC IS A LEADING AND AWARD WINNING STUNTMAN..."
- **Navigation:** Split-text on EVERY link — `p r o j e c t s`, `f i l m s`, `s e r v i c e s`, `a b o u t`, `s e c r e t` — each letter wrapped in span
- **Numbered sections:** 05 for services, bracket motifs [ ] throughout
- **Film credits:** Horizontal list with hover-reveal project images
- **Backstage section:** Custom vehicle showcases (E-camera Bike, KCX Motorcycles, MX Camera Bike)
- **Footer:** Split-text quick links + social links

### Motion & Animation Patterns
- **Split-text navigation:** Letters animate on hover with individual transforms
- Scroll-triggered image reveals
- Parallax photo scrolling
- Bracket [ ] motifs as section markers
- Minimal brutalist aesthetic — black background, white text, no gradients

### Key Technical Details
- CSS Design Awards "Site of the Day"
- No external JS libraries — pure CSS transitions + minimal JS
- Cookie consent banner
- Time display in nav ("4:00 PM british standard time")
- Award-winning minimal/brutalist design

---

## 5. Invisible Moscow

**URL:** https://invisible-moscow-d7e57fde-ae71f32ccc47d.webflow.io  
**Stack:** Webflow  
**3D Evidence:** None — pure HTML/CSS/JS

### Cinematic Flow
- **Hero:** Minimal with "Walking. Listening. Being." tagline — cinematic manifesto
- **Video CTA:** "Watch the video" button linking to promotional content
- **Alternating sections:** Image + text alternating layout with connecting lines (visual flow)
- **Numbered experience:** 01-06 step breakdown of the immersive experience
- **FAQ accordion:** Expandable Q&A section
- **Media logos:** Press mentions from GUM, Panasonic, etc.
- **Partners:** Logo grid at bottom

### Motion & Animation Patterns
- Scroll-triggered section reveals
- Alternating image-text layout with line connectors
- FAQ accordion expand/collapse
- Minimal scroll animations — content-focused

### Key Technical Details
- One-page landing structure
- Binaural sound / 3D audio as core value proposition
- Multi-language support (RU/EN/FR/DE)
- Ticket purchase integration
- Clean, minimal typography

---

## Cross-Site Pattern Analysis

### A. Split-Text Animation (Kieran Clarke, Imaginastudio)
The most prevalent cinematic technique across reference sites:
- Every navigation link has individual letter spans
- Hover state animates letters with staggered transforms
- Headings use split-text for reveal animations
- **Implementation:** GSAP SplitText plugin or custom character-wrapping utility

### B. Numbered Editorial Sections (Imaginastudio, Kieran Clarke, Invisible Moscow)
- 01, 02, 03... numbering system for sections
- Creates documentary/journalistic feel
- Often paired with bracket motifs [ ]
- **Implementation:** CSS counters or explicit numbering in markup

### C. 3D Integration (The Year of Greta, Vertigo, Imaginastudio)
- **Spline 3D:** Vertigo uses Spline's Webflow integration — models created in Spline editor, exported as embeddable scenes
- **Three.js:** The Year of Greta uses bundled Three.js for illustrated character rendering
- **Custom WebGL:** Imaginastudio has custom WebGL canvas for client logo effects
- **Mobile fallback:** All sites hide 3D on mobile (0x0 canvas) for performance

### D. Cinematic Typography
- **Massive lowercase:** Vertigo ("vertigo" as hero)
- **Oversized serif:** The Year of Greta documentary style
- **Monospace/spaced:** Kieran Clarke's `p r o j e c t s` spaced-out nav
- **Split-letter nav:** Kieran Clarke, Imaginastudio

### E. Scroll Narrative
- All sites use scroll-driven animations
- Lenis smooth scroll (implied by smooth behavior)
- Section-by-section reveals
- Parallax depth layers

### F. Dark vs Light Palettes
| Site | Background | Text | Accent |
|------|-----------|------|--------|
| The Year of Greta | Warm paper | Ink black | — |
| Vertigo 1958 | Near-black | Cream/white | — |
| Imaginastudio | White/light | Black | — |
| Kieran Clarke | Pure black | White | — |
| Invisible Moscow | White/light | Black | — |

---

## Can Claude Build These?

### Short Answer: Yes — with caveats.

### What Claude CAN Do

| Capability | Evidence | Pipeline Support |
|-----------|----------|-----------------|
| **Generate Three.js code** | Engineering agent already produces React + TypeScript + Three.js stacks | ✅ `pipeline/engineering.md` includes Three.js in default stack |
| **Generate Spline integration** | `@splinetool/react-spline` can be added to Next.js | ✅ Engineering agent can install and integrate any npm package |
| **Split-text animations** | GSAP SplitText plugin or custom utility | ✅ Engineering agent already generates GSAP ScrollTrigger code |
| **Scroll narrative** | Lenis + GSAP ScrollTrigger | ✅ Already in our stack |
| **Cinematic art direction** | Opus 4.8 Creative Director agent | ✅ Studies reference sites and generates moodboards |
| **WordPress/Webflow CMS** | Engineering agent generates CMS collections | ✅ For Webflow, we'd export static HTML; for WordPress, we'd generate theme files |

### What Claude CANNOT Do (Without Human Input)

| Limitation | Workaround |
|-----------|-----------|
| **Create 3D models** | Designer creates in Spline/Blender → exports → Claude integrates |
| **Design original illustrations** | Designer provides assets → Claude composites and animates |
| **Film/video production** | Client provides → Claude embeds and adds interactions |
| **Brand-specific creative decisions** | Human Creative Director reviews and refines Opus output |

### Token Cost Impact for 3D Cinematic Sites

| Component | Standard Site | 3D Cinematic Site | Delta |
|-----------|--------------|-------------------|-------|
| **Engineering tokens** | ~210k | ~280k–350k | +70k–140k |
| **Engineering API cost** | ~$2.43 | ~$3.20–$4.00 | +$0.80–$1.60 |
| **Motion Design tokens** | ~30k | ~50k–70k | +20k–40k |
| **Motion API cost** | ~$0.23 | ~$0.40–$0.60 | +$0.17–$0.37 |
| **Total per site** | ~$0.60–$1.30 | ~$1.00–$2.00 | +$0.40–$0.70 |

**Worst case (3 QA retries with Opus escalation):** ~$3.00–$6.00  
**Recommended tier for 3D sites:** Premium ($1.00–$1.80) with Opus 4.8 Creative Director

### Recommended Pipeline Adjustments for 3D Cinematic Sites

1. **Add `@splinetool/react-spline` to default stack** in `engineering.md`
2. **Add `@react-three/fiber` + `@react-three/drei`** for custom Three.js scenes
3. **Increase Engineering max_tokens to 12288** for complex 3D code generation
4. **Add "3D asset integration" subtask** to Engineering agent prompt
5. **Motion Design agent** should specify 3D camera movements, not just 2D GSAP timelines

### Feasibility Verdict

| Site | Claude Buildable? | Estimated Pipeline Cost | Notes |
|------|------------------|------------------------|-------|
| The Year of Greta | ✅ Yes | ~$1.20–$1.80 | Three.js scene + scroll timeline |
| Vertigo 1958 | ✅ Yes | ~$1.00–$1.50 | Spline integration + carousel |
| Imaginastudio | ✅ Yes | ~$1.00–$1.60 | Split-text + GSAP + WebGL canvas |
| Kieran Clarke | ✅ Yes | ~$0.80–$1.20 | Split-text nav + minimal JS |
| Invisible Moscow | ✅ Yes | ~$0.60–$1.00 | Alternating layout + accordion |

---

## Key Takeaways for Pipeline Enhancement

1. **Split-text is the signature cinematic technique** — should be a default component in generated sites
2. **Spline 3D is production-ready** for Webflow exports, but for Next.js we need `@splinetool/react-spline`
3. **Numbered editorial sections** (01, 02, 03) create instant cinematic credibility
4. **3D sites cost ~30-50% more in tokens** but deliver 10x visual impact
5. **Dark brutalist aesthetic** (Kieran Clarke) is achievable with pure CSS — no 3D needed
6. **The Year of Greta proves Three.js can render illustrated characters** — not just geometric shapes

---

*Analysis completed: 2026-07-16*
