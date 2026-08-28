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
    title: "🍔 Legendary Flat-Top Burgers",
    subtitle: "Seared hot on our 100-year seasoned cast iron flat-top griddle",
    subsections: [
      {
        title: "Signature Classics",
        items: [
          { name: "The OT Special", price: "$8.99", desc: "Two seared Angus chuck patties, double sharp cheddar, and grilled onions pressed between thick golden buttered Texas toast", tags: ["House Legend", "100-Year Recipe"] },
          { name: "The DH Special", price: "$8.49", desc: "Two 100% Angus patties, double melted Swiss cheese, sautéed mushrooms, and caramelized onions on a grilled sesame bun", tags: ["Mushroom Swiss", "Fan Favorite"] },
          { name: "The K-Bar Bacon Cheeseburger", price: "$8.99", desc: "Hand-pressed Angus beef, thick-cut crispy bacon, double melted American cheese, crinkle-cut pickles, and mustard", tags: ["Bacon Classic"] },
          { name: "Original Kum-Bak Burger", price: "$6.99", desc: "The original 1926 recipe: Fresh Angus patty seared hot on our seasoned flat-top, mustard, sliced pickles, and diced white onions", tags: ["Est. 1926"] },
          { name: "Texas Chili Cheeseburger", price: "$8.99", desc: "Angus burger smothered in Dirty Martin's slow-simmered Texas red beef chili, melted cheddar, and onions", tags: ["Texas Chili"] },
        ],
      },
    ],
  },
  {
    title: "🍟 Famous Sides & Chili",
    subtitle: "Crispy tater tots and scratch buttermilk onion rings",
    subsections: [
      {
        title: "Sides Made Fresh to Order",
        items: [
          { name: "Dirty's Famous Tater Tots", price: "$4.29 / $6.49", desc: "The most famous tots on The Drag. Extra crispy golden cylinders seasoned in Dirty's house paprika salt blend", tags: ["Must Order ⭐", "Famous Tots"] },
          { name: "Hand-Battered Onion Rings", price: "$4.99 / $7.29", desc: "Fresh sweet Texas onions sliced daily, dipped in scratch buttermilk batter and fried dark golden crisp", tags: ["Scratch Batter"] },
          { name: "Homestyle French Fries", price: "$3.49 / $5.29", desc: "Golden cut Idaho potatoes salted hot from the kettle", tags: ["Classic"] },
          { name: "Dirty's Texas Chili Bowl", price: "$5.49", desc: "Slow-simmered all-beef chili without beans, topped with sharp shredded cheddar and diced onions", tags: ["Homemade"] },
        ],
      },
    ],
  },
  {
    title: "🥤 Shakes, Malts & Drafts",
    subtitle: "Hand-spun fountain shakes and cold Texas beers on tap",
    subsections: [
      {
        title: "Fountain Treats & Beers",
        items: [
          { name: "Longhorn Burnt Orange Shake", price: "$5.49", desc: "Thick vanilla ice cream churned with Texas sweet orange citrus syrup and crushed vanilla wafers", tags: ["UT Longhorn ⭐"] },
          { name: "Classic Chocolate Malt", price: "$4.99", desc: "Hand-dipped ice cream spun in stainless cups with pure malted barley powder and dark chocolate syrup", tags: ["Fountain Classic"] },
          { name: "Fresh Strawberry Shake", price: "$4.99", desc: "Hand-spun vanilla ice cream blended with sweet Texas strawberries and whipped cream", tags: ["Real Fruit"] },
          { name: "Shiner Bock Draft", price: "$5.00", desc: "Ice-cold Texas dark lager poured in a frosted glass mug", tags: ["Draft Beer"] },
          { name: "Fountain Sodas & Iced Tea", price: "$2.79", desc: "Dr Pepper, Coca-Cola, Sprite, and Southern Sweet Iced Tea", tags: ["Free Refills"] },
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
      <main className="pt-24 min-h-screen bg-bone text-char">
        {/* Banner */}
        <section className="py-20 bg-char text-ink relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F7F4EA_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8 relative z-10">
            <p className="type-caption text-[#C68A14] mb-3 font-bold">2808 Guadalupe St · Est. 1926</p>
            <h1 className="type-display text-5xl md:text-7xl lg:text-8xl leading-none text-ink">
              DIRTY MARTIN&apos;S<br /><span className="text-ember">CENTENNIAL MENU</span>
            </h1>
            <p className="type-serif text-lg md:text-xl text-stone mt-6 max-w-xl">
              100 years of the OT Special, sizzling flat-top smash burgers, famous crispy tater tots, and ice-cold drafts on The Drag.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="sticky top-18 lg:top-20 z-30 bg-bone border-b border-bone-dark py-4 backdrop-blur-md">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MENU_DATA.map((sec, idx) => (
                <button
                  key={sec.title}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-3 type-caption text-[10px] border whitespace-nowrap transition-all duration-300 font-bold ${
                    activeTab === idx
                      ? "bg-ember text-bone border-ember"
                      : "bg-transparent text-smoke border-bone-dark hover:border-ember hover:text-char"
                  }`}
                >
                  {sec.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content Display */}
        <section className="py-16">
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
                  <h2 className="type-display text-4xl sm:text-5xl text-char border-b-2 border-ember pb-4 mb-2">
                    {MENU_DATA[activeTab].title}
                  </h2>
                  <p className="type-serif text-[#4B5563] italic text-lg">
                    {MENU_DATA[activeTab].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {MENU_DATA[activeTab].subsections.map((subsec) => (
                    <div key={subsec.title} className="space-y-8">
                      <div className="border-b border-bone-dark pb-2">
                        <h3 className="type-display text-2xl text-ember">
                          {subsec.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-8">
                        {subsec.items.map((item) => (
                          <div key={item.name} className="group border-b border-bone-dark/50 pb-4">
                            <div className="flex justify-between items-baseline mb-2 gap-4">
                              <h4 className="type-display text-xl text-char group-hover:text-ember transition-colors duration-300">
                                {item.name}
                              </h4>
                              <span className="type-label text-char font-bold text-sm whitespace-nowrap">
                                {item.price}
                              </span>
                            </div>
                            {item.desc && (
                              <p className="type-serif text-[#4B5563] text-sm leading-relaxed mb-2">
                                {item.desc}
                              </p>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8px] font-mono uppercase bg-char text-[#C68A14] px-2 py-0.5"
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

            <div className="border-t border-bone-dark mt-24 pt-8 text-center sm:text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">🍔 100-Year Flat-Top</h5>
                  <p className="type-serif text-[#4B5563] text-xs leading-relaxed">
                    Patties seared fresh on our seasoned flat top since 1926. Crispy caramelized edges and maximum flavor.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">📞 The Drag Pickup</h5>
                  <p className="type-serif text-[#4B5563] text-xs leading-relaxed">
                    Call (512) 477-3173 ahead of time and your order will be boxed fresh for counter pickup.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">🍺 Cold Pints on Tap</h5>
                  <p className="type-serif text-[#4B5563] text-xs leading-relaxed">
                    Pair your burger with cold Shiner Bock and Texas craft drafts on our patio or historic counter.
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
