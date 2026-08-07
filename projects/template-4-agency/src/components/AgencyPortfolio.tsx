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

export default function AgencyPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const panels = gsap.utils.toArray(".panel-slide");
      const numPanels = panels.length;

      // Translate the container horizontally based on the document vertical scroll.
      // snap: 1 / (numPanels - 1) snaps cleanly panel-by-panel.
      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (numPanels - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.05,
            ease: "power2.inOut",
          },
        },
      });

      // Implement subtle fade-in / stagger triggers for content within each panel on arrival.
      panels.forEach((panel: any, index) => {
        gsap.fromTo(
          panel.querySelectorAll(".stagger-item"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: document.body,
              start: () => {
                const totalScroll = ScrollTrigger.maxScroll(window);
                const step = totalScroll / (numPanels - 1);
                return `${step * index - step * 0.4}px`;
              },
              end: () => {
                const totalScroll = ScrollTrigger.maxScroll(window);
                const step = totalScroll / (numPanels - 1);
                return `${step * index + step * 0.4}px`;
              },
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 flex flex-row w-max h-screen items-center overflow-hidden z-10"
    >
      <div className="panel-slide w-screen h-screen shrink-0 bg-transparent">
        <Hero />
      </div>
      <div className="panel-slide w-screen h-screen shrink-0 border-l border-white/5 bg-transparent">
        <About />
      </div>
      <div className="panel-slide w-screen h-screen shrink-0 border-l border-white/5 bg-transparent">
        <Services />
      </div>
      <div className="panel-slide w-screen h-screen shrink-0 border-l border-white/5 bg-transparent">
        <ProjectGrid />
      </div>
      <div className="panel-slide w-screen h-screen shrink-0 border-l border-white/5 bg-transparent flex flex-col justify-between py-12">
        <div className="flex-1 flex flex-col justify-center bg-transparent">
          <ClientsMarquee />
          <ContactCTA />
        </div>
        <Footer />
      </div>
    </div>
  );
}
