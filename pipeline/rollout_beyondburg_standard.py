#!/usr/bin/env python3
"""
Beyondburg Standard Interactive UI/UX Rollout
Applies all interactive improvements from beyondburg-inc to every other project.

What gets rolled out:
  1. PixelText.tsx (NEW component — interactive dot-particle brand name)
  2. AtmosphereControls.tsx — CSS var writes on toggle, correct button inversion
  3. MorphSlider.tsx — data-image-overlay on captions
  4. AccordionGallery.tsx — data-image-overlay on both overlay divs
  5. globals.css — cursor:none, CSS var system, [data-image-overlay] protection
  6. Nav.tsx — theme-responsive nav (dark glass / light cream glass)
  7. Footer.tsx — PixelText brand name, inverted scroll-to-top hover
  8. CinematicHero.tsx — data-image-overlay on text container
  9. CinematicSmoothie.tsx — data-image-overlay on text container
 10. RestaurantLocations.tsx — data-image-overlay on photo overlay

Each project keeps its own primaryColor, darkBg, brand name, and all content.
"""

import os
import re
import shutil
from pathlib import Path

# ─── Project root ───────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
PROJECTS = ROOT / "projects"
SOURCE = PROJECTS / "beyondburg-inc"

# ─── Skip non-standard projects ─────────────────────────────────
SKIP = {"beyondburg-inc", "fabroar", "superfan-redesign"}

# ─── Per-project brand config: (primaryColor, darkBg, footerBg, footerTextColor, brandName) ───
BRAND_CONFIG = {
    "truffles-bangalore":   ("#F5A623", "#100a06", "#F5A623", "#000000", "TRUFFLES"),
    "smash-guys":           ("#F5C418", "#071009", "#F5C418", "#000000", "SMASH GUYS"),
    "sankys-burger-house":  ("#FFE500", "#08080a", "#FFE500", "#000000", "SANKY'S"),
    "dans-burgers":         ("#D97706", "#100a05", "#D97706", "#000000", "DAN'S HAMBURGERS"),
    "backyard-burgers":     ("#E67E22", "#100904", "#E67E22", "#000000", "BACKYARD BURGERS"),
    "dirty-martins":        ("#BF5700", "#100804", "#BF5700", "#000000", "DIRTY MARTIN'S"),
    "sour-duck-market":     ("#EA580C", "#100804", "#EA580C", "#000000", "SOUR DUCK MARKET"),
    "biggies-burger":       ("#F26522", "#100804", "#F26522", "#000000", "BIGGIES BURGER"),
    "leons-burgers":        ("#B12727", "#0e0606", "#B12727", "#000000", "LEON'S BURGERS"),
    "casino-el-camino":     ("#DC2626", "#0e0505", "#DC2626", "#000000", "CASINO EL CAMINO"),
    "simon-burgers":        ("#DC2626", "#0e0606", "#DC2626", "#000000", "SIMON BURGERS"),
    "pedrosos-pizza":       ("#B91C1C", "#0e0505", "#B91C1C", "#000000", "PEDROSO'S PIZZA"),
    "good-flippin-burgers": ("#BE123C", "#0e0509", "#BE123C", "#000000", "GOOD FLIPPIN' BURGERS"),
    "pool-burger":          ("#F43F5E", "#0f0509", "#F43F5E", "#000000", "POOL BURGER"),
    "burgerman":            ("#15803D", "#051007", "#15803D", "#000000", "BURGERMAN"),
    "little-deli-pizzeria": ("#166534", "#051007", "#166534", "#000000", "LITTLE DELI"),
    "louis-burger":         ("#D4AF37", "#0d0b06", "#D4AF37", "#000000", "LOUIS BURGER"),
    "burger-seigneur":      ("#C8A96E", "#0d0b07", "#C8A96E", "#000000", "BURGER SEIGNEUR"),
    "burger-elite":         ("#7C3AED", "#0b0614", "#7C3AED", "#000000", "BURGER ELITE"),
    "jewboy-burgers":       ("#06B6D4", "#050c10", "#06B6D4", "#000000", "JEWBOY BURGERS"),
    "burger-bar-austin":    ("#2563EB", "#060a12", "#2563EB", "#000000", "BURGER BAR"),
    "original-burger-co":   ("#2563EB", "#060a12", "#2563EB", "#000000", "ORIGINAL BURGER CO."),
    "nadc-burger":          ("#F5C418", "#080808", "#080808", "#FAF8F2", "NADC BURGER"),
}

# ─── Shared file content generators ─────────────────────────────

def make_globals_css(primary_color: str, dark_bg: str) -> str:
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

