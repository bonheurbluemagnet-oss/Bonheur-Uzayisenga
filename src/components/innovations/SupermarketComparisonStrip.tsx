import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, Check, Sparkles, Building2, Store } from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';

interface ComparedItem {
  id: string;
  name: string;
  unit: string;
  image: string;
  category: string;
  prices: {
    simba: { price: number; inStock: boolean; expressTime: string };
    ndoli: { price: number; inStock: boolean; expressTime: string };
    sawa: { price: number; inStock: boolean; expressTime: string };
  };
}

const COMPARISON_DATA: ComparedItem[] = [
  {
    id: 'comp-1',
    name: 'Inyange Whole Milk (1L Tetrapak)',
    unit: '1 Litre',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    category: 'Dairy',
    prices: {
      simba: { price: 1100, inStock: true, expressTime: '25 min' },
      ndoli: { price: 1150, inStock: true, expressTime: '30 min' },
      sawa: { price: 1200, inStock: true, expressTime: '35 min' }
    }
  },
  {
    id: 'comp-2',
    name: 'Kinazi Premium Cassava Flour (5kg)',
    unit: '5 kg Bag',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    category: 'Grains & Flours',
    prices: {
      simba: { price: 6200, inStock: true, expressTime: '30 min' },
      ndoli: { price: 5800, inStock: true, expressTime: '25 min' },
      sawa: { price: 6500, inStock: true, expressTime: '35 min' }
    }
  },
  {
    id: 'comp-3',
    name: 'Gorilla Mountain Coffee Beans (500g)',
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80',
    category: 'Beverages',
    prices: {
      simba: { price: 7800, inStock: true, expressTime: '25 min' },
      ndoli: { price: 8200, inStock: true, expressTime: '30 min' },
      sawa: { price: 7900, inStock: true, expressTime: '35 min' }
    }
  },
  {
    id: 'comp-4',
    name: 'Fresh Hass Avocados (Rwanda Prime)',
    unit: '1 kg (approx 4-5 pcs)',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80',
    category: 'Fresh Produce',
    prices: {
      simba: { price: 2200, inStock: true, expressTime: '20 min' },
      ndoli: { price: 1800, inStock: true, expressTime: '20 min' },
      sawa: { price: 2400, inStock: true, expressTime: '30 min' }
    }
  }
];

export const SupermarketComparisonStrip: React.FC = () => {
  const { setCurrentView, addToCart, products } = useStore();
  const [selectedItem, setSelectedItem] = useState<ComparedItem>(COMPARISON_DATA[0]);

  const handleAddToCart = (storeName: string, price: number) => {
    // Find matching or fallback product
    const matchedProduct = products.find(p => p.name.toLowerCase().includes(selectedItem.name.split(' ')[0].toLowerCase())) || products[0];
    if (matchedProduct) {
      addToCart(matchedProduct, 1);
    }
  };

  const getCheapestStore = (item: ComparedItem): 'simba' | 'ndoli' | 'sawa' => {
    const p = item.prices;
    if (p.simba.price <= p.ndoli.price && p.simba.price <= p.sawa.price) return 'simba';
    if (p.ndoli.price <= p.simba.price && p.ndoli.price <= p.sawa.price) return 'ndoli';
    return 'sawa';
  };

  const cheapest = getCheapestStore(selectedItem);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base text-slate-900">
                Live Kigali Supermarket Price Check
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Updated Today
              </span>
            </div>
            <p className="text-xs text-slate-500">
              One courier picks and consolidates from your preferred Kigali supermarket.
            </p>
          </div>
        </div>

        {/* Item selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {COMPARISON_DATA.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedItem.id === item.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-5">
        {/* Selected Product Spotlight */}
        <div className="lg:col-span-4 flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-2xl object-cover bg-white border border-slate-200 shrink-0"
          />
          <div className="min-w-0">
            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
              {selectedItem.category}
            </span>
            <h4 className="font-heading font-bold text-sm text-slate-900 mt-1 line-clamp-2">
              {selectedItem.name}
            </h4>
            <div className="text-[11px] text-slate-400 mt-0.5">{selectedItem.unit}</div>
          </div>
        </div>

        {/* 3 Store Columns */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Simba Supermarket */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              cheapest === 'simba'
                ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-heading font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-amber-600" />
                Simba Supermarket
              </span>
              {cheapest === 'simba' && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wider">
                  Best Price
                </span>
              )}
            </div>
            <div className="font-heading font-extrabold text-lg text-slate-950">
              {formatRWF(selectedItem.prices.simba.price)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Express: {selectedItem.prices.simba.expressTime}
            </div>
            <button
              type="button"
              onClick={() => handleAddToCart('Simba Supermarket', selectedItem.prices.simba.price)}
              className="mt-3 w-full py-1.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Buy from Simba</span>
            </button>
          </div>

          {/* Ndoli Joint */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              cheapest === 'ndoli'
                ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-heading font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-blue-600" />
                Ndoli Supermarket
              </span>
              {cheapest === 'ndoli' && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wider">
                  Best Price
                </span>
              )}
            </div>
            <div className="font-heading font-extrabold text-lg text-slate-950">
              {formatRWF(selectedItem.prices.ndoli.price)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Express: {selectedItem.prices.ndoli.expressTime}
            </div>
            <button
              type="button"
              onClick={() => handleAddToCart('Ndoli Supermarket', selectedItem.prices.ndoli.price)}
              className="mt-3 w-full py-1.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Buy from Ndoli</span>
            </button>
          </div>

          {/* Sawa City */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              cheapest === 'sawa'
                ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-heading font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-emerald-600" />
                Sawa City
              </span>
              {cheapest === 'sawa' && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wider">
                  Best Price
                </span>
              )}
            </div>
            <div className="font-heading font-extrabold text-lg text-slate-950">
              {formatRWF(selectedItem.prices.sawa.price)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Express: {selectedItem.prices.sawa.expressTime}
            </div>
            <button
              type="button"
              onClick={() => handleAddToCart('Sawa City', selectedItem.prices.sawa.price)}
              className="mt-3 w-full py-1.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Buy from Sawa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
