import Link from "next/link";

const NAV = [
  { href: "/menu", label: "Border Menu" },
  { href: "/about", label: "Mo's Story" },
  { href: "/locations", label: "5111 Airport Blvd" },
  { href: "/reservations", label: "Patio & Catering" },
  { href: "/films", label: "Heritage Visuals" },
];

const SOCIAL = [
  { href: "https://instagram.com/jewboyburgers", label: "Instagram" },
  { href: "https://facebook.com/jewboyburgers", label: "Facebook" },
  { href: "tel:5122913358", label: "Call (512) 291-3358" },
  { href: "mailto:info@jewboyburgers.com", label: "Email Us" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute text-bone">
      {/* Top CTA band */}
      <div className="bg-ember px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full border-b border-[#06B6D4]/30">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-bone">CRAVING THE OY VEY GOY?</span>
          <span className="type-serif text-bone/80 italic text-lg hidden sm:block">Dine on our Airport Blvd patio or call ahead for fast pickup.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <a href="tel:5122913358" className="btn-yolk text-[10px] py-3 px-6">
            Call (512) 291-3358 →
          </a>
          <Link
            href="/menu"
            className="border border-bone text-bone px-6 py-3 type-caption text-[10px] hover:bg-bone hover:text-ember transition-all duration-300 font-bold"
          >
            View Menu ↗
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-sm bg-ember border border-[#06B6D4] flex items-center justify-center text-bone font-bold text-xs">
                JB
              </div>
              <span className="type-display text-2xl text-ink">JewBoy Burgers</span>
            </div>
            <p className="type-serif text-stone text-base leading-relaxed mb-6 max-w-sm">
              Border roots meet Jewish comfort. Founded by Mo Pittle to bring El Paso flavors, smashed Angus chuck with grilled onions, scratch potato latkes, and Hatch green chile queso to Austin, Texas.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-[#06B6D4] transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="type-caption text-[#06B6D4] text-[10px] mb-5 font-bold">Navigate</h3>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="type-body text-stone text-sm hover:text-ink transition-colors duration-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-3">
            <h3 className="type-caption text-[#06B6D4] text-[10px] mb-5 font-bold">Airport Blvd Store</h3>
            <div>
              <h4 className="type-display text-xl text-ink mb-1">5111 AIRPORT BLVD</h4>
              <p className="type-body text-smoke text-xs leading-relaxed">Austin, TX 78751</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="type-label text-smoke text-[8px]">Mon–Sat 11am–10pm (Sun: Closed)</span>
              </div>
              <a
                href="tel:5122913358"
                className="type-label text-[#06B6D4] text-[9px] hover:underline transition-colors duration-300 mt-2 block font-bold"
              >
                (512) 291-3358
              </a>
              <p className="type-label text-smoke text-[9px] mt-1 font-mono">
                Shalom Y&apos;all! Mucho Gusto.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-char-mute flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="type-label text-smoke text-[9px]">
            © {new Date().getFullYear()} JewBoy Burgers · Austin, TX · Mo Pittle
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-[#06B6D4] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-[#06B6D4] transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
