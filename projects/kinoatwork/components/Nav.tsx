"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { soundEngine } from "@/lib/audio";

const CHAPTERS = [
  { href: "#work",       label: "Work" },
  { href: "#philosophy", label: "Manifesto" },
  { href: "#reel",       label: "Reel" },
  { href: "#contact",    label: "Contact" },
];

interface NavProps {
  chapterId?: string | null;
}

export default function Nav({ chapterId }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      style={{ transition: "opacity 0.5s ease" }}
    >
      <div
        className="max-w-[88rem] mx-auto px-6 lg:px-8 flex items-start justify-between pt-8 lg:pt-10"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          onMouseEnter={() => soundEngine.triggerHoverClick()}
          className="pointer-events-auto flex items-center gap-3 group"
          data-cursor-text="HOME"
        >
          {/* Square mark */}
          <span
            className="flex-shrink-0 transition-all duration-500"
            style={{
              width: "7px",
              height: "7px",
              background: "#d4a84b",
              display: "block",
              opacity: scrolled ? 0.9 : 0.7,
            }}
          />
          {/* Name */}
          <span
            className="type-display text-cinema-ink leading-none tracking-widest"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              letterSpacing: "0.28em",
              opacity: scrolled ? 0.9 : 0.65,
              transition: "opacity 0.4s ease",
            }}
          >
            SFUMATO
          </span>
        </Link>

        {/* ── Right: nav links (top-right, small mono) ── */}
        <div className="hidden md:flex items-center gap-8">
          {CHAPTERS.map((ch) => (
            <Link
              key={ch.href}
              href={ch.href}
              onMouseEnter={() => soundEngine.triggerHoverClick()}
              className="pointer-events-auto relative type-label text-cinema-ink transition-all duration-300 group"
              style={{
                fontSize: "0.5625rem",
                letterSpacing: "0.22em",
                opacity: scrolled ? 0.55 : 0.35,
              }}
              data-cursor-text="GO"
            >
              {ch.label.toUpperCase()}
              {/* underline on hover */}
              <span
                className="absolute -bottom-1 left-0 h-px bg-cinema-accent"
                style={{
                  width: 0,
                  transition: "width 0.35s ease",
                }}
                ref={(el) => {
                  if (!el) return;
                  // Hover handled via CSS below — simpler
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
