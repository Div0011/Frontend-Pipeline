"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Cpu, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Architecture", href: "#architecture" },
  { label: "Specifications", href: "#specifications" },
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
            ? "py-4 bg-background/70 border-b border-border backdrop-blur-md"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight">
            <div className="flex h-9 w-9 items-center justify-center border border-primary/40 bg-primary/10">
              <Cpu className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight">
              NexaFlow
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a href="#" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              Sign In
            </a>
            <Button className="bg-foreground hover:bg-foreground/90 text-background font-medium rounded-none px-5">
              Launch App
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 text-foreground/80 hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 flex flex-col gap-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="h-px bg-border my-2" />
            <div className="flex flex-col gap-4">
              <a href="#" className="text-center py-3 text-lg font-medium text-foreground/70 hover:text-foreground transition-colors">
                Sign In
              </a>
              <Button className="w-full bg-foreground hover:bg-foreground/90 text-background py-6 font-medium rounded-none">
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
