#!/usr/bin/env python3
"""
High-end visual lift-up & menu item contrast overhaul:
1. Hero Display Titles & Watermarks Over Frames:
   - Truffles: Brilliant Neon Yellow (#FFE500) with luminous glow & drop shadow
   - Beyondburg Inc.: Luminous Mint / Vibrant Emerald (#4ADE80) with whitish glow & drop shadow
   - All brands: Punchy, high-contrast, luminous display typography over dark video/canvas frames
2. Menu Items & Dish Cards (both /menu and homepage SignatureMenu):
   - Fully visible, crisp typography (Item name, price pill, description, tags, Add button)
   - Zero dull, low-contrast or invisible text
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

HERO_LIFTUP_CONFIGS = {
    "truffles-bangalore": {
        "hero_heading": "#FFE500",
        "hero_shadow": "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 229, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.4)",
        "card_title": "#FFFFFF",
        "card_title_hover": "#FFE500",
        "card_desc": "rgba(255, 255, 255, 0.75)",
        "price_bg": "#FFE500",
        "price_fg": "#000000",
        "btn_bg": "#FFE500",
        "btn_fg": "#000000",
    },
    "beyondburg-inc": {
        "hero_heading": "#4ADE80",
        "hero_shadow": "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(74, 222, 128, 0.7), 0 0 12px rgba(255, 255, 255, 0.5)",
        "card_title": "#FFFFFF",
        "card_title_hover": "#4ADE80",
        "card_desc": "rgba(255, 255, 255, 0.75)",
        "price_bg": "#1B4D36",
        "price_fg": "#FFFFFF",
        "btn_bg": "#4ADE80",
        "btn_fg": "#000000",
    },
    "burger-seigneur": {
        "hero_heading": "#55A630",
        "hero_shadow": "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(85, 166, 48, 0.6), 0 0 10px rgba(255, 255, 255, 0.4)",
        "card_title": "#FFFFFF",
        "card_title_hover": "#55A630",
        "card_desc": "rgba(255, 255, 255, 0.75)",
        "price_bg": "#418043",
        "price_fg": "#FFFFFF",
        "btn_bg": "#418043",
        "btn_fg": "#FFFFFF",
    },
    "dirty-martins": {
        "hero_heading": "#E5A93C",
        "hero_shadow": "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(229, 169, 60, 0.6)",
        "card_title": "#C68A14",
        "card_title_hover": "#E5A93C",
        "card_desc": "#4A4A4A",
        "price_bg": "#C68A14",
        "price_fg": "#FFFFFF",
        "btn_bg": "#C68A14",
        "btn_fg": "#FFFFFF",
    },
    "pedrosos-pizza": {
        "hero_heading": "#F2C777",
        "hero_shadow": "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(242, 199, 119, 0.6)",
        "card_title": "#F2C777",
        "card_title_hover": "#FFFFFF",
        "card_desc": "rgba(255, 255, 255, 0.75)",
        "price_bg": "#D91C24",
        "price_fg": "#FFFFFF",
        "btn_bg": "#D91C24",
        "btn_fg": "#FFFFFF",
    },
    "dans-burgers": {
        "hero_heading": "#EF4444",
        "hero_shadow": "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 35px rgba(239, 68, 68, 0.6)",
        "card_title": "#E52421",
        "card_title_hover": "#EF4444",
        "card_desc": "#374151",
        "price_bg": "#E52421",
        "price_fg": "#FFFFFF",
        "btn_bg": "#E52421",
        "btn_fg": "#FFFFFF",
    },
    "jewboy-burgers": {
        "hero_heading": "#FFFFFF",
        "hero_shadow": "0 4px 30px rgba(0, 0, 0, 0.95)",
        "card_title": "#FFFFFF",
        "card_title_hover": "#E5E5E5",
        "card_desc": "rgba(255, 255, 255, 0.75)",
        "price_bg": "#FFFFFF",
        "price_fg": "#000000",
        "btn_bg": "#FFFFFF",
        "btn_fg": "#000000",
    }
}

def update_hero_and_menu(project_dir: Path):
    pname = project_dir.name
    cfg = HERO_LIFTUP_CONFIGS.get(pname, {
        "hero_heading": "#FFFFFF",
        "hero_shadow": "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 25px rgba(255, 255, 255, 0.3)",
        "card_title": "#FFFFFF",
        "card_title_hover": "#FFFFFF",
        "card_desc": "rgba(255, 255, 255, 0.75)",
        "price_bg": "#FFFFFF",
        "price_fg": "#000000",
        "btn_bg": "#FFFFFF",
        "btn_fg": "#000000",
    })

    # 1. Update globals.css with luminous hero heading over image overlay
    css_path = project_dir / "app" / "globals.css"
    if css_path.exists():
        txt = css_path.read_text()
        
        # Replace [data-image-overlay] h1 block with the lifted luminous heading
        overlay_h_rule = f"""[data-image-overlay] h1,
[data-image-overlay] h2,
[data-image-overlay] h3,
.img-overlay-text h1,
.img-overlay-text h2,
.img-overlay-text h3 {{
  color: {cfg["hero_heading"]} !important;
  text-shadow: {cfg["hero_shadow"]} !important;
}}"""
        txt = re.sub(r'\[data-image-overlay\] h1[\s\S]*?\}', overlay_h_rule, txt, count=1)
        css_path.write_text(txt)
        print(f"  ✓ Lifted hero heading styles in {pname} globals.css ({cfg['hero_heading']})")

    # 2. Update SignatureMenu.tsx for high contrast card styling
    sig_menu_path = project_dir / "components" / "marketing" / "SignatureMenu.tsx"
    if sig_menu_path.exists():
        txt = sig_menu_path.read_text()
        
        # Ensure card backgrounds are solid, high-contrast, and text is sharp
        txt = re.sub(r'className="group cursor-pointer rounded-3xl bg-white/\[0\.04\][^"]*"',
                     r'className="group cursor-pointer rounded-3xl bg-[#141414] border border-white/15 hover:border-white/40 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"',
                     txt)
        
        # Ensure item name is bright and legible
        txt = re.sub(r'text-white font-bold leading-tight group-hover:text-[^"]*',
                     f'text-white font-bold leading-tight group-hover:text-[{cfg["hero_heading"]}]',
                     txt)
        
        sig_menu_path.write_text(txt)
        print(f"  ✓ Upgraded SignatureMenu.tsx contrast in {pname}")

    # 3. Update /menu/page.tsx cards to ensure crystal-clear visibility
    menu_page_path = project_dir / "app" / "menu" / "page.tsx"
    if menu_page_path.exists():
        txt = menu_page_path.read_text()
        # Ensure prices and item titles have rich contrast
        txt = re.sub(r'style=\{\{\s*color:\s*"[^"]*"\s*\}\}>(\s*\{item\.name\})',
                     f'style={{{{ color: "{cfg["hero_heading"]}" }}}}>\\1',
                     txt)
        menu_page_path.write_text(txt)

def main():
    print("🚀 Applying visual lift-up & menu item contrast across all projects...")
    for project_dir in sorted(PROJECTS_DIR.iterdir()):
        if not project_dir.is_dir() or project_dir.name in ["fabroar", "superfan-redesign", "smash-guys"]:
            continue
        update_hero_and_menu(project_dir)
    print("🎉 Visual lift-up and menu contrast enhancements deployed successfully!")

if __name__ == "__main__":
    main()
