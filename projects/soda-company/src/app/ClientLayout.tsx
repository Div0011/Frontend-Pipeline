"use client";

import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import NavigationMenu from "@/components/NavigationMenu";
import dynamic from "next/dynamic";

const PersistentScene = dynamic(() => import("@/components/three/PersistentScene"), {
  ssr: false,
  loading: () => null,
});

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
      <ScrollProgress />

      {/* Loading screen gates the reveal until models are ready */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/*
        Always mount PersistentScene so the R3F Canvas exists and
        useProgress() inside LoadingScreen can track model download progress.
      */}
      <PersistentScene />

      <div className="relative z-50">
        <NavigationMenu />
      </div>

      <div
        className="relative z-10 w-full min-h-screen transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0.8 }}
      >
        {children}
      </div>
    </>
  );
}

