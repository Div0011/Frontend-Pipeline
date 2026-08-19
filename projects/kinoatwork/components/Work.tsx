"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "ghats",
    title: "Silence of the Ghats",
    year: "2024",
    description:
      "A visual meditation on the quiet corridors of the Western Ghats. Over three months, we documented the fog, the water, and the silent rhythm of the forest before sunrise.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=90&fit=crop",
    credits: "CLIENT: NATIONAL FILMS // ROLE: CINEMATOGRAPHY & DIRECTION // YEAR: 2024",
    maskType: "organic",
    gridClass: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start",
    imgColClass: "lg:col-span-7",
    textColClass: "lg:col-span-4 lg:col-start-9 lg:mt-16 text-left",
    align: "left",
  },
  {
    id: "monsoon",
    title: "The Last Monsoon",
    year: "2025",
    description:
      "An ethnographic film capturing the raw, unpredictable force of the rain in Kerala. Shooting entirely on 35mm, we documented the interface between human memory and seasonal rebirth.",
    image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1400&q=90&fit=crop",
    credits: "CLIENT: KERALA ART INITIATIVE // ROLE: CINEMATOGRAPHY // YEAR: 2025",
    maskType: "parallelogram",
    gridClass: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-end",
    imgColClass: "lg:col-span-7 lg:col-start-6 order-1 lg:order-2",
    textColClass: "lg:col-span-4 lg:col-start-1 order-2 lg:order-1 text-left lg:mb-16",
    align: "right",
  },
  {
    id: "light",
    title: "After the Light",
    year: "2025",
    description:
      "A nocturne set in the streets of Mumbai. We tracked the fluorescent, neon-lit cafes and cab terminals, documenting the solitary lives that keep the city awake.",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1400&q=90&fit=crop",
    credits: "CLIENT: METROPOLIS FILMS // ROLE: EDIT & CINEMATOGRAPHY // YEAR: 2025",
    maskType: "circle",
    gridClass: "flex flex-col lg:flex-row items-center justify-between gap-16 max-w-5xl mx-auto",
    imgColClass: "w-full lg:w-[50%]",
    textColClass: "w-full lg:w-[40%] text-left",
    align: "center",
  },
  {
    id: "benares",
    title: "Benares Shadows",
    year: "2026",
    description:
      "An experimental art film exploring the reflections of history on the Ganges. High-contrast sunrise shadows define this visual investigation into time and spirituality.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1400&q=90&fit=crop",
    credits: "CLIENT: GANGA HERITAGE CO. // ROLE: DIRECTION // YEAR: 2026",
    maskType: "pill",
    gridClass: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-end",
    imgColClass: "lg:col-span-6 lg:col-start-2",
    textColClass: "lg:col-span-4 lg:col-start-9 lg:mb-16 text-left",
    align: "left",
  },
];

