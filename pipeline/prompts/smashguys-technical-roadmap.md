# Smashguys Technical Audit & Strategic Blueprint

> A comprehensive technical audit of `https://www.ferrari.com/en-EN/auto/ferrari-amalfi-spider`
> used as a benchmark for high-end digital craftsmanship, followed by a tailored
> architectural blueprint and phased development roadmap for **Smashguys**.

---

## 1. Technical Audit Report — Ferrari Amalfi Spider

### 1.1 Front-End Framework & Rendering

| Attribute | Finding |
|-----------|---------|
| **Framework** | **Next.js (App Router)** — evidenced by `_next/static/` chunk paths, `pages/_app.js`, and Turbopack-style chunk manifests |
| **Rendering** | Server Components + Client Components hybrid; static asset chunks indicate SSR/SSG with hydration |
| **Bundler** | Webpack 4 runtime (`webpack-4b444dab...`) inside Next.js build pipeline |
| **CSS Strategy** | CSS chunks loaded via `_next/static/css/` with content-hashed filenames; styles injected via JS chunks (`styles.163aedac...`) |
| **Typography** | Custom woff2 fonts (`Ferrari-SansRegular.woff2`, `Ferrari-SansMedium.woff2`) served from `/auto/static/assets/fonts/` |
| **Base Template** | Single-page app shell with route-specific JS bundles (`pages/scheda.js`) |

**Key Insight:** Ferrari uses Next.js App Router with a sophisticated chunk-splitting strategy. CSS is not a single monolithic file but split across route-specific chunks. This enables fast initial paint while deferring non-critical styles.

### 1.2 Motion Design & Animation System

| Attribute | Finding |
|-----------|---------|
| **Animation Library** | **GSAP** (core + ScrollTrigger) — 11 console warnings of `GSAP target not found` indicate heavy scroll-scrubbed animations that race DOM readiness |
| **Scroll Behavior** | ScrollTrigger `scrub` animations tied to section entry/exit; smooth scroll implied by scrub values |
| **Motion Principles** | Parallax reveals, opacity/scale scrub on hero elements, scroll-linked progress indicators |
| **Performance** | Non-blocking warnings suggest animations gracefully handle missing targets (progressive enhancement pattern) |

**Key Insight:** Ferrari's motion system is GSAP-first with ScrollTrigger scrub animations. The 11 warnings are expected in production — they indicate animations attempt to bind before elements mount, then self-correct. This is a deliberate pattern for complex scroll choreography.

### 1.3 Back-End Infrastructure & APIs

| Attribute | Finding |
|-----------|---------|
| **CMS / DAM** | **Thron** (`ferrari-cdn.thron.com`) — Digital Asset Management platform serving images, videos, and playlists |
| **Content API** | `ferrari.com/auto/api/v1/thron/show-contents` — fetches category content by UUID + locale |
| **Playlist API** | `ferrari.com/auto/api/v1/thron/playlist-content` — retrieves curated media playlists by content ID |
| **Image Delivery** | Dynamic breakpoint-based image resizing (`?breakpoint=601&type=original`) |
| **Video Delivery** | Adaptive streaming via `vod-adaptive-ak.vimeocdn.com` (Vimeo OTT integration) |
| **Hosting** | Ferrari CDN + Google Cloud (server-side tagging `eu-7twoo26kcq-ew.a.run.app`) |
| **Edge** | No explicit edge-function evidence in static audit; likely Cloudflare or similar at DNS |

**Key Insight:** Ferrari uses Thron as a headless DAM/CMS. Content is fetched via REST APIs with locale-aware responses. Images are dynamically resized per breakpoint. Video is delivered via Vimeo's adaptive streaming, not self-hosted.

### 1.4 Analytics & Customer Engagement

| Tool | Purpose |
|------|---------|
| **Google Tag Manager** | Tag orchestration hub |
| **GA4** | `G-JM1HT9B412` — primary analytics |
| **Google Ads** | AW-11504941324, AW-821080153, AW-585710765 — conversion tracking |
| **Google Ads RLSA** | AW-621271838, DC-9375614 — remarketing |
| **Facebook Pixel** | `connect.facebook.net/en_US/fbevents.js` |
| **LinkedIn Insight** | `snap.licdn.com/li.lms-analytics/insight.min.js` |
| **TikTok Pixel** | `analytics.tiktok.com` |
| **OneTrust** | Cookie consent management (`cdn.cookielaw.org`) |
| **New Relic** | SPA performance monitoring (`js-agent.newrelic.com`) |
| **ContentSquare** | UX analytics (`csxd.contentsquare.net`) |
| **Genesys Cloud** | Customer service chat widget (`apps.mypurecloud.de`) |

