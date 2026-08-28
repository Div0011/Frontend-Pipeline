'use client';

import { useState, useRef } from 'react';
import { InnerNav } from '@/components/ui/InnerNav';

/* ─── Data ───────────────────────────────────────────── */
type MenuItem = { name: string; price: string; desc: string; note?: string };

const MENU_DATA: Record<string, { label: string; tagline: string; items: MenuItem[] }> = {
  espresso: {
    label: 'Espresso',
    tagline: 'Classic extractions from our seasonal house blend',
    items: [
      { name: 'Espresso', price: '4.00', desc: 'A double shot of our rotating seasonal house blend, pulled at 9 bars.', note: 'Seasonal blend' },
      { name: 'Macchiato', price: '4.50', desc: 'Espresso marked with a small dollop of hand-textured whole milk foam.' },
      { name: 'Cortado', price: '4.75', desc: 'Equal parts double ristretto and silky steamed milk. No foam.', note: 'House favourite' },
      { name: 'Flat White', price: '5.00', desc: 'Two ristretto shots with velvety micro-foam poured through the espresso.' },
      { name: 'Cappuccino', price: '5.25', desc: 'Espresso with thick, airy foam and a dusting of single-origin cocoa.' },
      { name: 'Latte', price: '5.50', desc: 'Smooth and mild — one double shot to 8oz of perfectly textured whole milk.' },
      { name: 'Oat Cortado', price: '5.50', desc: 'Our cortado made with Oatly Barista, poured with a rosette.', note: 'Plant-based' },
      { name: 'Piccolo Latte', price: '4.75', desc: 'A concentrated ristretto with a small pour of milk in a 90ml glass.' },
    ],
  },
  pourover: {
    label: 'Pour Overs',
    tagline: 'Single-origin micro-lots brewed on V60 or Kalita Wave',
    items: [
      { name: 'Ethiopia · Yirgacheffe', price: '6.50', desc: 'Jasmine, bergamot, lemon curd. Light roast, 95°C, 4-min brew.', note: 'Natural process' },
      { name: 'Colombia · Huila Geisha', price: '9.00', desc: 'White peach, papaya, honey finish. Washed process, complex acidity.', note: 'Limited' },
      { name: 'Costa Rica · Tarrazu', price: '7.00', desc: 'Milk chocolate, red apple, toasted almond. Clean and balanced.', note: 'Honey process' },
      { name: 'Kenya · Kirinyaga AA', price: '7.50', desc: 'Blackcurrant, tomato, red wine vinegar. High acidity, full body.' },
      { name: 'Guatemala · Antigua', price: '6.75', desc: 'Brown sugar, dried fig, cocoa nib. Medium roast, smooth finish.', note: 'Direct trade' },
      { name: 'Papua New Guinea · Kunjin', price: '7.00', desc: 'Tropical fruit, caramel sweetness, earthy undertone.' },
    ],
  },
  cold: {
    label: 'Cold & Iced',
    tagline: 'Slow-steeped and chilled over hand-chipped clear ice',
    items: [
      { name: '18-Hour Cold Drip', price: '5.50', desc: 'Gravity-fed slow drip over 18 hours. Incredibly smooth, chocolatey.', note: 'In-house' },
      { name: 'Nitro Cold Brew', price: '6.00', desc: 'Cold brew on nitrogen tap. Cascading pour, creamy head, zero sugar.' },
      { name: 'Espresso Tonic', price: '6.00', desc: 'Fever-Tree Indian tonic, double espresso, orange twist and citrus zest.' },
      { name: 'Kyoto Iced Coffee', price: '6.50', desc: 'Japanese slow-drip iced coffee brewed directly over a clear ice sphere.' },
      { name: 'Iced Matcha Latte', price: '6.00', desc: 'Ceremonial-grade Uji matcha whisked with oat milk, shaken over ice.', note: 'Plant-based' },
      { name: 'Cascara Punch', price: '5.75', desc: 'Coffee cherry tea, sparkling water, dried hibiscus. Naturally sweet.' },
    ],
  },
  viennoiserie: {
    label: 'Viennoiserie',
    tagline: 'Laminated by hand at 4AM in our stone hearth kitchen',
    items: [
      { name: 'Classic Butter Croissant', price: '4.50', desc: '72-hour lamination with imported French AOP butter. Baked at 5:30AM.', note: 'Signature' },
      { name: 'Pain au Chocolat', price: '5.00', desc: 'Croissant dough wrapped around two Valrhona 72% dark chocolate batons.' },
      { name: 'Cardamom Morning Bun', price: '5.50', desc: 'Flaky dough rolled in Saigon cinnamon sugar and roasted citrus zest.' },
      { name: 'Almond Croissant', price: '6.00', desc: 'Twice-baked with house-made frangipane and toasted Marcona almonds.' },
      { name: 'Pistachio Danish', price: '6.50', desc: 'Laminated pastry with pistachio cream, fresh strawberry, lemon zest.', note: 'Seasonal' },
      { name: 'Seasonal Fruit Tart', price: '7.50', desc: 'Vanilla bean pastry cream, pâte sucrée shell, farmers market berries.' },
      { name: 'Basque Cheesecake', price: '7.50', desc: 'Deeply caramelised, barely-set custard. Served warm from the oven.', note: 'House special' },
    ],
  },
  cookies: {
    label: 'Cookie Atelier',
    tagline: 'Our handcrafted cookie collection — the heart of the cafe',
    items: [
      { name: 'Double Fudge Truffle', price: '4.00', desc: '70% Valrhona cocoa, crisp edges, molten fudge centre, Maldon sea salt.', note: 'Fan favourite' },
      { name: 'Brown Butter Chocolate Chip', price: '3.75', desc: 'Cultured butter browned and chilled, semi-sweet Guittard chips.' },
      { name: 'Matcha White Chocolate', price: '4.25', desc: 'Ceremonial-grade matcha dough with Valrhona Opalys white chocolate.' },
      { name: 'Salted Caramel Oat', price: '3.75', desc: 'Rolled oats, house caramel, flaky salt, and toffee chip crunch.' },
      { name: 'Tahini Sesame', price: '4.00', desc: 'Toasted sesame seed dough with tahini swirl and black sesame brittle.' },
      { name: 'Cardamom Ginger Snap', price: '3.50', desc: 'Warming spice blend, molasses, candied ginger, raw sugar crust.' },
      { name: 'Stoneground Spelt Vanilla', price: '3.75', desc: 'Ancient grain spelt flour, Madagascar vanilla bean, demerara sugar.' },
      { name: 'Geisha Volcanic Nib', price: '5.00', desc: 'Colombia Geisha-infused dough, cacao nibs, pink Himalayan salt.', note: 'Limited' },
    ],
  },
  tea: {
    label: 'Tea & Botanicals',
    tagline: 'Ceremonial grade and wild-foraged botanical infusions',
    items: [
      { name: 'Ceremonial Matcha', price: '6.50', desc: 'First harvest Uji matcha, whisked to order in a chawan. Add milk +$1.', note: 'Japan · Uji' },
      { name: 'Hojicha Latte', price: '6.00', desc: 'Roasted green tea with oat milk and a pinch of Okinawan brown sugar.' },
      { name: 'Genmaicha', price: '4.50', desc: 'Green tea blended with toasted rice. Nutty, warming, caffeine-light.' },
      { name: 'Wild Foraged Mint', price: '4.00', desc: 'Caffeine-free spearmint and peppermint infusion, cold or hot.', note: 'Seasonal' },
      { name: 'Rose & Hibiscus', price: '4.50', desc: 'Organic dried rose petals and hibiscus with a touch of raw honey.' },
      { name: 'Turmeric Golden Milk', price: '5.50', desc: 'Turmeric, ginger, black pepper, oat milk, Manuka honey.', note: 'Plant-based' },
    ],
  },
};

