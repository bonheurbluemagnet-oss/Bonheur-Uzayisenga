import React, { useState, useEffect } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Tag,
  Clock,
  Zap,
  Percent,
  ShoppingCart,
  CheckCircle2,
  Gift,
  ArrowRight
} from 'lucide-react';
import { Product } from '../../types';

export const IshemaDealsView: React.FC = () => {
  const { deals, products, addToCart, navigateToProduct } = useStore();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner with Ticking Flash Countdown */}
      <div className="bg-gradient-to-r from-red-900 via-rose-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-red-500/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/40 rounded-full px-4 py-1 mb-3 text-xs font-semibold text-red-300">
              <Zap className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <span>Feature 11 • Kigali Daily Flash Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Exclusive Discounts & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-200 to-yellow-300">
                Buy-One-Get-One Kigali Specials.
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Partnered with top Rwandan suppliers to bring daily price cuts and free delivery promotions.
            </p>
          </div>

          {/* Flash Timer Box */}
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-rose-300 block mb-1">
              Flash Deals Expire In:
            </span>
            <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-black font-mono">
              <span className="bg-slate-900 px-3 py-1.5 rounded-xl">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-slate-900 px-3 py-1.5 rounded-xl">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-slate-900 px-3 py-1.5 rounded-xl text-rose-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {deals.map(deal => {
          const finalPrice = deal.discountedPrice || deal.dealPrice || deal.originalPrice;
          const discountPct = deal.discountPercent || (deal.dealPrice ? Math.round(((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100) : 25);
          const isFlash = deal.isFlashDeal || deal.dealType === 'Flash Sale';
          const dealImage = deal.photoUrl || deal.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600';

          return (
            <div
              key={deal.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div
                className="cursor-pointer group"
                onClick={() => deal.productId && navigateToProduct(deal.productId)}
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={dealImage}
                    alt={deal.title}
                    referrerPolicy="no-referrer"
                    onError={e => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    {deal.discountBadge || `${discountPct}% OFF`}
                  </div>
                  {isFlash && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                      <Zap className="w-3 h-3 fill-slate-950" /> FLASH
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {deal.description}
                  </p>

                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-base font-black text-rose-600 dark:text-rose-400">
                      {formatRWF(finalPrice)}
                    </span>
                    <span className="text-xs line-through text-slate-400">
                      {formatRWF(deal.originalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    const matched = products.find(p => p.id === deal.productId) || products[0];
                    if (matched) {
                      addToCart({ ...matched, price: finalPrice }, 1);
                    }
                  }}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Claim Deal & Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
