"use client";

import { useState, useEffect, useRef } from "react";
import CustomCursor from "../ui/CustomCursor";

export default function MuseumNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundscapePlaying, setSoundscapePlaying] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ["exhibition", "collection", "visit"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 320 && rect.bottom >= 320;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  const toggleSoundscape = () => {
    if (soundscapePlaying) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 500);
      }
      setSoundscapePlaying(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);
        gainRef.current = gain;

        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(82.41, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(220, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;

        setSoundscapePlaying(true);
      } catch (err) {
        console.error("Audio Context failed:", err);
      }
    }
  };

  const navItems = [
    { num: "I", label: "Chambers", href: "#exhibition", id: "exhibition" },
    { num: "II", label: "Collection", href: "#collection", id: "collection" },
    { num: "III", label: "Timed Entry", href: "#visit", id: "visit" },
  ];

  return (
    <>
      {isClient && <CustomCursor />}

      <div className="fixed top-0 left-0 right-0 z-[85] bg-[#0a0a0a]/95 border-b border-white/10 text-bone px-[8vw] py-1.5 hidden lg:flex justify-between items-center text-[10px] font-mono tracking-widest uppercase backdrop-blur-xl">
        <div className="flex items-center gap-4 text-bone-dim">
          <span className="text-amber font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
            OPEN TODAY
          </span>
          <span>10:00 AM — 6:00 PM</span>
          <span className="text-stone/60">|</span>
          <span>1247 FIFTH AVENUE, NEW YORK</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-amber/90">INSTITUTIONAL TRUST EST. 1924</span>
          <a
            href="#visit"
            className="text-amber hover:text-bone transition-colors underline decoration-amber/40 underline-offset-4"
          >
            RESERVE ACCESS PASS
          </a>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-[80] transition-all duration-700 ${
          scrolled
            ? "top-0 lg:top-7 bg-[#0a0a0a]/92 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
            : "top-0 lg:top-7 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent py-5"
        }`}
      >
        <nav className="mx-auto max-w-content px-[8vw] flex items-center justify-between">
          <a
            href="#"
            className="font-display text-2xl md:text-3xl font-light tracking-tight text-bone hover:text-amber transition-colors duration-500 flex items-center gap-3 group"
            data-cursor-text
          >
            <div className="w-8 h-8 rounded-sm border border-amber/40 bg-amber/10 flex items-center justify-center text-amber font-mono text-xs font-bold shadow-inner group-hover:border-amber group-hover:bg-amber group-hover:text-void transition-all duration-300">
              Æ
            </div>
            <div className="flex flex-col">
              <span className="tracking-widest uppercase font-light text-xl md:text-2xl leading-none">
                Aetheria
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-amber/80">
                Museum of Fine Art
              </span>
            </div>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-300 relative py-1.5 flex items-center gap-2 ${
                    activeSection === item.id
                      ? "text-amber font-semibold"
                      : "text-bone-dim hover:text-amber"
                  }`}
                  data-cursor-text
                >
                  <span className="text-[9px] text-amber/70 font-serif">{item.num}.</span>
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber shadow-[0_0_8px_rgba(212,175,55,0.9)]" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <button
              onClick={toggleSoundscape}
              className={`hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-sm border text-[10px] font-mono tracking-widest uppercase transition-all duration-500 ${
                soundscapePlaying
                  ? "border-amber/70 bg-amber/20 text-amber shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                  : "border-stone/40 text-bone-dim hover:border-amber/50 hover:text-bone bg-charcoal/50"
              }`}
              data-cursor-text
              title="Toggle Ambient Gallery Audio Guide"
            >
              <div className="flex items-end gap-[2px] h-3">
                <span className={`w-[2px] bg-current rounded-full transition-all ${soundscapePlaying ? "h-3 animate-[pulse_0.8s_infinite]" : "h-1"}`} />
                <span className={`w-[2px] bg-current rounded-full transition-all ${soundscapePlaying ? "h-2 animate-[pulse_1.2s_infinite]" : "h-1.5"}`} />
                <span className={`w-[2px] bg-current rounded-full transition-all ${soundscapePlaying ? "h-3.5 animate-[pulse_0.6s_infinite]" : "h-1"}`} />
              </div>
              <span>{soundscapePlaying ? "Audio Guide Active" : "Audio Guide"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden font-sans text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-amber transition-colors px-3 py-1 border border-stone/30 rounded-sm"
              data-cursor-text
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[75] bg-[#0a0a0a]/98 backdrop-blur-2xl flex flex-col justify-between p-10 md:hidden animate-[fadeIn_0.3s_ease-out]">
          <div className="pt-24 space-y-8">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-amber border-b border-amber/20 pb-3">
              <span>Æ</span>
              <span>Museum Directory</span>
            </div>
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-4xl font-light text-bone hover:text-amber transition-colors flex items-center gap-4"
                  >
                    <span className="font-serif text-lg text-amber/60">{item.num}.</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-stone/30 pt-6 space-y-4">
            <button
              onClick={toggleSoundscape}
              className="w-full py-3.5 border border-amber/40 text-amber font-mono text-xs uppercase tracking-widest rounded-sm bg-amber/10"
            >
              {soundscapePlaying ? "Pause Museum Audio Guide" : "Enable Museum Audio Guide"}
            </button>
            <p className="font-mono text-xs text-bone-dim text-center">
              1247 Fifth Avenue, New York · 10:00 - 18:00
            </p>
          </div>
        </div>
      )}
    </>
  );
}
