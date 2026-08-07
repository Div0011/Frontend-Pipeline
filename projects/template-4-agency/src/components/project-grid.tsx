"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  stat: string;
  year: string;
  video: string;
  image: string;
  tags: string[];
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: "lusion-redesign",
    title: "NEURAL SCULPTURE",
    client: "SYNTHETIX LABS",
    category: "WEBGL 3D",
    stat: "+420% ENGAGEMENT",
    year: "2026",
    video: "/videos/showreel.mp4",
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=1200&q=80",
    tags: ["Three.js", "GSAP ScrollTrigger", "Custom Shaders"],
    description: "An interactive real-time 3D particle universe built for high-performance SaaS launches.",
  },
  {
    id: "kino-kinetic",
    title: "KINETIC BRAND SYSTEM",
    client: "KINO AT WORK",
    category: "BRANDING",
    stat: "AWWWARDS SITE OF THE DAY",
    year: "2026",
    video: "/videos/showreel.mp4",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    tags: ["Typography", "Motion Identity", "Next.js"],
    description: "Dynamic kinetic typography led brand system built with liquid ease transitions.",
  },
  {
    id: "apex-disassembly",
    title: "APEX MARK IV HARDWARE",
    client: "APEX HARDWARE",
    category: "AI MOTION",
    stat: "$12M PRE-ORDERS",
    year: "2025",
    video: "/videos/orbit.mp4",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    tags: ["Mechanical Explode", "WebP Scrubber", "Lenis Physics"],
    description: "Interactive 3D product disassembly scrollytelling experience showcasing titanium hardware.",
  },
  {
    id: "zerzura-studio",
    title: "ZERZURA ATELIER",
    client: "ZERZURA LUXURY",
    category: "WEBGL 3D",
    stat: "FWA OF THE MONTH",
    year: "2025",
    video: "/videos/hero.mp4",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    tags: ["Full-Bleed Video", "Asymmetric Grid", "Tailwind CSS"],
    description: "Luxury fashion editorial portfolio with video-morph centerpiece grid.",
  },
];

const CATEGORIES = ["ALL", "WEBGL 3D", "BRANDING", "AI MOTION"];

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div id="work" className="relative h-full w-full flex flex-col justify-center px-12 md:px-20">
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end">
        <div>
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#d4ff00] uppercase">
            SELECTED WORKS // 2024–2026
          </span>
          <h2 className="mt-2 font-mono text-3xl font-black uppercase text-white tracking-tight md:text-5xl">
            CRAFTED WITH INTENT.
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`border px-4 py-1.5 font-mono text-[10px] font-bold tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#d4ff00] text-black border-[#d4ff00]"
                  : "border-white/15 bg-white/5 text-white/70 hover:border-[#d4ff00]/40 hover:text-white"
              }`}
              data-cursor="FILTER"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-row gap-8 overflow-visible">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden border p-0 transition-all duration-500 hover:border-[#d4ff00]/60 w-[350px] md:w-[420px] shrink-0 border-white/10 bg-white/[0.02]"
            data-cursor="VIEW"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-40" />

              <div className="absolute top-3 right-3 rounded-full border border-[#d4ff00]/40 bg-black/80 px-2.5 py-0.5 font-mono text-[9px] font-bold text-[#d4ff00] backdrop-blur-md">
                {project.stat}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>{project.client}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="mt-1 font-mono text-lg font-bold uppercase text-white transition-colors group-hover:text-[#d4ff00]">
                {project.title}
              </h3>
              <p className="mt-1 text-xs text-white/60 line-clamp-2">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
