#!/usr/bin/env python3
"""
Roll out Ultra-Minimalist, Bold, High-End Aesthetic across all 24 projects:
- Remove all paragraph bloat, redundant subtexts, and filler sentences on the landing page
- Keep typography big, bold, punchy, and modern
- Clean Hero, Manifesto, Accordion Gallery, Atelier Morpher, Smoothie, Pairings, Menu, Craft Lab, Locations, Reservations, and Footer
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def update_hero_clean(project_dir: str, slug: str, cfg: dict):
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

          <div className="pt-2 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-2xl hover:brightness-110 active:scale-95 flex items-center gap-2"
              style={{{{ backgroundColor: "{primary}", color: "{text_on_primary}" }}}}
            >
              <span>Explore Menu</span>
              <span>→</span>
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:border-white/40 active:scale-95 transition-all"
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

def update_smoothie_clean(project_dir: str, slug: str, cfg: dict):
    smoothie_path = os.path.join(project_dir, "components", "marketing", "CinematicSmoothie.tsx")
    if not os.path.exists(smoothie_path):
        return

    primary = cfg.get("primary", "#FF0036")
    food_type = cfg.get("food_type", "burger")
    
    if food_type == "pizza":
        title_top = "SAN MARZANO"
        title_bot = "BURRATA CRUSH"
    else:
        title_top = "LOTUS BISCOFF"
        title_bot = "SPECULOOS MALT"

    code = f"""\"use client\";

import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  {{ length: 240 }},
  (_, i) => `/frames/smoothie/frame_${{String(i).padStart(6, "0")}}.webp`
);

export default function CinematicSmoothie() {{
  return (
    <CanvasScrubber frames={{frames}} scrollDistance="+=200%">
      <div className="h-full w-full flex flex-col justify-center p-8 sm:p-12 md:p-20 relative pointer-events-none">
        <div className="max-w-3xl space-y-4">
          <h2 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none font-black tracking-tight">
            {title_top} <br />
            <span style={{{{ color: "{primary}" }}}}>{title_bot}</span>
          </h2>
        </div>
      </div>
    </CanvasScrubber>
  );
}}
"""
    with open(smoothie_path, "w", encoding="utf-8") as f:
        f.write(code)

def update_manifesto_clean(project_dir: str, slug: str, cfg: dict):
    manifesto_path = os.path.join(project_dir, "components", "marketing", "BrandManifesto.tsx")
    if not os.path.exists(manifesto_path):
        return

    name = cfg.get("name", slug.title())
    short_name = cfg.get("short_name", name.upper())
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#FFFFFF")
    food_type = cfg.get("food_type", "burger")

    if food_type == "pizza":
        p1_title, p1_badge = "72-HR FERMENTED DOUGH", "900°F WOOD FIRE"
        p1_img = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
        p1_st = [("Deck Temp", "900°F", 95), ("Fermentation", "72 Hours", 98), ("Hydration", "78% Double Zero", 90)]
        
        p2_title, p2_badge = "SAN MARZANO D.O.P.", "RAW CRUSH"
        p2_img = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop"
        p2_st = [("Origin", "Campania D.O.P.", 85), ("Sweetness", "Natural 14.2°", 99), ("Purity", "100% Uncooked", 92)]
        
        p3_title, p3_badge = "FIOR DI LATTE", "ARTISANAL"
        p3_img = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
        p3_st = [("Viscosity", "Liquid Cream", 90), ("Melt Index", "Zero Soggy Base", 96), ("Char Score", "99.1%", 88)]
        
        headline = "WOOD-FIRED PIZZA CRAFT."
        test_btn = "TEST 900°F FIRE"
        testing_btn = "FIRING 900°F..."
        bad_items = ["• Dense, under-proofed heavy dough", "• Canned sugary tomato paste", "• Artificial rubbery cheese"]
        good_items = ["• 72-hour naturally leavened dough", "• 100% raw San Marzano D.O.P. tomatoes", "• Artisan Fior di Latte on 900°F deck"]
    else:
        p1_title, p1_badge = "HEAVY STEEL SMASH", "450°F CAST IRON"
        p1_img = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop"
        p1_st = [("Sear Heat", "450°F", 95), ("Maillard Crust Index", "98.6%", 98), ("Lace Thickness", "1.2 mm", 90)]
        
        p2_title, p2_badge = "SQUISHY POTATO ROLLS", "CULTURED BUTTER"
        p2_img = "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
        p2_st = [("Toasting Temp", "380°F", 85), ("Pillow Softness", "99.4%", 99), ("Lamination", "Sweet Cream Butter", 92)]
        
        p3_title, p3_badge = "CRAFT MALTS & SIDES", "HAND-SPUN"
        p3_img = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop"
        p3_st = [("Gelato Churn", "Slow Batch", 90), ("Melt Viscosity", "Liquid Velvet", 96), ("Animal Sauce", "House Emulsion", 88)]
        
        headline = "THE 450°F STEEL SMASH STANDARD."
        test_btn = "TEST FLAT-TOP SEAR"
        testing_btn = "SEARING 450°F..."
        bad_items = ["• Steamed interior, zero Maillard crust", "• Dense dry bun, collapses under sauce", "• Cold unmelted cheese slice"]
        good_items = ["• 450°F cast iron crispy lace edges", "• Sweet cream butter toasted potato roll", "• Steam dome molten cheese melt"]

    code = f"""\"use client\";

