#!/usr/bin/env python3
"""
Roll out:
1. Ultra-clean SignatureMenu with NO header brand tags, NO descriptions on cards (pure title, price, and ADD button), and NO '//'.
2. Removal of all remaining '//' and subtext across HowWeSmash and ReservationCTA.
3. High-contrast, crisp text on reservation cards.
4. Full 100% volume live classic restaurant jazz lounge synthesizer.
5. Reactive Day/Night theme switcher (no orange icons, real background gradient shift).
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def generate_signature_menu(slug: str, cfg: dict) -> str:
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#000000")
    currency = cfg.get("currency", "₹")

    tmpl = """\"use client\";

import React, { useState } from "react";
import { menuItems } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer, { CartItem } from "@/components/marketing/CartDrawer";

const categories = [
  { id: "all", label: "Full Lineup" },
  { id: "smash", label: "Signature Smashes" },
  { id: "chicken", label: "Crispy Fried Chicken" },
  { id: "sides", label: "Loaded Sides & Fries" },
  { id: "shakes", label: "Hand-Spun Malts" },
];

export default function SignatureMenu() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activePreviewItem, setActivePreviewItem] = useState<any | null>(null);

  const handleAddToCart = (item: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ((window as any).playPopSound) (window as any).playPopSound();
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          name: item.name,
          price: item.price,
          quantity: 1,
          description: item.description,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (name: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0);
    });
  };

  const filteredItems = menuItems.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    const name = String(item.name || "").toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = !q || name.includes(q);

    if (!matchesSearch) return false;
    if (selectedCat === "all") return true;
    if (selectedCat === "smash") return cat.includes("burger") || cat.includes("pizza") || cat.includes("special") || cat === "mains";
    if (selectedCat === "chicken") return cat.includes("chicken") || cat.includes("wing") || cat.includes("tender");
    if (selectedCat === "sides") return cat.includes("side") || cat.includes("fry") || cat.includes("salad");
    if (selectedCat === "shakes") return cat.includes("shake") || cat.includes("drink") || cat.includes("dessert");
    return true;
  });

  return (
    <section
      id="menu-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              SIGNATURE SELECTIONS
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="px-4 py-2.5 pl-9 rounded-full bg-white/5 border border-white/15 text-xs font-sans text-white placeholder-stone-400 focus:outline-none transition-colors w-56 sm:w-64"
                style={{ borderColor: searchQuery ? "__PRIMARY__" : undefined }}
              />
              <svg className="w-3.5 h-3.5 absolute left-3.5 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-stone-400 hover:text-white text-xs font-sans"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl"
              style={{
                backgroundColor: "__PRIMARY__",
                color: "__TEXT_ON_PRIMARY__",
              }}
            >
              <span>Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if ((window as any).playPopSound) (window as any).playPopSound();
                  setSelectedCat(cat.id);
                }}
                className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider transition-all whitespace-nowrap border font-bold ${
                  isSelected
                    ? "shadow-lg scale-105"
                    : "bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white border-white/10"
                }`}
                style={{
                  backgroundColor: isSelected ? "__PRIMARY__" : undefined,
                  color: isSelected ? "__TEXT_ON_PRIMARY__" : undefined,
                  borderColor: isSelected ? "__PRIMARY__" : undefined,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clean Menu Grid - Pure Titles, Price Badge & Quick Add Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.name || idx}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                onClick={() => setActivePreviewItem(item)}
                className="group relative p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-2xl cursor-pointer hover:-translate-y-1 min-h-[140px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="type-display text-2xl sm:text-3xl text-white transition-colors leading-tight font-extrabold">
                    {item.name}
                  </h3>
                  <span
                    className="font-sans text-sm font-extrabold px-3 py-1 rounded-full border whitespace-nowrap shadow"
                    style={{
                      backgroundColor: "__PRIMARY__15",
                      color: "__PRIMARY__",
                      borderColor: "__PRIMARY__40",
                    }}
                  >
                    __CURRENCY__{item.price}
                  </span>
                </div>

                <div className="flex items-center justify-end pt-4 mt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(item, e)}
                    className="px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-md"
                    style={{
                      backgroundColor: "__PRIMARY__",
                      color: "__TEXT_ON_PRIMARY__",
                    }}
                  >
                    <span>Add</span>
                    <span>+</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {activePreviewItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setActivePreviewItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-[#0F0F12] border border-white/20 shadow-2xl space-y-6"
            >
              <button
                type="button"
                onClick={() => setActivePreviewItem(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all font-sans text-sm"
              >
                ✕
              </button>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                    {activePreviewItem.name}
                  </h3>
                  <span
                    className="font-sans text-base font-extrabold px-3 py-1 rounded-full border shadow"
                    style={{
                      backgroundColor: "__PRIMARY__20",
                      color: "__PRIMARY__",
                      borderColor: "__PRIMARY__",
                    }}
                  >
                    __CURRENCY__{activePreviewItem.price}
                  </span>
                </div>

                {activePreviewItem.description && (
                  <p className="text-sm text-stone-300 leading-relaxed font-sans pt-2">
                    {activePreviewItem.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(activePreviewItem);
                    setActivePreviewItem(null);
                  }}
                  className="w-full py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl text-center"
                  style={{
                    backgroundColor: "__PRIMARY__",
                    color: "__TEXT_ON_PRIMARY__",
                  }}
                >
                  Add to Bag (__CURRENCY__{activePreviewItem.price})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        currency="__CURRENCY__"
        primaryColor="__PRIMARY__"
        textOnPrimary="__TEXT_ON_PRIMARY__"
      />
    </section>
  );
}
"""
    return (
        tmpl.replace("__PRIMARY__", primary)
        .replace("__TEXT_ON_PRIMARY__", text_on_primary)
        .replace("__CURRENCY__", currency)
    )

def generate_how_we_smash(slug: str, cfg: dict) -> str:
    primary = cfg.get("primary", "#FF0036")
    food_type = cfg.get("food_type", "burger")
    title = "THE WOOD-FIRED HEAT DISCIPLINE" if food_type == "pizza" else "THE ARTISANAL SIZZLE CRAFT"
    gauge_title = "OVEN TEMPERATURE & CRUST GAUGE" if food_type == "pizza" else "FLAT-TOP TEMPERATURE & MAILLARD CRUST GAUGE"

    tmpl = """\"use client\";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HowWeSmash() {
  const [tempValue, setTempValue] = useState(450);
  const crustPercent = Math.min(100, Math.max(10, Math.round(((tempValue - 200) / 300) * 100)));

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              __TITLE__
            </h2>
          </div>
          <span
            className="text-xs uppercase font-bold px-4 py-1.5 rounded-full border shadow"
            style={{
              backgroundColor: "__PRIMARY__15",
              color: "__PRIMARY__",
              borderColor: "__PRIMARY__40",
            }}
          >
            100% MASTER CRAFT
          </span>
        </div>

        {/* Interactive Temperature & Sear Simulator Card */}
        <div className="p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                __GAUGE_TITLE__
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black font-sans" style={{ color: "__PRIMARY__" }}>
                {tempValue}°F
              </span>
              <span
                className="text-xs px-2.5 py-1 rounded border uppercase font-bold"
                style={{
                  backgroundColor: "__PRIMARY__20",
                  color: "__PRIMARY__",
                  borderColor: "__PRIMARY__40",
                }}
              >
                {tempValue >= 450 ? "Optimal Crisp" : tempValue >= 350 ? "Standard Sear" : "Slow Temp"}
              </span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-2 pt-2">
            <input
              type="range"
              min={200}
              max={500}
              step={5}
              value={tempValue}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTempValue(val);
                if (val >= 440 && (window as any).playSizzleSound) {
                  (window as any).playSizzleSound();
                }
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/20"
              style={{ accentColor: "__PRIMARY__" }}
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-sans font-medium">
              <span>200°F (Slow Steam)</span>
              <span style={{ color: "__PRIMARY__" }} className="font-bold">450°F (Optimal Crisp Sear)</span>
              <span>500°F (Maximum Char)</span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs text-stone-300 font-sans">
                <span>Crispy Caramelized Sear</span>
                <span className="text-white font-bold">{crustPercent}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "__PRIMARY__" }}
                  animate={{ width: `${crustPercent}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs text-stone-300 font-sans">
                <span>Flavor &amp; Juice Retention</span>
                <span className="text-white font-bold">
                  {tempValue >= 420 && tempValue <= 480 ? "98% (Sealed In)" : "72%"}
                </span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "__PRIMARY__" }}
                  animate={{ width: tempValue >= 420 && tempValue <= 480 ? "98%" : "72%" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"""
    return (
        tmpl.replace("__PRIMARY__", primary)
        .replace("__TITLE__", title)
        .replace("__GAUGE_TITLE__", gauge_title)
    )

def generate_reservation_cta(slug: str, cfg: dict) -> str:
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#000000")

    tmpl = """\"use client\";

import React, { useState } from "react";
import { motion } from "framer-motion";

const timeSlots = [
  { time: "12:30 PM", status: "Available" },
  { time: "1:45 PM", status: "Few Tables" },
  { time: "7:00 PM", status: "Peak Dinner" },
  { time: "8:30 PM", status: "Filling Fast" },
  { time: "9:45 PM", status: "Available" },
  { time: "11:00 PM", status: "Late Night" },
];

const seatingZones = [
  { id: "counter", name: "Chef's Sizzle Counter", note: "Front-row sizzling view" },
  { id: "booth", name: "Cozy Dining Booth", note: "Spacious group seating" },
  { id: "patio", name: "Open-Air Patio Deck", note: "Outdoor dining" },
];

export default function ReservationCTA() {
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [guestCount, setGuestCount] = useState(2);
  const [selectedZone, setSelectedZone] = useState("counter");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if ((window as any).playPopSound) (window as any).playPopSound();
    const randomRef = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setConfirmed(true);
  };

  return (
    <section
      id="reservation-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
            BOOK YOUR EXPERIENCE
          </h2>
        </div>

        {confirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-3xl bg-white/90 text-stone-900 backdrop-blur-xl border-2 max-w-xl mx-auto shadow-2xl space-y-6 text-center"
            style={{ borderColor: "__PRIMARY__" }}
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-black/5">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="space-y-1">
              <h3 className="type-display text-3xl font-extrabold text-black">
                TABLE RESERVED
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-600">
                Booking Reference: {bookingRef}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/5 text-xs text-stone-800 space-y-1 font-semibold">
              <p>{name || "Valued Guest"} · {guestCount} Guests</p>
              <p>{selectedTime} · {seatingZones.find(z => z.id === selectedZone)?.name}</p>
            </div>

            <button
              type="button"
              onClick={() => setConfirmed(false)}
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-stone-800 transition-all shadow-md"
            >
              Modify Booking
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleBook}
            className="p-8 sm:p-10 rounded-3xl bg-[#EBE7DD] dark:bg-[#EBE7DD] light:bg-[#FAF8F2] text-stone-900 shadow-2xl space-y-8 border border-black/10"
          >
            {/* Step 1: Time Slot Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                1. Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => {
                        if ((window as any).playPopSound) (window as any).playPopSound();
                        setSelectedTime(slot.time);
                      }}
                      className={`p-3.5 rounded-2xl text-left transition-all border ${
                        isSelected
                          ? "shadow-md font-bold text-black"
                          : "bg-white/80 text-stone-900 border-black/10 hover:border-black/30 font-medium"
                      }`}
                      style={{
                        backgroundColor: isSelected ? "__PRIMARY__" : undefined,
                        borderColor: isSelected ? "__PRIMARY__" : undefined,
                        color: isSelected ? "__TEXT_ON_PRIMARY__" : undefined,
                      }}
                    >
                      <div className="text-sm font-extrabold">{slot.time}</div>
                      <div className="text-[10px] opacity-75">{slot.status}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 & 3: Party Size & Seating Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Party Size */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                  2. Party Size
                </label>
                <div className="flex items-center justify-between p-2 rounded-2xl bg-white/80 border border-black/10">
                  <button
                    type="button"
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setGuestCount((c) => Math.max(1, c - 1));
                    }}
                    className="w-10 h-10 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-base text-black transition-all"
                  >
                    -
                  </button>
                  <div className="text-center">
                    <span className="text-xl font-extrabold text-black block">{guestCount}</span>
                    <span className="text-[10px] uppercase font-bold text-stone-500">
                      {guestCount === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setGuestCount((c) => Math.min(12, c + 1));
                    }}
                    className="w-10 h-10 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-base text-black transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Seating Zone */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                  3. Preferred Seating Zone
                </label>
                <div className="relative">
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full h-14 px-4 rounded-2xl bg-white/80 border border-black/10 text-xs font-bold text-stone-900 focus:outline-none appearance-none cursor-pointer"
                  >
                    {seatingZones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} — {zone.note}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-5 pointer-events-none text-stone-500 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="h-12 px-4 rounded-2xl bg-white/80 border border-black/10 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black/30 transition-all"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="h-12 px-4 rounded-2xl bg-white/80 border border-black/10 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black/30 transition-all"
              />
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-xl text-center"
              style={{
                backgroundColor: "__PRIMARY__",
                color: "__TEXT_ON_PRIMARY__",
              }}
            >
              Confirm Table Reservation →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
"""
    return (
        tmpl.replace("__PRIMARY__", primary)
        .replace("__TEXT_ON_PRIMARY__", text_on_primary)
    )

def generate_atmosphere_controls(slug: str, cfg: dict) -> str:
    primary = cfg.get("primary", "#FF0036")
    theme_base = cfg.get("theme_base", "#070709")
    light_bg = "#FAF7F2"

    tmpl = """\"use client\";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AtmosphereControlsProps {
  primaryColor?: string;
  darkBg?: string;
  lightBg?: string;
}

