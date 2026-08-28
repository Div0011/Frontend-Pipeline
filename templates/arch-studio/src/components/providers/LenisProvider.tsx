'use client';

import { useEffect, useRef } from 'react';
import { initLenis } from '@/lib/motion/lenis';

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<ReturnType<typeof initLenis> | null>(null);

  useEffect(() => {
    lenisRef.current = initLenis();

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