/* ─── CSS Variables — written by AtmosphereControls.tsx toggleTheme() ── */
:root {{
  --bg:        {dark_bg};
  --fg:        #FAF8F2;
  --fg-muted:  rgba(250, 248, 242, 0.55);
  --fg-sub:    rgba(250, 248, 242, 0.35);
  --border:    rgba(255, 255, 255, 0.10);
  --primary:   {primary_color};
}}

html.light {{
  --bg:        #F6F4EE;
  --fg:        #18181B;
  --fg-muted:  rgba(24, 24, 27, 0.65);
  --fg-sub:    rgba(24, 24, 27, 0.40);
  --border:    rgba(0, 0, 0, 0.10);
}}

/* ─── Base ─────────────────────────────────────────────────────────── */
*, *::before, *::after {{
  /* Hide default OS cursor — custom cursor replaces it */
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
  transition: background-color 0.4s ease, color 0.4s ease;
}}

.type-display {{
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
}}

/* ─── PROTECTED IMAGE ZONES ────────────────────────────────────────── 
   Any element with [data-image-overlay] always shows white text,
   in BOTH dark and light themes. Theme toggle never touches these.
─────────────────────────────────────────────────────────────────── */
[data-image-overlay],
[data-image-overlay] * {{
  color: #FAF8F2 !important;
}}

.img-overlay-text,
.img-overlay-text * {{
  color: #FAF8F2 !important;
}}

/* ─── LIGHT THEME: Section-level text ───────────────────────────────
   Only targets non-image-overlay section text.
─────────────────────────────────────────────────────────────────── */
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

/* ─── LIGHT THEME: Nav header ───────────────────────────────────── */
html.light body header {{
  background-color: rgba(246, 244, 238, 0.93) !important;
  border-bottom-color: rgba(0, 0, 0, 0.08) !important;
}}

html.light body header a {{
  color: rgba(24, 24, 27, 0.72) !important;
}}