export default function AtmosphereControls({
  primaryColor = "__PRIMARY__",
  darkBg = "__THEME_BASE__",
  lightBg = "__LIGHT_BG__",
}: AtmosphereControlsProps) {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicNodesRef = useRef<{ masterGain: GainNode; intervalId: any } | null>(null);

  // Initialize Global Click Sounds & Audio Context
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };

    // Pop Click Sound (100% Volume)
    const playPop = () => {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      } catch (err) {
        // silent fallback
      }
    };

    // Sizzle Sound for Sear / Fire buttons (100% Volume)
    const playSizzle = () => {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {
        const bufferSize = ctx.sampleRate * 0.9;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.45));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2400, ctx.currentTime);
        filter.Q.setValueAtTime(1.4, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } catch (err) {
        // silent fallback
      }
    };

    (window as any).playPopSound = playPop;
    (window as any).playSizzleSound = playSizzle;

    // Attach subtle pop click to interactive elements
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("clickable")
      ) {
        playPop();
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Classic Live Restaurant Jazz Lounge Synthesizer (100% Volume)
  const toggleMusic = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    if (isPlayingMusic) {
      // Fade out and stop
      if (musicNodesRef.current) {
        const { masterGain, intervalId } = musicNodesRef.current;
        clearInterval(intervalId);
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        setTimeout(() => {
          musicNodesRef.current = null;
        }, 600);
      }
      setIsPlayingMusic(false);
    } else {
      // Start live restaurant jazz progression at full 100% volume
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 1.0);
      masterGain.connect(ctx.destination);

      // Authentic live jazz bistro chords with walking acoustic bass notes
      const jazzChords = [
        { bass: 87.31, chord: [261.63, 349.23, 440.0, 523.25] },   // Fmaj9
        { bass: 73.42, chord: [293.66, 349.23, 440.0, 523.25] },   // Dm9
        { bass: 98.00, chord: [293.66, 392.0, 466.16, 587.33] },   // Gm9
        { bass: 65.41, chord: [261.63, 329.63, 466.16, 554.37] },  // C13b9
      ];
      let stepIndex = 0;

      const playJazzBar = () => {
        const current = jazzChords[stepIndex % jazzChords.length];
        stepIndex++;

        // 1. Acoustic Upright Bass Note
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        const bassFilter = ctx.createBiquadFilter();

        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(current.bass, ctx.currentTime);

        bassFilter.type = "lowpass";
        bassFilter.frequency.setValueAtTime(220, ctx.currentTime);

        bassGain.gain.setValueAtTime(0.001, ctx.currentTime);
        bassGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.08);
        bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(masterGain);

        bassOsc.start();
        bassOsc.stop(ctx.currentTime + 2.9);

        // 2. Warm Rhodes Piano Chord Voicings
        current.chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = i % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = "bandpass";
          filter.frequency.setValueAtTime(800 + (i * 150), ctx.currentTime);
          filter.Q.setValueAtTime(0.8, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.15 + (i * 0.03));
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + 3.2);
        });
      };

      playJazzBar();
      const intervalId = setInterval(playJazzBar, 3000);
      musicNodesRef.current = { masterGain, intervalId };
      setIsPlayingMusic(true);
    }
  };

  // Day / Night Theme Toggle
  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    const root = document.documentElement;
    const body = document.body;

    if (nextDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      body.style.backgroundColor = darkBg;
      body.style.color = "#FAF8F2";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      body.style.backgroundColor = lightBg;
      body.style.color = "#18181B";
    }

    // Inform window and interactive canvas for background update
    window.dispatchEvent(
      new CustomEvent("themechange", { detail: { isDark: nextDark } })
    );
  };

  const iconColor = isDark ? primaryColor : "#18181B";

  return (
    <aside
      aria-label="Atmosphere Controls"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 select-none"
    >
      {/* 1. Separate Floating Circle: Day & Night Theme Toggle (Sun ☀️ / Moon 🌙) */}
      <button
        type="button"
        onClick={toggleTheme}
        title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-black/60 dark:bg-black/60 light:bg-white/90 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-black/15 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-white dark:text-white light:text-black hover:border-white/40"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-5"
              style={{ color: iconColor }}
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
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-5 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* 2. Separate Floating Circle: Live Restaurant Jazz Music & Animated Soundwave Toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        title={isPlayingMusic ? "Mute Restaurant Jazz" : "Play Live Restaurant Jazz"}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-black/60 dark:bg-black/60 light:bg-white/90 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-black/15 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-white dark:text-white light:text-black hover:border-white/40"
      >
        <div className="flex items-center justify-center gap-[3px] h-5 w-5">
          {[0.4, 0.9, 0.6, 0.3].map((heightRatio, i) => (
            <motion.span
              key={i}
              className="w-[2.5px] rounded-full"
              style={{ backgroundColor: iconColor }}
              animate={
                isPlayingMusic
                  ? {
                      height: ["4px", `${Math.round(heightRatio * 18)}px`, "4px"],
                    }
                  : { height: "4px" }
              }
              transition={
                isPlayingMusic
                  ? {
                      duration: 0.8 + i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>
      </button>
    </aside>
  );
}
"""
    return (
        tmpl.replace("__PRIMARY__", primary)
        .replace("__THEME_BASE__", theme_base)
        .replace("__LIGHT_BG__", light_bg)
    )

def generate_interactive_background(slug: str, cfg: dict) -> str:
    primary = cfg.get("primary", "#FF0036")
    theme_base = cfg.get("theme_base", "#070709")
    food_type = cfg.get("food_type", "burger")
    doodle_types_json = '["pizza", "slice", "flame", "star", "sparkle", "steam", "swirl"]' if food_type == "pizza" else '["burger", "spatula", "flame", "star", "sparkle", "steam", "swirl"]'

    tmpl = """\"use client\";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface InteractiveBackgroundProps {
  primaryColor?: string;
  themeBase?: string;
}

export default function InteractiveBackground({
  primaryColor = "__PRIMARY__",
  themeBase = "__THEME_BASE__",
}: InteractiveBackgroundProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      const dark = e.detail?.isDark !== undefined ? e.detail.isDark : true;
      setIsDarkMode(dark);
    };

    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const doodleTypes = __DOODLE_TYPES__;
    const doodleCount = 22;

    const doodles = Array.from({ length: doodleCount }, (_, i) => ({
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
    }));

    const emberCount = 35;
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      vy: -(Math.random() * 0.5 + 0.2),
      vx: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.006 + 0.003,
    }));

    const drawBurger = (c: CanvasRenderingContext2D, size: number) => {
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
    };

    const drawPizza = (c: CanvasRenderingContext2D, size: number) => {
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
    };

    const drawSpatula = (c: CanvasRenderingContext2D, size: number) => {
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
    };

    const drawFlame = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s);
      c.quadraticCurveTo(s * 0.8, -s * 0.2, s * 0.5, s * 0.7);
      c.quadraticCurveTo(0, s, -s * 0.5, s * 0.7);
      c.quadraticCurveTo(-s * 0.8, -s * 0.2, 0, -s);
      c.stroke();
    };

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
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
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.35;
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.moveTo(-s, 0);
      c.lineTo(s, 0);
      c.stroke();
    };

    const drawSteam = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(-s * 0.3, s * 0.6);
      c.quadraticCurveTo(-s * 0.6, 0, -s * 0.2, -s * 0.6);
      c.moveTo(s * 0.3, s * 0.6);
      c.quadraticCurveTo(s * 0.6, 0, s * 0.2, -s * 0.6);
      c.stroke();
    };

    const drawSwirl = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.4;
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 1.5, false);
      c.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mX = springX.get() * width;
      const mY = springY.get() * height;

      // Draw Embers
      ctx.fillStyle = primaryColor;
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y += e.vy;
        e.x += e.vx;
        e.alpha += e.fadeSpeed;
        if (e.alpha > 0.6 || e.alpha < 0.1) e.fadeSpeed = -e.fadeSpeed;

        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha));
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Motion Doodles
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < doodles.length; i++) {
        const d = doodles[i];

        d.x += d.vx;
        d.y += d.vy;
        d.rotation += d.rotSpeed;

        d.alpha += d.fadeSpeed;
        if (d.alpha > d.maxAlpha || d.alpha < 0.12) {
          d.fadeSpeed = -d.fadeSpeed;
        }

        const dx = mX - d.x;
        const dy = mY - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          d.x -= (dx / dist) * force * 1.5;
          d.y -= (dy / dist) * force * 1.5;
        }

        if (d.y < -50) {
          d.y = height + 50;
          d.x = Math.random() * width;
        }
        if (d.x < -50) d.x = width + 50;
        if (d.x > width + 50) d.x = -50;

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, d.alpha));

        switch (d.type) {
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
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [primaryColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDarkMode
            ? `radial-gradient(circle at 50% 30%, ${themeBase} 0%, #050806 100%)`
            : `radial-gradient(circle at 50% 30%, #FAF7F2 0%, #EBE5DB 100%)`,
        }}
      />

      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full blur-[180px] opacity-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: primaryColor,
          left: springX ? `${springX.get() * 100}%` : "50%",
          top: springY ? `${springY.get() * 100}%` : "30%",
        }}
      />

      <div
        className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[200px] opacity-15 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute bottom-0 left-10 w-[800px] h-[800px] rounded-full blur-[220px] opacity-12 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${primaryColor} 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
