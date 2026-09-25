import React from 'react';
import { ShoppingCart, Star, ShieldCheck, Clock, ArrowRight, Gift, Heart } from 'lucide-react';
import { Product } from '../types';
import { formatRWF, useStore } from '../context/StoreContext';
import { PRODUCT_FALLBACK_IMAGE } from './ProductDetailsView';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const {
    addToCart,
    navigateToProduct,
    setSelectedCategory,
    setSelectedSubcategory,
    categories,
    setIsSurpriseGiftMode,
    setIsCheckoutOpen,
    toggleFavoriteProduct,
    isProductFavorited
  } = useStore();

  const isFavorite = isProductFavorited(product.id);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    } else {
      navigateToProduct(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  const handleSurpriseGift = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsSurpriseGiftMode(true);
    setIsCheckoutOpen(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteProduct(product.id);
  };

  const parentCat = categories.find(c => c.id === product.categoryId);

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : PRODUCT_FALLBACK_IMAGE}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={e => {
            const target = e.currentTarget;
            if (target.src !== PRODUCT_FALLBACK_IMAGE) {
              target.src = PRODUCT_FALLBACK_IMAGE;
            }
          }}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-600 text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-600 text-white shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Top-Right Quick Actions: Wishlist & Surprise Gift */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <button
            id={`card-wishlist-btn-${product.id}`}
            type="button"
            onClick={handleToggleWishlist}
            title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`w-8 h-8 rounded-full backdrop-blur-xs shadow-md flex items-center justify-center transition-all hover:scale-110 ${
              isFavorite
                ? 'bg-rose-50 border border-rose-200 text-rose-600'
                : 'bg-white/90 hover:bg-rose-50 text-slate-600 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
          </button>
          <button
            id={`quick-surprise-btn-${product.id}`}
            type="button"
            onClick={handleSurpriseGift}
            title="Send as a Secret Surprise Gift"
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-rose-500 text-slate-700 hover:text-white shadow-md flex items-center justify-center transition-all group/gift hover:scale-110"
          >
            <Gift className="w-4 h-4 text-rose-500 group-hover/gift:text-white transition-colors" />
          </button>
        </div>

        {/* Delivery ETA pill */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-900/80 backdrop-blur-xs text-white">
            <Clock className="w-3 h-3 text-amber-400" />
            {product.estimatedDeliveryTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category & Seller */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
          <span className="font-medium truncate text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
            {product.nestedType || parentCat?.name || 'Item'}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 truncate max-w-[130px]" title={product.seller.name}>
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate">{product.seller.name}</span>
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-interface font-semibold text-slate-900 text-sm md:text-base line-clamp-2 mb-1.5 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{product.rating.toFixed(1)}</span>
          <span className="text-[11px] text-slate-400 font-body">({product.reviewsCount})</span>
          <span className="text-slate-300">•</span>
          <span className={`text-[11px] font-medium ${product.inStock ? 'text-emerald-700' : 'text-rose-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 font-body">
          {product.shortDescription}
        </p>

        {/* Price and CTAs */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-body font-bold text-slate-950 text-base md:text-lg">
                  {formatRWF(product.price)}
                </span>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through font-body">
                  {formatRWF(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-slate-500 font-body">
              Del: {formatRWF(product.deliveryFee)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`add-cart-btn-${product.id}`}
              type="button"
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-interface font-semibold bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add
            </button>
            <button
              id={`buy-now-btn-${product.id}`}
              type="button"
              onClick={handleBuyNow}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-interface font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
