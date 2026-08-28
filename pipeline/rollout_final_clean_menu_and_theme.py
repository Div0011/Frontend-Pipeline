#!/usr/bin/env python3
"""
Master rollout for:
1. Ultra-clean SignatureMenu: zero header tags, zero subtitles, zero card descriptions, zero slashes, zero emojis.
2. Ultra-clean HowWeSmash & ReservationCTA & RestaurantLocations: zero header tags, zero filler subtexts.
3. AtmosphereControls: zero orange in light mode, clean black/dark charcoal icons in light mode and vibrant primary in dark mode.
4. InteractiveBackground: smooth warm beige day mode background transition with zero dark vignettes.
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def generate_signature_menu(primary: str) -> str:
    return f"""\"use client\";

import React, {{ useState }} from "react";
import {{ menuItems }} from "@/lib/data";
import {{ motion, AnimatePresence }} from "framer-motion";
import CartDrawer, {{ CartItem }} from "@/components/marketing/CartDrawer";

const categories = [
  {{ id: "all", label: "Full Lineup" }},
  {{ id: "smash", label: "Signature Smashes" }},
  {{ id: "chicken", label: "Crispy Fried Chicken" }},
  {{ id: "sides", label: "Loaded Sides & Fries" }},
  {{ id: "shakes", label: "Hand-Spun Malts" }},
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
    const desc = String(item.description || "").toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = !q || name.includes(q) || desc.includes(q);

    if (!matchesSearch) return false;
    if (selectedCat === "all") return true;
    if (selectedCat === "smash") return cat.includes("burger") || cat.includes("pizza") || cat.includes("special") || cat === "mains";
    if (selectedCat === "chicken") return cat.includes("chicken") || cat.includes("wing") || cat.includes("tender");
    if (selectedCat === "sides") return cat.includes("side") || cat.includes("fry") || cat.includes("salad");
    if (selectedCat === "shakes") return cat.includes("shake") || cat.includes("drink") || cat.includes("dessert");
    return true;
  }});

  return (
    <section
      id="menu-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10 select-none font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {{/* Section Header - Clean display headline only */}}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-white font-extrabold tracking-tight">
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
                className="px-4 py-2.5 pl-9 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors w-52 sm:w-64 font-medium"
              />
              <svg className="w-3.5 h-3.5 absolute left-3.5 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button
              type="button"
              onClick={{() => setCartOpen(true)}}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[{primary}] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl"
            >
              Bag ({{cartItems.reduce((a, b) => a + b.quantity, 0)}})
            </button>
          </div>
        </div>

        {{/* Category Pills */}}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {{categories.map((cat) => {{
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={{cat.id}}
                type="button"
                onClick={{() => setSelectedCat(cat.id)}}
                className={{`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap border ${{
                  isSelected
                    ? "bg-[{primary}] text-black border-[{primary}] shadow-lg scale-105"
                    : "bg-white/5 text-stone-300 border-white/10 hover:bg-white/10 hover:text-white"
                }}`}}
              >
                {{cat.label}}
              </button>
            );
          }})}}
        </div>

        {{/* Menu Grid - Order names, prices, tags, and Add button only */}}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {{filteredItems.map((item, idx) => (
              <motion.div
                key={{item.name || idx}}
                layout
                initial={{{{ opacity: 0, scale: 0.95, y: 15 }}}}
                animate={{{{ opacity: 1, scale: 1, y: 0 }}}}
                exit={{{{ opacity: 0, scale: 0.95, y: -10 }}}}
                transition={{{{ duration: 0.3, delay: idx * 0.03 }}}}
                onClick={{() => setActivePreviewItem(item)}}
                className="group relative p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="type-display text-2xl sm:text-3xl text-white transition-colors leading-tight font-extrabold">
                      {{item.name}}
                    </h3>
                    <span className="text-sm font-extrabold px-3 py-1 rounded-full border border-[{primary}]/40 text-[{primary}] bg-[{primary}]/10 whitespace-nowrap shadow-sm">
                      ₹{{item.price}}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {{Array.isArray(item.tags) &&
                      item.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                        <span
                          key={{tIdx}}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-stone-300 border border-white/10 font-semibold"
                        >
                          {{tag}}
                        </span>
                      ))}}
                  </div>

                  <button
                    type="button"
                    onClick={{(e) => handleAddToCart(item, e)}}
                    className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[{primary}] text-black hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1 ml-auto"
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

      {{/* Quick View Modal */}}
      <AnimatePresence>
        {{activePreviewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{{{ opacity: 0, scale: 0.9 }}}}
              animate={{{{ opacity: 1, scale: 1 }}}}
              exit={{{{ opacity: 0, scale: 0.9 }}}}
              className="relative max-w-lg w-full p-8 rounded-2xl bg-[#0c1410] border border-white/20 shadow-2xl space-y-6 text-white"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="type-display text-3xl font-extrabold">
                    {{activePreviewItem.name}}
                  </h3>
                  <span className="text-xl font-black text-[{primary}]">
                    ₹{{activePreviewItem.price}}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={{() => setActivePreviewItem(null)}}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {{activePreviewItem.description && (
                <p className="text-sm text-stone-300 leading-relaxed font-body">
                  {{activePreviewItem.description}}
                </p>
              )}}

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={{() => {{
                    handleAddToCart(activePreviewItem);
                    setActivePreviewItem(null);
                  }}}}
                  className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-[{primary}] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl"
                >
                  Add to Bag (₹{{activePreviewItem.price}})
                </button>
              </div>
            </motion.div>
          </div>
        )}}
      </AnimatePresence>

      <CartDrawer
        isOpen={{cartOpen}}
        onClose={{() => setCartOpen(false)}}
        items={{cartItems}}
        onUpdateQuantity={{handleUpdateQuantity}}
        currency="₹"
        primaryColor="{primary}"
        textOnPrimary="#000000"
      />
    </section>
  );
}}
"""

def generate_how_we_smash(primary: str) -> str:
    return f"""\"use client\";

