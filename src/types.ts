export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  nestedTypes?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  subcategories: Subcategory[];
}

export interface ProductVariation {
  name: string;
  options: string[];
}

export interface ProductSeller {
  id?: string;
  name: string;
  location?: string;
  verified: boolean;
  rating: number;
  phone: string;
}

export interface StoreOffer {
  storeId: string;
  storeName: string;
  storeLogo?: string;
  price: number; // in RWF
  originalPrice?: number;
  inStock: boolean;
  stockQuantity: number;
  deliveryTime: string;
  deliveryFee: number;
  unit?: string;
  lastUpdated?: string;
}

export interface SupermarketStore {
  id: string;
  name: string;
  slug: string;
  logo: string;
  bannerImage?: string;
  district: string;
  sector: string;
  address: string;
  location: { lat: number; lng: number };
  contactPhone: string;
  contactEmail: string;
  openingHours: string;
  isOpen: boolean;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  promotions: string[];
  totalProductsCount?: number;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategoryId: string;
  nestedType?: string;
  brand?: string;
  unit?: string; // piece, kg, gram, litre, pack, bottle, etc.
  price: number; // in RWF
  originalPrice?: number; // in RWF
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  seller: ProductSeller;
  storeId?: string;
  storeName?: string;
  storeOffers?: StoreOffer[];
  stock: number;
  inStock: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  variations?: ProductVariation[];
  estimatedDeliveryTime: string;
  deliveryFee: number; // in RWF
  badge?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isMadeInRwanda?: boolean;
  originDistrict?: string;
  lastUpdated?: string; // e.g. "2026-09-22 08:30 AM"
  priceSource?: string; // e.g. "Simba Supermarket (Kigali CBD)", "Sawa City Kimihurura", "Ndoli Supermarket"
  deliveryAvailability?: 'Immediate Express' | 'Same Day' | 'Next Day' | 'Instant' | 'Scheduled' | 'Out of Stock';
  barcode?: string;
  status?: 'Active' | 'Low Stock' | 'Out of Stock' | 'Unavailable' | 'Draft';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariations?: Record<string, string>;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalDeliveries: number;
  vehicle: string;
  photo: string;
  currentZone: string;
  currentLocation?: { lat: number; lng: number };
  lat?: number;
  lng?: number;
  isAvailable?: boolean;
  status?: 'Available' | 'On Delivery' | 'Offline';
  heading?: number;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Order Confirmed'
  | 'Payment Confirmed'
  | 'Preparing'
  | 'Preparing Order'
  | 'Driver Assigned'
  | 'Picked Up'
  | 'On the Way'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export type CourierStatus =
  | 'Order Received'
  | 'Driver Assigned'
  | 'Picked Up'
  | 'In Transit'
  | 'Delivered';

export interface TimelineEvent {
  status: string;
  timestamp: string;
  location: string;
  note: string;
}

export interface SurpriseGiftAddOn {
  id: string;
  name: string;
  price: number;
  iconName: string;
  description: string;
  badge?: string;
}

export interface SurpriseGiftPackage {
  id: string;
  name: string;
  occasion: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  items: string[];
  badge?: string;
  popular?: boolean;
  category: string;
  longDescription: string;
}

export interface SurpriseGiftConfig {
  isSurprise: boolean;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  deliveryDistrict: string;
  landmarkInstructions: string;
  occasion: string;
  customOccasion?: string;
  scheduledDate: string;
  scheduledTimeWindow: string;
  secretMessage: string;
  secretLanguage: 'en' | 'rw' | 'fr';
  revealOption: 'keep_anonymous' | 'reveal_after_delivery' | 'reveal_scheduled';
  revealDateTime?: string;
  senderRealName?: string;
  senderRealPhone?: string;
  giftWrappingStyle: string;
  selectedAddOns: string[];
  deliveryOtp: string;
  isRevealed?: boolean;
  reportedUnwanted?: boolean;
  thankYouNote?: string;
}

export interface LandmarkDeliveryDetails {
  gpsLocation?: { lat: number; lng: number };
  gpsCoordinates?: { lat: number; lng: number; accuracyMeters?: number };
  streetAddress?: string;
  district?: string;
  sector?: string;
  nearbyLandmark?: string;
  landmark?: string;
  buildingName?: string;
  gateDescription?: string;
  writtenDirections?: string;
  deliveryInstructions?: string;
  instructions?: string;
  entrancePhotoUrl?: string;
  mapCoordinates?: { lat: number; lng: number };
}

export interface GroupOrderMember {
  id: string;
  name: string;
  phone: string;
  items: CartItem[];
  subtotal: number;
  paid?: boolean;
  isHost?: boolean;
  hasPaid?: boolean;
}

export interface GroupOrder {
  id: string;
  code?: string;
  shareCode?: string;
  title: string;
  hostName: string;
  hostPhone: string;
  location?: string;
  district?: string;
  landmark?: string;
  deliveryLocation?: string;
  status: 'Open' | 'Locked' | 'Order Placed' | 'collecting' | 'ordered' | 'delivered';
  cutoffTime?: string;
  billSplitMode?: string;
  members: GroupOrderMember[];
  targetDeliveryTime?: string;
  totalAmount?: number;
  totalSubtotal?: number;
  deliveryFee?: number;
  createdAt?: string;
}

export interface ProductRequest {
  id: string;
  description?: string;
  productDescription?: string;
  category: string;
  targetBudget?: number;
  urgency: string;
  customerName: string;
  customerPhone: string;
  location?: string;
  photoUrl?: string;
  status: 'Searching Partner Stores' | 'Found & Quoted' | 'Delivered' | 'searching' | 'fulfilled';
  matchedStore?: string;
  quotedPrice?: number;
  createdAt: string;
  offersReceived?: {
    storeName: string;
    storePhone: string;
    price: number;
    etaMinutes: number;
    verified: boolean;
  }[];
}

export interface NeighborhoodStore {
  id: string;
  name: string;
  category: 'Groceries & Fresh' | 'Pharmacy & Health' | 'Bakery & Cafe' | 'Electronics & Hardware' | 'Fashion & Crafts' | 'Farm Cooperative' | string;
  neighborhood: string;
  district: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  openHours: string;
  verified: boolean;
  trustedBadge: string;
  image?: string;
  photoUrl?: string;
  productCount: number;
  isLocalMaker: boolean;
  phone: string;
  momoCode?: string;
  estimatedDeliveryMinutes?: number;
  featuredProducts?: string[];
  popularItems?: string[];
}

export interface SmartBasketPreset {
  id: string;
  name?: string;
  title?: string;
  idealFor?: string;
  tagline?: string;
  targetBudget?: number;
  estimatedBudgetRWF?: number;
  peopleCount?: number;
  duration?: string;
  category?: string;
  description?: string;
  iconName?: string;
  items: {
    productId: string;
    productName?: string;
    quantity: number;
    unitPrice?: number;
    sellerName?: string;
    image?: string;
    category?: string;
    product?: Product;
  }[];
}

export interface DealItem {
  id: string;
  productId?: string;
  title: string;
  dealType?: 'Flash Sale' | 'Buy 1 Get 1' | 'Weekend Special' | 'Free Delivery' | 'Farmer Discount' | string;
  originalPrice: number;
  dealPrice?: number;
  discountedPrice?: number;
  discountBadge?: string;
  discountPercent?: number;
  isFlashDeal?: boolean;
  endsInMinutes?: number;
  seller?: string;
  image?: string;
  photoUrl?: string;
  stockLeft?: number;
  description: string;
}

export interface CommunityHub {
  id: string;
  name: string;
  type: 'Estate / Neighborhood' | 'University Campus' | 'Corporate Park / Towers' | 'Community Group';
  location: string;
  memberCount: number;
  activeMembers?: number;
  activeOrdersToday: number;
  dropOffPoint: string;
  popularItems: string[];
  conciergeDesk?: string;
  nextBatchDelivery?: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    district: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  poolingDiscount?: number;
  isEmergencyPriority?: boolean;
  isMultiStore?: boolean;
  pointsRedeemed?: number;
  total: number;
  paymentMethod: 'Ishema Wallet' | 'MTN Mobile Money' | 'Airtel Money' | 'Cash on Delivery' | 'Card' | 'Split (Wallet + MoMo)';
  paymentStatus: 'Pending' | 'Paid';
  walletDeduction?: number;
  splitPaymentMethod?: string;
  splitPaymentAmount?: number;
  status: OrderStatus;
  createdAt: string;
  assignedDriver?: Driver;
  timeline: TimelineEvent[];
  isSurprise?: boolean;
  surpriseConfig?: SurpriseGiftConfig;
  landmarkDetails?: LandmarkDeliveryDetails;
  pickupLocation?: { name: string; address: string; lat: number; lng: number };
  deliveryCoordinates?: { lat: number; lng: number };
  deliveryLocation?: { lat: number; lng: number; label?: string };
  estimatedMinutesAway?: number;
}

export interface DeliveryBooking {
  id: string;
  trackingNumber: string;
  senderName: string;
  senderPhone: string;
  pickupAddress: string;
  pickupDistrict: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  deliveryDistrict: string;
  packageType: 'Documents' | 'Parcel' | 'Fragile / Electronics' | 'Food & Groceries' | 'Heavy Cargo';
  vehicleType: 'Moto Express' | 'Standard Car' | 'Cargo Van';
  preferredTime: string;
  fee: number;
  status: CourierStatus;
  paymentMethod?: 'Ishema Wallet' | 'MTN Mobile Money' | 'Airtel Money' | 'Cash on Delivery' | 'Card';
  createdAt: string;
  estimatedArrival: string;
  assignedDriver?: Driver;
  notes?: string;
  timeline: TimelineEvent[];
  landmarkDetails?: LandmarkDeliveryDetails;
}

// ----------------------------------------------------
// CUSTOMER ACCOUNT & DIGITAL WALLET TYPES
// ----------------------------------------------------

export interface SavedAddress {
  id: string;
  label: string; // 'Home', 'Office', 'Family Residence', 'Warehouse'
  recipientName: string;
  phone: string;
  streetAddress: string;
  streetOrHouseNumber?: string;
  district: string;
  sector: string;
  landmark: string;
  landmarkInstructions?: string;
  directions?: string;
  isDefault: boolean;
}

export interface NotificationPreferences {
  smsAlerts: boolean;
  smsUpdates?: boolean;
  whatsAppUpdates: boolean;
  whatsappUpdates?: boolean;
  emailReceipts: boolean;
  promoOffers: boolean;
  promotionalAlerts?: boolean;
  orderStatusLive: boolean;
  walletActivityAlerts: boolean;
}

export interface SecuritySettings {
  twoFactorOtpLogin: boolean;
  twoFactorEnabled?: boolean;
  requirePinForPayments: boolean;
  walletPinSet: boolean;
  walletPin?: string; // e.g. 4-digit PIN
  biometricPrompt: boolean;
  fraudAlerts: boolean;
  dailySpendingLimitRWF: number;
}

export interface DeviceSession {
  id: string;
  device: string;
  deviceName?: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  createdAt: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  addresses: SavedAddress[];
  defaultAddressId?: string;
  favoriteProductIds: string[];
  notificationPrefs: NotificationPreferences;
  security: SecuritySettings;
  activeSessions: DeviceSession[];
  referralCode: string;
  tier: 'Silver Member' | 'Gold VIP' | 'Platinum Corporate';
  tierBadge?: string;
  primaryDistrict?: string;
}

export type WalletTransactionType =
  | 'Money Added'
  | 'Order Payment'
  | 'Refund'
  | 'Wallet Reward'
  | 'Withdrawal';

export type WalletTransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Flagged';

export interface WalletTransaction {
  id: string;
  referenceId: string;
  userId: string;
  userName: string;
  type: WalletTransactionType;
  amount: number; // positive for income, negative for expense
  previousBalance: number;
  newBalance: number;
  status: WalletTransactionStatus;
  date: string;
  time: string;
  paymentMethodUsed: string; // e.g. 'MTN Mobile Money', 'Airtel Money', 'Bank Card', 'Ishema Reward System'
  description: string;
  orderId?: string;
  orderTrackingNumber?: string;
  phoneOrAccount?: string;
  receiptNote?: string;
}

export interface AdminWalletAuditLog {
  id: string;
  adminEmail: string;
  action: 'Credit Issued' | 'Manual Refund' | 'Account Flagged' | 'Limit Adjusted' | 'Security Verification';
  targetUserId: string;
  targetUserName: string;
  amount?: number;
  reason: string;
  timestamp: string;
}

export interface SupportInteractionEvent {
  id: string;
  channel: 'whatsapp' | 'phone' | 'email';
  timestamp: string;
  sourceView: string;
  phoneNumber?: string;
  messageText?: string;
}

export type ActiveView = 
  | 'home'
  | 'shop'
  | 'supermarket'
  | 'category'
  | 'product'
  | 'track'
  | 'courier-booking'
  | 'about'
  | 'services'
  | 'how-it-works'
  | 'pricing'
  | 'become-driver'
  | 'driver-apply'
  | 'contact'
  | 'admin'
  | 'driver'
  | 'driver-dashboard'
  | 'surprise-gift'
  | 'surprise-reveal'
  | 'buy-local'
  | 'farmer-market'
  | 'deals'
  | 'smart-basket'
  | 'group-order'
  | 'community'
  | 'business-delivery'
  | 'neighborhood-stores'
  | 'request-product'
  | 'account'
  | 'wallet'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'map'
  | 'animate-rider'
  | 'admin-payments';

// ----------------------------------------------------
// RWANDA SECURE PAYMENT API TYPES & MTN MOMO OPEN API
// ----------------------------------------------------

export type PartyIdType = 'MSISDN' | 'EMAIL' | 'PARTY_CODE';

export interface MtnMoMoPayer {
  partyIdType: 'MSISDN' | 'EMAIL' | 'PARTY_CODE';
  partyId: string; // e.g. "250788349102"
}

export interface MtnMoMoPreApprovalRequest {
  payer: MtnMoMoPayer;
  payerCurrency: string; // e.g. "RWF"
  payerMessage: string; // Message to the end user
  validityTime: number; // Duration in seconds that pre-approval is valid once accepted
}

export interface MtnMoMoPreApprovalResponse {
  preapprovalId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  payer: MtnMoMoPayer;
  payerCurrency: string;
  payerMessage: string;
  validityTime: number;
  createdAt: string;
  expiration: string;
}

export interface MtnMoMoRequestToPayRequest {
  amount: string;
  currency: string;
  externalId: string;
  payer: MtnMoMoPayer;
  payerMessage: string;
  payeeNote: string;
}

export type PaymentState =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESSFUL'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'TIMEOUT'
  | 'REFUNDED';

export type PaymentMethodType =
  | 'momo_rwanda'
  | 'airtel_rwanda'
  | 'card'
  | 'ishema_wallet'
  | 'cash_on_delivery';

export interface PaymentTransaction {
  id: string;
  idempotencyKey: string;
  orderId?: string;
  type: 'order_payment' | 'wallet_topup' | 'courier_booking';
  amount: number;
  currency: 'RWF';
  paymentMethod: PaymentMethodType;
  paymentMethodLabel: string;
  status: PaymentState;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  reference: string;
  providerReference?: string;
  metadata?: Record<string, any>;
  sellerSettlement?: {
    totalAmount: number;
    platformCommission: number;
    netSellerPayout: number;
    settlementStatus: 'PENDING' | 'SETTLED' | 'WITHDRAWN';
    sellerName: string;
  };
  receiptUrl?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
  refundedAt?: string;
  refundReason?: string;
}

