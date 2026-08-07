"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars, animateSplitChars } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL =
  "https://cdn.coverr.co/videos/coverr-aerial-view-of-city-buildings-2773/1080p.mp4";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ─── Video Parallax (60fps) ────────────────────────
      if (videoWrapperRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          { scale: 1, y: 0, opacity: 0.6 },
          {
            scale: 1.2,
            y: 180,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // ─── Abstract Background Shape ─────────────────────
      if (bgShapeRef.current) {
        gsap.to(bgShapeRef.current, {
          rotation: 15,
          scale: 1.3,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 60%",
            scrub: 1,
          },
        });
      }

      // ─── Title Group Fade Out on Scroll ────────────────
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 40%",
            scrub: 0.5,
          },
        });
      }

      // ─── Subtitle (masthead) entrance ──────────────────
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      // ─── Headline: Split-Char Animation ────────────────
      // The headline uses dangerouslySetInnerHTML with split chars
      if (headlineRef.current) {
        animateSplitChars(headlineRef.current, {
          delay: 0.3,
          stagger: 0.025,
          duration: 1.4,
          ease: "expo.out",
          y: 60,
        });
      }

      // ─── Accent italic word split reveal ───────────────
      if (accentRef.current) {
        gsap.from(accentRef.current, {
          opacity: 0,
          x: -30,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.8,
        });
      }

      // ─── Description ───────────────────────────────────
      if (descRef.current) {
        gsap.from(descRef.current, {
          y: 30,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // ─── CTA Buttons ───────────────────────────────────
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 25,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.65,
        });
      }

      // ─── Bottom Bar ────────────────────────────────────
      if (bottomBarRef.current) {
        gsap.from(bottomBarRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
        });
      }

      // ─── Scanline subtle pulse ─────────────────────────
      if (scanlineRef.current) {
        gsap.to(scanlineRef.current, {
          opacity: 0.08,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] w-full overflow-hidden bg-[#0c0c0e] text-white flex flex-col justify-between"
    >
      {/* ─── Background Cinematic Video Layer ───────────── */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 z-0 h-[130%] w-full"
      >
        <video
          src={VIDEO_URL}
          className="h-full w-full object-cover filter contrast-110 saturate-90"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/60 to-[#0c0c0e]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/40 via-transparent to-[#0c0c0e]/40" />
        <div className="absolute inset-0 bg-magazine-grid opacity-30 pointer-events-none" />
      </div>

      {/* ─── Abstract Background Decorative Shape ───────── */}
      <div
        ref={bgShapeRef}
        className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full border border-[#c9a96e]/10 pointer-events-none z-[1] opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(201,169,110,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ─── Scanline Effect ────────────────────────────── */}
      <div
        ref={scanlineRef}
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* ─── High-End Editorial Magazine Overlay ────────── */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-7xl mx-auto w-full flex-1">
        {/* ─── Top Editorial Masthead Bar ────────────────── */}
        <div
          ref={subtitleRef}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/15 pb-6 gap-4 w-full"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-extrabold uppercase tracking-[0.4em] text-[#c9a96e]">
              APEX JOURNAL
            </span>
            <span className="h-3.5 w-[1px] bg-white/25" />
            <span className="font-mono text-[10px] text-white/60 tracking-widest uppercase">
              ISSUE 04 // CINEMATIC EDITION
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[10px] text-white/50 tracking-wider">
            <span>VOL. XXXVIII</span>
            <span className="hidden sm:inline">GLOBAL ASSET MANAGEMENT</span>
            <span className="border border-[#c9a96e]/40 bg-[#c9a96e]/10 px-2.5 py-1 text-[#c9a96e] font-bold">
              ESTABLISHED 1987
            </span>
          </div>
        </div>

        {/* ─── Hero Title & Magazine Copy ────────────────── */}
        <div ref={titleRef} className="my-auto max-w-4xl py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.35em] text-[#c9a96e] uppercase mb-6 border-b border-[#c9a96e]/40 pb-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e] animate-ping" />
            COVER ARTICLE // INSTITUTIONAL RIGOR
          </motion.div>

          {/* Headline with Split-Character Reveal */}
          <h1
            ref={headlineRef}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-white font-black uppercase"
            dangerouslySetInnerHTML={{
              __html: splitChars("Enduring Legacy"),
            }}
          />

          {/* Accent line */}
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-white/50 italic font-light mt-4 ml-1">
            <span ref={accentRef} className="inline-block">
              Since 1987.
            </span>
          </p>

          <motion.p
            ref={descRef}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-8 max-w-2xl text-sm sm:text-base text-white/70 font-sans font-light leading-relaxed drop-cap"
          >
            Apex Group is a privately held investment and advisory firm managing
            capital across generational horizons. We combine analytical
            discipline with architectural stewardship to construct resilient
            portfolios across global markets.
          </motion.p>

          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Button
              size="lg"
              className="bg-[#c9a96e] hover:bg-[#b8985d] text-black font-mono text-xs uppercase tracking-widest px-8 py-6 rounded-none font-bold transition-all shadow-xl cursor-pointer"
            >
              Read Full Issue
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 hover:border-white text-white font-mono text-xs uppercase tracking-widest px-8 py-6 rounded-none backdrop-blur-md cursor-pointer"
            >
              Explore Portfolio
            </Button>
          </motion.div>
        </div>

        {/* ─── Bottom Magazine Bar ───────────────────────── */}
        <div
          ref={bottomBarRef}
          className="flex items-center justify-between border-t border-white/15 pt-6 font-mono text-xs text-white/50 w-full"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest">
              SCROLL TO READ EDITION
            </span>
            <span className="text-[#c9a96e] text-sm animate-bounce">↓</span>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-[10px] uppercase tracking-widest">
            <span>NEW YORK</span>
            <span>LONDON</span>
            <span>ZURICH</span>
            <span>SINGAPORE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