import React, {{ useState }} from "react";
import {{ motion }} from "framer-motion";

export default function HowWeSmash() {{
  const [tempValue, setTempValue] = useState(450);
  const crustPercent = Math.min(100, Math.max(10, Math.round(((tempValue - 200) / 300) * 100)));

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans select-none">
      <div className="max-w-6xl mx-auto space-y-12">
        {{/* Section Header */}}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              THE ARTISANAL SIZZLE CRAFT
            </h2>
          </div>
          <span
            className="text-xs uppercase font-bold px-4 py-1.5 rounded-full border shadow"
            style={{{{
              backgroundColor: "{primary}15",
              color: "{primary}",
              borderColor: "{primary}40",
            }}}}
          >
            100% MASTER CRAFT
          </span>
        </div>

        {{/* Interactive Temperature & Sear Simulator Card */}}
        <div className="p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold block" style={{{{ color: "{primary}" }}}}>
                FLAT-TOP SIMULATOR
              </span>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                TEMPERATURE &amp; MAILLARD CRUST GAUGE
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black" style={{{{ color: "{primary}" }}}}>
                {{tempValue}}°F
              </span>
              <span
                className="text-xs px-2.5 py-1 rounded-full border uppercase font-bold"
                style={{{{
                  backgroundColor: "{primary}20",
                  color: "{primary}",
                  borderColor: "{primary}40",
                }}}}
              >
                {{tempValue >= 450 ? "Optimal Crisp" : tempValue >= 350 ? "Standard Sear" : "Slow Temp"}}
              </span>
            </div>
          </div>

          {{/* Interactive Range Slider */}}
          <div className="space-y-2 pt-4">
            <input
              type="range"
              min="200"
              max="500"
              step="10"
              value={{tempValue}}
              onChange={{(e) => setTempValue(Number(e.target.value))}}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10"
              style={{{{ accentColor: "{primary}" }}}}
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-semibold uppercase">
              <span>200°F (Slow Steam)</span>
              <span style={{{{ color: "{primary}" }}}}>450°F (Optimal Crisp Sear)</span>
              <span>500°F (Maximum Char)</span>
            </div>
          </div>

          {{/* Real-time Dynamic Physics Meters */}}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between text-xs text-stone-300">
                <span>Crispy Caramelized Sear</span>
                <span className="font-bold" style={{{{ color: "{primary}" }}}}>{{crustPercent}}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{{{ backgroundColor: "{primary}" }}}}
                  animate={{{{ width: `${{crustPercent}}%` }}}}
                  transition={{{{ duration: 0.2 }}}}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between text-xs text-stone-300">
                <span>Flavor &amp; Juice Retention</span>
                <span className="font-bold" style={{{{ color: "{primary}" }}}}>
                  {{tempValue >= 420 ? "98% (Sealed In)" : "72% (Juice Escaping)"}}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{{{ backgroundColor: "{primary}" }}}}
                  animate={{{{ width: tempValue >= 420 ? "98%" : "72%" }}}}
                  transition={{{{ duration: 0.2 }}}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}}
