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
    "category": "Gourmet French Burgers",
    "badge": "\ud83c\udf54 ARTISAN BRIOCHE",
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
    "category": "Sides & Shakes",
    "badge": "\ud83c\udf5f ARTISANAL CRAFT",
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
                backgroundColor: "#41804315",
                borderColor: "#41804340",
                color: "#418043",
              }}
            >
              Indiranagar & Forum Rex · Bengaluru
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight text-black dark:text-white"
            >
              BURGER SEIGNEUR <br />
              <span style={{ color: "#418043" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed">
              Artisanal gourmet burgers, brioche buns baked fresh daily, and signature crafted milkshakes.
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
                      backgroundColor: isActive ? "#418043" : undefined,
                      color: isActive ? "#FFFFFF" : undefined,
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
                      backgroundColor: "#41804315",
                      borderColor: "#41804335",
                      color: "#418043",
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
                              backgroundColor: "#418043",
                              color: "#FFFFFF",
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
                            backgroundColor: "#418043",
                            color: "#FFFFFF",
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
