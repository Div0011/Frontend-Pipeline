"use client";

export default function Footer() {
  return (
    <footer className="relative z-30 overflow-hidden border-t border-white/8 bg-[#030304] px-8 py-20 font-mono text-[#f3f1ec] md:px-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,166,107,0.08)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
        <div>
          <span className="font-display text-2xl font-black uppercase tracking-tight text-[#f3f1ec] md:text-3xl">
            APEX ELEM-01
          </span>
          <p className="mt-3 max-w-sm font-mono text-xs font-medium leading-relaxed text-[#f3f1ec]/45">
            Elemental Hardware Labs — where matter obeys. Limited instrumentation
            for the quiet majority.
          </p>
        </div>

        <a
          href="#covenant"
          className="border border-[#c9a66b] bg-[#c9a66b] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#0a0a0b] transition-colors hover:bg-[#d4b57e]"
          data-cursor="hover"
          data-cursor-label="SECURE"
        >
          Secure Instrumentation — $1,299
        </a>
      </div>
      <div className="relative mt-14 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-[#f3f1ec]/25">
        © 2026 Apex Hardware Labs // All Elemental Rights Reserved
      </div>
    </footer>
  );
}
