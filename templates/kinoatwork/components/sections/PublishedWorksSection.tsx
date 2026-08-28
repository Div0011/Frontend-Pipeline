"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MotionSpotlightCard from "@/components/motion/MotionSpotlightCard";
import MotionStaggerText from "@/components/motion/MotionStaggerText";
import { soundEngine } from "@/lib/audio";
import { BookOpen, X, ArrowRight } from "lucide-react";

interface Work {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  image: string;
  synopsis: string;
  excerpt: string;
  acclaim: string;
  pages: string;
}

const WORKS: Work[] = [
  {
    id: "anamorphic-dreams",
    title: "ANAMORPHIC DREAMS",
    subtitle: "Journeys Through a Fractured Reality",
    year: "2018",
    category: "Speculative Fiction Novella",
    image: "/images/anamorphic_dreams_cover.png",
    synopsis: "A haunting exploration of an archivist who discovers optical memory leaks embedded inside vintage camera lenses from the 1950s.",
    excerpt: "Light does not travel in straight lines when memory is involved. It bends around silence, curving toward the places we were afraid to look...",
    acclaim: "Shortlisted for the International Booker Prize",
    pages: "248 Pgs",
  },
  {
    id: "echoes-of-silence",
    title: "ECHOES OF SILENCE",
    subtitle: "The Anatomy of Solitude",
    year: "2024",
    category: "Hardcover Novel",
    image: "/images/echoes_of_silence_cover.png",
    synopsis: "Set in an isolated observatory in the Icelandic highlands, an acoustic researcher tracks sub-audible frequencies that foretell human history.",
    excerpt: "The wind high in the mountain pass makes no sound until it hits something crafted by human hands. Silence is simply the earth breathing unobserved...",
    acclaim: "Global Best Seller & Cannes Grand Prix Screenplay",
    pages: "412 Pgs",
  },
  {
    id: "glass-horizon",
    title: "THE GLASS HORIZON",
    subtitle: "The Architecture of Tomorrow",
    year: "2026",
    category: "Interactive Digital Novel",
    image: "/images/glass_horizon_cover.png",
    synopsis: "A towering metropolis built entirely of smart obsidian glass reflects the parallel lives of its inhabitants across temporal planes.",
    excerpt: "Every pane of glass in the spire holds two reflections: the person standing before it, and the ghost of who they almost became...",
    acclaim: "IMAX Digital Production 2026",
    pages: "380 Pgs",
  },
];

export default function PublishedWorksSection() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  return (
    <section id="works" className="relative z-10 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Motion Stagger Text */}
        <div className="border-b border-white/10 pb-10 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase block mb-2">
              [ CHAPTER 02 — PUBLISHED MASTERWORKS ]
            </span>
            <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight">
              <MotionStaggerText text="Literary & Screen Catalog" />
            </h2>
          </div>

          <p className="text-xs font-mono text-white/50 max-w-xs tracking-wider">
            Explore hardcover editions, digital manuscripts, and theatrical screenplays.
          </p>
        </div>

        {/* Works Grid with MotionSpotlightCard & Layout ID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {WORKS.map((work) => (
            <MotionSpotlightCard
              key={work.id}
              onClick={() => {
                soundEngine.triggerHoverClick();
                setSelectedWork(work);
              }}
              onMouseEnter={() => soundEngine.triggerHoverClick()}
              className="flex flex-col justify-between"
            >
              <div>
                {/* Book Cover Image */}
                <motion.div
                  layoutId={`cover-${work.id}`}
                  className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black mb-6 shadow-xl"
                >
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60" />

                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-[#d4a84b]">
                    {work.year}
                  </div>
                </motion.div>

                <span className="text-[10px] font-mono text-[#d4a84b] tracking-widest block uppercase">
                  {work.category}
                </span>

                <motion.h3
                  layoutId={`title-${work.id}`}
                  className="text-2xl font-display font-light text-white tracking-wide mt-1 group-hover:text-[#d4a84b] transition-colors"
                >
                  {work.title}
                </motion.h3>
                <p className="text-xs font-display italic text-white/60 mt-1">
                  {work.subtitle}
                </p>

                <p className="text-xs font-sans text-white/70 mt-3 line-clamp-3 leading-relaxed">
                  {work.synopsis}
                </p>
              </div>

              <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>{work.pages}</span>
                <span className="group-hover:translate-x-1 transition-transform text-[#d4a84b] flex items-center gap-1">
                  READ EXCERPT <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </MotionSpotlightCard>
          ))}
        </div>
      </div>

      {/* Motion AnimatePresence Excerpt Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          >
            <motion.div
              layoutId={`card-${selectedWork.id}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-3xl w-full bg-[#0e0d0c] border border-[#d4a84b]/40 rounded-2xl overflow-hidden p-8 sm:p-12 shadow-2xl"
            >
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-6 right-6 z-20 bg-black/60 p-2.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#d4a84b] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-[#d4a84b] uppercase tracking-widest mb-4">
                <BookOpen className="w-4 h-4" />
                <span>MANUSCRIPT EXCERPT &bull; {selectedWork.year}</span>
              </div>

              <motion.h3
                layoutId={`title-${selectedWork.id}`}
                className="text-3xl sm:text-4xl font-display font-light text-white"
              >
                {selectedWork.title}
              </motion.h3>
              <p className="text-sm font-display italic text-[#d4a84b] mt-1">
                {selectedWork.subtitle}
              </p>

              {/* Blockquote Excerpt */}
              <div className="my-8 p-6 bg-black/50 border-l-2 border-[#d4a84b] rounded-r-xl">
                <p className="text-base font-serif italic text-white/90 leading-relaxed">
                  &ldquo;{selectedWork.excerpt}&rdquo;
                </p>
              </div>

              <p className="text-xs font-sans text-white/70 leading-relaxed">
                {selectedWork.synopsis}
              </p>

              <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-mono text-[#d4a84b]">
                  ACCLAIM: {selectedWork.acclaim}
                </span>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="bg-[#d4a84b] text-black font-mono text-xs font-semibold tracking-widest px-6 py-3 rounded-full hover:bg-white transition-colors"
                >
                  CLOSE MANUSCRIPT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