**Key Insight:** Ferrari runs a heavy analytics stack (~15 tracking endpoints). For Smashguys, we should implement a **privacy-first analytics layer** — GA4 essential only, with optional consent-gated marketing pixels.

### 1.5 Information Architecture & Page Structure

```
Ferrari.com (auto section)
├── Home / Landing
├── Model Pages (e.g., /auto/ferrari-amalfi-spider)
│   ├── Superheader (logo, nav)
│   ├── Hero Cover (full-bleed image/video)
│   ├── Gallery Grid (responsive breakpoints: 601, 961)
│   ├── Specs / Tech Section
│   ├── Configurator Integration
│   └── Footer
├── Projects / Showcase
├── About
└── Locations
```

**Key Insight:** Ferrari's IA is **flat and product-centric**. Model pages are long-form landing pages with embedded galleries, specs, and CTAs — no deep navigation hierarchy. This reduces friction for luxury buyers.

### 1.6 Performance & Technical Standards

| Metric | Ferrari Benchmark | Notes |
|--------|------------------|-------|
| **TTI** | < 2s target | Not measured directly; GSAP warnings suggest async animation init |
| **Image Strategy** | Breakpoint-aware CDN delivery | Thron serves optimally sized images per viewport |
| **Video** | Adaptive streaming (Vimeo) | WEBHD quality, lazy-loaded per playlist |
| **Font Loading** | woff2 with preload implied | Custom brand font, likely `font-display: swap` |
| **JS Bundle** | Code-split per route | `_next/static/chunks/` + page-specific bundles |
| **CSS** | Split per route + critical inline | Reduces render-blocking CSS |

---

## 2. Smashguys Strategic Blueprint

### 2.1 Brand Positioning

| Dimension | Specification |
|-----------|---------------|
| **Brand** | Smash Guys — Burger Kitchen (Popo Ventures) |
| **Tier** | High-end casual dining, not fast food |
| **Signature** | Smash burgers, wings, mac & cheese |
| **Geography** | Bangalore, India (Indiranagar, Bellandur, Whitefield) |
| **Audience** | Foodies, young adults (21–35), urban professionals |
| **Voice** | Bold, confident, cinematic, industrial-chic |
| **Goal** | 100 Cr brand — website must feel like a premium destination, not a menu PDF |

### 2.2 Tech Stack Recommendations

**Primary Stack (matches existing Smashguys foundation):**

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 16 (App Router) | Matches Ferrari's architecture; SSR/SSG for SEO + fast TTI |
| **Language** | TypeScript 5.x | Type safety for complex animation/3D logic |
| **Styling** | Tailwind CSS v4 | Rapid UI development, design tokens, responsive utilities |
| **Animation** | GSAP 3 + ScrollTrigger | Ferrari-grade scroll choreography; industry standard for scroll-scrubbed narratives |
| **Smooth Scroll** | Lenis | Inertial scroll physics — essential for cinematic feel |
| **3D / WebGL** | Three.js + @react-three/fiber + @react-three/drei | Reusable 3D components; matches existing Burger3D.tsx pattern |
| **Post-Processing** | @react-three/postprocessing | Bloom, chromatic aberration, vignette for cinematic grading |
| **Motion** | Framer Motion | Micro-interactions, hover states, layout animations |
| **State** | React Context + useState/useReducer | Lightweight; no heavy state library needed |
| **Media** | Next/Image + custom loader | Optimized images with Thron-style breakpoint awareness |
| **Forms** | React Hook Form + Zod | Type-safe form validation for reservations/contact |
| **Maps** | Google Maps Embed API | Location pages with interactive maps |
| **Analytics** | GA4 (consent-gated) + Vercel Analytics | Privacy-first; Ferrari-level insights without bloat |

**Optional Enhancements (Phase 3+):**

