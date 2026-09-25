import {
  CustomerUser,
  WalletTransaction,
  AdminWalletAuditLog
} from '../types';

export const INITIAL_CUSTOMER_USER: CustomerUser = {
  id: 'cust-250-8819',
  fullName: 'Patrick Habimana',
  email: 'patrick.habimana@gmail.com',
  phone: '+250 788 123 456',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  createdAt: '2025-01-15',
  isPhoneVerified: true,
  isEmailVerified: true,
  tier: 'Gold VIP',
  referralCode: 'PATRICK-KIGALI-250',
  defaultAddressId: 'addr-1',
  favoriteProductIds: ['prod-1', 'prod-3', 'prod-6'],
  addresses: [
    {
      id: 'addr-1',
      label: 'Home (Kimihurura)',
      recipientName: 'Patrick Habimana',
      phone: '+250 788 123 456',
      streetAddress: 'KG 28 Ave, House #14',
      district: 'Gasabo',
      sector: 'Kimihurura',
      landmark: 'Behind Kigali Heights & Simba Supermarket',
      directions: 'Take tarmac road opposite Sundowner, 2nd black gate on right',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Office (Kigali City Tower)',
      recipientName: 'Patrick Habimana',
      phone: '+250 788 123 456',
      streetAddress: 'KN 81 St, Kigali City Tower',
      district: 'Nyarugenge',
      sector: 'Nyarugenge (CBD)',
      landmark: 'Ground Floor Courier Desk & Concierge',
      directions: 'Leave at front reception concierge desk for Floor 8 Tech Labs',
      isDefault: false
    },
    {
      id: 'addr-3',
      label: 'Family Residence (Musanze)',
      recipientName: 'Mutesi Chantal (Sister)',
      phone: '+250 788 987 654',
      streetAddress: 'NR4 Highway, Muhoza Sector',
      district: 'Musanze',
      sector: 'Muhoza',
      landmark: 'Near Musanze Modern Market & Bus Terminal',
      directions: 'Opposite Bank of Kigali Musanze branch',
      isDefault: false
    }
  ],
  notificationPrefs: {
    smsAlerts: true,
    whatsAppUpdates: true,
    emailReceipts: true,
    promoOffers: true,
    orderStatusLive: true,
    walletActivityAlerts: true
  },
  security: {
    twoFactorOtpLogin: true,
    requirePinForPayments: true,
    walletPinSet: true,
    walletPin: '1234',
    biometricPrompt: false,
    fraudAlerts: true,
    dailySpendingLimitRWF: 500000
  },
  activeSessions: [
    {
      id: 'sess-1',
      device: 'iPhone 15 Pro (Kigali)',
      browser: 'Mobile Safari 18.0',
      location: 'Kigali, Rwanda (MTN 4G LTE)',
      ipAddress: '197.243.112.44',
      lastActive: 'Active Now',
      isCurrent: true
    },
    {
      id: 'sess-2',
      device: 'MacBook Pro 16" (Work)',
      browser: 'Google Chrome 128',
      location: 'Kimihurura, Kigali (Canalbox Fiber)',
      ipAddress: '197.243.108.19',
      lastActive: '2 hours ago',
      isCurrent: false
    },
    {
      id: 'sess-3',
      device: 'Infinix Note 30 (Backup)',
      browser: 'Chrome Mobile',
      location: 'Remera, Kigali (Airtel 4G)',
      ipAddress: '41.186.78.102',
      lastActive: '3 days ago',
      isCurrent: false
    }
  ]
};

// Initial wallet balance matching user requirement: 25,000 RWF
export const INITIAL_WALLET_BALANCE = 25000;

