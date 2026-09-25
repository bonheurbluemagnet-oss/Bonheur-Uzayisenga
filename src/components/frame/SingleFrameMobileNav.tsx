import React from 'react';
import {
  Home,
  ShoppingCart,
  ShoppingBag,
  Package,
  User,
  Compass,
  Gift
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SingleFrameMobileNav: React.FC = () => {
  const { currentView, setCurrentView, cartCount, isSurpriseGiftMode } = useStore();

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
      icon: ShoppingCart,
      action: () => setCurrentView('supermarket'),
      isActive: currentView === 'supermarket'
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined,
      action: () => setCurrentView('cart'),
      isActive: currentView === 'cart'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Package,
      action: () => setCurrentView('orders'),
      isActive: currentView === 'orders' || currentView === 'map'
    },
    {
      id: 'account',
      label: 'Profile',
      icon: User,
      action: () => setCurrentView('account'),
      isActive: currentView === 'account' || currentView === 'wallet'
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
                item.isActive
                  ? 'text-amber-700 font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? 'stroke-[2.5px]' : ''}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[9px] ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
