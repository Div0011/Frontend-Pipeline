"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Architecture", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Observability", href: "#observability" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3.5 bg-background/75 border-b border-border backdrop-blur-xl"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero-section" className="flex items-center gap-3 group">
            <div className="relative flex h-8 w-8 items-center justify-center border border-primary/30 bg-primary/[0.06]">
              <span className="absolute inset-[3px] border border-primary/20" />
              <span className="h-1.5 w-1.5 bg-primary" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              NexaFlow
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href="#"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 hover:text-foreground transition-colors"
            >
              Sign In
            </a>
            <Button className="bg-foreground hover:bg-foreground/90 text-background font-mono text-[11px] uppercase tracking-[0.16em] rounded-none px-5 h-10">
              Launch App
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 text-foreground/70 hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md pt-24 px-6 flex flex-col gap-8 md:hidden"
          >
            <nav className="flex flex-col gap-5">
              {NAV.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-semibold text-foreground/85 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="h-px bg-border" />
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="text-center py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/55"
              >
                Sign In
              </a>
              <Button className="w-full bg-foreground hover:bg-foreground/90 text-background py-6 font-mono text-xs uppercase tracking-[0.16em] rounded-none">
                Launch App
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
