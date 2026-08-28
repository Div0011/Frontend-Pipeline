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
    "title": "\ud83c\udf54 Gourmet French Burgers",
    "subtitle": "Crafted with imported cheeses, house sauces, and artisan brioche",
    "items": [
      {
        "name": "The Lucien Burger",
        "price": "495",
        "desc": "Prime Angus patty, French brie cheese, caramelized balsamic onions, and garlic butter glaze",
        "tags": [
          "French Classic \u2b50"
        ]
      },
      {
        "name": "Dynamite Beef Burger",
        "price": "525",
        "desc": "Two smashed beef patties, spicy dynamite sauce, smoked cheddar, and pickled jalape\u00f1os",
        "tags": [
          "Spicy Pick \ud83c\udf36\ufe0f"
        ]
      },
      {
        "name": "Parisian Truffle Chicken",
        "price": "475",
        "desc": "Panko-crusted chicken breast, white truffle butter, gruy\u00e8re cheese, and baby spinach",
        "tags": [
          "Truffle Specialty"
        ]
      },
      {
        "name": "The Seigneur Veggie",
        "price": "425",
        "desc": "Herbed halloumi steak, roasted red pepper coulis, arugula, and pesto mayo",
        "tags": [
          "Gourmet Veg"
        ]
      }
    ]
  },
  {
    "title": "\ud83c\udf5f Sides & Artisanal Shakes",
    "subtitle": "Truffle parmesan fries and Belgian chocolate shakes",
    "items": [
      {
        "name": "Truffle Parmesan French Fries",
        "price": "295",
        "desc": "Golden fried potatoes tossed in Italian black truffle oil and 24-month aged parmesan",
        "tags": [
          "Best Seller \u2b50"
        ]
      },
      {
        "name": "French Salted Caramel Shake",
        "price": "325",
        "desc": "Handcrafted vanilla gelato blended with fleur de sel caramel sauce",
        "tags": [
          "Dessert Shake"
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
              style={{ color: "#418043" }}
            >
              Indiranagar & Forum Rex · Gourmet French Craft
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{ color: "#418043" }}
            >
              BURGER SEIGNEUR <br />
              <span style={{ color: "#418043" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed">
              Artisanal gourmet burgers, brioche buns baked fresh daily, and signature crafted milkshakes.
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
                    backgroundColor: activeTab === idx ? "#418043" : "transparent",
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
                    style={{ color: "#418043" }}
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
                            style={{ color: "#418043" }}
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
                                backgroundColor: "#41804315",
                                color: "#418043",
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
