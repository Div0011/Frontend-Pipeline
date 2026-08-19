'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface MagneticElementProps extends React.HTMLAttributes<HTMLElement> {
  strength?: number;
  scale?: number;
  children: React.ReactNode;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  strength = 30,
  scale = 1.05,
  children,
  style,
  ...props
}) => {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const rect = () => el.getBoundingClientRect();
    let raf: number;

    const onMove = (e: MouseEvent) => {
      raf = requestAnimationFrame(() => {
        const box = rect();
        const x = e.clientX - (box.left + box.width / 2);
        const y = e.clientY - (box.top + box.height / 2);
        const dist = Math.sqrt(x * x + y * y);
        const force = Math.max(0, 1 - dist / (Math.max(box.width, box.height) * 0.6));
        const tx = x * (strength / 100) * force;
        const ty = y * (strength / 100) * force;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
      });
    };

    const onLeave = () => {
      raf = requestAnimationFrame(() => {
        el.style.transform = 'translate3d(0, 0, 0) scale(1)';
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseleave', () => { raf && cancelAnimationFrame(raf); });

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onMove);
      el.removeEventListener('mouseleave', onLeave);
      raf && cancelAnimationFrame(raf);
    };
  }, [strength, scale, prefersReduced]);

  return React.createElement(
    'div',
    { ref, style: { display: 'inline-block', ...style }, ...props },
    children,
  );
};
