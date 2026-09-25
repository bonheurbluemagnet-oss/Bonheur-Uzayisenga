import React from 'react';
import {
  Package,
  Search,
  Truck,
  Bike,
  ShieldCheck,
  Clock,
  ArrowRight,
  Smartphone,
  CheckCircle2,
  Navigation,
  Film,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { IshemaLogo } from './IshemaLogo';
import kigaliCourierImg from '../assets/images/kigali_delivery_courier_1789733816368.jpg';

export const HomeHero: React.FC = () => {
  const {
    setIsBookingModalOpen,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    categories,
    setSelectedCategory
  } = useStore();

  const handleTrackClick = () => {
    setCurrentView('track');
  };

  const handleCategoryShortcut = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    if (cat) {
      setSelectedCategory(cat);
      setCurrentView('category');
    }
  };

  return (
    <div id="home-hero-section" className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-white py-12 md:py-16">
      {/* Background Subtle Shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-amber-300 text-amber-900 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>#1 On-Demand Delivery & Marketplace in Rwanda</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.15]">
              Fast & Reliable Delivery Across <span className="text-amber-600">Rwanda</span>
            </h1>

            <p className="font-body text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              From Kigali’s vibrant restaurants and trusted merchants to doorsteps in Musanze, Rubavu, and across the nation. Order on-demand motorcycle couriers or shop fresh food, electronics, and fashion with instant MTN MoMo checkout.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="hero-order-delivery-btn"
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                <Package className="w-4 h-4" />
                <span>Order a Delivery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-track-package-btn"
                type="button"
                onClick={handleTrackClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-interface font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Track Your Package</span>
              </button>
            </div>

            {/* Quick Feature Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200/60 text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                  <Bike className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-interface font-bold text-xs text-slate-900 block">30 Mins</span>
                  <span className="text-[11px] text-slate-500 font-body">Kigali Moto</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-interface font-bold text-xs text-slate-900 block">MTN & Airtel</span>
                  <span className="text-[11px] text-slate-500 font-body">Instant MoMo</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800 shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-interface font-bold text-xs text-slate-900 block">Live GPS</span>
                  <span className="text-[11px] text-slate-500 font-body">Turn-by-turn</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-interface font-bold text-xs text-slate-900 block">100% Insured</span>
                  <span className="text-[11px] text-slate-500 font-body">Safe delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200/60 bg-white">
              <img
                src={kigaliCourierImg}
                alt="Ishema Express Delivery Courier in Kigali Rwanda"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />

              {/* Top Floating Official Brand Seal */}
              <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center gap-2.5 z-10">
                <IshemaLogo variant="mark" size="sm" />
                <div className="pr-1.5">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-heading font-black text-xs text-[#0047AB] italic">ISHEMA</span>
                    <span className="font-heading font-black text-xs text-[#FFB800] italic">EXPRESS</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-interface font-medium">Official Dispatch Fleet</span>
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md text-white border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Bike className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-interface text-white block">
                      Active Kigali Fleet
                    </span>
                    <span className="text-[11px] text-amber-400 font-medium">
                      240+ Drivers online right now
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="hero-animate-rider-btn"
                    type="button"
                    onClick={() => setCurrentView('animate-rider')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    title="Animate this rider into video with Veo 3.1 Fast"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Animate Rider</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-interface font-bold text-xs transition-colors"
                  >
                    Dispatch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Category Icons Strip */}
        <div className="mt-10 pt-6 border-t border-slate-200/70">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500">
              Browse Rwanda Marketplace
            </span>
            <span className="text-xs text-amber-700 font-semibold">
              Explore dynamic categories
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryShortcut(cat.id)}
                className="p-3 rounded-2xl bg-white hover:bg-amber-50 border border-slate-200/80 hover:border-amber-300 shadow-2xs transition-all flex items-center gap-3 text-left group"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="font-interface font-bold text-xs text-slate-900 group-hover:text-amber-700 truncate block">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-body block truncate">
                    {cat.subcategories.length} subcategories
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
