import React from 'react';
import { 
  Filter, Tag, Store, Check, RotateCcw, X, 
  Sparkles, Truck, ShieldCheck, ChevronDown, SlidersHorizontal 
} from 'lucide-react';
import { formatRWF } from '../../context/StoreContext';
import { SUPERMARKET_STORES } from '../../data/supermarketStores';

export interface PriceRangePreset {
  id: string;
  label: string;
  min: number;
  max: number;
  description?: string;
}

export const PRICE_RANGE_PRESETS: PriceRangePreset[] = [
  { id: 'under-2000', label: 'Under 2,000 RWF', min: 0, max: 2000, description: 'Produce, bread, single pantry items' },
  { id: '2000-5000', label: '2,000 – 5,000 RWF', min: 2000, max: 5000, description: 'Milk cartons, eggs, grains, juices' },
  { id: '5000-10000', label: '5,000 – 10,000 RWF', min: 5000, max: 10000, description: 'Cooking oils, butter, cheese, poultry' },
  { id: '10000-25000', label: '10,000 – 25,000 RWF', min: 10000, max: 25000, description: 'Rice 5kg, olive oil, coffee, meat packs' },
  { id: '25000-plus', label: '25,000+ RWF', min: 25000, max: 200000, description: 'Bulk 25kg sacks, imported goods, spirits' },
];

interface SupermarketFilterSidebarProps {
  minPrice: number;
  setMinPrice: (val: number) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  selectedPriceRangeIds: string[];
  togglePriceRange: (rangeId: string) => void;
  clearPriceFilter: () => void;
  priceRangeCounts: Record<string, number>;
  isPriceFilterActive: boolean;

  selectedStoreId: string;
  setSelectedStoreId: (storeId: string) => void;
  storeCounts: Record<string, number>;

  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  availableBrands: string[];
  brandCounts: Record<string, number>;

  onlyInStock: boolean;
  setOnlyInStock: (val: boolean) => void;
  onlyMadeInRwanda: boolean;
  setOnlyMadeInRwanda: (val: boolean) => void;
  onlyInstantDelivery: boolean;
  setOnlyInstantDelivery: (val: boolean) => void;

  resetAllFilters: () => void;
  activeFiltersCount: number;
  totalFilteredCount: number;
  onCloseMobile?: () => void;
}