"""
    return (
        tmpl.replace("__PRIMARY__", primary)
        .replace("__THEME_BASE__", theme_base)
        .replace("__DOODLE_TYPES__", doodle_types_json)
    )

def update_project(slug: str, cfg: dict):
    project_dir = os.path.join(PROJECTS_DIR, slug)
    if not os.path.exists(project_dir):
        return

    mkt_dir = os.path.join(project_dir, "components", "marketing")
    ui_dir = os.path.join(project_dir, "components", "ui")
    os.makedirs(mkt_dir, exist_ok=True)
    os.makedirs(ui_dir, exist_ok=True)

    # 1. Write clean SignatureMenu.tsx
    menu_code = generate_signature_menu(slug, cfg)
    with open(os.path.join(mkt_dir, "SignatureMenu.tsx"), "w", encoding="utf-8") as f:
        f.write(menu_code)

    # 2. Write clean HowWeSmash.tsx
    smash_code = generate_how_we_smash(slug, cfg)
    with open(os.path.join(mkt_dir, "HowWeSmash.tsx"), "w", encoding="utf-8") as f:
        f.write(smash_code)

    # 3. Write clean ReservationCTA.tsx
    res_code = generate_reservation_cta(slug, cfg)
    with open(os.path.join(mkt_dir, "ReservationCTA.tsx"), "w", encoding="utf-8") as f:
        f.write(res_code)

    # 4. Write AtmosphereControls.tsx
    atm_code = generate_atmosphere_controls(slug, cfg)
    with open(os.path.join(ui_dir, "AtmosphereControls.tsx"), "w", encoding="utf-8") as f:
        f.write(atm_code)

    # 5. Write InteractiveBackground.tsx
    bg_code = generate_interactive_background(slug, cfg)
    with open(os.path.join(ui_dir, "InteractiveBackground.tsx"), "w", encoding="utf-8") as f:
        f.write(bg_code)

def main():
    print("🚀 Rolling out clean menu, authentic jazz bistro audio & clean headers across all 24 projects...")
    for slug, cfg in brand_configs.items():
        update_project(slug, cfg)
        print(f"✓ Updated {slug}")

    print("\n🎉 Master rollout completed!")

if __name__ == "__main__":
    main()
