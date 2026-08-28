#!/usr/bin/env python3
"""
Roll out Full-Screen Minimalist Footer of the same color as the doodles across all 24 projects:
- Matches the exact accent color of the doodles (primary)
- Exactly full-screen (100svh), doesn't exceed screen area
- Minimalist and clean: Only Website Name, Navigation Options, Contact Info, Hours, and Top Scroll
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def generate_fullscreen_footer(slug: str, cfg: dict) -> str:
    name = cfg.get("name", slug.title())
    short_name = cfg.get("short_name", name.upper())
    primary = cfg.get("primary", "#FF0036")
    text_on_primary = cfg.get("text_on_primary", "#FFFFFF")
    city = cfg.get("city", "Global")
    outposts = cfg.get("outposts", [])
    
    first_outpost = outposts[0] if len(outposts) > 0 else {
        "name": f"{name} Flagship",
        "address": f"100ft Road, {city}",
        "phone": "+1 (555) 019-2834",
    }
    
    # Border & hover opacity styling depending on background brightness
    border_color = "rgba(0,0,0,0.15)" if text_on_primary == "#000000" else "rgba(255,255,255,0.2)"
    subtext_color = "rgba(0,0,0,0.7)" if text_on_primary == "#000000" else "rgba(255,255,255,0.7)"
    faint_color = "rgba(0,0,0,0.5)" if text_on_primary == "#000000" else "rgba(255,255,255,0.5)"
    btn_border = "border-black/30 hover:bg-black hover:text-white" if text_on_primary == "#000000" else "border-white/30 hover:bg-white hover:text-black"

    return f"""\"use client\";

import React from "react";
import Link from "next/link";

export default function Footer() {{
  const scrollToTop = () => {{
    if (typeof window !== "undefined") {{
      window.scrollTo({{ top: 0, behavior: "smooth" }});
    }}
  }};

  return (
    <footer
      style={{{{ backgroundColor: "{primary}", color: "{text_on_primary}" }}}}
      className="h-[100svh] min-h-[100svh] w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 relative z-10 select-none overflow-hidden"
    >
      {{/* Top Bar: Navigation Options & Outpost City */}}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-start gap-8 pb-8"
        style={{{{ borderBottom: "1px solid {border_color}" }}}}
      >
        {{/* Navigation Options */}}
        <nav className="flex flex-wrap gap-6 sm:gap-10 font-mono text-sm font-bold uppercase tracking-wider">
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

        {{/* Hours */}}
        <div
          className="font-mono text-xs sm:text-right space-y-1"
          style={{{{ color: "{subtext_color}" }}}}
        >
          <p className="font-bold">OPEN DAILY: 11:30 AM – 11:30 PM</p>
          <p>{city.upper()} OUTPOSTS</p>
        </div>
      </div>

      {{/* Center: Grand Monumental Brand Typography */}}
      <div className="my-auto py-8">
        <h2 className="type-display text-[13vw] leading-none font-black uppercase tracking-tight select-none">
          {short_name}
        </h2>
      </div>

      {{/* Bottom Bar: Contact Info & Back to Top */}}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pt-8 font-mono text-xs font-bold"
        style={{{{ borderTop: "1px solid {border_color}" }}}}
      >
        {{/* Contact Info */}}
        <div className="space-y-1" style={{{{ color: "{subtext_color}" }}}}>
          <p className="font-extrabold text-sm" style={{{{ color: "{text_on_primary}" }}}}>
            {first_outpost['phone']}
          </p>
          <p>{first_outpost['address']}</p>
          <p>contact@{slug.replace('-', '')}.com</p>
        </div>

        {{/* Copyright & Scroll to Top */}}
        <div className="flex items-center justify-between sm:justify-end gap-8">
          <p className="font-medium" style={{{{ color: "{faint_color}" }}}}>
            © {{new Date().getFullYear()}} {name}.
          </p>
          <button
            type="button"
            onClick={{scrollToTop}}
            className="px-5 py-2.5 rounded-full border {btn_border} transition-all uppercase tracking-wider font-extrabold flex items-center gap-2 active:scale-95 shadow-lg"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}}
"""

def main():
    print("🚀 Rolling out full-screen minimalist doodle-color footers across all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue
        
        footer_code = generate_fullscreen_footer(slug, cfg)
        footer_path = os.path.join(project_dir, "components", "marketing", "Footer.tsx")
        with open(footer_path, "w", encoding="utf-8") as f:
            f.write(footer_code)
        print(f"✓ Generated full-screen doodle footer for {slug}")

    print("\n🎉 Master rollout of full-screen minimalist footers complete!")

if __name__ == "__main__":
    main()
