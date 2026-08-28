import Link from "next/link";

const LOCATIONS = [
  { name: "East Austin Courtyard", address: "1814 E Martin Luther King Jr Blvd, Austin, TX 78702", hours: "Wed–Sun 9am – 9pm", phone: "(512) 394-5776" },
];

const NAV = [
  { href: "/menu", label: "Farm & Bakery Menu" },
  { href: "/about", label: "The Sourdough Heritage" },
  { href: "/locations", label: "East Austin Courtyard" },
  { href: "/reservations", label: "Courtyard Gatherings" },
  { href: "/films", label: "Kitchen Stories" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/sourduckmarket", label: "Instagram" },
  { href: "mailto:hello@sourduckmarket.com", label: "Email Us" },
  { href: "https://toasttab.com", label: "Toast Direct" },
  { href: "https://doordash.com", label: "DoorDash" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-[#EA580C] text-white px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-white">HUNGRY FOR REAL FOOD?</span>
          <span className="type-serif text-white/80 italic text-lg hidden sm:block">Wood-fired craft sourdough smashes & bakery goods in East Austin.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/locations" className="bg-black text-white hover:bg-[#4D7C0F] transition-all px-6 py-3 type-caption text-[10px]">
            Visit Courtyard →
          </Link>
          <a
            href="https://toasttab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 type-caption text-[10px] hover:bg-white hover:text-[#EA580C] transition-all duration-300"
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
              <span className="w-5 h-5 bg-[#EA580C] rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-ink">SOUR DUCK MARKET</span>
            </div>
            <p className="type-serif text-stone text-lg leading-relaxed mb-6 max-w-sm">
              East Austin farm-to-table bakery, smokehouse, and wood-fired burger eatery
              celebrating local Texas grain and live fire.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-[#EA580C] transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-[#EA580C] text-[10px] mb-5">Navigate</h3>
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
            <h3 className="type-caption text-[#EA580C] text-[10px] mb-5">East Austin Courtyard</h3>
            <div className="grid grid-cols-1 gap-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-ink mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                    <span className="type-label text-smoke text-[9px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                    className="type-label text-smoke text-[9px] hover:text-[#EA580C] transition-colors duration-300 mt-1 block"
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
            © {new Date().getFullYear()} Sour Duck Market · Bryce Gilmore Hospitality · Austin, TX
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-[#EA580C] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-[#EA580C] transition-colors duration-300">
              Terms
            </Link>
            <a href="mailto:hello@sourduckmarket.com" className="type-label text-smoke text-[9px] hover:text-[#EA580C] transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
