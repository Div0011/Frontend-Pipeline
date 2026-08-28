'use client';

import { useEffect } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any = null;

    async function init() {
      const LenisModule = await import('lenis');
      const LenisClass = LenisModule.default || LenisModule;
      lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    init();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
