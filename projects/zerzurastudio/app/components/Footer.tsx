"use client";

export default function Footer() {
  return (
    <footer className="relative bg-cinema-dark text-cinema-cream overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(rgba(201, 169, 110, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 110, 0.15) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cinema-gold/30 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cinema-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          <div className="lg:col-span-5">
            <h3 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              ZERZURA<span className="text-cinema-gold">.</span>
            </h3>
            <p className="text-cinema-cream/30 max-w-sm leading-relaxed mb-10 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Let&apos;s build a community to change the world. At Zerzura Studio, we craft tools to grant wishes and fulfill dreams.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/smashguys.in/"
                className="w-10 h-10 rounded-full border border-cinema-cream/10 flex items-center justify-center hover:border-cinema-gold/50 hover:bg-cinema-gold/10 transition-all duration-500 cursor-hover"
              >
                <svg className="w-4 h-4 text-cinema-cream/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/abgupta"
                className="w-10 h-10 rounded-full border border-cinema-cream/10 flex items-center justify-center hover:border-cinema-gold/50 hover:bg-cinema-gold/10 transition-all duration-500 cursor-hover"
              >
                <svg className="w-4 h-4 text-cinema-cream/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema-gold/60 mb-8" style={{ fontFamily: "var(--font-body)" }}>
              [ Links ]
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-sm text-cinema-cream/25 hover:text-cinema-cream transition-colors duration-500 cursor-hover" style={{ fontFamily: "var(--font-body)" }}>
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm text-cinema-cream/25 hover:text-cinema-cream transition-colors duration-500 cursor-hover" style={{ fontFamily: "var(--font-body)" }}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sm text-cinema-cream/25 hover:text-cinema-cream transition-colors duration-500 cursor-hover" style={{ fontFamily: "var(--font-body)" }}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#join" className="text-sm text-cinema-cream/25 hover:text-cinema-cream transition-colors duration-500 cursor-hover" style={{ fontFamily: "var(--font-body)" }}>
                  Join
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema-gold/60 mb-8" style={{ fontFamily: "var(--font-body)" }}>
              [ Contact ]
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:mail@popoventures.com" className="text-sm text-cinema-cream/25 hover:text-cinema-cream transition-colors duration-500 cursor-hover" style={{ fontFamily: "var(--font-body)" }}>
                  mail@popoventures.com
                </a>
              </li>
              <li className="text-sm text-cinema-cream/25" style={{ fontFamily: "var(--font-body)" }}>
                080-47362227
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-cinema-cream/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
              [
            </span>
            <p className="text-[10px] text-cinema-cream/15 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
              © 2025 Zerzura Studio. All rights reserved.
            </p>
            <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
              ]
            </span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] text-cinema-cream/15 hover:text-cinema-cream/40 transition-colors duration-500 tracking-[0.2em] uppercase cursor-hover" style={{ fontFamily: "var(--font-body)" }}>
              Privacy
            </a>
            <a href="#" className="text-[10px] text-cinema-cream/15 hover:text-cinema-cream/40 transition-colors duration-500 tracking-[0.2em] uppercase cursor-hover" style={{ fontFamily: "var(--font-body)" }}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
