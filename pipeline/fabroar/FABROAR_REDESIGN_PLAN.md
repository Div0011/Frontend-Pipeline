# Fabroar — Cinematic Minimalist Redesign Plan
*Version 2.0 — Enhanced*

> **Objective:** Transform fabroar.com from a standard WooCommerce retail store into a cinematic, minimalistic, high-end professional business platform. Preserve all existing content and imagery while introducing a premium custom T-shirt ordering experience. This plan draws from **Genre 0** (Cinematic Without Generated Media) and selected cross-site Innovation Recipes from the Design Reference Archive.

---

## 1. Current Site Audit

### 1.1 Brand & Positioning
- **Brand:** Fabroar — graphic printed pure cotton T-shirts for Men & Women
- **Price Range:** ₹299 – ₹549
- **Current Tech:** WordPress + WooCommerce + Avada theme
- **Social:** Facebook, Instagram (@fabroarstore)
- **Contact:** info@fabroar.com, +91 9695106107

### 1.2 Existing Content Inventory

| Section | Current State | Assets to Preserve |
|---------|--------------|-------------------|
| **Navigation** | Home, Men, Women, Contact, Login | Logo, menu structure |
| **Homepage** | Product grid, featured items | All product images (~20+ SKUs), prices |
| **Men Category** | 12 products, size variants | Product images, categories |
| **Women Category** | 10 products, size variants | Product images, categories |
| **About** | Brand story, signature image, shop categories, newsletter | Signature image, category icons |
| **Contact** | Form, banner image, payment badges, social links | Banner image, payment icons, form fields |
| **Product Pages** | Gallery, size chart, add-to-cart, related products | All product images, care instructions |
| **Footer** | Links, social icons, copyright | Facebook/Instagram icons |

### 1.3 UX Pain Points (Current)
- Standard WooCommerce grid feels transactional, not editorial
- No visual hierarchy or storytelling; zero scroll pacing or rhythm
- Product pages lack immersive presentation or art direction
- Customization is non-existent — a significant unmet demand signal
- Mobile experience is generic theme output with no intentional framing
- Typography is browser-default; no typographic personality
- Image treatment is inconsistent — no unified visual grade across photos

---

## 2. Design Direction: Cinematic Minimalism

### 2.1 Aesthetic Definition
Drawing from the **Genre 0** philosophy (cinematic without generated media):

> *"Cinematic is a quality of restraint and pacing, not a media type."*

A film feels cinematic because of pacing, restraint, and intentional framing — not expensive footage. Every decision here flows from that principle.

**Core Principles:**

| Principle | Application |
|-----------|-------------|
| **Pacing** | One idea revealed at a time. Single-column layouts with staged scroll reveals. Content "arrives late" — silence before the statement. |
| **Restraint** | Every element earns its place. No decorative gradients. One accent color. When in doubt, remove — not add. |
| **Intentional Framing** | Every crop, every negative-space choice, every type placement looks chosen, not default. Art direction with a point of view. |
| **Chapter Structure** | Cold open → brand statement → products → philosophy quote → customize CTA → close. Scroll has a narrative shape. |

### 2.2 Visual Language

| Element | Treatment |
|---------|-----------|
| **Background** | Warm off-white `#fafaf9` (light) or deep void `#0a0a0a` (dark) — no middle gray, no safe neutral |
| **Typography — Display** | *Playfair Display* (editorial serif) for emotionally charged hero statements |
| **Typography — UI** | *Space Grotesk* (modern geometric) for labels, navigation, metadata |
| **Typography — Body** | *Inter* for readable body text; tight tracking for luxury feel |
| **Accent** | Amber/Gold `#c9a96e` — used sparingly for CTAs, active states, and one accent moment per section |
| **Imagery** | Uniform duotone (`#c9a96e` overlay at 30% opacity via `mix-blend-mode: multiply`) or B&W; consistent CSS `filter: contrast(1.08) saturate(0.85)` applied globally |
| **Motion** | Scroll-scrubbed reveals (40–80ms stagger offsets, `expo.out` easing). No bounce, no elastic. |
| **Custom Cursor** | Desktop-only. Expands + shows contextual label on hover over product cards and CTAs. Returns to dot when idle. |
| **Layout** | 12-column asymmetric grid. Products at 40–60% viewport rather than 100%, so space does framing work. |
| **Texture** | SVG film grain overlay (fixed, `pointer-events: none`, 4% opacity) — identical to SFUMATO implementation |
| **Masking** | Product images with `clip-path` shapes (parallelogram, organic pill) to signal art direction |

### 2.3 Reference Alignment

| Reference | What to Extract |
|-----------|----------------|
| **Hadaka** (hadaka.jp) | Extreme reduction, intentional negative space, "no hero explanation" — site speaks through product |
| **1 Place Vendôme** | Image showcases interrupted by poetic quote text; jewel-tone amber accent; minimal chrome |
| **L'Oréal Mediaroom** | Restrained palette with strategic accent, premium typographic hierarchy |
| **Obys Agency** | Typography-led motion — type carrying drama without WebGL; editorial grid as structure |
| **SFUMATO** | Scroll-scrubbed background color morph, horizontal film reel, grain overlay, custom cursor states |
| **Canals Amsterdam** | Atmospheric color grading, layered depth, typography as navigation anchor |

