"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import ReservationCTA from "@/components/marketing/ReservationCTA";

export default function ReservationsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-16 sm:py-20 bg-transparent text-black border-b border-[#C68A14]/25 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-3">
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-black">
              BOOK YOUR TABLE
            </h1>
          </div>
        </section>

        <ReservationCTA />
      </main>
      <Footer />
    </>
  );
}
