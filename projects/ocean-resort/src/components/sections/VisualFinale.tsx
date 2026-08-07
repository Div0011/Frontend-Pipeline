"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Calendar, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface VisualFinaleProps {
  onOpenBooking: () => void;
}

export default function VisualFinale({ onOpenBooking }: VisualFinaleProps) {
  const pinSectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const sectionEl = pinSectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // Smooth aerial perspective reveal on scroll
      gsap.fromTo(
        videoRef.current,
        { scale: 1.25, filter: "brightness(0.7)" },
        {
          scale: 1,
          filter: "brightness(0.95)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 60%",
          },
        }
      );
    }, pinSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pinSectionRef}
      id="finale-section"
      className="relative w-full h-screen min-h-[650px] overflow-hidden bg-[#094067] flex items-center justify-center text-center px-6"
    >
      {/* Background Aerial Video Stream */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/media/aerial-resort.mp4" type="video/mp4" />
        </video>

        {/* Vibrant Ocean Overlay (NO BLACK) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#094067]/90 via-[#1e6091]/40 to-[#00a896]/20" />
      </div>

      {/* Minimal Visual Reveal Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto glass-card-strong rounded-3xl p-8 md:p-12 border-[#48d1cc]/40 shadow-2xl space-y-6"
      >
        <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full border-[#48d1cc]/40">
          <Sparkles className="w-3.5 h-3.5 text-[#e5c378]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#48d1cc]">
            AERIAL VISUAL REVEAL
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-6xl text-[#f5f0e6] leading-tight font-normal">
          YOUR PARADISE <span className="italic text-[#48d1cc]">AWAITS</span>
        </h2>

        <p className="font-body text-xs md:text-sm text-[#f5f0e6]/80 max-w-lg mx-auto font-light leading-relaxed">
          From crystal clear shallow reefs to private overwater havens, experience the pinnacle of luxury.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#48d1cc] text-[#094067] font-mono text-xs uppercase tracking-widest font-bold shadow-lg hover:bg-[#e0f7fa] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>RESERVE STAY</span>
          </button>

          <a
            href="#hero-section"
            className="w-full sm:w-auto px-7 py-4 rounded-full glass-card border-[#48d1cc]/40 text-[#f5f0e6] font-mono text-xs uppercase tracking-widest hover:bg-[#48d1cc]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>BACK TO TOP</span>
            <ArrowUpRight className="w-4 h-4 text-[#48d1cc]" />
          </a>
        </div>
      </div>
    </section>
  );
}