| Enhancement | Technology | When |
|-------------|-----------|------|
| **CMS** | Sanity.io or Contentful | When menu/content needs non-technical updates |
| **Ordering** | Embedded iframe (Swiggy/Zomato) or custom flow | Phase 3 |
| **Reservations** | Resy/TableCheck API integration | Phase 3 |
| **3D Models** | Spline or custom GLB burger assemblies | Phase 2 |

### 2.3 Design & Motion System

#### 2.3.1 Visual Language

| Token | Value | Usage |
|-------|-------|-------|
| **Background** | `#050505` (cinema black) | Primary canvas for 3D scene |
| **Primary Accent** | `#FFC800` (golden yellow) | CTAs, highlights, brand moments |
| **Secondary** | `#FAF6F0` (warm cream) | Body text, subtle UI elements |
| **Surface** | `rgba(255,200,0,0.08)` | Glassmorphic cards, overlays |
| **Typography Display** | Anton / custom display | Hero titles, chapter markers |
| **Typography Body** | Space Grotesk / Inter | UI, navigation, body copy |
| **Typography Accent** | Caveat / handwritten | Sticky notes, badges, playful moments |

#### 2.3.2 Motion Principles (Ferrari-Inspired)

**1. Scroll-Scrubbed Narrative**
- Lenis smooth scroll feeds a single `scrollProgress` value (0–1)
- GSAP ScrollTrigger `scrub: 1.2` on hero title (parallax fade + scale)
- ScrollTrigger `scrub: 0.8` on hero content (faster exit)
- Chapter markers update on section enter/exit

**2. Cinematic Chapter Structure**
```
COLD OPEN  →  THE PHILOSOPHY  →  THE SELECTION  →  THE FILMS
                                                         ↓
                                                    THE MENU
                                                         ↓
                                                   LOCATIONS
                                                         ↓
                                                     CLOSE
```
Each chapter has:
- A unique camera waypoint (3D scene)
- A lighting mood shift
- A narrative beat (typography reveal)
- A scroll-triggered transition

**3. 3D Scene Architecture**
- Fixed full-viewport WebGL canvas at `z-0`
- HTML sections as transparent overlays at `z-10`
- Camera follows CatmullRomCurve3 spline with 7 waypoints
- 10+ playful geometries along the path (torus knots, icosahedrons, etc.)
- Particle field (1000+ particles) with additive blending
- Wireframe grid floor
- 5-point lighting rig with warm tones
- Post-processing: Bloom, ChromaticAberration, Vignette, ACES Filmic

**4. Micro-Interactions**
- **Custom Cursor:** Triple-layer (dot + ring + trail), expands on hover
- **Magnetic Buttons:** GSAP-powered magnetic pull on CTAs
- **Film Preloader:** Curtain reveal with brand lockup + particle burst
- **Hover States:** Glow trails, scale transforms, color shifts

#### 2.3.3 Page Transition System

| Transition | Trigger | Effect |
|-----------|---------|--------|
| **Entrance** | Page load | Film preloader → curtain reveal → brand lockup → fade to hero |
| **Chapter Change** | ScrollTrigger section enter | Hero title parallax out, new section slides up from `y: -120px` |
| **Menu Hover** | Card hover | 3D tilt, glow border, image scale |
| **CTA Click** | Button interaction | Magnetic pull + ripple + navigation |

### 2.4 Content & Asset Strategy

#### 2.4.1 Asset Hierarchy

| Asset Type | Source | Optimization |
|-----------|--------|-------------|
| **Hero Images** | Professional food photography | WebP/AVIF, lazy load, `srcset` per breakpoint |
| **3D Models** | Custom GLB / procedural geometries | Compressed draco, LOD system |
| **Video** | Professional B-roll (kitchen, sizzle) | Vimeo adaptive or self-hosted MP4 with `preload="metadata"` |
| **Icons** | SVG sprites | Inline for critical icons, sprite for others |
| **Fonts** | Google Fonts + custom woff2 | `font-display: swap`, preload critical weights |

#### 2.4.2 Digital Artifacts

- **Burger 3D Model:** Interactive rotatable model in hero (existing `Burger3D.tsx`)
- **Exploded View:** Animated burger assembly on scroll (existing `ExplodedBurger.tsx`)
- **Film Strip:** Decorative horizontal scroll element (existing `FilmStrip.tsx`)
- **Sticker System:** Draggable branded stickers for playful interaction (existing `DraggableStickers.tsx`)

