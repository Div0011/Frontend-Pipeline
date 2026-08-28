import Link from "next/link";

const LOCATIONS = [
  { name: "Deep Eddy Airstream", address: "2315 Lake Austin Blvd, Austin, TX 78703", hours: "11am – 10pm (Fri-Sat 11pm)", phone: "(512) 334-9747" },
];

const NAV = [
  { href: "/menu", label: "Tiki Smash Menu" },
  { href: "/about", label: "The Airstream Vibe" },
  { href: "/locations", label: "Deep Eddy Location" },
  { href: "/reservations", label: "Tiki Patio Events" },
  { href: "/films", label: "Austin Summer Films" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/poolburgeratx", label: "Instagram" },
  { href: "mailto:hello@poolburgeraustin.com", label: "Email Us" },
  { href: "https://doordash.com", label: "DoorDash" },
  { href: "https://ubereats.com", label: "UberEats" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-[#F43F5E] text-white px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-white">THIRSTY FOR A MAI TAI?</span>
          <span className="type-serif text-white/80 italic text-lg hidden sm:block">Grab a burger & tiki drink under the palm trees at Deep Eddy.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/locations" className="bg-black text-white hover:bg-[#0D9488] transition-all px-6 py-3 type-caption text-[10px]">
            Visit Airstream →
          </Link>
          <a
            href="https://doordash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 type-caption text-[10px] hover:bg-white hover:text-[#F43F5E] transition-all duration-300"
          >
            Order Delivery ↗
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 bg-[#F43F5E] rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-ink">POOL BURGER</span>
            </div>
            <p className="type-serif text-stone text-lg leading-relaxed mb-6 max-w-sm">
              Austin&apos;s 1968 Airstream trailer burger joint and tropical tiki bar
              perched above historic Deep Eddy Pool.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-[#F43F5E] transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-[#F43F5E] text-[10px] mb-5">Navigate</h3>
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
            <h3 className="type-caption text-[#F43F5E] text-[10px] mb-5">Deep Eddy Location</h3>
            <div className="grid grid-cols-1 gap-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-ink mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E]" />
                    <span className="type-label text-smoke text-[9px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                    className="type-label text-smoke text-[9px] hover:text-[#F43F5E] transition-colors duration-300 mt-1 block"
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
            © {new Date().getFullYear()} Pool Burger · Deep Eddy Hospitality · Austin, TX
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-[#F43F5E] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-[#F43F5E] transition-colors duration-300">
              Terms
            </Link>
            <a href="mailto:hello@poolburgeraustin.com" className="type-label text-smoke text-[9px] hover:text-[#F43F5E] transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
