"use client";

const CLIENTS = [
  "SYNTHETIX LABS",
  "APEX HARDWARE",
  "KINO AT WORK",
  "ZERZURA LUXURY",
  "NEXAFLOW SAAS",
  "LUSION ATELIER",
  "HYPERION AI",
];

export default function ClientsMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black/80 py-10 backdrop-blur-md">
      <div className="flex w-max animate-marquee space-x-12">
        {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
          <div
            key={i}
            className="flex items-center space-x-12 font-mono text-xl font-black uppercase tracking-widest text-white/40 transition-colors hover:text-[#d4ff00] md:text-3xl"
          >
            <span>{client}</span>
            <span className="text-xs text-[#d4ff00]">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
