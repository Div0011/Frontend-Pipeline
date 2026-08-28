"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MuseumFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            end: "bottom 70%",
            scrub: false,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-24 md:py-32 px-[8vw] bg-[#0a0a0a] border-t-2 border-white/10 text-bone overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif font-light text-amber/[0.02] pointer-events-none select-none">
        Æ
      </div>

      <div className="max-w-content mx-auto relative z-10 space-y-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-10 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm border border-amber/50 bg-amber/10 flex items-center justify-center text-amber font-mono text-sm font-bold shadow-md">
              Æ
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-light tracking-wide uppercase">
                Aetheria Museum of Fine Art
              </h3>
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-amber">
                ARS LONGA, VITA BREVIS · ESTABLISHED NEW YORK 1924
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-amber/30 bg-amber/5">
            <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber font-semibold">
              ACCREDITED INSTITUTIONAL TRUST
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-amber font-semibold">
              Institutional Mandate
            </h4>
            <p className="font-body text-bone-dim leading-relaxed text-sm font-light">
              A private non-profit institution dedicated to the preservation, scholarship, and public presentation of masterworks of light, sculpture, and classical oil painting.
            </p>
            <div className="pt-2 font-mono text-[10px] uppercase tracking-widest text-amber/80">
              BOARD OF TRUSTEES & PATRON GUILD
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-amber font-semibold mb-4">
              Gallery Chambers
            </h4>
            <ul className="space-y-2 font-body text-bone-dim text-sm font-light">
              <li className="hover:text-amber transition-colors">
                <a href="#exhibition">Grand Gallery — West Wing</a>
              </li>
              <li className="hover:text-amber transition-colors">
                <a href="#collection">Classical Sanctuary & Rotunda</a>
              </li>
              <li className="hover:text-amber transition-colors">
                <a href="#collection">Modernist Corridor</a>
              </li>
              <li className="hover:text-amber transition-colors">
                <a href="#collection">Chamber VIII — Photography</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-amber font-semibold mb-4">
              Visitor Information
            </h4>
            <address className="font-body text-bone-dim not-italic text-sm space-y-1.5 font-light">
              <p>1247 Fifth Avenue</p>
              <p>New York, NY 10128</p>
              <p className="pt-2 text-xs font-mono text-amber">
                Tue – Sun: 10:00 – 18:00
              </p>
              <p className="text-xs font-mono text-amber">
                Thu Twilight: 10:00 – 21:00
              </p>
            </address>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-amber font-semibold">
              Curator Gazette Dispatch
            </h4>
            <p className="font-body text-bone-dim text-xs font-light leading-relaxed">
              Subscribe to receive private invitations to twilight chamber unveilings and quarterly art scholarship papers.
            </p>

            {subscribed ? (
              <p className="font-mono text-xs text-amber animate-[fadeIn_0.3s_ease-out]">
                ✓ Subscribed to the Curator&apos;s Gazette.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for dispatch..."
                  required
                  className="w-full bg-[#141413] border border-white/10 px-3.5 py-2.5 text-xs font-mono text-bone outline-none focus:border-amber rounded-sm placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber text-void font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-bone transition-colors rounded-sm shadow-md"
                >
                  Join Gazette Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-bone-dim">
          <p>© 1924–2024 Aetheria Museum of Fine Art. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-amber transition-colors">
              Trust Governance
            </a>
            <a href="#terms" className="hover:text-amber transition-colors">
              Terms of Access
            </a>
            <a href="#accessibility" className="hover:text-amber transition-colors">
              Accessibility Standard
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
