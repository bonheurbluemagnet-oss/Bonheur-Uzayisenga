import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Category,
  Subcategory,
  Product,
  CartItem,
  Order,
  DeliveryBooking,
  Driver,
  ActiveView,
  OrderStatus,
  CourierStatus,
  SurpriseGiftPackage,
  SurpriseGiftConfig,
  LandmarkDeliveryDetails,
  GroupOrder,
  ProductRequest,
  NeighborhoodStore,
  CommunityHub,
  CustomerUser,
  SavedAddress,
  NotificationPreferences,
  SecuritySettings,
  WalletTransaction,
  AdminWalletAuditLog,
  SupermarketStore,
  SupportInteractionEvent
} from '../types';
import { SUPERMARKET_CATEGORIES } from '../data/supermarketCategories';
import { SUPERMARKET_STORES } from '../data/supermarketStores';
import { SUPERMARKET_PRODUCTS, generateBulkSupermarketBatch } from '../data/supermarketProducts';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  INITIAL_DRIVERS,
  RWANDA_LOCATIONS
} from '../data/mockData';
import {
  INITIAL_CUSTOMER_USER,
  INITIAL_WALLET_BALANCE,
  INITIAL_WALLET_TRANSACTIONS,
  ADMIN_MOCK_CUSTOMER_WALLETS,
  INITIAL_ADMIN_AUDIT_LOGS
} from '../data/mockUserData';
import {
  CURATED_SURPRISE_PACKAGES,
  GIFT_WRAPPING_OPTIONS,
  SURPRISE_ADDONS
} from '../data/surpriseGiftData';
import {
  MOCK_NEIGHBORHOOD_STORES,
  MOCK_COMMUNITY_HUBS,
  MOCK_DEALS,
  SMART_BASKET_PRESETS,
  MOCK_GROUP_ORDERS,
  MOCK_PRODUCT_REQUESTS,
  SmartBasketPreset,
  DealItem
} from '../data/innovativeFeaturesData';

export const DEFAULT_LANDMARK_DETAILS: LandmarkDeliveryDetails = {
  streetAddress: '',
  district: 'Gasabo',
  sector: 'Kimihurura',
  nearbyLandmark: 'Near Simba Supermarket Kimironko',
  writtenDirections: 'Take the tarmac road, 2nd black gate past yellow MTN booth',
  entrancePhotoUrl: ''
};

export const DEFAULT_SURPRISE_CONFIG: SurpriseGiftConfig = {
  isSurprise: true,
  recipientName: '',
  recipientPhone: '+250 78',
  deliveryAddress: '',
  deliveryDistrict: 'Gasabo - Kimihurura',
  landmarkInstructions: '',
  occasion: 'Birthday',
  customOccasion: '',
  scheduledDate: new Date().toISOString().split('T')[0],
  scheduledTimeWindow: 'Afternoon (12:00 - 17:00)',
  secretMessage: 'Happy Birthday! 🎉 Someone special is thinking about you with all their heart ❤️',
  secretLanguage: 'en',
  revealOption: 'reveal_after_delivery',
  senderRealName: '',
  senderRealPhone: '+250 78',
  giftWrappingStyle: 'royal-gold',
  selectedAddOns: ['calligraphy-card'],
  deliveryOtp: '4912',
  isRevealed: false,
  reportedUnwanted: false
};

interface StoreContextType {
  // Navigation & View
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (cat: Category | null) => void;
  selectedSubcategory: Subcategory | null;
  setSelectedSubcategory: (sub: Subcategory | null) => void;
  selectedNestedType: string | null;
  setSelectedNestedType: (type: string | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  navigateToProduct: (productIdOrSlug: string) => void;
  isProductLoading: boolean;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Tracking
  activeTrackingNumber: string;
  setActiveTrackingNumber: (code: string) => void;

  // State Collections
  categories: Category[];
  products: Product[];
  orders: Order[];
  bookings: DeliveryBooking[];
  drivers: Driver[];
  activeDriverId: string;
  setActiveDriverId: (id: string) => void;

  // Cart & Innovative Multi-Store
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variations?: Record<string, string>) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  estimatedDeliveryFee: number;
  baseDeliveryFee: number;
  giftPackagingFee: number;
  addOnsFee: number;
  cartTotal: number;
  uniqueStoresInCart: { sellerName: string; itemCount: number; subtotal: number }[];
  isMultiStore: boolean;
  multiStoreDiscount: number;

  // Smart Landmark Delivery
  landmarkDetails: LandmarkDeliveryDetails;
  updateLandmarkDetails: (details: Partial<LandmarkDeliveryDetails>) => void;

  // Emergency Delivery & Pooling
  isEmergencyDelivery: boolean;
  setIsEmergencyDelivery: (emergency: boolean) => void;
  isNeighborhoodPooling: boolean;
  setIsNeighborhoodPooling: (pooling: boolean) => void;
  poolingDiscount: number;

  // Ishema Rewards & Wallet
  rewardPoints: number;
  pointsRedeemed: number;
  setPointsRedeemed: (points: number) => void;
  earnPoints: (amount: number) => void;

  // Low Data Mode (Offline / Slow Rwanda 3G)
  isLowDataMode: boolean;
  setIsLowDataMode: (lowData: boolean) => void;
  toggleLowDataMode: () => void;

  // Innovative Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isBecomeDriverModalOpen: boolean;
  setIsBecomeDriverModalOpen: (open: boolean) => void;
  isSearchByPhotoOpen: boolean;
  setIsSearchByPhotoOpen: (open: boolean) => void;
  isRequestProductOpen: boolean;
  setIsRequestProductOpen: (open: boolean) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  isGroupOrderModalOpen: boolean;
  setIsGroupOrderModalOpen: (open: boolean) => void;
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (open: boolean) => void;
  isAnimateRiderModalOpen: boolean;
  setIsAnimateRiderModalOpen: (open: boolean) => void;
  isInnovationsGuideOpen: boolean;
  setIsInnovationsGuideOpen: (open: boolean) => void;

  // Signature Innovation: "Tell Ishema What You Need"
  tellIshemaQuery: string;
  setTellIshemaQuery: (query: string) => void;
  tellIshemaResult: any | null;
  setTellIshemaResult: (result: any | null) => void;
  isTellIshemaLoading: boolean;
  executeTellIshema: (queryText: string) => Promise<any>;

  // Group Ordering
  groupOrders: GroupOrder[];
  activeGroupOrder: GroupOrder | null;
  setActiveGroupOrder: (group: GroupOrder | null) => void;
  createGroupOrder: (data: Partial<GroupOrder>) => GroupOrder;
  joinGroupOrder: (code: string, memberName: string, phone?: string) => boolean;
  addItemToGroupOrder: (groupCode: string, memberId: string, product: Product) => void;

  // Request Anything
  productRequests: ProductRequest[];
  submitProductRequest: (reqData: Omit<ProductRequest, 'id' | 'createdAt' | 'status'>) => ProductRequest;

  // Neighborhood Stores & Community Hubs
  neighborhoodStores: NeighborhoodStore[];
  selectedStore: NeighborhoodStore | null;
  setSelectedStore: (store: NeighborhoodStore | null) => void;
  communityHubs: CommunityHub[];
  selectedHub: CommunityHub | null;
  setSelectedHub: (hub: CommunityHub | null) => void;

  // Deals & Smart Basket
  deals: DealItem[];
  smartBasketPresets: SmartBasketPreset[];
  loadSmartBasketToCart: (presetId: string) => void;

  // Surprise Gift State & Actions
  isSurpriseGiftMode: boolean;
  setIsSurpriseGiftMode: (active: boolean) => void;
  surpriseConfig: SurpriseGiftConfig;
  updateSurpriseConfig: (updates: Partial<SurpriseGiftConfig>) => void;
  activeSurpriseOrder: Order | null;
  setActiveSurpriseOrder: (order: Order | null) => void;
  addPackageToCart: (pkg: SurpriseGiftPackage) => void;
  openSurpriseReveal: (orderIdOrTracking?: string) => void;
  markSurpriseRevealed: (orderId: string) => void;
  reportSurpriseOrder: (orderId: string, reason: string) => void;
  sendThankYouNote: (orderId: string, note: string) => void;

  // Customer Account & Authentication
  currentUser: CustomerUser | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'otp';
  setAuthModalMode: (mode: 'login' | 'register' | 'otp') => void;
  login: (identifier: string, passwordOrOtp?: string) => Promise<boolean>;
  register: (userData: { fullName: string; phone: string; email: string }) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  logoutAllDevices: () => void;
  updateUserProfile: (updates: Partial<CustomerUser>) => void;
  addSavedAddress: (address: Omit<SavedAddress, 'id'>) => SavedAddress;
  updateSavedAddress: (id: string, updates: Partial<SavedAddress>) => void;
  deleteSavedAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  toggleFavoriteProduct: (productId: string) => void;
  isProductFavorited: (productId: string) => boolean;
  updateNotificationPrefs: (prefs: Partial<NotificationPreferences>) => void;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => void;
  setWalletPin: (pin: string) => boolean;
  verifyWalletPin: (pin: string) => boolean;

