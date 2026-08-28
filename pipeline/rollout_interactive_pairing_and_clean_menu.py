#!/usr/bin/env python3
"""
Roll out Richly Interactive Pairing Studio & Ultra-Clean Menu across all 24 projects:
1. ArchetypeShowcase.tsx:
   - High-res dynamic dual pairing images with animated preview
   - Real-time interactive flavor profile radar meters
   - Interactive 'Match This Pairing' with instant visual feedback & tasting notes
   - No long paragraph descriptions
2. SignatureMenu.tsx:
   - Remove '//' and header descriptions
   - Remove long card descriptions from home page
   - Clean category pills, search bar, and custom SVG icons
   - Refined dish cards with Name, Price, Tags, and Add button
"""

import os

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def generate_pairing_showcase(slug: str, cfg: dict) -> str:
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#FFFFFF")
    food_type = cfg.get("food_type", "burger")

    if food_type == "pizza":
        p1_title, p1_tag, p1_cat = "72-Hr Margherita D.O.P.", "WOOD-FIRED CLASSIC", "Artisan Pizza & Craft Soda"
        p1_price, p1_comp_name, p1_comp_price = 380, "Blood Orange Italian Soda", 160
        p1_img1 = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
        p1_img2 = "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=1200&auto=format&fit=crop"
        p1_fp = [("San Marzano Acidity", 96), ("Wood Deck Char", 94), ("Fior Di Latte Cream", 90)]

        p2_title, p2_tag, p2_cat = "Truffle Burrata Blanco", "WHITE PIE RESERVE", "White Pizza & Truffle Salad"
        p2_price, p2_comp_name, p2_comp_price = 460, "Shaved Truffle Arugula", 220
        p2_img1 = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop"
        p2_img2 = "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
        p2_fp = [("Truffle Oil Infusion", 98), ("Burrata Creaminess", 95), ("Crust Hydration", 91)]

        p3_title, p3_tag, p3_cat = "Spicy Calabrian Salami", "HOT HONEY DRIZZLE", "Spicy Pie & Gelato"
        p3_price, p3_comp_name, p3_comp_price = 420, "Stracciatella Gelato", 190
        p3_img1 = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop"
        p3_img2 = "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop"
        p3_fp = [("Calabrian Chili Heat", 92), ("Hot Honey Sweetness", 94), ("Slow Proof Density", 88)]
    else:
        p1_title, p1_tag, p1_cat = "French Black Truffle Glaze", "HAUTE FOREST MUSHROOM", "Double Smash & Shake"
        p1_price, p1_comp_name, p1_comp_price = 340, "Lotus Biscoff Speculoos Malt", 220
        p1_img1 = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop"
        p1_img2 = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop"
        p1_fp = [("Savory Umami", 96), ("Caramelized Crisp", 92), ("Velvet Sweet Finish", 88)]

        p2_title, p2_tag, p2_cat = "24K Gold Wagyu Lamination", "AKAUSHI RESERVE", "Prime Wagyu & Animal Fries"
        p2_price, p2_comp_name, p2_comp_price = 490, "Loaded Animal Crinkle Fries", 210
        p2_img1 = "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
        p2_img2 = "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop"
        p2_fp = [("Prime Marble Density", 98), ("Butter Lamination", 94), ("Cheese Viscosity", 90)]

        p3_title, p3_tag, p3_cat = "Aged Belgian Speculoos Malt", "SIGNATURE BISCOFF", "Artisanal Dessert Malt & Smash"
        p3_price, p3_comp_name, p3_comp_price = 240, "OG Double Smash", 280
        p3_img1 = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop"
        p3_img2 = "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop"
        p3_fp = [("Gelato Churn Density", 95), ("Caramel Biscuit Crunch", 91), ("Sweet Cream Richness", 89)]

    return f"""\"use client\";

import React, {{ useState }} from "react";
import Image from "next/image";
import {{ motion, AnimatePresence }} from "framer-motion";

interface Pairing {{
  id: string;
  number: string;
  title: string;
  tag: string;
  category: string;
  price: number;
  image: string;
  companionImage: string;
  companionName: string;
  companionPrice: number;
  flavorProfile: {{ label: string; value: number }}[];
}}

export default function ArchetypeShowcase() {{
  const [selectedPairing, setSelectedPairing] = useState<number>(0);
  const [isMatched, setIsMatched] = useState(false);

  const pairings: Pairing[] = [
    {{
      id: "pair-1",
      number: "01",
      title: "{p1_title}",
      tag: "{p1_tag}",
      category: "{p1_cat}",
      price: {p1_price},
      image: "{p1_img1}",
      companionImage: "{p1_img2}",
      companionName: "{p1_comp_name}",
      companionPrice: {p1_comp_price},
      flavorProfile: [
        {{ label: "{p1_fp[0][0]}", value: {p1_fp[0][1]} }},
        {{ label: "{p1_fp[1][0]}", value: {p1_fp[1][1]} }},
        {{ label: "{p1_fp[2][0]}", value: {p1_fp[2][1]} }},
      ],
    }},
    {{
      id: "pair-2",
      number: "02",
      title: "{p2_title}",
      tag: "{p2_tag}",
      category: "{p2_cat}",
      price: {p2_price},
      image: "{p2_img1}",
      companionImage: "{p2_img2}",
      companionName: "{p2_comp_name}",
      companionPrice: {p2_comp_price},
      flavorProfile: [
        {{ label: "{p2_fp[0][0]}", value: {p2_fp[0][1]} }},
        {{ label: "{p2_fp[1][0]}", value: {p2_fp[1][1]} }},
        {{ label: "{p2_fp[2][0]}", value: {p2_fp[2][1]} }},
      ],
    }},
    {{
      id: "pair-3",
      number: "03",
      title: "{p3_title}",
      tag: "{p3_tag}",
      category: "{p3_cat}",
      price: {p3_price},
      image: "{p3_img1}",
      companionImage: "{p3_img2}",
      companionName: "{p3_comp_name}",
      companionPrice: {p3_comp_price},
      flavorProfile: [
        {{ label: "{p3_fp[0][0]}", value: {p3_fp[0][1]} }},
        {{ label: "{p3_fp[1][0]}", value: {p3_fp[1][1]} }},
        {{ label: "{p3_fp[2][0]}", value: {p3_fp[2][1]} }},
      ],
    }},
  ];

  const current = pairings[selectedPairing];

  const handleMatch = () => {{
    setIsMatched(true);
    setTimeout(() => setIsMatched(false), 2000);
  }};

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10 select-none overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10">
        {{/* Header */}}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-sans text-xs uppercase font-bold tracking-widest block" style={{{{ color: "{primary}" }}}}>
              CURATED PAIRINGS
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-extrabold mt-1 tracking-tight">
              THE PAIRING SELECTOR
            </h2>
          </div>
        </div>

        {{/* Interactive Selector Tabs */}}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
          {{pairings.map((p, idx) => {{
            const isSelected = selectedPairing === idx;
            return (
              <motion.button
                key={{p.id}}
                type="button"
                onClick={{() => setSelectedPairing(idx)}}
                whileHover={{{{ y: -2 }}}}
                whileTap={{{{ scale: 0.98 }}}}
                className="p-5 rounded-2xl border text-left transition-all backdrop-blur-xl flex flex-col justify-between space-y-2 shadow-xl"
                style={{{{
                  backgroundColor: isSelected ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  borderColor: isSelected ? "{primary}" : "rgba(255,255,255,0.1)",
                }}}}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{{{ color: isSelected ? "{primary}" : "#FAF8F2" }}}}
                  >
                    {{p.number}}. {{p.title}}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{{{ backgroundColor: isSelected ? "{primary}" : "rgba(255,255,255,0.2)" }}}}
                  />
                </div>
                <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                  {{p.tag}}
                </span>
              </motion.button>
            );
          }})}}
        </div>

        {{/* Interactive Pairing Studio Stage */}}
        <AnimatePresence mode="wait">
          <motion.div
            key={{current.id}}
            initial={{{{ opacity: 0, y: 12 }}}}
            animate={{{{ opacity: 1, y: 0 }}}}
            exit={{{{ opacity: 0, y: -12 }}}}
            transition={{{{ duration: 0.25 }}}}
            className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans"
          >
            {{/* Visual Side-by-Side Dual Imagery */}}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl group">
                <Image
                  src={{current.image}}
                  alt={{current.title}}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 font-sans">
                  <p className="text-white font-bold text-xs leading-tight">{{current.title}}</p>
                  <p className="font-bold text-[11px]" style={{{{ color: "{primary}" }}}}>₹{{current.price}}</p>
                </div>
              </div>

              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl group">
                <Image
                  src={{current.companionImage}}
                  alt={{current.companionName}}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 font-sans">
                  <p className="text-white font-bold text-xs leading-tight">{{current.companionName}}</p>
                  <p className="font-bold text-[11px]" style={{{{ color: "{primary}" }}}}>₹{{current.companionPrice}}</p>
                </div>
              </div>
            </div>

            {{/* Flavor Metrics & Match Action */}}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{{{ color: "{primary}" }}}}>
                  {{current.category}}
                </span>
                <h3 className="type-display text-3xl text-white font-black leading-tight mt-1">
                  {{current.title}}
                </h3>
              </div>

              <div className="space-y-3 font-sans">
                {{current.flavorProfile.map((fp, fIdx) => (
                  <div key={{fIdx}} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-300">{{fp.label}}</span>
                      <span className="font-bold" style={{{{ color: "{primary}" }}}}>{{fp.value}}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{{{ width: `${{fp.value}}%`, backgroundColor: "{primary}" }}}}
                      />
                    </div>
                  </div>
                ))}}
              </div>

              <button
                type="button"
                onClick={{handleMatch}}
                className="w-full py-4 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 hover:brightness-110 hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{{{ backgroundColor: "{primary}", color: "{text_on_primary}" }}}}
              >
                <span>{{isMatched ? "✓ Pairing Matched & Saved" : `Match Pairing (₹${{current.price + current.companionPrice}})`}}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}}
"""

