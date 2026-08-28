"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export interface MenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface SocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  items?: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  logoUrl?: string;
  accentColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  className?: string;
}

export default function StaggeredMenu({
  position = "right",
  items = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "Products", ariaLabel: "View our soda collection", link: "/products" },
    { label: "Contact", ariaLabel: "Get in touch with AURA", link: "/contact" },
  ],
  socialItems = [
    { label: "Twitter / X", link: "https://twitter.com" },
    { label: "Instagram", link: "https://instagram.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ],
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = "#ffffff",
  openMenuButtonColor = "#ffffff",
  changeMenuColorOnOpen = true,
  colors = ["#1a082b", "#0d0314"],
  accentColor = "#4CC9F0",
  onMenuOpen,
  onMenuClose,
  className = "",
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false); // shadow ref to avoid stale closures
  const pathname = usePathname();
  const isMounted = useRef(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  // Close menu on route change — read from ref to avoid stale closure
  useEffect(() => {
    if (isOpenRef.current) {
      isOpenRef.current = false;
      setIsOpen(false);
      document.body.style.overflow = "";
      animateClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpenRef.current) {
        handleToggle(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = useCallback((openState?: boolean) => {
    const nextState = openState !== undefined ? openState : !isOpenRef.current;
    isOpenRef.current = nextState;
    setIsOpen(nextState);

    if (nextState) {
      onMenuOpen?.();
      document.body.style.overflow = "hidden";
      animateOpen();
    } else {
      onMenuClose?.();
      document.body.style.overflow = "";
      animateClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMenuOpen, onMenuClose]);

  const animateOpen = () => {
    const overlay = overlayRef.current;
    if (!overlay || !isMounted.current) return;

    gsap.set(overlay, { display: "flex", opacity: 1 });

    const tl = gsap.timeline();

    // Stagger slide panels
    if (panelsRef.current.length > 0) {
      tl.fromTo(
        panelsRef.current,
        { xPercent: position === "right" ? 100 : -100 },
        {
          xPercent: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power4.out",
        }
      );
    }

    // Stagger links in
    if (linksContainerRef.current) {
      const linkItems = linksContainerRef.current.querySelectorAll(".stagger-link-item");
      tl.fromTo(
        linkItems,
        { y: 60, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }

    // Social items
    if (socialsRef.current) {
      tl.fromTo(
        socialsRef.current.querySelectorAll(".stagger-social-item"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  };

  const animateClose = () => {
    const overlay = overlayRef.current;
    if (!overlay || !isMounted.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
      },
    });

    if (panelsRef.current.length > 0) {
      tl.to(panelsRef.current, {
        xPercent: position === "right" ? 100 : -100,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.in",
      });
    } else {
      tl.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className={`fixed top-0 left-0 w-full z-50 pointer-events-none px-6 md:px-12 py-6 flex items-center ${position === "right" ? "justify-end" : "justify-start"} ${className}`}>
        {/* Minimalist Interactive Toggle Button */}
        <button
          onClick={() => handleToggle()}
          className="pointer-events-auto group flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-white/35 backdrop-blur-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95"
          style={{
            color: isOpen && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor,
          }}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
            {isOpen ? "Close" : "Menu"}
          </span>

          {/* Animated 2-bar hamburger / cross icon */}
          <div className="w-4 h-3 flex flex-col justify-between items-center relative">
            <span
              className={`w-4 h-[1.5px] bg-current transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-current transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* 1/3rd Screen Staggered Overlay */}
      <div
        ref={overlayRef}
        className={`fixed top-0 bottom-0 ${position === "right" ? "right-0" : "left-0"} z-40 hidden flex-col justify-between overflow-hidden w-full md:w-1/3 border-${position === "right" ? "l" : "r"} border-white/10`}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        {/* Layered Color Panels for Staggered Slide Effect */}
        <div
          ref={(el) => {
            if (el) panelsRef.current[0] = el;
          }}
          className="absolute inset-0 z-0 opacity-95 bg-gradient-to-br from-[#1a082b] via-purple-900/40 to-[#0d0314]"
        />
        <div
          ref={(el) => {
            if (el) panelsRef.current[1] = el;
          }}
          className="absolute inset-0 z-0 backdrop-blur-3xl bg-gradient-to-tr from-[#0d0314]/90 via-orange-900/20 to-purple-900/30"
        />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-20 max-w-7xl mx-auto">
          
          {/* Top Brand Header Removed for Minimalism */}

          {/* Center Navigation Links (Staggered Big Typography) */}
          <div ref={linksContainerRef} className="flex flex-col gap-4 md:gap-6 my-auto">
            {items.map((item, idx) => {
              const isActive = pathname === item.link;
              const numStr = (idx + 1).toString().padStart(2, "0");

              return (
                <div key={item.link} className="stagger-link-item overflow-hidden">
                  <Link
                    href={item.link}
                    aria-label={item.ariaLabel}
                    onClick={() => handleToggle(false)}
                    className="group inline-flex items-center gap-6 text-white/80 hover:text-white transition-all duration-300"
                  >
                    {displayItemNumbering && (
                      <span
                        className="font-mono text-sm md:text-xl text-white/30 group-hover:text-white/80 transition-colors"
                        style={{ color: isActive ? accentColor : undefined }}
                      >
                        {numStr}
                      </span>
                    )}

                    <span className="font-display text-[clamp(2.5rem,4vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                      {item.label}
                    </span>

                    <span
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-2xl md:text-3xl"
                      style={{ color: accentColor }}
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Bottom Socials & Transmissions */}
          {displaySocials && (
            <div ref={socialsRef} className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-8">
                {socialItems.map((s) => (
                  <a
                    key={s.label}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="stagger-social-item font-mono text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>

              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                &copy; {new Date().getFullYear()} AURA SODA CO.
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
