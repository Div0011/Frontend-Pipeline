"use client";

import Stamp from "./Stamp";
import Magnetic from "./Magnetic";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-40 px-6 bg-brand-paper text-center overflow-hidden texture-grain"
    >
      <div className="mx-auto max-w-4xl flex flex-col items-center select-none relative z-10">
        <Stamp>GET IN TOUCH</Stamp>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-brand-ink mt-8 mb-12 tracking-tight">
          Let&apos;s build a <span className="font-script text-brand-accent-warm normal-case font-normal">narrative</span>.
        </h2>

        <Magnetic range={60} strength={0.25}>
          <a
            href="mailto:studio@sfumatofilms.com"
            className="text-3xl sm:text-5xl md:text-6xl font-light font-display text-brand-ink hover:text-brand-accent-warm border-b border-brand-border hover:border-brand-accent-warm py-4 transition-all duration-300 select-all block inline-block"
            data-cursor="STUDIO@SFUMATOFILMS.COM"
          >
            studio@sfumatofilms.com
          </a>
        </Magnetic>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 text-[10px] font-mono tracking-widest text-brand-muted uppercase text-left w-full max-w-2xl border-t border-brand-border pt-12">
          <div>
            <h4 className="text-brand-accent font-semibold mb-3">Office</h4>
            <p className="leading-relaxed">Ghats Road, Varanasi // Bandra West, Mumbai</p>
          </div>
          <div>
            <h4 className="text-brand-accent font-semibold mb-3">General</h4>
            <p className="leading-relaxed">hello@sfumatofilms.com // +91 98300 28470</p>
          </div>
          <div>
            <h4 className="text-brand-accent font-semibold mb-3">Social</h4>
            <p className="leading-relaxed hover:text-brand-accent-warm cursor-pointer transition-colors duration-300">Instagram</p>
            <p className="leading-relaxed hover:text-brand-accent-warm cursor-pointer transition-colors duration-300">Vimeo</p>
          </div>
          <div>
            <h4 className="text-brand-accent font-semibold mb-3">Maison</h4>
            <p className="leading-relaxed">EST. 2024 // ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </section>
  );
}
