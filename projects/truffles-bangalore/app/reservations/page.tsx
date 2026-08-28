"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import ReservationCTA from "@/components/marketing/ReservationCTA";

export default function ReservationsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10">
        <section className="py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest font-bold block" style={{ color: "#F5A623" }}>
              TRUFFLES // VIP TABLE RESERVATIONS
            </span>
            <h1 className="type-display text-5xl md:text-7xl font-extrabold text-white">
              RESERVE YOUR TABLE
            </h1>
            <p className="font-mono text-xs text-stone-300 max-w-xl">
              Secure front-row seating and craft dining in Bengaluru.
            </p>
          </div>
        </section>

        <ReservationCTA />
      </main>
      <Footer />
    </>
  );
}
