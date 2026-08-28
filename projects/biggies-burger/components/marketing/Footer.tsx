import Link from "next/link";

const LOCATIONS = [
  { name: "Church Street (Flagship)", address: "Church St, Haridevpur, Ashok Nagar", hours: "11am – 11:30pm", phone: "073034 47342" },
  { name: "Cunningham Road", address: "Cunningham Rd, Vasanth Nagar", hours: "11am – 11pm", phone: "079087 39053" },
  { name: "AECS Layout", address: "Avalon Arcade, Kundalahalli", hours: "11:30am – 11pm", phone: "073034 47342" },
];

const NAV = [
  { href: "/menu", label: "Grilled Menu" },
  { href: "/about", label: "Flame Heritage" },
  { href: "/locations", label: "Bangalore Stores" },
  { href: "/reservations", label: "Catering & Events" },
  { href: "/films", label: "Brand Films" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/biggiesburger", label: "Instagram" },
  { href: "https://www.facebook.com/biggiesburger", label: "Facebook" },
  { href: "mailto:info@biggiesburger.com", label: "Email Us" },
  { href: "https://swiggy.com", label: "Swiggy" },
  { href: "https://zomato.com", label: "Zomato" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-[#F26522] px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-char">CRAVING FLAME-GRILLED?</span>
          <span className="type-serif text-char/70 italic text-lg hidden sm:block">Visit our Church Street flagship or order directly to your door.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/locations" className="btn-char text-[10px] py-3 px-6">
            Find Nearest Store →
          </Link>
          <a
            href="https://zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-char text-char px-6 py-3 type-caption text-[10px] hover:bg-char hover:text-[#F26522] transition-all duration-300"
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
              <span className="w-5 h-5 bg-[#F26522] rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-ink">BIGGIES BURGER</span>
            </div>
            <p className="type-serif text-stone text-lg leading-relaxed mb-6 max-w-sm">
              India&apos;s pioneering flame-grilled burger brand. Over 130 stores nationwide,
              crafted with authentic wood-smoke and signature spices.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-[#F26522] transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-[#F26522] text-[10px] mb-5">Navigate</h3>
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
            <h3 className="type-caption text-[#F26522] text-[10px] mb-5">Bangalore Locations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-ink mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                    <span className="type-label text-smoke text-[9px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    className="type-label text-smoke text-[9px] hover:text-[#F26522] transition-colors duration-300 mt-1 block"
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
            © {new Date().getFullYear()} Biggies Burger India · Be hungry, be biggie · Bangalore, India
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-[#F26522] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-[#F26522] transition-colors duration-300">
              Terms
            </Link>
            <a href="mailto:info@biggiesburger.com" className="type-label text-smoke text-[9px] hover:text-[#F26522] transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
