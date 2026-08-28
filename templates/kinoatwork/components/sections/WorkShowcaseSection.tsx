"use client";

import { useState } from "react";
import Image from "next/image";
import { soundEngine } from "@/lib/audio";
import { Play, Sparkles, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  description: string;
  aspect: string;
}

const PROJECTS: Project[] = [
  {
    id: "smash-guys",
    title: "SMASH GUYS BURGER",
    category: "Food & Beverage",
    client: "Smash Guys Co.",
    year: "2026",
    image: "/hero-burger.png",
    description: "Sizzling high-speed phantom flex cinematography capturing artisanal beef smash technique and flame caramelization.",
    aspect: "16:9",
  },
  {
    id: "matcha-special",
    title: "KYOTO MATCHA CRAFT",
    category: "Commercial",
    client: "Zen Matcha Studio",
    year: "2025",
    image: "/matcha-special.png",
    description: "Macro anamorphic focus on organic Ceremonial grade Uji Matcha whisking and velvet texture pours.",
    aspect: "4:5",
  },
  {
    id: "old-monk",
    title: "OLD MONK MOUSSE",
    category: "Confectionery Film",
    client: "Velvet Cacao",
    year: "2025",
    image: "/old-monk-mousse.png",
    description: "Rich dark chocolate mousse pairing fused with oak-aged rum infusion, shot under 1200w tungsten warmth.",
    aspect: "16:9",
  },
  {
    id: "truffle-fries",
    title: "TRUFFLE GOLD FRIES",
    category: "Culinary Arts",
    client: "Gourmet Bistro",
    year: "2026",
    image: "/truffle-fries.png",
    description: "Hand-cut Idaho gold potatoes dusted with black winter truffle snow and shaved Parmigiano-Reggiano.",
    aspect: "4:5",
  },
];

const CATEGORIES = ["ALL", "Food & Beverage", "Commercial", "Confectionery Film", "Culinary Arts"];

export default function WorkShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "ALL"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="relative z-20 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3]">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
        <div>
          <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
            [ CHAPTER 02 — SELECTED FILMS ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
            Cinematic Works <span className="italic font-normal text-[#d4a84b]">&</span> Archives
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.triggerHoverClick();
                setActiveCategory(cat);
              }}
              className={`text-[11px] font-mono tracking-widest px-4 py-2 rounded-full transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-[#d4a84b] text-[#050505] border-[#d4a84b] font-medium"
                  : "bg-black/30 text-white/60 border-white/10 hover:border-white/30"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              soundEngine.triggerHoverClick();
              setSelectedProject(project);
            }}
            onMouseEnter={() => soundEngine.triggerHoverClick()}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#0c0c0c] border border-white/10 transition-all duration-500 hover:border-[#d4a84b]/60 hover:shadow-2xl hover:shadow-[#d4a84b]/10"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Play Badge */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 group-hover:scale-110 group-hover:border-[#d4a84b] transition-all">
                <Play className="w-4 h-4 text-[#d4a84b] fill-[#d4a84b]" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#d4a84b] mb-2">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="text-2xl font-display font-light text-white tracking-wider group-hover:text-[#d4a84b] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-sans text-white/60 mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] font-mono text-white/40">
                <span>CLIENT: {project.client}</span>
                <span className="group-hover:translate-x-1 transition-transform text-[#d4a84b]">
                  VIEW CASE STUDY &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8">
          <div className="relative max-w-4xl w-full bg-[#0d0d0d] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 bg-black/70 p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#d4a84b] transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-90" />
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between text-xs font-mono text-[#d4a84b] uppercase tracking-widest mb-2">
                <span>{selectedProject.category} &bull; {selectedProject.client}</span>
                <span>{selectedProject.year}</span>
              </div>
              <h3 className="text-3xl font-display text-white font-light tracking-wide">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-sans text-white/70 mt-4 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-[#d4a84b] text-black font-mono text-xs font-medium tracking-widest px-6 py-3 rounded-full hover:bg-white transition-colors"
                >
                  PLAY REEL
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="border border-white/20 text-white/80 font-mono text-xs tracking-widest px-6 py-3 rounded-full hover:border-white transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