const MASK_CONFIGS = {
  organic: {
    from: "40% 60% 60% 40% / 40% 40% 60% 60%",
    to: "35% 65% 55% 45% / 35% 45% 65% 55%",
    entrance: { xPercent: -15, opacity: 0 },
  },
  parallelogram: {
    from: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
    to: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
    entrance: { xPercent: 15, opacity: 0 },
  },
  circle: {
    from: "50%",
    to: "45%",
    entrance: { scale: 0.85, rotate: -6, opacity: 0 },
  },
  pill: {
    from: "9999px",
    to: "9999px",
    entrance: { xPercent: -15, opacity: 0 },
  },
};

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const spreads = containerRef.current?.querySelectorAll(".editorial-spread");

      spreads?.forEach((spread) => {
        const maskType = spread.getAttribute(
          "data-mask"
        ) as keyof typeof MASK_CONFIGS;
        const config = MASK_CONFIGS[maskType];

        const mask = spread.querySelector(".spread-mask") as HTMLElement;
        const img = spread.querySelector(".spread-img") as HTMLElement;
        const details = spread.querySelector(".spread-details") as HTMLElement;
        const indexNum = spread.querySelector(".giant-index") as HTMLElement;

        if (prefersReduced) {
          gsap.fromTo(
            spread,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: spread,
                start: "top 80%",
                end: "top 40%",
                scrub: true,
              },
            }
          );
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: spread,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1,
          },
        });

        tl.fromTo(
          mask,
          { ...config.entrance },
          { xPercent: 0, scale: 1, rotate: 0, opacity: 1, ease: "none", duration: 0.25 },
          0
        );

        tl.fromTo(
          details,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "none", duration: 0.3 },
          0.05
        );

        if (indexNum) {
          tl.fromTo(
            indexNum,
            { opacity: 0, y: 60, scale: 0.9 },
            { opacity: 0.12, y: 0, scale: 1, ease: "none", duration: 0.35 },
            0
          );
        }

        if (maskType === "organic") {
          tl.fromTo(
            mask,
            { borderRadius: config.from },
            { borderRadius: config.to, ease: "none", duration: 1 },
            0
          );
        } else if (maskType === "parallelogram") {
          tl.fromTo(
            mask,
            { clipPath: config.from },
            { clipPath: config.to, ease: "none", duration: 1 },
            0
          );
        } else if (maskType === "circle") {
          tl.fromTo(
            mask,
            { borderRadius: config.from },
            { borderRadius: config.to, ease: "none", duration: 1 },
            0
          );
        }

        tl.fromTo(
          img,
          { scale: 1.12, xPercent: -3, yPercent: -2 },
          { scale: 1.18, xPercent: 3, yPercent: 2, ease: "none", duration: 1 },
          0
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative py-24 md:py-32 px-6 bg-brand-paper texture-grain border-b border-brand-border"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-32">
          <span className="text-[10px] font-mono tracking-widest text-brand-accent border border-brand-accent/20 px-4 py-2 rounded-full inline-block bg-brand-paper-warm/40 backdrop-blur-xs select-none">
            SELECTED WORK
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mt-8 text-brand-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Editorial <span className="font-script normal-case text-brand-accent-warm">Frames</span>
          </h2>
        </div>

        <div className="space-y-40 md:space-y-56">
          {projects.map((project, idx) => {
            const isSecond = idx === 1;

            return (
              <div key={project.id}>
                <div
                  className="editorial-spread relative"
                  data-mask={project.maskType}
                >
                  <div
                    className={`giant-index absolute hidden xl:block font-display text-[12rem] font-bold text-transparent pointer-events-none select-none z-0 ${
                      project.align === "left"
                        ? "right-12 top-0"
                        : "left-12 bottom-0"
                    }`}
                    style={{
                      WebkitTextStroke: "1px rgba(45, 42, 38, 0.08)",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div className={`${project.gridClass} relative z-10`}>
                    <div className={`${project.imgColClass} relative`} data-cursor={`VIEW ${project.title.toUpperCase()}`}>
                      <div
                        className={`spread-mask relative overflow-hidden border border-brand-border ${
                          project.maskType === "circle"
                            ? "rounded-full aspect-square"
                            : project.maskType === "pill"
                            ? "rounded-t-full rounded-b-full aspect-[16/10]"
                            : "aspect-[16/10]"
                        }`}
                        style={
                          project.maskType === "organic"
                            ? { borderRadius: MASK_CONFIGS.organic.from }
                            : project.maskType === "parallelogram"
                            ? { clipPath: MASK_CONFIGS.parallelogram.from }
                            : undefined
                        }
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-paper/20 via-transparent to-brand-paper/10 z-10 pointer-events-none mix-blend-multiply" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="spread-img object-cover will-change-transform w-full h-full"
                        />
                      </div>
                    </div>

                    <div className={`${project.textColClass} spread-details space-y-6`}>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono tracking-widest text-brand-accent font-semibold">
                          FRAME {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="w-8 h-[1px] bg-brand-border" />
                        <span className="text-[10px] font-mono tracking-widest text-brand-muted">
                          {project.year}
                        </span>
                      </div>

                      <h3
                        className="text-3xl md:text-5xl font-bold text-brand-ink tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-base text-brand-muted leading-relaxed font-light max-w-md"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {project.description}
                      </p>

                      <div className="pt-4 border-t border-brand-border max-w-md">
                        <p className="text-[9px] font-mono tracking-widest text-brand-accent-warm leading-relaxed uppercase">
                          {project.credits}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {isSecond && (
                  <div className="py-44 my-20 border-y border-brand-border text-center max-w-4xl mx-auto flex flex-col items-center justify-center relative select-none">
                    <span className="text-[9px] font-mono tracking-widest text-brand-accent uppercase mb-8">
                      INTERSTITIAL
                    </span>
                    <p
                      className="text-3xl md:text-5xl lg:text-6xl text-brand-ink italic leading-[1.2] font-light"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      &ldquo;We compose frames that linger after the projector fades.&rdquo;
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
