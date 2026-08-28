"use client";

export function MandalaIcon({ className = "w-6 h-6 text-[#f5d061]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" strokeOpacity="0.4" />
      <circle cx="50" cy="50" r="35" strokeOpacity="0.6" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="15" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path d="M50,15 C45,25 45,35 50,35 C55,35 55,25 50,15 Z" />
          <circle cx="50" cy="8" r="2.5" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-6 my-16 w-full max-w-4xl mx-auto px-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f5d061]/40 to-transparent" />
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rotate-45 bg-[#f5d061]" />
        <MandalaIcon className="w-5 h-5 text-[#f5d061]/80" />
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#f5d061]/80 px-2 font-semibold">
            {label}
          </span>
        )}
        <MandalaIcon className="w-5 h-5 text-[#f5d061]/80" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#f5d061]" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f5d061]/40 to-transparent" />
    </div>
  );
}
