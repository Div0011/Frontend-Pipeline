"use client";

import React, { useRef, useEffect, useState } from "react";

interface TextLine {
  ref: React.RefObject<HTMLElement | null>;
  start: number;
  end: number;
}

function useCinematicBlurEmergence(lines: TextLine[], progress: number) {
  useEffect(() => {
    lines.forEach(({ ref, start, end }) => {
      const el = ref.current;
      if (!el) return;
      const fadeIn = start + 0.08;
      const fadeOut = end - 0.08;
      let opacity = 0;
      let y = 45;
      let scale = 0.90;
      let blur = 12;

      if (progress >= start && progress <= end) {
        if (progress < fadeIn) {
          const t = (progress - start) / (fadeIn - start);
          opacity = t;
          y = 45 * (1 - t);
          scale = 0.90 + 0.10 * t;
          blur = 12 * (1 - t);
        } else if (progress > fadeOut) {
          const t = (progress - fadeOut) / (end - fadeOut);
          opacity = 1 - t;
          y = -35 * t;
          scale = 1.0 + 0.04 * t;
          blur = 10 * t;
        } else {
          opacity = 1;
          y = 0;
          scale = 1.0;
          blur = 0;
        }
      }

      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
      el.style.filter = `blur(${blur}px)`;
    });
  }, [progress, lines]);
}

export default function KettlebellSection() {
  const [progress, setProgress] = useState(0);

  const sub1  = useRef<HTMLParagraphElement>(null);
  const h1    = useRef<HTMLHeadingElement>(null);
  const body1 = useRef<HTMLParagraphElement>(null);
  const spec1 = useRef<HTMLDivElement>(null);

  const sub2  = useRef<HTMLParagraphElement>(null);
  const h2    = useRef<HTMLHeadingElement>(null);
  const body2 = useRef<HTMLParagraphElement>(null);
  const spec2 = useRef<HTMLDivElement>(null);

  const sub3  = useRef<HTMLParagraphElement>(null);
  const h3    = useRef<HTMLHeadingElement>(null);
  const body3 = useRef<HTMLParagraphElement>(null);
  const spec3 = useRef<HTMLDivElement>(null);

  const lines: TextLine[] = [
    { ref: sub1,  start: 0.00, end: 0.32 },
    { ref: h1,    start: 0.02, end: 0.34 },
    { ref: body1, start: 0.05, end: 0.32 },
    { ref: spec1, start: 0.07, end: 0.33 },

    { ref: sub2,  start: 0.34, end: 0.65 },
    { ref: h2,    start: 0.36, end: 0.67 },
    { ref: body2, start: 0.38, end: 0.65 },
    { ref: spec2, start: 0.40, end: 0.66 },

    { ref: sub3,  start: 0.66, end: 0.98 },
    { ref: h3,    start: 0.68, end: 0.99 },
    { ref: body3, start: 0.70, end: 0.98 },
    { ref: spec3, start: 0.72, end: 0.99 },
  ];

  useCinematicBlurEmergence(lines, progress);

  const [VS, setVS] = useState<React.ComponentType<{
    src: string; poster?: string; bgColor?: string; scrollDistance?: string;
    onProgress?: (p: number) => void; moveDirection?: number;
    children?: React.ReactNode;
  }> | null>(null);

  useEffect(() => {
    import("./VideoScrubber").then((m) => setVS(() => m.default));
  }, []);

  const ts: React.CSSProperties = {
    opacity: 0,
    transform: "translate3d(0, 45px, 0) scale(0.90)",
    filter: "blur(12px)",
    transition: "opacity 0.08s linear, transform 0.08s linear, filter 0.08s linear",
    willChange: "opacity, transform, filter",
  };

  const content = (
    <div className="absolute inset-0 flex items-center pt-20 pb-10">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 relative overflow-visible">

        {/* GROUP 1 */}
        <div className="max-w-2xl ml-auto text-right">
          <p ref={sub1} style={{ ...ts, color: "rgba(255,255,255,0.45)" }} className="font-mono-label mb-2">
            04 — RAW POWER
          </p>
          <h2
            ref={h1}
            style={{
              ...ts,
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
            }}
            className="text-[#f0f0f0] uppercase whitespace-nowrap drop-shadow-2xl"
          >
            POWER
          </h2>
          <p
            ref={body1}
            style={{ ...ts, color: "rgba(255,255,255,0.6)" }}
            className="mt-3 text-xs sm:text-sm font-light leading-relaxed max-w-md ml-auto"
          >
            The oldest tool for functional momentum strength. Reimagined with computational weight balance and zero-slosh geometry.
          </p>
          <div ref={spec1} style={ts} className="mt-3 flex flex-wrap justify-end gap-6 font-mono-label text-[0.6rem] text-white/40">
            <span>HANDLE: SERRATED GRAPHITE</span>
            <span>MASS: CENTERED ACCELERATION</span>
          </div>
        </div>

        {/* GROUP 2 */}
        <div className="max-w-2xl ml-auto text-right mt-2">
          <p ref={sub2} style={{ ...ts, color: "rgba(255,255,255,0.45)" }} className="font-mono-label mb-2">
            05 — RELENTLESS DRIVE
          </p>
          <h2
            ref={h2}
            style={{
              ...ts,
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
            }}
            className="text-[#f0f0f0] uppercase whitespace-nowrap drop-shadow-2xl"
          >
            ENDURANCE
          </h2>
          <p
            ref={body2}
            style={{ ...ts, color: "rgba(255,255,255,0.6)" }}
            className="mt-3 text-xs sm:text-sm font-light leading-relaxed max-w-md ml-auto"
          >
            Designed for high-frequency ballistic movement. Ergonomic handle geometry minimizes forearm torque during dynamic swings.
          </p>
          <div ref={spec2} style={ts} className="mt-3 flex flex-wrap justify-end gap-6 font-mono-label text-[0.6rem] text-white/40">
            <span>TORQUE REDUCTION: -34%</span>
            <span>GRIP INDEX: TACTILE MONO</span>
          </div>
        </div>

        {/* GROUP 3 */}
        <div className="max-w-2xl mt-2">
          <p ref={sub3} style={{ ...ts, color: "rgba(255,255,255,0.45)" }} className="font-mono-label mb-2">
            06 — BECOME LEGEND
          </p>
          <h2
            ref={h3}
            style={{
              ...ts,
              fontSize: "clamp(2.2rem, 5.2vw, 4.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
            }}
            className="text-[#f0f0f0] uppercase whitespace-nowrap drop-shadow-2xl"
          >
            TRANSFORMATION
          </h2>
          <p
            ref={body3}
            style={{ ...ts, color: "rgba(255,255,255,0.6)" }}
            className="mt-3 text-xs sm:text-sm font-light leading-relaxed max-w-md"
          >
            Evolution through discipline. Every repetition chisels human capacity into a permanent masterwork.
          </p>
          <div ref={spec3} style={ts} className="mt-3 flex flex-wrap gap-6 font-mono-label text-[0.6rem] text-white/40">
            <span>TRANSFORMATION MATRIX</span>
            <span>SYSTEM: FORGE OS</span>
          </div>
        </div>

      </div>
    </div>
  );

  if (!VS) return <section style={{ height: "100svh", backgroundColor: "#6b6f76" }}>{content}</section>;

  return (
    <section>
      <VS
        src="/videos/kettlebell.mp4"
        poster="/videos/kettlebell-poster.jpg"
        bgColor="#6b6f76"
        scrollDistance="+=650vh"
        onProgress={setProgress}
        moveDirection={-1}
      >
        {content}
      </VS>
    </section>
  );
}
