'use client';

import { useState } from 'react';
import { Sparkles, Compass, Thermometer, Check, Coffee } from 'lucide-react';

const TERROIRS = [
  {
    id: 'ethiopia',
    name: 'Ethiopia Yirgacheffe',
    region: 'Gedeo Zone, 2,150m Altitude',
    process: '72h Anaerobic Natural',
    notes: ['Bergamot', 'Jasmine Blossom', 'White Peach', 'Wild Honey'],
    description: 'Cultivated under native shade trees in rich volcanic soil. Bursting with floral notes and citrus tea-like clarity.',
    flavorMetrics: [
      { label: 'Floral Aroma', value: 98 },
      { label: 'Bright Acidity', value: 92 },
      { label: 'Natural Sweetness', value: 95 },
      { label: 'Silky Body', value: 65 },
    ],
    recommendedBrew: 'V60 Pour-Over · 93.5°C · 1:16 Ratio',
    badge: 'Seasonal Grand Cru',
  },
  {
    id: 'colombia',
    name: 'Colombia Pink Bourbon',
    region: 'Huila San Adolfo, 1,950m Altitude',
    process: 'Washed Extended Fermentation',
    notes: ['Pink Grapefruit', 'Panela Sugar', 'Red Currant', 'Dark Cocoa'],
    description: 'A rare natural mutation producing juicy stone fruit brightness balanced by rich brown sugar caramel.',
    flavorMetrics: [
      { label: 'Floral Aroma', value: 82 },
      { label: 'Bright Acidity', value: 85 },
      { label: 'Natural Sweetness', value: 90 },
      { label: 'Silky Body', value: 80 },
    ],
    recommendedBrew: 'Double Espresso · 9 Bar · 18g in / 38g out',
    badge: 'Micro-Lot Exclusive',
  },
  {
    id: 'sumatra',
    name: 'Sumatra Gayo Reserve',
    region: 'Aceh Highlands, 1,650m Altitude',
    process: 'Traditional Wet-Hulled',
    notes: ['Cedar Wood', 'Dark Molasses', 'Sweet Tobacco', 'Black Truffle'],
    description: 'Grown on misty slopes. Renowned for rich velvety body, low acidity, and lingering cocoa notes.',
    flavorMetrics: [
      { label: 'Floral Aroma', value: 60 },
      { label: 'Bright Acidity', value: 48 },
      { label: 'Natural Sweetness', value: 75 },
      { label: 'Silky Body', value: 98 },
    ],
    recommendedBrew: 'Syphon Vacuum Pot or Velvet Flat White',
    badge: 'Atelier Signature',
  },
  {
    id: 'yemen',
    name: 'Yemen Mocha Mattari',
    region: 'Bani Mattar Terraces, 2,400m Altitude',
    process: 'Sun-Dried Natural',
    notes: ['Cardamom Pod', 'Dried Fig', 'Pomegranate', 'Bittersweet Cacao'],
    description: 'Harvested from centuries-old stone cliff terraces. An ancient lineage with exotic spice aromatics.',
    flavorMetrics: [
      { label: 'Floral Aroma', value: 88 },
      { label: 'Bright Acidity', value: 78 },
      { label: 'Natural Sweetness', value: 86 },
      { label: 'Silky Body', value: 88 },
    ],
    recommendedBrew: 'Manual Copper Briki / Kyoto Cold Drip',
    badge: 'Heritage Lot',
  },
];

export function RoastExplorer() {
  const [activeTerroirId, setActiveTerroirId] = useState('ethiopia');
  const active = TERROIRS.find((t) => t.id === activeTerroirId) || TERROIRS[0];

  return (
    <section id="terroirs" className="py-28 bg-cafe-warm border-b-2 border-cafe-text">
      <div className="max-w-content mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="chapter-tag justify-center">[02 / COFFEE BEANS & TERROIRS]</span>
          <h2 className="section-title">
            The Single-Origin <em>Cupping Bar</em>
          </h2>
          <p className="text-cafe-text-muted mt-3 text-base">
            Select a harvest lot to explore tasting profiles, altitude elevations, and extraction recipes.
          </p>
        </div>

        {/* 2D Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 reveal reveal-delay-1">
          {TERROIRS.map((terroir) => {
            const isSelected = terroir.id === activeTerroirId;
            return (
              <button
                key={terroir.id}
                onClick={() => setActiveTerroirId(terroir.id)}
                className={`p-4 text-left border-2 rounded-2xl transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cafe-text text-cafe-bg border-cafe-text shadow-[4px_4px_0px_#D89F56] transform -translate-y-1'
                    : 'bg-white text-cafe-text border-cafe-text shadow-[3px_3px_0px_#2A1A12] hover:bg-cafe-bg'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isSelected ? 'bg-cafe-accent text-cafe-dark border-cafe-accent' : 'bg-cafe-warm text-cafe-text border-cafe-text/30'
                  }`}>
                    {terroir.badge}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-cafe-accent" />}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold leading-snug">
                    {terroir.name}
                  </h3>
                  <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-cafe-text-muted'}`}>
                    {terroir.process}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Bean Showcase Card */}
        <div className="bg-white rounded-3xl border-2 border-cafe-text shadow-[8px_8px_0px_#2A1A12] p-6 md:p-10 grid lg:grid-cols-12 gap-8 items-center reveal reveal-delay-2">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cafe-secondary">
                <Compass className="w-4 h-4" />
                <span>{active.region}</span>
              </div>
              <h3 className="font-display text-3xl font-bold text-cafe-text">
                {active.name}
              </h3>
            </div>

            <p className="text-cafe-text-muted text-sm sm:text-base leading-relaxed">
              {active.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cafe-text">Tasting Notes</span>
              <div className="flex flex-wrap gap-2">
                {active.notes.map((note) => (
                  <span
                    key={note}
                    className="badge-2d bg-cafe-warm text-xs"
                  >
                    <Sparkles className="w-3 h-3 text-cafe-secondary mr-1" />
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-cafe-bg rounded-2xl border-2 border-cafe-text/30 flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-cafe-secondary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cafe-text block">
                  Recommended Brew Calibration
                </span>
                <span className="text-xs text-cafe-text-muted font-mono">{active.recommendedBrew}</span>
              </div>
            </div>
          </div>

          {/* Flavor Meter Bars */}
          <div className="lg:col-span-5 bg-cafe-bg p-6 rounded-2xl border-2 border-cafe-text space-y-4">
            <div className="flex justify-between items-center border-b-2 border-cafe-text/20 pb-2">
              <span className="font-display font-bold text-base text-cafe-text">Flavor Profile Scale</span>
              <span className="text-[0.65rem] font-mono font-bold text-cafe-secondary">100% Index</span>
            </div>

            <div className="space-y-3">
              {active.flavorMetrics.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-cafe-text">
                    <span>{metric.label}</span>
                    <span className="font-mono text-cafe-secondary">{metric.value}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-cafe-text">
                    <div
                      className="h-full bg-cafe-accent transition-all duration-500"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <a
                href="#menu"
                className="btn-2d-primary text-xs w-full py-2.5 text-center justify-center"
              >
                Order {active.name} in Menu
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
