import React, { useState } from 'react';
import {
  MapPin,
  CreditCard,
  Smartphone,
  Wallet,
  Truck,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Navigation,
  Clock,
  Sparkles,
  Info,
  FileText
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { DeliveryAddressMapPicker } from '../maps/DeliveryAddressMapPicker';
import { SmartLandmarkField } from '../innovations/SmartLandmarkField';
import { RWANDA_LOCATIONS } from '../../data/mockData';
import { PaymentMethodType, PaymentTransaction } from '../../types';
import { PaymentMethodSelector } from '../payment/PaymentMethodSelector';
import { PaymentProcessingModal } from '../payment/PaymentProcessingModal';
import { OrderReceiptModal } from '../payment/OrderReceiptModal';

export const InFrameCheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    estimatedDeliveryFee,
    multiStoreDiscount,
    poolingDiscount,
    cartTotal,
    selectedLocation,
    setSelectedLocation,
    walletBalance,
    placeOrder,
    setCurrentView,
    currentUser,
    landmarkDetails,
    updateLandmarkDetails,
    isNeighborhoodPooling,
    orders
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('momo_rwanda');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone || '+250 788 349 102');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 8812 3901 4242',
    cardHolder: currentUser?.fullName || 'Valued Customer',
    expiryDate: '12/28',
    cvv: '891'
  });
  const [walletPin, setWalletPin] = useState('1234');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [fullName, setFullName] = useState(currentUser?.fullName || 'Valued Customer');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [verifiedPaymentTx, setVerifiedPaymentTx] = useState<PaymentTransaction | null>(null);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const handleInitiateCheckout = () => {
    // Open payment processing modal which verifies server-side with idempotency
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (verifiedTx: PaymentTransaction) => {
    setIsPaymentModalOpen(false);
    setVerifiedPaymentTx(verifiedTx);

    // Call store placeOrder with verified payment
    const order = placeOrder({
      fullName,
      phone: phoneNumber,
      address: `${landmarkDetails.nearbyLandmark || 'Kigali City Center'}, ${selectedLocation || 'Kimihurura'}`,
      district: selectedLocation || 'Gasabo',
      paymentMethod: verifiedTx.paymentMethodLabel as any,
      notes: deliveryInstructions
    });

    setOrderSuccessId(order.id);
  };

  const currentPlacedOrder = orders.find(o => o.id === orderSuccessId);

  if (orderSuccessId) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center space-y-5 animate-in zoom-in-95">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
          Order & Payment Confirmed!
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Your order <strong className="text-slate-900 font-mono">#{orderSuccessId}</strong> has been server-verified. A motorcycle courier has been assigned and is heading to the merchant in Kigali.
        </p>

        {verifiedPaymentTx && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left max-w-md mx-auto text-xs space-y-1.5 font-mono">
            <div className="font-bold text-emerald-900 flex items-center justify-between font-sans">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Rwanda Payment Gateway Verified</span>
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-mono">SUCCESSFUL</span>
            </div>
            <div className="text-slate-700 flex justify-between">
              <span>Tx ID:</span>
              <strong className="text-slate-900">{verifiedPaymentTx.id}</strong>
            </div>
            <div className="text-slate-700 flex justify-between">
              <span>Method:</span>
              <strong className="text-slate-900">{verifiedPaymentTx.paymentMethodLabel}</strong>
            </div>
            <div className="text-slate-700 flex justify-between">
              <span>Amount Paid:</span>
              <strong className="text-amber-700">{formatRWF(verifiedPaymentTx.amount)}</strong>
            </div>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left max-w-md mx-auto text-xs space-y-1.5">
          <div className="font-bold text-amber-900 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Estimated Arrival: 25-35 minutes</span>
          </div>
          <div className="text-slate-600">
            Delivery to: {landmarkDetails.nearbyLandmark || landmarkDetails.landmark || 'Kigali'}, {selectedLocation || 'Gasabo'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={() => setIsReceiptModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-interface font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Official Tax & Payment Receipt</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('map')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Track Live on Delivery Map</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('orders')}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-interface font-bold text-xs transition-colors cursor-pointer"
          >
            View in Orders History
          </button>
        </div>

        {/* Digital Tax & Payment Receipt Modal */}
        {currentPlacedOrder && (
          <OrderReceiptModal
            isOpen={isReceiptModalOpen}
            onClose={() => setIsReceiptModalOpen(false)}
            order={currentPlacedOrder}
            transaction={verifiedPaymentTx}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="hover:text-amber-600 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          type="button"
          onClick={() => setCurrentView('cart')}
          className="hover:text-amber-600 transition-colors"
        >
          Cart
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-700">In-Frame Checkout</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
            Checkout & Delivery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete your delivery address and instant mobile payment inside the application frame.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView('cart')}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Address (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Delivery Address & Map Picker */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-heading font-extrabold text-base text-slate-950">
                Delivery Address & Location
              </h3>
            </div>

            {/* Interactive Rwanda Map & GPS Coordinates */}
            <div className="space-y-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-500">
                Pin Location on Map (GPS & Street Pinning)
              </label>
              <DeliveryAddressMapPicker
                details={landmarkDetails}
                onChange={updateLandmarkDetails}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kigali Sector / District
                </label>
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 bg-white"
                >
                  {RWANDA_LOCATIONS.map(l => (
                    <option key={`checkout-loc-${l.sector}`} value={`${l.district} - ${l.sector}`}>
                      {l.sector} - {l.district} ({l.time})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Smart Landmark Selector */}
            <SmartLandmarkField
              details={landmarkDetails}
              onChange={updateLandmarkDetails}
            />

            {/* Delivery Instructions */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Delivery Instructions
              </label>
              <textarea
                value={deliveryInstructions}
                onChange={e => setDeliveryInstructions(e.target.value)}
                placeholder="Gate color, compound name, floor, or note to driver..."
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Section 2: Rwanda Payment Gateway */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-heading font-extrabold text-base text-slate-950">
                  Secure Rwanda Payment
                </h3>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted & Server-Verified</span>
              </div>
            </div>

            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onSelectMethod={setPaymentMethod}
              phoneNumber={phoneNumber}
              onPhoneChange={setPhoneNumber}
              cardDetails={cardDetails}
              onCardChange={setCardDetails}
              walletBalance={walletBalance || 25000}
              totalAmount={cartTotal}
              walletPin={walletPin}
              onWalletPinChange={setWalletPin}
              onOpenAddMoney={() => setCurrentView('wallet')}
            />
          </div>
        </div>

        {/* Right Column: Order Recap & CTA (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4 sticky top-24">
            <h3 className="font-heading font-extrabold text-base text-slate-950 pb-3 border-b border-slate-100">
              Items Recap ({cart.length})
            </h3>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
              {cart.map(c => (
                <div key={c.product.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <span className="font-bold text-slate-900">{c.quantity}x</span> {c.product.name}
                  </div>
                  <span className="font-semibold text-slate-700 shrink-0">
                    {formatRWF(c.product.price * c.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatRWF(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-semibold text-slate-900">{formatRWF(estimatedDeliveryFee)}</span>
              </div>
              {multiStoreDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Store Discount</span>
                  <span>-{formatRWF(multiStoreDiscount)}</span>
                </div>
              )}
              {poolingDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Pooling Discount</span>
                  <span>-{formatRWF(poolingDiscount)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-heading font-extrabold text-sm text-slate-950">Total</span>
                <span className="font-heading font-extrabold text-xl text-amber-700">
                  {formatRWF(cartTotal)}
                </span>
              </div>
            </div>

            <button
              id="checkout-place-order-btn"
              type="button"
              onClick={handleInitiateCheckout}
              className="w-full py-4 rounded-2xl font-interface font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {paymentMethod === 'cash_on_delivery'
                  ? `Confirm Order (${formatRWF(cartTotal)} Cash on Delivery)`
                  : `Pay ${formatRWF(cartTotal)}`}
              </span>
            </button>

            <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant order dispatch to nearest Kigali driver</span>
            </div>
          </div>
        </div>
      </div>

      {/* Server-Side Payment Processing & USSD Modal */}
      <PaymentProcessingModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payload={{
          amount: cartTotal,
          currency: 'RWF',
          paymentMethod,
          customer: {
            fullName,
            phone: phoneNumber,
            email: currentUser?.email || 'customer@ishema.rw'
          },
          orderId: `ORD-${Date.now().toString().slice(-6)}`,
          type: 'order_payment',
          cardDetails: paymentMethod === 'card' ? cardDetails : undefined,
          sellerName: cart[0]?.product?.seller?.name || 'Ishema Marketplace'
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

