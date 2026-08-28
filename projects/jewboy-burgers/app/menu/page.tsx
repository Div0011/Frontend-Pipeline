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
    "title": "\ud83c\udf54 Border Smash Burgers",
    "subtitle": "1/3 lb Angus chuck smashed hot into onions on seasoned cast iron",
    "items": [
      {
        "name": "The Oy Vey Goy",
        "price": "10.50",
        "desc": "1/3 lb Angus patty smashed with grilled onions, smoked bacon, crispy potato latke, melted cheddar & pepper jack, and Homeboy sauce on a steamed Martin's potato bun",
        "tags": [
          "House Legend \u2b50",
          "Latke Burger"
        ]
      },
      {
        "name": "The Schmoozer",
        "price": "9.75",
        "desc": "Smashed Angus beef with grilled onions, roasted Hatch green chiles, melted pepper jack cheese, yellow mustard, and pickles",
        "tags": [
          "Hatch Green Chile \ud83c\udf36\ufe0f"
        ]
      },
      {
        "name": "The Goy Vey",
        "price": "9.50",
        "desc": "Smashed beef with caramelized onions, crispy smoked bacon, double sharp cheddar, and Homeboy sauce",
        "tags": [
          "Bacon Cheddar"
        ]
      }
    ]
  },
  {
    "title": "\ud83e\udd54 Latkes & Green Chile Queso",
    "subtitle": "Scratch-shredded potato latkes and loaded queso fries",
    "items": [
      {
        "name": "Crispy Latkes & Queso",
        "price": "5.99",
        "desc": "Two golden scratch potato latkes fried crisp, served with warm Hatch green chile queso and sour cream",
        "tags": [
          "Must Order \u2b50"
        ]
      },
      {
        "name": "Hatch Green Chile Fries",
        "price": "6.49",
        "desc": "Crisp fries smothered in warm green chile queso, grilled onions, jalape\u00f1os, and bacon crumbles",
        "tags": [
          "Loaded \ud83c\udf36\ufe0f"
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
                backgroundColor: "#FFFFFF15",
                borderColor: "#FFFFFF40",
                color: "#FFFFFF",
              }}
            >
              5111 Airport Blvd · Shalom Y'all!
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{
                color: "#FFFFFF",
                textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 30px #FFFFFF50",
              }}
            >
              JEWBOY BURGERS <br />
              <span className="text-white">CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              Border style smashed Angus burgers, scratch potato latkes, green chile queso, and churro shakes.
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
                    backgroundColor: activeTab === idx ? "#FFFFFF" : "transparent",
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
                      color: "#FFFFFF",
                      textShadow: "0 2px 16px #FFFFFF40",
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
                              backgroundColor: "#FFFFFF",
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
                                  backgroundColor: "#FFFFFF15",
                                  borderColor: "#FFFFFF30",
                                  color: "#FFFFFF",
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
                            backgroundColor: "#FFFFFF",
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
