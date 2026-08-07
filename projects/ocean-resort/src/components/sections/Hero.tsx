"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Waves, ArrowDownRight, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const underwaterLayerRef = useRef<HTMLDivElement>(null);
  const surfaceContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const pinEl = pinContainerRef.current;
    if (!pinEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      // Smooth scroll emergence animation
      tl.to(underwaterLayerRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      })
      .fromTo(
        surfaceContentRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .fromTo(
        titleRef.current,
        { letterSpacing: "0.15em" },
        { letterSpacing: "-0.01em", duration: 0.6, ease: "power1.out" },
        "-=0.4"
      );
    }, pinContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinContainerRef} className="relative w-full h-screen overflow-hidden bg-[#094067]">
      {/* Background Ocean Surface Video Stream */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover scale-105"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/media/ocean-surface.mp4" type="video/mp4" />
        </video>
        
        {/* Soft Sunlit Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#094067]/40 via-transparent to-[#094067]/80" />
      </div>

      {/* DEEP UNDERWATER LAYER (Scroll to Emerge) */}
      <div
        ref={underwaterLayerRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#042a42] via-[#094067]/95 to-[#00a896]/85 backdrop-blur-xl"
      >
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full border-[#48d1cc]/40">
            <Waves className="w-3.5 h-3.5 text-[#48d1cc] animate-pulse" />
            <span className="font-mono text-[10px] text-[#48d1cc] uppercase tracking-[0.3em]">
              DEPTH: -15M UNDERWATER
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e6] font-light tracking-wide uppercase">
            SUBMERGED IN <span className="italic text-[#48d1cc]">SERENITY</span>
          </h2>

          <p className="font-body text-xs md:text-sm text-[#90e0ef]/80 font-light max-w-md mx-auto leading-relaxed">
            Scroll down to emerge from beneath the water and discover Azure Shore.
          </p>

          <div className="pt-4 flex flex-col items-center gap-2 animate-bounce">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#48d1cc]">
              SCROLL TO EMERGE
            </span>
            <div className="w-5 h-8 rounded-full border border-[#48d1cc]/50 flex items-center justify-center p-1">
              <div className="w-1 h-2 bg-[#48d1cc] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* REVEALED SURFACE HERO CONTENT */}
      <div
        ref={surfaceContentRef}
        className="relative z-20 w-full h-full flex flex-col justify-between items-center text-center px-6 pt-32 pb-16 max-w-6xl mx-auto"
      >
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2.5 glass-card px-5 py-2 rounded-full border-[#48d1cc]/30">
          <Compass className="w-3.5 h-3.5 text-[#48d1cc]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f5f0e6]">
            MALDIVES ATOLL • 5° N, 73° E
          </span>
        </div>

        {/* Branding Title */}
        <div className="my-auto py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#48d1cc] font-medium block mb-3">
            A LUXURY OCEANFRONT SANCTUARY
          </span>

          <h1
            ref={titleRef}
            className="font-display text-[clamp(3.5rem,10vw,8.5rem)] text-[#f5f0e6] font-normal leading-none tracking-tight"
          >
            AZURE SHORE
          </h1>

          <p className="font-body text-sm md:text-base text-[#f5f0e6]/80 max-w-lg mx-auto mt-6 font-light leading-relaxed">
            Where crystal turquoise waters meet architectural perfection.
          </p>

          {/* CTA */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-[#48d1cc] text-[#094067] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#e0f7fa] transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <span>RESERVE SANCTUARY</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Footer Spec */}
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#90e0ef]/80">
          MALDIVES · PRIVATE ATOLL · EST. 1987
        </div>
      </div>
    </div>
  );
}