const TAB_ORDER = ['espresso', 'pourover', 'cold', 'viennoiserie', 'cookies', 'tea'];

/* ─── Tilt Item ──────────────────────────────────────── */
function TiltItem({ item, i }: { item: MenuItem; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 6;
    const y = ((e.clientY - top) / height - 0.5) * 6;
    el.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    el.style.transform = '';
    setTimeout(() => { if (el) el.style.transition = ''; }, 550);
  };

  return (
    <div
      ref={ref}
      className="group"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        padding: '1.4rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        animationDelay: `${i * 50}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <h4
              className="font-display font-medium text-white leading-tight group-hover:text-cafe-accent transition-colors duration-300"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', letterSpacing: '-0.01em' }}
            >
              {item.name}
            </h4>
            {item.note && (
              <span
                className="text-[0.58rem] font-body font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: 'rgba(196,167,125,0.1)',
                  color: 'rgba(196,167,125,0.75)',
                  border: '1px solid rgba(196,167,125,0.18)',
                }}
              >
                {item.note}
              </span>
            )}
          </div>
          <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
            {item.desc}
          </p>
          {/* Hover underline sweep */}
          <div
            className="mt-3 h-px w-0 group-hover:w-full transition-all duration-500"
            style={{ background: 'rgba(196,167,125,0.2)', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
          />
        </div>
        <span
          className="font-body font-semibold tabular-nums flex-shrink-0 mt-0.5"
          style={{ color: '#C4A77D', fontSize: '1rem', letterSpacing: '-0.01em' }}
        >
          ${item.price}
        </span>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function MenuPage() {
  const [activeTab, setActiveTab] = useState('espresso');
  const activeData = MENU_DATA[activeTab];

  return (
    <main
      className="relative min-h-screen"
      style={{ background: '#0D0705', color: '#F7F4F0' }}
    >
      <InnerNav />

      {/* Radial accent glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196,167,125,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">

        {/* ── Header ── */}
        <header className="mb-16 sm:mb-20">
          <div className="chapter-tag mb-5" style={{ color: 'rgba(196,167,125,0.7)' }}>
            The Complete Menu
          </div>
          <h1
            className="font-display font-normal text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', letterSpacing: '-0.03em' }}
          >
            Our Offerings
          </h1>
          <p className="font-body font-light leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '1.05rem' }}>
            Every item made to order, every origin sourced with intention, every bake timed to the dawn light.
          </p>
        </header>

        {/* ── Tabs ── */}
        <div
          className="flex items-center gap-1 flex-wrap mb-14"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0' }}
        >
          {TAB_ORDER.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative font-body font-medium transition-all duration-300 cursor-pointer"
                style={{
                  padding: '0.65rem 1.1rem',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: isActive ? '#C4A77D' : 'rgba(255,255,255,0.4)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #C4A77D' : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'color 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)';
                }}
              >
                {MENU_DATA[tab].label}
              </button>
            );
          })}
        </div>

        {/* ── Category header ── */}
        <div className="mb-10">
          <h2
            className="font-display font-normal leading-tight mb-2"
            style={{ color: '#C4A77D', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            {activeData.label}
          </h2>
          <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.32)' }}>
            {activeData.tagline}
          </p>
        </div>

        {/* ── Items list ── */}
        <div key={activeTab}>
          {activeData.items.map((item, i) => (
            <TiltItem key={item.name} item={item} i={i} />
          ))}
        </div>

        {/* ── Footer note ── */}
        <div
          className="mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)', maxWidth: '36ch' }}>
            All prices exclude tax. Milk alternatives available on all espresso drinks. Seasonal items subject to availability.
          </p>
          <a
            href="/#reserve"
            className="inline-flex items-center gap-2.5 rounded-full font-body font-semibold uppercase tracking-[0.14em] cursor-pointer flex-shrink-0"
            style={{
              padding: '0.8rem 2rem',
              fontSize: '0.65rem',
              background: 'rgba(196,167,125,0.1)',
              color: '#C4A77D',
              border: '1px solid rgba(196,167,125,0.22)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              Object.assign((e.currentTarget as HTMLAnchorElement).style, {
                background: 'rgba(196,167,125,0.18)',
                borderColor: 'rgba(196,167,125,0.45)',
                transform: 'translateY(-2px)',
              });
            }}
            onMouseLeave={(e) => {
              Object.assign((e.currentTarget as HTMLAnchorElement).style, {
                background: 'rgba(196,167,125,0.1)',
                borderColor: 'rgba(196,167,125,0.22)',
                transform: '',
              });
            }}
          >
            Reserve a Table
          </a>
        </div>
      </div>
    </main>
  );
}
