#!/usr/bin/env python3
"""
Upgrade Scroll Stages, Navigation Logos, and 3-Line Thick PixelText across all projects.
1. CinematicHero.tsx -> Scroll-driven dynamic text transitions across 3 kinetic stages.
2. CinematicSmoothie.tsx -> Scroll-driven dynamic text transitions across 2 tasting stages with recipe hotspot overlays.
3. Nav.tsx -> Logo icon displayed properly beside the bold uppercase brand name.
4. PixelText.tsx & Footer.tsx -> 3-pair lines of dots per stroke for extra thick, bold typography.
"""

import sys
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
sys.path.insert(0, str(ROOT))

from personalize_all_websites import ALL_BRANDS

PROJECTS_DIR = ROOT / "projects"
SOURCE_PT = PROJECTS_DIR / "beyondburg-inc" / "components" / "ui" / "PixelText.tsx"


def generate_staged_cinematic_hero(brand):
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
                className="px-8 py-4 rounded-full transition-all shadow-2xl hover:brightness-110 hover:scale-105 active:scale-95 flex items-center gap-2"
                style={{{{ backgroundColor: "{primary}", color: "#000000" }}}}
              >
                <span>Explore Menu</span>
                <span>→</span>
              </Link>
              <Link
                href="/locations"
                className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-full hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 transition-all shadow-xl"
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
                className="px-8 py-4 rounded-full transition-all shadow-2xl hover:brightness-110 hover:scale-105 active:scale-95 flex items-center gap-2"
                style={{{{ backgroundColor: "{primary}", color: "#000000" }}}}
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


def generate_staged_cinematic_smoothie(brand):
    primary = brand["primary_color"]
    line1, line2 = brand["signature_craving"]

    return f'''"use client";

import React, {{ useState }} from "react";
import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 240;
const SMOOTHIE_FRAMES = Array.from({{ length: FRAME_COUNT }}, (_, i) =>
  `/frames/smoothie/frame_${{String(i).padStart(6, "0")}}.webp`
);

function getStage(progress: number): 1 | 2 {{
  if (progress < 0.45) return 1;
  return 2;
}}

export default function CinematicSmoothie() {{
  const [progress, setProgress] = useState(0);
  const stage = getStage(progress);
  const currentFrame = Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1);

  return (
    <CanvasScrubber
      frames={{SMOOTHIE_FRAMES}}
      scrollDistance="+=250%"
      onProgress={{setProgress}}
      overlayGradient
      preloadCount={{60}}
    >
      <div data-image-overlay className="h-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 relative select-none">
        
        {{/* ── Stage 1: Signature Craving Reveal (0–45% Scroll) ── */}}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{{{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(-30px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}}}
        >
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 inline-block font-bold" style={{{{ color: "{primary}" }}}}>
              HOUSE SIGNATURE CRAVING
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              {line1} <br />
              <span style={{{{ color: "{primary}" }}}}>{line2}</span>
            </h2>

            <p className="type-serif text-base sm:text-xl text-stone-200 max-w-xl leading-relaxed drop-shadow">
              Hand-spun gelato, pure cream infusions, and real malt crumbles.
            </p>
          </div>
        </div>

        {{/* ── Stage 2: Velvet Texture & Balance (45–100% Scroll) ── */}}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{{{
            opacity: stage === 2 ? 1 : 0,
            transform: stage === 2 ? "translateY(0)" : "translateY(30px)",
            pointerEvents: stage === 2 ? "auto" : "none",
          }}}}
        >
          <div className="max-w-2xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 inline-block font-bold" style={{{{ color: "{primary}" }}}}>
              CHILL & EMULSION SPECIFICATION
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl text-white leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              VELVET TEXTURE & BALANCE
            </h2>

            <p className="type-serif text-base sm:text-xl text-stone-200 max-w-xl leading-relaxed drop-shadow">
              Slow-churned to ultra-dense consistency with balanced sweetness and creamy velvet mouthfeel.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/menu"
                className="px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-2xl hover:brightness-110 hover:scale-105 active:scale-95 flex items-center gap-2"
                style={{{{ backgroundColor: "{primary}", color: "#000000" }}}}
              >
                <span>Explore Shakes & Beverages</span>
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


def generate_logo_nav(brand):
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
        {{/* Brand Logo and Name displayed side by side */}}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/15 p-1 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.svg"
              alt="{name} Logo"
              width={{26}}
              height={{26}}
              unoptimized
              className="object-contain"
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

        {{/* Primary CTA Button — inverts with theme */}}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{{{ backgroundColor: "{primary}", color: "#000000" }}}}
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}}
'''


def upgrade_project(slug, brand):
    project = PROJECTS_DIR / slug
    if not project.exists():
        return

    # Skip smash-guys because user requested template as it is
    if slug == "smash-guys":
        return

    marketing = project / "components" / "marketing"
    ui = project / "components" / "ui"

    # 1. PixelText.tsx (copy updated 3-line thick version)
    if SOURCE_PT.exists() and (ui / "PixelText.tsx") != SOURCE_PT:
        shutil.copy2(SOURCE_PT, ui / "PixelText.tsx")

    # 2. CinematicHero.tsx
    (marketing / "CinematicHero.tsx").write_text(generate_staged_cinematic_hero(brand))

    # 3. CinematicSmoothie.tsx
    (marketing / "CinematicSmoothie.tsx").write_text(generate_staged_cinematic_smoothie(brand))

    # 4. Nav.tsx (Logo beside name)
    (marketing / "Nav.tsx").write_text(generate_logo_nav(brand))

    print(f"  ✓ Upgraded {slug} with staged frame text, logo nav & 3-line thick PixelText")


def main():
    print("🚀 Upgrading scroll-driven frame stages, nav logos, and 3-line thick PixelText across all projects...")
    for slug, brand in ALL_BRANDS.items():
        upgrade_project(slug, brand)
    print("🎉 All projects upgraded!")


if __name__ == "__main__":
    main()
