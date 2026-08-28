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
    "title": "\ud83c\udf54 Austin's Best Hamburgers",
    "subtitle": "Fresh daily Angus beef dressed with mustard, lettuce, tomato, pickles & onion",
    "items": [
      {
        "name": "Dan's Large Bacon Cheeseburger",
        "price": "8.75",
        "desc": "1/2 lb fresh Angus beef, thick-cut crispy bacon, double melted American cheese, mustard, and veggies",
        "tags": [
          "Austin Classic \u2b50"
        ]
      },
      {
        "name": "Jalape\u00f1o Cheddar Burger",
        "price": "7.95",
        "desc": "Seared beef patty loaded with grilled fresh jalape\u00f1os, melted sharp cheddar, and spicy mayo",
        "tags": [
          "Texas Spice \ud83c\udf36\ufe0f"
        ]
      },
      {
        "name": "Mushroom Swiss Burger",
        "price": "7.95",
        "desc": "Angus chuck smothered in buttery saut\u00e9ed mushrooms and molten Swiss cheese",
        "tags": [
          "Fan Favorite"
        ]
      },
      {
        "name": "Dan's Double Meat Cheeseburger",
        "price": "9.50",
        "desc": "Two fresh Angus patties, double melted cheese on a toasted seeded bun",
        "tags": [
          "Double Classic"
        ]
      }
    ]
  },
  {
    "title": "\ud83c\udf5f Curly Fries & Homestyle Sides",
    "subtitle": "Fresh fried sides and handmade shakes",
    "items": [
      {
        "name": "Dan's Seasoned Curly Fries",
        "price": "3.95",
        "desc": "Crispy spiral cut potatoes seasoned in Dan's signature paprika spice blend",
        "tags": [
          "Must Have \u2b50"
        ]
      },
      {
        "name": "Hand-Cut Onion Rings",
        "price": "4.25",
        "desc": "Fresh Texas sweet onions in crispy scratch batter",
        "tags": [
          "Handmade"
        ]
      },
      {
        "name": "Hand-Spun Chocolate Shake",
        "price": "4.50",
        "desc": "Old fashioned thick milk shake made with Blue Bell ice cream",
        "tags": [
          "Blue Bell \ud83c\udf66"
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
              style={{ color: "#E52421" }}
            >
              Austin, Texas · Serving Since 1973
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{ color: "#E52421" }}
            >
              DAN'S HAMBURGERS <br />
              <span style={{ color: "#E52421" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed">
              Fresh 100% Angus ground chuck burgers, homemade jalapeño cheeseburgers, curly fries, and onion rings.
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
                    backgroundColor: activeTab === idx ? "#E52421" : "transparent",
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
                    style={{ color: "#E52421" }}
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
                            style={{ color: "#E52421" }}
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
                                backgroundColor: "#E5242115",
                                color: "#E52421",
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
