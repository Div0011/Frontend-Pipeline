"use client";

import { useState } from "react";

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  video: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: "lusion-redesign",
    title: "Neural Sculpture",
    client: "Synthetix Labs",
    category: "WebGL 3D",
    year: "2026",
    video: "/videos/showreel.mp4",
    description: "Real-time particle universe for a high-performance SaaS launch.",
  },
  {
    id: "kino-kinetic",
    title: "Kinetic Brand",
    client: "Kino At Work",
    category: "Branding",
    year: "2026",
    video: "/videos/showreel.mp4",
    description: "Liquid-ease typography system with living motion identity.",
  },
  {
    id: "apex-disassembly",
    title: "Apex Mark IV",
    client: "Apex Hardware",
    category: "AI Motion",
    year: "2025",
    video: "/videos/orbit.mp4",
    description: "Interactive product disassembly for titanium hardware.",
  },
  {
    id: "zerzura-studio",
    title: "Zerzura Atelier",
    client: "Zerzura Luxury",
    category: "WebGL 3D",
    year: "2025",
    video: "/videos/hero.mp4",
    description: "Editorial portfolio with video-morph centerpiece grid.",
  },
];

const CATEGORIES = ["All", "WebGL 3D", "Branding", "AI Motion"];

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div
      id="work"
      className="relative flex h-full w-full flex-col justify-center px-[var(--gutter)]"
    >
      <div className="stagger-item flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-[0.35em] text-[#d4ff00] uppercase">
            Selected works
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,4rem)] font-extrabold tracking-[-0.035em] text-white">
            Crafted with intent.
          </h2>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`relative font-mono text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
                activeCategory === cat ? "text-[#d4ff00]" : "text-white/40 hover:text-white/80"
              }`}
              data-cursor="FILTER"
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-[#d4ff00]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="stagger-item mt-8 flex gap-5 overflow-x-auto pb-2 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filteredProjects.map((project, index) => (
          <article
            key={project.id}
            className="group relative w-[min(78vw,380px)] shrink-0 md:w-[420px]"
            data-cursor="VIEW"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
              <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em] text-white/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.2em] text-[#d4ff00]">
                {project.year}
              </span>
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
                  {project.client} · {project.category}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#d4ff00] md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-white/50">
                  {project.description}
                </p>
              </div>
              <span
                className="mt-1 font-display text-lg text-white/25 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#d4ff00]"
                aria-hidden
              >
                →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
