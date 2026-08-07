"use client";

import { useEffect, useRef, useState } from "react";

// Unified Single Background Hex Code across all sections — ZERO color difference
const BG_UNIFIED = "#6b6f76";

function useScrollReveal(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("sr");
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.transitionDelay = `${delay}ms`; el.classList.add("visible"); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, delay]);
}

function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = () => {
          start += target / 40;
          if (start >= target) { setVal(target); return; }
          setVal(Math.floor(start));
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function BrandStorySection() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headRef as React.RefObject<HTMLElement | null>, 0);
  useScrollReveal(bodyRef as React.RefObject<HTMLElement | null>, 120);
  useScrollReveal(metricsRef as React.RefObject<HTMLElement | null>, 200);
  useScrollReveal(cardsRef as React.RefObject<HTMLElement | null>, 100);

  return (
    <>
      {/* ── Philosophy Section — Unified #6b6f76 Background ── */}
      <section style={{ backgroundColor: BG_UNIFIED }} className="py-36 px-8 md:px-16 border-0 relative overflow-hidden">
        {/* Inter-Section Volumetric Fog Transition Masks */}
        <div className="video-section-fog-top" style={{ "--fog-color": BG_UNIFIED } as React.CSSProperties} />
        <div className="video-section-fog-bottom" style={{ "--fog-color": BG_UNIFIED } as React.CSSProperties} />

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-14">
            <span className="font-mono-label" style={{ color: "rgba(255,255,255,0.35)" }}>03</span>
            <span className="font-mono-label" style={{ color: "rgba(255,255,255,0.35)" }}>// OUR PHILOSOPHY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <h2
              ref={headRef}
              style={{
                fontSize: "clamp(2.5rem,5vw,4.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#f0f0f0",
                lineHeight: 1.05,
              }}
            >
              WE DON&apos;T BUILD BODIES.{" "}
              <span style={{ color: "rgba(255,255,255,0.35)" }}>
                WE FORGE LEGACIES.
              </span>
            </h2>

            <div ref={bodyRef} className="flex flex-col gap-6">
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, fontWeight: 300 }}>
                We are not a gym. We are a sanctuary for those who refuse to accept
                average. Every rep is a declaration. Every session is a step toward
                becoming the strongest version of yourself.
              </p>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, fontWeight: 300 }}>
                At FORGE, we combine cutting-edge technology with raw, unfiltered
                intensity to build not just bodies — but legacies that outlast trends.
              </p>
              <a
                href="/about"
                className="link-underline inline-flex items-center gap-3 w-fit"
                style={{
                  fontSize: "0.72rem", fontFamily: "monospace", letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#f0f0f0", paddingBottom: "4px",
                }}
              >
                Read Our Story <span style={{ transition: "transform 0.3s ease" }}>→</span>
              </a>
            </div>
          </div>

          {/* Metrics row */}
          <div
            ref={metricsRef}
            className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { label: "ACCESS", isText: true, text: "24/7" },
              { label: "MEMBERS", isNum: true, target: 1240, suffix: "+" },
              { label: "LOCATIONS", isNum: true, target: 3, suffix: "" },
              { label: "NPS SCORE", isNum: true, target: 97, suffix: "" },
            ].map(({ label, isText, text, isNum, target, suffix }) => (
              <div
                key={label}
                className="flex flex-col gap-2 p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
              >
                <p style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 900, color: "#f0f0f0", lineHeight: 1 }}>
                  {isText ? text : isNum ? <AnimatedCount target={target!} suffix={suffix} /> : null}
                </p>
                <p className="font-mono-label" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inner Pages / Explore — Unified #6b6f76 Background ── */}
      <section style={{ backgroundColor: BG_UNIFIED }} className="py-32 px-8 md:px-16 border-0 relative overflow-hidden">
        {/* Inter-Section Volumetric Fog Transition Masks */}
        <div className="video-section-fog-top" style={{ "--fog-color": BG_UNIFIED } as React.CSSProperties} />
        <div className="video-section-fog-bottom" style={{ "--fog-color": BG_UNIFIED } as React.CSSProperties} />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono-label" style={{ color: "rgba(255,255,255,0.35)" }}>04</span>
            <span className="font-mono-label" style={{ color: "rgba(255,255,255,0.35)" }}>// EXPLORE</span>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "CLASSES", desc: "High-intensity programs engineered for every goal. From HIIT to Olympic lifting.", href: "/classes" },
              { num: "02", title: "COACHES", desc: "World-class trainers who redefine what's possible. Your personal edge.", href: "/coaches" },
              { num: "03", title: "MEMBERSHIP", desc: "Flexible access built around your life. No compromises.", href: "/membership" },
            ].map(({ num, title, desc, href }, i) => (
              <a
                key={title}
                href={href}
                className="card-lift group flex flex-col gap-6 p-10 relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono-label" style={{ color: "rgba(255,255,255,0.3)" }}>{num}</span>
                  <span
                    className="font-mono-label group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    ↗
                  </span>
                </div>

                <div className="flex-1">
                  <h3 style={{
                    fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.02em",
                    color: "#f0f0f0", marginBottom: "0.75rem",
                  }}>{title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontWeight: 300 }}>
                    {desc}
                  </p>
                </div>

                <span className="font-mono-label link-underline" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.62rem" }}>
                  ENTER →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
