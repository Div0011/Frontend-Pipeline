"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X, Film } from "lucide-react";
import { prefersReducedMotion, revealOnScroll } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["ALL", "FEATURE", "NARRATIVE", "COMMERCIAL", "DOCUMENTARY"];

const PROJECTS = [
  {
    id: "echoes-of-silence",
    number: "01",
    title: "Echoes of Silence",
    category: "FEATURE",
    year: "2026",
    duration: "114 MIN",
    director: "Marcus Vance",
    thumbnail:
      "https://images.unsplash.com/photo-1536440136628-849c177e76bf?w=1400&q=90",
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-cinematic-night-lights-4421/1080p.mp4",
  },
  {
    id: "concrete-symphony",
    number: "02",
    title: "Concrete Symphony",
    category: "DOCUMENTARY",
    year: "2025",
    duration: "88 MIN",
    director: "Elena Rostova",
    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=90",
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-timelapse-of-a-city-at-night-8493/1080p.mp4",
  },
  {
    id: "amber-drift",
    number: "03",
    title: "Amber Drift",
    category: "COMMERCIAL",
    year: "2025",
    duration: "03 MIN",
    director: "Kaito Tanaka",
    thumbnail:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1400&q=90",
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-tokyo-street-at-night-5491/1080p.mp4",
  },
  {
    id: "monolith-noir",
    number: "04",
    title: "Monolith Noir",
    category: "NARRATIVE",
    year: "2024",
    duration: "24 MIN",
    director: "Marcus Vance",
    thumbnail:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1400&q=90",
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-misty-forest-drone-shot-3490/1080p.mp4",
  },
  {
    id: "solitude-in-motion",
    number: "05",
    title: "Solitude in Motion",
    category: "DOCUMENTARY",
    year: "2024",
    duration: "62 MIN",
    director: "Elena Rostova",
    thumbnail:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1400&q=90",
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-waves-crashing-on-dark-rocks-5431/1080p.mp4",
  },
  {
    id: "void-resonance",
    number: "06",
    title: "Void Resonance",
    category: "FEATURE",
    year: "2024",
    duration: "102 MIN",
    director: "Marcus Vance",
    thumbnail:
      "https://images.unsplash.com/photo-1509198377868-475647b2a1e5?w=1400&q=90",
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-starry-night-sky-timelapse-2849/1080p.mp4",
  },
];

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedVideo, setSelectedVideo] = useState<(typeof PROJECTS)[0] | null>(
    null
  );

  const filtered = PROJECTS.filter(
    (p) => activeCategory === "ALL" || p.category === activeCategory
  );

  useEffect(() => {
    return revealOnScroll(sectionRef.current);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const cards = sectionRef.current.querySelectorAll("[data-project-card]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="relative z-20 border-t border-[#c9a96e]/15 bg-projection-room py-24 md:py-36"
    >
      <div className="gutter-padding mx-auto max-w-[1400px]">
        <div
          data-scroll-reveal
          className="mb-14 flex flex-col gap-8 border-b border-[#c9a96e]/20 pb-10 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]">
              <Film className="h-3.5 w-3.5" />
              Reel Index // 01
            </span>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-[#ebe6dc] md:text-6xl lg:text-7xl">
              Selected
              <br />
              <span className="text-[#c9a96e]">Frames</span>
            </h2>
            <p className="mt-5 max-w-md font-syne text-sm leading-relaxed text-white/50">
              Feature, narrative, commercial, and documentary work — projected at magazine scale.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`interactive border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
                  activeCategory === cat
                    ? "border-[#c9a96e] bg-[#c9a96e] text-[#080706]"
                    : "border-white/15 text-white/55 hover:border-[#c9a96e]/50 hover:text-[#c9a96e]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine asymmetric grid — first item hero-width */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {filtered.map((project, index) => {
            const isLead = index === 0;
            const span = isLead
              ? "md:col-span-8 md:row-span-2 min-h-[420px] md:min-h-[640px]"
              : index === 1 || index === 2
                ? "md:col-span-4 min-h-[300px] md:min-h-[310px]"
                : "md:col-span-4 min-h-[340px]";

            return (
              <article
                key={project.id}
                data-project-card
                data-cursor="Play"
                onClick={() => setSelectedVideo(project)}
                className={`group relative cursor-pointer overflow-hidden border border-white/10 bg-[#0e0c0a] transition-[border-color] duration-500 hover:border-[#c9a96e]/55 ${span}`}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover brightness-[0.72] contrast-125 grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-90 group-hover:grayscale-0"
                  sizes={isLead ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                <div className="absolute left-5 top-5 z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9a96e]">
                  <span>{project.number}</span>
                  <span className="text-white/30">/</span>
                  <span className="text-white/55">{project.category}</span>
                </div>

                <div className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <Play className="ml-0.5 h-4 w-4 fill-[#c9a96e] text-[#c9a96e]" />
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                  <div className="mb-2 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                    <span>{project.year}</span>
                    <span>{project.duration}</span>
                  </div>
                  <h3
                    className={`font-display font-bold uppercase tracking-tight text-[#ebe6dc] ${
                      isLead ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Dir. {project.director}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl sm:p-8">
          <div className="relative w-full max-w-5xl overflow-hidden border border-[#c9a96e]/40 bg-[#0c0a08] shadow-[0_0_80px_rgba(201,169,110,0.12)]">
            <div className="flex items-center justify-between border-b border-white/10 bg-[#050403] px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                <Film className="h-3.5 w-3.5" />
                {selectedVideo.title} — {selectedVideo.year}
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="interactive p-2 text-white/60 transition-colors hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
