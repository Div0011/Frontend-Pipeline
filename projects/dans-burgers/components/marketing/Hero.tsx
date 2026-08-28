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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-bone"
    >
      <CinematicCanvas />

      <div
        ref={sidebarLeftRef}
        className="absolute left-6 bottom-12 hidden xl:block space-y-2 font-sans text-[9px] text-smoke tracking-widest leading-relaxed z-20"
      >
        <p><span className="text-stone">SPECIMEN:</span> DAN&apos;S SPECIAL BURGER</p>
        <p><span className="text-stone">FOUNDED:</span> DAN &amp; FRANCES JUNK</p>
        <p><span className="text-stone">RECIPE:</span> 100% CERTIFIED ANGUS</p>
      </div>

      <div
        ref={sidebarRightRef}
        className="absolute right-6 bottom-12 hidden xl:block space-y-2 font-sans text-[9px] text-smoke tracking-widest text-right leading-relaxed z-20"
      >
        <p><span className="text-stone">COORDINATES:</span> 30.2672° N, 97.7431° W</p>
        <p><span className="text-stone">ORIGIN:</span> AUSTIN, TEXAS</p>
        <p><span className="text-stone">STATUS:</span> 4 ACTIVE LOCATIONS</p>
      </div>

      <div className="relative z-10 max-w-[88rem] mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="type-caption text-ember font-bold"
            >
              Austin&apos;s Original Since 1973
            </motion.p>

            <h1
              ref={titleRef}
              className="type-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight text-char"
            >
              The Art of
              <br />
              <span className="text-ember">the Burger</span>
            </h1>

            <p
              ref={subtitleRef}
              className="type-serif text-xl md:text-2xl text-stone max-w-lg leading-relaxed"
            >
              Where Texas diner tradition meets 100% Certified Angus chuck. Every burger made fresh to order on seasoned cast iron.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/menu"
                className="btn-red text-xs shadow-xl font-bold"
              >
                Explore the Menu →
              </Link>
              <Link
                href="/locations"
                className="btn-outline text-xs font-bold"
              >
                4 Austin Locations
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div ref={imgWrapperRef}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm border border-char/10 shadow-2xl"
              >
                <Image
                  src="/hero-burger.png"
                  alt="Dan's Special Cheeseburger"
                  fill
                  className="editorial-image object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-char/30 to-transparent" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-bone p-6 lg:p-8 border border-bone-dark rounded-sm z-10 shadow-xl"
            >
              <p className="type-caption text-ember text-xs mb-2 font-bold">Est. 1973</p>
              <p className="type-serif text-lg text-char font-bold">Austin, Texas</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
