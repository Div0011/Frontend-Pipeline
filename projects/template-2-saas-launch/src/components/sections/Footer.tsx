"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Integrations"],
  Resources: ["Documentation", "API Reference", "Guides", "Blog"],
  Company: ["About", "Careers", "Contact", "Partners"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="py-16 border-t border-foreground/5 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2">
            <h3 className="font-display text-xl font-semibold text-foreground tracking-tight mb-4">NexaFlow</h3>
            <p className="text-foreground/50 text-sm leading-relaxed mb-6 max-w-xs">
              Edge infrastructure for high-velocity teams. Deploy, observe, and scale at the edge.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono text-sm font-medium text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/50 hover:text-foreground transition-colors inline-flex items-center gap-1 group"
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
        <div className="pt-8 border-t border-foreground/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/40">
            &copy; {new Date().getFullYear()} NexaFlow. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-foreground/40">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
