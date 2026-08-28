import type { ReactNode } from "react";
import Link from "next/link";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#reel", label: "Reel" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://vimeo.com", label: "Vimeo" },
  { href: "mailto:studio@sfumato.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-cinema-bg border-t border-cinema-ink/5">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-5 bg-cinema-accent rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-cinema-ink">SFUMATO</span>
            </div>
            <p className="type-serif text-cinema-muted text-lg leading-relaxed mb-6 max-w-sm">
              A cinematic maison specializing in slow cinema, deliberate light, and atmospheric storytelling.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="type-label text-cinema-muted text-[9px] hover:text-cinema-accent transition-colors duration-300 border border-cinema-ink/10 px-3 py-2"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-cinema-accent text-[10px] mb-5">Navigate</h3>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="type-body text-cinema-muted text-sm hover:text-cinema-ink transition-colors duration-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h3 className="type-caption text-cinema-accent text-[10px] mb-5">Studio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="type-display text-xl text-cinema-ink mb-1">MUMBAI</h4>
                <p className="type-body text-cinema-muted text-xs leading-relaxed">Bandra West, Mumbai</p>
                <p className="type-label text-cinema-muted text-[9px] mt-2">+91 98300 28470</p>
              </div>
              <div>
                <h4 className="type-display text-xl text-cinema-ink mb-1">VARANASI</h4>
                <p className="type-body text-cinema-muted text-xs leading-relaxed">Ghats Road, Varanasi</p>
                <p className="type-label text-cinema-muted text-[9px] mt-2">studio@sfumato.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cinema-ink/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="type-label text-cinema-muted text-[9px]">
            &copy; {new Date().getFullYear()} SFUMATO // ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-cinema-muted text-[9px] hover:text-cinema-accent transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms" className="type-label text-cinema-muted text-[9px] hover:text-cinema-accent transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
