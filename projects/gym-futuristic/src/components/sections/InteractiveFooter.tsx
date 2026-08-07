"use client";

import React, { useState, useEffect, useRef } from "react";

const BG_UNIFIED = "#6b6f76";

export default function InteractiveFooter() {
  const [mounted, setMounted] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    const el = textRef.current;
    if (!el) return;

    const loop = () => {
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.06;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.06;
      el.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!mounted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseRef.current = {
      x: (e.clientX - cx) * 0.03,
      y: (e.clientY - cy) * 0.03,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
  };

  return (
    <footer
      style={{ backgroundColor: BG_UNIFIED }}
      className="min-h-screen flex flex-col justify-between relative overflow-hidden px-8 md:px-16 pt-24 pb-12 select-none border-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Inter-Section Volumetric Fog Mask at Top of Footer */}
      <div className="video-section-fog-top z-10" style={{ "--fog-color": BG_UNIFIED } as React.CSSProperties} />

      {/* Main Center Typography */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto py-12 relative z-20">
        <h1
          ref={textRef}
          className="text-shimmer will-change-transform cursor-default"
          style={{
            fontSize: "clamp(5rem,22vw,22rem)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            color: "#f0f0f0",
            lineHeight: 0.85,
            transition: "none",
          }}
        >
          FORGE
        </h1>
      </div>

      {/* Bottom Classy Link Bar */}
      <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono-label text-[0.68rem] text-white/50 border-0 relative z-20">
        {/* Left: Contact */}
        <a
          href="mailto:join@forge.fitness"
          className="hover:text-white transition-colors duration-300 link-underline"
        >
          JOIN@FORGE.FITNESS
        </a>

        {/* Center: Socials */}
        <div className="flex items-center gap-8">
          {["INSTAGRAM", "TWITTER", "YOUTUBE"].map((social) => (
            <a
              key={social}
              href="#"
              className="hover:text-white transition-colors duration-300 link-underline"
            >
              {social}
            </a>
          ))}
        </div>

        {/* Right: Copyright */}
        <span>© 2026 FORGE FITNESS. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}
