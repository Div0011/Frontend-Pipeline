import React from "react";

export interface DoodleProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
  className?: string;
}

/* 1. T-Shirt & Hanger Doodle */
export function DoodleTShirt({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {/* Hanger hook */}
      <path d="M32 8 C32 4, 37 4, 37 8 C37 12, 32 14, 32 16" />
      {/* Shirt outline */}
      <path d="M32 16 L22 18 L10 26 L16 38 L22 34 L22 56 L42 56 L42 34 L48 38 L54 26 L42 18 Z" />
      {/* Collar curve */}
      <path d="M26 18 C28 22, 36 22, 38 18" />
      {/* Doodle chest motif */}
      <path d="M32 28 L34 32 L38 32 L35 35 L36 39 L32 36 L28 39 L29 35 L26 32 L30 32 Z" />
      {/* Bottom hem stitch */}
      <path d="M22 52 L42 52" strokeDasharray="2 2" />
    </svg>
  );
}

/* 2. Roaring Bear / Lion Head Doodle */
export function DoodleBearRoar({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {/* Ears */}
      <path d="M12 22 C8 14, 18 10, 22 16" />
      <path d="M52 22 C56 14, 46 10, 42 16" />
      {/* Head shape */}
      <path d="M16 26 C12 36, 16 52, 32 54 C48 52, 52 36, 48 26 C44 18, 20 18, 16 26 Z" />
      {/* Angry Eyes */}
      <path d="M20 28 L28 32" />
      <path d="M44 28 L36 32" />
      {/* Snout & Roaring Mouth */}
      <ellipse cx="32" cy="38" rx="6" ry="4" />
      <path d="M24 44 C28 42, 36 42, 40 44 C42 49, 38 52, 32 52 C26 52, 22 49, 24 44 Z" />
      {/* Fangs */}
      <path d="M27 44 L28 47 L30 44" />
      <path d="M34 44 L36 47 L37 44" />
    </svg>
  );
}

/* 3. Crown Doodle */
export function DoodleCrown({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M10 46 L14 20 L26 32 L32 14 L38 32 L50 20 L54 46 Z" />
      <path d="M10 46 L54 46 L52 52 L12 52 Z" />
      {/* Jewels */}
      <circle cx="14" cy="17" r="2" />
      <circle cx="32" cy="11" r="2.5" />
      <circle cx="50" cy="17" r="2" />
      <path d="M22 49 L42 49" strokeDasharray="2 2" />
    </svg>
  );
}

/* 4. Streetwear Flame Doodle */
export function DoodleFlame({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M32 8 C32 8, 42 18, 42 28 C42 34, 46 36, 48 32 C50 42, 44 54, 32 56 C20 54, 14 44, 16 32 C18 26, 24 24, 24 20 C24 20, 28 26, 32 22 C34 16, 32 8, 32 8 Z" />
      {/* Inner flame */}
      <path d="M32 30 C36 34, 38 40, 34 48 C30 50, 26 46, 28 40 C28 36, 32 30, 32 30 Z" />
    </svg>
  );
}

/* 5. Lightning Bolt Doodle */
export function DoodleLightning({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M36 6 L16 34 L32 34 L24 58 L50 26 L34 26 Z" />
      {/* Aura sparks */}
      <path d="M12 18 L6 20" />
      <path d="M52 44 L58 42" />
      <path d="M44 12 L50 8" />
    </svg>
  );
}

/* 6. Sparkle / Star Doodle */
export function DoodleSparkle({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M32 8 C32 20, 44 32, 56 32 C44 32, 32 44, 32 56 C32 44, 20 32, 8 32 C20 32, 32 20, 32 8 Z" />
      {/* Little surrounding stars */}
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      <circle cx="50" cy="50" r="1.5" fill="currentColor" />
      <path d="M48 14 L52 18 M52 14 L48 18" />
    </svg>
  );
}

/* 7. Streetwear X-Eye Smiley Doodle */
export function DoodleSmiley({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <circle cx="32" cy="32" r="24" />
      {/* X Eyes */}
      <path d="M20 22 L28 30 M28 22 L20 30" />
      <path d="M36 22 L44 30 M44 22 L36 30" />
      {/* Wavy smile & tongue */}
      <path d="M20 40 C26 48, 38 48, 44 40" />
      <path d="M28 44 C28 50, 36 50, 36 44" />
    </svg>
  );
}

/* 8. Skull & Crossbones Doodle */
export function DoodleSkull({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {/* Skull dome */}
      <path d="M18 30 C16 16, 48 16, 46 30 C46 38, 42 40, 40 44 L24 44 C22 40, 18 38, 18 30 Z" />
      {/* Eyes */}
      <circle cx="26" cy="30" r="4" />
      <circle cx="38" cy="30" r="4" />
      {/* Nose */}
      <path d="M32 35 L30 38 L34 38 Z" />
      {/* Teeth */}
      <path d="M26 44 L26 50 M30 44 L30 50 M34 44 L34 50 M38 44 L38 50" />
    </svg>
  );
}

/* 9. Diamond Doodle */
export function DoodleDiamond({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M18 20 L46 20 L56 32 L32 56 L8 32 Z" />
      <path d="M18 20 L26 32 L32 56 M46 20 L38 32 L32 56" />
      <path d="M8 32 L56 32" />
      {/* Sparkle lines */}
      <path d="M10 14 L14 18" />
      <path d="M54 14 L50 18" />
    </svg>
  );
}

