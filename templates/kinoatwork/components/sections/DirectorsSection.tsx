"use client";

import Image from "next/image";
import { soundEngine } from "@/lib/audio";
import { Award, Film, Star } from "lucide-react";

interface Director {
  name: string;
  role: string;
  bio: string;
  image: string;
  awards: string[];
  recentWork: string;
}

const DIRECTORS: Director[] = [
  {
    name: "AARAV KAPOOR",
    role: "Founding Director & Cinematographer",
    bio: "Pioneer in anamorphic culinary storytelling and high-speed Phantom Flex aesthetics. Over 12 years directing commercial campaigns for global luxury brands.",
    image: "/images/director_aarav.png",
    awards: ["Cannes Lion Silver (2025)", "Awwwards Site of the Month", "D&AD Yellow Pencil"],
    recentWork: "Smash Guys & Kyoto Matcha Craft",
  },
  {
    name: "ELENA VANCE",
    role: "Creative Director & Colorist",
    bio: "Former lead colorist at Sfumato Post Paris. Specialist in Kodachrome print emulation, spatial audio direction, and tactile macro product framing.",
    image: "/images/director_elena.png",
    awards: ["Clio Gold Award", "FWA of the Day", "Vimeo Staff Pick Best Commercial"],
    recentWork: "Old Monk Mousse & Velvet Cacao",
  },
];

export default function DirectorsSection() {
  return (
    <section className="relative z-20 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
            [ CHAPTER 04 — DIRECTORS & MASTERS ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
            Creative <span className="italic font-normal text-[#d4a84b]">Visionaries</span>
          </h2>
          <p className="mt-4 text-sm font-sans text-white/60 max-w-xl leading-relaxed">
            The film artists directing lighting, lens selection, color grading, and sonic rhythm for every Kinoatwork production.
          </p>
        </div>

        {/* Director Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {DIRECTORS.map((director, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.triggerHoverClick()}
              className="group relative bg-[#0b0b0b] border border-white/10 rounded-2xl overflow-hidden p-8 hover:border-[#d4a84b]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4a84b]/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black mb-6">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-[#d4a84b]">
                    {director.role}
                  </div>
                </div>

                <h3 className="text-3xl font-display font-light tracking-wide text-white group-hover:text-[#d4a84b] transition-colors">
                  {director.name}
                </h3>
                <p className="text-xs font-sans text-white/70 mt-3 leading-relaxed">
                  {director.bio}
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#d4a84b] mb-3">
                  <Award className="w-4 h-4" />
                  <span>HONORS & RECOGNITION</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {director.awards.map((award, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/80 px-3 py-1 rounded-md"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
