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
    "title": "\ud83c\udf55 Authentic NYC & Grandma Pies",
    "subtitle": "Cold-fermented 72-hour dough baked on deck ovens",
    "items": [
      {
        "name": "The Grandma Pie",
        "price": "26.00",
        "desc": "Thin crispy pan crust, fresh mozzarella, signature garlicky crushed San Marzano tomato sauce, fresh basil, and extra virgin olive oil",
        "tags": [
          "Legendary \u2b50",
          "House Special"
        ]
      },
      {
        "name": "NYC Pepperoni Round",
        "price": "24.00",
        "desc": "Cupping pepperoni, whole milk mozzarella, aged parmesan, and oregano on an airy crisp crust",
        "tags": [
          "Fan Favorite"
        ]
      },
      {
        "name": "Sicilian Thick Square",
        "price": "28.00",
        "desc": "Thick airy focaccia-like crust, caramelized crispy cheese corners, rich tomato gravy",
        "tags": [
          "Deep Dish"
        ]
      },
      {
        "name": "White Pie with Garlic & Ricotta",
        "price": "25.00",
        "desc": "Creamy whipped ricotta, whole milk mozzarella, roasted garlic cloves, and fresh cracked pepper",
        "tags": [
          "Garlic Herb"
        ]
      }
    ]
  },
  {
    "title": "\ud83e\udd56 Knots, Calzones & Cannolis",
    "subtitle": "Scratch garlic knots and classic Italian desserts",
    "items": [
      {
        "name": "Garlic Knots (6 pcs)",
        "price": "6.50",
        "desc": "Freshly twisted pizza dough drenched in garlic butter, fresh parsley, and parmesan, served with marinara",
        "tags": [
          "Must Order \u2b50"
        ]
      },
      {
        "name": "Pepperoni & Cheese Calzone",
        "price": "14.00",
        "desc": "Stuffed with seasoned ricotta, mozzarella, and cupping pepperoni with hot marinara dip",
        "tags": [
          "Stuffed"
        ]
      },
      {
        "name": "Authentic Sicilian Cannoli",
        "price": "5.00",
        "desc": "Crispy fried shell filled with sweet orange-kissed ricotta cream and chocolate chips",
        "tags": [
          "Dessert"
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
      <main className="pt-24 min-h-screen bg-[#0A0A0A] text-[#FFFFFF] select-none">
        {/* Banner Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden border-b border-black/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-extrabold inline-block px-3 py-1 rounded-full border border-black/10 shadow-sm"
              style={{ color: "#D91C24" }}
            >
              8315 Burnet Rd · Austin, TX
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{ color: "#F2C777" }}
            >
              PEDROSO'S PIZZA <br />
              <span style={{ color: "#D91C24" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-white/70 max-w-2xl leading-relaxed">
              Authentic NYC round pies, crispy Grandmas, thick Sicilian squares, and fresh garlic knots.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="sticky top-18 lg:top-20 z-30 py-4 backdrop-blur-md border-b border-black/10 bg-[#0A0A0A]/90">
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
                      : "text-white/60 hover:text-white border border-black/10"
                  }`}
                  style={{
                    backgroundColor: activeTab === idx ? "#D91C24" : "transparent",
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
                    style={{ color: "#F2C777" }}
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
                      className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-white/10 shadow-xl text-[#FFFFFF] hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline gap-4">
                          <h3
                            className="type-display text-xl sm:text-2xl font-bold leading-tight"
                            style={{ color: "#F2C777" }}
                          >
                            {item.name}
                          </h3>
                          <span className="font-mono font-extrabold text-base sm:text-lg text-black px-3 py-1 rounded-full bg-black/5 flex-shrink-0">
                            ${item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm text-white/70 leading-relaxed">
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
                                backgroundColor: "#D91C2415",
                                color: "#D91C24",
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
