import os, json

archetypes = {
    # 1. Heritage Diners
    'dans-burgers': {'type': 'heritage', 'primary': '#D97706', 'text_on_primary': '#FFFFFF', 'currency': '$', 'year': '1973', 'landmark': 'Manchaca Rd, Austin'},
    'dirty-martins': {'type': 'heritage', 'primary': '#BF5700', 'text_on_primary': '#FFFFFF', 'currency': '$', 'year': '1926', 'landmark': '2808 Guadalupe St, Austin'},
    'jewboy-burgers': {'type': 'heritage', 'primary': '#06B6D4', 'text_on_primary': '#000000', 'currency': '$', 'year': '2016', 'landmark': 'Airport Blvd, Austin'},
    'burger-bar-austin': {'type': 'heritage', 'primary': '#2563EB', 'text_on_primary': '#FFFFFF', 'currency': '$', 'year': '1953', 'landmark': 'Congress Ave, Austin'},

    # 2. Haute Gourmet
    'burger-seigneur': {'type': 'haute', 'primary': '#C8A96E', 'text_on_primary': '#000000', 'currency': '₹', 'specialty': 'Truffled Forest Mushrooms & French Brioche'},
    'louis-burger': {'type': 'haute', 'primary': '#D4AF37', 'text_on_primary': '#000000', 'currency': '₹', 'specialty': '24K Edible Gold Leaf & Japanese Wagyu'},
    'beyondburg-inc': {'type': 'haute', 'primary': '#F5C418', 'text_on_primary': '#000000', 'currency': '₹', 'specialty': 'Smashed Prime Cuts & Biscoff Malts'},
    'nadc-burger': {'type': 'haute', 'primary': '#FFFFFF', 'text_on_primary': '#000000', 'currency': '$', 'specialty': '100% Texas Akaushi Wagyu & Duck Fat Tallow'},

    # 3. Cult Garages
    'sankys-burger-house': {'type': 'garage', 'primary': '#FFE500', 'text_on_primary': '#000000', 'currency': '₹', 'open_till': '3:00 AM', 'location': 'Hennur Garage'},
    'casino-el-camino': {'type': 'garage', 'primary': '#DC2626', 'text_on_primary': '#FFFFFF', 'currency': '$', 'open_till': '2:00 AM', 'location': '6th Street Austin'},
    'simon-burgers': {'type': 'garage', 'primary': '#DC2626', 'text_on_primary': '#FFFFFF', 'currency': '₹', 'open_till': '2:30 AM', 'location': 'Kammanahalli'},
    'backyard-burgers': {'type': 'garage', 'primary': '#E67E22', 'text_on_primary': '#000000', 'currency': '₹', 'open_till': '1:00 AM', 'location': 'Koramangala'},

    # 4. Stone-Baked / Fermentation
    'pedrosos-pizza': {'type': 'ferment', 'primary': '#B91C1C', 'text_on_primary': '#FFFFFF', 'currency': '$', 'hours': '72 Hours', 'temp': '650°F'},
    'little-deli-pizzeria': {'type': 'ferment', 'primary': '#166534', 'text_on_primary': '#FFFFFF', 'currency': '$', 'hours': '48 Hours', 'temp': '650°F'},
    'sour-duck-market': {'type': 'ferment', 'primary': '#EA580C', 'text_on_primary': '#FFFFFF', 'currency': '$', 'hours': '36 Hours', 'temp': 'Live Post Oak'},

    # 5. Fast-Casual Crunch
    'leons-burgers': {'type': 'fast_casual', 'primary': '#B12727', 'text_on_primary': '#FFFFFF', 'currency': '₹', 'spice_default': 'Nashville Hot'},
    'biggies-burger': {'type': 'fast_casual', 'primary': '#F26522', 'text_on_primary': '#FFFFFF', 'currency': '₹', 'spice_default': 'Smoky Charbroil'},
    'good-flippin-burgers': {'type': 'fast_casual', 'primary': '#BE123C', 'text_on_primary': '#FFFFFF', 'currency': '₹', 'spice_default': 'Peri-Peri Crunch'},
    'burger-elite': {'type': 'fast_casual', 'primary': '#7C3AED', 'text_on_primary': '#FFFFFF', 'currency': '₹', 'spice_default': 'Street Royale'},
    'burgerman': {'type': 'fast_casual', 'primary': '#15803D', 'text_on_primary': '#FFFFFF', 'currency': '₹', 'spice_default': 'Flame Herb'},
    'truffles-bangalore': {'type': 'fast_casual', 'primary': '#F5A623', 'text_on_primary': '#000000', 'currency': '₹', 'spice_default': 'Classic All-American'},
    'pool-burger': {'type': 'fast_casual', 'primary': '#F43F5E', 'text_on_primary': '#FFFFFF', 'currency': '$', 'spice_default': 'Island Jalapeño'},
    'smash-guys': {'type': 'fast_casual', 'primary': '#F5C418', 'text_on_primary': '#000000', 'currency': '₹', 'spice_default': 'Maillard Original'},
    'original-burger-co': {'type': 'fast_casual', 'primary': '#2563EB', 'text_on_primary': '#FFFFFF', 'currency': '₹', 'spice_default': 'Bacon Jam Melt'},
}

