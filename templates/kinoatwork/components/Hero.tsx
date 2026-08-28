"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero3D = dynamic(() => import("./three/Hero3D"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-ink">
      <Hero3D />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h1
          className="hero-title type-display text-5xl sm:text-7xl lg:text-8xl text-brand-paper leading-[0.9] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          KINO<span className="text-brand-accent">.</span>ATWORK
        </h1>
        <p
          className="hero-subtitle type-serif text-lg sm:text-xl text-brand-muted max-w-xl mt-6 leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Cinematic storytelling where light, silence, and tempo converge.
        </p>
      </div>
    </section>
  );
}
