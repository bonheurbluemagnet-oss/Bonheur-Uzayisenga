import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  Wallet,
  Bell,
  ShoppingCart,
  User,
  ChevronDown,
  Sparkles,
  Bike,
  Package,
  Gift,
  CheckCircle2,
  X,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { IshemaLogo } from '../IshemaLogo';
import { RWANDA_LOCATIONS } from '../../data/mockData';

export const SingleFrameHeader: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    walletBalance,
    cart,
    cartCount,
    cartTotal,
    currentUser,
    isLoggedIn,
    setIsAuthModalOpen,
    setIsCartOpen,
    setIsWalletModalOpen,
    setIsInnovationsGuideOpen,
    products,
    setSelectedProduct
  } = useStore();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(e.target as Node)) {
        setIsLocationOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered quick search results
  const searchResults = searchQuery.trim().length > 1
    ? products
        .filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSelectSearchResult = (product: any) => {
    setSelectedProduct(product);
    setCurrentView('product');
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
      setIsSearchFocused(false);
    }
  };

  const notifications = [
    {
      id: 'n1',
      title: 'Driver Dispatched to Simba Supermarket',
      desc: 'Moto courier Jean Paul is picking up your fresh groceries order.',
      time: '4 mins ago',
      unread: true,
      type: 'delivery'
    },
    {
      id: 'n2',
      title: 'Ishema Wallet Cashback Added',
      desc: '+1,250 RWF credited to your wallet for Buy Local Rwanda purchase.',
      time: '1 hour ago',
      unread: true,
      type: 'wallet'
    },
    {
      id: 'n3',
      title: 'Secret Surprise Gift Scheduled',
      desc: 'Anonymous delivery to Gisozi confirmed for 4:00 PM today.',
      time: '3 hours ago',
      unread: false,
      type: 'gift'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 group text-left transition-transform active:scale-98"
          >
            <IshemaLogo variant="full" size="md" />
          </button>

          {/* Location Selector */}
          <div className="relative hidden md:block" ref={locationDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors border border-slate-200"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate max-w-[120px]">{selectedLocation || 'Kigali - Gasabo'}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLocationOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Select Delivery Location
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {RWANDA_LOCATIONS.map(loc => (
                    <button
                      key={`header-loc-${loc.sector}`}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc.sector);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                        selectedLocation === loc.sector
                          ? 'bg-amber-50 text-amber-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{loc.sector}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{loc.district}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Global Instant Search Bar */}
        <div className="flex-1 max-w-2xl relative mx-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search supermarket, food, electronics, fashion across Rwanda..."
              className="w-full pl-10 pr-10 py-2 rounded-full bg-slate-100 hover:bg-slate-150 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Quick Search Dropdown Preview */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in">
              <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Instant Products ({searchResults.length})
              </div>
              <div className="divide-y divide-slate-100">
                {searchResults.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectSearchResult(p)}
                    className="w-full p-2 rounded-xl text-left hover:bg-amber-50/70 flex items-center justify-between gap-3 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 line-clamp-1">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{p.categoryId}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-extrabold text-amber-700">{formatRWF(p.price)}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">{p.estimatedDeliveryTime || '30 mins'}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* 20 Innovations Guide Button */}
          <button
            type="button"
            onClick={() => setIsInnovationsGuideOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-xs cursor-pointer border border-slate-800 hover:scale-105"
            title="View all 20 Innovations & Architecture Guide"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>20 Innovations</span>
          </button>

          {/* Ishema Wallet Balance Pill */}
          <button
            id="header-wallet-btn"
            type="button"
            onClick={() => setCurrentView('wallet')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
              currentView === 'wallet'
                ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-xs'
                : 'bg-amber-50/80 hover:bg-amber-100 text-amber-900 border-amber-200'
            }`}
            title="Open Ishema Wallet"
          >
            <Wallet className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="text-left hidden sm:block">
              <span className="text-[9px] uppercase tracking-wider font-extrabold block text-amber-800 leading-none">
                Wallet
              </span>
              <span className="text-xs font-extrabold leading-none">
                {formatRWF(walletBalance || 25000)}
              </span>
            </div>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifDropdownRef}>
            <button
              id="header-notifications-btn"
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-heading font-bold text-xs text-slate-900">Notifications</span>
                  <span className="text-[11px] text-amber-600 font-semibold cursor-pointer">Mark all read</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-1">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 px-2 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-bold text-slate-900">{n.title}</div>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    setCurrentView('orders');
                  }}
                  className="w-full mt-1 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 text-center transition-colors block"
                >
                  View Order Tracking
                </button>
              </div>
            )}
          </div>

          {/* Cart In-Frame Switcher */}
          <button
            id="header-cart-btn"
            type="button"
            onClick={() => setCurrentView('cart')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all relative ${
              currentView === 'cart'
                ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
            }`}
            title="View Cart inside main frame"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold hidden md:inline">
              {cartCount > 0 ? formatRWF(cartTotal) : 'Cart'}
            </span>
          </button>

          {/* Customer Profile Pill */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              id="header-profile-btn"
              type="button"
              onClick={() => {
                if (!isLoggedIn) {
                  setIsAuthModalOpen(true);
                } else {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                }
              }}
              className={`flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full border transition-all ${
                currentView === 'account'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-700 font-bold text-xs flex items-center justify-center border border-amber-300">
                {currentUser?.fullName?.charAt(0) || <User className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden lg:inline max-w-[90px] truncate">
                {currentUser?.fullName || 'Sign In'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
            </button>

            {isProfileMenuOpen && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{currentUser?.fullName}</div>
                  <div className="text-[11px] text-slate-500 truncate">{currentUser?.email || currentUser?.phone}</div>
                </div>
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      setCurrentView('account');
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 rounded-xl font-medium text-slate-700 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile & Settings</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      setCurrentView('orders');
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 rounded-xl font-medium text-slate-700 flex items-center gap-2"
                  >
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Orders</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      setCurrentView('wallet');
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 rounded-xl font-medium text-slate-700 flex items-center gap-2"
                  >
                    <Wallet className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ishema Wallet ({formatRWF(walletBalance)})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
