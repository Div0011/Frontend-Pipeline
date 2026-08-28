"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    location: "indiranagar",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Reservation request submitted. We will confirm shortly.");
  };

  return (
    <>
      <Nav />
      <main className="pt-24">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="type-caption text-gold mb-4">Reservations</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
                Reserve your
                <br />
                <span className="text-gold">table</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed mb-12">
                Secure your spot for an unforgettable dining experience. We look forward to welcoming you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="type-caption text-xs text-ink block mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/20 py-3 type-body text-ink focus:border-gold focus:outline-none transition-colors duration-500"
                    />
                  </div>
                  <div>
                    <label className="type-caption text-xs text-ink block mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/20 py-3 type-body text-ink focus:border-gold focus:outline-none transition-colors duration-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="type-caption text-xs text-ink block mb-3">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/20 py-3 type-body text-ink focus:border-gold focus:outline-none transition-colors duration-500"
                    />
                  </div>
                  <div>
                    <label className="type-caption text-xs text-ink block mb-3">
                      Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/20 py-3 type-body text-ink focus:border-gold focus:outline-none transition-colors duration-500"
                    >
                      <option value="indiranagar">Indiranagar</option>
                      <option value="bellandur">Bellandur</option>
                      <option value="rmv">RMV Extension</option>
                      <option value="whitefield">Whitefield</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="type-caption text-xs text-ink block mb-3">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/20 py-3 type-body text-ink focus:border-gold focus:outline-none transition-colors duration-500"
                    />
                  </div>
                  <div>
                    <label className="type-caption text-xs text-ink block mb-3">
                      Time
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/20 py-3 type-body text-ink focus:border-gold focus:outline-none transition-colors duration-500"
                    />
                  </div>
                  <div>
                    <label className="type-caption text-xs text-ink block mb-3">
                      Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/20 py-3 type-body text-ink focus:border-gold focus:outline-none transition-colors duration-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="type-caption text-xs text-ink block mb-3">
                    Special Requests
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-ink/20 py-3 type-body text-ink focus:border-gold focus:outline-none transition-colors duration-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-ink text-cream px-10 py-5 type-caption text-xs hover:bg-ink-light transition-colors duration-500"
                >
                  Confirm Reservation
                  <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
