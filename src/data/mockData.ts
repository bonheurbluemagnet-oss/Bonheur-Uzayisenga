import { Category, Driver, Order, DeliveryBooking, Product } from '../types';

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'drv-01',
    name: 'Jean-Paul Habimana',
    phone: '+250 788 349 102',
    rating: 4.9,
    totalDeliveries: 1420,
    vehicle: 'TVS Apache 160 (Plate: RAD 742B)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    currentZone: 'Kigali - Gasabo (Kimihurura / Kacyiru)',
    lat: -1.9545,
    lng: 30.0820,
    isAvailable: false
  },
  {
    id: 'drv-02',
    name: 'Emmanuel Mugisha',
    phone: '+250 783 912 405',
    rating: 4.85,
    totalDeliveries: 980,
    vehicle: 'Bajaj Boxer 150 (Plate: RAE 189D)',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    currentZone: 'Kigali - Nyarugenge (Kiyovu / Nyamirambo)',
    lat: -1.9580,
    lng: 30.0650,
    isAvailable: false
  },
  {
    id: 'drv-03',
    name: 'Clarisse Uwase',
    phone: '+250 785 670 331',
    rating: 4.95,
    totalDeliveries: 1150,
    vehicle: 'Toyota HiAce Express Van (Plate: RAC 512K)',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    currentZone: 'Kigali - Kicukiro (Remera / Kanombe / Gikondo)',
    lat: -1.9660,
    lng: 30.1120,
    isAvailable: true
  }
];

