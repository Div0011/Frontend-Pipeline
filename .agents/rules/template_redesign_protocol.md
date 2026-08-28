# Template Redesign & Client Website Protocol

## 1. Templates vs Projects Policy

1. **`templates/` (Read-Only Golden Masters)**:
   - `templates/smashguys`, `templates/cafe-cinematic`, `templates/hotel-cinematic`, `templates/template-1-film-portfolio`, etc.
   - **CRITICAL**: **NEVER modify files directly in `templates/`**.
2. **`projects/` (Client Production Websites)**:
   - All client-specific customizations happen in `projects/<client-slug>/`.

---

## 2. Standard Website Redesign Execution Flow

Whenever a request asks to redesign, rebrand, or create a client website:
1. **Identify Template**: Select the best matching template from `templates/<template-name>/`. If no suitable template exists, build a new pristine template in `templates/` before proceeding.
2. **Clone to Projects**: Copy the template to `projects/<client-slug>/` (excluding `.next`, `node_modules`, `.vercel`).
3. **Install Dependencies**: Run `npm install` inside `projects/<client-slug>/`.
4. **Overlay Assets & Content**: Update **only** the target client's assets, branding, colors, typography, menu/data, components, copy, images, contact info, and metadata **inside `projects/<client-slug>/`**. Do not redesign from scratch.
5. **Verify**: Run `npm run typecheck` and `npm run build` in `projects/<client-slug>/`. Confirm `templates/` remains 100% untouched.

---

## 3. Deep Brand Personalization & Visual Craft Standards

1. **Brand-Personalized Preloader**:
   - Splash screen must immediately render the client's actual brand name (`{brandName}`) and culinary tagline. Never show template leftovers.
2. **Unboxed Header Typography**:
   - The brand name in the header must **never** be enclosed inside an arbitrary rectangle or square border. Keep typography clean, modern, borderless, and professional.
3. **Smart Auto-Hiding Scroll Navigation**:
   - Scrolling down past 80px hides navbar (`-translate-y-full opacity-0 pointer-events-none`).
   - Scrolling up or at top reveals navbar with glassmorphism (`translate-y-0 opacity-100 backdrop-blur-lg`).
4. **Single Cohesive Accent & Contrast Discipline**:
   - Every brand uses **one dominant signature accent color**.
   - All primary CTA buttons (`Full Menu`, `Order Online`, `Add +`, active category tabs, booking confirm) must strictly match this accent.
   - Text on primary buttons is strictly high-contrast (`#FFFFFF` on dark colors like red, blue, green; `#000000` on bright colors like yellow, gold, cream). No clashing secondary button colors.
5. **Dynamic Motion Doodle Canvas Engine (`InteractiveBackground.tsx`)**:
   - Theme-matched base gradient (Dark Olive Green for Beyondburg, Deep Noir Charcoal for red brands, Deep Obsidian for amber/orange brands, Deep Midnight for blue brands).
   - Floating animated vector doodles (burgers, spatulas, flames, stars, sparkles, steam waves) oscillating and rotating in the brand's accent color.
   - Spring-damped cursor spotlight (`stiffness: 45, damping: 25`) and floating ambient embers. 100% non-blocking (`pointer-events-none fixed inset-0 z-0`).
   - All section components use `bg-transparent` with glassmorphic cards (`bg-white/[0.04] backdrop-blur-md border border-white/10`) to eliminate harsh black rectangular cuts.
6. **Crisp Typography (No Foggy Text Blur)**:
   - Eliminate heavy blur filters (`blur(8px)`) and clipped gradient masks from readable text.

---

## 4. Mandatory Interactive Section Components

1. **Interactive 3D Menu Showcase & Quick-View Modal (`SignatureMenu.tsx`)**:
   - 3D hover tilt cards with glowing hover corners.
   - Quick-view recipe/ingredient modal on card click with culinary specifications and instant "Add to Bag".
   - Category count badges and real-time search input.
   - Slide-out `CartDrawer.tsx` integration with quantity steppers and localized currency (`₹` / `$`).
2. **Interactive Flat-Top Maillard Simulator (`HowWeSmash.tsx`)**:
   - Interactive 250°F–500°F slider calculating real-time **Crispy Lace Edge Maillard Crust %** and **Juice Retention %**.
   - Step-by-step interactive craft blueprint cards.
3. **Scroll-to-Expand Locations with Image Cross-Fade (`RestaurantLocations.tsx`)**:
   - Interactive location tabs with cross-fading gallery preview with fade-in / fade-out animations (`AnimatePresence`).
   - Live kitchen status badge, operating hours, direct phone dialer, and 1-click Google Maps directions.
4. **Step-by-Step Table Booking Builder (`ReservationCTA.tsx`)**:
   - Outpost location picker, live time-slot availability pills, party size stepper (1 to 12+ guests), and seating zone selector (*Chef's Sizzle Counter, Cozy Booth, Patio Deck*).
   - Digital VIP reservation pass generator with confirmation reference code.
5. **Bespoke Brand Archetype Showcases (`ArchetypeShowcase.tsx`)**:
   - Assigned to one of 5 archetypes (*Heritage Diners, Haute Gourmet, Cult Garages, Artisanal Fermentation, Fast-Casual Crunch*).

---

## 5. Vercel Deployment Target (MANDATORY)

- **Team Account**: **`cinematic-websites`** ([https://vercel.com/cinematic-websites](https://vercel.com/cinematic-websites))
- **FORBIDDEN**: Never deploy websites or templates to the `div0011` account.
- **Deployment Command**:

  ```bash
  npx vercel --prod --scope cinematic-websites --yes
  ```

---

## 6. Build & Quality Assurance

- Always place `"use client";` at line 1 of client component files.
- Resilient font imports: use `@import` in `globals.css` with instant fallback stacks.
- Verify with `npm run build` in `projects/<client-slug>/` (must compile with 0 errors).
- Validate multi-port local serving with `python3 pipeline/serve_all_local.py`.