### 2.4 Recipe: E-commerce Product as Art
*(Recipe J from Design Reference Archive)*

- **Base:** 1 Place Vendôme's luxury restraint + Moon On My Wall's product showcase
- **Add:** SFUMATO's scroll choreography + Hadaka's Japanese minimalism
- **Result:** Product pages where specifications become storytelling; choosing a size feels deliberate and premium

---

## 3. Design System: Tokens & Typography

### 3.1 Color Tokens

```css
:root {
  /* Backgrounds */
  --color-void:      #0a0a0a;
  --color-surface:   #fafaf9;
  --color-surface-2: #f2f0ed;
  --color-border:    #e8e4df;

  /* Text */
  --color-ink:       #111110;
  --color-ink-muted: #6b6863;
  --color-ink-dim:   #a8a39d;

  /* Brand Accent */
  --color-amber:     #c9a96e;
  --color-amber-dim: rgba(201,169,110,0.15);

  /* States */
  --color-success:   #4a7c59;
  --color-error:     #c0392b;
}

[data-theme="dark"] {
  --color-surface:   #0a0a0a;
  --color-surface-2: #141413;
  --color-border:    #1e1d1b;
  --color-ink:       #f5f3f0;
  --color-ink-muted: #918d88;
}
```

### 3.2 Typography Scale

```css
/* Preload: Playfair Display 400/700, Space Grotesk 300/400/500, Inter 400/500 */
:root {
  --type-display-xl:  clamp(4rem, 12vw, 14rem);   /* Hero wordmark */
  --type-display-lg:  clamp(2.5rem, 6vw, 7rem);   /* Section title */
  --type-display-md:  clamp(1.5rem, 3vw, 3.5rem); /* Quote / Subheading */
  --type-label-lg:    0.875rem; /* Nav items, category labels */
  --type-label-sm:    0.75rem;  /* Metadata, badges */
  --type-body:        1rem;
  --type-body-sm:     0.875rem;

  --tracking-display: -0.03em; /* Tight — editorial feel */
  --tracking-label:    0.12em; /* Wide — uppercase labels */
  --tracking-body:    -0.01em;

  --leading-display:  0.95;
  --leading-body:     1.6;
}
```

### 3.3 Motion Tokens

