'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Compass, Thermometer, MapPin, Clock, ArrowUp, CheckCircle2, X, Calendar } from 'lucide-react';

const TERROIRS = [
  {
    id: 'ethiopia',
    name: 'Ethiopia Yirgacheffe',
    region: 'Gedeo Zone · 2,150m Altitude',
    process: '72h Anaerobic Natural',
    notes: ['Bergamot', 'Jasmine Blossom', 'White Peach'],
    description: 'Floral clarity and delicate stone-fruit sweetness from high volcanic slopes.',
    brew: 'V60 Pour-Over · 93.5°C · 1:16 Ratio',
  },
  {
    id: 'colombia',
    name: 'Colombia Pink Bourbon',
    region: 'Huila San Adolfo · 1,950m Altitude',
    process: 'Washed Extended Fermentation',
    notes: ['Pink Grapefruit', 'Panela Sugar', 'Red Currant'],
    description: 'Rare genetic mutation with stone-fruit brightness and dark caramel body.',
    brew: 'Double Espresso · 9 Bar · 18g in / 38g out',
  },
  {
    id: 'sumatra',
    name: 'Sumatra Gayo Reserve',
    region: 'Aceh Highlands · 1,650m Altitude',
    process: 'Traditional Wet-Hulled',
    notes: ['Cedar Wood', 'Dark Molasses', 'Sweet Tobacco'],
    description: 'Rich velvety body, low acidity, and lingering cocoa maltiness.',
    brew: 'Syphon Vacuum Pot or Velvet Flat White',
  },
];

const GALLERY_PREVIEWS = [
  { src: '/images/gallery-1.jpg', title: 'Single-Origin Slow Pour', tag: 'Ritual' },
  { src: '/images/gallery-2.jpg', title: 'Dawn Laminated Pastries', tag: 'Bakery' },
  { src: '/images/gallery-3.jpg', title: 'Hand-Thrown Ceramic Mug', tag: 'Craft' },
  { src: '/images/gallery-4.jpg', title: 'Sunlit Reading Solarium', tag: 'Space' },
];

interface CoffeeExperienceProps {
  onOpenReservation?: () => void;
}