export const SupermarketFilterSidebar: React.FC<SupermarketFilterSidebarProps> = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedPriceRangeIds,
  togglePriceRange,
  clearPriceFilter,
  priceRangeCounts,
  isPriceFilterActive,

  selectedStoreId,
  setSelectedStoreId,
  storeCounts,

  selectedBrands,
  toggleBrand,
  availableBrands,
  brandCounts,

  onlyInStock,
  setOnlyInStock,
  onlyMadeInRwanda,
  setOnlyMadeInRwanda,
  onlyInstantDelivery,
  setOnlyInstantDelivery,

  resetAllFilters,
  activeFiltersCount,
  totalFilteredCount,
  onCloseMobile,
}) => {
  const quickPriceCaps = [2000, 5000, 10000, 25000, 50000];

  return (
    <aside 
      id="supermarket-filter-sidebar" 
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden"
    >
      {/* Sidebar Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50/90 to-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              Filters & Pricing
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-500">Narrow down Rwanda catalog</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              id="sidebar-reset-all-btn"
              type="button"
              onClick={resetAllFilters}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* SECTION 1: PRICE IN RWF (RANGE SLIDERS & CHECKBOX FILTERS) */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-emerald-600" />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900">
              Price Range (RWF)
            </h4>
          </div>
          {isPriceFilterActive && (
            <button
              type="button"
              onClick={clearPriceFilter}
              className="text-[11px] font-medium text-slate-500 hover:text-emerald-700"
            >
              Clear Price
            </button>
          )}
        </div>

        {/* Continuous Range Slider */}
        <div className="space-y-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Max Price Cap:</span>
            <span className="font-bold text-slate-950 font-interface text-sm text-emerald-800">
              {maxPrice >= 50000 ? 'Any Price' : formatRWF(maxPrice)}
            </span>
          </div>

          {/* Native Range Slider */}
          <div className="relative py-1">
            <input
              id="supermarket-price-range-slider"
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0 RWF</span>
              <span>25,000</span>
              <span>50,000+ RWF</span>
            </div>
          </div>

          {/* Min & Max RWF Numeric Inputs */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-0.5">Min (RWF)</label>
              <input
                id="supermarket-min-price-input"
                type="number"
                min="0"
                max={maxPrice}
                step="500"
                value={minPrice || ''}
                placeholder="0"
                onChange={(e) => {
                  const val = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value));
                  setMinPrice(val);
                }}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-0.5">Max (RWF)</label>
              <input
                id="supermarket-max-price-input"
                type="number"
                min={minPrice}
                max="200000"
                step="500"
                value={maxPrice >= 200000 ? '' : maxPrice}
                placeholder="50,000"
                onChange={(e) => {
                  const val = e.target.value === '' ? 50000 : Math.max(minPrice, Number(e.target.value));
                  setMaxPrice(val);
                }}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {quickPriceCaps.map((cap) => (
              <button
                key={cap}
                type="button"
                onClick={() => setMaxPrice(cap)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                  maxPrice === cap
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                ≤ {cap.toLocaleString()}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(50000);
              }}
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            >
              All
            </button>
          </div>
        </div>

        {/* Checkbox Filters for RWF Price Ranges */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
            <span>RWF Price Brackets:</span>
            {selectedPriceRangeIds.length > 0 && (
              <span className="text-[10px] text-emerald-700 font-bold">
                {selectedPriceRangeIds.length} selected
              </span>
            )}
          </div>

          {PRICE_RANGE_PRESETS.map((preset) => {
            const isChecked = selectedPriceRangeIds.includes(preset.id);
            const count = priceRangeCounts[preset.id] ?? 0;

            return (
              <label
                key={preset.id}
                id={`price-range-${preset.id}`}
                className={`flex items-start justify-between p-2 rounded-xl text-xs cursor-pointer border transition-all ${
                  isChecked
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold'
                    : 'border-transparent hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePriceRange(preset.id)}
                      className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 accent-emerald-600"
                    />
                  </div>
                  <div>
                    <span className="block leading-tight text-slate-900 font-medium">
                      {preset.label}
                    </span>
                    {preset.description && (
                      <span className="block text-[10px] text-slate-400 leading-normal mt-0.5">
                        {preset.description}
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-2 ${
                    isChecked
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: SUPERMARKET STORES FILTER */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Store className="w-4 h-4 text-emerald-600" />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900">
              Supermarket Stores
            </h4>
          </div>
          {selectedStoreId !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedStoreId('all')}
              className="text-[11px] font-medium text-slate-500 hover:text-emerald-700"
            >
              All Stores
            </button>
          )}
        </div>

        <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
          <label
            className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
              selectedStoreId === 'all'
                ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="supermarket-store"
                checked={selectedStoreId === 'all'}
                onChange={() => setSelectedStoreId('all')}
                className="w-3.5 h-3.5 text-emerald-600 accent-emerald-600"
              />
              <span>All Supermarket Chains</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              {Object.values(storeCounts).reduce((a, b) => a + b, 0)}
            </span>
          </label>

          {SUPERMARKET_STORES.map((st) => {
            const isSelected = selectedStoreId === st.id;
            const count = storeCounts[st.id] ?? 0;

            return (
              <label
                key={st.id}
                className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <input
                    type="radio"
                    name="supermarket-store"
                    checked={isSelected}
                    onChange={() => setSelectedStoreId(st.id)}
                    className="w-3.5 h-3.5 text-emerald-600 accent-emerald-600 shrink-0"
                  />
                  <img
                    src={st.logo}
                    alt={st.name}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-xs object-cover shrink-0"
                  />
                  <span className="truncate">{st.name.split('(')[0].trim()}</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 shrink-0 ml-1">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: AVAILABILITY & VERIFIED FLAGS */}
      <div className="p-4 sm:p-5 space-y-2.5">
        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">
          Availability & Origin
        </h4>

        {/* In Stock */}
        <label className="flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer hover:bg-slate-50 text-slate-700 select-none">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
            />
            <span className="font-medium text-slate-800">In Stock Items Only</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </label>

        {/* Instant Delivery (15-35 mins) */}
        <label className="flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer hover:bg-slate-50 text-slate-700 select-none">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyInstantDelivery}
              onChange={(e) => setOnlyInstantDelivery(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
            />
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-medium text-slate-800">Instant Delivery (15-35m)</span>
            </div>
          </div>
        </label>

        {/* Made in Rwanda */}
        <label className="flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer hover:bg-slate-50 text-slate-700 select-none">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyMadeInRwanda}
              onChange={(e) => setOnlyMadeInRwanda(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
            />
            <div className="flex items-center gap-1.5">
              <span>🇷🇼</span>
              <span className="font-medium text-slate-800">Buy Local Rwanda</span>
            </div>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
            Verified
          </span>
        </label>
      </div>

      {/* SECTION 4: POPULAR BRANDS */}
      {availableBrands.length > 0 && (
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900">
              Popular Brands
            </h4>
            {selectedBrands.length > 0 && (
              <span className="text-[10px] text-emerald-700 font-bold">
                {selectedBrands.length} active
              </span>
            )}
          </div>

          <div className="space-y-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            {availableBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              const count = brandCounts[brand] ?? 0;

              return (
                <label
                  key={brand}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleBrand(brand)}
                      className="w-3.5 h-3.5 rounded text-emerald-600 accent-emerald-600"
                    />
                    <span className="truncate">{brand}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0 ml-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Sticky Footer */}
      {onCloseMobile && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 lg:hidden">
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
          >
            Show {totalFilteredCount} Products
          </button>
        </div>
      )}
    </aside>
  );
};
