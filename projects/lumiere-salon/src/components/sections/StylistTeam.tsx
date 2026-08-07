"use client";

import { Star, Award, Sparkles } from "lucide-react";

const stylists = [
  {
    name: "Antoine Lumière",
    role: "Creative Director & Master Sculptor",
    specialty: "Precision Cuts & Architectural Fringe",
    experience: "16 Years • Paris & Tokyo",
    quote: "Hair is sculptable architecture. We cut to illuminate the natural facial structure.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
  },
  {
    name: "Elena Rostova",
    role: "Head Color Director",
    specialty: "Platinum & Balayage Painting",
    experience: "14 Years • London & NYC",
    quote: "Color is light reflected. Balayage is the art of trapping golden hour in every strand.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
  },
  {
    name: "Kenji Takahashi",
    role: "Senior Texture Specialist",
    specialty: "Keratin Restoration & Waves",
    experience: "11 Years • Tokyo & Milan",
    quote: "True luxury hair moves like silk liquid. We restore vitality from cortex to cuticle.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"
  }
];

export default function StylistTeam() {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-6 relative z-20">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#d4a574] uppercase bg-[#1a1a1a] border border-[#d4a574]/30 px-4 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#d4a574]" />
          MASTER ARTISANS & STYLISTS
        </div>
        <h3 className="text-4xl sm:text-6xl font-display text-white tracking-tight">
          The Craft of <span className="italic text-[#d4a574]">Masters</span>
        </h3>
        <p className="font-sans text-sm text-white/60 max-w-lg mx-auto leading-relaxed">
          Trained in Paris, London, and Tokyo. Meet the visionary artists behind your transformation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stylists.map((s, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl bg-[#141414] border border-white/10 overflow-hidden hover:border-[#d4a574]/50 transition-all duration-500 shadow-2xl flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-90" />
              <div className="absolute top-4 right-4 bg-[#0a0a0a]/90 border border-[#d4a574]/40 px-3 py-1 rounded-full text-[10px] font-mono text-[#d4a574]">
                {s.experience}
              </div>
            </div>

            <div className="p-6 relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#d4a574] uppercase tracking-widest block mb-1">
                  {s.specialty}
                </span>
                <h4 className="text-2xl font-display text-white mb-1">{s.name}</h4>
                <p className="text-xs font-mono text-white/50 mb-4">{s.role}</p>
                <p className="text-xs font-serif italic text-[#d4a574]/90 border-l-2 border-[#d4a574] pl-3 py-1">
                  &quot;{s.quote}&quot;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#d4a574]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#d4a574]" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  VIP CONSULTATION
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
