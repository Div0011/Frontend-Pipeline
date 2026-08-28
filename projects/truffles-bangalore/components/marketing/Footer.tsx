"use client";

import React from "react";
import Link from "next/link";
import PixelText from "@/components/ui/PixelText";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{ backgroundColor: "#FFE500", color: "#000000" }}
      className="h-[100svh] min-h-[100svh] w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 relative z-10 select-none overflow-hidden"
    >
      {/* Top Bar: Navigation & Info */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-start gap-6 pb-6"
        style={{ borderBottom: "1px solid rgba(128,128,128,0.25)" }}
      >
        <nav className="flex flex-wrap gap-6 sm:gap-10 font-sans text-sm font-bold uppercase tracking-wider">
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

        <div
          className="font-sans text-xs sm:text-right space-y-1"
          style={{ color: "#00000099" }}
        >
          <p className="font-bold">OPEN DAILY: 11:00 AM – 11:00 PM</p>
          <p>BENGALURU OUTPOSTS</p>
        </div>
      </div>

      {/* Center: Auto-Fitting Responsive Pixel-Dot Brand Name (Always 100% visible) */}
      <div className="my-auto py-6 sm:py-8 w-full flex items-center justify-center overflow-hidden">
        <PixelText
          text="TRUFFLES"
          dotSize={8}
          gap={3}
          color="#000000"
          explodeRadius={120}
          explodeForce={30}
          returnStiffness={0.09}
        />
      </div>

      {/* Bottom Bar: Contact & Back to Top */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pt-6 font-sans text-xs font-bold"
        style={{ borderTop: "1px solid rgba(128,128,128,0.25)" }}
      >
        <div className="space-y-1" style={{ color: "#00000099" }}>
          <p className="font-extrabold text-sm" style={{ color: "#000000" }}>
            +91 80 4146 6565
          </p>
          <p>Apex Rialto, St. Mark's Rd, Bengaluru</p>
          <p>hello@truffles.co.in</p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-8">
          <p className="font-medium" style={{ color: "#00000066" }}>
            © {new Date().getFullYear()} TRUFFLES
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full border hover:opacity-80 transition-all uppercase tracking-wider font-extrabold flex items-center gap-2 active:scale-95 shadow-lg"
            style={{ borderColor: "#00000040" }}
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
