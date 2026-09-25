import React, { useState, useEffect, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import {
  Star,
  ShieldCheck,
  Clock,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  Gift,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Store,
  MapPin,
  Phone,
  AlertCircle,
  PackageX,
  ThumbsUp,
  MessageSquare,
  Maximize2,
  X,
  BadgeCheck
} from 'lucide-react';
import { Product, ProductVariation } from '../types';
import { formatRWF, useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  INITIAL_PRODUCT_REVIEWS,
  getFallbackReviews,
  CustomerReviewItem
} from '../data/productReviewsData';

// Professional fallback SVG placeholder image (encoded SVG data URI)
export const PRODUCT_FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20600%22%3E%3Crect%20fill%3D%22%23f1f5f9%22%20width%3D%22600%22%20height%3D%22600%22%2F%3E%3Cpath%20d%3D%22M200%20380l60-80%2050%2060%2070-90%2080%20110H200z%22%20fill%3D%22%23cbd5e1%22%2F%3E%3Ccircle%20cx%3D%22260%22%20cy%3D%22230%22%20r%3D%2230%22%20fill%3D%22%23fbbf24%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22440%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%20fill%3D%22%2364748b%22%20text-anchor%3D%22middle%22%3EIshema%20Express%20Verified%3C%2Ftext%3E%3C%2Fsvg%3E';

// Component Error Boundary to prevent any blank screen from unexpected errors
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ProductErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ProductDetailsView render error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const ProductDetailsView: React.FC = () => {
  const {
    selectedProduct,
    selectedProductId,
    products,
    categories,
    navigateToProduct,
    setCurrentView,
    setSelectedCategory,
    addToCart,
    setIsCheckoutOpen,
    setIsSurpriseGiftMode,
    isProductLoading,
    currentUser,
    toggleFavoriteProduct
  } = useStore();

  // Find product either from selectedProduct or matching selectedProductId
  const activeProduct: Product | null = useMemo(() => {
    if (selectedProduct) return selectedProduct;
    if (!selectedProductId) return null;
    const cleanId = decodeURIComponent(selectedProductId).trim().toLowerCase();
    return (
      products.find(
        p =>
          p.id.toLowerCase() === cleanId ||
          (p.slug && p.slug.toLowerCase() === cleanId) ||
          p.id.toLowerCase().replace(/^prod-/, '') === cleanId
      ) || null
    );
  }, [selectedProduct, selectedProductId, products]);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Purchase options state
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'delivery' | 'reviews'>('description');

  // UI feedback states
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<CustomerReviewItem[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('Kigali');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  // Reset image selection, variations & reviews when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);

    if (activeProduct) {
      // Initialize variations with first option
      const initialVars: Record<string, string> = {};
      if (activeProduct.variations && activeProduct.variations.length > 0) {
        activeProduct.variations.forEach(v => {
          if (v.options && v.options.length > 0) {
            initialVars[v.name] = v.options[0];
          }
        });
      }
      setSelectedVariations(initialVars);

      // Check favorite status
      if (currentUser?.favoriteProductIds) {
        setIsFavorite(currentUser.favoriteProductIds.includes(activeProduct.id));
      }

      // Load reviews
      const storedReviews = INITIAL_PRODUCT_REVIEWS[activeProduct.id] || getFallbackReviews(activeProduct.id, activeProduct.name);
      setReviewsList(storedReviews);
    }
  }, [activeProduct?.id, currentUser?.favoriteProductIds]);

  // Handle variation select
  const handleVariationChange = (varName: string, option: string) => {
    setSelectedVariations(prev => ({
      ...prev,
      [varName]: option
    }));
  };

  // Color swatch indicator helper
  const getColorSwatch = (name: string): string | null => {
    const n = name.toLowerCase();
    if (n.includes('matte black') || n.includes('black')) return '#18181b';
    if (n.includes('platinum silver') || n.includes('silver')) return '#cbd5e1';
    if (n.includes('midnight blue') || n.includes('navy') || n.includes('blue')) return '#1e3a8a';
    if (n.includes('red')) return '#dc2626';
    if (n.includes('gold')) return '#eab308';
    if (n.includes('white')) return '#f8fafc';
    return null;
  };

  // Safe image helper
  const images = useMemo(() => {
    if (activeProduct?.images && activeProduct.images.length > 0) {
      return activeProduct.images;
    }
    return [PRODUCT_FALLBACK_IMAGE];
  }, [activeProduct]);

  // Current active image with bounds safety
  const currentImageSrc = images[selectedImageIndex] || images[0] || PRODUCT_FALLBACK_IMAGE;

  // Add to cart handler
  const handleAddToCart = () => {
    if (!activeProduct) return;
    addToCart(activeProduct, quantity, selectedVariations);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 2500);
  };

  // Buy Now handler
  const handleBuyNow = () => {
    if (!activeProduct) return;
    addToCart(activeProduct, quantity, selectedVariations);
    setIsCheckoutOpen(true);
  };

  // Surprise gift handler
  const handleSurpriseGift = () => {
    if (!activeProduct) return;
    addToCart(activeProduct, quantity, selectedVariations);
    setIsSurpriseGiftMode(true);
    setIsCheckoutOpen(true);
  };

  // Favorite toggle handler
  const handleToggleFavorite = () => {
    if (!activeProduct) return;
    toggleFavoriteProduct(activeProduct.id);
    setIsFavorite(!isFavorite);
  };

  // Share handler
  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const shareUrl = window.location.href;
    if (navigator.share && activeProduct) {
      try {
        await navigator.share({
          title: `${activeProduct.name} - Ishema Express`,
          text: `Check out ${activeProduct.name} on Ishema Express Rwanda:`,
          url: shareUrl
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2200);
    } catch {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2200);
    }
  };

  // Submit new review handler
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim() || !activeProduct) return;

    const newReview: CustomerReviewItem = {
      id: `rev-user-${Date.now()}`,
      productId: activeProduct.id,
      authorName: newReviewAuthor.trim() || currentUser?.fullName || 'Verified Customer',
      location: newReviewLocation.trim() || 'Kigali, Rwanda',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verifiedPurchase: true,
      helpfulCount: 1
    };

    setReviewsList(prev => [newReview, ...prev]);
    setNewReviewComment('');
    setReviewSubmitSuccess(true);
    setTimeout(() => {
      setReviewSubmitSuccess(false);
      setIsReviewModalOpen(false);
    }, 1500);
  };

  // Parent Category & Subcategory info
  const parentCategory = categories.find(c => c.id === activeProduct?.categoryId);
  const parentSubcategory = parentCategory?.subcategories.find(s => s.id === activeProduct?.subcategoryId);

  // Related products from same category or subcategory (guaranteed 4 products)
  const relatedProducts = useMemo(() => {
    if (!activeProduct) return [];
    const sameCategory = products.filter(
      p =>
        p.id !== activeProduct.id &&
        (p.categoryId === activeProduct.categoryId || p.subcategoryId === activeProduct.subcategoryId)
    );
    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }
    const otherProducts = products.filter(
      p => p.id !== activeProduct.id && !sameCategory.some(sc => sc.id === p.id)
    );
    return [...sameCategory, ...otherProducts].slice(0, 4);
  }, [activeProduct, products]);

  // ----------------------------------------------------
  // 1. LOADING SKELETON STATE (Never show white screen)
  // ----------------------------------------------------
  if (isProductLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-slate-200 rounded-md" />
          <div className="h-4 w-4 bg-slate-200 rounded-md" />
          <div className="h-4 w-24 bg-slate-200 rounded-md" />
          <div className="h-4 w-4 bg-slate-200 rounded-md" />
          <div className="h-4 w-48 bg-slate-200 rounded-md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery Skeleton */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full aspect-square bg-slate-200 rounded-3xl" />
            <div className="flex gap-3">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="w-20 h-20 bg-slate-200 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="h-6 w-32 bg-amber-100 rounded-full" />
              <div className="h-9 w-3/4 bg-slate-200 rounded-xl" />
              <div className="h-4 w-44 bg-slate-200 rounded-md" />
            </div>

            <div className="h-12 w-48 bg-slate-200 rounded-xl" />

            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded-md" />
              <div className="h-4 w-5/6 bg-slate-200 rounded-md" />
              <div className="h-4 w-2/3 bg-slate-200 rounded-md" />
            </div>

            <div className="h-24 w-full bg-slate-100 rounded-2xl" />

            <div className="flex gap-4 pt-4">
              <div className="h-14 flex-1 bg-amber-200 rounded-2xl" />
              <div className="h-14 flex-1 bg-slate-900/20 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. ERROR STATE (Product Not Found)
  // ----------------------------------------------------
  if (!activeProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-xl mx-auto text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-lg">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <PackageX className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-600">
              Unavailable Item
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
              Product Not Found
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-body leading-relaxed">
              Sorry, this product is no longer available or the link may be incorrect.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="product-not-found-continue-shopping-btn"
              type="button"
              onClick={() => setCurrentView('category')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
            <button
              id="product-not-found-go-home-btn"
              type="button"
              onClick={() => setCurrentView('home')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-interface font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Home</span>
            </button>
          </div>
        </div>

        {/* Alternative Recommended Products */}
        {products.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="border-t border-slate-200 pt-10">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Popular Items Across Rwanda
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore best-selling groceries, meals, and artisan gifts with express delivery.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // 3. FULL PRODUCT DETAILS PAGE (Fully Functional)
  // ----------------------------------------------------
  const safeRating = Number(activeProduct.rating) || 4.8;
  const safeReviewsCount = Number(activeProduct.reviewsCount) || 12;
  const safePrice = Number(activeProduct.price) || 0;
  const safeOriginalPrice = activeProduct.originalPrice ? Number(activeProduct.originalPrice) : null;
  const discountPct = activeProduct.discountPercentage || (safeOriginalPrice && safeOriginalPrice > safePrice ? Math.round(((safeOriginalPrice - safePrice) / safeOriginalPrice) * 100) : 0);
  const inStock = activeProduct.inStock !== false && (activeProduct.stock ?? 1) > 0;
  const stockCount = activeProduct.stock ?? 25;

  return (
    <ProductErrorBoundary
      fallback={
        <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Notice</h2>
          <p className="text-sm text-slate-600">
            We encountered a temporary rendering issue loading this item.
          </p>
          <button
            onClick={() => setCurrentView('category')}
            className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
          >
            Back to Marketplace
          </button>
        </div>
      }
    >
      <div id={`product-details-page-${activeProduct.id}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
        {/* Added to cart toast */}
        {addedToCartToast && (
          <div className="fixed top-20 right-4 z-50 bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/30 animate-in fade-in slide-in-from-top-4">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <p className="text-xs font-bold font-interface">Added to Cart!</p>
              <p className="text-[11px] text-slate-400 font-body">
                {quantity}x {activeProduct.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="ml-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
            >
              Checkout
            </button>
          </div>
        )}

        {/* Back to Products Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pb-2">
          <button
            id="product-back-to-products-btn"
            type="button"
            onClick={() => {
              if (parentCategory) {
                setSelectedCategory(parentCategory);
                setCurrentView('category');
              } else {
                setCurrentView('supermarket');
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>← Back to Products</span>
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-interface">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="hover:text-amber-700 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            type="button"
            onClick={() => setCurrentView('category')}
            className="hover:text-amber-700 transition-colors"
          >
            Marketplace
          </button>
          {parentCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <button
                type="button"
                onClick={() => {
                  setCurrentView('category');
                }}
                className="hover:text-amber-700 transition-colors"
              >
                {parentCategory.name}
              </button>
            </>
          )}
          {parentSubcategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-700 font-medium">{parentSubcategory.name}</span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">
            {activeProduct.name}
          </span>
        </nav>

        {/* Main Product Layout (Gallery + Buying Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Main Image Container */}
            <div className="relative aspect-4/3 sm:aspect-square w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md group">
              <img
                src={currentImageSrc}
                alt={activeProduct.name}
                referrerPolicy="no-referrer"
                onError={e => {
                  const target = e.currentTarget;
                  if (target.src !== PRODUCT_FALLBACK_IMAGE) {
                    target.src = PRODUCT_FALLBACK_IMAGE;
                  }
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {activeProduct.badge && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    {activeProduct.badge}
                  </span>
                )}
                {discountPct > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md">
                    {discountPct}% OFF
                  </span>
                )}
                {activeProduct.isMadeInRwanda && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Made in Rwanda
                  </span>
                )}
              </div>

              {/* Lightbox / Zoom Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                title="View Fullscreen"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:text-slate-950 hover:bg-white shadow-md flex items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-105"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Dispatch speed badge */}
              <div className="absolute bottom-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/85 backdrop-blur-xs text-white">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeProduct.estimatedDeliveryTime || '25–40 mins Kigali Moto Delivery'}</span>
                </span>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20 scale-102'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${activeProduct.name} - view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      onError={e => {
                        const target = e.currentTarget;
                        if (target.src !== PRODUCT_FALLBACK_IMAGE) {
                          target.src = PRODUCT_FALLBACK_IMAGE;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Information & Purchase Box (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header / Titles */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                  <Store className="w-3.5 h-3.5" />
                  {activeProduct.nestedType || parentCategory?.name || 'Verified Marketplace'}
                </span>

                <div className="flex items-center gap-2">
                  {/* Share button */}
                  <button
                    id="product-detail-share-btn"
                    type="button"
                    onClick={handleShare}
                    title="Share this product"
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1 text-xs"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  {copyFeedback && (
                    <span className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-lg animate-in fade-in">
                      Link copied!
                    </span>
                  )}

                  {/* Favorite button */}
                  <button
                    id="product-detail-favorite-btn"
                    type="button"
                    onClick={handleToggleFavorite}
                    title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    className={`p-2 rounded-xl border transition-colors flex items-center justify-center ${
                      isFavorite
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50/50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-950 leading-tight">
                {activeProduct.name}
              </h1>

              {/* Rating & Reviews summary */}
              <div className="flex items-center flex-wrap gap-3 pt-1 text-xs sm:text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-900">{safeRating.toFixed(1)}</span>
                </div>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className="text-amber-700 hover:underline font-semibold"
                >
                  {safeReviewsCount} customer reviews
                </button>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Kigali Merchant
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-slate-50 to-amber-50/40 border border-slate-200/80 space-y-2">
              <div className="flex items-baseline flex-wrap gap-3">
                <span className="font-heading font-black text-2xl sm:text-3xl text-slate-950">
                  {formatRWF(safePrice)}
                </span>
                {safeOriginalPrice && safeOriginalPrice > safePrice && (
                  <span className="text-sm sm:text-base line-through text-slate-400 font-medium">
                    {formatRWF(safeOriginalPrice)}
                  </span>
                )}
                {discountPct > 0 && (
                  <span className="text-xs font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md">
                    Save {discountPct}%
                  </span>
                )}
              </div>

              <div className="flex items-center flex-wrap gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    Delivery:{' '}
                    <strong className="text-slate-900">
                      {activeProduct.deliveryFee === 0 ? 'FREE' : formatRWF(activeProduct.deliveryFee)}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    Status:{' '}
                    <strong className={inStock ? 'text-emerald-700' : 'text-rose-600'}>
                      {inStock ? `In Stock (${stockCount} units available)` : 'Out of Stock'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-body">
              {activeProduct.shortDescription || activeProduct.description}
            </p>

            {/* Variations Selectors (Sizes, Colors, Flavors, Crust) */}
            {activeProduct.variations && activeProduct.variations.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                {activeProduct.variations.map(variation => (
                  <div key={variation.name} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 font-interface">
                        Select {variation.name}:
                      </span>
                      <span className="text-amber-700 font-semibold">
                        {selectedVariations[variation.name] || variation.options[0]}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {variation.options.map(option => {
                        const isSelected =
                          selectedVariations[variation.name] === option ||
                          (!selectedVariations[variation.name] && option === variation.options[0]);

                        const isColor = variation.name.toLowerCase().includes('color');
                        const swatch = isColor ? getColorSwatch(option) : null;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleVariationChange(variation.name, option)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs ring-2 ring-amber-500/20 font-bold'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {swatch && (
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs shrink-0"
                                style={{ backgroundColor: swatch }}
                              />
                            )}
                            <span>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector & Purchase CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-800 font-interface">Quantity:</span>
                <div className="inline-flex items-center border border-slate-200 rounded-xl bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.min(stockCount, prev + 1))}
                    disabled={quantity >= stockCount}
                    className="p-2.5 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Total:{' '}
                  <strong className="text-slate-900">{formatRWF(safePrice * quantity)}</strong>
                </span>
              </div>

              {/* Primary Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  id="product-detail-add-to-cart-btn"
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  id="product-detail-buy-now-btn"
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-interface font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Secret Surprise Gift CTA */}
              <button
                id="product-detail-surprise-gift-btn"
                type="button"
                onClick={handleSurpriseGift}
                className="w-full py-3 rounded-2xl bg-linear-to-r from-rose-500/10 to-amber-500/10 hover:from-rose-500/20 hover:to-amber-500/20 border border-rose-200/80 text-rose-700 font-interface font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4 text-rose-600" />
                <span>Send as a Secret Surprise Gift to Someone Special</span>
              </button>
            </div>

            {/* Verified Seller Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-800 flex items-center justify-center font-bold text-base shrink-0">
                  {activeProduct.seller.name[0] || 'S'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-interface font-bold text-sm text-slate-900">
                      {activeProduct.seller.name}
                    </h4>
                    {activeProduct.seller.verified && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {activeProduct.seller.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {activeProduct.seller.rating || '4.9'}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${activeProduct.seller.phone || '+250780837936'}`}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0"
                title="Call Seller"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Contact</span>
              </a>
            </div>
          </div>
        </div>

        {/* DETAILS, SPECIFICATIONS & REVIEWS TABS */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Tab Headers */}
          <div className="flex items-center border-b border-slate-200 overflow-x-auto bg-slate-50/60 scrollbar-none px-4 sm:px-6">
            {[
              { id: 'description', label: 'Full Description' },
              { id: 'specifications', label: 'Specifications & Standards' },
              { id: 'delivery', label: 'Delivery & Returns' },
              { id: 'reviews', label: `Customer Reviews (${reviewsList.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 sm:px-6 py-4 font-interface text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 sm:p-8">
            {/* Tab 1: Description */}
            {activeTab === 'description' && (
              <div className="max-w-3xl space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-body">
                <p>{activeProduct.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <Clock className="w-5 h-5 text-amber-500 mb-1" />
                    <h5 className="font-bold text-xs text-slate-900">Swift Dispatch</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Packed within 15 minutes of order placement in Kigali.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                    <h5 className="font-bold text-xs text-slate-900">Quality Verified</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sourced directly from certified suppliers and artisans.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <RotateCcw className="w-5 h-5 text-indigo-500 mb-1" />
                    <h5 className="font-bold text-xs text-slate-900">Easy Exchanges</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Instant courier swap for eligible incorrect sizes or items.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Specifications */}
            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <div className="grid grid-cols-2 p-3 text-xs bg-slate-50 font-bold text-slate-700">
                    <span>Feature / Specification</span>
                    <span>Details</span>
                  </div>
                  {activeProduct.specifications && Object.keys(activeProduct.specifications).length > 0 ? (
                    Object.entries(activeProduct.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 p-3 text-xs text-slate-700">
                        <span className="font-medium text-slate-500">{key}</span>
                        <span className="font-semibold text-slate-900">{val}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="grid grid-cols-2 p-3 text-xs text-slate-700">
                        <span className="font-medium text-slate-500">Origin District</span>
                        <span className="font-semibold text-slate-900">{activeProduct.originDistrict || 'Kigali, Rwanda'}</span>
                      </div>
                      <div className="grid grid-cols-2 p-3 text-xs text-slate-700">
                        <span className="font-medium text-slate-500">Compliance Standard</span>
                        <span className="font-semibold text-slate-900">RSB Rwanda Standard Certified</span>
                      </div>
                      <div className="grid grid-cols-2 p-3 text-xs text-slate-700">
                        <span className="font-medium text-slate-500">Packaging</span>
                        <span className="font-semibold text-slate-900">Eco-friendly Thermal Carrier Seal</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Delivery & Returns */}
            {activeTab === 'delivery' && (
              <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
                  <Truck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Rwanda Express Moto Network</h5>
                    <p className="mt-1 text-slate-600">
                      Deliveries across Kigali (Kimihurura, Remera, Kiyovu, Nyarutarama, Gisozi, Kicukiro, Kanombe) arrive within 25–45 minutes. Upcountry districts (Musanze, Huye, Rubavu) arrive same-day or next morning.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Customer Inspection on Delivery</h5>
                    <p className="mt-1 text-slate-600">
                      You are always welcome to inspect the package upon driver arrival. If the item does not match your expectations, the driver can handle return dispatch on the spot.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Rating Overview */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900">
                      {safeRating.toFixed(1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(safeRating) ? 'fill-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Based on {reviewsList.length} verified ratings in Rwanda
                      </p>
                    </div>
                  </div>

                  <button
                    id="write-customer-review-btn"
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Write a Customer Review</span>
                  </button>
                </div>

                {/* Review Form Modal */}
                {isReviewModalOpen && (
                  <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-slate-900 text-sm">
                        Leave a Review for {activeProduct.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsReviewModalOpen(false)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {reviewSubmitSuccess ? (
                      <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Thank you! Your verified review has been posted.
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitReview} className="space-y-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-slate-700">Your Rating:</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="p-1 text-amber-400 hover:scale-110 transition-transform"
                              >
                                <Star
                                  className={`w-5 h-5 ${
                                    star <= newReviewRating ? 'fill-amber-400' : 'text-slate-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Your Name (e.g. Jean-Luc N.)"
                            value={newReviewAuthor}
                            onChange={e => setNewReviewAuthor(e.target.value)}
                            required
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                          <input
                            type="text"
                            placeholder="Your District/Neighborhood (e.g. Kimihurura)"
                            value={newReviewLocation}
                            onChange={e => setNewReviewLocation(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>

                        <textarea
                          placeholder="How was the product and delivery service?"
                          value={newReviewComment}
                          onChange={e => setNewReviewComment(e.target.value)}
                          rows={3}
                          required
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsReviewModalOpen(false)}
                            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-xl shadow-xs"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsList.map(rev => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-900 font-bold flex items-center justify-center text-xs">
                            {rev.authorName[0] || 'U'}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className="font-bold text-slate-900">{rev.authorName}</h5>
                              {rev.verifiedPurchase && (
                                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm font-semibold">
                                  Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">{rev.location}</span>
                          </div>
                        </div>
                        <span className="text-slate-400 text-[11px]">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 font-body leading-relaxed">
                        {rev.comment}
                      </p>

                      <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-400">
                        <button
                          type="button"
                          className="flex items-center gap-1 hover:text-slate-700 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({rev.helpfulCount})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-700">
                  More From This Category
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-950 mt-0.5">
                  Related Products in Kigali
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('category')}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                View Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relProduct => (
                <ProductCard
                  key={`rel-${relProduct.id}`}
                  product={relProduct}
                  onSelect={p => navigateToProduct(p.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* LIGHTBOX FULLSCREEN IMAGE MODAL */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-amber-400 p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={currentImageSrc}
                alt={activeProduct.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* MOBILE STICKY BOTTOM ACTION BAR */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Price</span>
            <span className="font-heading font-black text-lg text-slate-950">
              {formatRWF(safePrice * quantity)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-interface font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="px-4 py-2.5 rounded-xl bg-slate-950 text-white font-interface font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </ProductErrorBoundary>
  );
};
