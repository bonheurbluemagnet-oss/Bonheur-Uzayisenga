import { SurpriseGiftPackage, SurpriseGiftAddOn } from '../types';

export const SURPRISE_OCCASIONS = [
  { id: 'Birthday', label: 'Birthday', icon: '🎂', description: 'Celebrate another wonderful year with joy and cake' },
  { id: 'Anniversary', label: 'Anniversary', icon: '❤️', description: 'Celebrate enduring love and memorable milestones' },
  { id: 'Valentine', label: "Valentine's Day", icon: '🌹', description: 'Romantic flowers, sweets, and heartfelt whispers' },
  { id: 'Wedding', label: 'Wedding', icon: '💍', description: 'Blessings for the bride, groom, and newly married couples' },
  { id: 'Graduation', label: 'Graduation', icon: '🎓', description: 'Honoring hard work, academic success, and new chapters' },
  { id: 'Baby shower', label: 'Baby Shower', icon: '🍼', description: 'Welcoming the new precious addition to the family' },
  { id: "Mother's Day", label: "Mother's Day", icon: '🌸', description: 'Warm appreciation and pampering gifts for mama' },
  { id: "Father's Day", label: "Father's Day", icon: '👔', description: 'Distinguished, hearty gifts for an exceptional father' },
  { id: 'Thank you', label: 'Thank You', icon: '🙏', description: 'Express sincere gratitude and deep appreciation' },
  { id: 'Congratulations', label: 'Congratulations', icon: '🥂', description: 'Raise a glass to new jobs, achievements, or wins' },
  { id: 'Get well soon', label: 'Get Well Soon', icon: '💐', description: 'Sending healing comfort, nourishing tea, and warmth' },
  { id: 'Just because', label: 'Just Because', icon: '✨', description: 'No reason needed to put an unexpected smile on their face' },
  { id: 'Custom occasion', label: 'Custom Occasion', icon: '✍️', description: 'Personalized celebration tailored to your story' }
];

export const GIFT_WRAPPING_OPTIONS = [
  {
    id: 'royal-gold',
    name: 'Ishema Royal Gold & Satin',
    price: 3000,
    badge: 'Signature',
    description: 'Pearlescent ivory hard box tied with hand-pressed gold satin ribbon & wax seal.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'imigongo-heritage',
    name: 'Rwandan Imigongo Heritage',
    price: 3500,
    badge: 'Local Art',
    description: 'Textured recycled kraft paper featuring iconic Rwandan geometric Imigongo motifs.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'midnight-velvet',
    name: 'Midnight Velvet & Silver',
    price: 4000,
    badge: 'Luxury',
    description: 'Deep midnight navy velvet touch finish accented with an ornate silver silk rosette.',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'floral-blossom',
    name: 'Blush Blossom & Botanical Sprig',
    price: 2500,
    badge: 'Eco Chic',
    description: 'Soft pastel blush casing adorned with a fresh natural eucalyptus or baby breath sprig.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80'
  }
];

export const SURPRISE_ADDONS: SurpriseGiftAddOn[] = [
  {
    id: 'fresh-roses',
    name: 'Fresh Kigali Red Roses (Bouquet)',
    price: 5500,
    iconName: 'Flower2',
    description: 'Hand-picked long stem red roses from Gicumbi florists.',
    badge: 'Most Popular'
  },
  {
    id: 'rwanda-chocolate',
    name: 'Gourmet Single-Origin Chocolate Bar',
    price: 3500,
    iconName: 'Gift',
    description: 'Artisanal dark chocolate crafted from organic Rwandan cacao beans.',
    badge: 'Artisan'
  },
  {
    id: 'celebration-balloon',
    name: 'Helium Celebration Balloon',
    price: 2000,
    iconName: 'Sparkles',
    description: 'Floating festive foil balloon matched to your occasion.'
  },
  {
    id: 'calligraphy-card',
    name: 'Handwritten Calligraphy Greeting Card',
    price: 1500,
    iconName: 'HeartHandshake',
    description: 'Our in-house calligrapher pens your secret message on heavy parchment cardstock.'
  },
  {
    id: 'mini-cake',
    name: 'Mini Red Velvet Celebration Cake (Kigali Bakery)',
    price: 6500,
    iconName: 'Cake',
    description: 'Fresh baked 4-inch individual celebration cake with sparkling candle.'
  }
];

