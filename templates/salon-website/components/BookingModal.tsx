'use client';

import React, { useState } from 'react';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const SERVICES = [
  { id: 'cut', name: 'Couture Haircut & Sculpture', price: '€180', duration: '75 min' },
  { id: 'balayage', name: 'Balayage Sur-Mesure & Glossing', price: '€290', duration: '150 min' },
  { id: 'elixir', name: 'Botanical Keratin & Ritual Elixir', price: '€220', duration: '90 min' },
  { id: 'gala', name: 'Gala & Editorial Styling', price: '€160', duration: '60 min' },
];

const STYLISTS = [
  { id: 'elodie', name: 'Élodie Laurent', role: 'Creative Director', image: '✨' },
  { id: 'antoine', name: 'Antoine Moreau', role: 'Master Colorist', image: '🎨' },
  { id: 'sophie', name: 'Sophie Chen', role: 'Texture Specialist', image: '✂️' },
];

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

export function BookingModal({ isOpen, onClose, initialService }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService || SERVICES[0].id);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0].id);
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 11 Aug');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setBookingConfirmed(true);
  };

  const currentServiceObj = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];
  const currentStylistObj = STYLISTS.find((s) => s.id === selectedStylist) || STYLISTS[0];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(11, 11, 12, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '620px',
          background: '#141316',
          border: '1px solid rgba(230, 198, 135, 0.25)',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(230, 198, 135, 0.1)',
          color: '#f5f3ef',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: '1px solid rgba(245, 243, 239, 0.2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: 'rgba(245, 243, 239, 0.7)',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#e6c687';
            (e.currentTarget as HTMLButtonElement).style.color = '#e6c687';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245, 243, 239, 0.2)';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245, 243, 239, 0.7)';
          }}
        >
          ✕
        </button>

        {!bookingConfirmed ? (
          <>
            {/* Header / Steps Indicator */}
            <div style={{ marginBottom: '2rem' }}>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#e6c687',
                  marginBottom: '0.4rem',
                }}
              >
                MAISON LUMIÈRE · RESERVATION STEP {step} OF 3
              </p>
              <h2
                style={{
                  fontFamily: serif,
                  fontSize: '2.2rem',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {step === 1 && 'Select Hair Ritual'}
                {step === 2 && 'Choose Master Stylist'}
                {step === 3 && 'Select Appointment & Details'}
              </h2>
            </div>

            {/* Step Progress Bar */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '2rem',
              }}
            >
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: '2px',
                    background: s <= step ? '#e6c687' : 'rgba(245, 243, 239, 0.15)',
                    transition: 'background 0.3s ease',
                  }}
                />
              ))}
            </div>

            {/* STEP 1: SERVICE SELECT */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {SERVICES.map((serv) => {
                  const isSelected = selectedService === serv.id;
                  return (
                    <div
                      key={serv.id}
                      onClick={() => setSelectedService(serv.id)}
                      style={{
                        padding: '1.25rem 1.5rem',
                        background: isSelected
                          ? 'rgba(230, 198, 135, 0.12)'
                          : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected
                          ? '1px solid #e6c687'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontFamily: serif,
                            fontSize: '1.25rem',
                            fontWeight: 400,
                            margin: '0 0 0.25rem',
                            color: isSelected ? '#e6c687' : '#f5f3ef',
                          }}
                        >
                          {serv.name}
                        </h4>
                        <span
                          style={{
                            fontFamily: sans,
                            fontSize: '0.75rem',
                            color: 'rgba(245, 243, 239, 0.5)',
                          }}
                        >
                          Duration: {serv.duration}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: serif,
                          fontSize: '1.2rem',
                          color: '#e6c687',
                          fontWeight: 500,
                        }}
                      >
                        {serv.price}
                      </span>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    marginTop: '1.5rem',
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #f2e3c6 0%, #e6c687 100%)',
                    color: '#0b0b0c',
                    fontFamily: sans,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(230, 198, 135, 0.3)',
                  }}
                >
                  Continue to Stylist →
                </button>
              </div>
            )}

            {/* STEP 2: STYLIST SELECT */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {STYLISTS.map((sty) => {
                  const isSelected = selectedStylist === sty.id;
                  return (
                    <div
                      key={sty.id}
                      onClick={() => setSelectedStylist(sty.id)}
                      style={{
                        padding: '1.25rem 1.5rem',
                        background: isSelected
                          ? 'rgba(230, 198, 135, 0.12)'
                          : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected
                          ? '1px solid #e6c687'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'rgba(230, 198, 135, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                        }}
                      >
                        {sty.image}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4
                          style={{
                            fontFamily: serif,
                            fontSize: '1.25rem',
                            fontWeight: 400,
                            margin: '0 0 0.2rem',
                            color: isSelected ? '#e6c687' : '#f5f3ef',
                          }}
                        >
                          {sty.name}
                        </h4>
                        <span
                          style={{
                            fontFamily: sans,
                            fontSize: '0.75rem',
                            color: 'rgba(245, 243, 239, 0.5)',
                          }}
                        >
                          {sty.role}
                        </span>
                      </div>
                      {isSelected && (
                        <span style={{ color: '#e6c687', fontSize: '1.2rem' }}>✓</span>
                      )}
                    </div>
                  );
                })}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'transparent',
                      color: 'rgba(245, 243, 239, 0.7)',
                      fontFamily: sans,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      border: '1px solid rgba(245, 243, 239, 0.2)',
                      borderRadius: '50px',
                      cursor: 'pointer',
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    style={{
                      flex: 2,
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #f2e3c6 0%, #e6c687 100%)',
                      color: '#0b0b0c',
                      fontFamily: sans,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                    }}
                  >
                    Continue to Date →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DATE, TIME & CONTACT DETAILS */}
            {step === 3 && (
              <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: sans,
                      fontSize: '0.7rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(245, 243, 239, 0.6)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Select Preferred Date
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {['Tomorrow, 11 Aug', 'Wed, 12 Aug', 'Thu, 13 Aug', 'Fri, 14 Aug'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        style={{
                          padding: '0.6rem 1rem',
                          borderRadius: '12px',
                          background: selectedDate === d ? '#e6c687' : 'rgba(255, 255, 255, 0.05)',
                          color: selectedDate === d ? '#0b0b0c' : '#f5f3ef',
                          border: 'none',
                          fontSize: '0.75rem',
                          fontFamily: sans,
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: sans,
                      fontSize: '0.7rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(245, 243, 239, 0.6)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Select Time Slot
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        style={{
                          padding: '0.5rem 0.85rem',
                          borderRadius: '10px',
                          background: selectedTime === t ? 'rgba(230, 198, 135, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          color: selectedTime === t ? '#e6c687' : 'rgba(245, 243, 239, 0.8)',
                          border: selectedTime === t ? '1px solid #e6c687' : '1px solid rgba(255, 255, 255, 0.08)',
                          fontSize: '0.75rem',
                          fontFamily: sans,
                          cursor: 'pointer',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    style={{
                      padding: '0.85rem 1.25rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(245, 243, 239, 0.15)',
                      borderRadius: '12px',
                      color: '#f5f3ef',
                      fontFamily: sans,
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    style={{
                      padding: '0.85rem 1.25rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(245, 243, 239, 0.15)',
                      borderRadius: '12px',
                      color: '#f5f3ef',
                      fontFamily: sans,
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'transparent',
                      color: 'rgba(245, 243, 239, 0.7)',
                      fontFamily: sans,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      border: '1px solid rgba(245, 243, 239, 0.2)',
                      borderRadius: '50px',
                      cursor: 'pointer',
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 2,
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #f2e3c6 0%, #e6c687 100%)',
                      color: '#0b0b0c',
                      fontFamily: sans,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(230, 198, 135, 0.4)',
                    }}
                  >
                    Confirm Reservation ✨
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          /* CONFIRMATION TICKET SCREEN */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(230, 198, 135, 0.2)',
                border: '1px solid #e6c687',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: '#e6c687',
              }}
            >
              ✦
            </div>

            <p
              style={{
                fontFamily: sans,
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#e6c687',
                marginBottom: '0.5rem',
              }}
            >
              RESERVATION CONFIRMED
            </p>
            <h2
              style={{
                fontFamily: serif,
                fontSize: '2.4rem',
                fontWeight: 400,
                margin: '0 0 1.5rem',
              }}
            >
              We Await You, {clientInfo.name || 'Cher Guest'}
            </h2>

            {/* Ticket Card */}
            <div
              style={{
                background: 'rgba(230, 198, 135, 0.06)',
                border: '1px dashed rgba(230, 198, 135, 0.4)',
                borderRadius: '20px',
                padding: '1.75rem',
                textAlign: 'left',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(230,198,135,0.15)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: sans, fontSize: '0.7rem', color: 'rgba(245,243,239,0.5)', letterSpacing: '0.15em' }}>PASS CODE</span>
                <span style={{ fontFamily: serif, fontSize: '1.1rem', color: '#e6c687', letterSpacing: '0.1em' }}>{bookingRef}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ fontFamily: sans, fontSize: '0.65rem', color: 'rgba(245,243,239,0.4)', margin: '0 0 0.2rem' }}>RITUAL</p>
                  <p style={{ fontFamily: serif, fontSize: '1rem', margin: 0 }}>{currentServiceObj.name}</p>
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: '0.65rem', color: 'rgba(245,243,239,0.4)', margin: '0 0 0.2rem' }}>STYLIST</p>
                  <p style={{ fontFamily: serif, fontSize: '1rem', margin: 0 }}>{currentStylistObj.name}</p>
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: '0.65rem', color: 'rgba(245,243,239,0.4)', margin: '0 0 0.2rem' }}>DATE & TIME</p>
                  <p style={{ fontFamily: sans, fontSize: '0.85rem', margin: 0, color: '#e6c687' }}>{selectedDate} · {selectedTime}</p>
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: '0.65rem', color: 'rgba(245,243,239,0.4)', margin: '0 0 0.2rem' }}>ATELIER</p>
                  <p style={{ fontFamily: sans, fontSize: '0.85rem', margin: 0 }}>12 Rue du Faubourg, Paris 8e</p>
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: sans,
                fontSize: '0.8rem',
                color: 'rgba(245, 243, 239, 0.6)',
                marginBottom: '1.5rem',
              }}
            >
              A confirmation invitation has been dispatched to <strong>{clientInfo.email || 'your email'}</strong>.
            </p>

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.9rem 2.5rem',
                background: '#e6c687',
                color: '#0b0b0c',
                fontFamily: sans,
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
              }}
            >
              Return to Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