"""

def generate_reservation_cta(primary: str) -> str:
    return f"""\"use client\";

import React, {{ useState }} from "react";
import {{ motion }} from "framer-motion";

const timeSlots = [
  {{ time: "12:30 PM", status: "Available" }},
  {{ time: "1:45 PM", status: "Few Tables" }},
  {{ time: "7:00 PM", status: "Peak Dinner" }},
  {{ time: "8:30 PM", status: "Filling Fast" }},
  {{ time: "9:45 PM", status: "Available" }},
  {{ time: "11:00 PM", status: "Late Night" }},
];

const seatingZones = [
  {{ id: "counter", name: "Chef's Sizzle Counter", note: "Front-row sizzling view" }},
  {{ id: "booth", name: "Cozy Dining Booth", note: "Spacious group seating" }},
  {{ id: "patio", name: "Open-Air Patio Deck", note: "Outdoor dining" }},
];

export default function ReservationCTA() {{
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [guestCount, setGuestCount] = useState(2);
  const [selectedZone, setSelectedZone] = useState("counter");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleBook = (e: React.FormEvent) => {{
    e.preventDefault();
    const randomRef = `RES-${{Math.floor(1000 + Math.random() * 9000)}}`;
    setBookingRef(randomRef);
    setConfirmed(true);
  }};

  return (
    <section
      id="reservation-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans select-none"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-white font-extrabold tracking-tight">
            BOOK YOUR EXPERIENCE
          </h2>
        </div>

        {{confirmed ? (
          <motion.div
            initial={{{{ opacity: 0, scale: 0.95 }}}}
            animate={{{{ opacity: 1, scale: 1 }}}}
            className="p-10 rounded-2xl bg-white/[0.06] backdrop-blur-xl border-2 max-w-xl mx-auto shadow-2xl space-y-6 text-center"
            style={{{{ borderColor: "{primary}" }}}}
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-black" style={{{{ backgroundColor: "{primary}" }}}}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold block" style={{{{ color: "{primary}" }}}}>
                RESERVATION CONFIRMED
              </span>
              <h3 className="type-display text-3xl text-white font-extrabold">
                FRONT-ROW SEATING RESERVED
              </h3>
              <p className="text-stone-300 text-xs font-medium">
                Ref Code: <span className="font-bold" style={{{{ color: "{primary}" }}}}>{{bookingRef}}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-left text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Guest:</span>
                <span className="text-white font-bold">{{name || "VIP Guest"}}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Time:</span>
                <span className="font-bold" style={{{{ color: "{primary}" }}}}>{{selectedTime}}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Party Size:</span>
                <span className="text-white font-bold">{{guestCount}} Guests</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Zone:</span>
                <span className="text-white font-bold">
                  {{seatingZones.find((z) => z.id === selectedZone)?.name}}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={{() => setConfirmed(false)}}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Modify Booking
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={{handleBook}}
            className="p-8 sm:p-10 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-2xl space-y-8"
          >
            {{/* 1. Time Slot Selector */}}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
                1. Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {{timeSlots.map((slot) => {{
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={{slot.time}}
                      type="button"
                      onClick={{() => setSelectedTime(slot.time)}}
                      className={{`p-3 rounded-xl border text-left transition-all ${{
                        isSelected
                          ? "shadow-lg scale-105"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-stone-300"
                      }}`}}
                      style={{{{
                        backgroundColor: isSelected ? "{primary}" : undefined,
                        color: isSelected ? "#000000" : undefined,
                        borderColor: isSelected ? "{primary}" : undefined,
                      }}}}
                    >
                      <div className="text-xs font-bold">{{slot.time}}</div>
                      <div className="text-[10px] opacity-75">{{slot.status}}</div>
                    </button>
                  );
                }})}}
              </div>
            </div>

            {{/* 2. Party Size & Seating Zone */}}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
                  2. Party Size
                </label>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                  <button
                    type="button"
                    onClick={{() => setGuestCount(Math.max(1, guestCount - 1))}}
                    className="w-10 h-10 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 flex items-center justify-center transition-colors text-lg"
                  >
                    -
                  </button>
                  <span className="text-sm font-black text-white">
                    {{guestCount}} {{guestCount === 1 ? "Guest" : "Guests"}}
                  </span>
                  <button
                    type="button"
                    onClick={{() => setGuestCount(Math.min(12, guestCount + 1))}}
                    className="w-10 h-10 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 flex items-center justify-center transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
                  3. Preferred Seating Zone
                </label>
                <select
                  value={{selectedZone}}
                  onChange={{(e) => setSelectedZone(e.target.value)}}
                  className="w-full h-14 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none transition-colors"
                >
                  {{seatingZones.map((z) => (
                    <option key={{z.id}} value={{z.id}} className="bg-stone-900 text-white">
                      {{z.name}} — {{z.note}}
                    </option>
                  ))}}
                </select>
              </div>
            </div>

            {{/* 3. Guest Details */}}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={{name}}
                onChange={{(e) => setName(e.target.value)}}
                placeholder="Your Full Name"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                required
                value={{phone}}
                onChange={{(e) => setPhone(e.target.value)}}
                placeholder="Phone Number"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors"
              />
            </div>

            {{/* Submit Action */}}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-[{primary}] text-black hover:brightness-110 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Confirm Table Reservation</span>
              <span>→</span>
            </button>
          </form>
        )}}
      </div>
    </section>
  );
}}
"""

def generate_atmosphere_controls_clean(primary: str, theme_base: str) -> str:
    return f"""\"use client\";

