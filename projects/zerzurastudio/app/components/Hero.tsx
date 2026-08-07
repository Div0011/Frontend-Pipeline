"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero3D from "./Hero3D";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: "cold-open", label: "COLD OPEN" },
  { id: "about", label: "THE PHILOSOPHY" },
  { id: "projects", label: "THE WORK" },
  { id: "careers", label: "JOIN US" },
  { id: "join", label: "CONNECT" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2);
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 120, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 2.2,
            ease: "power4.out",
            delay: 5.8,
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            delay: 6.5,
          }
        );
      }

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      CHAPTERS.forEach((chapter, index) => {
        const el = document.getElementById(chapter.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setCurrentChapter(index),
          onEnterBack: () => setCurrentChapter(index),
        });
      });
    }, heroRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="cold-open"
      className="relative min-h-screen flex items-center overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="w-full h-full" />}>
          <Hero3D scrollProgress={scrollProgress} />
        </Suspense>
      </div>

      {/* Atmospheric gradients */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute top-[5%] -right-[10%] w-[900px] h-[900px] rounded-full bg-cinema-gold/[0.06] blur-[220px]"
          style={{ transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px)` }}
        />
        <div
          className="absolute -bottom-[10%] -left-[10%] w-[700px] h-[700px] rounded-full bg-cinema-gold-light/[0.04] blur-[180px]"
          style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)` }}
        />
      </div>

      {/* Cinematic top/bottom fade */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-cinema-black via-transparent to-cinema-black opacity-70" />

      {/* Hero content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen pointer-events-auto">
        <div ref={contentRef} className="flex flex-col justify-center order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-cinema-gold text-xs font-bold tracking-[0.3em]" style={{ fontFamily: "var(--font-display)" }}>
              [
            </span>
            <p className="text-[10px] uppercase tracking-[0.5em] text-cinema-gold/80" style={{ fontFamily: "var(--font-body)" }}>
              Creative Incubator
            </p>
            <span className="text-cinema-gold text-xs font-bold tracking-[0.3em]" style={{ fontFamily: "var(--font-display)" }}>
              ]
            </span>
          </div>

          <div ref={titleRef}>
            <h1
              className="block text-6xl md:text-7xl lg:text-[8.5rem] font-bold leading-[0.8] tracking-tighter text-cinema-cream mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ZERZURA
            </h1>
            <h1
              className="block text-5xl md:text-6xl lg:text-[7rem] font-bold leading-[0.8] tracking-tighter text-cinema-gold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              STUDIO
            </h1>
            <p className="text-lg md:text-xl font-light text-cinema-text-muted tracking-wide max-w-lg" style={{ fontFamily: "var(--font-body)" }}>
              Let&apos;s build a community to change the world.
            </p>
          </div>

          <p className="mt-10 text-sm text-cinema-text-muted max-w-md leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            At Zerzura Studio, we craft tools to grant wishes and fulfill dreams. We build projects across all digital segments — entertainment apps that rethink existing genres, and AI tools to simplify work processes.
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-12">
            <a
              href="#projects"
              className="group relative rounded-full bg-cinema-gold px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-cinema-black transition-all duration-500 hover:bg-cinema-gold-light hover:scale-105 cursor-hover overflow-hidden"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="relative z-10">Explore Projects</span>
              <div className="absolute inset-0 bg-cinema-gold-light/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a
              href="#join"
              className="rounded-full border border-cinema-gold/30 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-cinema-cream transition-all duration-500 hover:bg-cinema-gold/10 hover:border-cinema-gold/50 cursor-hover"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join Us
            </a>
          </div>
        </div>

        <div
          className="order-1 lg:order-2 relative flex items-center justify-center min-h-[300px] lg:min-h-[500px]"
          style={{
            transform: `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)`,
            transition: "transform 0.4s ease-out",
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-cinema-gold/8 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 border border-cinema-gold/20 rounded-full animate-pulse" />
            <div className="absolute inset-4 border border-cinema-gold/10 rounded-full" />
            <div className="absolute inset-8 border border-cinema-gold/5 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-cinema-gold/30 text-6xl md:text-7xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                Z
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter indicator */}
      <div className="absolute top-24 right-6 z-30 hidden md:flex flex-col items-end gap-3">
        {CHAPTERS.map((chapter, i) => (
          <div
            key={chapter.id}
            className={`text-[10px] font-bold tracking-[0.25em] transition-all duration-700 ${
              i === currentChapter ? "text-cinema-gold opacity-100" : "text-cinema-text-muted opacity-30"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [{chapter.label}]
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cinema-text-muted" style={{ fontFamily: "var(--font-body)" }}>
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-cinema-gold/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-cinema-gold animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