export function CoffeeExperience({ onOpenReservation }: CoffeeExperienceProps) {
  const [activeTab, setActiveTab] = useState<'terroirs' | 'gallery' | 'visit'>('terroirs');
  const [activeTerroirId, setActiveTerroirId] = useState('ethiopia');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<(typeof GALLERY_PREVIEWS)[0] | null>(null);
  
  // Footer state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const rippleCanvasRef = useRef<HTMLCanvasElement>(null);
  const footerTitleRef = useRef<HTMLDivElement>(null);

  const activeTerroir = TERROIRS.find((t) => t.id === activeTerroirId) || TERROIRS[0];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  // Interactive Ripple Splash Effect on Footer CAFE COFFEE
  useEffect(() => {
    const canvas = rippleCanvasRef.current;
    const container = footerTitleRef.current;
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

    const ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; opacity: number; speed: number; color: string }> = [];
    const droplets: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }> = [];
    const colors = ['#D89F56', '#B86548', '#2A1A12', '#FBF8F3', '#C68B42'];

    const createSplash = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x,
          y,
          radius: 5 + i * 8,
          maxRadius: Math.random() * 80 + 70,
          opacity: 0.8,
          speed: 2.5 + i * 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 4 + 2;
        droplets.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 3.5 + 2,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (Math.random() > 0.3) createSplash(x, y);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createSplash(x, y);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity *= 0.94;
        if (r.opacity < 0.02 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = r.opacity;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.12;
        d.opacity *= 0.94;
        if (d.opacity < 0.02) {
          droplets.splice(i, 1);
          continue;
        }
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.opacity;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
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

  return (
    <div className="relative w-full bg-[#EADCC8] text-cafe-text overflow-hidden">
      
      {/* 1080P STEAMING COFFEE MUG ON TABLE VIDEO BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/coffee-mug-table.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle Semi-Transparent Warm Cream Gradient Overlay on the Left */}
      <div className="relative z-10 min-h-screen bg-gradient-to-r from-[#FBF8F3]/95 via-[#FBF8F3]/75 to-transparent">
        
        {/* MAIN LEFT-ALIGNED CONTENT WRAPPER */}
        <section className="max-w-content mx-auto px-6 md:px-12 py-24 min-h-[90vh] flex flex-col justify-center">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side (Spans 7 cols, leaving right side for steaming coffee mug) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Section Header & Sub-Navigation Switcher */}
              <div className="space-y-3">
                <span className="chapter-tag">[05 / THE ATELIER LAB &amp; SALON]</span>
                <h2 className="section-title">
                  Slow Moments &amp; <em>Single Origins</em>
                </h2>
                
                {/* 2D Segment Switcher */}
                <div className="flex items-center gap-2 pt-1">
                  {[
                    { id: 'terroirs', label: 'Cupping Bar' },
                    { id: 'gallery', label: 'Space Gallery' },
                    { id: 'visit', label: 'Visit Soho' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                        activeTab === tab.id
                          ? 'bg-cafe-text text-cafe-bg border-cafe-text shadow-[3px_3px_0px_#D89F56]'
                          : 'bg-white/85 backdrop-blur-md border-cafe-text/40 text-cafe-text hover:border-cafe-text'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TAB 1: TERROIRS CUPPING BAR */}
              {activeTab === 'terroirs' && (
                <div id="terroirs" className="space-y-4 animate-fadeIn">
                  {/* Bean Selectors */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {TERROIRS.map((t) => {
                      const isSel = t.id === activeTerroirId;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setActiveTerroirId(t.id)}
                          className={`p-3 text-left border-2 rounded-2xl transition-all ${
                            isSel
                              ? 'bg-cafe-accent text-cafe-dark border-cafe-text shadow-[3px_3px_0px_#2A1A12] font-bold'
                              : 'bg-white/90 backdrop-blur-sm border-cafe-text/40 hover:border-cafe-text'
                          }`}
                        >
                          <div className="text-[0.62rem] font-mono uppercase truncate text-cafe-secondary">
                            {t.process}
                          </div>
                          <div className="font-display text-xs sm:text-sm font-bold truncate mt-0.5">
                            {t.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Bean Card */}
                  <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border-2 border-cafe-text shadow-[6px_6px_0px_#2A1A12] space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-cafe-secondary">
                          <Compass className="w-3.5 h-3.5" />
                          <span>{activeTerroir.region}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-cafe-text mt-0.5">
                          {activeTerroir.name}
                        </h3>
                      </div>
                      <span className="badge-2d badge-2d-accent text-[0.65rem]">Micro-Lot</span>
                    </div>

                    <p className="text-xs sm:text-sm text-cafe-text-muted leading-relaxed">
                      {activeTerroir.description}
                    </p>

                    {/* Tasting Notes */}
                    <div className="flex flex-wrap gap-1.5">
                      {activeTerroir.notes.map((n) => (
                        <span key={n} className="badge-2d bg-cafe-warm text-xs">
                          <Sparkles className="w-3 h-3 text-cafe-secondary mr-1" />
                          {n}
                        </span>
                      ))}
                    </div>

                    {/* Recommended Brew Calibration */}
                    <div className="p-3 bg-cafe-warm rounded-2xl border border-cafe-text/30 flex items-center gap-2 text-xs">
                      <Thermometer className="w-4 h-4 text-cafe-secondary shrink-0" />
                      <div>
                        <span className="font-bold text-cafe-text block">Recommended Calibration:</span>
                        <span className="text-cafe-text-muted font-mono text-[0.72rem]">{activeTerroir.brew}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SPACE GALLERY */}
              {activeTab === 'gallery' && (
                <div id="gallery" className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3">
                    {GALLERY_PREVIEWS.map((item) => (
                      <div
                        key={item.title}
                        onClick={() => setSelectedGalleryImg(item)}
                        className="group relative h-36 rounded-2xl border-2 border-cafe-text shadow-[4px_4px_0px_#2A1A12] overflow-hidden cursor-pointer bg-white"
                      >
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-cafe-dark/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white">
                          <span className="badge-2d badge-2d-accent text-[0.6rem] self-start">{item.tag}</span>
                          <span className="font-display text-xs font-bold">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedGalleryImg && (
                    <div className="p-4 bg-white/95 rounded-2xl border-2 border-cafe-text shadow-[4px_4px_0px_#2A1A12] flex items-center justify-between">
                      <div>
                        <span className="badge-2d badge-2d-accent text-[0.62rem] mb-1">{selectedGalleryImg.tag}</span>
                        <h4 className="font-display font-bold text-sm text-cafe-text">{selectedGalleryImg.title}</h4>
                      </div>
                      <button onClick={() => setSelectedGalleryImg(null)} className="p-1.5 rounded-full border border-cafe-text hover:bg-cafe-warm">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: VISIT SOHO */}
              {activeTab === 'visit' && (
                <div id="visit" className="space-y-4 animate-fadeIn">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="card-2d p-4 space-y-1 bg-white/95">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-cafe-secondary">
                        <MapPin className="w-3.5 h-3.5 text-cafe-accent" /> 123 Coffee Lane
                      </div>
                      <p className="text-xs text-cafe-text leading-relaxed font-medium">
                        Arts District, Soho<br />New York, NY 10013
                      </p>
                    </div>

                    <div className="card-2d p-4 space-y-1 bg-white/95">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-cafe-secondary">
                        <Clock className="w-3.5 h-3.5 text-cafe-accent" /> Hours
                      </div>
                      <p className="text-xs text-cafe-text leading-relaxed font-medium">
                        Mon – Fri: 07:00 — 20:00<br />Sat – Sun: 08:00 — 21:00
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onOpenReservation}
                    className="btn-2d-primary text-xs py-2.5 px-6 w-full text-center justify-center"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve Salon Table</span>
                  </button>
                </div>
              )}

            </div>

            {/* Right Side (Spans 5 cols): Clear to highlight the Steaming Coffee Mug in the Video */}
            <div className="lg:col-span-5 hidden lg:flex flex-col justify-end items-end h-full min-h-[350px] pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border-1.5 border-cafe-text shadow-[3px_3px_0px_#2A1A12] text-right space-y-0.5">
                <span className="text-[0.62rem] font-mono uppercase tracking-widest text-cafe-secondary font-bold">
                  ✦ Single-Origin Porcelain Cup ✦
                </span>
                <p className="font-display text-xs font-bold text-cafe-text">
                  Steaming Slow Hand Pour
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* INTEGRATED FOOTER DIRECTLY OVER THE VIDEO BACKGROUND */}
        <footer className="border-t-2 border-cafe-text/30 bg-cafe-dark/95 backdrop-blur-xl text-cafe-bg py-16 relative overflow-hidden">
          <div className="max-w-content mx-auto px-6 md:px-12 space-y-12">
            
            {/* Interactive Ripple Title */}
            <div
              ref={footerTitleRef}
              className="relative py-8 text-center cursor-pointer select-none group border-b border-white/10"
            >
              <canvas
                ref={rippleCanvasRef}
                className="absolute inset-0 pointer-events-none z-10 w-full h-full"
              />

              <div className="relative z-0 space-y-2">
                <span className="badge-2d bg-cafe-accent text-cafe-dark text-xs mb-2 group-hover:scale-105 transition-transform inline-flex">
                  Hover to ripple
                </span>

                <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white group-hover:text-cafe-accent transition-colors duration-300">
                  CAFE COFFEE
                </h2>

                <p className="text-xs font-mono tracking-widest uppercase text-white/60">
                  Artisanal Roastery &amp; Dawn Hearth Bakery · Soho NYC
                </p>
              </div>
            </div>

            {/* Footer Navigation & Digest */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-white/75">
              
              <div className="md:col-span-4 space-y-2">
                <span className="font-display text-xl font-bold text-white block">CAFE COFFEE</span>
                <p className="text-white/70 leading-relaxed font-light">
                  Slow pours, single-origin roasts, and daily hearth bakes.
                </p>
              </div>

              <div className="md:col-span-3 space-y-2">
                <span className="font-bold uppercase tracking-wider text-cafe-accent block">Quick Links</span>
                <ul className="space-y-1.5">
                  {['Story', 'Oven Cakes', 'Menu', 'Terroirs', 'Visit'].map((lnk) => (
                    <li key={lnk}>
                      <a href={`#${lnk.toLowerCase().replace(' ', '')}`} className="hover:text-cafe-accent transition-colors">
                        {lnk}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-5 space-y-2">
                <span className="font-bold uppercase tracking-wider text-cafe-accent block">Daily Bake Drops</span>
                  <p className="text-white/70">Alerts for limited single-origins and fresh bakes.</p>
                {subscribed ? (
                  <div className="p-2.5 bg-white/10 rounded-xl border border-cafe-accent/40 text-cafe-accent flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                     <span>Subscribed to bake drops.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-cafe-accent text-xs"
                    />
                    <button type="submit" className="btn-2d-primary py-2 px-4 text-xs whitespace-nowrap">
                      Join
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50 border-t border-white/10 pt-6">
              <p>&copy; {new Date().getFullYear()} CAFE COFFEE Atelier. All rights reserved.</p>
              <button
                onClick={scrollToTop}
                className="btn-2d-secondary text-xs py-1.5 px-3 flex items-center gap-1"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
}
