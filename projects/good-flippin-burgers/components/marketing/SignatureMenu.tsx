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
  });

  return (
    <section
      id="menu-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10 select-none font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header - Clean display headline only */}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="px-4 py-2.5 pl-9 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors w-52 sm:w-64 font-medium"
              />
              <svg className="w-3.5 h-3.5 absolute left-3.5 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#BE123C] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl"
            >
              Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap border ${
                  isSelected
                    ? "bg-[#BE123C] text-black border-[#BE123C] shadow-lg scale-105"
                    : "bg-white/5 text-stone-300 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Grid - Order names, prices, tags, and Add button only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.name || idx}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                onClick={() => setActivePreviewItem(item)}
                className="group relative p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="type-display text-2xl sm:text-3xl text-white transition-colors leading-tight font-extrabold">
                      {item.name}
                    </h3>
                    <span className="text-sm font-extrabold px-3 py-1 rounded-full border border-[#BE123C]/40 text-[#BE123C] bg-[#BE123C]/10 whitespace-nowrap shadow-sm">
                      ₹{item.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {Array.isArray(item.tags) &&
                      item.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-stone-300 border border-white/10 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(item, e)}
                    className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#BE123C] text-black hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1 ml-auto"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-lg w-full p-8 rounded-2xl bg-[#0c1410] border border-white/20 shadow-2xl space-y-6 text-white"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="type-display text-3xl font-extrabold">
                    {activePreviewItem.name}
                  </h3>
                  <span className="text-xl font-black text-[#BE123C]">
                    ₹{activePreviewItem.price}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePreviewItem(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {activePreviewItem.description && (
                <p className="text-sm text-stone-300 leading-relaxed font-body">
                  {activePreviewItem.description}
                </p>
              )}

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(activePreviewItem);
                    setActivePreviewItem(null);
                  }}
                  className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-[#BE123C] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl"
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
        primaryColor="#BE123C"
        textOnPrimary="#000000"
      />
    </section>
  );
}
