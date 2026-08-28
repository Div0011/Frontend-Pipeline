"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  tags?: string[];
}

interface MenuSection {
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const MENU_DATA: MenuSection[] = [
  {
    "title": "\ud83c\udf54 Centennial Flat-Top Burgers",
    "subtitle": "Seared on our 100-year seasoned flat-top cast iron",
    "items": [
      {
        "name": "The OT Special",
        "price": "8.99",
        "desc": "Two seared Angus chuck patties, double sharp cheddar, and grilled onions pressed between golden buttered Texas toast",
        "tags": [
          "100-Year Recipe \u2b50",
          "House Legend"
        ]
      },
      {
        "name": "The DH Special",
        "price": "8.49",
        "desc": "Two Angus patties, double melted Swiss cheese, saut\u00e9ed mushrooms, and caramelized onions on a grilled sesame bun",
        "tags": [
          "Mushroom Swiss"
        ]
      },
      {
        "name": "The K-Bar Bacon Cheeseburger",
        "price": "8.99",
        "desc": "Hand-pressed Angus beef, thick-cut crispy bacon, double American cheese, crinkle-cut pickles, and mustard",
        "tags": [
          "Bacon Classic"
        ]
      },
      {
        "name": "Original 1926 Kum-Bak Burger",
        "price": "6.99",
        "desc": "The original recipe: Fresh Angus patty seared hot on the flat-top, mustard, sliced pickles, and diced onions",
        "tags": [
          "Est. 1926"
        ]
      }
    ]
  },
  {
    "title": "\ud83c\udf5f Famous Tots & Texas Chili",
    "subtitle": "Golden crispy tots and scratch buttermilk onion rings",
    "items": [
      {
        "name": "Dirty's Famous Tater Tots",
        "price": "4.49",
        "desc": "The most famous tots on The Drag. Extra crispy golden cylinders seasoned in Dirty's house paprika salt blend",
        "tags": [
          "Famous Tots \u2b50"
        ]
      },
      {
        "name": "Hand-Battered Onion Rings",
        "price": "4.99",
        "desc": "Fresh sweet Texas onions sliced daily, dipped in scratch buttermilk batter and fried dark golden crisp",
        "tags": [
          "Scratch Batter"
        ]
      },
      {
        "name": "Dirty's Texas Chili Bowl",
        "price": "5.49",
        "desc": "Slow-simmered all-beef chili without beans, topped with sharp shredded cheddar and diced onions",
        "tags": [
          "Homemade"
        ]
      }
    ]
  }
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-[#0A0A0A] text-white relative z-10 select-none">
        {/* Banner Section */}
        <section className="py-20 lg:py-24 border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-extrabold inline-block px-3.5 py-1.5 rounded-full border shadow-sm"
              style={{
                backgroundColor: "#E5A93C15",
                borderColor: "#E5A93C40",
                color: "#E5A93C",
              }}
            >
              2808 Guadalupe St · Since 1926
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{
                color: "#E5A93C",
                textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 30px #E5A93C50",
              }}
            >
              DIRTY MARTIN'S KUM-BAK <br />
              <span className="text-white">CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              100 years of the OT Special, seasoned cast iron smash burgers, crispy tater tots, and chocolate malts on The Drag.
            </p>
          </div>
        </section>

        {/* Category Tabs Sticky Bar */}
        <section className="sticky top-18 lg:top-20 z-30 py-4 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {MENU_DATA.map((sec, idx) => (
                <button
                  key={sec.title}
                  onClick={() => {
                    if ((window as any).playPopSound) (window as any).playPopSound();
                    setActiveTab(idx);
                  }}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeTab === idx
                      ? "shadow-2xl scale-105"
                      : "text-white/60 hover:text-white border border-white/10 hover:border-white/30"
                  }`}
                  style={{
                    backgroundColor: activeTab === idx ? "#E5A93C" : "transparent",
                    color: activeTab === idx ? "#000000" : undefined,
                  }}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* High-Contrast Menu Slabs Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div>
                  <h2
                    className="type-display text-3xl sm:text-5xl font-black mb-2"
                    style={{
                      color: "#E5A93C",
                      textShadow: "0 2px 16px #E5A93C40",
                    }}
                  >
                    {MENU_DATA[activeTab].title}
                  </h2>
                  <p className="type-serif text-base sm:text-lg text-white/70">
                    {MENU_DATA[activeTab].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {MENU_DATA[activeTab].items.map((item) => (
                    <div
                      key={item.name}
                      className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-white/15 hover:border-white/40 shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3
                            className="type-display text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:transition-colors"
                            style={{
                              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                            }}
                          >
                            {item.name}
                          </h3>
                          <span
                            className="font-mono font-extrabold text-sm sm:text-base px-3.5 py-1.5 rounded-full flex-shrink-0 shadow-lg"
                            style={{
                              backgroundColor: "#E5A93C",
                              color: "#000000",
                            }}
                          >
                            ${item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm sm:text-base text-white/80 leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10">
                        {item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border"
                                style={{
                                  backgroundColor: "#E5A93C15",
                                  borderColor: "#E5A93C30",
                                  color: "#E5A93C",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div />
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                            alert(`Added ${item.name} to your order!`);
                          }}
                          className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 flex-shrink-0"
                          style={{
                            backgroundColor: "#E5A93C",
                            color: "#000000",
                          }}
                        >
                          Add +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
