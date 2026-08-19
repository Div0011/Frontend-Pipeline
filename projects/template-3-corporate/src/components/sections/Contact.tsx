"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OFFICES = [
  { city: "New York", addr: "570 Lexington Ave, Suite 3400", phone: "+1 212 555 0190" },
  { city: "London", addr: "15 Berkeley Square, Mayfair", phone: "+44 20 7946 0912" },
  { city: "Zurich", addr: "Bahnhofstrasse 45, 8001", phone: "+41 44 215 8800" },
  { city: "Singapore", addr: "10 Collyer Quay, #28-01", phone: "+65 6732 1100" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.querySelectorAll(".c-reveal"), {
          opacity: 0,
          y: 28,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
      }

      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          y: 36,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 62%", once: true },
        });
      }

      if (officesRef.current) {
        gsap.from(officesRef.current.querySelectorAll(".office-row"), {
          opacity: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 65%", once: true },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-border focus:border-accent outline-none py-3 text-sm text-foreground placeholder:text-muted/60 font-light transition-colors";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-background overflow-hidden"
    >
      <div className="atmosphere-glow top-[10%] left-[-15%] bg-[#2e2820]" />
      <div className="absolute inset-0 bg-architectural-plane pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div ref={headerRef} className="mb-16 md:mb-20 max-w-3xl">
          <div className="c-reveal flex items-center gap-4 mb-7">
            <span className="chapter-rule" />
            <span className="chapter-label">05 — Inquiry</span>
          </div>
          <h2 className="c-reveal font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight leading-[0.95]">
            Institutional correspondence.
          </h2>
          <p className="c-reveal mt-6 text-muted-foreground font-light leading-relaxed max-w-lg">
            We welcome sovereign entities, institutional principals, and
            multi-family offices.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div ref={formRef} className="lg:col-span-7">
            {submitted ? (
              <div className="py-12 space-y-4">
                <div className="font-mono text-[10px] text-accent uppercase tracking-[0.35em]">
                  Transmitted
                </div>
                <h3 className="font-serif text-3xl font-semibold">
                  Your inquiry is with a managing director.
                </h3>
                <p className="text-sm text-muted-foreground font-light">
                  Expect a response within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-8"
              >
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted block mb-1">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@institution.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted block mb-1">
                    Classification
                  </label>
                  <select className={`${fieldClass} cursor-pointer`}>
                    <option className="bg-card">Asset Management</option>
                    <option className="bg-card">Sovereign Advisory</option>
                    <option className="bg-card">M&A / Family Office</option>
                    <option className="bg-card">Press Relations</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted block mb-1">
                    Mandate Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Outline your mandate…"
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="bg-accent hover:bg-metal text-background font-mono text-[11px] uppercase tracking-[0.28em] px-10 py-6 rounded-none font-semibold cursor-pointer"
                  data-cursor-hover
                >
                  Transmit Inquiry
                </Button>
              </form>
            )}
          </div>

          <div ref={officesRef} className="lg:col-span-5 space-y-0">
            <div className="office-row font-mono text-[9px] uppercase tracking-[0.35em] text-accent mb-8">
              Global Presence
            </div>
            {OFFICES.map((o) => (
              <div
                key={o.city}
                className="office-row py-5 border-t border-border/80 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
              >
                <div>
                  <div className="font-serif text-xl font-medium">{o.city}</div>
                  <p className="text-xs text-muted-foreground font-light mt-1">
                    {o.addr}
                  </p>
                </div>
                <div className="font-mono text-[10px] text-accent/80 tracking-wider">
                  {o.phone}
                </div>
              </div>
            ))}
            <div className="border-t border-border/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
