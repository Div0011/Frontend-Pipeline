#!/usr/bin/env python3
"""
Applies:
1. Dirty Martin's: 100% Dark Mustard (#C68A14) and White (#FFFFFF) across the entire codespace.
2. Button Color Inversion System across all 24 projects:
   - Dark mode: High-contrast primary button (Brand color with black text, or black with white text).
   - Light mode: Button inverts to deep black background with crisp white text.
   - Text inside buttons dynamically flips colors for maximum readability and premium aesthetic.
3. Ultra-premium glassmorphism, responsive typography, and refined hover micro-interactions.
"""

import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

ALL_BRANDS_CONFIG = {
    "dirty-martins": {
        "name": "DIRTY MARTIN'S",
        "tagline": "1926 Texas Kum-Bak Burger Legend · Austin, TX",
        "city_badge": "UT CAMPUS LEGEND",
        "city_footer": "THE DRAG · AUSTIN, TX",
        "currency": "$",
        "primary_color": "#C68A14",      # Dark Mustard
        "secondary_color": "#E5A93C",    # Mustard Accent
        "dark_bg": "#0A0A0A",
        "light_bg": "#FAF8F2",
        "footer_bg": "#C68A14",
        "footer_text": "#0A0A0A",
        "craft_title": "CENTURY-OLD GRIDDLE SEAR",
        "craft_desc": "ORIGINAL 1926 CAST IRON TECHNIQUE",
        "signature_craving": ("1926 SPECIAL", "TEXAS MUSTARD MALT"),
        "phone": "+1 512-477-3173",
        "email": "kum-bak@dirtymartins.com",
        "hours": "11:00 AM – 11:00 PM",
        "address": "2808 Guadalupe St, Austin, TX 78705",
        "locations": [
            {
                "id": "guadalupe",
                "name": "Guadalupe St. Historic Outpost",
                "badge": "SERVING SINCE 1926",
                "address": "2808 Guadalupe St",
                "city": "Austin, TX 78705",
                "hours": "11:00 AM – 11:00 PM",
                "phone": "+1 512-477-3173",
                "status": "Griddle Hot & Sizzling",
                "seating": "Original Counter & Beer Garden",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Dirty+Martins+Kum+Bak+Austin"
            }
        ],
        "menu_items": [
            {"id": "dh-burger", "name": "The Famous DH Special", "category": "Historic Burgers", "price": "8.75", "badge": "1926 Classic", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "ot-special", "name": "O.T. Special Double Burger", "category": "Historic Burgers", "price": "10.50", "badge": "Crowd Pick", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "chili-cheese-tots", "name": "Chili Cheese Tater Tots", "category": "Sides", "price": "6.25", "badge": "Secret Chili", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"}
        ]
    }
}


def make_globals_css(primary_color: str, dark_bg: str, light_bg: str) -> str:
    # If primary is white (JewBoy), dark button is white on black, light button is black on white
    is_monochrome = (primary_color == "#FFFFFF" or primary_color == "#0A0A0A")

    dark_btn_bg = "#FFFFFF" if is_monochrome else primary_color
    dark_btn_fg = "#000000" if is_monochrome else "#000000"

    return f"""@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;700;900&display=swap');
@import "tailwindcss";

@theme {{
  --color-char: #122B1E;
  --color-char-soft: #1B3B2B;
  --color-char-mute: #284F3B;
  --color-smoke: #8FAEA0;
  --color-stone: #C5D9CE;
  --color-bone: #FAF8F2;
  --color-bone-warm: #F4EFE6;
  --color-bone-dark: #E4DCCF;
  --color-ember: #DE3B2B;
  --color-ember-glow: #F04F3F;
  --color-yolk: #EAA824;
  --color-yolk-light: #FBC85B;
  
  --font-display: 'Bebas Neue', 'Space Grotesk', Impact, sans-serif;
  --font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}}

/* ─── Strict Brand Theme & Inverting Button Engine ────────────────────── */
:root {{
  --bg:                  {dark_bg};
  --fg:                  #FFFFFF;
  --fg-muted:            rgba(255, 255, 255, 0.65);
  --fg-sub:              rgba(255, 255, 255, 0.40);
  --border:              rgba(255, 255, 255, 0.12);
  --primary:             {primary_color};
  
  /* Buttons in Dark Theme: Brand Color / High Contrast with Black text */
  --btn-primary-bg:      {dark_btn_bg};
  --btn-primary-fg:      {dark_btn_fg};
  --btn-secondary-bg:    rgba(255, 255, 255, 0.08);
  --btn-secondary-fg:    #FFFFFF;
  --btn-secondary-border:rgba(255, 255, 255, 0.20);
  --btn-invert-bg:       #0A0A0A;
  --btn-invert-fg:       #FFFFFF;
}}

html.light {{
  --bg:                  {light_bg};
  --fg:                  #0A0A0A;
  --fg-muted:            rgba(10, 10, 10, 0.70);
  --fg-sub:              rgba(10, 10, 10, 0.45);
  --border:              rgba(0, 0, 0, 0.12);
  --primary:             {primary_color if not is_monochrome else "#0A0A0A"};
  
  /* Buttons in Light Theme: Inverts to Deep Black with Crisp White text */
  --btn-primary-bg:      #0A0A0A;
  --btn-primary-fg:      #FFFFFF;
  --btn-secondary-bg:    rgba(10, 10, 10, 0.06);
  --btn-secondary-fg:    #0A0A0A;
  --btn-secondary-border:rgba(0, 0, 0, 0.20);
  --btn-invert-bg:       {primary_color if not is_monochrome else "#0A0A0A"};
  --btn-invert-fg:       #000000;
}}

/* ─── Base ─────────────────────────────────────────────────────────── */
*, *::before, *::after {{
  cursor: none !important;
}}

input, textarea, select, [contenteditable] {{
  cursor: text !important;
}}

body {{
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-body), sans-serif;
  overflow-x: hidden;
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}}

.type-display {{
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
}}

/* ─── BUTTONS: Theme-Inverting Engine ──────────────────────────────── */
.btn-primary {{
  background-color: var(--btn-primary-bg) !important;
  color: var(--btn-primary-fg) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}}

.btn-primary:hover {{
  filter: brightness(1.1);
  transform: scale(1.03);
}}

.btn-secondary {{
  background-color: var(--btn-secondary-bg) !important;
  color: var(--btn-secondary-fg) !important;
  border: 1px solid var(--btn-secondary-border) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}}

.btn-secondary:hover {{
  background-color: rgba(255, 255, 255, 0.15) !important;
  transform: scale(1.03);
}}

html.light .btn-secondary:hover {{
  background-color: rgba(0, 0, 0, 0.12) !important;
}}

/* ─── PROTECTED IMAGE ZONES ────────────────────────────────────────── */
[data-image-overlay],
[data-image-overlay] * {{
  color: #FFFFFF !important;
}}

.img-overlay-text,
.img-overlay-text * {{
  color: #FFFFFF !important;
}}

/* ─── LIGHT THEME Adaptations ─────────────────────────────────────── */
html.light body section:not([data-image-frame]) > div > h1,
html.light body section:not([data-image-frame]) > div > h2,
html.light body section:not([data-image-frame]) > div > div > h1,
html.light body section:not([data-image-frame]) > div > div > h2,
html.light body section:not([data-image-frame]) > div > div > div > h2 {{
  color: var(--fg) !important;
}}

html.light body section:not([data-image-frame]) > div > p,
html.light body section:not([data-image-frame]) > div > div > p {{
  color: var(--fg-muted) !important;
}}

html.light body header {{
  background-color: {light_bg}EE !important;
  border-bottom-color: rgba(0, 0, 0, 0.10) !important;
}}

html.light body header a {{
  color: rgba(10, 10, 10, 0.75) !important;
}}

html.light body header a:hover {{
  color: #0A0A0A !important;
}}
"""


def generate_mustard_logo():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#C68A14" stroke-width="3" fill="#0A0A0A" />
  <circle cx="50" cy="50" r="40" stroke="#C68A14" stroke-width="1" stroke-dasharray="2 2" fill="none" opacity="0.6" />
  <!-- 1926 Kum-Bak Dark Mustard Seal -->
  <text x="50" y="42" fill="#C68A14" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="2">KUM-BAK</text>
  <text x="50" y="66" fill="#FFFFFF" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="24" font-weight="900" text-anchor="middle">1926</text>
  <text x="50" y="82" fill="#C68A14" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle" letter-spacing="1">AUSTIN, TX</text>
</svg>"""


def generate_inverting_nav(brand):
    primary = brand["primary_color"]
    dark_bg = brand["dark_bg"]
    name = brand["name"]

    return f'''"use client";

import React, {{ useState, useEffect, useRef }} from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {{
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {{
    let ticking = false;

    const updateScroll = () => {{
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;

      if (currentScrollY > 30) {{
        setIsScrolled(true);
      }} else {{
        setIsScrolled(false);
      }}

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {{
        setIsVisible(false);
      }} else {{
        setIsVisible(true);
      }}

      lastScrollY.current = Math.max(0, currentScrollY);
      ticking = false;
    }};

    const handleScroll = () => {{
      if (!ticking) {{
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }}
    }};

    window.addEventListener("scroll", handleScroll, {{ passive: true }});
    return () => window.removeEventListener("scroll", handleScroll);
  }}, []);

  return (
    <header
      className={{`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out select-none ${{
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }} ${{
        isScrolled
          ? "backdrop-blur-xl border-b py-3 shadow-2xl bg-[{dark_bg}]/88 border-white/10"
          : "bg-transparent py-4"
      }}`}}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {{/* Brand Emblem + Name */}}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 border border-white/15 p-1 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-md">
            <Image
              src="/logo.svg"
              alt="{name} Emblem"
              width={{32}}
              height={{32}}
              unoptimized
              className="object-contain"
              priority
            />
          </div>
          <span className="type-display text-lg sm:text-xl md:text-2xl font-black text-white dark:text-white light:text-black tracking-tight group-hover:opacity-90 transition-opacity">
            {name}
          </span>
        </Link>

        {{/* Nav Links */}}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold tracking-wider uppercase text-stone-300 dark:text-stone-300 light:text-stone-800">
          <Link href="/menu" className="hover:text-white dark:hover:text-white light:hover:text-black transition-colors">
            Menu
          </Link>
          <Link href="/about" className="hover:text-white dark:hover:text-white light:hover:text-black transition-colors">
            Our Story
          </Link>
          <Link href="/locations" className="hover:text-white dark:hover:text-white light:hover:text-black transition-colors">
            Locations
          </Link>
          <Link href="/films" className="hover:text-white dark:hover:text-white light:hover:text-black transition-colors">
            Films
          </Link>
        </nav>

        {{/* Inverting Action CTA Button */}}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="btn-primary px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider shadow-md"
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}}
'''


def generate_inverting_hero(brand):
    primary = brand["primary_color"]
    name = brand["name"]
    tagline = brand["tagline"]
    craft_title = brand.get("craft_title", "PRECISION CAST IRON SEAR")
    craft_desc = brand.get("craft_desc", "450°F CARAMELIZED MAILLARD REACTION")

    return f'''"use client";

import React, {{ useState }} from "react";
import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 248;
const BURGER_FRAMES = Array.from({{ length: FRAME_COUNT }}, (_, i) =>
  `/frames/burger/frame_${{String(i).padStart(6, "0")}}.webp`
);

function getStage(progress: number): 1 | 2 | 3 {{
  if (progress < 0.32) return 1;
  if (progress < 0.68) return 2;
  return 3;
}}

export default function CinematicHero() {{
  const [progress, setProgress] = useState(0);
  const stage = getStage(progress);
  const currentFrame = Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1);

  return (
    <CanvasScrubber
      frames={{BURGER_FRAMES}}
      scrollDistance="+=350%"
      onProgress={{setProgress}}
      overlayGradient
      preloadCount={{60}}
    >
      <div data-image-overlay className="h-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 relative select-none">
        
        {{/* ── Stage 1: Hero Reveal (0–32% Scroll) ── */}}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{{{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(-30px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}}}
        >
          <div className="max-w-4xl space-y-6">
            {{/* Live Status Pill */}}
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl w-fit shadow-lg">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{{{ backgroundColor: "{primary}" }}}} />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-stone-200">
                {tagline}
              </span>
            </div>

            <h1 className="type-display text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] text-white leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              {name}
            </h1>

            <div className="pt-2 flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
              <Link
                href="/menu"
                className="btn-primary px-8 py-4 rounded-full shadow-2xl flex items-center gap-2"
              >
                <span>Explore Menu</span>
                <span>→</span>
              </Link>
              <Link
                href="/locations"
                className="btn-secondary px-8 py-4 rounded-full backdrop-blur-xl shadow-xl"
              >
                Outposts
              </Link>
            </div>
          </div>
        </div>

        {{/* ── Stage 2: Sizzle Kinetics (32–68% Scroll) ── */}}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{{{
            opacity: stage === 2 ? 1 : 0,
            transform: stage === 2 ? "translateY(0)" : stage < 2 ? "translateY(30px)" : "translateY(-30px)",
            pointerEvents: stage === 2 ? "auto" : "none",
          }}}}
        >
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 inline-block font-bold" style={{{{ color: "{primary}" }}}}>
              PHASE 01 / CRAFT KINETICS
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl text-white leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              {craft_title}
            </h2>

            <p className="type-serif text-base sm:text-xl text-stone-200 max-w-xl leading-relaxed drop-shadow">
              {craft_desc}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-stone-300">
              <span className="font-bold px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/15" style={{{{ color: "{primary}" }}}}>
                FRAME {{currentFrame.toString().padStart(3, "0")}} / {{FRAME_COUNT}}
              </span>
              <span className="text-stone-400">PRECISION SIZZLE SEQUENCE</span>
            </div>
          </div>
        </div>

        {{/* ── Stage 3: The Signature Masterpiece (68–100% Scroll) ── */}}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{{{
            opacity: stage === 3 ? 1 : 0,
            transform: stage === 3 ? "translateY(0)" : "translateY(30px)",
            pointerEvents: stage === 3 ? "auto" : "none",
          }}}}
        >
          <div className="max-w-2xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 inline-block font-bold" style={{{{ color: "{primary}" }}}}>
              PHASE 02 / CULINARY SIGNATURE
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl text-white leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              CRAFTED FOR PERFECTION
            </h2>

            <p className="type-serif text-base sm:text-xl text-stone-200 max-w-xl leading-relaxed drop-shadow">
              Fresh daily ingredients seared to order with house sauces on toasted artisanal rolls.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
              <Link
                href="/menu"
                className="btn-primary px-8 py-4 rounded-full shadow-2xl flex items-center gap-2"
              >
                <span>Order Signature Dish</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}}
'''


def retheme_dirty_martins():
    brand = ALL_BRANDS_CONFIG["dirty-martins"]
    dm_dir = PROJECTS_DIR / "dirty-martins"
    if not dm_dir.exists():
        return

    print("👉 Re-theming Dirty Martin's to 100% Dark Mustard (#C68A14) & White...")

    # 1. Logo SVG
    (dm_dir / "public" / "logo.svg").write_text(generate_mustard_logo())

    # 2. globals.css
    (dm_dir / "app" / "globals.css").write_text(make_globals_css(brand["primary_color"], brand["dark_bg"], brand["light_bg"]))

    # 3. layout.tsx
    layout_path = dm_dir / "app" / "layout.tsx"
    layout_content = layout_path.read_text()
    layout_content = re.sub(r'#BF5700|#bf5700', '#C68A14', layout_content)
    layout_path.write_text(layout_content)

    # 4. Components in dirty-martins
    for root, _, files in os.walk(dm_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css')) and not file.startswith('package'):
                fp = Path(root) / file
                txt = fp.read_text()
                txt = re.sub(r'#BF5700|#bf5700', '#C68A14', txt)
                fp.write_text(txt)

    # Update Nav and Hero with inverting buttons
    (dm_dir / "components" / "marketing" / "Nav.tsx").write_text(generate_inverting_nav(brand))
    (dm_dir / "components" / "marketing" / "CinematicHero.tsx").write_text(generate_inverting_hero(brand))

    print("  ✓ Dirty Martin's successfully rebuilt in Dark Mustard & White with inverting buttons!")


def apply_inversion_to_all():
    print("🚀 Rolling out inverting button system & premium styles across all projects...")
    
    for slug in sorted(os.listdir(PROJECTS_DIR)):
        p_dir = PROJECTS_DIR / slug
        if not p_dir.is_dir() or slug == "smash-guys" or slug == "fabroar" or slug == "superfan-redesign":
            continue

        # Read layout to get primary color
        layout_p = p_dir / "app" / "layout.tsx"
        if not layout_p.exists():
            continue
        
        layout_text = layout_p.read_text()
        m_pri = re.search(r'primaryColor="([^"]*)"', layout_text)
        m_dark = re.search(r'darkBg="([^"]*)"', layout_text)
        m_light = re.search(r'lightBg="([^"]*)"', layout_text)

        primary = m_pri.group(1) if m_pri else "#F5C418"
        dark_bg = m_dark.group(1) if m_dark else "#0A0A0A"
        light_bg = m_light.group(1) if m_light else "#FAF8F2"

        brand_obj = {
            "name": slug.replace("-", " ").upper(),
            "primary_color": primary,
            "dark_bg": dark_bg,
            "light_bg": light_bg,
            "tagline": "Craft Atelier",
        }

        # 1. Update globals.css
        (p_dir / "app" / "globals.css").write_text(make_globals_css(primary, dark_bg, light_bg))

        # 2. Update Nav.tsx
        nav_file = p_dir / "components" / "marketing" / "Nav.tsx"
        if nav_file.exists():
            nav_file.write_text(generate_inverting_nav(brand_obj))

        # 3. Update CinematicHero.tsx
        hero_file = p_dir / "components" / "marketing" / "CinematicHero.tsx"
        if hero_file.exists():
            hero_file.write_text(generate_inverting_hero(brand_obj))

        print(f"  ✓ {slug} updated with button inversion engine")


def main():
    retheme_dirty_martins()
    apply_inversion_to_all()
    print("🎉 All projects updated with theme-inverting button engine & strict palettes!")


if __name__ == "__main__":
    main()