```css
:root {
  /* Easing — never use default ease-in-out */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-expo:   cubic-bezier(0.7, 0, 0.84, 0);

  /* Durations */
  --dur-fast:   200ms;
  --dur-normal: 400ms;
  --dur-slow:   700ms;
  --dur-xslow:  1100ms;

  /* Stagger offsets */
  --stagger-sm: 40ms;
  --stagger-md: 80ms;
  --stagger-lg: 120ms;

  /* GSAP scrub values */
  --scrub-tight:  0.6;
  --scrub-normal: 1.2;
  --scrub-loose:  2;
}

@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

### 3.4 Spacing & Layout

```css
:root {
  --grid-cols: 12;
  --gutter: clamp(1rem, 3vw, 2.5rem);
  --section-gap: clamp(5rem, 12vw, 14rem);
  --container-max: 1440px;
  --container-md: 900px;
  --container-sm: 640px;
}
```

---

## 4. Site Architecture

### 4.1 Page Structure

```
/                          — Cinematic cold-open hero + featured collection
/men                      — Editorial product grid (Men)
/women                    — Editorial product grid (Women)
/customize                — NEW: Custom T-shirt studio
/product/[slug]           — Immersive product detail with size selector
/cart                     — Minimal slide-out cart drawer
/checkout                 — Multi-step secure checkout
/about                    — Brand story with signature reveal
/contact                  — Minimal contact with map + form
/login                    — OTP-based auth (preserve existing flow)
/my-account               — Order history + customization orders
/legal/privacy            — Privacy policy (SEO + trust)
/legal/returns            — Return & refund policy
```

### 4.2 Component Architecture

```
src/
├── app/
│   ├── layout.tsx              — Global layout: grain, cursor, Lenis, theme provider
│   ├── page.tsx                — Homepage
│   ├── men/page.tsx
│   ├── women/page.tsx
│   ├── customize/page.tsx
│   ├── product/[slug]/
│   │   ├── page.tsx
│   │   └── loading.tsx         — Skeleton state
│   ├── checkout/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── legal/[doc]/page.tsx
│
├── components/
│   ├── ui/
│   │   ├── GrainOverlay.tsx    — SVG noise, fixed, pointer-events:none
│   │   ├── CustomCursor.tsx    — Data-attribute-driven, expands + labels
│   │   ├── MagneticButton.tsx  — Mouse-position magnetic pull
│   │   ├── ScrollProgress.tsx  — Thin amber line at top
│   │   ├── LenisProvider.tsx   — Smooth scroll context
│   │   ├── ThemeToggle.tsx     — Light / Dark mode
│   │   ├── NavigationBar.tsx   — Minimal fixed nav
│   │   ├── CartDrawer.tsx      — Slide-out right panel
│   │   ├── SizeGuideModal.tsx  — Expandable measurement table
│   │   └── Toast.tsx           — Amber toast for cart/error feedback
│   │
│   ├── sections/
│   │   ├── CinematicHero.tsx   — Cold-open: wordmark reveal + single CTA
│   │   ├── EditorialGrid.tsx   — Asymmetric 2/3-column product layout
│   │   ├── FilmReel.tsx        — Horizontal scroll pinned gallery
│   │   ├── QuoteReveal.tsx     — Scroll-triggered poetic quote
│   │   ├── CategoryLinks.tsx   — Minimal Men / Women / Customize links
│   │   ├── NewsletterStrip.tsx — Single-field, amber submit
│   │   ├── BrandStory.tsx      — About: signature image + chapter text
│   │   └── ContactSection.tsx  — Form + map embed
│   │
│   ├── product/
│   │   ├── ProductCard.tsx     — Grid card: duotone image, hover reveal
│   │   ├── ProductGallery.tsx  — Full-bleed stacked image scroll
│   │   ├── SizeSelector.tsx    — Magnetic size cards
│   │   ├── AddToCartButton.tsx — Fill animation on submit
│   │   └── RelatedProducts.tsx — Horizontal scroll strip
│   │
│   └── customize/
│       ├── ShirtConfigurator.tsx
│       ├── ColorPicker.tsx
│       ├── SizeSelector.tsx
│       ├── FileUploadZone.tsx
│       ├── DesignCanvas.tsx    — Canvas compositing: shirt + design overlay
│       ├── PriceCalculator.tsx — Animated number roll-up
│       └── CheckoutFlow.tsx
│
├── lib/
│   ├── products.ts             — Product data + WooCommerce adapter
│   ├── customization.ts        — Custom order schema + validation
│   ├── payments.ts             — Razorpay + Stripe integration
│   ├── analytics.ts            — GA4 + Meta Pixel event tracking
│   ├── animations.ts           — Shared GSAP timelines + ScrollTrigger helpers
│   └── utils.ts                — Classnames, formatting, image helpers
│
├── hooks/
│   ├── useCart.ts              — Zustand cart state
│   ├── useCustomization.ts     — Zustand customization state
│   ├── useScrollProgress.ts    — Reading Lenis scroll offset
│   ├── useReducedMotion.ts     — Respects prefers-reduced-motion
│   └── useCursorState.ts       — Cursor mode/label management
│
└── styles/
    ├── globals.css             — Tokens, resets, typography, utilities
    └── animations.css          — Keyframe definitions
```

---

## 5. Scroll Choreography & Animation Blueprint

### 5.1 Homepage Scroll Narrative
*(Modelled on SFUMATO's chapter-paced scroll narrative)*

| Scroll Depth | Section | Animation Trigger |
|-------------|---------|-------------------|
| `0%` | **Cold Open Hero** | Page load: wordmark letter-by-letter reveal (stagger 40ms); grain overlay fades in; cursor initializes |
| `5–20%` | **Hero exits** | Wordmark scales `1→1.05` and fades out; background morphs from `#fafaf9` to `#0f0e0d` |
| `20–45%` | **Featured Products** | Asymmetric grid slides up with staggered reveals (80ms offset); duotone filter fades in on images |
| `45–50%` | **Quote Reveal** | Word-by-word: `opacity: 0, y: 30 → opacity: 1, y: 0`, expo.out |
| `50–70%` | **Film Reel** | Horizontal scroll pinned; images parallax `x: -20px → +20px` relative to scroll |
| `70–80%` | **Category Links** | Three-column links split-reveal from center |
| `80–90%` | **Newsletter** | Single-field fades and slides up |
| `90–100%` | **Footer** | Clean fade-in; background returns to `#fafaf9` |

### 5.2 Signature Moments

| Moment | Component | Implementation |
|--------|-----------|----------------|
| **Cold-open wordmark** | `CinematicHero` | `gsap.from('.letter', { opacity: 0, y: '1em', stagger: 0.04, ease: 'expo.out' })` on load (300ms delay) |
| **Background color morph** | `LenisProvider` + GSAP | `gsap.to('[data-bg]', { backgroundColor: ... })` scrubbed 1:1 with Lenis scroll progress |
| **Film grain overlay** | `GrainOverlay` | SVG `feTurbulence` noise data URI, `@keyframes grain` at 8fps |
| **Horizontal film reel** | `FilmReel` | `gsap.to('.reel-track', { x: '-60%', scrollTrigger: { pin: true, scrub: 1.2 } })` |
| **Product card hover** | `ProductCard` | Scale `1→1.03`, cursor expands to show "View" label, duotone filter eases off |
| **Magnetic CTA** | `MagneticButton` | `mousemove` → `gsap.to(el, { x: dx*0.4, y: dy*0.4 })`, `mouseleave` → reset with `elastic.out` |
| **Price number roll** | `PriceCalculator` | GSAP counter via `Object { val: current }` → target, formatted with `Intl.NumberFormat` |
| **Cart add success** | `AddToCartButton` | Width fills left-to-right in 600ms, then checkmark morphs via SVG path animation |
| **Step progression** | `CheckoutFlow` | Thin amber `::after` pseudo-element widens as steps complete |

