"use client";

const METRICS = [
  { label: "COLD START (P50)", value: "0.43s", delta: "-12%" },
  { label: "GLOBAL CACHE HIT", value: "98.7%", delta: "+0.4%" },
  { label: "REQUESTS / MIN", value: "1.24M", delta: "+8.2%" },
  { label: "ERROR RATE", value: "0.001%", delta: "-0.0004%" },
];

export default function Testimonials() {
  return (
    <section id="observability" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
            Live telemetry
          </h2>
          <p className="mt-4 text-lg text-foreground/60 max-w-2xl mx-auto">
            Observability metrics from the edge mesh, updated in real time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="p-6 rounded-sm border border-foreground/5 bg-foreground/[0.01]"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="font-mono text-[10px] tracking-wider uppercase text-foreground/40 mb-3">
                {m.label}
              </div>
              <div className="font-mono text-3xl font-bold text-foreground tracking-tight">{m.value}</div>
              <div className="mt-2 font-mono text-xs text-primary">{m.delta} vs last hour</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
