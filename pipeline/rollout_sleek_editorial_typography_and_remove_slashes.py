#!/usr/bin/env python3
"""
Roll out Sleek Modern Editorial Typography and Remove Computerized font-mono & Double Slashes (//):
- Replace computerized font-mono with refined font-sans / font-body
- Replace all '//' with clean numbered formats ('01.', '02.') or clean titles
- Maintain ultra-minimal, bold, high-end agency design
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def clean_component_typography(file_path: str):
    if not os.path.exists(file_path):
        return
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Replace double slashes in UI text (not code comments or URLs)
    content = re.sub(r'(\d+)\s*\/\/\s*', r'\1. ', content)
    content = content.replace(" // CULINARY BOARD", "")
    content = content.replace(" // PHYSICAL OUTPOSTS", "")
    content = content.replace(" // TABLE RESERVATIONS", "")
    content = content.replace(" // VIP PASS", "")
    content = content.replace(" // CRAFT LAB & SCIENCE", "")
    content = content.replace(" // 450°F STEEL", "")
    content = content.replace(" // WOOD FIRE", "")

    # 2. Replace computerized font-mono with clean modern font-sans
    content = content.replace("font-mono", "font-sans")

    # 3. Clean up [LAYER 1] to Layer 1:
    content = re.sub(r'\[LAYER\s*\{([^}]+)\}\]', r'Layer {\1}:', content)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

def update_hero(project_dir: str, slug: str, cfg: dict):
    hero_path = os.path.join(project_dir, "components", "marketing", "CinematicHero.tsx")
    if not os.path.exists(hero_path):
        return

    name = cfg.get("name", slug.title())
    short_name = cfg.get("short_name", name.upper())
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#FFFFFF")

    code = f"""\"use client\";

import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  {{ length: 248 }},
  (_, i) => `/frames/burger/frame_${{String(i).padStart(6, "0")}}.webp`
);

