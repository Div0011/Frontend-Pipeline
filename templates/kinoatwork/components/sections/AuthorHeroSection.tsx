"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GlitchText from "@/components/kokonutui/glitch-text";
import CinematicHero3D from "@/components/three/CinematicHero3D";
import MotionStaggerText from "@/components/motion/MotionStaggerText";
import { soundEngine } from "@/lib/audio";
import { BookOpen, Sparkles, Compass } from "lucide-react";

export default function AuthorHeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-28 pb-16 text-[#F8F6F3]">
      {/* 3D Interactive Lens Layer in background */}
      <CinematicHero3D progress={0.5} />

      <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Glitch Branding & Hero Typography */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#d4a84b]/40 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4a84b]" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
              AUTEUR & SCREENWRITER ARCHIVE
            </span>
          </motion.div>

          <GlitchText
            text="JULIAN VANCE"
            color="gradient-orange"
            glitchIntensity="medium"
            size="3xl"
            letterSpacing={8}
            className="p-0 text-left justify-start"
          />

          <h1 className="text-3xl sm:text-5xl font-display font-light tracking-tight mt-4 text-white leading-tight">
            <MotionStaggerText text="Where Speculative Prose Meets Anamorphic Cinema." delay={0.2} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-sm sm:text-base font-sans text-white/70 max-w-2xl leading-relaxed"
          >
            International Booker Prize Shortlisted Author & Director. Crafting high-concept literary narratives, spatial audio scores, and cinematic screenplays exploring human consciousness, silence, and light.
          </motion.p>

          {/* Motion Interactive Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#works"
              onClick={() => soundEngine.triggerHoverClick()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-[#d4a84b] text-black font-mono text-xs font-semibold tracking-widest px-8 py-4 rounded-full hover:bg-white transition-all shadow-xl shadow-[#d4a84b]/20 flex items-center gap-3"
            >
              <BookOpen className="w-4 h-4" />
              READ MASTERWORKS
            </motion.a>

            <motion.a
              href="#journey"
              onClick={() => soundEngine.triggerHoverClick()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="border border-white/20 text-white font-mono text-xs tracking-widest px-8 py-4 rounded-full hover:border-[#d4a84b] hover:text-[#d4a84b] transition-all backdrop-blur-md flex items-center gap-3"
            >
              <Compass className="w-4 h-4" />
              EXPLORE JOURNEY
            </motion.a>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.8 }}
            className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-8 text-left w-full max-w-lg"
          >
            <div>
              <span className="block text-2xl font-display font-light text-white">4</span>
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">PUBLISHED NOVELS</span>
            </div>
            <div>
              <span className="block text-2xl font-display font-light text-[#d4a84b]">2.4M+</span>
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">GLOBAL READERS</span>
            </div>
            <div>
              <span className="block text-2xl font-display font-light text-white">6</span>
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">SCREEN AWARDS</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Author Portrait & Monolith Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex flex-col items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-[#0e0e0e]">
            <Image
              src="/images/julian_vance_portrait.png"
              alt="Julian Vance Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-mono text-[#d4a84b] tracking-widest block uppercase">
                STUDIO DIRECTIVE &bull; PARIS / MUMBAI
              </span>
              <p className="text-xs font-display italic text-white/90 mt-1">
                &ldquo;Prose is simply camera movement slowed down to the speed of thought.&rdquo;
              </p>
              <span className="text-[9px] font-mono text-white/40 block mt-2">— JULIAN VANCE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
