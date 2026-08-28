'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp, MapPin, Clock, Phone, Mail } from 'lucide-react';

export function CinematicFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const el = titleRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Foggy hover effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = titleRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speedX: number;
      speedY: number;
      life: number;
    }> = [];

    const createFog = (x: number, y: number) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 60,
          y: y + (Math.random() - 0.5) * 40,
          radius: Math.random() * 40 + 20,
          opacity: Math.random() * 0.25 + 0.1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.4,
          life: 1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (Math.random() > 0.5) createFog(x, y);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createFog(x, y);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.008;
        p.opacity *= 0.995;

        if (p.life <= 0 || p.opacity < 0.01) {
          particles.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(200, 195, 185, ${p.opacity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(180, 175, 165, ${p.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(160, 155, 145, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`bg-cafe-dark text-cafe-bg pt-20 pb-12 relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-12">
        
        {/* Foggy hover brand name */}
        <div
          ref={titleRef}
          className="relative py-12 text-center cursor-pointer select-none border-b border-white/10 mb-12"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10 w-full h-full"
          />

          <div className="relative z-0 space-y-3">
            <h2
              className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight transition-all duration-500"
              style={{
                color: isHovering ? '#A8A39A' : '#E8E4DC',
                transform: isHovering ? 'scale(1.02)' : 'scale(1)',
                filter: isHovering
                  ? 'blur(0.5px) brightness(1.1)'
                  : 'blur(0px) brightness(1)',
                textShadow: isHovering
                  ? '0 0 40px rgba(200, 195, 185, 0.3), 0 0 80px rgba(180, 175, 165, 0.2)'
                  : 'none',
              }}
            >
              CAFE COFFEE
            </h2>
            <p className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white/50">
              Artisanal Roastery &amp; Dawn Hearth Bakery · Soho NYC
            </p>
          </div>
        </div>

        {/* Minimal footer info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-white/70">
          
          <div className="space-y-3">
            <span className="font-display text-lg font-bold text-white block">CAFE COFFEE</span>
            <p className="text-white/60 leading-relaxed">
              Slow pours, single-origin roasts, and daily hearth bakes.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-bold uppercase tracking-wider text-cafe-accent block text-[0.65rem]">
              Socials
            </span>
            <div className="flex items-center gap-4 text-xs">
              <a href="#" className="hover:text-cafe-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-cafe-accent transition-colors">Twitter</a>
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-bold uppercase tracking-wider text-cafe-accent block text-[0.65rem]">
              Contact
            </span>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-cafe-accent" />
                +1 (212) 555-0147
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-cafe-accent" />
                hello@cafecoffee.com
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-bold uppercase tracking-wider text-cafe-accent block text-[0.65rem]">
              Hours
            </span>
            <div className="space-y-1 text-white/60">
              <p>Mon – Fri: 07:00 — 20:00</p>
              <p>Sat – Sun: 08:00 — 21:00</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.65rem] text-white/40 border-t border-white/10 pt-8 mt-12">
          <p>&copy; {new Date().getFullYear()} CAFE COFFEE. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-cafe-accent transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            <span>Back to top</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
