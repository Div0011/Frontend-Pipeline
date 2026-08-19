'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export const AmbientBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };

      if (parallaxRef.current) {
        const layers = parallaxRef.current.querySelectorAll('[data-parallax]');
        layers.forEach((layer, i) => {
          const depth = (i + 1) * 0.15;
          const offsetX = (mouseRef.current.x - 0.5) * 30 * depth;
          const offsetY = (mouseRef.current.y - 0.5) * 20 * depth;
          (layer as HTMLElement).style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        });
      }
    };

    const onScroll = () => {
      const current = window.scrollY;
      velocityRef.current = Math.abs(current - lastScrollRef.current);
      lastScrollRef.current = current;
      scrollRef.current = current;

      if (parallaxRef.current) {
        const scrollLayers = parallaxRef.current.querySelectorAll('[data-parallax-scroll]');
        scrollLayers.forEach((layer, i) => {
          const depth = (i + 1) * 0.1;
          const offset = -current * depth;
          (layer as HTMLElement).style.transform = `translate3d(0, ${offset}px, 0)`;
        });
      }
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, [prefersReduced, parallaxRef]);

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; base: number; hue: number };
    const N = 120;
    const particles: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.5 + 0.3,
      base: Math.random(),
      hue: Math.random() * 60 + 180,
    }));

    type Spark = { x: number; y: number; vx: number; vy: number; life: number; size: number; hue: number };
    const sparks: Spark[] = [];

    let t = 0;
    let smoothVel = 0;
    let lastSparkTime = 0;

    const draw = () => {
      t += 0.004;
      smoothVel = smoothVel * 0.91 + velocityRef.current * 0.09;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      // Interactive mouse orb — larger on velocity
      const orbR = 380 + smoothVel * 15;
      const orbAlpha = 0.06 + smoothVel * 0.003;
      const orb = ctx.createRadialGradient(mx * W, my * H, 0, mx * W, my * H, orbR);
      orb.addColorStop(0, `rgba(0, 160, 255, ${orbAlpha})`);
      orb.addColorStop(0.5, `rgba(0, 60, 180, ${orbAlpha * 0.5})`);
      orb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, W, H);

      // Emit sparks on scroll velocity
      if (smoothVel > 12 && t * 1000 - lastSparkTime > 60) {
        lastSparkTime = t * 1000;
        const count = Math.min(Math.floor(smoothVel * 0.3), 8);
        for (let i = 0; i < count; i++) {
          sparks.push({
            x: mx * W + (Math.random() - 0.5) * 40,
            y: my * H + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1,
            life: 1,
            size: Math.random() * 3 + 1,
            hue: 190 + Math.random() * 30,
          });
        }
      }

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.03;
        s.life -= 0.01;
        if (s.life <= 0 || s.y > H) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = s.life;
        ctx.fillStyle = `hsla(${s.hue}, 100%, 75%, ${s.life * 0.4})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Particles
      for (const p of particles) {
        p.vy -= smoothVel * 0.0002;
        const dx = mx * W - p.x;
        const dy = my * H - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 300) {
          p.vx += (dx / dist) * 0.008;
          p.vy += (dy / dist) * 0.004;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const alpha = (0.03 + 0.08 * p.base) * (0.7 + 0.3 * Math.sin(t * 1.2 + p.base * 8));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${alpha})`;
        ctx.fill();
      }

      // Grid pulse on scroll
      if (smoothVel > 3) {
        const intensity = Math.min(smoothVel / 30, 0.3);
        ctx.strokeStyle = `rgba(0, 212, 255, ${intensity})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([30, 30]);
        for (let i = 0; i < 30; i++) {
          const x = (W / 30) * i + (scrollRef.current * 0.05 % (W / 30));
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, H);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      velocityRef.current = 0;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  return (
    <>
      {/* Parallax layers — each moves at a different depth ratio */}
      <div
        ref={parallaxRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Layer 1: Slow parallax (depth 0.1) */}
        <div
          data-parallax
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-5%',
            width: '110%',
            height: '110%',
            transform: 'translate3d(0, 0, 0)',
            transition: 'transform 0.05s ease-out',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.15,
              mixBlendMode: 'screen',
              filter: 'brightness(0.7) contrast(1.2) saturate(1.3) hue-rotate(-10deg)',
            }}
          >
            <source src="/media/blades_rotating.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Layer 2: Medium parallax (depth 0.2) */}
        <div
          data-parallax
          style={{
            position: 'absolute',
            inset: 0,
            transform: 'translate3d(0, 0, 0)',
            transition: 'transform 0.05s ease-out',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '15%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'pulse 6s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,82,204,0.06) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulse 8s ease-in-out infinite reverse',
            }}
          />
        </div>

        {/* Layer 3: Fast parallax (depth 0.3) — subtle gradient shifts */}
        <div
          data-parallax
          style={{
            position: 'absolute',
            inset: 0,
            transform: 'translate3d(0, 0, 0)',
            transition: 'transform 0.03s ease-out',
          }}
        />

        {/* Scroll-reactive layers */}
        <div data-parallax-scroll style={{ position: 'absolute', inset: 0 }} />
        <div data-parallax-scroll style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* Interactive mouse particle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
};
