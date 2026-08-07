"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] px-8 py-16 text-white md:px-16 relative z-30 font-mono">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <span className="font-display text-2xl font-black tracking-tight text-white uppercase">APEX ELEM-01</span>
          <p className="mt-2 font-mono text-xs text-white/60 font-bold">ELEMENTAL HARDWARE LABS — where matter obeys.</p>
        </div>

        <button className="border border-[#d4a574] bg-[#d4a574] text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-all hover:bg-[#e0b98a] shadow-lg cursor-pointer">
          Secure Instrumentation — $1,299 USD
        </button>
      </div>
      <div className="mt-12 text-center font-mono text-[9px] uppercase text-white/40 tracking-widest font-bold">
        © 2026 APEX HARDWARE LABS // ALL ELEMENTAL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
