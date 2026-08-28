"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import RestaurantLocations from "@/components/marketing/RestaurantLocations";

export default function LocationsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-16 sm:py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-3">
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white">
              AIRPORT BLVD AUSTIN
            </h1>
          </div>
        </section>

        <RestaurantLocations />
      </main>
      <Footer />
    </>
  );
}
