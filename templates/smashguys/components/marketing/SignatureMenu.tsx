"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/lib/data";

const CATEGORIES = [
  {
    id: "burgers",
    label: "Burgers",
    tagline: "Double patties, custom sear",
    image: "/hero-burger.png",
    items: menuItems.filter((i) => i.category === "burgers"),
  },
  {
    id: "sides",
    label: "Sides",
    tagline: "Crisp & seasoned sides",
    image: "/truffle-fries.png",
    items: menuItems.filter((i) => i.category === "sides"),
  },
  {
    id: "shakes",
    label: "Drinks",
    tagline: "Artisan milkshakes & elixirs",
    image: "/matcha-special.png",
    items: menuItems.filter((i) => i.category === "shakes" || i.category === "specials"),
  },
  {
    id: "specials",
    label: "Desserts",
    tagline: "Sweet finishes",
    image: "/old-monk-mousse.png",
    items: [
      {
        id: "old-monk-mousse",
        name: "Old Monk Mousse",
        description: "Dark chocolate infused with local Old Monk rum",
        price: 199,
        category: "specials",
        tags: ["signature"],
        image: "/old-monk-mousse.png",
      }
    ],
  },
];

export default function SignatureMenu() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showFullMenu, setShowFullMenu] = useState(false);

  // Group all items for full screen menu
  const burgerItems = menuItems.filter((i) => i.category === "burgers");
  const sideItems = menuItems.filter((i) => i.category === "sides");
  const drinkItems = menuItems.filter((i) => i.category === "shakes");
  const dessertItems = [
    {
      id: "old-monk-mousse",
      name: "Old Monk Mousse",
      description: "Dark chocolate infused with local Old Monk rum, cocoa crumble",
      price: 199,
      category: "specials",
      tags: ["signature"],
      image: "/old-monk-mousse.png",
    }
  ];

  const handleCardClick = (idx: number) => {
    // On mobile devices, click toggles expansion state
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setHoveredIdx((prev) => (prev === idx ? null : idx));
    }
  };

  return (
    <>
      <section className="bg-bone border-y border-bone-dark overflow-hidden relative">
        <div className="w-full mx-auto">
          {/* Header Area */}
          <div className="max-w-[88rem] mx-auto px-6 lg:px-8 pt-20 pb-10">
            <p className="type-caption text-yolk-dark mb-3">Our Selection</p>
            <h2 className="type-display text-5xl sm:text-7xl lg:text-8xl text-char leading-[0.9]">
              EXPLORE THE KITCHEN
            </h2>
            <p className="type-serif text-smoke text-lg mt-4 max-w-xl">
              Tap (on mobile) or hover over a category card to see popular offerings. Click &quot;Full Menu&quot; on the right to view our entire menu board.
            </p>
          </div>

          {/* Main Grid: 80% Horizontal Tiles + 20% persistent Button */}
          <div className="flex flex-col lg:flex-row w-full border-t border-char/10 min-h-[580px] bg-char">
            
            {/* 4 Horizontal Tiles (80% total width) */}
            <div className="w-full lg:w-[80%] flex flex-col sm:flex-row">
              {CATEGORIES.map((cat, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;
                
                // Determine width style dynamically based on hover
                let flexStyle = "flex-1";
                if (isAnyHovered) {
                  flexStyle = isHovered ? "flex-[1.8]" : "flex-[0.7]";
                }

                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => handleCardClick(idx)}
                    className={`relative min-h-[380px] sm:min-h-[580px] overflow-hidden border-b sm:border-b-0 sm:border-r border-char-mute/40 transition-all duration-500 ease-out cursor-pointer group ${flexStyle}`}
                  >
                    {/* Background image with brightness scale */}
                    <div className="absolute inset-0 bg-char">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-char via-char/40 to-transparent pointer-events-none" />

                    {/* Content container */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                      <div>
                        <span className="type-caption text-yolk text-[9px] block mb-2">
                          CATEGORY
                        </span>
                        <h3 className="type-display text-4xl sm:text-5xl text-ink group-hover:text-yolk transition-colors duration-300">
                          {cat.label}
                        </h3>
                        <p className="type-serif text-sm text-stone mt-1 italic opacity-80">
                          {cat.tagline}
                        </p>
                      </div>

                      {/* Featured Food Image container inside each card (reveals and pops on hover) */}
                      <div className="my-4 h-36 relative overflow-hidden flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.05 : 0.8,
                            opacity: isHovered ? 1 : 0.4,
                            y: isHovered ? 0 : 20,
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 18 }}
                          className="w-32 h-32 relative rounded-full border-2 border-yolk/30 overflow-hidden shadow-2xl bg-char-soft"
                        >
                          <Image
                            src={cat.image}
                            alt={`${cat.label} Close Up`}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        </motion.div>
                      </div>

                      {/* Expandable info list */}
                      <div className="space-y-4 overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20,
                            height: isHovered ? "auto" : 0
                          }}
                          transition={{ duration: 0.35 }}
                          className="space-y-3"
                        >
                          <div className="border-t border-char-mute/60 pt-4">
                            <p className="type-caption text-stone text-[8px] mb-2">FEATURED ITEMS</p>
                            {cat.items.slice(0, 3).map((item) => (
                              <div key={item.id} className="flex justify-between items-center py-1">
                                <span className="type-body text-ink text-sm font-medium">{item.name}</span>
                                <span className="type-label text-yolk text-xs">₹{item.price}</span>
                              </div>
                            ))}
                          </div>
                          <p className="type-label text-yolk text-[9px] hover:underline pt-2">
                            EXPLORE {cat.label.toUpperCase()} →
                          </p>
                        </motion.div>
                        
                        {!isHovered && (
                          <span className="type-label text-stone text-[9px] group-hover:text-ink transition-colors duration-300 block">
                            TAP TO REVEAL →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Persistent Full Menu Button (20% width) */}
            <div 
              onClick={() => setShowFullMenu(true)}
              className="w-full lg:w-[20%] min-h-[160px] sm:min-h-[580px] bg-yolk hover:bg-yolk-light transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between p-8 relative overflow-hidden group select-none"
            >
              {/* Animated hover pattern background */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300 bg-[radial-gradient(#141413_2px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="z-10">
                <span className="type-caption text-char/60 text-[9px] block mb-2">COMPLETE BOARD</span>
                <h3 className="type-display text-4xl sm:text-5xl text-char leading-[0.9] group-hover:translate-y-[-2px] transition-transform duration-300">
                  FULL<br className="hidden lg:block" /> MENU
                </h3>
              </div>

              <div className="z-10 flex lg:flex-col items-start justify-between gap-4 mt-8 lg:mt-0">
                <p className="type-serif text-sm text-char/80 max-w-[150px] leading-snug">
                  Click to launch the full-screen interactive kitchen board.
                </p>
                <div className="w-10 h-10 rounded-full border border-char flex items-center justify-center group-hover:bg-char group-hover:text-yolk transition-all duration-300">
                  <span className="text-xl font-bold">↗</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-Screen Yellow Menu Transition & Overlay */}
      <AnimatePresence>
        {showFullMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-yolk"
          >
            {/* Topbar */}
            <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-6 flex justify-between items-center border-b border-char/10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-char rounded-sm" />
                <span className="type-display text-2xl text-char">Smash Guys Menu</span>
              </div>
              <button
                onClick={() => setShowFullMenu(false)}
                className="type-caption text-char border border-char px-5 py-2.5 hover:bg-char hover:text-yolk transition-all duration-300 font-bold"
              >
                ✕ CLOSE MENU
              </button>
            </div>

            {/* Menu Content */}
            <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16">
              
              {/* Big Header */}
              <div className="mb-16 text-center">
                <p className="type-caption text-char/60 mb-2">Bangalore Born · Pressed Fresh</p>
                <h2 className="type-display text-6xl sm:text-8xl lg:text-[8rem] text-char leading-[0.9]">
                  THE KITCHEN BOARD
                </h2>
              </div>

              {/* Entire Menu Columns (All Categories) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* 1. Burgers */}
                <div className="space-y-6">
                  <div className="border-b-2 border-char pb-3">
                    <h3 className="type-display text-4xl text-char">BURGERS</h3>
                    <p className="type-caption text-char/60 text-[9px]">Double Patty Smashes</p>
                  </div>
                  <div className="space-y-6">
                    {burgerItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="type-display text-2xl text-char group-hover:text-char/70 transition-colors">{item.name}</h4>
                          <span className="type-label text-char font-bold text-sm">₹{item.price}</span>
                        </div>
                        <p className="type-serif text-sm text-char/80 leading-relaxed">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[8px] font-mono uppercase bg-char text-yolk px-2 py-0.5 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Sides */}
                <div className="space-y-6">
                  <div className="border-b-2 border-char pb-3">
                    <h3 className="type-display text-4xl text-char">SIDES</h3>
                    <p className="type-caption text-char/60 text-[9px]">Crisp Accompaniments</p>
                  </div>
                  <div className="space-y-6">
                    {sideItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="type-display text-2xl text-char group-hover:text-char/70 transition-colors">{item.name}</h4>
                          <span className="type-label text-char font-bold text-sm">₹{item.price}</span>
                        </div>
                        <p className="type-serif text-sm text-char/80 leading-relaxed">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[8px] font-mono uppercase bg-char text-yolk px-2 py-0.5 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Drinks */}
                <div className="space-y-6">
                  <div className="border-b-2 border-char pb-3">
                    <h3 className="type-display text-4xl text-char">DRINKS</h3>
                    <p className="type-caption text-char/60 text-[9px]">Shakes &amp; Elixirs</p>
                  </div>
                  <div className="space-y-6">
                    {drinkItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="type-display text-2xl text-char group-hover:text-char/70 transition-colors">{item.name}</h4>
                          <span className="type-label text-char font-bold text-sm">₹{item.price}</span>
                        </div>
                        <p className="type-serif text-sm text-char/80 leading-relaxed">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[8px] font-mono uppercase bg-char text-yolk px-2 py-0.5 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Desserts & Specials */}
                <div className="space-y-6">
                  <div className="border-b-2 border-char pb-3">
                    <h3 className="type-display text-4xl text-char">DESSERTS</h3>
                    <p className="type-caption text-char/60 text-[9px]">Sweet Finishes</p>
                  </div>
                  <div className="space-y-6">
                    {dessertItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="type-display text-2xl text-char group-hover:text-char/70 transition-colors">{item.name}</h4>
                          <span className="type-label text-char font-bold text-sm">₹{item.price}</span>
                        </div>
                        <p className="type-serif text-sm text-char/80 leading-relaxed">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[8px] font-mono uppercase bg-char text-yolk px-2 py-0.5 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom footer notice inside full menu overlay */}
              <div className="border-t border-char/10 mt-20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="type-serif text-char/80 text-sm italic">
                  * All prices are exclusive of applicable taxes. Please notify our staff of any allergies before ordering.
                </p>
                <div className="flex gap-4">
                  <a href="tel:+918045678900" className="type-label text-char font-bold hover:underline">CALL US: +91 80 4567 8900</a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
