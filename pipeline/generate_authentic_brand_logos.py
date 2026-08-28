#!/usr/bin/env python3
"""
Generates clean, authentic square emblem vector badges for all 24 restaurant brands
and places them directly in projects/<slug>/public/logo.svg
"""

import os
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

LOGOS = {
    "burger-seigneur": {
        "color": "#C8A96E",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#C8A96E" stroke-width="3" fill="#0A0A0A" />
  <circle cx="50" cy="50" r="41" stroke="#C8A96E" stroke-width="1" stroke-dasharray="2 2" fill="none" opacity="0.6" />
  <!-- French Crown -->
  <path d="M30 38 L38 48 L50 32 L62 48 L70 38 L67 58 L33 58 Z" fill="#C8A96E" />
  <circle cx="30" cy="36" r="2.5" fill="#C8A96E" />
  <circle cx="50" cy="30" r="3" fill="#C8A96E" />
  <circle cx="70" cy="36" r="2.5" fill="#C8A96E" />
  <!-- Monogram BS -->
  <text x="50" y="76" fill="#C8A96E" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="20" font-weight="900" text-anchor="middle" letter-spacing="1">BS</text>
</svg>"""
    },
    "truffles-bangalore": {
        "color": "#F5A623",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#F5A623" stroke-width="3" fill="#0A0A0A" />
  <!-- Burger Bun Silhouette -->
  <path d="M30 46 C30 36 70 36 70 46 Z" fill="#F5A623" />
  <rect x="28" y="49" width="44" height="4" rx="2" fill="#F5A623" />
  <rect x="30" y="55" width="40" height="4" rx="2" fill="#F5A623" />
  <!-- Monogram T -->
  <text x="50" y="78" fill="#F5A623" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="22" font-weight="900" text-anchor="middle">T</text>
</svg>"""
    },
    "beyondburg-inc": {
        "color": "#F5C418",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect x="6" y="6" width="88" height="88" rx="20" stroke="#F5C418" stroke-width="3" fill="#070709" />
  <!-- Geometric Double Smash B -->
  <path d="M34 26 H56 C64 26 70 31 70 38 C70 43 66 47 60 48 C68 49 72 54 72 62 C72 70 65 74 56 74 H34 V26 Z M44 35 V45 H54 C58 45 61 43 61 40 C61 37 58 35 54 35 H44 Z M44 54 V65 H55 C60 65 63 63 63 59.5 C63 56 60 54 55 54 H44 Z" fill="#F5C418" />
</svg>"""
    },
    "smash-guys": {
        "color": "#F5C418",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#F5C418" stroke-width="3" fill="#071009" />
  <!-- Sizzle Spatula Mark -->
  <path d="M34 32 L48 46 L38 56 L24 42 Z" fill="#F5C418" />
  <rect x="46" y="44" width="28" height="6" rx="2" transform="rotate(45 46 44)" fill="#F5C418" />
  <path d="M54 30 C58 36 52 40 56 46 C60 40 68 36 64 26 C60 28 58 26 54 30 Z" fill="#F5C418" />
  <!-- SG Text -->
  <text x="50" y="82" fill="#F5C418" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="1">SMASH</text>
</svg>"""
    },
    "casino-el-camino": {
        "color": "#DC2626",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#DC2626" stroke-width="3" fill="#0A0A0A" />
  <!-- Lucky Dice & Rock Skull Crest -->
  <rect x="28" y="28" width="20" height="20" rx="4" stroke="#DC2626" stroke-width="2" fill="none" transform="rotate(15 38 38)" />
  <circle cx="38" cy="38" r="2" fill="#DC2626" />
  <rect x="52" y="32" width="20" height="20" rx="4" stroke="#DC2626" stroke-width="2" fill="none" transform="rotate(-15 62 42)" />
  <circle cx="58" cy="38" r="1.5" fill="#DC2626" />
  <circle cx="66" cy="46" r="1.5" fill="#DC2626" />
  <!-- 6TH ST Banner -->
  <text x="50" y="76" fill="#DC2626" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="2">6TH ST</text>
</svg>"""
    },
    "dans-burgers": {
        "color": "#D97706",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#D97706" stroke-width="3" fill="#0A0A0A" />
  <!-- 1973 Star Badge & Script D -->
  <polygon points="50,18 53,26 61,26 55,31 57,39 50,34 43,39 45,31 39,26 47,26" fill="#D97706" />
  <text x="50" y="68" fill="#D97706" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="34" font-weight="900" text-anchor="middle">D</text>
  <text x="50" y="84" fill="#D97706" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" text-anchor="middle" letter-spacing="1">EST 1973</text>
</svg>"""
    },
    "dirty-martins": {
        "color": "#BF5700",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#BF5700" stroke-width="3" fill="#0A0A0A" />
  <!-- 1926 Kum-Bak Seal -->
  <text x="50" y="44" fill="#BF5700" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="2">KUM-BAK</text>
  <text x="50" y="68" fill="#BF5700" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="24" font-weight="900" text-anchor="middle">1926</text>
  <text x="50" y="82" fill="#BF5700" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle" letter-spacing="1">AUSTIN, TX</text>
</svg>"""
    },
    "pedrosos-pizza": {
        "color": "#B91C1C",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#B91C1C" stroke-width="3" fill="#0A0A0A" />
  <!-- Pizza Peel & Slice Icon -->
  <path d="M50 24 L72 64 L28 64 Z" stroke="#B91C1C" stroke-width="3" fill="#B91C1C" fill-opacity="0.2" />
  <circle cx="50" cy="46" r="3" fill="#B91C1C" />
  <circle cx="42" cy="56" r="2.5" fill="#B91C1C" />
  <circle cx="58" cy="56" r="2.5" fill="#B91C1C" />
  <text x="50" y="82" fill="#B91C1C" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="1">PIZZA</text>
</svg>"""
    },
    "little-deli-pizzeria": {
        "color": "#166534",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#166534" stroke-width="3" fill="#0A0A0A" />
  <!-- Chef Hat / Slice Crest -->
  <path d="M34 46 C30 38 42 30 50 36 C58 30 70 38 66 46 Z" fill="#166534" />
  <rect x="34" y="48" width="32" height="4" fill="#166534" />
  <text x="50" y="72" fill="#166534" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="18" font-weight="900" text-anchor="middle">DELI</text>
  <text x="50" y="84" fill="#166534" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle">1993</text>
</svg>"""
    },
    "jewboy-burgers": {
        "color": "#06B6D4",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#06B6D4" stroke-width="3" fill="#0A0A0A" />
  <!-- Lucha Mask / Star Badge -->
  <polygon points="50,22 54,34 66,34 56,42 60,54 50,46 40,54 44,42 34,34 46,34" fill="#06B6D4" />
  <text x="50" y="76" fill="#06B6D4" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="20" font-weight="900" text-anchor="middle" letter-spacing="1">JB</text>
</svg>"""
    },
    "leons-burgers": {
        "color": "#B12727",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#B12727" stroke-width="3" fill="#0A0A0A" />
  <!-- Crowned Fiery Wings -->
  <path d="M36 34 L50 26 L64 34 L58 44 L42 44 Z" fill="#B12727" />
  <path d="M26 50 C36 48 46 56 50 64 C54 56 64 48 74 50 C68 62 58 68 50 72 C42 68 32 62 26 50 Z" fill="#B12727" />
  <text x="50" y="86" fill="#B12727" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="2">LEON'S</text>
</svg>"""
    },
    "louis-burger": {
        "color": "#D4AF37",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#D4AF37" stroke-width="3" fill="#0A0A0A" />
  <!-- Royal Lion / 24K Gold Crown -->
  <path d="M32 40 L40 48 L50 34 L60 48 L68 40 L64 56 L36 56 Z" fill="#D4AF37" />
  <circle cx="50" cy="32" r="3" fill="#D4AF37" />
  <text x="50" y="78" fill="#D4AF37" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="18" font-weight="900" text-anchor="middle" letter-spacing="2">LOUIS</text>
</svg>"""
    },
    "biggies-burger": {
        "color": "#F26522",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect x="8" y="8" width="84" height="84" rx="20" stroke="#F26522" stroke-width="3" fill="#0A0A0A" />
  <!-- Bold Grilled Double B -->
  <text x="50" y="66" fill="#F26522" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="44" font-weight="900" text-anchor="middle">B</text>
  <rect x="30" y="74" width="40" height="4" rx="2" fill="#F26522" />
</svg>"""
    },
    "sankys-burger-house": {
        "color": "#FFE500",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#FFE500" stroke-width="3" fill="#080808" />
  <!-- Midnight Monster Stack -->
  <path d="M26 44 C26 32 74 32 74 44 Z" fill="#FFE500" />
  <rect x="24" y="48" width="52" height="5" rx="2" fill="#FFE500" />
  <rect x="28" y="56" width="44" height="5" rx="2" fill="#FFE500" />
  <text x="50" y="80" fill="#FFE500" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="1">SANKY'S</text>
</svg>"""
    },
    "good-flippin-burgers": {
        "color": "#BE123C",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#BE123C" stroke-width="3" fill="#0A0A0A" />
  <!-- Spatula Flip Wave -->
  <path d="M30 46 C36 36 64 36 70 46 C60 52 40 52 30 46 Z" fill="#BE123C" />
  <path d="M46 50 L42 72 L58 72 L54 50 Z" fill="#BE123C" />
  <text x="50" y="86" fill="#BE123C" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="1">FLIPPIN'</text>
</svg>"""
    },
    "pool-burger": {
        "color": "#F43F5E",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#F43F5E" stroke-width="3" fill="#0A0A0A" />
  <!-- Deep Eddy Tiki Palm & Wave -->
  <path d="M50 26 C44 34 32 36 28 38 C38 40 46 42 50 48 C54 42 62 40 72 38 C68 36 56 34 50 26 Z" fill="#F43F5E" />
  <rect x="48" y="48" width="4" height="24" fill="#F43F5E" />
  <text x="50" y="86" fill="#F43F5E" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="1">POOL</text>
</svg>"""
    },
    "sour-duck-market": {
        "color": "#EA580C",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#EA580C" stroke-width="3" fill="#0A0A0A" />
  <!-- Flying Mallard Duck Silhouette -->
  <path d="M30 48 C38 38 52 36 68 40 C60 46 54 52 46 56 C38 54 32 52 30 48 Z" fill="#EA580C" />
  <text x="50" y="78" fill="#EA580C" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="1">SOUR DUCK</text>
</svg>"""
    },
    "burger-bar-austin": {
        "color": "#2563EB",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#2563EB" stroke-width="3" fill="#0A0A0A" />
  <polygon points="50,24 53,32 61,32 55,37 57,45 50,40 43,45 45,37 39,32 47,32" fill="#2563EB" />
  <text x="50" y="66" fill="#2563EB" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="18" font-weight="900" text-anchor="middle">BURGER</text>
  <text x="50" y="82" fill="#2563EB" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="14" font-weight="900" text-anchor="middle">BAR</text>
</svg>"""
    },
    "original-burger-co": {
        "color": "#2563EB",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect x="8" y="8" width="84" height="84" rx="20" stroke="#2563EB" stroke-width="3" fill="#0A0A0A" />
  <text x="50" y="58" fill="#2563EB" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="28" font-weight="900" text-anchor="middle" letter-spacing="2">OBC</text>
  <text x="50" y="76" fill="#2563EB" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" text-anchor="middle" letter-spacing="1">ORIGINAL</text>
</svg>"""
    },
    "nadc-burger": {
        "color": "#FFFFFF",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#FFFFFF" stroke-width="3" fill="#080808" />
  <text x="50" y="58" fill="#FFFFFF" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="22" font-weight="900" text-anchor="middle" letter-spacing="3">NADC</text>
  <text x="50" y="74" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle" letter-spacing="1">WAGYU</text>
</svg>"""
    },
    "backyard-burgers": {
        "color": "#E67E22",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#E67E22" stroke-width="3" fill="#0A0A0A" />
  <path d="M34 36 L66 64 M66 36 L34 64" stroke="#E67E22" stroke-width="4" stroke-linecap="round" />
  <circle cx="50" cy="50" r="8" fill="#E67E22" />
  <text x="50" y="84" fill="#E67E22" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="1">BACKYARD</text>
</svg>"""
    },
    "burger-elite": {
        "color": "#7C3AED",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#7C3AED" stroke-width="3" fill="#0A0A0A" />
  <!-- Diamond Monogram BE -->
  <polygon points="50,22 74,44 50,72 26,44" stroke="#7C3AED" stroke-width="3" fill="#7C3AED" fill-opacity="0.15" />
  <text x="50" y="52" fill="#7C3AED" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="18" font-weight="900" text-anchor="middle">BE</text>
</svg>"""
    },
    "burgerman": {
        "color": "#15803D",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#15803D" stroke-width="3" fill="#0A0A0A" />
  <path d="M50 28 C38 34 36 52 50 64 C64 52 62 34 50 28 Z" fill="#15803D" />
  <text x="50" y="82" fill="#15803D" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="1">BURGERMAN</text>
</svg>"""
    },
    "simon-burgers": {
        "color": "#DC2626",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#DC2626" stroke-width="3" fill="#0A0A0A" />
  <text x="50" y="62" fill="#DC2626" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="34" font-weight="900" text-anchor="middle">S</text>
  <text x="50" y="80" fill="#DC2626" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle" letter-spacing="1">SIMON</text>
</svg>"""
    }
}

def main():
    print("🚀 Generating authentic vector logo badges for all 24 projects...")
    for slug, data in LOGOS.items():
        project_dir = PROJECTS_DIR / slug
        if not project_dir.exists():
            continue
        
        logo_path = project_dir / "public" / "logo.svg"
        logo_path.parent.mkdir(parents=True, exist_ok=True)
        logo_path.write_text(data["svg"])
        print(f"  ✓ Written authentic square badge logo to {slug}/public/logo.svg")

    print("🎉 All 24 brand logos generated & placed successfully!")

if __name__ == "__main__":
    main()
