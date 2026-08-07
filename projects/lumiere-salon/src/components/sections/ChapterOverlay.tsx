"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisScrollRef } from "../LenisProvider";

gsap.registerPlugin(ScrollTrigger);

// ─── Booking Modal ─────────────────────────────────────────────────────────────
function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "done">("form");
  const [service, setService] = useState("Lumière Balayage");
  const [stylist, setStylist] = useState("Antoine Lumière");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const confirmCode = useRef(`LUM-${Math.floor(100000 + Math.random() * 900000)}`);

  const services = ["Precision Cut", "Lumière Balayage", "Color Correction", "Silk Extensions", "Gold Keratin"];
  const stylists = ["Antoine Lumière", "Elena Rostova", "Kenji Takahashi"];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-lg p-6"
        onClick={(e: React.MouseEvent) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/10 p-10"
        >
          {/* Corner ornaments */}
          <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4a574]/50" />
          <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d4a574]/50" />
          <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#d4a574]/50" />
          <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4a574]/50" />

          <button onClick={onClose} className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>

          {step === "form" ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep("done"); }} className="space-y-7">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4a574] mb-1">Private Reservation</p>
                <h3 className="font-display text-3xl text-white">Reserve Your<br /><em>Experience</em></h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Experience", value: service, setter: setService, options: services },
                  { label: "Master Stylist", value: stylist, setter: setStylist, options: stylists },
                ].map(({ label, value, setter, options }) => (
                  <div key={label}>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1.5">{label}</label>
                    <select
                      value={value}
                      onChange={e => setter(e.target.value)}
                      className="w-full bg-transparent border-b border-white/15 py-2 text-sm font-sans text-white focus:border-[#d4a574] focus:outline-none appearance-none cursor-pointer"
                    >
                      {options.map(o => <option key={o} value={o} className="bg-[#0e0e0e]">{o}</option>)}
                    </select>
                  </div>
                ))}
                {[
                  { label: "Full Name", type: "text", value: name, setter: setName, placeholder: "Your name" },
                  { label: "Email", type: "email", value: email, setter: setEmail, placeholder: "your@email.com" },
                  { label: "Preferred Date", type: "date", value: date, setter: setDate, placeholder: "" },
                ].map(({ label, type, value, setter, placeholder }) => (
                  <div key={label}>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1.5">{label}</label>
                    <input
                      required type={type} value={value} onChange={e => setter(e.target.value)}
                      placeholder={placeholder}
                      className="w-full bg-transparent border-b border-white/15 py-2 text-sm font-sans text-white focus:border-[#d4a574] focus:outline-none placeholder:text-white/20"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                data-cursor="hover"
                data-cursor-label="CONFIRM"
                className="w-full py-3.5 border border-[#d4a574]/60 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0a0a0a] transition-all duration-500 cursor-pointer"
              >
                Confirm Reservation
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-5">
              <CheckCircle className="w-10 h-10 text-[#d4a574] mx-auto" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4a574] mb-2">Confirmed</p>
                <h3 className="font-display text-3xl text-white">Welcome, <em>{name || "Guest"}</em></h3>
              </div>
              <p className="font-sans text-sm text-white/50 leading-relaxed max-w-xs mx-auto">
                {service} with {stylist}. We will reach out to confirm your appointment at {email}.
              </p>
              <p className="font-mono text-[11px] text-[#d4a574] tracking-widest">{confirmCode.current}</p>
              <button onClick={onClose} className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer mt-2">
                Return to Lumière →
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Line reveal utility ────────────────────────────────────────────────────────
// Wraps each line in a clip container so lines mask-reveal from bottom
function splitLines(el: HTMLElement): HTMLElement[] {
  const text = el.innerHTML;
  // Wrap each sentence/phrase in a line container for mask reveal
  const lines = text.split("<br>").map(line => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    wrapper.style.display = "block";
    const inner = document.createElement("div");
    inner.innerHTML = line;
    wrapper.appendChild(inner);
    return { wrapper, inner };
  });

  el.innerHTML = "";
  const inners: HTMLElement[] = [];
  lines.forEach(({ wrapper, inner }) => {
    el.appendChild(wrapper);
    inners.push(inner);
  });
  return inners;
}

// ─── Chapter data ──────────────────────────────────────────────────────────────
const SERVICES = [
  { name: "Precision Cut", desc: "Architectural sculpting to illuminate structure", duration: "90 min", price: "$220" },
  { name: "Sun-Kissed Balayage", desc: "Hand-painted dimensional colour — golden hour, captured", duration: "3.5 hrs", price: "$520" },
  { name: "Colour Correction", desc: "Complex transformation by master colourists", duration: "5 hrs", price: "$650" },
  { name: "Silk Extensions", desc: "Seamless volumisation with ethically sourced hair", duration: "3 hrs", price: "$850" },
  { name: "Gold Keratin Elixir", desc: "Restorative smoothing with 24k gold complex", duration: "2 hrs", price: "$380" },
];

const STYLISTS = [
  { name: "Antoine Lumière", role: "Creative Director", city: "Paris" },
  { name: "Elena Rostova", role: "Head Colour Director", city: "London" },
  { name: "Kenji Takahashi", role: "Texture Specialist", city: "Tokyo" },
];

// ─── Main component ─────────────────────────────────────────────────────────────
export default function ChapterOverlay() {
  const [bookingOpen, setBookingOpen] = useState(false);

  // Refs for scroll-animated elements
  const ch1Ref = useRef<HTMLElement>(null);
  const ch2Ref = useRef<HTMLElement>(null);
  const ch3Ref = useRef<HTMLElement>(null);
  const ch4Ref = useRef<HTMLElement>(null);
  const ch5Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── CHAPTER 1: Hero — large word-by-word reveal ─────────────────────────
      if (ch1Ref.current) {
        const heroLines = ch1Ref.current.querySelectorAll<HTMLElement>(".reveal-line");
        const heroDivider = ch1Ref.current.querySelector<HTMLElement>(".h-divider");
        const heroSub = ch1Ref.current.querySelector<HTMLElement>(".hero-sub");
        const heroLocation = ch1Ref.current.querySelector<HTMLElement>(".hero-location");
        const heroScroll = ch1Ref.current.querySelector<HTMLElement>(".hero-scroll-hint");

        // Lines reveal from bottom of clip (no word-merge bug)
        gsap.set(heroLines, { yPercent: 110 });
        gsap.to(heroLines, {
          yPercent: 0,
          stagger: 0.2,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.2,
        });
        if (heroDivider) gsap.fromTo(heroDivider, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out", delay: 0.8 });
        if (heroSub) gsap.fromTo(heroSub, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.0 });
        if (heroLocation) gsap.fromTo(heroLocation, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.4 });
        if (heroScroll) gsap.fromTo(heroScroll, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.8 });
      }

      // ── CHAPTER 2: Consultation — stagger lines + stylist names ────────────
      if (ch2Ref.current) {
        const lines = ch2Ref.current.querySelectorAll<HTMLElement>(".reveal-line");
        const divider = ch2Ref.current.querySelector<HTMLElement>(".h-divider");
        const stylistItems = ch2Ref.current.querySelectorAll<HTMLElement>(".stylist-row");

        if (divider) {
          gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(divider, {
            scaleX: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: ch2Ref.current, start: "top 70%", toggleActions: "play none none reverse" },
          });
        }
        gsap.set(lines, { yPercent: 110 });
        gsap.to(lines, {
          yPercent: 0, stagger: 0.15, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ch2Ref.current, start: "top 65%", toggleActions: "play none none reverse" },
        });
        gsap.set(stylistItems, { opacity: 0, x: -24 });
        gsap.to(stylistItems, {
          opacity: 1, x: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ch2Ref.current, start: "top 50%", toggleActions: "play none none reverse" },
        });
      }

      // ── CHAPTER 3: Services — line-item slide-ins ──────────────────────────
      if (ch3Ref.current) {
        const lines = ch3Ref.current.querySelectorAll<HTMLElement>(".reveal-line");
        const serviceRows = ch3Ref.current.querySelectorAll<HTMLElement>(".service-row");
        const serviceLines = ch3Ref.current.querySelectorAll<HTMLElement>(".service-line");

        gsap.set(lines, { yPercent: 110 });
        gsap.to(lines, {
          yPercent: 0, stagger: 0.15, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ch3Ref.current, start: "top 70%", toggleActions: "play none none reverse" },
        });
        // Service lines draw in from left
        gsap.set(serviceLines, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(serviceRows, { opacity: 0, y: 20 });
        gsap.to(serviceLines, {
          scaleX: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ch3Ref.current, start: "top 55%", toggleActions: "play none none reverse" },
        });
        gsap.to(serviceRows, {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ch3Ref.current, start: "top 55%", toggleActions: "play none none reverse" },
        });
      }

      // ── CHAPTER 4: Reveal — quote word-by-word + stats count ──────────────
      if (ch4Ref.current) {
        const lines = ch4Ref.current.querySelectorAll<HTMLElement>(".reveal-line");
        const stats = ch4Ref.current.querySelectorAll<HTMLElement>(".stat-number");
        const statLabels = ch4Ref.current.querySelectorAll<HTMLElement>(".stat-label");

        gsap.set(lines, { yPercent: 110 });
        gsap.to(lines, {
          yPercent: 0, stagger: 0.2, duration: 1.4, ease: "power4.out",
          scrollTrigger: { trigger: ch4Ref.current, start: "top 65%", toggleActions: "play none none reverse" },
        });
        gsap.set(stats, { opacity: 0, y: 30 });
        gsap.set(statLabels, { opacity: 0 });
        gsap.to(stats, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ch4Ref.current, start: "top 50%", toggleActions: "play none none reverse" },
        });
        gsap.to(statLabels, {
          opacity: 1, stagger: 0.1, duration: 0.6,
          scrollTrigger: { trigger: ch4Ref.current, start: "top 45%", toggleActions: "play none none reverse" },
        });
      }

      // ── CHAPTER 5: Departure — reserve reveal ─────────────────────────────
      if (ch5Ref.current) {
        const lines = ch5Ref.current.querySelectorAll<HTMLElement>(".reveal-line");
        const cta = ch5Ref.current.querySelector<HTMLElement>(".cta-reserve");
        const footer = ch5Ref.current.querySelector<HTMLElement>(".ch5-footer");

        gsap.set(lines, { yPercent: 110 });
        gsap.to(lines, {
          yPercent: 0, stagger: 0.2, duration: 1.4, ease: "power4.out",
          scrollTrigger: { trigger: ch5Ref.current, start: "top 65%", toggleActions: "play none none reverse" },
        });
        if (cta) {
          gsap.set(cta, { opacity: 0, y: 20 });
          gsap.to(cta, {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ch5Ref.current, start: "top 50%", toggleActions: "play none none reverse" },
          });
        }
        if (footer) {
          gsap.set(footer, { opacity: 0 });
          gsap.to(footer, {
            opacity: 1, duration: 1,
            scrollTrigger: { trigger: ch5Ref.current, start: "top 35%", toggleActions: "play none none reverse" },
          });
        }
      }

      // ── BACKGROUND COLOR MORPH per chapter ───────────────────────────────
      const COLORS = ["#0a0a0a", "#100d08", "#0a0c10", "#080f08", "#0a0a0a"];
      [ch1Ref, ch2Ref, ch3Ref, ch4Ref, ch5Ref].forEach((ref, i) => {
        if (!ref.current) return;
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => gsap.to(document.documentElement, { "--bg-color": COLORS[i], duration: 1.5, ease: "power2.inOut", overwrite: true }),
          onEnterBack: () => gsap.to(document.documentElement, { "--bg-color": COLORS[i], duration: 1.5, ease: "power2.inOut", overwrite: true }),
        });
      });

    });

    return () => ctx.revert();
  }, []);

  // Shared line-clip wrapper (prevents word-merge GSAP issue)
  const Line = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className="overflow-hidden leading-none">
      <div className={`reveal-line ${className}`}>{children}</div>
    </div>
  );

  return (
    <div className="relative z-20 w-full">

      {/* ─── CHAPTER 1 — ARRIVAL ─────────────────────────────────────────── */}
      <section
        ref={ch1Ref}
        id="chapter-1"
        className="relative min-h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 py-16"
      >
        {/* Top rule + label */}
        <div className="flex items-center gap-6 pt-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4a574]/70">01 — Arrival</span>
          <div className="h-divider flex-1 h-px bg-[#d4a574]/20 origin-left" />
        </div>

        {/* Main title — massive, left-aligned */}
        <div className="mt-auto mb-8">
          <div className="mb-6">
            <Line className="font-display text-[clamp(4.5rem,13vw,11rem)] text-white tracking-tight leading-none">
              Enter
            </Line>
            <Line className="font-display text-[clamp(4.5rem,13vw,11rem)] text-[#d4a574] italic tracking-tight leading-none">
              the Light.
            </Line>
          </div>

          <div className="overflow-hidden">
            <p className="hero-sub font-sans text-sm text-white/40 tracking-widest uppercase font-light max-w-xs leading-relaxed">
              An ultra-luxury atelier where transformation begins with listening.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div className="overflow-hidden">
            <p className="hero-location font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              Paris · Tokyo · New York
            </p>
          </div>
          <div className="overflow-hidden text-right">
            <p className="hero-scroll-hint font-mono text-[10px] uppercase tracking-[0.25em] text-white/20 flex items-center gap-3">
              Scroll to begin
              <span className="inline-block w-8 h-px bg-white/20" />
            </p>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE DIVIDER ─────────────────────────────────────────────── */}
      <MarqueeDivider text="ARRIVAL · CONSULTATION · THE CRAFT · REVEAL · DEPARTURE · LUMIÈRE ·" />

      {/* ─── CHAPTER 2 — CONSULTATION ────────────────────────────────────── */}
      <section
        ref={ch2Ref}
        id="chapter-2"
        className="relative min-h-screen flex flex-col px-8 md:px-16 lg:px-24 py-24"
      >
        {/* Chapter label */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">02</span>
          <div className="h-divider flex-1 h-px bg-white/10 origin-left" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">Consultation</span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 flex-1">
          {/* Left — headline */}
          <div className="flex flex-col justify-center">
            <Line className="font-display text-[clamp(3rem,7vw,6rem)] text-white tracking-tight leading-tight">
              We listen
            </Line>
            <Line className="font-display text-[clamp(3rem,7vw,6rem)] text-white/30 italic tracking-tight leading-tight">
              before we
            </Line>
            <Line className="font-display text-[clamp(3rem,7vw,6rem)] text-white tracking-tight leading-tight">
              create.
            </Line>
          </div>

          {/* Right — stylist list */}
          <div className="flex flex-col justify-center gap-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8">Master Artisans</p>
            {STYLISTS.map((s, i) => (
              <div key={s.name}>
                <div className="stylist-row flex items-start justify-between py-6 group cursor-default">
                  <div>
                    <p className="font-display text-xl text-white group-hover:text-[#d4a574] transition-colors duration-500">{s.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-1">{s.role}</p>
                  </div>
                  <span className="font-mono text-[10px] text-white/20 pt-1">{s.city}</span>
                </div>
                {i < STYLISTS.length - 1 && <div className="h-px bg-white/8" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARQUEE DIVIDER ─────────────────────────────────────────────── */}
      <MarqueeDivider text="THE CRAFT · COUTURE SERVICES · HAND-CRAFTED · SINGULAR VISION · LUMIÈRE ·" reverse />

      {/* ─── CHAPTER 3 — THE CRAFT / SERVICES ───────────────────────────── */}
      <section
        ref={ch3Ref}
        id="chapter-3"
        className="relative min-h-screen flex flex-col px-8 md:px-16 lg:px-24 py-24"
      >
        {/* Chapter label */}
        <div className="flex items-center gap-6 mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">03</span>
          <div className="h-divider flex-1 h-px bg-white/10 origin-left" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">The Craft</span>
        </div>

        {/* Headline */}
        <div className="mb-16">
          <Line className="font-display text-[clamp(3rem,7vw,6rem)] text-white tracking-tight leading-tight">
            Where art meets
          </Line>
          <Line className="font-display text-[clamp(3rem,7vw,6rem)] text-[#d4a574] italic tracking-tight leading-tight">
            science.
          </Line>
        </div>

        {/* Service table — editorial price list */}
        <div className="flex-1">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 pb-4">
            {["Service", "Description", "Duration", "From"].map(h => (
              <p key={h} className="font-mono text-[9px] uppercase tracking-widest text-white/25 col-span-3">{h}</p>
            ))}
          </div>

          {SERVICES.map((svc, i) => (
            <div key={svc.name}>
              <div className="service-line h-px bg-white/10" />
              <div className="service-row grid grid-cols-12 gap-4 py-6 group hover:bg-white/[0.02] transition-colors duration-300 -mx-4 px-4">
                <div className="col-span-3">
                  <p className="font-display text-lg text-white group-hover:text-[#d4a574] transition-colors duration-500 leading-tight">{svc.name}</p>
                </div>
                <div className="col-span-4">
                  <p className="font-sans text-sm text-white/40 leading-relaxed">{svc.desc}</p>
                </div>
                <div className="col-span-2 flex items-start pt-0.5">
                  <p className="font-mono text-[11px] text-white/30">{svc.duration}</p>
                </div>
                <div className="col-span-3 flex items-start justify-end pt-0.5">
                  <p className="font-display text-xl text-[#d4a574]">{svc.price}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="service-line h-px bg-white/10" />
        </div>

        <p className="font-mono text-[10px] text-white/20 tracking-widest mt-8 uppercase">
          All appointments begin with a 30-minute private consultation.
        </p>
      </section>

      {/* ─── MARQUEE DIVIDER ─────────────────────────────────────────────── */}
      <MarqueeDivider text="THE MIRROR MOMENT · SEE YOURSELF ANEW · TRANSFORMATION · REVEAL · LUMIÈRE ·" />

      {/* ─── CHAPTER 4 — REVEAL ──────────────────────────────────────────── */}
      <section
        ref={ch4Ref}
        id="chapter-4"
        className="relative min-h-screen flex flex-col px-8 md:px-16 lg:px-24 py-24"
      >
        {/* Chapter label */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">04</span>
          <div className="h-divider flex-1 h-px bg-white/10 origin-left" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">The Reveal</span>
        </div>

        {/* Pull quote — centred, big */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4a574]/60 mb-10">In Their Words</p>
          <Line className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-tight tracking-tight">
            &ldquo;Every strand
          </Line>
          <Line className="font-display text-[clamp(2rem,5vw,4rem)] text-[#d4a574] italic leading-tight tracking-tight">
            tells a story.&rdquo;
          </Line>
          <Line className="font-display text-[clamp(2rem,5vw,4rem)] text-white/40 leading-tight tracking-tight">
            Every transformation,
          </Line>
          <Line className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-tight tracking-tight">
            a rebirth.
          </Line>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-16 border-t border-white/8">
          {[
            { value: "2,000+", label: "Transformations annually" },
            { value: "98%", label: "Client satisfaction" },
            { value: "15+", label: "Years of mastery" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="stat-number font-display text-[clamp(2rem,4vw,3.5rem)] text-[#d4a574] leading-none">{value}</p>
              <p className="stat-label font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mt-3">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MARQUEE DIVIDER ─────────────────────────────────────────────── */}
      <MarqueeDivider text="CARRY THE LIGHT · THE DEPARTURE · YOUR NEW BEGINNING · LUMIÈRE · BOOK NOW ·" reverse />

      {/* ─── CHAPTER 5 — DEPARTURE / RESERVATION ────────────────────────── */}
      <section
        ref={ch5Ref}
        id="chapter-5"
        className="relative min-h-screen flex flex-col px-8 md:px-16 lg:px-24 py-24"
      >
        {/* Chapter label */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">05</span>
          <div className="h-divider flex-1 h-px bg-white/10 origin-left" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">The Departure</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Massive reservation headline */}
          <div className="mb-12">
            <Line className="font-display text-[clamp(3.5rem,10vw,9rem)] text-white tracking-tight leading-none">
              Reserve
            </Line>
            <Line className="font-display text-[clamp(3.5rem,10vw,9rem)] text-[#d4a574] italic tracking-tight leading-none">
              your light.
            </Line>
          </div>

          {/* CTA */}
          <div className="cta-reserve">
            <button
              onClick={() => setBookingOpen(true)}
              data-cursor="hover"
              data-cursor-label="BOOK"
              className="group flex items-center gap-6 cursor-pointer"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 group-hover:text-[#d4a574] transition-colors duration-500">
                Private consultation
              </span>
              <span className="flex items-center gap-3">
                <span className="w-12 h-px bg-white/30 group-hover:bg-[#d4a574] group-hover:w-20 transition-all duration-500" />
                <span className="font-mono text-[11px] text-white/30 group-hover:text-[#d4a574] transition-colors duration-500">→</span>
              </span>
            </button>
            <div className="mt-6 h-px w-full bg-white/8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574]/0 via-[#d4a574]/40 to-[#d4a574]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="ch5-footer grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/8">
          {[
            { city: "Paris", address: "12 Rue du Faubourg Saint-Honoré, 75008", hours: "Tue–Sat 10:00–19:00" },
            { city: "New York", address: "432 Park Avenue South, NY 10016", hours: "Mon–Sat 09:00–20:00" },
            { city: "Tokyo", address: "3-6-8 Kita-Aoyama, Minato-ku 107-0061", hours: "Tue–Sun 11:00–20:00" },
          ].map(loc => (
            <div key={loc.city}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4a574]/60 mb-3">{loc.city}</p>
              <p className="font-sans text-xs text-white/30 leading-relaxed mb-1">{loc.address}</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">{loc.hours}</p>
            </div>
          ))}
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

// ─── Marquee Divider ──────────────────────────────────────────────────────────
function MarqueeDivider({ text, reverse = false }: { text: string; reverse?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/6">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marquee${reverse ? "Reverse" : ""} 25s linear infinite` }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/20 px-8">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
