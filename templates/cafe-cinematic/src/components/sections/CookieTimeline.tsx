'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Coffee, Clock, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: 'dawn',
    label: '01 / DAWN BATCH',
    title: 'Baked before the city wakes',
    body: 'At 07:00 the oven is already at 240°C. Croissants, sourdough, and the cake of the day come out while Soho is still quiet.',
    icon: Flame,
  },
  {
    id: 'craft',
    label: '02 / SLOW CRAFT',
    title: 'Poured by hand, not by clock',
    body: 'Every espresso and pour-over is calibrated to the lot. No timers, no shortcuts—just the brew guide and the barista’s eye.',
    icon: Coffee,
  },
  {
    id: 'space',
    label: '03 / THE SPACE',
    title: 'A corner made for staying',
    body: 'Reclaimed oak, sunlit counters, and seats that ask you to sit a little longer. The space is part of the menu.',
    icon: Clock,
  },
  {
    id: 'ritual',
    label: '04 / THE RITUAL',
    title: 'One cup, one slice, one moment',
    body: 'Morning ritual isn’t a trend here. It’s the only thing we’ve ever served.',
    icon: Heart,
  },
];

export function CookieTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(
            Math.floor(progress * STEPS.length),
            STEPS.length - 1
          );
          setActiveStep(idx);
          setIsInView(true);
        },
        onLeave: () => setIsInView(false),
        onLeaveBack: () => setIsInView(false),
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-cafe-dark text-cafe-bg overflow-hidden select-none"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-cafe-dark via-[#0A0403] to-cafe-dark pointer-events-none" />

      {/* Step counter */}
      <div className="absolute top-8 right-8 sm:right-12 z-10 pointer-events-none">
        <span className="text-[0.65rem] font-mono font-bold tracking-[0.3em] text-cafe-accent uppercase">
          02 / {Math.round(((activeStep + 1) / STEPS.length) * 100)}%
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-content mx-auto px-6 md:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Step indicator rail */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === activeStep;
                const isPast = i < activeStep;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isActive ? 'opacity-100 translate-x-2' : isPast ? 'opacity-60' : 'opacity-30'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isActive
                          ? 'bg-cafe-accent border-cafe-accent text-cafe-dark'
                          : 'bg-transparent border-white/20 text-white/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[0.65rem] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${
                        isActive ? 'text-cafe-accent' : 'text-white/50'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right: Active step content */}
            <div className="lg:col-span-9">
              {STEPS.map((step, i) => {
                const isActive = i === activeStep;
                if (!isActive) return null;

                return (
                  <div
                    key={step.id}
                    className="max-w-2xl space-y-6"
                    style={{
                      animation: 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    }}
                  >
                    {/* Mobile label */}
                    <span className="lg:hidden text-[0.65rem] font-mono font-bold tracking-[0.3em] text-cafe-accent uppercase">
                      {step.label}
                    </span>

                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.1] tracking-tight text-white">
                      {step.title}
                    </h2>

                    <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
                      {step.body}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile step dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 lg:hidden">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeStep ? 'w-6 bg-cafe-accent' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
