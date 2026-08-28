"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars, animateSplitChars } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL =
  "https://cdn.coverr.co/videos/coverr-aerial-view-of-city-buildings-2773/1080p.mp4";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (videoWrapperRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          { scale: 1.08, y: 0 },
          {
            scale: 1.22,
            y: 140,
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

      if (veilRef.current) {
        gsap.to(veilRef.current, {
          opacity: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -70,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: 0.6,
          },
        });
      }

      gsap.from(brandRef.current, {
        y: 28,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.15,
      });

      if (headlineRef.current) {
        animateSplitChars(headlineRef.current, {
          delay: 0.45,
          stagger: 0.028,
          duration: 1.5,
          ease: "expo.out",
          y: 70,
        });
      }

      gsap.from(descRef.current, {
        y: 24,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.85,
      });

      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.05,
      });

      gsap.from(scrollCueRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.35,
      });

      if (scrollCueRef.current) {
        gsap.to(scrollCueRef.current.querySelector(".scroll-line"), {
          scaleY: 0.35,
          transformOrigin: "top",
          duration: 1.6,
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
      className="relative min-h-[100vh] w-full overflow-hidden bg-background text-foreground flex flex-col"
    >
      {/* Full-bleed cinematic plane */}
      <div ref={videoWrapperRef} className="absolute inset-0 z-0 h-[125%] w-full">
        <video
          src={VIDEO_URL}
          className="h-full w-full object-cover contrast-[1.08] saturate-[0.75] brightness-[0.72]"
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          ref={veilRef}
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,10,13,0.72) 0%, rgba(8,10,13,0.35) 42%, rgba(8,10,13,0.88) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 0%, rgba(8,10,13,0.55) 100%)",
          }}
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-1 flex-col justify-end px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 pt-32 max-w-6xl"
      >
        {/* Brand first — monumental signal */}
        <div ref={brandRef} className="mb-8 sm:mb-10">
          <div className="font-serif text-[clamp(3.5rem,12vw,9rem)] font-semibold tracking-[0.14em] uppercase leading-none text-foreground">
            Apex
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="chapter-rule" />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-accent">
              Group · Est. 1987
            </span>
          </div>
        </div>

        <h1
          ref={headlineRef}
          className="font-serif text-[clamp(2rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-tight text-foreground/95 max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: splitChars("Capital built to endure."),
          }}
        />

        <p
          ref={descRef}
          className="mt-7 max-w-xl text-[15px] sm:text-base text-muted-foreground font-light leading-relaxed"
        >
          Privately held investment and advisory — analytical discipline joined
          to architectural stewardship across generational horizons.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            className="bg-accent hover:bg-metal text-background font-mono text-[11px] uppercase tracking-[0.28em] px-9 py-6 rounded-none font-semibold cursor-pointer"
            data-cursor-hover
          >
            Begin Inquiry
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-foreground/25 hover:border-accent text-foreground font-mono text-[11px] uppercase tracking-[0.28em] px-9 py-6 rounded-none cursor-pointer"
            data-cursor-hover
          >
            View Mandate
          </Button>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-8 right-6 sm:right-10 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="scroll-line h-12 w-px bg-accent/50 origin-top" />
      </div>
    </section>
  );
}
