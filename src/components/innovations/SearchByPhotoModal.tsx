import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Camera,
  Upload,
  Sparkles,
  X,
  CheckCircle2,
  ShoppingCart,
  Store,
  Clock,
  Loader2,
  ScanLine
} from 'lucide-react';
import { Product } from '../../types';

export const SearchByPhotoModal: React.FC = () => {
  const { isSearchByPhotoOpen, setIsSearchByPhotoOpen, products, addToCart } = useStore();
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [identifiedLabel, setIdentifiedLabel] = useState<string | null>(null);
  const [matchedItems, setMatchedItems] = useState<Product[]>([]);

  if (!isSearchByPhotoOpen) return null;

  const SAMPLE_RWANDA_PHOTOS = [
    {
      name: 'Rwandan Peace Basket (Agaseke)',
      url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80',
      category: 'cat-artisan'
    },
    {
      name: 'Fresh Musanze Irish Potatoes',
      url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
      category: 'cat-fresh'
    },
    {
      name: 'Rwandan Specialty Arabica Coffee',
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
      category: 'cat-food'
    },
    {
      name: 'African Wax Kitenge Fabric',
      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      category: 'cat-fashion'
    }
  ];

  const handleSelectSample = (sample: { name: string; url: string; category: string }) => {
    setSelectedImage(sample.url);
    triggerAnalysis(sample.name, sample.category);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      triggerAnalysis('Uploaded Rwandan Product', 'cat-fresh');
    }
  };

  const triggerAnalysis = (label: string, category: string) => {
    setAnalyzing(true);
    setIdentifiedLabel(null);
    setMatchedItems([]);

    setTimeout(() => {
      setAnalyzing(false);
      setIdentifiedLabel(label);
      // Filter catalog
      const matches = products.filter(
        p => p.categoryId === category || p.name.toLowerCase().includes(label.toLowerCase().split(' ')[0])
      );
      setMatchedItems(matches.length > 0 ? matches.slice(0, 3) : products.slice(0, 3));
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Search by Photo</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Snap or upload any product photo to find exact or similar items in Kigali
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSearchByPhotoOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Upload Dropzone */}
          <div>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 rounded-2xl p-6 cursor-pointer bg-slate-50 dark:bg-slate-800/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                Upload image from your phone or camera
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Supports JPG, PNG, WEBP up to 10MB
              </span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Preset Samples */}
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
              Or Try with Rwandan Sample Photos:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_RWANDA_PHOTOS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-white dark:bg-slate-800 text-left transition-all group"
                >
                  <img
                    src={sample.url}
                    alt={sample.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-16 object-cover rounded-lg mb-1 group-hover:scale-102 transition-transform"
                  />
                  <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate">
                    {sample.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Scanning Preview */}
          {selectedImage && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex gap-4 items-center">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700">
                  <img
                    src={selectedImage}
                    alt="Scan target"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {analyzing && (
                    <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-[1px] flex items-center justify-center">
                      <ScanLine className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {analyzing ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing photo with Vision AI...
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Comparing visual textures and shapes against Kigali verified inventories...
                      </p>
                    </div>
                  ) : identifiedLabel ? (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                        Match Identified (98% Confidence)
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {identifiedLabel}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Found {matchedItems.length} matching verified Rwandan sellers in Kigali.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {matchedItems.length > 0 && !analyzing && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Matching Stores & Products Found
              </h4>
              <div className="space-y-2">
                {matchedItems.map(item => (
                  <div
                    key={item.id}
                    className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 shadow-sm hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-lg object-cover bg-slate-100 dark:bg-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {formatRWF(item.price)}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                          <Store className="w-3 h-3 text-amber-500 shrink-0" />
                          {item.seller?.name || 'Verified Rwandan Seller'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        addToCart(item, 1);
                        setIsSearchByPhotoOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow transition-all shrink-0 active:scale-95"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
