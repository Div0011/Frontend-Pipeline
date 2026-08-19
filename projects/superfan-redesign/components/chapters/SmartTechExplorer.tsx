'use client';

import React, { useState } from 'react';
import { Mic, WifiOff, Sparkles, Smartphone, Volume2 } from 'lucide-react';

export const SmartTechExplorer: React.FC = () => {
  const [activeVoiceCmd, setActiveVoiceCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'voice' | 'duocool'>('voice');

  const voiceCommands = [
    { phrase: '"Superfan, Speed 5"', action: 'Fan accelerates instantly to max airflow Level 5', audioFeedback: 'Superfan speed set to level 5.' },
    { phrase: '"Superfan, Breeze Mode"', action: 'Activates organic natural airflow pulse simulation', audioFeedback: 'Breeze mode activated.' },
    { phrase: '"Superfan, Turn Off"', action: 'Decelerates BLDC motor smoothly to complete halt', audioFeedback: 'Powering off Superfan.' },
    { phrase: '"Superfan, Timer 2 Hours"', action: 'Sets automatic sleep shutdown timer for 120 minutes', audioFeedback: 'Timer set for 2 hours.' },
  ];

  const handleVoiceTrigger = (cmd: typeof voiceCommands[0]) => {
    setActiveVoiceCmd(cmd.phrase);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cmd.audioFeedback);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section
      id="smart-tech"
      style={{
        padding: '5rem 0',
        backgroundColor: 'transparent',
        color: '#ffffff',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
          <span
            style={{
              fontSize: '0.68rem',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#00d4ff',
              fontWeight: 600,
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            CHAPTER IV — INTELLIGENCE WITHOUT DEPENDENCY
          </span>
          <h2
            className="heading-xl"
            style={{
              marginTop: '0.5rem',
              marginBottom: '1rem',
              color: '#ffffff',
              background: 'linear-gradient(130deg, #ffffff 30%, rgba(0,212,255,0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Super myQ Direct Voice Technology
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.6 }}>
            Zero internet needed. Zero mobile app setups required. Speak directly to your ceiling fan in English or Hindi — powered by an onboard neural microprocessor.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button
            onClick={() => setActiveTab('voice')}
            style={{
              padding: '0.75rem 1.8rem',
              borderRadius: '9999px',
              border: activeTab === 'voice' ? '1.5px solid #00d4ff' : '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: activeTab === 'voice' ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              color: activeTab === 'voice' ? '#00d4ff' : 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <Mic size={15} color="#00d4ff" /> Direct Voice Control
          </button>

          <button
            onClick={() => setActiveTab('duocool')}
            style={{
              padding: '0.75rem 1.8rem',
              borderRadius: '9999px',
              border: activeTab === 'duocool' ? '1.5px solid #00d4ff' : '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: activeTab === 'duocool' ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              color: activeTab === 'duocool' ? '#00d4ff' : 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <Smartphone size={15} color="#00d4ff" /> Duocool Dual Airflow
          </button>
        </div>

        {activeTab === 'voice' ? (
          <div
            style={{
              borderRadius: '32px',
              padding: '3.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              background: 'linear-gradient(145deg, rgba(5,18,42,0.95) 0%, rgba(3,10,24,0.98) 100%)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.68rem', color: '#00d4ff', fontFamily: 'var(--font-ui)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <WifiOff size={15} /> 100% OFFLINE ON-DEVICE SPEECH CHIP
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#ffffff', marginBottom: '1.25rem', fontWeight: 300 }}>
                Test On-Device Voice Recognition
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
                Click any voice command phrase below to trigger interactive audio feedback from the onboard micro-chip:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {voiceCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleVoiceTrigger(cmd)}
                    style={{
                      padding: '1.1rem 1.3rem',
                      borderRadius: '16px',
                      background: activeVoiceCmd === cmd.phrase ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: activeVoiceCmd === cmd.phrase ? '1.5px solid #00d4ff' : '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Mic size={18} color="#00d4ff" />
                      <div>
                        <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, color: '#ffffff', fontSize: '0.95rem' }}>{cmd.phrase}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)' }}>{cmd.action}</div>
                      </div>
                    </div>
                    {activeVoiceCmd === cmd.phrase && (
                      <span style={{ fontSize: '0.65rem', color: '#00d4ff', fontFamily: 'var(--font-ui)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Volume2 size={12} /> SPEAKING
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Video preview instead of static image */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  height: '340px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 212, 255, 0.25)',
                  background: '#020b1c',
                  marginBottom: '1.5rem',
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
                >
                  <source src="/media/futuristic_fan_spinning.mp4" type="video/mp4" />
                </video>
              </div>

              {activeVoiceCmd && (
                <div
                  style={{
                    background: 'rgba(0, 212, 255, 0.12)',
                    border: '1px solid #00d4ff',
                    borderRadius: '16px',
                    padding: '1rem',
                    color: '#ffffff',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.85rem',
                  }}
                >
                  <Sparkles size={16} color="#00d4ff" style={{ margin: '0 auto 0.25rem' }} />
                  Voice Command Triggered: <strong>{activeVoiceCmd}</strong>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              borderRadius: '32px',
              padding: '3.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              background: 'linear-gradient(145deg, rgba(5,18,42,0.95) 0%, rgba(3,10,24,0.98) 100%)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.68rem', color: '#00d4ff', fontFamily: 'var(--font-ui)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                BI-DIRECTIONAL REVERSIBLE MOTOR
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#ffffff', margin: '0.5rem 0 1rem', fontWeight: 300 }}>
                Duocool Winter & Summer Modes
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                In summer, Superfan rotates counter-clockwise to drive powerful downdraft windchill. In winter, reverse mode pulls cool air upward to displace warm trapped ceiling heat back down into your room without draft.
              </p>
            </div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', height: '340px', border: '1px solid rgba(0,212,255,0.2)' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                <source src="/media/fan_smooth_spinning.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
