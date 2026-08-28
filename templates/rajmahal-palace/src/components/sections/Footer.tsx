"use client";

export default function Footer({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <footer
      id="footer-section"
      className="relative w-full min-h-screen flex flex-col justify-between items-center text-center px-8 pt-36 pb-14 overflow-hidden bg-[#160306] text-[#faf0ca] z-20 pointer-events-auto"
    >
      {/* Background Rotating Pattern Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-80 filter brightness-90 contrast-105"
        >
          <source src="/media/indian-pattern.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#160306] via-[#160306]/55 to-[#160306]/85" />
        <div className="absolute inset-0 jaali-pattern opacity-10" />
      </div>

      {/* Top Tag */}
      <div className="relative z-10 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#f5d061]">
          YOUR SANCTUARY AWAITS
        </span>
      </div>

      {/* Main Headline & Welcoming CTA */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto py-16">
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-[#f5d061] tracking-tight leading-none gold-glow">
          WE AWAIT YOUR
        </h2>
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-[#faf0ca] italic font-normal tracking-tight leading-none mt-2">
          ROYAL ARRIVAL.
        </h2>

        <p className="font-sans text-base text-[#faf0ca]/80 max-w-xl mx-auto mt-8 leading-relaxed font-light">
          Private palace stays arranged with deep personal care.
          Complimentary Rolls-Royce chauffeur transfers, private helipad landing, and 24-hour royal butler service.
        </p>

        <div className="mt-12">
          <button
            onClick={onOpenBooking}
            data-cursor="hover"
            data-cursor-label="WELCOME"
            className="px-12 py-5 bg-[#f5d061] text-[#160306] font-mono text-xs uppercase tracking-[0.35em] font-bold hover:bg-[#ffdf7a] transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(245,208,97,0.35)]"
          >
            Reserve Your Stay
          </button>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="relative z-10 w-full max-w-6xl mx-auto border-t border-[#f5d061]/20 pt-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-left font-mono text-[10px] uppercase tracking-[0.25em] text-[#faf0ca]/70">
        <div>
          <p className="text-[#f5d061] font-bold mb-3">LOCATION</p>
          <p className="text-[#faf0ca]/60 leading-relaxed font-sans text-xs">
            Raajmahal Palace Road, Amber Fort Estate, Jaipur, Rajasthan 302001
          </p>
        </div>

        <div>
          <p className="text-[#f5d061] font-bold mb-3">CONCIERGE</p>
          <p className="text-[#faf0ca]/60 font-sans text-xs">+91 141 238 9000</p>
          <p className="text-[#faf0ca]/60 font-sans text-xs">welcome@raajmahalpalace.com</p>
        </div>

        <div>
          <p className="text-[#f5d061] font-bold mb-3">PRIVATE AVIATION</p>
          <p className="text-[#faf0ca]/60 font-sans text-xs">Jaipur Airport (JAI) — 25 min</p>
          <p className="text-[#faf0ca]/60 font-sans text-xs">Palace Helipad On-Site</p>
        </div>

        <div>
          <p className="text-[#f5d061] font-bold mb-3">RECOGNITION</p>
          <p className="text-[#faf0ca]/60 font-sans text-xs">#1 Heritage Sanctuary 2026</p>
          <p className="text-[#faf0ca]/60 font-sans text-xs">Condé Nast Gold List</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-14 pt-6 border-t border-[#f5d061]/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#faf0ca]/40">
        <span>© 2026 RAAJMAHAL PALACE & RESORT · ALL RIGHTS RESERVED</span>
        <span>ROYAL HERITAGE SANCTUARY · JAIPUR</span>
      </div>
    </footer>
  );
}
