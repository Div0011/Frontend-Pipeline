# 🎬 Autonomous Multi-Agent Website Redesign Platform

An **agent-native orchestration platform** built on [LangGraph](https://github.com/langchain-ai/langgraph) that behaves like a world-class digital agency (Active Theory, Locomotive, Resn, Lusion). Give it one prompt —

> *“Redesign https://beyondburg.com into a cinematic, bespoke, award-winning experience.”*

— and it autonomously plans, crawls, researches, art-directs, designs, engineers, personalizes, and QA-tests the redesign, delivering a production-ready Next.js project with zero build errors.

---

## 🏛️ 1. Template-Based Redesign Architecture & Workflow

To maintain pristine consistency and speed while delivering 100% bespoke output, the platform enforces a strict separation between **Base Templates** and **Production Client Projects**:

### Directory Separation

- **`templates/` (Read-Only Golden Masters)**: Contains pure, pristine, reusable base templates (`templates/smashguys`, `templates/cafe-cinematic`, `templates/hotel-cinematic`, `templates/template-1-film-portfolio`, etc.).
  > ⚠️ **CRITICAL RULE**: **NEVER modify files directly in `templates/`**.
- **`projects/` (Client Production Websites)**: Contains all customized client websites (`projects/beyondburg-inc/`, `projects/truffles-bangalore/`, `projects/dans-burgers/`, etc.).

### Standard 5-Step Redesign Execution Flow

1. **Identify & Select Template**: Choose the best-matching template from `templates/` based on brand category (e.g. smash burger, fine dining, cafe, boutique hotel). If no template fits, build a new base template in `templates/` first.
2. **Clone to Projects**: Copy the chosen template into `projects/<client-slug>/` (excluding `.next`, `node_modules`, `.vercel`, `dist`).
3. **Install Dependencies**: Run `npm install` cleanly inside `projects/<client-slug>/`.
4. **Overlay Brand Assets & Content**: Update **only** the target client's assets, branding, colors, typography, menu/data, components, copy, images, contact info, and metadata **inside `projects/<client-slug>/`**. Never redesign from scratch.
5. **Verify & Quality Gate**: Run `npm run typecheck` and `npm run build` in `projects/<client-slug>/` to guarantee 0 build errors. Confirm `templates/` remains 100% untouched.

---

## 🎨 2. Deep Personalization & Cinematic UI Principles

A high-end cinematic redesign is not merely changing text in a generic layout. Every site must feel **deeply personalized to the brand's DNA**:

### 1. Personalized Loading & Splash Screen

- Preloader must immediately render the client's actual brand name (`{brandName}`), tagline, and signature colors.
- Eliminates any placeholder or template leftover names (e.g. no "Smash Guys" branding on other restaurant websites).

### 2. Unboxed Header Typography & Smart Auto-Hiding Navigation

- **Unboxed Brand Name**: The logo and brand name in the header must **never** be enclosed inside an arbitrary rectangle or square border. Typography must be clean, modern, borderless, and professional.
- **Scroll-Aware Navigation**:
  - *Scrolling Down past 80px*: Navigation smoothly slides up and disappears (`-translate-y-full opacity-0 pointer-events-none`).
  - *Scrolling Up or at Top*: Navigation smoothly re-appears with glassmorphic backdrop blur (`translate-y-0 opacity-100 backdrop-blur-lg`).

### 3. Strict Color Harmony & High-Contrast Discipline

- **Single Cohesive Accent**: Every brand uses one signature accent color (e.g. Crimson Red for Leon's, Deep Olive Green & Golden Yellow for Beyondburg, Electric Amber for Biggies, Cobalt Blue for OBC).
- **All Primary Buttons Match Accent**: Every CTA button (`Full Menu`, `Order Online`, `Add +`, active category tabs, booking confirm) must strictly use the brand's primary accent.
- **Calculated Text Contrast**: Text on primary buttons is strictly high-contrast (`#FFFFFF` on dark colors like red, blue, green; `#000000` on bright colors like yellow, gold, cream). No clashing secondary colors.

### 4. Dynamic Motion Doodle Canvas Engine (`InteractiveBackground.tsx`)

- **Theme-Coordinated Dark Base Gradients**: Replaces harsh solid black/gray cuts with deep, atmospheric gradients matching the brand's primary color:
  - *Dark Olive Green (`#071009`) + Golden Yellow (`#F5C418`)* for Beyondburg Inc.
  - *Deep Noir Charcoal (`#0e0707`) + Crimson Red (`#DC2626`)* for Leon's, Good Flippin', Casino El Camino.
  - *Deep Obsidian (`#100a06`) + Fiery Amber/Orange (`#F26522` / `#EA580C`)* for Biggies, Dan's, Sour Duck.
  - *Deep Midnight Cobalt (`#060a12`) + Cyan/Blue (`#2563EB`)* for OBC, JewBoy, Burger Bar.
- **Animated Floating Motion Doodles**: Hand-drawn animated vector doodles (burgers, spatulas, sizzle waves, flames, 4-point stars, sparkles, steam loops) rendered in the brand's accent color that float, oscillate, rotate, and respond subtly to mouse movement.
- **Ambient Embers & Spotlight**: Cursor-following radial spotlight with spring physics (`stiffness: 45, damping: 25`) and floating ambient ember particles. 100% non-blocking (`pointer-events-none fixed inset-0 z-0`).
- **Seamless Transparent Layering**: All section components use `bg-transparent` with glassmorphic cards (`bg-white/[0.04] backdrop-blur-md border border-white/10`) to let the motion doodle background flow continuously without rectangular block cuts.

### 5. Elimination of Foggy Blur Effects

- Removed excessive `blur(8px)` / foggy gradient masks from hero and secondary section text across all projects to ensure crisp, razor-sharp typography.

### 6. Interactive 3D Menu Showcase & Quick-View Modal (`SignatureMenu.tsx`)

- **3D Tilt Cards**: Fluid hover effects with glowing hover corners.
- **Interactive Quick-View Modal**: Clicking any card opens a floating modal with culinary specs (*Flat-top sear temp, patty blend, bun glaze*) and an instant **"Add to Bag"** action.
- **Live Search & Category Count Badges**: Real-time filtering across Full Lineup, Smashes, Crispy Chicken, Sides, and Shakes.
- **Slide-Out Quick Order Cart Drawer (`CartDrawer.tsx`)**: Live subtotal calculation, quantity stepper, and localized currency (`₹` / `$`).

### 7. Interactive Craft Science Lab (`HowWeSmash.tsx`)

- **Interactive Flat-Top Temperature & Pressure Simulator**: Interactive slider (250°F to 500°F) calculating real-time **Crispy Lace Edge Maillard Crust %** and **Juice Retention %**.
- **Interactive Craft Blueprint Cards**: Step-by-step interactive tabs with technical metrics and status indicators.

### 8. Scroll-to-Expand Locations with Image Cross-Fade (`RestaurantLocations.tsx`)

- **Cross-Fading Image Gallery**: Interactive thumbnail switcher with smooth fade-in / fade-out animations (`AnimatePresence` + `motion.div`).
- **Expandable Outpost Profile**: Live kitchen status badge, operating hours, direct phone dialer, seating atmosphere breakdown, and Google Maps direction launcher.

### 9. Step-by-Step Table Booking & Reservation Builder (`ReservationCTA.tsx`)

- **Outpost Location Picker**: Switch between Flagship and secondary branch outposts.
- **Interactive Time Slot Grid**: Real-time availability badges (*Available, Few Tables, Peak Dinner, Late Night*).
- **Party Size Stepper & Seating Zone Selector**: Guest counter (- / +) paired with seating zone options (*Chef's Sizzle Counter, Cozy Dining Booth, Open-Air Patio Deck*).
- **Digital Reservation Pass Generator**: Instant booking reference pass with QR code placeholder, reservation summary, and modify options.

### 10. Resilient Typography & Inner Subpages

- **Resilient Font Loading**: All Google Fonts use `@import` in `globals.css` with instant fallback stacks to guarantee 100% build reliability without network timeout errors.
- **Inner Pages Standardized**: `/menu`, `/about`, `/locations`, `/films`, `/reservations` all share the dark transparent motion doodle atmosphere.

---

## 🤖 3. Multi-Agent Network

10 specialized agents coordinated by a Master Orchestrator:

```text
Planner / Supervisor
   │
   ├── [Parallel Stage 1: Discovery & Intelligence]
   │   ├── Website Analysis Agent (Scrapling DOM extraction & asset audit)
   │   ├── SEO Intelligence Agent (Keyword, metadata, and schema audit)
   │   └── Brand Research Agent (Brand DNA, historical pillars, and competitive stance)
   │
   ├── [Stage 2: Art Direction & Strategy]
   │   └── Creative Director Agent (Genre selection, 5 culinary archetypes, big idea)
   │
   ├── [Stage 3: Information Architecture & UX]
   │   └── UX Agent (10-section implementation plan, wireframe hierarchy, scrollytelling flow)
   │
   ├── [Parallel Stage 4: Design & Motion Systems]
   │   ├── UI Design Agent (Single-accent color tokens, unboxed header, typography scales)
   │   └── Motion Design Agent (Motion doodle engine, auto-hiding scroll, spring transitions)
   │
   ├── [Stage 5: Production Engineering]
   │   └── Frontend Engineering Agent (Next.js 14+ App Router, TypeScript, Tailwind, interactive components)
   │
   ├── [Stage 6: Quality Assurance & Build Verification]
   │   └── QA Agent (npm run build verification, contrast checks, tap target validation)
   │
   └── [Stage 7: Delivery & Reporting]
       └── Synthesizer (Production deployment, walkthrough reports, multi-port local serving)
```

---

## ⚡ 4. Quick Start & Serving All Projects

### Run the Multi-Port Portfolio Server

```bash
# Serves all 24 client projects (Ports 3000-3023) + Gateway Hub (Port 4000)
python3 pipeline/serve_all_local.py
```

### Central Gateway Hub

Open `http://localhost:4000` in your browser to access the interactive dashboard with live status cards and direct links to all 24 projects.

---

## 🧪 5. Testing & Verification

Run batch verification across all 24 projects:

```bash
python3 -c "
import os, subprocess
all_24 = [
    'backyard-burgers', 'beyondburg-inc', 'biggies-burger', 'burger-bar-austin',
    'burger-elite', 'burger-seigneur', 'burgerman', 'casino-el-camino',
    'dans-burgers', 'dirty-martins', 'good-flippin-burgers', 'jewboy-burgers',
    'leons-burgers', 'little-deli-pizzeria', 'louis-burger', 'nadc-burger',
    'original-burger-co', 'pedrosos-pizza', 'pool-burger', 'sankys-burger-house',
    'simon-burgers', 'smash-guys', 'sour-duck-market', 'truffles-bangalore'
]
for p in all_24:
    res = subprocess.run(['npm', 'run', 'build'], cwd=os.path.join('projects', p), capture_output=True, text=True)
    print(f'{p:22}: {\"PASS\" if res.returncode == 0 else \"FAIL\"}')
"
```
