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
    title: "🍔 Smashed Border Burgers",
    subtitle: "1/3 lb fresh Angus chuck smashed with diced grilled onions on screaming cast iron",
    subsections: [
      {
        title: "Signature Smash Burgers",
        items: [
          { name: "The Oy Vey Goy", price: "$10.50", desc: "1/3 lb fresh Angus chuck smashed with diced grilled onions, smoked bacon, crispy potato latke, melted cheddar & pepper jack, and Homeboy sauce on a steamed Martin's potato bun", tags: ["House Legend ⭐", "Latke Burger"] },
          { name: "The Schmoozer", price: "$9.75", desc: "Smashed Angus patty with grilled onions, roasted Hatch green chiles, melted pepper jack cheese, yellow mustard, and pickles on a steamed potato bun", tags: ["Hatch Green Chile 🌶️", "Border Style"] },
          { name: "The Goy Vey", price: "$9.50", desc: "Smashed Angus beef with caramelized grilled onions, crispy smoked bacon, double melted sharp cheddar, and Homeboy sauce on a steamed Martin's bun", tags: ["Bacon Cheddar"] },
          { name: "The Yenta Burger", price: "$8.99", desc: "Smashed beef patty with grilled onions, melted Swiss cheese, sautéed garlic mushrooms, and savory herb spread", tags: ["Mushroom Swiss"] },
          { name: "The Down Home Double", price: "$11.50", desc: "Two 1/3 lb Angus patties smashed hot with grilled onions, double American cheese, crinkle-cut pickles, mustard, and shredded lettuce", tags: ["Double Stack"] },
        ],
      },
    ],
  },
  {
    title: "🥔 Crispy Latkes & Loaded Fries",
    subtitle: "Scratch-made potato latkes and Hatch green chile queso fries",
    subsections: [
      {
        title: "Sides & Comfort Starters",
        items: [
          { name: "Crispy Potato Latkes & Queso", price: "$5.99", desc: "Two golden scratch-made shredded potato latkes fried crisp, served with warm Hatch green chile queso and sour cream", tags: ["Must Order ⭐", "Scratch Latkes"] },
          { name: "Hatch Green Chile Cheese Fries", price: "$6.49", desc: "Crispy Idaho french fries smothered in warm green chile queso, grilled onions, pickled jalapeños, and bacon crumbles", tags: ["Loaded Fries 🌶️"] },
          { name: "Thick-Cut Onion Rings", price: "$4.99", desc: "Jumbo sweet Texas onions in seasoned cornmeal batter, served with spicy Homeboy dipping sauce", tags: ["Cornmeal Crust"] },
          { name: "Fresh Cut Fries with Homeboy Sauce", price: "$3.99", desc: "Golden fried Idaho potatoes dusted with house border seasoning", tags: ["Classic"] },
        ],
      },
    ],
  },
  {
    title: "🥤 Churro Shakes, Aguas & Cold Drafts",
    subtitle: "Hand-spun Mexican chocolate shakes and fresh fruit aguas frescas",
    subsections: [
      {
        title: "Fountain, Shakes & Beers",
        items: [
          { name: "Mexican Chocolate Churro Shake", price: "$5.75", desc: "Thick hand-dipped vanilla ice cream spun with Abuelita Mexican chocolate, ground cinnamon, and topped with churro crumbles", tags: ["Specialty Shake ⭐"] },
          { name: "Fresh Hibiscus Jamaica Agua Fresca", price: "$3.99", desc: "Scratch-steeped sweet hibiscus flower tea served ice-cold with fresh lime", tags: ["Agua Fresca"] },
          { name: "Horchata de la Casa", price: "$3.99", desc: "Traditional rice milk with cinnamon and pure vanilla", tags: ["House Made"] },
          { name: "Austin Beerworks Pearl-Snap Draft", price: "$5.50", desc: "Crisp local Austin pilsner on draft in a frosted glass mug", tags: ["Local Draft"] },
          { name: "Mexican Coke & Dr Pepper", price: "$3.25", desc: "Glass bottle Mexican cane sugar sodas", tags: ["Glass Bottle"] },
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
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF8F2_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8 relative z-10">
            <p className="type-caption text-[#FFFFFF] mb-3 font-bold">5111 Airport Blvd · Shalom Y&apos;all!</p>
            <h1 className="type-display text-5xl md:text-7xl lg:text-8xl leading-none text-ink">
              JEWBOY BURGERS<br /><span className="text-[#FFFFFF]">BORDER MENU</span>
            </h1>
            <p className="type-serif text-lg md:text-xl text-stone mt-6 max-w-xl">
              Home of The Oy Vey Goy, crispy potato latkes with Hatch green chile queso, Mexican chocolate churro shakes, and flat-top Angus burgers smashed into onions.
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
                      ? "bg-ember text-bone border-ember shadow-md"
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
                  <p className="type-serif text-smoke italic text-lg">
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
                              <p className="type-serif text-smoke text-sm leading-relaxed mb-2">
                                {item.desc}
                              </p>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8px] font-mono uppercase bg-char text-[#FFFFFF] px-2 py-0.5"
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
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">🍔 Smashed on Onions</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    Every 1/3 lb Angus patty is pressed firmly into diced sweet Texas onions on screaming cast iron.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">📞 Airport Blvd Pickup</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    Call (512) 291-3358 for quick counter pickup or enjoy your meal on our sunny patio.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">🥔 Scratch Latkes</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    Shredded and fried golden crisp daily — served with warm Hatch green chile queso.
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
