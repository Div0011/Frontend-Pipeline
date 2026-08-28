"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  tags?: string[];
}

interface MenuSection {
  category: string;
  badge?: string;
  items: MenuItem[];
}

const MENU_DATA: MenuSection[] = [
  {
    "category": "Grandma & NYC Pies",
    "badge": "01",
    "items": [
      {
        "name": "The Grandma Pie",
        "price": "26.00",
        "desc": "Thin crispy pan crust, fresh mozzarella, signature garlicky crushed San Marzano tomato sauce, fresh basil, and EVOO.",
        "tags": [
          "Legendary \u2b50",
          "House Special"
        ]
      },
      {
        "name": "NYC Pepperoni Round",
        "price": "24.00",
        "desc": "Cupping pepperoni, whole milk mozzarella, aged parmesan, and oregano on an airy crisp crust.",
        "tags": [
          "Fan Favorite"
        ]
      },
      {
        "name": "Sicilian Thick Square",
        "price": "28.00",
        "desc": "Thick airy focaccia-like crust, caramelized crispy cheese corners, rich tomato gravy.",
        "tags": [
          "Deep Dish"
        ]
      },
      {
        "name": "White Pie with Garlic & Ricotta",
        "price": "25.00",
        "desc": "Creamy whipped ricotta, whole milk mozzarella, roasted garlic cloves, and fresh cracked black pepper.",
        "tags": [
          "Garlic Herb"
        ]
      }
    ]
  },
  {
    "category": "Knots, Calzones & Cannolis",
    "badge": "02",
    "items": [
      {
        "name": "Garlic Knots (6 pcs)",
        "price": "6.50",
        "desc": "Freshly twisted pizza dough drenched in garlic butter, fresh parsley, and parmesan, served with warm marinara.",
        "tags": [
          "Must Order \u2b50"
        ]
      },
      {
        "name": "Pepperoni & Cheese Calzone",
        "price": "14.00",
        "desc": "Stuffed with seasoned ricotta, whole milk mozzarella, and cupping pepperoni with hot marinara dip.",
        "tags": [
          "Stuffed"
        ]
      },
      {
        "name": "Authentic Sicilian Cannoli",
        "price": "5.00",
        "desc": "Crispy fried shell filled with sweet orange-kissed ricotta cream and dark chocolate chips.",
        "tags": [
          "Dessert"
        ]
      }
    ]
  }
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(MENU_DATA.map((sec) => sec.category)))];

  const visibleSections =
    selectedCategory === "All"
      ? MENU_DATA
      : MENU_DATA.filter((sec) => sec.category === selectedCategory);

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen relative z-10 select-none pb-24 font-sans">
        
        {/* ── Editorial Menu Header ── */}
        <section className="py-16 sm:py-20 border-b border-black/10 dark:border-white/15">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">
              <span>EST. 2018</span>
              <span>·</span>
              <span style={{ color: "#F2C777" }}>8315 Burnet Rd · Austin, TX</span>
            </div>

            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight text-black dark:text-white">
              PEDROSO'S PIZZA
            </h1>

            <p className="text-xs uppercase font-mono tracking-[0.25em] text-stone-600 dark:text-stone-300">
              DAILY CULINARY SELECTIONS & PROVISIONS
            </p>

            <p className="type-serif text-sm sm:text-base text-stone-700 dark:text-stone-300 max-w-xl mx-auto leading-relaxed pt-2">
              Authentic NYC round pies, crispy Grandmas, thick Sicilian squares, and fresh garlic knots.
            </p>
          </div>
        </section>

        {/* ── Category Filter Strip ── */}
        <section className="sticky top-18 lg:top-20 z-30 py-3.5 backdrop-blur-2xl bg-white/95 dark:bg-[#0A0A0A]/95 border-b border-black/10 dark:border-white/15 shadow-sm">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setSelectedCategory(cat);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "shadow-sm"
                        : "text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#F2C777" : "transparent",
                      color: isActive ? "#000000" : undefined,
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Classic Editorial Menu Card Sheet ── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            
            {/* The Physical Menu Sheet Frame */}
            <div className="space-y-16">
              {visibleSections.map((section, sIdx) => (
                <div key={section.category} className="space-y-6">
                  
                  {/* Category Title with Fine Minimalist Rule */}
                  <div className="flex items-baseline justify-between border-b-2 border-black dark:border-white/20 pb-2.5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-black text-stone-400 dark:text-stone-500">
                        {String(sIdx + 1).padStart(2, "0")}.
                      </span>
                      <h2 className="type-display text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight uppercase">
                        {section.category}
                      </h2>
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 font-semibold">
                      FRESH TO ORDER
                    </span>
                  </div>

                  {/* Minimalist Line Items (NO Tiles, Pure Typography) */}
                  <div className="divide-y divide-black/10 dark:divide-white/10">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        className="py-5 sm:py-6 group transition-colors px-3 -mx-3 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h3 className="font-sans font-bold text-lg sm:text-xl text-black dark:text-white group-hover:transition-colors" style={{ color: undefined }}>
                              {item.name}
                            </h3>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border border-black/15 dark:border-white/20 text-stone-700 dark:text-stone-300 bg-black/5 dark:bg-white/5"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Leader Line + Price + Discreet Order Action */}
                          <div className="flex items-center gap-3.5 flex-shrink-0">
                            <span
                              className="font-mono font-extrabold text-base sm:text-lg text-black dark:text-white"
                              style={{ color: "#F2C777" }}
                            >
                              ${item.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                                alert(`Added ${item.name} to your order!`);
                              }}
                              title="Add to order"
                              className="w-7 h-7 rounded-full border border-black/20 dark:border-white/25 text-black dark:text-white flex items-center justify-center text-xs font-black transition-all hover:scale-110 active:scale-95 shadow-sm"
                              style={{
                                backgroundColor: undefined,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#F2C777";
                                e.currentTarget.style.color = "#000000";
                                e.currentTarget.style.borderColor = "#F2C777";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "";
                                e.currentTarget.style.color = "";
                                e.currentTarget.style.borderColor = "";
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* Editorial Footer Notes */}
            <div className="mt-20 pt-8 border-t border-black/15 dark:border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500 dark:text-stone-400">
              <span>* ALL MEATS FRESH GROUND DAILY & SEARED TO ORDER</span>
              <span>PLEASE NOTIFY OUR STAFF OF ANY DIETARY RESTRICTIONS</span>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
