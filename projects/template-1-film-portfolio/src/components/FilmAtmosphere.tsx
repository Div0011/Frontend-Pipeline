"use client";

export default function FilmAtmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {/* Persistent film grain */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
          animation: "grain-shift 0.45s steps(2) infinite",
        }}
      />

      {/* Soft projector wash from above */}
      <div
        className="absolute inset-x-0 top-0 h-[45vh] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% -20%, rgba(201,169,110,0.11) 0%, transparent 70%)",
          animation: "projector-pulse 7s ease-in-out infinite",
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 45%, transparent 40%, rgba(5,4,3,0.55) 100%)",
        }}
      />
    </div>
  );
}
