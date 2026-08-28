"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    if (prefersReducedMotion()) {
      containerRef.current.style.display = "none";
      return;
    }

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -110,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = "none";
            document.body.style.overflow = "";
          },
        });
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
      .fromTo(
        reelRef.current,
        { opacity: 0, rotate: -40, scale: 0.85 },
        { opacity: 1, rotate: 0, scale: 1, duration: 0.9, ease: "power3.out" },
        "-=0.35"
      )
      .to(progressRef.current, {
        width: "100%",
        duration: 2.1,
        ease: "power2.inOut",
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(this.progress() * 100)}`;
          }
        },
      })
      .to(
        reelRef.current,
        { rotate: 180, duration: 2.1, ease: "power1.inOut" },
        "<"
      )
      .to(
        [titleRef.current, reelRef.current, counterRef.current?.parentElement],
        { opacity: 0, y: -12, duration: 0.45, stagger: 0.05, ease: "power2.in" },
        "+=0.15"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#050403]"
    >
      <div className="pointer-events-none absolute inset-0 projector-beam opacity-80" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10">
        <p
          ref={titleRef}
          className="font-display text-sm uppercase tracking-[0.55em] text-[#c9a96e]"
        >
          Author
        </p>

        {/* Film reel mark */}
        <div ref={reelRef} className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border border-[#c9a96e]/50" />
          <div className="absolute inset-2 rounded-full border border-[#c9a96e]/25" />
          <div className="absolute inset-[30%] rounded-full bg-[#c9a96e]/90 shadow-[0_0_24px_rgba(201,169,110,0.45)]" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a96e]/55"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-28px)`,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-baseline gap-1 font-mono text-xs tracking-[0.35em] text-white/50">
            <span ref={counterRef}>0</span>
            <span>%</span>
          </div>
          <div className="h-px w-56 overflow-hidden bg-white/10">
            <div
              ref={progressRef}
              className="h-full w-0 bg-gradient-to-r from-[#8a7349] via-[#c9a96e] to-[#e0c48a]"
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
            Threading the projector
          </span>
        </div>
      </div>

      {/* Letterbox bars that hold the exit */}
      <div className="absolute inset-x-0 top-0 h-8 bg-[#050403] md:h-12" />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-[#050403] md:h-12" />
    </div>
  );
}
