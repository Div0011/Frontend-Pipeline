"use client";

import { Suspense, useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import VoidScene from "@/components/three/VoidScene";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <Suspense fallback={null}>
            <VoidScene />
          </Suspense>
          {children}
        </>
      )}
    </>
  );
}
