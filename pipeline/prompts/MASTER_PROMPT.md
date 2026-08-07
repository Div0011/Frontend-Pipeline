# Website Redesign Master Prompt

> A reusable, systematic prompt for rebuilding any website into an
> award-caliber cinematic experience. Use this as the single source of
> truth for analysis, design, motion, and engineering.

---

## 0. Mission

Redesign the target website into a **bespoke, cinematic, scroll-driven
experience** that is:
- Visually distinct from the original
- Tailored to the brand's DNA, not a template
- Built with craft-caliber references (Active Theory, Resn, Lusion,
  Obys Agency, Locomotive, Hubtown, Minh Pham)
- Production-ready, performant, and accessible

You are not copying the original site. You are **transcending** it.

---

## 1. Inputs

| Input | Description |
|-------|-------------|
| `TARGET_URL` | The live website to redesign |
| `BRAND_CONTEXT` | Company name, tagline, mission, industry, tone |
| `CONTENT_INVENTORY` | All sections, copy, media, CTAs from the original |
| `SEO_REQUIREMENTS` | Meta tags, structured data, crawlability needs |
| `CONSTRAINTS` | Tech stack preferences, timeline, accessibility reqs |

---

## 2. Phase 1: Deep Analysis

Before designing, complete this audit:

### 2.1 Functional Audit
- Map every user journey (homepage → conversion)
- Identify core value propositions
- List all CTAs and conversion points
- Document content hierarchy
- Note any interactive features (forms, filters, galleries)

### 2.2 Visual Audit
- Capture screenshots of every section
- Analyze color palette (primary, secondary, accent)
- Review typography (fonts, weights, sizes, hierarchy)
- Assess spacing rhythm and grid system
- Note imagery style (photos, illustrations, video)

### 2.3 Technical Audit
- Identify current stack
- Note performance issues
- List third-party dependencies
- Check mobile responsiveness
- Assess accessibility gaps

### 2.4 Brand DNA Extraction
From the audit, extract:
- **Brand pillars** (3-5 core values)
- **Tone keywords** (e.g., "bold, intimate, technical")
- **Visual personality** (e.g., "warm brutalist", "cold precision")
- **Target audience** (demographics, psychographics)
- **Competitive position** (luxury, accessible, disruptive)

**Deliverable:** `WEBSITE_ANALYSIS.md` with all findings.

---

## 3. Phase 2: Creative Direction

Based on the analysis, define the redesign approach.

### 3.1 Genre Selection

Choose **one** primary genre:

| Genre | Pattern | Best For |
|-------|---------|----------|
| **0. Cinematic Without Generated Media** | Typography, pacing, grading, restraint (no 3D/video) | Hadaka, Obys Agency, 1 Place Vendôme | Editorial, minimal brands, when assets unavailable |
| **1. Full Scroll-Camera** | Camera flies through 3D space tied to scroll (The Year of Greta, Lusion) | Brand stories, timelines, immersive narratives |
| **2. Restrained Centerpiece** | Single confident 3D hero + conventional layout (Hubtown, Minh Pham) | B2B, corporate, portfolios needing one "wow" moment |
| **2b. Kinetic-Type-Led** | Typography carries the drama, no heavy WebGL (Obys Agency) | Editorial, agencies, fashion, minimal brands |
| **3. Parallax/Depth** | Multi-plane parallax, layered reveals (Invisible Moscow, Canals) | Atmouspheric brands, storytelling, luxury |
| **4. Scrollytelling** | Chapter-based progressive reveal (History of Animation) | Educational, heritage, long-form content |
| **5. 3D Product/Model** | Interactive 3D objects, disassembly, rotation (Kieran Clarke) | Products, tech, automotive, hardware |
| **6. Minimal/Tunnel** | Endless horizontal flow, tunnel vision, clean geometry | Fashion, art, portfolios, experimental |
| **7. Video-Morph** | Seamless video transitions, film-reel effects (Imagina Studio) | Creative agencies, video-heavy brands |

