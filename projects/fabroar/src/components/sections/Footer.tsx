"use client";

import Link from "next/link";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { ALL_DOODLE_COMPONENTS } from "@/components/ui/DoodleIcons";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const DARK_DOODLE_COLORS = ["#F5F0E8", "#C4A77D", "#E07A60", "#D4654A"];
  const LIGHT_DOODLE_COLORS = ["#0F0F0F", "#141110", "#D4654A", "#8C7047"];
  const DOODLE_COLORS = theme === "light" ? LIGHT_DOODLE_COLORS : DARK_DOODLE_COLORS;

  // Generate a fixed dense grid of watermark doodles for the footer background
  const footerWatermarks = Array.from({ length: 28 }).map((_, i) => {
    const Component = ALL_DOODLE_COMPONENTS[i % ALL_DOODLE_COMPONENTS.length];
    const color = DOODLE_COLORS[i % DOODLE_COLORS.length];
    const size = 42 + ((i * 11) % 40); // 42px to 82px
    const rotation = ((i * 29) % 90) - 45; // -45deg to +45deg
    const top = 4 + Math.floor(i / 7) * 23 + ((i * 7) % 10); // grid rows
    const left = (i % 7) * 14 + ((i * 5) % 8) + 1; // grid cols
    const opacity = 0.20 + ((i % 3) * 0.05); // 0.20 to 0.30 opacity

    return {
      id: i,
      Component,
      size,
      rotation,
      top,
      left,
      opacity,
      color,
    };
  });

  return (
    <footer
      className="section-footer relative overflow-hidden bg-[var(--color-surface)] text-[var(--color-ink)] pt-6 pb-2"
    >
      {/* Dense Doodled Watermark Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
        {footerWatermarks.map((item) => {
          const IconComp = item.Component;
          return (
            <div
              key={item.id}
              className="absolute transition-opacity select-none"
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                transform: `rotate(${item.rotation}deg)`,
                opacity: item.opacity,
                color: item.color,
              }}
            >
              <IconComp size={item.size} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      <div className="container-custom pt-6 md:pt-10 pb-2 relative z-10">
        {/* Giant brand wordmark */}
        <div className="mb-8 overflow-hidden">
          <Link
            href="/"
            className="font-display block leading-none tracking-tight transition-colors duration-500 text-[var(--color-ink)] hover:text-[#D4654A]"
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
              letterSpacing: "-0.04em",
              opacity: 0.95,
            }}
          >
            FABROAR
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-ui font-semibold text-lg tracking-[0.2em] uppercase transition-colors duration-300 text-[var(--color-ink)]"
            >
              Fabroar
            </Link>
            <p className="mt-3 font-body max-w-sm leading-relaxed text-[var(--color-ink)]/85 text-sm">
              Graphic printed pure cotton T-shirts for men and women.
              Designed for those who have something to say.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://www.instagram.com/fabroarstore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center transition-all duration-300 border border-[#D4654A]/40 text-[var(--color-ink)] hover:border-[#D4654A] hover:bg-[#D4654A] hover:text-[#F5F0E8] rounded-sm"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61566816764337"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center transition-all duration-300 border border-[#D4654A]/40 text-[var(--color-ink)] hover:border-[#D4654A] hover:bg-[#D4654A] hover:text-[#F5F0E8] rounded-sm"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-ui text-[10px] tracking-[0.3em] uppercase mb-4 text-[var(--color-sand)]">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/men", label: "Men" },
                { href: "/women", label: "Women" },
                { href: "/customize", label: "Custom Studio" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm group flex items-center gap-2 text-[var(--color-ink)]/80 hover:text-[#D4654A] transition-colors duration-300"
                  >
                    <span>{label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#D4654A]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div className="md:col-span-2">
            <h4 className="font-ui text-[10px] tracking-[0.3em] uppercase mb-4 text-[var(--color-sand)]">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/contact", label: "Contact" },
                { href: "/about", label: "About" },
                { href: "/legal/privacy", label: "Privacy" },
                { href: "/legal/returns", label: "Returns" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-[var(--color-ink)]/80 hover:text-[#D4654A] transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — Compact padding near page end */}
        <div className="mt-8 pt-4 pb-1 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-[#D4654A]/20">
          <p className="font-body text-xs text-[var(--color-sand)]">
            © {new Date().getFullYear()} Fabroar. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { href: "/legal/privacy", label: "Privacy" },
              { href: "/legal/returns", label: "Returns" },
              { href: "/legal/terms", label: "Terms" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-xs text-[var(--color-sand)] hover:text-[#D4654A] transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
