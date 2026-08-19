"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { soundEngine } from "@/lib/audio";

/* ================================================================== */
/* Types & helpers                                                      */
/* ================================================================== */

interface ChapterOverlayProps {
  progress: number;
  chapterId: string | null;
}

/** Map global progress → local chapter progress [0, 1] */
function useLocalProgress(progress: number, chapterId: string | null) {
  return useMemo(() => {
    if (!chapterId) return 0;
    const ranges: Record<string, [number, number]> = {
      intro:      [0,     0.208],
      work:       [0.208, 0.455],
      philosophy: [0.455, 0.62 ],
      reel:       [0.62,  0.785],
      contact:    [0.785, 0.91 ],
      outro:      [0.91,  1.0  ],
    };
    const r = ranges[chapterId];
    if (!r) return 0;
    const [start, end] = r;
    return Math.max(0, Math.min(1, (progress - start) / (end - start)));
  }, [progress, chapterId]);
}

/** Ease in for entry, ease out for exit within chapter */
function chapterAlpha(local: number, inWindow = 0.18, outWindow = 0.15) {
  const entry = Math.min(1, local / inWindow);
  const exit  = local > (1 - outWindow) ? 1 - (local - (1 - outWindow)) / outWindow : 1;
  return Math.max(0, Math.min(1, entry * exit));
}

/* ================================================================== */
/* Root overlay                                                        */
/* ================================================================== */

export default function ChapterOverlay({ progress, chapterId }: ChapterOverlayProps) {
  const local = useLocalProgress(progress, chapterId);

  return (
    <div
      className="absolute inset-0 z-30 pointer-events-none"
      /* Individual overlays control their own opacity for precise authoring */
    >
      {chapterId === "intro"      && <IntroContent      local={local} progress={progress} />}
      {chapterId === "work"       && <WorkOverlay       local={local} progress={progress} />}
      {chapterId === "philosophy" && <PhilosophyOverlay local={local} />}
      {chapterId === "reel"       && <ReelOverlay       local={local} progress={progress} />}
      {chapterId === "contact"    && <ContactOverlay    local={local} />}
      {chapterId === "outro"      && <OutroOverlay      local={local} />}
    </div>
  );
}

/* ================================================================== */
/* INTRO — corner-anchored editorial layout                            */
/* ================================================================== */

