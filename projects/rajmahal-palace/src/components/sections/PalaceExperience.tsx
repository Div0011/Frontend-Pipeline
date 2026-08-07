"use client";

import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";

const EXPERIENCES = [
  {
    title: "The Grand Marble Lobby",
    subtitle: "High Vaulted Arches & Chandelier Grandeur",
    image: "/media/grand-lobby.jpeg",
    tag: "LOBBY & ARCHITECTURE",
    desc: "A serene welcome under 40-foot vaulted ceilings, hand-painted frescoes, and Venetian crystal chandeliers.",
  },
  {
    title: "Royal Infinity Pool",
    subtitle: "Overlooking the Aravalli Hills at Sunset",
    image: "/media/infinity-pool.jpeg",
    tag: "POOL & COURTYARD",
    desc: "Swim along heated emerald waters framed by hand-carved marble jaali screens. Quiet relaxation on submerged daybeds.",
  },
  {
    title: "Dusk Illuminations",
    subtitle: "Oil Lamps Lit at Twilight",
    image: "/media/palace-exterior.jpeg",
    tag: "TWILIGHT SANCTUARY",
    desc: "As night falls over Rajasthan, the palace glows under warm torchlights accompanied by live sitar recitals.",
  },
];

export default function PalaceExperience() {
  return (
    <section id="experience-section" className="relative w-full min-h-screen py-36 px-8 md:px-20 bg-[#160306] text-[#faf0ca] z-10">
      {/* Title */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#f5d061] block mb-3">
          PALACE EXPERIENCES
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-[#f5d061] tracking-tight leading-tight">
          CURATED HERITAGE <br />
          <span className="italic text-[#faf0ca] font-normal">MOMENTS</span>
        </h2>
        <p className="font-sans text-sm text-[#faf0ca]/70 mt-4 leading-relaxed font-light">
          An unhurried immersion into royal architecture, modern wellness, and Michelin-inspired Indian gastronomy.
        </p>
      </div>

      {/* Grid of Minimal Spacious Experiences */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.title}
            className="group relative bg-[#20060a]/80 border border-[#f5d061]/20 overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-[#f5d061]/60"
          >
            {/* Image Container */}
            <div className="relative h-88 w-full overflow-hidden" style={{ position: "relative" }}>
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160306] via-[#160306]/20 to-transparent" />

              <span className="absolute top-5 left-5 font-mono text-[9px] uppercase tracking-[0.3em] bg-[#160306]/90 border border-[#f5d061]/30 px-3 py-1.5 text-[#f5d061]">
                {exp.tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
              <h3 className="font-display text-2xl text-[#f5d061] group-hover:text-[#ffdf7a] transition-colors leading-tight">
                {exp.title}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#f5d061]/70">
                {exp.subtitle}
              </p>
              <p className="font-sans text-xs text-[#faf0ca]/70 leading-relaxed font-light">
                {exp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Gastronomy & Wellness Highlight */}
      <div className="relative z-10 max-w-7xl mx-auto mt-24 p-10 md:p-14 bg-[#20060a]/80 border border-[#f5d061]/25 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#f5d061] font-mono text-[10px] uppercase tracking-[0.3em]">
            <UtensilsCrossed className="w-4 h-4" /> GASTRONOMY & WELLNESS
          </div>
          <h3 className="font-display text-3xl md:text-4xl text-[#f5d061]">
            ROYAL THALI & AYURVEDIC SPA
          </h3>
          <p className="font-sans text-xs text-[#faf0ca]/80 leading-relaxed font-light">
            Indulge in 24-course royal Thali feasts prepared by hereditary royal chefs, followed by 5,000-year-old Ayurvedic herbal therapies at Jharokha Spa.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 font-mono text-center">
          <div className="p-6 border border-[#f5d061]/20 bg-[#160306]/60">
            <p className="font-display text-2xl text-[#f5d061]">SURYA DINING</p>
            <p className="text-[9px] uppercase tracking-widest text-[#faf0ca]/50 mt-1">Michelin Heritage</p>
          </div>
          <div className="p-6 border border-[#f5d061]/20 bg-[#160306]/60">
            <p className="font-display text-2xl text-[#f5d061]">AMRIT SPA</p>
            <p className="text-[9px] uppercase tracking-widest text-[#faf0ca]/50 mt-1">Ayurveda Wellness</p>
          </div>
        </div>
      </div>
    </section>
  );
}
