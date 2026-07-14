"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import ParallaxSection from "@/components/ParallaxSection";
import Magnetic from "@/components/Magnetic";
import DinerCard from "@/components/DinerCard";
import FamousDishes from "@/components/FamousDishes";
import { menuData, addOnsVeg, addOnsNonVeg } from "@/lib/menu";
import { MenuSection } from "@/components/MenuSection";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

export default function Sections() {
  const colorSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!colorSectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(colorSectionRef.current, {
        backgroundColor: "#1A1A1A",
        color: "#FAF6F0",
        ease: "none",
        scrollTrigger: {
          trigger: colorSectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, colorSectionRef);
    return () => ctx.revert();
  }, []);

  // Unrolling 3D "roll down" effect for sections
  useEffect(() => {
    const rollSections = document.querySelectorAll(".roll-section");
    const ctx = gsap.context(() => {
      rollSections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            rotateX: -15,
            scale: 0.94,
            transformOrigin: "top center",
            opacity: 0.8,
          },
          {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Philosophy */}
      <DinerCard>
        <div style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
          <section className="roll-section relative py-24 md:py-32 px-6 bg-brand-warm texture-grain">
          <ParallaxSection speed={0.3}>
            <div className="mx-auto max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <p
                      className="text-xs uppercase tracking-[0.3em] text-brand-yellow-dark mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      The Philosophy
                    </p>
                    <h2
                      className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-brand-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      CRAFTED FOR <br />
                      <span className="font-script normal-case text-brand-yellow-dark">
                        the curious
                      </span>
                    </h2>
                  </div>
                  <p
                    className="text-lg text-brand-text-muted leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Smash Guys was born from a simple obsession: the perfect smash
                    burger. We source high-quality ingredients, honour classic
                    techniques, and serve every plate with the drama of a cinema
                    premiere.
                  </p>
                </div>
              </div>
            </ParallaxSection>
          </section>
        </div>
      </DinerCard>

      {/* Famous Dishes Parallax Showcase */}
      <FamousDishes />

      {/* Featured Showcase - Horizontal Scroll Cards */}
      <DinerCard>
        <div style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
          <section className="roll-section relative py-16 md:py-24 px-6 bg-brand-cream overflow-hidden">
            <div className="mx-auto max-w-6xl mb-12">
              <div className="text-center">
                <p
                  className="text-xs uppercase tracking-[0.3em] text-brand-yellow-dark mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  crowd favorites
                </p>
                <h2
                  className="text-4xl md:text-5xl font-bold text-brand-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  SIGNATURE <span className="font-script normal-case text-brand-yellow-dark">smaash</span>
                </h2>
              </div>
            </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {[
            { emoji: "🍔", title: "OG Smash", desc: "Double smash patties, double american cheese, pickles, white onions, mustard", price: "₹470" },
            { emoji: "🍟", title: "Truffle Fries", desc: "Truffle mayo, parmesan, parsley", price: "₹338" },
            { emoji: "🍗", title: "Nashville Chicken", desc: "Nashville spiced fried chicken dipped in hot oil, home-made chilli sofrito", price: "₹370" },
            { emoji: "🥤", title: "Salted Pistachio Shake", desc: "Rich, nutty, and creamy", price: "₹320" },
            { emoji: "🍰", title: "Old Monk Mousse", desc: "Whipped custard, cocoa dust", price: "₹350" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 snap-center group py-2"
            >
              <TiltCard className="h-full">
                <div className="relative h-80 rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000] flex flex-col items-center justify-center text-center overflow-hidden">
                  <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden flex items-center justify-center shrink-0 bg-brand-cream shadow-[4px_4px_0px_#000] mb-4 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                    {item.title === "Truffle Fries" ? (
                      <img src="/truffle-fries.png" alt="Truffle Fries" className="w-full h-full object-cover scale-110" />
                    ) : (
                      <span className="text-5xl select-none">{item.emoji}</span>
                    )}
                  </div>
                  <h3
                    className="text-xl font-bold text-brand-black mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-brand-text-muted mb-4 line-clamp-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.desc}
                  </p>
                  <p
                    className="text-lg font-bold text-brand-yellow-dark"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.price}
                  </p>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-brand-yellow-dark text-xs">+</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>
        </div>
      </DinerCard>

      {/* Scroll Color Transition */}
      <div style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
        <section ref={colorSectionRef} className="roll-section relative py-32 md:py-48 px-6 bg-brand-black text-brand-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10 checkerboard" />
        <div className="mx-auto max-w-6xl relative z-10">
          <Reveal>
            <div className="text-center">
              <p
                className="text-xs uppercase tracking-[0.3em] text-brand-yellow mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Experience
              </p>
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                MORE THAN A <span className="text-brand-yellow">MEAL</span>
              </h2>
              <p
                className="text-lg md:text-xl text-brand-cream/60 max-w-2xl mx-auto mt-8 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Step into a space where flavour meets theatre. Our kitchen is open, our music is curated, and every detail is designed to make you feel something.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      </div>

      {/* Menu */}
      <div style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
        <section id="menu" className="roll-section relative py-16 md:py-24 px-6 bg-brand-cream">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <p
                className="text-xs uppercase tracking-[0.3em] text-brand-yellow-dark mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Menu
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                FULL <span className="text-brand-yellow-dark">MENU</span>
              </h2>
              <div className="mt-4">
                <a
                  href="https://drive.google.com/file/d/1Tck9XPSUPibqLnppUua0VDc-z7HtMNcx/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-brand-yellow-dark hover:text-brand-black transition-colors duration-300 font-semibold border-b border-brand-yellow-dark/45 pb-1 inline-block"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  View Original Print Menu PDF ↗
                </a>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            {menuData.map((category) => (
              <MenuSection key={category.title} category={category} />
            ))}
          </div>

          {/* Add-Ons */}
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <Reveal>
              <div className="rounded-3xl border border-brand-border bg-white p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-500">
                <h3
                  className="text-2xl font-bold text-brand-black mb-6 uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Add-Ons — Veg
                </h3>
                <div className="space-y-0">
                  {addOnsVeg.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-3 border-b border-brand-border last:border-b-0"
                    >
                      <span
                        className="text-sm text-brand-text"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="text-sm font-semibold text-brand-black"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-3xl border border-brand-border bg-white p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-500">
                <h3
                  className="text-2xl font-bold text-brand-black mb-6 uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Add-Ons — Non Veg
                </h3>
                <div className="space-y-0">
                  {addOnsNonVeg.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-3 border-b border-brand-border last:border-b-0"
                    >
                      <span
                        className="text-sm text-brand-text"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="text-sm font-semibold text-brand-black"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      </div>

      {/* Locations */}
      <div style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
        <section id="locations" className="roll-section relative py-24 md:py-32 px-6 bg-brand-warm texture-grain">
        <ParallaxSection speed={0.2}>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="text-center mb-16">
                <p
                  className="text-xs uppercase tracking-[0.3em] text-brand-yellow-dark mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Visit Us
                </p>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  FIND YOUR <span className="font-script normal-case text-brand-yellow-dark">smash</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Indiranagar",
                  address: "12th Main, Indiranagar, Bangalore",
                  hours: "11:00 AM — 11:00 PM",
                },
                {
                  name: "Bellandur",
                  address: "Ecoworld, Bellandur, Bangalore",
                  hours: "11:00 AM — 11:00 PM",
                },
                {
                  name: "RMV 2nd Stage",
                  address: "80ft Road, RMV 2nd Stage, Bangalore",
                  hours: "11:00 AM — 11:00 PM",
                },
                {
                  name: "Whitefield",
                  address: "Miraya Rose, Whitefield, Bangalore",
                  hours: "11:00 AM — 11:00 PM",
                },
              ].map((location) => (
                <Reveal key={location.name}>
                  <div className="rounded-3xl border border-brand-border bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-500 group ">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">📍</div>
                    <h3
                      className="text-2xl font-bold text-brand-black mb-2 uppercase tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {location.name}
                    </h3>
                    <p
                      className="text-sm text-brand-text-muted mb-1"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {location.address}
                    </p>
                    <p
                      className="text-sm text-brand-text-muted"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {location.hours}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </ParallaxSection>
      </section>
      </div>

      {/* Testimonials */}
      <section className="relative py-24 md:py-32 px-6 bg-brand-cream">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center mb-16">
              <p
                className="text-xs uppercase tracking-[0.3em] text-brand-yellow-dark mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Testimonials
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-brand-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                WHAT THEY <span className="font-script normal-case text-brand-yellow-dark">say</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The best smash burger I&apos;ve had in Bangalore. The atmosphere is unmatched.",
                author: "Ananya R.",
              },
              {
                quote:
                  "Cinematic dining with real flavour. The mac and cheese is elite.",
                author: "Rahul S.",
              },
              {
                quote:
                  "Finally, a burger joint that takes the experience as seriously as the food.",
                author: "Priya M.",
              },
            ].map((t) => (
              <Reveal key={t.author}>
                <div className="rounded-3xl border border-brand-border bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-500 group ">
                  <div className="text-4xl mb-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">“</div>
                  <p
                    className="text-lg text-brand-text leading-relaxed mb-6 italic"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t.quote}
                  </p>
                  <p
                    className="text-sm text-brand-yellow-dark font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    — {t.author}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <DinerCard>
        <div style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
          <section id="order" className="roll-section relative py-24 md:py-32 px-6 bg-brand-black text-brand-cream">
        <div className="absolute inset-0 opacity-20 checkerboard" />
        <ParallaxSection speed={0.15}>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
              <p
                className="text-xs uppercase tracking-[0.3em] text-brand-yellow mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready?
              </p>
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                TASTE THE <span className="text-brand-yellow">PREMIERE</span>
              </h2>
              <p
                className="text-lg text-brand-cream/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Order online, book a table, or walk in. Every Smash Guys visit is
                designed to be unforgettable.
              </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Magnetic strength={0.2}>
                  <a
                    href="https://smashguys.in/order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-brand-yellow px-10 py-4 text-sm font-semibold uppercase tracking-widest text-brand-black transition-all duration-300 hover:bg-brand-yellow-light hover:shadow-[0_0_35px_rgba(255,200,0,0.45)]  inline-block"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Order Now
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a
                    href="mailto:mail@popoventures.com"
                    className="rounded-full border-2 border-brand-cream/60 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-brand-cream transition-all duration-300 hover:bg-brand-cream hover:text-brand-black inline-block"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Contact Us
                  </a>
                </Magnetic>
              </div>
            </div>
          </ParallaxSection>
      </section>
      </div>
      </DinerCard>
    </>
  );
}
