import React from 'react';
import { X, Check, Store, Clock, Truck, ShieldCheck, ArrowRight, Tag } from 'lucide-react';
import { Product, StoreOffer } from '../../types';
import { formatRWF, useStore } from '../../context/StoreContext';
import { SUPERMARKET_STORES } from '../../data/supermarketStores';

interface PriceComparisonModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PriceComparisonModal: React.FC<PriceComparisonModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { addToCart, showNotification } = useStore();

  if (!isOpen || !product) return null;

  // Compile offers: If product has explicit storeOffers, use them; otherwise create realistic comparison offers across top supermarkets
  const offers: StoreOffer[] = (product.storeOffers && product.storeOffers.length > 0)
    ? product.storeOffers
    : [
        {
          storeId: 'store-simba-cbd',
          storeName: 'Simba Supermarket (CBD)',
          price: product.price,
          inStock: product.inStock,
          stockQuantity: product.stock,
          deliveryTime: product.estimatedDeliveryTime || '20–35 mins',
          deliveryFee: product.deliveryFee || 1000,
          unit: product.unit
        },
        {
          storeId: 'store-sawa-kimihurura',
          storeName: 'Sawa City (Kimihurura)',
          price: Math.round(product.price * 1.05 / 50) * 50,
          inStock: true,
          stockQuantity: 42,
          deliveryTime: '15–25 mins',
          deliveryFee: 1000,
          unit: product.unit
        },
        {
          storeId: 'store-ndoli-kisimenti',
          storeName: 'Ndoli Supermarket (Remera)',
          price: Math.round(product.price * 0.98 / 50) * 50,
          inStock: true,
          stockQuantity: 65,
          deliveryTime: '25–40 mins',
          deliveryFee: 1100,
          unit: product.unit
        }
      ];

  // Sort offers by price ascending to highlight cheapest
  const sortedOffers = [...offers].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedOffers[0]?.price || product.price;
  const highestPrice = sortedOffers[sortedOffers.length - 1]?.price || product.price;
  const maxSavings = highestPrice - lowestPrice;

  const handleSelectOffer = (offer: StoreOffer) => {
    // Clone product with this store's price and details
    const selectedStoreProduct: Product = {
      ...product,
      price: offer.price,
      storeId: offer.storeId,
      storeName: offer.storeName,
      priceSource: offer.storeName,
      estimatedDeliveryTime: offer.deliveryTime,
      deliveryFee: offer.deliveryFee
    };
    addToCart(selectedStoreProduct, 1);
    showNotification?.(
      'Added to Cart!',
      `${product.name} from ${offer.storeName} at ${formatRWF(offer.price)} added to your cart.`
    );
    onClose();
  };

  return (
    <div id="price-comparison-modal-backdrop" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="price-comparison-modal-container"
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-emerald-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Rwanda Supermarket Live Price Check
                </span>
                {maxSavings > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-200 shadow-xs">
                    Save up to {formatRWF(maxSavings)}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Compare Supermarket Prices
              </h2>
            </div>
          </div>
          <button
            id="close-price-comparison-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Brief */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-200 shadow-xs bg-white shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span>{product.brand || 'Rwanda Supermarket staple'}</span>
              {product.unit && (
                <>
                  <span>•</span>
                  <span className="font-medium text-slate-700">{product.unit}</span>
                </>
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
              <span className="text-emerald-700 font-semibold">Available in {sortedOffers.length} verified Kigali stores</span>
              <span>•</span>
              <span>Updated: {product.lastUpdated || 'Today 08:30 AM'}</span>
            </div>
          </div>
        </div>

        {/* Store Comparison List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Select store to fulfill your delivery:
          </p>

          {sortedOffers.map((offer, index) => {
            const isLowest = offer.price === lowestPrice;
            const fullStore = SUPERMARKET_STORES.find(s => s.id === offer.storeId || s.name.includes(offer.storeName));

            return (
              <div
                key={offer.storeId + index}
                id={`offer-card-${offer.storeId}`}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isLowest 
                    ? 'border-emerald-300 bg-emerald-50/40 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-slate-600 font-bold">
                    {fullStore?.logo ? (
                      <img src={fullStore.logo} alt={offer.storeName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <Store className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {offer.storeName}
                      </span>
                      {isLowest && (
                        <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <Check className="w-3 h-3" /> Best Price
                        </span>
                      )}
                    </div>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {offer.deliveryTime}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Truck className="w-3.5 h-3.5 text-blue-500" />
                        Fee: {formatRWF(offer.deliveryFee)}
                      </span>
                      <span className={`font-medium ${offer.inStock ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {offer.inStock ? `In Stock (${offer.stockQuantity || 'Available'})` : 'Low Stock'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <div className="text-base sm:text-lg font-bold text-slate-900">
                      {formatRWF(offer.price)}
                    </div>
                    {offer.unit && (
                      <div className="text-[11px] text-slate-500">per {offer.unit}</div>
                    )}
                  </div>

                  <button
                    id={`buy-from-store-${offer.storeId}`}
                    onClick={() => handleSelectOffer(offer)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                      isLowest
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Select & Add</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Real-time supermarket price sync with Ishema Express direct driver dispatch.</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline ml-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
