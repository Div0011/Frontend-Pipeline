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
  badge: string;
  items: MenuItem[];
}

const MENU_DATA: MenuSection[] = [
  {
    "category": "Prime Smash Burgers",
    "badge": "\ud83c\udf54 500\u00b0F FLAT-TOP",
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
    "category": "Sides & Loaded Fries",
    "badge": "\ud83c\udf5f CRISPY CRAFT",
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(MENU_DATA.map((sec) => sec.category)))];

  const visibleSections =
    selectedCategory === "All"
      ? MENU_DATA
      : MENU_DATA.filter((sec) => sec.category === selectedCategory);

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen relative z-10 select-none pb-20">
        {/* Banner Section */}
        <section className="py-16 lg:py-24 border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-extrabold inline-block px-3.5 py-1.5 rounded-full border shadow-sm"
              style={{
                backgroundColor: "#22C55E15",
                borderColor: "#22C55E40",
                color: "#22C55E",
              }}
            >
              Kochi & Bengaluru · Next-Gen Smash Artistry
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight text-black dark:text-white"
            >
              BEYONDBURG INC. <br />
              <span style={{ color: "#22C55E" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed">
              High-temp smash burgers, smashed bone marrow, artisan potato buns, and craft sodas.
            </p>
          </div>
        </section>

        {/* Category Tabs Sticky Filter Bar */}
        <section className="sticky top-18 lg:top-20 z-30 py-4 backdrop-blur-xl bg-white/90 dark:bg-[#0A0A0A]/90 border-b border-black/10 dark:border-white/10 shadow-lg">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setSelectedCategory(cat);
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "shadow-xl scale-105"
                        : "bg-black/5 dark:bg-white/5 text-stone-700 dark:text-stone-300 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#22C55E" : undefined,
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

        {/* Menu Slabs Container - Fully Visible & Hydrated */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
            {visibleSections.map((section) => (
              <div key={section.category} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
                  <h2 className="type-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white">
                    {section.category}
                  </h2>
                  <span
                    className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border"
                    style={{
                      backgroundColor: "#22C55E15",
                      borderColor: "#22C55E35",
                      color: "#22C55E",
                    }}
                  >
                    {section.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border-2 border-black/10 dark:border-white/15 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="type-display text-2xl sm:text-3xl font-black text-black dark:text-white leading-tight">
                            {item.name}
                          </h3>
                          <span
                            className="font-mono font-extrabold text-sm sm:text-base px-3.5 py-1.5 rounded-full flex-shrink-0 shadow"
                            style={{
                              backgroundColor: "#22C55E",
                              color: "#000000",
                            }}
                          >
                            ₹{item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-3 border-t border-black/5 dark:border-white/10">
                        {item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/15 text-stone-800 dark:text-stone-200"
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
                          className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 flex-shrink-0"
                          style={{
                            backgroundColor: "#22C55E",
                            color: "#000000",
                          }}
                        >
                          Order +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
