'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '../../lib/data';
import { ProductCard } from '../shared/ProductCard';
import { Search, LayoutGrid, List } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery]           = useState('');
  const [viewMode, setViewMode]                 = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Luxury Decorative', 'High Speed', 'High Flow', 'Smart IoT'];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="collection"
      style={{
        position: 'relative',
        padding: '5rem 0',
        background: 'transparent',
      }}
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,82,204,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,204,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(0,212,255,0.65)',
              marginBottom: '0.75rem',
            }}
          >
            Chapter V — The Architectural Storefront
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
            <h2
              className="heading-xl"
              style={{
                color: '#ffffff',
                background: 'linear-gradient(130deg, #ffffff 30%, rgba(0,212,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              All Series
            </h2>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search
                  size={14}
                  color="rgba(0,212,255,0.5)"
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                />
                 <input
                   type="text"
                   placeholder="Search model..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   data-cursor="default"
                   style={{
                    width: '220px',
                    padding: '0.65rem 1rem 0.65rem 2.5rem',
                    borderRadius: '9999px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(0,82,204,0.25)',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* View toggle */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.2rem',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '0.25rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {(['grid', 'list'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '0.4rem 0.6rem',
                      borderRadius: '7px',
                      background: viewMode === mode ? 'rgba(0,82,204,0.35)' : 'transparent',
                      border: viewMode === mode ? '1px solid rgba(0,82,204,0.5)' : '1px solid transparent',
                      color: viewMode === mode ? '#00d4ff' : 'rgba(255,255,255,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {mode === 'grid' ? <LayoutGrid size={14} /> : <List size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map((cat) => {
            const count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  border: active ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  background: active
                    ? 'linear-gradient(135deg, rgba(0,82,204,0.3), rgba(0,212,255,0.15))'
                    : 'rgba(255,255,255,0.02)',
                  color: active ? '#00d4ff' : 'rgba(255,255,255,0.4)',
                  boxShadow: active ? '0 0 20px rgba(0,82,204,0.2)' : 'none',
                  transition: 'all 0.25s var(--ease-expo-out)',
                }}
              >
                {cat}
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.55rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '9999px',
                    background: active ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.06)',
                    color: active ? 'rgba(0,212,255,0.9)' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          {filteredProducts.length} {filteredProducts.length === 1 ? 'fan' : 'fans'} available
          {selectedCategory !== 'All' ? ` · ${selectedCategory}` : ''}
        </p>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid'
                ? 'repeat(auto-fill, minmax(300px, 1fr))'
                : '1fr',
              gap: '1.5rem',
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              borderRadius: '24px',
              border: '1px dashed rgba(0,82,204,0.2)',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            <Search size={36} color="rgba(0,82,204,0.3)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
              No fans found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
