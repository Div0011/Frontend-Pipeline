"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Join() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".join-item");
      if (items && items.length) {
        gsap.fromTo(
          items,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="join" ref={sectionRef} className="relative py-32 md:py-48 px-6 bg-cinema-black text-cinema-cream overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(201, 169, 110, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 110, 0.2) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cinema-gold/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-cinema-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <div className="flex items-center gap-3 mb-6 join-item">
              <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
                [
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-cinema-gold/80" style={{ fontFamily: "var(--font-body)" }}>
                Join
              </span>
              <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
                ]
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl font-bold leading-[0.85] mb-8 join-item"
              style={{ fontFamily: "var(--font-display)" }}
            >
              JOIN OUR<br />
              <span className="text-cinema-gold">COMMUNITY</span><br />
              OF WISHGRANTERS
            </h2>

            <p className="text-sm text-cinema-cream/30 max-w-md leading-relaxed mb-10 join-item" style={{ fontFamily: "var(--font-body)" }}>
              Enter your email to stay updated on our latest projects, opportunities, and community events.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 join-item" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@gmail.com"
                required
                className="flex-1 px-6 py-4 rounded-full border-2 border-cinema-cream/[0.08] bg-cinema-dark focus:border-cinema-gold/50 focus:outline-none transition-all duration-300 text-sm placeholder:text-cinema-cream/20"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button
                type="submit"
                className="rounded-full bg-cinema-gold px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-cinema-black transition-all duration-500 hover:bg-cinema-gold-light hover:scale-105 cursor-hover"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Join
              </button>
            </form>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6 join-item">
              <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
                [
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-cinema-gold/80" style={{ fontFamily: "var(--font-body)" }}>
                Collaborate
              </span>
              <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
                ]
              </span>
            </div>

            <h3
              className="text-3xl md:text-4xl font-bold leading-[0.9] mb-8 join-item"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WANT TO<br />
              <span className="text-cinema-gold">COLLABORATE?</span>
            </h3>

            <form className="space-y-4 join-item" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-6 py-4 rounded-full border-2 border-cinema-cream/[0.08] bg-cinema-dark focus:border-cinema-gold/50 focus:outline-none transition-all duration-300 text-sm placeholder:text-cinema-cream/20"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-6 py-4 rounded-full border-2 border-cinema-cream/[0.08] bg-cinema-dark focus:border-cinema-gold/50 focus:outline-none transition-all duration-300 text-sm placeholder:text-cinema-cream/20"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
              <input
                type="email"
                placeholder="Email *"
                required
                className="w-full px-6 py-4 rounded-full border-2 border-cinema-cream/[0.08] bg-cinema-dark focus:border-cinema-gold/50 focus:outline-none transition-all duration-300 text-sm placeholder:text-cinema-cream/20"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <textarea
                placeholder="Write a message"
                rows={4}
                className="w-full px-6 py-4 rounded-2xl border-2 border-cinema-cream/[0.08] bg-cinema-dark focus:border-cinema-gold/50 focus:outline-none transition-all duration-300 text-sm resize-none placeholder:text-cinema-cream/20"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button
                type="submit"
                className="rounded-full bg-cinema-gold px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-cinema-black transition-all duration-500 hover:bg-cinema-gold-light hover:scale-105 cursor-hover"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
