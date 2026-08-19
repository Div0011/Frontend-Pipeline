"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Stamp from "./Stamp";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const philosophyTextRef = useRef<HTMLDivElement>(null);
  const directorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    const philosophyText = philosophyTextRef.current;
    const directors = directorsRef.current;

    if (!container || !bg || !philosophyText || !directors) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Fallback for reduced motion: just display everything statically
        gsap.set(philosophyText, { opacity: 1, scale: 1 });
        gsap.set(directors, { opacity: 1, visibility: "visible" });
        gsap.set(bg, { backgroundColor: "#F2EFEA" });
        return;
      }

      // Main pin timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.5,
        },
      });

      // 1. Zoom and fade out philosophy text, while morphing background from dark ink (#2D2A26) to warm light (#F8F6F3)
      tl.to(bg, {
        backgroundColor: "#F8F6F3",
        duration: 3,
      })
      .to(philosophyText, {
        scale: 12,
        opacity: 0,
        duration: 4,
        ease: "power2.in",
      }, "<")
      .set(philosophyText, { display: "none" }) // Hide text to allow clicking directors cards
      
      // 2. Fade in the Directors showcase
      .to(directors, {
        autoAlpha: 1,
        duration: 2.5,
        ease: "power2.out",
      });

      // 3. Staggered slide up of director cards
      const cards = directors.querySelectorAll(".director-card");
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 2.5, stagger: 0.6, ease: "power3.out" },
          "-=2"
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background color morph wrapper */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-brand-ink transition-colors duration-300"
      />

      {/* STAGE 1: Philosophy Zoom Text */}
      <div
        ref={philosophyTextRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 select-none text-center transform-gpu origin-center"
      >
        <Stamp>PHILOSOPHY</Stamp>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-brand-paper mt-8 mb-6 tracking-tight leading-tight max-w-4xl">
          Slow Cinema, <span className="font-script text-brand-accent-warm normal-case font-normal">Deliberate</span> Light
        </h2>
        <p className="text-base md:text-xl text-brand-muted max-w-2xl font-light leading-relaxed">
          We believe in wide spaces, quiet sequences, and allowing frames to breathe.
          We don&apos;t chase attention; we design visual architectures that invite viewers to settle and stay.
        </p>
        <div className="flex gap-16 mt-16 text-[10px] font-mono tracking-widest text-brand-accent-warm pt-8 w-full justify-center">
          <span>01 // RESTRAINT</span>
          <span>02 // ATMOSPHERE</span>
          <span>03 // TEMPO</span>
        </div>
      </div>

      {/* STAGE 2: Meet the Directors Showcase */}
      <div
        ref={directorsRef}
        className="absolute inset-0 z-10 opacity-0 invisible flex flex-col justify-center px-6 sm:px-12 md:px-24 py-12"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-10 sm:gap-14 md:gap-16">
          <div className="text-center select-none">
            <span className="text-[10px] font-mono tracking-widest text-brand-accent border border-brand-accent/20 px-4 py-2 rounded-full inline-block bg-brand-paper/40 backdrop-blur-xs select-none">
              THE MAISON
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-brand-ink mt-6 tracking-tight">
              Meet our <span className="font-script text-brand-accent-warm normal-case font-normal">Directors</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 w-full">
            {/* Director 1: Aarav */}
            <div className="director-card flex flex-col gap-6 text-left group">
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-md border border-brand-border bg-brand-paper-warm relative cursor-pointer" data-cursor="AARAV MEHTA">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=90&fit=crop&grayscale"
                  alt="Aarav Mehta"
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="pl-4 border-l-2 border-brand-ink">
                <h3 className="font-display font-bold text-2xl text-brand-ink">Aarav Mehta</h3>
                <p className="text-[10px] font-mono tracking-wider text-brand-accent-warm uppercase mt-1">
                  Director & Cinematographer
                </p>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mt-3 max-w-md">
                  Co-founder of SFUMATO. Aarav specializes in slow-cinema narratives
                  and high-contrast natural lighting, capturing the raw, sacred
                  essence of India&apos;s ancient ghats and rivers.
                </p>
              </div>
            </div>

            {/* Director 2: Elena */}
            <div className="director-card flex flex-col gap-6 text-left group md:mt-12">
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-md border border-brand-border bg-brand-paper-warm relative cursor-pointer" data-cursor="ELENA ROSTOVA">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=90&fit=crop&grayscale"
                  alt="Elena Rostova"
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="pl-4 border-l-2 border-brand-ink">
                <h3 className="font-display font-bold text-2xl text-brand-ink">Elena Rostova</h3>
                <p className="text-[10px] font-mono tracking-wider text-brand-accent-warm uppercase mt-1">
                  Visual Editor & Artist
                </p>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mt-3 max-w-md">
                  Elena leads post-production and motion architecture. Her visual work blends the neon nocturnes of Mumbai with minimalist European design, creating editing rhythms that linger in memory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
