"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scissors, Sparkles, Clock, ChevronDown, Check } from "lucide-react";

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  description: string;
  highlights: string[];
}

const servicesList: ServiceItem[] = [
  {
    id: "precision-cut",
    name: "Architectural Precision Cut",
    category: "Sculpting & Shaping",
    price: "From $220",
    duration: "90 Mins",
    description: "Custom wet-to-dry sculpting engineered around facial bone architecture, natural growth direction, and texture movement.",
    highlights: ["Personalized Consultation", "Scalp Detox & Massage", "Custom Blow-Out & Finish"]
  },
  {
    id: "signature-balayage",
    name: "Lumière Sun-Kissed Balayage",
    category: "Color Artistry",
    price: "From $520",
    duration: "210 Mins",
    description: "Hand-painted multi-dimensional highlights blending warm honey, champagne gold, and platinum tones for seamless dimension.",
    highlights: ["Custom Tonal Glossing", "Bond Builder Protection", "Luxury Moisture Infusion"]
  },
  {
    id: "color-correction",
    name: "Master Color Correction",
    category: "Restoration & Repair",
    price: "From $650",
    duration: "300 Mins",
    description: "Intensive multi-stage color transformation to neutralize brassiness, repair damaged pigments, and restore golden vibrancy.",
    highlights: ["Structural Strand Repair", "Custom Pigment Formulation", "Post-Color Treatment Package"]
  },
  {
    id: "hair-extensions",
    name: "Bespoke Silk Hair Extensions",
    category: "Length & Volume",
    price: "From $850",
    duration: "240 Mins",
    description: "Ethically sourced 100% Slavic human hair micro-bead extensions customized for weightless density and natural flow.",
    highlights: ["Custom Color Matching", "Damage-Free Application", "Maintenance & Care Kit"]
  },
  {
    id: "keratin-treatment",
    name: "Gold Leaf Keratin Elixir",
    category: "Smoothing & Shine",
    price: "From $380",
    duration: "150 Mins",
    description: "Formaldehyde-free organic botanical keratin treatment infused with argan oil to eliminate frizz and seal mirror-like shine.",
    highlights: ["Humidity Shield Barrier", "Up to 5 Months Smoothness", "Customized Curl Retention"]
  }
];

export default function ServicesMenu({ onSelectService }: { onSelectService?: (serviceName: string) => void }) {
  const [openService, setOpenService] = useState<string | null>("signature-balayage");

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-6 relative z-20">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#d4a574] uppercase bg-[#1a1a1a] border border-[#d4a574]/30 px-4 py-1.5 rounded-full">
          <Scissors className="w-3.5 h-3.5 text-[#d4a574]" />
          SERVICE MENU & COUTURE CRAFT
        </div>
        <h3 className="text-4xl sm:text-6xl font-display text-white tracking-tight">
          The Art of <span className="italic text-[#d4a574]">Transformation</span>
        </h3>
        <p className="font-sans text-sm text-white/60 max-w-lg mx-auto leading-relaxed">
          Every appointment begins with a deep sculptural consultation. Explore our high-end editorial menu below.
        </p>
      </div>

      <div className="space-y-4">
        {servicesList.map((service) => {
          const isOpen = openService === service.id;

          return (
            <div
              key={service.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-[#1a1a1a] border-[#d4a574] shadow-[0_0_30px_rgba(212,165,116,0.15)]"
                  : "bg-[#141414] border-white/10 hover:border-[#d4a574]/40"
              }`}
            >
              <button
                onClick={() => setOpenService(isOpen ? null : service.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#d4a574] font-bold uppercase tracking-widest bg-[#0a0a0a] px-3 py-1 rounded border border-[#d4a574]/20">
                    {service.category}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display text-white group-hover:text-[#d4a574]">
                    {service.name}
                  </h4>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <span className="block font-mono text-sm font-bold text-[#d4a574]">{service.price}</span>
                    <span className="block font-mono text-[10px] text-white/40">{service.duration}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d4a574] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-t border-white/5 px-6 pb-6 pt-4"
                  >
                    <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {service.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#d4a574]">
                          <Check className="w-3.5 h-3.5 text-[#d4a574]" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="sm:hidden">
                        <span className="font-mono text-sm font-bold text-[#d4a574]">{service.price}</span>
                        <span className="block font-mono text-[10px] text-white/40">{service.duration}</span>
                      </div>
                      <button
                        onClick={() => onSelectService?.(service.name)}
                        className="font-mono text-xs uppercase tracking-widest text-[#0a0a0a] bg-[#d4a574] px-6 py-2.5 rounded hover:bg-[#e0b98a] transition-all cursor-pointer font-bold ml-auto shadow-lg"
                      >
                        Reserve Service
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
