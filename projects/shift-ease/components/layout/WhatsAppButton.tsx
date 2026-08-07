'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const message = encodeURIComponent('Hi ShiftEase! I need help finding verified packers and movers for my upcoming relocation.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-navy text-white text-xs py-2 px-3 rounded-xl shadow-xl border border-slate-700">
          <span>Need quick moving advice? Chat with us!</span>
          <button onClick={() => setShowTooltip(false)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <a
        href={`https://wa.me/919876543210?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-emerald-500 text-white w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-emerald-400/30"
        aria-label="Chat with ShiftEase on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}