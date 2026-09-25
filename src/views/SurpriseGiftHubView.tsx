import React, { useState } from 'react';
import {
  Gift,
  Heart,
  Sparkles,
  ShieldCheck,
  EyeOff,
  Clock,
  ArrowRight,
  Package,
  Calendar,
  Smile,
  Truck,
  CheckCircle2,
  Filter,
  Flame,
  Star
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import {
  CURATED_SURPRISE_PACKAGES,
  SURPRISE_OCCASIONS,
  GIFT_WRAPPING_OPTIONS
} from '../data/surpriseGiftData';
import { SurpriseGiftPackage } from '../types';

export const SurpriseGiftHubView: React.FC = () => {
  const {
    addPackageToCart,
    setCurrentView,
    openSurpriseReveal,
    setIsSurpriseGiftMode
  } = useStore();

  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState<string>('all');
  const [selectedPackageDetail, setSelectedPackageDetail] = useState<SurpriseGiftPackage | null>(null);

  const filteredPackages = selectedOccasionFilter === 'all'
    ? CURATED_SURPRISE_PACKAGES
    : CURATED_SURPRISE_PACKAGES.filter(
        pkg => pkg.occasion.toLowerCase() === selectedOccasionFilter.toLowerCase()
      );

  const handleStartCustomGift = () => {
    setIsSurpriseGiftMode(true);
    setCurrentView('shop');
  };

  return (
    <div id="surprise-gift-hub" className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-600 via-rose-500 to-amber-600 text-white shadow-xl">
        {/* Background Glowing Shapes */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none"></div>

        <div className="relative px-6 py-12 sm:px-12 sm:py-16 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Ishema Surprise Gifting Service</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight">
            Send a Secret Surprise Gift <br className="hidden sm:inline" />
            Anywhere in Rwanda 🎁
          </h1>

          <p className="text-base sm:text-lg text-rose-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Make someone’s day magical without giving away who sent it. Choose a curated gift bundle or pick any marketplace product. We wrap it with luxury ribbons and deliver with strict anonymous protocol.
          </p>

          {/* Highlights Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <EyeOff className="w-4 h-4 text-amber-300" />
              100% Anonymous Courier
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <Gift className="w-4 h-4 text-amber-300" />
              Wax-Sealed Greeting Card
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <Clock className="w-4 h-4 text-amber-300" />
              Scheduled Delivery Windows
            </span>
          </div>

          {/* Main Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#curated-packages"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-rose-600 font-bold text-sm shadow-lg hover:bg-rose-50 transition-all transform hover:-translate-y-0.5"
            >
              Browse Ready-Made Packages
            </a>
            <button
              id="hero-create-custom-gift-btn"
              type="button"
              onClick={handleStartCustomGift}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-rose-700/60 hover:bg-rose-700/80 border border-white/30 text-white font-bold text-sm backdrop-blur-xs transition-all"
            >
              Build a Custom Gift Package
            </button>
            <button
              id="hero-preview-reveal-btn"
              type="button"
              onClick={() => openSurpriseReveal('ISH-RW-GIFT77')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
            >
              <span>Preview Recipient Unboxing</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-rose-600 tracking-wider uppercase">
            Discreet & Seamless
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            How Secret Surprise Delivery Works
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            From checkout to recipient doorstep, your personal identity remains strictly guarded.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black font-display text-sm">
              01
            </div>
            <h3 className="font-bold text-sm text-slate-900">Choose or Build</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pick a ready-made celebration bundle (cake, flowers, chocolates) or shop any items on Ishema.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black font-display text-sm">
              02
            </div>
            <h3 className="font-bold text-sm text-slate-900">Enter Recipient Info</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provide recipient name, phone, delivery address in Kigali, and preferred date & time window.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black font-display text-sm">
              03
            </div>
            <h3 className="font-bold text-sm text-slate-900">Secret Message & Ribbon</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Write your heartfelt note in Kinyarwanda, English, or French, and choose luxury wrapping.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black font-display text-sm">
              04
            </div>
            <h3 className="font-bold text-sm text-slate-900">Secret Driver Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Driver announces: <em>"You have a surprise delivery!"</em> Recipient unboxes with virtual confetti!
            </p>
          </div>
        </div>
      </section>

      {/* Curated Surprise Packages Section */}
      <section id="curated-packages" className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <span className="text-xs font-bold text-rose-600 tracking-wider uppercase">
                Ready-Made Bundles
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
              Curated Surprise Gift Packages
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Professionally packaged with bakery goods, flowers, artisan chocolates, and greeting card.
            </p>
          </div>

          {/* Occasion Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedOccasionFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedOccasionFilter === 'all'
                  ? 'bg-rose-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Packages
            </button>
            <button
              onClick={() => setSelectedOccasionFilter('Birthday')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedOccasionFilter === 'Birthday'
                  ? 'bg-rose-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              🎂 Birthday
            </button>
            <button
              onClick={() => setSelectedOccasionFilter('Anniversary')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedOccasionFilter === 'Anniversary'
                  ? 'bg-rose-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              ❤️ Romance & Anniversary
            </button>
            <button
              onClick={() => setSelectedOccasionFilter("Mother's Day")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedOccasionFilter === "Mother's Day"
                  ? 'bg-rose-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              🌸 Mother
            </button>
            <button
              onClick={() => setSelectedOccasionFilter("Father's Day")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedOccasionFilter === "Father's Day"
                  ? 'bg-rose-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              👔 Father
            </button>
            <button
              onClick={() => setSelectedOccasionFilter('Graduation')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedOccasionFilter === 'Graduation'
                  ? 'bg-rose-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              🎓 Graduation
            </button>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPackages.map(pkg => (
            <div
              key={pkg.id}
              id={`package-card-${pkg.id}`}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-xs">
                    {pkg.badge || pkg.occasion}
                  </span>
                  {pkg.popular && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 shadow-xs">
                      Popular Choice
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                  Secret Courier Included
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                    {pkg.occasion}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 font-display line-clamp-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {pkg.tagline}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="pt-2 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      Includes:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {pkg.items.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Send Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-base font-black text-slate-900 font-display">
                      {formatRWF(pkg.price)}
                    </div>
                    {pkg.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatRWF(pkg.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    id={`send-package-btn-${pkg.id}`}
                    type="button"
                    onClick={() => addPackageToCart(pkg)}
                    className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Send Secret Gift</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secret Delivery Protocol Notice Banner */}
      <section className="rounded-3xl border border-emerald-200 bg-linear-to-r from-emerald-50 via-teal-50 to-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900">
              Ishema Secret Delivery Protocol Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              We never disclose who paid for or sent the gift on delivery documents, parcel labels, or SMS confirmations. The driver contacts the recipient only to coordinate arrival, keeping the excitement intact until the final unboxing.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('track')}
          className="px-5 py-2.5 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs whitespace-nowrap shadow-xs"
        >
          Track Secret Delivery
        </button>
      </section>
    </div>
  );
};
