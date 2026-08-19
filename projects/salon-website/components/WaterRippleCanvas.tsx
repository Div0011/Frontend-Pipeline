'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from './shared/useReducedMotion';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  lineWidth: number;
}

interface WaterRippleCanvasProps {
  onRippleClick?: (x: number, y: number) => void;
}

export function WaterRippleCanvas({ onRippleClick }: WaterRippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const ripplesRef = useRef<Ripple[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const addRipple = (x: number, y: number, maxRadius = 120) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius,
        opacity: 0.6,
        speed: 1.8 + Math.random() * 0.8,
        lineWidth: 1.5 + Math.random(),
      });
      if (ripplesRef.current.length > 25) {
        ripplesRef.current.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastMousePos.current.x, e.clientY - lastMousePos.current.y);
      if (dist > 35) {
        addRipple(e.clientX, e.clientY, 80 + Math.random() * 60);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY, 160);
      setTimeout(() => addRipple(e.clientX, e.clientY, 220), 120);
      window.dispatchEvent(
        new CustomEvent('salon-ripple-click', {
          detail: { x: e.clientX, y: e.clientY },
        })
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    let animFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const remainingRipples: Ripple[] = [];

      ripplesRef.current.forEach((r) => {
        r.radius += r.speed;
        r.opacity *= 0.965;

        if (r.opacity > 0.01 && r.radius < r.maxRadius) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(230, 198, 135, ${r.opacity})`;
          ctx.lineWidth = r.lineWidth;
          ctx.stroke();

          // Subtle secondary inner ring
          if (r.radius > 15) {
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(242, 227, 198, ${r.opacity * 0.5})`;
            ctx.lineWidth = r.lineWidth * 0.6;
            ctx.stroke();
          }

          remainingRipples.push(r);
        }
      });

      ripplesRef.current = remainingRipples;
      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animFrame);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 15,
        mixBlendMode: 'screen',
      }}
    />
  );
}
