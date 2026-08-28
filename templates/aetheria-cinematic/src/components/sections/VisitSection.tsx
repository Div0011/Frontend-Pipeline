"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM — Gallery Opening");
  const [ticketCount, setTicketCount] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !leftCol || !rightCol || !isClient) return;

    const ctx = gsap.context(() => {
      const leftItems = leftCol.querySelectorAll(".visit-info-item");
      const rightItems = rightCol.querySelectorAll(".visit-cta-item");

      gsap.fromTo(
        leftItems,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 60%",
            scrub: false,
          },
        }
      );

      gsap.fromTo(
        rightItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 55%",
            scrub: false,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isClient]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingModalOpen(false);
    }, 4000);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="visit"
        className="relative py-section-desktop px-[8vw] bg-void border-b border-stone/10"
      >
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Left Column — Practical Information */}
            <div ref={leftColRef} className="lg:col-span-5 space-y-10">
              <div className="visit-info-item">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-amber mb-5">
                  Plan Your Visit
                </p>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-[-0.02em] text-bone">
                  Experience the gallery in person
                </h2>
              </div>

              <div className="space-y-8">
                {/* Hours */}
                <div className="visit-info-item border-t border-stone/20 pt-6">
                  <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-bone mb-4">
                    Hours
                  </h3>
                  <div className="space-y-1.5 font-body text-base md:text-lg text-bone-dim font-light">
                    <p>Tuesday – Sunday: 10:00 – 18:00</p>
                    <p>Thursday: 10:00 – 21:00 <span className="text-amber/80">(Twilight Hours)</span></p>
                    <p>Monday: Closed for Preservation</p>
                  </div>
                </div>

                {/* Location */}
                <div className="visit-info-item border-t border-stone/20 pt-6">
                  <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-bone mb-4">
                    Location
                  </h3>
                  <address className="font-body text-base md:text-lg text-bone-dim font-light not-italic space-y-1">
                    <p>1247 Fifth Avenue</p>
                    <p>New York, NY 10128</p>
                  </address>
                </div>

                {/* Admission */}
                <div className="visit-info-item border-t border-stone/20 pt-6">
                  <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-bone mb-4">
                    Admission
                  </h3>
                  <div className="space-y-1.5 font-body text-base md:text-lg text-bone-dim font-light">
                    <p>General: $25</p>
                    <p>Members &amp; Students: Free</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Quote & CTAs */}
            <div ref={rightColRef} className="lg:col-span-7 flex flex-col justify-center lg:pl-12">
              <div className="visit-cta-item max-w-xl">
                <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] tracking-[-0.01em] text-bone/85 mb-12">
                  "A museum should be a place where you lose yourself and find everything."
                </blockquote>

                <div className="visit-cta-item flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="group relative inline-flex items-center justify-center px-10 py-5 bg-amber text-void font-sans text-xs uppercase tracking-[0.25em] hover:bg-bone transition-colors duration-500 rounded-sm font-semibold shadow-lg overflow-hidden"
                    data-cursor-text
                  >
                    <span className="relative z-10">Reserve Tickets</span>
                    <div className="absolute inset-0 bg-amber/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="inline-flex items-center justify-center px-10 py-5 border border-stone/60 text-bone font-sans text-xs uppercase tracking-[0.25em] hover:border-amber hover:text-amber transition-all duration-500 rounded-sm"
                    data-cursor-text
                  >
                    Become a Member
                  </button>
                </div>

                <p className="visit-cta-item font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim mt-8">
                  Same-day entry available · Limited capacity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Ticket Booking Modal */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-[95] bg-void/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setBookingModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Reserve entry pass"
        >
          <div
            className="relative max-w-xl w-full bg-charcoal/90 border border-white/10 p-8 md:p-10 rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-6 right-6 font-mono text-xs uppercase tracking-widest text-bone-dim hover:text-amber transition-colors"
              data-cursor-text
            >
              Close
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-10 space-y-5 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-14 h-14 rounded-full bg-amber/15 border border-amber/60 text-amber flex items-center justify-center mx-auto text-2xl font-light">
                  ✓
                </div>
                <h3 className="font-display text-4xl font-light text-bone">Reservation Confirmed</h3>
                <p className="font-mono text-xs text-amber tracking-[0.25em] uppercase">
                  Pass #ATH-2024-{Math.floor(1000 + Math.random() * 9000)}
                </p>
                <p className="font-body text-bone-dim text-sm max-w-sm mx-auto font-light leading-relaxed">
                  {ticketCount} General Admission pass{ticketCount > 1 ? "es" : ""} reserved for {selectedTimeSlot}. Your access badge has been logged.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-7">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
                    Timed Access Pass
                  </span>
                  <h3 className="font-display text-4xl font-light text-bone mt-2">
                    Reserve Entry Pass
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-[0.2em] text-bone-dim block">
                    Select Entry Time Slot
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full bg-void border border-stone/40 text-bone p-3.5 font-mono text-xs rounded-sm focus:border-amber outline-none transition-colors"
                  >
                    <option>10:00 AM — Gallery Opening</option>
                    <option>02:00 PM — Afternoon Light Tour</option>
                    <option>06:00 PM — Twilight Curator Walk (Thursday)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="font-sans text-xs uppercase tracking-[0.2em] text-bone-dim block">
                    Number of Passes ($25 / person)
                  </label>
                  <div className="flex items-center gap-5">
                    <button
                      type="button"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="w-11 h-11 border border-stone/40 text-bone font-mono text-lg rounded-sm hover:border-amber transition-colors"
                    >
                      −
                    </button>
                    <span className="font-mono text-xl text-amber w-10 text-center">{ticketCount}</span>
                    <button
                      type="button"
                      onClick={() => setTicketCount(ticketCount + 1)}
                      className="w-11 h-11 border border-stone/40 text-bone font-mono text-lg rounded-sm hover:border-amber transition-colors"
                    >
                      +
                    </button>
                    <span className="font-mono text-xs text-bone-dim ml-auto">
                      Total: ${ticketCount * 25}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4.5 bg-amber text-void font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-bone transition-colors rounded-sm mt-2"
                >
                  Confirm Entry Pass (${ticketCount * 25})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
