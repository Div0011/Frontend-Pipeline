"use client";

import { useState } from "react";
import { CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Developer Edge",
    monthlyPrice: 29,
    annualPrice: 22,
    description: "For individual engineers and emerging high-performance side projects.",
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
    description: "For scaling engineering teams requiring multi-region zero-latency mesh.",
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
    description: "For high-volume financial, AI, and mission-critical enterprise workloads.",
    cta: "Contact Infrastructure Team",
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

  return (
    <section id="pricing" className="py-32 bg-[#090a0f] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00f0ff] font-bold">
            TRANSPARENT VALUE // SCALING TIERS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight uppercase mt-3">
            Predictable Infrastructure Pricing.
          </h2>
          <p className="mt-4 text-base text-white/60 max-w-2xl mx-auto font-mono font-light">
            Zero surprise overage charges. Scale seamlessly across 284 points of presence.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-white/5 border border-white/10 rounded-full">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-widest transition-all rounded-full cursor-pointer ${
                !isAnnual ? "bg-[#00f0ff] text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-widest transition-all rounded-full flex items-center gap-2 cursor-pointer ${
                isAnnual ? "bg-[#00f0ff] text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              Annual Billing <span className="bg-[#7000ff] text-white px-2 py-0.5 text-[9px] rounded-full">SAVE 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`relative p-8 border transition-all duration-300 backdrop-blur-xl ${
                  plan.popular
                    ? "border-[#00f0ff] bg-gradient-to-b from-[#00f0ff]/10 via-[#7000ff]/10 to-transparent shadow-2xl shadow-[#00f0ff]/10 scale-[1.03]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00f0ff] text-black font-mono text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg">
                    RECOMMENDED STACK
                  </div>
                )}
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-2 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-mono text-5xl font-extrabold text-white">${price}</span>
                  <span className="font-mono text-xs text-white/50">/MONTH PER NODE</span>
                </div>
                <p className="text-xs text-white/60 font-mono font-light mb-8 leading-relaxed">
                  {plan.description}
                </p>
                <Button
                  className={`w-full mb-8 font-mono text-xs uppercase tracking-widest py-6 rounded-none font-bold transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-[#00f0ff] hover:bg-[#00d0df] text-black shadow-lg shadow-[#00f0ff]/20"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  {plan.cta} →
                </Button>
                <ul className="space-y-3 font-mono text-xs text-white/80">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#00f0ff] shrink-0" />
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

