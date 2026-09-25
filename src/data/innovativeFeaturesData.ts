import {
  NeighborhoodStore,
  CommunityHub,
  GroupOrder,
  ProductRequest,
  SmartBasketPreset,
  DealItem
} from '../types';

export type { SmartBasketPreset, DealItem };

export const RWANDA_LANDMARKS_BY_DISTRICT: Record<string, string[]> = {
  Gasabo: [
    'Near Simba Supermarket Kimironko',
    'Near Amahoro National Stadium (Gate 2)',
    'Opposite BK Arena VIP Entrance',
    'Near Chez Lando Hotel / Roundabout',
    'Near Kigali Heights / KBC',
    'Near RDB Headquarters Gishushu',
    'Opposite MTN Centre Nyarutarama',
    'Behind Woodland Supermarket Gaculiro',
    'Near King Faisal Hospital Entrance',
    'Near ULK Gisozi Main Gate'
  ],
  Kicukiro: [
    'Near IPRC Kigali Main Entrance',
    'Near Sonatubes Roundabout / Petrocom',
    'Near Prince House Kicukiro Centre',
    'Near Zindiro Market Kagarama',
    'Opposite Noble Family Church Niboye',
    'Near Mount Kenya University Gikondo',
    'Near Masaka Hospital Road junction',
    'Near Kanombe Military Hospital Gate'
  ],
  Nyarugenge: [
    'Near Kigali City Tower (KCT)',
    'Near CHUK Hospital / University Campus',
    'Near Nyamirambo Stadium / Cosmos',
    'Opposite Maison des Jeunes Kimisagara',
    'Near Biryogo Green Walking Street',
    'Near Nyabugogo Main Bus Terminal',
    'Behind Bank of Kigali Headquarters',
    'Near Sainte Famille Church'
  ],
  Musanze: [
    'Near Musanze Modern Market',
    'Near INES Ruhengeri Campus',
    'Near Goico Plaza Musanze Town'
  ],
  Rubavu: [
    'Near Gisenyi Grand Barrière Border',
    'Near Lake Kivu Serena Hotel',
    'Near Rubavu Public Market'
  ]
};

export const MOCK_NEIGHBORHOOD_STORES: NeighborhoodStore[] = [
  {
    id: 'store-kimironko-produce',
    name: 'Kimironko Fresh Harvest Cooperative',
    category: 'Groceries & Fresh',
    neighborhood: 'Kimironko',
    district: 'Gasabo',
    distanceKm: 0.6,
    rating: 4.9,
    reviewsCount: 382,
    openHours: '6:30 AM - 9:30 PM',
    verified: true,
    trustedBadge: 'Verified Farm Cooperative',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    productCount: 84,
    isLocalMaker: true,
    phone: '+250 788 112 233',
    featuredProducts: ['Musanze Irish Potatoes', 'Gakenke Passion Fruits', 'Nyagatare Fresh Milk', 'Bugesera Organic Greens']
  },
  {
    id: 'store-haute-rwanda',
    name: 'Haute Rwanda & Inziza Crafts Atelier',
    category: 'Fashion & Crafts',
    neighborhood: 'Kiyovu',
    district: 'Nyarugenge',
    distanceKm: 1.8,
    rating: 4.95,
    reviewsCount: 194,
    openHours: '8:30 AM - 8:00 PM',
    verified: true,
    trustedBadge: 'Made in Rwanda Gold Maker',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&auto=format&fit=crop&q=80',
    productCount: 42,
    isLocalMaker: true,
    phone: '+250 788 334 455',
    featuredProducts: ['Royal Agaseke Peace Baskets', 'Kitenge Tailored Blazers', 'Handmade Cow-Horn Jewelry', 'Imigongo Art Panels']
  },
  {
    id: 'store-pharmacie-remera',
    name: 'Pharmacie Conseil Remera 24/7',
    category: 'Pharmacy & Health',
    neighborhood: 'Remera',
    district: 'Gasabo',
    distanceKm: 0.9,
    rating: 4.85,
    reviewsCount: 410,
    openHours: 'Open 24 Hours',
    verified: true,
    trustedBadge: 'RURA Licensed Pharmacy',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    productCount: 120,
    isLocalMaker: false,
    phone: '+250 788 556 677',
    featuredProducts: ['Emergency First Aid', 'Infant Formula & Diapers', 'Prescription Delivery', 'Vitamins & Pain Relief']
  },
  {
    id: 'store-chez-lando-bites',
    name: 'Chez Lando Grill & Bakery Express',
    category: 'Bakery & Cafe',
    neighborhood: 'Remera',
    district: 'Gasabo',
    distanceKm: 1.1,
    rating: 4.88,
    reviewsCount: 520,
    openHours: '7:00 AM - 11:00 PM',
    verified: true,
    trustedBadge: 'Top Rated Culinary Legend',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    productCount: 36,
    isLocalMaker: true,
    phone: '+250 788 778 899',
    featuredProducts: ['Traditional Beef Brochettes', 'Roasted Plantains (Mizuzu)', 'Fresh Croissants', 'Freshly Brewed Maraba Coffee']
  },
  {
    id: 'store-kigali-tech-hub',
    name: 'Kigali Rapid Phone & Gadgets Depot',
    category: 'Electronics & Hardware',
    neighborhood: 'Nyarugenge / Downtown',
    district: 'Nyarugenge',
    distanceKm: 2.4,
    rating: 4.75,
    reviewsCount: 260,
    openHours: '8:00 AM - 8:30 PM',
    verified: true,
    trustedBadge: 'Warranty Certified Store',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=80',
    productCount: 95,
    isLocalMaker: false,
    phone: '+250 788 990 011',
    featuredProducts: ['Fast-Charge USB-C Cables', '20,000mAh Power Banks', 'Wireless Earbuds', 'Multi-Pin Travel Adapters']
  },
  {
    id: 'store-inyange-dairy-kicukiro',
    name: 'Inyange Industries Direct Depot',
    category: 'Farm Cooperative',
    neighborhood: 'Kicukiro',
    district: 'Kicukiro',
    distanceKm: 1.5,
    rating: 4.92,
    reviewsCount: 680,
    openHours: '7:00 AM - 9:00 PM',
    verified: true,
    trustedBadge: 'Official National Brand Partner',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=600&auto=format&fit=crop&q=80',
    productCount: 28,
    isLocalMaker: true,
    phone: '+250 788 223 344',
    featuredProducts: ['Whole Fresh Milk 1L', 'Inyange Strawberry Yogurt', 'Pure Rwandan Natural Water', 'Pineapple Passion Juice']
  }
];