function IntroContent({ local, progress }: { local: number; progress: number }) {
  const alpha = chapterAlpha(local, 0.12, 0.12);

  // Staggered line reveals
  const line1 = Math.max(0, Math.min(1, local / 0.15));
  const line2 = Math.max(0, Math.min(1, (local - 0.08) / 0.15));
  const line3 = Math.max(0, Math.min(1, (local - 0.18) / 0.15));
  const meta  = Math.max(0, Math.min(1, (local - 0.28) / 0.2));
  const cta   = Math.max(0, Math.min(1, (local - 0.42) / 0.25));

  // Corner metadata: fades out earlier
  const cornerAlpha = Math.max(0, 1 - progress * 3.5);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-end"
      style={{ opacity: alpha }}
    >
      {/* ── Bottom-left: main title block ── */}
      <div
        className="absolute left-0 bottom-0 px-8 lg:px-12 pb-16 lg:pb-20 max-w-4xl"
      >
        {/* Kicker */}
        <div
          className="overflow-hidden mb-5"
          style={{ opacity: line1 }}
        >
          <p
            className="type-label text-cinema-accent"
            style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.26em",
              transform: `translateY(${(1 - line1) * 18}px)`,
              transition: "none",
            }}
          >
            <span
              className="inline-block w-3 h-px bg-cinema-accent mr-3 align-middle"
              style={{ verticalAlign: "middle" }}
            />
            CINEMA PRODUCTION HOUSE
          </p>
        </div>

        {/* Title line 1 */}
        <div className="overflow-hidden">
          <h1
            className="type-display text-cinema-ink leading-none block"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              letterSpacing: "0.04em",
              transform: `translateY(${(1 - line1) * 60}px)`,
              opacity: line1,
              transition: "none",
            }}
          >
            SFUMATO
          </h1>
        </div>

        {/* Title line 2 */}
        <div className="overflow-hidden">
          <h1
            className="type-display text-cinema-accent italic font-normal block"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              letterSpacing: "0.04em",
              fontStyle: "italic",
              transform: `translateY(${(1 - line2) * 60}px)`,
              opacity: line2,
              transition: "none",
            }}
          >
            Cinema
          </h1>
        </div>

        {/* Rule */}
        <div
          className="my-7"
          style={{
            height: "1px",
            background: "rgba(244,241,236,0.1)",
            width: `${line3 * 100}%`,
            transition: "width 0.05s linear",
          }}
        />

        {/* Sub-text */}
        <p
          className="type-serif text-cinema-muted max-w-sm"
          style={{
            fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)",
            lineHeight: 1.65,
            opacity: line3,
            transform: `translateY(${(1 - line3) * 20}px)`,
            transition: "none",
          }}
        >
          Where light, silence, and tempo converge.
          <br />
          Every frame is a deliberate meditation.
        </p>

        {/* CTAs */}
        <div
          className="flex items-center gap-8 mt-9"
          style={{ opacity: cta }}
        >
          <Link
            href="#work"
            onMouseEnter={() => soundEngine.triggerHoverClick()}
            className="pointer-events-auto type-label text-cinema-ink hover:text-cinema-accent transition-colors duration-300 flex items-center gap-3"
            style={{ fontSize: "0.5625rem", letterSpacing: "0.22em" }}
            data-cursor-text="VIEW"
          >
            <span
              className="block"
              style={{ width: "28px", height: "1px", background: "currentColor" }}
            />
            VIEW WORKS
          </Link>
          <Link
            href="#contact"
            onMouseEnter={() => soundEngine.triggerHoverClick()}
            className="pointer-events-auto type-label text-cinema-muted hover:text-cinema-ink transition-colors duration-300"
            style={{ fontSize: "0.5625rem", letterSpacing: "0.22em" }}
            data-cursor-text="INQUIRE"
          >
            INQUIRE
          </Link>
        </div>
      </div>

      {/* ── Top-right: coordinates / studio meta ── */}
      <div
        className="absolute right-8 top-28 hidden xl:block text-right"
        style={{ opacity: cornerAlpha }}
      >
        <p className="type-meta" style={{ fontSize: "0.5rem", lineHeight: 2.2, letterSpacing: "0.2em" }}>
          <span className="text-cinema-accent">STUDIO</span>  SFUMATO CINEMA<br />
          <span className="text-cinema-accent">LOCATION</span>  MUMBAI / VARANASI<br />
          <span className="text-cinema-accent">GENRE</span>  SLOW CINEMA<br />
          <span className="text-cinema-accent">FORMAT</span>  2.39 : 1
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/* WORK — film-metadata sidebar                                        */
/* ================================================================== */

