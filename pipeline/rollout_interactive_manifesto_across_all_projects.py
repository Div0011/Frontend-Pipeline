#!/usr/bin/env python3
"""
Roll out Interactive BrandManifesto (Specimen Lab + Smash vs Thick Duel) across all 24 projects.
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def generate_interactive_manifesto(slug: str, cfg: dict) -> str:
    name = cfg.get("name", slug.title())
    short_name = cfg.get("short_name", name.upper())
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#FFFFFF")
    tagline = cfg.get("tagline", "THE CULINARY STANDARD // 450°F STEEL SPEC")
    sub = cfg.get("sub", "MAXIMUM CRUNCH MAILLARD CRUST")
    food_type = cfg.get("food_type", "burger")
    
    if food_type == "pizza":
        p1_title = "72-HR FERMENTED DOUGH"
        p1_badge = "900°F WOOD FIRE"
        p1_summary = "Double zero Italian flour naturally leavened for 72 hours for airy leopard-spotted cornicione."
        p1_details = "Our sourdough starter undergoes slow cold-temperature fermentation, yielding complex lactic notes and micro-air pockets that flash-expand in our 900°F stone oven in under 90 seconds."
        p1_img = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
        p1_s1, p1_v1 = "Oven Deck Temp", "900°F"
        p1_s2, p1_v2 = "Fermentation Time", "72 Hours"
        p1_s3, p1_v3 = "Hydration Index", "78% Double Zero"
        
        p2_title = "SAN MARZANO D.O.P."
        p2_badge = "MT. VESUVIUS VOLCANIC SOIL"
        p2_summary = "Sun-ripened certified San Marzano plum tomatoes crushed with sea salt and fresh basil."
        p2_details = "Grown in nutrient-rich volcanic soil in Campania, hand-crushed raw to preserve bright acidity and natural sweetness without artificial paste or added sugar."
        p2_img = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop"
        p2_s1, p2_v1 = "Tomato Origin", "Campania D.O.P."
        p2_s2, p2_v2 = "Brix Sweetness", "14.2° Natural"
        p2_s3, p2_v3 = "Raw Crush Ratio", "100% Uncooked"
        
        p3_title = "FIOR DI LATTE & STRACCIATELLA"
        p3_badge = "FRESH WATER BUFFALO"
        p3_summary = "Artisanal pulled mozzarella and creamy stracciatella melted to stringy perfection."
        p3_details = "Crafted daily from fresh morning milk, delivering clean milky richness that caramelizes into golden blisters over wood embers."
        p3_img = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
        p3_s1, p3_v1 = "Melt Viscosity", "Liquid Cream"
        p3_s2, p3_v2 = "Moisture Balance", "Zero Base Sog"
        p3_s3, p3_v3 = "Char Blister Score", "99.1%"
        
        bad_title = "THICK HEAVY CARDBOARD PIZZA"
        bad_sub = "MASS COMMERCIAL SLICES"
        bad_p1 = "Dense, under-proofed heavy dough that sits like a brick."
        bad_p2 = "Canned sugary tomato paste loaded with preservatives."
        bad_p3 = "Artificial powdered cheese that turns oily and rubbery."
        bad_p4 = "Soggy center with zero crust blisters or airy structure."
        
        good_title = f"{short_name} WOOD-FIRED CRAFT"
        good_p1 = "72-hour naturally leavened dough with airy leopard blisters."
        good_p2 = "100% raw crushed San Marzano D.O.P. plum tomatoes."
        good_p3 = "Fresh artisan Fior di Latte melted on 900°F stone deck."
        good_p4 = "Perfect balance of crisp charred bite and chewy crumb."

    else:
        p1_title = "HEAVY STEEL SMASH"
        p1_badge = "450°F CAST IRON"
        p1_summary = "200 lbs of steel press weight flattening coarse beef against searing cast iron."
        p1_details = "By applying immense downward pressure with a precision cast-iron smash tool, we maximize contact surface area with the 450°F steel, triggering immediate Maillard protein caramelization to produce ultra-crisp, savory lace edges."
        p1_img = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop"
        p1_s1, p1_v1 = "Sear Heat", "450°F"
        p1_s2, p1_v2 = "Maillard Crust Density", "98.6%"
        p1_s3, p1_v3 = "Lace Edge Thickness", "1.2 mm"
        
        p2_title = "SQUISHY POTATO ROLLS"
        p2_badge = "CULTURED BUTTER"
        p2_summary = "Plush Pennsylvania potato rolls toasted in cultured sweet cream butter."
        p2_details = "We toast authentic plush potato brioche rolls on a dedicated 380°F butter plate until an impenetrable golden crust forms, engineered to catch savory meat drippings without ever getting soggy."
        p2_img = "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
        p2_s1, p2_v1 = "Toasting Surface Temp", "380°F"
        p2_s2, p2_v2 = "Pillow Softness Score", "99.4%"
        p2_s3, p2_v3 = "Butter Lamination", "Pure Sweet Cream"
        
        p3_title = "CRAFT DIPS & SHAKES"
        p3_badge = "HAND-SPUN"
        p3_summary = "Hand-spun gelato malts, molten animal fries, and house relish emulsions."
        p3_details = "From slow-churned Madagascar vanilla bean gelato whipped with rich ingredients to triple-cooked Idaho crinkle fries tossed in molten American cheddar and secret sauce, every side is designed to hit with maximum flavor impact."
        p3_img = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop"
        p3_s1, p3_v1 = "Gelato Churn Rate", "Slow Batch"
        p3_s2, p3_v2 = "Cheese Sauce Viscosity", "Liquid Velvet"
        p3_s3, p3_v3 = "House Sauce Complexity", "14 Ingredients"
        
        bad_title = "THICK 200g GREY PATTY"
        bad_sub = "BLAND & UNEVEN"
        bad_p1 = "Steamed interior with zero Maillard crust."
        bad_p2 = "Dry, dense sesame bun that disintegrates under sauce."
        bad_p3 = "Cold, unmelted processed cheese slice."
        bad_p4 = "Unpleasant meat-to-bun ratio that falls apart."
        
        good_title = f"DUAL LACY {short_name} SMASH"
        good_p1 = "200 lbs steel press produces paper-thin crunchy lace edges."
        good_p2 = "Sweet cream butter griddled Martin's potato rolls."
        good_p3 = "Steam dome bath for instantaneous liquid cheese melt."
        good_p4 = "Perfect golden ratio of crust, fat, sauce, and bun in every bite."

    code = f"""\"use client\";

