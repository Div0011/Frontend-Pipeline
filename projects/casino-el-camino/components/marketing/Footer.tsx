import Link from "next/link";

const NAV = [
  { href: "/menu", label: "3/4 lb Burger Menu" },
  { href: "/about", label: "Paul's Story" },
  { href: "/locations", label: "517 E 6th St" },
  { href: "/reservations", label: "Groups & Parties" },
  { href: "/films", label: "Visual Archive" },
];

const SOCIAL = [
  { href: "https://instagram.com/casinoelcamino", label: "Instagram" },
  { href: "https://facebook.com/casinoelcamino", label: "Facebook" },
  { href: "tel:5124699330", label: "Call (512) 469-9330" },
  { href: "mailto:casinoelcamino517@gmail.com", label: "Email Us" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute text-bone">
      {/* Top CTA band */}
      <div className="bg-char-soft px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full border-b border-ember/30">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-ink">CRAVING 3/4 LB MONSTER BURGERS?</span>
          <span className="type-serif text-stone italic text-lg hidden sm:block">Dine at 517 E 6th St or call ahead for fast takeout.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <a href="tel:5124699330" className="btn-red text-[10px] py-3 px-6">
            Call (512) 469-9330 →
          </a>
          <Link
            href="/menu"
            className="border border-ember text-ember px-6 py-3 type-caption text-[10px] hover:bg-ember hover:text-char transition-all duration-300 font-bold"
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
              <div className="w-8 h-8 rounded-sm bg-char border border-ember flex items-center justify-center text-ember font-bold text-xs">
                CC
              </div>
              <span className="type-display text-2xl text-ink">Casino El Camino</span>
            </div>
            <p className="type-serif text-stone text-base leading-relaxed mb-6 max-w-sm">
              Legendary 6th Street rock-and-roll dive bar and grill since 1994. Paul Eighmey&apos;s home of 3/4 lb flame-chargrilled monster burgers, blistered serranos, verde chili cheese fries, and world-class loaded Bloody Marys.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-stone text-[9px] hover:text-ember transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="type-caption text-ember text-[10px] mb-5 font-bold">Navigate</h3>
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
            <h3 className="type-caption text-ember text-[10px] mb-5 font-bold">6th Street Sanctuary</h3>
            <div>
              <h4 className="type-display text-xl text-ink mb-1">517 E 6TH ST</h4>
              <p className="type-body text-stone text-xs leading-relaxed">Austin, TX 78701</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="type-label text-stone text-[8px]">Daily 11:30 AM – 2:00 AM (Grill open late)</span>
              </div>
              <a
                href="tel:5124699330"
                className="type-label text-ember text-[9px] hover:underline transition-colors duration-300 mt-2 block font-bold"
              >
                (512) 469-9330
              </a>
              <a
                href="mailto:casinoelcamino517@gmail.com"
                className="type-label text-stone text-[9px] hover:text-ember transition-colors duration-300 mt-1 block font-mono"
              >
                casinoelcamino517@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-char-mute flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="type-label text-stone text-[9px]">
            © {new Date().getFullYear()} Casino El Camino · 517 E 6th St · Paul Eighmey
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-stone text-[9px] hover:text-ember transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-stone text-[9px] hover:text-ember transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
