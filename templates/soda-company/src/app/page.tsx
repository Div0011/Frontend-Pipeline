"use client";

import { useEffect, useRef, useState } from "react";
import LenisProvider from "@/components/LenisProvider";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSceneStore } from "@/stores/sceneStore";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";
import { PRODUCT_INFO, ProductSlug, PRODUCT_SLUGS } from "@/config/sceneConfig";
import ScrollExpand from "@/components/ScrollExpand";
import ScrollReveal from "@/components/ScrollReveal";
import BlurText from "@/components/reactbits/BlurText";
import VideoScrub from "@/components/VideoScrub";
import HalftoneReveal from "@/components/HalftoneReveal";
import FullPageFooter from "@/components/FullPageFooter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────── Cinematic Hero with 3D Cans ─────────────── */
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Pin and track hero scroll progress (0 -> 1)
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onEnter: () => useSceneStore.getState().setActiveSection("hero"),
        onEnterBack: () => useSceneStore.getState().setActiveSection("hero"),
        onUpdate: (self) => {
          useSceneStore.getState().setActiveSection("hero");
          useSceneStore.getState().setSectionProgress(self.progress);
        },
      });

      // As models disperse on scroll (15% -> 60%), smoothly emerge website name "AURA"
      gsap.fromTo(
        auraRef.current,
        { scale: 0.65, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "12% top",
            end: "50% top",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[200vh] w-full"
    >
      {/* Sticky Hero Viewport: clean initial view with only 3D models */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Only the Website Name "AURA" reveals center-screen as the cans move away */}
        <div className="relative text-center z-10 px-4">
          <div
            ref={auraRef}
            className="font-display text-[clamp(4rem,18vw,16rem)] font-extrabold tracking-tight uppercase leading-none opacity-0 select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
          >
            AURA
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── About Us: 100-Frame Scroll-Scrub Video ─────────────── */
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => useSceneStore.getState().setActiveSection("about"),
        onEnterBack: () => useSceneStore.getState().setActiveSection("about"),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full">
      <VideoScrub />
    </section>
  );
}

/* ─────────────── Choose Your Vibe (With Left/Right Arrows) ─────────────── */
function ChooseYourVibe() {
  const { theme, setActiveProduct, activeProduct } = useAdaptiveTheme();
  const nextCollectionSlug = useSceneStore((s) => s.nextCollectionSlug);
  const prevCollectionSlug = useSceneStore((s) => s.prevCollectionSlug);
  const collectionSlug = useSceneStore((s) => s.collectionSlug);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlug = activeProduct || collectionSlug || "diet";
  const item = PRODUCT_INFO[currentSlug];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => useSceneStore.getState().setActiveSection("trio-select"),
        onEnterBack: () => useSceneStore.getState().setActiveSection("trio-select"),
        onUpdate: (self) => {
          useSceneStore.getState().setTrioSelectProgress(self.progress);
        },
      });

      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="choose-vibe"
      ref={containerRef}
      className="relative w-full min-h-screen py-20 md:py-40 px-6 md:px-16 flex flex-col justify-between items-center overflow-hidden"
    >
      {/* Header */}
      <div data-reveal className="absolute top-12 left-1/2 -translate-x-1/2 w-full text-center z-10 max-w-5xl mx-auto">
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] block mb-4"
          style={{ color: theme.accentColor }}
        >
          Interactive Flavor Carousel
        </span>
        <BlurText
          text="Choose Your Vibe"
          delay={120}
          animateBy="letters"
          direction="bottom"
          className="font-display text-[clamp(2.5rem,7vw,7.5rem)] font-extrabold uppercase leading-[0.9] text-white tracking-widest flex-nowrap whitespace-nowrap drop-shadow-2xl"
        />
      </div>

      {/* Main Interactive Carousel Stage (Left Arrow < | 3D Space in Center | Right Arrow >) */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-between z-20 my-16 max-md:px-2 px-4 md:px-8 min-h-[300px] md:min-h-[400px]">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => {
            prevCollectionSlug();
            const idx = PRODUCT_SLUGS.indexOf(currentSlug);
            const prev = PRODUCT_SLUGS[(idx - 1 + PRODUCT_SLUGS.length) % PRODUCT_SLUGS.length];
            setActiveProduct(prev);
          }}
          className="relative z-30 group flex items-center justify-center w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-white/40 backdrop-blur-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95"
          aria-label="Previous soda can"
        >
          <span className="font-display text-2xl md:text-3xl text-white/80 group-hover:text-white transition-colors">
            &#8592;
          </span>
        </button>

        {/* Center Floating Active Can Label */}
        <div data-reveal className="absolute left-1/2 -translate-x-1/2 top-1/2 -mt-40 md:-mt-48 text-center transition-all duration-500 min-w-[300px] pointer-events-none z-10">
          <h3 className="font-display text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-widest mb-1 flex-nowrap whitespace-nowrap drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" style={{ color: item.accentColor }}>
            {item.name}
          </h3>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => {
            nextCollectionSlug();
            const idx = PRODUCT_SLUGS.indexOf(currentSlug);
            const next = PRODUCT_SLUGS[(idx + 1) % PRODUCT_SLUGS.length];
            setActiveProduct(next);
          }}
          className="relative z-30 group flex items-center justify-center w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-white/40 backdrop-blur-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95"
          aria-label="Next soda can"
        >
          <span className="font-display text-2xl md:text-3xl text-white/80 group-hover:text-white transition-colors">
            &#8594;
          </span>
        </button>
      </div>

      {/* Quick-Select Flavor Pills Removed for Minimalism */}
    </section>
  );
}

