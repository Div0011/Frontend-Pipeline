"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const CASE_IMAGE =
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=2000&q=90";
const DETAIL_A =
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=90";
const DETAIL_B =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=90";

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.12, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        copyRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: copyRef.current,
            start: "top 88%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-case-detail]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="case-study"
      ref={sectionRef}
      className="relative z-20 overflow-hidden border-t border-[#c9a96e]/15 bg-[#080706] py-24 md:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 projector-beam opacity-60" />

      <div className="gutter-padding mx-auto max-w-[1400px]">
        <div ref={titleRef} className="mb-14 max-w-4xl md:mb-20">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]">
            Case Study // Feature
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-[#ebe6dc] md:text-6xl lg:text-7xl">
            The Making of
            <br />
            <em className="not-italic text-[#c9a96e]">Echoes of Silence</em>
          </h2>
        </div>

        {/* Full-bleed still */}
        <div
          ref={imageRef}
          className="relative h-[58vh] min-h-[380px] w-full overflow-hidden border border-[#c9a96e]/20 md:h-[72vh]"
        >
          <Image
            src={CASE_IMAGE}
            alt="Echoes of Silence — behind the scenes still"
            fill
            className="object-cover brightness-[0.85] contrast-110"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 md:bottom-10 md:left-10 md:right-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">
              Production Still — 16mm
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              14 months · 3 continents
            </span>
          </div>
        </div>

        <div
          ref={copyRef}
          className="mx-auto mt-16 grid max-w-5xl gap-12 md:mt-24 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">
              Synopsis
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-xl font-light leading-relaxed text-[#ebe6dc]/85 md:text-2xl lg:text-[1.65rem]">
              A meditation on absence and resonance. Shot on 16mm across three
              continents, the film follows an aging sound engineer through the
              spaces between signal and silence. Production design strips color
              to foreground texture, grain, and the weight of air.
            </p>
          </div>
        </div>

        {/* Dual detail frames */}
        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-2">
          <figure data-case-detail className="relative aspect-[4/5] overflow-hidden border border-white/10">
            <Image
              src={DETAIL_A}
              alt="Camera crew in low light"
              fill
              className="object-cover brightness-90 contrast-125"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
              Night unit — Iceland
            </figcaption>
          </figure>
          <figure
            data-case-detail
            className="relative aspect-[4/5] overflow-hidden border border-white/10 md:mt-16"
          >
            <Image
              src={DETAIL_B}
              alt="Empty cinema seats"
              fill
              className="object-cover brightness-90 contrast-125"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
              Screening vault — rough cut
            </figcaption>
          </figure>
        </div>

        <div
          data-case-detail
          className="mt-16 grid gap-8 border-t border-[#c9a96e]/20 pt-12 md:grid-cols-3"
        >
          {[
            { label: "Format", value: "16mm · Digital Intermediate" },
            { label: "Aspect", value: "2.39:1 Anamorphic" },
            { label: "Sound", value: "Dolby Atmos · Practical Rooms" },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">
                {item.label}
              </p>
              <p className="mt-2 font-display text-xl uppercase tracking-tight text-[#ebe6dc]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
