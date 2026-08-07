"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { num: "01", label: "HOME",       href: "#" },
  { num: "02", label: "EQUIPMENT",  href: "#dumbbell" },
  { num: "03", label: "PHILOSOPHY", href: "#philosophy" },
  { num: "04", label: "CLASSES",    href: "/classes" },
  { num: "05", label: "COACHES",    href: "/coaches" },
  { num: "06", label: "MEMBERSHIP", href: "/membership" },
];

export default function FullscreenMenu({
  menuOpen,
  onClose,
}: {
  menuOpen: boolean;
  onClose: () => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: "#6b6f76" }}
        >
          {/* Weight-plate background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          >
            <source src="/videos/weight-plate.mp4" type="video/mp4" />
          </video>

          {/* Volumetric Fog Overlays matching background tone */}
          <div className="video-dense-radial-fog z-[25]" style={{ "--fog-color": "#6b6f76" } as React.CSSProperties} />
          <div className="video-dense-edge-feather z-[26]" style={{ "--fog-color": "#6b6f76" } as React.CSSProperties} />
          <div className="video-dense-box-shadow z-[27]" style={{ "--fog-color": "#6b6f76" } as React.CSSProperties} />

          {/* Translucent Backdrop Scrim */}
          <div className="absolute inset-0 bg-[#6b6f76]/80 backdrop-blur-md z-1" />

          {/* Close trigger in header */}
          <div className="absolute top-6 right-8 md:right-16 z-30">
            <button
              onClick={onClose}
              className="font-mono-label text-white/70 hover:text-white transition-colors flex items-center gap-2"
              aria-label="Close menu"
            >
              <span>CLOSE</span>
              <span className="text-base">✕</span>
            </button>
          </div>

          {/* Clean Links List with Foggy-to-Clear Hover Effect */}
          <div className="relative z-30 w-full max-w-4xl px-8 md:px-16 flex flex-col items-center my-auto">
            <ul className="w-full flex flex-col gap-2">
              {navLinks.map(({ num, label, href }, i) => {
                const isHovered = hoveredIndex === i;
                const isAnyHovered = hoveredIndex !== null;

                return (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <a
                      href={href}
                      onClick={onClose}
                      className="group py-4 px-4 flex items-center justify-between transition-all duration-500 rounded-xl"
                      style={{
                        // Foggy blur by default, clears up sharply on cursor hover
                        filter: isHovered
                          ? "blur(0px)"
                          : isAnyHovered
                          ? "blur(6px)"
                          : "blur(3.5px)",
                        opacity: isHovered ? 1.0 : isAnyHovered ? 0.35 : 0.65,
                        transform: isHovered ? "scale(1.03) translateX(8px)" : "scale(1.0)",
                      }}
                    >
                      <div className="flex items-center gap-6">
                        <span className="font-mono-label text-white/40 text-[0.72rem] transition-colors group-hover:text-white/90">
                          {num}
                        </span>
                        <span className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase transition-all duration-300">
                          {label}
                        </span>
                      </div>

                      <span
                        className="text-white/40 text-xl transition-all duration-300 group-hover:text-white group-hover:translate-x-2"
                      >
                        →
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Minimal Footer in Menu */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-30 font-mono-label text-[0.65rem] text-white/40">
            <span>LOS ANGELES, CA</span>
            <span>FORGE FITNESS © 2026</span>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
