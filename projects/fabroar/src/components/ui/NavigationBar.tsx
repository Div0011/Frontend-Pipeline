"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { useTheme } from "@/context/ThemeContext";

export default function NavigationBar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY.current + 5) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current - 5) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      const docHeight = document.documentElement?.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min((currentScrollY / docHeight) * 100, 100));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setIsHovered(true);
      } else if (e.clientY > 100) {
        setIsHovered(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isScrolled = scrollY > 60;
  const shouldShowHeader = isVisible || isHovered || isMobileMenuOpen || scrollY <= 50;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/men", label: "Men" },
    { href: "/women", label: "Women" },
    { href: "/customize", label: "Custom Studio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top hover sensor zone */}
      <div
        className="fixed top-0 left-0 right-0 h-6 z-50 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
      />

      <header
        ref={headerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="scrolled-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{
          transform: shouldShowHeader ? "translateY(0)" : "translateY(-100%)",
          opacity: shouldShowHeader ? 1 : 0,
          pointerEvents: shouldShowHeader ? "auto" : "none",
          background: isScrolled || isMobileMenuOpen ? (theme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(15, 15, 15, 0.96)") : "transparent",
          backdropFilter: isScrolled || isMobileMenuOpen ? "blur(16px) saturate(180%)" : "none",
          borderBottom: isScrolled || isMobileMenuOpen ? "1px solid rgba(212, 101, 74, 0.3)" : "none",
        }}
      >
        {/* Top terracotta progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <div
            className="h-full"
            style={{
              width: `${scrollProgress}%`,
              background: "#D4654A",
              transition: "width 150ms linear",
            }}
          />
        </div>

        <nav className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo (Enlarged, Text Removed) */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center group transition-opacity duration-300 hover:opacity-90 py-1"
          >
            <div className="relative h-12 sm:h-16 w-12 sm:w-16 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="FABROAR"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group font-ui text-sm tracking-widest uppercase text-[var(--color-ink)] hover:text-[#D4654A] transition-colors duration-300 overflow-hidden font-semibold"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out bg-[#D4654A]"
                />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Light/Dark Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="p-2 text-[var(--color-ink)] hover:text-[#D4654A] transition-transform active:scale-95 duration-300 flex items-center justify-center rounded-full hover:bg-[#D4654A]/10"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleCart();
              }}
              aria-label="Open cart"
              className="relative p-2 text-[var(--color-ink)] hover:text-[#D4654A] transition-colors duration-300"
            >
              <ShoppingBag size={22} />
              {totalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D4654A] text-[#F5F0E8] text-[10px] font-ui font-bold rounded-full flex items-center justify-center shadow">
                  {totalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-[var(--color-ink)] hover:text-[#D4654A] transition-all active:scale-95"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu — Fullscreen Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500 overflow-y-auto px-6 py-20 bg-[var(--color-surface)] text-[var(--color-ink)]"
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        {/* Radial brand glow overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at 50% 40%, rgba(212,101,74,0.18) 0%, transparent 70%)",
        }} />

        {/* Clean nav link list */}
        <div className="flex flex-col items-center justify-center gap-6 relative z-10 w-full max-w-xs">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl sm:text-4xl text-[var(--color-ink)] hover:text-[#D4654A] font-bold tracking-tight hover:scale-105 transition-all duration-300 flex items-center gap-3 py-1"
              style={{
                transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : "0ms",
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(15px)",
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              <span>{link.label}</span>
            </Link>
          ))}

          <div className="w-16 h-px bg-[#D4654A]/40 my-4" />

          {/* Action button inside mobile menu */}
          <Link
            href="/customize"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs font-bold tracking-[0.2em] uppercase text-center rounded-sm shadow-lg flex items-center justify-center gap-2 hover:bg-[#E07A60] transition-colors"
          >
            Design Custom Tee <ArrowRight size={14} />
          </Link>
        </div>

        {/* Bottom tagline */}
        <div className="absolute bottom-8 left-0 right-0 text-center font-ui text-[10px] tracking-[0.3em] uppercase text-[#C4A77D]">
          WEAR YOUR STORY • FABROAR
        </div>
      </div>
    </>
  );
}
