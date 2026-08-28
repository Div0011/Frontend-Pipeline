"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2400&q=90";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({ delay: 2.6 });

      entrance
        .fromTo(
          imageWrapRef.current,
          { scale: 1.18, opacity: 0.4 },
          { scale: 1.05, opacity: 1, duration: 2.2, ease: "power2.out" }
        )
        .fromTo(
          brandRef.current,
          { opacity: 0, y: 24, letterSpacing: "0.8em" },
          { opacity: 1, y: 0, letterSpacing: "0.55em", duration: 1.1, ease: "power3.out" },
          "-=1.4"
        )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 48, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.25,
            ease: "power4.out",
          },
          "-=0.75"
        )
        .fromTo(
          lineRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.55"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );

      gsap.to(imageWrapRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#050403]"
    >
      {/* Full-bleed dominant image */}
      <div ref={imageWrapRef} className="absolute inset-0 will-change-transform">
        <Image
          src={HERO_IMAGE}
          alt="Projection room — cinema light cutting through darkness"
          fill
          priority
          className="object-cover object-center brightness-[0.55] contrast-125 saturate-[0.85] ken-burns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-[#050403]/45 to-[#050403]/25" />
        <div className="absolute inset-0 projector-beam" />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Letterbox rails */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-6 bg-[#050403]/90 md:h-8" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-6 bg-[#050403]/90 md:h-8" />

      <div className="relative z-10 flex h-full flex-col justify-between gutter-padding py-10 md:py-14">
        {/* Brand-first masthead */}
        <header className="flex items-start justify-between gap-6">
          <p
            ref={brandRef}
            className="font-display text-2xl font-semibold uppercase tracking-[0.55em] text-[#ebe6dc] md:text-3xl lg:text-4xl"
          >
            Author
          </p>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.35em] text-[#c9a96e]/80 sm:block">
            Film &amp; Animation
          </span>
        </header>

        {/* Single composition: one headline, one line, one CTA */}
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(2.75rem,8vw,7.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-[#ebe6dc]"
          >
            Frames that
            <br />
            <span className="text-[#c9a96e]">refuse silence</span>
          </h1>

          <p
            ref={lineRef}
            className="mt-6 max-w-md font-syne text-sm leading-relaxed text-white/65 md:text-base"
          >
            A projection-room chronicle of motion picture craft — from hand-drawn cells to living light.
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#archive"
              className="interactive inline-flex items-center gap-2 bg-[#c9a96e] px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#080706] transition-colors hover:bg-[#e0c48a]"
            >
              Enter the Archive
            </a>
            <a
              href="#chapter-1"
              className="interactive inline-flex items-center gap-2 border border-[#c9a96e]/45 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#c9a96e] transition-colors hover:border-[#c9a96e] hover:bg-[#c9a96e]/10"
            >
              Begin Timeline
            </a>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            Scroll to project
          </span>
          <a
            href="#prologue"
            className="interactive flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]"
          >
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            Descend
          </a>
        </div>
      </div>
    </section>
  );
}
