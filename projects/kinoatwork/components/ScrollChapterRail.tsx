"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Chapter {
  id: string;
  label: string;
  start: number; // 0–1 global progress
  end: number;
}

const CHAPTERS: Chapter[] = [
  { id: "intro",       label: "INTRO",       start: 0,    end: 0.208 },
  { id: "work",        label: "WORK",        start: 0.208, end: 0.455 },
  { id: "philosophy",  label: "MANIFESTO",   start: 0.455, end: 0.62  },
  { id: "reel",        label: "REEL",        start: 0.62,  end: 0.785 },
  { id: "contact",     label: "CONTACT",     start: 0.785, end: 0.91  },
  { id: "outro",       label: "FIN",         start: 0.91,  end: 1.0   },
];

interface Props {
  progress: number;
  chapterId: string | null;
}

export default function ScrollChapterRail({ progress, chapterId }: Props) {
  const railRef   = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);

  // Animate the dot along the rail
  useEffect(() => {
    const dot = dotRef.current;
    const track = trackRef.current;
    if (!dot || !track) return;
    const trackH = track.offsetHeight;
    gsap.to(dot, {
      y: trackH * progress,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  }, [progress]);

  // Fade in after intro starts
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const targetOpacity = progress > 0.04 ? 1 : 0;
    gsap.to(rail, { opacity: targetOpacity, duration: 0.8, ease: "power2.out" });
  }, [progress > 0.04]);

  return (
    <div
      ref={railRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[45] hidden lg:flex flex-col items-center gap-0"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Track line */}
      <div
        ref={trackRef}
        className="relative flex flex-col items-center"
        style={{ height: "40vh" }}
      >
        {/* Background line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
          style={{ width: "1px", background: "rgba(244,241,236,0.1)" }}
        />

        {/* Chapter tick marks */}
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.id}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ top: `${ch.start * 100}%` }}
          >
            {/* Tick */}
            <div
              style={{
                width:  chapterId === ch.id ? "14px" : "6px",
                height: "1px",
                background: chapterId === ch.id ? "#d4a84b" : "rgba(244,241,236,0.2)",
                position: "absolute",
                right: "8px",
                transition: "width 0.4s ease, background 0.4s ease",
              }}
            />
            {/* Label */}
            <span
              className="writing-vertical absolute type-meta"
              style={{
                right: "28px",
                fontSize: "0.5rem",
                letterSpacing: "0.18em",
                opacity: chapterId === ch.id ? 0.7 : 0,
                transition: "opacity 0.4s ease",
                color: "#d4a84b",
              }}
            >
              {ch.label}
            </span>
          </div>
        ))}

        {/* Progress fill */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "1px",
            height: `${progress * 100}%`,
            background: "linear-gradient(180deg, rgba(212,168,75,0.7) 0%, rgba(212,168,75,0.2) 100%)",
            transition: "height 0.1s linear",
          }}
        />

        {/* Gold dot */}
        <div
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: 0 }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#d4a84b",
              marginLeft: "-2px",
              boxShadow: "0 0 6px rgba(212,168,75,0.8)",
            }}
          />
        </div>
      </div>

      {/* Progress percentage */}
      <p
        className="type-meta mt-3"
        style={{ fontSize: "0.45rem", letterSpacing: "0.14em", opacity: 0.35 }}
      >
        {String(Math.round(progress * 100)).padStart(3, "0")}%
      </p>
    </div>
  );
}