html.light body header a:hover {{
  color: #18181B !important;
}}
"""


def make_footer(primary_color: str, footer_bg: str, footer_text: str, brand_name: str) -> str:
    # For dark footers (nadc-burger), use light pixel text
    pixel_color = footer_text  # footer_text is the text color
    return f'''"use client";

import React from "react";
import Link from "next/link";
import PixelText from "@/components/ui/PixelText";

export default function Footer() {{
  const scrollToTop = () => {{
    if (typeof window !== "undefined") {{
      window.scrollTo({{ top: 0, behavior: "smooth" }});
    }}
  }};

  return (
    <footer
      style={{{{ backgroundColor: "{footer_bg}", color: "{footer_text}" }}}}
      className="h-[100svh] min-h-[100svh] w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 relative z-10 select-none overflow-hidden"
    >
      {{/* Top Bar: Navigation & Info */}}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-start gap-8 pb-8"
        style={{{{ borderBottom: "1px solid rgba(128,128,128,0.25)" }}}}
      >
        <nav className="flex flex-wrap gap-6 sm:gap-10 font-sans text-sm font-bold uppercase tracking-wider">
          <Link href="/menu" className="hover:opacity-60 transition-opacity">
            Menu
          </Link>
          <Link href="/reservations" className="hover:opacity-60 transition-opacity">
            Reservations
          </Link>
          <Link href="/locations" className="hover:opacity-60 transition-opacity">
            Outposts
          </Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">
            Our Story
          </Link>
        </nav>

        <div
          className="font-sans text-xs sm:text-right space-y-1"
          style={{{{ color: "{footer_text}99" }}}}
        >
          <p className="font-bold">OPEN DAILY: 11:30 AM – 11:30 PM</p>
          <p>BENGALURU OUTPOSTS</p>
        </div>
      </div>

      {{/* Center: Interactive Pixel-Dot Brand Name */}}
      <div className="my-auto py-8 flex items-center overflow-x-auto">
        <div className="scale-[clamp(0.3,3vw,0.8)] sm:scale-[clamp(0.4,4.5vw,0.9)] md:scale-100 origin-left transition-transform duration-200">
          <PixelText
            text="{brand_name}"
            dotSize={{11}}
            gap={{3}}
            color="{pixel_color}"
            explodeRadius={{110}}
            explodeForce={{28}}
            returnStiffness={{0.09}}
          />
        </div>
      </div>

      {{/* Bottom Bar: Contact & Back to Top */}}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pt-8 font-sans text-xs font-bold"
        style={{{{ borderTop: "1px solid rgba(128,128,128,0.25)" }}}}
      >
        <div className="space-y-1" style={{{{ color: "{footer_text}99" }}}}>
          <p className="font-extrabold text-sm" style={{{{ color: "{footer_text}" }}}}>
            +91 90729 64242
          </p>
          <p>contact@restaurant.com</p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-8">
          <p className="font-medium" style={{{{ color: "{footer_text}66" }}}}>
            © {{new Date().getFullYear()}} {brand_name}
          </p>
          <button
            type="button"
            onClick={{scrollToTop}}
            className="px-5 py-2.5 rounded-full border hover:opacity-80 transition-all uppercase tracking-wider font-extrabold flex items-center gap-2 active:scale-95 shadow-lg"
            style={{{{ borderColor: "{footer_text}40" }}}}
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}}
'''


def make_nav(primary_color: str, dark_bg: str) -> str:
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
        {{/* Brand Logo */}}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-64 sm:w-80 h-10">
            <Image
              src="/logo.svg"
              alt="Brand Logo"
              fill
              unoptimized
              className="object-contain object-left group-hover:opacity-90 transition-opacity duration-200"
              priority
            />
          </div>
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

        {{/* Primary CTA Button — inverts with theme */}}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{{{ backgroundColor: "{primary_color}", color: "#000000" }}}}
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}}
'''


# ─── Files copied directly from beyondburg-inc (same content, no customization) ───
COPY_DIRECTLY = [
    ("components/ui/PixelText.tsx",         True),   # NEW file
    ("components/ui/AtmosphereControls.tsx", False),  # overwrite
    ("components/ui/MorphSlider.tsx",        False),  # overwrite (data-image-overlay)
    ("components/ui/AccordionGallery.tsx",   False),  # overwrite (data-image-overlay)
    ("components/marketing/CinematicHero.tsx",     False),
    ("components/marketing/CinematicSmoothie.tsx", False),
    ("components/marketing/RestaurantLocations.tsx", False),
]


def get_layout_info(project_path: Path):
    """Read primaryColor, darkBg, lightBg from layout.tsx"""
    layout = project_path / "app" / "layout.tsx"
    if not layout.exists():
        return None, None, None
    content = layout.read_text()
    
    primary = re.search(r'primaryColor="(#[A-Fa-f0-9]{6})"', content)
    dark = re.search(r'darkBg="(#[A-Fa-f0-9]{6})"', content)
    light = re.search(r'lightBg="(#[A-Fa-f0-9]{6})"', content)
    
    return (
        primary.group(1) if primary else "#F5C418",
        dark.group(1) if dark else "#070709",
        light.group(1) if light else "#FAF7F2",
    )


def rollout_project(slug: str):
    project = PROJECTS / slug
    if not project.exists():
        print(f"  ⚠️  Skipping {slug} — directory not found")
        return

    brand = BRAND_CONFIG.get(slug)
    if not brand:
        # Fall back to reading from layout.tsx
        primary, dark_bg, _ = get_layout_info(project)
        brand = (primary, dark_bg, primary, "#000000", slug.replace("-", " ").upper())
    
    primary_color, dark_bg, footer_bg, footer_text, brand_name = brand

    # 1. Copy files directly from beyondburg-inc (no content change)
    for rel_path, is_new in COPY_DIRECTLY:
        src = SOURCE / rel_path
        dst = project / rel_path
        if src.exists():
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)

    # 2. Write brand-specific globals.css
    css_path = project / "app" / "globals.css"
    css_path.parent.mkdir(parents=True, exist_ok=True)
    css_path.write_text(make_globals_css(primary_color, dark_bg))

    # 3. Write brand-specific Footer.tsx
    footer_path = project / "components" / "marketing" / "Footer.tsx"
    footer_path.parent.mkdir(parents=True, exist_ok=True)
    footer_path.write_text(make_footer(primary_color, footer_bg, footer_text, brand_name))

    # 4. Write brand-specific Nav.tsx
    nav_path = project / "components" / "marketing" / "Nav.tsx"
    nav_path.parent.mkdir(parents=True, exist_ok=True)
    nav_path.write_text(make_nav(primary_color, dark_bg))

    print(f"  ✓ {slug} [{primary_color}]")


def main():
    print("🚀 Beyondburg Standard Rollout — 23 projects")
    print("=" * 60)
    
    targets = sorted([
        d.name for d in PROJECTS.iterdir()
        if d.is_dir() and d.name not in SKIP
    ])
    
    for slug in targets:
        rollout_project(slug)
    
    print()
    print("=" * 60)
    print(f"✅ Rollout complete — {len(targets)} projects updated!")
    print()
    print("Next: run 'npm run build' in a few projects to verify.")


if __name__ == "__main__":
    main()
