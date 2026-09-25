import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle, Database, Sparkles, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import { useStore, formatRWF } from '../../context/StoreContext';
import { generateBulkSupermarketBatch } from '../../data/supermarketProducts';
import { SUPERMARKET_STORES } from '../../data/supermarketStores';

interface BulkProductUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkProductUploadModal: React.FC<BulkProductUploadModalProps> = ({ isOpen, onClose }) => {
  const { bulkImportProducts, categories, showNotification } = useStore();
  const [activeTab, setActiveTab] = useState<'csv' | 'json' | 'generator'>('generator');
  const [rawText, setRawText] = useState<string>('');
  const [parsedProducts, setParsedProducts] = useState<Product[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [generatorCount, setGeneratorCount] = useState<number>(50);

  if (!isOpen) return null;

  // Sample CSV Template
  const sampleCSV = `Product Name, Category Slug, Subcategory Slug, Brand, Unit, Price RWF, Stock, Store Name
Inyange Whole Milk 1L, dairy-eggs, milk-cream, Inyange, 1 Litre, 1200, 50, Simba Supermarket (CBD)
Kinazi Cassava Flour 2kg, rice-flour-grains, cassava-flour, Kinazi, 2kg Bag, 2500, 40, Sawa City (Kimihurura)
Fresh Hass Avocados 1kg, fresh-produce, avocados, AgroFresh, 1kg, 1800, 100, Kimironko Market Direct
Minimex Fortified Maize Flour 5kg, rice-flour-grains, maize-flour, Minimex, 5kg Bag, 5800, 60, Ndoli Supermarket (Remera)`;

  const handleLoadSampleCSV = () => {
    setRawText(sampleCSV);
    handleParseCSV(sampleCSV);
  };

  const handleParseCSV = (csvText: string) => {
    setParseError(null);
    try {
      const lines = csvText.trim().split('\n');
      if (lines.length <= 1) {
        setParseError('CSV must have a header line and at least 1 product row.');
        setParsedProducts([]);
        return;
      }

      const rows = lines.slice(1);
      const items: Product[] = [];

      rows.forEach((line, index) => {
        const parts = line.split(',').map(s => s.trim());
        if (parts.length < 6) return;

        const [name, catSlug, subSlug, brand, unit, priceStr, stockStr, storeName] = parts;
        const price = parseInt(priceStr, 10) || 1000;
        const stock = parseInt(stockStr, 10) || 20;

        // Match category
        const matchedCat = categories.find(c => c.slug === catSlug || c.id === catSlug) || categories[0];
        const matchedSub = matchedCat?.subcategories.find(s => s.slug === subSlug || s.id === subSlug) || matchedCat?.subcategories[0];

        const prod: Product = {
          id: `bulk-csv-${Date.now()}-${index}`,
          name: name || `Supermarket Item ${index + 1}`,
          slug: (name || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          categoryId: matchedCat?.id || 'cat-fresh-produce',
          subcategoryId: matchedSub?.id || 'sub-bananas',
          brand: brand || 'Rwanda Supermarket',
          unit: unit || '1 unit',
          price: price,
          originalPrice: Math.round(price * 1.15 / 50) * 50,
          discountPercentage: 10,
          rating: 4.8,
          reviewsCount: 5,
          stock: stock,
          inStock: stock > 0,
          status: stock > 10 ? 'Active' : (stock > 0 ? 'Low Stock' : 'Out of Stock'),
          storeId: 'store-simba-cbd',
          storeName: storeName || 'Simba Supermarket (CBD)',
          priceSource: storeName || 'Simba Supermarket (CBD)',
          lastUpdated: 'Today at 09:00 AM',
          deliveryAvailability: 'Instant',
          estimatedDeliveryTime: '25–40 mins',
          deliveryFee: 1000,
          seller: {
            name: storeName || 'Simba Supermarket',
            location: 'Kigali, Rwanda',
            verified: true,
            rating: 4.9,
            phone: '+250 788 123 456'
          },
          images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'],
          shortDescription: `${name} sourced from ${storeName || 'Kigali supermarket aisles'}.`,
          description: `Authentic supermarket product inspected for freshness and safety.`,
          specifications: { 'Origin': 'Rwanda' }
        };

        items.push(prod);
      });

      setParsedProducts(items);
    } catch (err: any) {
      setParseError(`CSV parsing error: ${err.message}`);
    }
  };

  const handleParseJSON = (jsonText: string) => {
    setParseError(null);
    try {
      const data = JSON.parse(jsonText);
      if (!Array.isArray(data)) {
        setParseError('JSON must be an array of product objects.');
        return;
      }
      setParsedProducts(data);
    } catch (err: any) {
      setParseError(`JSON parsing error: ${err.message}`);
    }
  };

  const handleGenerateBatch = () => {
    const generated = generateBulkSupermarketBatch(generatorCount);
    setParsedProducts(generated);
  };

  const handleCommitImport = () => {
    if (parsedProducts.length === 0) return;
    bulkImportProducts(parsedProducts);
    showNotification?.(
      'Bulk Import Successful',
      `Imported ${parsedProducts.length} supermarket products into the Ishema database.`
    );
    onClose();
  };

  return (
    <div id="bulk-upload-modal-backdrop" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="bulk-upload-modal-container"
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Bulk Supermarket CMS
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Scalable Catalog Loader
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Bulk Import Products to Database
              </h2>
            </div>
          </div>
          <button
            id="close-bulk-upload-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-3 border-b border-slate-200 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('generator')}
            className={`pb-2.5 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'generator'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Generate Supermarket Batch ({generatorCount} Items)</span>
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`pb-2.5 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'csv'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span>CSV Import</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`pb-2.5 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'json'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4 text-purple-500" />
            <span>JSON Direct Import</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'generator' && (
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Automated Rwanda Supermarket Catalog Populator
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Generates hundreds of verified items across all 20 Rwandan supermarket categories (Produce, Dairy, Rice/Flour, Meat, Beverages, Personal Care, Baby, etc.) with realistic Kigali pricing in RWF and supermarket sources.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-slate-700">Batch size:</span>
                  {[25, 50, 100, 200].map(count => (
                    <button
                      key={count}
                      onClick={() => setGeneratorCount(count)}
                      className={`px-2.5 py-1 rounded-lg font-bold ${
                        generatorCount === count
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {count} items
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerateBatch}
                  className="ml-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Generate Preview Now</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Paste CSV text (or click Sample):
                </label>
                <button
                  onClick={handleLoadSampleCSV}
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Load Sample CSV Rows
                </button>
              </div>
              <textarea
                value={rawText}
                onChange={(e) => {
                  setRawText(e.target.value);
                  handleParseCSV(e.target.value);
                }}
                rows={6}
                placeholder="Product Name, Category Slug, Subcategory Slug, Brand, Unit, Price RWF, Stock, Store Name"
                className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                Paste JSON Array of Product Objects:
              </label>
              <textarea
                value={rawText}
                onChange={(e) => {
                  setRawText(e.target.value);
                  handleParseJSON(e.target.value);
                }}
                rows={6}
                placeholder='[{"name": "Inyange Milk 1L", "price": 1200, "stock": 50, "brand": "Inyange", "unit": "1 Litre"}]'
                className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          )}

          {parseError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Parsed Items Preview Table */}
          {parsedProducts.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Preview: {parsedProducts.length} products ready for database import
                </span>
                <span className="text-slate-500">
                  Prices stored strictly in RWF
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Brand & Unit</th>
                      <th className="py-2 px-3">Price (RWF)</th>
                      <th className="py-2 px-3">Stock</th>
                      <th className="py-2 px-3">Source Store</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedProducts.slice(0, 20).map((p, i) => (
                      <tr key={p.id + i} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-medium text-slate-900">{p.name}</td>
                        <td className="py-2 px-3 text-slate-600">{p.brand || '—'} ({p.unit || '—'})</td>
                        <td className="py-2 px-3 font-bold text-slate-900">{formatRWF(p.price)}</td>
                        <td className="py-2 px-3">{p.stock}</td>
                        <td className="py-2 px-3 text-slate-600">{p.priceSource || p.storeName || 'Simba'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsedProducts.length > 20 && (
                <p className="text-[11px] text-slate-400 italic">
                  + {parsedProducts.length - 20} more items hidden in preview
                </p>
              )}
            </div>
          )}
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
            id="commit-bulk-import-btn"
            onClick={handleCommitImport}
            disabled={parsedProducts.length === 0}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              parsedProducts.length > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Import {parsedProducts.length} Products to Database</span>
          </button>
        </div>
      </div>
    </div>
  );
};
