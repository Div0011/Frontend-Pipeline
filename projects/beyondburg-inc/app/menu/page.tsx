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
    "title": "\ud83c\udf54 Smashed Beef & Chicken",
    "subtitle": "Precision seared on 500\u00b0F flat-tops for lacy caramelized edges",
    "items": [
      {
        "name": "The Classic Double Smash",
        "price": "399",
        "desc": "Two 100% prime beef patties, double American cheese, pickles, diced onions, and Beyond sauce",
        "tags": [
          "Top Rated \u2b50"
        ]
      },
      {
        "name": "Truffle Mushroom Smash",
        "price": "449",
        "desc": "Double smashed beef, saut\u00e9ed wild mushrooms, melted Swiss, and black truffle aioli",
        "tags": [
          "Truffle Luxe"
        ]
      },
      {
        "name": "Hot Honey Fried Chicken",
        "price": "379",
        "desc": "Crispy 24-hr brined fried chicken breast glazed in spicy habanero hot honey with pickled slaw",
        "tags": [
          "Spicy & Sweet \ud83c\udf6f"
        ]
      },
      {
        "name": "Oklahoma Onion Smash",
        "price": "419",
        "desc": "Thinly shaved sweet onions pressed deeply into double beef patties until charred sweet",
        "tags": [
          "House Classic"
        ]
      }
    ]
  },
  {
    "title": "\ud83c\udf5f Truffle Fries & Sides",
    "subtitle": "Crispy accompaniments and dipping pots",
    "items": [
      {
        "name": "Beyond Loaded Fries",
        "price": "299",
        "desc": "Crispy skin-on fries topped with smash beef crumbles, molten cheese sauce, and pickled jalape\u00f1os",
        "tags": [
          "Loaded \u2b50"
        ]
      },
      {
        "name": "Black Truffle Fries",
        "price": "269",
        "desc": "Salted golden fries tossed with white truffle essence and fresh chives",
        "tags": [
          "Vegetarian"
        ]
      },
      {
        "name": "Crispy Tender Strips",
        "price": "329",
        "desc": "Buttermilk-fried chicken tender strips with signature dipping sauces",
        "tags": [
          "Crunchy"
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
                backgroundColor: "#4ADE8015",
                borderColor: "#4ADE8040",
                color: "#4ADE80",
              }}
            >
              Kochi & Bengaluru · Next-Gen Smash Artistry
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{
                color: "#4ADE80",
                textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 30px #4ADE8050",
              }}
            >
              BEYONDBURG INC. <br />
              <span className="text-white">CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              High-temp smash burgers, smashed bone marrow, potato buns, and craft sodas.
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
                    backgroundColor: activeTab === idx ? "#4ADE80" : "transparent",
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
                      color: "#4ADE80",
                      textShadow: "0 2px 16px #4ADE8040",
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
                              backgroundColor: "#4ADE80",
                              color: "#000000",
                            }}
                          >
                            ₹{item.price}
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
                                  backgroundColor: "#4ADE8015",
                                  borderColor: "#4ADE8030",
                                  color: "#4ADE80",
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
                            backgroundColor: "#4ADE80",
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