### 5.3 Reduced-Motion Fallback
All GSAP animations check `useReducedMotion()`. When `true`:
- Skip transform animations; use opacity-only transitions at 200ms
- Disable horizontal scroll film reel — show static 2-column grid instead
- Disable background color morph — set static background
- Preserve all functional interactions (cart, checkout, upload)

---

## 6. Page-by-Page Design Specifications

### 6.1 Homepage

```
┌─────────────────────────────────────────────┐
│  FABROAR                         ⊕ Cart (0) │  ← Fixed nav: transparent → frosted on scroll
├─────────────────────────────────────────────┤
│                                             │
│           F A B R O A R                     │  ← 12vw Playfair, letter-by-letter reveal
│           Wear Your Story                   │     on load (300ms delay)
│                                             │
│         [ Explore Collection → ]            │  ← Magnetic CTA, amber underline
│         ↓ Scroll                            │  ← Minimal indicator, fades after 5%
├─────────────────────────────────────────────┤
│   Featured                                  │  ← Asymmetric 2-col: large left, tall right
│   ┌──────────────┐   ┌──────────────────┐   │     Stagger enter from bottom (80ms offset)
│   │  Product 1   │   │   Product 2      │   │     Duotone filter; hover: color reveal
│   │  (Large)     │   │   (Tall)         │   │
│   └──────────────┘   └──────────────────┘   │
│   + 4 more products in 3-column row below   │
├─────────────────────────────────────────────┤
│   "Clothing is the canvas of identity."     │  ← Word-by-word Playfair quote reveal
├─────────────────────────────────────────────┤
│   New Arrivals ────────────────────────     │  ← Pinned horizontal scroll film reel
│   [Product] [Product] [Product] [Product]   │     Parallax X on images within cards
├─────────────────────────────────────────────┤
│   MEN          WOMEN        CUSTOMIZE       │  ← 3-col category links, amber hover
│   12 styles    10 styles    Your Design     │
├─────────────────────────────────────────────┤
│   Stay in the story.                        │  ← Newsletter strip
│   [your@email.com              → ]          │
├─────────────────────────────────────────────┤
│  FABROAR  ©2025  Privacy  Returns           │  ← Minimal footer
│  Instagram  Facebook                        │
└─────────────────────────────────────────────┘
```

**Navigation Detail:**
- Logo: Left-aligned, `Space Grotesk 500`, letter-spaced `0.15em`
- Nav links: Hidden on mobile → hamburger slide-in panel
- Cart icon: Custom glyph, count badge in amber
- Background: `transparent` on hero, morphs to `rgba(250,250,249,0.85) + backdrop-filter: blur(12px)` after 5% scroll

### 6.2 Collection Pages (Men / Women)

```
┌─────────────────────────────────────────────┐
│   MEN                              12 Items │  ← 8vw Playfair; item count right-aligned
│  Sort: [Price ↕] [Newest] [Popular]         │  ← Filter bar, amber active underline
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │  ← 3-col desktop, 2-col tablet, 1-col mobile
│  │ T-Shirt  │ │ T-Shirt  │ │ T-Shirt  │    │     4:5 ratio, duotone, staggered reveal
│  │ Name ₹449│ │ Name ₹549│ │ Name ₹349│    │     No card border; name + price below
│  └──────────┘ └──────────┘ └──────────┘    │
│  [Load More]                                │  ← Amber text button
└─────────────────────────────────────────────┘
```

### 6.3 Product Detail Page

```
┌─────────────────────────────────────────────┐
│  ← Men (breadcrumb)                         │
│   ┌─────────────────────────┐  │ Name       │  ← 60/40 split desktop
│   │    Product Image        │  │ ₹449       │  ← Price: 3rem Space Grotesk
│   │    Duotone → hover      │  │ Pure Cotton│  ← Sub-spec: muted
│   │    removes filter       │  │ Regular Fit│
│   │    (color reveal)       │  │            │
│   └─────────────────────────┘  │ [S][M][L][XL][XXL] ← Magnetic size chips
│   Additional images below      │ [Size Guide ↗]     ← Opens modal
│                                │ [Add to Cart ─────] ← Fill animation
│                                │ [Customize This →]  ← Amber link
│                                │ 🔒 Secure · 🚚 Free ₹499+ · ↩️ 7-day returns
├─────────────────────────────────────────────┤
│ Details                     Care             │  ← Accordion
│ You May Also Like                            │  ← Horizontal scroll strip
└─────────────────────────────────────────────┘
```

**Product Image Gallery:**
- First image: full-height, duotone. Hover = color reveal moment
- Secondary images stacked below; swipe carousel on mobile
- Zoom on click: `object-fit: contain` in native `<dialog>` (no library)

### 6.4 Custom Studio Page