export const MOCK_COMMUNITY_HUBS: CommunityHub[] = [
  {
    id: 'hub-vision-city',
    name: 'Vision City Estate Gaculiro',
    type: 'Estate / Neighborhood',
    location: 'Gaculiro, Gasabo',
    memberCount: 520,
    activeOrdersToday: 24,
    dropOffPoint: 'Gate 1 Concierge & Parcel Locker',
    popularItems: ['Organic Vegetable Baskets', 'Fresh Bakery Pastries', 'Bottled Mineral Water Packs']
  },
  {
    id: 'hub-ur-gikondo',
    name: 'University of Rwanda (UR) - Gikondo Campus',
    type: 'University Campus',
    location: 'Gikondo, Kicukiro',
    memberCount: 1480,
    activeOrdersToday: 48,
    dropOffPoint: 'Main Academic Quad & Library Arch',
    popularItems: ['Student Snack Boxes', 'Power Banks & Flash Drives', 'Budget Lunch Brochettes']
  },
  {
    id: 'hub-kigali-heights',
    name: 'Kigali Heights & Centenary Corporate Towers',
    type: 'Corporate Park / Towers',
    location: 'Kimihurura / Kacyiru',
    memberCount: 890,
    activeOrdersToday: 37,
    dropOffPoint: 'Ground Floor Courier Reception Desk',
    popularItems: ['Team Coffee Platters', 'Gourmet Lunch Bowls', 'Emergency Tech Chargers']
  },
  {
    id: 'hub-nyarutarama',
    name: 'Nyarutarama Tennis & Lake Community',
    type: 'Estate / Neighborhood',
    location: 'Nyarutarama, Gasabo',
    memberCount: 340,
    activeOrdersToday: 16,
    dropOffPoint: 'MTN Centre Hub & Security Gate',
    popularItems: ['Artisanal Wine & Cheese', 'Flower Bouquets', 'Direct Farm Baskets']
  }
];

