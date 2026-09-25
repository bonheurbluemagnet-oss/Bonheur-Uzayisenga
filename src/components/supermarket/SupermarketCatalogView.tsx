import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Store, Tag, Sparkles, ChevronRight, Check,
  ShoppingBag, ArrowUpDown, RefreshCw, MapPin, Clock, Plus, Minus,
  SlidersHorizontal, X, RotateCcw
} from 'lucide-react';
import { Product } from '../../types';
import { formatRWF, useStore } from '../../context/StoreContext';
import { SUPERMARKET_CATEGORIES } from '../../data/supermarketCategories';
import { SUPERMARKET_STORES } from '../../data/supermarketStores';
import { PriceComparisonModal } from './PriceComparisonModal';
import { WhereToFindModal } from './WhereToFindModal';
import { 
  SupermarketFilterSidebar, 
  PRICE_RANGE_PRESETS 
} from './SupermarketFilterSidebar';

export const SupermarketCatalogView: React.FC = () => {
  const { 
    products, 
    addToCart, 
    cart, 
    updateCartQuantity, 
    navigateToProduct,
    showNotification 
  } = useStore();

  // State
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [selectedSubcatId, setSelectedSubcatId] = useState<string>('all');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating' | 'updated'>('popular');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(true);
  const [onlyMadeInRwanda, setOnlyMadeInRwanda] = useState<boolean>(false);
  const [onlyInstantDelivery, setOnlyInstantDelivery] = useState<boolean>(false);

  // Price Filters State (Sliders & Checkboxes)
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [selectedPriceRangeIds, setSelectedPriceRangeIds] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Mobile Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Modals state
  const [comparisonProduct, setComparisonProduct] = useState<Product | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [whereToFindProduct, setWhereToFindProduct] = useState<Product | null>(null);
  const [isWhereToFindOpen, setIsWhereToFindOpen] = useState<boolean>(false);

  // Suggested Smart Queries
  const smartSearches = [
    { label: 'Milk', query: 'milk' },
    { label: 'Rice 5kg', query: 'rice 5kg' },
    { label: 'Soap under 5,000 RWF', query: 'soap under 5000' },
    { label: 'Products for birthday', query: 'birthday' },
    { label: 'Everything I need for dinner', query: 'dinner' }
  ];

  // Natural Language Query Parser
  const parseSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    let maxPriceCap: number | null = null;
    let birthdayIntent = false;
    let dinnerIntent = false;

    // Check for "under X" or "under X RWF"
    const underMatch = q.match(/under\s+(\d+[\d,]*)/i);
    if (underMatch) {
      maxPriceCap = parseInt(underMatch[1].replace(/,/g, ''), 10);
    }

    if (q.includes('birthday')) {
      birthdayIntent = true;
    }
    if (q.includes('dinner') || q.includes('cook') || q.includes('ingredients')) {
      dinnerIntent = true;
    }

    // Clean query words excluding syntax modifiers
    const cleanedWords = q
      .replace(/under\s+(\d+[\d,]*)/gi, '')
      .replace(/rwf/gi, '')
      .replace(/products\s+for/gi, '')
      .replace(/everything\s+i\s+need\s+for/gi, '')
      .trim()
      .split(/\s+/)
      .filter(w => w.length > 1);

    return { q, maxPriceCap, birthdayIntent, dinnerIntent, cleanedWords };
  };

  // Price filter helpers
  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRangeIds(prev =>
      prev.includes(rangeId) ? prev.filter(id => id !== rangeId) : [...prev, rangeId]
    );
  };

  const handleSetMinPrice = (val: number) => {
    setMinPrice(val);
    if (selectedPriceRangeIds.length > 0) {
      setSelectedPriceRangeIds([]);
    }
  };

  const handleSetMaxPrice = (val: number) => {
    setMaxPrice(val);
    if (selectedPriceRangeIds.length > 0) {
      setSelectedPriceRangeIds([]);
    }
  };

  const clearPriceFilter = () => {
    setMinPrice(0);
    setMaxPrice(50000);
    setSelectedPriceRangeIds([]);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetAllFilters = () => {
    setMinPrice(0);
    setMaxPrice(50000);
    setSelectedPriceRangeIds([]);
    setSelectedStoreId('all');
    setSelectedBrands([]);
    setOnlyInStock(false);
    setOnlyMadeInRwanda(false);
    setOnlyInstantDelivery(false);
    setSelectedCatId('all');
    setSelectedSubcatId('all');
    setSearchQuery('');
  };

  const isPriceFilterActive = useMemo(() => {
    return selectedPriceRangeIds.length > 0 || minPrice > 0 || maxPrice < 50000;
  }, [selectedPriceRangeIds, minPrice, maxPrice]);

  // Brand calculations
  const { availableBrands, brandCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      if (p.brand && p.brand.trim()) {
        const b = p.brand.trim();
        counts[b] = (counts[b] || 0) + 1;
      }
    });
    const sortedBrands = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 10);
    return { availableBrands: sortedBrands, brandCounts: counts };
  }, [products]);

  // Price range counts
  const priceRangeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PRICE_RANGE_PRESETS.forEach(preset => {
      counts[preset.id] = products.filter(p => {
        if (selectedCatId !== 'all' && p.categoryId !== selectedCatId) return false;
        if (selectedSubcatId !== 'all' && p.subcategoryId !== selectedSubcatId) return false;
        if (selectedStoreId !== 'all') {
          const matchesMainStore = p.storeId === selectedStoreId;
          const matchesOfferStore = p.storeOffers?.some(o => o.storeId === selectedStoreId);
          if (!matchesMainStore && !matchesOfferStore) return false;
        }
        if (onlyInStock && !p.inStock) return false;
        if (onlyMadeInRwanda && !p.isMadeInRwanda) return false;
        if (selectedBrands.length > 0 && (!p.brand || !selectedBrands.includes(p.brand))) return false;
        return p.price >= preset.min && p.price <= preset.max;
      }).length;
    });
    return counts;
  }, [products, selectedCatId, selectedSubcatId, selectedStoreId, onlyInStock, onlyMadeInRwanda, selectedBrands]);

  // Store counts
  const storeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SUPERMARKET_STORES.forEach(st => {
      counts[st.id] = products.filter(p => {
        const matchesStore = p.storeId === st.id || p.storeOffers?.some(o => o.storeId === st.id);
        if (!matchesStore) return false;
        if (selectedCatId !== 'all' && p.categoryId !== selectedCatId) return false;
        if (selectedSubcatId !== 'all' && p.subcategoryId !== selectedSubcatId) return false;
        if (onlyInStock && !p.inStock) return false;
        return true;
      }).length;
    });
    return counts;
  }, [products, selectedCatId, selectedSubcatId, onlyInStock]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedPriceRangeIds.length > 0) count += selectedPriceRangeIds.length;
    else if (minPrice > 0 || maxPrice < 50000) count += 1;
    if (selectedStoreId !== 'all') count += 1;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (onlyInstantDelivery) count += 1;
    if (onlyInStock) count += 1;
    if (onlyMadeInRwanda) count += 1;
    if (searchQuery.trim().length > 0) count += 1;
    return count;
  }, [selectedPriceRangeIds, minPrice, maxPrice, selectedStoreId, selectedBrands, onlyInstantDelivery, onlyInStock, onlyMadeInRwanda, searchQuery]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const { maxPriceCap, birthdayIntent, dinnerIntent, cleanedWords } = parseSearch(searchQuery);

    return products.filter((prod) => {
      // Category filter
      if (selectedCatId !== 'all' && prod.categoryId !== selectedCatId) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcatId !== 'all' && prod.subcategoryId !== selectedSubcatId) {
        return false;
      }
      // Store filter
      if (selectedStoreId !== 'all') {
        const matchesMainStore = prod.storeId === selectedStoreId;
        const matchesOfferStore = prod.storeOffers?.some(o => o.storeId === selectedStoreId);
        if (!matchesMainStore && !matchesOfferStore) {
          return false;
        }
      }
      // Stock filter
      if (onlyInStock && !prod.inStock) {
        return false;
      }
      // Made in Rwanda filter
      if (onlyMadeInRwanda && !prod.isMadeInRwanda) {
        return false;
      }
      // Instant Delivery filter
      if (onlyInstantDelivery) {
        const isInstant = 
          prod.deliveryAvailability === 'Instant' ||
          prod.deliveryAvailability === 'Immediate Express' ||
          (prod.estimatedDeliveryTime && (
            prod.estimatedDeliveryTime.includes('15') ||
            prod.estimatedDeliveryTime.includes('20') ||
            prod.estimatedDeliveryTime.includes('25') ||
            prod.estimatedDeliveryTime.includes('30') ||
            prod.estimatedDeliveryTime.includes('35')
          ));
        if (!isInstant) return false;
      }
      // Brand filter
      if (selectedBrands.length > 0) {
        if (!prod.brand || !selectedBrands.includes(prod.brand)) {
          return false;
        }
      }

      // RWF Price Range Checkbox / Slider Filter
      if (selectedPriceRangeIds.length > 0) {
        const matchesAnyPreset = selectedPriceRangeIds.some(id => {
          const preset = PRICE_RANGE_PRESETS.find(p => p.id === id);
          if (!preset) return false;
          return prod.price >= preset.min && prod.price <= preset.max;
        });
        if (!matchesAnyPreset) return false;
      } else {
        if (prod.price < minPrice) return false;
        if (maxPrice < 50000 && prod.price > maxPrice) return false;
      }

      // Max price cap from natural query (e.g. "under 5000 RWF")
      if (maxPriceCap !== null && prod.price > maxPriceCap) {
        return false;
      }

      // Birthday Intent
      if (birthdayIntent) {
        const isBirthdayItem = 
          prod.categoryId === 'cat-gifts-special-occasions' ||
          prod.categoryId === 'cat-bakery' ||
          prod.name.toLowerCase().includes('cake') ||
          prod.name.toLowerCase().includes('chocolate') ||
          prod.name.toLowerCase().includes('flower') ||
          prod.name.toLowerCase().includes('card');
        if (!isBirthdayItem) return false;
      }

      // Dinner Intent
      if (dinnerIntent) {
        const isDinnerItem = 
          prod.categoryId === 'cat-fresh-produce' ||
          prod.categoryId === 'cat-rice-flour-grains' ||
          prod.categoryId === 'cat-cooking-pantry' ||
          prod.categoryId === 'cat-meat-fish-poultry';
        if (!isDinnerItem) return false;
      }

      // Keyword match across fields
      if (cleanedWords.length > 0) {
        const searchableText = `${prod.name} ${prod.brand || ''} ${prod.shortDescription || ''} ${prod.unit || ''} ${prod.priceSource || ''} ${prod.categoryId} ${prod.subcategoryId}`.toLowerCase();
        const matchesAllWords = cleanedWords.every(word => searchableText.includes(word));
        if (!matchesAllWords) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'updated') return (b.lastUpdated || '').localeCompare(a.lastUpdated || '');
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [
    products, 
    selectedCatId, 
    selectedSubcatId, 
    selectedStoreId, 
    searchQuery, 
    sortBy, 
    onlyInStock, 
    onlyMadeInRwanda, 
    onlyInstantDelivery,
    selectedBrands,
    selectedPriceRangeIds,
    minPrice,
    maxPrice
  ]);

  // Selected Category Object
  const currentCategory = SUPERMARKET_CATEGORIES.find(c => c.id === selectedCatId);
  const currentStore = SUPERMARKET_STORES.find(s => s.id === selectedStoreId);

  // Cart quantity helper
  const getProductCartQuantity = (productId: string) => {
    const item = cart.find(ci => ci.product.id === productId);
    return item ? item.quantity : 0;
  };

  const handleOpenComparison = (product: Product) => {
    setComparisonProduct(product);
    setIsComparisonOpen(true);
  };

  const handleOpenWhereToFind = (product: Product) => {
    setWhereToFindProduct(product);
    setIsWhereToFindOpen(true);
  };

  return (
    <div id="supermarket-catalog-root" className="min-h-screen bg-slate-50/80 pb-20">
      {/* Supermarket Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-950 text-white relative overflow-hidden border-b border-emerald-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
                <Store className="w-3.5 h-3.5" />
                <span>Rwanda Supermarket Network • Live Prices & Inventory in RWF</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Ishema Supermarket Marketplace
              </h1>
              <p className="mt-2 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Browse products from Simba, Sawa City, Ndoli, Frulep, La Galette, Woodland & Kigali Agro-Markets. Compare live prices, check inventory availability, and enjoy doorstep delivery across Kigali.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0">
              <div className="text-center px-3 border-r border-white/15">
                <div className="text-xl sm:text-2xl font-black text-amber-400">20</div>
                <div className="text-[11px] text-white/80 font-medium">Categories</div>
              </div>
              <div className="text-center px-3 border-r border-white/15">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">{SUPERMARKET_STORES.length}</div>
                <div className="text-[11px] text-white/80 font-medium">Kigali Supermarkets</div>
              </div>
              <div className="text-center px-3">
                <div className="text-xl sm:text-2xl font-black text-cyan-300">{products.length}+</div>
                <div className="text-[11px] text-white/80 font-medium">Verified Items</div>
              </div>
            </div>
          </div>

          {/* Intelligent Search Input */}
          <div className="mt-6 sm:mt-8">
            <div className="relative max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-400" />
              </div>
              <input
                id="supermarket-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Try searching: "Milk", "Rice 5kg", "soap under 5000", "dinner", "birthday"...'
                className="block w-full pl-11 pr-24 py-3 sm:py-3.5 bg-white text-slate-900 rounded-xl sm:rounded-2xl placeholder-slate-400 shadow-xl border-0 focus:ring-4 focus:ring-emerald-400/40 text-sm sm:text-base font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-10 pr-3 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Smart Query Chips */}
            <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-emerald-200/80 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Popular queries:
              </span>
              {smartSearches.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSearchQuery(s.query)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    searchQuery.toLowerCase() === s.query.toLowerCase()
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : 'bg-white/15 hover:bg-white/25 text-white border border-white/10'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Store Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 mb-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Shop by Supermarket
              </h3>
            </div>
            {selectedStoreId !== 'all' && (
              <button
                onClick={() => setSelectedStoreId('all')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Reset to All Supermarkets
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedStoreId('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                selectedStoreId === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Supermarkets ({SUPERMARKET_STORES.length})
            </button>

            {SUPERMARKET_STORES.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStoreId(st.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 border transition-all ${
                  selectedStoreId === st.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <img
                  src={st.logo}
                  alt={st.name}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-md object-cover"
                />
                <span className="truncate max-w-[180px]">{st.name.split('(')[0].trim()}</span>
              </button>
            ))}
          </div>

          {currentStore && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">{currentStore.name}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {currentStore.address}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {currentStore.openingHours}
                </span>
              </div>
              <div className="text-emerald-700 font-medium">
                Delivery: {currentStore.deliveryTime} • Fee {formatRWF(currentStore.deliveryFee)}
              </div>
            </div>
          )}
        </div>

        {/* 20 Categories Horizontal Scroller */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Browse Supermarket Departments (20 Categories)
            </h2>
            {selectedCatId !== 'all' && (
              <button
                onClick={() => {
                  setSelectedCatId('all');
                  setSelectedSubcatId('all');
                }}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Show All Categories
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-2.5">
            <button
              onClick={() => {
                setSelectedCatId('all');
                setSelectedSubcatId('all');
              }}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center min-h-[85px] ${
                selectedCatId === 'all'
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs font-bold'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <ShoppingBag className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium leading-tight">All Aisles</span>
              <span className="text-[10px] opacity-75 mt-0.5">{products.length} items</span>
            </button>

            {SUPERMARKET_CATEGORIES.map((cat) => {
              const isSelected = selectedCatId === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => {
                    setSelectedCatId(cat.id);
                    setSelectedSubcatId('all');
                  }}
                  className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center min-h-[85px] relative group overflow-hidden ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg object-cover mb-1 shadow-2xs"
                  />
                  <span className="text-[11px] font-medium leading-tight line-clamp-2">
                    {cat.name}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5">
                    {cat.subcategories.length} subcats
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategories Chips Bar (if category selected) */}
        {currentCategory && (
          <div className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200 mb-6 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-600">
              <span className="text-slate-900">{currentCategory.name} subcategories:</span>
              <span className="text-slate-400">({currentCategory.description})</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => setSelectedSubcatId('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedSubcatId === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All in {currentCategory.name}
              </button>
              {currentCategory.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcatId(sub.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    selectedSubcatId === sub.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Catalog View with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-4">
            <SupermarketFilterSidebar
              minPrice={minPrice}
              setMinPrice={handleSetMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={handleSetMaxPrice}
              selectedPriceRangeIds={selectedPriceRangeIds}
              togglePriceRange={togglePriceRange}
              clearPriceFilter={clearPriceFilter}
              priceRangeCounts={priceRangeCounts}
              isPriceFilterActive={isPriceFilterActive}
              selectedStoreId={selectedStoreId}
              setSelectedStoreId={setSelectedStoreId}
              storeCounts={storeCounts}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              availableBrands={availableBrands}
              brandCounts={brandCounts}
              onlyInStock={onlyInStock}
              setOnlyInStock={setOnlyInStock}
              onlyMadeInRwanda={onlyMadeInRwanda}
              setOnlyMadeInRwanda={setOnlyMadeInRwanda}
              onlyInstantDelivery={onlyInstantDelivery}
              setOnlyInstantDelivery={setOnlyInstantDelivery}
              resetAllFilters={resetAllFilters}
              activeFiltersCount={activeFiltersCount}
              totalFilteredCount={filteredProducts.length}
            />
          </div>

          {/* Catalog Products Content Area */}
          <div className="flex-1 min-w-0 w-full">
            {/* Toolbar: Mobile Filter Trigger, Results Count, Active Chips, Sort */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs mb-4 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 flex-wrap">
                  {/* Mobile Filter Button */}
                  <button
                    id="mobile-open-filters-btn"
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-100 transition-colors shadow-2xs"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Filter & Prices (RWF)</span>
                    {activeFiltersCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-slate-950 font-interface text-sm sm:text-base">
                      {filteredProducts.length}
                    </span>
                    <span>products found</span>
                    {searchQuery && (
                      <span className="text-emerald-700 font-medium truncate max-w-[150px]">
                        for &quot;{searchQuery}&quot;
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  {/* Quick in-stock toggle on tablet/desktop */}
                  <label className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                    />
                    <span className="font-medium">In Stock Only</span>
                  </label>

                  {/* Sort Selector */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      id="supermarket-sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Top Customer Rated</option>
                      <option value="updated">Recently Updated Price</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips Bar */}
              {activeFiltersCount > 0 && (
                <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-400 font-medium">Active:</span>

                  {/* Price range preset chips */}
                  {selectedPriceRangeIds.map(id => {
                    const preset = PRICE_RANGE_PRESETS.find(p => p.id === id);
                    if (!preset) return null;
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium"
                      >
                        <Tag className="w-3 h-3 text-emerald-600" />
                        <span>{preset.label}</span>
                        <button
                          type="button"
                          onClick={() => togglePriceRange(id)}
                          className="hover:text-emerald-950 p-0.5"
                          aria-label={`Remove ${preset.label} filter`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}

                  {/* Continuous price slider chip if active and no checkboxes checked */}
                  {selectedPriceRangeIds.length === 0 && (minPrice > 0 || maxPrice < 50000) && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium">
                      <Tag className="w-3 h-3 text-emerald-600" />
                      <span>
                        {minPrice > 0 ? formatRWF(minPrice) : '0 RWF'} – {maxPrice < 50000 ? formatRWF(maxPrice) : 'Any'}
                      </span>
                      <button
                        type="button"
                        onClick={clearPriceFilter}
                        className="hover:text-emerald-950 p-0.5"
                        aria-label="Remove custom price filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Store chip */}
                  {selectedStoreId !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium">
                      <Store className="w-3 h-3 text-emerald-600" />
                      <span>{currentStore?.name.split('(')[0].trim()}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedStoreId('all')}
                        className="hover:text-slate-950 p-0.5"
                        aria-label="Remove store filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Brand chips */}
                  {selectedBrands.map(b => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium"
                    >
                      <span>Brand: {b}</span>
                      <button
                        type="button"
                        onClick={() => toggleBrand(b)}
                        className="hover:text-slate-950 p-0.5"
                        aria-label={`Remove ${b} brand filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {/* Instant delivery chip */}
                  {onlyInstantDelivery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium">
                      <span>Instant 15-35m</span>
                      <button
                        type="button"
                        onClick={() => setOnlyInstantDelivery(false)}
                        className="hover:text-amber-950 p-0.5"
                        aria-label="Remove instant delivery filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Made in Rwanda chip */}
                  {onlyMadeInRwanda && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium">
                      <span>🇷🇼 Made in Rwanda</span>
                      <button
                        type="button"
                        onClick={() => setOnlyMadeInRwanda(false)}
                        className="hover:text-emerald-950 p-0.5"
                        aria-label="Remove Made in Rwanda filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Clear all */}
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline ml-1"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No products found matching your filter</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
                  Try adjusting your price range sliders, clearing checkboxes, or expanding selected supermarkets.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => {
                  const qtyInCart = getProductCartQuantity(product.id);
                  const storeOffersCount = product.storeOffers ? product.storeOffers.length : 3;

                  return (
                    <div
                      key={product.id}
                      id={`product-card-${product.id}`}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
                    >
                      {/* Image & Badges */}
                      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => navigateToProduct(product.id)}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                            {product.badge}
                          </span>
                        )}
                        {product.isMadeInRwanda && (
                          <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-slate-200 flex items-center gap-1">
                            <span>🇷🇼</span> Rwanda
                          </span>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center text-white font-bold text-xs">
                            Out of Stock
                          </div>
                        )}
                      </div>

                      {/* Body Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Brand & Unit */}
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                            <span className="font-semibold text-slate-700 truncate max-w-[140px]">
                              {product.brand || 'Supermarket Fresh'}
                            </span>
                            {product.unit && (
                              <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-600">
                                {product.unit}
                              </span>
                            )}
                          </div>

                          {/* Product Name */}
                          <h3
                            onClick={() => navigateToProduct(product.id)}
                            className="font-bold text-slate-900 text-sm hover:text-emerald-700 cursor-pointer transition-colors line-clamp-2 mb-2 leading-snug"
                            title={product.name}
                          >
                            {product.name}
                          </h3>

                          {/* Store & Price Source */}
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">
                              Source: <strong className="text-slate-800 font-semibold">{product.priceSource || product.storeName || 'Simba CBD'}</strong>
                            </span>
                          </div>

                          {/* Last Updated Timestamp */}
                          <div className="text-[10px] text-slate-400 mb-2 flex items-center gap-1">
                            <RefreshCw className="w-3 h-3 text-emerald-500" />
                            <span>Price updated: {product.lastUpdated || 'Today 08:30 AM'}</span>
                          </div>
                        </div>

                        {/* Price and Action Buttons */}
                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex items-baseline justify-between mb-3">
                            <div>
                              <div className="text-base sm:text-lg font-black text-slate-900">
                                {formatRWF(product.price)}
                              </div>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <div className="text-[11px] text-slate-400 line-through">
                                  {formatRWF(product.originalPrice)}
                                </div>
                              )}
                            </div>

                            {/* Compare Prices Trigger */}
                            <button
                              id={`compare-btn-${product.id}`}
                              onClick={() => handleOpenComparison(product)}
                              className="px-2 py-1 rounded-md text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1 border border-emerald-200/60"
                            >
                              <Tag className="w-3 h-3" />
                              <span>Compare ({storeOffersCount} stores)</span>
                            </button>
                          </div>

                          {/* Secondary Action: Where to find */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <button
                              onClick={() => handleOpenWhereToFind(product)}
                              className="text-[11px] font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                            >
                              <MapPin className="w-3 h-3 text-rose-500" />
                              <span>Where to find this?</span>
                            </button>

                            <span className="text-[11px] text-slate-500">
                              ETA {product.estimatedDeliveryTime || '25 mins'}
                            </span>
                          </div>

                          {/* Add to Cart Controls */}
                          {qtyInCart > 0 ? (
                            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-1">
                              <button
                                onClick={() => updateCartQuantity(product.id, qtyInCart - 1)}
                                className="w-8 h-8 rounded-lg bg-white text-emerald-800 shadow-2xs flex items-center justify-center hover:bg-emerald-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-emerald-950 text-sm">
                                {qtyInCart} in Cart
                              </span>
                              <button
                                onClick={() => updateCartQuantity(product.id, qtyInCart + 1)}
                                className="w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-xs flex items-center justify-center hover:bg-emerald-700 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              id={`add-to-cart-btn-${product.id}`}
                              onClick={() => {
                                addToCart(product, 1);
                                showNotification?.('Added to Cart', `${product.name} added to your basket.`);
                              }}
                              disabled={!product.inStock}
                              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                                product.inStock
                                  ? 'bg-slate-900 hover:bg-emerald-700 text-white'
                                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide-over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <SupermarketFilterSidebar
              minPrice={minPrice}
              setMinPrice={handleSetMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={handleSetMaxPrice}
              selectedPriceRangeIds={selectedPriceRangeIds}
              togglePriceRange={togglePriceRange}
              clearPriceFilter={clearPriceFilter}
              priceRangeCounts={priceRangeCounts}
              isPriceFilterActive={isPriceFilterActive}
              selectedStoreId={selectedStoreId}
              setSelectedStoreId={setSelectedStoreId}
              storeCounts={storeCounts}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              availableBrands={availableBrands}
              brandCounts={brandCounts}
              onlyInStock={onlyInStock}
              setOnlyInStock={setOnlyInStock}
              onlyMadeInRwanda={onlyMadeInRwanda}
              setOnlyMadeInRwanda={setOnlyMadeInRwanda}
              onlyInstantDelivery={onlyInstantDelivery}
              setOnlyInstantDelivery={setOnlyInstantDelivery}
              resetAllFilters={resetAllFilters}
              activeFiltersCount={activeFiltersCount}
              totalFilteredCount={filteredProducts.length}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <PriceComparisonModal
        product={comparisonProduct}
        isOpen={isComparisonOpen}
        onClose={() => {
          setIsComparisonOpen(false);
          setComparisonProduct(null);
        }}
      />

      {/* Where to Find Modal */}
      <WhereToFindModal
        product={whereToFindProduct}
        isOpen={isWhereToFindOpen}
        onClose={() => {
          setIsWhereToFindOpen(false);
          setWhereToFindProduct(null);
        }}
        onOpenPriceComparison={(prod) => {
          setComparisonProduct(prod);
          setIsComparisonOpen(true);
        }}
      />
    </div>
  );
};