/* 10. Tailor Scissors Doodle */
export function DoodleScissors({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {/* Handles */}
      <circle cx="16" cy="48" r="8" />
      <circle cx="48" cy="48" r="8" />
      {/* Blades crossing */}
      <path d="M22 43 L48 12" />
      <path d="M42 43 L16 12" />
      {/* Pivot screw */}
      <circle cx="32" cy="30" r="2" fill="currentColor" />
    </svg>
  );
}

/* 11. Heart with Wings Doodle */
export function DoodleHeartWings({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {/* Heart center */}
      <path d="M32 48 C20 38, 20 24, 26 20 C32 16, 32 24, 32 24 C32 24, 32 16, 38 20 C44 24, 44 38, 32 48 Z" />
      {/* Left Wing */}
      <path d="M21 24 C14 20, 6 22, 4 30 C12 30, 18 28, 21 28" />
      <path d="M21 28 C12 34, 8 38, 6 42 C14 40, 20 36, 23 34" />
      {/* Right Wing */}
      <path d="M43 24 C50 20, 58 22, 60 30 C52 30, 46 28, 43 28" />
      <path d="M43 28 C52 34, 56 38, 58 42 C50 40, 44 36, 41 34" />
    </svg>
  );
}

/* 12. Rock On / Devil Horns Hand Sign Doodle */
export function DoodleRockHand({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {/* Index and pinky extended, middle & ring folded */}
      <path d="M20 54 L20 36 L20 12 C20 9, 25 9, 25 12 L25 30 L29 30 L29 18 C29 16, 34 16, 34 18 L34 30 L38 30 L38 20 C38 18, 43 18, 43 20 L43 30 L47 30 L47 10 C47 7, 52 7, 52 10 L52 36 C52 48, 44 56, 32 56 L20 54 Z" />
      {/* Thumb folded over */}
      <path d="M24 38 C32 38, 38 34, 42 32" />
    </svg>
  );
}

/* 13. Spray Paint Can Doodle */
export function DoodleSprayCan({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {/* Can body */}
      <rect x="22" y="24" width="20" height="32" rx="3" />
      {/* Can top */}
      <path d="M26 24 L28 16 L36 16 L38 24" />
      {/* Nozzle */}
      <rect x="30" y="10" width="4" height="6" />
      {/* Spray cloud */}
      <path d="M32 10 L28 4 M32 10 L32 2 M32 10 L36 4 M26 6 L22 4 M38 6 L42 4" strokeDasharray="1.5 2" />
      {/* Label line */}
      <path d="M22 36 L42 36" />
      <circle cx="32" cy="46" r="4" />
    </svg>
  );
}

/* 14. Vision Eye Doodle */
export function DoodleEye({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M8 32 C18 18, 46 18, 56 32 C46 46, 18 46, 8 32 Z" />
      <circle cx="32" cy="32" r="8" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      {/* Eyelashes / Rays */}
      <path d="M32 14 L32 8 M20 18 L16 12 M44 18 L48 12" />
    </svg>
  );
}

/* 15. Dynamic Squiggle Doodle */
export function DoodleSquiggle({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M8 20 C14 10, 24 34, 32 20 C40 6, 50 30, 56 20 M8 44 C16 36, 22 52, 32 44 C42 36, 48 52, 56 44" />
      <circle cx="12" cy="56" r="2" fill="currentColor" />
      <circle cx="52" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}

/* 16. Price / Clothing Tag Doodle */
export function DoodleTag({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 28 L28 12 L52 12 L52 36 L36 52 Z" />
      <circle cx="44" cy="20" r="3" />
      {/* String loop */}
      <path d="M44 17 C44 8, 56 6, 54 14" />
      {/* Barcode lines */}
      <path d="M22 36 L34 24 M26 40 L38 28 M30 44 L42 32" strokeDasharray="3 1" />
    </svg>
  );
}

/* 17. Starburst Motion Doodle */
export function DoodleStarBurst({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M32 10 L37 25 L52 20 L42 32 L54 44 L38 42 L32 56 L26 42 L10 44 L22 32 L12 20 L27 25 Z" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}

/* 18. Needle & Thread Loop Doodle */
export function DoodleThreadNeedle({ size = 48, strokeWidth = 1.8, className = "", ...props }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {/* Needle */}
      <path d="M52 12 L16 48 L12 52 L16 48 L48 16 Z" />
      <ellipse cx="50" cy="14" rx="1.5" ry="3" transform="rotate(45 50 14)" />
      {/* Thread */}
      <path d="M52 12 C60 4, 48 2, 40 10 C32 18, 44 26, 36 34 C28 42, 20 28, 12 36" strokeDasharray="3 2" />
    </svg>
  );
}

/* Array of all doodle components for dynamic random rendering */
export const ALL_DOODLE_COMPONENTS = [
  DoodleTShirt,
  DoodleBearRoar,
  DoodleCrown,
  DoodleFlame,
  DoodleLightning,
  DoodleSparkle,
  DoodleSmiley,
  DoodleSkull,
  DoodleDiamond,
  DoodleScissors,
  DoodleHeartWings,
  DoodleRockHand,
  DoodleSprayCan,
  DoodleEye,
  DoodleSquiggle,
  DoodleTag,
  DoodleStarBurst,
  DoodleThreadNeedle,
];
