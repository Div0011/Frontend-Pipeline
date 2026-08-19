"use client";

import { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Compass, Feather, Mic, Sparkles } from "lucide-react";

interface Pillar {
  id: string;
  num: string;
  title: string;
  icon: any;
  quote: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    id: "atmosphere",
    num: "01",
    title: "NARRATIVE ATMOSPHERE",
    icon: Compass,
    quote: "Atmosphere is not background decoration; it is the first character in the room.",
    description: "Every sentence must carry spatial density — light falloff, sensory weather, and tactile presence before dialogue occurs.",
  },
  {
    id: "prose",
    num: "02",
    title: "KINETIC PROSE & TEMPO",
    icon: Feather,
    quote: "Pacing is defined by what the sentence leaves unsaid.",
    description: "Rhythm is orchestrated like a musical score. Short staccato beats build suspense; sweeping cadence invites contemplation.",
  },
  {
    id: "sound",
    num: "03",
    title: "SPATIAL SOUND & SILENCE",
    icon: Mic,
    quote: "Silence is the canvas upon which narrative resonance is painted.",
    description: "Integrating ambient soundscapes and sub-bass frequencies into written prose and cinema adaptations.",
  },
  {
    id: "geometry",
    num: "04",
    title: "WORLD GEOMETRY",
    icon: Sparkles,
    quote: "A world is believable only when its shadows have consistent weight.",
    description: "Constructing architectural rules, temporal paradoxes, and optical distortions with mathematical rigor.",
  },
];

export default function CraftPillarsSection() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section className="relative z-10 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3] bg-[#070707]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
            [ CHAPTER 03 — THE 4 PILLARS OF CRAFT ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
            The Storyteller’s <span className="italic font-normal text-[#d4a84b]">Architecture</span>
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activePillar === idx;

              return (
                <div
                  key={pillar.id}
                  onClick={() => {
                    soundEngine.triggerHoverClick();
                    setActivePillar(idx);
                  }}
                  onMouseEnter={() => soundEngine.triggerHoverClick()}
                  className={`group p-6 rounded-xl border transition-all duration-400 cursor-pointer ${
                    isActive
                      ? "bg-[#121110] border-[#d4a84b] shadow-xl shadow-[#d4a84b]/10"
                      : "bg-black/30 border-white/10 hover:border-white/20 hover:bg-black/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono tracking-widest ${isActive ? "text-[#d4a84b]" : "text-white/40"}`}>
                        PILLAR {pillar.num}
                      </span>
                      <h3 className={`text-lg font-display tracking-wider ${isActive ? "text-white font-medium" : "text-white/70"}`}>
                        {pillar.title}
                      </h3>
                    </div>
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-[#d4a84b] scale-110" : "text-white/30"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spotlight Card */}
          <div className="lg:col-span-7 sticky top-32">
            {PILLARS.filter((_, idx) => idx === activePillar).map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-10 rounded-2xl bg-gradient-to-br from-[#141310] via-[#0c0c0c] to-[#070707] border border-[#d4a84b]/40 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Icon className="w-48 h-48 text-[#d4a84b]" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
                      PILLAR {pillar.num} &bull; PHILOSOPHY
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display font-light text-white mt-2">
                      {pillar.title}
                    </h3>
                    <p className="text-base font-display italic text-[#d4a84b] mt-3">
                      &ldquo;{pillar.quote}&rdquo;
                    </p>

                    <div className="mt-8 border-t border-white/10 pt-6">
                      <p className="text-sm font-sans text-white/80 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-10 flex items-center justify-between text-xs font-mono text-white/40">
                      <span>SPECIFICATION: VANCE MANIFESTO</span>
                      <span className="text-[#d4a84b]">APPROVED FOR PRODUCTION</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
