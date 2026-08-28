"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicFrame from "./CinematicFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FrameData {
  image: string;
  title: string;
  subtitle?: string;
  maskType?: "organic" | "parallelogram" | "circle" | "pill";
  textPosition?: "top-right" | "bottom-left" | "center-below" | "bottom-right";
}

interface Chapter {
  label: string;
  title: string;
  description: string;
  frames: FrameData[];
}

const chapters: Chapter[] = [
  {
    label: "Chapter I",
    title: "The Opening",
    description:
      "A quiet study of light and shadow, where the first frame establishes the visual language of the series.",
    frames: [
      {
        image: "/hero-burger.png",
        title: "Dawn Light",
        subtitle: "The first frame",
        maskType: "organic",
        textPosition: "top-right",
      },
      {
        image: "/truffle-fries.png",
        title: "Quiet Motion",
        subtitle: "A study in restraint",
        maskType: "parallelogram",
        textPosition: "bottom-left",
      },
    ],
  },
  {
    label: "Chapter II",
    title: "The Rhythm",
    description:
      "The sequence accelerates. Shapes tighten, masks sharpen, and the narrative gains momentum.",
    frames: [
      {
        image: "/matcha-special.png",
        title: "Pulse",
        subtitle: "Acceleration",
        maskType: "circle",
        textPosition: "center-below",
      },
      {
        image: "/old-monk-mousse.png",
        title: "Afterglow",
        subtitle: "Resolution",
        maskType: "pill",
        textPosition: "bottom-right",
      },
    ],
  },
];

export default function CinematicGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-cream">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapter.label} className="mb-32 lg:mb-48">
            {/* Chapter header — typographic breath */}
            <div className="max-w-2xl mb-16 lg:mb-24">
              <p className="type-caption text-gold mb-4">{chapter.label}</p>
              <h2 className="type-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                {chapter.title}
              </h2>
              <p className="type-body text-stone text-lg leading-relaxed">
                {chapter.description}
              </p>
            </div>

            {/* Grid-aligned frame sequence */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              {chapter.frames.map((frame, frameIndex) => {
                const globalIndex = chapterIndex * 10 + frameIndex + 1;
                return (
                  <div
                    key={frame.title}
                    className={`${
                      frameIndex === 0
                        ? "md:col-span-7 md:col-start-1"
                        : "md:col-span-5 md:col-start-8"
                    }`}
                  >
                    <CinematicFrame
                      image={frame.image}
                      title={frame.title}
                      subtitle={frame.subtitle}
                      index={globalIndex}
                      maskType={frame.maskType}
                      textPosition={frame.textPosition}
                      chapterLabel={chapter.label}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