# 1. CartDrawer component
cart_drawer_template = '''"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (name: string, delta: number) => void;
  currency?: string;
  primaryColor?: string;
  textOnPrimary?: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  currency = "__CURRENCY__",
  primaryColor = "__PRIMARY__",
  textOnPrimary = "__TEXT_ON_PRIMARY__",
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#0e0e11] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="type-display text-2xl font-bold tracking-wide">
                    YOUR ORDER SELECTIONS
                  </h2>
                  <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} Items Added
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 space-y-3">
                    <span className="text-4xl">🛍️</span>
                    <p className="font-mono text-xs uppercase tracking-wider">
                      Your order drawer is currently empty
                    </p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-sm font-mono text-xs font-bold uppercase tracking-wider border"
                      style={{ borderColor: `${primaryColor}40`, color: primaryColor }}
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.name}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <h4 className="font-mono font-bold text-sm text-white">
                          {item.name}
                        </h4>
                        <p className="font-mono text-xs" style={{ color: primaryColor }}>
                          {currency}{item.price} each
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.name, -1)}
                          className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-mono text-sm font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.name, 1)}
                          className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#070709] space-y-4">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-xs text-stone-400 uppercase tracking-wider">
                      Estimated Subtotal
                    </span>
                    <span className="text-xl font-bold" style={{ color: primaryColor }}>
                      {currency}{subtotal}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      alert("Redirecting to online order checkout...");
                    }}
                    className="w-full py-3.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-98"
                    style={{
                      backgroundColor: primaryColor,
                      color: textOnPrimary,
                    }}
                  >
                    Proceed to Order Online ({currency}{subtotal}) →
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
'''