### 3.2 Art Direction

Define:
- **Big idea**: One sentence the jury remembers
- **Emotional tone**: 2-4 adjectives
- **Moodboard directions**: 2-3 visual directions with reference pulls
- **Color system**: Base + ONE electric accent (tokens with hex + role)
- **Typography pairing**: Characterful display + precise text face
- **Layout philosophy**: Editorial asymmetry, grid with breakouts
- **Visual hierarchy**: What the eye meets 1st/2nd/3rd

### 3.3 Motion System

Specify:
- **Scroll narrative**: How the page reveals itself
- **Hero moment**: WebGL/Spline scene or kinetic type
- **Cursor design**: Custom cursor concept (aura, crosshair, morph)
- **Section transitions**: Pin, scrub, fade, morph
- **Performance budget**: <2s TTI, 60fps, reduced-motion fallbacks

**Deliverable:** `CREATIVE_DIRECTION.md` with art direction, motion spec, and style tiles.

---

## 4. Phase 3: Engineering Architecture

### 4.1 Stack (Mandatory)
- **Framework:** Next.js 14+ (App Router) + TypeScript
- **Styling:** Tailwind CSS v3+ with custom design tokens
- **Motion:** GSAP + ScrollTrigger + Lenis (smooth scroll)
- **3D:** Three.js + @react-three/fiber + @react-three/drei (or Spline)
- **Post-processing:** @react-three/postprocessing (Bloom, ChromaticAberration, Vignette)
- **Fonts:** next/font/google (display + body + mono)
- **Deploy:** Static export (`output: 'export'`)

### 4.2 File Structure

