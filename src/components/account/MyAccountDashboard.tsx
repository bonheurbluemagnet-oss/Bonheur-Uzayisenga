import React, { useState } from 'react';
import {
  User,
  Wallet,
  Package,
  MapPin,
  Heart,
  Bell,
  Gift,
  Award,
  Settings,
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  Smartphone,
  ExternalLink,
  Edit2,
  Lock,
  ChevronRight,
  Share2,
  Copy,
  Clock,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Mail,
  Building,
  KeyRound
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { WalletDashboardView } from '../wallet/WalletDashboardView';
import { SavedAddress, Order } from '../../types';

export const MyAccountDashboard: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    addSavedAddress,
    updateSavedAddress,
    deleteSavedAddress,
    setDefaultAddress,
    updateNotificationPrefs,
    updateSecuritySettings,
    logout,
    logoutAllDevices,
    orders,
    products,
    addToCart,
    navigateToProduct,
    walletBalance,
    rewardPoints,
    convertRewardsToWallet,
    refundOrderToWallet,
    setIsAddMoneyModalOpen,
    setIsPinModalOpen,
    setActiveTrackingNumber,
    setSelectedReceiptTransaction,
    walletTransactions
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    | 'profile'
    | 'wallet'
    | 'orders'
    | 'addresses'
    | 'favorites'
    | 'notifications'
    | 'surprises'
    | 'rewards'
    | 'settings'
    | 'support'
  >('profile');

  // Edit Profile Form State
  const [nameInput, setNameInput] = useState(currentUser?.fullName || 'Patrick Habimana');
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || '+250 788 123 456');
  const [emailInput, setEmailInput] = useState(currentUser?.email || 'patrick.habimana@ishema.rw');
  const [districtInput, setDistrictInput] = useState(currentUser?.primaryDistrict || 'Kicukiro');

  // Add Address Form State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newLabel, setNewLabel] = useState('Home');
  const [newRecipient, setNewRecipient] = useState(currentUser?.fullName || '');
  const [newPhone, setNewPhone] = useState(currentUser?.phone || '');
  const [newDistrict, setNewDistrict] = useState('Gasabo');
  const [newSector, setNewSector] = useState('Kimihurura');
  const [newStreet, setNewStreet] = useState('KG 9 Ave, House 14');
  const [newLandmark, setNewLandmark] = useState('Near Kigali Convention Centre');
  const [newIsDefault, setNewIsDefault] = useState(false);

  // Copied alert for referral code
  const [copiedReferral, setCopiedReferral] = useState(false);

  if (!currentUser) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto my-8">
        <User className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="font-heading font-bold text-lg text-slate-900">Sign in to view your Account</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4 font-body">
          Track orders, access your Ishema Wallet, manage delivery addresses, and earn rewards.
        </p>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName: nameInput,
      phone: phoneInput,
      email: emailInput,
      primaryDistrict: districtInput
    });
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addSavedAddress({
      label: newLabel,
      recipientName: newRecipient,
      phone: newPhone,
      district: newDistrict,
      sector: newSector,
      streetAddress: newStreet,
      streetOrHouseNumber: newStreet,
      landmark: newLandmark,
      landmarkInstructions: newLandmark,
      isDefault: newIsDefault
    });
    setIsAddingAddress(false);
    // Reset
    setNewLabel('Home');
    setNewStreet('');
    setNewLandmark('');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  // Get favorite products
  const favoriteProducts = products.filter(p => (currentUser.favoriteProductIds || []).includes(p.id));

  // Surprise orders
  const surpriseOrders = orders.filter(o => o.isSurprise);

  return (
    <div id="my-account-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 1. TOP GREETING & WALLET BANNER (Exact user requirement) */}
      <div className="rounded-3xl bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle background embellishment */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-500 text-slate-950 uppercase tracking-wider shadow-xs">
                {currentUser.tierBadge}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  Welcome back! 👋
                </h1>
              </div>
              <p className="text-sm font-semibold text-amber-300 font-interface">
                {currentUser.fullName}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                <span>{currentUser.phone}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Account
                </span>
              </div>
            </div>
          </div>

          {/* Wallet Balance Hero Card */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-300 block font-body">Ishema Wallet Balance</span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-400">
                {formatRWF(walletBalance)}
              </div>
            </div>
            <button
              id="account-header-add-money-btn"
              type="button"
              onClick={() => setIsAddMoneyModalOpen(true)}
              className="ml-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer active:scale-98"
            >
              + Add Money
            </button>
          </div>
        </div>

        {/* Quick Shortcuts Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-1">
            Quick Access:
          </span>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5 text-amber-400" />
            <span>Your Orders ({orders.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wallet')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5"
          >
            <Wallet className="w-3.5 h-3.5 text-amber-400" />
            <span>Ishema Wallet</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rewards')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Rewards ({rewardPoints.toLocaleString()} pts)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('surprises')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5"
          >
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Surprise Gifts ({surpriseOrders.length})</span>
          </button>
        </div>
      </div>

      {/* 2. TABBED NAVIGATION BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-1.5 shadow-xs overflow-x-auto">
        <div className="flex items-center min-w-max gap-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'wallet', label: 'Wallet', icon: Wallet },
            { id: 'orders', label: 'Orders', icon: Package, badge: orders.length },
            { id: 'addresses', label: 'Addresses', icon: MapPin, badge: currentUser.addresses.length },
            { id: 'favorites', label: 'Favorites', icon: Heart, badge: favoriteProducts.length },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'surprises', label: 'Gift & Surprise Orders', icon: Gift },
            { id: 'rewards', label: 'Rewards', icon: Award },
            { id: 'settings', label: 'Settings & Security', icon: Settings },
            { id: 'support', label: 'Help & Support', icon: HelpCircle }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`account-tab-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TAB CONTENT VIEWS */}
      <div>
        {/* --- TAB 1: PROFILE --- */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Summary Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="text-center">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-3xl object-cover mx-auto border-4 border-amber-100 shadow-md mb-3"
                />
                <h3 className="font-heading font-bold text-lg text-slate-900">{currentUser.fullName}</h3>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    {currentUser.tierBadge}
                  </span>
                  <span className="text-xs text-slate-400 font-body">Member since {currentUser.createdAt}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Phone Verification</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Primary District</span>
                  <span className="font-bold text-slate-900">{currentUser.primaryDistrict}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Referral Code</span>
                  <span className="font-mono font-bold text-amber-600">{currentUser.referralCode}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full py-2.5 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Edit Profile Form */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                Edit Personal Information
              </h3>
              <p className="text-xs text-slate-500 mb-5 font-body">
                Keep your Rwandan mobile number and delivery details up to date for fast courier coordination.
              </p>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Rwandan Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={e => setPhoneInput(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary District
                    </label>
                    <select
                      value={districtInput}
                      onChange={e => setDistrictInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="Kicukiro">Kicukiro</option>
                      <option value="Gasabo">Gasabo</option>
                      <option value="Nyarugenge">Nyarugenge</option>
                      <option value="Musanze">Musanze</option>
                      <option value="Rubavu">Rubavu</option>
                      <option value="Huye">Huye</option>
                      <option value="Bugesera">Bugesera</option>
                      <option value="Rwamagana">Rwamagana</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- TAB 2: ISHEMA WALLET --- */}
        {activeTab === 'wallet' && (
          <WalletDashboardView onNavigateToOrders={() => setActiveTab('orders')} />
        )}

        {/* --- TAB 3: ORDERS --- */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">Your Order History</h3>
                <p className="text-xs text-slate-500">Track active deliveries, view invoices, or cancel/refund directly to your Ishema Wallet.</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <Package className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No orders placed yet</p>
                <p className="text-xs text-slate-400 mt-1">Browse our store and enjoy instant Ishema Wallet checkout.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const isDelivered = order.status === 'Delivered';
                  const isCancelled = order.status === 'Cancelled';

                  return (
                    <div
                      key={order.id}
                      className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-sm text-slate-900">
                              Order #{order.id}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                              {order.trackingNumber}
                            </span>
                            {order.isSurprise && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 flex items-center gap-1">
                                <Gift className="w-3 h-3" /> Surprise Gift
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block mt-0.5 font-body">
                            Placed on {order.createdAt}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              isDelivered
                                ? 'bg-emerald-100 text-emerald-800'
                                : isCancelled
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-xs font-bold font-mono text-slate-900">
                            {formatRWF(order.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.product.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <img
                                src={item.product.images?.[0] || ''}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                              />
                              <span className="font-semibold text-slate-800">
                                {item.quantity}x {item.product.name}
                              </span>
                            </div>
                            <span className="font-bold text-slate-700">
                              {formatRWF(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Payment & Delivery Details */}
                      <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1 text-slate-600">
                        <div className="flex justify-between">
                          <span>Payment Method:</span>
                          <span className="font-semibold text-slate-900">{order.paymentMethod}</span>
                        </div>
                        {order.walletDeduction && (
                          <div className="flex justify-between text-amber-700">
                            <span>Wallet Deduction:</span>
                            <span className="font-bold">-{formatRWF(order.walletDeduction)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Delivery Address:</span>
                          <span className="font-semibold text-slate-900">{order.customer.address}, {order.customer.district}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setActiveTrackingNumber(order.trackingNumber)}
                          className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <span>Track Delivery</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        {!isCancelled && !isDelivered && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Do you want to cancel Order #${order.id} and receive an instant refund of ${formatRWF(order.total)} to your Ishema Wallet?`)) {
                                refundOrderToWallet(order.id, order.total, 'Customer cancelled order before dispatch');
                              }
                            }}
                            className="py-1.5 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 font-semibold text-xs transition-colors flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Cancel & Refund to Wallet</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: ADDRESSES --- */}
        {activeTab === 'addresses' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">Saved Delivery Addresses</h3>
                <p className="text-xs text-slate-500">Add home, office, or landmark addresses for lightning-fast delivery.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingAddress(true)}
                className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            {/* Address Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.addresses.map(addr => (
                <div
                  key={addr.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    addr.isDefault
                      ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-400/20'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                        <MapPin className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <span className="font-heading font-bold text-sm text-slate-900 block">
                          {addr.label}
                        </span>
                        <span className="text-[11px] text-slate-500">{addr.recipientName} • {addr.phone}</span>
                      </div>
                    </div>

                    {addr.isDefault ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                        Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[11px] text-amber-600 font-semibold hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 font-semibold mt-2">
                    {addr.streetOrHouseNumber}, {addr.sector}, {addr.district}
                  </p>

                  {addr.landmarkInstructions && (
                    <p className="text-[11px] text-slate-500 mt-1 italic">
                      Landmark: {addr.landmarkInstructions}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => deleteSavedAddress(addr.id)}
                      className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Address Form Modal */}
            {isAddingAddress && (
              <div
                className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
                onClick={() => setIsAddingAddress(false)}
              >
                <div
                  onClick={e => e.stopPropagation()}
                  className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4"
                >
                  <h3 className="font-heading font-bold text-base text-slate-900">Add New Delivery Address</h3>

                  <form onSubmit={handleCreateAddress} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Address Label</label>
                        <input
                          type="text"
                          placeholder="e.g. Home, Office, Mum"
                          value={newLabel}
                          onChange={e => setNewLabel(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Name</label>
                        <input
                          type="text"
                          value={newRecipient}
                          onChange={e => setNewRecipient(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={newPhone}
                          onChange={e => setNewPhone(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                        <select
                          value={newDistrict}
                          onChange={e => setNewDistrict(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
                        >
                          <option value="Gasabo">Gasabo</option>
                          <option value="Kicukiro">Kicukiro</option>
                          <option value="Nyarugenge">Nyarugenge</option>
                          <option value="Musanze">Musanze</option>
                          <option value="Rubavu">Rubavu</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Sector</label>
                        <input
                          type="text"
                          value={newSector}
                          onChange={e => setNewSector(e.target.value)}
                          placeholder="e.g. Remera, Kimihurura"
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Street / House No.</label>
                        <input
                          type="text"
                          value={newStreet}
                          onChange={e => setNewStreet(e.target.value)}
                          placeholder="e.g. KG 11 Ave #20"
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nearby Landmark Instructions (Crucial for Rwanda Drivers)
                      </label>
                      <input
                        type="text"
                        value={newLandmark}
                        onChange={e => setNewLandmark(e.target.value)}
                        placeholder="e.g. Opposite BK branch, white gate with black stripes"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                      />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={newIsDefault}
                        onChange={e => setNewIsDefault(e.target.checked)}
                        className="rounded-sm text-amber-500 focus:ring-amber-500"
                      />
                      <span>Set as my default shipping address</span>
                    </label>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-600 shadow-xs"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 5: FAVORITES --- */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">Your Favorite Items</h3>
              <p className="text-xs text-slate-500">Saved wishlist items for quick re-ordering.</p>
            </div>

            {favoriteProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <Heart className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No favorite items saved yet</p>
                <p className="text-xs text-slate-400 mt-1">Tap the heart icon on any product to save it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteProducts.map(product => (
                  <div
                    key={product.id}
                    className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div
                      className="flex gap-3 cursor-pointer group"
                      onClick={() => navigateToProduct(product.id)}
                    >
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={e => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80';
                        }}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <span className="text-[10px] text-amber-600 font-bold uppercase">{product.categoryId}</span>
                        <h4 className="font-heading font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h4>
                        <span className="font-bold text-slate-900 text-sm block mt-1">
                          {formatRWF(product.price)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Add to Cart</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 6: NOTIFICATIONS --- */}
        {activeTab === 'notifications' && (
          <div className="max-w-2xl bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">Notification Preferences</h3>
              <p className="text-xs text-slate-500">Manage how Ishema Express communicates delivery updates and receipts.</p>
            </div>

            <div className="divide-y divide-slate-100">
              {[
                {
                  id: 'smsUpdates',
                  title: 'SMS Delivery Updates',
                  desc: 'Receive instant text messages when the courier is dispatched or approaching your landmark.',
                  value: currentUser.notificationPrefs.smsUpdates
                },
                {
                  id: 'whatsappUpdates',
                  title: 'WhatsApp Real-Time Tracking',
                  desc: 'Receive live driver location map links and digital delivery OTP via WhatsApp.',
                  value: currentUser.notificationPrefs.whatsappUpdates
                },
                {
                  id: 'emailReceipts',
                  title: 'Official Email Tax Receipts',
                  desc: 'Get full RRA compliant PDF receipts for wallet deposits and store purchases.',
                  value: currentUser.notificationPrefs.emailReceipts
                },
                {
                  id: 'promotionalAlerts',
                  title: 'Flash Discounts & Rewards',
                  desc: 'Be the first to know about Kigali weekend flash sales and loyalty double-points.',
                  value: currentUser.notificationPrefs.promotionalAlerts
                }
              ].map(item => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-interface font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-body">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={item.value}
                      onChange={e => updateNotificationPrefs({ [item.id]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 7: GIFT & SURPRISE ORDERS --- */}
        {activeTab === 'surprises' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">Your Surprise Gift Orders</h3>
              <p className="text-xs text-slate-500">Review confidential deliveries, surprise gift boxes, and recipient statuses.</p>
            </div>

            {surpriseOrders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <Gift className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No surprise gift orders yet</p>
                <p className="text-xs text-slate-400 mt-1">Surprise a loved one with curated flower bouquets, cakes, and gifts!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {surpriseOrders.map(order => (
                  <div key={order.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold font-heading text-slate-900 block">
                          Surprise Gift #{order.id}
                        </span>
                        <span className="text-[11px] text-slate-400">Recipient: {order.surpriseConfig?.recipientName || 'Loved One'}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-700">
                        {order.status}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-pink-50/60 border border-pink-100 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Secret Delivery OTP:</span>
                        <span className="font-mono font-bold text-pink-800">{order.surpriseConfig?.deliveryOtp || '8921'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confidential Protocol:</span>
                        <span className="font-semibold text-emerald-700">Sender details hidden</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 8: REWARDS --- */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            {/* Rewards Balance Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-amber-500 to-amber-600 text-slate-950 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block opacity-90">
                    Ishema Loyalty Points
                  </span>
                  <div className="text-3xl sm:text-4xl font-heading font-extrabold mt-1">
                    {rewardPoints.toLocaleString()} Points
                  </div>
                  <p className="text-xs font-medium mt-1 opacity-90">
                    Worth <strong>{formatRWF(rewardPoints)}</strong> in spendable Ishema Wallet cash.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => convertRewardsToWallet()}
                  disabled={rewardPoints <= 0}
                  className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-heading font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>Convert to Wallet Cash</span>
                </button>
              </div>
            </div>

            {/* Referral Programme Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                    Refer Friends & Earn 1,000 RWF Wallet Credit
                  </h4>
                  <p className="text-xs text-slate-500 font-body">
                    When someone signs up using your personal referral code, both of you earn 1,000 RWF in your wallet.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex-1 font-mono font-bold text-sm text-slate-900">
                  {currentUser.referralCode}
                </div>
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedReferral ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 9: SETTINGS & SECURITY --- */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-6">
            {/* Wallet PIN & Security */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-900">Ishema Wallet Security</h4>
                  <p className="text-xs text-slate-500">Configure 4-digit payment PIN and 2FA authentication.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(true)}
                  className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentUser.security.walletPinSet ? 'Change PIN' : 'Set PIN'}</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Require 4-Digit PIN for Payments</span>
                    <span className="text-slate-500">Prompts for PIN prior to deducting wallet balance.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentUser.security.requirePinForPayments}
                      onChange={e => updateSecuritySettings({ requirePinForPayments: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Two-Factor Authentication (SMS OTP)</span>
                    <span className="text-slate-500">Sends 6-digit verification code to phone on sign-in.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentUser.security.twoFactorEnabled}
                      onChange={e => updateSecuritySettings({ twoFactorEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Active Device Sessions & Logout All Devices */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-900">Active Device Sessions</h4>
                  <p className="text-xs text-slate-500">Devices currently logged into your Ishema Express account.</p>
                </div>
                <button
                  type="button"
                  onClick={logoutAllDevices}
                  className="py-1.5 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 font-semibold text-xs transition-colors"
                >
                  Logout from All Devices
                </button>
              </div>

              <div className="space-y-3">
                {currentUser.activeSessions.map(session => (
                  <div
                    key={session.id}
                    className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{session.deviceName}</span>
                          {session.isCurrent && (
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                              Current Device
                            </span>
                          )}
                        </div>
                        <span className="text-slate-500 text-[11px]">{session.ipAddress} • {session.lastActive}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 10: HELP & SUPPORT --- */}
        {activeTab === 'support' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Support */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h4 className="font-heading font-bold text-base text-slate-900">Direct Customer Support</h4>
              <p className="text-xs text-slate-500 font-body">
                Our support team is available 24/7 across Kigali and regional districts.
              </p>

              <div className="space-y-3 text-xs">
                <a
                  href="tel:+250780837936"
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-3 transition-colors text-slate-900"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold block">Toll-Free Helpline</span>
                    <span className="text-slate-500">+250 780 837 936</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/250780837936"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200 flex items-center gap-3 transition-colors text-slate-900"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold block">WhatsApp Support Channel</span>
                    <span className="text-slate-500">+250 780 837 936 • Instant chat</span>
                  </div>
                </a>

                <a
                  href="mailto:support@ishema.rw"
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-3 transition-colors text-slate-900"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-bold block">Email Inquiries</span>
                    <span className="text-slate-500">support@ishema.rw</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h4 className="font-heading font-bold text-base text-slate-900">Frequently Asked Questions</h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h5 className="font-bold text-slate-900 mb-1">How fast is Ishema Wallet top-up?</h5>
                  <p className="text-slate-600">
                    Instant. MTN Mobile Money and Airtel Money deposits are credited in real-time immediately after you enter your handset PIN.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h5 className="font-bold text-slate-900 mb-1">How do order refunds work?</h5>
                  <p className="text-slate-600">
                    Approved cancellations and refunds are credited back to your Ishema Wallet within seconds without bank waiting periods.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h5 className="font-bold text-slate-900 mb-1">Can I split payments between Wallet and MoMo?</h5>
                  <p className="text-slate-600">
                    Yes! During checkout, you can deduct your remaining wallet balance and pay the rest using MTN MoMo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
