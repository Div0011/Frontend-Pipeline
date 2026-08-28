"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const SUITES = [
  {
    id: "maharaja-suite",
    name: "The Grand Maharaja Suite",
    type: "Presidential Sanctuary",
    size: "3,800 sq.ft",
    view: "Palace Gardens & Skyline",
    price: "$1,850",
    priceInr: "₹1,55,000",
    image: "/media/guest-room.jpeg",
    description: "The crown jewel of Raajmahal. Featuring a private marble plunge pool, hand-carved mahogany king bed, 24k gold embroidered silks, and dedicated private butler.",
    amenities: ["Private Marble Plunge Pool", "24-Hour Royal Butler Service", "Private Terrace & Jacuzzi", "Rolls-Royce Chauffeur"],
  },
  {
    id: "royal-haveli-suite",
    name: "Royal Haveli Courtyard Suite",
    type: "Courtyard Haven",
    size: "2,200 sq.ft",
    view: "Central Lotus Fountain",
    price: "$1,200",
    priceInr: "₹1,00,000",
    image: "/media/guest-room.jpeg",
    description: "Framed by traditional jharokha balconies overlooking the lotus fountain. Outfitted with antique Rajasthani artwork, marble soaking tub, and serene private lounge.",
    amenities: ["Jharokha Balcony View", "Private Dining Salon", "Herbal Spa Bath", "Daily Sunset High Tea"],
  },
  {
    id: "peacock-palace-suite",
    name: "Peacock Garden Heritage Room",
    type: "Garden Sanctuary",
    size: "1,400 sq.ft",
    view: "Private Floral Terraces",
    price: "$850",
    priceInr: "₹72,000",
    image: "/media/guest-room.jpeg",
    description: "An intimate haven designed with soft emerald and ruby tones. Opens directly onto private floral gardens accompanied by morning sitar melodies.",
    amenities: ["Private Floral Garden", "Daily High Tea", "Marble Soak Tub", "Aromatherapy Bar"],
  },
];

export default function SuitesShowcase({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [activeSuite, setActiveSuite] = useState(SUITES[0]);

  return (
    <section id="suites-section" className="relative w-full min-h-screen py-36 px-8 md:px-20 bg-[#160306] text-[#faf0ca] z-10">
      {/* Section Title */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#f5d061] block mb-3">
          ACCOMMODATIONS
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-[#f5d061] tracking-tight leading-tight">
          ROYAL SUITE <br />
          <span className="italic text-[#faf0ca] font-normal">SANCTUARIES</span>
        </h2>
        <p className="font-sans text-sm text-[#faf0ca]/70 mt-4 leading-relaxed font-light">
          Each suite is a peaceful retreat crafted with hand-carved stone arches and museum-grade heritage antiques.
        </p>
      </div>

      {/* Suite Tabs */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6 mb-16 max-w-4xl mx-auto font-mono text-[10px] uppercase tracking-[0.3em]">
        {SUITES.map((suite) => (
          <button
            key={suite.id}
            onClick={() => setActiveSuite(suite)}
            data-cursor="hover"
            className={`px-7 py-3.5 transition-all duration-500 cursor-pointer border ${
              activeSuite.id === suite.id
                ? "bg-[#f5d061] text-[#160306] border-[#f5d061] font-bold"
                : "bg-transparent text-[#faf0ca]/60 border-[#f5d061]/25 hover:text-[#f5d061] hover:border-[#f5d061]/50"
            }`}
          >
            {suite.name.split(" ")[1] || suite.name}
          </button>
        ))}
      </div>

      {/* Main Suite Container */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#20060a]/80 border border-[#f5d061]/20 p-8 md:p-14 backdrop-blur-md">
        {/* Left Column — Large Photo Container */}
        <div className="lg:col-span-7 relative h-[420px] md:h-[520px] overflow-hidden group" style={{ position: "relative" }}>
          <Image
            src={activeSuite.image}
            alt={activeSuite.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160306] via-transparent to-transparent opacity-75" />

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-[#f5d061]">
            <span className="bg-[#160306]/90 border border-[#f5d061]/30 px-4 py-2">
              {activeSuite.size} · {activeSuite.view}
            </span>
          </div>
        </div>

        {/* Right Column — Details & Booking */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-2 text-[#f5d061] font-mono text-[10px] uppercase tracking-[0.3em] mb-3">
              <Sparkles className="w-3.5 h-3.5" /> {activeSuite.type}
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-[#f5d061] leading-tight">
              {activeSuite.name}
            </h3>

            <p className="font-sans text-xs text-[#faf0ca]/80 mt-5 leading-relaxed font-light">
              {activeSuite.description}
            </p>

            {/* Inclusions */}
            <div className="mt-8 space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f5d061]/70">Royal Inclusions</p>
              {activeSuite.amenities.map((item) => (
                <div key={item} className="flex items-center gap-3 text-xs font-sans text-[#faf0ca]/90">
                  <Check className="w-3.5 h-3.5 text-[#f5d061] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-8 border-t border-[#f5d061]/15">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl md:text-4xl text-[#f5d061]">{activeSuite.price}</span>
              <span className="font-mono text-xs text-[#faf0ca]/50">({activeSuite.priceInr}) / night</span>
            </div>

            <button
              onClick={onOpenBooking}
              data-cursor="hover"
              data-cursor-label="WELCOME"
              className="w-full py-4.5 bg-[#f5d061] text-[#160306] font-mono text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#ffdf7a] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              Reserve This Suite <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
