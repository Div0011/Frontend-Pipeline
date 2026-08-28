"use client";

import { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Aperture, Camera, Film, Mic, Sparkles } from "lucide-react";

interface Pillar {
  id: string;
  num: string;
  title: string;
  icon: any;
  tagline: string;
  details: string;
}

const PILLARS: Pillar[] = [
  {
    id: "scouting",
    num: "01",
    title: "LOCATION SCOUTING",
    icon: Camera,
    tagline: "Natural Light Geometry & Architectural Atmosphere",
    details: "We map sun trajectories, natural shadows, and sound reflections before bringing camera packages to set.",
  },
  {
    id: "optics",
    num: "02",
    title: "ANAMORPHIC OPTICS",
    icon: Aperture,
    tagline: "Vintage Glass Character & Oval Bokeh Flares",
    details: "Custom re-housed Kowa and Cooke vintage anamorphic lenses delivering organic horizontal flares and 2.39:1 widescreen scope.",
  },
  {
    id: "grading",
    num: "03",
    title: "SFUMATO COLOR GRADING",
    icon: Film,
    tagline: "Film Emulation & Soft Tonal Roll-Off",
    details: "DaVinci Resolve film print emulation (FPE) matched with Kodachrome grain densities and warm obsidian shadows.",
  },
  {
    id: "sound",
    num: "04",
    title: "SPATIAL AUDIO SCORING",
    icon: Mic,
    tagline: "Custom Modular Synthesizers & Foley Precision",
    details: "Bespoke ambient scores tailored to every frame cut, recorded in 96kHz 24-bit binaural soundscapes.",
  },
  {
    id: "mastering",
    num: "05",
    title: "DCI MASTERING",
    icon: Sparkles,
    tagline: "4K HDR Dolby Vision Cinema Deliverables",
    details: "ProRes 4444 XQ and DCP theater packages calibrated for theater screens and ultra-high-density mobile displays.",
  },
];

export default function PhilosophySection() {
  const [activePillar, setActivePillar] = useState<string>("optics");

  return (
    <section className="relative z-20 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3] bg-[#070707]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
            [ CHAPTER 03 — PRODUCTION MANIFESTO ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
            The Sfumato <span className="italic font-normal text-[#d4a84b]">Pillars</span>
          </h2>
          <p className="mt-4 text-sm font-sans text-white/60 max-w-2xl leading-relaxed">
            Where light, silence, and tempo converge. Named after Leonardo da Vinci’s technique of soft blending without outlines or borders.
          </p>
        </div>

        {/* Pillars Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* List Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = activePillar === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => {
                    soundEngine.triggerHoverClick();
                    setActivePillar(pillar.id);
                  }}
                  onMouseEnter={() => soundEngine.triggerHoverClick()}
                  className={`group relative p-6 rounded-xl border transition-all duration-400 cursor-pointer ${
                    isActive
                      ? "bg-[#121110] border-[#d4a84b] shadow-xl shadow-[#d4a84b]/10"
                      : "bg-black/30 border-white/10 hover:border-white/20 hover:bg-black/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono tracking-widest ${isActive ? "text-[#d4a84b]" : "text-white/40"}`}>
                        {pillar.num}
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

          {/* Active Pillar Spotlight Card */}
          <div className="lg:col-span-7 sticky top-32">
            {PILLARS.filter((p) => p.id === activePillar).map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="relative p-10 rounded-2xl bg-gradient-to-br from-[#141312] to-[#0a0a0a] border border-[#d4a84b]/40 shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Icon className="w-48 h-48 text-[#d4a84b]" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
                      PILLAR {pillar.num} &bull; METHODOLOGY
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display font-light text-white mt-2 tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-base font-display italic text-[#d4a84b] mt-2">
                      &ldquo;{pillar.tagline}&rdquo;
                    </p>

                    <div className="mt-8 border-t border-white/10 pt-6">
                      <p className="text-sm font-sans text-white/80 leading-relaxed">
                        {pillar.details}
                      </p>
                    </div>

                    <div className="mt-10 flex items-center justify-between text-xs font-mono text-white/40">
                      <span>CINEMA SPEC: 2.39:1 SCOPE</span>
                      <span className="text-[#d4a84b]">KINOATWORK STANDARD &bull; APPROVED</span>
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
