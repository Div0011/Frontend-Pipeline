"use client";

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
                style={{ borderColor: searchQuery ? "#2563EB" : undefined }}
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
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
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
                  backgroundColor: isSelected ? "#2563EB" : undefined,
                  color: isSelected ? "#FFFFFF" : undefined,
                  borderColor: isSelected ? "#2563EB" : undefined,
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
                      backgroundColor: "#2563EB15",
                      color: "#2563EB",
                      borderColor: "#2563EB40",
                    }}
                  >
                    ₹{item.price}
                  </span>
                </div>

                <div className="flex items-center justify-end pt-4 mt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(item, e)}
                    className="px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-md"
                    style={{
                      backgroundColor: "#2563EB",
                      color: "#FFFFFF",
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
                      backgroundColor: "#2563EB20",
                      color: "#2563EB",
                      borderColor: "#2563EB",
                    }}
                  >
                    ₹{activePreviewItem.price}
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
                    backgroundColor: "#2563EB",
                    color: "#FFFFFF",
                  }}
                >
                  Add to Bag (₹{activePreviewItem.price})
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
        currency="₹"
        primaryColor="#2563EB"
        textOnPrimary="#FFFFFF"
      />
    </section>
  );
}
