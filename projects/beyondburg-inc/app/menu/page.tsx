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
      <main className="pt-24 min-h-screen bg-[#FFFFFF] text-[#1A1A1A] select-none">
        {/* Banner Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden border-b border-black/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-extrabold inline-block px-3 py-1 rounded-full border border-black/10 shadow-sm"
              style={{ color: "#122B1E" }}
            >
              Kochi & Bengaluru · Next-Gen Smash Artistry
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{ color: "#22C55E" }}
            >
              BEYONDBURG INC. <br />
              <span style={{ color: "#122B1E" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed">
              High-temp smash burgers, smashed bone marrow, potato potato buns, and craft sodas.
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
                    backgroundColor: activeTab === idx ? "#122B1E" : "transparent",
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
                    style={{ color: "#22C55E" }}
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
                            style={{ color: "#22C55E" }}
                          >
                            {item.name}
                          </h3>
                          <span className="font-mono font-extrabold text-base sm:text-lg text-black px-3 py-1 rounded-full bg-black/5 flex-shrink-0">
                            ₹{item.price}
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
                                backgroundColor: "#122B1E15",
                                color: "#122B1E",
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
