"use client";

const CLIENTS = [
  "Synthetix Labs",
  "Apex Hardware",
  "Kino At Work",
  "Zerzura Luxury",
  "Nexaflow",
  "Lusion Atelier",
  "Hyperion AI",
];

export default function ClientsMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-8 md:py-10">
      <div className="flex w-max animate-marquee items-center">
        {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
          <div
            key={`${client}-${i}`}
            className="flex items-center gap-10 px-5 font-display text-2xl font-bold tracking-tight text-white/25 transition-colors duration-300 hover:text-[#d4ff00] md:gap-14 md:text-4xl"
          >
            <span>{client}</span>
            <span className="h-px w-8 bg-[#d4ff00]/40 md:w-12" aria-hidden />
          </div>
        ))}
      </div>
    </section>
  );
}
