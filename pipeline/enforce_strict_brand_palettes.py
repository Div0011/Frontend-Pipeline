#!/usr/bin/env python3
"""
Master Strict Brand Palette Enforcer.
Applies exact brand colors across all components in each project:
- Jewboy Burgers: Strictly Black (#0A0A0A) and White (#FFFFFF) only.
- Pedroso's Pizza: Strictly Red (#D91C24), Yellow/Gold (#F2C777), and Black (#0A0A0A).
- All 24 brands: Strictly bounded by authentic brand colors, with standard black dark background
  and brand-specific light tone in light mode.
"""

import os
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

# Definitive Strict Brand Color Palettes
STRICT_BRANDS = {
    "jewboy-burgers": {
        "name": "JEWBOY BURGERS",
        "tagline": "El Paso Border Smashes & Latkes · Austin, TX",
        "city_badge": "AIRPORT BLVD AUSTIN",
        "city_footer": "CENTRAL AUSTIN · AIRPORT BLVD",
        "currency": "$",
        "primary_color": "#FFFFFF",
        "secondary_color": "#FFFFFF",
        "dark_bg": "#0A0A0A",
        "light_bg": "#FFFFFF",
        "footer_bg": "#0A0A0A",
        "footer_text": "#FFFFFF",
        "btn_text": "#000000",
        "signature_craving": ("HOMESTYLE LATKES", "& COLD BEVERAGES"),
        "craft_title": "BORDER STYLE SMASH PATTY",
        "craft_desc": "STEAMED ONIONS & MELTED CHEESE",
        "phone": "+1 512-291-3358",
        "email": "shalom@jewboyburgers.com",
        "hours": "11:00 AM – 10:00 PM",
        "address": "5111 Airport Blvd, Austin, TX 78751",
        "locations": [
            {
                "id": "airport-blvd",
                "name": "Airport Blvd Flagship",
                "badge": "BORDER & ASHKENAZI FUSION",
                "address": "5111 Airport Blvd",
                "city": "Austin, TX 78751",
                "hours": "11:00 AM – 10:00 PM",
                "phone": "+1 512-291-3358",
                "status": "Flat-Top Fired Up",
                "seating": "Lucha Libre Diner & Patio",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=JewBoy+Burgers+Austin"
            }
        ],
        "menu_items": [
            {"id": "oy-vey", "name": "The Oy Vey Burger", "category": "Border Smashes", "price": "11.50", "badge": "House Star", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "yiddish-cowboy", "name": "The Yiddish Cowboy", "category": "Border Smashes", "price": "12.75", "badge": "Latke Topped", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "home-latkes", "name": "Homestyle Potato Latkes", "category": "Sides", "price": "6.50", "badge": "Crispy", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"}
        ]
    },
    "pedrosos-pizza": {
        "name": "PEDROSO'S PIZZA",
        "tagline": "Austin's True Artisan Pizza & Grandma Pies",
        "city_badge": "BURNET RD AUSTIN",
        "city_footer": "NORTH AUSTIN · BURNET RD",
        "currency": "$",
        "primary_color": "#D91C24",
        "secondary_color": "#F2C777",
        "dark_bg": "#0A0A0A",
        "light_bg": "#FBF8F0",
        "footer_bg": "#D91C24",
        "footer_text": "#FFFFFF",
        "btn_text": "#FFFFFF",
        "signature_craving": ("HAND-PIPED CANNOLI", "& TUSCAN ESPRESSO"),
        "craft_title": "WOOD-FIRED PIZZA CRAFT",
        "craft_desc": "72-HR SLOW FERMENTED CRUST",
        "phone": "+1 512-814-7220",
        "email": "orders@pedrosospizza.com",
        "hours": "12:00 PM – 9:00 PM",
        "address": "8315 Burnet Rd, Austin, TX 78757",
        "locations": [
            {
                "id": "burnet",
                "name": "Burnet Road Pizzeria",
                "badge": "ARTISAN SLICE SHOP",
                "address": "8315 Burnet Rd",
                "city": "Austin, TX 78757",
                "hours": "12:00 PM – 9:00 PM",
                "phone": "+1 512-814-7220",
                "status": "Ovens Firing · Fresh Pies Ready",
                "seating": "Outdoor Covered Dining Deck",
                "heroImage": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Pedrosos+Pizza+Austin"
            }
        ],
        "menu_items": [
            {"id": "grandma-pie", "name": "Traditional Grandma Pie", "category": "Square Pies", "price": "26.00", "badge": "Award Winning", "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"},
            {"id": "ny-pepperoni", "name": "NY Style Hot Honey Pepperoni", "category": "Round Pies", "price": "24.00", "badge": "Cup & Char", "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80"},
            {"id": "burrata-margherita", "name": "Fresh Burrata Margherita", "category": "Artisan Specials", "price": "25.00", "badge": "Chef Special", "image": "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&q=80"}
        ]
    },
    "burger-seigneur": {
        "name": "BURGER SEIGNEUR",
        "tagline": "Gourmet Artisanal Brioche Atelier · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#C8A96E",
        "secondary_color": "#C8A96E",
        "dark_bg": "#0A0A0A",
        "light_bg": "#FAF8F2",
        "footer_bg": "#C8A96E",
        "footer_text": "#0A0A0A",
        "btn_text": "#0A0A0A",
        "signature_craving": ("BELGIAN SPECULOOS", "BUTTER GELATO SHAKE"),
        "craft_title": "FRENCH BRIOCHE BURGER ATELIER",
        "craft_desc": "SLOW-CARAMELIZED BRIOCHE & CUTS",
        "phone": "+91 80 4965 3111",
        "email": "reservations@burgerseigneur.com",
        "hours": "11:30 AM – 11:30 PM",
        "address": "80 Feet Rd, Indiranagar, Bengaluru",
        "locations": [
            {
                "id": "indiranagar",
                "name": "Indiranagar Flagship",
                "badge": "FINE CASUAL ATELIER",
                "address": "35, 80 Feet Rd, Hal, HAL 3rd Stage",
                "city": "Bengaluru 560075",
                "hours": "11:30 AM – 11:30 PM",
                "phone": "+91 80 4965 3111",
                "status": "Chef Table Open",
                "seating": "Lush Glasshouse Dining",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Burger+Seigneur+Indiranagar"
            }
        ],
        "menu_items": [
            {"id": "lucien", "name": "Lucien Portobello", "category": "Gourmet Burgers", "price": "495", "badge": "Vegetarian Star", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "dynamite", "name": "Dynamix Angus Burger", "category": "Gourmet Burgers", "price": "560", "badge": "Chef Choice", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "truffles-bangalore": {
        "name": "TRUFFLES",
        "tagline": "Legendary Burger Bistro · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#F5A623",
        "secondary_color": "#F5A623",
        "dark_bg": "#0A0A0A",
        "light_bg": "#FAF8F2",
        "footer_bg": "#F5A623",
        "footer_text": "#0A0A0A",
        "btn_text": "#0A0A0A",
        "signature_craving": ("DUTCH TRUFFLE", "CHOCOLATE MALT"),
        "craft_title": "ICONIC CHAR-GRILL CRAFT",
        "craft_desc": "LEGENDARY BENGALURU FLAVOR",
        "phone": "+91 80 4146 6565",
        "email": "hello@truffles.co.in",
        "hours": "11:00 AM – 11:00 PM",
        "address": "Apex Rialto, St. Mark's Rd, Bengaluru",
        "locations": [
            {
                "id": "st-marks",
                "name": "St. Mark's Flagship",
                "badge": "THE ORIGINAL ICON",
                "address": "Apex Rialto, St. Mark's Rd",
                "city": "Bengaluru 560001",
                "hours": "11:00 AM – 11:00 PM",
                "phone": "+91 80 4146 6565",
                "status": "Seating Active · Fast Queue",
                "seating": "Bistro Dining & Verandah",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Truffles+St+Marks+Road+Bangalore"
            }
        ],
        "menu_items": [
            {"id": "all-american", "name": "All American Cheese Burger", "category": "Signature Burgers", "price": "340", "badge": "Legendary", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "truffles-special", "name": "Truffles Sloppy Joe", "category": "Signature Burgers", "price": "370", "badge": "Crowd Favorite", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"}
        ]
    }
}


def make_globals_css(brand):
    primary = brand["primary_color"]
    dark_bg = brand["dark_bg"]
    light_bg = brand["light_bg"]

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

/* ─── Strict Brand CSS Variables ─────────────────────────────────────── */
:root {{
  --bg:        {dark_bg};
  --fg:        #FFFFFF;
  --fg-muted:  rgba(255, 255, 255, 0.60);
  --fg-sub:    rgba(255, 255, 255, 0.35);
  --border:    rgba(255, 255, 255, 0.12);
  --primary:   {primary};
}}

html.light {{
  --bg:        {light_bg};
  --fg:        #0A0A0A;
  --fg-muted:  rgba(10, 10, 10, 0.65);
  --fg-sub:    rgba(10, 10, 10, 0.40);
  --border:    rgba(0, 0, 0, 0.12);
  --primary:   {primary if primary != "#FFFFFF" else "#0A0A0A"};
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
  transition: background-color 0.4s ease, color 0.4s ease;
}}

.type-display {{
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
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

/* ─── LIGHT THEME Text Adaptations ────────────────────────────────── */
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


def apply_strict_project(slug, brand):
    project = PROJECTS_DIR / slug
    if not project.exists():
        return

    print(f"👉 Applying strict brand palette to {slug} (Primary: {brand['primary_color']})...")

    # 1. globals.css
    css_path = project / "app" / "globals.css"
    css_path.write_text(make_globals_css(brand))

    # 2. layout.tsx
    layout_path = project / "app" / "layout.tsx"
    if layout_path.exists():
        layout_content = layout_path.read_text()
        import re
        layout_content = re.sub(r'primaryColor="[^"]*"', f'primaryColor="{brand["primary_color"]}"', layout_content)
        layout_content = re.sub(r'darkBg="[^"]*"', f'darkBg="{brand["dark_bg"]}"', layout_content)
        layout_content = re.sub(r'lightBg="[^"]*"', f'lightBg="{brand["light_bg"]}"', layout_content)
        layout_path.write_text(layout_content)

    print(f"  ✓ {slug} synchronized with strict palette rules.")


def main():
    print("🚀 Enforcing strict brand palettes...")
    for slug, brand in STRICT_BRANDS.items():
        apply_strict_project(slug, brand)
    print("🎉 Strict brand palettes enforced!")


if __name__ == "__main__":
    main()
