"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import PixelText from "@/components/ui/PixelText";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      style={{ backgroundColor: "#F5C418", color: "#000000" }}
      className="h-[100svh] min-h-[100svh] w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 relative z-10 select-none overflow-hidden"
    >
      {/* Top Bar: Navigation Options & Outpost City */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-start gap-8 pb-8"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.15)" }}
      >
        {/* Navigation Options */}
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

        {/* Hours */}
        <div
          className="font-sans text-xs sm:text-right space-y-1"
          style={{ color: "rgba(0,0,0,0.7)" }}
        >
          <p className="font-bold">OPEN DAILY: 11:30 AM – 11:30 PM</p>
          <p>BENGALURU OUTPOSTS</p>
        </div>
      </div>

      {/* Center: Interactive Pixel-Dot Brand Name */}
      <div className="my-auto py-8 flex items-center overflow-x-auto">
        {/*
          PixelText renders the brand name as a field of dots.
          Each dot is repelled by the cursor and springs back to form the word.
          On mobile it responds to touch.
        */}
        <div className="scale-[clamp(0.4,4vw,1)] sm:scale-[clamp(0.5,5vw,1)] md:scale-100 origin-left transition-transform duration-200">
          <PixelText
            text="BEYONDBURG INC."
            dotSize={7}
            gap={4}
            color="#000000"
            explodeRadius={90}
            explodeForce={22}
            returnStiffness={0.10}
          />
        </div>
      </div>

      {/* Bottom Bar: Contact Info & Back to Top */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pt-8 font-sans text-xs font-bold"
        style={{ borderTop: "1px solid rgba(0,0,0,0.15)" }}
      >
        {/* Contact Info */}
        <div className="space-y-1" style={{ color: "rgba(0,0,0,0.7)" }}>
          <p className="font-extrabold text-sm" style={{ color: "#000000" }}>
            +91 90729 64242
          </p>
          <p>Opp. Bowring Institute, St. Mark's Rd</p>
          <p>contact@beyondburginc.com</p>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center justify-between sm:justify-end gap-8">
          <p className="font-medium" style={{ color: "rgba(0,0,0,0.5)" }}>
            © {new Date().getFullYear()} Beyondburg Inc.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full border border-black/30 hover:bg-black hover:text-[#F5C418] transition-all uppercase tracking-wider font-extrabold flex items-center gap-2 active:scale-95 shadow-lg"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