import React, {{ useState, useEffect, useRef }} from "react";
import {{ motion, AnimatePresence }} from "framer-motion";

interface AtmosphereControlsProps {{
  primaryColor?: string;
  darkBg?: string;
  lightBg?: string;
}}

export default function AtmosphereControls({{
  primaryColor = "{primary}",
  darkBg = "{theme_base}",
  lightBg = "#F6F4EE",
}}: AtmosphereControlsProps) {{
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicNodesRef = useRef<{{ masterGain: GainNode; intervalId: any }} | null>(null);

  // Initialize Global Click Sounds & Audio Context
  useEffect(() => {{
    const initAudio = () => {{
      if (!audioCtxRef.current) {{
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {{
          audioCtxRef.current = new AudioContextClass();
        }}
      }}
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {{
        audioCtxRef.current.resume();
      }}
    }};

    // Pop Click Sound
    const playPop = () => {{
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {{
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }} catch (err) {{
        // silent fallback
      }}
    }};

    // Sizzle Sound for Sear / Fire buttons
    const playSizzle = () => {{
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {{
        const bufferSize = ctx.sampleRate * 0.8;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {{
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
        }}
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2400, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      }} catch (err) {{
        // silent fallback
      }}
    }};

    (window as any).playPopSound = playPop;
    (window as any).playSizzleSound = playSizzle;

    const handleGlobalClick = (e: MouseEvent) => {{
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("clickable")
      ) {{
        playPop();
      }}
    }};

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }}, []);

  // Soothing Lo-Fi Ambient Synthesizer
  const toggleMusic = () => {{
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {{
      audioCtxRef.current = new AudioContextClass();
    }}
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    if (isPlayingMusic) {{
      if (musicNodesRef.current) {{
        const {{ masterGain, intervalId }} = musicNodesRef.current;
        clearInterval(intervalId);
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        setTimeout(() => {{
          musicNodesRef.current = null;
        }}, 600);
      }}
      setIsPlayingMusic(false);
    }} else {{
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);

      const chords = [
        [220.0, 261.63, 329.63, 392.0], // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 349.23], // G7
        [164.81, 196.0, 246.94, 293.66], // Em7
      ];
      let chordIndex = 0;

      const playChord = () => {{
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {{
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = i === 0 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(650 + Math.random() * 200, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.05 / currentChord.length, ctx.currentTime + 0.6);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + 3.4);
        }});
      }};

      playChord();
      const intervalId = setInterval(playChord, 3200);
      musicNodesRef.current = {{ masterGain, intervalId }};
      setIsPlayingMusic(true);
    }}
  }};

  // Day / Night Theme Toggle
  const toggleTheme = () => {{
    const nextDark = !isDark;
    setIsDark(nextDark);

    const root = document.documentElement;
    const body = document.body;

    if (nextDark) {{
      root.classList.add("dark");
      root.classList.remove("light");
      body.style.backgroundColor = darkBg;
      body.style.color = "#FAF8F2";
    }} else {{
      root.classList.remove("dark");
      root.classList.add("light");
      body.style.backgroundColor = lightBg;
      body.style.color = "#18181B";
    }}

    window.dispatchEvent(
      new CustomEvent("themechange", {{ detail: {{ isDark: nextDark }} }})
    );
  }};

  return (
    <aside
      aria-label="Atmosphere Controls"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 select-none"
    >
      {{/* 1. Theme Button - Sun ☀️ / Moon 🌙 (Dark: Gold/Primary, Light: Crisp Black, NO Orange) */}}
      <button
        type="button"
        onClick={{toggleTheme}}
        title={{isDark ? "Switch to Day Mode" : "Switch to Night Mode"}}
        className={{`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${{
          isDark
            ? "bg-black/70 border-white/20 text-white hover:border-white/40"
            : "bg-white/95 border-black/15 text-stone-900 hover:border-black/30"
        }}`}}
      >
        <AnimatePresence mode="wait" initial={{false}}>
          {{isDark ? (
            <motion.svg
              key="sun"
              initial={{{{ rotate: -90, scale: 0.5, opacity: 0 }}}}
              animate={{{{ rotate: 0, scale: 1, opacity: 1 }}}}
              exit={{{{ rotate: 90, scale: 0.5, opacity: 0 }}}}
              transition={{{{ duration: 0.25 }}}}
              className="w-5 h-5 text-[{primary}]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" strokeWidth="2" stroke="currentColor" fill="currentColor" fillOpacity="0.2" />
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              initial={{{{ rotate: 90, scale: 0.5, opacity: 0 }}}}
              animate={{{{ rotate: 0, scale: 1, opacity: 1 }}}}
              exit={{{{ rotate: -90, scale: 0.5, opacity: 0 }}}}
              transition={{{{ duration: 0.25 }}}}
              className="w-5 h-5 text-stone-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          )}}
        </AnimatePresence>
      </button>

      {{/* 2. Soothing Music Button - Soundwave Bars (Dark: Gold/Primary, Light: Clean Black, NO Orange) */}}
      <button
        type="button"
        onClick={{toggleMusic}}
        title={{isPlayingMusic ? "Mute Ambient Sound" : "Play Soothing Ambient Sound"}}
        className={{`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${{
          isDark
            ? "bg-black/70 border-white/20 text-white hover:border-white/40"
            : "bg-white/95 border-black/15 text-stone-900 hover:border-black/30"
        }}`}}
      >
        <div className="flex items-center justify-center gap-[3px] h-5 w-5">
          {{[0.4, 0.9, 0.6, 0.3].map((heightRatio, i) => (
            <motion.span
              key={{i}}
              className="w-[2.5px] rounded-full"
              style={{{{ backgroundColor: isDark ? primaryColor : "#18181B" }}}}
              animate={{{{
                height: isPlayingMusic
                  ? ["4px", `${{Math.round(heightRatio * 18)}}px`, "4px"]
                  : "4px",
              }}}}
              transition={{{{
                duration: isPlayingMusic ? 0.8 + i * 0.2 : 0.3,
                repeat: isPlayingMusic ? Infinity : 0,
                ease: "easeInOut",
              }}}}
            />
          ))}}
        </div>
      </button>
    </aside>
  );
}}
"""

def generate_interactive_background_clean(primary: str, theme_base: str, food_type: str) -> str:
    doodle_types_json = '["pizza", "slice", "flame", "star", "sparkle", "steam", "swirl"]' if food_type == "pizza" else '["burger", "spatula", "flame", "star", "sparkle", "steam", "swirl"]'

    return f"""\"use client\";

import React, {{ useEffect, useRef, useState }} from "react";
import {{ motion, useMotionValue, useSpring }} from "framer-motion";

interface InteractiveBackgroundProps {{
  primaryColor?: string;
  themeBase?: string;
}}

export default function InteractiveBackground({{
  primaryColor = "{primary}",
  themeBase = "{theme_base}",
}}: InteractiveBackgroundProps) {{
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const springX = useSpring(mouseX, {{ stiffness: 45, damping: 25 }});
  const springY = useSpring(mouseY, {{ stiffness: 45, damping: 25 }});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {{
    const handleThemeChange = (e: any) => {{
      const isDark = e.detail?.isDark !== undefined ? e.detail.isDark : true;
      setIsDarkMode(isDark);
    }};

    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }}, []);

  useEffect(() => {{
    const handleMouseMove = (e: MouseEvent) => {{
      const {{ innerWidth, innerHeight }} = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    }};

    window.addEventListener("mousemove", handleMouseMove, {{ passive: true }});
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }}, [mouseX, mouseY]);

  useEffect(() => {{
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {{
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }};
    window.addEventListener("resize", handleResize);

    const doodleTypes = {doodle_types_json};
    const doodleCount = 22;

    const doodles = Array.from({{ length: doodleCount }}, (_, i) => ({{
      type: doodleTypes[i % doodleTypes.length],
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 22 + 18,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.3 + 0.1),
      alpha: Math.random() * 0.35 + 0.15,
      maxAlpha: Math.random() * 0.45 + 0.2,
      fadeSpeed: Math.random() * 0.004 + 0.002,
    }}));

    const emberCount = 35;
    const embers = Array.from({{ length: emberCount }}, () => ({{
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      vy: -(Math.random() * 0.5 + 0.2),
      vx: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.006 + 0.003,
    }}));

    const drawBurger = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.arc(0, -s * 0.3, s, Math.PI, 0, false);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(-s * 0.4, -s * 0.6, 1.2, 0, Math.PI * 2);
      c.arc(0, -s * 0.7, 1.2, 0, Math.PI * 2);
      c.arc(s * 0.4, -s * 0.6, 1.2, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.moveTo(-s * 1.1, 0);
      c.quadraticCurveTo(0, s * 0.3, s * 1.1, 0);
      c.stroke();
      c.beginPath();
      c.moveTo(-s, s * 0.1);
      c.lineTo(-s * 0.3, s * 0.5);
      c.lineTo(0, s * 0.1);
      c.lineTo(s * 0.4, s * 0.6);
      c.lineTo(s, s * 0.1);
      c.stroke();
      c.beginPath();
      c.arc(0, s * 0.3, s * 0.9, 0, Math.PI, false);
      c.stroke();
    }};

    const drawPizza = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s * 1.2);
      c.lineTo(s * 0.9, s * 0.9);
      c.quadraticCurveTo(0, s * 1.1, -s * 0.9, s * 0.9);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(-s * 0.2, 0, 2.5, 0, Math.PI * 2);
      c.arc(s * 0.25, s * 0.2, 2.5, 0, Math.PI * 2);
      c.arc(0, s * 0.5, 2.5, 0, Math.PI * 2);
      c.fill();
    }};

    const drawSpatula = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.rect(-s * 0.7, -s * 0.9, s * 1.4, s * 0.8);
      c.stroke();
      c.beginPath();
      c.moveTo(-s * 0.3, -s * 0.7);
      c.lineTo(-s * 0.3, -s * 0.3);
      c.moveTo(0, -s * 0.7);
      c.lineTo(0, -s * 0.3);
      c.moveTo(s * 0.3, -s * 0.7);
      c.lineTo(s * 0.3, -s * 0.3);
      c.stroke();
      c.beginPath();
      c.moveTo(0, -s * 0.1);
      c.lineTo(0, s * 0.9);
      c.stroke();
    }};

    const drawFlame = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s);
      c.quadraticCurveTo(s * 0.8, -s * 0.2, s * 0.5, s * 0.7);
      c.quadraticCurveTo(0, s, -s * 0.5, s * 0.7);
      c.quadraticCurveTo(-s * 0.8, -s * 0.2, 0, -s);
      c.stroke();
    }};

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.4;
      c.beginPath();
      c.moveTo(0, -s * 1.2);
      c.lineTo(s * 0.3, -s * 0.3);
      c.lineTo(s * 1.2, 0);
      c.lineTo(s * 0.3, s * 0.3);
      c.lineTo(0, s * 1.2);
      c.lineTo(-s * 0.3, s * 0.3);
      c.lineTo(-s * 1.2, 0);
      c.lineTo(-s * 0.3, -s * 0.3);
      c.closePath();
      c.stroke();
    }};

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.35;
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.moveTo(-s, 0);
      c.lineTo(s, 0);
      c.stroke();
    }};

    const drawSteam = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(-s * 0.3, s * 0.6);
      c.quadraticCurveTo(-s * 0.6, 0, -s * 0.2, -s * 0.6);
      c.moveTo(s * 0.3, s * 0.6);
      c.quadraticCurveTo(s * 0.6, 0, s * 0.2, -s * 0.6);
      c.stroke();
    }};

    const drawSwirl = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.4;
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 1.5, false);
      c.stroke();
    }};

    const render = () => {{
      ctx.clearRect(0, 0, width, height);

      const mX = springX.get() * width;
      const mY = springY.get() * height;

      // Draw Embers
      ctx.fillStyle = primaryColor;
      for (let i = 0; i < embers.length; i++) {{
        const e = embers[i];
        e.y += e.vy;
        e.x += e.vx;
        e.alpha += e.fadeSpeed;
        if (e.alpha > 0.6 || e.alpha < 0.1) e.fadeSpeed = -e.fadeSpeed;

        if (e.y < -10) {{
          e.y = height + 10;
          e.x = Math.random() * width;
        }}

        ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha));
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
      }}

      // Draw Motion Doodles
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < doodles.length; i++) {{
        const d = doodles[i];

        d.x += d.vx;
        d.y += d.vy;
        d.rotation += d.rotSpeed;

        d.alpha += d.fadeSpeed;
        if (d.alpha > d.maxAlpha || d.alpha < 0.12) {{
          d.fadeSpeed = -d.fadeSpeed;
        }}

        const dx = mX - d.x;
        const dy = mY - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {{
          const force = (180 - dist) / 180;
          d.x -= (dx / dist) * force * 1.5;
          d.y -= (dy / dist) * force * 1.5;
        }}

        if (d.y < -50) {{
          d.y = height + 50;
          d.x = Math.random() * width;
        }}
        if (d.x < -50) d.x = width + 50;
        if (d.x > width + 50) d.x = -50;

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, d.alpha));

        switch (d.type) {{
          case "burger":
            drawBurger(ctx, d.size);
            break;
          case "pizza":
          case "slice":
            drawPizza(ctx, d.size);
            break;
          case "spatula":
            drawSpatula(ctx, d.size);
            break;
          case "flame":
            drawFlame(ctx, d.size);
            break;
          case "star":
            drawStar(ctx, d.size);
            break;
          case "sparkle":
            drawSparkle(ctx, d.size);
            break;
          case "steam":
            drawSteam(ctx, d.size);
            break;
          case "swirl":
            drawSwirl(ctx, d.size);
            break;
        }}

        ctx.restore();
      }}

      animationFrameId = requestAnimationFrame(render);
    }};

    render();

    return () => {{
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    }};
  }}, [primaryColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      {{/* Dynamic Background Surface */}}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{{{
          background: isDarkMode
            ? `radial-gradient(circle at 50% 30%, ${{themeBase}} 0%, #050806 100%)`
            : `radial-gradient(circle at 50% 30%, #FAF8F2 0%, #EDE7DB 100%)`,
        }}}}
      />

      {{/* Atmospheric Ambient Glows */}}
      <motion.div
        className={{`absolute w-[900px] h-[900px] rounded-full blur-[180px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${{
          isDarkMode ? "opacity-20" : "opacity-10"
        }}`}}
        style={{{{
          backgroundColor: primaryColor,
          left: springX ? `${{springX.get() * 100}}%` : "50%",
          top: springY ? `${{springY.get() * 100}}%` : "30%",
        }}}}
      />

      <div
        className={{`absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none transition-opacity duration-500 ${{
          isDarkMode ? "opacity-15" : "opacity-0"
        }}`}}
        style={{{{ backgroundColor: primaryColor }}}}
      />
      <div
        className={{`absolute bottom-0 left-10 w-[800px] h-[800px] rounded-full blur-[220px] pointer-events-none transition-opacity duration-500 ${{
          isDarkMode ? "opacity-12" : "opacity-0"
        }}`}}
        style={{{{ backgroundColor: primaryColor }}}}
      />

      <canvas
        ref={{canvasRef}}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}}
