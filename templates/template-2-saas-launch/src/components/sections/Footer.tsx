"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useCinematicReveal } from "@/lib/motion";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Integrations"],
  Resources: ["Documentation", "API Reference", "Guides", "Blog"],
  Company: ["About", "Careers", "Contact", "Partners"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  useCinematicReveal(ref, { y: 24, duration: 0.9 });

  return (
    <footer
      ref={ref}
      className="relative py-16 md:py-20 border-t border-border bg-background opacity-0"
    >
      <div className="absolute top-0 left-0 right-0 h-px edge-hairline opacity-40" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex h-7 w-7 items-center justify-center border border-primary/30 bg-primary/[0.06]">
                <span className="h-1.5 w-1.5 bg-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground tracking-tight">
                NexaFlow
              </h3>
            </div>
            <p className="text-foreground/45 text-sm leading-relaxed mb-6 max-w-xs font-light">
              Edge infrastructure for high-velocity teams. Deploy, observe, and scale under pressure.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/40 hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/35">
            © {new Date().getFullYear()} NexaFlow. All rights reserved.
          </p>
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/35">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
