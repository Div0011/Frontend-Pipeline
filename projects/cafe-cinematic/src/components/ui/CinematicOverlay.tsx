'use client';

export function CinematicOverlay() {
  return (
    <>
      {/* Subtle Analog Film Grain */}
      <div className="film-grain" aria-hidden="true" />
      {/* Anamorphic Vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />
    </>
  );
}
