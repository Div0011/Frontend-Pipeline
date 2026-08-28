"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer, { CartItem } from "@/components/marketing/CartDrawer";

interface MenuItem {
  name: string;
  price: string | number;
  desc?: string;
  tags?: string[];
}

interface MenuSection {
  title: string;
  subtitle: string;
  subsections: {
    title: string;
    items: MenuItem[];
  }[];
}

const MENU_DATA: MenuSection[] = [
  {
    title: "🍔 Burgers & Smashes",
    subtitle: "Hand-formed 80/20 prime cuts pressed fresh on 450°F cast iron",
    subsections: [
      {
        title: "Cult Beef & Lamb Smashes",
        items: [
          { name: "The OG Double Smash", price: 470, desc: "Dual coarse ground prime patties, melted sharp cheddar, house pickles, sweet onions, mustard aioli", tags: ["House Signature"] },
          { name: "Oklahoma Onion Smash", price: 520, desc: "Double white onion steam-smashed patties, american cheese, chimichurri, smash sauce", tags: ["Classic"] },
          { name: "Chilli Cheese Smash", price: 550, desc: "Double smash patties, molten chilli cheese blend, roasted sofrito, smash sauce", tags: ["Spicy 🌶️"] },
          { name: "Bacon Chilli Cheese Smash", price: 650, desc: "Double smash patties, smoked bacon, chilli cheese sauce, smash sauce", tags: ["Chef Fav"] },
          { name: "8 Hr. Braised Brisket Smash", price: 650, desc: "Pickled-onion smash patty, bbq slow-braised brisket, molten cheese, smash sauce", tags: ["Reserve"] },
        ],
      },
      {
        title: "Nashville Fried Chicken",
        items: [
          { name: "Nashville Hot Fried Chicken", price: 370, desc: "24-hr buttermilk brined chicken dipped in spiced chili oil, homemade sofrito, pickles, garlic aioli", tags: ["Spicy 🌶️🌶️"] },
          { name: "Buffalo Blue Chicken", price: 370, desc: "Buffalo-sauce-dunked crispy chicken, garlic mayo, grilled onions, crisp lettuce", tags: ["Spicy 🌶️"] },
          { name: "Foster Chicken Smash", price: 420, desc: "Dual smashed chicken patties, american cheese, chimichurri, smash sauce", tags: ["Popular"] },
        ],
      },
      {
        title: "Artisanal Veg Smashes",
        items: [
          { name: "Magic Mushroom Truffle", price: 360, desc: "Multigrain crusted wild mushroom patty, pickled shallots, crisp greens, truffle smash sauce", tags: ["Vegetarian"] },
          { name: "Korean Fried Paneer", price: 360, desc: "Gochujang glazed crispy paneer, fresh chimichurri, pickled slaw, garlic mayo", tags: ["Chef Fav"] },
          { name: "Cheesy Chilli Mac Smash", price: 360, desc: "Fried mac and cheese patty, roasted chilli sofrito, double cheese melt, jalapeños", tags: ["Spicy 🌶️"] },
        ],
      },
    ],
  },
  {
    title: "🍟 Loaded Sides & Crispy Fries",
    subtitle: "Triple-cooked potatoes, bone marrow, and savory dips",
    subsections: [
      {
        title: "Signature Loaded Sides",
        items: [
          { name: "Animal Style Crinkle Fries", price: 338, desc: "Crispy crinkle fries loaded with melted cheese, caramelized onions, and secret smash spread", tags: ["Signature"] },
          { name: "Truffle Parmesan Fries", price: 338, desc: "Hand-cut fries tossed in French black truffle oil, freshly grated parmesan, and sea salt", tags: ["Popular"] },
          { name: "Buffalo Chicken Flings", price: 348, desc: "Tender buttermilk fried chicken chunks dunked in tangy buffalo sauce with garlic aioli", tags: ["Spicy 🌶️"] },
          { name: "Roasted Dino Bone Marrow", price: 448, desc: "Sizzling roasted bone marrow served with toasted garlic brioche and house chimichurri", tags: ["Exhibition"] },
        ],
      },
    ],
  },
  {
    title: "🥤 Hand-Spun Thick Malts & Shakes",
    subtitle: "Spun fresh with double dairy cream and Belgian reductions",
    subsections: [
      {
        title: "Craft Shakes",
        items: [
          { name: "Lotus Biscoff Spiced Malt", price: 290, desc: "Rich vanilla custard base spun with caramelized Belgian Biscoff puree and malt biscuit crumbs", tags: ["Cult Classic"] },
          { name: "Strawberry Cheesecake Thickshake", price: 290, desc: "Real strawberry preserve, cream cheese base, and graham biscuit dust", tags: ["Sweet"] },
          { name: "Salted Pistachio Praline Shake", price: 320, desc: "Slow-roasted Sicilian pistachios with a hint of sea salt and sweet cream", tags: ["Contains Nuts"] },
          { name: "Dark Belgian Chocolate Fudge Shake", price: 290, desc: "Decadent 70% dark Belgian chocolate ganache spun with chocolate fudge chunks", tags: ["Rich"] },
        ],
      },
    ],
  },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: any) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          name: item.name,
          price: typeof item.price === "number" ? item.price : 350,
          quantity: 1,
          description: item.desc,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (name: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0);
    });
  };

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10">
        {/* Banner */}
        <section className="py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span className="font-mono text-xs text-[#F5C418] uppercase tracking-widest font-bold block">
              BEYONDBURG INC. // COMPLETE KITCHEN BOARD
            </span>
            <h1 className="type-display text-5xl md:text-7xl font-extrabold text-white">
              THE FULL CULINARY LINEUP
            </h1>
            <p className="font-mono text-xs text-stone-300 max-w-xl">
              100% fresh coarse-ground prime patties smashed at 450°F on cast iron. Hand-spun Lotus Biscoff malts, loaded animal fries, and chef reserves.
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="sticky top-16 z-30 bg-[#071009]/90 border-b border-white/10 py-4 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {MENU_DATA.map((sec, idx) => (
                <button
                  key={sec.title}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all border font-bold ${
                    activeTab === idx
                      ? "bg-[#F5C418] text-black border-[#F5C418] shadow-lg scale-105"
                      : "bg-white/5 text-stone-400 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {sec.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider bg-[#F5C418] text-black hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>🛒</span>
              <span>Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
            </button>
          </div>
        </section>

        {/* Tab Content Display */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-16"
              >
                <div>
                  <h2 className="type-display text-4xl sm:text-5xl text-white font-extrabold pb-2">
                    {MENU_DATA[activeTab].title}
                  </h2>
                  <p className="font-mono text-xs text-stone-400">
                    {MENU_DATA[activeTab].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {MENU_DATA[activeTab].subsections.map((subsec) => (
                    <div
                      key={subsec.title}
                      className="p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 space-y-6 shadow-2xl"
                    >
                      <div className="border-b border-white/10 pb-3">
                        <h3 className="type-display text-2xl text-[#F5C418] font-bold">
                          {subsec.title}
                        </h3>
                      </div>

                      <div className="space-y-6">
                        {subsec.items.map((item) => (
                          <div
                            key={item.name}
                            className="group border-b border-white/5 pb-4 flex flex-col justify-between"
                          >
                            <div className="flex justify-between items-start mb-2 gap-4">
                              <div>
                                <h4 className="type-display text-xl text-white group-hover:text-[#F5C418] transition-colors font-bold">
                                  {item.name}
                                </h4>
                                {item.desc && (
                                  <p className="type-serif text-stone-300 text-xs leading-relaxed mt-1">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-sm font-bold text-[#F5C418] whitespace-nowrap">
                                  ₹{item.price}
                                </span>
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  className="px-3 py-1 rounded bg-[#F5C418] text-black font-mono text-[10px] font-bold uppercase hover:opacity-90 active:scale-95 transition-all shadow"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8px] font-mono uppercase bg-black/40 text-stone-400 px-2 py-0.5 rounded border border-white/5"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        currency="₹"
        primaryColor="#F5C418"
        textOnPrimary="#000000"
      />

      <Footer />
    </>
  );
}