### 2.5 Site Hierarchy & Functional Specifications

#### 2.5.1 Home Page — Immersive Landing

```
┌─────────────────────────────────────────────┐
│  FIXED: 3D WebGL Canvas (z-0)               │
│  ┌───────────────────────────────────────┐   │
│  │  Film Preloader (curtain reveal)       │   │
│  │  → Brand lockup: "SMASH GUYS"         │   │
│  │  → Particle burst + ambient glow      │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  OVERLAY (z-10):                             │
│  ┌───────────────────────────────────────┐   │
│  │  HERO CHAPTER                         │   │
│  │  ┌─────────┐  ┌──────────────────┐   │   │
│  │  │ SMASH    │  │  3D Burger       │   │   │
│  │  │ GUYS     │  │  (mouse-reactive)│   │   │
│  │  │ Kitchen  │  │                  │   │   │
│  │  └─────────┘  └──────────────────┘   │   │
│  │  [Explore] [Order Now]                 │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │  PHILOSOPHY CHAPTER                   │   │
│  │  "Started with a simple idea..."       │   │
│  │  Parallax image + kinetic text         │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │  SELECTION CHAPTER                    │   │
│  │  Famous dishes grid                   │   │
│  │  - Smash Burger                       │   │
│  │  - Wings                              │   │
│  │  - Mac & Cheese                       │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │  THE FILMS CHAPTER                    │   │
│  │  Horizontal scroll film strip         │   │
│  │  Video reels of food preparation       │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │  MENU CHAPTER                         │   │
│  │  Horizontal scroll menu cards          │   │
│  │  Category tabs: Burgers | Wings | Sides│   │
│  │  Price + description + hover 3D        │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │  LOCATIONS CHAPTER                    │   │
│  │  3 location cards:                    │   │
│  │  - Indiranagar                        │   │
│  │  - Bellandur (Ecoworld)               │   │
│  │  - Whitefield (Miraya Rose)           │   │
│  │  Embedded Google Maps                 │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │  CLOSE / CTA                          │   │
│  │  "Order Now" + social links           │   │
│  │  Instagram / YouTube / Delivery links  │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  FOOTER                                      │
│  © Smash Guys | Popo Ventures               │
└─────────────────────────────────────────────┘
```

**Functional Specs:**
- **Entrance:** Film preloader with curtain animation → brand reveal → auto-scroll to hero
- **Hero:** 3D burger model rotates with mouse; title splits and parallax on scroll; chapter indicator fixed right
- **Philosophy:** Full-bleed image with kinetic text reveal; scroll-driven opacity
- **Selection:** 3-column grid with hover tilt + glow; lazy-loaded images
- **Films:** Horizontal scroll section with video thumbnails; play on hover
- **Menu:** Category filter (client-side); horizontal scroll cards; price highlights
- **Locations:** Card grid with embedded maps; "Get Directions" CTAs
- **Close:** Final CTA with marquee + social proof

#### 2.5.2 Menu Page — High-Performance Discovery

- **Route:** `/menu`
- **Layout:** Full-screen horizontal scroll with Lenis
- **Categories:** Burgers, Wings, Sides, Drinks, Combos
- **Cards:** Large image + name + price + description + spice level indicator
- **Interactions:** Hover = 3D tilt + glow + image scale; click = quick view modal
- **Filters:** Animated tab bar with GSAP indicator
- **Performance:** Virtualized horizontal list if > 50 items

#### 2.5.3 Contact & Conversion Page

- **Route:** `/contact` or inline section
- **Components:**
  - Location selector (3 cards with map embeds)
  - Reservation form (name, date, time, party size, location)
  - Direct order links (Swiggy/Zomato iframe or deep links)
  - Customer service chat (Genesys-style, lightweight)
  - Newsletter signup (email + consent)
- **Conversion Flow:**
  1. User lands on page
  2. Chooses nearest location (auto-detect via IP or manual select)
  3. Clicks "Order Online" → opens delivery platform
  4. Or "Reserve Table" → form → confirmation
  5. "Call Us" → tel: link + WhatsApp deep link

---

## 3. Brand Integration

### 3.1 Visual Identity System