def generate_signature_menu(slug: str, cfg: dict) -> str:
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#FFFFFF")

    return f"""\"use client\";

import React, {{ useState }} from "react";
import {{ menuItems }} from "@/lib/data";
import {{ motion, AnimatePresence }} from "framer-motion";
import CartDrawer, {{ CartItem }} from "@/components/marketing/CartDrawer";

const categories = [
  {{ id: "all", label: "All Items" }},
  {{ id: "smash", label: "Mains" }},
  {{ id: "sides", label: "Sides" }},
  {{ id: "shakes", label: "Drinks \u0026 Shakes" }},
];

export default function SignatureMenu() {{
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activePreviewItem, setActivePreviewItem] = useState<any | null>(null);

  const handleAddToCart = (item: any, e?: React.MouseEvent) => {{
    if (e) e.stopPropagation();
    setCartItems((prev) => {{
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {{
        return prev.map((i) =>
          i.name === item.name ? {{ ...i, quantity: i.quantity + 1 }} : i
        );
      }}
      return [
        ...prev,
        {{
          name: item.name,
          price: item.price,
          quantity: 1,
          description: item.description,
        }},
      ];
    }});
    setCartOpen(true);
  }};

  const handleUpdateQuantity = (name: string, delta: number) => {{
    setCartItems((prev) => {{
      return prev
        .map((i) =>
          i.name === name ? {{ ...i, quantity: i.quantity + delta }} : i
        )
        .filter((i) => i.quantity > 0);
    }});
  }};

  const filteredItems = menuItems.filter((item) => {{
    const cat = String(item.category || "").toLowerCase();
    const name = String(item.name || "").toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = !q || name.includes(q);

    if (!matchesSearch) return false;
    if (selectedCat === "all") return true;
    if (selectedCat === "smash") return cat.includes("burger") || cat.includes("pizza") || cat.includes("special") || cat === "mains";
    if (selectedCat === "sides") return cat.includes("side") || cat.includes("fry") || cat.includes("salad") || cat.includes("wing");
    if (selectedCat === "shakes") return cat.includes("shake") || cat.includes("drink") || cat.includes("dessert") || cat.includes("beverage");
    return true;
  }});

  return (
    <section
      id="menu-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-10 font-sans">
        {{/* Section Header */}}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest block" style={{{{ color: "{primary}" }}}}>
              SIGNATURE MENU
            </span>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight mt-1">
              SIGNATURE SELECTIONS
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <input
                type="text"
                value={{searchQuery}}
                onChange={{(e) => setSearchQuery(e.target.value)}}
                placeholder="Search menu..."
                className="px-4 py-2 pl-9 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors w-52 sm:w-60 font-medium"
                style={{{{ borderColor: searchQuery ? "{primary}" : undefined }}}}
              />
              <svg className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {{searchQuery && (
                <button
                  onClick={{() => setSearchQuery("")}}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}}
            </div>

            <button
              type="button"
              onClick={{() => setCartOpen(true)}}
              className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl"
              style={{{{
                backgroundColor: "{primary}",
                color: "{text_on_primary}",
              }}}}
            >
              <span>Bag ({{cartItems.reduce((a, b) => a + b.quantity, 0)}})</span>
            </button>
          </div>
        </div>

        {{/* Category Pills Bar */}}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {{categories.map((cat) => {{
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={{cat.id}}
                type="button"
                onClick={{() => setSelectedCat(cat.id)}}
                className="px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap border font-bold shadow-md"
                style={{{{
                  backgroundColor: isSelected ? "{primary}" : "rgba(255,255,255,0.05)",
                  color: isSelected ? "{text_on_primary}" : "#A8A29E",
                  borderColor: isSelected ? "{primary}" : "rgba(255,255,255,0.1)",
                }}}}
              >
                {{cat.label}}
              </button>
            );
          }})}}
        </div>

        {{/* Menu Grid with Clean Minimalist Cards */}}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {{filteredItems.map((item, idx) => (
              <motion.div
                key={{item.name || idx}}
                layout
                initial={{{{ opacity: 0, scale: 0.95, y: 15 }}}}
                animate={{{{ opacity: 1, scale: 1, y: 0 }}}}
                exit={{{{ opacity: 0, scale: 0.95, y: -10 }}}}
                transition={{{{ duration: 0.25, delay: idx * 0.03 }}}}
                onClick={{() => setActivePreviewItem(item)}}
                className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold" style={{{{ color: "{primary}" }}}}>
                        Item 0{{idx + 1}}
                      </span>
                      <h3 className="type-display text-2xl text-white transition-colors leading-tight font-extrabold">
                        {{item.name}}
                      </h3>
                    </div>
                    <span
                      className="text-sm font-extrabold px-3 py-1 rounded-full border whitespace-nowrap shadow"
                      style={{{{
                        backgroundColor: "{primary}15",
                        color: "{primary}",
                        borderColor: "{primary}40",
                      }}}}
                    >
                      ₹{{item.price}}
                    </span>
                  </div>

                  {{Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {{item.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                        <span
                          key={{tIdx}}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-stone-300 border border-white/10 font-semibold"
                        >
                          {{tag}}
                        </span>
                      ))}}
                    </div>
                  )}}
                </div>

                <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/10">
                  <span className="text-xs text-stone-400 font-medium hover:text-white transition-colors">
                    View Details →
                  </span>

                  <button
                    type="button"
                    onClick={{(e) => handleAddToCart(item, e)}}
                    className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1"
                    style={{{{
                      backgroundColor: "{primary}",
                      color: "{text_on_primary}",
                    }}}}
                  >
                    <span>Add</span>
                    <span>+</span>
                  </button>
                </div>
              </motion.div>
            ))}}
          </AnimatePresence>
        </div>
      </div>

      {{/* Interactive Dish Quick-View Modal */}}
      <AnimatePresence>
        {{activePreviewItem && (
          <motion.div
            initial={{{{ opacity: 0 }}}}
            animate={{{{ opacity: 1 }}}}
            exit={{{{ opacity: 0 }}}}
            onClick={{() => setActivePreviewItem(null)}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl font-sans"
          >
            <motion.div
              initial={{{{ scale: 0.95, y: 15 }}}}
              animate={{{{ scale: 1, y: 0 }}}}
              exit={{{{ scale: 0.95, y: 15 }}}}
              onClick={{(e) => e.stopPropagation()}}
              className="relative max-w-lg w-full bg-[#0e0e12] border rounded-3xl p-8 text-white shadow-2xl space-y-6 overflow-hidden"
              style={{{{ borderColor: "{primary}60" }}}}
            >
              <button
                type="button"
                onClick={{() => setActivePreviewItem(null)}}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>

              <div className="space-y-3">
                <span className="text-xs tracking-widest uppercase font-bold block" style={{{{ color: "{primary}" }}}}>
                  CULINARY SPEC
                </span>
                <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                  {{activePreviewItem.name}}
                </h3>
                {{activePreviewItem.description && (
                  <p className="text-sm text-stone-300 leading-relaxed font-body">
                    {{activePreviewItem.description}}
                  </p>
                )}}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-2xl font-black" style={{{{ color: "{primary}" }}}}>
                  ₹{{activePreviewItem.price}}
                </span>

                <button
                  type="button"
                  onClick={{() => {{
                    handleAddToCart(activePreviewItem);
                    setActivePreviewItem(null);
                  }}}}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center gap-2"
                  style={{{{
                    backgroundColor: "{primary}",
                    color: "{text_on_primary}",
                  }}}}
                >
                  <span>Add to Bag</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}}
      </AnimatePresence>

      <CartDrawer
        isOpen={{cartOpen}}
        onClose={{() => setCartOpen(false)}}
        items={{cartItems}}
        onUpdateQuantity={{handleUpdateQuantity}}
        currency="₹"
        primaryColor="{primary}"
        textOnPrimary="{text_on_primary}"
      />
    </section>
  );
}}
"""

def main():
    print("🚀 Rolling out interactive pairing studio and clean menu across all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue

        pairing_code = generate_pairing_showcase(slug, cfg)
        pairing_path = os.path.join(project_dir, "components", "marketing", "ArchetypeShowcase.tsx")
        with open(pairing_path, "w", encoding="utf-8") as f:
            f.write(pairing_code)

        menu_code = generate_signature_menu(slug, cfg)
        menu_path = os.path.join(project_dir, "components", "marketing", "SignatureMenu.tsx")
        with open(menu_path, "w", encoding="utf-8") as f:
            f.write(menu_code)

        print(f"✓ Updated {slug}")

    print("\n🎉 Rollout completed across all 24 projects!")

if __name__ == "__main__":
    main()
