import Link from "next/link";

const LOCATIONS = [
  { name: "Indiranagar Studio", address: "212/A, 1st Main Rd, Stage 2, Indiranagar", hours: "12pm – 02am", phone: "063663 93732" },
];

const NAV = [
  { href: "/menu", label: "Truffle & Smash Menu" },
  { href: "/about", label: "The Louis Heritage" },
  { href: "/locations", label: "Indiranagar Studio" },
  { href: "/reservations", label: "Private Tasting Events" },
  { href: "/films", label: "Culinary Cinema" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/louisburgerofficial", label: "Instagram" },
  { href: "mailto:info@massiverestaurants.com", label: "Concierge" },
  { href: "https://swiggy.com", label: "Swiggy" },
  { href: "https://zomato.com", label: "Zomato" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-black border-b border-[#D4AF37]/30 px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-[#D4AF37]">EXPERIENCE HAUTE BURGER ARTISTRY</span>
          <span className="type-serif text-stone italic text-lg hidden sm:block">Crafted for discerning palates. Available for late-night delivery and studio dining.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/menu" className="bg-[#D4AF37] text-black hover:bg-white transition-all px-6 py-3 type-caption text-[10px]">
            Explore Menu →
          </Link>
          <a
            href="https://zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 type-caption text-[10px] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
          >
            Order Direct ↗
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 bg-[#D4AF37] rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-ink" style={{ fontFamily: "var(--font-serif)" }}>LOUIS BURGER</span>
            </div>
            <p className="type-serif text-stone text-lg leading-relaxed mb-6 max-w-sm">
              Gourmet luxury burgers by Zorawar Kalra. Shaved European black truffles,
              artisanal French brioche, and gold leaf wagyu.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-[#D4AF37] transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-[#D4AF37] text-[10px] mb-5">Navigate</h3>
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

          {/* Locations */}
          <div className="lg:col-span-5">
            <h3 className="type-caption text-[#D4AF37] text-[10px] mb-5">Indiranagar Studio</h3>
            <div className="grid grid-cols-1 gap-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-ink mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span className="type-label text-smoke text-[9px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    className="type-label text-smoke text-[9px] hover:text-[#D4AF37] transition-colors duration-300 mt-1 block"
                  >
                    {loc.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-char-mute flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="type-label text-smoke text-[9px]">
            © {new Date().getFullYear()} Louis Burger · Massive Restaurants Pvt Ltd · Bangalore, India
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-[#D4AF37] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-[#D4AF37] transition-colors duration-300">
              Terms
            </Link>
            <a href="mailto:info@massiverestaurants.com" className="type-label text-smoke text-[9px] hover:text-[#D4AF37] transition-colors duration-300">
              Concierge
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