```
┌─────────────────────────────────────────────┐
│  ← Studio         Design Your Tee      Cart │
│  [●]── ── ── ── ─   BASE / DESIGN / SIZE / REVIEW │
├─────────────────────────────────────────────┤
│   ┌──────────────────┐  ┌─────────────────┐ │
│   │   SHIRT PREVIEW  │  │ STEP 1: Base    │ │
│   │   (Design canvas)│  │ Style ○○○○      │ │
│   │   [Front][Back]  │  │ Color ●○○○○○    │ │
│   └──────────────────┘  │ Base Price: ₹599│ │
│                          └─────────────────┘ │
│  STEP 2: Design Upload                      │
│  ┌─── ⬆ Drag & Drop · PNG/JPG/SVG/WEBP ───┐ │
│  └────────────────────────────────────────┘ │
│  Placement [Left Chest ▾]  Scale [────●──]  │
│  Rotate [0°][90°][180°][270°]               │
├─────────────────────────────────────────────┤
│  Base: ₹599  Print: ₹150  Total: ₹749       │  ← Sticky bottom bar
│                         [ Add to Cart → ]   │
└─────────────────────────────────────────────┘
```

### 6.5 About Page

```
┌─────────────────────────────────────────────┐
│   We make clothes for people                │  ← 8vw Playfair, line-by-line scroll reveal
│   who have something to say.                │
│   ┌─────────────────────────────────────┐   │  ← Signature image: clip-path wipe reveal
│   │  (parallelogram crop, brand image)  │   │
│   └─────────────────────────────────────┘   │
│   Brand story paragraphs (word-group fade)  │
│   MEN · WOMEN · CUSTOMIZE category icons    │
│   info@fabroar.com · +91 9695106107         │
└─────────────────────────────────────────────┘
```

### 6.6 Cart Drawer
- Slides in from right: `translateX(100% → 0)`, `ease-out-expo`, 400ms
- Backdrop: `rgba(0,0,0,0.4)`, click closes
- Line items: thumbnail (60×60), name, size, price, quantity stepper, remove ×
- Summary: subtotal, delivery note, amber "Checkout →" full-width button
- Empty state: "Your cart is empty. Start exploring →"

---

## 7. Custom T-Shirt Module: Complete UX Flow

### 7.1 User Journey Map

```
DISCOVER → CONFIGURE → DESIGN → SIZE → PREVIEW → CHECKOUT → CONFIRM
```

**Entry Points:** Hero CTA "Create Your Own" · Nav "Custom Studio" · Product page "Customize This →"

### 7.2 Step-by-Step Flow

#### Step 1: Base Selection
- **Style:** Classic Crewneck M/W · Oversized Unisex · Slim M · Relaxed W
- **Color:** 6 curated neutrals — Obsidian `#1a1a1a`, Bone `#f5f0e8`, Sage `#8a9e8d`, Terracotta `#c4714a`, Indigo `#3d4f7c`, Sand `#d4c4a0`
- **Live preview** updates instantly; "From ₹599" displayed dynamically

#### Step 2: Design Upload & Placement
- **Upload Zone:** Drag-and-drop; amber dashed border + `scale(1.02)` on `dragover`
  - Accepts: PNG, JPG, SVG, WEBP · Max 10MB
  - Client-side DPI warning via `FileReader`
- **Placement:** Left Chest (8×8cm) · Center Chest (12×12cm) · Full Back (30×35cm) · Sleeve (8×8cm)
- **Design Tools:** Rotate 0°/90°/180°/270° · Scale slider 50–150% · Remove
- **Smart Scaling:** Auto-fit image within placement bounds on first drop

#### Step 3: Size Selection
- **Size Cards:** S M L XL XXL XXXL — amber active state slides from left
- **Size Guide Modal:** Chest/length/sleeve in cm/inch
- **Quantity:** +/– stepper per size (bulk orders supported)
- **OOS:** Muted card, strikethrough, tooltip "Out of stock"

#### Step 4: Preview & Pricing

| Component | Price |
|-----------|-------|
| Base garment | ₹599 |
| Design print | ₹150 |
| Multi-color surcharge | +₹50 |
| Full-back print | +₹100 |
| **Total** | **₹749 – ₹899** |

- Canvas `<canvas>` compositing: flat-lay PNG + uploaded design
- Front / Back / Side toggle (image swap with crossfade)
- "See on model" toggle: lifestyle mockup
- GSAP number roll on price change

#### Step 5: Checkout
1. Contact (Email, Phone + OTP verify)
2. Shipping Address (India pin-code auto-complete)
3. Payment: Razorpay (UPI/Cards/Wallets) primary · Stripe (international) · COD (+₹50)
- Trust: 🔒 SSL · "Powered by Razorpay" · 7-day returns · 7–10 day production
- Confirmation: unique order ID · design thumbnail · email + SMS notification

### 7.3 Micro-Interactions Specification

