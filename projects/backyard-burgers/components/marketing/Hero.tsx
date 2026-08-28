"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { initGSAP } from "@/lib/motion/gsap";
import CinematicCanvas from "@/components/three/CinematicCanvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const sidebarLeftRef = useRef<HTMLDivElement>(null);
  const sidebarRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();

    // 1. Entrance timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.8 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=1.2"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      );

      // 2. Parallax Scroll bindings
      gsap.to(titleRef.current, {
        yPercent: -20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(imgWrapperRef.current, {
        yPercent: 12,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Sidebars sliding and fading out
      gsap.to([sidebarLeftRef.current, sidebarRightRef.current], {
        yPercent: -35,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "half top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-cream"
    >
      {/* 3D Particle Griddle/Grill Canvas Background */}
      <CinematicCanvas />

      {/* Font Specimen Metadata Sidebars - ClaudeType styling */}
      <div
        ref={sidebarLeftRef}
        className="absolute left-6 bottom-12 hidden xl:block space-y-2 font-mono text-[9px] text-mist tracking-widest leading-relaxed z-20"
      >
        <p><span className="text-stone">SPECIMEN:</span> SMASH DISPLAY v2.0</p>
        <p><span className="text-stone">DESIGNER:</span> ATELIER GUYS</p>
        <p><span className="text-stone">CLASSIFICATION:</span> GEOMETRIC SERIF</p>
      </div>

      <div
        ref={sidebarRightRef}
        className="absolute right-6 bottom-12 hidden xl:block space-y-2 font-mono text-[9px] text-mist tracking-widest text-right leading-relaxed z-20"
      >
        <p><span className="text-stone">COORDINATES:</span> 12.9716° N, 77.5946° E</p>
        <p><span className="text-stone">LAB:</span> BANGALORE KINETICS</p>
        <p><span className="text-stone">STATUS:</span> ACTIVE ATELIER</p>
      </div>

      <div className="relative z-10 max-w-[88rem] mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="type-caption text-gold"
            >
              Bangalore&apos;s Finest Atelier
            </motion.p>

            <h1
              ref={titleRef}
              className="type-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight text-ink"
            >
              The Art of
              <br />
              <span className="text-gold">the Smash</span>
            </h1>

            <p
              ref={subtitleRef}
              className="type-serif text-xl md:text-2xl text-stone max-w-lg leading-relaxed"
            >
              Where culinary precision meets timeless flavor. Every patty, every Bun, every moment — crafted with intention.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/menu"
                data-cursor="menu"
                className="group inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 type-caption text-xs hover:bg-ink-light transition-colors duration-500"
              >
                Explore the Menu
                <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
              </Link>
              <Link
                href="/reservations"
                data-cursor="reserve"
                className="inline-flex items-center gap-3 border border-ink/20 text-ink px-8 py-4 type-caption text-xs hover:border-ink hover:bg-ink hover:text-cream transition-all duration-500"
              >
                Reserve a Table
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative" data-cursor="explore">
            <div ref={imgWrapperRef}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm border border-ink/5"
              >
                <Image
                  src="/hero-burger.png"
                  alt="Signature Smash Burger"
                  fill
                  className="editorial-image object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream/30 to-transparent" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-cream p-6 lg:p-8 border border-ink/5 rounded-sm z-10"
            >
              <p className="type-caption text-gold text-xs mb-2">Est. 2024</p>
              <p className="type-serif text-lg text-ink">Bangalore, India</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
