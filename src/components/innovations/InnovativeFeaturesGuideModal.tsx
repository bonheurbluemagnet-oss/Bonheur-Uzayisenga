import React, { useState } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  Bot,
  Layers,
  Users,
  Store,
  Camera,
  Search,
  Truck,
  Percent,
  Gift,
  Wheat,
  Send,
  ShieldCheck,
  Wallet,
  WifiOff,
  ShoppingBag,
  Briefcase,
  Flame,
  Globe,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export interface InnovativeFeaturesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeatureItem {
  number: number;
  title: string;
  tagline: string;
  category: 'AI & Signature' | 'Smart Delivery' | 'Community & Local' | 'Commerce & Trust';
  icon: any;
  iconBg: string;
  description: string;
  keyDetails: string[];
  actionLabel?: string;
  onAction?: () => void;
}

export const InnovativeFeaturesGuideModal: React.FC<InnovativeFeaturesGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    setCurrentView,
    setIsSearchByPhotoOpen,
    setIsRequestProductOpen,
    setIsGroupOrderModalOpen,
    setIsBookingModalOpen,
    setIsWalletModalOpen,
    toggleLowDataMode,
    isLowDataMode
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const features: FeatureItem[] = [
    {
      number: 1,
      title: 'Smart Landmark Delivery',
      tagline: 'Precision navigation tailored for Rwandan neighborhood landmarks',
      category: 'Smart Delivery',
      icon: MapPin,
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      description:
        'Allows customers to specify GPS pin, street name, nearby landmark (e.g., Near Simba Supermarket, BK Arena), written directions, and gate description so moto couriers reach them without confusion.',
      keyDetails: [
        'Interactive Leaflet GPS location picker with Kigali sectors',
        'Auto-suggest for popular landmarks across Gasabo, Kicukiro & Nyarugenge',
        'Written directions like "2nd black gate past yellow MTN kiosk"',
        'Entrance description field for seamless driver arrival'
      ],
      actionLabel: 'View in Checkout',
      onAction: () => {
        onClose();
        setCurrentView('checkout');
      }
    },
    {
      number: 2,
      title: 'AI Shopping Assistant',
      tagline: 'Natural language product recommendations based on budget and group size',
      category: 'AI & Signature',
      icon: Bot,
      iconBg: 'bg-amber-500/10 text-amber-600',
      description:
        'Customers can type requests like “I have 20,000 RWF. Find dinner for four people.” The system recommends matching items based on budget, portions, location, and speed.',
      keyDetails: [
        'Understands natural budget constraints in Rwandan Francs (RWF)',
        'Calculates portions for families, friend groups, or single diners',
        'Considers Kigali district delivery timelines and store availability',
        'Gives instant 1-click add-to-cart bundles'
      ],
      actionLabel: 'Try in Home Hero',
      onAction: () => {
        onClose();
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      number: 3,
      title: 'One Cart, Multiple Stores',
      tagline: 'Purchase from supermarkets, bakeries & pharmacies in a single transaction',
      category: 'Commerce & Trust',
      icon: Layers,
      iconBg: 'bg-blue-500/10 text-blue-600',
      description:
        'Allows customers to buy from multiple independent vendors in one checkout. Ishema Express groups items by seller, coordinates consolidated pickups, and discounts combined delivery.',
      keyDetails: [
        'Multi-store item grouping in cart with individual merchant badges',
        'Automated multi-store delivery fee calculation with bundle discounts',
        'Consolidated dispatch coordinating motorcycle courier collection routes',
        'Transparent itemized digital receipts per store'
      ],
      actionLabel: 'Open Cart',
      onAction: () => {
        onClose();
        setCurrentView('cart');
      }
    },
    {
      number: 4,
      title: 'Group Ordering',
      tagline: 'Collaborative team, office, and family carts with shared codes',
      category: 'Commerce & Trust',
      icon: Users,
      iconBg: 'bg-indigo-500/10 text-indigo-600',
      description:
        'Offices, families, and friends create a shared cart via unique group code or WhatsApp invite. Members add their own items while the host reviews and confirms the single group delivery.',
      keyDetails: [
        'Instant shareable code (e.g. ISH-GRP-7412) & WhatsApp invite generation',
        'Real-time participant item tracking with individual member tags',
        'Flexible bill split calculation and combined delivery savings',
        'Cutoff timer to lock group orders before dispatch'
      ],
      actionLabel: 'Launch Group Order',
      onAction: () => {
        onClose();
        setIsGroupOrderModalOpen(true);
      }
    },
    {
      number: 5,
      title: 'Buy Local Rwanda',
      tagline: 'Dedicated digital storefront for Made in Rwanda artisans & producers',
      category: 'Community & Local',
      icon: Store,
      iconBg: 'bg-amber-600/10 text-amber-700',
      description:
        'Showcases local Rwandan farmers, craftspeople, fashion designers (Inziza Crafts, Haute Rwanda), and food makers without requiring them to build their own e-commerce websites.',
      keyDetails: [
        'Verified Made in Rwanda certification badge',
        'Authentic Agaseke peace baskets, Imigongo art, and handwoven textiles',
        'Direct connection to Rwandan cooperatives and fashion ateliers',
        'Cultural storytelling spotlighting local creators and artisans'
      ],
      actionLabel: 'Explore Buy Local',
      onAction: () => {
        onClose();
        setCurrentView('buy-local');
      }
    },
    {
      number: 6,
      title: 'Search by Photo',
      tagline: 'Visual AI image recognition to discover products across Kigali stores',
      category: 'AI & Signature',
      icon: Camera,
      iconBg: 'bg-rose-500/10 text-rose-600',
      description:
        'Upload or snap a photo of any grocery item, fashion piece, or household product. The system analyzes the image and matches it to products on Ishema Express with prices, ratings, and sellers.',
      keyDetails: [
        'Multimodal image analysis powered by Gemini vision',
        'Live sample presets for Rwandan coffee, Agaseke baskets, and fresh produce',
        'Camera snapshot and file drag-and-drop support',
        'Matches items with real-time stock and express delivery times'
      ],
      actionLabel: 'Open Photo Search',
      onAction: () => {
        onClose();
        setIsSearchByPhotoOpen(true);
      }
    },
    {
      number: 7,
      title: 'Request Anything (“Request a Product”)',
      tagline: 'Crowdsourced concierge sourcing items not yet listed in the catalog',
      category: 'Commerce & Trust',
      icon: Search,
      iconBg: 'bg-teal-500/10 text-teal-600',
      description:
        'If a customer cannot find a specific item, they can describe it or upload a photo with their target budget. Ishema Express scouts partner stores across Kigali and sends back verified quotes.',
      keyDetails: [
        'Custom budget specification in RWF and urgency setting',
        'Partner store network scouting across Kigali commercial zones',
        'Live offer quotes with estimated arrival minutes and price breakdown',
        '1-click conversion into an express delivery order'
      ],
      actionLabel: 'Request a Product',
      onAction: () => {
        onClose();
        setIsRequestProductOpen(true);
      }
    },
    {
      number: 8,
      title: 'Smart Delivery Pooling',
      tagline: 'Batch nearby orders to save delivery fees and reduce carbon footprint',
      category: 'Smart Delivery',
      icon: Truck,
      iconBg: 'bg-emerald-600/10 text-emerald-700',
      description:
        'When several customers in the same sector (e.g. Kimihurura, Remera, Gacuriro) order around the same window, orders are pooled to save up to 35% on delivery fees and optimize courier fuel.',
      keyDetails: [
        'Neighborhood pooling toggle directly inside cart and checkout',
        'Automatic 500 RWF pooling discount applied to delivery fee',
        'Cluster routing optimizing courier moto runs across Kigali sectors',
        'Eco-friendly delivery badge supporting Rwandan green mobility'
      ],
      actionLabel: 'View in Cart',
      onAction: () => {
        onClose();
        setCurrentView('cart');
      }
    },
    {
      number: 9,
      title: 'Ishema Deals',
      tagline: 'Verified supermarket markdowns, flash sales, and BOGO bundles',
      category: 'Commerce & Trust',
      icon: Percent,
      iconBg: 'bg-red-500/10 text-red-600',
      description:
        'A dedicated bargain hub featuring daily flash sales, supermarket discounts from Simba, Sawa City & Ndoli, free delivery promo codes, and weekend specials.',
      keyDetails: [
        'Live countdown timers for expiring daily flash offers',
        'Clear price strikethroughs with calculated percentage savings',
        'Multi-pack and Buy-One-Get-One (BOGO) bundles',
        '1-click direct add to cart with instant price synchronization'
      ],
      actionLabel: 'View Hot Deals',
      onAction: () => {
        onClose();
        setCurrentView('deals');
      }
    },
    {
      number: 10,
      title: 'Ishema Gift (Surprise Delivery)',
      tagline: 'Full-service gifting with custom cards, luxury ribbons, and secret reveals',
      category: 'Community & Local',
      icon: Gift,
      iconBg: 'bg-pink-500/10 text-pink-600',
      description:
        'Customers select an occasion (Birthday, Anniversary, Appreciation, Valentine’s), recipient contact, and budget. The concierge bundles the items, adds luxury packaging, and delivers the surprise.',
      keyDetails: [
        'Custom card messages with personalized Rwandan greetings',
        'Anonymous surprise mode (driver only reveals sender upon door arrival)',
        'Curated celebration packages for cakes, flowers, chocolates, and wine',
        'Recipient surprise reveal page with animated unboxing experience'
      ],
      actionLabel: 'Explore Surprise Gifts',
      onAction: () => {
        onClose();
        setCurrentView('surprise-gift');
      }
    },
    {
      number: 11,
      title: 'Farmer-to-Customer Marketplace',
      tagline: 'Direct cooperative farm-gate produce without middleman markups',
      category: 'Community & Local',
      icon: Wheat,
      iconBg: 'bg-amber-700/10 text-amber-800',
      description:
        'Connects agricultural cooperatives in Musanze, Bugesera, Nyagatare, and Rubavu directly to households, restaurants, and hotels for fresh organic harvest at fair farm prices.',
      keyDetails: [
        'Direct cooperative sourcing (Kinigi Irish potatoes, Rubavu vegetables, Nyagatare dairy)',
        'Bulk family basket purchasing with farm-gate cost transparency',
        'Scheduled morning harvest drops guaranteeing freshness',
        'Direct revenue support for Rwandan rural farming communities'
      ],
      actionLabel: 'Open Farmer Market',
      onAction: () => {
        onClose();
        setCurrentView('farmer-market');
      }
    },
    {
      number: 12,
      title: '“Send Anything” Courier',
      tagline: 'Point-to-point on-demand motorcycle courier dispatch across Kigali',
      category: 'Smart Delivery',
      icon: Send,
      iconBg: 'bg-blue-600/10 text-blue-700',
      description:
        'Send packages, business contracts, urgent keys, lunchboxes, or gifts between any two points in Kigali. Enter pickup and dropoff landmarks to receive an instant price estimate and courier tracking.',
      keyDetails: [
        'Instant delivery fee calculation based on Kigali district distances',
        'Vehicle options: Standard Moto, Express Cargo Moto, or Van',
        'Sender and recipient contact fields with live SMS/WhatsApp alerts',
        'Unique package tracking number (e.g. ISH-RW-9021)'
      ],
      actionLabel: 'Book Courier Now',
      onAction: () => {
        onClose();
        setIsBookingModalOpen(true);
      }
    },
    {
      number: 13,
      title: 'Verified Sellers & Drivers',
      tagline: 'Trust ratings, background verification badges, and trip counts',
      category: 'Commerce & Trust',
      icon: ShieldCheck,
      iconBg: 'bg-emerald-600/10 text-emerald-700',
      description:
        'Every seller and driver on Ishema Express features verified credential badges, license plate verification, star ratings, trip counts, and real customer reviews.',
      keyDetails: [
        'Verified Driver profile cards with motorbike plate and phone links',
        'Verified Supermarket & Artisan badges (Simba, Sawa City, Kimironko Coop)',
        'Customer star ratings and completed delivery counters',
        'Driver safety code compliance monitored in Admin Dashboard'
      ],
      actionLabel: 'View in Driver Map',
      onAction: () => {
        onClose();
        setCurrentView('map');
      }
    },
    {
      number: 14,
      title: 'Ishema Wallet & Rewards',
      tagline: '1-click checkout, MTN MoMo top-ups, and 1 point = 1 RWF rewards',
      category: 'Commerce & Trust',
      icon: Wallet,
      iconBg: 'bg-amber-500/10 text-amber-600',
      description:
        'Digital wallet enabling frictionless payments without waiting for USSD mobile money prompts. Customers earn 1 point per 100 RWF spent, redeemable directly toward checkout totals.',
      keyDetails: [
        'Pre-loaded digital wallet balance with instant top-up via MTN & Airtel',
        'PIN-secured transaction processing with downloadable digital receipts',
        'Reward points accumulation on every order, review, and referral',
        'Complete transaction audit log with reference IDs'
      ],
      actionLabel: 'Open Wallet',
      onAction: () => {
        onClose();
        setIsWalletModalOpen(true);
      }
    },
    {
      number: 15,
      title: 'Offline-Friendly Experience (Low Data Mode)',
      tagline: 'Ultra-lightweight browsing designed for slow 2G/3G mobile networks',
      category: 'AI & Signature',
      icon: WifiOff,
      iconBg: 'bg-slate-700/10 text-slate-800',
      description:
        'Optimized for areas with weak mobile connectivity. Compresses images, caches categories locally, and provides an offline banner with a 1-tap Low Data toggle.',
      keyDetails: [
        'Instant Low Data Mode toggle switch in header banner',
        'Lightweight image placeholders reducing mobile data consumption by up to 70%',
        'Offline browser localStorage persistence for cart, orders, and addresses',
        'Fast-loading streamlined layout ensuring zero lag on budget phones'
      ],
      actionLabel: isLowDataMode ? 'Disable Low Data' : 'Enable Low Data Mode',
      onAction: () => {
        toggleLowDataMode();
      }
    },
    {
      number: 16,
      title: 'Smart Basket (“Build My Basket”)',
      tagline: 'Intelligent multi-item basket generation based on household size and budget',
      category: 'AI & Signature',
      icon: ShoppingBag,
      iconBg: 'bg-purple-500/10 text-purple-600',
      description:
        'A customer enters: “I need groceries for a family of five for one week, with a budget of 80,000 RWF.” Ishema Express builds a complete balanced basket ready to customize.',
      keyDetails: [
        'Pre-configured curated family baskets (Couple Weekly, Big Family, Student Budget)',
        'Balanced nutrition breakdown across staples, produce, proteins, and dairy',
        '1-click add all items directly to cart with supermarket price match',
        'Customizable quantities and item substitutions before placing order'
      ],
      actionLabel: 'Build My Basket',
      onAction: () => {
        onClose();
        setCurrentView('smart-basket');
      }
    },
    {
      number: 17,
      title: 'Business Delivery',
      tagline: 'Recurring corporate lunches, office replenishment, and monthly billing',
      category: 'Commerce & Trust',
      icon: Briefcase,
      iconBg: 'bg-blue-800/10 text-blue-900',
      description:
        'Tailored for corporate offices, co-working hubs (Norrsken, KLab), hotels, and retail stores. Manage multiple delivery sites, schedule recurring daily lunches, and receive consolidated billing.',
      keyDetails: [
        'Recurring schedule manager for daily lunch drops and weekly office restocking',
        'Multi-address management across Kigali business branches',
        'Corporate billing accounts with monthly statement downloads',
        'Dedicated account manager and priority courier dispatch'
      ],
      actionLabel: 'Open Business Portal',
      onAction: () => {
        onClose();
        setCurrentView('business-delivery');
      }
    },
    {
      number: 18,
      title: 'Neighborhood Stores',
      tagline: 'Hyperlocal directory of small neighborhood shops, bakeries & pharmacies',
      category: 'Community & Local',
      icon: Store,
      iconBg: 'bg-amber-600/10 text-amber-700',
      description:
        'Empowers small neighborhood duka shops, local bakeries, butcheries, and community pharmacies in Nyamirambo, Kimironko, Kacyiru, and Kiyovu to connect with nearby residents.',
      keyDetails: [
        'Distance calculation in kilometers from customer current location',
        'Store operating hours, verified phone numbers, and ratings',
        'Featured neighborhood specialties and daily fresh inventory',
        'Fastest delivery times (often under 20 minutes) due to proximity'
      ],
      actionLabel: 'View Nearby Stores',
      onAction: () => {
        onClose();
        setCurrentView('neighborhood-stores');
      }
    },
    {
      number: 19,
      title: 'Emergency Delivery (“Deliver Now”)',
      tagline: 'Priority motorcycle dispatch for urgent medication, baby food, or documents',
      category: 'Smart Delivery',
      icon: Flame,
      iconBg: 'bg-red-600/10 text-red-700',
      description:
        'When time is critical, “Deliver Now” locates the nearest available courier and bypasses standard route bundling to rush essentials directly to the customer in 15–25 minutes.',
      keyDetails: [
        'Prominent "Deliver Now" emergency toggle in cart and checkout',
        'Immediate notification and priority ping to nearest active moto rider',
        'Direct non-stop delivery route displayed on live tracking map',
        'Ideal for late-night pharmacies, urgent keys, baby care, or perishable items'
      ],
      actionLabel: 'Test in Checkout',
      onAction: () => {
        onClose();
        setCurrentView('checkout');
      }
    },
    {
      number: 20,
      title: 'Ishema Community Marketplace',
      tagline: 'Hyperlocal peer-to-peer commerce within campuses, apartments & offices',
      category: 'Community & Local',
      icon: Globe,
      iconBg: 'bg-teal-600/10 text-teal-700',
      description:
        'Allows closed and semi-open communities (University of Rwanda, ALU, Norrsken Kigali, Kacyiru apartments) to buy, sell, and share within their trusted physical circles.',
      keyDetails: [
        'Community selection by campus, co-working hub, or neighborhood association',
        'Direct peer-to-peer listings for textbooks, electronics, and home cooked treats',
        'Zero or ultra-low internal delivery fees for on-campus drops',
        'Community member verified profiles and trust badges'
      ],
      actionLabel: 'Open Community Hub',
      onAction: () => {
        onClose();
        setCurrentView('community');
      }
    }
  ];

  const filteredFeatures = features.filter(f => {
    const matchesCategory = selectedFilter === 'all' || f.category === selectedFilter;
    const matchesSearch =
      searchTerm.trim() === '' ||
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.number.toString() === searchTerm.trim();
    return matchesCategory && matchesSearch;
  });

  const handleCopyAll = () => {
    const markdownContent = features
      .map(
        f =>
          `### ${f.number}. ${f.title}\n${f.tagline}\n\n${f.description}\n\nKey Details:\n${f.keyDetails
            .map(k => `* ${k}`)
            .join('\n')}\n`
      )
      .join('\n---\n\n');

    const fullText = `# Innovative Features for Ishema Express in Rwanda\n\n## Signature Innovation: “Tell Ishema What You Need”\nDescribe what you need in natural language (e.g. “Find me lunch for three people under 15,000 RWF”) and Ishema Express returns matching photos, prices, sellers, delivery fees, and ratings.\n\n---\n\n${markdownContent}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-950 text-white flex items-start justify-between relative overflow-hidden shrink-0">
          <div className="relative z-10 space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Product Blueprint & Active Catalog</span>
            </div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Innovative Features for Ishema Express in Rwanda
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Built as more than a delivery app: A smart marketplace designed specifically around how
              people in Rwanda shop, sell, and receive deliveries.
            </p>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <button
              type="button"
              onClick={handleCopyAll}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              title="Copy all 20 features to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Guide'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Soft background ambient gradient glow */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Signature Innovation Highlight Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 border-b border-amber-500/20 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 shadow-md shrink-0">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-amber-800">
                    Signature Innovation
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                    Active & Live
                  </span>
                </div>
                <h3 className="font-heading font-bold text-slate-950 text-sm sm:text-base">
                  “Tell Ishema What You Need”
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                  Instead of browsing hundreds of categories, customers simply describe requests in natural
                  language. Powered by Gemini AI with Rwandan contextual pricing, photos, and delivery estimates.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                setCurrentView('home');
                setTimeout(() => {
                  const input = document.getElementById('signature-tell-ishema-input');
                  input?.focus();
                }, 200);
              }}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 shrink-0 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Try Signature Search</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by feature # (e.g. 1, 16) or name (e.g. Landmark, Wallet, Basket)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All 20 Features' },
              { id: 'Smart Delivery', label: 'Smart Delivery' },
              { id: 'AI & Signature', label: 'AI & Intelligence' },
              { id: 'Commerce & Trust', label: 'Commerce' },
              { id: 'Community & Local', label: 'Local & Community' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Feature Cards Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFeatures.map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Number, Category, Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                          {item.number}
                        </span>
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
                          {item.category}
                        </span>
                      </div>

                      <div className={`p-2 rounded-xl ${item.iconBg} transition-transform group-hover:scale-110`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h4 className="font-heading font-extrabold text-slate-950 text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs font-semibold text-amber-800 mt-0.5">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {item.keyDetails.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  {item.actionLabel && item.onAction && (
                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">
                        Ready to experience
                      </span>
                      <button
                        type="button"
                        onClick={item.onAction}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-500 text-slate-800 hover:text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <span>{item.actionLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredFeatures.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs">
              No features match "{searchTerm}". Try searching for another keyword or clear the search.
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>All 20 Innovative Features + Signature Innovation are integrated into Ishema Express</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
