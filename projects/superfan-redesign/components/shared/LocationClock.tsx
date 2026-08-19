'use client';

import React, { useEffect, useState } from 'react';

interface LocationClockProps {
  city: string;
  offset: number;
  label?: string;
}

export const LocationClock: React.FC<LocationClockProps> = ({
  city,
  offset,
  label = 'Wait...10AM–6PM M–F',
}) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + offset * 3600000);
      const h = String(local.getHours()).padStart(2, '0');
      const m = String(local.getMinutes()).padStart(2, '0');
      const s = String(local.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [offset]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.15rem',
        fontFamily: 'var(--font-ui)',
        fontSize: '0.8rem',
      }}
    >
      <div style={{ fontWeight: 700, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {city}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#ffffff', fontWeight: 400 }}>
        {time || '--:--:--'}
      </div>
      <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.5)' }}>
        {label}
      </div>
    </div>
  );
};
