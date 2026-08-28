"use client";

import React, { useState, useEffect } from "react";
import ScrollVelocity from "@/components/ScrollVelocity";
import BlurText from "@/components/reactbits/BlurText";
import FullPageFooter from "@/components/FullPageFooter";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";
import { useSceneStore } from "@/stores/sceneStore";

export default function ContactPage() {
  const { theme } = useAdaptiveTheme();
  const setActiveSection = useSceneStore((s) => s.setActiveSection);

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "Wholesale & Distribution",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Hide all 3D models on contact page
    setActiveSection("contact");
  }, [setActiveSection]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="relative min-h-screen text-[#f3f1ec] bg-transparent">

      {/* Hero Header */}
      <section className="relative pt-40 pb-12 px-6 md:px-16 max-w-7xl mx-auto overflow-hidden">
        {/* Radial glow bloom */}
        <div
          className="absolute -top-10 -left-20 pointer-events-none"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: "800px",
            maxHeight: "800px",
            background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`,
            opacity: 0.15,
          }}
        />
        <div className="relative z-10 space-y-4">
          {/* Subtitle removed for minimalism */}

          <BlurText
            text="Get In Touch"
            delay={100}
            animateBy="letters"
            direction="bottom"
            className="font-display text-[clamp(3.8rem,11vw,8.5rem)] font-extrabold uppercase leading-[0.88] text-white block"
          />

          <p className="text-sm md:text-base text-white/60 font-sans max-w-xl leading-relaxed">
            Direct frequency channel for retail distribution, hospitality partnerships, press, and molecular bio-research.
          </p>
        </div>
      </section>

      {/* High-Velocity Scroll Text Ribbon */}
      <div className="w-full">
        <ScrollVelocity
          texts={["AURA SODA CO.", "TRANSMIT FREQUENCY", "ZERO COMPROMISE", "COLD PRESSED"]}
          velocity={100}
          className="custom-scroll-text"
          numCopies={6}
          damping={50}
          stiffness={400}
        />
      </div>

      {/* Main Content Grid: Borderless Minimalist Form & Direct Coordinates */}
      <section className="relative py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Borderless Minimalist Transmission Form */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white">
                Initiate Dispatch Signal
              </h2>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl space-y-4 animate-in fade-in duration-500">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-white">
                    Transmission Encrypted & Sent
                  </span>
                </div>
                <p className="font-sans text-sm text-white/70 leading-relaxed">
                  Your signal has been received at the Alpine Bio-Facility. A dispatch coordinator will establish contact within 4 solar hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", category: "Wholesale & Distribution", message: "" });
                  }}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white underline underline-offset-4 pt-2 transition-colors"
                >
                  Send Another Transmission &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name..."
                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-white text-base md:text-lg text-white placeholder-white/20 pb-3 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-white text-base md:text-lg text-white placeholder-white/20 pb-3 focus:outline-none transition-colors"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-3">
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block">
                    Inquiry Category
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "Wholesale & Distribution",
                      "Retail Partnerships",
                      "Press & Media",
                      "Bio-Extraction Research",
                    ].map((cat) => {
                      const isSel = form.category === cat;
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setForm({ ...form, category: cat })}
                          className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                            isSel
                              ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                              : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Detail your inquiry, estimated volume, or collaboration..."
                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-white text-base md:text-lg text-white placeholder-white/20 pb-3 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-display font-bold uppercase tracking-wider text-sm hover:scale-105 hover:bg-white/90 active:scale-95 transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.2)] disabled:opacity-50"
                  >
                    <span>{submitting ? "Transmitting..." : "Send Transmission"}</span>
                    <span className="text-base">&rarr;</span>
                  </button>

                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                    256-Bit Botanical TLS
                  </span>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Minimalist Direct Coordinates */}
          <div className="lg:col-span-5 space-y-12 lg:pl-8">
            
            {/* Status Pill Removed */}

            {/* Coordinates Block 1: Direct Frequencies */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                Direct Frequencies
              </span>
              <div className="space-y-2">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 block">
                    Global Distribution & Orders
                  </span>
                  <a
                    href="mailto:wholesale@aurasoda.co"
                    className="font-display text-xl font-bold uppercase tracking-tight text-white hover:text-white/80 transition-colors"
                  >
                    wholesale@aurasoda.co
                  </a>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 block">
                    General Inquiries & Press
                  </span>
                  <a
                    href="mailto:frequency@aurasoda.co"
                    className="font-display text-xl font-bold uppercase tracking-tight text-white hover:text-white/80 transition-colors"
                  >
                    frequency@aurasoda.co
                  </a>
                </div>
              </div>
            </div>

            {/* Coordinates Block 2: Physical Bio-Facility */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                Bio-Facility & Cold Chain
              </span>
              <p className="font-mono text-xs text-white/70 leading-relaxed uppercase">
                Sector 07 // Alpine Glacial Valley<br />
                Sub-Zero Bottling & Extraction Lab<br />
                Direct Freight & Global Dispatch
              </p>
            </div>

            {/* SLA Removed for Minimalism */}

          </div>

        </div>
      </section>

      {/* Same Full Page Footer with HalftoneReveal (No 3D Models) */}
      <FullPageFooter />
    </main>
  );
}
