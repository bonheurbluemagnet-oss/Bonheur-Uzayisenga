import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Store, CheckCircle, Navigation, Search } from 'lucide-react';
import { Product } from '../../types';
import { formatRWF, useStore } from '../../context/StoreContext';
import { SUPERMARKET_STORES } from '../../data/supermarketStores';

interface WhereToFindModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPriceComparison: (product: Product) => void;
}

export const WhereToFindModal: React.FC<WhereToFindModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenPriceComparison
}) => {
  const { addToCart, showNotification } = useStore();
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen || !product) return null;

  // Filter stores that carry this category or product
  const filteredStores = SUPERMARKET_STORES.filter(store => {
    const matchesDistrict = districtFilter === 'All' || store.district.toLowerCase() === districtFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const handleOrderFromStore = (store: typeof SUPERMARKET_STORES[0]) => {
    const updatedProduct: Product = {
      ...product,
      storeId: store.id,
      storeName: store.name,
      priceSource: store.name,
      estimatedDeliveryTime: store.deliveryTime,
      deliveryFee: store.deliveryFee
    };
    addToCart(updatedProduct, 1);
    showNotification?.(
      'Order Prepared!',
      `${product.name} ordered from ${store.name} for delivery to your location.`
    );
    onClose();
  };

  return (
    <div id="where-to-find-modal-backdrop" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="where-to-find-modal-container"
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Store Locator & Inventory
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {SUPERMARKET_STORES.length} Kigali Hubs Tracked
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Where can I find &quot;{product.name}&quot;?
              </h2>
            </div>
          </div>
          <button
            id="close-where-to-find-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by neighborhood, supermarket or street..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium shrink-0">District:</span>
            {['All', 'Nyarugenge', 'Gasabo', 'Kicukiro'].map((dist) => (
              <button
                key={dist}
                onClick={() => setDistrictFilter(dist)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  districtFilter === dist
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* Store Directory Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          {filteredStores.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No supermarket locations found matching your filter.
            </div>
          ) : (
            filteredStores.map((store) => (
              <div
                key={store.id}
                id={`store-card-${store.id}`}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-white transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={store.logo}
                    alt={store.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {store.name}
                      </h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        In Stock Now
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {store.address}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {store.openingHours}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-blue-500" />
                        {store.contactPhone}
                      </span>
                    </div>

                    {store.promotions.length > 0 && (
                      <div className="text-xs text-amber-700 bg-amber-50/60 px-2 py-0.5 rounded mt-2 inline-block border border-amber-200/50">
                        Promo: {store.promotions[0]}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center sm:flex-col items-end gap-2 w-full sm:w-auto justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      {formatRWF(product.price)}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      ETA {store.deliveryTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPriceComparison(product);
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Compare
                    </button>
                    <button
                      onClick={() => handleOrderFromStore(store)}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-xs"
                    >
                      <span>Order Here</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span>Driver pickup directly from designated Kigali supermarket aisles.</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
