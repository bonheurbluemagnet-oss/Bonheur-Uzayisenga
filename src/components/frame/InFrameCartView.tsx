import React from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Wallet,
  Tag,
  CheckCircle2,
  Store,
  ChevronRight,
  Gift,
  Users
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';

export const InFrameCartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    estimatedDeliveryFee,
    multiStoreDiscount,
    poolingDiscount,
    cartTotal,
    uniqueStoresInCart,
    isMultiStore,
    walletBalance,
    rewardPoints,
    setCurrentView,
    isNeighborhoodPooling,
    setIsNeighborhoodPooling,
    isSurpriseGiftMode
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center animate-in fade-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
          Explore Rwandan supermarkets, fresh food markets, electronic merchants, or send a surprise gift across Kigali.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentView('supermarket')}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <span>Explore Supermarket Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-interface font-bold text-xs transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="hover:text-amber-600 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-700">Shopping Cart</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
            Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
          </h1>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-red-600 font-semibold self-start sm:self-auto flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Multi-Store notification */}
          {isMultiStore && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Items combined from <strong>{uniqueStoresInCart.length} different stores</strong> in Kigali into 1 single moto run!
                </span>
              </div>
              <span className="font-bold text-emerald-700 shrink-0">Saved {formatRWF(multiStoreDiscount)}</span>
            </div>
          )}

          {/* Cart Items Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {cart.map(item => {
              const itemTotal = item.product.price * item.quantity;
              return (
                <div key={item.product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600">
                          {item.product.storeName || item.product.seller?.name || 'Simba Supermarket'}
                        </span>
                        {(item.product.discountPercentage || 0) > 0 && (
                          <span className="px-1.5 py-0.2 rounded-md bg-red-100 text-[10px] font-extrabold text-red-600">
                            -{item.product.discountPercentage}%
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-sm text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-semibold text-amber-700 mt-0.5">
                        {formatRWF(item.product.price)} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shadow-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-xs font-extrabold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-heading font-extrabold text-sm sm:text-base text-slate-950">
                        {formatRWF(itemTotal)}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[11px] text-slate-400 hover:text-red-600 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Neighborhood Pooling Option */}
          <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-slate-950">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-xs sm:text-sm text-slate-950">
                  Neighborhood Delivery Pooling (Kigali Eco-Saver)
                </div>
                <div className="text-[11px] text-slate-600">
                  Combine with neighbors in your sector to save 500 RWF on delivery fee.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsNeighborhoodPooling(!isNeighborhoodPooling)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isNeighborhoodPooling
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              {isNeighborhoodPooling ? 'Applied (-500 RWF)' : 'Apply Pool'}
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5 sticky top-24">
            <h3 className="font-heading font-extrabold text-base text-slate-950 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.length} unique items)</span>
                <span className="font-semibold text-slate-900">{formatRWF(cartSubtotal)}</span>
              </div>

              {multiStoreDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Multi-Store Consolidation</span>
                  <span>-{formatRWF(multiStoreDiscount)}</span>
                </div>
              )}

              {poolingDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Neighborhood Pooling Discount</span>
                  <span>-{formatRWF(poolingDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kigali Express Moto Delivery</span>
                </span>
                <span className="font-semibold text-slate-900">{formatRWF(estimatedDeliveryFee)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-heading font-extrabold text-sm text-slate-950">Total to Pay</span>
                <span className="font-heading font-extrabold text-xl text-amber-700">
                  {formatRWF(cartTotal)}
                </span>
              </div>
            </div>

            {/* Ishema Wallet Balance Preview */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
              <div className="flex items-center justify-between text-amber-900 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-amber-600" />
                  <span>Ishema Wallet Balance:</span>
                </span>
                <span>{formatRWF(walletBalance || 25000)}</span>
              </div>
              <p className="text-[11px] text-amber-800/80">
                You can pay instantly with zero transaction fee using your wallet balance at checkout.
              </p>
            </div>

            {/* Payment Options Preview */}
            <div>
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Accepted Payment Methods
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold text-slate-700">
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">MTN MoMo</div>
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">Airtel</div>
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">Wallet</div>
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">Cash/Card</div>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              id="cart-proceed-checkout-btn"
              type="button"
              onClick={() => setCurrentView('checkout')}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to In-Frame Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Guaranteed Delivery within 30-45 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
