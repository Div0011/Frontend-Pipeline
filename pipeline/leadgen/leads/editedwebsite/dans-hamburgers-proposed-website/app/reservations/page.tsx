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
    guests: "4",
    location: "manchaca",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-bone">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="type-caption text-ember mb-4 font-bold">Group Dining &amp; Call Ahead</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-char">
                Table &amp; Group
                <br />
                <span className="text-ember">Requests</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed mb-12">
                While walk-ins are the heart of our diner, we gladly accommodate large family tables, breakfast meeting orders, and special gatherings across our 4 Austin &amp; Buda locations.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8 bg-bone-warm p-8 border border-bone-dark rounded-sm shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="type-caption text-xs text-char block mb-3 font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Katie Johnson"
                        className="w-full bg-bone border border-bone-dark p-3 type-body text-char focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="type-caption text-xs text-char block mb-3 font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="katie@example.com"
                        className="w-full bg-bone border border-bone-dark p-3 type-body text-char focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="type-caption text-xs text-char block mb-3 font-bold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(512) 443-6131"
                        className="w-full bg-bone border border-bone-dark p-3 type-body text-char focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="type-caption text-xs text-char block mb-3 font-bold">
                        Select Store Location
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-bone border border-bone-dark p-3 type-body text-char focus:border-ember focus:outline-none transition-colors"
                      >
                        <option value="manchaca">South Austin / Manchaca (5602 Manchaca Rd)</option>
                        <option value="north-lamar">North Lamar Blvd (5601 N Lamar Blvd)</option>
                        <option value="airport-blvd">Airport Blvd (6105 Airport Blvd)</option>
                        <option value="buda-tx">Buda Historic (101 Old San Antonio Rd)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="type-caption text-xs text-char block mb-3 font-bold">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-bone border border-bone-dark p-3 type-body text-char focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="type-caption text-xs text-char block mb-3 font-bold">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-bone border border-bone-dark p-3 type-body text-char focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="type-caption text-xs text-char block mb-3 font-bold">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-bone border border-bone-dark p-3 type-body text-char focus:border-ember focus:outline-none transition-colors"
                      >
                        {[2, 4, 6, 8, 10, 15, 20].map((n) => (
                          <option key={n} value={n}>
                            {n} Guests
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="type-caption text-xs text-char block mb-3 font-bold">
                      Special Requests / Advance Food Orders
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Let us know if you need advance breakfast boxes, large burger trays, or specific seating arrangements."
                      className="w-full bg-bone border border-bone-dark p-3 type-body text-char focus:border-ember focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-red py-4 px-10 text-xs font-bold"
                  >
                    Submit Group Request →
                  </button>
                </form>
              ) : (
                <div className="bg-bone-warm p-12 text-center space-y-6 border border-bone-dark rounded-sm shadow-xl">
                  <div className="w-16 h-16 bg-ember rounded-sm flex items-center justify-center text-bone mx-auto text-3xl font-bold">
                    ✓
                  </div>
                  <h3 className="type-display text-4xl text-char">Thank You, {formData.name}!</h3>
                  <p className="type-serif text-stone text-lg max-w-md mx-auto">
                    Your request for <b>{formData.guests} guests</b> on <b>{formData.date || "your requested date"}</b> has been received. Our team will verify and reach out via phone at <b>{formData.phone}</b>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline py-3 px-8 text-xs font-bold"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
