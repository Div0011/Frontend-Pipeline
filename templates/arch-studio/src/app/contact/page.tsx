'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white text-ink">
      <div className="relative z-10">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-ink/5">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-mono text-xs tracking-widest uppercase text-ink/60 hover:text-ink transition-colors">
              ← Back
            </Link>
            <span className="font-mono text-xs tracking-widest uppercase text-ink/40">
              Contact
            </span>
          </div>
        </header>

        <section className="max-w-2xl mx-auto px-6 pt-24 pb-16">
          <p className="font-mono text-xs tracking-widest uppercase text-ink/50 mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tighter text-ink leading-[0.95] mb-8">
            Contact
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/60 leading-relaxed mb-12">
            For project inquiries, collaborations, or general questions, please reach out.
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="font-mono text-xs tracking-widest uppercase text-ink/40 mb-2">Email</h2>
              <a href="mailto:hello@forma.studio" className="font-display text-xl md:text-2xl text-ink hover:text-ink/70 transition-colors">
                hello@forma.studio
              </a>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-widest uppercase text-ink/40 mb-2">Phone</h2>
              <a href="tel:+1234567890" className="font-display text-xl md:text-2xl text-ink hover:text-ink/70 transition-colors">
                +1 (234) 567-890
              </a>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-widest uppercase text-ink/40 mb-2">Studio</h2>
              <p className="font-sans text-base md:text-lg text-ink/60 leading-relaxed">
                123 Architecture Avenue<br />
                Design District, NY 10001
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-ink/5">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
            <span className="font-display text-xl tracking-tight text-ink">FORMA</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink/40">
              Architecture Studio
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
