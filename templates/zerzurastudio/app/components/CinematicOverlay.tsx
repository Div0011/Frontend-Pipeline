"use client";

export default function CinematicOverlay() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <div className="absolute top-0 left-0 right-0 h-[5vh] bg-gradient-to-b from-cinema-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[5vh] bg-gradient-to-t from-cinema-black to-transparent" />
      </div>
    </>
  );
}
