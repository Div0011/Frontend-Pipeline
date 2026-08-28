import Link from "next/link";

const LOCATIONS = [
  { name: "Indiranagar (Flagship)", address: "839/1 Binnamangala, 1st Stage", hours: "11am – 01am", phone: "096069 89821" },
  { name: "Rajajinagar", address: "722, Savitru Elegance, Modi Hospital Rd", hours: "11am – 11:30pm", phone: "096069 89818" },
  { name: "Sarjapur Road", address: "Sarjapur Main Road, Doddakannelli", hours: "11am – 12:00am", phone: "090359 79994" },
  { name: "Banashankari", address: "100 Feet Ring Rd, 3rd Stage", hours: "11am – 11pm", phone: "072049 41928" },
];

const NAV = [
  { href: "/menu", label: "Spicy Chicken Menu" },
  { href: "/about", label: "The Crunch Story" },
  { href: "/locations", label: "Bangalore Outlets" },
  { href: "/reservations", label: "Party Orders & Wings" },
  { href: "/films", label: "Craft Series" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/leonsindia", label: "Instagram" },
  { href: "https://www.facebook.com/leonsindia", label: "Facebook" },
  { href: "mailto:support.crm@leongrill.net", label: "Support" },
  { href: "https://swiggy.com", label: "Swiggy" },
  { href: "https://zomato.com", label: "Zomato" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-[#B12727] text-white px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-white">READY FOR THE CRUNCH?</span>
          <span className="type-serif text-white/80 italic text-lg hidden sm:block">Open late across 5 Bangalore locations for takeout and delivery.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/locations" className="bg-black text-white hover:bg-white hover:text-black transition-all px-6 py-3 type-caption text-[10px]">
            Find Nearest Outlet →
          </Link>
          <a
            href="https://zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 type-caption text-[10px] hover:bg-white hover:text-[#B12727] transition-all duration-300"
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
              <span className="w-5 h-5 bg-[#B12727] rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-ink">LEON&apos;S BURGERS & WINGS</span>
            </div>
            <p className="type-serif text-stone text-lg leading-relaxed mb-6 max-w-sm">
              Bangalore&apos;s premier spicy fried chicken and burger experience.
              24-hour buttermilk brine, golden crunch, and authentic peri-peri spice.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-[#FC3C3C] transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-[#FC3C3C] text-[10px] mb-5">Navigate</h3>
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
            <h3 className="type-caption text-[#FC3C3C] text-[10px] mb-5">Bangalore Outlets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-ink mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B12727]" />
                    <span className="type-label text-smoke text-[9px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    className="type-label text-smoke text-[9px] hover:text-[#FC3C3C] transition-colors duration-300 mt-1 block"
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
            © {new Date().getFullYear()} Leon Grill Hospitality Pvt Ltd · Bangalore, India
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-[#FC3C3C] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-[#FC3C3C] transition-colors duration-300">
              Terms
            </Link>
            <a href="mailto:support.crm@leongrill.net" className="type-label text-smoke text-[9px] hover:text-[#FC3C3C] transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
