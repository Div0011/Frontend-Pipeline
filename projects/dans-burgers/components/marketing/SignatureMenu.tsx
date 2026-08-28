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
      className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: "#D97706" }} />
                          </div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              SIGNATURE SELECTIONS
            </h2>
            <p className="font-mono text-xs text-stone-400 max-w-xl">
              Handcrafted with fresh premium cuts, signature seasonings, and bespoke artisanal buns.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="px-4 py-2 pl-9 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-white placeholder-stone-400 focus:outline-none transition-colors w-56 sm:w-64"
                style={{ borderColor: searchQuery ? "#D97706" : undefined }}
              />
              <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-stone-400 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl"
              style={{
                backgroundColor: "#D97706",
                color: "#FFFFFF",
              }}
            >
              <span>🛒</span>
              <span>Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap border font-bold ${
                  isSelected
                    ? "shadow-lg scale-105"
                    : "bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white border-white/10"
                }`}
                style={{
                  backgroundColor: isSelected ? "#D97706" : undefined,
                  color: isSelected ? "#FFFFFF" : undefined,
                  borderColor: isSelected ? "#D97706" : undefined,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Grid with Interactive 3D Hover Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.name || idx}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setActivePreviewItem(item)}
                className="group relative p-7 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 transition-all duration-300 flex flex-col justify-between shadow-2xl cursor-pointer hover:-translate-y-1.5"
                style={{
                  borderColor: undefined,
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                                            <h3 className="type-display text-2xl sm:text-3xl text-white transition-colors leading-tight font-extrabold">
                        {item.name}
                      </h3>
                    </div>
                    <span
                      className="font-mono text-sm font-extrabold px-3 py-1 rounded-md border whitespace-nowrap shadow"
                      style={{
                        backgroundColor: "#D9770615",
                        color: "#D97706",
                        borderColor: "#D9770640",
                      }}
                    >
                      ${item.price}
                    </span>
                  </div>

                  <p className="type-serif text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-stone-400 border border-white/5">
                      🔥 Fresh Sizzle
                    </span>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-stone-400 border border-white/5">
                      ⚡ Quick View
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {Array.isArray(item.tags) &&
                      item.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-stone-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className="px-4 py-2 rounded-md font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                    style={{
                      backgroundColor: "#D97706",
                      color: "#FFFFFF",
                    }}
                  >
                    <span>Add</span>
                    <span className="text-base leading-none">+</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Dish Quick-View Modal */}
      <AnimatePresence>
        {activePreviewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePreviewItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-[#0e0e12] border rounded-2xl p-8 text-white shadow-2xl space-y-6 overflow-hidden"
              style={{ borderColor: "#D9770660" }}
            >
              <button
                onClick={() => setActivePreviewItem(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-mono transition-colors"
              >
                ✕
              </button>

              <div className="space-y-3">
                <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#D97706" }}>
                  CULINARY PROFILE
                </span>
                <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                  {activePreviewItem.name}
                </h3>
                <p className="type-serif text-sm text-stone-300 leading-relaxed">
                  {activePreviewItem.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="font-mono text-xs text-stone-400 block">Single Portion</span>
                  <span className="font-mono text-2xl font-black" style={{ color: "#D97706" }}>
                    ${activePreviewItem.price}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(activePreviewItem);
                    setActivePreviewItem(null);
                  }}
                  className="px-6 py-3 rounded-lg font-mono text-xs font-extrabold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-xl flex items-center gap-2"
                  style={{
                    backgroundColor: "#D97706",
                    color: "#FFFFFF",
                  }}
                >
                  <span>Add to Bag</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        currency="$"
        primaryColor="#D97706"
        textOnPrimary="#FFFFFF"
      />
    </section>
  );
}
