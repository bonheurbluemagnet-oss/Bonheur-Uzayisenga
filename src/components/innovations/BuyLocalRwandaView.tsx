import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Store,
  ShoppingCart,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  Plus
} from 'lucide-react';
import { Product } from '../../types';

export const BuyLocalRwandaView: React.FC = () => {
  const { products, addToCart } = useStore();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registeredBusinessSuccess, setRegisteredBusinessSuccess] = useState(false);

  // Form states
  const [bizName, setBizName] = useState('');
  const [bizType, setBizType] = useState('Handicrafts & Art');
  const [bizLocation, setBizLocation] = useState('Kimironko Market');
  const [bizPhone, setBizPhone] = useState('+250 78');

  // Rwandan local products
  const localProducts = products.filter(
    p =>
      p.isMadeInRwanda ||
      p.categoryId === 'cat-artisan' ||
      p.seller?.name?.includes('Rwanda') ||
      p.seller?.name?.includes('Cooperative') ||
      p.badge?.includes('Local') ||
      p.badge?.includes('Rwanda')
  );

  const COOPERATIVE_SPOTLIGHTS = [
    {
      name: 'Abahuzamugambi Coffee Cooperative (Maraba)',
      region: 'Huye, Southern Province',
      impact: 'Fair trade wages for 450 smallholder coffee farming families',
      story: 'Cultivating award-winning bourbon arabica coffee cherries at high volcanic altitudes.'
    },
    {
      name: 'Nyamirambo Women’s Artisan Cooperative',
      region: 'Nyamirambo, Kigali',
      impact: 'Empowering 55 women through traditional Agaseke weaving & tailoring',
      story: 'Every peace basket represents unity and cultural pride preserved for generations.'
    },
    {
      name: 'Musanze High-Altitude Potato Farmers (COPOPIN)',
      region: 'Kinigi, Musanze',
      impact: 'Direct market access eliminating exploitative middlemen',
      story: 'Crisp, volcanic-soil grown Kinigi potatoes harvested and sent fresh to Kigali daily.'
    }
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredBusinessSuccess(true);
    setTimeout(() => {
      setRegisteredBusinessSuccess(false);
      setShowRegisterModal(false);
      setBizName('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-500/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-4 py-1 mb-3 text-xs font-semibold text-emerald-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Feature 10 • Made in Rwanda 🇷🇼 Certified</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Empower Rwandan Artisans, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              Cooperatives, & Small Producers.
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            Every item purchased here directly supports Rwandan families, local weavers, organic farmers, and home-grown entrepreneurs with 0 middlemen commission.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Register Rwandan Small Business (Free)
            </button>
          </div>
        </div>
      </div>

      {/* Cooperative Spotlights */}
      <div>
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          Verified Rwandan Cooperatives Spotlight
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COOPERATIVE_SPOTLIGHTS.map((coop, idx) => (
            <div
              key={idx}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:border-emerald-500/50 transition-colors"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  {coop.region}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {coop.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {coop.story}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{coop.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Authentic Made in Rwanda Catalog ({localProducts.length} items)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {localProducts.map(prod => (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <ShieldCheck className="w-3 h-3" />
                    Made in Rwanda
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {prod.seller?.name || 'Local Rwandan Artisan'}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                  {prod.name}
                </h4>
                <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatRWF(prod.price)}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {prod.estimatedDeliveryTime || 'Same-day'}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart(prod, 1)}
                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all active:scale-95"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Small Business Registration */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Register Rwandan Producer / Small Shop
                </h3>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ishema Express charges 0% platform listing fee for verified Rwandan small businesses and cooperatives. Get your products visible to thousands of buyers in Kigali.
            </p>

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Business or Cooperative Name
                </label>
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={e => setBizName(e.target.value)}
                  placeholder="e.g. Kimironko Organic Fruits & Honey"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={bizType}
                    onChange={e => setBizType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Agriculture & Farm">Agriculture & Fresh Produce</option>
                    <option value="Handicrafts & Art">Handicrafts & Agaseke</option>
                    <option value="Specialty Coffee & Tea">Specialty Coffee & Tea</option>
                    <option value="Fashion & Made in Rwanda">Fashion & Tailoring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    District / Market Location
                  </label>
                  <input
                    type="text"
                    required
                    value={bizLocation}
                    onChange={e => setBizLocation(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone (MTN / Airtel for MoMo Payouts)
                </label>
                <input
                  type="tel"
                  required
                  value={bizPhone}
                  onChange={e => setBizPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {registeredBusinessSuccess ? (
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Producer profile verified and listed on Ishema Express!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  Submit Producer Onboarding
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