export const MOCK_DEALS: DealItem[] = [
  {
    id: 'deal-1',
    title: 'Musanze Fresh Irish Potatoes (Kinigi Grade A - 10kg Bag)',
    dealType: 'Flash Sale',
    originalPrice: 12000,
    dealPrice: 8500,
    discountBadge: '30% OFF',
    endsInMinutes: 72,
    seller: 'Musanze Farmers Cooperative',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    stockLeft: 14,
    description: 'Crispy volcanic soil red potatoes direct from Musanze cooperatives. Washed and sorted.'
  },
  {
    id: 'deal-2',
    title: 'Inyange Creamy Strawberry Yogurt (Buy 1 Get 1 Free - 500ml)',
    dealType: 'Buy 1 Get 1',
    originalPrice: 2400,
    dealPrice: 1200,
    discountBadge: 'BOGO FREE',
    endsInMinutes: 140,
    seller: 'Inyange Dairy Direct Depot',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    stockLeft: 22,
    description: 'Fresh Rwandan cultured yogurt packed with fruit pulp. Perfect for breakfast.'
  },
  {
    id: 'deal-3',
    title: 'Authentic Handwoven Agaseke Basket (Royal Gold & Cream)',
    dealType: 'Weekend Special',
    originalPrice: 28000,
    dealPrice: 19500,
    discountBadge: 'SAVE 8,500 RWF',
    endsInMinutes: 320,
    seller: 'Haute Rwanda & Inziza Crafts',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&auto=format&fit=crop&q=80',
    stockLeft: 8,
    description: 'Exquisite Rwandan peace basket handmade from natural sisal fibers and banana leaves.'
  },
  {
    id: 'deal-4',
    title: 'Kigali Friday Brochette Party Pack (10 Beef Skewers + Grilled Bananas)',
    dealType: 'Weekend Special',
    originalPrice: 22000,
    dealPrice: 16000,
    discountBadge: 'POPULAR DEAL',
    endsInMinutes: 190,
    seller: 'Chez Lando Grill & Bakery Express',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    stockLeft: 11,
    description: 'Hot sizzling charcoal-grilled beef brochettes served with roasted plantains and Akabanga chili.'
  },
  {
    id: 'deal-5',
    title: 'Zero Delivery Fee on Orders Above 25,000 RWF in Gasabo',
    dealType: 'Free Delivery',
    originalPrice: 1500,
    dealPrice: 0,
    discountBadge: 'FREE DELIVERY',
    endsInMinutes: 480,
    seller: 'Ishema Express Logistics',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80',
    stockLeft: 50,
    description: 'Order from any verified store in Kigali and get free moto express delivery.'
  }
];

