"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setIsSubscribed(true);
    }
  };

  const copyToClipboard = (phone: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(phone);
      setTimeout(() => setCopiedPhone(null), 2500);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-transparent text-[#FAF8F2] border-t border-white/10 relative z-10 overflow-hidden select-none">
      {/* 1. Kinetic Marquee Banner */}
      <div className="py-3 border-b border-white/10 bg-black/40 backdrop-blur-md overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center text-xs font-mono tracking-widest uppercase font-bold text-stone-400"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2" style={{ color: "#7C3AED" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7C3AED" }} />
                BURGER ELITE
              </span>
              <span>BENGALURU OUTPOSTS</span>
              <span className="text-white">CRAFT KITCHEN</span>
              <span style={{ color: "#7C3AED" }}>ORDER ONLINE</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-20 space-y-16">
        {/* 2. Top Minimalist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Brand Info & Live Telemetry */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="type-display text-4xl sm:text-5xl font-black tracking-tight text-white">
              BURGER ELITE
            </h3>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed font-body">
              Artisanal craft kitchen in Bengaluru. Uncompromised ingredients, precision heat, and hospitality.
            </p>

            {/* Live Telemetry Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2 max-w-sm shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                    KITCHEN ACTIVE
                  </span>
                </div>
                <span className="font-mono text-xs text-stone-300 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                  {currentTime || "12:00 PM"}
                </span>
              </div>
              <p className="font-mono text-[11px] text-stone-400">
                Live service in Bengaluru. Wait time: <span className="text-white font-bold">&lt; 10 mins</span>.
              </p>
            </div>
          </div>

          {/* Minimalist Drop Club Subscription */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-xl space-y-5">
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: "#7C3AED" }}>
                NEWSLETTER // DROPS
              </span>
              <h4 className="type-display text-2xl font-bold text-white">
                MEMBERS-ONLY RELEASES
              </h4>
              <p className="text-xs font-mono text-stone-400">
                Seasonal specials, private tasting previews, and culinary updates in Bengaluru.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="flex-grow px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-stone-400 font-mono text-xs focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }}
                    >
                      <span>Join</span>
                      <span>→</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 space-y-1.5 text-emerald-300"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider block text-emerald-200">
                    ACCESS CONFIRMED
                  </span>
                  <p className="font-mono text-xs text-stone-300">
                    Code <span className="px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-200 font-bold tracking-widest">BURGER15</span> for 15% off first order.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Outposts & Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
          {/* Outpost 1 */}
          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7C3AED" }} />
              Indiranagar Royale Lounge
            </h5>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              100 Feet Road, HAL 2nd Stage
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => copyToClipboard("+91 80 4399 8811")}
                className="text-stone-300 hover:text-white transition-colors"
              >
                +91 80 4399 8811
                <span className="ml-2 text-[10px] px-1 py-0.5 rounded bg-white/10" style={{ color: "#7C3AED" }}>
                  {copiedPhone === "+91 80 4399 8811" ? "COPIED" : "COPY"}
                </span>
              </button>
              <a
                href="https://maps.google.com/?q=Burger+Elite+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors"
              >
                Map →
              </a>
            </div>
          </div>

          {/* Outpost 2 or Hours */}
          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7C3AED" }} />
              Hours
            </h5>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              Daily: 11:30 AM – 11:30 PM<br />
              Dine-In &amp; Takeaway
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h5>
            <ul className="space-y-1.5 text-xs font-mono text-stone-400">
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-white transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Outposts
                </Link>
              </li>
            </ul>
          </div>

          {/* Custom SVG Social Icons */}
          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Social
            </h5>
            <div className="flex gap-2">
              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* X / Twitter SVG */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                title="X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* TikTok SVG */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                title="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-3.04-1.52z"/>
                </svg>
              </a>

              {/* YouTube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 4. Minimal Monumental Signature & Back to Top */}
        <div className="relative pt-10 border-t border-white/10 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="mb-8 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 hover:border-white/30 text-stone-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95 flex items-center gap-2 shadow-xl"
          >
            <span>TOP</span>
            <span>↑</span>
          </button>

          {/* Monumental Display */}
          <h2
            className="type-display text-[12vw] font-black leading-none tracking-tighter uppercase select-none pointer-events-none opacity-15 hover:opacity-30 transition-opacity duration-700 text-center"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
              color: "transparent",
            }}
          >
            BURGER ELITE
          </h2>

          <div className="w-full pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-stone-400">
            <p>© {new Date().getFullYear()} BURGER ELITE.</p>
            <p>BENGALURU</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
