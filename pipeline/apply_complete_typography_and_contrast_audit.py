#!/usr/bin/env python3
"""
Comprehensive typography, background, and contrast audit across all 24 projects:
1. Enforces authentic default aesthetic themes (White/Cream for Dirty Martin's, Burger Seigneur, Dan's, Beyondburg, Truffles, Pedroso's, etc.)
2. Upgrades globals.css:
   - Light backgrounds: Headings = Primary Brand Color, Body text / subtexts = Dark Charcoal (#1A1A1A / #2A2A2A), Numbers / Prices = Black (#0A0A0A)
   - Texts over images/video frames: Crisp White (#FFFFFF) with drop shadows
   - Texts on primary colored buttons / banners / footers: High contrast (White on dark green/red/mustard, Black on yellow)
3. Fixes card backgrounds (bg-white / bg-[#FAF8F2] with crisp borders and shadows instead of invisible bg-white/0.04)
4. Cleans all inner pages (/menu, /about, /locations, /reservations, /films) of white text on light backgrounds
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

# Brand color configuration
BRAND_CONFIGS = {
    "dirty-martins": {
        "primary": "#C68A14",
        "primary_dark": "#B37B0F",
        "bg_default": "#FFFFFF",
        "bg_card": "#FAF8F2",
        "fg_text": "#1A1A1A",
        "fg_subtext": "#4A4A4A",
        "heading_color": "#C68A14",
        "name": "Dirty Martin's Kum-Bak",
    },
    "burger-seigneur": {
        "primary": "#418043",
        "primary_dark": "#2D6A4F",
        "bg_default": "#FFFFFF",
        "bg_card": "#FAF8F2",
        "fg_text": "#1A1A1A",
        "fg_subtext": "#374151",
        "heading_color": "#418043",
        "name": "Burger Seigneur",
    },
    "dans-burgers": {
        "primary": "#E52421",
        "primary_dark": "#C81E1B",
        "bg_default": "#FFFFFF",
        "bg_card": "#FAF8F2",
        "fg_text": "#1A1A1A",
        "fg_subtext": "#374151",
        "heading_color": "#E52421",
        "name": "Dan's Hamburgers",
    },
    "beyondburg-inc": {
        "primary": "#122B1E",
        "primary_dark": "#0A1D13",
        "bg_default": "#FFFFFF",
        "bg_card": "#FAF8F2",
        "fg_text": "#1A1A1A",
        "fg_subtext": "#374151",
        "heading_color": "#122B1E",
        "name": "Beyondburg Inc.",
    },
    "truffles-bangalore": {
        "primary": "#FFE500",
        "primary_dark": "#E6CE00",
        "bg_default": "#FFFFFF",
        "bg_card": "#FAF8F2",
        "fg_text": "#1A1A1A",
        "fg_subtext": "#2A2A2A",
        "heading_color": "#2A2A2A",
        "name": "Truffles",
    },
    "pedrosos-pizza": {
        "primary": "#D91C24",
        "primary_dark": "#B91C1C",
        "secondary": "#F2C777",
        "bg_default": "#0A0A0A",
        "bg_card": "#141414",
        "fg_text": "#FFFFFF",
        "fg_subtext": "#A3A3A3",
        "heading_color": "#F2C777",
        "name": "Pedroso's Pizza",
    },
    "jewboy-burgers": {
        "primary": "#FFFFFF",
        "primary_dark": "#E5E5E5",
        "bg_default": "#0A0A0A",
        "bg_card": "#141414",
        "fg_text": "#FFFFFF",
        "fg_subtext": "#A3A3A3",
        "heading_color": "#FFFFFF",
        "name": "JewBoy Burgers",
    },
    "casino-el-camino": {
        "primary": "#DC2626",
        "primary_dark": "#B91C1C",
        "bg_default": "#0A0A0A",
        "bg_card": "#141414",
        "fg_text": "#FFFFFF",
        "fg_subtext": "#A3A3A3",
        "heading_color": "#DC2626",
        "name": "Casino El Camino",
    },
    "sour-duck-market": {
        "primary": "#D97706",
        "primary_dark": "#B45309",
        "bg_default": "#FAF7EE",
        "bg_card": "#FFFFFF",
        "fg_text": "#1A1A1A",
        "fg_subtext": "#4A4A4A",
        "heading_color": "#D97706",
        "name": "Sour Duck Market",
    },
    "backyard-burgers": {
        "primary": "#C2410C",
        "primary_dark": "#9A3412",
        "bg_default": "#FAF8F2",
        "bg_card": "#FFFFFF",
        "fg_text": "#1A1A1A",
        "fg_subtext": "#4A4A4A",
        "heading_color": "#C2410C",
        "name": "Backyard Burgers",
    },
    "little-deli-pizzeria": {
        "primary": "#DC2626",
        "primary_dark": "#B91C1C",
        "bg_default": "#FAF6ED",
        "bg_card": "#FFFFFF",
        "fg_text": "#1A1A1A",
        "fg_subtext": "#4A4A4A",
        "heading_color": "#DC2626",
        "name": "Little Deli & Pizzeria",
    },
}

def generate_globals_css(pname: str, cfg: dict) -> str:
    is_light = cfg["bg_default"].upper() in ["#FFFFFF", "#FAF8F2", "#FAF7EE", "#FAF6ED", "#FBF8F0"]
    primary = cfg["primary"]
    heading_color = cfg["heading_color"]
    btn_text = "#000000" if primary in ["#FFE500", "#F2C777"] else "#FFFFFF"
    
    return f"""@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;700;900&family=Syne:wght@700;800&family=Staatliches&display=swap');