  // Ishema Wallet Operations
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  isAddMoneyModalOpen: boolean;
  setIsAddMoneyModalOpen: (open: boolean) => void;
  isPinModalOpen: boolean;
  setIsPinModalOpen: (open: boolean) => void;
  isSendMoneyModalOpen: boolean;
  setIsSendMoneyModalOpen: (open: boolean) => void;
  selectedReceiptTransaction: WalletTransaction | null;
  setSelectedReceiptTransaction: (txn: WalletTransaction | null) => void;
  walletNotification: { title: string; message: string; type?: 'success' | 'info' | 'warning' } | null;
  clearWalletNotification: () => void;
  addMoneyToWallet: (amount: number, method: string, phoneOrCard?: string) => Promise<WalletTransaction>;
  payWithWallet: (amount: number, orderId: string, description?: string) => Promise<{ success: boolean; message: string; transaction?: WalletTransaction }>;
  refundOrderToWallet: (orderId: string, amount: number, reason?: string) => Promise<WalletTransaction>;
  sendMoneyFromWallet: (recipientPhone: string, recipientName: string, amount: number, note?: string) => Promise<{ success: boolean; message: string }>;
  convertRewardsToWallet: (pointsToConvert?: number) => { success: boolean; creditedRWF: number; newBalance: number };

  // Admin Wallet Management
  adminWalletAccounts: any[];
  adminAuditLogs: AdminWalletAuditLog[];
  adminIssueCredit: (userId: string, amount: number, reason: string) => void;
  adminProcessManualRefund: (orderId: string, userId: string, amount: number, reason: string) => void;