/* ─────────────── Selected Can Story: Can on LEFT, Content on RIGHT ─────────────── */
function SelectedCanStoryLeft() {
  const activeProduct = useSceneStore((s) => s.activeProduct);
  const collectionSlug = useSceneStore((s) => s.collectionSlug);
  const { theme } = useAdaptiveTheme();
  const currentSlug = activeProduct || collectionSlug || "diet";
  const item = PRODUCT_INFO[currentSlug];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Trigger flavor-story so 3D can places itself on the LEFT
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => useSceneStore.getState().setActiveSection("flavor-story"),
        onEnterBack: () => useSceneStore.getState().setActiveSection("flavor-story"),
      });

      // Scroll Text Reveal animations for the right column
      gsap.fromTo(
        el.querySelectorAll("[data-scroll-reveal]"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [currentSlug]);

  return (
    <section
      id="can-story-left"
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-40 px-6 md:px-16 overflow-hidden"
    >
      {/* 2-Column Grid: Left side for 3D can, Right side for Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center relative z-10">
        
        {/* Left Column: Dedicated framing space for the floating 3D Can */}
        <div className="min-h-[250px] md:min-h-[600px] flex items-end p-8 pointer-events-none">
          {/* 3D can floats here, no borders or background */}
        </div>

        {/* Right Column: Scroll Text Reveal Story Content */}
        <div className="space-y-8 max-w-lg">
          <div data-scroll-reveal>
            <h2 className="font-display text-[clamp(2.8rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] text-white tracking-wide">
              {item.name}
            </h2>
          </div>

          <div data-scroll-reveal>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans font-light">
              {item.description}
            </p>
          </div>

          {/* Order Call to Action */}
          <div data-scroll-reveal className="pt-2">
            <Link
              href="/products"
              className="magnetic-button"
              style={{ borderColor: item.accentColor }}
            >
              Order Batch &bull; {item.price}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────── Selected Can Craft: Content on LEFT, Can on RIGHT ─────────────── */
function SelectedCanStoryRight() {
  const activeProduct = useSceneStore((s) => s.activeProduct);
  const collectionSlug = useSceneStore((s) => s.collectionSlug);
  const { theme } = useAdaptiveTheme();
  const currentSlug = activeProduct || collectionSlug || "diet";
  const item = PRODUCT_INFO[currentSlug];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Trigger molecular-craft so 3D can shifts to the RIGHT
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => useSceneStore.getState().setActiveSection("molecular-craft"),
        onEnterBack: () => useSceneStore.getState().setActiveSection("molecular-craft"),
      });

      // Scroll Text Reveal animations for the left column
      gsap.fromTo(
        el.querySelectorAll("[data-scroll-reveal-left]"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [currentSlug]);

  return (
    <section
      id="can-story-right"
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-40 px-6 md:px-16 overflow-hidden"
    >
      {/* 2-Column Grid: Content on LEFT, Right side for 3D Can */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center relative z-10">
        
        {/* Left Column: Molecular Extraction & Sourcing Story Content */}
        <div className="space-y-8 max-w-lg">
          <div data-scroll-reveal-left>
            <h2 className="font-display text-[clamp(2.8rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] text-white tracking-wide">
              Molecular Sourcing
            </h2>
          </div>

          <div data-scroll-reveal-left>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans font-light">
              Every drop of <span className="font-bold text-white">{item.name}</span> passes through sub-micron ionization filters. Infused with cold-pressed natural botanicals under 3.2 atmospheres of pressure to preserve delicate aromatic compounds without preservatives.
            </p>
          </div>

          <div data-scroll-reveal-left className="pt-2">
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white underline underline-offset-4 transition-colors"
            >
              Learn about our clean bio-facility &rarr;
            </Link>
          </div>
        </div>

        {/* Right Column: Dedicated framing space for the floating 3D Can */}
        <div className="min-h-[250px] md:min-h-[600px] flex items-end justify-end p-8 pointer-events-none">
          {/* Label removed for minimalism */}
        </div>

      </div>
    </section>
  );
}

/* ─────────────── Explore More Options (No 3D Models in Background) ─────────────── */
function ExploreMoreSection() {
  const { theme } = useAdaptiveTheme();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hide all 3D models in this section
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => useSceneStore.getState().setActiveSection("explore"),
        onEnterBack: () => useSceneStore.getState().setActiveSection("explore"),
      });

      gsap.fromTo(
        el.querySelectorAll("[data-reveal-explore]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explore-more"
      ref={sectionRef}
      className="relative w-full py-40 px-6 md:px-16 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Radial glow bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 40%, ${theme.glowColor} 0%, transparent 70%)`,
          opacity: 0.18,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <span
          data-reveal-explore
          className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] block"
          style={{ color: theme.accentColor }}
        >
          Curated Product Spectrum
        </span>

        <h2
          data-reveal-explore
          className="font-display text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.9] text-white"
        >
          Discover The Entire Matrix
        </h2>

        <p data-reveal-explore className="text-base md:text-lg text-white/70 font-sans max-w-xl mx-auto leading-relaxed">
          From Classic Yuzu effervescence to Electric Berry Zero and Cosmic Blood Orange. Explore complete nutritional profiles and multi-pack editions.
        </p>

        {/* Explore More Options Button Leading to /products */}
        <div data-reveal-explore className="pt-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-display font-bold uppercase tracking-wider text-sm md:text-base hover:scale-105 hover:bg-white/90 active:scale-95 transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
          >
            <span>Explore More Options</span>
            <span className="text-lg">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}



/* ─────────────── Main Home Page ─────────────── */
export default function Home() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen text-[#f3f1ec] bg-transparent">
        <HeroSection />
        <AboutSection />
        <ChooseYourVibe />
        <SelectedCanStoryLeft />
        <SelectedCanStoryRight />
        <ExploreMoreSection />
        <FullPageFooter />
      </main>
    </LenisProvider>
  );
}