export const SMART_BASKET_PRESETS: SmartBasketPreset[] = [
  {
    id: 'basket-family-5',
    title: 'Family of 5 Grocery Week',
    tagline: 'Complete nutritious weekly pantry for 5 people under budget',
    targetBudget: 80000,
    peopleCount: 5,
    duration: '7 Days',
    category: 'Groceries & Household',
    iconName: 'Users',
    items: [
      {
        productId: 'prod-potatoes-10kg',
        productName: 'Musanze Irish Potatoes Kinigi (10kg)',
        quantity: 1,
        unitPrice: 8500,
        sellerName: 'Musanze Farmers Cooperative',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80',
        category: 'Fresh Produce'
      },
      {
        productId: 'prod-rice-25kg',
        productName: 'Rwandan Bugarama Fragrant Rice (5kg)',
        quantity: 1,
        unitPrice: 9500,
        sellerName: 'Kimironko Fresh Harvest',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
        category: 'Grains & Pantry'
      },
      {
        productId: 'prod-inyange-milk-crate',
        productName: 'Inyange Fresh Whole Milk Pack (6 x 1L)',
        quantity: 1,
        unitPrice: 9000,
        sellerName: 'Inyange Dairy Direct',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
        category: 'Dairy'
      },
      {
        productId: 'prod-fresh-meat',
        productName: 'Prime Rwandan Beef Cubes (2kg)',
        quantity: 1,
        unitPrice: 15000,
        sellerName: 'Kigali Halal Butchery',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&auto=format&fit=crop&q=80',
        category: 'Meat & Protein'
      },
      {
        productId: 'prod-greens-veggies',
        productName: 'Assorted Fresh Greens, Carrots & Onions Crate (4kg)',
        quantity: 1,
        unitPrice: 7500,
        sellerName: 'Kimironko Fresh Harvest',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
        category: 'Fresh Produce'
      },
      {
        productId: 'prod-cooking-oil',
        productName: 'Pure Vegetable Cooking Oil (3 Liters)',
        quantity: 1,
        unitPrice: 11000,
        sellerName: 'Simba Supermarket Express',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
        category: 'Pantry'
      },
      {
        productId: 'prod-fruits-basket',
        productName: 'Gakenke Passion Fruits & Bananas Basket (3kg)',
        quantity: 1,
        unitPrice: 6500,
        sellerName: 'Kimironko Fresh Harvest',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=80',
        category: 'Fresh Fruits'
      },
      {
        productId: 'prod-flour-staple',
        productName: 'Fortified Maize Flour Kawunga (5kg)',
        quantity: 1,
        unitPrice: 6000,
        sellerName: 'Kimironko Fresh Harvest',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
        category: 'Grains & Pantry'
      },
      {
        productId: 'prod-akabanga-chili',
        productName: 'Authentic Akabanga Rwandan Chili Oil (100ml)',
        quantity: 1,
        unitPrice: 2500,
        sellerName: 'Urwibutso Enterprise',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=80',
        category: 'Condiments'
      }
    ]
  },
  {
    id: 'basket-dinner-4',
    title: 'Dinner for 4 People',
    tagline: 'Savory traditional brochettes, isombe, plantains and fresh fruit juice',
    targetBudget: 20000,
    peopleCount: 4,
    duration: 'Single Evening',
    category: 'Prepared Meals & Dinner',
    iconName: 'UtensilsCrossed',
    items: [
      {
        productId: 'prod-brochettes-8',
        productName: 'Flame-Grilled Tender Beef Brochettes (8 Skewers)',
        quantity: 1,
        unitPrice: 9600,
        sellerName: 'Chez Lando Grill & Bakery Express',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80',
        category: 'Grill'
      },
      {
        productId: 'prod-mizuzu-side',
        productName: 'Golden Fried Ripe Plantains / Mizuzu (2 Large Portions)',
        quantity: 2,
        unitPrice: 2000,
        sellerName: 'Chez Lando Grill & Bakery Express',
        image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=500&auto=format&fit=crop&q=80',
        category: 'Sides'
      },
      {
        productId: 'prod-isombe-portion',
        productName: 'Traditional Isombe with Groundnut Paste (2 Portions)',
        quantity: 1,
        unitPrice: 3200,
        sellerName: 'Chez Lando Grill & Bakery Express',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
        category: 'Traditional'
      },
      {
        productId: 'prod-agashya-juice',
        productName: 'Agashya Natural Passion Juice Carafe (1 Liter)',
        quantity: 1,
        unitPrice: 2800,
        sellerName: 'Urwibutso Enterprise',
        image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=500&auto=format&fit=crop&q=80',
        category: 'Beverage'
      }
    ]
  },
  {
    id: 'basket-student-pack',
    title: 'University Student Exam Pack',
    tagline: 'Energy snacks, ready noodles, coffee, and study treats for 1 week',
    targetBudget: 15000,
    peopleCount: 1,
    duration: '1 Week',
    category: 'Student & Budget',
    iconName: 'GraduationCap',
    items: [
      {
        productId: 'prod-instant-noodles',
        productName: 'Instant Spiced Noodles Pack of 5',
        quantity: 1,
        unitPrice: 3500,
        sellerName: 'Simba Supermarket Express',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=80',
        category: 'Fast Meals'
      },
      {
        productId: 'prod-maraba-coffee',
        productName: 'Maraba Rwandan Ground Arabica Coffee (250g)',
        quantity: 1,
        unitPrice: 4500,
        sellerName: 'Maraba Coffee Direct',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
        category: 'Coffee'
      },
      {
        productId: 'prod-biscuits-snacks',
        productName: 'Gorilla Wholewheat Digestive Biscuits (3 Packs)',
        quantity: 1,
        unitPrice: 3000,
        sellerName: 'Simba Supermarket Express',
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
        category: 'Snacks'
      },
      {
        productId: 'prod-inyange-drinking-yogurt',
        productName: 'Inyange Vanilla Drinking Yogurt (2 Bottles)',
        quantity: 2,
        unitPrice: 1500,
        sellerName: 'Inyange Dairy Direct Depot',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
        category: 'Dairy'
      },
      {
        productId: 'prod-fresh-bananas',
        productName: 'Sweet Yellow Bananas Kamembe (1kg)',
        quantity: 1,
        unitPrice: 1000,
        sellerName: 'Kimironko Fresh Harvest',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80',
        category: 'Fruit'
      }
    ]
  },
  {
    id: 'basket-office-healthy',
    title: 'Office Healthy Snack & Fruit Platter',
    tagline: 'Fresh fruit bowl, roasted nuts, Rwandan tea & honey for the team',
    targetBudget: 25000,
    peopleCount: 6,
    duration: 'Office Hours',
    category: 'Corporate & Office',
    iconName: 'Briefcase',
    items: [
      {
        productId: 'prod-cut-fruits',
        productName: 'Pre-Cut Tropical Fruit Medley (Papaya, Pineapple, Mango - 2kg)',
        quantity: 1,
        unitPrice: 8500,
        sellerName: 'Kimironko Fresh Harvest',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=80',
        category: 'Fresh'
      },
      {
        productId: 'prod-rwanda-honey',
        productName: 'Pure Nyungwe Forest Raw Wildflower Honey (500g)',
        quantity: 1,
        unitPrice: 5500,
        sellerName: 'Nyungwe Honey Apiary',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80',
        category: 'Artisanal'
      },
      {
        productId: 'prod-sorwathe-tea',
        productName: 'Sorwathe Rwandan Organic Black & Green Tea Tin (50 Bags)',
        quantity: 1,
        unitPrice: 5000,
        sellerName: 'Sorwathe Tea Factory',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
        category: 'Tea'
      },
      {
        productId: 'prod-roasted-groundnuts',
        productName: 'Roasted Salted Rwandan Peanuts / Ubunyobwa (3 Jars)',
        quantity: 3,
        unitPrice: 2000,
        sellerName: 'Kimironko Fresh Harvest',
        image: 'https://images.unsplash.com/photo-1568651318047-920f04e1eec7?w=500&auto=format&fit=crop&q=80',
        category: 'Snacks'
      }
    ]
  }
];

