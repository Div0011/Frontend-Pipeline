"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/lib/data";

const CATEGORIES = [
  {
    id: "burgers",
    label: "Angus Burgers",
    tagline: "Certified Angus chuck, made to order",
    image: "/hero-burger.png",
    items: menuItems.filter((i) => i.category === "burgers"),
  },
  {
    id: "sides",
    label: "Homemade Sides",
    tagline: "Famous $50 recipe onion rings & curly fries",
    image: "/truffle-fries.png",
    items: menuItems.filter((i) => i.category === "sides"),
  },
  {
    id: "shakes",
    label: "Malts & Shakes",
    tagline: "Hand-dipped chocolate malts & floats",
    image: "/matcha-special.png",
    items: menuItems.filter((i) => i.category === "shakes"),
  },
  {
    id: "specials",
    label: "Texas Breakfast",
    tagline: "Scratch biscuits, sausage gravy & tacos",
    image: "/old-monk-mousse.png",
    items: menuItems.filter((i) => i.category === "specials"),
  },
];

export default function SignatureMenu() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showFullMenu, setShowFullMenu] = useState(false);

  const burgerItems = menuItems.filter((i) => i.category === "burgers");
  const sideItems = menuItems.filter((i) => i.category === "sides");
  const shakeItems = menuItems.filter((i) => i.category === "shakes");
  const breakfastItems = menuItems.filter((i) => i.category === "specials");

  const handleCardClick = (idx: number) => {
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
            <p className="type-caption text-ember mb-3">Austin Diner Menu · Est. 1973</p>
            <h2 className="type-display text-5xl sm:text-7xl lg:text-8xl text-char leading-[0.9]">
              EXPLORE THE KITCHEN BOARD
            </h2>
            <p className="type-serif text-smoke text-lg mt-4 max-w-xl">
              Tap (on mobile) or hover over a category to browse signature selections. Click &quot;Full Menu&quot; to view our complete Austin diner menu.
            </p>
          </div>

          {/* Main Grid */}
          <div className="flex flex-col lg:flex-row w-full border-t border-char/10 min-h-[580px] bg-char">
            
            {/* 4 Horizontal Tiles */}
            <div className="w-full lg:w-[80%] flex flex-col sm:flex-row">
              {CATEGORIES.map((cat, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;
                
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
                    <div className="absolute inset-0 bg-char">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-char via-char/40 to-transparent pointer-events-none" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                      <div>
                        <span className="type-caption text-yolk text-[9px] block mb-2 font-mono">
                          CATEGORY 0{idx + 1}
                        </span>
                        <h3 className="type-display text-4xl sm:text-5xl text-ink group-hover:text-yolk transition-colors duration-300">
                          {cat.label}
                        </h3>
                        <p className="type-serif text-sm text-stone mt-1 italic opacity-85">
                          {cat.tagline}
                        </p>
                      </div>

                      <div className="my-4 h-36 relative overflow-hidden flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.05 : 0.8,
                            opacity: isHovered ? 1 : 0.4,
                            y: isHovered ? 0 : 20,
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 18 }}
                          className="w-32 h-32 relative rounded-full border-2 border-ember/50 overflow-hidden shadow-2xl bg-char-soft"
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
                            <p className="type-caption text-stone text-[8px] mb-2 font-mono">POPULAR DISHES</p>
                            {cat.items.slice(0, 3).map((item) => (
                              <div key={item.id} className="flex justify-between items-center py-1">
                                <span className="type-body text-ink text-sm font-medium">{item.name}</span>
                                <span className="type-label text-yolk text-xs font-bold">${item.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <p className="type-label text-ember text-[9px] hover:underline pt-2 font-bold">
                            VIEW ALL {cat.label.toUpperCase()} →
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

            {/* Persistent Full Menu Button */}
            <div 
              onClick={() => setShowFullMenu(true)}
              className="w-full lg:w-[20%] min-h-[160px] sm:min-h-[580px] bg-ember hover:bg-ember-light transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between p-8 relative overflow-hidden group select-none"
            >
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-[radial-gradient(#FAF7F0_2px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="z-10">
                <span className="type-caption text-bone/70 text-[9px] block mb-2">COMPLETE BOARD</span>
                <h3 className="type-display text-4xl sm:text-5xl text-bone leading-[0.9] group-hover:translate-y-[-2px] transition-transform duration-300">
                  FULL<br className="hidden lg:block" /> MENU
                </h3>
              </div>

              <div className="z-10 flex lg:flex-col items-start justify-between gap-4 mt-8 lg:mt-0">
                <p className="type-serif text-sm text-bone/90 max-w-[150px] leading-snug">
                  Click to open the complete Austin diner menu board.
                </p>
                <div className="w-10 h-10 rounded-full border border-bone flex items-center justify-center group-hover:bg-bone group-hover:text-ember transition-all duration-300">
                  <span className="text-xl font-bold">↗</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {showFullMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-bone text-char"
          >
            {/* Topbar */}
            <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-6 flex justify-between items-center border-b border-char/10 bg-bone sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-ember rounded-sm flex items-center justify-center text-bone font-bold text-xs">
                  D
                </div>
                <span className="type-display text-2xl text-char">Dan&apos;s Hamburgers Menu Board</span>
              </div>
              <button
                onClick={() => setShowFullMenu(false)}
                className="type-caption text-bone bg-ember hover:bg-ember-light px-5 py-2.5 transition-all duration-300 font-bold"
              >
                ✕ CLOSE MENU
              </button>
            </div>

            {/* Menu Content */}
            <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16">
              
              <div className="mb-16 text-center">
                <p className="type-caption text-ember mb-2">Austin, Texas · Est. 1973 · Made to Order</p>
                <h2 className="type-display text-6xl sm:text-8xl lg:text-[8rem] text-char leading-[0.9]">
                  THE COMPLETE DINER BOARD
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* 1. Burgers */}
                <div className="space-y-6">
                  <div className="border-b-2 border-ember pb-3">
                    <h3 className="type-display text-4xl text-char">ANGUS BURGERS</h3>
                    <p className="type-caption text-smoke text-[9px]">Certified Angus Chuck · Griddled Fresh</p>
                  </div>
                  <div className="space-y-6">
                    {burgerItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="type-display text-2xl text-char group-hover:text-ember transition-colors">{item.name}</h4>
                          <span className="type-label text-char font-bold text-sm">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="type-serif text-sm text-smoke leading-relaxed">{item.description}</p>
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
                  <div className="border-b-2 border-ember pb-3">
                    <h3 className="type-display text-4xl text-char">HOMEMADE SIDES</h3>
                    <p className="type-caption text-smoke text-[9px]">Hand-Breaded Rings &amp; Curly Fries</p>
                  </div>
                  <div className="space-y-6">
                    {sideItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="type-display text-2xl text-char group-hover:text-ember transition-colors">{item.name}</h4>
                          <span className="type-label text-char font-bold text-sm">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="type-serif text-sm text-smoke leading-relaxed">{item.description}</p>
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

                {/* 3. Shakes */}
                <div className="space-y-6">
                  <div className="border-b-2 border-ember pb-3">
                    <h3 className="type-display text-4xl text-char">MALTS &amp; SHAKES</h3>
                    <p className="type-caption text-smoke text-[9px]">Hand-Dipped Fountain Classics</p>
                  </div>
                  <div className="space-y-6">
                    {shakeItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="type-display text-2xl text-char group-hover:text-ember transition-colors">{item.name}</h4>
                          <span className="type-label text-char font-bold text-sm">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="type-serif text-sm text-smoke leading-relaxed">{item.description}</p>
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

                {/* 4. Breakfast */}
                <div className="space-y-6">
                  <div className="border-b-2 border-ember pb-3">
                    <h3 className="type-display text-4xl text-char">TEXAS BREAKFAST</h3>
                    <p className="type-caption text-smoke text-[9px]">Scratch Biscuits &amp; Morning Tacos</p>
                  </div>
                  <div className="space-y-6">
                    {breakfastItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="type-display text-2xl text-char group-hover:text-ember transition-colors">{item.name}</h4>
                          <span className="type-label text-char font-bold text-sm">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="type-serif text-sm text-smoke leading-relaxed">{item.description}</p>
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

              <div className="border-t border-char/10 mt-20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="type-serif text-smoke text-sm italic">
                  * All items cooked fresh to order. Consuming raw or undercooked meats may increase risk of foodborne illness.
                </p>
                <div className="flex gap-4">
                  <a href="tel:5124436131" className="type-label text-ember font-bold hover:underline">
                    CALL AUSTIN STORES: (512) 443-6131
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
