'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './shared/useReducedMotion';

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;

    // Hide default cursor on desktop
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hover detection for interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, .glass-card, .bottom-right-fog, [role="button"], input, select')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleOver);

    // Lerp animation loop
    let animFrame: number;
    const render = () => {
      pos.current.x += (targetPos.current.x - pos.current.x) * 0.18;
      pos.current.y += (targetPos.current.y - pos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${
          isHovered ? 1.8 : 1
        })`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%) scale(${
          isHovered ? 0.4 : 1
        })`;
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(animFrame);
    };
  }, [prefersReduced, isHovered, isVisible]);

  if (prefersReduced || !isVisible) return null;

  return (
    <>
      {/* Outer Lerp Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '1px solid rgba(230, 198, 135, 0.45)',
          background: isHovered
            ? 'rgba(230, 198, 135, 0.12)'
            : 'rgba(230, 198, 135, 0.03)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.3s, height 0.3s, background 0.3s, border-color 0.3s',
          boxShadow: isHovered
            ? '0 0 20px rgba(230, 198, 135, 0.3), inset 0 0 10px rgba(230, 198, 135, 0.15)'
            : '0 0 10px rgba(0, 0, 0, 0.2)',
        }}
      />

      {/* Inner Immediate Gold Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#e6c687',
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
          boxShadow: '0 0 8px #e6c687',
        }}
      />
    </>
  );
}