export default function CinematicHero() {{
  return (
    <CanvasScrubber frames={{frames}} scrollDistance="+=350%">
      <div className="h-full w-full flex flex-col justify-center p-8 sm:p-12 md:p-20 relative pointer-events-none">
        <div className="max-w-4xl space-y-6">
          <h1 className="type-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white leading-none font-black tracking-tight">
            {short_name}
          </h1>

          <div className="pt-2 pointer-events-auto flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
            <Link
              href="/menu"
              className="px-8 py-4 rounded-xl transition-all shadow-2xl hover:brightness-110 active:scale-95 flex items-center gap-2"
              style={{{{ backgroundColor: "{primary}", color: "{text_on_primary}" }}}}
            >
              <span>Explore Menu</span>
              <span>→</span>
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-xl hover:border-white/40 active:scale-95 transition-all"
            >
              Outposts
            </Link>
          </div>
        </div>
      </div>
    </CanvasScrubber>
  );
}}
"""
    with open(hero_path, "w", encoding="utf-8") as f:
        f.write(code)

def update_nav(project_dir: str, slug: str, cfg: dict):
    nav_path = os.path.join(project_dir, "components", "marketing", "Nav.tsx")
    if not os.path.exists(nav_path):
        return

    name = cfg.get("name", slug.title())
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#FFFFFF")

    code = f"""\"use client\";

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
          ? "bg-[#0a0a0c]/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-4"
      }} text-white`}}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {{/* Brand Logo */}}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-64 sm:w-80 h-10">
            <Image
              src="/logo.svg"
              alt="{name}"
              fill
              unoptimized
              className="object-contain object-left group-hover:opacity-90 transition-opacity duration-200"
              priority
            />
          </div>
        </Link>

        {{/* Nav Links */}}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold tracking-wider uppercase text-stone-300">
          <Link href="/menu" className="hover:text-white transition-colors">
            Menu
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            Our Story
          </Link>
          <Link href="/locations" className="hover:text-white transition-colors">
            Locations
          </Link>
          <Link href="/films" className="hover:text-white transition-colors">
            Films
          </Link>
        </nav>

        {{/* Primary CTA Button */}}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{{{
              backgroundColor: "{primary}",
              color: "{text_on_primary}",
            }}}}
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}}
"""
    with open(nav_path, "w", encoding="utf-8") as f:
        f.write(code)

def update_how_we_smash(project_dir: str, slug: str, cfg: dict):
    hws_path = os.path.join(project_dir, "components", "marketing", "HowWeSmash.tsx")
    if not os.path.exists(hws_path):
        return

    name = cfg.get("name", slug.title())
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#FFFFFF")
    food_type = cfg.get("food_type", "burger")

    if food_type == "pizza":
        title = "WOOD-FIRE SCIENCE"
        slider_title = "OVEN TEMPERATURE & CRUST LEAVENING GAUGE"
        init_temp = 900
        min_temp, max_temp = 500, 1000
        step1_title = "72-Hour Fermentation"
        step2_title = "900°F Deck Contact"
        step3_title = "San Marzano D.O.P. Melt"
    else:
        title = "MAILLARD SCIENCE"
        slider_title = "FLAT-TOP TEMPERATURE & CARAMELIZATION GAUGE"
        init_temp = 450
        min_temp, max_temp = 250, 500
        step1_title = "Steel Press Weight"
        step2_title = "450°F Sear Surface"
        step3_title = "Butter Toasted Roll"

    code = f"""\"use client\";

import React, {{ useState }} from "react";
import {{ motion }} from "framer-motion";

export default function HowWeSmash() {{
  const [tempValue, setTempValue] = useState({init_temp});
  const crustPercent = Math.min(100, Math.max(10, Math.round(((tempValue - {min_temp}) / ({max_temp - min_temp})) * 100)));

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {{/* Section Header */}}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-white/10 pb-6">
          <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
            {title}
          </h2>
          <span
            className="font-sans text-xs uppercase font-bold px-4 py-1.5 rounded-full border shadow"
            style={{{{
              backgroundColor: "{primary}15",
              color: "{primary}",
              borderColor: "{primary}40",
            }}}}
          >
            Craft Standard
          </span>
        </div>

        {{/* Interactive Temperature Simulator Card */}}
        <div className="p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-wider font-bold" style={{{{ color: "{primary}" }}}}>
                Interactive Heat Control
              </span>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                {slider_title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-sans text-3xl font-black" style={{{{ color: "{primary}" }}}}>
                {{tempValue}}°F
              </span>
            </div>
          </div>

          {{/* Custom Range Slider */}}
          <div className="space-y-2">
            <input
              type="range"
              min="{min_temp}"
              max="{max_temp}"
              step="5"
              value={{tempValue}}
              onChange={{(e) => setTempValue(Number(e.target.value))}}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-white transition-all"
            />
            <div className="flex justify-between text-xs font-sans text-stone-400 font-semibold">
              <span>{min_temp}°F (Low)</span>
              <span style={{{{ color: "{primary}" }}}}>{init_temp}°F (Optimal Craft)</span>
              <span>{max_temp}°F (Max)</span>
            </div>
          </div>

          {{/* Telemetry Gauges */}}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-sans">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-stone-300">Crust Caramelization</span>
                <span className="font-bold" style={{{{ color: "{primary}" }}}}>{{crustPercent}}%</span>
              </div>
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{{{ width: `${{crustPercent}}%`, backgroundColor: "{primary}" }}}}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-stone-300">Juice Retention</span>
                <span className="font-bold" style={{{{ color: "{primary}" }}}}>
                  {{Math.max(60, 100 - Math.round(crustPercent * 0.25))}}%
                </span>
              </div>
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{{{
                    width: `${{Math.max(60, 100 - Math.round(crustPercent * 0.25))}}%`,
                    backgroundColor: "{primary}",
                  }}}}
                />
              </div>
            </div>
          </div>
        </div>

        {{/* 3 Clean Step Cards */}}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider block" style={{{{ color: "{primary}" }}}}>
              01. Stage
            </span>
            <h4 className="type-display text-xl text-white font-bold">
              {step1_title}
            </h4>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider block" style={{{{ color: "{primary}" }}}}>
              02. Stage
            </span>
            <h4 className="type-display text-xl text-white font-bold">
              {step2_title}
            </h4>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider block" style={{{{ color: "{primary}" }}}}>
              03. Stage
            </span>
            <h4 className="type-display text-xl text-white font-bold">
              {step3_title}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}}
"""
    with open(hws_path, "w", encoding="utf-8") as f:
        f.write(code)

def main():
    print("🚀 Rolling out sleek editorial typography and removing '//' across all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue

        marketing_dir = os.path.join(project_dir, "components", "marketing")
        
        # 1. Update Hero & Nav
        update_hero(project_dir, slug, cfg)
        update_nav(project_dir, slug, cfg)
        update_how_we_smash(project_dir, slug, cfg)

        # 2. Clean typography and slashes across all files in marketing
        for fname in os.listdir(marketing_dir):
            if fname.endswith(".tsx"):
                clean_component_typography(os.path.join(marketing_dir, fname))

        print(f"✓ Modernized typography for {slug}")

    print("\n🎉 Modernized typography & clean aesthetic rollout completed across all 24 projects!")

if __name__ == "__main__":
    main()
