'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import OptionWheel from '../../components/OptionWheel';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

export default function BookingPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Sculptural Dry Cut & Glaze');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#09090a',
        color: '#ffffff',
        overflowX: 'hidden',
      }}
    >
      <Header />
      <OptionWheel defaultSelected={4} />

      {/* Full-Bleed Hero Image with Content Overlaid */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '65vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'clamp(2rem, 6vw, 6rem)',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2000&auto=format&fit=crop"
          alt="LUMIÈRE Paris Suite"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.5)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '850px',
          }}
        >
          <h1
            style={{
              fontFamily: serif,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              margin: '0 0 1.25rem 0',
              color: '#ffffff',
              textShadow: '0 10px 40px rgba(0,0,0,0.8)',
            }}
          >
            The Booking
          </h1>

          <p
            style={{
              fontFamily: sans,
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 0,
              maxWidth: '650px',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            Reserve your private acoustic suite appointment.
          </p>
        </div>
      </section>

      {/* Main Reservation Form (Borderless) */}
      <main
        style={{
          maxWidth: '840px',
          margin: '0 auto',
          padding: '5rem clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: '2.5rem',
                fontWeight: 300,
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              Reservation Confirmed
            </h2>
            <p
              style={{
                fontFamily: sans,
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '480px',
                margin: '0 auto 2.5rem auto',
                lineHeight: 1.7,
              }}
            >
              Thank you, {name || 'Honored Guest'}. Your private suite has been reserved for « {service} » on {date || 'the requested date'} at {time}.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              style={{
                fontFamily: sans,
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                background: '#ffffff',
                color: '#09090a',
                border: 'none',
                padding: '0.8rem 2.2rem',
                borderRadius: '100px',
                cursor: 'pointer',
              }}
            >
              New Reservation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: sans, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontFamily: sans,
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: sans, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guest@domain.com"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontFamily: sans,
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: sans, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 00 00 00 00"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontFamily: sans,
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: sans, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                  Ceremony
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  style={{
                    background: '#18181b',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontFamily: sans,
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                >
                  <option value="Sculptural Dry Cut & Glaze">Sculptural Dry Cut & Glaze (185 €)</option>
                  <option value="Sun-Kissed Balayage">Sun-Kissed Balayage (340 €)</option>
                  <option value="White Caviar Immersion & Obsidian Therapy">White Caviar Immersion & Obsidian (230 €)</option>
                  <option value="Complete Restructuring & Visagism">Complete Restructuring & Visagism (240 €)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: sans, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontFamily: sans,
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: sans, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{
                    background: '#18181b',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontFamily: sans,
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                >
                  <option value="09:30">09:30 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:30">04:30 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: sans,
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  background: '#ffffff',
                  color: '#09090a',
                  border: 'none',
                  padding: '1rem 3.5rem',
                  borderRadius: '100px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
              >
                {loading ? 'Confirming...' : 'Confirm Reservation &rarr;'}
              </button>
            </div>
          </form>
        )}

        {/* Bottom Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '4rem',
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
            }}
          >
            &larr; Main Experience
          </Link>

          <Link
            href="/catalogue"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            The Catalogue &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
