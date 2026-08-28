import os, shutil

all_projects = [
    'backyard-burgers', 'beyondburg-inc', 'biggies-burger', 'burger-bar-austin',
    'burger-elite', 'burger-seigneur', 'burgerman', 'casino-el-camino',
    'dans-burgers', 'dirty-martins', 'good-flippin-burgers', 'jewboy-burgers',
    'leons-burgers', 'little-deli-pizzeria', 'louis-burger', 'nadc-burger',
    'original-burger-co', 'pedrosos-pizza', 'pool-burger', 'sankys-burger-house',
    'simon-burgers', 'smash-guys', 'sour-duck-market', 'truffles-bangalore'
]

source_ui_dir = os.path.join('projects', 'beyondburg-inc', 'components', 'ui')
react_bits_files = [
    'SplitText.tsx', 'ShinyText.tsx', 'DecryptedText.tsx',
    'SpotlightCard.tsx', 'FadeContent.tsx'
]

brand_custom = {
    'backyard-burgers': ('THE BACKYARD STANDARD // SMOKEHOUSE SPEC', 'MAXIMUM SMOKED BARK & CRUST', '#E67E22'),
    'truffles-bangalore': ('THE TRUFFLES STANDARD // 2004 LANDMARK SPEC', 'SIGNATURE AMERICAN CHEESE MELT', '#F5A623'),
    'burger-seigneur': ('THE SEIGNEUR ATELIER // LUXURY BRIOCHE SPEC', 'ARTISANAL EUROPEAN GOURMET CRUST', '#C8A96E'),
    'dans-burgers': ("THE DAN'S STANDARD // 1973 AUSTIN SPEC", 'FLAT-TOP SIZZLE & TEXAS TOAST CRUNCH', '#D97706'),
    'dirty-martins': ("THE DIRTY'S STANDARD // 1926 CENTENNIAL SPEC", 'HISTORIC KUM-BAK CHILI CRUST', '#BF5700'),
    'casino-el-camino': ('THE CASINO STANDARD // 6TH ST ROCK SPEC', 'CHARBROILED VERDE CHILI SEAR', '#EF4444'),
    'jewboy-burgers': ('THE JEWBOY STANDARD // EL PASO MEETS DELI', 'GRILLED ONION STEAMED SMASH', '#06B6D4'),
    'pedrosos-pizza': ("THE PEDROSO STANDARD // SLOW-FERMENT SPEC", 'CRISPY BOTTOM ROMAN CRUST', '#DC2626'),
    'little-deli-pizzeria': ('THE LITTLE DELI STANDARD // CRESTVIEW SPEC', 'ARTISAN NJ STONE-BAKED CRUST', '#16A34A'),
    'pool-burger': ('THE POOL BURGER STANDARD // DEEP EDDY SPEC', 'AIRSTREAM TIKI DOUBLE SMASH', '#F43F5E'),
    'sour-duck-market': ('THE SOUR DUCK STANDARD // EAST AUSTIN SPEC', 'NATURALLY FERMENTED SOURDOUGH BAKE', '#EA580C'),
    'burger-bar-austin': ('THE BURGER BAR STANDARD // CONGRESS AVE SPEC', 'DOWNTOWN WALK-UP SMASH CRUST', '#2563EB'),
    'nadc-burger': ('THE NADC STANDARD // 100% TEXAS WAGYU', 'AKAUSHI CARAMELIZED MAILLARD CRUST', '#FFFFFF'),
    'biggies-burger': ('THE BIGGIES STANDARD // FLAME-GRILL SPEC', 'AUTHENTIC BEHEMOTH CHARBROIL', '#F97316'),
    'burger-elite': ('THE ELITE STANDARD // STREET ROYALE SPEC', 'DOUBLE SMASH ROYALE CRUST', '#A855F7'),
    'burgerman': ('THE BURGERMAN STANDARD // GUILT-FREE SPEC', '100% FLAME-GRILLED WHOLE WHEAT', '#22C55E'),
    'good-flippin-burgers': ("THE GOOD FLIPPIN' STANDARD // BRIOCHE SPEC", 'FRESH SMASHED JUICY PERFECTION', '#EC4899'),
    'leons-burgers': ("THE LEON'S STANDARD // BUTTERMILK FRIED SPEC", '24-HR BUTTERMILK PERI-PERI CRUNCH', '#EF4444'),
    'louis-burger': ('THE LOUIS ATELIER // CHEF ZORAWAR SPEC', '24K GOLD WAGYU & TRUFFLE MELT', '#EAB308'),
    'original-burger-co': ('THE OBC STANDARD // PURE SMASH SPEC', 'DOUBLE SMASHED BACON JAM CRUST', '#3B82F6'),
    'sankys-burger-house': ("THE SANKY'S STANDARD // GARAGE DINER SPEC", 'MONSTER SMASHED BEAST CRUST', '#EAB308'),
    'simon-burgers': ('THE SIMON STANDARD // LATE-NIGHT KITCHEN', 'KAMMANAHALLI MONSTER DOUBLE CRUST', '#EF4444'),
    'smash-guys': ('THE SMASH GUYS STANDARD // CAST IRON SPEC', 'MAXIMUM CRUNCH MAILLARD CRUST', '#F5C418'),
    'beyondburg-inc': ('THE BEYONDBURG STANDARD // 450°F STEEL SPEC', 'MAXIMUM CRUNCH MAILLARD CRUST', '#F5C418'),
}

