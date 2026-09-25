import React, { useState } from 'react';
import { X, Star, ShieldCheck, Clock, Truck, RotateCcw, Check, Plus, Minus, ShoppingBag, ShoppingCart, Share2, Gift, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatRWF, useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { PRODUCT_FALLBACK_IMAGE } from './ProductDetailsView';

interface ProductDetailModalProps {
  product?: Product | null;
  onClose?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product: propProduct, onClose: propOnClose }) => {
  const { currentView, selectedProduct, setSelectedProduct, addToCart, products, selectedLocation, setIsSurpriseGiftMode, setIsCheckoutOpen } = useStore();
  const product = propProduct !== undefined ? propProduct : selectedProduct;
  const onClose = propOnClose || (() => setSelectedProduct(null));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [copyFeedback, setCopyFeedback] = useState(false);

  // If on full product page, avoid duplicate modal overlay
  if (!product || (currentView === 'product' && !propProduct)) return null;

  // Initialize selected variations if not selected
  const variations = product.variations || [];
  const currentVariations: Record<string, string> = { ...selectedVariations };
  variations.forEach(v => {
    if (!currentVariations[v.name] && v.options.length > 0) {
      currentVariations[v.name] = v.options[0];
    }
  });

  const handleSelectVariation = (varName: string, option: string) => {
    setSelectedVariations(prev => ({ ...prev, [varName]: option }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, currentVariations);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentVariations);
    setIsCheckoutOpen(true);
    onClose();
  };

  const handleSendAsSurpriseGift = () => {
    addToCart(product, quantity, currentVariations);
    setIsSurpriseGiftMode(true);
    setIsCheckoutOpen(true);
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.categoryId === product.categoryId || p.subcategoryId === product.subcategoryId))
    .slice(0, 4);

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-container"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-interface font-medium">
            <span>Marketplace</span>
            <span>/</span>
            <span className="text-amber-600 font-semibold">{product.nestedType || 'Product Details'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              title="Share product"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-full transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copyFeedback && (
              <span className="text-xs bg-slate-900 text-white px-2 py-1 rounded-md">Link copied!</span>
            )}
            <button
              id="close-product-detail-modal"
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={
                    (product.images && product.images[selectedImageIndex]) ||
                    (product.images && product.images[0]) ||
                    PRODUCT_FALLBACK_IMAGE
                  }
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={e => {
                    const target = e.currentTarget;
                    if (target.src !== PRODUCT_FALLBACK_IMAGE) {
                      target.src = PRODUCT_FALLBACK_IMAGE;
                    }
                  }}
                  className="w-full h-full object-cover object-center"
                />
                {product.discountPercentage && (
                  <div className="absolute top-3 left-3 bg-rose-600 text-white font-heading font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                    {product.discountPercentage}% OFF
                  </div>
                )}
                {product.badge && (
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white font-interface font-medium text-xs px-2.5 py-1 rounded-lg shadow-sm">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`view-${idx}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Seller Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-interface font-semibold text-slate-900 text-sm">{product.seller.name}</span>
                      {product.seller.verified && (
                        <span title="Verified Seller">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-body">{product.seller.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 justify-end">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-800">{product.seller.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Merchant Rating</span>
                </div>
              </div>
            </div>

            {/* Product Details & Actions Column (7 cols) */}
            <div className="lg:col-span-6 flex flex-col">
              <h1 className="font-heading font-bold text-slate-950 text-xl sm:text-2xl md:text-3xl leading-snug mb-2">
                {product.name}
              </h1>

              {/* Rating and Stock Row */}
              <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal">({product.reviewsCount} reviews)</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className={`font-medium ${product.inStock ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {product.inStock ? `In Stock (${product.stock} units left)` : 'Currently Out of Stock'}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-body text-xs">SKU: {product.id.toUpperCase()}</span>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-body font-bold text-2xl sm:text-3xl text-slate-950">
                      {formatRWF(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="font-body text-base text-slate-400 line-through">
                        {formatRWF(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-emerald-700 font-medium">All local taxes & VAT included</span>
                </div>
                {product.discountPercentage && (
                  <span className="px-3 py-1 bg-rose-600 text-white text-xs font-heading font-bold rounded-lg">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Delivery info pills */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium">Estimated Delivery</span>
                    <span className="text-xs font-semibold text-slate-800">{formatRWF(product.deliveryFee)} ({selectedLocation})</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium">Dispatch Speed</span>
                    <span className="text-xs font-semibold text-slate-800">{product.estimatedDeliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* Variations */}
              {variations.length > 0 && (
                <div className="space-y-4 mb-6">
                  {variations.map(v => (
                    <div key={v.name}>
                      <span className="block text-xs font-interface font-semibold text-slate-700 mb-2">
                        {v.name}: <span className="text-amber-600 font-bold">{currentVariations[v.name]}</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map(opt => {
                          const isSelected = currentVariations[v.name] === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSelectVariation(v.name, opt)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                isSelected
                                  ? 'bg-slate-900 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity selector & CTA buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 pt-4 border-t border-slate-200">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-white rounded-lg text-slate-700 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-900 font-body min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="p-2 hover:bg-white rounded-lg text-slate-700 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  id="modal-add-to-cart"
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-interface font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                  Add to Cart ({formatRWF(product.price * quantity)})
                </button>

                <button
                  id="modal-buy-now"
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-interface font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now
                </button>
              </div>

              {/* Surprise Gift Action Banner */}
              <div className="mb-6 p-3.5 rounded-2xl bg-linear-to-r from-rose-50 via-amber-50 to-pink-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Want to secretly gift this item?</h5>
                    <p className="text-[11px] text-slate-500">We deliver anonymously with wax-sealed card & luxury ribbon.</p>
                  </div>
                </div>

                <button
                  id="modal-send-surprise-gift-btn"
                  type="button"
                  onClick={handleSendAsSurpriseGift}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-linear-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Send as Surprise Gift</span>
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Product Description
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-body">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {Object.keys(product.specifications || {}).length > 0 && (
                <div>
                  <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Specifications
                  </h4>
                  <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`flex py-2 px-3 ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
                      >
                        <span className="w-1/3 font-semibold text-slate-600">{key}</span>
                        <span className="w-2/3 text-slate-800 font-body">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-950">You May Also Like</h3>
                  <p className="text-xs text-slate-500 font-body">Recommended items from the same category</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map(rel => (
                  <ProductCard
                    key={rel.id}
                    product={rel}
                    onSelect={p => {
                      setSelectedProduct(p);
                      setSelectedImageIndex(0);
                      setQuantity(1);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
