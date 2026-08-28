"use client";

import React, { useState } from "react";
import { menuItems } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer, { CartItem } from "@/components/marketing/CartDrawer";

const categories = [
  { id: "all", label: "All Items" },
  { id: "smash", label: "Mains" },
  { id: "sides", label: "Sides" },
  { id: "shakes", label: "Drinks & Shakes" },
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
    const q = searchQuery.toLowerCase();

    const matchesSearch = !q || name.includes(q);

    if (!matchesSearch) return false;
    if (selectedCat === "all") return true;
    if (selectedCat === "smash") return cat.includes("burger") || cat.includes("pizza") || cat.includes("special") || cat === "mains";
    if (selectedCat === "sides") return cat.includes("side") || cat.includes("fry") || cat.includes("salad") || cat.includes("wing");
    if (selectedCat === "shakes") return cat.includes("shake") || cat.includes("drink") || cat.includes("dessert") || cat.includes("beverage");
    return true;
  });

  return (
    <section
      id="menu-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-10 font-sans">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest block" style={{ color: "#E67E22" }}>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="px-4 py-2 pl-9 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors w-52 sm:w-60 font-medium"
                style={{ borderColor: searchQuery ? "#E67E22" : undefined }}
              />
              <svg className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl"
              style={{
                backgroundColor: "#E67E22",
                color: "#000000",
              }}
            >
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
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className="px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap border font-bold shadow-md"
                style={{
                  backgroundColor: isSelected ? "#E67E22" : "rgba(255,255,255,0.05)",
                  color: isSelected ? "#000000" : "#A8A29E",
                  borderColor: isSelected ? "#E67E22" : "rgba(255,255,255,0.1)",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Grid with Clean Minimalist Cards */}
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
                className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "#E67E22" }}>
                        Item 0{idx + 1}
                      </span>
                      <h3 className="type-display text-2xl text-white transition-colors leading-tight font-extrabold">
                        {item.name}
                      </h3>
                    </div>
                    <span
                      className="text-sm font-extrabold px-3 py-1 rounded-full border whitespace-nowrap shadow"
                      style={{
                        backgroundColor: "#E67E2215",
                        color: "#E67E22",
                        borderColor: "#E67E2240",
                      }}
                    >
                      ₹{item.price}
                    </span>
                  </div>

                  {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {item.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-stone-300 border border-white/10 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/10">
                  <span className="text-xs text-stone-400 font-medium hover:text-white transition-colors">
                    View Details →
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(item, e)}
                    className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1"
                    style={{
                      backgroundColor: "#E67E22",
                      color: "#000000",
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

      {/* Interactive Dish Quick-View Modal */}
      <AnimatePresence>
        {activePreviewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePreviewItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#0e0e12] border rounded-3xl p-8 text-white shadow-2xl space-y-6 overflow-hidden"
              style={{ borderColor: "#E67E2260" }}
            >
              <button
                type="button"
                onClick={() => setActivePreviewItem(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>

              <div className="space-y-3">
                <span className="text-xs tracking-widest uppercase font-bold block" style={{ color: "#E67E22" }}>
                  CULINARY SPEC
                </span>
                <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                  {activePreviewItem.name}
                </h3>
                {activePreviewItem.description && (
                  <p className="text-sm text-stone-300 leading-relaxed font-body">
                    {activePreviewItem.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-2xl font-black" style={{ color: "#E67E22" }}>
                  ₹{activePreviewItem.price}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(activePreviewItem);
                    setActivePreviewItem(null);
                  }}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center gap-2"
                  style={{
                    backgroundColor: "#E67E22",
                    color: "#000000",
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
        currency="₹"
        primaryColor="#E67E22"
        textOnPrimary="#000000"
      />
    </section>
  );
}
