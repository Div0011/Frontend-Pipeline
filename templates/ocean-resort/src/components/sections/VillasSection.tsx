"use client";

import { useState } from "react";
import { Sparkles, Bed, Users, Maximize, CheckCircle2, ArrowRight } from "lucide-react";

interface VillasProps {
  onOpenBooking: () => void;
}

const VILLAS = [
  {
    id: "ocean-villa",
    name: "Overwater Coral Villa",
    subtitle: "Direct Lagoon Access & Private Infinity Pool",
    price: "$2,800",
    period: "/ NIGHT",
    size: "280 m²",
    guests: "up to 3 Guests",
    beds: "1 King Bed + Lounge",
    bgGradient: "from-[#094067] via-[#1e6091] to-[#00a896]",
    features: [
      "Glass floor viewport to live coral reef",
      "Private infinity plunge pool over ocean",
      "24/7 Dedicated island butler",
      "Sunset champagne deck & hammock",
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lagoon-suite",
    name: "Lagoon Sunset Pavilion",
    subtitle: "Panoramic 360° Ocean Views & Private Jetty",
    price: "$4,500",
    period: "/ NIGHT",
    size: "420 m²",
    guests: "up to 5 Guests",
    beds: "2 King Bedrooms",
    bgGradient: "from-[#1e6091] via-[#00a896] to-[#48d1cc]",
    features: [
      "Private speedboat transfer included",
      "Outdoor rain shower & ocean spa bath",
      "Private chef dining service",
      "Exclusive coral reef snorkeling equipment",
    ],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "royal-sanctuary",
    name: "The Royal Ocean Sanctuary",
    subtitle: "Ultimate Private Atoll Estate & Helipad",
    price: "$8,200",
    period: "/ NIGHT",
    size: "850 m²",
    guests: "up to 8 Guests",
    beds: "4 Oceanfront Master Suites",
    bgGradient: "from-[#00a896] via-[#094067] to-[#e5c378]",
    features: [
      "Private 100m white sand beach beach-front",
      "Dedicated wellness spa & sauna room",
      "24/7 Private yacht at disposition",
      "Personal sommelier & Michelin chef",
    ],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function VillasSection({ onOpenBooking }: VillasProps) {
  const [activeVilla, setActiveVilla] = useState(VILLAS[0]);

  return (
    <section id="villas-section" className="relative w-full py-28 px-6 md:px-16 bg-[#1e6091]/40 text-[#f5f0e6] z-10 overflow-hidden">
      <div className="water-caustic-overlay opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 border-[#48d1cc]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c378]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#48d1cc] font-semibold">
              ACCOMMODATIONS
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl text-[#f5f0e6] tracking-tight leading-tight mb-4">
            SANCTUARIES OF <span className="italic text-gradient-ocean">UNRIVALED LUXURY</span>
          </h2>
          
          <p className="font-body text-sm md:text-base text-[#f5f0e6]/80 font-light max-w-xl mx-auto">
            Architectural masterpieces positioned directly over crystal lagoons or along private powdery sands.
          </p>
        </div>

        {/* Villa Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {VILLAS.map((villa) => (
            <button
              key={villa.id}
              onClick={() => setActiveVilla(villa)}
              className={`px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeVilla.id === villa.id
                  ? "bg-[#48d1cc] text-[#094067] font-bold shadow-[0_0_30px_rgba(72,209,204,0.5)] scale-105"
                  : "glass-card text-[#f5f0e6]/70 hover:text-[#48d1cc] hover:border-[#48d1cc]/40"
              }`}
            >
              {villa.name}
            </button>
          ))}
        </div>

        {/* Active Villa Spotlight Showcase */}
        <div className="glass-card-strong rounded-3xl p-8 md:p-12 border-[#48d1cc]/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Villa Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e5c378] font-semibold block mb-2">
                  {activeVilla.subtitle}
                </span>
                <h3 className="font-display text-3xl md:text-5xl text-[#f5f0e6] leading-tight">
                  {activeVilla.name}
                </h3>
              </div>

              {/* Price & Specs */}
              <div className="flex flex-wrap items-baseline gap-4 py-3 border-y border-[#48d1cc]/20">
                <span className="font-display text-4xl text-[#48d1cc] font-light">{activeVilla.price}</span>
                <span className="font-mono text-xs text-[#90e0ef] uppercase tracking-wider">{activeVilla.period}</span>
                <span className="text-[#48d1cc]/40">|</span>
                <span className="font-mono text-xs text-[#f5f0e6]/80 flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5 text-[#48d1cc]" /> {activeVilla.size}
                </span>
                <span className="font-mono text-xs text-[#f5f0e6]/80 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#48d1cc]" /> {activeVilla.guests}
                </span>
              </div>

              {/* Villa Amenities */}
              <div className="space-y-3 pt-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#48d1cc] font-semibold">
                  INCLUDED LUXURY AMENITIES:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeVilla.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00a896] shrink-0 mt-0.5" />
                      <span className="font-body text-xs text-[#f5f0e6]/90 font-light leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-4 rounded-full bg-[#48d1cc] text-[#094067] font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(72,209,204,0.4)] hover:bg-[#e0f7fa] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <span>RESERVE {activeVilla.name.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Villa Image Showcase */}
            <div className="lg:col-span-6 relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden glass-card border-[#48d1cc]/40 group">
              <img
                src={activeVilla.image}
                alt={activeVilla.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#094067]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl flex items-center justify-between border-[#48d1cc]/30">
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-[#48d1cc]" />
                  <span className="font-mono text-xs text-[#f5f0e6]">{activeVilla.beds}</span>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#e5c378] tracking-widest">
                  100% PRIVATE REEF
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
