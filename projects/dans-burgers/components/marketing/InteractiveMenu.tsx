"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, MenuItem } from "@/lib/data";

const CATEGORIES = [
  { id: "burgers", label: "ANGUS BURGERS", sub: "100% Certified Angus chuck, made to order" },
  { id: "sides", label: "HOMEMADE SIDES", sub: "Famous $50 recipe onion rings & curly fries" },
  { id: "shakes", label: "MALTS & SHAKES", sub: "Hand-dipped fountain malts, shakes & floats" },
  { id: "specials", label: "TEXAS BREAKFAST", sub: "Homemade biscuits & gravy, morning tacos" },
] as const;

const TAG_COLORS: Record<string, string> = {
  signature: "bg-ember text-bone",
  popular:   "bg-[#D97706] text-char font-bold",
  spicy:     "bg-ember text-bone",
  classic:   "bg-bone-dark text-char",
  heritage:  "bg-char text-[#D97706]",
};

export default function InteractiveMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const categories = CATEGORIES.map((c) => ({
    ...c,
    items: menuItems.filter((i: MenuItem) => i.category === c.id),
  }));

  return (
    <section className="bg-bone section-cinematic border-b border-bone-dark">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-0 border border-char/10">
          {categories.map((cat) => {
            const isHovered = hoveredTile === cat.id;
            return (
              <motion.div
                key={cat.id}
                layout
                onHoverStart={() => setHoveredTile(cat.id)}
                onHoverEnd={() => setHoveredTile(null)}
                className={`flex-1 border-b lg:border-b-0 lg:border-r border-char/10 last:border-b-0 last:lg:border-r-0 transition-colors duration-300 ${
                  isHovered ? "bg-bone-warm" : "bg-transparent"
                }`}
              >
                <Link
                  href={`/menu#${cat.id}`}
                  className="block p-8 lg:p-10 group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="type-caption text-smoke text-[9px] mb-2 font-sans">0{CATEGORIES.indexOf(cat) + 1}</p>
                      <motion.h3
                        layout
                        className={`type-display text-3xl lg:text-4xl leading-[0.9] transition-colors duration-300 ${
                          isHovered ? "text-ember" : "text-char"
                        }`}
                      >
                        {cat.label}
                      </motion.h3>
                    </div>
                    <motion.span
                      layout
                      className={`text-lg transition-colors duration-300 ${
                        isHovered ? "text-ember" : "text-smoke"
                      }`}
                    >
                      {isHovered ? "→" : "+"}
                    </motion.span>
                  </div>

                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="type-serif text-smoke text-sm leading-relaxed mb-6">
                      {cat.sub}
                    </p>
                    <div className="space-y-3">
                      {cat.items.slice(0, 2).map((item: MenuItem) => (
                        <div key={item.id} className="flex items-baseline justify-between">
                          <span className="type-body text-char text-sm group-hover:text-ember transition-colors duration-300 font-medium">
                            {item.name}
                          </span>
                          <span className="type-label text-smoke text-[9px] font-bold">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {cat.items.length > 2 && (
                        <p className="type-label text-ember text-[9px] font-bold">
                          +{cat.items.length - 2} more dishes
                        </p>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}

          {/* Full Menu Button */}
          <motion.div
            layout
            className="w-full lg:w-[20%] bg-ember flex items-center justify-center p-8 lg:p-10 cursor-pointer text-bone"
            whileHover={{ backgroundColor: "#E03828" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setMenuOpen(true)}
          >
            <div className="text-center">
              <p className="type-caption text-bone/70 text-[9px] mb-3 font-sans">COMPLETE SELECTION</p>
              <motion.h3
                layout
                className="type-display text-4xl lg:text-5xl text-bone leading-[0.9] mb-4"
              >
                FULL<br />MENU
              </motion.h3>
              <motion.div
                layout
                className="inline-flex items-center gap-2 bg-bone text-ember font-bold px-5 py-3 type-caption text-[10px]"
              >
                VIEW ALL →
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-bone text-char flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Full menu"
          >
            <div className="flex items-center justify-between px-6 lg:px-8 h-20 border-b border-char/10 flex-shrink-0 bg-bone">
              <span className="type-display text-2xl text-char">Dan&apos;s Hamburgers Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="type-caption text-[10px] tracking-widest text-smoke hover:text-ember transition-colors duration-300 font-bold"
              >
                CLOSE ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-12 lg:py-20">
                <div className="mb-16">
                  <p className="type-caption text-ember mb-4 font-bold">Austin, Texas · Est. 1973</p>
                  <h2 className="type-display text-6xl sm:text-8xl lg:text-[7rem] text-char leading-[0.9]">
                    FULL<br />MENU BOARD
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {categories.map((cat) => (
                    <div key={cat.id}>
                      <div className="flex items-baseline justify-between mb-8 border-b border-char/15 pb-4">
                        <h3 className="type-display text-3xl text-char">{cat.label}</h3>
                        <span className="type-caption text-smoke text-[9px] font-sans">
                          {cat.items.length} ITEMS
                        </span>
                      </div>
                      <div className="space-y-8">
                        {cat.items.map((item: MenuItem) => (
                          <div key={item.id} className="group">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className="type-display text-xl text-char group-hover:text-ember transition-colors duration-300">
                                {item.name.toUpperCase()}
                              </h4>
                              <span className="type-caption text-char font-bold text-[10px] whitespace-nowrap">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                            <p className="type-serif text-smoke text-sm leading-relaxed">
                              {item.description}
                            </p>
                            {item.tags.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`type-caption text-[8px] px-2 py-1 ${
                                      TAG_COLORS[tag] ?? "bg-char-soft text-ink"
                                    }`}
                                  >
                                    {tag.toUpperCase()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-20 pt-10 border-t border-char/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <p className="type-caption text-ember text-[9px] mb-2 font-bold">Made to Order</p>
                    <p className="type-serif text-smoke text-sm max-w-lg">
                      Every patty is Certified Angus chuck seared fresh on our griddles. Call ahead to any of our 4 locations for pickup.
                    </p>
                  </div>
                  <Link
                    href="/locations"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-3 bg-ember text-bone px-8 py-4 type-caption text-[11px] font-bold hover:bg-ember-light transition-colors duration-300"
                  >
                    View All 4 Locations →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