| Interaction | Implementation | Duration |
|-------------|---------------|----------|
| **Upload success** | Scale `1→1.05→1` + green `#4a7c59` border flash | 500ms |
| **Upload error** | Shake `translateX(±8px × 3)` + red border | 400ms |
| **Size selection** | Amber fill slides from left (`::before` pseudo) | 300ms |
| **Color swatch hover** | Scale `1→1.2`, shadow `0 4px 16px rgba(0,0,0,0.2)` | 200ms |
| **Price update** | GSAP counter roll old → new value | 600ms |
| **Step progress** | Amber bar fills `x%` wide with `ease-out-expo` | 400ms |
| **Step change** | Out: `opacity 1→0, y 0→-20px`; In: `opacity 0→1, y 20px→0` | 350ms each |
| **Checkout submit** | Amber `::after` width 0→100%, then spinner | 600ms |
| **Success state** | Spinner morphs to checkmark SVG path | 400ms |
| **Cart drawer open** | `translateX(100%→0)`, backdrop fade | 400ms |
| **Magnetic hover** | Element follows cursor at `0.4×` magnitude | real-time |

---

## 5. Visual Design Concept

### 5.1 Homepage Layout

```
┌─────────────────────────────────────────────┐
│  FABROAR                         Cart (0)   │  ← Minimal nav, logo left, icons right
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│           F A B R O A R                     │  ← Cinematic hero, 12vw display type
│           Wear Your Story                    │     Scroll-scrubbed reveal
│                                             │
│                                             │
│         [ Explore Collection ]               │  ← Magnetic CTA
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│   Featured                                 │  ← Asymmetric 2-column editorial grid
│   ┌──────────────┐   ┌──────────────────┐  │
│   │              │   │                  │  │
│   │  Product 1   │   │   Product 2      │  │
│   │  (Large)     │   │   (Tall)         │  │
│   │              │   │                  │  │
│   └──────────────┘   └──────────────────┘  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│   "Clothing is the                     │  ← Quote reveal, scroll-triggered
│    canvas of identity"                       │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│   New Arrivals                              │  ← Horizontal scroll film reel
│   ← [Product 1] [Product 2] [Product 3] →  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│   Categories                                │  ← Minimal category links
│   Men           Women           Customize    │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│   Newsletter                                │  ← Single-field input, amber submit
│                                             │
├─────────────────────────────────────────────┤
│  Instagram  Facebook    Privacy  Terms      │  ← Minimal footer
�helvetica"   © 2025 Fabroar                    │
└─────────────────────────────────────────────┘
```

### 5.2 Product Detail Layout

```
┌─────────────────────────────────────────────┐
│  ← Back            Product Name        Cart  │
├─────────────────────────────────────────────┤
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │                                     │   │
│   │                                     │   │
│   │         Product Image               │   │
│   │         (Duotone treatment)         │   │
│   │                                     │   │
│   │                                     │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   ₹449                                      │
│                                             │
│   Size  [S] [M] [L] [XL] [XXL]             │
│                                             │
│   [ Add to Cart ]    [ Customize This ]     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│   Details                    Care            │
│   ─────────────────────────────────         │
│   Regular fit, pure cotton...               │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│   You May Also Like                         │
│   [Product 3] [Product 4] [Product 5]       │
│                                             │
└─────────────────────────────────────────────┘
```

### 5.3 Custom Studio Layout

```
┌─────────────────────────────────────────────┐
│  ← Studio         Design Your Tee     Cart  │
├─────────────────────────────────────────────┤
│  STEP 1       STEP 2       STEP 3       STEP 4 │
├─────────────────────────────────────────────┤
│                                             │
│   ┌──────────────┐   ┌──────────────────┐   │
│   │              │   │                  │   │
│   │   Shirt      │   │   Configuration  │   │
│   │   Preview    │   │   Panel          │   │
│   │              │   │                  │   │
│   │   [3D View]  │   │   Base: [▾]      │   │
│   │              │   │   Color: ●●●●●   │   │
│   │   [Rotate]   │   │   Size: [S M L]  │   │
│   │              │   │   Upload: [Drop] │   │
│   │              │   │   Placement: [▾] │   │
│   │              │   │                  │   │
│   └──────────────┘   └──────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  Total: ₹799              [ Proceed to Pay ] │
└─────────────────────────────────────────────┘
```

---

## 9. Technical Stack

### 9.1 Core Framework
- **Next.js 16** (App Router, Static Export for CDN hosting)
- **React 19** + **TypeScript 5.9** (strict mode)
- **Tailwind CSS v4** with full custom theme tokens

### 9.2 Motion & Animation
- **GSAP 3.15** + **ScrollTrigger** — Scroll-scrubbed reveals, parallax, horizontal scroll, background morph, number counters
- **Lenis 1.3** — Smooth scroll with `lerp: 0.1`, custom easing
- **Framer Motion 12** — Component-level transitions (cart drawer, modal, step panels), layout animations

### 9.3 E-commerce & Payments
- **Data:** Headless WooCommerce REST API (or static JSON for prototype)
- **Payments:** Razorpay (primary) + Stripe (international) via API route handlers
- **File Upload:** Cloudinary (signed upload, transformations, CDN storage)
- **State:** Zustand for cart, customization, and UI state
- **Forms:** React Hook Form + Zod schema validation
- **OTP Auth:** Razorpay SMS OTP or Firebase Auth phone sign-in