  // Actions
  placeOrder: (orderData: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    district: string;
    notes?: string;
    paymentMethod: 'Ishema Wallet' | 'MTN Mobile Money' | 'Airtel Money' | 'Cash on Delivery' | 'Card' | 'Split (Wallet + MoMo)';
    walletDeduction?: number;
    splitPaymentMethod?: string;
    splitPaymentAmount?: number;
    overrideSurpriseConfig?: SurpriseGiftConfig;
    landmarkDetails?: LandmarkDeliveryDetails;
    isEmergencyPriority?: boolean;
    poolingDiscount?: number;
    pointsRedeemed?: number;
  }) => Order;

  createCourierBooking: (bookingData: Omit<DeliveryBooking, 'id' | 'trackingNumber' | 'status' | 'createdAt' | 'timeline'>) => DeliveryBooking;

  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  updateCourierStatus: (bookingId: string, status: CourierStatus, note?: string) => void;
  assignDriverToOrder: (orderId: string, driverId: string) => void;
  assignDriverToBooking: (bookingId: string, driverId: string) => void;

  // Dynamic Admin CRUD
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  addSubcategory: (categoryId: string, subcategory: Omit<Subcategory, 'id' | 'categoryId'>) => void;
  deleteSubcategory: (categoryId: string, subcategoryId: string) => void;

  // Supermarket Marketplace & Bulk CMS
  supermarketStores: SupermarketStore[];
  bulkImportProducts: (productsToImport: Product[]) => void;
  quickUpdateProductPriceStock: (productId: string, newPrice: number, newStock: number, priceSource?: string) => void;
  showNotification: (title: string, message: string) => void;

  // Support & WhatsApp Interaction Tracking
  supportInteractions: SupportInteractionEvent[];
  trackWhatsAppSupportClick: (metadata?: { sourceView?: string; notes?: string }) => void;
  whatsAppSupportCount: number;
  clearSupportInteractions: () => void;

  resetToDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const formatRWF = (amount: number): string => {
  return `RWF ${Math.round(amount).toLocaleString('en-US')}`;
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Persistence Helpers
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(`ishema_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  // State
  const [categories, setCategories] = useState<Category[]>(() => {
    const loaded = loadStored('categories', INITIAL_CATEGORIES);
    if (Array.isArray(loaded)) {
      const existingSlugs = new Set(loaded.map((c: Category) => c.slug));
      const missing = SUPERMARKET_CATEGORIES.filter(c => !existingSlugs.has(c.slug));
      if (missing.length > 0) {
        return [...loaded, ...missing];
      }
      return loaded;
    }
    return [...INITIAL_CATEGORIES, ...SUPERMARKET_CATEGORIES];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const loaded = loadStored('products', INITIAL_PRODUCTS);
    if (Array.isArray(loaded)) {
      const existingIds = new Set(loaded.map((p: Product) => p.id));
      const missing = SUPERMARKET_PRODUCTS.filter(p => !existingIds.has(p.id));
      if (missing.length > 0) {
        return [...loaded, ...missing];
      }
      return loaded;
    }
    return [...INITIAL_PRODUCTS, ...SUPERMARKET_PRODUCTS];
  });
  const [orders, setOrders] = useState<Order[]>(() => loadStored('orders', INITIAL_ORDERS));
  const [bookings, setBookings] = useState<DeliveryBooking[]>(() => loadStored('bookings', INITIAL_BOOKINGS));
  const [drivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [activeDriverId, setActiveDriverId] = useState<string>('drv-01');

  const [cart, setCart] = useState<CartItem[]>(() => loadStored('cart', []));
  const [selectedLocation, setSelectedLocation] = useState<string>('Kimihurura');

  // Surprise Gift state
  const [isSurpriseGiftMode, setIsSurpriseGiftMode] = useState<boolean>(() => loadStored('isSurpriseGiftMode', false));
  const [surpriseConfig, setSurpriseConfig] = useState<SurpriseGiftConfig>(() => loadStored('surpriseConfig', DEFAULT_SURPRISE_CONFIG));
  const [activeSurpriseOrder, setActiveSurpriseOrder] = useState<Order | null>(null);

  // View & Nav
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedNestedType, setSelectedNestedType] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(false);

  // Helper to safely find product by id or slug
  const getProductByIdOrSlug = (idOrSlug: string): Product | null => {
    if (!idOrSlug) return null;
    const cleanId = decodeURIComponent(idOrSlug).trim().toLowerCase();
    return (
      products.find(
        p =>
          p.id.toLowerCase() === cleanId ||
          (p.slug && p.slug.toLowerCase() === cleanId) ||
          p.id.toLowerCase().replace(/^prod-/, '') === cleanId
      ) || null
    );
  };

  // Safe navigation to product details page with URL synchronization
  const navigateToProduct = (productIdOrSlug: string) => {
    if (!productIdOrSlug) return;
    setIsProductLoading(true);
    const cleanId = decodeURIComponent(productIdOrSlug).trim();
    setSelectedProductId(cleanId);

    const found = getProductByIdOrSlug(cleanId);
    setSelectedProduct(found || null);
    setCurrentView('product');

    // Update browser URL to /product/[id]
    try {
      const targetUrl = `/product/${encodeURIComponent(cleanId)}`;
      if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
        window.history.pushState({ view: 'product', productId: cleanId }, '', targetUrl);
      }
    } catch {
      // Safe fallback for restricted iframe environments
    }

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsProductLoading(false);
    }, 180);
  };

  // Safe view changer with URL synchronization
  const handleSetCurrentView = (view: ActiveView) => {
    setCurrentView(view);
    if (view !== 'product') {
      setSelectedProductId(null);
      setSelectedProduct(null);
      try {
        if (typeof window !== 'undefined') {
          const targetPath = view === 'home' ? '/' : `/${view}`;
          if (window.location.pathname !== targetPath) {
            window.history.pushState({ view }, '', targetPath);
          }
        }
      } catch {
        // Safe fallback
      }
    }
  };

  // URL parsing on mount and browser back/forward (popstate) listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLocationChange = () => {
      try {
        const path = window.location.pathname;
        const hash = window.location.hash;
        const search = new URLSearchParams(window.location.search);

        let targetProdId: string | null = null;

        // Path matches /product/[id]
        const pathMatch = path.match(/\/product\/([^\/?#]+)/i);
        if (pathMatch && pathMatch[1]) {
          targetProdId = decodeURIComponent(pathMatch[1]);
        } else if (hash.includes('/product/')) {
          const hashMatch = hash.match(/\/product\/([^\/?#]+)/i);
          if (hashMatch && hashMatch[1]) {
            targetProdId = decodeURIComponent(hashMatch[1]);
          }
        } else if (search.get('product')) {
          targetProdId = search.get('product');
        }

        if (targetProdId) {
          setSelectedProductId(targetProdId);
          const found = getProductByIdOrSlug(targetProdId);
          setSelectedProduct(found || null);
          setCurrentView('product');
          return;
        }

        // Map other view paths
        if (path.startsWith('/category') || hash.includes('/category')) {
          setCurrentView('category');
        } else if (path.startsWith('/track') || hash.includes('/track')) {
          setCurrentView('track');
        } else if (path.startsWith('/account') || hash.includes('/account')) {
          setCurrentView('account');
        } else if (path.startsWith('/wallet') || hash.includes('/wallet')) {
          setCurrentView('wallet');
        } else if (path.startsWith('/surprise-gift') || hash.includes('/surprise-gift')) {
          setCurrentView('surprise-gift');
        } else if (path.startsWith('/deals') || hash.includes('/deals')) {
          setCurrentView('deals');
        } else if (path === '/' && currentView === 'product') {
          setCurrentView('home');
          setSelectedProduct(null);
          setSelectedProductId(null);
        }
      } catch (err) {
        console.warn('Navigation state sync notice:', err);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [products]);

  // Search & Tracking
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTrackingNumber, setActiveTrackingNumber] = useState<string>('ISH-RW-9021');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isBecomeDriverModalOpen, setIsBecomeDriverModalOpen] = useState<boolean>(false);
  const [isSearchByPhotoOpen, setIsSearchByPhotoOpen] = useState<boolean>(false);
  const [isRequestProductOpen, setIsRequestProductOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isGroupOrderModalOpen, setIsGroupOrderModalOpen] = useState<boolean>(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isAnimateRiderModalOpen, setIsAnimateRiderModalOpen] = useState<boolean>(false);
  const [isInnovationsGuideOpen, setIsInnovationsGuideOpen] = useState<boolean>(false);

  // Customer Account & Ishema Wallet States
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => loadStored('currentUser', INITIAL_CUSTOMER_USER));
  const isLoggedIn = Boolean(currentUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'otp'>('login');

  const [walletBalance, setWalletBalance] = useState<number>(() => loadStored('walletBalance', INITIAL_WALLET_BALANCE));
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => loadStored('walletTransactions', INITIAL_WALLET_TRANSACTIONS));
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState<boolean>(false);
  const [selectedReceiptTransaction, setSelectedReceiptTransaction] = useState<WalletTransaction | null>(null);
  const [walletNotification, setWalletNotification] = useState<{ title: string; message: string; type?: 'success' | 'info' | 'warning' } | null>(null);

  // Admin Wallet Audit State
  const [adminWalletAccounts, setAdminWalletAccounts] = useState<any[]>(() => loadStored('adminWalletAccounts', ADMIN_MOCK_CUSTOMER_WALLETS));
  const [adminAuditLogs, setAdminAuditLogs] = useState<AdminWalletAuditLog[]>(() => loadStored('adminAuditLogs', INITIAL_ADMIN_AUDIT_LOGS));

  // Support & WhatsApp Interaction Tracking
  const [supportInteractions, setSupportInteractions] = useState<SupportInteractionEvent[]>(() =>
    loadStored<SupportInteractionEvent[]>('support_interactions', [
      {
        id: 'supp-init-01',
        channel: 'whatsapp',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
        sourceView: 'home',
        phoneNumber: '+250780837936',
        messageText: 'Delivery ETA inquiry from Kimironko'
      },
      {
        id: 'supp-init-02',
        channel: 'whatsapp',
        timestamp: new Date(Date.now() - 3600000 * 7).toISOString(),
        sourceView: 'supermarket',
        phoneNumber: '+250780837936',
        messageText: 'Supermarket price matching assistance'
      }
    ])
  );

  useEffect(() => {
    try {
      localStorage.setItem('ishema_support_interactions', JSON.stringify(supportInteractions));
    } catch (e) {
      console.warn('Failed to persist support interactions:', e);
    }
  }, [supportInteractions]);

  const trackWhatsAppSupportClick = (metadata?: { sourceView?: string; notes?: string }) => {
    const newEvent: SupportInteractionEvent = {
      id: `supp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      channel: 'whatsapp',
      timestamp: new Date().toISOString(),
      sourceView: metadata?.sourceView || currentView || 'home',
      phoneNumber: '+250780837936',
      messageText: metadata?.notes || 'Customer initiated WhatsApp support chat'
    };

    setSupportInteractions(prev => [newEvent, ...prev]);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ishema_whatsapp_support_click', { detail: newEvent }));
    }
  };

  const clearSupportInteractions = () => {
    setSupportInteractions([]);
    try {
      localStorage.removeItem('ishema_support_interactions');
    } catch {
      // safe fallback
    }
  };

  const whatsAppSupportCount = supportInteractions.filter(s => s.channel === 'whatsapp').length;

  const clearWalletNotification = () => setWalletNotification(null);

  // Low Data Mode (Lite Mode for slow Rwandan mobile networks)
  const [isLowDataMode, setIsLowDataMode] = useState<boolean>(() => loadStored('isLowDataMode', false));
  const toggleLowDataMode = () => {
    setIsLowDataMode(prev => {
      const next = !prev;
      localStorage.setItem('ishema_isLowDataMode', JSON.stringify(next));
      return next;
    });
  };

  // Rewards & Wallet Points (1 point = 1 RWF)
  const [rewardPoints, setRewardPoints] = useState<number>(() => loadStored('rewardPoints', 2400));
  const [pointsRedeemed, setPointsRedeemed] = useState<number>(0);
  const earnPoints = (amount: number) => {
    const earned = Math.max(10, Math.floor(amount / 100)); // 1 pt per 100 RWF
    setRewardPoints(prev => {
      const next = prev + earned;
      localStorage.setItem('ishema_rewardPoints', JSON.stringify(next));
      return next;
    });
  };

  // Customer Account Management Functions
  const login = async (identifier: string, _passwordOrOtp?: string): Promise<boolean> => {
    // Simulated instant login with phone or email
    const updatedUser: CustomerUser = {
      ...INITIAL_CUSTOMER_USER,
      email: identifier.includes('@') ? identifier : `${identifier.replace(/\D/g, '')}@ishema.rw`,
      phone: identifier.includes('@') ? INITIAL_CUSTOMER_USER.phone : identifier,
      isPhoneVerified: true
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
    setWalletNotification({
      title: 'Welcome Back! 👋',
      message: `Signed in as ${updatedUser.fullName}. Your Ishema Wallet is active.`,
      type: 'success'
    });
    return true;
  };

  const register = async (userData: { fullName: string; phone: string; email: string }): Promise<boolean> => {
    const newUser: CustomerUser = {
      ...INITIAL_CUSTOMER_USER,
      id: `cust-250-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: userData.fullName,
      phone: userData.phone,
      email: userData.email,
      createdAt: 'Just now',
      isPhoneVerified: false,
      referralCode: `${userData.fullName.split(' ')[0].toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`
    };
    setCurrentUser(newUser);
    localStorage.setItem('ishema_currentUser', JSON.stringify(newUser));
    setAuthModalMode('otp');
    return true;
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    if (otp.length >= 4) {
      if (currentUser) {
        const verified = { ...currentUser, isPhoneVerified: true };
        setCurrentUser(verified);
        localStorage.setItem('ishema_currentUser', JSON.stringify(verified));
      }
      setWalletNotification({
        title: 'Phone Verified! ✅',
        message: 'Your Rwandan mobile number has been verified successfully via OTP.',
        type: 'success'
      });
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ishema_currentUser');
    setWalletNotification({
      title: 'Signed Out',
      message: 'You have been logged out of your Ishema Express account.',
      type: 'info'
    });
  };

  const logoutAllDevices = () => {
    if (currentUser) {
      const singleSession = currentUser.activeSessions.filter(s => s.isCurrent);
      const updated = { ...currentUser, activeSessions: singleSession };
      setCurrentUser(updated);
      localStorage.setItem('ishema_currentUser', JSON.stringify(updated));
    }
    setWalletNotification({
      title: 'Terminated Other Sessions 🔒',
      message: 'Logged out from all other devices and mobile browsers.',
      type: 'success'
    });
  };

  const updateUserProfile = (updates: Partial<CustomerUser>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    localStorage.setItem('ishema_currentUser', JSON.stringify(updated));
    setWalletNotification({
      title: 'Profile Updated',
      message: 'Your personal information has been saved.',
      type: 'success'
    });
  };

  const addSavedAddress = (addressData: Omit<SavedAddress, 'id'>): SavedAddress => {
    const newAddr: SavedAddress = {
      ...addressData,
      id: `addr-${Date.now()}`
    };
    if (currentUser) {
      let updatedList = [...currentUser.addresses];
      if (newAddr.isDefault) {
        updatedList = updatedList.map(a => ({ ...a, isDefault: false }));
      }
      updatedList.push(newAddr);
      const updatedUser = {
        ...currentUser,
        addresses: updatedList,
        defaultAddressId: newAddr.isDefault ? newAddr.id : currentUser.defaultAddressId
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
    }
    return newAddr;
  };

  const updateSavedAddress = (id: string, updates: Partial<SavedAddress>) => {
    if (!currentUser) return;
    let updatedList = currentUser.addresses.map(a => a.id === id ? { ...a, ...updates } : a);
    if (updates.isDefault) {
      updatedList = updatedList.map(a => ({ ...a, isDefault: a.id === id }));
    }
    const updatedUser = {
      ...currentUser,
      addresses: updatedList,
      defaultAddressId: updates.isDefault ? id : currentUser.defaultAddressId
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
  };

  const deleteSavedAddress = (id: string) => {
    if (!currentUser) return;
    const updatedList = currentUser.addresses.filter(a => a.id !== id);
    const updatedUser = {
      ...currentUser,
      addresses: updatedList,
      defaultAddressId: currentUser.defaultAddressId === id ? updatedList[0]?.id : currentUser.defaultAddressId
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser) return;
    const updatedList = currentUser.addresses.map(a => ({ ...a, isDefault: a.id === id }));
    const updatedUser = { ...currentUser, addresses: updatedList, defaultAddressId: id };
    setCurrentUser(updatedUser);
    localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
  };

  const [guestFavorites, setGuestFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ishema_guest_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const isProductFavorited = (productId: string): boolean => {
    if (currentUser?.favoriteProductIds) {
      return currentUser.favoriteProductIds.includes(productId);
    }
    return guestFavorites.includes(productId);
  };

  const toggleFavoriteProduct = (productId: string) => {
    if (currentUser) {
      const exists = (currentUser.favoriteProductIds || []).includes(productId);
      const updatedList = exists
        ? (currentUser.favoriteProductIds || []).filter(id => id !== productId)
        : [...(currentUser.favoriteProductIds || []), productId];
      const updatedUser = { ...currentUser, favoriteProductIds: updatedList };
      setCurrentUser(updatedUser);
      localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
    } else {
      setGuestFavorites(prev => {
        const next = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
        localStorage.setItem('ishema_guest_favorites', JSON.stringify(next));
        return next;
      });
    }
  };

  const updateNotificationPrefs = (prefs: Partial<NotificationPreferences>) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      notificationPrefs: { ...currentUser.notificationPrefs, ...prefs }
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
  };

  const updateSecuritySettings = (settings: Partial<SecuritySettings>) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      security: { ...currentUser.security, ...settings }
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
  };

  const setWalletPin = (pin: string): boolean => {
    if (pin.length !== 4) return false;
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        security: {
          ...currentUser.security,
          walletPin: pin,
          walletPinSet: true,
          requirePinForPayments: true
        }
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('ishema_currentUser', JSON.stringify(updatedUser));
    }
    setWalletNotification({
      title: 'Wallet PIN Set 🔐',
      message: 'Your 4-digit security PIN has been configured for wallet payments.',
      type: 'success'
    });
    return true;
  };

  const verifyWalletPin = (pin: string): boolean => {
    if (!currentUser?.security?.walletPin) return true;
    return currentUser.security.walletPin === pin;
  };

  // Ishema Wallet Action Functions
  const addMoneyToWallet = async (
    amount: number,
    method: string,
    phoneOrCard?: string
  ): Promise<WalletTransaction> => {
    const prevBal = walletBalance;
    const newBal = prevBal + amount;
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const txn: WalletTransaction = {
      id: `txn-${Date.now()}`,
      referenceId: `TXN-ISH-${randomCode}`,
      userId: currentUser?.id || 'cust-demo',
      userName: currentUser?.fullName || 'Customer',
      type: 'Money Added',
      amount,
      previousBalance: prevBal,
      newBalance: newBal,
      status: 'Completed',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethodUsed: method,
      description: `Wallet Top-Up via ${method}`,
      phoneOrAccount: phoneOrCard || currentUser?.phone,
      receiptNote: `Direct balance credit verified via ${method} gateway.`
    };

    setWalletBalance(newBal);
    localStorage.setItem('ishema_walletBalance', JSON.stringify(newBal));

    setWalletTransactions(prev => {
      const updated = [txn, ...prev];
      localStorage.setItem('ishema_walletTransactions', JSON.stringify(updated));
      return updated;
    });

    // Update admin accounts summary
    setAdminWalletAccounts(prev => prev.map(acc => {
      if (acc.userId === (currentUser?.id || 'cust-250-8819')) {
        return {
          ...acc,
          balance: newBal,
          totalDeposited: (acc.totalDeposited || 0) + amount
        };
      }
      return acc;
    }));

    setWalletNotification({
      title: 'Wallet Top-Up Successful 💳',
      message: `${amount.toLocaleString()} RWF has been added to your Ishema Wallet.\nNew Balance: ${newBal.toLocaleString()} RWF.`,
      type: 'success'
    });

    return txn;
  };

  const payWithWallet = async (
    amount: number,
    orderId: string,
    description?: string
  ): Promise<{ success: boolean; message: string; transaction?: WalletTransaction }> => {
    if (walletBalance < amount) {
      return {
        success: false,
        message: `Insufficient Wallet Balance. Order total is ${amount.toLocaleString()} RWF but wallet has ${walletBalance.toLocaleString()} RWF.`
      };
    }

    const prevBal = walletBalance;
    const newBal = prevBal - amount;
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const txn: WalletTransaction = {
      id: `txn-${Date.now()}`,
      referenceId: `TXN-ISH-${randomCode}`,
      userId: currentUser?.id || 'cust-demo',
      userName: currentUser?.fullName || 'Customer',
      type: 'Order Payment',
      amount: -amount,
      previousBalance: prevBal,
      newBalance: newBal,
      status: 'Completed',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethodUsed: 'Ishema Wallet',
      description: description || `Order Payment #${orderId}`,
      orderId,
      receiptNote: 'Instantly deducted from customer Ishema Wallet.'
    };

    setWalletBalance(newBal);
    localStorage.setItem('ishema_walletBalance', JSON.stringify(newBal));

    setWalletTransactions(prev => {
      const updated = [txn, ...prev];
      localStorage.setItem('ishema_walletTransactions', JSON.stringify(updated));
      return updated;
    });

    // Update admin customer record
    setAdminWalletAccounts(prev => prev.map(acc => {
      if (acc.userId === (currentUser?.id || 'cust-250-8819')) {
        return {
          ...acc,
          balance: newBal,
          totalSpent: (acc.totalSpent || 0) + amount
        };
      }
      return acc;
    }));

    setWalletNotification({
      title: 'Payment Confirmed ⚡',
      message: `${amount.toLocaleString()} RWF deducted from your Ishema Wallet. New Balance: ${newBal.toLocaleString()} RWF.`,
      type: 'success'
    });

    return { success: true, message: 'Payment successful', transaction: txn };
  };

  const refundOrderToWallet = async (
    orderId: string,
    amount: number,
    reason?: string
  ): Promise<WalletTransaction> => {
    const prevBal = walletBalance;
    const newBal = prevBal + amount;
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const txn: WalletTransaction = {
      id: `txn-${Date.now()}`,
      referenceId: `TXN-ISH-${randomCode}`,
      userId: currentUser?.id || 'cust-demo',
      userName: currentUser?.fullName || 'Customer',
      type: 'Refund',
      amount,
      previousBalance: prevBal,
      newBalance: newBal,
      status: 'Completed',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethodUsed: 'Ishema Wallet',
      description: `Refund Approved for Order #${orderId}`,
      orderId,
      receiptNote: reason || 'Instant refund credited back to Ishema Wallet.'
    };

    setWalletBalance(newBal);
    localStorage.setItem('ishema_walletBalance', JSON.stringify(newBal));

    setWalletTransactions(prev => {
      const updated = [txn, ...prev];
      localStorage.setItem('ishema_walletTransactions', JSON.stringify(updated));
      return updated;
    });

    // Update order status in orders list
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: 'Cancelled' as OrderStatus,
          paymentStatus: 'Paid' as any,
          timeline: [
            ...ord.timeline,
            {
              status: 'Refunded to Ishema Wallet',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: 'Ishema Financial Operations',
              note: `Refund of ${amount.toLocaleString()} RWF issued to customer wallet. Reason: ${reason || 'Customer request / item cancelled'}.`
            }
          ]
        };
      }
      return ord;
    }));

    // Admin audit log
    const audit: AdminWalletAuditLog = {
      id: `audit-${Date.now()}`,
      adminEmail: 'support@ishema.rw',
      action: 'Manual Refund',
      targetUserId: currentUser?.id || 'cust-demo',
      targetUserName: currentUser?.fullName || 'Customer',
      amount,
      reason: `Refund for order ${orderId}: ${reason || 'Approved refund'}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setAdminAuditLogs(prev => [audit, ...prev]);

    setWalletNotification({
      title: 'Refund Approved 🎉',
      message: `${amount.toLocaleString()} RWF refunded to Ishema Wallet.\nPrevious Balance: ${prevBal.toLocaleString()} RWF ➔ New Balance: ${newBal.toLocaleString()} RWF.`,
      type: 'success'
    });

    return txn;
  };

  const sendMoneyFromWallet = async (
    recipientPhone: string,
    recipientName: string,
    amount: number,
    note?: string
  ): Promise<{ success: boolean; message: string }> => {
    if (walletBalance < amount) {
      return { success: false, message: 'Insufficient wallet balance.' };
    }
    const prevBal = walletBalance;
    const newBal = prevBal - amount;
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const txn: WalletTransaction = {
      id: `txn-${Date.now()}`,
      referenceId: `TXN-ISH-${randomCode}`,
      userId: currentUser?.id || 'cust-demo',
      userName: currentUser?.fullName || 'Customer',
      type: 'Withdrawal',
      amount: -amount,
      previousBalance: prevBal,
      newBalance: newBal,
      status: 'Completed',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethodUsed: 'Ishema Peer Transfer',
      description: `Sent to ${recipientName} (${recipientPhone})`,
      phoneOrAccount: recipientPhone,
      receiptNote: note || 'Peer-to-peer wallet transfer to Rwandan mobile number.'
    };

    setWalletBalance(newBal);
    localStorage.setItem('ishema_walletBalance', JSON.stringify(newBal));
    setWalletTransactions(prev => [txn, ...prev]);

    setWalletNotification({
      title: 'Transfer Completed 📲',
      message: `${amount.toLocaleString()} RWF sent to ${recipientName} (${recipientPhone}).`,
      type: 'success'
    });
    return { success: true, message: 'Money sent successfully' };
  };

  const convertRewardsToWallet = (pointsToConvert?: number): { success: boolean; creditedRWF: number; newBalance: number } => {
    const points = pointsToConvert || rewardPoints;
    if (points <= 0) {
      return { success: false, creditedRWF: 0, newBalance: walletBalance };
    }
    const creditedRWF = points; // 1 point = 1 RWF
    const prevBal = walletBalance;
    const newBal = prevBal + creditedRWF;

    setRewardPoints(prev => Math.max(0, prev - points));
    localStorage.setItem('ishema_rewardPoints', JSON.stringify(Math.max(0, rewardPoints - points)));

    setWalletBalance(newBal);
    localStorage.setItem('ishema_walletBalance', JSON.stringify(newBal));

    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const txn: WalletTransaction = {
      id: `txn-${Date.now()}`,
      referenceId: `TXN-ISH-${randomCode}`,
      userId: currentUser?.id || 'cust-demo',
      userName: currentUser?.fullName || 'Customer',
      type: 'Wallet Reward',
      amount: creditedRWF,
      previousBalance: prevBal,
      newBalance: newBal,
      status: 'Completed',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethodUsed: 'Ishema Reward System',
      description: `Rewards Converted to Cash Balance (${points} Points)`,
      receiptNote: 'Converted from customer loyalty points into spendable Rwandan Francs.'
    };

    setWalletTransactions(prev => [txn, ...prev]);

    setWalletNotification({
      title: 'Congratulations! 🎉',
      message: `You earned ${creditedRWF.toLocaleString()} RWF in Ishema Rewards.\nNew Wallet Balance: ${newBal.toLocaleString()} RWF.`,
      type: 'success'
    });

    return { success: true, creditedRWF, newBalance: newBal };
  };

  // Admin Wallet Operations
  const adminIssueCredit = (userId: string, amount: number, reason: string) => {
    const target = adminWalletAccounts.find(a => a.userId === userId) || { name: 'Customer' };
    const audit: AdminWalletAuditLog = {
      id: `audit-${Date.now()}`,
      adminEmail: 'finance@ishema.rw',
      action: 'Credit Issued',
      targetUserId: userId,
      targetUserName: target.name,
      amount,
      reason,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setAdminAuditLogs(prev => [audit, ...prev]);

    // If target is current logged in user, credit wallet immediately
    if (currentUser?.id === userId) {
      const prevBal = walletBalance;
      const newBal = prevBal + amount;
      setWalletBalance(newBal);
      const txn: WalletTransaction = {
        id: `txn-${Date.now()}`,
        referenceId: `TXN-ISH-${Math.floor(10000 + Math.random() * 90000)}`,
        userId,
        userName: currentUser.fullName,
        type: 'Wallet Reward',
        amount,
        previousBalance: prevBal,
        newBalance: newBal,
        status: 'Completed',
        date: 'Today',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        paymentMethodUsed: 'Admin Courtesy Credit',
        description: `Courtesy Store Credit: ${reason}`,
        receiptNote: 'Approved by Ishema platform administration.'
      };
      setWalletTransactions(prev => [txn, ...prev]);
    }
  };

  const adminProcessManualRefund = (orderId: string, userId: string, amount: number, reason: string) => {
    const target = adminWalletAccounts.find(a => a.userId === userId) || { name: 'Customer' };
    const audit: AdminWalletAuditLog = {
      id: `audit-${Date.now()}`,
      adminEmail: 'operations@ishema.rw',
      action: 'Manual Refund',
      targetUserId: userId,
      targetUserName: target.name,
      amount,
      reason: `Order ${orderId}: ${reason}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setAdminAuditLogs(prev => [audit, ...prev]);

    if (currentUser?.id === userId) {
      refundOrderToWallet(orderId, amount, reason);
    }
  };

  // Smart Landmark Delivery
  const [landmarkDetails, setLandmarkDetails] = useState<LandmarkDeliveryDetails>(() =>
    loadStored('landmarkDetails', DEFAULT_LANDMARK_DETAILS)
  );
  const updateLandmarkDetails = (details: Partial<LandmarkDeliveryDetails>) => {
    setLandmarkDetails(prev => {
      const next = { ...prev, ...details };
      localStorage.setItem('ishema_landmarkDetails', JSON.stringify(next));
      return next;
    });
  };

  // Emergency Delivery Priority ("Deliver Now" 15-30m)
  const [isEmergencyDelivery, setIsEmergencyDelivery] = useState<boolean>(false);

  // Smart Delivery Pooling (Neighborhood Batching - 50% off)
  const [isNeighborhoodPooling, setIsNeighborhoodPooling] = useState<boolean>(true);

  // Signature Innovation: "Tell Ishema What You Need"
  const [tellIshemaQuery, setTellIshemaQuery] = useState<string>('');
  const [tellIshemaResult, setTellIshemaResult] = useState<any | null>(null);
  const [isTellIshemaLoading, setIsTellIshemaLoading] = useState<boolean>(false);

  // Group Orders
  const [groupOrders, setGroupOrders] = useState<GroupOrder[]>(() =>
    loadStored('groupOrders', MOCK_GROUP_ORDERS)
  );
  const [activeGroupOrder, setActiveGroupOrder] = useState<GroupOrder | null>(groupOrders[0] || null);

  // Product Requests ("Request Anything")
  const [productRequests, setProductRequests] = useState<ProductRequest[]>(() =>
    loadStored('productRequests', MOCK_PRODUCT_REQUESTS)
  );

  // Neighborhood Stores & Community Hubs
  const [neighborhoodStores] = useState<NeighborhoodStore[]>(MOCK_NEIGHBORHOOD_STORES);
  const [selectedStore, setSelectedStore] = useState<NeighborhoodStore | null>(null);
  const [communityHubs] = useState<CommunityHub[]>(MOCK_COMMUNITY_HUBS);
  const [selectedHub, setSelectedHub] = useState<CommunityHub | null>(null);

  // Deals & Smart Basket
  const [deals] = useState<DealItem[]>(MOCK_DEALS);
  const [smartBasketPresets] = useState<SmartBasketPreset[]>(SMART_BASKET_PRESETS);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('ishema_groupOrders', JSON.stringify(groupOrders));
  }, [groupOrders]);

  useEffect(() => {
    localStorage.setItem('ishema_productRequests', JSON.stringify(productRequests));
  }, [productRequests]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('ishema_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('ishema_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ishema_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ishema_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ishema_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ishema_isSurpriseGiftMode', JSON.stringify(isSurpriseGiftMode));
  }, [isSurpriseGiftMode]);

  useEffect(() => {
    localStorage.setItem('ishema_surpriseConfig', JSON.stringify(surpriseConfig));
  }, [surpriseConfig]);

  const updateSurpriseConfig = (updates: Partial<SurpriseGiftConfig>) => {
    setSurpriseConfig(prev => ({ ...prev, ...updates }));
  };

  // Cart Computations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Unique stores in cart & Multi-store breakdown
  const uniqueStoresInCart = React.useMemo(() => {
    const storeMap = new Map<string, { sellerName: string; itemCount: number; subtotal: number }>();
    cart.forEach(item => {
      const seller = item.product.seller?.name || 'Ishema Partner Merchant';
      const existing = storeMap.get(seller);
      if (existing) {
        existing.itemCount += item.quantity;
        existing.subtotal += item.product.price * item.quantity;
      } else {
        storeMap.set(seller, {
          sellerName: seller,
          itemCount: item.quantity,
          subtotal: item.product.price * item.quantity
        });
      }
    });
    return Array.from(storeMap.values());
  }, [cart]);

  const isMultiStore = uniqueStoresInCart.length > 1;
  const multiStoreExtraFee = isMultiStore ? (uniqueStoresInCart.length - 1) * 600 : 0;
  const multiStoreDiscount = isMultiStore ? 600 : 0;

  const matchedLoc = RWANDA_LOCATIONS.find(l => l.sector.toLowerCase().includes(selectedLocation.toLowerCase()));
  const baseDeliveryFee = cart.length > 0 ? (matchedLoc ? matchedLoc.fee : 1200) : 0;

  // Neighborhood pooling discount: 50% off delivery fee
  const poolingDiscount = isNeighborhoodPooling && cart.length > 0 ? Math.round(baseDeliveryFee * 0.5) : 0;

  // Emergency delivery priority fee: +1,500 RWF for 15-30 min express dispatch
  const emergencyFee = isEmergencyDelivery && cart.length > 0 ? 1500 : 0;

  const estimatedDeliveryFee = Math.max(0, baseDeliveryFee + multiStoreExtraFee - poolingDiscount + emergencyFee);

  // Gift wrapping and add-ons pricing
  const selectedWrap = GIFT_WRAPPING_OPTIONS.find(w => w.id === surpriseConfig.giftWrappingStyle);
  const giftPackagingFee = isSurpriseGiftMode ? (selectedWrap ? selectedWrap.price : 3000) : 0;
  const addOnsFee = isSurpriseGiftMode
    ? surpriseConfig.selectedAddOns.reduce((sum, addOnId) => {
        const item = SURPRISE_ADDONS.find(a => a.id === addOnId);
        return sum + (item ? item.price : 0);
      }, 0)
    : 0;

  // Points redemption discount
  const pointsDiscount = Math.min(pointsRedeemed, cartSubtotal);

  const cartTotal = Math.max(0, cartSubtotal + estimatedDeliveryFee + giftPackagingFee + addOnsFee - pointsDiscount);

  // Add Curated Surprise Package to Cart
  const addPackageToCart = (pkg: SurpriseGiftPackage) => {
    const packageProduct: Product = {
      id: pkg.id,
      name: pkg.name,
      slug: pkg.id,
      categoryId: 'cat-gifts',
      subcategoryId: 'sub-surprise-packages',
      nestedType: pkg.category,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      discountPercentage: pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : undefined,
      rating: 5.0,
      reviewsCount: 42,
      seller: {
        name: 'Ishema Surprise Gifting Atelier',
        location: 'Kigali City Center',
        verified: true,
        rating: 5.0,
        phone: '+250 788 310 000'
      },
      stock: 20,
      inStock: true,
      images: [pkg.image],
      shortDescription: pkg.tagline,
      description: pkg.longDescription,
      specifications: {
        'Package': pkg.name,
        'Occasion': pkg.occasion,
        'Contents': pkg.items.join(' • '),
        'Delivery Type': 'Secret Delivery (Sender Hidden)'
      },
      estimatedDeliveryTime: 'Same-Day / Scheduled Delivery',
      deliveryFee: 1500,
      badge: pkg.badge || 'Surprise Gift',
      isFeatured: true,
      isPopular: true
    };

    addToCart(packageProduct, 1, {
      'Gift Bundle': pkg.name,
      'Celebration Occasion': pkg.occasion
    });
    setIsSurpriseGiftMode(true);
    updateSurpriseConfig({
      occasion: pkg.occasion,
      isSurprise: true
    });
    setIsCartOpen(true);
  };

  const openSurpriseReveal = (orderIdOrTracking?: string) => {
    const found = (orderIdOrTracking ? orders.find(
      o => (o.id.toLowerCase() === orderIdOrTracking.toLowerCase() ||
           o.trackingNumber.toLowerCase() === orderIdOrTracking.toLowerCase()) &&
           o.isSurprise
    ) : null) || orders.find(o => o.isSurprise);

    if (found) {
      setActiveSurpriseOrder(found);
      setCurrentView('surprise-reveal');
    } else {
      setCurrentView('surprise-reveal');
    }
  };

  const markSurpriseRevealed = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId && order.surpriseConfig) {
        return {
          ...order,
          surpriseConfig: {
            ...order.surpriseConfig,
            isRevealed: true
          }
        };
      }
      return order;
    }));
    if (activeSurpriseOrder && activeSurpriseOrder.id === orderId && activeSurpriseOrder.surpriseConfig) {
      setActiveSurpriseOrder({
        ...activeSurpriseOrder,
        surpriseConfig: {
          ...activeSurpriseOrder.surpriseConfig,
          isRevealed: true
        }
      });
    }
  };

  const reportSurpriseOrder = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId && order.surpriseConfig) {
        return {
          ...order,
          surpriseConfig: {
            ...order.surpriseConfig,
            reportedUnwanted: true
          },
          timeline: [
            ...order.timeline,
            {
              status: 'Recipient Inquiry Logged',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: 'Trust & Safety Desk',
              note: `Recipient feedback registered: "${reason}". Support agent notified.`
            }
          ]
        };
      }
      return order;
    }));
  };

  const sendThankYouNote = (orderId: string, note: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId && order.surpriseConfig) {
        return {
          ...order,
          surpriseConfig: {
            ...order.surpriseConfig,
            thankYouNote: note
          },
          timeline: [
            ...order.timeline,
            {
              status: 'Thank-You Note Transmitted',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: 'Ishema Message Relay',
              note: `Recipient transmitted thank-you note: "${note}"`
            }
          ]
        };
      }
      return order;
    }));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variations?: Record<string, string>) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selectedVariations: variations || next[existingIndex].selectedVariations
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedVariations: variations }];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Place customer order with Landmark, Pooling, Multi-store, and Rewards
  const placeOrder = (orderData: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    district: string;
    notes?: string;
    paymentMethod: 'Ishema Wallet' | 'MTN Mobile Money' | 'Airtel Money' | 'Cash on Delivery' | 'Card' | 'Split (Wallet + MoMo)';
    walletDeduction?: number;
    splitPaymentMethod?: string;
    splitPaymentAmount?: number;
    overrideSurpriseConfig?: SurpriseGiftConfig;
    landmarkDetails?: LandmarkDeliveryDetails;
    isEmergencyPriority?: boolean;
    poolingDiscount?: number;
    pointsRedeemed?: number;
  }): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `ISH-RW-${randomNum}`;
    const orderId = `ORD-RW-${randomNum}`;

    const activeConfig = orderData.overrideSurpriseConfig || (isSurpriseGiftMode ? surpriseConfig : undefined);
    const isSurprise = Boolean(activeConfig && activeConfig.isSurprise);

    // If surprise, sanitize customer details so recipient never sees sender info!
    const customerDetails = isSurprise
      ? {
          fullName: 'A Surprise Gift from Ishema Express',
          phone: activeConfig!.recipientPhone,
          email: orderData.email || 'secret-gift@ishemaexpress.rw',
          address: activeConfig!.deliveryAddress,
          district: activeConfig!.deliveryDistrict,
          notes: `SECRET SURPRISE DELIVERY: Recipient: ${activeConfig!.recipientName}. Protocol: Never reveal sender name. Landmark: ${activeConfig!.landmarkInstructions || 'None provided'}`
        }
      : orderData;

    const usedLandmark = orderData.landmarkDetails || landmarkDetails;
    const finalDeliveryFee = estimatedDeliveryFee;

    const newOrder: Order = {
      id: orderId,
      trackingNumber: trackingCode,
      customer: customerDetails,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: finalDeliveryFee,
      total: cartTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      walletDeduction: orderData.walletDeduction,
      splitPaymentMethod: orderData.splitPaymentMethod,
      splitPaymentAmount: orderData.splitPaymentAmount,
      status: 'Order Placed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      isSurprise,
      surpriseConfig: isSurprise ? {
        ...activeConfig!,
        deliveryOtp: activeConfig!.deliveryOtp || `${Math.floor(1000 + Math.random() * 9000)}`
      } : undefined,
      landmarkDetails: usedLandmark,
      isEmergencyPriority: orderData.isEmergencyPriority || isEmergencyDelivery,
      isMultiStore,
      poolingDiscount: orderData.poolingDiscount || poolingDiscount,
      pointsRedeemed: orderData.pointsRedeemed || pointsRedeemed,
      timeline: [
        {
          status: 'Order Placed',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: isSurprise ? 'Ishema Surprise Gift Atelier' : 'Ishema Express Web',
          note: isSurprise
            ? `Surprise Gift order initiated for ${activeConfig!.recipientName}. Sender details confidential.`
            : `Order registered via ${orderData.paymentMethod}. ${orderData.walletDeduction ? `(Wallet: ${orderData.walletDeduction.toLocaleString()} RWF deducted).` : ''} ${isMultiStore ? `Coordinating ${uniqueStoresInCart.length} store pickups.` : ''} Landmark: ${usedLandmark.nearbyLandmark || 'Standard'}`
        }
      ]
    };

    // Auto-process wallet deduction if paid by wallet or split payment
    if (orderData.paymentMethod === 'Ishema Wallet') {
      payWithWallet(cartTotal, orderId, `E-Commerce Order #${orderId}`);
    } else if (orderData.paymentMethod === 'Split (Wallet + MoMo)' && orderData.walletDeduction) {
      payWithWallet(orderData.walletDeduction, orderId, `Split Payment (${orderData.walletDeduction.toLocaleString()} RWF Wallet + MoMo) #${orderId}`);
    }

    setOrders(prev => [newOrder, ...prev]);
    // Reward points for order: 1 pt per 100 RWF
    earnPoints(cartSubtotal);
    if (pointsRedeemed > 0) {
      setRewardPoints(prev => Math.max(0, prev - pointsRedeemed));
      setPointsRedeemed(0);
    }
    clearCart();
    setActiveTrackingNumber(trackingCode);
    if (isSurprise) {
      setActiveSurpriseOrder(newOrder);
    }
    return newOrder;
  };

  // Signature Innovation: "Tell Ishema What You Need"
  const executeTellIshema = async (queryText: string) => {
    setIsTellIshemaLoading(true);
    setTellIshemaQuery(queryText);
    try {
      const res = await fetch('/api/tell-ishema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          userLocation: selectedLocation
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          const normalized = queryText.toLowerCase();
          const catalogMatches = products.filter(p => {
            const text = (p.name + ' ' + p.description + ' ' + p.categoryId + ' ' + (p.seller?.name || '')).toLowerCase();
            return normalized.split(' ').some(word => word.length > 3 && text.includes(word));
          });
          const resultData = {
            ...json.data,
            matchedProducts: catalogMatches.length > 0 ? catalogMatches.slice(0, 4) : products.slice(0, 3)
          };
          setTellIshemaResult(resultData);
          setIsTellIshemaLoading(false);
          return resultData;
        }
      }
    } catch {
      // Fallback
    }

    // Local Rwandan context parser
    const lower = queryText.toLowerCase();
    let budget = 25000;
    const budgetMatch = queryText.match(/(\d+[\d,.]*)\s*(?:rwf|frw|k)?/i);
    if (budgetMatch) {
      const numStr = budgetMatch[1].replace(/,/g, '');
      const val = parseInt(numStr, 10);
      if (!isNaN(val)) {
        budget = val < 100 ? val * 1000 : val;
      }
    }

    let partySize = 2;
    if (lower.includes('four') || lower.includes('4')) partySize = 4;
    else if (lower.includes('five') || lower.includes('5')) partySize = 5;
    else if (lower.includes('three') || lower.includes('3')) partySize = 3;
    else if (lower.includes('six') || lower.includes('6')) partySize = 6;
    else if (lower.includes('alone') || lower.includes('one') || lower.includes('1')) partySize = 1;

    let matched = products.filter(p => {
      const pText = (p.name + ' ' + p.description + ' ' + (p.seller?.name || '')).toLowerCase();
      if (lower.includes('dinner') || lower.includes('food') || lower.includes('brochette') || lower.includes('eat')) {
        return p.categoryId === 'cat-food' || pText.includes('potato') || pText.includes('coffee') || pText.includes('fruit');
      }
      if (lower.includes('gift') || lower.includes('mother') || lower.includes('birthday')) {
        return p.categoryId === 'cat-gifts' || p.categoryId === 'cat-fashion' || p.badge?.includes('Gift');
      }
      if (lower.includes('groceries') || lower.includes('vegetable') || lower.includes('musanze')) {
        return p.categoryId === 'cat-fresh' || pText.includes('potato') || pText.includes('honey');
      }
      if (lower.includes('phone') || lower.includes('charger') || lower.includes('tech')) {
        return p.categoryId === 'cat-electronics' || pText.includes('charger') || pText.includes('cable');
      }
      return true;
    });

    if (matched.length === 0) {
      matched = products.slice(0, 3);
    } else {
      matched = matched.slice(0, 4);
    }

    const calculatedSubtotal = matched.reduce((s, p) => s + p.price, 0);

    const localResult = {
      assistantMessage: `Muraho! I analyzed your request for "${queryText}". Here is a tailored plan for ${partySize} people within your ${budget.toLocaleString()} RWF budget, sourcing verified Rwandan items.`,
      detectedBudget: budget,
      detectedPartySize: partySize,
      urgency: lower.includes('urgent') || lower.includes('today') || lower.includes('now') ? 'Emergency Delivery (15-30m)' : 'Standard 30-45m Express',
      recommendations: matched.map(m => ({
        name: m.name,
        estimatedPriceRWF: m.price,
        seller: m.seller?.name || 'Verified Rwandan Merchant',
        deliveryFeeRWF: m.deliveryFee || 1200,
        estimatedDeliveryTime: m.estimatedDeliveryTime || '30-45 mins',
        rating: m.rating,
        reason: `Popular choice in ${selectedLocation}, highly rated by Rwandan customers.`
      })),
      matchedProducts: matched,
      totalEstimatedCostRWF: calculatedSubtotal,
      deliveryPlan: `Consolidated single-courier delivery to ${selectedLocation} with smart landmark tracking.`
    };

    setTellIshemaResult(localResult);
    setIsTellIshemaLoading(false);
    return localResult;
  };

  // Smart Basket Loader
  const loadSmartBasketToCart = (presetId: string) => {
    const preset = smartBasketPresets.find(p => p.id === presetId);
    if (!preset) return;
    preset.items.forEach(basketItem => {
      addToCart(basketItem.product, basketItem.quantity);
    });
    setIsCartOpen(true);
  };

  // Group Ordering Actions
  const createGroupOrder = (data: Partial<GroupOrder>): GroupOrder => {
    const randomCode = `KGL-${Math.floor(100 + Math.random() * 900)}`;
    const newGroup: GroupOrder = {
      id: `grp-${Date.now()}`,
      shareCode: randomCode,
      title: data.title || 'Office Lunch & Refreshments',
      hostName: data.hostName || 'Eric M.',
      hostPhone: data.hostPhone || '+250 788 123 456',
      deliveryLocation: data.deliveryLocation || `${selectedLocation}, Kigali`,
      status: 'collecting',
      cutoffTime: data.cutoffTime || '12:30 PM',
      billSplitMode: data.billSplitMode || 'split_momo',
      members: data.members || [
        {
          id: 'mem-1',
          name: data.hostName || 'Eric M. (Host)',
          phone: data.hostPhone || '+250 788 123 456',
          items: cart.length > 0 ? [...cart] : [],
          subtotal: cartSubtotal,
          isHost: true,
          hasPaid: false
        }
      ],
      totalSubtotal: cartSubtotal,
      deliveryFee: estimatedDeliveryFee,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setGroupOrders(prev => [newGroup, ...prev]);
    setActiveGroupOrder(newGroup);
    return newGroup;
  };

  const joinGroupOrder = (code: string, memberName: string, phone?: string): boolean => {
    const group = groupOrders.find(g => (g.shareCode || g.code || '').toUpperCase() === code.toUpperCase().trim());
    if (!group) return false;
    const newMember = {
      id: `mem-${Date.now()}`,
      name: memberName,
      phone: phone || '+250 788 000 000',
      items: [],
      subtotal: 0,
      isHost: false,
      hasPaid: false
    };
    const updated = {
      ...group,
      members: [...group.members, newMember]
    };
    setGroupOrders(prev => prev.map(g => g.id === group.id ? updated : g));
    setActiveGroupOrder(updated);
    return true;
  };

  const addItemToGroupOrder = (groupCode: string, memberId: string, product: Product) => {
    setGroupOrders(prev => prev.map(group => {
      if ((group.shareCode || group.code || '').toUpperCase() !== groupCode.toUpperCase()) return group;
      const updatedMembers = group.members.map(member => {
        if (member.id !== memberId) return member;
        const existingItem = member.items.find(i => i.product.id === product.id);
        const updatedItems = existingItem
          ? member.items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
          : [...member.items, { product, quantity: 1 }];
        const newSubtotal = updatedItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
        return { ...member, items: updatedItems, subtotal: newSubtotal };
      });
      const newTotal = updatedMembers.reduce((s, m) => s + m.subtotal, 0);
      return { ...group, members: updatedMembers, totalSubtotal: newTotal };
    }));
  };

  // Product Requests ("Request Anything")
  const submitProductRequest = (reqData: Omit<ProductRequest, 'id' | 'createdAt' | 'status'>): ProductRequest => {
    const newReq: ProductRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'searching',
      createdAt: 'Just now',
      offersReceived: [
        {
          storeName: 'Kigali Central Hardware & Tech',
          storePhone: '+250 788 333 444',
          price: reqData.targetBudget ? Math.round(reqData.targetBudget * 0.95) : 18000,
          etaMinutes: 45,
          verified: true
        }
      ]
    };
    setProductRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  // Courier booking
  const createCourierBooking = (
    bookingData: Omit<DeliveryBooking, 'id' | 'trackingNumber' | 'status' | 'createdAt' | 'timeline'>
  ): DeliveryBooking => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `ISH-RW-${randomNum}`;
    const bookingId = `BKG-RW-${randomNum}`;

    const newBooking: DeliveryBooking = {
      ...bookingData,
      id: bookingId,
      trackingNumber: trackingCode,
      status: 'Order Received',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      timeline: [
        {
          status: 'Order Received',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: bookingData.pickupDistrict || 'Kigali Dispatch',
          note: `Courier request created for ${bookingData.packageType} (${bookingData.paymentMethod || 'Paid'}).`
        }
      ]
    };

    if (bookingData.paymentMethod === 'Ishema Wallet') {
      payWithWallet(bookingData.fee, bookingId, `Courier Delivery Fee #${bookingId}`);
    }

    setBookings(prev => [newBooking, ...prev]);
    setActiveTrackingNumber(trackingCode);
    return newBooking;
  };

  // Status updates
  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const newEvent = {
          status,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: ord.assignedDriver ? `${ord.assignedDriver.name} on route` : 'Kigali Logistics Hub',
          note: note || `Status updated to ${status}`
        };
        return {
          ...ord,
          status,
          timeline: [...ord.timeline, newEvent]
        };
      })
    );
  };

  const updateCourierStatus = (bookingId: string, status: CourierStatus, note?: string) => {
    setBookings(prev =>
      prev.map(bkg => {
        if (bkg.id !== bookingId) return bkg;
        const newEvent = {
          status,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: bkg.assignedDriver ? `${bkg.assignedDriver.name} (In Transit)` : 'Ishema Dispatch',
          note: note || `Courier status progressed to ${status}`
        };
        return {
          ...bkg,
          status,
          timeline: [...bkg.timeline, newEvent]
        };
      })
    );
  };

  const assignDriverToOrder = (orderId: string, driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) return;
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          assignedDriver: driver,
          status: ord.status === 'Order Placed' || ord.status === 'Payment Confirmed' ? 'Driver Assigned' : ord.status,
          timeline: [
            ...ord.timeline,
            {
              status: 'Driver Assigned',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: driver.currentZone,
              note: `${driver.name} assigned with ${driver.vehicle}`
            }
          ]
        };
      })
    );
  };

  const assignDriverToBooking = (bookingId: string, driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) return;
    setBookings(prev =>
      prev.map(bkg => {
        if (bkg.id !== bookingId) return bkg;
        return {
          ...bkg,
          assignedDriver: driver,
          status: 'Driver Assigned',
          timeline: [
            ...bkg.timeline,
            {
              status: 'Driver Assigned',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: driver.currentZone,
              note: `${driver.name} assigned with ${driver.vehicle}`
            }
          ]
        };
      })
    );
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);

    // Update subcategory count
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== newProduct.categoryId) return cat;
        return {
          ...cat,
          subcategories: cat.subcategories.map(sub =>
            sub.id === newProduct.subcategoryId ? { ...sub, itemCount: (sub.itemCount || 0) + 1 } : sub
          )
        };
      })
    );

    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Category CRUD
  const addCategory = (categoryData: Omit<Category, 'id'>): Category => {
    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addSubcategory = (categoryId: string, subcategoryData: Omit<Subcategory, 'id' | 'categoryId'>) => {
    const newSub: Subcategory = {
      ...subcategoryData,
      id: `sub-${Date.now()}`,
      categoryId
    };
    setCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, subcategories: [...cat.subcategories, newSub] } : cat))
    );
  };

  const deleteSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, subcategories: cat.subcategories.filter(s => s.id !== subcategoryId) }
          : cat
      )
    );
  };

  const bulkImportProducts = (productsToImport: Product[]) => {
    setProducts(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const newItems = productsToImport.filter(p => !existingIds.has(p.id));
      return [...newItems, ...prev];
    });
  };

  const quickUpdateProductPriceStock = (productId: string, newPrice: number, newStock: number, priceSource?: string) => {
    const now = new Date();
    const timeStr = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        return {
          ...p,
          price: newPrice,
          stock: newStock,
          inStock: newStock > 0,
          status: newStock <= 0 ? 'Out of Stock' : (newStock < 10 ? 'Low Stock' : 'Active'),
          lastUpdated: timeStr,
          priceSource: priceSource || p.priceSource || 'Admin Quick Update'
        };
      })
    );
  };

  const showNotification = (title: string, message: string) => {
    setWalletNotification({
      title,
      message,
      type: 'info'
    });
  };

  const resetToDemoData = () => {
    setCategories(INITIAL_CATEGORIES);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setBookings(INITIAL_BOOKINGS);
    setCart([]);
    localStorage.clear();
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView: handleSetCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedNestedType,
        setSelectedNestedType,
        selectedProduct,
        setSelectedProduct,
        selectedProductId,
        setSelectedProductId,
        navigateToProduct,
        isProductLoading,

        searchQuery,
        setSearchQuery,
        activeTrackingNumber,
        setActiveTrackingNumber,

        categories,
        products,
        orders,
        bookings,
        drivers,
        activeDriverId,
        setActiveDriverId,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        selectedLocation,
        setSelectedLocation,
        estimatedDeliveryFee,
        baseDeliveryFee,
        giftPackagingFee,
        addOnsFee,
        cartTotal,
        uniqueStoresInCart,
        isMultiStore,
        multiStoreDiscount,

        landmarkDetails,
        updateLandmarkDetails,

        isEmergencyDelivery,
        setIsEmergencyDelivery,
        isNeighborhoodPooling,
        setIsNeighborhoodPooling,
        poolingDiscount,

        rewardPoints,
        pointsRedeemed,
        setPointsRedeemed,
        earnPoints,

        isLowDataMode,
        setIsLowDataMode,
        toggleLowDataMode,

        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isBecomeDriverModalOpen,
        setIsBecomeDriverModalOpen,
        isSearchByPhotoOpen,
        setIsSearchByPhotoOpen,
        isRequestProductOpen,
        setIsRequestProductOpen,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        isGroupOrderModalOpen,
        setIsGroupOrderModalOpen,
        isWalletModalOpen,
        setIsWalletModalOpen,
        isAnimateRiderModalOpen,
        setIsAnimateRiderModalOpen,
        isInnovationsGuideOpen,
        setIsInnovationsGuideOpen,

        // Customer Account & Authentication
        currentUser,
        isLoggedIn,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        login,
        register,
        verifyOtp,
        logout,
        logoutAllDevices,
        updateUserProfile,
        addSavedAddress,
        updateSavedAddress,
        deleteSavedAddress,
        setDefaultAddress,
        toggleFavoriteProduct,
        isProductFavorited,
        updateNotificationPrefs,
        updateSecuritySettings,
        setWalletPin,
        verifyWalletPin,

        // Ishema Wallet Operations
        walletBalance,
        walletTransactions,
        isAddMoneyModalOpen,
        setIsAddMoneyModalOpen,
        isPinModalOpen,
        setIsPinModalOpen,
        isSendMoneyModalOpen,
        setIsSendMoneyModalOpen,
        selectedReceiptTransaction,
        setSelectedReceiptTransaction,
        walletNotification,
        clearWalletNotification,
        addMoneyToWallet,
        payWithWallet,
        refundOrderToWallet,
        sendMoneyFromWallet,
        convertRewardsToWallet,

        // Admin Wallet
        adminWalletAccounts,
        adminAuditLogs,
        adminIssueCredit,
        adminProcessManualRefund,

        tellIshemaQuery,
        setTellIshemaQuery,
        tellIshemaResult,
        setTellIshemaResult,
        isTellIshemaLoading,
        executeTellIshema,

        groupOrders,
        activeGroupOrder,
        setActiveGroupOrder,
        createGroupOrder,
        joinGroupOrder,
        addItemToGroupOrder,

        productRequests,
        submitProductRequest,

        neighborhoodStores,
        selectedStore,
        setSelectedStore,
        communityHubs,
        selectedHub,
        setSelectedHub,

        deals,
        smartBasketPresets,
        loadSmartBasketToCart,

        // Surprise Gift
        isSurpriseGiftMode,
        setIsSurpriseGiftMode,
        surpriseConfig,
        updateSurpriseConfig,
        activeSurpriseOrder,
        setActiveSurpriseOrder,
        addPackageToCart,
        openSurpriseReveal,
        markSurpriseRevealed,
        reportSurpriseOrder,
        sendThankYouNote,

        placeOrder,
        createCourierBooking,
        updateOrderStatus,
        updateCourierStatus,
        assignDriverToOrder,
        assignDriverToBooking,

        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addSubcategory,
        deleteSubcategory,
        supermarketStores: SUPERMARKET_STORES,
        bulkImportProducts,
        quickUpdateProductPriceStock,
        showNotification,

        // Support Tracking
        supportInteractions,
        trackWhatsAppSupportClick,
        whatsAppSupportCount,
        clearSupportInteractions,

        resetToDemoData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
