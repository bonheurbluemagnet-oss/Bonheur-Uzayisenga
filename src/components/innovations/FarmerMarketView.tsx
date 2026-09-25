import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Sprout,
  MapPin,
  Calendar,
  Truck,
  CheckCircle2,
  ShoppingCart,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product } from '../../types';

export const FarmerMarketView: React.FC = () => {
  const { products, addToCart, setIsCartOpen } = useStore();
  const [activeSubscription, setActiveSubscription] = useState<string | null>(null);

  // Farm products
  const farmProducts = products.filter(
    p =>
      p.categoryId === 'cat-fresh' ||
      p.name.toLowerCase().includes('potato') ||
      p.name.toLowerCase().includes('honey') ||
      p.name.toLowerCase().includes('fruit') ||
      p.name.toLowerCase().includes('coffee')
  );

  const SUBSCRIPTION_BOXES = [
    {
      id: 'sub-weekly-family',
      title: 'Weekly Kigali Family Veggie & Fruit Box',
      price: 25000,
      cadence: 'Every Saturday Morning at 8:00 AM',
      items: '10kg Musanze Kinigi potatoes, 2kg ripe tree tomatoes, 3 pineapples, 2kg Bugesera carrots, fresh spinach & avocados',
      savings: 'Save 30% vs supermarket prices'
    },
    {
      id: 'sub-organic-greens',
      title: 'Healthy Clean Greens & Herbs Crate',
      price: 15000,
      cadence: 'Every Tuesday & Friday Morning',
      items: 'Crisp lettuce, organic celery, mint, coriander, baby spinach, and local cherry tomatoes',
      savings: 'Straight from Gatsibo organic farm'
    }
  ];

  const handleSubscribe = (boxId: string) => {
    setActiveSubscription(boxId);
    setTimeout(() => {
      alert('Subscription confirmed! Your recurring fresh farm box is scheduled with contactless landmark delivery.');
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-500/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-4 py-1 mb-3 text-xs font-semibold text-emerald-300">
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span>Feature 12 • Farm-Direct to Your Door</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Fresh harvest from Musanze & Bugesera. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-lime-300">
              No middleman markup. 100% to farmers.
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            Buy whole crates and seasonal harvests delivered direct from registered cooperatives to your home in Kigali within 24 hours of harvest.
          </p>
        </div>
      </div>

      {/* Weekly Subscription Crates */}
      <div>
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          Weekly Farm-Box Delivery Subscriptions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBSCRIPTION_BOXES.map(box => (
            <div
              key={box.id}
              className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {box.savings}
                  </span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {formatRWF(box.price)} / box
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {box.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {box.items}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{box.cadence}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Free delivery to Kigali</span>
                <button
                  type="button"
                  onClick={() => handleSubscribe(box.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSubscription === box.id
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {activeSubscription === box.id ? 'Subscribed ✓' : 'Subscribe to Box'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fresh Farm Items */}
      <div>
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
          Fresh Harvest Available Today ({farmProducts.length} items)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {farmProducts.map(prod => (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Harvested Today
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block truncate">
                  {prod.seller?.name || 'Musanze Cooperative'}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                  {prod.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {formatRWF(prod.price)}
                  </span>
                  <span className="text-[11px] text-slate-400">/ crate</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToCart(prod, 1)}
                className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