### 9.4 Asset Pipeline
- **Images:** WordPress media migrated to `/public/images/` with `[slug]-[variant].jpg` naming
- **Optimization:** `next/image` + `priority` on above-fold images
- **Formats:** AVIF primary, WebP fallback, JPEG last resort
- **Filters:** CSS duotone/grayscale — no image pre-processing required
- **Blur-up:** `plaiceholder` for blur placeholders during load

### 9.5 Infrastructure
- **Hosting:** Vercel (static export + Edge Functions for Razorpay webhooks)
- **Analytics:** GA4 + Meta Pixel (server-side via API routes)
- **Error tracking:** Sentry
- **Email/SMS:** Resend (transactional email) + Razorpay built-in SMS

### 9.6 Dependency Versions (Lock)

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "typescript": "^5.9.0",
  "tailwindcss": "^4.0.0",
  "gsap": "^3.15.0",
  "@studio-freight/lenis": "^1.3.0",
  "framer-motion": "^12.0.0",
  "zustand": "^5.0.0",
  "react-hook-form": "^7.54.0",
  "zod": "^3.24.0",
  "cloudinary": "^2.5.0"
}
```

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Initialize Next.js 16 with Tailwind v4, TypeScript strict mode
- [ ] Configure `next.config.ts` for static export + image optimization
- [ ] Migrate product images from WordPress; rename to `[slug]-[variant].jpg`
- [ ] Create design token system in `globals.css` (all color, type, motion, spacing tokens)
- [ ] Build `GrainOverlay`, `LenisProvider`, `CustomCursor` — global layout shell
- [ ] Implement responsive navigation (transparent → frosted on scroll, mobile panel)
- [ ] Set up Zustand stores: `useCart`, `useCustomization`
- [ ] Configure Google Fonts preload (Playfair Display, Space Grotesk, Inter)

### Phase 2: Core Pages (Week 2)
- [ ] **Homepage:** Cold-open hero (wordmark reveal) + background color morph
- [ ] **Homepage:** Featured products — asymmetric editorial grid with scroll reveals
- [ ] **Homepage:** Quote reveal section + film reel horizontal scroll
- [ ] **Homepage:** Category links + newsletter strip + footer
- [ ] **Men / Women:** 3-column staggered grid reveal, sort/filter bar
- [ ] **Product Detail:** 60/40 split layout, gallery, size selector, add-to-cart fill animation
- [ ] **Product Detail:** Color reveal hover, size guide modal, related products strip
- [ ] **About:** Multi-beat brand story, signature image with clip-path wipe reveal
- [ ] **Contact:** Minimal form, map embed, preserved banner

### Phase 3: Custom Studio (Week 3)
- [ ] `ShirtConfigurator` — step-state machine with progress bar
- [ ] `ColorPicker` — 6 swatches, swatch hover micro-interaction
- [ ] `FileUploadZone` — drag-and-drop, validation, thumbnail preview
- [ ] `DesignCanvas` — `<canvas>` compositing: shirt PNG + uploaded design overlay
- [ ] Placement controls: rotation presets + scale slider
- [ ] `SizeSelector` — size chips with amber slide-in active state
- [ ] `PriceCalculator` — reactive breakdown + GSAP number roll
- [ ] Step-panel transitions (Framer Motion layout animations)

### Phase 4: Checkout & Payments (Week 4)
- [ ] Multi-step checkout form (React Hook Form + Zod)
- [ ] Razorpay integration: order creation API route + payment modal
- [ ] Stripe integration: payment intent API route (international fallback)
- [ ] Cart drawer (slide-in, backdrop close, line-item management)
- [ ] Order confirmation: unique ID, design thumbnail, email/SMS trigger
- [ ] COD option with ₹50 surcharge logic
- [ ] OTP auth flow for checkout (Razorpay / Firebase)

### Phase 5: Polish & Deploy (Week 5)
- [ ] Scroll animation audit — all triggers fire correctly on all devices
- [ ] Mobile responsiveness: test on 375px, 390px, 430px breakpoints
- [ ] `prefers-reduced-motion` audit — all animations correctly disabled
- [ ] Lighthouse: **Performance > 90, Accessibility > 95, SEO > 95**
- [ ] LCP optimization: `priority` prop on hero image, critical CSS inlined
- [ ] SEO metadata: `<title>`, `<meta description>`, Open Graph, `Product` schema
- [ ] `sitemap.xml` + `robots.txt` generation
- [ ] Vercel deployment: env vars, webhook endpoints, domain config
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge

---

## 11. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js over WordPress** | Performance, cinematic motion, modern DX, static export for CDN |
| **Static export** | CDN-friendly, fast TTFB; API routes handle dynamic data |
| **Razorpay primary** | Indian market dominance, UPI support (60%+ of digital payments) |
| **Duotone image treatment** | Unifies diverse product photos into a cohesive editorial aesthetic without re-shooting |
| **No hero video** | Genre 0 philosophy — cinematic quality through pacing and type, not media |
| **Custom cursor** | Signature moment on desktop; doesn't hurt mobile users |
| **GSAP over CSS animations** | Scroll-scrubbed timing, number counters, and complex timelines require JS control |
| **Cloudinary for uploads** | Custom order designs need CDN storage, transformations, and signed access |
| **Zustand over Redux** | Lightweight, minimal boilerplate; sufficient for cart + customization state |
| **Native `<dialog>` for modals** | Built-in focus trap, `::backdrop`, no extra library |
| **Clip-path masking on images** | Unusual crop reads as directed; rectangle reads as default |
| **Amber as sole accent** | One accent rigorously maintained; second colors dilute editorial restraint |

---

## 12. Accessibility Specification

### 12.1 WCAG 2.1 AA Targets
- **Contrast:** All text 4.5:1 minimum; amber on dark checked separately
- **Focus states:** `outline: 2px solid #c9a96e; outline-offset: 4px` on all interactive elements
- **Keyboard navigation:** Full tab order through nav, products, size selector, checkout
- **Screen reader:** Descriptive `alt` on all product images; decorative images `alt=""`
- **ARIA:** `role="dialog"`, `aria-modal`, `aria-label` on all modals; `aria-live` on cart count + price updates
- **Reduced motion:** All GSAP animations gated behind `useReducedMotion()` hook
- **Touch targets:** All interactive elements ≥ 44×44px (mobile)
- **Skip link:** `Skip to main content` visible on focus, first in DOM

