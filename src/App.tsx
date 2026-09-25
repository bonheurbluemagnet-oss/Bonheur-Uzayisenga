import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { SingleFrameHeader } from './components/frame/SingleFrameHeader';
import { SingleFrameSidebar } from './components/frame/SingleFrameSidebar';
import { SingleFrameMobileNav } from './components/frame/SingleFrameMobileNav';
import { SingleFrameHomeView } from './components/frame/SingleFrameHomeView';
import { InFrameCartView } from './components/frame/InFrameCartView';
import { InFrameCheckoutView } from './components/frame/InFrameCheckoutView';
import { InFrameLiveMapView } from './components/frame/InFrameLiveMapView';
import { InFrameWalletView } from './components/frame/InFrameWalletView';
import { InFrameOrdersView } from './components/frame/InFrameOrdersView';
import { CategoryView } from './components/CategoryView';
import { ProductDetailsView } from './components/ProductDetailsView';
import { SupermarketCatalogView } from './components/supermarket/SupermarketCatalogView';
import { SurpriseGiftHubView } from './views/SurpriseGiftHubView';
import { SurpriseRevealView } from './views/SurpriseRevealView';
import { MyAccountDashboard } from './components/account/MyAccountDashboard';
import { AnimateRiderVideoView } from './components/video/AnimateRiderVideoView';
import { IshemaDealsView } from './components/innovations/IshemaDealsView';
import { TrackingSection } from './components/TrackingSection';
import { AdminDashboard } from './components/AdminDashboard';
import { DriverDashboard } from './components/DriverDashboard';
import { AboutServicesSection } from './components/AboutServicesSection';
import { NeighborhoodStoresView } from './components/innovations/NeighborhoodStoresView';
import { SmartBasketView } from './components/innovations/SmartBasketView';
import { BuyLocalRwandaView } from './components/innovations/BuyLocalRwandaView';
import { FarmerMarketView } from './components/innovations/FarmerMarketView';
import { CommunityMarketplaceView } from './components/innovations/CommunityMarketplaceView';
import { BusinessDeliveryView } from './components/innovations/BusinessDeliveryView';

// Modals
import { ProductDetailModal } from './components/ProductDetailModal';
import { DeliveryBookingModal } from './components/DeliveryBookingModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { GroupOrderModal } from './components/innovations/GroupOrderModal';
import { SearchByPhotoModal } from './components/innovations/SearchByPhotoModal';
import { RequestAnythingModal } from './components/innovations/RequestAnythingModal';
import { IshemaWalletModal } from './components/innovations/IshemaWalletModal';
import { AnimateRiderVideoModal } from './components/video/AnimateRiderVideoModal';
import { CustomerAuthModal } from './components/account/CustomerAuthModal';
import { AddMoneyModal } from './components/wallet/AddMoneyModal';
import { SendMoneyModal } from './components/wallet/SendMoneyModal';
import { WalletPinModal } from './components/wallet/WalletPinModal';
import { TransactionReceiptModal } from './components/wallet/TransactionReceiptModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OfflineLowDataBanner } from './components/innovations/OfflineLowDataBanner';
import { InnovativeFeaturesGuideModal } from './components/innovations/InnovativeFeaturesGuideModal';

