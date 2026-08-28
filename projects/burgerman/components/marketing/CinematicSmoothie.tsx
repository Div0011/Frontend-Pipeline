"use client";

import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  { length: 240 },
  (_, i) => `/frames/smoothie/frame_${String(i).padStart(6, "0")}.webp`
);

export default function CinematicSmoothie() {
  return (
    <CanvasScrubber frames={frames} scrollDistance="+=200%">
      <div className="h-full w-full flex flex-col justify-center p-8 sm:p-12 md:p-20 relative pointer-events-none">
        <div className="max-w-3xl space-y-4">
          <h2 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none font-black tracking-tight">
            LOTUS BISCOFF <br />
            <span style={{ color: "#15803D" }}>SPECULOOS MALT</span>
          </h2>
        </div>
      </div>
    </CanvasScrubber>
  );
}
