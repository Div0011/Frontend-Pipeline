"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { historyMilestones } from "@/lib/data";

export default function TimelineSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) return;

    const currentProgress = slider.scrollLeft / maxScroll;
    setProgress(currentProgress);

    const track = trackRef.current;
    const handle = handleRef.current;
    if (track && handle) {
      const trackWidth = track.clientWidth - handle.clientWidth;
      gsap.to(handle, {
        x: currentProgress * trackWidth,
        duration: 0.1,
        ease: "power1.out",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    setIsDragging(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const slider = sliderRef.current;
    if (!slider) return;

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
    updateProgress();
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    setTimeout(updateProgress, 300);

    return () => {
      slider?.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section ref={containerRef} className="section-cinematic bg-bone-warm overflow-hidden border-b border-bone-dark">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <p className="type-caption text-ember mb-6 font-bold">50+ Years in Austin</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl mb-8 text-char">
              The Dan&apos;s Hamburgers Journey
            </h2>
          </div>
          <p className="type-body text-stone max-w-sm mt-4 md:mt-0">
            Drag across our timeline to explore how a humble South Congress root beer stand became an Austin icon.
          </p>
        </div>

        {/* Draggable Slider */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          className={`flex gap-8 overflow-x-scroll scrollbar-none select-none py-4 cursor-grab ${
            isDragging ? "cursor-grabbing" : ""
          }`}
        >
          {historyMilestones.map((event, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[300px] md:w-[450px] bg-bone border border-bone-dark p-6 md:p-8 rounded-sm space-y-6 shadow-md transition-all duration-700"
              style={{
                filter: isDragging ? "blur(1px)" : "blur(0px)",
                transform: isDragging ? "scale(0.99)" : "scale(1)",
              }}
            >
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-smoke">
                <span>{event.chapter}</span>
                <span className="text-ember font-bold text-lg">{event.year}</span>
              </div>

              <div className="aspect-[16/10] relative overflow-hidden rounded-sm border border-bone-dark">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover editorial-image"
                  sizes="(max-width: 768px) 100vw, 450px"
                  draggable={false}
                />
              </div>

              <div className="space-y-3">
                <h3 className="type-display text-2xl md:text-3xl text-char">
                  {event.title}
                </h3>
                <p className="type-serif text-lg text-ember font-medium italic">
                  {event.subtitle}
                </p>
                <p className="type-body text-stone text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Track */}
        <div className="mt-12 flex items-center justify-between gap-8">
          <div
            ref={trackRef}
            className="h-[2px] bg-char/10 flex-grow relative rounded-full overflow-hidden"
          >
            <div
              ref={handleRef}
              className="absolute top-0 left-0 w-24 h-full bg-ember rounded-full transition-transform duration-300"
            />
          </div>
          <div className="font-mono text-[10px] text-smoke tracking-widest flex-shrink-0">
            <span>{Math.round(progress * 100)}% EXPLORED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
