import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  ShoppingBag,
  Sparkles,
  Users,
  Wallet,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  TrendingDown,
  Clock,
  Layers
} from 'lucide-react';
import { SmartBasketPreset } from '../../types';

export const SmartBasketView: React.FC = () => {
  const { smartBasketPresets, loadSmartBasketToCart, addToCart, setIsCartOpen, products } = useStore();
  const [selectedPresetId, setSelectedPresetId] = useState<string>(smartBasketPresets[0]?.id || '');
  const [loadedNotification, setLoadedNotification] = useState<string | null>(null);

  const selectedPreset = smartBasketPresets.find(p => p.id === selectedPresetId) || smartBasketPresets[0];

  const handleLoadBasket = (preset: SmartBasketPreset) => {
    loadSmartBasketToCart(preset.id);
    setLoadedNotification(`Loaded "${preset.name}" (${preset.items.length} items) into your cart!`);
    setTimeout(() => {
      setLoadedNotification(null);
      setIsCartOpen(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-500/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-4 py-1 mb-3 text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Feature 16 • Smart Basket Preset Builder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Stop guessing groceries. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              Pick your household size & budget.
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            One-click full grocery packs tailored for Rwandan households, bachelors, students, and office pantries with consolidated delivery.
          </p>
        </div>
      </div>

      {loadedNotification && (
        <div className="p-4 bg-emerald-500 text-slate-950 rounded-2xl font-bold text-xs flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{loadedNotification}</span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-slate-950 text-white text-xs px-3 py-1.5 rounded-xl font-semibold hover:bg-slate-800"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Preset Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {smartBasketPresets.map(preset => {
          const isSelected = preset.id === selectedPreset?.id;
          const presetName = preset.name || preset.title || 'Smart Basket';
          const idealForText = preset.idealFor || `${preset.peopleCount || 4} People • ${preset.duration || 'Weekly'}`;
          const budget = preset.estimatedBudgetRWF || preset.targetBudget || 65000;
          const desc = preset.description || preset.tagline || '';

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setSelectedPresetId(preset.id)}
              className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {idealForText}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatRWF(budget)}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {presetName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>{preset.items.length} staples included</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Basket Deep-Dive */}
      {selectedPreset && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedPreset.name || selectedPreset.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                  {selectedPreset.idealFor || `${selectedPreset.peopleCount || 4} People • ${selectedPreset.duration || 'Weekly'}`}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedPreset.description || selectedPreset.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Basket Cost</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  {formatRWF(selectedPreset.estimatedBudgetRWF || selectedPreset.targetBudget || 65000)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleLoadBasket(selectedPreset)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg transition-all active:scale-95 shrink-0"
              >
                <ShoppingCart className="w-4 h-4" />
                Load Entire Basket to Cart
              </button>
            </div>
          </div>

          {/* Items breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Included Rwandan Staples ({selectedPreset.items.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedPreset.items.map((item, index) => {
                const itemName = item.productName || item.product?.name || 'Local Rwandan Staple';
                const itemPrice = item.unitPrice || item.product?.price || 1500;
                const itemImage = item.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80';
                const sellerName = item.sellerName || item.product?.seller?.name || 'Musanze Farmers Cooperative';

                return (
                  <div
                    key={index}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={itemImage}
                        alt={itemName}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100 dark:bg-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {itemName}
                        </h5>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Qty: <strong>{item.quantity}</strong> • {formatRWF(itemPrice)} each
                        </span>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                          Direct from {sellerName}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        {formatRWF(itemPrice * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (item.product) {
                            addToCart(item.product, 1);
                          } else {
                            addToCart({
                              id: item.productId,
                              name: itemName,
                              slug: item.productId,
                              price: itemPrice,
                              categoryId: 'groceries',
                              subcategoryId: 'fresh',
                              inStock: true,
                              shortDescription: itemName,
                              description: `${itemName} from ${sellerName}`,
                              images: [itemImage],
                              specifications: {},
                              estimatedDeliveryTime: '30-45 mins',
                              deliveryFee: 1500,
                              stock: 50,
                              rating: 4.8,
                              reviewsCount: 38,
                              seller: {
                                name: sellerName,
                                location: 'Kigali / Musanze',
                                rating: 4.9,
                                verified: true,
                                phone: '+250 788 123 456'
                              }
                            }, 1);
                          }
                        }}
                        className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline mt-1"
                      >
                        + Add Single
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
