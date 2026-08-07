"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OFFICES = [
  { city: "NEW YORK", addr: "570 Lexington Ave, Suite 3400", phone: "+1 212 555 0190" },
  { city: "LONDON", addr: "15 Berkeley Square, Mayfair", phone: "+44 20 7946 0912" },
  { city: "ZURICH", addr: "Bahnhofstrasse 45, 8001 Zürich", phone: "+41 44 215 8800" },
  { city: "SINGAPORE", addr: "10 Collyer Quay, #28-01", phone: "+65 6732 1100" },
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
      // Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.querySelectorAll("span, h2, p"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
      }

      // Form card reveal
      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          x: -40,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 60%", once: true },
        });
      }

      // Offices reveal
      if (officesRef.current) {
        gsap.from(officesRef.current.querySelectorAll(".office-card"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 65%", once: true },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 bg-[#fafaf9] bg-magazine-grid text-[#1a1a1a] border-t border-[#e7e5e4] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#e7e5e4] pb-8">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#c9a96e] uppercase font-bold">
              CORRESPONDENCE // CHAPTER 05
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#1a1a1a] font-extrabold uppercase mt-2">
              Institutional Inquiry.
            </h2>
          </div>
          <p className="text-sm text-[#78716c] font-sans font-light max-w-md leading-relaxed">
            We welcome correspondence from sovereign entities, institutional principals, and multi-family offices.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Interactive Editorial Inquiry Form */}
          <div ref={formRef} className="lg:col-span-7 bg-white border border-[#e7e5e4] p-8 sm:p-12 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-2 uppercase">
              Submit Inquiry
            </h3>
            <p className="text-xs text-[#78716c] font-mono uppercase tracking-wider mb-8">
              ALL CORRESPONDENCE HELD UNDER STRICT FIDUCIARY CONFIDENTIALITY
            </p>

            {submitted ? (
              <div className="p-8 bg-[#fafaf9] border border-[#c9a96e] text-center space-y-3">
                <div className="font-mono text-xs text-[#c9a96e] uppercase font-bold tracking-widest">
                  ✓ CORRESPONDENCE TRANSMITTED
                </div>
                <h4 className="font-serif text-xl text-[#1a1a1a] font-bold">
                  Thank you for contacting Apex Group.
                </h4>
                <p className="text-xs text-[#57534e]">
                  A senior managing director will review your inquiry and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase font-bold text-[#78716c]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Charles Sterling"
                      className="w-full border border-[#e7e5e4] p-3 text-sm focus:border-[#c9a96e] outline-none font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase font-bold text-[#78716c]">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="c.sterling@capital.com"
                      className="w-full border border-[#e7e5e4] p-3 text-sm focus:border-[#c9a96e] outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase font-bold text-[#78716c]">
                    Inquiry Classification *
                  </label>
                  <select className="w-full border border-[#e7e5e4] p-3 text-sm focus:border-[#c9a96e] outline-none font-sans bg-white">
                    <option>Institutional Asset Management</option>
                    <option>Sovereign Wealth Advisory</option>
                    <option>Strategic M&A & Family Office</option>
                    <option>Press & Media Relations</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase font-bold text-[#78716c]">
                    Correspondence Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Outline your mandate or inquiry details..."
                    className="w-full border border-[#e7e5e4] p-3 text-sm focus:border-[#c9a96e] outline-none font-sans resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#c9a96e] hover:bg-[#b8985d] text-black font-mono text-xs uppercase tracking-widest py-6 rounded-none font-bold transition-all shadow-md cursor-pointer"
                >
                  Transmit Fiduciary Inquiry →
                </Button>
              </form>
            )}
          </div>

          {/* Right: Global Office Directory */}
          <div ref={officesRef} className="lg:col-span-5 space-y-6">
            <div className="bg-[#0c0c0e] text-white p-8 border border-[#c9a96e]/30 shadow-xl office-card">
              <span className="font-mono text-[10px] text-[#c9a96e] uppercase tracking-widest font-bold">
                GLOBAL HEADQUARTERS
              </span>
              <h4 className="font-serif text-2xl font-bold uppercase mt-2 mb-4">
                New York Executive Office
              </h4>
              <p className="text-xs text-white/70 font-sans font-light leading-relaxed mb-6">
                Apex Group House, 570 Lexington Avenue, 34th Floor, New York, NY 10022.
              </p>
              <div className="font-mono text-xs text-[#c9a96e]">
                PHONE: +1 (212) 555-0190
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OFFICES.slice(1).map((o) => (
                <div
                  key={o.city}
                  className="bg-white p-5 border border-[#e7e5e4] transition-all hover:border-[#c9a96e] office-card"
                >
                  <div className="font-mono text-xs font-bold text-[#1a1a1a] uppercase mb-1">
                    {o.city}
                  </div>
                  <p className="text-[11px] text-[#78716c] font-light leading-tight">
                    {o.addr}
                  </p>
                  <div className="mt-3 font-mono text-[10px] text-[#c9a96e]">
                    {o.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