import React, {{ useState }} from "react";
import Image from "next/image";
import {{ motion, AnimatePresence }} from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import DecryptedText from "@/components/ui/DecryptedText";

interface PillarSpec {{
  id: string;
  number: string;
  title: string;
  badge: string;
  summary: string;
  details: string;
  stats: {{ label: string; value: string; progress: number }}[];
  image: string;
  hotspots: {{ x: number; y: number; label: string; note: string }}[];
}}

export default function BrandManifesto() {{
  const [activePillar, setActivePillar] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"spec" | "compare">("spec");
  const [isSizzling, setIsSizzling] = useState(false);

  const pillars: PillarSpec[] = [
    {{
      id: "pillar-1",
      number: "01",
      title: "{p1_title}",
      badge: "{p1_badge}",
      summary: "{p1_summary}",
      details: "{p1_details}",
      stats: [
        {{ label: "{p1_s1}", value: "{p1_v1}", progress: 95 }},
        {{ label: "{p1_s2}", value: "{p1_v2}", progress: 98 }},
        {{ label: "{p1_s3}", value: "{p1_v3}", progress: 90 }},
      ],
      image: "{p1_img}",
      hotspots: [
        {{ x: 35, y: 48, label: "Lacy Caramelized Crust", note: "Razor-thin crispy outer perimeter created on red-hot searing iron." }},
        {{ x: 62, y: 38, label: "Fresh Premium Grind", note: "Coarse prime cuts for maximum juicy fat rendering." }},
        {{ x: 48, y: 72, label: "Rendered Pan Jus", note: "Seared in its natural juices for peak savory intensity." }}
      ]
    }},
    {{
      id: "pillar-2",
      number: "02",
      title: "{p2_title}",
      badge: "{p2_badge}",
      summary: "{p2_summary}",
      details: "{p2_details}",
      stats: [
        {{ label: "{p2_s1}", value: "{p2_v1}", progress: 85 }},
        {{ label: "{p2_s2}", value: "{p2_v2}", progress: 99 }},
        {{ label: "{p2_s3}", value: "{p2_v3}", progress: 92 }},
      ],
      image: "{p2_img}",
      hotspots: [
        {{ x: 50, y: 25, label: "Golden Butter Toast", note: "Caramelized with sweet cream butter on flat-top steel." }},
        {{ x: 50, y: 80, label: "Cloud Soft Crumb", note: "Engineered to absorb savory juices while staying feather-light." }}
      ]
    }},
    {{
      id: "pillar-3",
      number: "03",
      title: "{p3_title}",
      badge: "{p3_badge}",
      summary: "{p3_summary}",
      details: "{p3_details}",
      stats: [
        {{ label: "{p3_s1}", value: "{p3_v1}", progress: 90 }},
        {{ label: "{p3_s2}", value: "{p3_v2}", progress: 96 }},
        {{ label: "{p3_s3}", value: "{p3_v3}", progress: 88 }},
      ],
      image: "{p3_img}",
      hotspots: [
        {{ x: 42, y: 35, label: "Artisanal Emulsion", note: "Handcrafted in small batches daily." }},
        {{ x: 55, y: 65, label: "Rich Dairy Foundation", note: "Slow-churned premium cream." }}
      ]
    }}
  ];

  const current = pillars[activePillar];

  return (
    <section className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {{/* 1. Header & Decrypted Typewriter */}}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10" style={{{{ backgroundColor: "{primary}" }}}} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{{{ color: "{primary}" }}}}>
                <DecryptedText
                  text="{tagline}"
                  speed={{35}}
                  maxIterations={{10}}
                  animateOn="view"
                />
              </span>
            </div>
            <h2 className="type-display text-3xl sm:text-5xl md:text-6xl text-white font-extrabold leading-tight">
              THICK FLUFFY PATTIES ARE BORING. <br />
              WE BELIEVE IN THE{" "}
              <ShinyText
                text="{sub}"
                speed={{3}}
                shimmerColor="{primary}"
                className="font-extrabold"
              />{" "}
              <br className="hidden sm:inline" />
              OF DUAL THIN PATTIES SMASHED WITH STEEL.
            </h2>
          </div>

          {{/* Mode Switcher Buttons */}}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md self-start md:self-end">
            <button
              type="button"
              onClick={{() => setViewMode("spec")}}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all"
              style={{{{
                backgroundColor: viewMode === "spec" ? "{primary}" : "transparent",
                color: viewMode === "spec" ? "{text_on_primary}" : "#FAF8F2",
              }}}}
            >
              🔬 Specimen Lab
            </button>
            <button
              type="button"
              onClick={{() => setViewMode("compare")}}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all"
              style={{{{
                backgroundColor: viewMode === "compare" ? "{primary}" : "transparent",
                color: viewMode === "compare" ? "{text_on_primary}" : "#FAF8F2",
              }}}}
            >
              ⚡ Craft vs Mass Duel
            </button>
          </div>
        </div>

        {{/* 2. Interactive Specimen Lab Mode */}}
        {{viewMode === "spec" && (
          <div className="space-y-10">
            {{/* 3 Pillar Selectable Interactive Tabs */}}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {{pillars.map((p, idx) => {{
                const isSelected = activePillar === idx;
                return (
                  <motion.div
                    key={{p.id}}
                    onClick={{() => {{
                      setActivePillar(idx);
                      setActiveHotspot(0);
                    }}}}
                    whileHover={{{{ y: -4 }}}}
                    className="p-6 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-md border flex flex-col justify-between space-y-4 shadow-xl"
                    style={{{{
                      backgroundColor: isSelected ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                      borderColor: isSelected ? "{primary}" : "rgba(255,255,255,0.1)",
                    }}}}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-xs font-extrabold tracking-widest"
                        style={{{{ color: isSelected ? "{primary}" : "#A8A29E" }}}}
                      >
                        {{p.number}} // {{p.title}}
                      </span>
                      <span
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border"
                        style={{{{
                          backgroundColor: isSelected ? "{primary}20" : "rgba(255,255,255,0.05)",
                          color: isSelected ? "{primary}" : "#D6D3D1",
                          borderColor: isSelected ? "{primary}40" : "rgba(255,255,255,0.1)",
                        }}}}
                      >
                        {{p.badge}}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 font-body leading-relaxed">
                      {{p.summary}}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono">
                      <span className="font-mono text-xs" style={{{{ color: isSelected ? "{primary}" : "#78716C", fontWeight: isSelected ? 700 : 400 }}}}>
                        {{isSelected ? "● ACTIVE SPECIMEN" : "○ CLICK TO INSPECT"}}
                      </span>
                      <span className="text-stone-400">→</span>
                    </div>
                  </motion.div>
                );
              }})}}
            </div>

            {{/* Live Interactive Specimen Stage */}}
            <AnimatePresence mode="wait">
              <motion.div
                key={{current.id}}
                initial={{{{ opacity: 0, y: 15 }}}}
                animate={{{{ opacity: 1, y: 0 }}}}
                exit={{{{ opacity: 0, y: -15 }}}}
                transition={{{{ duration: 0.35 }}}}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-2xl items-center"
              >
                {{/* Left: Interactive Image with Interactive Hotspot Radar */}}
                <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/60 group">
                  <Image
                    src={{current.image}}
                    alt={{current.title}}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {{/* Hotspots */}}
                  {{current.hotspots.map((h, hIdx) => {{
                    const isActive = activeHotspot === hIdx;
                    return (
                      <div
                        key={{hIdx}}
                        style={{{{ left: `${{h.x}}%`, top: `${{h.y}}%` }}}}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        <button
                          type="button"
                          onClick={{() => setActiveHotspot(hIdx)}}
                          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border text-xs font-mono font-bold transition-transform hover:scale-125 shadow-2xl cursor-pointer"
                          style={{{{
                            borderColor: "{primary}",
                            color: "{primary}",
                          }}}}
                        >
                          <span className="w-2.5 h-2.5 rounded-full animate-ping absolute inset-0 m-auto opacity-75" style={{{{ backgroundColor: "{primary}" }}}} />
                          <span>{{hIdx + 1}}</span>
                        </button>
                      </div>
                    );
                  }})}}

                  {{/* Active Hotspot Preview Toast Overlay */}}
                  {{activeHotspot !== null && current.hotspots[activeHotspot] && (
                    <motion.div
                      initial={{{{ opacity: 0, y: 10 }}}}
                      animate={{{{ opacity: 1, y: 0 }}}}
                      className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 backdrop-blur-xl border shadow-2xl space-y-1 z-30"
                      style={{{{ borderColor: "{primary}60" }}}}
                    >
                      <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider" style={{{{ color: "{primary}" }}}}>
                        <span>[PIN {{activeHotspot + 1}}]</span>
                        <span>{{current.hotspots[activeHotspot].label}}</span>
                      </div>
                      <p className="text-xs text-stone-200 font-mono">
                        {{current.hotspots[activeHotspot].note}}
                      </p>
                    </motion.div>
                  )}}
                </div>

                {{/* Right: Technical Specifications & Telemetry */}}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{{{ backgroundColor: "{primary}" }}}} />
                      <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{{{ color: "{primary}" }}}}>
                        ENGINEERING SPECIFICATION // {{current.number}}
                      </span>
                    </div>
                    <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                      {{current.title}}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 font-body leading-relaxed">
                      {{current.details}}
                    </p>
                  </div>

                  {{/* Telemetry Progress Bars */}}
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    <span className="font-mono text-[10px] text-stone-400 tracking-wider uppercase block">
                      CULINARY QUALITY INDICES
                    </span>
                    {{current.stats.map((st, sIdx) => (
                      <div key={{sIdx}} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-300">{{st.label}}</span>
                          <span className="font-bold" style={{{{ color: "{primary}" }}}}>{{st.value}}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{{{ width: 0 }}}}
                            animate={{{{ width: `${{st.progress}}%` }}}}
                            transition={{{{ duration: 0.8, ease: "easeOut" }}}}
                            className="h-full rounded-full"
                            style={{{{ backgroundColor: "{primary}" }}}}
                          />
                        </div>
                      </div>
                    ))}}
                  </div>

                  {{/* Interactive Micro-Interaction: Sizzle Test */}}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs font-bold text-white block">
                        HEAT &amp; SEAR SIMULATOR
                      </span>
                      <span className="font-mono text-[10px] text-stone-400 block">
                        {{isSizzling ? "🔥 High-heat contact engaged..." : "Tap to simulate flat-top sear contact"}}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={{() => {{
                        setIsSizzling(true);
                        setTimeout(() => setIsSizzling(false), 2000);
                      }}}}
                      className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 hover:brightness-110"
                      style={{{{
                        backgroundColor: "{primary}",
                        color: "{text_on_primary}",
                      }}}}
                    >
                      {{isSizzling ? "ENGAGED!" : "TEST SEAR"}}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}}

        {{/* 3. Interactive Comparison Duel */}}
        {{viewMode === "compare" && (
          <motion.div
            initial={{{{ opacity: 0, scale: 0.98 }}}}
            animate={{{{ opacity: 1, scale: 1 }}}}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {{/* The Generic / Mass Produced (Flawed) */}}
            <div className="p-8 rounded-3xl bg-red-500/[0.04] border border-red-500/20 backdrop-blur-xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
                  ❌ {bad_sub}
                </span>
                <span className="font-mono text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                  BLAND &amp; UNEVEN
                </span>
              </div>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                {bad_title}
              </h3>
              <ul className="space-y-3 font-mono text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>{bad_p1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>{bad_p2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>{bad_p3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>{bad_p4}</span>
                </li>
              </ul>
            </div>

            {{/* Our Signature (Superior) */}}
            <div
              className="p-8 rounded-3xl bg-white/[0.05] border backdrop-blur-xl space-y-6 shadow-2xl ring-1"
              style={{{{
                borderColor: "{primary}60",
              }}}}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{{{ color: "{primary}" }}}}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{{{ backgroundColor: "{primary}" }}}} />
                  ✅ {short_name} STANDARD
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded" style={{{{ backgroundColor: "{primary}", color: "{text_on_primary}" }}}}>
                  CRAFT SPEC
                </span>
              </div>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                {good_title}
              </h3>
              <ul className="space-y-3 font-mono text-xs text-stone-200">
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{{{ color: "{primary}" }}}}>✓</span>
                  <span>{good_p1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{{{ color: "{primary}" }}}}>✓</span>
                  <span>{good_p2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{{{ color: "{primary}" }}}}>✓</span>
                  <span>{good_p3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{{{ color: "{primary}" }}}}>✓</span>
                  <span>{good_p4}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}}
      </div>
    </section>
  );
}}
"""
    return code

def main():
    print("🚀 Rolling out Interactive BrandManifesto (Specimen Lab + Duel) to all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue
        
        manifesto_code = generate_interactive_manifesto(slug, cfg)
        manifesto_path = os.path.join(project_dir, "components", "marketing", "BrandManifesto.tsx")
        with open(manifesto_path, "w", encoding="utf-8") as f:
            f.write(manifesto_code)
        print(f"✓ Rolled out interactive BrandManifesto to {slug}")

    print("\n🎉 Master rollout of interactive BrandManifesto complete!")

if __name__ == "__main__":
    main()
