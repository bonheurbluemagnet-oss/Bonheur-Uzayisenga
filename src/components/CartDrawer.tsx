import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck, Store } from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { RWANDA_LOCATIONS } from '../data/mockData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTotal,
    estimatedDeliveryFee,
    selectedLocation,
    setSelectedLocation,
    setIsCheckoutOpen,
    uniqueStoresInCart,
    isMultiStore,
    multiStoreDiscount
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-panel"
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-slate-900 text-base">Your Shopping Cart</h2>
              <span className="text-xs text-slate-500 font-body">
                {cart.length} unique {cart.length === 1 ? 'item' : 'items'}
                {isMultiStore && ` • ${uniqueStoresInCart.length} Kigali Stores`}
              </span>
            </div>
          </div>
          <button
            id="close-cart-drawer-btn"
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature 3: One Cart, Multiple Stores Banner */}
        {isMultiStore && (
          <div className="bg-amber-50 px-5 py-2.5 border-b border-amber-200/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-medium">
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>Coordinated Multi-Store Order ({uniqueStoresInCart.length} Stores)</span>
            </div>
            <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
              Single Delivery Fee
            </span>
          </div>
        )}

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base mb-1">Your cart is empty</h3>
              <p className="text-xs text-slate-500 font-body max-w-xs mx-auto mb-5">
                Browse our fresh food, drinks, electronics, and fashion to add items to your cart.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-semibold text-xs"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-interface font-semibold text-xs text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-bold text-slate-900 font-body mt-0.5">
                    {formatRWF(item.product.price)}
                  </div>

                  {/* Selected variations if any */}
                  {item.selectedVariations && Object.keys(item.selectedVariations).length > 0 && (
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {Object.entries(item.selectedVariations)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(', ')}
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-white text-slate-600 rounded-l-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold font-body">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-white text-slate-600 rounded-r-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-body font-bold text-xs text-slate-900 block">
                    {formatRWF(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Calculations */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-4">
            {/* Delivery Location Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  Deliver To Sector:
                </span>
                <span className="text-amber-700 font-bold">{formatRWF(estimatedDeliveryFee)}</span>
              </div>
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-body focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {RWANDA_LOCATIONS.map(loc => (
                  <option key={loc.sector} value={loc.sector}>
                    {loc.district} - {loc.sector} ({formatRWF(loc.fee)})
                  </option>
                ))}
              </select>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-900">{formatRWF(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Express Delivery Fee:</span>
                <span className="font-semibold text-slate-900">{formatRWF(estimatedDeliveryFee)}</span>
              </div>
              {isMultiStore && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Multi-Store Consolidation Savings:</span>
                  <span>-500 RWF</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-950">
                <span>Total (RWF):</span>
                <span className="text-amber-600 font-extrabold text-base">{formatRWF(cartTotal)}</span>
              </div>
            </div>

            {/* CTAs */}
            <button
              id="proceed-checkout-btn"
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout ({formatRWF(cartTotal)})
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-interface">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pay with MTN MoMo, Airtel Money, or Cash on Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