export const INITIAL_WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'txn-1',
    referenceId: 'TXN-ISH-82914',
    userId: 'cust-250-8819',
    userName: 'Patrick Habimana',
    type: 'Money Added',
    amount: 10000,
    previousBalance: 15000,
    newBalance: 25000,
    status: 'Completed',
    date: 'Today',
    time: '09:42 AM',
    paymentMethodUsed: 'MTN Mobile Money (*182#)',
    description: 'Wallet Top-Up via MTN MoMo',
    phoneOrAccount: '+250 788 123 456',
    receiptNote: 'Funds credited immediately via MTN Rwanda Gateway.'
  },
  {
    id: 'txn-2',
    referenceId: 'TXN-ISH-81042',
    userId: 'cust-250-8819',
    userName: 'Patrick Habimana',
    type: 'Order Payment',
    amount: -6500,
    previousBalance: 21500,
    newBalance: 15000,
    status: 'Completed',
    date: 'Yesterday',
    time: '01:15 PM',
    paymentMethodUsed: 'Ishema Wallet',
    description: 'Food Order - Gourmet Burger & Chips',
    orderId: 'ORD-1002',
    orderTrackingNumber: 'ISH-EXP-9042',
    receiptNote: 'Auto-deducted for order payment at Kimihurura delivery.'
  },
  {
    id: 'txn-3',
    referenceId: 'TXN-ISH-79240',
    userId: 'cust-250-8819',
    userName: 'Patrick Habimana',
    type: 'Wallet Reward',
    amount: 2000,
    previousBalance: 19500,
    newBalance: 21500,
    status: 'Completed',
    date: 'Yesterday',
    time: '10:00 AM',
    paymentMethodUsed: 'Ishema Reward System',
    description: 'Weekend Special Cashback & Referral Bonus',
    receiptNote: 'Promotional loyalty reward credited for 5th order milestone.'
  },
  {
    id: 'txn-4',
    referenceId: 'TXN-ISH-76019',
    userId: 'cust-250-8819',
    userName: 'Patrick Habimana',
    type: 'Order Payment',
    amount: -7500,
    previousBalance: 27000,
    newBalance: 19500,
    status: 'Completed',
    date: '3 days ago',
    time: '06:30 PM',
    paymentMethodUsed: 'Ishema Wallet',
    description: 'Groceries Basket - Musanze Fresh Produce',
    orderId: 'ORD-0994',
    orderTrackingNumber: 'ISH-EXP-8810',
    receiptNote: 'Paid for fresh vegetables & Rwandan coffee.'
  },
  {
    id: 'txn-5',
    referenceId: 'TXN-ISH-74112',
    userId: 'cust-250-8819',
    userName: 'Patrick Habimana',
    type: 'Refund',
    amount: 12000,
    previousBalance: 15000,
    newBalance: 27000,
    status: 'Completed',
    date: '5 days ago',
    time: '03:10 PM',
    paymentMethodUsed: 'Ishema Refund System',
    description: 'Refund Approved for Out-of-Stock Electronics Item',
    orderId: 'ORD-0980',
    receiptNote: 'Instant refund credited back to Ishema Wallet without bank delays.'
  },
  {
    id: 'txn-6',
    referenceId: 'TXN-ISH-70194',
    userId: 'cust-250-8819',
    userName: 'Patrick Habimana',
    type: 'Money Added',
    amount: 15000,
    previousBalance: 0,
    newBalance: 15000,
    status: 'Completed',
    date: '1 week ago',
    time: '11:20 AM',
    paymentMethodUsed: 'Bank of Kigali (BK Quick / Visa)',
    description: 'Initial Wallet Loading via BK Quick',
    phoneOrAccount: 'BK Card •••• 4091',
    receiptNote: 'Card top-up verified with 3D Secure OTP.'
  }
];

// Additional mock customer wallets for the Admin Wallet Management tab
export const ADMIN_MOCK_CUSTOMER_WALLETS = [
  {
    userId: 'cust-250-8819',
    name: 'Patrick Habimana',
    phone: '+250 788 123 456',
    email: 'patrick.habimana@gmail.com',
    balance: 25000,
    totalDeposited: 35000,
    totalSpent: 14000,
    totalRefunded: 12000,
    tier: 'Gold VIP',
    status: 'Active / Verified'
  },
  {
    userId: 'cust-250-4102',
    name: 'Marie Claire Uwase',
    phone: '+250 783 555 901',
    email: 'marie.uwase@kigalitech.rw',
    balance: 48500,
    totalDeposited: 75000,
    totalSpent: 28000,
    totalRefunded: 1500,
    tier: 'Platinum Corporate',
    status: 'Active / Verified'
  },
  {
    userId: 'cust-250-9284',
    name: 'Jean-Paul Nshimiyimana',
    phone: '+250 732 990 114',
    email: 'jp.nshimiye@gmail.com',
    balance: 8200,
    totalDeposited: 20000,
    totalSpent: 11800,
    totalRefunded: 0,
    tier: 'Silver Member',
    status: 'Active / Verified'
  },
  {
    userId: 'cust-250-1093',
    name: 'Eric Mugabo',
    phone: '+250 788 642 119',
    email: 'eric.mugabo@yahoo.fr',
    balance: 0,
    totalDeposited: 15000,
    totalSpent: 15000,
    totalRefunded: 0,
    tier: 'Silver Member',
    status: 'Active'
  },
  {
    userId: 'cust-250-7711',
    name: 'Aline Umutoni',
    phone: '+250 788 234 567',
    email: 'aline.umutoni@rwanda.gov.rw',
    balance: 62000,
    totalDeposited: 110000,
    totalSpent: 48000,
    totalRefunded: 0,
    tier: 'Gold VIP',
    status: 'Active / Verified'
  }
];

export const INITIAL_ADMIN_AUDIT_LOGS: AdminWalletAuditLog[] = [
  {
    id: 'audit-1',
    adminEmail: 'superadmin@ishema.rw',
    action: 'Manual Refund',
    targetUserId: 'cust-250-8819',
    targetUserName: 'Patrick Habimana',
    amount: 12000,
    reason: 'Approved instant refund for missing item in order #ORD-0980',
    timestamp: '2025-05-12 15:10'
  },
  {
    id: 'audit-2',
    adminEmail: 'finance@ishema.rw',
    action: 'Credit Issued',
    targetUserId: 'cust-250-4102',
    targetUserName: 'Marie Claire Uwase',
    amount: 5000,
    reason: 'Corporate promotional goodwill credit',
    timestamp: '2025-05-10 11:24'
  },
  {
    id: 'audit-3',
    adminEmail: 'security@ishema.rw',
    action: 'Security Verification',
    targetUserId: 'cust-250-7711',
    targetUserName: 'Aline Umutoni',
    reason: 'Verified large MoMo deposit of 100,000 RWF against MTN payment webhook',
    timestamp: '2025-05-08 09:30'
  }
];
