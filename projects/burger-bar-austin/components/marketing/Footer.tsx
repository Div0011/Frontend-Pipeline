import Link from "next/link";

const LOCATIONS = [
  { name: "Congress Walk-Up Window", address: "208 Congress Ave, Austin, TX 78701", hours: "11am – 10pm Daily", phone: "(512) 476-4900" },
];

const NAV = [
  { href: "/menu", label: "Walk-Up Menu" },
  { href: "/about", label: "Congress Ave Heritage" },
  { href: "/locations", label: "Downtown Location" },
  { href: "/reservations", label: "Express Catering" },
  { href: "/films", label: "Downtown Films" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/burgerbaraustin", label: "Instagram" },
  { href: "mailto:info@burgerbaraustin.com", label: "Contact Us" },
  { href: "https://doordash.com", label: "DoorDash" },
  { href: "https://ubereats.com", label: "UberEats" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-[#2563EB] text-white px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-white">DOWNTOWN LUNCH ON THE FLY?</span>
          <span className="type-serif text-white/80 italic text-lg hidden sm:block">Walk up to 208 Congress Ave for quick, sizzling Texas Angus burgers & shakes.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/locations" className="bg-[#F59E0B] text-black hover:bg-white transition-all px-6 py-3 type-caption text-[10px]">
            Walk-Up Window →
          </Link>
          <a
            href="https://doordash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 type-caption text-[10px] hover:bg-white hover:text-[#2563EB] transition-all duration-300"
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
              <span className="w-5 h-5 bg-[#2563EB] border border-[#F59E0B] rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-ink">BURGER BAR ON CONGRESS</span>
            </div>
            <p className="type-serif text-stone text-lg leading-relaxed mb-6 max-w-sm">
              Downtown Austin&apos;s iconic walk-up burger window serving flat-top griddled Angus burgers,
              Shiner Bock onion rings, and Fredericksburg peach shakes.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-[#F59E0B] transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-[#F59E0B] text-[10px] mb-5">Navigate</h3>
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
            <h3 className="type-caption text-[#F59E0B] text-[10px] mb-5">Walk-Up Window</h3>
            <div className="grid grid-cols-1 gap-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-ink mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    <span className="type-label text-smoke text-[9px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                    className="type-label text-smoke text-[9px] hover:text-[#F59E0B] transition-colors duration-300 mt-1 block"
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
            © {new Date().getFullYear()} Burger Bar on Congress · White Lodging Hospitality · Austin, TX
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-[#F59E0B] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-[#F59E0B] transition-colors duration-300">
              Terms
            </Link>
            <a href="mailto:info@burgerbaraustin.com" className="type-label text-smoke text-[9px] hover:text-[#F59E0B] transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