function WorkOverlay({ local, progress }: { local: number; progress: number }) {
  const projects = [
    {
      title: "Silence of the Ghats",
      location: "WESTERN GHATS",
      year: "2024",
      format: "16mm / 4K",
      desc: "A meditation on mist, sacred waters, and ancient stillness.",
    },
    {
      title: "The Last Monsoon",
      location: "KERALA",
      year: "2025",
      format: "35mm / 6K",
      desc: "Temporal rhythm recorded across tropical downpours.",
    },
    {
      title: "After the Light",
      location: "MUMBAI",
      year: "2025",
      format: "Digital / 8K",
      desc: "High-contrast neon architectures in nocturnal silence.",
    },
    {
      title: "Benares Shadows",
      location: "VARANASI",
      year: "2026",
      format: "IMAX / 12K",
      desc: "Sacred fire geometry along the riverfront.",
    },
  ];

  const rawIdx = Math.floor(local * projects.length);
  const idx = Math.max(0, Math.min(projects.length - 1, isNaN(rawIdx) ? 0 : rawIdx));
  const p = projects[idx] ?? projects[0];
  const alpha = chapterAlpha(local, 0.12, 0.1);

  // Sub-element animates on each project switch
  const localWithinProject = (local * projects.length) % 1;
  const subAlpha = Math.min(1, localWithinProject / 0.25);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between"
      style={{ opacity: alpha }}
    >
      {/* ── Top-left: counter ── */}
      <div className="absolute top-28 left-8 lg:left-12">
        <p
          className="type-meta"
          style={{ fontSize: "0.5rem", letterSpacing: "0.22em" }}
        >
          SELECTED EXHIBITION
        </p>
        <p
          className="type-display text-cinema-accent mt-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          {String(idx + 1).padStart(2, "0")}
          <span className="text-cinema-faint" style={{ fontSize: "40%" }}>
            {" "}/{String(projects.length).padStart(2, "0")}
          </span>
        </p>
      </div>

      {/* ── Right edge: vertical project name ── */}
      <div
        className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:block"
        style={{ opacity: subAlpha }}
      >
        <p
          className="writing-vertical type-label text-cinema-muted"
          style={{ fontSize: "0.5625rem", letterSpacing: "0.22em" }}
        >
          {p.location} // {p.year}
        </p>
      </div>

      {/* ── Bottom-left: title block ── */}
      <div className="absolute left-0 bottom-0 px-8 lg:px-12 pb-16 lg:pb-20 max-w-2xl">
        <div className="overflow-hidden">
          <h2
            className="type-display text-cinema-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 5rem)",
              letterSpacing: "0.03em",
              lineHeight: 1,
              opacity: subAlpha,
              transform: `translateY(${(1 - Math.min(1, subAlpha * 2)) * 30}px)`,
              transition: "none",
            }}
          >
            {p.title}
          </h2>
        </div>

        <div
          className="my-5"
          style={{
            height: "1px",
            background: "rgba(244,241,236,0.08)",
            width: `${subAlpha * 100}%`,
            transition: "width 0.06s linear",
          }}
        />

        <p
          className="type-serif text-cinema-muted"
          style={{
            fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
            opacity: subAlpha,
            maxWidth: "400px",
            lineHeight: 1.6,
          }}
        >
          {p.desc}
        </p>

        {/* Format & tech metadata */}
        <div
          className="flex items-center gap-6 mt-5"
          style={{ opacity: subAlpha * 0.7 }}
        >
          {[`FORMAT: ${p.format}`, `LOCATION: ${p.location}`, `YEAR: ${p.year}`].map((t) => (
            <p key={t} className="type-meta" style={{ fontSize: "0.475rem" }}>
              {t}
            </p>
          ))}
        </div>
      </div>

      {/* ── Bottom: chapter progress bar ── */}
      <div
        className="absolute bottom-8 left-8 lg:left-12 right-8 lg:right-12 flex items-center gap-4"
        style={{ opacity: 0.45 }}
      >
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(244,241,236,0.08)" }}
        >
          <div
            className="h-full"
            style={{
              width: `${local * 100}%`,
              background: "linear-gradient(90deg, #d4a84b 0%, rgba(212,168,75,0.3) 100%)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
        <p className="type-meta flex-shrink-0" style={{ fontSize: "0.45rem" }}>
          {String(Math.round(local * 100)).padStart(3, "0")} %
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/* PHILOSOPHY — full-bleed typographic moment                         */
/* ================================================================== */

function PhilosophyOverlay({ local }: { local: number }) {
  const alpha = chapterAlpha(local, 0.1, 0.1);

  // Stage 1 (Manifesto Text): active when local progress is < 0.5
  const stage1Opacity = Math.max(0, Math.min(1, (0.45 - local) / 0.1));
  const l1 = Math.min(1, local / 0.18);
  const l2 = Math.max(0, Math.min(1, (local - 0.12) / 0.18));
  const l3 = Math.max(0, Math.min(1, (local - 0.22) / 0.18));
  const rule = Math.max(0, Math.min(1, (local - 0.32) / 0.15));

  // Stage 2 (Directors profiles): active when local progress is >= 0.5
  const stage2Opacity = Math.max(0, Math.min(1, (local - 0.5) / 0.12));
  const cardTranslateY = (1 - stage2Opacity) * 35;

  return (
    <div className="absolute inset-0 select-none" style={{ opacity: alpha }}>
      {/* ── Stage 1: Manifesto Text ── */}
      {local < 0.5 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-8 lg:px-16"
          style={{ opacity: stage1Opacity }}
        >
          {/* Kicker */}
          <div className="overflow-hidden mb-6 w-full max-w-4xl text-center">
            <p
              className="type-meta text-cinema-accent"
              style={{
                fontSize: "0.5rem",
                letterSpacing: "0.3em",
                transform: `translateY(${(1 - l1) * 16}px)`,
                opacity: l1,
              }}
            >
              MANIFESTO // PHASE 01
            </p>
          </div>

          {/* Line 1 */}
          <div className="overflow-hidden">
            <h2
              className="type-display text-cinema-ink text-center"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 7rem)",
                letterSpacing: "0.04em",
                lineHeight: 0.9,
                transform: `translateY(${(1 - l1) * 50}px)`,
                opacity: l1,
              }}
            >
              Slow Cinema,
            </h2>
          </div>

          {/* Line 2 — italic accent */}
          <div className="overflow-hidden">
            <h2
              className="type-display text-cinema-accent text-center italic font-normal"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 7rem)",
                letterSpacing: "0.04em",
                lineHeight: 0.95,
                transform: `translateY(${(1 - l2) * 50}px)`,
                opacity: l2,
              }}
            >
              Deliberate Light
            </h2>
          </div>

          {/* Rule draw */}
          <div
            className="my-8 w-full max-w-xs mx-auto"
            style={{
              height: "1px",
              background: "rgba(244,241,236,0.12)",
              width: `${rule * 100}%`,
              maxWidth: "200px",
              transition: "width 0.06s linear",
            }}
          />

          {/* Quote */}
          <div className="overflow-hidden max-w-2xl">
            <p
              className="type-serif text-cinema-muted text-center italic"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)",
                lineHeight: 1.8,
                transform: `translateY(${(1 - l3) * 24}px)`,
                opacity: l3 * 0.8,
              }}
            >
              &ldquo;We believe in wide spaces, quiet sequences, and allowing frames
              to breathe. We design visual architectures that invite viewers to
              settle and stay.&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* ── Stage 2: Meet the Directors ── */}
      {local >= 0.48 && (
        <div
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-24"
          style={{ opacity: stage2Opacity }}
        >
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-8 md:gap-12">
            <div className="text-center">
              <span className="text-[9px] font-mono tracking-widest text-cinema-accent border border-cinema-accent/20 px-3 py-1.5 rounded-full inline-block bg-cinema-surface/40 backdrop-blur-xs select-none">
                THE MAISON
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-cinema-ink mt-4 tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Meet our <span className="italic font-normal text-cinema-accent">Directors</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full">
              {/* Director 1: Aarav */}
              <div
                className="flex flex-col gap-4 text-left group cursor-pointer"
                style={{ transform: `translateY(${cardTranslateY}px)` }}
                data-cursor-text="AARAV"
              >
                <div className="w-full aspect-[16/10] overflow-hidden rounded-md border border-cinema-rule bg-cinema-surface relative">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=90&fit=crop&grayscale"
                    alt="Aarav Mehta"
                    fill
                    className="object-cover scale-102 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="pl-4 border-l border-cinema-accent pointer-events-none">
                  <h3 className="font-display font-bold text-xl text-cinema-ink">Aarav Mehta</h3>
                  <p className="text-[9px] font-mono tracking-wider text-cinema-accent mt-0.5 uppercase">
                    Director & Cinematographer
                  </p>
                  <p className="text-xs text-cinema-muted leading-relaxed mt-2 max-w-sm">
                    Aarav specializes in slow-cinema narratives and high-contrast natural lighting, capturing the raw, sacred essence of India&apos;s ancient ghats and rivers.
                  </p>
                </div>
              </div>

              {/* Director 2: Elena */}
              <div
                className="flex flex-col gap-4 text-left group md:mt-8 cursor-pointer"
                style={{ transform: `translateY(${cardTranslateY}px)` }}
                data-cursor-text="ELENA"
              >
                <div className="w-full aspect-[16/10] overflow-hidden rounded-md border border-cinema-rule bg-cinema-surface relative">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=90&fit=crop&grayscale"
                    alt="Elena Rostova"
                    fill
                    className="object-cover scale-102 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="pl-4 border-l border-cinema-accent pointer-events-none">
                  <h3 className="font-display font-bold text-xl text-cinema-ink">Elena Rostova</h3>
                  <p className="text-[9px] font-mono tracking-wider text-cinema-accent mt-0.5 uppercase">
                    Visual Editor & Artist
                  </p>
                  <p className="text-xs text-cinema-muted leading-relaxed mt-2 max-w-sm">
                    Elena leads post-production and motion architecture. Her visual work blends the neon nocturnes of Mumbai with minimalist design, creating editing rhythms that linger.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/* REEL — lower-third documentary metadata                            */
/* ================================================================== */

function ReelOverlay({ local, progress }: { local: number; progress: number }) {
  const [modalOpen, setModalOpen] = useState(false);

  const stills = [
    { title: "Silence of the Ghats",  loc: "Varanasi Riverfront", dir: "Arnav Mehta",  dur: "18min 30sec" },
    { title: "Desert Solitude",        loc: "Thar Desert, India",  dir: "Priya Singh",  dur: "24min 10sec" },
    { title: "After the Light",        loc: "Mumbai Nights",       dir: "Kabir Rao",    dur: "31min 00sec" },
    { title: "Morning Mist",           loc: "Western Ghats",       dir: "Leila Nair",   dur: "12min 45sec" },
  ];

  const rawIdx = Math.floor(local * stills.length);
  const idx = Math.max(0, Math.min(stills.length - 1, isNaN(rawIdx) ? 0 : rawIdx));
  const s = stills[idx] ?? stills[0];
  const alpha = chapterAlpha(local, 0.1, 0.1);

  // Frame-accurate timecode (rough simulation from progress)
  const totalMinutes = 86;
  const currentSec = Math.floor(local * totalMinutes * 60);
  const hh = String(Math.floor(currentSec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((currentSec % 3600) / 60)).padStart(2, "0");
  const ss = String(currentSec % 60).padStart(2, "0");
  const ff = String(Math.floor(local * 24) % 24).padStart(2, "0");
  const timecode = `${hh}:${mm}:${ss}:${ff}`;

  const subAlpha = Math.min(1, ((local * stills.length) % 1) / 0.2);

  return (
    <div
      className="absolute inset-0"
      style={{ opacity: alpha }}
    >
      {/* ── Top-right: timecode ── */}
      <div className="absolute top-28 right-8 lg:right-12 text-right">
        <p className="type-meta" style={{ fontSize: "0.5rem", letterSpacing: "0.18em" }}>
          FILM ARCHIVES // STILL MOMENTS
        </p>
        <p
          className="type-timecode text-cinema-accent mt-1"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem" }}
        >
          {timecode}
        </p>
      </div>

      {/* ── Left-center: reel counter ── */}
      <div className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2">
        <p className="type-display text-cinema-accent" style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(3rem, 6vw, 6rem)",
          letterSpacing: "0.08em",
          opacity: 0.12,
          lineHeight: 1,
        }}>
          {String(idx + 1).padStart(2, "0")}
        </p>
      </div>

      {/* ── Play Showreel Button (centered) ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: Math.max(0, Math.min(1, (local - 0.1) * 3)) }}
      >
        <button
          onClick={() => {
            soundEngine.triggerHoverClick();
            setModalOpen(true);
          }}
          className="pointer-events-auto flex items-center gap-3 bg-cinema-accent text-cinema-bg hover:bg-cinema-ink hover:text-cinema-accent-dim px-6 py-3.5 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all duration-300 font-bold shadow-lg shadow-cinema-accent-dim/20 cursor-pointer"
          data-cursor-text="PLAY"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play Showreel
        </button>
      </div>

      {/* ── Bottom: lower-third documentary strip ── */}
      <div
        className="absolute left-0 right-0 bottom-0 px-8 lg:px-12 pb-14 lg:pb-18 flex items-end justify-between"
        style={{ opacity: subAlpha }}
      >
        {/* Left: title + location */}
        <div className="max-w-xl">
          {/* Thin gold line above */}
          <div
            style={{
              height: "1px",
              width: `${subAlpha * 180}px`,
              background: "#d4a84b",
              marginBottom: "12px",
              transition: "width 0.06s linear",
            }}
          />
          <h3
            className="type-display text-cinema-ink italic font-normal"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            {s.title}
          </h3>
          <p className="type-meta mt-3" style={{ fontSize: "0.5rem", letterSpacing: "0.22em" }}>
            {s.loc.toUpperCase()}
          </p>
        </div>

        {/* Right: director + duration */}
        <div className="text-right hidden md:block">
          <p className="type-meta" style={{ fontSize: "0.475rem" }}>
            DIR: {s.dir.toUpperCase()}
          </p>
          <p className="type-meta mt-1" style={{ fontSize: "0.475rem" }}>
            DURATION: {s.dur.toUpperCase()}
          </p>
        </div>
      </div>

      {/* ── Bottom right: progress dots ── */}
      <div
        className="absolute bottom-8 right-8 lg:right-12 flex items-center gap-2"
        style={{ opacity: 0.4 }}
      >
        {stills.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === idx ? 24 : 6,
              height: "1px",
              background: i === idx ? "#d4a84b" : "rgba(244,241,236,0.25)",
              transition: "width 0.4s ease, background 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* ── Video Player Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-bg/95 backdrop-blur-md pointer-events-auto">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-8 right-8 text-cinema-muted hover:text-cinema-ink text-[10px] font-mono tracking-widest uppercase cursor-pointer"
          >
            [ Close Player ]
          </button>
          <div className="w-full max-w-5xl aspect-video px-4 md:px-8">
            <div className="w-full h-full rounded-md border border-cinema-rule bg-cinema-surface overflow-hidden relative">
              <iframe
                src="https://player.vimeo.com/video/824804225?autoplay=1&color=d4a84b&title=0&byline=0&portrait=0"
                className="w-full h-full border-none"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/* CONTACT — press-kit layout                                         */
/* ================================================================== */

function ContactOverlay({ local }: { local: number }) {
  const alpha = chapterAlpha(local, 0.15, 0.15);
  const l1 = Math.min(1, local / 0.2);
  const l2 = Math.max(0, Math.min(1, (local - 0.15) / 0.25));
  const l3 = Math.max(0, Math.min(1, (local - 0.35) / 0.3));

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
      style={{ opacity: alpha }}
    >
      {/* Kicker */}
      <div className="overflow-hidden mb-8">
        <p
          className="type-meta text-cinema-accent text-center"
          style={{
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            opacity: l1,
            transform: `translateY(${(1 - l1) * 14}px)`,
          }}
        >
          COLLABORATE & INQUIRE
        </p>
      </div>

      {/* Giant email */}
      <div className="overflow-hidden">
        <a
          href="mailto:studio@sfumato.com"
          onMouseEnter={() => soundEngine.triggerHoverClick()}
          className="pointer-events-auto type-display text-cinema-ink hover:text-cinema-accent transition-colors duration-500 text-center block"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 4vw, 4.5rem)",
            letterSpacing: "0.02em",
            lineHeight: 1,
            fontStyle: "italic",
            fontWeight: 300,
            transform: `translateY(${(1 - l1) * 40}px)`,
            opacity: l1,
          }}
          data-cursor-text="EMAIL"
        >
          studio@sfumato.com
        </a>
      </div>

      {/* Rule */}
      <div
        className="mt-12 mb-8 mx-auto"
        style={{
          height: "1px",
          background: "rgba(244,241,236,0.08)",
          width: `${l2 * 320}px`,
          maxWidth: "320px",
          transition: "width 0.05s linear",
        }}
      />

      {/* Two-column meta */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6 text-center"
        style={{ opacity: l3 * 0.7 }}
      >
        {[
          { label: "LOCATION", value: "Varanasi\nBandra, Mumbai" },
          { label: "CONTACT",  value: "hello@sfumato.com\n+91 98300 28470" },
          { label: "SOCIAL",   value: "Instagram\nVimeo" },
          { label: "STUDIO",   value: "Est. 2024\nAll Rights Reserved" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="type-meta text-cinema-accent" style={{ fontSize: "0.45rem", marginBottom: "8px" }}>
              {label}
            </p>
            <p
              className="type-body text-cinema-muted"
              style={{ fontSize: "0.625rem", lineHeight: 1.9, whiteSpace: "pre-line" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* OUTRO — letter-by-letter reveal                                    */
/* ================================================================== */

function OutroOverlay({ local }: { local: number }) {
  const alpha = Math.min(1, local * 2.5);
  const l1 = Math.min(1, local / 0.25);
  const l2 = Math.max(0, Math.min(1, (local - 0.18) / 0.3));
  const l3 = Math.max(0, Math.min(1, (local - 0.4) / 0.3));

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
      style={{ opacity: alpha }}
    >
      {/* Studio kicker */}
      <p
        className="type-meta text-cinema-accent text-center mb-8"
        style={{ fontSize: "0.5rem", letterSpacing: "0.3em", opacity: l1 }}
      >
        SFUMATO STUDIO
      </p>

      {/* Main outro headline */}
      <div className="overflow-hidden">
        <h2
          className="type-display text-cinema-ink text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 8rem)",
            letterSpacing: "0.04em",
            lineHeight: 0.92,
            transform: `translateY(${(1 - l1) * 50}px)`,
            opacity: l1,
          }}
        >
          Every Frame
        </h2>
      </div>
      <div className="overflow-hidden">
        <h2
          className="type-display text-cinema-ink text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 8rem)",
            letterSpacing: "0.04em",
            lineHeight: 0.92,
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          Is A{" "}
          <span className="text-cinema-accent" style={{ transform: `translateY(${(1 - l2) * 50}px)`, display: "inline-block", opacity: l2 }}>
            Meditation
          </span>
        </h2>
      </div>

      {/* Return CTA */}
      <div
        className="mt-14"
        style={{ opacity: l3 }}
      >
        <Link
          href="/"
          onMouseEnter={() => soundEngine.triggerHoverClick()}
          className="pointer-events-auto type-label text-cinema-muted hover:text-cinema-accent transition-colors duration-400 flex items-center gap-4"
          style={{ fontSize: "0.5625rem", letterSpacing: "0.22em" }}
          data-cursor-text="RESTART"
        >
          <span style={{ width: "20px", height: "1px", background: "currentColor", display: "block" }} />
          RETURN TO START
        </Link>
      </div>
    </div>
  );
}
