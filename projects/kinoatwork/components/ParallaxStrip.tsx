"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const parallaxScenes = [
  {
    id: "scene-forest",
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=95&fit=crop",
    alt: "Misty Western Ghats forest at golden hour",
    label: "RESTRAINT",
    index: "01",
    quote: "We let silence speak first.",
    yFactor: 0.18,
  },
  {
    id: "scene-river",
    src: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1800&q=95&fit=crop",
    alt: "Sacred Ganges at dawn with soft light",
    label: "ATMOSPHERE",
    index: "02",
    quote: "Light is our language, shadow our punctuation.",
    yFactor: 0.22,
  },
  {
    id: "scene-night",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=95&fit=crop",
    alt: "City at night with neon reflections",
    label: "TEMPO",
    index: "03",
    quote: "Time slows when a frame breathes.",
    yFactor: 0.14,
  },
];

export default function ParallaxStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      parallaxScenes.forEach((scene) => {
        const img = sectionRef.current?.querySelector(`#${scene.id} .parallax-img`) as HTMLElement;
        const label = sectionRef.current?.querySelector(`#${scene.id} .scene-label`) as HTMLElement;
        const quote = sectionRef.current?.querySelector(`#${scene.id} .scene-quote`) as HTMLElement;

        if (!img) return;

        gsap.fromTo(
          img,
          { yPercent: -(scene.yFactor * 100) },
          {
            yPercent: scene.yFactor * 100,
            ease: "none",
            scrollTrigger: {
              trigger: `#${scene.id}`,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: `#${scene.id}`,
                start: "top 70%",
              },
            }
          );
        }

        if (quote) {
          gsap.fromTo(
            quote,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: `#${scene.id}`,
                start: "top 70%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-brand-ink overflow-hidden"
      aria-label="Cinematic Parallax — Our Philosophy in Frames"
    >
      <div className="relative z-10 flex items-center justify-center pt-20 pb-6 select-none">
        <div className="flex items-center gap-4">
          <span className="w-12 h-[1px] bg-brand-accent/40" />
          <span className="text-[9px] font-mono tracking-[0.3em] text-brand-accent uppercase">
            Three Pillars of the Maison
          </span>
          <span className="w-12 h-[1px] bg-brand-accent/40" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[80vh]">
        {parallaxScenes.map((scene, idx) => (
          <div
            key={scene.id}
            id={scene.id}
            className={`relative overflow-hidden group ${
              idx === 1 ? "md:mt-12 md:mb-0" : ""
            }`}
            style={{ minHeight: "70vh" }}
          >
            <div
              className="parallax-img absolute inset-0 w-full will-change-transform"
              style={{ height: "120%" }}
            >
              <img
                src={scene.src}
                alt={scene.alt}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-brand-ink/50 group-hover:bg-brand-ink/30 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-transparent opacity-80" />
            </div>

            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10" style={{ minHeight: "70vh" }}>
              <span
                className="absolute top-8 right-8 text-[7rem] font-display font-black text-transparent leading-none select-none pointer-events-none"
                style={{ WebkitTextStroke: "1px rgba(245,240,230,0.07)" }}
              >
                {scene.index}
              </span>

              <span className="scene-label text-[9px] font-mono tracking-[0.3em] text-brand-accent-warm uppercase mb-4 opacity-0">
                {scene.label}
              </span>

              <p
                className="scene-quote text-xl md:text-2xl lg:text-3xl font-display italic text-brand-paper leading-snug tracking-tight max-w-xs opacity-0"
              >
                &ldquo;{scene.quote}&rdquo;
              </p>

              <div className="mt-6 w-10 h-[1px] bg-brand-accent-warm/60 group-hover:w-20 transition-all duration-500" />
            </div>

            {idx < parallaxScenes.length - 1 && (
              <div className="absolute top-0 right-0 h-full w-[1px] bg-brand-paper/10 z-20 hidden md:block" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 py-16 text-center select-none">
        <p className="text-[9px] font-mono tracking-[0.4em] text-brand-paper/30 uppercase">
          Kino // Cinematic Maison // Est. 2020
        </p>
      </div>
    </section>
  );
}
