"use client";

export default function Footer() {
  return (
    <footer className="relative z-30 bg-[#080808] border-t border-white/6 text-white py-12 px-8 md:px-16 lg:px-24 pointer-events-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
        {/* Wordmark */}
        <div>
          <p className="font-display text-2xl tracking-[0.35em] text-white mb-1">LUMIÈRE</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">Est. 2009 · Paris</p>
        </div>
        {/* Links */}
        <div className="flex gap-10 font-mono text-[10px] uppercase tracking-widest text-white/30">
          {["Privacy", "Press", "Careers", "Contact"].map(l => (
            <a key={l} href="#" className="hover:text-white/70 transition-colors duration-300">{l}</a>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-white/6 font-mono text-[9px] uppercase tracking-widest text-white/20">
        <span>© 2026 Lumière Salon</span>
        <span>Paris · New York · Tokyo</span>
      </div>
    </footer>
  );
}
