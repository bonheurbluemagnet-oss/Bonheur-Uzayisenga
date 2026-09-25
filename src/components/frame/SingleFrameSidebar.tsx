import React, { useState } from 'react';
import {
  Home,
  ShoppingCart,
  UtensilsCrossed,
  Wine,
  Laptop,
  Shirt,
  Sparkles,
  Armchair,
  Baby,
  Gift,
  Bike,
  Tag,
  Package,
  MapPin,
  Wallet,
  Film,
  ChevronRight,
  ChevronDown,
  Layers,
  Zap,
  Flame,
  Percent,
  Compass
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SingleFrameSidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    categories,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedNestedType,
    setIsBookingModalOpen,
    setIsInnovationsGuideOpen
  } = useStore();

  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  // Helper to find category by slug or name
  const findCategory = (identifier: string) => {
    return categories.find(
      c =>
        c.id.toLowerCase().includes(identifier.toLowerCase()) ||
        c.name.toLowerCase().includes(identifier.toLowerCase()) ||
        c.slug.toLowerCase().includes(identifier.toLowerCase())
    );
  };

  const handleCategoryNav = (categoryIdKey: string) => {
    const matched = findCategory(categoryIdKey);
    if (matched) {
      setSelectedCategory(matched);
      setSelectedSubcategory(null);
      setSelectedNestedType(null);
      setCurrentView('category');
      setExpandedCategoryId(prev => (prev === matched.id ? null : matched.id));
    }
  };

  const handleSubcategoryClick = (cat: any, sub: any) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
    setSelectedNestedType(null);
    setCurrentView('category');
  };

  // Explicit items required by the user prompt
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => setCurrentView('home'),
      isActive: currentView === 'home'
    },
    {
      id: 'supermarket',
      label: 'Supermarket',
      badge: 'Multi-Store',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: ShoppingCart,
      action: () => setCurrentView('supermarket'),
      isActive: currentView === 'supermarket'
    },
    {
      id: 'food',
      label: 'Food',
      icon: UtensilsCrossed,
      hasSubmenu: true,
      categoryKey: 'food',
      action: () => handleCategoryNav('food'),
      isActive: currentView === 'category' && selectedCategory?.id === 'cat-food'
    },
    {
      id: 'drinks',
      label: 'Drinks',
      icon: Wine,
      hasSubmenu: true,
      categoryKey: 'drinks',
      action: () => handleCategoryNav('drinks'),
      isActive: currentView === 'category' && selectedCategory?.id === 'cat-drinks'
    },
    {
      id: 'electronics',
      label: 'Electronics',
      icon: Laptop,
      hasSubmenu: true,
      categoryKey: 'electronics',
      action: () => handleCategoryNav('electronics'),
      isActive: currentView === 'category' && selectedCategory?.id === 'cat-electronics'
    },
    {
      id: 'fashion',
      label: 'Fashion',
      icon: Shirt,
      hasSubmenu: true,
      categoryKey: 'fashion',
      action: () => handleCategoryNav('fashion'),
      isActive: currentView === 'category' && selectedCategory?.id === 'cat-fashion'
    },
    {
      id: 'beauty',
      label: 'Beauty',
      icon: Sparkles,
      hasSubmenu: true,
      categoryKey: 'beauty',
      action: () => handleCategoryNav('beauty'),
      isActive: currentView === 'category' && selectedCategory?.id === 'cat-beauty'
    },
    {
      id: 'household',
      label: 'Household',
      icon: Armchair,
      hasSubmenu: true,
      categoryKey: 'home',
      action: () => handleCategoryNav('home'),
      isActive: currentView === 'category' && (selectedCategory?.id === 'cat-home' || selectedCategory?.name?.includes('Home'))
    },
    {
      id: 'baby',
      label: 'Baby',
      icon: Baby,
      hasSubmenu: true,
      categoryKey: 'baby',
      action: () => handleCategoryNav('baby'),
      isActive: currentView === 'category' && selectedCategory?.id === 'cat-baby'
    },
    {
      id: 'gifts',
      label: 'Gifts',
      icon: Gift,
      hasSubmenu: true,
      categoryKey: 'gift',
      action: () => handleCategoryNav('gift'),
      isActive: currentView === 'category' && selectedCategory?.id === 'cat-gifts'
    },
    {
      id: 'surprise-gift',
      label: 'Surprise Gift',
      badge: 'New',
      badgeColor: 'bg-rose-100 text-rose-700 animate-pulse',
      icon: Gift,
      action: () => setCurrentView('surprise-gift'),
      isActive: currentView === 'surprise-gift'
    },
    {
      id: 'courier',
      label: 'Courier',
      badge: '30 min',
      badgeColor: 'bg-amber-100 text-amber-900',
      icon: Bike,
      action: () => {
        setIsBookingModalOpen(true);
        setCurrentView('courier-booking');
      },
      isActive: currentView === 'courier-booking'
    },
    {
      id: 'deals',
      label: 'Deals',
      badge: 'Up to 50%',
      badgeColor: 'bg-red-500 text-white font-extrabold',
      icon: Percent,
      action: () => setCurrentView('deals'),
      isActive: currentView === 'deals'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Package,
      action: () => setCurrentView('orders'),
      isActive: currentView === 'orders'
    }
  ];

  const secondaryItems = [
    {
      id: 'innovations-guide',
      label: '20 Innovations Guide',
      badge: 'All 20',
      badgeColor: 'bg-emerald-500 text-white font-extrabold text-[9px]',
      icon: Sparkles,
      action: () => setIsInnovationsGuideOpen(true),
      isActive: false
    },
    {
      id: 'map',
      label: 'Live Delivery Map',
      icon: Compass,
      action: () => setCurrentView('map'),
      isActive: currentView === 'map' || currentView === 'track'
    },
    {
      id: 'wallet',
      label: 'Ishema Wallet',
      icon: Wallet,
      action: () => setCurrentView('wallet'),
      isActive: currentView === 'wallet'
    },
    {
      id: 'animate-rider',
      label: 'Animate Rider',
      badge: 'Veo AI',
      badgeColor: 'bg-amber-500/20 text-amber-800 font-mono text-[9px]',
      icon: Film,
      action: () => setCurrentView('animate-rider'),
      isActive: currentView === 'animate-rider'
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col shrink-0 select-none overflow-hidden h-[calc(100vh-4rem)] sticky top-16">
      {/* Scrollable Navigation Items */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-heading font-extrabold uppercase tracking-wider text-slate-400">
          Navigation & Departments
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const matchedCategory = item.categoryKey ? findCategory(item.categoryKey) : null;
          const isExpanded = expandedCategoryId === matchedCategory?.id;

          return (
            <div key={item.id} className="space-y-0.5">
              <button
                type="button"
                onClick={item.action}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                  item.isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      item.isActive ? 'text-slate-950' : 'text-slate-500'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                        item.badgeColor || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.hasSubmenu && matchedCategory && (
                    <ChevronDown
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCategoryId(prev => (prev === matchedCategory.id ? null : matchedCategory.id));
                      }}
                      className={`w-3.5 h-3.5 text-slate-400 hover:text-slate-700 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
              </button>

              {/* Subcategories Dropdown Tree inside sidebar */}
              {item.hasSubmenu && matchedCategory && isExpanded && (
                <div className="pl-7 pr-2 py-1 space-y-1 border-l-2 border-amber-200 ml-4 my-1">
                  {matchedCategory.subcategories.slice(0, 6).map(sub => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSubcategoryClick(matchedCategory, sub)}
                      className="w-full text-left py-1 px-2 rounded-lg text-[11px] text-slate-600 hover:text-amber-800 hover:bg-amber-50 font-medium truncate block transition-colors"
                    >
                      • {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Secondary Section */}
        <div className="pt-3 pb-1 border-t border-slate-100 px-3 text-[10px] font-heading font-extrabold uppercase tracking-wider text-slate-400">
          Tools & Innovations
        </div>

        {secondaryItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                item.isActive
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    item.isActive ? 'text-amber-400' : 'text-slate-500'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded-md font-extrabold ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer Badge */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/80">
        <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-800 text-[11px]">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <Bike className="w-3.5 h-3.5 text-amber-600" />
            <span>Kigali Moto Dispatch</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
            Average delivery 28 mins with instant MTN MoMo payment.
          </p>
        </div>
      </div>
    </aside>
  );
};
