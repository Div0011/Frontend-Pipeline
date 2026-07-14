"use client";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 checkerboard" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SMASH<span className="text-brand-yellow">GUYS</span>
            </h3>
            <p
              className="text-brand-cream/60 max-w-sm leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Bangalore&apos;s iconic smash burger kitchen. Premium burgers,
              creative sides, and handcrafted shakes — crafted with obsession.
            </p>
            <p
              className="text-xs text-brand-cream/40 mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Smash Guys is owned and operated by Popo Ventures.
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: "Instagram", href: "https://www.instagram.com/smashguys.in/" },
                { label: "YouTube", href: "https://www.youtube.com/abgupta" },
                { label: "Order Online", href: "https://smashguys.in/order" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-brand-cream/40 hover:text-brand-yellow transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Locations
            </h4>
            <ul className="space-y-3">
              {[
                "Indiranagar",
                "Bellandur",
                "RMV 2nd Stage",
                "Whitefield",
              ].map((loc) => (
                <li key={loc}>
                  <a
                    href="#locations"
                    className="text-sm text-brand-cream/60 hover:text-brand-cream transition-colors duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {loc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Hours
            </h4>
            <ul className="space-y-3">
              <li
                className="text-sm text-brand-cream/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Mon — Thu: 11am — 11pm
              </li>
              <li
                className="text-sm text-brand-cream/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Fri — Sat: 11am — 12am
              </li>
              <li
                className="text-sm text-brand-cream/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Sun: 11am — 10pm
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:mail@popoventures.com"
                  className="text-sm text-brand-cream/60 hover:text-brand-cream transition-colors duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  mail@popoventures.com
                </a>
              </li>
              <li
                className="text-sm text-brand-cream/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                080-47362227
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-brand-cream/30"
            style={{ fontFamily: "var(--font-body)" }}
          >
            &copy; {new Date().getFullYear()} Smash Guys. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-brand-cream/30 hover:text-brand-cream/60 transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-brand-cream/30 hover:text-brand-cream/60 transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
