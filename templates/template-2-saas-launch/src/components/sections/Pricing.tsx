"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCinematicReveal } from "@/lib/motion";

const PLANS = [
  {
    name: "Developer Edge",
    monthlyPrice: 29,
    annualPrice: 22,
    description: "For individual engineers and high-performance side projects.",
    cta: "Deploy Free Node",
    features: [
      "5 Active Edge Projects",
      "50 GB Edge Cache Storage",
      "Real-Time Log Telemetry",
      "Community Discord Support",
      "Sub-Millisecond Cold Starts",
    ],
  },
  {
    name: "Enterprise Mesh",
    monthlyPrice: 99,
    annualPrice: 79,
    description: "For teams that need multi-region zero-latency mesh.",
    cta: "Start 14-Day Trial",
    popular: true,
    features: [
      "Unlimited Edge Projects",
      "1 TB Global Cache Storage",
      "Advanced Anomaly Telemetry",
      "Dedicated 24/7 Slack Channel",
      "SOC 2 Type II Compliance",
      "Automated Failover Routing",
      "Custom SSL & Edge Firewall",
    ],
  },
  {
    name: "Sovereign Cloud",
    monthlyPrice: 299,
    annualPrice: 239,
    description: "For financial, AI, and mission-critical enterprise workloads.",
    cta: "Contact Infrastructure",
    features: [
      "Dedicated Private Edge Cluster",
      "Unlimited Global Cache",
      "Custom SLA (99.999%)",
      "Dedicated Solutions Architect",
      "On-Premise Hybrid Connectors",
      "Zero-Trust IAM Integration",
    ],
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useCinematicReveal(headerRef, { y: 36, duration: 1 });
  useCinematicReveal(gridRef, {
    childSelector: "[data-plan]",
    y: 56,
    stagger: 0.14,
    start: "top 85%",
  });

  return (
    <section id="pricing" className="relative py-28 md:py-36 bg-background text-foreground border-t border-border overflow-hidden">
      <div className="absolute inset-0 atmosphere opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="max-w-2xl mb-14 md:mb-16 opacity-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-3 leading-[1.05]">
            Predictable infrastructure cost.
          </h2>
          <p className="mt-4 text-base text-foreground/50 max-w-xl font-light leading-relaxed">
            No surprise overages. Scale across 284 points of presence on a clear contract.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 p-1 border border-border bg-secondary/60">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer ${
                !isAnnual
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/45 hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer flex items-center gap-2 ${
                isAnnual
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/45 hover:text-foreground"
              }`}
            >
              Annual
              <span
                className={`px-1.5 py-0.5 text-[9px] tracking-wider ${
                  isAnnual ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary/15 text-primary"
                }`}
              >
                −20%
              </span>
            </button>
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                data-plan
                className={`relative flex flex-col p-7 md:p-8 border transition-colors duration-300 opacity-0 ${
                  plan.popular
                    ? "border-primary/40 bg-primary/[0.04]"
                    : "border-border bg-card/40 hover:border-foreground/15"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-7 px-3 py-1 bg-primary text-primary-foreground font-mono text-[9px] font-medium tracking-[0.2em] uppercase">
                    Recommended
                  </div>
                )}

                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-4">
                  {plan.name}
                </div>

                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="font-display text-5xl font-bold tracking-tight text-foreground">
                    ${price}
                  </span>
                  <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                    /mo per node
                  </span>
                </div>

                <p className="text-sm text-foreground/50 font-light mb-8 leading-relaxed">
                  {plan.description}
                </p>

                <Button
                  className={`w-full mb-8 font-mono text-[10px] uppercase tracking-[0.18em] h-11 rounded-none ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-foreground/[0.06] hover:bg-foreground/[0.1] text-foreground border border-border"
                  }`}
                >
                  {plan.cta}
                </Button>

                <ul className="mt-auto space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 font-mono text-[11px] text-foreground/65 leading-snug"
                    >
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
