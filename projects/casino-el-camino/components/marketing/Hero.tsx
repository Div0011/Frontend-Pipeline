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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-char"
    >
      <CinematicCanvas />

      <div className="relative z-10 max-w-[88rem] mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="type-caption text-ember font-bold"
            >
              517 E 6th St · Austin, TX · Est. 1994
            </motion.p>

            <h1
              ref={titleRef}
              className="type-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight text-ink"
            >
              3/4 LB MONSTER
              <br />
              <span className="text-ember">CHARGRILLED BURGERS</span>
            </h1>

            <p
              ref={subtitleRef}
              className="type-serif text-xl md:text-2xl text-stone max-w-lg leading-relaxed"
            >
              Featured on Diners, Drive-Ins &amp; Dives. Heavyweight flame-grilled Angus chuck, blistered serranos, slow-simmered pork chile verde fries, and loaded Bloody Marys on 6th Street.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/menu"
                className="btn-red text-xs shadow-[0_0_20px_rgba(0,230,118,0.4)] font-bold"
              >
                Monster Menu →
              </Link>
              <Link
                href="/locations"
                className="btn-outline text-xs font-bold"
              >
                517 E 6th St
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div ref={imgWrapperRef}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm border border-char-mute shadow-[0_0_30px_rgba(0,230,118,0.25)]"
              >
                <Image
                  src="/images/locations/casino-el-camino.jpg"
                  alt="Casino El Camino Austin"
                  fill
                  className="editorial-image object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-char/50 to-transparent" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-char-soft p-6 lg:p-8 border border-ember rounded-sm z-10 shadow-xl"
            >
              <p className="type-caption text-ember text-xs mb-2 font-bold">Est. 1994</p>
              <p className="type-serif text-lg text-ink font-bold">6th Street · Austin, TX</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
