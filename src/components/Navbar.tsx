import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Package,
  Navigation,
  ChevronDown,
  User,
  Shield,
  Bike,
  Phone,
  HelpCircle,
  Tag,
  Gift,
  Sparkles,
  Camera,
  Users,
  Store,
  Wallet,
  ShoppingBasket,
  Briefcase,
  FileQuestion,
  TrendingDown
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { Category } from '../types';
import { IshemaLogo } from './IshemaLogo';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    navigateToProduct,
    categories,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedNestedType,
    cart,
    setIsCartOpen,
    setIsBookingModalOpen,
    searchQuery,
    setSearchQuery,
    products,
    setIsSearchByPhotoOpen,
    setIsRequestProductOpen,
    setIsGroupOrderModalOpen,
    setIsWalletModalOpen,
    rewardPoints,
    currentUser,
    walletBalance,
    setIsAuthModalOpen,
    setIsAddMoneyModalOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search suggestions
  const searchSuggestions = searchQuery.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.nestedType && p.nestedType.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleNavClick = (view: any) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (cat: Category, subId?: string, nested?: string) => {
    setSelectedCategory(cat);
    if (subId) {
      const sub = cat.subcategories.find(s => s.id === subId);
      setSelectedSubcategory(sub || null);
    } else {
      setSelectedSubcategory(null);
    }
    setSelectedNestedType(nested || null);
    setCurrentView('category');
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Notice (Rwanda delivery info) */}
      <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-xs font-interface">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-sm text-[10px] uppercase">
              Rwanda Express
            </span>
            <span className="hidden sm:inline">
              Instant motorcycle courier & verified store orders across Kigali, Musanze, & Rubavu.
            </span>
            <span className="sm:hidden">Express delivery across Rwanda.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:+250780837936" className="flex items-center gap-1 hover:text-amber-400">
              <Phone className="w-3 h-3 text-amber-500" />
              <span>+250 780 837 936</span>
            </a>
            <button
              id="top-bar-account-btn"
              type="button"
              onClick={() => {
                if (currentUser) {
                  handleNavClick('account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold cursor-pointer"
            >
              <User className="w-3 h-3 text-amber-500" />
              <span>{currentUser ? `${currentUser.fullName.split(' ')[0]}'s Account` : 'Sign In'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className="text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Shield className="w-3 h-3 text-amber-500" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('driver')}
              className="text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Bike className="w-3 h-3 text-amber-500" />
              <span>Driver Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer shrink-0 group transition-transform active:scale-95"
          >
            <IshemaLogo variant="horizontal" size="md" />
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search food, drinks, electronics, parcels in Rwanda..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-body text-xs sm:text-sm transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Auto-suggestions */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                {searchSuggestions.length === 0 ? (
                  <div className="p-3 text-xs text-slate-500 text-center font-body">
                    No items found matching "{searchQuery}"
                  </div>
                ) : (
                  <div>
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Product Suggestions
                    </div>
                    {searchSuggestions.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          navigateToProduct(p.id);
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="p-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <img
                          src={p.images && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          onError={e => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80';
                          }}
                          className="w-9 h-9 rounded-lg object-cover border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-interface font-semibold text-xs text-slate-900 truncate">
                            {p.name}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-body">
                            {p.seller.name}
                          </span>
                        </div>
                        <span className="font-bold text-xs text-slate-900 font-body">
                          {formatRWF(p.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 font-interface text-xs font-semibold text-slate-700">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentView === 'home' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            {/* Dynamic Category Mega Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1 transition-colors ${
                  currentView === 'category' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Store Catalog</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                    Marketplace Categories
                  </div>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <div key={cat.id} className="group">
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(cat)}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              referrerPolicy="no-referrer"
                              className="w-6 h-6 rounded-md object-cover"
                            />
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {cat.subcategories.length} sub
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentView === 'about' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              About Us
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentView === 'services' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Our Services
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentView === 'how-it-works' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              How It Works
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('pricing')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentView === 'pricing' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Pricing
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('track')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1 transition-colors ${
                currentView === 'track' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-amber-500" />
              <span>Track Package</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('driver-apply')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentView === 'driver-apply' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Become a Driver
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                currentView === 'contact' ? 'text-amber-700 bg-amber-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Contact Us
            </button>

            <button
              id="nav-supermarket-tab"
              type="button"
              onClick={() => handleNavClick('supermarket')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                currentView === 'supermarket'
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50 font-bold'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span>Supermarket</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-100 text-emerald-800 font-extrabold uppercase">
                Live
              </span>
            </button>

            <button
              id="nav-surprise-gift-tab"
              type="button"
              onClick={() => handleNavClick('surprise-gift')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                currentView === 'surprise-gift'
                  ? 'bg-rose-500 text-white font-bold shadow-xs'
                  : 'text-rose-600 hover:bg-rose-50 font-bold'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-rose-500" />
              <span>Surprise Gift</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-rose-100 text-rose-700 font-extrabold uppercase">
                New
              </span>
            </button>

            <button
              id="nav-animate-rider-tab"
              type="button"
              onClick={() => handleNavClick('animate-rider')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                currentView === 'animate-rider'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-amber-800 hover:bg-amber-50 font-bold'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-amber-600" />
              <span>Animate Rider</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-900 font-extrabold uppercase">
                Veo AI
              </span>
            </button>
          </nav>

          {/* Right Actions (Courier Button & Cart & Innovations) */}
          <div className="flex items-center gap-2">
            {/* Animate Rider Quick Action */}
            <button
              id="nav-animate-rider-btn"
              type="button"
              onClick={() => handleNavClick('animate-rider')}
              className={`p-2.5 rounded-xl border transition-all hidden md:flex items-center gap-1.5 text-xs font-semibold ${
                currentView === 'animate-rider'
                  ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                  : 'border-slate-200 hover:bg-amber-50/60 text-slate-700 hover:border-amber-400'
              }`}
              title="Animate Rider on Motorbike — Veo Video AI"
            >
              <Bike className="w-4 h-4 text-amber-500" />
              <span className="hidden xl:inline">Animate Rider</span>
            </button>

            {/* Search by Photo Action */}
            <button
              id="nav-photo-search-btn"
              type="button"
              onClick={() => setIsSearchByPhotoOpen(true)}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors hidden lg:flex items-center gap-1.5 text-xs font-semibold"
              title="Search by Photo (Visual AI)"
            >
              <Camera className="w-4 h-4 text-slate-600" />
              <span className="hidden xl:inline">Photo Search</span>
            </button>

            {/* Group Order Action */}
            <button
              id="nav-group-order-btn"
              type="button"
              onClick={() => setIsGroupOrderModalOpen(true)}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors hidden lg:flex items-center gap-1.5 text-xs font-semibold"
              title="Start a Group Order with friends or office"
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">Group Order</span>
            </button>

            {/* Ishema Wallet & Rewards */}
            <button
              id="nav-wallet-rewards-btn"
              type="button"
              onClick={() => handleNavClick('wallet')}
              className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-900 transition-colors hidden md:flex items-center gap-1.5 text-xs font-bold"
              title="Your Ishema Wallet & Rewards"
            >
              <Wallet className="w-3.5 h-3.5 text-amber-600" />
              <span>{formatRWF(walletBalance)}</span>
            </button>

            {/* Customer Account Button */}
            {currentUser ? (
              <button
                id="nav-customer-account-btn"
                type="button"
                onClick={() => handleNavClick('account')}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer group"
                title="My Account"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-lg object-cover border border-amber-400 shrink-0"
                />
                <span className="hidden lg:inline font-interface font-bold text-slate-900 group-hover:text-amber-700">
                  {currentUser.fullName.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                id="nav-customer-signin-btn"
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Surprise Gift Action Button */}
            <button
              id="nav-surprise-gift-action-btn"
              type="button"
              onClick={() => handleNavClick('surprise-gift')}
              className="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-linear-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-interface font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5"
            >
              <Gift className="w-4 h-4" />
              <span className="hidden md:inline">Send Surprise Gift</span>
              <span className="md:hidden">Surprise</span>
            </button>

            {/* Quick Delivery Booking Button */}
            <button
              id="nav-order-delivery-btn"
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Order a Delivery</span>
              <span className="sm:hidden">Send Parcel</span>
            </button>

            {/* Cart Button */}
            <button
              id="open-cart-btn"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-800 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="py-2 pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products in Rwanda..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-body"
            />
          </div>
        </div>
      </div>

      {/* Rwanda Smart Marketplace Sub-Navigation Strip */}
      <div className="bg-slate-100/90 border-t border-slate-200/80 px-4 py-1.5 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
          <span className="text-[10px] uppercase font-extrabold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full shrink-0">
            Smart Features:
          </span>

          <button
            onClick={() => handleNavClick('neighborhood-stores')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'neighborhood-stores' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-amber-600" />
            <span>Neighborhood Stores</span>
          </button>

          <button
            onClick={() => handleNavClick('smart-basket')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'smart-basket' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-white'
            }`}
          >
            <ShoppingBasket className="w-3.5 h-3.5 text-orange-600" />
            <span>Cook Rwanda Baskets</span>
          </button>

          <button
            onClick={() => handleNavClick('buy-local')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'buy-local' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-white'
            }`}
          >
            <span>🇷🇼</span>
            <span>Buy Local Rwanda</span>
          </button>

          <button
            onClick={() => handleNavClick('farmer-market')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'farmer-market' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-white'
            }`}
          >
            <span>🚜</span>
            <span>Farmer-to-Door</span>
          </button>

          <button
            onClick={() => handleNavClick('deals')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'deals' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-rose-600" />
            <span>Daily Deals</span>
          </button>

          <button
            onClick={() => handleNavClick('community')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'community' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Community Hubs</span>
          </button>

          <button
            onClick={() => handleNavClick('business-delivery')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'business-delivery' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-700" />
            <span>Business Logistics</span>
          </button>

          <button
            onClick={() => setIsRequestProductOpen(true)}
            className="px-2.5 py-1 rounded-lg text-emerald-700 hover:bg-white transition-colors flex items-center gap-1.5 border border-emerald-300/50 bg-emerald-50/50"
          >
            <FileQuestion className="w-3.5 h-3.5" />
            <span>Request Anything</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto font-interface text-sm font-semibold">
          {/* Customer Account & Wallet Header in Mobile Menu */}
          {currentUser ? (
            <div className="p-4 rounded-2xl bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950 text-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-amber-400"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">{currentUser.fullName}</h4>
                    <span className="text-[10px] text-amber-300 font-semibold">{currentUser.tierBadge}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavClick('account')}
                  className="text-xs text-amber-400 font-bold hover:underline"
                >
                  View Profile &rarr;
                </button>
              </div>

              <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-300 block">Ishema Wallet</span>
                  <strong className="text-base font-extrabold text-amber-400 font-heading">
                    {formatRWF(walletBalance)}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAddMoneyModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-xs"
                >
                  + Add Money
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-slate-900 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>Sign In or Register Account</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('account')}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>My Account Dashboard</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Orders, Wallet & More</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('wallet')}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>Ishema Digital Wallet</span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-600">{formatRWF(walletBalance)}</span>
          </button>

          <button
            id="mobile-nav-surprise-gift"
            type="button"
            onClick={() => handleNavClick('surprise-gift')}
            className="w-full text-left px-3 py-2.5 rounded-xl bg-linear-to-r from-rose-50 to-amber-50 border border-rose-200 text-rose-700 font-bold flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-rose-600" />
              <span>Send a Surprise Gift</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold">
              New
            </span>
          </button>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400 px-3">
              Store Categories
            </span>
            <div className="mt-1 space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 text-slate-700 flex items-center justify-between text-xs"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-slate-400">Browse</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-amber-600 px-3">
              Smart Rwanda Marketplace
            </span>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                id="mobile-nav-supermarket-btn"
                type="button"
                onClick={() => handleNavClick('supermarket')}
                className="col-span-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs font-bold text-emerald-950 hover:bg-emerald-100 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-emerald-600" />
                  <span>Rwanda Supermarkets Catalog</span>
                </span>
                <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-full font-bold">
                  Live
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('neighborhood-stores')}
                className="p-2 rounded-xl bg-slate-50 text-left text-xs font-semibold text-slate-800 hover:bg-amber-50"
              >
                🏠 Neighborhood
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('smart-basket')}
                className="p-2 rounded-xl bg-slate-50 text-left text-xs font-semibold text-slate-800 hover:bg-amber-50"
              >
                🧺 Cook Rwanda
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('buy-local')}
                className="p-2 rounded-xl bg-slate-50 text-left text-xs font-semibold text-slate-800 hover:bg-amber-50"
              >
                🇷🇼 Buy Local
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('farmer-market')}
                className="p-2 rounded-xl bg-slate-50 text-left text-xs font-semibold text-slate-800 hover:bg-amber-50"
              >
                🚜 Farmer-to-Door
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('deals')}
                className="p-2 rounded-xl bg-slate-50 text-left text-xs font-semibold text-slate-800 hover:bg-amber-50"
              >
                🏷️ Daily Deals
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('community')}
                className="p-2 rounded-xl bg-slate-50 text-left text-xs font-semibold text-slate-800 hover:bg-amber-50"
              >
                🤝 Community Hubs
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('business-delivery')}
                className="p-2 rounded-xl bg-slate-50 text-left text-xs font-semibold text-slate-800 hover:bg-amber-50"
              >
                💼 Business B2B
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavClick('animate-rider');
                }}
                className="p-2 rounded-xl bg-amber-50 text-left text-xs font-bold text-amber-900 border border-amber-200 hover:bg-amber-100 flex items-center gap-1.5"
              >
                <Bike className="w-3.5 h-3.5 text-amber-600" />
                <span>🎬 Animate Rider</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsRequestProductOpen(true);
                }}
                className="p-2 rounded-xl bg-emerald-50 text-left text-xs font-bold text-emerald-800 hover:bg-emerald-100"
              >
                📝 Request Any
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchByPhotoOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-100 text-left text-xs font-semibold text-slate-800"
              >
                📷 Photo Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsGroupOrderModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-100 text-left text-xs font-semibold text-slate-800"
              >
                👥 Group Order
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWalletModalOpen(true);
                }}
                className="p-2 rounded-xl bg-amber-100 text-left text-xs font-bold text-amber-900 col-span-2 flex items-center justify-between"
              >
                <span>💰 Ishema Rewards Wallet</span>
                <span>{rewardPoints.toLocaleString()} PTS</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('track')}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-amber-700 font-bold flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Track Your Package
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('services')}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800"
            >
              Our Services
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('pricing')}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('driver-apply')}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800"
            >
              Become a Driver
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('driver')}
              className="w-full text-left px-3 py-2.5 rounded-xl bg-slate-900 text-amber-400 flex items-center gap-2 font-bold"
            >
              <Bike className="w-4 h-4" />
              Driver Operations Portal
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3 py-2.5 rounded-xl bg-amber-500 text-slate-950 flex items-center gap-2 font-bold"
            >
              <Shield className="w-4 h-4" />
              Admin Management Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
