'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, RotateCcw, Volume2, VolumeX, Calendar, ArrowRight } from 'lucide-react';
import { CookieDisc, CookieConfig } from '../ui/CookieDisc';
import { playCookieCrack } from '@/lib/soundFx';

interface CookieMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
  onOpenReservation?: () => void;
}

export const COOKIE_CATEGORIES_3X3: CookieConfig[] = [
  {
    id: 'espresso',
    name: 'Espresso & Slow Pours',
    categoryTitle: 'Dark Chocolate Chip',
    cookieFlavor: '64% Dark Cocoa & Flaky Maldon Salt',
    baseColor: '#E2A96B',
    accentColor: '#F5C88F',
    chipColor: '#2B1408',
    tagline: 'Single origin extractions & delicate filter brews',
    sectionTarget: '/menu',
  },
  {
    id: 'cakes',
    name: 'Oven Cakes & Tortes',
    categoryTitle: 'Double Fudge Truffle',
    cookieFlavor: '70% Valrhona Cocoa & French Butter',
    baseColor: '#6B3C24',
    accentColor: '#8C5232',
    chipColor: '#1A0B05',
    tagline: 'Freshly baked daily at dawn in the 240°C hearth',
    sectionTarget: '/menu',
  },
  {
    id: 'coldbrew',
    name: 'Cold Brews & Tonics',
    categoryTitle: 'Salted Caramel Oat',
    cookieFlavor: 'Rolled Oats & Toffee Sugar Crunch',
    baseColor: '#D99B5B',
    accentColor: '#E8B37A',
    chipColor: '#5C2D13',
    tagline: '18-hour gravity cold drip and citrus tonics',
    sectionTarget: '/menu',
  },
  {
    id: 'matcha',
    name: 'Matcha & Botanicals',
    categoryTitle: 'Matcha Pistachio',
    cookieFlavor: 'Ceremonial Uji Green Tea & White Nibs',
    baseColor: '#8FA876',
    accentColor: '#AEC298',
    chipColor: '#FAF5E8',
    tagline: 'Stoneground ceremonial tea & botanical infusions',
    sectionTarget: '/menu',
  },
  {
    id: 'pastries',
    name: 'Dawn Viennoiserie',
    categoryTitle: 'Cinnamon Pecan Glaze',
    cookieFlavor: 'Saigon Cinnamon & Toasted Pecans',
    baseColor: '#C97D4E',
    accentColor: '#DC9568',
    chipColor: '#3D1C0E',
    tagline: 'Flaky laminated croissants and morning buns',
    sectionTarget: '/menu',
  },
  {
    id: 'terroirs',
    name: 'Single-Origin Cupping',
    categoryTitle: 'Geisha Volcanic Nib',
    cookieFlavor: 'Ethiopian & Colombian Micro-Lots',
    baseColor: '#D4A359',
    accentColor: '#E7BD7C',
    chipColor: '#4A2511',
    tagline: 'Curated terroirs, tasting notes and brew ratios',
    sectionTarget: '/history',
  },
  {
    id: 'story',
    name: 'Our Dawn Ritual',
    categoryTitle: 'Stoneground Spelt',
    cookieFlavor: 'Organic Ancient Grains & Sea Salt',
    baseColor: '#CBB282',
    accentColor: '#DFC79B',
    chipColor: '#3F2212',
    tagline: 'The philosophy of slow craft and quiet moments',
    sectionTarget: '/about',
  },
  {
    id: 'gallery',
    name: 'Atelier Salon',
    categoryTitle: 'Vanilla Shortbread',
    cookieFlavor: 'Madagascar Vanilla Bean Crust',
    baseColor: '#EED9A6',
    accentColor: '#FDF0CE',
    chipColor: '#6B3A19',
    tagline: 'Cozy sunlit solarium & hand-thrown ceramics',
    sectionTarget: '/gallery',
  },
  {
    id: 'reservation',
    name: 'Reserve a Table',
    categoryTitle: 'Roasted Hazelnut Praline',
    cookieFlavor: 'Caramelized Hazelnut & Raw Sugar',
    baseColor: '#B06D44',
    accentColor: '#CA865C',
    chipColor: '#281106',
    tagline: 'Private morning tastings & afternoon flights',
    sectionTarget: '#visit',
  },
];

export function CookieMenuOverlay({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenReservation,
}: CookieMenuOverlayProps) {
  const router = useRouter();
  const [selectedCookieId, setSelectedCookieId] = useState<string | null>(null);
  const [eatenCookies, setEatenCookies] = useState<Record<string, boolean>>({});
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Audio Ambient Synthesizer
  const toggleAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.035;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 650;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        gainNodeRef.current = gainNode;

        setIsAudioPlaying(true);
      } catch {
        setIsAudioPlaying(false);
      }
    } else {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.001,
          audioContextRef.current.currentTime + 0.5
        );
        setTimeout(() => {
          audioContextRef.current?.close();
          setIsAudioPlaying(false);
        }, 500);
      } else {
        setIsAudioPlaying(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCookieClick = (cookie: CookieConfig) => {
    setSelectedCookieId(cookie.id);

    setEatenCookies((prev) => ({
      ...prev,
      [cookie.id]: true,
    }));

    playCookieCrack();

    onSelectCategory?.(cookie.id);

    setTimeout(() => {
      onClose();

      if (cookie.id === 'reservation') {
        onOpenReservation?.();
        return;
      }

      if (cookie.sectionTarget) {
        if (cookie.sectionTarget.startsWith('/')) {
          router.push(cookie.sectionTarget);
        } else {
          const targetEl = document.querySelector(cookie.sectionTarget);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    }, 1000);
  };

  const handleDirectLinkClick = (target: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleResetCookies = () => {
    setEatenCookies({});
    setSelectedCookieId(null);
  };

  return (
    <div className="fixed inset-0 z-[10009] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Cinematic Dark Backdrop */}
      <div
        className="absolute inset-0 bg-[#0D0705]/92 backdrop-blur-xl transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Full-Screen Cookie Grid */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Close Button — top right only */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 sm:top-8 sm:right-8 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer z-20"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3x3 Grid of Interactive Cookies */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 w-full max-w-5xl px-6">
          {COOKIE_CATEGORIES_3X3.map((cookie) => {
            const isHalf = !!eatenCookies[cookie.id];
            const isSelected = selectedCookieId === cookie.id;

            return (
              <div
                key={cookie.id}
                className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-white/10 scale-105'
                    : 'hover:bg-white/5'
                }`}
              >
                <CookieDisc
                  cookie={cookie}
                  isEaten={isHalf}
                  isSelected={isSelected}
                  onClick={() => handleCookieClick(cookie)}
                  size="lg"
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
