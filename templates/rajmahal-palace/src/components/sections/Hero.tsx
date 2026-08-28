"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        title1Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, delay: 0.3 }
      )
        .fromTo(
          title2Ref.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4 },
          "-=1.0"
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          "-=0.8"
        );

      if (videoWrapRef.current && heroRef.current) {
        gsap.fromTo(
          videoWrapRef.current,
          { scale: 1.0, opacity: 0.8 },
          {
            scale: 1.2,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-between items-center text-center px-8 pt-44 pb-28 overflow-hidden z-10"
    >
      {/* Background Rotating Pattern Video */}
      <div ref={videoWrapRef} className="absolute inset-0 z-0 overflow-hidden will-change-transform">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-90 contrast-105"
        >
          <source src="/media/indian-pattern.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#160306]/75 via-[#160306]/40 to-[#160306]" />
        <div className="absolute inset-0 jaali-pattern opacity-10" />
      </div>

      {/* Top Welcoming Tag */}
      <div className="relative z-10 flex items-center gap-4">
        <span className="h-px w-12 bg-[#f5d061]/40" />
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#f5d061]">
          NAMASTE · WELCOME TO RAAJMAHAL
        </span>
        <span className="h-px w-12 bg-[#f5d061]/40" />
      </div>

      {/* Main Spacious Headline */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto py-16">
        <div className="overflow-hidden mb-2">
          <h1
            ref={title1Ref}
            className="font-display text-[clamp(3.5rem,9vw,7.5rem)] text-[#f5d061] tracking-tight leading-[1.05] gold-glow"
          >
            A SANCTUARY OF
          </h1>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={title2Ref}
            className="font-display text-[clamp(3.5rem,9vw,7.5rem)] text-[#faf0ca] italic font-normal tracking-tight leading-[1.05]"
          >
            QUIET ROYALTY.
          </h1>
        </div>

        <p
          ref={subRef}
          className="font-sans text-base md:text-lg text-[#faf0ca]/80 max-w-xl mx-auto mt-10 leading-relaxed font-light tracking-wide"
        >
          Where centuries of Indian heritage wrap around you with warmth and grace.
          Hand-carved marble courtyards, private infinity pools, and gentle hospitality.
        </p>

        {/* Minimal Welcoming CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={onOpenBooking}
            data-cursor="hover"
            data-cursor-label="WELCOME"
            className="px-10 py-4.5 bg-[#f5d061] text-[#160306] font-mono text-xs uppercase tracking-[0.3em] font-bold shadow-[0_0_30px_rgba(245,208,97,0.3)] hover:bg-[#ffdf7a] transition-all duration-300 cursor-pointer"
          >
            Begin Your Stay
          </button>
          <a
            href="#entrance-section"
            data-cursor="hover"
            className="px-8 py-4.5 border border-[#f5d061]/35 text-[#f5d061] font-mono text-xs uppercase tracking-[0.3em] hover:bg-[#f5d061]/10 transition-colors duration-300 cursor-pointer"
          >
            Explore Sanctuary ↓
          </a>
        </div>
      </div>

      {/* Bottom Footer Hint */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-5xl px-4 font-mono text-[9px] uppercase tracking-[0.35em] text-[#faf0ca]/50">
        <span>JAIPUR · RAJASTHAN</span>
        <span>A SANCTUARY OF QUIET LUXURY</span>
        <span>EST. 1592</span>
      </div>
    </section>
  );
}
