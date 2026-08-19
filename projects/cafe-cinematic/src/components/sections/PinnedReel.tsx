'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Mountain, Flame, Droplet, Coffee, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'The Volcanic Harvest',
    subtitle: 'High-Altitude Micro-Lots',
    desc: 'Hand-harvested at 2,150m elevation on the volcanic slopes of Sidama and Huila, selecting only fully ripe ruby cherries with peak brix sugar content.',
    image: '/images/process-1.jpg',
    metric: '2,150m MASL · 24° Brix',
    icon: Mountain,
  },
  {
    step: '02',
    title: 'Cast Iron Roasting',
    subtitle: 'Precision Thermal Curve',
    desc: 'Drum-roasted in small 12kg batches. We calibrate conductive heat transfer to gently caramelize fruit sugars without scorching the delicate aromatic oils.',
    image: '/images/process-2.jpg',
    metric: '204°C Peak · 11m 40s Curve',
    icon: Flame,
  },
  {
    step: '03',
    title: 'Water Mineralogy',
    subtitle: '93.5°C Thermal Equilibrium',
    desc: 'Purified through triple-stage reverse osmosis and infused with magnesium and calcium ions to 120ppm, unlocking crisp floral notes with zero harshness.',
    image: '/images/process-3.jpg',
    metric: '120ppm Buffer · 93.5°C Pour',
    icon: Droplet,
  },
  {
    step: '04',
    title: 'Hydraulic Extraction',
    subtitle: '9-Bar Crema Architecture',
    desc: 'Extracted under 9 bars of consistent pressure through 18g precision baskets, creating a rich tiger-striped crema and luscious mouthfeel.',
    image: '/images/process-4.jpg',
    metric: '9 Bar Pressure · 28s Extraction',
    icon: Coffee,
  },
  {
    step: '05',
    title: 'The Sensory Ritual',
    subtitle: 'Stillness in the Porcelain',
    desc: 'Presented in hand-thrown ceramic ware designed to concentrate the bouquet of jasmine, bergamot, and roasted cacao as the cup slowly cools.',
    image: '/images/process-5.jpg',
    metric: '65°C Serving · Peak Bouquet',
    icon: Award,
  },
];

export function PinnedReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const totalSteps = PROCESS_STEPS.length;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalSteps * 120}%`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * totalSteps),
            totalSteps - 1
          );
          setActiveStepIndex(index);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const currentStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative min-h-screen bg-cafe-dark text-cafe-bg overflow-hidden flex flex-col justify-center border-b border-white/10"
    >
      {/* Desktop Pinned Scrollytelling Experience */}
      <div className="hidden lg:block relative w-full h-screen">
        {/* Background Image Layer with Crossfades */}
        {PROCESS_STEPS.map((step, idx) => (
          <div
            key={step.step}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out bg-cover bg-center ${
              idx === activeStepIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${step.image})`,
              filter: 'brightness(0.7) contrast(1.15)',
            }}
          />
        ))}

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-cafe-dark/90 via-cafe-dark/60 to-cafe-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark via-transparent to-cafe-dark/80" />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-content mx-auto h-full px-12 flex flex-col justify-between py-16">
          {/* Header */}
          <div className="flex justify-between items-end border-b border-white/15 pb-6">
            <div>
              <span className="chapter-tag text-cafe-accent">[04 / THE ALCHEMY]</span>
              <h2 className="font-display text-4xl text-white">
                From Soil to <em>Sip</em>
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono tracking-widest text-cafe-accent uppercase">
                Step {activeStepIndex + 1} of {PROCESS_STEPS.length}
              </span>
              <p className="text-xs text-white/50">Scroll to advance extraction process</p>
            </div>
          </div>

          {/* Center Showcase Card */}
          <div className="grid grid-cols-12 gap-12 items-center my-auto">
            {/* Left Narrative Box */}
            <div className="col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-cafe-accent/30 text-cafe-accent text-xs font-mono">
                <currentStep.icon className="w-3.5 h-3.5" />
                <span>Phase {currentStep.step} · {currentStep.subtitle}</span>
              </div>

              <h3 className="font-display text-5xl text-white font-normal leading-tight">
                {currentStep.title}
              </h3>

              <p className="text-white/80 text-lg leading-relaxed font-light">
                {currentStep.desc}
              </p>

              <div className="p-4 bg-white/5 border border-white/10 rounded inline-block">
                <span className="text-[0.65rem] font-mono tracking-widest uppercase text-cafe-accent block mb-1">
                  Benchmarked Tolerance
                </span>
                <span className="font-mono text-sm text-white font-medium">
                  {currentStep.metric}
                </span>
              </div>
            </div>

            {/* Right Framed Preview */}
            <div className="col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded overflow-hidden shadow-2xl border border-cafe-accent/30">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-white/80">
                  <span>Phase {currentStep.step}</span>
                  <span className="text-cafe-accent">{currentStep.metric}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Timeline Stepper */}
          <div className="grid grid-cols-5 gap-4 pt-6 border-t border-white/15">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className={`space-y-1.5 transition-all duration-300 ${
                  idx === activeStepIndex ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-cafe-accent transition-all duration-500 ${
                      idx <= activeStepIndex ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[0.65rem] font-mono text-white">
                  <span>{step.step}.</span>
                  <span className="truncate">{step.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Stacked Flow */}
      <div className="lg:hidden px-6 py-24 space-y-12">
        <div className="text-center">
          <span className="chapter-tag justify-center text-cafe-accent">[04 / THE ALCHEMY]</span>
          <h2 className="font-display text-3xl text-white">
            From Soil to <em>Sip</em>
          </h2>
          <p className="text-white/70 text-sm mt-2">The 5-phase extraction ritual</p>
        </div>

        <div className="space-y-12">
          {PROCESS_STEPS.map((step) => (
            <div key={step.step} className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
              <div className="aspect-[4/3] rounded overflow-hidden relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-cafe-dark/80 backdrop-blur-md rounded text-[0.65rem] font-mono text-cafe-accent">
                  Phase {step.step}
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl text-white">{step.title}</h3>
                <p className="text-xs font-mono text-cafe-accent mt-1">{step.subtitle}</p>
                <p className="text-sm text-white/75 mt-3 leading-relaxed">{step.desc}</p>
                <div className="mt-3 text-xs font-mono text-white/50 bg-black/30 p-2 rounded">
                  Tolerance: {step.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
