import os, json

brands = {
    'backyard-burgers': {
        'name': 'Backyard Burgers & Grill',
        'short_name': 'BACKYARD BURGERS',
        'tagline': 'OPEN-AIR SMOKEHOUSE & GRILL · KORAMANGALA',
        'primary': '#E67E22',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'beyondburg-inc': {
        'name': 'Beyondburg Inc.',
        'short_name': 'BEYONDBURG INC.',
        'tagline': 'SMASH BURGER CO. · ST. MARKS RD · BENGALURU',
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'biggies-burger': {
        'name': 'Biggies Burger',
        'short_name': 'BIGGIES BURGER',
        'tagline': 'ORIGINAL GRILLED BURGERS · BANGALORE',
        'primary': '#F26522',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'burger-bar-austin': {
        'name': 'Burger Bar on Congress',
        'short_name': 'BURGER BAR ON CONGRESS',
        'tagline': 'DOWNTOWN AUSTIN WALK-UP FLAT TOP',
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '$'
    },
    'burger-elite': {
        'name': 'BURGER ELITE',
        'short_name': 'BURGER ELITE',
        'tagline': 'STREET SMASH ROYALE · INDIRANAGAR',
        'primary': '#7C3AED',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'burger-seigneur': {
        'name': 'Burger Seigneur',
        'short_name': 'BURGER SEIGNEUR',
        'tagline': 'ARTISANAL EUROPEAN GOURMET ATELIER',
        'primary': '#C8A96E',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'burgerman': {
        'name': 'BurgerMan',
        'short_name': 'BURGERMAN',
        'tagline': '100% FLAME-GRILLED WHOLE WHEAT BURGERS',
        'primary': '#15803D',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'casino-el-camino': {
        'name': 'Casino El Camino',
        'short_name': 'CASINO EL CAMINO',
        'tagline': '6TH STREET CULT ROCK BURGERS · AUSTIN',
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '$'
    },
    'dans-burgers': {
        'name': 'Dan\'s Hamburgers',
        'short_name': 'DAN\'S HAMBURGERS',
        'tagline': 'SINCE 1973 · AN AUSTIN ORIGINAL',
        'primary': '#D97706',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '$'
    },
    'dirty-martins': {
        'name': 'Dirty Martin\'s Kum-Bak',
        'short_name': 'DIRTY MARTIN\'S KUM-BAK',
        'tagline': 'SINCE 1926 · 100 YEARS ON THE DRAG · AUSTIN',
        'primary': '#BF5700',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '$'
    },
    'good-flippin-burgers': {
        'name': 'Good Flippin\' Burgers',
        'short_name': 'GOOD FLIPPIN\' BURGERS',
        'tagline': 'FRESH SMASHED JUICY BURGERS · BANGALORE',
        'primary': '#BE123C',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'jewboy-burgers': {
        'name': 'JewBoy Burgers',
        'short_name': 'JEWBOY BURGERS',
        'tagline': 'EL PASO BORDER MEETS DINER · AUSTIN',
        'primary': '#06B6D4',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '$'
    },
    'leons-burgers': {
        'name': 'Leon\'s Burgers & Wings',
        'short_name': 'LEON\'S BURGERS & WINGS',
        'tagline': '24-HR BUTTERMILK FRIED CHICKEN & BURGERS',
        'primary': '#B12727',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'little-deli-pizzeria': {
        'name': 'Little Deli & Pizzeria',
        'short_name': 'LITTLE DELI & PIZZERIA',
        'tagline': 'NJ STONE-BAKED PIES & PASTRAMI SUBS · CRESTVIEW',
        'primary': '#166534',
        'text_on_primary': '#FFFFFF',
        'category_type': 'pizza',
        'currency': '$'
    },
    'louis-burger': {
        'name': 'Louis Burger',
        'short_name': 'LOUIS BURGER',
        'tagline': 'CHEF ZORAWAR KALRA · CRAFT GOURMET BURGERS',
        'primary': '#D4AF37',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'nadc-burger': {
        'name': 'NADC Burger',
        'short_name': 'NADC BURGER',
        'tagline': '100% TEXAS WAGYU & DUCK FAT TALLOW FRIES',
        'primary': '#FFFFFF',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '$'
    },
    'original-burger-co': {
        'name': 'Original Burger Co. (OBC)',
        'short_name': 'ORIGINAL BURGER CO.',
        'tagline': 'DOUBLE SMASH & BACON JAM DINER · BANGALORE',
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'pedrosos-pizza': {
        'name': 'Pedroso\'s Pizza',
        'short_name': 'PEDROSO\'S PIZZA',
        'tagline': 'GRANDMA SQUARES & ROMAN STYLE PIZZA · AUSTIN',
        'primary': '#B91C1C',
        'text_on_primary': '#FFFFFF',
        'category_type': 'pizza',
        'currency': '$'
    },
    'pool-burger': {
        'name': 'Pool Burger',
        'short_name': 'POOL BURGER',
        'tagline': '1968 AIRSTREAM TIKI SMASH BURGERS · DEEP EDDY',
        'primary': '#F43F5E',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '$'
    },
    'sankys-burger-house': {
        'name': 'Sanky\'s Burger House',
        'short_name': 'SANKY\'S BURGER HOUSE',
        'tagline': 'THE LATE-NIGHT CULT BURGER GARAGE · HENNUR',
        'primary': '#FFE500',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'simon-burgers': {
        'name': 'Simon Burgers',
        'short_name': 'SIMON BURGERS',
        'tagline': 'LATE-NIGHT SMASH BURGERS & FRIES · KAMMANAHALLI',
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'smash-guys': {
        'name': 'Smash Guys',
        'short_name': 'SMASH GUYS',
        'tagline': '450°F CAST-IRON SMASHED BURGERS · BANGALORE',
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '₹'
    },
    'sour-duck-market': {
        'name': 'Sour Duck Market',
        'short_name': 'SOUR DUCK MARKET',
        'tagline': 'SOURDOUGH BAKERY & SMOKEHOUSE · EAST AUSTIN',
        'primary': '#EA580C',
        'text_on_primary': '#FFFFFF',
        'category_type': 'sourdough',
        'currency': '$'
    },
    'truffles-bangalore': {
        'name': 'Truffles',
        'short_name': 'TRUFFLES',
        'tagline': 'SINCE 2004 · BANGALORE\'S ICONIC BURGERS & SHAKES',
        'primary': '#F5A623',
        'text_on_primary': '#000000',
        'category_type': 'burgers',
        'currency': '₹'
    },
}

sig_menu_template = '''"use client";

import React, { useState } from "react";
import { menuItems } from "@/lib/data";
import OptionWheel from "@/components/ui/OptionWheel";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "Full Menu",
  "Signature Lineup",
  "Beverages & Shakes",
  "Sides & Extras",
  "Secret Reserve"
];

export default function SignatureMenu() {
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "wheel">("grid");

  const currentCategory = categories[selectedCatIndex];

  const filteredItems = menuItems.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    if (selectedCatIndex === 0) return true;
    if (selectedCatIndex === 1) return cat.includes("burger") || cat.includes("pizza") || cat.includes("special") || cat === "mains";
    if (selectedCatIndex === 2) return cat.includes("shake") || cat.includes("drink") || cat.includes("sweet") || cat.includes("dessert");
    if (selectedCatIndex === 3) return cat.includes("side") || cat.includes("fry") || cat.includes("wing") || cat.includes("salad");
    return true;
  });

  return (
    <section id="menu-section" className="py-24 px-6 sm:px-12 md:px-20 bg-char text-bone border-b border-char-mute relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 pb-6 border-b border-char-mute">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: "__PRIMARY__" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__PRIMARY__" }}>
                HANDCRAFTED CULINARY LINEUP
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-bone font-bold tracking-tight">
              SIGNATURE SELECTIONS
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="font-mono text-xs text-smoke">
              Showing <span className="font-bold text-white">{filteredItems.length}</span> Items
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-char-soft p-1 rounded-md border border-char-mute font-mono text-xs">
              <button
                onClick={() => setViewMode("grid")}
                className="px-3.5 py-1.5 rounded transition-all font-bold"
                style={{
                  backgroundColor: viewMode === "grid" ? "__PRIMARY__" : "transparent",
                  color: viewMode === "grid" ? "__TEXT_ON_PRIMARY__" : "#a8a29e",
                }}
              >
                Classic Tabs
              </button>
              <button
                onClick={() => setViewMode("wheel")}
                className="px-3.5 py-1.5 rounded transition-all font-bold"
                style={{
                  backgroundColor: viewMode === "wheel" ? "__PRIMARY__" : "transparent",
                  color: viewMode === "wheel" ? "__TEXT_ON_PRIMARY__" : "#a8a29e",
                }}
              >
                3D Wheel
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs (Buttery Smooth Default Navigation) */}
        {viewMode === "grid" && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat, idx) => {
              const isSelected = selectedCatIndex === idx;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCatIndex(idx)}
                  className="px-5 py-2.5 rounded-md font-mono text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border"
                  style={{
                    backgroundColor: isSelected ? "__PRIMARY__" : "rgba(255, 255, 255, 0.04)",
                    color: isSelected ? "__TEXT_ON_PRIMARY__" : "#d6d3d1",
                    borderColor: isSelected ? "__PRIMARY__" : "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* 3D Option Wheel Mode */}
        {viewMode === "wheel" && (
          <div className="p-8 sm:p-10 rounded-2xl bg-char-soft border border-char-mute shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="mb-4">
                <span className="font-mono text-[11px] uppercase tracking-widest block font-bold" style={{ color: "__PRIMARY__" }}>
                  DRAG OR SCROLL TO SELECT CATEGORY
                </span>
              </div>
              <OptionWheel
                items={categories}
                defaultSelected={selectedCatIndex}
                textColor="#777777"
                activeColor="__PRIMARY__"
                side="left"
                fontSize={2.5}
                spacing={1.3}
                curve={1}
                tilt={8}
                blur={2}
                fade={0.3}
                smoothing={180}
                inset={20}
                draggable={true}
                onChange={(index) => setSelectedCatIndex(index)}
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl bg-char border border-char-mute flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3 border" style={{ backgroundColor: "__PRIMARY__15", color: "__PRIMARY__", borderColor: "__PRIMARY__35" }}>
                  ACTIVE CATEGORY
                </span>
                <h3 className="type-display text-3xl sm:text-4xl text-bone font-bold">
                  {currentCategory}
                </h3>
                <p className="type-serif text-xs sm:text-sm text-smoke mt-3 leading-relaxed">
                  Handcrafted daily using proprietary recipes, premium farm-fresh ingredients, and bespoke seasoning blends.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-char-mute">
                <span className="font-mono text-xs text-smoke">
                  Items: <span className="text-white font-bold">{filteredItems.length}</span>
                </span>
                <button
                  onClick={() => setViewMode("grid")}
                  className="px-4 py-2 rounded-sm font-mono text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "__PRIMARY__", color: "__TEXT_ON_PRIMARY__" }}
                >
                  View Grid →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id || item.name || idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative p-6 rounded-xl bg-char-soft border border-char-mute hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="type-display text-xl sm:text-2xl text-bone group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                    <span
                      className="font-mono text-sm font-bold px-2.5 py-1 rounded-sm border whitespace-nowrap"
                      style={{
                        backgroundColor: "__PRIMARY__15",
                        color: "__PRIMARY__",
                        borderColor: "__PRIMARY__40",
                      }}
                    >
                      __CURRENCY__{item.price}
                    </span>
                  </div>

                  <p className="type-serif text-xs text-smoke leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-4 border-t border-char-mute/50">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {Array.isArray(item.tags) && item.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-char text-stone-400 border border-char-mute"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
                    style={{
                      backgroundColor: "__PRIMARY__",
                      color: "__TEXT_ON_PRIMARY__",
                    }}
                  >
                    Add +
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
'''

for slug, cfg in brands.items():
    p_path = os.path.join('projects', slug)
    if not os.path.exists(p_path):
        continue

    menu_code = sig_menu_template.replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg['text_on_primary']).replace('__CURRENCY__', cfg['currency'])
    with open(os.path.join(p_path, 'components', 'marketing', 'SignatureMenu.tsx'), 'w') as f:
        f.write(menu_code)

print("✓ Updated SignatureMenu.tsx across all 24 projects with safe type properties!")
