import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Sparkles,
  Search,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  Wallet,
  CheckCircle2,
  ShoppingCart,
  Send,
  Loader2,
  HelpCircle,
  TrendingUp,
  Store
} from 'lucide-react';
import { Product } from '../../types';

export const TellIshemaSignatureBar: React.FC = () => {
  const {
    executeTellIshema,
    isTellIshemaLoading,
    tellIshemaResult,
    tellIshemaQuery,
    setTellIshemaQuery,
    addToCart,
    selectedLocation,
    setIsEmergencyDelivery
  } = useStore();

  const [inputVal, setInputVal] = useState<string>(tellIshemaQuery || '');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'breakdown'>('recommendations');
  const [addedAllSuccess, setAddedAllSuccess] = useState<boolean>(false);

  const SUGGESTED_PROMPTS = [
    { label: 'Dinner for 4 under 20k', text: 'I have 20,000 RWF. Find dinner for four people.' },
    { label: 'Mom Birthday under 40k', text: 'I need a birthday gift for my mother under 40,000 RWF.' },
    { label: 'Office groceries before 1 PM', text: 'I need groceries delivered to my office before 1 PM.' },
    { label: 'Phone charger in Kimironko', text: 'I need a fast phone charger delivered today in Kimironko.' },
    { label: 'Musanze organic vegetables', text: 'Fresh organic vegetables from Musanze under 15,000 RWF.' }
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    executeTellIshema(inputVal.trim());
  };

  const handlePromptClick = (text: string) => {
    setInputVal(text);
    executeTellIshema(text);
  };

  const handleAddAllToCart = (products: Product[]) => {
    products.forEach(p => addToCart(p, 1));
    setAddedAllSuccess(true);
    setTimeout(() => setAddedAllSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-emerald-500/30">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase text-emerald-300">
            Signature AI Feature • Tell Ishema What You Need
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-200/80 bg-slate-900/50 px-3 py-1 rounded-lg border border-emerald-500/20">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Local Context: <strong>{selectedLocation}, Kigali</strong></span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="relative z-10 mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          Type or speak naturally. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
            Tell Ishema your budget, cravings, or deadline.
          </span>
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl">
          Our Rwanda-trained AI calculates the budget, checks neighborhood vendor inventory across Kigali, optimizes multi-store routes, and prepares your order.
        </p>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="relative z-10 mb-4">
        <div className="flex items-center bg-white/10 backdrop-blur-xl border-2 border-emerald-400/50 rounded-2xl p-2 shadow-inner focus-within:border-emerald-300 focus-within:bg-white/15 transition-all">
          <div className="pl-3 pr-2 text-emerald-300">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder='Try: "I have 20,000 RWF. Find dinner for four people in Kimironko."'
            className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base px-2 py-2.5 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isTellIshemaLoading || !inputVal.trim()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 shrink-0"
          >
            {isTellIshemaLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Thinking...</span>
              </>
            ) : (
              <>
                <span>Ask Ishema</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Prompt Pills */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Popular:
        </span>
        {SUGGESTED_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePromptClick(p.text)}
            className="text-xs bg-white/5 hover:bg-white/15 border border-white/10 hover:border-emerald-400/50 text-slate-200 hover:text-white px-3 py-1.5 rounded-full transition-all text-left"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Results View */}
      {tellIshemaResult && (
        <div className="relative z-10 mt-6 bg-slate-900/90 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Top Meta Details */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Ishema AI Recommendation</h4>
                <p className="text-xs text-emerald-300/80">Matched across verified Kigali merchants</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {tellIshemaResult.detectedBudget && (
                <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs px-2.5 py-1 rounded-lg font-medium">
                  <Wallet className="w-3.5 h-3.5" />
                  Budget: {formatRWF(tellIshemaResult.detectedBudget)}
                </span>
              )}
              {tellIshemaResult.detectedPartySize && (
                <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs px-2.5 py-1 rounded-lg font-medium">
                  <Users className="w-3.5 h-3.5" />
                  Party: {tellIshemaResult.detectedPartySize} people
                </span>
              )}
              {tellIshemaResult.urgency && (
                <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-300 border border-red-400/30 text-xs px-2.5 py-1 rounded-lg font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {tellIshemaResult.urgency}
                </span>
              )}
            </div>
          </div>

          {/* Friendly AI Explanation */}
          <div className="my-4 p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {tellIshemaResult.assistantMessage}
          </div>

          {/* Recommended Items Grid */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Matching Products Found ({tellIshemaResult.matchedProducts?.length || 0})
              </span>
              {tellIshemaResult.matchedProducts && tellIshemaResult.matchedProducts.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleAddAllToCart(tellIshemaResult.matchedProducts)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-lg transition-all active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {addedAllSuccess ? 'Added to Cart!' : 'Add All to Cart'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tellIshemaResult.matchedProducts && tellIshemaResult.matchedProducts.map((prod: Product) => (
                <div
                  key={prod.id}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col justify-between transition-all"
                >
                  <div className="flex gap-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-slate-800 shrink-0 border border-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs sm:text-sm font-semibold text-white truncate">{prod.name}</h5>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-medium mt-0.5">
                        <span>{formatRWF(prod.price)}</span>
                        {prod.originalPrice && (
                          <span className="line-through text-slate-400 text-[10px]">
                            {formatRWF(prod.originalPrice)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-1">
                        <Store className="w-3 h-3 text-amber-400 shrink-0" />
                        {prod.seller?.name || 'Verified Rwandan Seller'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {prod.estimatedDeliveryTime || '30 mins'}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(prod, 1)}
                      className="text-emerald-300 hover:text-white font-medium hover:underline inline-flex items-center gap-1"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Routing Summary */}
          {tellIshemaResult.deliveryPlan && (
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {tellIshemaResult.deliveryPlan}
              </span>
              <span className="text-amber-300 font-medium">
                Estimated Total: {formatRWF(tellIshemaResult.totalEstimatedCostRWF || 18000)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