| Element | Specification |
|---------|--------------|
| **Logo** | "SMASH GUYS" in Anton (display) + "Burger Kitchen" in Caveat (accent) |
| **Color Primary** | `#FFC800` — golden yellow, used for CTAs, highlights, active states |
| **Color Secondary** | `#FAF6F0` — warm cream, used for body text, subtle UI |
| **Color Background** | `#050505` — cinema black, primary canvas |
| **Color Surface** | `rgba(255,200,0,0.06)` — gold-tinted glass cards |
| **Typography Scale** | Hero: `9rem` / Section: `5rem` / Heading: `3rem` / Body: `1.125rem` |
| **Spacing Scale** | 4px base; sections use `min-h-screen` with `py-24` |
| **Border Radius** | `2.5rem` (hero shapes), `1.5rem` (cards), `9999px` (pills) |
| **Shadows** | Colored glows (`shadow-[0_0_120px_rgba(255,200,0,0.08)]`) |

### 3.2 Content Architecture

| Section | Content | Asset Needs |
|---------|---------|-------------|
| **Hero** | Tagline: "Bangalore's Premier Burger House" + brand story snippet | 3D burger model, gradient shapes |
| **Philosophy** | "Built in public" narrative; YouTube journey reference | Kitchen/bts photography |
| **Selection** | 3 signature items with descriptions | Food photography (hero shots) |
| **Films** | 3-5 video reels (prep, sizzle, ambiance) | Professional video content |
| **Menu** | Full menu with prices | Item photography, icons |
| **Locations** | 3 addresses with maps | Store photography, map embeds |
| **Close** | Social proof + CTA | Logo lockup, social icons |

### 3.3 Imagery Guidelines

- **Style:** Cinematic, warm lighting, shallow depth of field
- **Treatment:** Slight desaturation + golden overlay for consistency
- **Format:** WebP primary, JPEG fallback
- **Breakpoints:** 601px (mobile), 961px (tablet), 1440px (desktop)
- **Aspect Ratios:** 16:9 hero, 4:5 menu cards, 1:1 social

---

## 4. Development Roadmap

### Phase 1: Foundation & Core Experience (Weeks 1–3)

**Goal:** Rebuild the Smashguys site with Ferrari-grade architecture and cinematic motion.

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| **1** | Architecture Setup | Next.js 16 + TS + Tailwind v4 + GSAP + Lenis + R3F scaffold |
| **1** | Design System | Token system (colors, typography, spacing, shadows) in `globals.css` |
| **2** | 3D Scene Core | `Hero3D.tsx` — CatmullRomCurve3 camera, particle field, lighting rig |
| **2** | Scroll System | LenisProvider with `onScroll` callback; `scrollProgress` context |
| **2** | Film Preloader | `FilmPreloader.tsx` — curtain reveal with brand lockup |
| **3** | Hero Section | Typography reveal, 3D burger integration, chapter indicator |
| **3** | Navigation | Fixed nav with scroll-aware transparency |

**Acceptance Criteria:**
- `npm run build` passes cleanly (static export)
- Lenis smooth scroll at 60fps
- 3D scene renders with post-processing (Bloom + Vignette)
- Film preloader completes in < 3s
- Lighthouse Performance > 90

### Phase 2: Content Sections & Scroll Narrative (Weeks 4–6)

**Goal:** Implement all content chapters with Ferrari-level scroll choreography.

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| **4** | Philosophy Section | Full-bleed image + kinetic text reveal + parallax |
| **4** | Selection Section | 3-column grid with hover tilt + lazy-loaded images |
| **5** | Films Section | Horizontal scroll with video thumbnails |
| **5** | Menu Section | Category tabs + horizontal scroll cards + pricing |
| **6** | Locations Section | Card grid + Google Maps embeds + CTA buttons |
| **6** | Footer | Multi-column with social links + newsletter |

**Acceptance Criteria:**
- All sections have transparent backgrounds (3D canvas visible behind)
- GSAP ScrollTrigger scrub animations on all major elements
- Horizontal scroll sections work with Lenis
- Images lazy-load with blur-up placeholder
- No console errors (GSAP warnings acceptable)

### Phase 3: Polish, Performance & Conversion (Weeks 7–8)

