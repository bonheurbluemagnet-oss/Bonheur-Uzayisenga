import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Store,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Phone,
  Zap,
  Navigation,
  Search,
  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import { NeighborhoodStore } from '../../types';

export const NeighborhoodStoresView: React.FC = () => {
  const { neighborhoodStores, selectedStore, setSelectedStore, addToCart } = useStore();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const NEIGHBORHOODS = ['All', 'Kimironko', 'Remera', 'Kiyovu', 'Kicukiro', 'Nyamirambo', 'Gisementi'];

  const filteredStores = neighborhoodStores.filter(store => {
    const matchesNeighborhood =
      selectedNeighborhood === 'All' || store.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase());
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNeighborhood && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 rounded-full px-4 py-1 mb-3 text-xs font-semibold text-amber-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Feature 18 • Hyperlocal 15-20 Min Delivery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Order from the shop <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-yellow-200">
              right down your Kigali street.
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            Support local neighborhood kiosks, bakeries, pharmacies, and butcheries in Kimironko, Remera, Kiyovu, and Kicukiro with rapid moto couriers.
          </p>
        </div>
      </div>

      {/* Neighborhood Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          {NEIGHBORHOODS.map(n => (
            <button
              key={n}
              onClick={() => setSelectedNeighborhood(n)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedNeighborhood === n
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search stores or bakery..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStores.map(store => (
          <div
            key={store.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-amber-400/50"
          >
            <div>
              {/* Store Cover & Badge */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={store.photoUrl || store.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600'}
                  alt={store.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow">
                  <Zap className="w-3 h-3 fill-slate-950" />
                  {store.estimatedDeliveryMinutes || 25} Min Express
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {store.rating}
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                    {store.category}
                  </span>
                  <h3 className="text-sm font-bold truncate drop-shadow-sm">{store.name}</h3>
                </div>
              </div>

              {/* Store Body details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    {store.neighborhood} ({store.distanceKm} km away)
                  </span>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    {store.openHours}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">MoMo Pay Merchant:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{store.momoCode || '250100'}</span>
                </div>

                {/* Popular items pills */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Popular Right Now:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(store.popularItems || store.featuredProducts || ['Fresh produce', 'Daily essentials']).map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action footer */}
            <div className="p-4 pt-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedStore(store);
                  alert(`Viewing live inventory for ${store.name} in ${store.neighborhood}! 15-min delivery available.`);
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow"
              >
                <span>Browse Store Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