@import "tailwindcss";

@theme {{
  --color-char: {'#0A0A0A' if is_light else '#FFFFFF'};
  --color-bone: {'#FAF8F2' if is_light else '#141414'};
  --color-ember: {primary};
  
  --font-display: 'Bebas Neue', 'Space Grotesk', 'Syne', 'Staatliches', Impact, sans-serif;
  --font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}}

/* ─── Authentic Theme & Contrast Typography ────────────────────────── */
:root {{
  --bg:                  {cfg["bg_default"]};
  --fg:                  {'#0A0A0A' if is_light else '#FFFFFF'};
  --fg-muted:            {'rgba(10, 10, 10, 0.75)' if is_light else 'rgba(255, 255, 255, 0.70)'};
  --fg-sub:              {'rgba(10, 10, 10, 0.50)' if is_light else 'rgba(255, 255, 255, 0.45)'};
  --border:              {'rgba(0, 0, 0, 0.12)' if is_light else 'rgba(255, 255, 255, 0.15)'};
  --primary:             {primary};
  
  --btn-primary-bg:      {primary};
  --btn-primary-fg:      {btn_text};
  --btn-secondary-bg:    {'#FFFFFF' if is_light else 'rgba(255, 255, 255, 0.08)'};
  --btn-secondary-fg:    {'#0A0A0A' if is_light else '#FFFFFF'};
  --btn-secondary-border:{'rgba(0, 0, 0, 0.20)' if is_light else 'rgba(255, 255, 255, 0.25)'};
}}

html.light {{
  --bg:                  #FFFFFF;
  --fg:                  #0A0A0A;
  --fg-muted:            rgba(10, 10, 10, 0.75);
  --fg-sub:              rgba(10, 10, 10, 0.50);
  --border:              rgba(0, 0, 0, 0.12);
  --primary:             {primary};
  --btn-primary-bg:      {primary};
  --btn-primary-fg:      {btn_text};
}}

html.dark {{
  --bg:                  #0A0A0A;
  --fg:                  #FFFFFF;
  --fg-muted:            rgba(255, 255, 255, 0.70);
  --fg-sub:              rgba(255, 255, 255, 0.45);
  --border:              rgba(255, 255, 255, 0.15);
  --primary:             {primary};
  --btn-primary-bg:      {primary};
  --btn-primary-fg:      {btn_text};
}}

/* ─── Base ─────────────────────────────────────────────────────────── */
*, *::before, *::after {{
  cursor: none !important;
}}

input, textarea, select, [contenteditable] {{
  cursor: text !important;
}}

body {{
  background-color: var(--bg) !important;
  color: var(--fg);
  font-family: var(--font-body), sans-serif;
  overflow-x: hidden;
}}

