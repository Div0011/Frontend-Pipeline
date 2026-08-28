#!/usr/bin/env python3
"""
Enhanced Beyondburg Standard Rollout with Deep Brand Data.
Updates Footers, Navs, AtmosphereControls, and Globals with full authenticity per brand.
"""

import os
import sys
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
sys.path.insert(0, str(ROOT))

from personalize_all_websites import ALL_BRANDS

ROOT = Path(__file__).parent.parent
PROJECTS = ROOT / "projects"
SOURCE = PROJECTS / "beyondburg-inc"

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


def make_footer(brand: dict) -> str:
    footer_bg = brand["footer_bg"]
    footer_text = brand["footer_text"]
    brand_name = brand["name"]
    hours = brand.get("hours", "11:30 AM – 11:30 PM")
    city_footer = brand.get("city_footer", "OUTPOSTS")
    phone = brand.get("phone", "+91 90729 64242")
    address = brand.get("address", "Flagship Atelier")
    email = brand.get("email", "hello@restaurant.com")

    pixel_color = footer_text

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
          <p className="font-bold">OPEN DAILY: {hours}</p>
          <p>{city_footer}</p>
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
            {phone}
          </p>
          <p>{address}</p>
          <p>{email}</p>
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


def make_nav(brand: dict) -> str:
    primary_color = brand["primary_color"]
    dark_bg = brand["dark_bg"]
    brand_name = brand["name"]

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
        {{/* Brand Logo / Name */}}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-64 sm:w-80 h-10">
            <Image
              src="/logo.svg"
              alt="{brand_name}"
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


def rollout_all():
    print("🚀 Rolling out enhanced personalized footers, navs, and CSS across all 24 projects...")
    for slug, brand in ALL_BRANDS.items():
        project = PROJECTS / slug
        if not project.exists():
            continue

        # 1. PixelText.tsx
        src_pt = SOURCE / "components" / "ui" / "PixelText.tsx"
        dst_pt = project / "components" / "ui" / "PixelText.tsx"
        dst_pt.parent.mkdir(parents=True, exist_ok=True)
        if src_pt.exists() and src_pt != dst_pt:
            shutil.copy2(src_pt, dst_pt)

        # 2. AtmosphereControls.tsx
        src_ac = SOURCE / "components" / "ui" / "AtmosphereControls.tsx"
        dst_ac = project / "components" / "ui" / "AtmosphereControls.tsx"
        if src_ac.exists() and src_ac != dst_ac:
            shutil.copy2(src_ac, dst_ac)

        # 3. globals.css
        css_path = project / "app" / "globals.css"
        css_path.write_text(make_globals_css(brand["primary_color"], brand["dark_bg"]))

        # 4. Footer.tsx
        footer_path = project / "components" / "marketing" / "Footer.tsx"
        footer_path.write_text(make_footer(brand))

        # 5. Nav.tsx
        nav_path = project / "components" / "marketing" / "Nav.tsx"
        nav_path.write_text(make_nav(brand))

        print(f"  ✓ Updated {slug} with personalized footer & navigation")

    print("🎉 All 24 projects updated with real personalized contact & UI assets!")


if __name__ == "__main__":
    rollout_all()