```
project/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Composed homepage
│   ├── globals.css         # Design tokens, resets, animations
│   └── components/
│       ├── Nav.tsx         # Fixed nav with scroll behavior
│       ├── Hero.tsx        # Hero section + WebGL mount
│       ├── Hero3D.tsx      # R3F scene (or SplineHero.tsx)
│       ├── About.tsx       # About/story section
│       ├── Projects.tsx    # Work/portfolio grid
│       ├── Services.tsx    # Services/capabilities
│       ├── Contact.tsx     # Contact form/info
│       ├── Footer.tsx      # Multi-column footer
│       ├── CinematicOverlay.tsx  # Grain, letterbox, vignette
│       └── CustomCursor.tsx      # Custom cursor system
├── public/
│   └── images/             # Optimized assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

### 4.3 Key Components

| Component | Responsibility |
|-----------|----------------|
| `Hero3D.tsx` | R3F scene with scroll-driven camera, post-processing |
| `CustomCursor.tsx` | Custom cursor with hover states, touch detection |
| `CinematicOverlay.tsx` | Film grain, vignette, letterbox bars |
| `LenisProvider.tsx` | Smooth scroll wrapper for GSAP integration |
| Section components | GSAP ScrollTrigger reveals, content, CTAs |

### 4.4 Engineering Rules

- **Client/Server split:** Default to Server Components; mark interactive pieces `"use client"`
- **Lazy loading:** `next/dynamic` for heavy 3D/motion sections
- **SSR safety:** WebGL/Spline wrapped in `Suspense` + `dynamic(..., { ssr: false })`
- **Accessibility:** Semantic HTML, focus management, `prefers-reduced-motion` guards, tap targets ≥44px
- **Performance:** `dpr={[1,2]}`, lazy-load below-fold, `<2s` TTI target
- **TypeScript:** Strict mode, no `any`, no console errors
- **Build:** Must pass `npm run build` cleanly

**Deliverable:** Complete file tree with all source files.

---

## 5. Phase 4: Section Specifications

For each section, specify:

### 5.1 Hero
- Brand reveal loader (canvas-based or CSS)
- WebGL centerpiece (torus knot, distorted sphere, or Spline model)
- Scroll-driven camera rig with 3+ waypoints
- Mouse-reactive lighting/interaction
- Post-processing stack (Bloom, ChromaticAberration, Vignette)
- Chapter indicator (if scrollytelling)
- Cinematic marquee or ticker (optional)

### 5.2 Navigation
- Fixed header with scroll-aware transparency/blur
- Animated brand logo (letter-by-letter reveal)
- Hamburger menu for mobile
- Active section tracking via ScrollTrigger
- Hide on scroll-down, reveal on scroll-up

### 5.3 Content Sections (About, Projects, Services)
- Section entrance animations (GSAP ScrollTrigger)
- Hover interactions on cards
- Staggered reveals for grid items
- Consistent bracket/chapter labeling
- Gradient overlays on hover

### 5.4 Contact/Join
- Form inputs with custom styling
- Submit buttons with hover states
- Validation feedback
- Social links in footer

### 5.5 Footer
- Multi-column layout
- Social icons with hover effects
- Copyright with bracket motif
- Back-to-top link

---

## 6. Phase 5: Quality Gates

Before delivery, verify:

### 6.1 Build Check
```bash
npm run build  # Must pass cleanly
npm run dev    # Must start without errors
```

### 6.2 Visual Check
- [ ] Screenshot hero at 1920x1080
- [ ] Screenshot each section
- [ ] Verify on mobile viewport (375px)
- [ ] Check cursor visibility and behavior
- [ ] Confirm no console errors

### 6.3 Performance Check
- [ ] Lighthouse Performance > 90
- [ ] WebGL canvas uses `dpr={[1,2]}`
- [ ] Images optimized (next/image or equivalent)
- [ ] No layout shift (CLS < 0.1)

### 6.4 Accessibility Check
- [ ] Semantic HTML landmarks
- [ ] Focus visible states
- [ ] `prefers-reduced-motion` respected
- [ ] Color contrast > 4.5:1
- [ ] Tap targets ≥ 44px

---

## 7. Output Format

Return the redesign as:

1. **`WEBSITE_ANALYSIS.md`** — Full audit findings
2. **`CREATIVE_DIRECTION.md`** — Art direction, motion spec, style tiles
3. **`project/`** — Complete Next.js project with all source files
4. **`screenshots/`** — Key viewport captures

Each code file must be **complete, runnable, and buildable**. No stubs, no placeholders, no "implement later" comments.

---

## 8. Anti-Patterns (Hard Rules)

- ❌ No centered hero + gradient orb
- ❌ No three identical feature cards
- ❌ No logo wall
- ❌ No stocky testimonial grid
- ❌ No system fonts for everything
- ❌ No safe "modern minimal" SaaS look
- ❌ No gradient blobs everywhere
- ❌ No `any` types in TypeScript
- ❌ No `alert()` or `console.log()` in production code
- ❌ No broken build or TypeScript errors

**Distinctive > safe. Opinionated > consensus. One idea, executed
with craft, beats ten safe ideas.**

---

## 9. Reference Library

Draw craft (never pixels) from:

| Site | Pattern | When to Use |
|------|---------|-------------|
| Active Theory | Game-grade WebGL | Technical ceiling reference |
| Resn | Playful 3D concepts | Brand experiences needing whimsy |
| Lusion | Real-time 3D scroll-camera | Cinematic scroll narratives |
| Obys Agency | Typography-led motion | Editorial, no heavy 3D |
| Hadaka | Cinematic without generated media | When video/3D unavailable; restraint, pacing, grading on ordinary photos |
| Locomotive | Brand-forward restraint | Commercial client work |
| Hubtown | Single 3D monolith + mouse-reveal | B2B needing one confident moment |
| Minh Pham | Restrained GSAP + WebGL | Taste over maximalism |
| Jeton | Serious-product scroll UX | Fintech, regulated industries |
| The Year of Greta | Scroll-bound 3D paths | Chronological timelines |
| Vertigo 1958 | Spline camera tracking | Interactive 3D portfolios |
| Imagina Studio | Video-morph transitions | Creative agency portfolios |
| Invisible Moscow | Multi-plane parallax + audio | Moody, atmospheric sites |
| Kieran Clarke | Bespoke 3D machinery | Technical, automotive, hardware |
| History of Animation | Scrollytelling chapters | Educational, heritage content |
| 1 Place Vendôme | Ultra-luxury editorial | Premium brand showcases |
| Snowhouse | Playful year-in-review | Annual reports, retrospectives |
| Hadaka | Japanese minimalism | High-end creative, fashion |
| SixB Dentaire | Warm human-centered | Healthcare, professional services |
| L'Oréal | Institutional gravitas | Corporate, mega-menu needs |

---

## 10. Execution Protocol

1. **Analyze** — Complete Phase 1 audit, save `WEBSITE_ANALYSIS.md`
2. **Direct** — Complete Phase 2 creative direction, save `CREATIVE_DIRECTION.md`
3. **Build** — Complete Phase 3-4, generate all source files
4. **Verify** — Complete Phase 5 quality gates
5. **Deliver** — Package project + screenshots

Do not skip phases. Do not shortcut quality gates.
The result must be **production-ready, buildable, and award-caliber.**

---

## 11. Integrated Design & Scrapling Skills Protocol

Agents and engineers executing this pipeline must draw references, design systems, component specifications, and architectural ideas directly from the central store in `artifacts/skills`:

- **Primary Reference Store**: [`artifacts/skills`](file:///Users/divyansh/Documents/GitHub/Frontend%20Pipeline/artifacts/skills) containing `ui-ux-pro-max-skill`, `ux-ui-agent-skills`, `taste-skill`, `impeccable`, `hallmark`, `scroll-world`, `interface-design`, `frontend-design-pro-demo`, `designer-skills`, `awesome-claude-design`, `bencium-marketplace`, `vercel-agent-skills`, `anthropics-skills`, `wondelai-skills`, `claude-code-apple-skills`, `claude-code`, `antigravity-skills`, `awesome-design-skills`, `claudedesignskills`, and `Scrapling`.
- **`/design-tokens`**: Enforce DTCG token structures, strict color roles, 4pt/8pt spacing scales, and multi-brand dark/light theme variables.
- **`/design-component`**: Define components across all 8 interactive states (default, hover, active, focus, disabled, loading, error, success) with full ARIA landmarks.
- **`/design-code`**: Render 1:1 token-faithful Next.js 14 / Tailwind CSS v3/v4 component implementations via the Adapter Protocol.
- **`/design-review`**: Conduct 6-dimension design reviews (Hierarchy, Consistency, Grid, Typography, Contrast, Interaction) + Nielsen 10 Usability Heuristics.
- **`/a11y-audit`**: Run WCAG 2.2 AA contrast calculations (≥4.5:1 text, ≥3:1 UI boundaries), visible focus rings, and tap target checks (≥44px).
- **`/apply-aesthetic`**: Apply high-taste archetypes or curated design systems from the 138-theme library.
- **`/redesign`**: Conduct audit-first upgrades of existing digital products without breaking functionality.
- **`/migrate-design-system`**: Map token schemas between Material 3, Apple HIG, shadcn, Radix UI, and custom frameworks.
- **`/prototype`**: Elevate wireframes through progressive fidelity and construct usability test plans.
- **`/ux-writing`**: Write clear, jargon-free microcopy, CTAs, empty states, and empathetic form errors.
- **`/figma` & `/theme-factory`**: Sync Figma auto-layout nodes, extract brand guidelines, and harmonize HSL theme palettes.
- **`/apple-design`**: Apple HIG guidelines, SF Pro typography pairings, translucent glassmorphic materials, and liquid spring motion.
- **Scrapling Engine**: Utilize Scrapling (`Fetcher`, `StealthFetcher`, `DynamicFetcher`) for adaptive web crawling, DOM extraction, and visual asset scraping during Phase 1 analysis.