const AppContent: React.FC = () => {
  const { currentView, isInnovationsGuideOpen, setIsInnovationsGuideOpen } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-body text-slate-800 selection:bg-amber-500 selection:text-slate-950">
      {/* 1. TOP HEADER (Inside Single-Frame Structure) */}
      <SingleFrameHeader />

      {/* Low Data / Offline Notice Banner */}
      <OfflineLowDataBanner />

      {/* 2. MAIN APPLICATION FRAME (Sidebar | Dynamic Content Area) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar / Category Navigation (Desktop) */}
        <div className="hidden md:block shrink-0">
          <SingleFrameSidebar />
        </div>

        {/* Dynamic Main Content Area inside the Single Frame */}
        <main
          id="main-frame-content"
          className="flex-1 overflow-y-auto min-h-0 bg-slate-50/70 pb-24 md:pb-12"
        >
          {/* Home View */}
          {currentView === 'home' && <SingleFrameHomeView />}

          {/* Supermarket Catalog View */}
          {currentView === 'supermarket' && <SupermarketCatalogView />}

          {/* Category View (with subcategories, breadcrumbs, price range, store filters) */}
          {currentView === 'category' && <CategoryView />}

          {/* Product View (inside the same main frame with ← Back to Products) */}
          {currentView === 'product' && <ProductDetailsView />}

          {/* Cart View (in-frame with products, quantities, discounts, total, wallet balance) */}
          {currentView === 'cart' && <InFrameCartView />}

          {/* Checkout View (in-frame with map, GPS, landmarks, MTN MoMo, Airtel, Wallet) */}
          {currentView === 'checkout' && <InFrameCheckoutView />}

          {/* Delivery Map View (in-frame live tracking map with driver, customer, route, status) */}
          {(currentView === 'map' || currentView === 'track') && <InFrameLiveMapView />}

          {/* Orders View (in-frame with active & previous orders, receipts, status) */}
          {currentView === 'orders' && <InFrameOrdersView />}

          {/* Ishema Wallet View (in-frame Available Balance 25,000 RWF, Add Money, Pay, History) */}
          {currentView === 'wallet' && <InFrameWalletView />}

          {/* Account View (profile, wallet, orders, addresses, wishlist, rewards) */}
          {currentView === 'account' && <MyAccountDashboard />}

          {/* Surprise Gift View (in-frame secret delivery, custom cards, anonymous recipient) */}
          {currentView === 'surprise-gift' && <SurpriseGiftHubView />}
          {currentView === 'surprise-reveal' && <SurpriseRevealView />}

          {/* Hot Deals View */}
          {currentView === 'deals' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <IshemaDealsView />
            </div>
          )}

          {/* Animate Rider (Veo 3.1 AI View) */}
          {currentView === 'animate-rider' && <AnimateRiderVideoView />}

          {/* Secondary Features & Innovative Views */}
          {currentView === 'neighborhood-stores' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <NeighborhoodStoresView />
            </div>
          )}
          {currentView === 'smart-basket' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <SmartBasketView />
            </div>
          )}
          {currentView === 'buy-local' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <BuyLocalRwandaView />
            </div>
          )}
          {currentView === 'farmer-market' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <FarmerMarketView />
            </div>
          )}
          {currentView === 'community' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <CommunityMarketplaceView />
            </div>
          )}
          {currentView === 'business-delivery' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <BusinessDeliveryView />
            </div>
          )}
          {(currentView === 'admin' || currentView === 'admin-payments') && <AdminDashboard />}
          {currentView === 'driver' && <DriverDashboard />}
          {currentView === 'about' && <AboutServicesSection activeSection="about" />}
          {currentView === 'services' && <AboutServicesSection activeSection="services" />}
          {currentView === 'how-it-works' && <AboutServicesSection activeSection="how-it-works" />}
          {currentView === 'pricing' && <AboutServicesSection activeSection="pricing" />}
          {currentView === 'driver-apply' && <AboutServicesSection activeSection="driver" />}
          {currentView === 'contact' && <AboutServicesSection activeSection="contact" />}
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION (Header + Main Content + Bottom Nav) */}
      <SingleFrameMobileNav />

      {/* Auxiliary Overlays & Modals (Preserved for interactive actions) */}
      <ProductDetailModal />
      <DeliveryBookingModal />
      <CartDrawer />
      <CheckoutModal />
      <GroupOrderModal />
      <SearchByPhotoModal />
      <RequestAnythingModal />
      <IshemaWalletModal />
      <AnimateRiderVideoModal />
      <CustomerAuthModal />
      <AddMoneyModal />
      <SendMoneyModal />
      <WalletPinModal />
      <TransactionReceiptModal />
      <FloatingWhatsApp />
      <InnovativeFeaturesGuideModal
        isOpen={isInnovationsGuideOpen}
        onClose={() => setIsInnovationsGuideOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
