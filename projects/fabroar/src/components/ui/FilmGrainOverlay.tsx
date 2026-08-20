"use client";

import { useEffect, useState } from "react";

export default function FilmGrainOverlay() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Primary grain — animated movement */}
      <div
        className="fixed inset-0 pointer-events-none z-[90] grain-overlay grain-animate"
        aria-hidden="true"
        style={{ opacity: 0.045, mixBlendMode: "overlay" }}
      />
      {/* Secondary static grain for texture depth */}
      <div
        className="fixed inset-0 pointer-events-none z-[89]"
        aria-hidden="true"
        style={{
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.75' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