export const MOCK_GROUP_ORDERS: GroupOrder[] = [
  {
    id: 'grp-kgl-101',
    code: 'KGL-882',
    title: 'Centenary House 4th Floor Friday Lunch',
    hostName: 'Clarisse Umutoni',
    hostPhone: '+250 788 123 456',
    location: 'Kigali Heights / Centenary House',
    district: 'Gasabo',
    landmark: 'Opposite Roundabout, 4th Floor Tech Hub',
    status: 'Open',
    targetDeliveryTime: '12:45 PM Today',
    totalAmount: 34500,
    members: [
      {
        id: 'm-1',
        name: 'Clarisse (Host)',
        phone: '+250 788 123 456',
        subtotal: 9200,
        paid: true,
        items: []
      },
      {
        id: 'm-2',
        name: 'Jean-Paul',
        phone: '+250 788 345 678',
        subtotal: 8500,
        paid: false,
        items: []
      },
      {
        id: 'm-3',
        name: 'Diane',
        phone: '+250 788 567 890',
        subtotal: 11000,
        paid: true,
        items: []
      },
      {
        id: 'm-4',
        name: 'Kevin M.',
        phone: '+250 788 789 012',
        subtotal: 5800,
        paid: false,
        items: []
      }
    ]
  }
];

export const MOCK_PRODUCT_REQUESTS: ProductRequest[] = [
  {
    id: 'req-001',
    description: 'Original HP 65W Blue-Pin Laptop Charger for EliteBook',
    category: 'Electronics & Hardware',
    targetBudget: 28000,
    urgency: 'Needed Today before 4 PM',
    customerName: 'Patrick Ndahiro',
    customerPhone: '+250 788 901 234',
    location: 'Kacyiru, Gasabo (Near US Embassy)',
    status: 'Found & Quoted',
    matchedStore: 'Kigali City Tower Tech Solutions',
    quotedPrice: 25000,
    createdAt: '45 minutes ago'
  },
  {
    id: 'req-002',
    description: 'Traditional Rwandan Agaseke Bride Gift Basket with Custom White Pearls',
    category: 'Fashion & Crafts',
    targetBudget: 35000,
    urgency: 'Needed by Saturday Morning',
    customerName: 'Aline Mukamana',
    customerPhone: '+250 788 456 789',
    location: 'Nyarutarama, Gasabo',
    status: 'Searching Partner Stores',
    matchedStore: 'Inziza Gifted Hands Artisan Co-op',
    quotedPrice: 32000,
    createdAt: '2 hours ago'
  },
  {
    id: 'req-003',
    description: 'Cold-Pressed Rwandan Extra Virgin Macadamia Nut Oil (500ml)',
    category: 'Groceries & Fresh',
    targetBudget: 14000,
    urgency: 'Standard Delivery',
    customerName: 'Fabrice Kwizera',
    customerPhone: '+250 788 678 901',
    location: 'Kiyovu, Nyarugenge',
    status: 'Delivered',
    matchedStore: 'Nyamirambo Organic Wellness Store',
    quotedPrice: 12500,
    createdAt: 'Yesterday'
  }
];
