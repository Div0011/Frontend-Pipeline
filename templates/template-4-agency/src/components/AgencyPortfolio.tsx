"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./hero";
import About from "./about";
import Services from "./services";
import ProjectGrid from "./project-grid";
import ClientsMarquee from "./clients-marquee";
import ContactCTA from "./contact-cta";
import Footer from "./footer";
import { DURATION, EASE } from "@/lib/motion";

export default function AgencyPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const panels = gsap.utils.toArray<HTMLElement>(".panel-slide");
      const numPanels = panels.length;

      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (numPanels - 1),
            duration: { min: DURATION.snapMin, max: DURATION.snapMax },
            delay: 0.04,
            ease: EASE.inOut,
          },
        },
      });

      panels.forEach((panel, index) => {
        const items = panel.querySelectorAll(".stagger-item");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.09,
            ease: EASE.cinematic,
            scrollTrigger: {
              trigger: document.body,
              start: () => {
                const totalScroll = ScrollTrigger.maxScroll(window);
                const step = totalScroll / (numPanels - 1);
                return `${step * index - step * 0.35}px`;
              },
              end: () => {
                const totalScroll = ScrollTrigger.maxScroll(window);
                const step = totalScroll / (numPanels - 1);
                return `${step * index + step * 0.35}px`;
              },
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 240);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-10 flex h-screen w-max flex-row items-center overflow-hidden"
    >
      <div className="panel-slide h-screen w-screen shrink-0 bg-transparent">
        <Hero />
      </div>
      <div className="panel-slide h-screen w-screen shrink-0 bg-transparent">
        <About />
      </div>
      <div className="panel-slide h-screen w-screen shrink-0 bg-transparent">
        <Services />
      </div>
      <div className="panel-slide h-screen w-screen shrink-0 bg-transparent">
        <ProjectGrid />
      </div>
      <div className="panel-slide flex h-screen w-screen shrink-0 flex-col justify-between bg-transparent py-10 md:py-14">
        <div className="flex flex-1 flex-col justify-center bg-transparent">
          <ClientsMarquee />
          <ContactCTA />
        </div>
        <Footer />
      </div>
    </div>
  );
}
