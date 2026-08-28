"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    "id": "double-smash",
    "name": "Lacy Double Smash",
    "category": "Smash Burgers",
    "price": "350",
    "badge": "Signature",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
  },
  {
    "id": "jalapeno-popper",
    "name": "Jalapeno Popper Smash",
    "category": "Smash Burgers",
    "price": "390",
    "badge": "Spicy Gold",
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"
  },
  {
    "id": "crinkle-tots",
    "name": "Smashed Cheese Tots",
    "category": "Sides",
    "price": "190",
    "badge": "Loaded",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"
  }
];

export default function SignatureMenu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItemModal, setActiveItemModal] = useState<any | null>(null);

  const categories = ["All", ...Array.from(new Set(menuItems.map((item: any) => item.category)))];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item: any) => item.category === selectedCategory);

  return (
    <section id="menu-section" className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-black tracking-tight">
              SIGNATURE SELECTIONS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => {
                  if ((window as any).playPopSound) (window as any).playPopSound();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "shadow-lg text-black"
                    : "text-stone-300 hover:text-white"
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? "#F5C418" : "transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Clean Dish Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: any) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                if ((window as any).playPopSound) (window as any).playPopSound();
                setActiveItemModal(item);
              }}
              className="group cursor-pointer rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/30 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Dish Photo */}
              <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-4 bg-black/40">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.badge && (
                  <span
                    className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md"
                    style={{ backgroundColor: "#F5C418", color: "#000000" }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Clean Card Header: Title + Price Pill + Add */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <h3 className="type-display text-xl sm:text-2xl text-white font-bold leading-tight group-hover:text-[#F5C418] transition-colors">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                    ₹{item.price}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                      alert(`Added ${item.name} to your order!`);
                    }}
                    className="px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow hover:scale-105 active:scale-95"
                    style={{ backgroundColor: "#F5C418", color: "#000000" }}
                  >
                    ADD +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Modal on Card Click */}
      <AnimatePresence>
        {activeItemModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0e0f14] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl text-white"
            >
              <button
                type="button"
                onClick={() => setActiveItemModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                ✕
              </button>

              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black/60">
                <Image
                  src={activeItemModal.image}
                  alt={activeItemModal.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest block" style={{ color: "#F5C418" }}>
                  {activeItemModal.category}
                </span>
                <h3 className="type-display text-3xl font-black text-white">
                  {activeItemModal.name}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="type-display text-2xl font-bold text-white">
                  ₹{activeItemModal.price}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                    alert(`Added ${activeItemModal.name} to order!`);
                    setActiveItemModal(null);
                  }}
                  className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: "#F5C418", color: "#000000" }}
                >
                  Add to Table Order →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
