"use client";

import React, { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);

    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 8) + 3;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
        setTimeout(() => setVisible(false), 1200);
      }
      setPercent(start);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9990] flex flex-col items-center justify-center transition-all duration-700 select-none ${
        done ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{ backgroundColor: "#7b7b7b" }}
    >
      {/* Full-screen weight-plate video with instant 1080p poster fallback */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/videos/weight-plate-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-85"
      >
        <source src="/videos/weight-plate.mp4" type="video/mp4" />
      </video>

      {/* Dense Foggy Border Overlays */}
      <div
        className="video-dense-radial-fog z-5"
        style={{ "--fog-color": "#7b7b7b" } as React.CSSProperties}
      />
      <div
        className="video-dense-edge-feather z-5"
        style={{ "--fog-color": "#7b7b7b" } as React.CSSProperties}
      />
      <div
        className="video-dense-box-shadow z-5"
        style={{ "--fog-color": "#7b7b7b" } as React.CSSProperties}
      />

      {/* Minimal Classy Brand & Progress Overlay */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm px-6 text-center">
        <h1
          className="text-shimmer"
          style={{
            fontSize: "clamp(3.5rem,10vw,6rem)",
            fontWeight: 900,
            letterSpacing: "-0.055em",
            color: "#f0f0f0",
            lineHeight: 0.9,
          }}
        >
          FORGE
        </h1>

        <span className="font-mono-label text-white/50 text-[0.68rem] tracking-[0.35em]">
          THE FUTURE OF FITNESS
        </span>

        <div className="w-full mt-4 flex flex-col items-center gap-3">
          <div className="w-48 h-px bg-white/20 overflow-hidden rounded-full relative">
            <div
              className="h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-mono-label text-white/40 text-[0.6rem] tracking-[0.25em]">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
