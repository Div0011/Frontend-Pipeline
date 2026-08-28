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
    if (navigator.clipboard) {
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

  const socialLinks = [
    { name: "Instagram", handle: "@dans-burgers", link: "https://instagram.com", icon: "📸" },
    { name: "Twitter / X", handle: "@DAN'SHAMBURGERSHQ", link: "https://x.com", icon: "⚡" },
    { name: "TikTok", handle: "@dans-burgers", link: "https://tiktok.com", icon: "🔥" },
    { name: "YouTube", handle: "Dan's Hamburgers Media", link: "https://youtube.com", icon: "🎬" },
  ];

  return (
    <footer className="bg-transparent text-[#FAF8F2] border-t border-white/10 relative z-10 overflow-hidden select-none">
      {/* 1. Kinetic Marquee Banner */}
      <div className="py-4 border-b border-white/10 bg-black/40 backdrop-blur-md overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 items-center text-xs font-mono tracking-widest uppercase font-bold"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2" style={{ color: "#D97706" }}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: "#D97706" }} />
                DAN'S HAMBURGERS // FLAT-TOP SIZZLE & TEXAS TOAST
              </span>
              <span className="text-stone-400">AUSTIN OUTPOSTS</span>
              <span className="text-white">CRAFT CULINARY ATELIER</span>
              <span style={{ color: "#D97706" }}>ORDER ONLINE · VIP TABLE BOOKING</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-20 space-y-16">
        {/* 2. Top Interactive Section: Brand Mission & VIP Secret Drop Club */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Brand & Live Telemetry */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="type-display text-4xl sm:text-5xl font-black tracking-tight text-white">
                Dan's Hamburgers
              </span>
            </div>
            <p className="text-sm text-stone-300 max-w-md leading-relaxed font-body">
              SINCE 1973 · AN AUSTIN ORIGINAL. Dedicated to artisanal craftsmanship, uncompromised ingredients, high-heat sears, and memorable culinary hospitality.
            </p>

            {/* Live Kitchen Telemetry Card */}
            <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 space-y-3 max-w-md shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    LIVE // KITCHEN ACTIVE
                  </span>
                </div>
                <span className="font-mono text-xs text-stone-300 bg-black/50 px-2.5 py-1 rounded-md border border-white/10">
                  {currentTime || "12:00 PM"}
                </span>
              </div>
              <p className="font-mono text-xs text-stone-300">
                Screaming-hot flat-tops searing fresh orders in Austin. Estimated table wait: <span className="text-white font-bold">&lt; 10 mins</span>.
              </p>
            </div>
          </div>

          {/* VIP Secret Drop Club Subscription */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: "#D97706" }}>
                VIP SIZZLE CLUB // SECRET DROPS
              </span>
              <h3 className="type-display text-2xl sm:text-3xl font-extrabold text-white">
                GET FIRST TASTE OF LIMITED SPECIALS
              </h3>
              <p className="text-xs font-mono text-stone-300">
                Join 10,000+ culinary enthusiasts in Austin for secret menu drops, VIP tasting invites, and monthly perks.
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
                  className="space-y-3"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="flex-grow px-5 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-stone-400 font-mono text-xs focus:outline-none focus:border-[#D97706] transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95 shadow-xl hover:brightness-110 flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#D97706", color: "#FFFFFF" }}
                    >
                      <span>Join Drop List</span>
                      <span>→</span>
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 block">
                    🔒 Zero spam. Only high-heat culinary bulletins.
                  </span>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 space-y-3 text-emerald-300"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎉</span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-200">
                      VIP ACCESS GRANTED · WELCOME TO THE CREW
                    </span>
                  </div>
                  <p className="font-mono text-xs text-stone-200">
                    Use code <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-200 font-bold tracking-widest border border-emerald-400/40">DANSHA15</span> for 15% off your next visit.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Outposts, Navigation & Quick Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pt-8 border-t border-white/10">
          {/* Outpost 1 */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#D97706" }} />
              South Austin Manchaca
            </h4>
            <p className="text-xs font-mono text-stone-300 leading-relaxed">
              5602 Manchaca Rd
            </p>
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => copyToClipboard("(512) 448-3800")}
                className="text-xs font-mono text-stone-300 hover:text-white flex items-center gap-2 transition-colors"
              >
                <span>📞 (512) 448-3800</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10" style={{ color: "#D97706" }}>
                  {copiedPhone === "(512) 448-3800" ? "COPIED!" : "COPY"}
                </span>
              </button>
              <a
                href="https://maps.google.com/?q=Dans+Hamburgers+Manchaca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>📍 Google Maps</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Outpost 2 (or hours) */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#D97706" }} />
              Operating Hours
            </h4>
            <p className="text-xs font-mono text-stone-300 leading-relaxed">
              Monday – Sunday: 11:30 AM – 11:30 PM<br />
              Late Night Kitchen: Friday &amp; Saturday till 1:00 AM
            </p>
            <p className="text-xs font-mono text-stone-400 pt-1">
              Dine-In · Takeaway · Direct Delivery
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Explore Menu
            </h4>
            <ul className="space-y-2 text-xs font-mono text-stone-300">
              <li>
                <Link href="/menu" className="hover:text-white transition-colors flex items-center gap-1">
                  <span style={{ color: "#D97706" }}>→</span> <span>Signature Smashes</span>
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors flex items-center gap-1">
                  <span style={{ color: "#D97706" }}>→</span> <span>Sides &amp; Thickshakes</span>
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-white transition-colors flex items-center gap-1">
                  <span style={{ color: "#D97706" }}>→</span> <span>VIP Table Booking</span>
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors flex items-center gap-1">
                  <span style={{ color: "#D97706" }}>→</span> <span>Kitchen Outposts</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Hub */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 hover:bg-white/[0.08] transition-all group flex flex-col justify-between"
                >
                  <span className="text-base">{s.icon}</span>
                  <div className="mt-2">
                    <span className="text-[11px] font-mono font-bold text-white group-hover:text-white transition-colors block" style={{ color: "#D97706" }}>
                      {s.name}
                    </span>
                    <span className="text-[9px] font-mono text-stone-400 block truncate">
                      {s.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Grand Display Brand Signature & Interactive Back to Top */}
        <div className="relative pt-12 border-t border-white/10 flex flex-col items-center justify-center overflow-hidden">
          <button
            type="button"
            onClick={scrollToTop}
            className="mb-8 px-6 py-3 rounded-full bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95 flex items-center gap-3 shadow-2xl group"
          >
            <span>BACK TO TOP</span>
            <span className="group-hover:-translate-y-1 transition-transform" style={{ color: "#D97706" }}>
              ↑
            </span>
          </button>

          {/* Monumental Brand Typography */}
          <h2
            className="type-display text-[12vw] font-black leading-none tracking-tighter uppercase select-none pointer-events-none opacity-20 hover:opacity-40 transition-opacity duration-700 text-center"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.25)",
              color: "transparent",
            }}
          >
            DAN'S HAMBURGERS
          </h2>

          <div className="w-full pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-stone-400">
            <p>© {new Date().getFullYear()} Dan's Hamburgers. All rights reserved.</p>
            <p className="font-bold" style={{ color: "#D97706" }}>
              AUSTIN CULINARY REVOLUTION // CRAFTED WITH PRIDE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
