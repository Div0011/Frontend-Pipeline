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

## 1. Template-Based Redesign Architecture (MANDATORY)

To balance rapid execution with bespoke craft, the pipeline operates under a strict template-overlay architecture:

### 1.1 Directory Roles
- **`templates/` (Read-Only Golden Masters)**: Contains pure base templates (`templates/smashguys`, `templates/cafe-cinematic`, `templates/hotel-cinematic`, etc.).
  - **HARD RULE**: **NEVER edit files directly in `templates/`**.
- **`projects/` (Client Production Websites)**: Holds customized client websites (`projects/<client-slug>/`).

### 1.2 Execution Protocol
1. **Match Template**: Select the best base template for the brand. If none exists, create a new base template in `templates/` first.
2. **Clone to Projects**: Copy the template to `projects/<client-slug>/` (excluding `.next`, `node_modules`, `.vercel`).
3. **Install Dependencies**: Run `npm install` in `projects/<client-slug>/`.
4. **Overlay Assets & Content**: Update only the client's assets, branding, colors, typography, menu/data, components, copy, images, contact info, and metadata inside `projects/<client-slug>/`.
5. **Verify**: Run `npm run typecheck` and `npm run build` in `projects/<client-slug>/`. Confirm `templates/` remains 100% pristine.

---

## 2. Deep Personalization & Visual Craft Standards

Every client redesign must adhere to the following personalization rules:

### 2.1 Brand-Personalized Preloader & Splash
- Splash screen must render the client's actual name (`{brandName}`) and tagline. Never show placeholder or template names.

### 2.2 Unboxed Header Typography & Smart Auto-Hiding Navigation
- **Unboxed Brand Name**: The logo text in the header must **never** be enclosed inside an arbitrary rectangle or square border.
- **Auto-Hiding Scroll**:
  - *Scroll Down past 80px*: Navigation slides up and disappears (`-translate-y-full opacity-0 pointer-events-none`).
  - *Scroll Up / Top*: Navigation smoothly re-appears with glassmorphic backdrop blur (`translate-y-0 opacity-100 backdrop-blur-lg`).

### 2.3 Strict Color Harmony & Calculated Contrast
- **Single Dominant Accent**: Every brand uses one signature accent color.
- **Button Uniformity**: All primary CTA buttons (`Full Menu`, `Order Online`, `Add +`, active category tabs, booking confirm) must use the brand's primary accent.
- **Contrast Discipline**: High-contrast text on primary buttons (`#FFFFFF` on dark colors like red, blue, green; `#000000` on bright colors like yellow, gold, cream). No clashing secondary colors.

### 2.4 Dynamic Motion Doodle Canvas Engine (`InteractiveBackground.tsx`)
- **Atmospheric Dark Gradients**: Base background matches the brand's palette (Dark Olive Green for Beyondburg, Deep Noir Charcoal for red brands, Deep Obsidian for orange/amber brands, Deep Midnight for blue brands).
- **Floating Motion Doodles**: Hand-drawn animated vector doodles (burgers, spatulas, flames, stars, sparkles, steam waves) floating and oscillating in the brand's accent color.
- **Ambient Embers & Spotlight**: Mouse-following radial spotlight with spring physics (`stiffness: 45, damping: 25`) and floating ambient embers. 100% non-blocking (`pointer-events-none fixed inset-0 z-0`).
- **Seamless Transparent Layering**: All section components use `bg-transparent` with glassmorphic cards (`bg-white/[0.04] backdrop-blur-md border border-white/10`) to eliminate harsh rectangular cuts.

### 2.5 Crisp Typography (No Foggy Text Blur)
- Remove excessive `blur(8px)` and foggy gradient masks from hero and secondary section text.

---

## 3. Mandatory Interactive Section Blueprints

Every production redesign must feature the following interactive components:

### 3.1 Interactive 3D Menu Showcase & Quick-View Modal (`SignatureMenu.tsx`)
- 3D hover tilt cards with glowing hover corners.
- Interactive recipe/ingredient quick-view modal on card click with culinary specifications and instant "Add to Bag".
- Category count badges and real-time search input.
- Slide-out `CartDrawer.tsx` integration with quantity steppers and localized currency (`₹` / `$`).

