"use client";

const icons: Record<string, React.ReactNode> = {
  CHEF: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  ),
  SPICY: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1 3-2 5-2 8 0 3 2 5 2 8" />
      <path d="M12 2c-1 3 2 5 2 8 0 3-2 5-2 8" />
      <path d="M8 6c2 1 4 1 6 0" />
    </svg>
  ),
  NUTS: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
  EGG: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="11" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  MUST: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  NEW: null,
};

const badgeStyles: Record<string, string> = {
  CHEF: "bg-brand-black text-brand-yellow",
  SPICY: "bg-brand-red text-white",
  NUTS: "bg-brand-yellow-dark text-brand-black",
  EGG: "bg-brand-text text-brand-cream",
  MUST: "bg-brand-yellow text-brand-black",
  NEW: "bg-brand-yellow text-brand-black",
};

export function Badge({ label }: { label: string }) {
  const style = badgeStyles[label] || "bg-brand-black text-brand-yellow";
  const icon = icons[label];

  return (
    <span className={`badge-pop ${style}`}>
      {icon}
      {label === "NEW" ? "New" : label}
    </span>
  );
}
