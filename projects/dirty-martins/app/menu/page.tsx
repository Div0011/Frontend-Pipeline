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
  },
  {
    "title": "\ud83e\udd64 Hand-Spun Fountain Shakes",
    "subtitle": "Classic malts and ice-cold Texas drafts",
    "items": [
      {
        "name": "Classic Chocolate Malt",
        "price": "4.99",
        "desc": "Hand-dipped ice cream spun in stainless cups with pure malted barley powder and dark chocolate syrup",
        "tags": [
          "Fountain Classic \u2b50"
        ]
      },
      {
        "name": "Longhorn Burnt Orange Shake",
        "price": "5.49",
        "desc": "Thick vanilla ice cream churned with Texas sweet orange citrus syrup and crushed vanilla wafers",
        "tags": [
          "UT Tradition"
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
      <main className="pt-24 min-h-screen bg-[#FFFFFF] text-[#1A1A1A] select-none">
        {/* Banner Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden border-b border-black/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-extrabold inline-block px-3 py-1 rounded-full border border-black/10 shadow-sm"
              style={{ color: "#C68A14" }}
            >
              2808 Guadalupe St · Since 1926
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{ color: "#C68A14" }}
            >
              DIRTY MARTIN'S KUM-BAK <br />
              <span style={{ color: "#C68A14" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed">
              100 years of the OT Special, seasoned cast iron smash burgers, crispy tater tots, and chocolate malts on The Drag.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="sticky top-18 lg:top-20 z-30 py-4 backdrop-blur-md border-b border-black/10 bg-[#FFFFFF]/90">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {MENU_DATA.map((sec, idx) => (
                <button
                  key={sec.title}
                  onClick={() => {
                    if ((window as any).playPopSound) (window as any).playPopSound();
                    setActiveTab(idx);
                  }}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeTab === idx
                      ? "shadow-lg scale-105"
                      : "text-[#4B5563] hover:text-[#0A0A0A] border border-black/10"
                  }`}
                  style={{
                    backgroundColor: activeTab === idx ? "#C68A14" : "transparent",
                    color: activeTab === idx ? "#FFFFFF" : undefined,
                  }}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content Display */}
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
                    style={{ color: "#C68A14" }}
                  >
                    {MENU_DATA[activeTab].title}
                  </h2>
                  <p className="type-serif text-base sm:text-lg text-[#4B5563]">
                    {MENU_DATA[activeTab].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {MENU_DATA[activeTab].items.map((item) => (
                    <div
                      key={item.name}
                      className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-lg text-[#1A1A1A] hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline gap-4">
                          <h3
                            className="type-display text-xl sm:text-2xl font-bold leading-tight"
                            style={{ color: "#C68A14" }}
                          >
                            {item.name}
                          </h3>
                          <span className="font-mono font-extrabold text-base sm:text-lg text-black px-3 py-1 rounded-full bg-black/5 flex-shrink-0">
                            ${item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm text-[#4B5563] leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border border-black/10"
                              style={{
                                backgroundColor: "#C68A1415",
                                color: "#C68A14",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