export const CURATED_SURPRISE_PACKAGES: SurpriseGiftPackage[] = [
  {
    id: 'pkg-birthday-bliss',
    name: 'Birthday Extravaganza Package',
    occasion: 'Birthday',
    tagline: 'Make their birthday unforgettable from afar',
    price: 38000,
    originalPrice: 45000,
    category: 'Celebration',
    badge: 'Best Seller',
    popular: true,
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&auto=format&fit=crop&q=80',
    items: [
      'Fresh Vanilla Buttercream Gourmet Cake (feeds 4)',
      'Deluxe Birthday Card with Gold Foil',
      'Festive Confetti Popper & Sparkler',
      'Box of 6 Belgian & Rwandan Truffles',
      'Surprise Delivery with Anonymous Courier Protocol'
    ],
    longDescription: 'Send pure joy straight to their door in Kigali or across Rwanda. Includes a fresh bakery cake, artisan truffles, and full celebratory party flair without spoiling the surprise.'
  },
  {
    id: 'pkg-romantic-whisper',
    name: 'Romantic Elegance Package',
    occasion: 'Anniversary',
    tagline: 'Someone special is thinking about you',
    price: 49000,
    originalPrice: 58000,
    category: 'Romance',
    badge: 'Couple Favorite',
    popular: true,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80',
    items: [
      'Dozen Premium Crimson Red Roses',
      'Artisan Cocoa Praline Box (12 Pieces)',
      'Scented Jasmine & Sandalwood Candle in Glass',
      'Wax-Sealed Secret Envelope with Your Words',
      'Optional Post-Delivery Sender Reveal'
    ],
    longDescription: 'Express your deepest affection. Whether you are miles away or secretly arranging a magical moment in town, this romantic bundle delivers elegance and heart-fluttering surprise.'
  },
  {
    id: 'pkg-mothers-grace',
    name: "Mother's Warm Comfort Hamper",
    occasion: "Mother's Day",
    tagline: 'A royal gesture of gratitude for mama',
    price: 42000,
    originalPrice: 49000,
    category: 'Appreciation',
    badge: 'Emotional',
    popular: false,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    items: [
      'Silver Tin of Rwandan Organic Herbal Tea (Silverback Blend)',
      '100% Pure Gisagara Wild Honey Pot',
      'Hand-Woven Traditional Agaseke Peace Basket',
      'Soft Cashmere-Blend Shawl',
      'Custom Motherly Blessing Card'
    ],
    longDescription: 'Honor the loving mother in your life. Wrapped in warm Rwandan craftsmanship and comforting teas, delivered with respectful, courteous driver etiquette.'
  },
  {
    id: 'pkg-fathers-distinction',
    name: "Father's Gentleman Reserve",
    occasion: "Father's Day",
    tagline: 'Distinguished gifts for a remarkable mentor',
    price: 46000,
    originalPrice: 52000,
    category: 'Men',
    badge: 'Premium',
    popular: false,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    items: [
      'Single-Origin Bourbon Roasted Coffee Beans (Huye Mountain)',
      'Hand-Stitched Rwandan Genuine Leather Wallet',
      'Brushed Stainless Steel Thermos Tumbler',
      'Artisan Dark Chocolate Espresso Bark',
      'Discreet Surprise Gift Presentation Box'
    ],
    longDescription: 'A classic, tasteful gift set for dad, an uncle, or an esteemed colleague. Practical, luxurious, and guaranteed to earn a proud smile.'
  },
  {
    id: 'pkg-graduation-pride',
    name: 'Graduation Scholar Package',
    occasion: 'Graduation',
    tagline: 'Honor academic achievement and big milestones',
    price: 36000,
    category: 'Milestone',
    badge: 'Celebration',
    popular: false,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    items: [
      'Commemorative Graduation Plush Bear with Cap & Gown',
      'Heavy Metal Engraved Executive Pen',
      'Box of Assorted Swiss Milk & Hazelnut Chocolates',
      'Gold Embossed "Future Leader" Commemorative Card',
      'Surprise Delivery directly to Campus or Home'
    ],
    longDescription: 'Congratulate a graduate from UR, ALU, CMU-Africa, or secondary school with honors. Secret delivery makes the triumph even more electric.'
  },
  {
    id: 'pkg-kids-wonder',
    name: 'Kids Wonder & Joy Bundle',
    occasion: 'Just because',
    tagline: 'Wide smiles, laughter, and playful surprises',
    price: 29000,
    category: 'Kids',
    badge: 'Joyful',
    popular: false,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
    items: [
      'Ultra-Soft Cuddle Bear or Safari Animal Plush',
      'Rainbow Coloring Book & 24 Art Pencils',
      'Assorted Fruit Candies & Sweet Milk Biscuits',
      'Festive Floating Star Balloon',
      'Playful Secret Detective Clue Card'
    ],
    longDescription: 'Delight a little one on their birthday or special day. Children adore the mystery of receiving an unexpected surprise package marked "For Your Eyes Only".'
  },
  {
    id: 'pkg-corporate-esteem',
    name: 'Executive Corporate Recognition',
    occasion: 'Congratulations',
    tagline: 'Premium professional appreciation for partners and staff',
    price: 55000,
    originalPrice: 65000,
    category: 'Corporate',
    badge: 'Executive',
    popular: false,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    items: [
      'Premium Hardbound Leather Notebook (200 GSM)',
      'Akagera Reserve Specialty Roast Coffee (250g)',
      'Matte Black Stylus & Rollerball Pen in Case',
      'Gourmet Salted Almonds & Macadamia Nuts Jar',
      'Formal Congratulatory Parchment Letter'
    ],
    longDescription: 'Show clients, employees, or business associates they are valued. High elegance, discreet white-glove courier delivery.'
  },
  {
    id: 'pkg-luxury-opulence',
    name: 'The Crown Imperial Luxury Hamper',
    occasion: 'Anniversary',
    tagline: 'The ultimate bespoke expression of grandeur',
    price: 95000,
    originalPrice: 110000,
    category: 'Luxury',
    badge: 'VIP Elite',
    popular: true,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&auto=format&fit=crop&q=80',
    items: [
      'French Designer Eau de Parfum (50ml)',
      'Grand Box of Imported French & Belgian Truffles',
      'Fresh Exotic Orchid Stem in Ceramic Vase',
      'Silk Ribbon Finished Imigongo Keepsake Box',
      'Dedicated VIP Courier Handoff with Silver Gift Bag'
    ],
    longDescription: 'When only the very best will do. Crafted for milestone anniversaries, high-profile achievements, or deep personal romance.'
  }
];