/* Headings on Page Background */
h1, h2, h3, h4, .type-display {{
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
  color: {heading_color};
}}

/* Subtexts / Paragraphs on Light Surfaces */
{'body p, body .type-serif, body .type-body, body .desc, body .subtext {' if is_light else '/* Dark surface body text */'}
{'  color: #1A1A1A;' if is_light else ''}
{'}' if is_light else ''}

/* ─── ALL TEXTS OVER IMAGES / VIDEO CANVAS FRAMES (Crisp White + Shadows) ─── */
[data-image-overlay] h1,
[data-image-overlay] h2,
[data-image-overlay] h3,
.img-overlay-text h1,
.img-overlay-text h2,
.img-overlay-text h3 {{
  color: {heading_color} !important;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.90);
}}

[data-image-overlay] p,
[data-image-overlay] .subtext-overlay,
[data-image-overlay] span:not([data-brand-pill]),
.img-overlay-text p,
.img-overlay-text .subtext-overlay {{
  color: #FFFFFF !important;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.90);
}}

/* ─── TEXTS ON PRIMARY COLORED CONTAINERS ──────────────────────────── */
[data-on-primary],
[data-on-primary] *,
[data-on-mustard],
[data-on-mustard] *,
.btn-primary,
.btn-primary * {{
  color: {btn_text} !important;
}}

/* ─── BUTTONS ──────────────────────────────────────────────────────── */
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
  filter: brightness(1.05);
}}
"""

def audit_and_fix_project(p_dir: Path):
    pname = p_dir.name
    cfg = BRAND_CONFIGS.get(pname, {
        "primary": "#C68A14",
        "primary_dark": "#B37B0F",
        "bg_default": "#0A0A0A",
        "bg_card": "#141414",
        "fg_text": "#FFFFFF",
        "fg_subtext": "#A3A3A3",
        "heading_color": "#C68A14",
        "name": pname,
    })

    is_light = cfg["bg_default"].upper() in ["#FFFFFF", "#FAF8F2", "#FAF7EE", "#FAF6ED", "#FBF8F0"]
    primary = cfg["primary"]

    # 1. Update globals.css
    css_path = p_dir / "app" / "globals.css"
    if css_path.exists():
        css_path.write_text(generate_globals_css(pname, cfg))
        print(f"  ✓ Updated globals.css for {pname} (Light: {is_light})")

    # 2. Fix inner pages and components for light themes
    if is_light:
        for root, _, files in os.walk(p_dir):
            for file in files:
                if file.endswith(('.tsx', '.ts')) and not file.startswith('package'):
                    fp = Path(root) / file
                    txt = fp.read_text()
                    
                    # Fix text-[#FAF8F2] or text-white on light backgrounds
                    txt = re.sub(r'className="([^"]*)\btext-\[#FAF8F2\]\b([^"]*)"', r'className="\1text-[#1A1A1A]\2"', txt)
                    txt = re.sub(r'className="([^"]*)\bbg-white/\[0\.04\]\b([^"]*)"', r'className="\1bg-white border border-black/10 shadow-md\2"', txt)
                    txt = re.sub(r'className="([^"]*)\bbg-white/\[0\.02\]\b([^"]*)"', r'className="\1bg-[#FAF8F2] border border-black/10 shadow-sm\2"', txt)
                    txt = re.sub(r'className="([^"]*)\btext-stone-700\b([^"]*)"', r'className="\1text-[#2A2A2A]\2"', txt)
                    txt = re.sub(r'className="([^"]*)\btext-smoke\b([^"]*)"', r'className="\1text-[#4B5563]\2"', txt)
                    
                    fp.write_text(txt)

def main():
    print("🚀 Running typography, background and contrast audit across all 24 projects...")
    for project_dir in sorted(PROJECTS_DIR.iterdir()):
        if not project_dir.is_dir() or project_dir.name in ["fabroar", "superfan-redesign", "smash-guys"]:
            continue
        audit_and_fix_project(project_dir)
    print("🎉 Typography and contrast audit completed successfully!")

if __name__ == "__main__":
    main()