import React, {{ useState }} from "react";
import Image from "next/image";
import {{ motion, AnimatePresence }} from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

interface PillarSpec {{
  id: string;
  number: string;
  title: string;
  badge: string;
  stats: {{ label: string; value: string; progress: number }}[];
  image: string;
  hotspots: {{ x: number; y: number; label: string }}[];
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
      stats: [
        {{ label: "{p1_st[0][0]}", value: "{p1_st[0][1]}", progress: {p1_st[0][2]} }},
        {{ label: "{p1_st[1][0]}", value: "{p1_st[1][1]}", progress: {p1_st[1][2]} }},
        {{ label: "{p1_st[2][0]}", value: "{p1_st[2][1]}", progress: {p1_st[2][2]} }},
      ],
      image: "{p1_img}",
      hotspots: [
        {{ x: 35, y: 48, label: "Lacy Caramelized Crust" }},
        {{ x: 62, y: 38, label: "Fresh Premium Grind" }},
        {{ x: 48, y: 72, label: "Rendered Pan Jus" }}
      ]
    }},
    {{
      id: "pillar-2",
      number: "02",
      title: "{p2_title}",
      badge: "{p2_badge}",
      stats: [
        {{ label: "{p2_st[0][0]}", value: "{p2_st[0][1]}", progress: {p2_st[0][2]} }},
        {{ label: "{p2_st[1][0]}", value: "{p2_st[1][1]}", progress: {p2_st[1][2]} }},
        {{ label: "{p2_st[2][0]}", value: "{p2_st[2][1]}", progress: {p2_st[2][2]} }},
      ],
      image: "{p2_img}",
      hotspots: [
        {{ x: 50, y: 25, label: "Golden Butter Toast" }},
        {{ x: 50, y: 80, label: "Cloud Soft Crumb" }}
      ]
    }},
    {{
      id: "pillar-3",
      number: "03",
      title: "{p3_title}",
      badge: "{p3_badge}",
      stats: [
        {{ label: "{p3_st[0][0]}", value: "{p3_st[0][1]}", progress: {p3_st[0][2]} }},
        {{ label: "{p3_st[1][0]}", value: "{p3_st[1][1]}", progress: {p3_st[1][2]} }},
        {{ label: "{p3_st[2][0]}", value: "{p3_st[2][1]}", progress: {p3_st[2][2]} }},
      ],
      image: "{p3_img}",
      hotspots: [
        {{ x: 42, y: 35, label: "Artisanal Emulsion" }},
        {{ x: 55, y: 65, label: "Rich Dairy Base" }}
      ]
    }}
  ];

  const current = pillars[activePillar];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {{/* Header */}}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-white font-black leading-tight tracking-tight">
              <ShinyText text="{headline}" speed={{3}} shimmerColor="{primary}" className="font-black" />
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md self-start md:self-end">
            <button
              type="button"
              onClick={{() => setViewMode("spec")}}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
              style={{{{
                backgroundColor: viewMode === "spec" ? "{primary}" : "transparent",
                color: viewMode === "spec" ? "{text_on_primary}" : "#FAF8F2",
              }}}}
            >
              Specimen
            </button>
            <button
              type="button"
              onClick={{() => setViewMode("compare")}}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
              style={{{{
                backgroundColor: viewMode === "compare" ? "{primary}" : "transparent",
                color: viewMode === "compare" ? "{text_on_primary}" : "#FAF8F2",
              }}}}
            >
              Duel
            </button>
          </div>
        </div>

        {{/* Specimen View */}}
        {{viewMode === "spec" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {{pillars.map((p, idx) => {{
                const isSelected = activePillar === idx;
                return (
                  <motion.div
                    key={{p.id}}
                    onClick={{() => {{
                      setActivePillar(idx);
                      setActiveHotspot(0);
                    }}}}
                    whileHover={{{{ y: -2 }}}}
                    className="p-5 rounded-2xl cursor-pointer transition-all backdrop-blur-md border flex items-center justify-between shadow-xl"
                    style={{{{
                      backgroundColor: isSelected ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                      borderColor: isSelected ? "{primary}" : "rgba(255,255,255,0.1)",
                    }}}}
                  >
                    <span
                      className="font-mono text-xs font-extrabold tracking-wider"
                      style={{{{ color: isSelected ? "{primary}" : "#FAF8F2" }}}}
                    >
                      {{p.number}} // {{p.title}}
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                      style={{{{
                        backgroundColor: isSelected ? "{primary}20" : "rgba(255,255,255,0.05)",
                        color: isSelected ? "{primary}" : "#A8A29E",
                        borderColor: isSelected ? "{primary}40" : "rgba(255,255,255,0.1)",
                      }}}}
                    >
                      {{p.badge}}
                    </span>
                  </motion.div>
                );
              }})}}
            </div>

            {{/* Specimen Stage */}}
            <AnimatePresence mode="wait">
              <motion.div
                key={{current.id}}
                initial={{{{ opacity: 0, y: 10 }}}}
                animate={{{{ opacity: 1, y: 0 }}}}
                exit={{{{ opacity: 0, y: -10 }}}}
                transition={{{{ duration: 0.25 }}}}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/15 shadow-2xl items-center"
              >
                {{/* Left: Image with Hotspots */}}
                <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-white/15 bg-black/60 group">
                  <Image
                    src={{current.image}}
                    alt={{current.title}}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {{current.hotspots.map((h, hIdx) => (
                    <div
                      key={{hIdx}}
                      style={{{{ left: `${{h.x}}%`, top: `${{h.y}}%` }}}}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        type="button"
                        onClick={{() => setActiveHotspot(hIdx)}}
                        className="flex items-center justify-center w-7 h-7 rounded-full bg-black/80 border text-xs font-mono font-bold hover:scale-110 transition-transform shadow-2xl"
                        style={{{{ borderColor: "{primary}", color: "{primary}" }}}}
                      >
                        {{hIdx + 1}}
                      </button>
                    </div>
                  ))}}

                  {{activeHotspot !== null && current.hotspots[activeHotspot] && (
                    <div
                      className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/90 backdrop-blur-md border font-mono text-xs font-bold uppercase tracking-wider"
                      style={{{{ borderColor: "{primary}40", color: "{primary}" }}}}
                    >
                      [LAYER {{activeHotspot + 1}}] {{current.hotspots[activeHotspot].label}}
                    </div>
                  )}}
                </div>

                {{/* Right: Metrics & Sear Test */}}
                <div className="lg:col-span-5 space-y-6">
                  <h3 className="type-display text-3xl text-white font-extrabold">
                    {{current.title}}
                  </h3>

                  <div className="space-y-3">
                    {{current.stats.map((st, sIdx) => (
                      <div key={{sIdx}} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-400">{{st.label}}</span>
                          <span className="font-bold" style={{{{ color: "{primary}" }}}}>{{st.value}}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{{{ width: `${{st.progress}}%`, backgroundColor: "{primary}" }}}}
                          />
                        </div>
                      </div>
                    ))}}
                  </div>

                  <button
                    type="button"
                    onClick={{() => {{
                      setIsSizzling(true);
                      setTimeout(() => setIsSizzling(false), 1500);
                    }}}}
                    className="w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 hover:brightness-110"
                    style={{{{ backgroundColor: "{primary}", color: "{text_on_primary}" }}}}
                  >
                    {{isSizzling ? "{testing_btn}" : "{test_btn}"}}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}}

        {{/* Duel View */}}
        {{viewMode === "compare" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-red-500/[0.04] border border-red-500/20 backdrop-blur-xl space-y-4">
              <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider block">
                MASS PRODUCTION
              </span>
              <ul className="space-y-2 font-mono text-xs text-stone-300">
                {bad_items[0]}
                {bad_items[1]}
                {bad_items[2]}
              </ul>
            </div>

            <div
              className="p-6 rounded-2xl bg-white/[0.04] border backdrop-blur-xl space-y-4"
              style={{{{ borderColor: "{primary}40" }}}}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider block" style={{{{ color: "{primary}" }}}}>
                OUR CRAFT SPEC
              </span>
              <ul className="space-y-2 font-mono text-xs text-stone-200">
                {good_items[0]}
                {good_items[1]}
                {good_items[2]}
              </ul>
            </div>
          </div>
        )}}
      </div>
    </section>
  );
}}
"""
    with open(manifesto_path, "w", encoding="utf-8") as f:
        f.write(code)

def update_accordion_gallery_clean(project_dir: str):
    ag_path = os.path.join(project_dir, "components", "marketing", "CulinaryAccordionGallery.tsx")
    if not os.path.exists(ag_path):
        return
    with open(ag_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove subtitle <p> tag completely
    content = re.sub(r'<p className="text-smoke[^>]*>[\s\S]*?<\/p>', '', content)
    content = content.replace("INTERACTIVE SPECIMEN ACCORDION", "GALLERY")
    content = content.replace("SIGNATURE SPECIMENS", "GALLERY")

    with open(ag_path, "w", encoding="utf-8") as f:
        f.write(content)

def update_atelier_assembly_clean(project_dir: str):
    aa_path = os.path.join(project_dir, "components", "marketing", "AtelierAssembly.tsx")
    if not os.path.exists(aa_path):
        return
    with open(aa_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove subtitle <p> tag completely
    content = re.sub(r'<p className="text-smoke[^>]*>[\s\S]*?<\/p>', '', content)
    content = content.replace("LIQUID MORPH SCROLLYTELLING", "THE CRAFT")
    content = content.replace("ANATOMICAL BUILD", "THE CRAFT")

    with open(aa_path, "w", encoding="utf-8") as f:
        f.write(content)

def update_archetype_showcase_clean(project_dir: str, primary: str):
    ash_path = os.path.join(project_dir, "components", "marketing", "ArchetypeShowcase.tsx")
    if not os.path.exists(ash_path):
        return
    with open(ash_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove subtitle <span className="font-mono text-xs text-stone-400">...</span>
    content = re.sub(r'<span className="font-mono text-xs text-stone-400">[\s\S]*?<\/span>', '', content)
    content = re.sub(r'<p className="text-stone-300 text-xs font-mono leading-relaxed">[\s\S]*?<\/p>', '', content)
    content = content.replace("HAUTE ATELIER GASTRONOMY // CURATED PAIRINGS", "PAIRINGS")
    content = content.replace("CURATED PAIRINGS", "PAIRINGS")

    with open(ash_path, "w", encoding="utf-8") as f:
        f.write(content)

def update_signature_menu_clean(project_dir: str):
    sm_path = os.path.join(project_dir, "components", "marketing", "SignatureMenu.tsx")
    if not os.path.exists(sm_path):
        return
    with open(sm_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove subtitle <p> in header
    content = re.sub(r'<p className="font-mono text-xs text-stone-400 max-w-xl">[\s\S]*?<\/p>', '', content)
    content = re.sub(r'<span className="font-mono text-xs tracking-widest uppercase font-bold"[^>]*>[\s\S]*?<\/span>', '', content)

    with open(sm_path, "w", encoding="utf-8") as f:
        f.write(content)

def update_how_we_smash_clean(project_dir: str):
    hws_path = os.path.join(project_dir, "components", "marketing", "HowWeSmash.tsx")
    if not os.path.exists(hws_path):
        return
    with open(hws_path, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'<span className="font-mono text-xs tracking-widest uppercase block font-bold"[^>]*>[\s\S]*?<\/span>', '', content)
    content = re.sub(r'<p className="text-stone-300 text-xs font-mono leading-relaxed">[\s\S]*?<\/p>', '', content)

    with open(hws_path, "w", encoding="utf-8") as f:
        f.write(content)

def update_locations_clean(project_dir: str):
    loc_path = os.path.join(project_dir, "components", "marketing", "RestaurantLocations.tsx")
    if not os.path.exists(loc_path):
        return
    with open(loc_path, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'<span className="font-mono text-xs tracking-widest uppercase block font-bold"[^>]*>[\s\S]*?<\/span>', '', content)

    with open(loc_path, "w", encoding="utf-8") as f:
        f.write(content)

def update_reservations_clean(project_dir: str):
    res_path = os.path.join(project_dir, "components", "marketing", "ReservationCTA.tsx")
    if not os.path.exists(res_path):
        return
    with open(res_path, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'<span className="font-mono text-xs tracking-widest uppercase font-bold block"[^>]*>[\s\S]*?<\/span>', '', content)
    content = re.sub(r'<p className="text-stone-300 text-sm max-w-xl mx-auto font-body">[\s\S]*?<\/p>', '', content)

    with open(res_path, "w", encoding="utf-8") as f:
        f.write(content)

def main():
    print("🚀 Rolling out ultra-clean, minimal aesthetic across all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue
        
        primary = cfg.get("primary", "#FF0036")
        
        # Clean Hero
        update_hero_clean(project_dir, slug, cfg)
        
        # Clean Smoothie
        update_smoothie_clean(project_dir, slug, cfg)
        
        # Clean Manifesto
        update_manifesto_clean(project_dir, slug, cfg)
        
        # Clean Accordion Gallery
        update_accordion_gallery_clean(project_dir)
        
        # Clean Atelier Assembly
        update_atelier_assembly_clean(project_dir)
        
        # Clean Archetype Showcase
        update_archetype_showcase_clean(project_dir, primary)
        
        # Clean Menu
        update_signature_menu_clean(project_dir)
        
        # Clean How We Smash
        update_how_we_smash_clean(project_dir)
        
        # Clean Locations
        update_locations_clean(project_dir)
        
        # Clean Reservations
        update_reservations_clean(project_dir)
        
        print(f"✓ Streamlined {slug}")

    print("\n🎉 Ultra-clean aesthetic rollout completed across all 24 projects!")

if __name__ == "__main__":
    main()
