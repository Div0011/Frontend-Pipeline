"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import { motion, AnimatePresence } from "framer-motion";

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
    title: "🍔 3/4 lb Chargrilled Monster Burgers",
    subtitle: "Massive 3/4 lb Certified Angus chuck patties chargrilled over raging live flames",
    subsections: [
      {
        title: "Signature Monster Burgers",
        items: [
          { name: "The Amarillo Burger", price: "$13.50", desc: "3/4 lb fresh Certified Angus beef patty chargrilled over live flame, roasted serrano chiles, melted jalapeño jack cheese, and house cilantro mayonnaise on a toasted bun", tags: ["House Legend ⭐", "Triple-D Featured", "Spicy 🌶️"] },
          { name: "The Buffalo Burger", price: "$13.50", desc: "3/4 lb Angus patty grilled over open fire, melted blue cheese crumbles, spicy cayenne buffalo sauce, crisp leaf lettuce, and sliced tomato", tags: ["Blue Cheese", "Spicy Buffalo"] },
          { name: "The Pittsburger", price: "$13.50", desc: "3/4 lb monster burger smothered in melted provolone cheese, sautéed garlic mushrooms, and Casino's rich homemade brown gravy", tags: ["Mushroom Gravy", "Fan Favorite"] },
          { name: "The Los Angeles Burger", price: "$13.00", desc: "3/4 lb chargrilled Angus beef patty, fresh sliced avocado, melted Swiss cheese, crispy thick bacon, and creamy Thousand Island dressing", tags: ["Avocado Bacon"] },
          { name: "The El Camino Classic", price: "$12.00", desc: "3/4 lb monster Angus burger with melted American cheese, crisp lettuce, fresh tomato, red onions, sliced pickles, and mayo", tags: ["3/4 lb Classic"] },
        ],
      },
    ],
  },
  {
    title: "🍟 Pork Verde Fries & Loaded Tots",
    subtitle: "Heaping baskets of scratch pork chile verde fries and Texas chili tots",
    subsections: [
      {
        title: "Sides & Late-Night Bites",
        items: [
          { name: "Pork Verde Chili Cheese Fries", price: "$8.50", desc: "Massive basket of crispy golden fries smothered in scratch-simmered pork chile verde, melted pepper jack, and sliced roasted serranos", tags: ["Must Order ⭐", "Triple-D Famous"] },
          { name: "Loaded Texas Chili Cheese Tots", price: "$7.99", desc: "Crispy tater tots smothered in slow-cooked all-beef Texas chili, melted sharp cheddar cheese, and pickled jalapeño coins", tags: ["Texas Chili"] },
          { name: "Shiner Beer-Battered Onion Rings", price: "$6.50", desc: "Jumbo Texas sweet onions dipped in Shiner Bock beer batter, fried crisp, served with chipotle ranch", tags: ["Beer Battered"] },
          { name: "Basket of Seasoned Steak Fries", price: "$4.99", desc: "Thick-cut Idaho potatoes salted with Casino house steak seasoning", tags: ["Classic"] },
        ],
      },
    ],
  },
  {
    title: "🍹 Loaded Bloody Marys & Cold Pints",
    subtitle: "Austin's most legendary Bloody Mary and cold Texas draft beers",
    subsections: [
      {
        title: "Bar Cocktails & Drafts",
        items: [
          { name: "World-Famous Loaded Bloody Mary", price: "$12.00", desc: "Austin's most legendary Bloody Mary — spicy house mix loaded with a mini burger slider skewer, crispy bacon strip, pickled okra, cocktail olives, and celery", tags: ["Austin Legend ⭐", "Meal in a Glass"] },
          { name: "Lone Star Tallboy & Well Shot", price: "$7.00", desc: "The classic 6th Street rock-and-roll dive bar pairing: ice-cold 16oz Lone Star can with a shot of Texas bourbon or tequila", tags: ["Boilermaker"] },
          { name: "Live Oak Hefeweizen Pint", price: "$6.00", desc: "Austin's premier authentic Bavarian wheat beer on tap", tags: ["Local Draft"] },
          { name: "(512) Pecan Porter", price: "$6.50", desc: "Rich local dark porter brewed with Texas pecans", tags: ["Local Draft"] },
          { name: "Austin Eastciders Original Dry", price: "$5.50", desc: "Crisp bittersweet cider on tap", tags: ["Cider"] },
        ],
      },
    ],
  },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-char text-ink">
        {/* Banner */}
        <section className="py-20 bg-char-soft text-ink relative overflow-hidden border-b border-char-mute">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00E676_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8 relative z-10">
            <p className="type-caption text-ember mb-3 font-bold">517 E 6th St · Est. 1994 · Austin, TX</p>
            <h1 className="type-display text-5xl md:text-7xl lg:text-8xl leading-none text-ink">
              CASINO EL CAMINO<br /><span className="text-ember">MONSTER MENU</span>
            </h1>
            <p className="type-serif text-lg md:text-xl text-stone mt-6 max-w-xl">
              Home of the 3/4 lb Amarillo Burger, roasted serranos, slow-cooked pork chile verde fries, and world-famous loaded Bloody Marys on 6th Street.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="sticky top-18 lg:top-20 z-30 bg-char border-b border-char-mute py-4 backdrop-blur-md">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MENU_DATA.map((sec, idx) => (
                <button
                  key={sec.title}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-3 type-caption text-[10px] border whitespace-nowrap transition-all duration-300 font-bold ${
                    activeTab === idx
                      ? "bg-ember text-char border-ember shadow-[0_0_15px_rgba(0,230,118,0.4)] font-bold"
                      : "bg-transparent text-stone border-char-mute hover:border-ember hover:text-ink"
                  }`}
                >
                  {sec.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content Display */}
        <section className="py-16 bg-char">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
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
                  <h2 className="type-display text-4xl sm:text-5xl text-ink border-b-2 border-ember pb-4 mb-2">
                    {MENU_DATA[activeTab].title}
                  </h2>
                  <p className="type-serif text-stone italic text-lg">
                    {MENU_DATA[activeTab].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {MENU_DATA[activeTab].subsections.map((subsec) => (
                    <div key={subsec.title} className="space-y-8">
                      <div className="border-b border-char-mute pb-2">
                        <h3 className="type-display text-2xl text-ember">
                          {subsec.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-8">
                        {subsec.items.map((item) => (
                          <div key={item.name} className="group border-b border-char-mute/50 pb-4">
                            <div className="flex justify-between items-baseline mb-2 gap-4">
                              <h4 className="type-display text-xl text-ink group-hover:text-ember transition-colors duration-300">
                                {item.name}
                              </h4>
                              <span className="type-label text-ember font-bold text-sm whitespace-nowrap">
                                {item.price}
                              </span>
                            </div>
                            {item.desc && (
                              <p className="type-serif text-stone text-sm leading-relaxed mb-2">
                                {item.desc}
                              </p>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8px] font-mono uppercase bg-char-soft text-ember border border-char-mute px-2 py-0.5"
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

            <div className="border-t border-char-mute mt-24 pt-8 text-center sm:text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 className="type-caption text-ember text-[9px] mb-2 font-bold">🍔 3/4 lb Monster Patties</h5>
                  <p className="type-serif text-stone text-xs leading-relaxed">
                    Hand-formed Certified Angus beef chuck chargrilled fresh over raging flames for maximum smokiness.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-ember text-[9px] mb-2 font-bold">📞 6th Street Bar Call-In</h5>
                  <p className="type-serif text-stone text-xs leading-relaxed">
                    Call (512) 469-9330 for counter pickup or dine in at our dark rock &amp; roll dive bar.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-ember text-[9px] mb-2 font-bold">🌶️ Blistered Serranos</h5>
                  <p className="type-serif text-stone text-xs leading-relaxed">
                    Whole fresh serrano chiles blistered over open fire and smothered in jalapeño jack cheese.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
