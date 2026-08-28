import Link from "next/link";

const LOCATIONS = [
  { name: "South Austin / Manchaca", address: "5602 Manchaca Rd, Austin, TX", hours: "Mon-Sat: 6am–9pm · Sun: 7am–8pm", phone: "(512) 443-6131" },
  { name: "North Lamar Blvd", address: "5601 N Lamar Blvd, Austin, TX", hours: "Mon-Sat: 6am–9pm · Sun: 7am–8pm", phone: "(512) 459-3239" },
  { name: "Airport Blvd", address: "6105 Airport Blvd, Austin, TX", hours: "Mon-Sat: 6am–9pm · Sun: 7am–8pm", phone: "(512) 451-6000" },
  { name: "Buda Historic", address: "101 Old San Antonio Rd, Buda, TX", hours: "Mon-Sat: 6am–9pm · Sun: 7am–8pm", phone: "(512) 295-8888" },
];

const NAV = [
  { href: "/menu", label: "Austin Menu" },
  { href: "/about", label: "Our 50-Year Story" },
  { href: "/locations", label: "4 Store Locations" },
  { href: "/reservations", label: "Orders & Events" },
  { href: "/films", label: "Heritage Visuals" },
];

const SOCIAL = [
  { href: "https://facebook.com/danshamburgers", label: "Facebook" },
  { href: "tel:5124436131", label: "Call Manchaca: (512) 443-6131" },
  { href: "mailto:info@dans-hamburgers.com", label: "Email Us" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-ember px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-bone">HUNGRY FOR AUSTIN&apos;S BEST?</span>
          <span className="type-serif text-bone/80 italic text-lg hidden sm:block">Walk in or call ahead — breakfast, lunch &amp; dinner made fresh.</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/locations" className="btn-char text-[10px] py-3 px-6">
            Find Nearest Store →
          </Link>
          <Link
            href="/menu"
            className="border border-bone text-bone px-6 py-3 type-caption text-[10px] hover:bg-bone hover:text-ember transition-all duration-300 font-bold"
          >
            View Full Menu ↗
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-ember rounded-sm flex items-center justify-center text-bone font-bold text-xs">
                D
              </div>
              <span className="type-display text-2xl text-ink">Dan&apos;s Hamburgers</span>
            </div>
            <p className="type-serif text-stone text-base leading-relaxed mb-6 max-w-sm">
              Austin&apos;s iconic family-owned burger tradition since 1973. Founded by Dan &amp; Frances Junk,
              proudly continued by Katie Congdon. Made-to-order Angus beef, famous $50 onion rings, and homemade Texas breakfast.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-yolk text-[10px] mb-5 font-bold">Navigate</h3>
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
            <h3 className="type-caption text-yolk text-[10px] mb-5 font-bold">Our 4 Austin Area Stores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-ink mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                    <span className="type-label text-smoke text-[8px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                    className="type-label text-yolk text-[9px] hover:underline transition-colors duration-300 mt-1 block font-bold"
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
            © {new Date().getFullYear()} Dan&apos;s Hamburgers Inc. · Family Owned &amp; Operated in Austin, TX Since 1973
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300">
              Terms
            </Link>
            <a href="mailto:info@dans-hamburgers.com" className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300">
              info@dans-hamburgers.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
