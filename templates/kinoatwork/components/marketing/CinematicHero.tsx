"use client";

import { useState } from "react";
import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 1211;
const KINO_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/frame_${String(i).padStart(6, "0")}.webp`
);

function getStage(progress: number): 1 | 2 | 3 {
  if (progress < 0.3) return 1;
  if (progress < 0.65) return 2;
  return 3;
}

export default function CinematicHero() {
  const [progress, setProgress] = useState(0);
  const stage = getStage(progress);
  const pct = Math.round(progress * 100);

  return (
    <CanvasScrubber
      frames={KINO_FRAMES}
      scrollDistance="+=300%"
      onProgress={setProgress}
      overlayGradient
      preloadCount={80}
    >
      <div className="h-full max-w-[88rem] mx-auto px-6 lg:px-8 flex items-center">
        {/* Stage 1: Hero Reveal */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8 transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform:
              stage === 1
                ? "translateY(0)"
                : stage < 1
                ? "translateY(40px)"
                : "translateY(-40px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="max-w-3xl">
            <p className="type-caption text-cinema-accent mb-6 tracking-widest">
              Cinematic Film Studio
            </p>
            <h1
              className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.88] tracking-tight text-cinema-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              KINO<span className="text-cinema-accent">.</span>ATWORK
            </h1>
            <p
              className="type-serif text-lg sm:text-xl md:text-2xl text-cinema-muted max-w-xl mt-6 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Where light, silence, and tempo converge. Every frame is a
              meditation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="#work"
                className="inline-flex items-center gap-3 bg-cinema-accent text-cinema-bg px-8 py-4 type-caption text-xs hover:bg-cinema-accent-dark transition-colors duration-300"
              >
                View Showreel
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 border border-cinema-ink/30 text-cinema-ink px-8 py-4 type-caption text-xs hover:border-cinema-accent hover:bg-cinema-ink/10 transition-all duration-300"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {/* Stage 2: Philosophy */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8"
          style={{
            opacity: stage === 2 ? 1 : 0,
            transform:
              stage === 2
                ? "translateY(0)"
                : stage < 2
                ? "translateY(40px)"
                : "translateY(-40px)",
            pointerEvents: stage === 2 ? "auto" : "none",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="max-w-2xl">
            <p className="type-caption text-cinema-accent mb-6 tracking-widest">
              Phase 01 / The Philosophy
            </p>
            <h2
              className="type-display text-4xl sm:text-6xl text-cinema-ink leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SLOW CINEMA,<br />
              <span className="text-cinema-accent">DELIBERATE</span> LIGHT
            </h2>
            <p
              className="type-serif text-lg sm:text-xl text-cinema-muted mt-6 leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We believe in wide spaces, quiet sequences, and allowing frames to
              breathe. We don&apos;t chase attention; we design visual
              architectures that invite viewers to settle and stay.
            </p>
            <div className="flex items-center gap-4 mt-8 text-xs font-mono text-cinema-muted">
              <span className="text-cinema-accent font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-cinema-ink/20" />
              <span>KINO PRECISION SEQUENCE</span>
            </div>
          </div>
        </div>

        {/* Stage 3: The Work */}
        <div
          className="absolute inset-0 flex items-center justify-end px-6 lg:px-8"
          style={{
            opacity: stage === 3 ? 1 : 0,
            transform:
              stage === 3 ? "translateY(0)" : "translateY(40px)",
            pointerEvents: stage === 3 ? "auto" : "none",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="max-w-xl text-right">
            <p className="type-caption text-cinema-accent mb-6 tracking-widest">
              Phase 02 / Selected Work
            </p>
            <h2
              className="type-display text-4xl sm:text-6xl text-cinema-ink leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CRAFTED FOR<br />
              <span className="text-cinema-accent">PERFECTION</span>
            </h2>
            <p
              className="type-serif text-lg sm:text-xl text-cinema-muted mt-6 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              From the Western Ghats to the neon-lit streets of Mumbai — every
              project is a study in restraint, atmosphere, and tempo.
            </p>
            <div className="flex justify-end mt-8">
              <Link
                href="#work"
                className="inline-flex items-center gap-3 bg-cinema-accent text-cinema-bg px-8 py-4 type-caption text-xs hover:bg-cinema-accent-dark transition-colors duration-300"
              >
                Explore Work →
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Metadata */}
        <div
          className="absolute left-6 bottom-8 hidden xl:flex flex-col gap-1 font-mono text-[9px] text-cinema-muted tracking-widest leading-relaxed z-30 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
        >
          <p>
            <span className="text-cinema-accent">STUDIO:</span> KINO ATWORK
          </p>
          <p>
            <span className="text-cinema-accent">LOCATION:</span> MUMBAI /
            VARANASI
          </p>
          <p>
            <span className="text-cinema-accent">CLASSIFICATION:</span> SLOW CINEMA
          </p>
        </div>

        <div
          className="absolute right-6 bottom-8 hidden xl:flex flex-col gap-1 font-mono text-[9px] text-cinema-muted tracking-widest text-right leading-relaxed z-30 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
        >
          <p>
            <span className="text-cinema-accent">PROGRESS:</span> {pct}%
          </p>
          <p>
            <span className="text-cinema-accent">FRAMES:</span> {FRAME_COUNT}
          </p>
          <p>
            <span className="text-cinema-accent">FORMAT:</span> WEBP SEQUENCE
          </p>
        </div>
      </div>
    </CanvasScrubber>
  );
}
