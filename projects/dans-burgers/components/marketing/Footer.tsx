"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{ backgroundColor: "#D97706", color: "#FFFFFF" }}
      className="h-[100svh] min-h-[100svh] w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 relative z-10 select-none overflow-hidden"
    >
      {/* Top Bar: Navigation Options & Outpost City */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-start gap-8 pb-8"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
      >
        {/* Navigation Options */}
        <nav className="flex flex-wrap gap-6 sm:gap-10 font-mono text-sm font-bold uppercase tracking-wider">
          <Link href="/menu" className="hover:opacity-60 transition-opacity">
            Menu
          </Link>
          <Link href="/reservations" className="hover:opacity-60 transition-opacity">
            Reservations
          </Link>
          <Link href="/locations" className="hover:opacity-60 transition-opacity">
            Outposts
          </Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">
            Our Story
          </Link>
        </nav>

        {/* Hours */}
        <div
          className="font-mono text-xs sm:text-right space-y-1"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          <p className="font-bold">OPEN DAILY: 11:30 AM – 11:30 PM</p>
          <p>AUSTIN OUTPOSTS</p>
        </div>
      </div>

      {/* Center: Grand Monumental Brand Typography */}
      <div className="my-auto py-8">
        <h2 className="type-display text-[13vw] leading-none font-black uppercase tracking-tight select-none">
          DAN'S HAMBURGERS
        </h2>
      </div>

      {/* Bottom Bar: Contact Info & Back to Top */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pt-8 font-mono text-xs font-bold"
        style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
      >
        {/* Contact Info */}
        <div className="space-y-1" style={{ color: "rgba(255,255,255,0.7)" }}>
          <p className="font-extrabold text-sm" style={{ color: "#FFFFFF" }}>
            (512) 448-3800
          </p>
          <p>5602 Manchaca Rd</p>
          <p>contact@dansburgers.com</p>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center justify-between sm:justify-end gap-8">
          <p className="font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} Dan's Hamburgers.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all uppercase tracking-wider font-extrabold flex items-center gap-2 active:scale-95 shadow-lg"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
