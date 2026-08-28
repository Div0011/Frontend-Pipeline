"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EntranceVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (videoRef.current && sectionRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1.2, opacity: 0.65 },
          {
            scale: 1.0,
            opacity: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }

      if (textRef.current && sectionRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="entrance-section"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-8 py-44 overflow-hidden bg-[#160306] z-10"
    >
      {/* Grand Hallway Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-80 contrast-110"
        >
          <source src="/media/grand-entrance.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#160306] via-[#160306]/40 to-[#160306]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#160306]/75 via-transparent to-[#160306]/75" />
      </div>

      {/* Spacious Welcoming Card Over Entrance Video */}
      <div
        ref={textRef}
        className="relative z-10 max-w-3xl mx-auto p-10 md:p-16 bg-[#160306]/85 border border-[#f5d061]/25 backdrop-blur-md"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#f5d061] block mb-4">
          WELCOME TO THE THRESHOLD
        </span>

        <h2 className="font-display text-4xl md:text-5xl text-[#f5d061] tracking-tight leading-tight mb-6">
          STEP INSIDE OUR <br />
          <span className="italic text-[#faf0ca] font-normal">WARM HALLWAYS</span>
        </h2>

        <p className="font-sans text-sm md:text-base text-[#faf0ca]/80 leading-relaxed font-light max-w-xl mx-auto mb-8">
          Beyond these double doors lies a sanctuary crafted for peace and rejuvenation. High vaulted arches,
          warm oil lamps, and the fragrance of fresh jasmine welcoming your every step.
        </p>

        <div className="flex justify-center items-center gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[#f5d061]/80 pt-4 border-t border-[#f5d061]/20">
          <span>HERITAGE PALACE</span>
          <span className="w-1 h-1 rounded-full bg-[#f5d061]" />
          <span>24/7 BUTLER CARE</span>
          <span className="w-1 h-1 rounded-full bg-[#f5d061]" />
          <span>LOTUS COURTYARDS</span>
        </div>
      </div>
    </section>
  );
}