for p in all_projects:
    p_path = os.path.join('projects', p)
    if not os.path.exists(p_path):
        continue
    
    # 1. Copy React Bits UI files
    p_ui_dir = os.path.join(p_path, 'components', 'ui')
    os.makedirs(p_ui_dir, exist_ok=True)
    for rbf in react_bits_files:
        src = os.path.join(source_ui_dir, rbf)
        dst = os.path.join(p_ui_dir, rbf)
        if os.path.abspath(src) != os.path.abspath(dst):
            shutil.copy2(src, dst)

    # 2. Update BrandManifesto.tsx
    spec_tag, shiny_phrase, accent = brand_custom.get(p, ('THE HOUSE STANDARD // 450°F STEEL SPEC', 'MAXIMUM CRUNCH MAILLARD CRUST', '#F5C418'))
    
    template = '''"use client";

import React from "react";
import SplitText from "@/components/ui/SplitText";
import ShinyText from "@/components/ui/ShinyText";
import DecryptedText from "@/components/ui/DecryptedText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import FadeContent from "@/components/ui/FadeContent";

export default function BrandManifesto() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-char text-bone border-b border-char-mute relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-12" style={{ backgroundColor: "__ACCENT__" }} />
          <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__ACCENT__" }}>
            <DecryptedText
              text="__SPEC_TAG__"
              speed={40}
              maxIterations={12}
              animateOn="view"
            />
          </span>
        </div>

        <FadeContent blur={true} duration={0.9}>
          <div className="space-y-4">
            <h2 className="type-display text-3xl sm:text-5xl md:text-6xl text-bone leading-tight">
              THICK FLUFFY PATTIES ARE BORING. WE BELIEVE IN THE{" "}
              <ShinyText
                text="__SHINY_PHRASE__"
                speed={3}
                shimmerColor="__ACCENT__"
                className="font-extrabold"
              />{" "}
              OF DUAL THIN PATTIES SMASHED WITH STEEL ON A RED-HOT FLAT TOP.
            </h2>
          </div>
        </FadeContent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <SpotlightCard
            spotlightColor="__ACCENT__25"
            className="hover:border-white/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold" style={{ color: "__ACCENT__" }}>01 // HEAVY STEEL SMASH</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: "__ACCENT__15", color: "__ACCENT__", borderColor: "__ACCENT__30" }}>
                  450°F
                </span>
              </div>
              <p className="text-smoke text-xs leading-relaxed font-body">
                We apply custom cast-iron press weight to flatten each patty against searing steel, caramelizing surface proteins instantly into crunchy lace edges.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="__ACCENT__25"
            className="hover:border-white/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold" style={{ color: "__ACCENT__" }}>02 // SQUISHY POTATO BUNS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: "__ACCENT__15", color: "__ACCENT__", borderColor: "__ACCENT__30" }}>
                  GOLDEN
                </span>
              </div>
              <p className="text-smoke text-xs leading-relaxed font-body">
                Plush Pennsylvania potato rolls griddled in pure sweet cream butter until golden, perfectly engineered to cushion molten cheese and savory dripping.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="__ACCENT__25"
            className="hover:border-white/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold" style={{ color: "__ACCENT__" }}>03 // CRAFT DIPS &amp; SHAKES</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: "__ACCENT__15", color: "__ACCENT__", borderColor: "__ACCENT__30" }}>
                  HAND-SPUN
                </span>
              </div>
              <p className="text-smoke text-xs leading-relaxed font-body">
                From hand-spun malt thickshakes to house animal-style loaded crinkle fries, every single side is designed to hit with maximum flavor impact.
              </p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
'''
    manifesto_code = template.replace('__ACCENT__', accent).replace('__SPEC_TAG__', spec_tag).replace('__SHINY_PHRASE__', shiny_phrase)
    with open(os.path.join(p_path, 'components', 'marketing', 'BrandManifesto.tsx'), 'w', encoding='utf-8') as f:
        f.write(manifesto_code)
    
    print(f"✓ Upgraded {p} with React Bits suite!")

print("\nAll 24 projects upgraded with full React Bits ecosystem!")
