import React from 'react';
import {
  TrendingUp,
  ArrowRight,
  Gift,
  EyeOff,
  Bike,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  Percent,
  Clock,
  ShieldCheck,
  Flame,
  Award,
  Layers
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { HomeHero } from '../HomeHero';
import { TellIshemaSignatureBar } from '../innovations/TellIshemaSignatureBar';
import { ProductCard } from '../ProductCard';
import { CategoryCard } from '../CategoryCard';
import { SupermarketComparisonStrip } from '../innovations/SupermarketComparisonStrip';

export const SingleFrameHomeView: React.FC = () => {
  const {
    products,
    categories,
    setSelectedCategory,
    setCurrentView
  } = useStore();

  const popularProducts = products.filter(p => p.isPopular).slice(0, 6);
  const dealsProducts = products.filter(p => (p.discountPercentage || 0) > 0).slice(0, 6);
  const recommendedProducts = products.slice(6, 12);
  const supermarketProducts = products.filter(p => p.storeId || p.storeName || p.categoryId === 'cat-food').slice(0, 4);
  const recentProducts = products.slice(0, 6);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16 animate-in fade-in">
      {/* 1. Hero Banner */}
      <HomeHero />

      {/* 2. Tell Ishema Smart Natural-Language AI Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TellIshemaSignatureBar />
      </section>

      {/* 3. Product Categories Bar / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-amber-500/10 text-amber-700">
                <Layers className="w-4 h-4" />
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-700">
                Explore Departments
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
              Product Categories
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              if (categories[0]) {
                setSelectedCategory(categories[0]);
                setCurrentView('category');
              }
            }}
            className="text-xs font-interface font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition-colors"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.slice(0, 6).map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 4. Featured Products (Popular in Kigali) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-amber-500/10 text-amber-700">
                <TrendingUp className="w-4 h-4" />
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-700">
                Top Orders in Kigali
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
              Featured Products
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('supermarket')}
            className="inline-flex items-center gap-1.5 text-xs font-interface font-bold text-amber-700 hover:text-amber-800"
          >
            <span>View Full Supermarket</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Supermarket Products & Store Price Comparison Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-700">
                <ShoppingCart className="w-4 h-4" />
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-700">
                Kigali Supermarkets
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
              Supermarket Products & Price Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compare items from Simba Supermarket, Ndoli Joint, and Sawa City.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('supermarket')}
            className="inline-flex items-center gap-1.5 text-xs font-interface font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>Supermarket Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <SupermarketComparisonStrip />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {supermarketProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Deals & Discounts Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-rose-500/10 text-rose-700">
                <Flame className="w-4 h-4" />
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-700">
                Limited Time Deals
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
              Hot Deals & Discounts
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('deals')}
            className="inline-flex items-center gap-1.5 text-xs font-interface font-bold text-rose-700 hover:text-rose-800"
          >
            <span>See All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealsProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Surprise Gift Feature Showcase Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-950 via-slate-900 to-amber-950 text-white p-8 md:p-12 border border-rose-500/20 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                <span>Special In-Frame Feature</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                Send a Surprise Gift Across Kigali & Rwanda
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body">
                Surprise a loved one with secret delivery, personalized wax-sealed greeting cards, and anonymous sender privacy. Driver delivers with a smile saying: "You have a surprise delivery!"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <EyeOff className="w-5 h-5 text-rose-400 mb-1" />
                  <h4 className="font-bold text-xs text-white">100% Anonymous</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">Zero sender info revealed.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <Bike className="w-5 h-5 text-amber-400 mb-1" />
                  <h4 className="font-bold text-xs text-white">Secret Moto Dispatch</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">Live tracked secret moto ride.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <Sparkles className="w-5 h-5 text-pink-400 mb-1" />
                  <h4 className="font-bold text-xs text-white">Wax-Sealed Card</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">Custom secret message.</p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  id="home-send-surprise-gift-btn"
                  type="button"
                  onClick={() => setCurrentView('surprise-gift')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-interface font-bold text-sm shadow-lg hover:shadow-rose-500/25 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Send a Surprise Gift Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Recommended Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-amber-500/10 text-amber-700">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-700">
                Curated For You
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
              Recommended Products
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. Recently Viewed Products */}
      {recentProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-slate-500/10 text-slate-700">
                <Clock className="w-4 h-4" />
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-600">
                Browsing History
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-950">
              Popular & Recent in Kigali
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
