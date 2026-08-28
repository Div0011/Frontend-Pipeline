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
      style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
      className="h-[100svh] min-h-[100svh] w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 relative z-10 select-none overflow-hidden border-t border-[#C68A14]/20"
    >
      {/* Top Bar: Navigation & Info */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-start gap-6 pb-6"
        style={{ borderBottom: "1px solid rgba(198, 138, 20, 0.20)" }}
      >
        <nav className="flex flex-wrap gap-6 sm:gap-10 font-sans text-sm font-bold uppercase tracking-wider">
          <Link href="/menu" className="hover:text-[#C68A14] transition-colors">
            Menu
          </Link>
          <Link href="/reservations" className="hover:text-[#C68A14] transition-colors">
            Reservations
          </Link>
          <Link href="/locations" className="hover:text-[#C68A14] transition-colors">
            Outposts
          </Link>
          <Link href="/about" className="hover:text-[#C68A14] transition-colors">
            Our Story
          </Link>
        </nav>

        <div
          className="font-sans text-xs sm:text-right space-y-1 font-medium"
          style={{ color: "#0A0A0A99" }}
        >
          <p className="font-bold text-black">OPEN DAILY: 11:00 AM – 11:00 PM</p>
          <p>THE DRAG · AUSTIN, TX</p>
        </div>
      </div>

      {/* Center: Auto-Fitting Responsive Pixel-Dot Brand Name in Dark Mustard */}
      <div className="my-auto py-6 sm:py-8 w-full flex items-center justify-center overflow-hidden">
        <PixelText
          text="DIRTY MARTIN'S"
          dotSize={8}
          gap={3}
          color="#C68A14"
          explodeRadius={120}
          explodeForce={30}
          returnStiffness={0.09}
        />
      </div>

      {/* Bottom Bar: Contact & Back to Top */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pt-6 font-sans text-xs font-bold"
        style={{ borderTop: "1px solid rgba(198, 138, 20, 0.20)" }}
      >
        <div className="space-y-1" style={{ color: "#0A0A0A99" }}>
          <p className="font-extrabold text-sm text-black">
            +1 512-477-3173
          </p>
          <p>2808 Guadalupe St, Austin, TX 78705</p>
          <p>kum-bak@dirtymartins.com</p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-8">
          <p className="font-medium text-stone-500">
            © {new Date().getFullYear()} DIRTY MARTIN&apos;S
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full border border-[#C68A14]/40 bg-white text-black hover:bg-[#FAF8F2] transition-all uppercase tracking-wider font-extrabold flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
