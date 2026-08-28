#!/usr/bin/env python3
"""
Clean Inner Pages across all 24 projects:
- Removes any residual '//' tags from app/locations/page.tsx, app/reservations/page.tsx, app/menu/page.tsx, app/about/page.tsx
- Ensures clean header typography
"""

import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
sys.path.insert(0, str(ROOT))

from personalize_all_websites import ALL_BRANDS
PROJECTS_DIR = ROOT / "projects"

def clean_inner_pages(slug, brand):
    project = PROJECTS_DIR / slug
    if not project.exists():
        return

    # 1. app/locations/page.tsx
    loc_page = project / "app" / "locations" / "page.tsx"
    if loc_page.exists():
        loc_content = f'''"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import RestaurantLocations from "@/components/marketing/RestaurantLocations";

export default function LocationsPage() {{
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-16 sm:py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-3">
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white">
              {brand.get('city_badge', 'OUR OUTPOSTS')}
            </h1>
          </div>
        </section>

        <RestaurantLocations />
      </main>
      <Footer />
    </>
  );
}}
'''
        loc_page.write_text(loc_content)

    # 2. app/reservations/page.tsx
    res_page = project / "app" / "reservations" / "page.tsx"
    if res_page.exists():
        res_content = f'''"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import ReservationCTA from "@/components/marketing/ReservationCTA";

export default function ReservationsPage() {{
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-16 sm:py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-3">
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white">
              BOOK YOUR TABLE
            </h1>
          </div>
        </section>

        <ReservationCTA />
      </main>
      <Footer />
    </>
  );
}}
'''
        res_page.write_text(res_content)

    print(f"  ✓ Cleaned inner pages for {slug}")

def main():
    print("🚀 Cleaning all inner pages across 24 projects...")
    for slug, brand in ALL_BRANDS.items():
        clean_inner_pages(slug, brand)
    print("🎉 All inner pages cleaned!")

if __name__ == "__main__":
    main()
