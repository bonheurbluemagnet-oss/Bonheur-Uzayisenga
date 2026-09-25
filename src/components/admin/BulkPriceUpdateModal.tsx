import React, { useState } from 'react';
import { X, DollarSign, Percent, ArrowUpRight, ArrowDownRight, CheckCircle, Store, Layers } from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { SUPERMARKET_CATEGORIES } from '../../data/supermarketCategories';
import { SUPERMARKET_STORES } from '../../data/supermarketStores';

interface BulkPriceUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkPriceUpdateModal: React.FC<BulkPriceUpdateModalProps> = ({ isOpen, onClose }) => {
  const { products, updateProduct, showNotification } = useStore();
  const [targetCategory, setTargetCategory] = useState<string>('all');
  const [targetStore, setTargetStore] = useState<string>('all');
  const [operationType, setOperationType] = useState<'percent' | 'fixed'>('percent');
  const [adjustmentValue, setAdjustmentValue] = useState<number>(5); // e.g. +5% or +500 RWF
  const [direction, setDirection] = useState<'increase' | 'decrease'>('increase');

  if (!isOpen) return null;

  // Filter affected products
  const affectedProducts = products.filter(p => {
    const matchCat = targetCategory === 'all' || p.categoryId === targetCategory;
    const matchStore = targetStore === 'all' || p.storeId === targetStore || p.priceSource?.toLowerCase().includes(targetStore.toLowerCase());
    return matchCat && matchStore;
  });

  const calculateNewPrice = (currentPrice: number) => {
    let diff = 0;
    if (operationType === 'percent') {
      diff = Math.round((currentPrice * (adjustmentValue / 100)) / 50) * 50;
    } else {
      diff = adjustmentValue;
    }

    if (direction === 'decrease') {
      return Math.max(100, currentPrice - diff);
    } else {
      return currentPrice + diff;
    }
  };

  const handleApplyBulkPriceUpdate = () => {
    if (affectedProducts.length === 0) return;

    const now = new Date();
    const timeStr = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    affectedProducts.forEach(prod => {
      const newPrice = calculateNewPrice(prod.price);
      updateProduct(prod.id, {
        price: newPrice,
        originalPrice: prod.price,
        lastUpdated: timeStr,
        priceSource: prod.priceSource ? `${prod.priceSource} (Bulk Updated)` : 'Simba Supermarket (Bulk Updated)'
      });
    });

    showNotification?.(
      'Bulk Price Update Applied',
      `Updated prices for ${affectedProducts.length} items in RWF.`
    );
    onClose();
  };

  return (
    <div id="bulk-price-modal-backdrop" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="bulk-price-modal-container"
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Supermarket Pricing Engine
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Currency: RWF
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Bulk Supermarket Price Adjustment
              </h2>
            </div>
          </div>
          <button
            id="close-bulk-price-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Target Category
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
              >
                <option value="all">All Supermarket Departments ({products.length} products)</option>
                {SUPERMARKET_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-slate-400" />
                Target Supermarket Store
              </label>
              <select
                value={targetStore}
                onChange={(e) => setTargetStore(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
              >
                <option value="all">All Supermarket Stores</option>
                {SUPERMARKET_STORES.map(s => (
                  <option key={s.id} value={s.name.split('(')[0].trim()}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Operation & Amount */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-slate-800">Direction:</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDirection('increase')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors ${
                    direction === 'increase'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Increase (+)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('decrease')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors ${
                    direction === 'decrease'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>Discount / Decrease (-)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Adjustment Mode</label>
                <div className="flex rounded-lg overflow-hidden border border-slate-300">
                  <button
                    type="button"
                    onClick={() => setOperationType('percent')}
                    className={`flex-1 py-1.5 font-bold flex items-center justify-center gap-1 ${
                      operationType === 'percent' ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-600'
                    }`}
                  >
                    <Percent className="w-3.5 h-3.5" /> Percentage (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOperationType('fixed')}
                    className={`flex-1 py-1.5 font-bold flex items-center justify-center gap-1 ${
                      operationType === 'fixed' ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-600'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" /> Fixed RWF
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Value ({operationType === 'percent' ? '%' : 'RWF'})
                </label>
                <input
                  type="number"
                  min={1}
                  value={adjustmentValue}
                  onChange={(e) => setAdjustmentValue(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold text-sm bg-white"
                />
              </div>
            </div>
          </div>

          {/* Impact Preview Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Impact Preview ({affectedProducts.length} products affected):</span>
              <span className="text-amber-700 font-bold">
                {direction === 'increase' ? '+' : '-'}{adjustmentValue}{operationType === 'percent' ? '%' : ' RWF'}
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                  <tr>
                    <th className="py-2 px-3">Product</th>
                    <th className="py-2 px-3">Store</th>
                    <th className="py-2 px-3">Current Price</th>
                    <th className="py-2 px-3">New Price (RWF)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {affectedProducts.slice(0, 8).map(p => {
                    const newPrice = calculateNewPrice(p.price);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-1.5 px-3 font-medium text-slate-900">{p.name}</td>
                        <td className="py-1.5 px-3 text-slate-500">{p.priceSource || p.storeName || 'Simba'}</td>
                        <td className="py-1.5 px-3 text-slate-500 line-through">{formatRWF(p.price)}</td>
                        <td className="py-1.5 px-3 font-bold text-slate-900">{formatRWF(newPrice)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            id="confirm-bulk-price-btn"
            onClick={handleApplyBulkPriceUpdate}
            disabled={affectedProducts.length === 0}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              affectedProducts.length > 0
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Apply to {affectedProducts.length} Products</span>
          </button>
        </div>
      </div>
    </div>
  );
};