export const PRESET_MESSAGES = {
  rw: [
    { label: 'Isabukuru Nziza', text: 'Isabukuru nziza cyane! Iyi mpano ikwereke urukundo n’agaciro ukwiye. Umunsi mwiza! 🎉❤️' },
    { label: 'Urakunzwe cyane', text: 'Hari uwagutekerejeho by’umwihariko uyu munsi. Ntiwibagirwe ko uri umugisha ku buzima bwacu! ✨' },
    { label: 'Urugendo rwiza / Kwishimira', text: 'Kwishimira intsinzi yawe! Imana ikomeze kuguha imigisha mu byo ukora byose. 🥂' },
    { label: 'Gukira vuba', text: 'Kira vuba ncuti yanjye! Turagusabira imbaraga n’ubuzima buzira umuze. 💐' },
    { label: 'Gusa kuko uri wowe', text: 'Nta mpamvu yihariye, gusa nashakaga kukubona useka uyu munsi! Fungura wishime. 🎁' }
  ],
  en: [
    { label: 'Happy Birthday', text: 'Happy Birthday! 🎉 May this special day bring you as much joy, smiles, and warmth as you bring to everyone around you.' },
    { label: 'Someone Special', text: 'Someone special is thinking about you right now ❤️ You don’t have to be there to know you are deeply loved.' },
    { label: 'Open When Home', text: 'Open this when you get home! ✨ Take a quiet breath, unwrap this surprise, and know someone cares deeply.' },
    { label: 'Congratulations', text: 'Huge congratulations on your big achievement! 🥂 So proud of how hard you have worked to reach this milestone.' },
    { label: 'Just Because', text: 'No occasion needed — just wanted to put an unexpected smile on your face today. Enjoy every moment! 🌸' }
  ],
  fr: [
    { label: 'Joyeux Anniversaire', text: 'Joyeux Anniversaire ! 🎉 Que cette journée t’apporte d’immenses bonheurs, de rires et de merveilleux souvenirs.' },
    { label: 'Pensée Spéciale', text: 'Une personne très spéciale pense fort à toi en ce moment ❤️ Reçois toute mon affection à travers cette surprise.' },
    { label: 'Félicitations', text: 'Toutes mes félicitations pour cette belle réussite ! 🥂 Ton travail et ta persévérance sont dignes d’admiration.' },
    { label: 'Juste Pour Toi', text: 'Juste pour illuminer ta journée et te faire sourire ! Prends bien soin de toi. 💐' }
  ]
};
