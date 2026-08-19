'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IndianRupee, Clock, Home, Zap, Leaf } from 'lucide-react';
import { PRODUCTS } from '../../lib/data';

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = null;
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

export const EnergySavingsCalculator: React.FC = () => {
  const [numFans, setNumFans] = useState(4);
  const [dailyHours, setDailyHours] = useState(14);
  const [tariffRate, setTariffRate] = useState(8);

  const traditionalWatts = 75;
  const bldcWatts = 30;
  const wattsSavedPerFan = traditionalWatts - bldcWatts;

  const dailyKwhSaved = (numFans * wattsSavedPerFan * dailyHours) / 1000;
  const annualKwhSaved = dailyKwhSaved * 365;
  const annualRupeesSaved = Math.round(annualKwhSaved * tariffRate);
  const annualCo2ReducedKg = Math.round(annualKwhSaved * 0.82);
  const fiveYearSavings = annualRupeesSaved * 5;
  const treesEquivalent = Math.round(annualCo2ReducedKg / 21); // avg tree absorbs ~21kg CO2/year

  const fanCost = PRODUCTS[1]?.price || 4299;
  const totalInvestment = fanCost * numFans;
  const paybackMonths = Math.max(6, Math.round(totalInvestment / (annualRupeesSaved / 12)));

  const animatedSavings = useCountUp(annualRupeesSaved, 900);

  return (
    <section
      id="calculator"
      style={{
        padding: '5rem 0',
        backgroundColor: 'transparent',
        color: '#ffffff',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
          <span className="label-ui">CHAPTER III — FINANCIAL LOGIC</span>
          <h2
            className="heading-xl"
            style={{ marginTop: '0.75rem', marginBottom: '1rem' }}
          >
            Savings Calculator
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
            Adjust your household to compute real financial returns and payback timeline.
          </p>
        </div>

        {/* 3-panel layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {/* LEFT — Sliders */}
          <div
            style={{
              borderRadius: '20px',
              padding: '2.5rem',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(0,200,248,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(0,200,248,0.65)', textTransform: 'uppercase' }}>
              Your Home Parameters
            </div>

            {[
              {
                icon: <Home size={14} color="#00c8f8" />,
                label: 'Number of Fans',
                value: numFans,
                display: `${numFans} ${numFans === 1 ? 'Fan' : 'Fans'}`,
                min: 1, max: 15,
                onChange: (v: number) => setNumFans(v),
              },
              {
                icon: <Clock size={14} color="#00c8f8" />,
                label: 'Daily Running Hours',
                value: dailyHours,
                display: `${dailyHours} hrs/day`,
                min: 4, max: 24,
                onChange: (v: number) => setDailyHours(v),
              },
              {
                icon: <IndianRupee size={14} color="#00c8f8" />,
                label: 'Tariff Rate',
                value: tariffRate,
                display: `₹${tariffRate}/kWh`,
                min: 5, max: 14,
                onChange: (v: number) => setTariffRate(v),
              },
            ].map((slider) => (
              <div key={slider.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.82)', fontFamily: 'var(--font-body)' }}>
                    {slider.icon}
                    {slider.label}
                  </label>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', fontWeight: 600, color: '#00c8f8' }}>
                    {slider.display}
                  </span>
                </div>
                {/* Custom track with fill */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    value={slider.value}
                    onChange={(e) => slider.onChange(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#00c8f8', cursor: 'pointer' }}
                  />
                  {/* Track fill indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '5px',
                      width: `${((slider.value - slider.min) / (slider.max - slider.min)) * 100}%`,
                      background: 'linear-gradient(90deg, #0052cc, #00c8f8)',
                      borderRadius: '3px',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Payback timeline */}
            <div style={{ background: 'rgba(0,200,248,0.06)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0,200,248,0.18)' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', letterSpacing: '0.15em', color: '#00c8f8', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Payback Timeline
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', fontWeight: 300 }}>
                {paybackMonths} months
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.35rem' }}>
                Then 100% net savings for life
              </div>
            </div>
          </div>

          {/* CENTER — Giant savings number */}
          <div
            style={{
              borderRadius: '20px',
              padding: '2.5rem',
              background: 'linear-gradient(145deg, rgba(0,52,120,0.25) 0%, rgba(2,12,27,0.98) 100%)',
              border: '1px solid rgba(0,200,248,0.28)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow orb */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-30%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(0,82,204,0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
                filter: 'blur(40px)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(0,200,248,0.7)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Annual Electricity Bill Saved
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7vw, 5rem)',
                  fontWeight: 300,
                  color: '#ffffff',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(125deg, #ffffff 0%, #00c8f8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ₹{animatedSavings.toLocaleString('en-IN')}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.75rem' }}>
                Per Year · {numFans} Fans
              </div>

              <div
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  width: '100%',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>5-Year Total</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.3rem', color: '#00c8f8', fontWeight: 500, marginTop: '0.25rem' }}>
                    ₹{fiveYearSavings.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CO₂ Reduced</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.3rem', color: '#ffffff', fontWeight: 500, marginTop: '0.25rem' }}>
                    {annualCo2ReducedKg} kg
                  </div>
                </div>
              </div>

              {/* Tree equivalence */}
              <div
                style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: 'rgba(0,200,248,0.06)',
                  border: '1px solid rgba(0,200,248,0.15)',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                }}
              >
                <Leaf size={14} color="#00c8f8" />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: '#00c8f8', letterSpacing: '0.1em' }}>
                  ≈ {treesEquivalent} trees planted annually
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — kWh breakdown */}
          <div
            style={{
              borderRadius: '20px',
              padding: '2.5rem',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(0,200,248,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(0,200,248,0.65)', textTransform: 'uppercase' }}>
              Energy Breakdown
            </div>

            {[
              { label: 'Traditional Fan (75W)', value: `${Math.round(numFans * 75 * dailyHours * 365 / 1000)} kWh/yr`, color: 'rgba(255,100,100,0.7)', barPct: 100 },
              { label: 'Superfan BLDC (35W)', value: `${Math.round(numFans * bldcWatts * dailyHours * 365 / 1000)} kWh/yr`, color: '#00c8f8', barPct: Math.round((bldcWatts / 75) * 100) },
              { label: 'Units Saved / Day', value: `${dailyKwhSaved.toFixed(2)} kWh`, color: 'rgba(212,175,117,0.8)', barPct: 60 },
            ].map((row) => (
              <div key={row.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: '#ffffff', fontWeight: 500 }}>{row.value}</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${row.barPct}%`,
                      background: row.color,
                      borderRadius: '3px',
                      transition: 'width 0.6s var(--ease-expo-out)',
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Watt comparison visual */}
            <div style={{ marginTop: '0.5rem', padding: '1.5rem', background: 'rgba(0,52,120,0.18)', borderRadius: '12px', border: '1px solid rgba(0,82,204,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'rgba(255,100,100,0.7)', fontWeight: 300 }}>75W</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Old Fan</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Zap size={16} color="#00c8f8" />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: '#00c8f8', fontWeight: 700 }}>69% Less</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#00c8f8', fontWeight: 300 }}>35W</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Superfan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
