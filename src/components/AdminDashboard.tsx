import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ShoppingBag,
  Layers,
  Truck,
  DollarSign,
  Users,
  Search,
  CheckCircle,
  X,
  RefreshCw,
  Eye,
  Sliders,
  Sparkles,
  Gift,
  EyeOff,
  MapPin,
  Database,
  Upload,
  ArrowUpDown,
  Store,
  Check,
  MessageCircle,
  CreditCard
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { Product, Category, OrderStatus, CourierStatus } from '../types';
import { IshemaLogo } from './IshemaLogo';
import { AdminLiveDeliveryMap } from './maps/AdminLiveDeliveryMap';
import { AdminPaymentsView } from './admin/AdminPaymentsView';
import { BulkProductUploadModal } from './admin/BulkProductUploadModal';
import { BulkPriceUpdateModal } from './admin/BulkPriceUpdateModal';
import { SUPERMARKET_STORES } from '../data/supermarketStores';
import { SUPERMARKET_CATEGORIES } from '../data/supermarketCategories';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    categories,
    orders,
    bookings,
    drivers,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    addSubcategory,
    deleteSubcategory,
    updateOrderStatus,
    updateCourierStatus,
    assignDriverToOrder,
    assignDriverToBooking,
    quickUpdateProductPriceStock,
    supportInteractions,
    whatsAppSupportCount,
    clearSupportInteractions,
    resetToDemoData,
    setCurrentView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'live_map' | 'payments' | 'analytics' | 'customers'>('products');
  const [productSearch, setProductSearch] = useState('');

  // Add/Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategoryId, setProdCategoryId] = useState(categories[0]?.id || '');
  const [prodSubcategoryId, setProdSubcategoryId] = useState(categories[0]?.subcategories[0]?.id || '');
  const [prodNestedType, setProdNestedType] = useState('');
  const [prodPrice, setProdPrice] = useState(5000);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(6500);
  const [prodStock, setProdStock] = useState(25);
  const [prodImages, setProdImages] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80');
  const [prodShortDesc, setProdShortDesc] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodSellerName, setProdSellerName] = useState('Kigali Merchant Hub');
  const [prodSellerLocation, setProdSellerLocation] = useState('Kimihurura, Kigali');
  const [prodDeliveryTime, setProdDeliveryTime] = useState('30–45 mins');
  const [prodDeliveryFee, setProdDeliveryFee] = useState(1200);
  const [prodBadge, setProdBadge] = useState('New');

  // Supermarket CMS specific fields
  const [prodBrand, setProdBrand] = useState('');
  const [prodUnit, setProdUnit] = useState('1 unit');
  const [prodStoreId, setProdStoreId] = useState(SUPERMARKET_STORES[0]?.id || 'store-simba-cbd');
  const [prodStoreName, setProdStoreName] = useState(SUPERMARKET_STORES[0]?.name || 'Simba Supermarket (CBD)');
  const [prodPriceSource, setProdPriceSource] = useState(SUPERMARKET_STORES[0]?.name || 'Simba Supermarket (CBD)');
  const [prodDeliveryAvailability, setProdDeliveryAvailability] = useState<
    'Immediate Express' | 'Same Day' | 'Next Day' | 'Instant' | 'Scheduled' | 'Out of Stock'
  >('Instant');
  const [prodBarcode, setProdBarcode] = useState('');

  // Filters
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStore, setFilterStore] = useState<string>('all');
  const [filterStockStatus, setFilterStockStatus] = useState<string>('all');

  // Modals
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);
  const [isBulkPriceModalOpen, setIsBulkPriceModalOpen] = useState(false);

  // In-line editing
  const [inlineEditId, setInlineEditId] = useState<string | null>(null);
  const [inlinePrice, setInlinePrice] = useState<number>(0);
  const [inlineStock, setInlineStock] = useState<number>(0);

  // Add Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatImage, setNewCatImage] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Add Subcategory Modal State
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [targetCatIdForSub, setTargetCatIdForSub] = useState(categories[0]?.id || '');
  const [newSubName, setNewSubName] = useState('');
  const [newSubImage, setNewSubImage] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80');
  const [newSubNestedTypes, setNewSubNestedTypes] = useState('Option 1, Option 2, Option 3');

  // Analytics stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + bookings.reduce((sum, b) => sum + b.fee, 0);
  const totalOrdersCount = orders.length + bookings.length;

  // Handle open add product
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdName('');
    setProdCategoryId(categories[0]?.id || '');
    setProdSubcategoryId(categories[0]?.subcategories[0]?.id || '');
    setProdNestedType('');
    setProdPrice(5000);
    setProdOriginalPrice(6000);
    setProdStock(30);
    setProdImages('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80');
    setProdShortDesc('Freshly prepared and packaged for fast delivery across Rwanda.');
    setProdDesc('High quality product sourced from authentic verified Rwandan producers.');
    setProdSellerName('Simba Supermarket (CBD)');
    setProdSellerLocation('Kigali City Center');
    setProdDeliveryTime('25–40 mins');
    setProdDeliveryFee(1000);
    setProdBadge('New');
    setProdBrand('Inyange');
    setProdUnit('1 Litre');
    setProdStoreId(SUPERMARKET_STORES[0]?.id || 'store-simba-cbd');
    setProdStoreName(SUPERMARKET_STORES[0]?.name || 'Simba Supermarket (CBD)');
    setProdPriceSource(SUPERMARKET_STORES[0]?.name || 'Simba Supermarket (CBD)');
    setProdDeliveryAvailability('Instant');
    setProdBarcode('');
    setIsProductModalOpen(true);
  };

  // Handle open edit product
  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdCategoryId(p.categoryId);
    setProdSubcategoryId(p.subcategoryId);
    setProdNestedType(p.nestedType || '');
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || p.price);
    setProdStock(p.stock);
    setProdImages(p.images.join(', '));
    setProdShortDesc(p.shortDescription);
    setProdDesc(p.description);
    setProdSellerName(p.seller.name);
    setProdSellerLocation(p.seller.location);
    setProdDeliveryTime(p.estimatedDeliveryTime);
    setProdDeliveryFee(p.deliveryFee);
    setProdBadge(p.badge || '');
    setProdBrand(p.brand || '');
    setProdUnit(p.unit || '1 unit');
    setProdStoreId(p.storeId || SUPERMARKET_STORES[0]?.id || 'store-simba-cbd');
    setProdStoreName(p.storeName || p.priceSource || SUPERMARKET_STORES[0]?.name || 'Simba Supermarket (CBD)');
    setProdPriceSource(p.priceSource || p.storeName || 'Simba Supermarket (CBD)');
    setProdDeliveryAvailability(p.deliveryAvailability || 'Instant');
    setProdBarcode(p.barcode || '');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const imageList = prodImages
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const discountPercentage =
      prodOriginalPrice > prodPrice
        ? Math.round(((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100)
        : 0;

    const now = new Date();
    const timeStr = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const productPayload = {
      name: prodName,
      slug: prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId: prodCategoryId,
      subcategoryId: prodSubcategoryId,
      nestedType: prodNestedType || undefined,
      brand: prodBrand || 'Rwanda Supermarket',
      unit: prodUnit || '1 unit',
      price: Number(prodPrice),
      originalPrice: Number(prodOriginalPrice),
      discountPercentage,
      rating: 4.9,
      reviewsCount: 1,
      seller: {
        name: prodStoreName || prodSellerName,
        location: prodSellerLocation,
        verified: true,
        rating: 4.9,
        phone: '+250 788 123 456'
      },
      storeId: prodStoreId,
      storeName: prodStoreName,
      priceSource: prodPriceSource || prodStoreName,
      deliveryAvailability: prodDeliveryAvailability,
      barcode: prodBarcode || undefined,
      lastUpdated: timeStr,
      stock: Number(prodStock),
      inStock: Number(prodStock) > 0,
      status: (Number(prodStock) <= 0 ? 'Out of Stock' : (Number(prodStock) < 10 ? 'Low Stock' : 'Active')) as any,
      images: imageList.length > 0 ? imageList : ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'],
      shortDescription: prodShortDesc,
      description: prodDesc,
      specifications: {
        'Origin': 'Rwanda',
        'Quality Standard': 'RSB Rwanda Standards Board Approved'
      },
      estimatedDeliveryTime: prodDeliveryTime,
      deliveryFee: Number(prodDeliveryFee),
      badge: prodBadge || undefined,
      isFeatured: true,
      isPopular: true
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }
    setIsProductModalOpen(false);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    addCategory({
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon: 'ShoppingBag',
      image: newCatImage,
      description: newCatDesc || `Top rated ${newCatName} items for online shopping and delivery in Rwanda.`,
      subcategories: [
        {
          id: `sub-${Date.now()}`,
          categoryId: '',
          name: 'General',
          slug: 'general',
          image: newCatImage,
          itemCount: 0,
          nestedTypes: ['Popular', 'Special']
        }
      ]
    });
    setNewCatName('');
    setIsCategoryModalOpen(false);
  };

  const handleSaveSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName || !targetCatIdForSub) return;
    const nested = newSubNestedTypes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    addSubcategory(targetCatIdForSub, {
      name: newSubName,
      slug: newSubName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: newSubImage,
      itemCount: 0,
      nestedTypes: nested
    });
    setNewSubName('');
    setIsSubcategoryModalOpen(false);
  };

  return (
    <div id="admin-dashboard-container" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <IshemaLogo variant="mark" size="md" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-amber-400">
                Ishema Admin Suite
              </span>
              <span className="text-xs text-slate-500">• Rwanda Operations Center</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
              Operations & Marketplace Admin
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetToDemoData}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Demo Data
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-interface font-bold transition-colors"
          >
            View Customer Store
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Total Sales</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-950">
            {formatRWF(totalRevenue)}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Orders & courier deliveries</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Orders & Tasks</span>
            <ShoppingBag className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-950">
            {totalOrdersCount}
          </div>
          <span className="text-[11px] text-slate-500 font-body">Active delivery requests</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Live Products</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-950">
            {products.length}
          </div>
          <span className="text-[11px] text-slate-500 font-body">Across {categories.length} categories</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Active Drivers</span>
            <Truck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-950">
            {drivers.length}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">All GPS online in Kigali</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        {[
          { id: 'products', name: 'Product Catalog', icon: ShoppingBag, count: products.length },
          { id: 'categories', name: 'Categories & Subcategories', icon: Layers, count: categories.length },
          { id: 'orders', name: 'Orders & Couriers', icon: Truck, count: totalOrdersCount },
          {
            id: 'live_map',
            name: 'Live Kigali Map',
            icon: MapPin,
            count: orders.filter(o => o.status !== 'Delivered').length,
            isLive: true
          },
          { id: 'payments', name: 'Rwanda Payments & Gateways', icon: CreditCard },
          { id: 'analytics', name: 'Sales Analytics', icon: DollarSign },
          { id: 'customers', name: 'Customers', icon: Users, count: orders.length }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-interface font-semibold whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? 'border-amber-500 text-slate-950 bg-white shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                {t.isLive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              {t.name}
              {t.isLive && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                  Live
                </span>
              )}
              {t.count !== undefined && !t.isLive && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-600 font-bold">
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Top Actions Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="font-heading font-bold text-slate-950 text-base flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-500" />
                Rwanda Supermarket Catalog & CMS
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage thousands of supermarket items, real-time RWF pricing, store inventory, and instant availability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                id="admin-bulk-upload-btn"
                type="button"
                onClick={() => setIsBulkUploadModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-interface font-bold text-xs transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                Bulk Import (CSV/JSON)
              </button>

              <button
                id="admin-bulk-price-btn"
                type="button"
                onClick={() => setIsBulkPriceModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-interface font-bold text-xs transition-colors"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-600" />
                Bulk Price Update (%/RWF)
              </button>

              <button
                id="admin-add-product-btn"
                type="button"
                onClick={handleOpenAddProduct}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-xs shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>

          {/* Search & Comprehensive Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                placeholder="Search name, brand, SKU, store..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-body text-xs"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-700 text-xs focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Store Source Filter */}
            <div>
              <select
                value={filterStore}
                onChange={e => setFilterStore(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-700 text-xs focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Supermarket Stores ({SUPERMARKET_STORES.length})</option>
                {SUPERMARKET_STORES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.sector})
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Status Filter */}
            <div>
              <select
                value={filterStockStatus}
                onChange={e => setFilterStockStatus(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-700 text-xs focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Stock Statuses</option>
                <option value="in_stock">In Stock (&gt; 10 units)</option>
                <option value="low_stock">Low Stock (1–10 units)</option>
                <option value="out_of_stock">Out of Stock (0 units)</option>
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold">
                Showing {products.filter(p => {
                  const matchSearch = !productSearch ||
                    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                    (p.brand && p.brand.toLowerCase().includes(productSearch.toLowerCase())) ||
                    (p.barcode && p.barcode.toLowerCase().includes(productSearch.toLowerCase())) ||
                    (p.storeName && p.storeName.toLowerCase().includes(productSearch.toLowerCase())) ||
                    (p.priceSource && p.priceSource.toLowerCase().includes(productSearch.toLowerCase())) ||
                    p.seller.name.toLowerCase().includes(productSearch.toLowerCase());
                  const matchCat = filterCategory === 'all' || p.categoryId === filterCategory;
                  const matchStore = filterStore === 'all' || p.storeId === filterStore || (p.priceSource && p.priceSource.toLowerCase().includes(filterStore.toLowerCase()));
                  const matchStock = filterStockStatus === 'all' || 
                    (filterStockStatus === 'in_stock' && p.stock > 10) ||
                    (filterStockStatus === 'low_stock' && p.stock > 0 && p.stock <= 10) ||
                    (filterStockStatus === 'out_of_stock' && p.stock <= 0);
                  return matchSearch && matchCat && matchStore && matchStock;
                }).length} of {products.length} products
              </span>
              <span className="text-[11px] text-slate-500">
                Tip: Click Price or Stock to quickly edit values inline
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-heading font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Product & Brand</th>
                    <th className="py-3 px-4">Category / Dept</th>
                    <th className="py-3 px-4">Price (RWF)</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4">Supermarket Store & Updated</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-body">
                  {products
                    .filter(p => {
                      const matchSearch = !productSearch ||
                        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        (p.brand && p.brand.toLowerCase().includes(productSearch.toLowerCase())) ||
                        (p.barcode && p.barcode.toLowerCase().includes(productSearch.toLowerCase())) ||
                        (p.storeName && p.storeName.toLowerCase().includes(productSearch.toLowerCase())) ||
                        (p.priceSource && p.priceSource.toLowerCase().includes(productSearch.toLowerCase())) ||
                        p.seller.name.toLowerCase().includes(productSearch.toLowerCase());
                      const matchCat = filterCategory === 'all' || p.categoryId === filterCategory;
                      const matchStore = filterStore === 'all' || p.storeId === filterStore || (p.priceSource && p.priceSource.toLowerCase().includes(filterStore.toLowerCase()));
                      const matchStock = filterStockStatus === 'all' || 
                        (filterStockStatus === 'in_stock' && p.stock > 10) ||
                        (filterStockStatus === 'low_stock' && p.stock > 0 && p.stock <= 10) ||
                        (filterStockStatus === 'out_of_stock' && p.stock <= 0);
                      return matchSearch && matchCat && matchStore && matchStock;
                    })
                    .map(prod => {
                      const cat = categories.find(c => c.id === prod.categoryId);
                      const isInlineEditing = inlineEditId === prod.id;

                      return (
                        <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* Product & Brand */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.images[0]}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
                              />
                              <div>
                                <span className="font-interface font-semibold text-slate-950 line-clamp-1">
                                  {prod.name}
                                </span>
                                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                  {prod.brand && (
                                    <span className="font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded-sm">
                                      {prod.brand}
                                    </span>
                                  )}
                                  {prod.unit && (
                                    <span>{prod.unit}</span>
                                  )}
                                  {prod.barcode && (
                                    <span className="font-mono text-[10px] text-slate-400">SKU: {prod.barcode}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 block">{cat?.name || 'Department'}</span>
                            <span className="text-[11px] text-slate-500">{prod.nestedType || 'Supermarket Standard'}</span>
                          </td>

                          {/* Price (RWF) with Inline quick edit */}
                          <td className="py-3 px-4">
                            {isInlineEditing ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={inlinePrice}
                                  onChange={e => setInlinePrice(Number(e.target.value))}
                                  className="w-24 px-2 py-1 rounded border border-amber-500 text-xs font-bold"
                                  autoFocus
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    quickUpdateProductPriceStock(prod.id, inlinePrice, inlineStock);
                                    setInlineEditId(null);
                                  }}
                                  className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                                  title="Save"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setInlineEditId(null)}
                                  className="p-1 rounded bg-slate-200 text-slate-600 hover:bg-slate-300"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div 
                                onClick={() => {
                                  setInlineEditId(prod.id);
                                  setInlinePrice(prod.price);
                                  setInlineStock(prod.stock);
                                }}
                                className="cursor-pointer group flex items-center gap-1.5"
                                title="Click to edit price"
                              >
                                <div>
                                  <div className="font-bold text-slate-900 group-hover:text-amber-600">
                                    {formatRWF(prod.price)}
                                  </div>
                                  {prod.originalPrice && prod.originalPrice > prod.price && (
                                    <span className="text-[10px] text-slate-400 line-through">
                                      {formatRWF(prod.originalPrice)}
                                    </span>
                                  )}
                                </div>
                                <Edit2 className="w-3 h-3 text-slate-300 group-hover:text-amber-500" />
                              </div>
                            )}
                          </td>

                          {/* Stock & Status with Inline quick edit */}
                          <td className="py-3 px-4">
                            {isInlineEditing ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={inlineStock}
                                  onChange={e => setInlineStock(Number(e.target.value))}
                                  className="w-16 px-2 py-1 rounded border border-amber-500 text-xs font-bold"
                                />
                                <span className="text-[10px] text-slate-400">units</span>
                              </div>
                            ) : (
                              <div 
                                onClick={() => {
                                  setInlineEditId(prod.id);
                                  setInlinePrice(prod.price);
                                  setInlineStock(prod.stock);
                                }}
                                className="cursor-pointer group flex items-center gap-1.5"
                                title="Click to edit stock"
                              >
                                <span
                                  className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                                    prod.stock > 10
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : prod.stock > 0
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-rose-100 text-rose-800'
                                  }`}
                                >
                                  {prod.stock > 0 ? `${prod.stock} units` : 'Out of Stock'}
                                </span>
                                <Edit2 className="w-3 h-3 text-slate-300 group-hover:text-amber-500" />
                              </div>
                            )}
                          </td>

                          {/* Store Source & Updated */}
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-900 block flex items-center gap-1">
                              <Store className="w-3 h-3 text-amber-500" />
                              {prod.priceSource || prod.storeName || prod.seller.name}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              Updated: {prod.lastUpdated || 'Recently verified'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditProduct(prod)}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                                title="Full Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Delete ${prod.name}?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Delete product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES & SUBCATEGORIES MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Dynamic Hierarchy Architecture
              </h3>
              <p className="text-xs text-slate-500 font-body">
                Add, reorganize, and manage main categories and subcategories live for customer storefront.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSubcategoryModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Subcategory
              </button>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-interface font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Main Category
              </button>
            </div>
          </div>

          {/* Categories Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map(cat => (
              <div key={cat.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-slate-900 text-base">{cat.name}</h4>
                      <span className="text-xs text-slate-500">{cat.subcategories.length} subcategories</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete ${cat.name} and its subcategories?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-500 font-body mb-4 line-clamp-2">
                  {cat.description}
                </p>

                {/* Subcategories inside this category */}
                <div className="space-y-2 mt-auto pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Subcategories</span>
                    <button
                      type="button"
                      onClick={() => {
                        setTargetCatIdForSub(cat.id);
                        setIsSubcategoryModalOpen(true);
                      }}
                      className="text-amber-600 hover:underline text-[11px]"
                    >
                      + Add to {cat.name}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map(sub => (
                      <div
                        key={sub.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                      >
                        <span className="font-medium">{sub.name}</span>
                        {sub.nestedTypes && sub.nestedTypes.length > 0 && (
                          <span className="text-[10px] text-amber-700 font-bold">
                            ({sub.nestedTypes.length} types)
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteSubcategory(cat.id, sub.id)}
                          className="text-slate-400 hover:text-rose-600 ml-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ADMIN LIVE DELIVERY MAP (Requirement 6) */}
      {activeTab === 'live_map' && (
        <AdminLiveDeliveryMap
          orders={orders}
          drivers={drivers}
          onUpdateOrderStatus={updateOrderStatus}
        />
      )}

      {/* TAB 3: ORDERS & COURIER DELIVERIES */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Real-time Rwandan Orders & Dispatch Management
              </h3>
              <span className="text-xs text-slate-500 font-body">
                Status changes update customer tracking instantaneously
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('live_map')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 text-amber-400 hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs w-fit"
            >
              <MapPin className="w-3.5 h-3.5" />
              Open Live Kigali Delivery Map
            </button>
          </div>

          <div className="space-y-4">
            {/* Store Orders */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
                Customer Marketplace Orders ({orders.length})
              </div>
              <div className="divide-y divide-slate-100">
                {orders.map(ord => (
                  <div key={ord.id} className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    ord.isSurprise ? 'bg-rose-50/30' : ''
                  }`}>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-sm text-xs">
                          {ord.trackingNumber}
                        </span>
                        {ord.isSurprise ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                            <Gift className="w-3 h-3" />
                            Surprise Gift (Secret Delivery)
                          </span>
                        ) : null}
                        <span className="text-xs text-slate-700 font-semibold">
                          {ord.isSurprise ? 'Recipient:' : ''} {ord.customer.fullName}
                        </span>
                        <span className="text-xs text-slate-400">({ord.customer.phone})</span>
                      </div>
                      
                      {ord.isSurprise && (
                        <div className="text-[11px] text-rose-800 bg-rose-100/60 rounded-md px-2 py-1 my-1 flex items-center gap-1.5">
                          <EyeOff className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>Sender identity strictly confidential. Recipient address: {ord.customer.address} ({ord.customer.district})</span>
                        </div>
                      )}

                      <div className="text-xs text-slate-600 font-body">
                        {ord.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                      </div>
                      <div className="text-xs font-semibold text-slate-900 mt-1">
                        Total: {formatRWF(ord.total)} ({ord.paymentMethod})
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Driver Assignment Dropdown */}
                      <div className="text-xs">
                        <span className="block text-[10px] text-slate-400 font-medium mb-0.5">Assign Driver:</span>
                        <select
                          value={ord.assignedDriver?.id || ''}
                          onChange={e => assignDriverToOrder(ord.id, e.target.value)}
                          className="py-1.5 px-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                        >
                          <option value="">Unassigned</option>
                          {drivers.map(d => (
                            <option key={d.id} value={d.id}>
                              {d.name} ({d.vehicle.split('(')[0]})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Status Dropdown */}
                      <div className="text-xs">
                        <span className="block text-[10px] text-slate-400 font-medium mb-0.5">Status:</span>
                        <select
                          value={ord.status}
                          onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="py-1.5 px-2.5 rounded-lg border border-amber-400 bg-amber-50 text-amber-900 font-bold text-xs"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Payment Confirmed">Payment Confirmed</option>
                          <option value="Preparing Order">Preparing Order</option>
                          <option value="Driver Assigned">Driver Assigned</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier Bookings */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
                Door-to-Door Courier Bookings ({bookings.length})
              </div>
              <div className="divide-y divide-slate-100">
                {bookings.map(bkg => (
                  <div key={bkg.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm text-xs">
                          {bkg.trackingNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">{bkg.packageType} ({bkg.vehicleType})</span>
                      </div>
                      <div className="text-xs text-slate-600 font-body">
                        From: <strong>{bkg.pickupAddress}</strong> ({bkg.senderName}) → To: <strong>{bkg.deliveryAddress}</strong> ({bkg.recipientName})
                      </div>
                      <div className="text-xs font-semibold text-slate-900 mt-1">
                        Delivery Fee: {formatRWF(bkg.fee)} • {bkg.preferredTime}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Driver Assignment */}
                      <div className="text-xs">
                        <span className="block text-[10px] text-slate-400 font-medium mb-0.5">Assign Driver:</span>
                        <select
                          value={bkg.assignedDriver?.id || ''}
                          onChange={e => assignDriverToBooking(bkg.id, e.target.value)}
                          className="py-1.5 px-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                        >
                          <option value="">Unassigned</option>
                          {drivers.map(d => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Courier Status */}
                      <div className="text-xs">
                        <span className="block text-[10px] text-slate-400 font-medium mb-0.5">Courier Status:</span>
                        <select
                          value={bkg.status}
                          onChange={e => updateCourierStatus(bkg.id, e.target.value as CourierStatus)}
                          className="py-1.5 px-2.5 rounded-lg border border-emerald-400 bg-emerald-50 text-emerald-900 font-bold text-xs"
                        >
                          <option value="Order Received">Order Received</option>
                          <option value="Driver Assigned">Driver Assigned</option>
                          <option value="Picked Up">Picked Up</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: RWANDA PAYMENTS & GATEWAYS */}
      {activeTab === 'payments' && <AdminPaymentsView />}

      {/* TAB 4: ANALYTICS & REVENUE */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200">
              <h4 className="font-heading font-bold text-slate-900 text-base mb-3">Revenue Breakdown</h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Marketplace Product Sales:</span>
                  <span className="font-bold text-slate-900">
                    {formatRWF(orders.reduce((sum, o) => sum + o.subtotal, 0))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Express Delivery Logistics Fees:</span>
                  <span className="font-bold text-slate-900">
                    {formatRWF(orders.reduce((sum, o) => sum + o.deliveryFee, 0) + bookings.reduce((sum, b) => sum + b.fee, 0))}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-sm">
                  <span>Gross Platform GMV:</span>
                  <span className="text-amber-600">{formatRWF(totalRevenue)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200">
              <h4 className="font-heading font-bold text-slate-900 text-base mb-3">Payment Distribution</h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span>MTN Mobile Money (MoMo)</span>
                  <span className="font-bold text-amber-700">72%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[72%]" />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span>Airtel Money Rwanda</span>
                  <span className="font-bold text-rose-700">18%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[18%]" />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span>Cash on Delivery</span>
                  <span className="font-bold text-slate-700">10%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-700 h-full w-[10%]" />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200">
              <h4 className="font-heading font-bold text-slate-900 text-base mb-3">Fleet Performance</h4>
              <div className="space-y-3 text-xs">
                {drivers.map(drv => (
                  <div key={drv.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{drv.name}</span>
                      <span className="text-[11px] text-slate-400">{drv.vehicle.split('(')[0]}</span>
                    </div>
                    <span className="font-semibold text-emerald-700">⭐ {drv.rating.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Support Channels & WhatsApp Interaction Monitor */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>WhatsApp Support Reach-out Activity</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
                      {whatsAppSupportCount} total clicks
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Real-time monitoring of how frequently customers reach out via the floating WhatsApp support button
                  </p>
                </div>
              </div>

              {supportInteractions.length > 0 && (
                <button
                  type="button"
                  onClick={clearSupportInteractions}
                  className="text-[11px] text-slate-400 hover:text-rose-600 font-medium self-start sm:self-auto cursor-pointer"
                >
                  Clear history
                </button>
              )}
            </div>

            {/* Event log feed */}
            {supportInteractions.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 bg-slate-50 rounded-2xl">
                No support interactions recorded yet. Click the floating WhatsApp button to test tracking.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden text-xs">
                {supportInteractions.slice(0, 8).map(event => (
                  <div key={event.id} className="p-3.5 flex items-center justify-between bg-white hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <div>
                        <span className="font-bold text-slate-900">{event.messageText || 'WhatsApp Support Chat Click'}</span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 font-mono text-slate-600">
                            Page: {event.sourceView}
                          </span>
                          <span>•</span>
                          <span>{event.phoneNumber || '+250 780 837 936'}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
            Registered Customers & Order History
          </div>
          <div className="p-4 divide-y divide-slate-100">
            {orders.map(o => (
              <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block text-sm">{o.customer.fullName}</span>
                  <span className="text-slate-500 font-body">{o.customer.phone} • {o.customer.email || 'No email'}</span>
                  <span className="text-slate-400 block mt-0.5">{o.customer.address}, {o.customer.district}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">{formatRWF(o.total)}</span>
                  <span className="text-[11px] text-emerald-700 font-medium">{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                {editingProductId ? 'Edit Product' : 'Add New Product to Marketplace'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={e => setProdName(e.target.value)}
                  placeholder="e.g. Kigali Gourmet Chicken Burger"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={prodCategoryId}
                    onChange={e => {
                      setProdCategoryId(e.target.value);
                      const cat = categories.find(c => c.id === e.target.value);
                      if (cat && cat.subcategories.length > 0) {
                        setProdSubcategoryId(cat.subcategories[0].id);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subcategory</label>
                  <select
                    value={prodSubcategoryId}
                    onChange={e => setProdSubcategoryId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    {categories
                      .find(c => c.id === prodCategoryId)
                      ?.subcategories.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Specific Nested Type</label>
                  <input
                    type="text"
                    value={prodNestedType}
                    onChange={e => setProdNestedType(e.target.value)}
                    placeholder="e.g. Chicken Pizza, Sneakers"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={prodBrand}
                    onChange={e => setProdBrand(e.target.value)}
                    placeholder="e.g. Inyange, Kinazi, Minimex"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit / Size *</label>
                  <input
                    type="text"
                    required
                    value={prodUnit}
                    onChange={e => setProdUnit(e.target.value)}
                    placeholder="e.g. 1kg, 500ml, pack of 6"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Barcode / SKU (Optional)</label>
                  <input
                    type="text"
                    value={prodBarcode}
                    onChange={e => setProdBarcode(e.target.value)}
                    placeholder="e.g. 600123456789"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Supermarket Store Source *</label>
                  <select
                    value={prodStoreId}
                    onChange={e => {
                      setProdStoreId(e.target.value);
                      const st = SUPERMARKET_STORES.find(s => s.id === e.target.value);
                      if (st) {
                        setProdStoreName(st.name);
                        setProdPriceSource(st.name);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  >
                    {SUPERMARKET_STORES.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.sector})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Delivery Availability</label>
                  <select
                    value={prodDeliveryAvailability}
                    onChange={e => setProdDeliveryAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="Instant">Instant Delivery (15-35 mins)</option>
                    <option value="Scheduled">Scheduled Same-Day Delivery</option>
                    <option value="Out of Stock">Temporarily Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Selling Price (RWF) *</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={e => setProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Original Price (Strikeout)</label>
                  <input
                    type="number"
                    value={prodOriginalPrice}
                    onChange={e => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={e => setProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Product Image URLs (comma separated for multiple gallery images)
                </label>
                <input
                  type="text"
                  required
                  value={prodImages}
                  onChange={e => setProdImages(e.target.value)}
                  placeholder="https://images.unsplash.com/..., https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Summary (Card view)</label>
                <input
                  type="text"
                  value={prodShortDesc}
                  onChange={e => setProdShortDesc(e.target.value)}
                  placeholder="Brief 1-line overview..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={e => setProdDesc(e.target.value)}
                  placeholder="Detailed specifications, ingredients, or sizing..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-body"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Seller Store Name</label>
                  <input
                    type="text"
                    value={prodSellerName}
                    onChange={e => setProdSellerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Delivery Time</label>
                  <input
                    type="text"
                    value={prodDeliveryTime}
                    onChange={e => setProdDeliveryTime(e.target.value)}
                    placeholder="30–45 mins"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Promotional Badge</label>
                  <input
                    type="text"
                    value={prodBadge}
                    onChange={e => setProdBadge(e.target.value)}
                    placeholder="e.g. Best Seller, Fresh"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  {editingProductId ? 'Update Product' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CATEGORY */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">Add Main Category</h3>
            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  placeholder="e.g. Sports & Fitness"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={newCatImage}
                  onChange={e => setNewCatImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newCatDesc}
                  onChange={e => setNewCatDesc(e.target.value)}
                  placeholder="Short description for banner..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SUBCATEGORY */}
      {isSubcategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">Add Subcategory</h3>
            <form onSubmit={handleSaveSubcategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Belongs To Main Category *</label>
                <select
                  value={targetCatIdForSub}
                  onChange={e => setTargetCatIdForSub(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subcategory Name *</label>
                <input
                  type="text"
                  required
                  value={newSubName}
                  onChange={e => setNewSubName(e.target.value)}
                  placeholder="e.g. Pizza, Burgers, Smartphones"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newSubImage}
                  onChange={e => setNewSubImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Specific Nested Choices (comma separated)
                </label>
                <input
                  type="text"
                  value={newSubNestedTypes}
                  onChange={e => setNewSubNestedTypes(e.target.value)}
                  placeholder="e.g. Chicken Pizza, Beef Pizza, Cheese Pizza"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubcategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  Save Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL: BULK PRODUCT UPLOAD (CSV / JSON / GENERATOR) */}
      <BulkProductUploadModal
        isOpen={isBulkUploadModalOpen}
        onClose={() => setIsBulkUploadModalOpen(false)}
      />

      {/* MODAL: BULK SUPERMARKET PRICE UPDATE */}
      <BulkPriceUpdateModal
        isOpen={isBulkPriceModalOpen}
        onClose={() => setIsBulkPriceModalOpen(false)}
      />
    </div>
  );
};