### 3.2 Interactive Craft Science Lab (`HowWeSmash.tsx`)
- Interactive flat-top temperature & sear pressure slider (250°F to 500°F).
- Real-time Maillard caramelized crust % gauge and juice retention meter.
- Step-by-step interactive craft blueprint cards with technical metrics.

### 3.3 Scroll-to-Expand Locations with Image Cross-Fade (`RestaurantLocations.tsx`)
- Interactive location tabs with cross-fading gallery preview with fade-in / fade-out animations (`AnimatePresence`).
- Live kitchen status badge, operating hours, direct phone line, and 1-click Google Maps directions.

### 3.4 Step-by-Step Table Booking Builder (`ReservationCTA.tsx`)
- Outpost location picker, live time-slot availability pills, party size stepper (1 to 12+ guests), and seating zone selector (*Chef's Sizzle Counter, Cozy Booth, Patio Deck*).
- Digital VIP reservation pass generator with confirmation reference code.

### 3.5 The Three Signature Sequence Engines (Cinematic Architecture v2)
Every brand is assigned one of three signature 3-beat sequence engines (**Establish $\rightarrow$ Interrogate $\rightarrow$ Invite**):
- **Sequence A (Deconstruction & Reveal)**: `SignatureDeconstruct.tsx` — Interactive 3D exploded layer view with thermal telemetry (Beyondburg, Dirty Martin's, Pedroso's, Burger Seigneur).
- **Sequence B (Temporal Time-Slip)**: `OriginTimeSlip.tsx` — Archival time dial ($1973 \rightarrow 1998 \rightarrow 2026$) shifting color grade to vintage sepia with period pricing (Dan's, Casino El Camino, Pool Burger, Sour Duck).
- **Sequence C (Craft Matrix Builder)**: `CraftMatrixBuilder.tsx` — 4-step precision customizer (Bun $\rightarrow$ Patty $\rightarrow$ Cheese $\rightarrow$ Sauce) compiling live into an atelier spec receipt ticket (Truffles, JewBoy, Good Flippin', NADC, Burger Elite, Biggies).

### 3.6 Editorial Minimalist Menu Card Sheet (`/menu/page.tsx`)
- Structured like a fine-dining atelier physical menu card sheet without boxy tiles.
- Clean category headers (`01. BURGERS & SMASHES`), leader spacing, currency pricing, and discreet `+` action.

### 3.7 Mandatory Preservation Rules
- **Footer.tsx**: Always keep the centered 2-line PixelText, hours, newsletter, typography, and monochromatic styling intact.
- **CanvasScrubber.tsx / Frame Scrubbers**: Always preserve 60fps canvas scrubbing, frame caching, and scroll distance.

---

## 4. Phase 1: Deep Analysis

Before designing, complete this audit:

### 4.1 Functional Audit
- Map every user journey (homepage → conversion)
- Identify core value propositions
- List all CTAs and conversion points
- Document content hierarchy
- Note any interactive features (forms, filters, galleries)

### 4.2 Visual Audit
- Capture screenshots of every section
- Analyze color palette (primary, secondary, accent)
- Review typography (fonts, weights, sizes, hierarchy)
- Assess spacing rhythm and grid system
- Note imagery style (photos, illustrations, video)

### 4.3 Brand DNA Extraction
- **Brand pillars** (3-5 core values)
- **Tone keywords** (e.g., "bold, intimate, technical")
- **Visual personality** (e.g., "warm brutalist", "cold precision")
- **Target audience** (demographics, psychographics)
- **Competitive position** (luxury, accessible, disruptive)

**Deliverable:** `WEBSITE_ANALYSIS.md` with all findings.

---

## 5. Phase 2: Creative Direction

### 5.1 Genre Selection

| Genre | Pattern | Best For |
|-------|---------|----------|
| **0. Cinematic Without Generated Media** | Typography, pacing, grading, restraint (no 3D/video) | Hadaka, Obys Agency, 1 Place Vendôme |
| **1. Full Scroll-Camera** | Camera flies through 3D space tied to scroll | Brand stories, timelines, immersive narratives |
| **2. Restrained Centerpiece** | Single confident 3D hero + conventional layout | B2B, corporate, portfolios |
| **2b. Kinetic-Type-Led** | Typography carries the drama, no heavy WebGL | Editorial, agencies, fashion |
| **3. Parallax/Depth** | Multi-plane parallax, layered reveals | Atmospheric brands, storytelling, luxury |
| **4. Scrollytelling** | Chapter-based progressive reveal | Educational, heritage, long-form content |

**Deliverable:** `CREATIVE_DIRECTION.md` with art direction, motion spec, and style tiles.

---

## 6. Phase 3: Engineering Architecture

### 6.1 Stack (Mandatory)
- **Framework:** Next.js 14+ (App Router) + TypeScript
- **Styling:** Tailwind CSS v3+ with custom design tokens
- **Motion:** GSAP + ScrollTrigger + Lenis + Framer Motion
- **Fonts:** `@import` in `globals.css` with instant fallback stacks
- **Deploy:** Static export (`output: 'export'`)

### 6.2 File Structure
```
project/
├── app/
│   ├── layout.tsx          # Root layout, resilient fonts, metadata
│   ├── page.tsx            # Composed homepage with InteractiveBackground
│   ├── globals.css         # Design tokens, resets, font imports
│   ├── menu/page.tsx       # Dark transparent menu subpage
│   ├── reservations/page.tsx # Interactive reservation subpage
│   ├── locations/page.tsx  # Interactive locations subpage
│   ├── about/page.tsx      # Dark story subpage
│   └── films/page.tsx      # Cinematic media subpage
├── components/
│   ├── ui/
│   │   ├── InteractiveBackground.tsx  # Motion doodles + embers + spotlight
│   │   └── CartDrawer.tsx             # Slide-out quick order drawer
│   └── marketing/
│       ├── Nav.tsx                  # Auto-hiding unboxed navbar
│       ├── Preloader.tsx            # Personalized brand loader
│       ├── SignatureMenu.tsx        # 3D menu cards + quick-view modal
│       ├── HowWeSmash.tsx           # Flat-top temperature simulator
│       ├── RestaurantLocations.tsx  # Cross-fading scroll locations
│       ├── ReservationCTA.tsx       # Multi-step booking pass builder
│       ├── ArchetypeShowcase.tsx    # Bespoke brand archetype showcase
│       └── Footer.tsx               # High-contrast multi-column footer
```

---

## 7. Quality Gates & Anti-Patterns

### 7.1 Quality Verification Gates
- [ ] `npm run build` passes with 0 errors
- [ ] Navigation hides on scroll down and reveals on scroll up
- [ ] Brand name in header is unboxed (no square/rect border)
- [ ] Loading screen is 100% personalized to client brand
- [ ] Background uses continuous dark gradient with motion doodles
- [ ] Sections use transparent glassmorphic layering (no black block cuts)
- [ ] Primary buttons strictly match brand accent color
- [ ] No foggy blur on text; typography is razor-sharp
- [ ] 3D menu modal, craft simulator, and booking pass work interactively

### 7.2 Anti-Patterns (Hard Rejection)
- ❌ Enclosing the header logo in a square or rectangle border
- ❌ Hard rectangular black background cuts between sections
- ❌ Clashing button colors (e.g. yellow buttons on a red theme)
- ❌ Foggy blur filters on readable text
- ❌ Showing another brand's name in the loading screen
- ❌ Broken image URLs or missing fallbacks
- ❌ Any build or TypeScript error

---

## 8. Integrated Design Skills Protocol

Engineers must reference the central skills repository in `artifacts/skills`:
- **`/design-tokens`**: DTCG tokens, color roles, spacing scales
- **`/design-component`**: 8 interactive states (default, hover, active, focus, disabled, loading, error, success)
- **`/design-code`**: 1:1 token-faithful Next.js / Tailwind implementations
- **`/a11y-audit`**: WCAG 2.2 AA contrast (≥4.5:1 text, ≥3:1 UI) and tap targets (≥44px)
- **`/redesign`**: Audit-first upgrade of existing digital products without breaking functionality
