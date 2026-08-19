"use client";

import type { ReactNode } from "react";

export default function Stamp({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-[10px] font-mono tracking-widest text-brand-accent border border-brand-accent/20 px-4 py-2 rounded-full inline-block bg-brand-paper-warm/40 backdrop-blur-xs select-none"
    >
      {children}
    </span>
  );
}
