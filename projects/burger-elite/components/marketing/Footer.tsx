import Link from "next/link";

const LOCATIONS = [
  {
    "name": "Mahalakshmi Layout",
    "address": "34, 9th B Cross Rd, West of Chord Rd 2nd Stage",
    "hours": "12pm \u2013 11pm",
    "phone": "099454 83345"
  }
];

const NAV = [
  { href: "/menu", label: "Craft Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/locations", label: "Bangalore Outlets" },
  { href: "/reservations", label: "Party Orders & Catering" },
  { href: "/films", label: "Kitchen Series" },
];

const SOCIAL = [
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "mailto:orders@burgerelite.in", label: "Email Us" },
  { href: "https://swiggy.com", label: "Swiggy" },
  { href: "https://zomato.com", label: "Zomato" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-[#7C3AED] text-char px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-char">READY FOR THE ELITE SMASH?</span>
          <span className="type-serif text-char/80 italic text-lg hidden sm:block">Order direct via click-to-WhatsApp or visit our kitchen in Mahalakshmi Layout.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/locations" className="bg-char text-[#7C3AED] hover:bg-white hover:text-char transition-all px-6 py-3 type-caption text-[10px]">
            Find Outlet →
          </Link>
          <a
            href="https://zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-char text-char px-6 py-3 type-caption text-[10px] hover:bg-char hover:text-[#7C3AED] transition-all duration-300"
          >
            Order on Zomato ↗
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 bg-[#7C3AED] rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-bone">BURGER ELITE</span>
            </div>
            <p className="type-serif text-stone text-lg leading-relaxed mb-6 max-w-sm">
              Mahalakshmi Layout premier street smash burgers and loaded fries.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-[#7C3AED] transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-[#7C3AED] text-[10px] mb-5">Navigate</h3>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="type-body text-stone text-sm hover:text-bone transition-colors duration-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-5">
            <h3 className="type-caption text-[#7C3AED] text-[10px] mb-5">Bangalore Outlets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LOCATIONS.map((loc: any) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-bone mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                    <span className="type-label text-smoke text-[9px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                    className="type-label text-smoke text-[9px] hover:text-[#7C3AED] transition-colors duration-300 mt-1 block"
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
            © {new Date().getFullYear()} Burger Elite Hospitality · Bangalore, India
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-[#7C3AED] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-[#7C3AED] transition-colors duration-300">
              Terms
            </Link>
            <a href="mailto:orders@burgerelite.in" className="type-label text-smoke text-[9px] hover:text-[#7C3AED] transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