**Goal:** Ferrari-grade polish, performance optimization, and conversion features.

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| **7** | Post-Processing | Bloom intensity, chromatic aberration, vignette tuning |
| **7** | Custom Cursor | Triple-layer cursor with hover expansion |
| **7** | Magnetic Buttons | GSAP magnetic pull on all CTAs |
| **8** | Analytics Layer | GA4 + Vercel Analytics + consent management |
| **8** | SEO & Meta | Dynamic meta tags, Open Graph, structured data |
| **8** | Performance Audit | Lighthouse CI, image optimization, bundle analysis |

**Acceptance Criteria:**
- Lighthouse Performance > 95, Accessibility > 90
- Bundle size < 200KB initial JS (gzipped)
- All images optimized (WebP, srcset)
- GA4 events firing correctly
- Mobile responsive (375px – 1440px)

### Phase 4: Advanced Features (Weeks 9–12)

**Goal:** High-end features that differentiate from competitors.

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| **9** | 3D Menu Explosion | `ExplodedBurger.tsx` — scroll-driven burger assembly |
| **9** | Sticker System | `DraggableStickers.tsx` — playful brand interaction |
| **10** | Reservation System | Form with validation + confirmation flow |
| **10** | Order Integration | Deep links to Swiggy/Zomato + iframe preview |
| **11** | CMS Integration | Sanity.io schema for menu/locations/content |
| **12** | Final QA & Launch | Cross-browser testing, accessibility audit, production deploy |

**Acceptance Criteria:**
- Reservation form submits to backend (mock or real)
- Order CTAs open correct delivery platform
- CMS content updates reflect without redeploy
- A11y: WCAG 2.1 AA compliant
- Cross-browser: Chrome, Firefox, Safari, Edge (latest 2 versions)

---

## 5. Technical Standards Matrix

| Standard | Ferrari Benchmark | Smashguys Target |
|----------|------------------|------------------|
| **Framework** | Next.js App Router | Next.js 16 App Router |
| **Animation** | GSAP + ScrollTrigger scrub | GSAP + ScrollTrigger + Framer Motion |
| **Scroll Physics** | Native + GSAP smoothing | Lenis inertial scroll |
| **3D** | None (static site) | Three.js + R3F + postprocessing |
| **Media CDN** | Thron DAM | Next/Image + Vercel Blob / Cloudflare R2 |
| **Video** | Vimeo adaptive | Vimeo or self-hosted MP4 |
| **Analytics** | GA4 + 15+ endpoints | GA4 essential + consent-gated optional |
| **Performance** | < 2s TTI | < 2s TTI, Lighthouse > 90 |
| **Accessibility** | Not audited | WCAG 2.1 AA |
| **Mobile** | Responsive (601/961 breakpoints) | Mobile-first, 375px – 1440px |

---

## 6. Risk Mitigation & Constraints

| Risk | Mitigation |
|------|-----------|
| **3D Performance on Mobile** | Fallback to 2D frame sequence or static image; `prefers-reduced-motion` respect |
| **Bundle Size Bloat** | Dynamic imports for 3D components; route-based code splitting; tree-shaking |
| **Content Freshness** | CMS integration in Phase 4; static export for initial launch |
| **Third-Party Dependency** | Minimal tracking stack; all optional with consent gates |
| **Browser Compatibility** | Target latest 2 versions of Chrome, Firefox, Safari, Edge; graceful degradation |

---

## 7. Appendix: Ferrari Network Request Breakdown

### Static Assets (68 requests)
- CSS: 2 chunks (`styles.e3095f84.chunk.css`, `c9c6d070...chunk.css`)
- JS: 20+ chunks (framework, commons, page-specific, styles)
- Images: 15+ responsive images via Thron CDN
- Fonts: 2 woff2 files (Ferrari-SansRegular, Ferrari-SansMedium)

### Dynamic API Calls
- `thron/show-contents` — category content by UUID + locale
- `thron/playlist-content` — video playlist by content ID
- `thron/xcontents/resources/delivery/getContentDetail` — individual content metadata

### Third-Party Integrations
- **Analytics:** GA4, Google Ads (4 IDs), Facebook Pixel, LinkedIn, TikTok
- **Consent:** OneTrust cookie management
- **Support:** Genesys Cloud customer chat
- **Monitoring:** New Relic SPA, ContentSquare UX, server-side tagging (GCP Cloud Run)

---

*Document generated as part of the Smashguys redesign pipeline.*
*Reference: Ferrari Amalfi Spider technical audit + Smashguys brand materials.*