export const RWANDA_LOCATIONS = [
  { district: 'Gasabo', sector: 'Kimihurura', fee: 1200, time: '20–35 min' },
  { district: 'Gasabo', sector: 'Kacyiru', fee: 1200, time: '20–35 min' },
  { district: 'Gasabo', sector: 'Remera', fee: 1500, time: '25–40 min' },
  { district: 'Gasabo', sector: 'Gisozi', fee: 1800, time: '30–45 min' },
  { district: 'Gasabo', sector: 'Kibagabaga', fee: 1600, time: '25–40 min' },
  { district: 'Gasabo', sector: 'Nyarutarama', fee: 1500, time: '25–40 min' },
  { district: 'Nyarugenge', sector: 'Kiyovu', fee: 1000, time: '15–30 min' },
  { district: 'Nyarugenge', sector: 'Nyamirambo', fee: 1600, time: '30–45 min' },
  { district: 'Nyarugenge', sector: 'Muhima / CBD', fee: 1000, time: '15–30 min' },
  { district: 'Nyarugenge', sector: 'Biryogo', fee: 1400, time: '25–40 min' },
  { district: 'Kicukiro', sector: 'Gikondo', fee: 1400, time: '25–40 min' },
  { district: 'Kicukiro', sector: 'Niboye', fee: 1600, time: '30–45 min' },
  { district: 'Kicukiro', sector: 'Kanombe (Airport)', fee: 2000, time: '35–50 min' },
  { district: 'Kicukiro', sector: 'Kagarama', fee: 1600, time: '30–45 min' },
  { district: 'Musanze', sector: 'Musanze Town (Northern Province)', fee: 4500, time: 'Same-Day (2-3 hrs)' },
  { district: 'Rubavu', sector: 'Gisenyi Town (Western Province)', fee: 5000, time: 'Same-Day (3-4 hrs)' },
  { district: 'Huye', sector: 'Butare Town (Southern Province)', fee: 5000, time: 'Same-Day (3-4 hrs)' },
  { district: 'Rwamagana', sector: 'Rwamagana City (Eastern Province)', fee: 4000, time: 'Same-Day (2 hrs)' }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-food',
    name: 'Food & Groceries',
    slug: 'food-groceries',
    icon: 'Utensils',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&auto=format&fit=crop&q=80',
    description: 'Fresh local farm produce, restaurant meals, supermarket groceries & bakeries delivered hot and fresh.',
    subcategories: [
      {
        id: 'sub-pizza',
        categoryId: 'cat-food',
        name: 'Pizza',
        slug: 'pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
        itemCount: 24,
        nestedTypes: ['Chicken Pizza', 'Beef Pizza', 'Cheese Pizza', 'Vegetable Pizza', 'Seafood Pizza', 'Large Pizza', 'Medium Pizza', 'Small Pizza']
      },
      {
        id: 'sub-burgers',
        categoryId: 'cat-food',
        name: 'Burgers',
        slug: 'burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
        itemCount: 16,
        nestedTypes: ['Classic Beef Burger', 'Cheese Burger', 'Crispy Chicken Burger', 'Veggie Burger', 'Double Patty Burger']
      },
      {
        id: 'sub-chicken',
        categoryId: 'cat-food',
        name: 'Chicken & Grill',
        slug: 'chicken',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
        itemCount: 18,
        nestedTypes: ['Grilled Chicken', 'Crispy Fried Chicken', 'Chicken Wings', 'Brochettes', 'Whole Roasted Chicken']
      },
      {
        id: 'sub-local',
        categoryId: 'cat-food',
        name: 'Local & African Food',
        slug: 'local-food',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
        itemCount: 22,
        nestedTypes: ['Rwandan Brochettes', 'Isombe with Beef', 'Akabenz (Roasted Pork)', 'Matooke & Groundnut Stew', 'Ugali & Tilapia']
      },
      {
        id: 'sub-bakery',
        categoryId: 'cat-food',
        name: 'Bakery & Pastries',
        slug: 'bakery',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        itemCount: 30,
        nestedTypes: ['Fresh Baguettes', 'Croissants', 'Birthday Cakes', 'Muffins', 'Sourdough Bread', 'Donuts']
      },
      {
        id: 'sub-groceries',
        categoryId: 'cat-food',
        name: 'Fresh Fruits & Vegetables',
        slug: 'fruits-vegetables',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80',
        itemCount: 45,
        nestedTypes: ['Fresh Avocados', 'Bananas & Pineapples', 'Passion Fruit', 'Tomatoes & Onions', 'Potatoes from Musanze', 'Leafy Greens']
      },
      {
        id: 'sub-supermarket',
        categoryId: 'cat-food',
        name: 'Supermarket Groceries',
        slug: 'groceries',
        image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80',
        itemCount: 68,
        nestedTypes: ['Cooking Oil', 'Rice & Flour', 'Pasta & Grains', 'Spices & Sauces', 'Dairy & Eggs', 'Canned Foods']
      }
    ]
  },
  {
    id: 'cat-electronics',
    name: 'Electronics & Gadgets',
    slug: 'electronics',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80',
    description: 'Smartphones, computers, 4K TVs, audio systems, power banks with genuine Rwandan warranty.',
    subcategories: [
      {
        id: 'sub-phones',
        categoryId: 'cat-electronics',
        name: 'Phones & Tablets',
        slug: 'phones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
        itemCount: 42,
        nestedTypes: ['Smartphones', 'Apple iPhones', 'Samsung Galaxy', 'Tecno & Infinix', 'Tablets & iPads']
      },
      {
        id: 'sub-laptops',
        categoryId: 'cat-electronics',
        name: 'Laptops & Computers',
        slug: 'laptops',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
        itemCount: 28,
        nestedTypes: ['Business Laptops', 'MacBooks', 'Gaming Laptops', 'Monitors', 'Keyboards & Mice']
      },
      {
        id: 'sub-audio',
        categoryId: 'cat-electronics',
        name: 'Headphones & Audio',
        slug: 'audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        itemCount: 35,
        nestedTypes: ['Headphones', 'Wireless Earbuds', 'Noise Cancelling Headphones', 'Bluetooth Speakers', 'Soundbars']
      },
      {
        id: 'sub-tvs',
        categoryId: 'cat-electronics',
        name: 'TVs & Home Entertainment',
        slug: 'tvs',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
        itemCount: 19,
        nestedTypes: ['Smart 4K TVs', 'OLED / QLED', 'Projectors', 'TV Wall Mounts & Cables']
      },
      {
        id: 'sub-chargers',
        categoryId: 'cat-electronics',
        name: 'Chargers & Power Banks',
        slug: 'chargers-power',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&auto=format&fit=crop&q=80',
        itemCount: 32,
        nestedTypes: ['Fast Chargers', 'High Capacity Power Banks', 'Type-C & Lightning Cables', 'Wireless Chargers']
      }
    ]
  },
  {
    id: 'cat-drinks',
    name: 'Drinks & Beverages',
    slug: 'drinks',
    icon: 'Wine',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    description: 'Chilled soft drinks, Inyange pure juices, Rwandan specialty Arabica coffee, wines & beers.',
    subcategories: [
      {
        id: 'sub-coffee',
        categoryId: 'cat-drinks',
        name: 'Rwandan Specialty Coffee',
        slug: 'coffee',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
        itemCount: 20,
        nestedTypes: ['Bourbon Arabica Beans', 'Ground Coffee', 'Cold Brew', 'Espresso Roasts', 'Specialty Tea & Honey']
      },
      {
        id: 'sub-juices',
        categoryId: 'cat-drinks',
        name: 'Juices & Smoothies',
        slug: 'juices',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
        itemCount: 26,
        nestedTypes: ['Inyange Pure Juices', 'Fresh Cold-Pressed Smoothies', 'Passion Fruit Drink', 'Mango & Apple']
      },
      {
        id: 'sub-soft-drinks',
        categoryId: 'cat-drinks',
        name: 'Soft Drinks & Mineral Water',
        slug: 'soft-drinks-water',
        image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80',
        itemCount: 34,
        nestedTypes: ['Inyange Mineral Water', 'Sparkling Water', 'Coca-Cola & Fanta', 'Energy Drinks', 'Malt Drinks']
      }
    ]
  },
  {
    id: 'cat-fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
    description: 'Modern African prints (Kitenge), urban streetwear, shoes, bespoke tailored suits and accessories.',
    subcategories: [
      {
        id: 'sub-shoes',
        categoryId: 'cat-fashion',
        name: 'Shoes & Footwear',
        slug: 'shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
        itemCount: 38,
        nestedTypes: ['Sneakers', 'Boots', 'Sandals & Slides', 'Formal Leather Shoes', 'Sports Running Shoes']
      },
      {
        id: 'sub-mens',
        categoryId: 'cat-fashion',
        name: "Men's Clothing",
        slug: 'mens-clothing',
        image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80',
        itemCount: 40,
        nestedTypes: ['Shirts & Polos', 'Jeans & Chinos', 'Hoodies & Jackets', 'African Print Shirts', 'Suits & Blazers']
      },
      {
        id: 'sub-womens',
        categoryId: 'cat-fashion',
        name: "Women's Clothing",
        slug: 'womens-clothing',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
        itemCount: 52,
        nestedTypes: ['Dresses & Gowns', 'Kitenge Outfits', 'Tops & Blouses', 'Skirts & Pants', 'Activewear']
      },
      {
        id: 'sub-accessories',
        categoryId: 'cat-fashion',
        name: 'Watches & Bags',
        slug: 'accessories',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
        itemCount: 29,
        nestedTypes: ['Backpacks', 'Handbags', 'Classic Watches', 'Wallets & Belts', 'Sunglasses']
      }
    ]
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    description: 'Dermatologist-approved skincare, premium French & Arabic perfumes, organic hair care.',
    subcategories: [
      {
        id: 'sub-skincare',
        categoryId: 'cat-beauty',
        name: 'Skincare & Sunscreen',
        slug: 'skincare',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
        itemCount: 36,
        nestedTypes: ['Face Cleansers', 'Hydrating Serums', 'Moisturizers', 'Sunscreen SPF 50', 'Shea Butter & Natural Oils']
      },
      {
        id: 'sub-perfumes',
        categoryId: 'cat-beauty',
        name: 'Fragrances & Perfumes',
        slug: 'perfumes',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80',
        itemCount: 25,
        nestedTypes: ['Eau de Parfum Men', 'Eau de Parfum Women', 'Arabian Oud', 'Body Mists & Deodorants']
      },
      {
        id: 'sub-haircare',
        categoryId: 'cat-beauty',
        name: 'Hair Care & Grooming',
        slug: 'hair-care',
        image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&auto=format&fit=crop&q=80',
        itemCount: 28,
        nestedTypes: ['Natural Hair Shampoos', 'Leave-in Conditioners', 'Beard Oils & Balms', 'Hair Styling Tools']
      }
    ]
  },
  {
    id: 'cat-household',
    name: 'Household & Living',
    slug: 'household-living',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80',
    description: 'Kitchen appliances, cookware, Rwandan handcrafted Imigongo art, cleaning supplies & bedding.',
    subcategories: [
      {
        id: 'sub-kitchen',
        categoryId: 'cat-household',
        name: 'Kitchen & Cookware',
        slug: 'kitchen',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
        itemCount: 32,
        nestedTypes: ['Blenders & Juicers', 'Non-stick Cookware Sets', 'Microwaves & Ovens', 'Electric Kettles', 'Cutlery & Plates']
      },
      {
        id: 'sub-homedecor',
        categoryId: 'cat-household',
        name: 'Rwandan Art & Decor',
        slug: 'home-decor',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
        itemCount: 22,
        nestedTypes: ['Traditional Imigongo Paintings', 'Agaseke Handwoven Baskets', 'Modern Wall Art', 'Ambient Lamps']
      },
      {
        id: 'sub-cleaning',
        categoryId: 'cat-household',
        name: 'Cleaning & Detergents',
        slug: 'cleaning',
        image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80',
        itemCount: 24,
        nestedTypes: ['Laundry Liquid', 'Disinfectant Sprays', 'Dishwashing Detergents', 'Paper Towels & Tissues']
      }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Kigali Supreme Chicken BBQ Pizza',
    slug: 'kigali-supreme-chicken-pizza',
    categoryId: 'cat-food',
    subcategoryId: 'sub-pizza',
    nestedType: 'Chicken Pizza',
    price: 7500,
    originalPrice: 9500,
    discountPercentage: 21,
    rating: 4.9,
    reviewsCount: 148,
    seller: {
      name: 'Sol e Luna Italian & Grill',
      location: 'Kigali Heights, Kimihurura',
      verified: true,
      rating: 4.9,
      phone: '+250 788 554 112'
    },
    stock: 35,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Wood-fired oven pizza with tender marinated grilled chicken, smoked mozzarella, caramelized onions, sweet bell peppers, and barbecue drizzle.',
    description: 'Crafted with authentic Italian dough fermented for 48 hours, topped with locally sourced Rwandan organic chicken breast, rich San Marzano tomato puree, creamy mozzarella cheese, and our signature smoked BBQ glaze. Delivered piping hot in an insulated thermal carrier.',
    specifications: {
      'Size Options': 'Medium (12 inch), Large (14 inch)',
      'Crust': 'Neapolitan Hand-tossed',
      'Preparation Time': '15–20 minutes',
      'Dietary Info': 'Halal Certified Poultry'
    },
    variations: [
      { name: 'Size', options: ['Small (10 inch)', 'Medium (12 inch)', 'Large (14 inch)'] },
      { name: 'Extra Cheese', options: ['Normal Mozzarella', 'Double Mozzarella (+RWF 1,500)'] }
    ],
    estimatedDeliveryTime: '30–45 mins',
    deliveryFee: 1200,
    badge: 'Best Seller',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-02',
    name: 'Artisan Gourmet Double Beef Burger with Crispy Fries',
    slug: 'artisan-gourmet-double-beef-burger',
    categoryId: 'cat-food',
    subcategoryId: 'sub-burgers',
    nestedType: 'Double Patty Burger',
    price: 6000,
    originalPrice: 7500,
    discountPercentage: 20,
    rating: 4.8,
    reviewsCount: 94,
    seller: {
      name: 'The Flame Grill House Kigali',
      location: 'KG 9 Ave, Nyarutarama',
      verified: true,
      rating: 4.8,
      phone: '+250 788 332 901'
    },
    stock: 28,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Juicy 100% Nyagatare grass-fed prime beef patties, cheddar melt, crisp lettuce, house relish, served with hot golden fries.',
    description: 'Double 120g seared beef patties topped with sharp melted Wisconsin cheddar, fresh greenhouse tomatoes, pickled gherkins, and homemade garlic aioli inside a toasted brioche bun.',
    specifications: {
      'Meat': '100% Rwandan Grass-Fed Nyagatare Beef',
      'Includes': 'Seasoned Potato Wedges & Garlic Mayo',
      'Prep Time': '15 minutes'
    },
    variations: [
      { name: 'Spice Level', options: ['Mild', 'Spicy Pili-Pili', 'Extra Hot'] },
      { name: 'Drink Add-on', options: ['No Drink', 'Chilled Inyange Juice (+RWF 1,000)', 'Coca-Cola 500ml (+RWF 800)'] }
    ],
    estimatedDeliveryTime: '25–40 mins',
    deliveryFee: 1200,
    badge: 'Popular',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-03',
    name: 'Rwandan Arabica Bourbon Whole Coffee Beans (500g)',
    slug: 'rwandan-arabica-bourbon-coffee-beans',
    categoryId: 'cat-drinks',
    subcategoryId: 'sub-coffee',
    nestedType: 'Bourbon Arabica Beans',
    price: 8500,
    originalPrice: 10500,
    discountPercentage: 19,
    rating: 5.0,
    reviewsCount: 215,
    seller: {
      name: 'Question Coffee Roasters Rwanda',
      location: 'KG 8 Ave, Gishushu',
      verified: true,
      rating: 5.0,
      phone: '+250 788 770 099'
    },
    stock: 80,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'High-altitude single-origin Bourbon Arabica grown on the volcanic slopes of Western Rwanda. Notes of black currant, citrus blossom, and honey.',
    description: 'Harvested from cooperative farms in the Karongi and Nyamasheke regions along Lake Kivu at 1,800m altitude. Expertly medium roasted in Kigali to accentuate vibrant sweetness, crisp acidity, and a smooth lingering chocolate finish.',
    specifications: {
      'Altitude': '1,800 - 2,100 meters above sea level',
      'Processing': 'Fully Washed, Sun-dried on Raised African Beds',
      'Roast Level': 'Medium City Roast',
      'Weight': '500g Fresh Foil Valve Pack'
    },
    variations: [
      { name: 'Grind Type', options: ['Whole Beans', 'Coarse (French Press)', 'Medium (Filter / Drip)', 'Fine (Espresso)'] }
    ],
    estimatedDeliveryTime: '30–50 mins',
    deliveryFee: 1000,
    badge: 'Authentic Rwanda',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-04',
    name: 'Apple iPhone 15 Pro Max 256GB - Natural Titanium',
    slug: 'apple-iphone-15-pro-max-256gb',
    categoryId: 'cat-electronics',
    subcategoryId: 'sub-phones',
    nestedType: 'Apple iPhones',
    price: 1650000,
    originalPrice: 1850000,
    discountPercentage: 11,
    rating: 4.95,
    reviewsCount: 68,
    seller: {
      name: 'Kigali Tech Store & Apple Authorized',
      location: 'CHIC Building, Ground Floor, Nyarugenge',
      verified: true,
      rating: 4.9,
      phone: '+250 788 123 456'
    },
    stock: 9,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Grade 5 Titanium design with A17 Pro chip, 48MP main camera with 5x telephoto optical zoom, USB-C 3.0, and Action button.',
    description: 'Original brand new factory-sealed iPhone 15 Pro Max. Includes 1-Year Official International Apple Warranty with local warranty support in Kigali. Compatible with all Rwandan SIM and eSIM networks (MTN Rwanda & Airtel).',
    specifications: {
      'Storage': '256GB NVMe',
      'Display': '6.7-inch Super Retina XDR OLED 120Hz ProMotion',
      'Chipset': 'Apple A17 Pro (3 nm)',
      'Connectivity': '5G NR, Wi-Fi 6E, Bluetooth 5.3, Dual SIM (nano + eSIM)',
      'Warranty': '1 Year Apple Official'
    },
    variations: [
      { name: 'Color', options: ['Natural Titanium', 'Blue Titanium', 'Black Titanium', 'White Titanium'] },
      { name: 'Storage', options: ['256GB', '512GB (+RWF 280,000)'] }
    ],
    estimatedDeliveryTime: '45–60 mins',
    deliveryFee: 2000,
    badge: 'Official Warranty',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-05',
    name: 'Tecno Camon 30 Pro 5G (12GB RAM + 512GB ROM)',
    slug: 'tecno-camon-30-pro-5g',
    categoryId: 'cat-electronics',
    subcategoryId: 'sub-phones',
    nestedType: 'Tecno & Infinix',
    price: 430000,
    originalPrice: 480000,
    discountPercentage: 10,
    rating: 4.75,
    reviewsCount: 112,
    seller: {
      name: 'Tecno Official Store Rwanda',
      location: 'Grand Pension Plaza, Kigali',
      verified: true,
      rating: 4.8,
      phone: '+250 788 880 123'
    },
    stock: 24,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: '50MP Sony IMX890 OIS camera, 144Hz AMOLED Display, 70W Ultra Charge, and MediaTek Dimensity 8200 Ultimate 5G processor.',
    description: 'Exceptional flagship camera phone designed for night photography and portrait video. Features 12GB Physical RAM extendable by 12GB virtual RAM, 512GB high-speed UFS 3.1 storage, and dual stereo speakers with Dolby Atmos.',
    specifications: {
      'Display': '6.78" 144Hz AMOLED FHD+',
      'Battery': '5000mAh with 70W Fast Charger inside the box',
      'Camera': '50MP OIS Main + 50MP Ultra-wide + 50MP Eye-AF Selfie',
      'Warranty': '13 Months Carlcare Rwanda'
    },
    variations: [
      { name: 'Color', options: ['Iceland Basalt Dark', 'Alps Snowy Silver', 'Sahara Sand Gold'] }
    ],
    estimatedDeliveryTime: '30–45 mins',
    deliveryFee: 1500,
    badge: 'Special Offer',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-06',
    name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    slug: 'sony-wh-1000xm5-headphones',
    categoryId: 'cat-electronics',
    subcategoryId: 'sub-audio',
    nestedType: 'Noise Cancelling Headphones',
    price: 480000,
    originalPrice: 550000,
    discountPercentage: 13,
    rating: 4.9,
    reviewsCount: 53,
    seller: {
      name: 'Kigali Audio & Gadgets',
      location: 'Kigali Heights 1st Floor',
      verified: true,
      rating: 4.9,
      phone: '+250 788 440 221'
    },
    stock: 14,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Industry-leading noise cancellation powered by 2 processors and 8 microphones. 30 hours battery life with quick charging.',
    description: 'Immerse yourself in crystal-clear audio with LDAC high-resolution sound, automated wear detection, and multipoint Bluetooth connection to easily switch between your laptop and phone.',
    specifications: {
      'Battery': '30 Hours (ANC On) / 40 Hours (ANC Off)',
      'Weight': '250 grams ultra-lightweight ergonomic headband',
      'Microphones': '8 Beamforming mics with AI noise reduction'
    },
    variations: [
      { name: 'Color', options: ['Midnight Black', 'Platinum Silver', 'Smoky Navy'] }
    ],
    estimatedDeliveryTime: '30–45 mins',
    deliveryFee: 1200,
    badge: 'Top Rated',
    isFeatured: false,
    isPopular: true
  },
  {
    id: 'prod-premium-wireless-headphones',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    categoryId: 'cat-electronics',
    subcategoryId: 'sub-audio',
    nestedType: 'Headphones',
    price: 45000,
    originalPrice: 60000,
    discountPercentage: 25,
    rating: 4.8,
    reviewsCount: 38,
    seller: {
      name: 'Ishema Electronics',
      location: 'Kigali City Center (CBD), Nyarugenge',
      verified: true,
      rating: 4.9,
      phone: '+250 780 837 936'
    },
    stock: 25,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'High-fidelity audio with deep bass, active ambient noise reduction, soft memory-foam ear cushions, and up to 40 hours of continuous wireless playback.',
    description: 'Experience studio-grade sound quality with the Premium Wireless Headphones from Ishema Electronics. Featuring custom 40mm neodymium dynamic drivers, advanced Bluetooth 5.3 connectivity, crystal-clear hands-free microphone for calls and meetings, and ultra-comfortable ergonomic ear cushions designed for all-day listening. Fully rechargeable via fast USB-C with 4 hours of music from a 10-minute charge. Backed by Ishema Electronics 1-year warranty and express moto delivery across Kigali.',
    specifications: {
      'Bluetooth Version': 'Bluetooth 5.3 + EDR (15m stable range)',
      'Battery Life': 'Up to 40 Hours playtime (USB-C Fast Charging)',
      'Driver Size': '40mm High-Resolution Dynamic Neodymium',
      'Microphone': 'Dual CVC 8.0 noise-cancelling mics for HD calls',
      'Weight': '210g ultra-lightweight foldable design',
      'Connectivity': 'Bluetooth 5.3 Wireless + 3.5mm AUX Audio Jack',
      'Warranty': '1 Year Official Rwandan Warranty from Ishema Electronics'
    },
    variations: [
      { name: 'Color', options: ['Matte Black', 'Platinum Silver', 'Midnight Blue'] }
    ],
    estimatedDeliveryTime: '30–60 mins',
    deliveryFee: 1000,
    badge: '25% OFF',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-08b',
    name: 'Anker Soundcore 2 Portable Bluetooth Speaker (IPX7 Waterproof)',
    slug: 'anker-soundcore-2-speaker',
    categoryId: 'cat-electronics',
    subcategoryId: 'sub-audio',
    nestedType: 'Bluetooth Speakers',
    price: 38000,
    originalPrice: 48000,
    discountPercentage: 21,
    rating: 4.85,
    reviewsCount: 42,
    seller: {
      name: 'Ishema Electronics',
      location: 'Kigali City Center (CBD), Nyarugenge',
      verified: true,
      rating: 4.9,
      phone: '+250 780 837 936'
    },
    stock: 20,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: '12W stereo sound with BassUp technology, 24-hour playtime, and IPX7 waterproof rating.',
    description: 'Portable Bluetooth speaker with rich stereo sound, deep bass response, and all-weather durability. Ideal for home, office, and outdoor adventures in Rwanda.',
    specifications: {
      'Audio Output': '12W Stereo Sound (Dual Neodymium Drivers)',
      'Battery Life': '24 Hours continuous playback (5,200mAh)',
      'Waterproof': 'IPX7 certified waterproof & dustproof',
      'Connectivity': 'Bluetooth 5.0 + 3.5mm AUX'
    },
    variations: [
      { name: 'Color', options: ['Classic Black', 'Ocean Blue', 'Ruby Red'] }
    ],
    estimatedDeliveryTime: '30–45 mins',
    deliveryFee: 1000,
    badge: 'Popular',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-07',
    name: 'Handwoven Agaseke Rwandan Peace Basket & Imigongo Decor',
    slug: 'handwoven-agaseke-peace-basket',
    categoryId: 'cat-household',
    subcategoryId: 'sub-homedecor',
    nestedType: 'Agaseke Handwoven Baskets',
    price: 32000,
    originalPrice: 40000,
    discountPercentage: 20,
    rating: 4.95,
    reviewsCount: 88,
    seller: {
      name: 'Gahanga Women Cultural Cooperative',
      location: 'Gahanga Cultural Center, Kicukiro',
      verified: true,
      rating: 5.0,
      phone: '+250 788 991 223'
    },
    stock: 18,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Traditional authentic Rwandan peace basket meticulously woven from sisal fiber and sweetgrass. Symbol of love, friendship, and hospitality.',
    description: 'Handcrafted over 14 days by master artisan weavers in rural Rwanda. Features the iconic zigzag geometric patterns signifying the Thousand Hills of Rwanda. Makes a stunning centerpiece or keepsake.',
    specifications: {
      'Material': 'Natural Sisal Fiber, Organic Natural Vegetable Dyes',
      'Dimensions': 'Height: 30cm, Base Diameter: 18cm',
      'Crafted in': 'Rwanda (Fair Trade Certified)'
    },
    variations: [
      { name: 'Color Pattern', options: ['Black & Natural Cream', 'Sun Gold & Emerald Green', 'Turquoise & White'] }
    ],
    estimatedDeliveryTime: '40–60 mins',
    deliveryFee: 1000,
    badge: 'Made in Rwanda',
    isFeatured: true,
    isPopular: false
  },
  {
    id: 'prod-08',
    name: 'Nike Air Max 270 React Sneakers (Unisex)',
    slug: 'nike-air-max-270-react',
    categoryId: 'cat-fashion',
    subcategoryId: 'sub-shoes',
    nestedType: 'Sneakers',
    price: 95000,
    originalPrice: 120000,
    discountPercentage: 21,
    rating: 4.8,
    reviewsCount: 76,
    seller: {
      name: 'Kigali Kicks & Sneaker Store',
      location: 'M. Peace Plaza, Nyarugenge',
      verified: true,
      rating: 4.8,
      phone: '+250 788 662 334'
    },
    stock: 22,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Breathable lightweight knit upper with full 270-degree Air heel unit and responsive React foam sole for all-day comfort.',
    description: 'Engineered for street style and athletic performance. Features durable rubber traction outsole, speed lacing system, and cushioned collar.',
    specifications: {
      'Upper': 'Flyknit mesh with synthetic overlays',
      'Midsole': 'Nike React foam with Max Air 270 unit',
      'Authenticity': '100% Original with box'
    },
    variations: [
      { name: 'EU Size', options: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'] },
      { name: 'Colorway', options: ['Black / Red Crimson', 'Triple White', 'Navy / Wolf Grey'] }
    ],
    estimatedDeliveryTime: '30–50 mins',
    deliveryFee: 1200,
    badge: 'Top Fashion',
    isFeatured: false,
    isPopular: true
  },
  {
    id: 'prod-09',
    name: 'Inyange Pure Passion Fruit & Mango Juice 1L (Pack of 6)',
    slug: 'inyange-pure-juice-pack-6',
    categoryId: 'cat-drinks',
    subcategoryId: 'sub-juices',
    nestedType: 'Inyange Pure Juices',
    price: 7800,
    originalPrice: 9000,
    discountPercentage: 13,
    rating: 4.9,
    reviewsCount: 164,
    seller: {
      name: 'Simba Supermarket Express',
      location: 'Centenary House, Kigali City Center',
      verified: true,
      rating: 4.9,
      phone: '+250 788 310 000'
    },
    stock: 50,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: '100% pasteurized tropical juice from locally grown Rwandan passion fruits and mangoes. No artificial preservatives.',
    description: 'Refreshing taste rich in natural Vitamin C. Perfect chilled for family dinners, breakfast tables, and office gatherings.',
    specifications: {
      'Volume': '6 x 1000ml Tetra Pak Cartons',
      'Origin': 'Inyange Industries Masaka, Kigali',
      'Storage': 'Store in cool place; refrigerate after opening'
    },
    variations: [
      { name: 'Flavor', options: ['Mixed Passion & Mango', 'Pure Passion Fruit', 'Apple & Guava'] }
    ],
    estimatedDeliveryTime: '20–35 mins',
    deliveryFee: 1000,
    badge: 'Fresh Daily',
    isFeatured: false,
    isPopular: true
  },
  {
    id: 'prod-10',
    name: 'Organic Shea Butter & Rosehip Radiance Face Serum (50ml)',
    slug: 'organic-shea-butter-rosehip-serum',
    categoryId: 'cat-beauty',
    subcategoryId: 'sub-skincare',
    nestedType: 'Hydrating Serums',
    price: 18500,
    originalPrice: 24000,
    discountPercentage: 23,
    rating: 4.88,
    reviewsCount: 62,
    seller: {
      name: 'Afia Botanicals Kigali',
      location: 'Kacyiru KG 7 Ave, Kigali',
      verified: true,
      rating: 4.9,
      phone: '+250 788 512 889'
    },
    stock: 30,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Concentrated antioxidant formulation with cold-pressed rosehip oil, pure East African shea butter, niacinamide, and hyaluronic acid.',
    description: 'Target hyperpigmentation, soothe inflammation, and restore natural skin barrier radiance. Suitable for all melanin-rich skin tones in Rwanda’s sunny climate.',
    specifications: {
      'Size': '50ml glass dropper bottle',
      'Skin Type': 'All skin types, non-comedogenic',
      'Certification': 'Dermatologically tested & cruelty-free'
    },
    variations: [
      { name: 'Formula', options: ['Day Glow Formula with Vitamin C', 'Night Repair with Retinol 0.2%'] }
    ],
    estimatedDeliveryTime: '30–45 mins',
    deliveryFee: 1000,
    badge: 'Organic',
    isFeatured: true,
    isPopular: false
  },
  {
    id: 'prod-11',
    name: 'Fresh Lake Kivu Whole Tilapia Fish (1kg - Cleaned & Spiced)',
    slug: 'fresh-lake-kivu-whole-tilapia',
    categoryId: 'cat-food',
    subcategoryId: 'sub-local',
    nestedType: 'Ugali & Tilapia',
    price: 8000,
    originalPrice: 9500,
    discountPercentage: 16,
    rating: 4.95,
    reviewsCount: 130,
    seller: {
      name: 'Lake Kivu Fresh Catch Market',
      location: 'Kimironko Market / Nyabugogo Branch',
      verified: true,
      rating: 4.9,
      phone: '+250 788 333 444'
    },
    stock: 25,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Caught daily from the pristine waters of Lake Kivu. Cleaned, scaled, and marinated with fresh garlic, ginger, and local herbs.',
    description: 'Ready to deep-fry or grill on charcoal. Served traditionally with plantains (dodo/igitoki) or ugali and fresh hot pili-pili relish.',
    specifications: {
      'Weight': 'Approx. 1.0kg - 1.2kg (Cleaned)',
      'Source': 'Lake Kivu, Rubavu Region',
      'Condition': 'Chilled fresh, packed in ice carrier box'
    },
    variations: [
      { name: 'Preparation', options: ['Marinated with Garlic & Herbs', 'Plain Cleaned (No Spice)'] }
    ],
    estimatedDeliveryTime: '35–50 mins',
    deliveryFee: 1400,
    badge: 'Fresh Catch',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-12',
    name: 'NutriBullet Pro 900W High-Speed Kitchen Blender',
    slug: 'nutribullet-pro-900w-blender',
    categoryId: 'cat-household',
    subcategoryId: 'sub-kitchen',
    nestedType: 'Blenders & Juicers',
    price: 135000,
    originalPrice: 160000,
    discountPercentage: 16,
    rating: 4.85,
    reviewsCount: 41,
    seller: {
      name: 'Kigali Home Appliances Ltd',
      location: 'Remera Corner, KG 11 Ave',
      verified: true,
      rating: 4.8,
      phone: '+250 788 220 911'
    },
    stock: 12,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    shortDescription: '900-watt motor power to pulverize whole fruits, vegetables, seeds, and ice in seconds for velvety smoothies and purées.',
    description: 'Comes with two BPA-free to-go cups, extractor blade, flip-top travel lids, and recipe guidebook. 220V compliant with Rwandan electrical sockets.',
    specifications: {
      'Power': '900 Watts high-torque motor',
      'Capacity': '900ml Colossal Cup + 700ml Tall Cup',
      'Warranty': '1 Year Full Replacement Warranty'
    },
    variations: [
      { name: 'Color', options: ['Champagne Metallic', 'Matte Black', 'Brushed Silver'] }
    ],
    estimatedDeliveryTime: '35–50 mins',
    deliveryFee: 1500,
    badge: 'Warranty',
    isFeatured: false,
    isPopular: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-RW-9021',
    trackingNumber: 'ISH-RW-9021',
    customer: {
      fullName: 'Jean-Claude Mutabazi',
      phone: '+250 788 412 990',
      email: 'jcmutabazi@gmail.com',
      address: 'Villa 14, KG 674 St, Kimihurura',
      district: 'Gasabo',
      notes: 'Call on arrival at the gate, ring security bell.'
    },
    deliveryLocation: { lat: -1.9536, lng: 30.0910, label: 'Kimihurura, KG 674 St' },
    landmarkDetails: {
      landmark: 'Near Kigali Convention Centre',
      buildingName: 'Villa 14',
      gateDescription: 'Black iron gate with stone pillars',
      instructions: 'Call on arrival at the gate, ring security bell.'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Kigali Supreme Chicken Pizza
        quantity: 2,
        selectedVariations: { Size: 'Large (14 inch)', 'Extra Cheese': 'Double Mozzarella (+RWF 1,500)' }
      },
      {
        product: INITIAL_PRODUCTS[8], // Inyange Pure Juices
        quantity: 1,
        selectedVariations: { Flavor: 'Mixed Passion & Mango' }
      }
    ],
    subtotal: 25800,
    deliveryFee: 1200,
    total: 27000,
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'Paid',
    status: 'Out for Delivery',
    createdAt: '2026-09-15 06:45 AM',
    assignedDriver: INITIAL_DRIVERS[0],
    timeline: [
      { status: 'Order Placed', timestamp: '06:45 AM', location: 'Ishema Express System', note: 'Order received and verified' },
      { status: 'Payment Confirmed', timestamp: '06:46 AM', location: 'MTN MoMo Gateway', note: 'Payment of RWF 27,000 confirmed' },
      { status: 'Preparing Order', timestamp: '06:50 AM', location: 'Sol e Luna Kitchen', note: 'Chefs baking wood-fired pizza' },
      { status: 'Driver Assigned', timestamp: '07:05 AM', location: 'Kimihurura Hub', note: 'Jean-Paul Habimana accepted the delivery' },
      { status: 'Out for Delivery', timestamp: '07:15 AM', location: 'KG 9 Ave on Route', note: 'Driver en-route to customer (ETA 10 mins)' }
    ]
  },
  {
    id: 'ORD-RW-8821',
    trackingNumber: 'ISH-RW-8821',
    customer: {
      fullName: 'Diane Mukakarangwa',
      phone: '+250 783 661 240',
      email: 'diane.muka@yahoo.com',
      address: 'Apt B4, Kigali View Residences, Kiyovu',
      district: 'Nyarugenge',
      notes: 'Third floor apartment.'
    },
    deliveryLocation: { lat: -1.9610, lng: 30.0620, label: 'Kiyovu, Kigali View Residences' },
    landmarkDetails: {
      landmark: 'Near Kigali Marriott Hotel',
      buildingName: 'Kigali View Residences',
      gateDescription: 'White sliding gate with security booth',
      instructions: 'Third floor apartment B4, ask guard for lift access.'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[2], // Coffee Beans
        quantity: 2,
        selectedVariations: { 'Grind Type': 'Medium (Filter / Drip)' }
      }
    ],
    subtotal: 17000,
    deliveryFee: 1000,
    total: 18000,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Driver Assigned',
    createdAt: '2026-09-15 07:00 AM',
    assignedDriver: INITIAL_DRIVERS[1],
    timeline: [
      { status: 'Order Placed', timestamp: '07:00 AM', location: 'Ishema Express App', note: 'Order booked by customer' },
      { status: 'Payment Confirmed', timestamp: '07:02 AM', location: 'Payment Desk', note: 'Cash on Delivery approved' },
      { status: 'Preparing Order', timestamp: '07:08 AM', location: 'Question Coffee Hub', note: 'Fresh beans packed & sealed' },
      { status: 'Driver Assigned', timestamp: '07:14 AM', location: 'Kiyovu Express Station', note: 'Driver Emmanuel Mugisha en route to merchant' }
    ]
  },
  {
    id: 'ORD-GIFT-7701',
    trackingNumber: 'ISH-RW-GIFT77',
    isSurprise: true,
    deliveryLocation: { lat: -1.9510, lng: 30.0880, label: 'Kimihurura, KG 9 Ave' },
    landmarkDetails: {
      landmark: 'Near Lemigo Hotel',
      buildingName: 'House #45',
      gateDescription: 'Green gate next to Lemigo Hotel parking',
      instructions: 'Do NOT say who sent it! Secret delivery surprise.'
    },
    surpriseConfig: {
      isSurprise: true,
      recipientName: 'Keza Umulisa',
      recipientPhone: '+250 788 554 991',
      deliveryAddress: 'KG 9 Ave, House #45, Near Lemigo Hotel, Kimihurura',
      deliveryDistrict: 'Gasabo - Kimihurura',
      landmarkInstructions: 'Green gate next to Lemigo Hotel parking. Do NOT say who sent it! Secret delivery surprise.',
      occasion: 'Birthday',
      customOccasion: '',
      scheduledDate: '2026-09-17',
      scheduledTimeWindow: 'Evening (17:00 - 20:00)',
      secretMessage: 'Happy Birthday Keza! 🎉 You don’t have to be there to make someone smile. Someone special is thinking about you with all their heart ❤️ Enjoy the sweet celebration!',
      secretLanguage: 'en',
      revealOption: 'reveal_after_delivery',
      senderRealName: 'David Nshimiyimana',
      senderRealPhone: '+250 788 123 789',
      giftWrappingStyle: 'royal-gold',
      selectedAddOns: ['fresh-roses', 'rwanda-chocolate', 'calligraphy-card'],
      deliveryOtp: '4912',
      isRevealed: false
    },
    customer: {
      fullName: 'A Surprise Gift from Ishema Express',
      phone: '+250 788 554 991',
      email: 'secret-gift@ishemaexpress.rw',
      address: 'KG 9 Ave, House #45, Near Lemigo Hotel, Kimihurura',
      district: 'Gasabo - Kimihurura',
      notes: 'SECRET SURPRISE DELIVERY: Strictly confidential. Do NOT reveal sender name under any circumstances.'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedVariations: { Size: 'Large (14 inch)', 'Gift Box': 'Royal Gold Ribbon Wrap' }
      },
      {
        product: INITIAL_PRODUCTS[8],
        quantity: 2,
        selectedVariations: { Flavor: 'Mixed Passion & Mango' }
      }
    ],
    subtotal: 35000,
    deliveryFee: 1500,
    total: 36500,
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'Paid',
    status: 'Out for Delivery',
    createdAt: '2026-09-17 07:30 AM',
    assignedDriver: INITIAL_DRIVERS[0],
    timeline: [
      { status: 'Order Placed', timestamp: '07:30 AM', location: 'Ishema Surprise Gift Desk', note: 'Surprise gift order booked & paid with MTN MoMo. Sender identity protected.' },
      { status: 'Payment Confirmed', timestamp: '07:31 AM', location: 'MTN MoMo Verified', note: 'Payment of RWF 36,500 completed anonymously' },
      { status: 'Preparing Order', timestamp: '07:45 AM', location: 'Ishema Gifting Atelier', note: 'Deluxe gift box wrapped with Royal Gold satin ribbon & secret calligraphy card inserted' },
      { status: 'Driver Assigned', timestamp: '08:00 AM', location: 'Kigali Dispatch Hub', note: 'Driver Jean-Paul Habimana assigned with Secret Delivery Protocol (Sender hidden)' },
      { status: 'Out for Delivery', timestamp: '08:15 AM', location: 'Kimihurura KG 9 Ave', note: 'Courier approaching destination: "You have a surprise delivery from Ishema Express!"' }
    ]
  }
];

