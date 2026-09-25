import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  Filter,
  SlidersHorizontal,
  Search,
  Check,
  RotateCcw,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Category, Subcategory, Product } from '../types';
import { useStore, formatRWF } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

interface CategoryViewProps {
  category?: Category;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category: propCategory }) => {
  const {
    selectedCategory,
    categories,
    products,
    selectedSubcategory,
    setSelectedSubcategory,
    selectedNestedType,
    setSelectedNestedType,
    setCurrentView,
    setSelectedCategory
  } = useStore();

  const category = propCategory || selectedCategory || categories[0];

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('recommended');
  const [priceMax, setPriceMax] = useState<number>(2000000);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyDiscounts, setOnlyDiscounts] = useState<boolean>(false);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  // Active subcategory object
  const activeSubcategory = useMemo(() => {
    if (!selectedSubcategory) return null;
    return category.subcategories.find(s => s.id === selectedSubcategory.id) || selectedSubcategory;
  }, [selectedSubcategory, category]);

  // Nested types for active subcategory
  const nestedTypes = activeSubcategory?.nestedTypes || [];

  // Filtered products
  const categoryProducts = useMemo(() => {
    return products.filter(p => {
      // Must match main category
      if (p.categoryId !== category.id) return false;

      // Subcategory check
      if (activeSubcategory && p.subcategoryId !== activeSubcategory.id) return false;

      // Nested type check
      if (selectedNestedType && p.nestedType && p.nestedType.toLowerCase() !== selectedNestedType.toLowerCase()) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchTitle = p.name.toLowerCase().includes(term);
        const matchDesc = p.shortDescription.toLowerCase().includes(term);
        const matchSeller = p.seller.name.toLowerCase().includes(term);
        const matchType = p.nestedType?.toLowerCase().includes(term);
        if (!matchTitle && !matchDesc && !matchSeller && !matchType) return false;
      }

      // Price filter
      if (p.price > priceMax) return false;

      // Rating filter
      if (minRating > 0 && p.rating < minRating) return false;

      // Discounts only
      if (onlyDiscounts && (!p.discountPercentage || p.discountPercentage <= 0)) return false;

      // In stock only
      if (onlyInStock && !p.inStock) return false;

      // Store filter
      if (selectedStore !== 'all') {
        const storeName = p.storeName || p.seller?.name || '';
        if (!storeName.toLowerCase().includes(selectedStore.toLowerCase())) return false;
      }

      return true;
    });
  }, [
    products,
    category.id,
    activeSubcategory,
    selectedNestedType,
    searchTerm,
    priceMax,
    minRating,
    onlyDiscounts,
    onlyInStock,
    selectedStore
  ]);

  // Sorted products
  const sortedProducts = useMemo(() => {
    const list = [...categoryProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.reverse();
      case 'recommended':
      default:
        return list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }
  }, [categoryProducts, sortBy]);

  // Handle Breadcrumb clicks
  const handleGoHome = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedNestedType(null);
    setCurrentView('home');
  };

  const handleResetSubcategory = () => {
    setSelectedSubcategory(null);
    setSelectedNestedType(null);
  };

  const handleResetNestedType = () => {
    setSelectedNestedType(null);
  };

  const handleSelectSubcategory = (sub: Subcategory) => {
    setSelectedSubcategory(sub);
    setSelectedNestedType(null);
  };

  const handleSelectNestedType = (type: string) => {
    if (selectedNestedType === type) {
      setSelectedNestedType(null);
    } else {
      setSelectedNestedType(type);
    }
  };

  return (
    <div id="category-view-container" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Dynamic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-slate-500 font-interface mb-6">
        <button
          type="button"
          onClick={handleGoHome}
          className="hover:text-amber-600 transition-colors font-medium flex items-center gap-1"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          type="button"
          onClick={handleResetSubcategory}
          className={`hover:text-amber-600 transition-colors font-medium ${
            !activeSubcategory ? 'text-amber-600 font-bold' : ''
          }`}
        >
          {category.name}
        </button>

        {activeSubcategory && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              type="button"
              onClick={handleResetNestedType}
              className={`hover:text-amber-600 transition-colors font-medium ${
                !selectedNestedType ? 'text-amber-600 font-bold' : ''
              }`}
            >
              {activeSubcategory.name}
            </button>
          </>
        )}

        {selectedNestedType && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded-md">
              {selectedNestedType}
            </span>
          </>
        )}
      </nav>

      {/* Category Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-8 border border-slate-200/80 shadow-sm bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 md:p-10">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <img
            src={activeSubcategory?.image || category.image}
            alt={category.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {activeSubcategory ? activeSubcategory.name : category.name}
            </span>
            {selectedNestedType && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {selectedNestedType}
              </span>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white mb-2">
            {selectedNestedType
              ? `${selectedNestedType} in Rwanda`
              : activeSubcategory
              ? activeSubcategory.name
              : category.name}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-body max-w-xl leading-relaxed">
            {activeSubcategory
              ? `Browse top rated ${activeSubcategory.name.toLowerCase()} available for fast delivery across Kigali and surrounding districts.`
              : category.description}
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs text-amber-400 font-interface">
            <span>⚡ 30–45 min Express Delivery</span>
            <span>•</span>
            <span>📱 MTN MoMo & Airtel Accepted</span>
          </div>
        </div>
      </div>

      {/* Subcategories Visual Showcase */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              {activeSubcategory ? `Other ${category.name} Subcategories` : `Explore ${category.name} Subcategories`}
            </h2>
            <p className="text-xs text-slate-500 font-body">Select a subcategory to view specialized options & items</p>
          </div>
          {activeSubcategory && (
            <button
              type="button"
              onClick={handleResetSubcategory}
              className="text-xs font-interface font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              View All Subcategories
            </button>
          )}
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {category.subcategories.map(sub => {
            const isSelected = activeSubcategory?.id === sub.id;
            return (
              <div
                key={sub.id}
                onClick={() => handleSelectSubcategory(sub)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md bg-amber-50/50'
                    : 'border-slate-200 hover:border-amber-400 bg-white hover:shadow-lg'
                }`}
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-slate-950 p-1 rounded-full shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-interface font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 line-clamp-1">
                    {sub.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-body mt-0.5">
                    {sub.itemCount} items
                  </span>

                  <button
                    type="button"
                    className={`mt-2 text-[11px] font-semibold py-1 px-2 rounded-lg text-center transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 group-hover:bg-amber-100 text-slate-700 group-hover:text-amber-900'
                    }`}
                  >
                    {isSelected ? 'Active' : 'View More'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nested Type Specific Choices Pills (e.g., Food -> Pizza -> Chicken Pizza, Beef Pizza, Cheese Pizza...) */}
      {nestedTypes.length > 0 && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-interface font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
              <span>Filter by Specific Type in {activeSubcategory?.name}:</span>
            </h3>
            {selectedNestedType && (
              <button
                type="button"
                onClick={handleResetNestedType}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleResetNestedType}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                !selectedNestedType
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              All {activeSubcategory?.name}
            </button>

            {nestedTypes.map(type => {
              const isSelected = selectedNestedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSelectNestedType(type)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Controls Bar: Search, Filters button, Sorter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search within category */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={`Search within ${selectedNestedType || activeSubcategory?.name || category.name}...`}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-body"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 md:hidden"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>

          {/* Sorter */}
          <div className="flex items-center gap-1 text-xs text-slate-600 shrink-0">
            <span className="hidden sm:inline font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-interface"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <aside
          className={`lg:col-span-3 ${
            showFiltersMobile ? 'block' : 'hidden lg:block'
          } bg-white p-5 rounded-2xl border border-slate-200 h-fit space-y-6`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-500" />
              Filter Products
            </h3>
            <button
              type="button"
              onClick={() => {
                setPriceMax(2000000);
                setMinRating(0);
                setOnlyDiscounts(false);
                setOnlyInStock(false);
                setSelectedStore('all');
                setSearchTerm('');
              }}
              className="text-xs text-slate-400 hover:text-amber-600 font-medium"
            >
              Reset
            </button>
          </div>

          {/* Store / Merchant Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              Store / Supermarket
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', name: 'All Stores & Markets' },
                { id: 'Simba', name: 'Simba Supermarket' },
                { id: 'Ndoli', name: 'Ndoli Joint Supermarket' },
                { id: 'Sawa City', name: 'Sawa City Supermarket' },
                { id: 'Kimironko', name: 'Kimironko Fresh Market' }
              ].map(st => (
                <label key={st.id} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input
                    type="radio"
                    name="store-filter"
                    checked={selectedStore === st.id}
                    onChange={() => setSelectedStore(st.id)}
                    className="accent-amber-500"
                  />
                  <span>{st.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-800 mb-2">
              <span>Max Price</span>
              <span className="text-amber-600 font-bold">{formatRWF(priceMax)}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="2000000"
              step="5000"
              value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-body">
              <span>RWF 2,000</span>
              <span>RWF 2,000,000</span>
            </div>
          </div>

          {/* Rating filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">Customer Rating</label>
            <div className="space-y-1.5 text-xs">
              {[4.8, 4.5, 4.0, 0].map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input
                    type="radio"
                    name="rating-filter"
                    checked={minRating === r}
                    onChange={() => setMinRating(r)}
                    className="accent-amber-500"
                  />
                  <span>{r === 0 ? 'All Ratings' : `${r}★ & higher`}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDiscounts}
                onChange={e => setOnlyDiscounts(e.target.checked)}
                className="rounded-sm accent-amber-500"
              />
              <span>Discounted Deals Only</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={e => setOnlyInStock(e.target.checked)}
                className="rounded-sm accent-amber-500"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid (9 cols) */}
        <main className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-500 font-interface font-medium">
              Showing <strong className="text-slate-900">{sortedProducts.length}</strong> products
            </span>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">No products found</h3>
              <p className="text-xs text-slate-500 font-body max-w-sm mx-auto mb-4">
                No items match your active filters in this category. Try adjusting your filters or price slider.
              </p>
              <button
                type="button"
                onClick={() => {
                  setPriceMax(2000000);
                  setMinRating(0);
                  setOnlyDiscounts(false);
                  setOnlyInStock(false);
                  setSearchTerm('');
                  setSelectedNestedType(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-600"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
