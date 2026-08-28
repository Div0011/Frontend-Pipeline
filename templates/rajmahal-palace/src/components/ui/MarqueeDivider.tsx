"use client";

import { MandalaIcon } from "./JaaliOverlay";

export default function MarqueeDivider({
  text = "RAAJMAHAL PALACE · ROYAL HERITAGE SANCTUARY · JAIPUR · RAJASTHAN · EST. 1592",
  reverse = false,
}: {
  text?: string;
  reverse?: boolean;
}) {
  const items = Array(6).fill(text);

  return (
    <div className="relative w-full py-6 bg-[#20060a] border-y border-[#f5d061]/25 overflow-hidden z-20 pointer-events-auto">
      <div
        className={`flex whitespace-nowrap gap-12 font-mono text-[10px] uppercase tracking-[0.35em] text-[#f5d061] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span>{item}</span>
            <MandalaIcon className="w-4 h-4 text-[#f5d061]/60 shrink-0" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#f5d061] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