export const INITIAL_BOOKINGS: DeliveryBooking[] = [
  {
    id: 'BKG-RW-7482',
    trackingNumber: 'ISH-RW-7482',
    senderName: 'Apex Legal Consultants Ltd',
    senderPhone: '+250 788 450 119',
    pickupAddress: 'Kigali City Tower, Level 8, Nyarugenge',
    pickupDistrict: 'Nyarugenge',
    recipientName: 'Kigali Heights Management Office',
    recipientPhone: '+250 788 901 332',
    deliveryAddress: 'Kigali Heights West Wing 4th Floor, Kimihurura',
    deliveryDistrict: 'Gasabo',
    packageType: 'Documents',
    vehicleType: 'Moto Express',
    preferredTime: 'Immediate Express (30 mins)',
    fee: 2000,
    status: 'In Transit',
    createdAt: '2026-09-15 06:55 AM',
    estimatedArrival: '07:35 AM',
    assignedDriver: INITIAL_DRIVERS[0],
    notes: 'Confidential corporate contracts in waterproof envelope.',
    timeline: [
      { status: 'Order Received', timestamp: '06:55 AM', location: 'Ishema Dispatch', note: 'Courier request booked' },
      { status: 'Driver Assigned', timestamp: '07:00 AM', location: 'CBD Hub', note: 'Jean-Paul dispatched to Kigali City Tower' },
      { status: 'Picked Up', timestamp: '07:12 AM', location: 'Kigali City Tower Level 8', note: 'Package received from sender' },
      { status: 'In Transit', timestamp: '07:16 AM', location: 'Boulevard de l’Umuganda', note: 'Driver proceeding to Kigali Heights' }
    ]
  }
];
