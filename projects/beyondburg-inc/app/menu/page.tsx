"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer, { CartItem } from "@/components/marketing/CartDrawer";

interface MenuItem {
  name: string;
  price: number;
  desc?: string;
  tags?: string[];
  isVeg?: boolean;
}

interface MenuSection {
  title: string;
  category: string;
  items: MenuItem[];
}

const MENU_DATA: MenuSection[] = [
  {
    title: "Signature Smashes",
    category: "burgers",
    items: [
      { name: "The OG Double Smash", price: 470, desc: "Dual coarse ground prime patties, melted sharp cheddar, house pickles, sweet onions, mustard aioli", tags: ["Signature"], isVeg: false },
      { name: "Oklahoma Onion Smash", price: 520, desc: "Double white onion steam-smashed patties, american cheese, chimichurri, smash sauce", tags: ["Classic"], isVeg: false },
      { name: "Chilli Cheese Smash", price: 550, desc: "Double smash patties, molten chilli cheese blend, roasted sofrito, smash sauce", tags: ["Spicy"], isVeg: false },
      { name: "Bacon Chilli Cheese Smash", price: 650, desc: "Double smash patties, smoked bacon, chilli cheese sauce, smash sauce", tags: ["Chef Reserve"], isVeg: false },
      { name: "8 Hr. Braised Brisket Smash", price: 650, desc: "Pickled-onion smash patty, bbq slow-braised brisket, molten cheese, smash sauce", tags: ["Reserve"], isVeg: false },
      { name: "Magic Mushroom Truffle", price: 360, desc: "Multigrain crusted wild mushroom patty, pickled shallots, crisp greens, truffle smash sauce", tags: ["Vegetarian"], isVeg: true },
      { name: "Korean Fried Paneer", price: 360, desc: "Gochujang glazed crispy paneer, fresh chimichurri, pickled slaw, garlic mayo", tags: ["Vegetarian"], isVeg: true },
      { name: "Cheesy Chilli Mac Smash", price: 360, desc: "Fried mac and cheese patty, roasted chilli sofrito, double cheese melt, jalapeños", tags: ["Vegetarian"], isVeg: true },
    ],
  },
  {
    title: "Crispy Fried Chicken",
    category: "chicken",
    items: [
      { name: "Nashville Hot Fried Chicken", price: 370, desc: "24-hr buttermilk brined chicken dipped in spiced chili oil, homemade sofrito, pickles, garlic aioli", tags: ["Spicy"], isVeg: false },
      { name: "Buffalo Blue Chicken", price: 370, desc: "Buffalo-sauce-dunked crispy chicken, garlic mayo, grilled onions, crisp lettuce", tags: ["Spicy"], isVeg: false },
      { name: "Foster Chicken Smash", price: 420, desc: "Dual smashed chicken patties, american cheese, chimichurri, smash sauce", tags: ["Popular"], isVeg: false },
    ],
  },
  {
    title: "Loaded Sides & Fries",
    category: "sides",
    items: [
      { name: "Animal Style Crinkle Fries", price: 338, desc: "Crispy crinkle fries loaded with melted cheese, caramelized onions, and secret smash spread", tags: ["Signature"], isVeg: true },
      { name: "Truffle Parmesan Fries", price: 338, desc: "Hand-cut fries tossed in French black truffle oil, freshly grated parmesan, and sea salt", tags: ["Popular"], isVeg: true },
      { name: "Buffalo Chicken Flings", price: 348, desc: "Tender buttermilk fried chicken chunks dunked in tangy buffalo sauce with garlic aioli", tags: ["Spicy"], isVeg: false },
      { name: "Roasted Bone Marrow", price: 448, desc: "Sizzling roasted bone marrow served with toasted garlic brioche and house chimichurri", tags: ["Exhibition"], isVeg: false },
    ],
  },
  {
    title: "Hand-Spun Malts & Shakes",
    category: "shakes",
    items: [
      { name: "Lotus Biscoff Spiced Malt", price: 290, desc: "Rich vanilla custard base spun with caramelized Belgian Biscoff puree and malt biscuit crumbs", tags: ["Signature"], isVeg: true },
      { name: "Strawberry Cheesecake Thickshake", price: 290, desc: "Real strawberry preserve, cream cheese base, and graham biscuit dust", tags: ["Sweet"], isVeg: true },
      { name: "Salted Pistachio Praline Shake", price: 320, desc: "Slow-roasted Sicilian pistachios with a hint of sea salt and sweet cream", tags: ["Artisanal"], isVeg: true },
      { name: "Dark Belgian Chocolate Fudge Shake", price: 290, desc: "Decadent 70% dark Belgian chocolate ganache spun with chocolate fudge chunks", tags: ["Rich"], isVeg: true },
    ],
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState("");
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
          price: Number(item.price),
          quantity: 1,
          description: item.desc,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (name: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const categories = [
    { id: "all", label: "Full Lineup" },
    { id: "burgers", label: "Burgers" },
    { id: "chicken", label: "Chicken" },
    { id: "sides", label: "Sides" },
    { id: "shakes", label: "Malts & Shakes" },
  ];

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 select-none font-sans">
        {/* Page Hero */}
        <section className="py-16 sm:py-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest block text-[#F5C418]">
              CULINARY CATALOGUE
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white leading-none">
                THE CRAFT MENU
              </h1>

              {/* Search & Bag Button */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes..."
                    className="px-4 py-2.5 pl-9 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors w-52 sm:w-64 font-medium"
                  />
                  <svg className="w-3.5 h-3.5 absolute left-3.5 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5C418] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl"
                >
                  Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap border ${
                      selectedCategory === cat.id
                        ? "bg-[#F5C418] text-black border-[#F5C418] shadow-md"
                        : "bg-white/5 text-stone-300 border-white/10 hover:border-white/25"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Dietary Filter */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setDietaryFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase ${
                    dietaryFilter === "all" ? "bg-white/20 text-white" : "text-stone-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setDietaryFilter("veg")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase ${
                    dietaryFilter === "veg" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "text-stone-400 hover:text-white"
                  }`}
                >
                  Veg
                </button>
                <button
                  type="button"
                  onClick={() => setDietaryFilter("non-veg")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase ${
                    dietaryFilter === "non-veg" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-stone-400 hover:text-white"
                  }`}
                >
                  Non-Veg
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Sections Grid */}
        <section className="py-12 max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
          {MENU_DATA.filter((sec) => selectedCategory === "all" || sec.category === selectedCategory).map((sec, sIdx) => {
            const filteredItems = sec.items.filter((item) => {
              const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesDiet =
                dietaryFilter === "all" ||
                (dietaryFilter === "veg" && item.isVeg) ||
                (dietaryFilter === "non-veg" && !item.isVeg);
              return matchesSearch && matchesDiet;
            });

            if (filteredItems.length === 0) return null;

            return (
              <div key={sIdx} className="space-y-6">
                <h2 className="type-display text-3xl sm:text-4xl text-white font-extrabold pb-3 border-b border-white/10">
                  {sec.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, iIdx) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -2 }}
                      className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="type-display text-2xl text-white font-bold leading-tight">
                            {item.name}
                          </h3>
                          <span className="text-sm font-extrabold px-3 py-1 rounded-full border border-[#F5C418]/40 text-[#F5C418] bg-[#F5C418]/10 whitespace-nowrap">
                            ₹{item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="text-xs text-stone-300 leading-relaxed font-body">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        {Array.isArray(item.tags) && item.tags.length > 0 && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-stone-400 border border-white/10 font-semibold">
                            {item.tags[0]}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5C418] text-black hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1 ml-auto"
                        >
                          <span>Add</span>
                          <span>+</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>

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
