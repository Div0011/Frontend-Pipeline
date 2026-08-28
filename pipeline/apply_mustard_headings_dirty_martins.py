#!/usr/bin/env python3
"""
Updates Dirty Martin's to have all heading texts (hero title, section titles,
headings over frames/images) written in authentic Dark Mustard (#C68A14).
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
DM_DIR = ROOT / "projects" / "dirty-martins"

def update_globals_css():
    css_file = DM_DIR / "app" / "globals.css"
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
  --color-ember: #DE3B2B;
  --color-ember-glow: #F04F3F;
  --color-yolk: #C68A14;
  --color-yolk-light: #E5A93C;
  
  --font-display: 'Bebas Neue', 'Space Grotesk', Impact, sans-serif;
  --font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* ─── Dirty Martin's: Pure White Background & Dark Mustard Headings ─── */
:root, html.light, html.dark {
  --bg:                  #FFFFFF;
  --fg:                  #0A0A0A;
  --fg-muted:            rgba(10, 10, 10, 0.70);
  --fg-sub:              rgba(10, 10, 10, 0.45);
  --border:              rgba(198, 138, 20, 0.25);
  --primary:             #C68A14;
  
  --btn-primary-bg:      #C68A14;
  --btn-primary-fg:      #FFFFFF;
  --btn-secondary-bg:    #FFFFFF;
  --btn-secondary-fg:    #0A0A0A;
  --btn-secondary-border:rgba(198, 138, 20, 0.40);
}

/* ─── Base ─────────────────────────────────────────────────────────── */
*, *::before, *::after {
  cursor: none !important;
}

input, textarea, select, [contenteditable] {
  cursor: text !important;
}

body {
  background-color: #FFFFFF !important;
  color: var(--fg);
  font-family: var(--font-body), sans-serif;
  overflow-x: hidden;
}

/* All Headings & Display Titles in Dark Mustard */
h1, h2, h3, h4, .type-display {
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
  color: #C68A14 !important;
}

/* Heading texts over image frames & overlays */
[data-image-overlay] h1,
[data-image-overlay] h2,
[data-image-overlay] h3,
.img-overlay-text h1,
.img-overlay-text h2,
.img-overlay-text h3 {
  color: #C68A14 !important;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ─── BUTTONS ──────────────────────────────────────────────────────── */
.btn-primary {
  background-color: #C68A14 !important;
  color: #FFFFFF !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
  background-color: #B37B0F !important;
  transform: scale(1.03);
}

.btn-secondary {
  background-color: #FFFFFF !important;
  color: #0A0A0A !important;
  border: 1px solid rgba(198, 138, 20, 0.40) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-secondary:hover {
  background-color: #FAF8F2 !important;
  border-color: #C68A14 !important;
  transform: scale(1.03);
}
"""
    css_file.write_text(content)
    print("  ✓ Updated globals.css with mustard heading rules.")


def update_hero():
    hero_file = DM_DIR / "components" / "marketing" / "CinematicHero.tsx"
    if not hero_file.exists():
        return
    
    content = hero_file.read_text()
    # Ensure text-black on headings is changed to text-[#C68A14]
    content = re.sub(r'className="([^"]*type-display[^"]*)text-black([^"]*)"', r'className="\1text-[#C68A14]\2"', content)
    content = re.sub(r'className="([^"]*type-display[^"]*)text-white([^"]*)"', r'className="\1text-[#C68A14]\2"', content)
    
    hero_file.write_text(content)
    print("  ✓ CinematicHero.tsx updated with text-[#C68A14] headings.")


def update_smoothie():
    sm_file = DM_DIR / "components" / "marketing" / "CinematicSmoothie.tsx"
    if not sm_file.exists():
        return
    
    content = sm_file.read_text()
    content = re.sub(r'className="([^"]*type-display[^"]*)text-black([^"]*)"', r'className="\1text-[#C68A14]\2"', content)
    content = re.sub(r'className="([^"]*type-display[^"]*)text-white([^"]*)"', r'className="\1text-[#C68A14]\2"', content)
    
    sm_file.write_text(content)
    print("  ✓ CinematicSmoothie.tsx updated with text-[#C68A14] headings.")


def update_all_sections():
    sections = [
        "BrandManifesto.tsx", "HowWeSmash.tsx", "RestaurantLocations.tsx",
        "ReservationCTA.tsx", "CulinaryAccordionGallery.tsx", "ArchetypeShowcase.tsx",
        "SignatureMenu.tsx", "Nav.tsx"
    ]
    for s in sections:
        fp = DM_DIR / "components" / "marketing" / s
        if fp.exists():
            txt = fp.read_text()
            txt = re.sub(r'className="([^"]*type-display[^"]*)text-black([^"]*)"', r'className="\1text-[#C68A14]\2"', txt)
            txt = re.sub(r'className="([^"]*type-display[^"]*)text-white([^"]*)"', r'className="\1text-[#C68A14]\2"', txt)
            fp.write_text(txt)

    print("  ✓ All section headings in Dirty Martin's updated to #C68A14.")


def main():
    print("👉 Setting all headings in Dirty Martin's to authentic Dark Mustard (#C68A14)...")
    update_globals_css()
    update_hero()
    update_smoothie()
    update_all_sections()
    print("🎉 All headings in Dirty Martin's are now Dark Mustard (#C68A14)!")


if __name__ == "__main__":
    main()
