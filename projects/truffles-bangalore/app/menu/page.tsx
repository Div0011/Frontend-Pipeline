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
    "title": "\ud83c\udf54 Burgers & Smashes",
    "subtitle": "Fresh griddled patties with homemade sauces and soft brioche buns",
    "items": [
      {
        "name": "All American Cheese Burger",
        "price": "290",
        "desc": "Classic grilled beef patty, double melted American cheese, gherkins, and house mustard mayo",
        "tags": [
          "Legendary \u2b50",
          "Best Seller"
        ]
      },
      {
        "name": "Lamb Chilli Cheese Smash",
        "price": "380",
        "desc": "Double smashed spiced lamb, chilli sofrito, melted cheddar, and jalape\u00f1o relish",
        "tags": [
          "Spicy \ud83c\udf36\ufe0f",
          "Signature"
        ]
      },
      {
        "name": "Crispy Buffalo Chicken",
        "price": "320",
        "desc": "Fried buttermilk chicken tossed in spicy buffalo glaze, garlic aioli, and crispy slaw",
        "tags": [
          "Crispy Favorite"
        ]
      },
      {
        "name": "Magic Mushroom & Swiss",
        "price": "310",
        "desc": "Multigrain-crusted portobello patty, saut\u00e9ed garlic mushrooms, Swiss cheese, and truffle mayo",
        "tags": [
          "Veg Star \u2b50"
        ]
      },
      {
        "name": "Korean Gochujang Paneer",
        "price": "310",
        "desc": "Crispy paneer steak dunked in sweet & spicy gochujang glaze with kimchi slaw",
        "tags": [
          "Chef Pick"
        ]
      }
    ]
  },
  {
    "title": "\ud83c\udf5f Loaded Sides & Starters",
    "subtitle": "Golden fries, truffle crunches, and spicy wings",
    "items": [
      {
        "name": "Truffle Parmesan Fries",
        "price": "240",
        "desc": "Hand-cut crispy Idaho fries tossed in aromatic truffle oil, fresh parsley, and grated parmesan",
        "tags": [
          "House Specialty"
        ]
      },
      {
        "name": "BBQ Glazed Chicken Wings",
        "price": "290",
        "desc": "6 jumbo wings slow-smoked and glazed in smoky hickory BBQ sauce with ranch dip",
        "tags": [
          "Smoky \ud83c\udf56"
        ]
      },
      {
        "name": "Jalape\u00f1o Cheese Poppers",
        "price": "230",
        "desc": "Crispy golden crumbed poppers filled with molten cheddar and spicy jalape\u00f1os",
        "tags": [
          "Vegetarian"
        ]
      },
      {
        "name": "Crispy Onion Rings",
        "price": "190",
        "desc": "Beer-battered sweet onion rings served with spicy chipotle mayo",
        "tags": [
          "Classic"
        ]
      }
    ]
  },
  {
    "title": "\ud83e\udd64 Hand-Spun Shakes & Desserts",
    "subtitle": "Classic ice cream shakes and iconic dessert jars",
    "items": [
      {
        "name": "Deep Fried Oreos",
        "price": "260",
        "desc": "Golden battered Oreos dusted in powdered sugar, served warm with vanilla custard and chocolate dip",
        "tags": [
          "Cult Favorite \u2b50"
        ]
      },
      {
        "name": "Old Monk Chocolate Mousse",
        "price": "270",
        "desc": "Velvety dark chocolate mousse infused with Old Monk dark rum and cocoa nibs",
        "tags": [
          "Signature \ud83c\udf1f"
        ]
      },
      {
        "name": "French Vanilla Biscuit Shake",
        "price": "240",
        "desc": "Hand-dipped vanilla ice cream churned with rich butter biscuits and salted caramel",
        "tags": [
          "Thick Shake"
        ]
      },
      {
        "name": "Belgian Dark Chocolate Shake",
        "price": "250",
        "desc": "Pure Belgian dark chocolate ganache blended with premium cream",
        "tags": [
          "Indulgent"
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
                backgroundColor: "#FFE50015",
                borderColor: "#FFE50040",
                color: "#FFE500",
              }}
            >
              St. Marks Rd & Koramangala · Bengaluru
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{
                color: "#FFE500",
                textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 30px #FFE50050",
              }}
            >
              TRUFFLES <br />
              <span className="text-white">CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              Handcrafted gourmet burgers, deep-fried Oreos, signature Old Monk mousse, artisan matchas, and cold brews.
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
                    backgroundColor: activeTab === idx ? "#FFE500" : "transparent",
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
                      color: "#FFE500",
                      textShadow: "0 2px 16px #FFE50040",
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
                              backgroundColor: "#FFE500",
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
                                  backgroundColor: "#FFE50015",
                                  borderColor: "#FFE50030",
                                  color: "#FFE500",
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
                            backgroundColor: "#FFE500",
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
