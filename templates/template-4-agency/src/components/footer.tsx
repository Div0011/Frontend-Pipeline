"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (progress: number) => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: total * progress, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 px-[var(--gutter)] pt-8 pb-2 text-white">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight text-white uppercase">
            VOID<span className="text-[#d4ff00]">.</span>
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-white/35 uppercase">
            Digital craft & motion direction
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase">
          <button type="button" onClick={() => scrollTo(0.75)} className="transition-colors hover:text-[#d4ff00]" data-cursor="GO">
            Work
          </button>
          <button type="button" onClick={() => scrollTo(0.5)} className="transition-colors hover:text-[#d4ff00]" data-cursor="GO">
            Services
          </button>
          <button type="button" onClick={() => scrollTo(0.25)} className="transition-colors hover:text-[#d4ff00]" data-cursor="GO">
            About
          </button>
          <button type="button" onClick={() => scrollTo(1)} className="transition-colors hover:text-[#d4ff00]" data-cursor="GO">
            Contact
          </button>
        </nav>

        <button
          type="button"
          onClick={scrollToTop}
          className="font-mono text-[11px] font-medium tracking-[0.22em] text-white/50 uppercase transition-colors hover:text-[#d4ff00]"
          data-cursor="TOP"
        >
          Top ↑
        </button>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[10px] tracking-[0.18em] text-white/25 uppercase sm:flex-row sm:items-center">
        <span>© 2026 VOID Creative Agency</span>
        <span>Built for the scroll</span>
      </div>
    </footer>
  );
}