# 2. Archetype Showcase components
heritage_showcase = '''"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ArchetypeShowcase() {
  const [activeReceipt, setActiveReceipt] = useState(false);

  const milestones = [
    { year: "__YEAR__", event: "Founding Flat-Top Seasoned", desc: "First burger served with the original family spice formula." },
    { year: "1995", event: "Austin Iconic Landmark Status", desc: "Recognized as a premier city culinary institution." },
    { year: "2024", event: "Centennial Craft Mastery", desc: "Over a million legendary burgers griddled on cast iron." }
  ];

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#0a0a0c] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__PRIMARY__" }}>
              ARCHIVAL RETRO MILESTONES
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold mt-1">
              HERITAGE &amp; TIMELESS CRAFT
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-400">
            EST. __YEAR__ · __LANDMARK__
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <span className="type-display text-3xl font-black" style={{ color: "__PRIMARY__" }}>
                {m.year}
              </span>
              <h4 className="font-mono font-bold text-sm uppercase text-white">
                {m.event}
              </h4>
              <p className="text-xs text-stone-400 font-body leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

haute_showcase = '''"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ArchetypeShowcase() {
  const [selectedPairing, setSelectedPairing] = useState(0);

  const pairings = [
    { title: "French Black Truffle Glaze", note: "Simmered 4 hours with Porcini mushrooms & cultured Normandy butter." },
    { title: "24K Gold Wagyu Lamination", note: "Artisanal brioche toasted in sweet cream butter with Akaushi beef." },
    { title: "Aged Belgian Speculoos Malt", note: "Handcrafted dairy cream thickshake with spiced Biscoff reduction." }
  ];

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#08080a] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__PRIMARY__" }}>
              HAUTE ATELIER GASTRONOMY
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold mt-1">
              THE PAIRING SELECTOR
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-400">
            __SPECIALTY__
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pairings.map((p, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPairing(idx)}
              className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                selectedPairing === idx ? "bg-white/10 border-white/30" : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full mb-4" style={{ backgroundColor: selectedPairing === idx ? "__PRIMARY__" : "#555" }} />
              <h4 className="font-mono font-bold text-sm uppercase text-white">
                {p.title}
              </h4>
              <p className="text-xs text-stone-400 font-body leading-relaxed mt-2">
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

garage_showcase = '''"use client";

import React from "react";

export default function ArchetypeShowcase() {
  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#0a0a0d] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-emerald-400">
                LIVE GARAGE STATUS · ACTIVE NOW
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold">
              THE UNDERGROUND CULT KITCHEN
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-400">
            OPEN UNTIL __OPEN_TILL__ · __LOCATION__
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-mono text-[10px] uppercase text-stone-500">CAST-IRON TEMPERATURE</span>
            <p className="type-display text-3xl font-bold" style={{ color: "__PRIMARY__" }}>485°F HIGH SEAR</p>
            <p className="text-xs text-stone-400">Continuous sizzling cast-iron surface for instant Maillard crust.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-mono text-[10px] uppercase text-stone-500">LATE-NIGHT SERVICE</span>
            <p className="type-display text-3xl font-bold" style={{ color: "__PRIMARY__" }}>TILL __OPEN_TILL__</p>
            <p className="text-xs text-stone-400">Serving midnight cravings across __LOCATION__ every night.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-mono text-[10px] uppercase text-stone-500">MONSTER PATTY WEIGHT</span>
            <p className="type-display text-3xl font-bold" style={{ color: "__PRIMARY__" }}>100% PRIME CUTS</p>
            <p className="text-xs text-stone-400">Double thick patties layered with melted cheese and monster sauce.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

ferment_showcase = '''"use client";

import React, { useState } from "react";

export default function ArchetypeShowcase() {
  const [activeCrust, setActiveCrust] = useState("roman");

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#09090b] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__PRIMARY__" }}>
              NATURAL FERMENTATION &amp; DECK SCIENCE
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold mt-1">
              THE ARTISANAL CRUST LAB
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-400">
            __HOURS__ COLD FERMENT · __TEMP__ BAKE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <span className="type-display text-4xl font-black" style={{ color: "__PRIMARY__" }}>__HOURS__</span>
            <h4 className="font-mono font-bold text-sm uppercase text-white">COLD DOUGH FERMENTATION</h4>
            <p className="text-xs text-stone-400">Breaks down complex gluten structures for an ultra-light, airy, crisp crumb.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <span className="type-display text-4xl font-black" style={{ color: "__PRIMARY__" }}>__TEMP__</span>
            <h4 className="font-mono font-bold text-sm uppercase text-white">REFRACTORY STONE DECK</h4>
            <p className="text-xs text-stone-400">Direct contact heat baking that produces intense bottom crunch &amp; leopard spots.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <span className="type-display text-4xl font-black" style={{ color: "__PRIMARY__" }}>100% D.O.P.</span>
            <h4 className="font-mono font-bold text-sm uppercase text-white">AUTHENTIC SAN MARZANO</h4>
            <p className="text-xs text-stone-400">Hand-crushed Campania tomatoes paired with whole milk mozzarella.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

fast_casual_showcase = '''"use client";

import React, { useState } from "react";

export default function ArchetypeShowcase() {
  const [heatLevel, setHeatLevel] = useState(2);

  const heatStages = [
    { name: "MILD BUTTER", desc: "Creamy, smooth sweet-cream butter glaze with zero heat." },
    { name: "MEDIUM SIGNATURE", desc: "Balanced smoked paprika, black pepper, and garlic herb crunch." },
    { name: "PERI-PERI BLAZE", desc: "Fiery African bird's eye chili oil with citrus zest." },
    { name: "NASHVILLE INFERNO", desc: "Extreme ghost pepper and habanero dipped crispy coating." }
  ];

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#08080b] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__PRIMARY__" }}>
              INTERACTIVE SPICE HEAT METER
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold mt-1">
              CHOOSE YOUR HEAT LEVEL
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-400">
            DEFAULT: __SPICE_DEFAULT__
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {heatStages.map((stage, idx) => (
            <button
              key={idx}
              onClick={() => setHeatLevel(idx)}
              className={`p-5 rounded-xl border text-left transition-all duration-300 ${
                heatLevel === idx ? "bg-white/10 border-white/40" : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <span className="font-mono text-xs font-bold block mb-1" style={{ color: heatLevel === idx ? "__PRIMARY__" : "#888" }}>
                STAGE 0{idx + 1}
              </span>
              <h4 className="font-mono font-bold text-sm uppercase text-white">
                {stage.name}
              </h4>
              <p className="text-xs text-stone-400 mt-2 line-clamp-2">
                {stage.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

for slug, cfg in archetypes.items():
    p_path = os.path.join('projects', slug)
    if not os.path.exists(p_path):
        continue

    # 1. Write CartDrawer.tsx
    cart_code = cart_drawer_template.replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg.get('text_on_primary', '#000000')).replace('__CURRENCY__', cfg.get('currency', '₹'))
    with open(os.path.join(p_path, 'components', 'marketing', 'CartDrawer.tsx'), 'w') as f:
        f.write(cart_code)

    # 2. Write ArchetypeShowcase.tsx
    atype = cfg['type']
    if atype == 'heritage':
        ashow_code = heritage_showcase.replace('__PRIMARY__', cfg['primary']).replace('__YEAR__', cfg['year']).replace('__LANDMARK__', cfg['landmark'])
    elif atype == 'haute':
        ashow_code = haute_showcase.replace('__PRIMARY__', cfg['primary']).replace('__SPECIALTY__', cfg['specialty'])
    elif atype == 'garage':
        ashow_code = garage_showcase.replace('__PRIMARY__', cfg['primary']).replace('__OPEN_TILL__', cfg['open_till']).replace('__LOCATION__', cfg['location'])
    elif atype == 'ferment':
        ashow_code = ferment_showcase.replace('__PRIMARY__', cfg['primary']).replace('__HOURS__', cfg['hours']).replace('__TEMP__', cfg['temp'])
    else:
        ashow_code = fast_casual_showcase.replace('__PRIMARY__', cfg['primary']).replace('__SPICE_DEFAULT__', cfg['spice_default'])

    with open(os.path.join(p_path, 'components', 'marketing', 'ArchetypeShowcase.tsx'), 'w') as f:
        f.write(ashow_code)

    # 3. Embed ArchetypeShowcase in app/page.tsx
    page_path = os.path.join(p_path, 'app', 'page.tsx')
    if os.path.exists(page_path):
        with open(page_path, 'r') as f:
            page_c = f.read()
        if 'ArchetypeShowcase' not in page_c:
            page_c = 'import ArchetypeShowcase from "@/components/marketing/ArchetypeShowcase";\n' + page_c
            page_c = page_c.replace(
                '<SignatureMenu />',
                '<ArchetypeShowcase />\n        <SignatureMenu />'
            )
            with open(page_path, 'w') as f:
                f.write(page_c)

    # 4. Integrate CartDrawer with SignatureMenu.tsx
    menu_path = os.path.join(p_path, 'components', 'marketing', 'SignatureMenu.tsx')
    if os.path.exists(menu_path):
        with open(menu_path, 'r') as f:
            menu_c = f.read()
        
        if 'CartDrawer' not in menu_c:
            menu_c = 'import CartDrawer, { CartItem } from "@/components/marketing/CartDrawer";\n' + menu_c
            # Add state
            state_insertion = '''  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: any) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { name: item.name, price: item.price, quantity: 1, description: item.description }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (name: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((i) => (i.name === name ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0);
    });
  };
'''
            menu_c = menu_c.replace(
                'const currentCategory = categories[selectedCatIndex];',
                'const currentCategory = categories[selectedCatIndex];\n' + state_insertion
            )
            # Update Add + button onClick
            menu_c = menu_c.replace(
                'className="px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"',
                'onClick={() => handleAddToCart(item)}\n                    className="px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"'
            )
            # Add CartDrawer modal at bottom of section
            menu_c = menu_c.replace(
                '</section>',
                '''      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </section>'''
            )
            with open(menu_path, 'w') as f:
                f.write(menu_c)

    print(f"✓ Deployed Cart Drawer & Archetype Showcase for {slug}")

print("\n🎉 All 24 projects upgraded with Slide-Out Cart Drawer and Bespoke Archetype Showcases!")
