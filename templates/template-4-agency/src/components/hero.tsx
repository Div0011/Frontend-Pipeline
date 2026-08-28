"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-brand", { opacity: 0, y: 48, duration: 1.2 })
        .from(".hero-line", { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, "-=0.55")
        .from(".hero-headline", { opacity: 0, y: 36, duration: 1 }, "-=0.55")
        .from(".hero-support", { opacity: 0, y: 20, duration: 0.85 }, "-=0.55")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.75 }, "-=0.45");
    }, root);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    const bgVideo = document.getElementById("bg-showreel-video") as HTMLVideoElement | null;
    if (!bgVideo) return;
    bgVideo.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const scrollToWork = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: total * 0.75, behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="relative h-full w-full overflow-hidden bg-transparent">
      <div className="relative z-10 flex h-full flex-col justify-end px-[var(--gutter)] pb-20 md:pb-28 lg:pb-32">
        <div className="max-w-5xl">
          <p className="hero-brand font-display text-[clamp(3.5rem,12vw,9.5rem)] font-extrabold leading-[0.82] tracking-[-0.05em] text-white uppercase">
            VOID
            <span className="text-[#d4ff00]">.</span>
          </p>

          <div className="hero-line mt-5 h-px w-24 origin-left bg-[#d4ff00] md:w-32" />

          <h1 className="hero-headline mt-6 max-w-3xl font-display text-[clamp(1.75rem,4.2vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            We make brands move faster.
          </h1>

          <p className="hero-support mt-5 max-w-md text-[15px] font-light leading-relaxed text-white/70 md:text-base">
            Digital craft and motion direction for brands that refuse to look like everyone else.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={scrollToWork}
              className="group inline-flex items-center gap-3 bg-[#d4ff00] px-7 py-3.5 font-mono text-[11px] font-bold tracking-[0.22em] text-black uppercase transition-transform duration-500 hover:translate-x-1"
              data-cursor="WORK"
            >
              View work
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex items-center gap-3 border border-white/20 bg-black/30 px-6 py-3.5 backdrop-blur-md transition-colors duration-300 hover:border-[#d4ff00]/50"
              data-cursor="AUDIO"
              aria-pressed={!isMuted}
            >
              <span className="flex h-3.5 items-end gap-[3px]" aria-hidden>
                <span
                  className={`w-[2px] bg-[#d4ff00] ${
                    isMuted ? "h-1 opacity-40" : "reel-bar h-3.5"
                  }`}
                />
                <span
                  className={`w-[2px] bg-[#d4ff00] ${
                    isMuted ? "h-2 opacity-40" : "reel-bar h-2.5"
                  }`}
                />
                <span
                  className={`w-[2px] bg-[#d4ff00] ${
                    isMuted ? "h-1 opacity-40" : "reel-bar h-3.5"
                  }`}
                />
              </span>
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/85 uppercase">
                {isMuted ? "Sound off" : "Sound on"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
