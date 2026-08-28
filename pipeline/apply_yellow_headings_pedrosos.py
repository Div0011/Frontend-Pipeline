#!/usr/bin/env python3
"""
Updates Pedroso's Pizza to have all heading texts (hero title, section titles,
headings over frames/images, and key accents) written in authentic Butter Yellow/Gold (#F2C777).
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
PP_DIR = ROOT / "projects" / "pedrosos-pizza"

def update_globals_css():
    css_file = PP_DIR / "app" / "globals.css"
    content = """@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;700;900&display=swap');
@import "tailwindcss";

@theme {
  --color-char: #122B1E;
  --color-char-soft: #1B3B2B;
  --color-char-mute: #284F3B;
  --color-smoke: #8FAEA0;
  --color-stone: #C5D9CE;
  --color-bone: #FAF8F2;
  --color-bone-warm: #F4EFE6;
  --color-bone-dark: #E4DCCF;
  --color-ember: #D91C24;
  --color-ember-glow: #F04F3F;
  --color-yolk: #F2C777;
  --color-yolk-light: #FCE7B2;
  
  --font-display: 'Bebas Neue', 'Space Grotesk', Impact, sans-serif;
  --font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* ─── Pedroso's Pizza: Deep Black / Red / Yellow Palette ────────────── */
:root {
  --bg:                  #0A0A0A;
  --fg:                  #FFFFFF;
  --fg-muted:            rgba(255, 255, 255, 0.65);
  --fg-sub:              rgba(255, 255, 255, 0.40);
  --border:              rgba(242, 199, 119, 0.20);
  --primary:             #D91C24;
  --accent-yellow:       #F2C777;
  
  /* Buttons in Dark Theme: Bold Red with Crisp White text */
  --btn-primary-bg:      #D91C24;
  --btn-primary-fg:      #FFFFFF;
  --btn-secondary-bg:    rgba(255, 255, 255, 0.08);
  --btn-secondary-fg:    #F2C777;
  --btn-secondary-border:rgba(242, 199, 119, 0.35);
  --btn-invert-bg:       #F2C777;
  --btn-invert-fg:       #0A0A0A;
}

html.light {
  --bg:                  #FBF8F0;
  --fg:                  #0A0A0A;
  --fg-muted:            rgba(10, 10, 10, 0.70);
  --fg-sub:              rgba(10, 10, 10, 0.45);
  --border:              rgba(217, 28, 36, 0.15);
  --primary:             #D91C24;
  --accent-yellow:       #D49B1F;
  
  /* Buttons in Light Theme: Inverts to Deep Black with Crisp White text */
  --btn-primary-bg:      #0A0A0A;
  --btn-primary-fg:      #FFFFFF;
  --btn-secondary-bg:    rgba(10, 10, 10, 0.06);
  --btn-secondary-fg:    #D91C24;
  --btn-secondary-border:rgba(217, 28, 36, 0.25);
  --btn-invert-bg:       #D91C24;
  --btn-invert-fg:       #FFFFFF;
}

/* ─── Base ─────────────────────────────────────────────────────────── */
*, *::before, *::after {
  cursor: none !important;
}

input, textarea, select, [contenteditable] {
  cursor: text !important;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-body), sans-serif;
  overflow-x: hidden;
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* All Headings & Display Titles in Pedroso's Authentic Yellow/Gold */
h1, h2, h3, h4, .type-display {
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
  color: #F2C777 !important;
}

/* Headings over image frames & canvas overlays */
[data-image-overlay] h1,
[data-image-overlay] h2,
[data-image-overlay] h3,
.img-overlay-text h1,
.img-overlay-text h2,
.img-overlay-text h3 {
  color: #F2C777 !important;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.8);
}

/* ─── BUTTONS: Theme-Inverting Engine ──────────────────────────────── */
.btn-primary {
  background-color: var(--btn-primary-bg) !important;
  color: var(--btn-primary-fg) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
  filter: brightness(1.15);
  transform: scale(1.03);
}

.btn-secondary {
  background-color: var(--btn-secondary-bg) !important;
  color: var(--btn-secondary-fg) !important;
  border: 1px solid var(--btn-secondary-border) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-secondary:hover {
  background-color: rgba(242, 199, 119, 0.15) !important;
  transform: scale(1.03);
}
"""
    css_file.write_text(content)
    print("  ✓ Updated globals.css with yellow headings for Pedroso's Pizza.")


def update_hero():
    hero_file = PP_DIR / "components" / "marketing" / "CinematicHero.tsx"
    if not hero_file.exists():
        return
    
    content = hero_file.read_text()
    content = re.sub(r'className="([^"]*type-display[^"]*)text-white([^"]*)"', r'className="\1text-[#F2C777]\2"', content)
    content = re.sub(r'className="([^"]*type-display[^"]*)text-black([^"]*)"', r'className="\1text-[#F2C777]\2"', content)
    
    hero_file.write_text(content)
    print("  ✓ CinematicHero.tsx updated with text-[#F2C777] headings.")


def update_smoothie():
    sm_file = PP_DIR / "components" / "marketing" / "CinematicSmoothie.tsx"
    if not sm_file.exists():
        return
    
    content = sm_file.read_text()
    content = re.sub(r'className="([^"]*type-display[^"]*)text-white([^"]*)"', r'className="\1text-[#F2C777]\2"', content)
    content = re.sub(r'className="([^"]*type-display[^"]*)text-black([^"]*)"', r'className="\1text-[#F2C777]\2"', content)
    
    sm_file.write_text(content)
    print("  ✓ CinematicSmoothie.tsx updated with text-[#F2C777] headings.")


def update_all_sections():
    sections = [
        "BrandManifesto.tsx", "HowWeSmash.tsx", "RestaurantLocations.tsx",
        "ReservationCTA.tsx", "CulinaryAccordionGallery.tsx", "ArchetypeShowcase.tsx",
        "SignatureMenu.tsx", "Nav.tsx"
    ]
    for s in sections:
        fp = PP_DIR / "components" / "marketing" / s
        if fp.exists():
            txt = fp.read_text()
            txt = re.sub(r'className="([^"]*type-display[^"]*)text-white([^"]*)"', r'className="\1text-[#F2C777]\2"', txt)
            txt = re.sub(r'className="([^"]*type-display[^"]*)text-black([^"]*)"', r'className="\1text-[#F2C777]\2"', txt)
            fp.write_text(txt)

    print("  ✓ All section headings in Pedroso's Pizza updated to #F2C777.")


def main():
    print("👉 Setting all headings & key texts in Pedroso's Pizza to Yellow (#F2C777)...")
    update_globals_css()
    update_hero()
    update_smoothie()
    update_all_sections()
    print("🎉 All headings in Pedroso's Pizza are now Yellow (#F2C777)!")


if __name__ == "__main__":
    main()
