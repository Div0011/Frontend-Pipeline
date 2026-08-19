'use client';

import { useEffect, useRef, useState } from 'react';
import { Award, Compass, Sparkles, Coffee } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2200;
          const start = performance.now();
          
          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease out
            
            const currentVal = eased * target;
            setCount(decimals > 0 ? parseFloat(currentVal.toFixed(decimals)) : Math.round(currentVal));
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          }
          
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  const STATS_DATA = [
    { value: 50000, suffix: '+', label: 'Cups Extracted', subtext: '9-bar precision', icon: Coffee },
    { value: 4.95, suffix: '★', label: 'Culinary Score', subtext: 'Global Roasters Guild', decimals: 2, icon: Award },
    { value: 16, suffix: '', label: 'Terroir Micro-Lots', subtext: 'Direct-trade', icon: Compass },
    { value: 2150, suffix: 'm', label: 'Peak Elevation', subtext: 'Volcanic high-altitude', icon: Sparkles },
  ];

  return (
    <section className="py-20 bg-cafe-dark text-cafe-bg border-y border-white/10 relative overflow-hidden">
      {/* Subtle Glow Backdrop */}
      <div className="absolute inset-0 bg-radial-at-c from-cafe-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS_DATA.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`text-center space-y-2 reveal reveal-delay-${i + 1}`}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-cafe-accent/20 flex items-center justify-center mx-auto mb-3 text-cafe-accent">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-none tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-cafe-accent pt-1">
                  {stat.label}
                </div>
                <p className="text-[0.72rem] text-white/50 font-light">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
