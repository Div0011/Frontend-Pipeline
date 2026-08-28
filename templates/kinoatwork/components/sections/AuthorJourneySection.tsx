"use client";

import { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Milestone, Award, Feather, Film, Globe } from "lucide-react";

interface JourneyMilestone {
  year: string;
  title: string;
  type: string;
  icon: any;
  summary: string;
  details: string;
  stat: string;
}

const MILESTONES: JourneyMilestone[] = [
  {
    year: "2018",
    title: "FIRST INK: ANAMORPHIC DREAMS",
    type: "LITERARY DEBUT",
    icon: Feather,
    summary: "Publication of debut speculative novella exploring memory optical distortion.",
    details: "Shortlisted for the International Booker Prize. Published in 14 languages with acclaimed praise for its sensory prose style.",
    stat: "14 TRANSLATIONS",
  },
  {
    year: "2021",
    title: "THE SFUMATO SCREEN ADAPTATION",
    type: "CINEMATIC DIRECTION",
    icon: Film,
    summary: "Writing & Directing the 6-part visual anthology for HBO & A24.",
    details: "Filmed using vintage Kowa anamorphic lenses and recorded in 96kHz 24-bit binaural spatial audio in Iceland and Kyoto.",
    stat: "CANNES LION NOMINEE",
  },
  {
    year: "2024",
    title: "ECHOES OF SILENCE NOVEL",
    type: "GLOBAL BEST SELLER",
    icon: Globe,
    summary: "Releasing the magnum opus novel on acoustic isolation and mountain solitude.",
    details: "Over 2 Million copies sold worldwide. Adapted into a major theatrical IMAX experience featuring spatial audio soundscapes.",
    stat: "2.0M+ COPIES SOLD",
  },
  {
    year: "2026",
    title: "THE GLASS HORIZON & FUTURE SPECS",
    type: "DIGITAL NOVEL & IMAX FEATURE",
    icon: Award,
    summary: "Pioneering interactive storytelling experiences and high-concept screenplay commissions.",
    details: "Integrating interactive shader canvases, digital literature UI, and live orchestral accompaniment.",
    stat: "IMAX RELEASE 2026",
  },
];

export default function AuthorJourneySection() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <section id="journey" className="relative z-10 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-10 mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
            [ CHAPTER 01 — THE STORYTELLING JOURNEY ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
            Chronology of <span className="italic font-normal text-[#d4a84b]">Thought & Lens</span>
          </h2>
          <p className="mt-4 text-sm font-sans text-white/60 max-w-xl leading-relaxed">
            Trace Julian Vance’s evolution from literary debut to auteur film direction and interactive digital experiences.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Milestone List */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {MILESTONES.map((m, idx) => {
              const Icon = m.icon;
              const isActive = activeMilestone === idx;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    soundEngine.triggerHoverClick();
                    setActiveMilestone(idx);
                  }}
                  onMouseEnter={() => soundEngine.triggerHoverClick()}
                  className={`group p-6 rounded-2xl border transition-all duration-400 cursor-pointer ${
                    isActive
                      ? "bg-[#11100e] border-[#d4a84b] shadow-xl shadow-[#d4a84b]/10"
                      : "bg-black/30 border-white/10 hover:border-white/20 hover:bg-black/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-xl font-mono font-light tracking-widest ${isActive ? "text-[#d4a84b]" : "text-white/40"}`}>
                        {m.year}
                      </span>
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-[#d4a84b] block uppercase">
                          {m.type}
                        </span>
                        <h3 className={`text-lg font-display tracking-wide ${isActive ? "text-white font-medium" : "text-white/70"}`}>
                          {m.title}
                        </h3>
                      </div>
                    </div>
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-[#d4a84b] scale-110" : "text-white/30"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          <div className="lg:col-span-6 sticky top-32">
            {MILESTONES.filter((_, idx) => idx === activeMilestone).map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="relative p-10 rounded-2xl bg-gradient-to-br from-[#151310] via-[#0b0b0b] to-[#070707] border border-[#d4a84b]/50 shadow-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                    <div>
                      <span className="text-3xl font-mono text-[#d4a84b] font-light tracking-wider">
                        {m.year}
                      </span>
                      <span className="text-[10px] font-mono text-white/50 block tracking-widest uppercase mt-1">
                        {m.type}
                      </span>
                    </div>
                    <div className="p-3 bg-[#d4a84b]/10 rounded-full border border-[#d4a84b]/30">
                      <Icon className="w-6 h-6 text-[#d4a84b]" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display text-white font-light tracking-wide">
                    {m.title}
                  </h3>

                  <p className="text-sm font-sans text-white/80 mt-4 leading-relaxed">
                    {m.summary}
                  </p>

                  <p className="text-xs font-sans text-white/60 mt-4 leading-relaxed">
                    {m.details}
                  </p>

                  <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between text-xs font-mono text-[#d4a84b]">
                    <span>MILESTONE IMPACT</span>
                    <span className="bg-[#d4a84b]/10 px-3 py-1 rounded-full border border-[#d4a84b]/30 font-medium">
                      {m.stat}
                    </span>
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