"""

def main():
    print("🚀 Rolling out final clean menu, zero slash, and theme fix across all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue

        primary = cfg.get("primary", "#FF0036")
        theme_base = cfg.get("theme_base", "#070709")
        food_type = cfg.get("food_type", "burger")

        mkt_dir = os.path.join(project_dir, "components", "marketing")
        ui_dir = os.path.join(project_dir, "components", "ui")
        os.makedirs(mkt_dir, exist_ok=True)
        os.makedirs(ui_dir, exist_ok=True)

        # 1. Clean SignatureMenu.tsx
        with open(os.path.join(mkt_dir, "SignatureMenu.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_signature_menu(primary))

        # 2. Clean HowWeSmash.tsx
        with open(os.path.join(mkt_dir, "HowWeSmash.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_how_we_smash(primary))

        # 3. Clean ReservationCTA.tsx
        with open(os.path.join(mkt_dir, "ReservationCTA.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_reservation_cta(primary))

        # 4. Clean AtmosphereControls.tsx
        with open(os.path.join(ui_dir, "AtmosphereControls.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_atmosphere_controls_clean(primary, theme_base))

        # 5. Clean InteractiveBackground.tsx
        with open(os.path.join(ui_dir, "InteractiveBackground.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_interactive_background_clean(primary, theme_base, food_type))

        print(f"✓ Deployed clean components to {slug}")

    print("\n🎉 Master rollout of final clean menu, zero slash, and theme fix completed successfully!")

if __name__ == "__main__":
    main()