### 12.2 Semantic HTML
- `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>` used meaningfully
- Single `<h1>` per page; product cards use `<article>` with `<h2>` product name
- Size selector: `<fieldset>` + `<legend>` + `<input type="radio">` styled visually

---

## 13. SEO Strategy

### 13.1 Metadata per Page

| Page | Title | Description |
|------|-------|-------------|
| Homepage | `Fabroar — Graphic T-Shirts for Men & Women` | Premium graphic cotton tees. Shop the collection or create your own. |
| Men | `Men's T-Shirts — Fabroar` | Explore [N] graphic cotton T-shirts for men. ₹299–₹549. |
| Women | `Women's T-Shirts — Fabroar` | Explore [N] graphic cotton T-shirts for women. ₹299–₹549. |
| Product | `[Product Name] — Fabroar` | Pure cotton. S–XXXL. ₹[price]. Free delivery over ₹499. |
| Customize | `Design Your Own T-Shirt — Fabroar Custom Studio` | Upload your artwork, create a custom printed tee. Ships in 7–10 days. |

### 13.2 Structured Data
- `Product` schema on all product pages (name, image, price, availability, brand)
- `Organization` schema on homepage
- `BreadcrumbList` on product pages

### 13.3 Technical SEO
- Static HTML export — all pages fully indexable, no client-side rendering gaps
- `sitemap.xml` auto-generated from product slugs
- Canonical URLs set for all pages
- Open Graph + Twitter Card tags

---

## 14. Success Metrics

### 14.1 Quality Gates (Pre-launch)

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| Lighthouse SEO | > 95 |
| LCP | < 2.5s on 4G |
| CLS | < 0.1 |
| INP | < 200ms |
| JS bundle (gzipped) | < 180kB |
| No horizontal scroll on mobile | ✓ |
| Touch targets ≥ 44px | ✓ |
| `prefers-reduced-motion` respected | ✓ |

### 14.2 Business Metrics (90 days post-launch)

| Metric | Target |
|--------|--------|
| Custom studio completion rate | > 40% |
| Add-to-cart rate (collection pages) | > 8% |
| Cart → checkout conversion | > 60% |
| Checkout completion rate | > 75% |
| Mobile bounce rate reduction | –20% vs current |
| Average session duration increase | +40% vs current |

### 14.3 Design Quality Signal
- Site reads as premium editorial, not e-commerce template
- Every product image feels part of a curated shoot, not a product dump
- Scrolling through homepage feels like reading a magazine, not browsing a store

---

## 15. Open Questions & Decisions Needed

| # | Question | Impact | Default if unanswered |
|---|----------|--------|----------------------|
| 1 | Is WooCommerce API available headlessly, or use static JSON? | Data layer complexity | Static JSON for v1 |
| 2 | Is dark mode a launch requirement or post-v1? | Theme toggle + token duplication | Post-v1 |
| 3 | Do custom orders go through Razorpay or manual approval? | Checkout complexity | Razorpay with order notes |
| 4 | Are there existing brand photography guidelines? | Image treatment uniformity | CSS-only duotone |
| 5 | Who is the production/fulfillment partner for custom orders? | Delivery timeline accuracy | 7–10 days placeholder |
| 6 | Is multi-language (Hindi) required at launch? | i18n infrastructure | English only for v1 |
| 7 | Is an affiliate/referral system needed at launch? | Auth + account complexity | Post-v1 |

---

*Document generated as part of the Frontend Pipeline redesign workflow. Version 2.0 enhanced with design system tokens, scroll choreography, accessibility spec, SEO strategy, and granular implementation roadmap.*
