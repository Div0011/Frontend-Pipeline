"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const timelineEvents = [
  {
    year: "2024",
    chapter: "CHAPTER 01",
    title: "The Bangalore Lab",
    subtitle: "Precision in every patty",
    description: "Opening our first experimental kitchen. Setting the baseline griddle temperature to exactly 230°C and defining the physics of the smash.",
    image: "/hero-burger.png",
  },
  {
    year: "2025",
    chapter: "CHAPTER 02",
    title: "Visual Frames",
    subtitle: "Cuisine meets cinema",
    description: "Collaborating with local fashion filmmakers to document our process. Every campaign frame is treated with the care of an editorial spread.",
    image: "/truffle-fries.png",
  },
  {
    year: "2025",
    chapter: "CHAPTER 03",
    title: "Indiranagar Atelier",
    subtitle: "The flagship space",
    description: "Opening our main physical dining space on 12th Main Indiranagar. A sanctuary of concrete, muted gold, and industrial styling.",
    image: "/matcha-special.png",
  },
  {
    year: "2026",
    chapter: "CHAPTER 04",
    title: "Digital Rebirth",
    subtitle: "Ferrari-caliber speed",
    description: "Redesigning our complete digital catalog into an immersive, typography-first scrollytelling experience inspired by ClaudeType.",
    image: "/old-monk-mousse.png",
  },
];

export default function TimelineSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  // Update slider position based on scroll progress
  const updateProgress = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) return;

    const currentProgress = slider.scrollLeft / maxScroll;
    setProgress(currentProgress);

    // Sync handle position
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
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    slider.scrollLeft = scrollLeft - walk;
    updateProgress();
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    // Initial positioning
    setTimeout(updateProgress, 300);

    return () => {
      slider?.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section ref={containerRef} className="section-cinematic bg-cream-dark/30 overflow-hidden border-b border-ink/5">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <p className="type-caption text-gold mb-6">Milestones</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl mb-8 text-ink">
              Atelier Journey
            </h2>
          </div>
          <p className="type-body text-stone max-w-sm mt-4 md:mt-0">
            A draggable timeline showcasing the chapters of our culinary and typographic craft development.
          </p>
        </div>

        {/* Draggable Slider Container */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          className={`flex gap-8 overflow-x-scroll scrollbar-none select-none py-4 cursor-grab ${
            isDragging ? "cursor-grabbing" : ""
          }`}
          data-cursor={isDragging ? "dragging" : "grab"}
        >
          {timelineEvents.map((event, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[300px] md:w-[450px] bg-cream border border-ink/5 p-6 md:p-8 rounded-sm space-y-6 transition-all duration-700"
              style={{
                // Subtle motion blur filter when dragging
                filter: isDragging ? "blur(1px)" : "blur(0px)",
                transform: isDragging ? "scale(0.99)" : "scale(1)",
              }}
            >
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-mist">
                <span>{event.chapter}</span>
                <span className="text-gold font-bold text-lg">{event.year}</span>
              </div>

              <div className="aspect-[16/10] relative overflow-hidden rounded-sm border border-ink/5">
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
                <h3 className="type-display text-2xl md:text-3xl text-ink">
                  {event.title}
                </h3>
                <p className="type-serif text-lg text-gold font-medium italic">
                  {event.subtitle}
                </p>
                <p className="type-body text-stone text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Slider Track at bottom */}
        <div className="mt-12 flex items-center justify-between gap-8">
          <div
            ref={trackRef}
            className="h-[2px] bg-ink/10 flex-grow relative rounded-full overflow-hidden"
          >
            {/* Draggable Progress Handle */}
            <div
              ref={handleRef}
              className="absolute top-0 left-0 w-24 h-full bg-gold rounded-full transition-transform duration-300"
            />
          </div>
          <div className="font-mono text-[10px] text-mist tracking-widest flex-shrink-0">
            <span>{Math.round(progress * 100)}% EXPLORED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
