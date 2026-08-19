'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FAQS } from '../../lib/data';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

const CATEGORIES = ['All', 'Installation', 'Savings', 'Warranty', 'Specs'];

const getCategoryForFaq = (faq: { question: string; answer: string }): string => {
  const q = faq.question.toLowerCase() + ' ' + faq.answer.toLowerCase();
  if (q.includes('install') || q.includes('wiring') || q.includes('fit')) return 'Installation';
  if (q.includes('sav') || q.includes('power') || q.includes('unit') || q.includes('bill') || q.includes('cost')) return 'Savings';
  if (q.includes('warrant') || q.includes('replace') || q.includes('repair') || q.includes('support')) return 'Warranty';
  return 'Specs';
};

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || getCategoryForFaq(faq) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="faq"
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
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <span className="label-ui">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="heading-xl" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            Everything You Need to Know
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
            BLDC motors, power savings, remote operation, warranty — answered honestly.
          </p>
        </div>

        {/* Layout: sidebar + accordion */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          {/* Sidebar Categories */}
          <div
            style={{
              position: 'sticky',
              top: '7rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', letterSpacing: '0.18em', color: 'rgba(0,200,248,0.55)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Filter by Topic
            </div>
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? FAQS.length : FAQS.filter((f) => getCategoryForFaq(f) === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '9px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    background: isActive ? 'rgba(0,200,248,0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(0,200,248,0.3)' : '1px solid transparent',
                    color: isActive ? '#00c8f8' : 'rgba(255,255,255,0.45)',
                    transition: 'all 0.22s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontSize: '0.55rem',
                      background: isActive ? 'rgba(0,200,248,0.15)' : 'rgba(255,255,255,0.06)',
                      color: isActive ? '#00c8f8' : 'rgba(255,255,255,0.25)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Search */}
            <div style={{ position: 'relative', marginTop: '1.5rem' }}>
              <Search size={13} color="rgba(0,200,248,0.5)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-cursor="default"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem 0.65rem 2.2rem',
                  borderRadius: '9px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(0,82,204,0.22)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* FAQ Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {filteredFaqs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                No matching questions.
              </div>
            )}
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{
                    borderRadius: '14px',
                    backgroundColor: isOpen ? 'rgba(0,82,204,0.08)' : 'rgba(255,255,255,0.025)',
                    border: isOpen ? '1px solid rgba(0,200,248,0.35)' : '1px solid rgba(0,82,204,0.12)',
                    borderLeft: isOpen ? '3px solid #00c8f8' : '3px solid transparent',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, background 0.3s ease, border-left-color 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '1.15rem 1.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      color: '#ffffff',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 300,
                      lineHeight: 1.3,
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <HelpCircle size={16} color={isOpen ? '#00c8f8' : 'rgba(0,200,248,0.4)'} style={{ marginTop: '3px', flexShrink: 0, transition: 'color 0.25s ease' }} />
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={16}
                      color={isOpen ? '#00c8f8' : 'rgba(255,255,255,0.3)'}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.32s var(--ease-expo-out), color 0.25s ease',
                        flexShrink: 0,
                        marginLeft: '1rem',
                      }}
                    />
                  </button>

                  {/* Smooth CSS max-height accordion */}
                  <div
                    style={{
                      maxHeight: isOpen ? '600px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.45s var(--ease-expo-out)',
                    }}
                  >
                    <div
                      style={{
                        padding: '0 1.4rem 1.4rem 3.2rem',
                        fontSize: '0.92rem',
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.72,
                        borderTop: '1px solid rgba(0,200,248,0.08)',
                        paddingTop: '1rem',
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
