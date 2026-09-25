import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const { currentView, trackWhatsAppSupportClick } = useStore();

  const whatsappNumber = '250780837936';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Ishema Express, I would like to order a delivery or get assistance.'
  )}`;

  const handleWhatsAppClick = () => {
    trackWhatsAppSupportClick({
      sourceView: currentView || 'home',
      notes: `User clicked floating WhatsApp button from ${currentView || 'home'} view`
    });
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-slate-950/95 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-2xl shadow-2xl border border-emerald-500/30 animate-in fade-in slide-in-from-right-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-emerald-400 text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Primary Support Channel
            </span>
            <span className="text-[11px] text-slate-300">Need help ordering in Rwanda? Chat on WhatsApp!</span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Button with periodic soft pulse ripple rings */}
      <div className="relative group">
        {/* Outer soft expanding ripple 1 */}
        <span
          className="absolute inset-0 rounded-full bg-emerald-500/40 pointer-events-none animate-whatsapp-ripple"
          aria-hidden="true"
        />

        {/* Outer soft expanding ripple 2 (delayed phase) */}
        <span
          className="absolute inset-0 rounded-full bg-emerald-400/30 pointer-events-none animate-whatsapp-ripple-delayed"
          aria-hidden="true"
        />

        {/* Core Button with subtle periodic breathing/pulse animation */}
        <a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="relative w-14 h-14 rounded-full bg-linear-to-tr from-emerald-600 via-emerald-500 to-teal-400 hover:from-emerald-500 hover:to-teal-300 text-white shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/60 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-whatsapp-soft-pulse group focus:outline-hidden focus:ring-4 focus:ring-emerald-400/40 cursor-pointer"
          title="Chat on WhatsApp - Primary Ishema Express Support"
          aria-label="Chat on WhatsApp with Ishema Express Customer Support"
        >
          <MessageCircle className="w-7 h-7 fill-white/25 group-hover:scale-110 transition-transform duration-200" />

          {/* Active online badge on the top right edge */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-slate-950"></span>
          </span>
        </a>
      </div>
    </div>
  );
};

