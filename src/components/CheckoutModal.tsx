import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Truck,
  Smartphone,
  Gift,
  EyeOff,
  Sparkles,
  Zap,
  Users,
  Award,
  Wallet,
  PlusCircle,
  FileText
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { RWANDA_LOCATIONS } from '../data/mockData';
import { IshemaLogo } from './IshemaLogo';
import { SurpriseGiftOptions } from './SurpriseGiftOptions';
import { SmartLandmarkField } from './innovations/SmartLandmarkField';
import { DeliveryAddressMapPicker } from './maps/DeliveryAddressMapPicker';
import { OrderReceiptModal } from './payment/OrderReceiptModal';
import { PaymentProcessingModal } from './payment/PaymentProcessingModal';
import { PaymentMethodType, PaymentTransaction } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    estimatedDeliveryFee,
    giftPackagingFee,
    addOnsFee,
    cartTotal,
    selectedLocation,
    placeOrder,
    setCurrentView,
    isSurpriseGiftMode,
    surpriseConfig,
    openSurpriseReveal,
    landmarkDetails,
    updateLandmarkDetails,
    isEmergencyDelivery,
    setIsEmergencyDelivery,
    isNeighborhoodPooling,
    setIsNeighborhoodPooling,
    poolingDiscount,
    uniqueStoresInCart,
    isMultiStore,
    multiStoreDiscount,
    pointsRedeemed,
    rewardPoints,
    walletBalance,
    currentUser,
    setIsAddMoneyModalOpen,
    orders
  } = useStore();

  const defaultAddr = currentUser?.addresses.find(a => a.isDefault) || currentUser?.addresses[0];

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+250 788 123 456');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(defaultAddr?.streetOrHouseNumber || landmarkDetails.streetAddress || 'KG 14 Ave, House #22');
  const [district, setDistrict] = useState(defaultAddr?.district || selectedLocation || 'Kimihurura');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Ishema Wallet' | 'MTN Mobile Money' | 'Airtel Money' | 'Cash on Delivery' | 'Card' | 'Split (Wallet + MoMo)'>(
    walletBalance >= cartTotal ? 'Ishema Wallet' : 'MTN Mobile Money'
  );

  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);
  const [completedTrackingNumber, setCompletedTrackingNumber] = useState<string | null>(null);
  const [wasSurpriseOrder, setWasSurpriseOrder] = useState<boolean>(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [verifiedPaymentTx, setVerifiedPaymentTx] = useState<PaymentTransaction | null>(null);

  if (!isCheckoutOpen) return null;

  const completeFinalOrder = (verifiedTx?: PaymentTransaction) => {
    const walletDeduction = paymentMethod === 'Ishema Wallet'
      ? cartTotal
      : paymentMethod === 'Split (Wallet + MoMo)'
      ? Math.min(walletBalance, cartTotal)
      : undefined;

    const splitPaymentAmount = paymentMethod === 'Split (Wallet + MoMo)'
      ? Math.max(0, cartTotal - walletBalance)
      : undefined;

    const order = placeOrder({
      fullName: isSurpriseGiftMode ? (surpriseConfig.senderRealName || 'Anonymous Gifter') : fullName,
      phone: isSurpriseGiftMode ? (surpriseConfig.senderRealPhone || phone) : phone,
      email,
      address: isSurpriseGiftMode ? surpriseConfig.deliveryAddress : address,
      district: isSurpriseGiftMode ? surpriseConfig.deliveryDistrict : district,
      notes,
      paymentMethod: (verifiedTx ? verifiedTx.paymentMethodLabel : paymentMethod) as any,
      walletDeduction,
      splitPaymentMethod: paymentMethod === 'Split (Wallet + MoMo)' ? 'MTN Mobile Money' : undefined,
      splitPaymentAmount,
      landmarkDetails: {
        ...landmarkDetails,
        streetAddress: address
      }
    });

    setWasSurpriseOrder(isSurpriseGiftMode);
    setCompletedOrderNumber(order.id);
    setCompletedTrackingNumber(order.trackingNumber);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If regular order, validate sender fields
    if (!isSurpriseGiftMode && (!fullName || !phone || !address)) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    // If surprise order, validate recipient fields
    if (isSurpriseGiftMode) {
      if (!surpriseConfig.recipientName || !surpriseConfig.recipientPhone || !surpriseConfig.deliveryAddress) {
        alert('Please complete the Surprise Gift recipient name, phone number, and delivery address.');
        return;
      }
    }

    // Launch server-side payment modal
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (verifiedTx: PaymentTransaction) => {
    setIsPaymentModalOpen(false);
    setVerifiedPaymentTx(verifiedTx);
    completeFinalOrder(verifiedTx);
  };

  const handleGoToTracking = () => {
    setIsCheckoutOpen(false);
    setCompletedOrderNumber(null);
    setCompletedTrackingNumber(null);
    setCurrentView('track');
  };

  const handleGoToSurpriseReveal = () => {
    if (completedOrderNumber) {
      openSurpriseReveal(completedOrderNumber);
    }
    setIsCheckoutOpen(false);
    setCompletedOrderNumber(null);
    setCompletedTrackingNumber(null);
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        id="checkout-modal-content"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <IshemaLogo variant="mark" size="sm" />
            <div>
              <h2 className="font-heading font-bold text-slate-900 text-lg">Fast Checkout</h2>
              <p className="text-xs text-slate-500 font-body">Delivery across Kigali & all Rwandan districts</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6">
          {completedOrderNumber ? (
            /* Order Placed confirmation */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-1">
                Order Placed Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-body mb-4">
                Murakoze cyane! Your order has been registered and is being prepared by the merchant.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block text-left mb-6 max-w-md w-full">
                {wasSurpriseOrder && (
                  <div className="mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <Gift className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <span className="font-bold block">100% Secret Surprise Delivery Scheduled!</span>
                      <span>The package will arrive under Ishema Secret Protocol with your wax-sealed message.</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500">Order ID:</span>
                  <span className="font-mono font-bold text-sm text-slate-900">{completedOrderNumber}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500">Tracking Code:</span>
                  <span className="font-mono font-bold text-base text-amber-600 bg-amber-50 px-2 py-0.5 rounded-sm">
                    {completedTrackingNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-slate-500">Total Paid / Due:</span>
                  <span className="font-bold text-slate-900">{formatRWF(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-medium text-slate-800">{paymentMethod}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {wasSurpriseOrder && (
                  <button
                    type="button"
                    onClick={handleGoToSurpriseReveal}
                    className="px-6 py-3 rounded-xl bg-linear-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-interface font-bold text-sm shadow-md inline-flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Preview Recipient Unboxing
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsReceiptModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-interface font-bold text-sm shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  View Tax Receipt
                </button>
                <button
                  type="button"
                  onClick={handleGoToTracking}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-sm shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  Track Your Order Live
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-interface font-semibold text-sm"
                >
                  Return to Store
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Surprise Gift Feature Section */}
              <SurpriseGiftOptions />

              {/* Standard Delivery Details (only shown if regular order) */}
              {!isSurpriseGiftMode && (
                <div className="space-y-3">
                  <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    1. Delivery Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Jean-Baptiste Nzeyimana"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (MTN/Airtel) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+250 788 123 456"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Complete Interactive Delivery Address Map & Smart Landmark System */}
                  <DeliveryAddressMapPicker
                    details={landmarkDetails}
                    onChange={updateLandmarkDetails}
                    onAddressChange={setAddress}
                    onDistrictChange={setDistrict}
                    initialAddress={address}
                    initialDistrict={district}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm District / Sector Fee Zone</label>
                      <select
                        value={district}
                        onChange={e => setDistrict(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                      >
                        {RWANDA_LOCATIONS.map(loc => (
                          <option key={`checkout-${loc.sector}`} value={`${loc.district} - ${loc.sector}`}>
                            {loc.district} - {loc.sector} ({formatRWF(loc.fee)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Order Notes / Gate Instructions</label>
                      <input
                        type="text"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="e.g. Call upon arrival at gate"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                      />
                    </div>
                  </div>

                  {/* Feature 7 & 8: Emergency Delivery & Neighborhood Pooling toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div
                      onClick={() => setIsEmergencyDelivery(!isEmergencyDelivery)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        isEmergencyDelivery
                          ? 'border-red-500 bg-red-50/60 ring-2 ring-red-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isEmergencyDelivery}
                        onChange={() => {}}
                        className="mt-0.5 accent-red-500"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                          <span className="text-xs font-bold text-slate-900">15-Min Emergency Delivery</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Priority dispatch (+1,000 RWF) for medicine, diapers, urgent food.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setIsNeighborhoodPooling(!isNeighborhoodPooling)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        isNeighborhoodPooling
                          ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isNeighborhoodPooling}
                        onChange={() => {}}
                        className="mt-0.5 accent-emerald-500"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900">Neighborhood Pooling</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Pool with neighbors in {selectedLocation} (Save 500 RWF).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Feature 3: Multi-Store Order Breakdown */}
              {isMultiStore && (
                <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-300/60 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span>One Cart, Multiple Stores ({uniqueStoresInCart.length} Stores)</span>
                    <span className="text-emerald-700 font-extrabold">-500 RWF Multi-Store Pass</span>
                  </div>
                  <p className="text-[11px] text-amber-800/80">
                    Items from: <strong>{uniqueStoresInCart.join(', ')}</strong> will be consolidated by our driver into a single combined arrival.
                  </p>
                </div>
              )}

              {/* Payment Methods */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-500" />
                  {isSurpriseGiftMode ? 'Sender Payment Method' : '2. Select Payment Method'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Ishema Wallet */}
                  <div
                    onClick={() => {
                      if (walletBalance >= cartTotal) {
                        setPaymentMethod('Ishema Wallet');
                      } else if (walletBalance > 0) {
                        setPaymentMethod('Split (Wallet + MoMo)');
                      } else {
                        setIsAddMoneyModalOpen(true);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between sm:col-span-2 ${
                      paymentMethod === 'Ishema Wallet' || paymentMethod === 'Split (Wallet + MoMo)'
                        ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-linear-to-r from-amber-50/40 to-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'Ishema Wallet' || paymentMethod === 'Split (Wallet + MoMo)'}
                          onChange={() => {}}
                          className="accent-amber-500"
                        />
                        <Wallet className="w-4 h-4 text-amber-600" />
                        <span className="font-interface font-bold text-xs text-slate-900">
                          {walletBalance >= cartTotal ? 'Ishema Wallet (1-Click Instant)' : 'Split Payment (Wallet + MTN MoMo)'}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                        Bal: {formatRWF(walletBalance)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pl-6 text-[11px] text-slate-600">
                      <span>
                        {walletBalance >= cartTotal
                          ? `Full ${formatRWF(cartTotal)} deducted instantly from wallet.`
                          : walletBalance > 0
                          ? `Deduct ${formatRWF(walletBalance)} from wallet + pay remaining ${formatRWF(cartTotal - walletBalance)} via MoMo.`
                          : 'Wallet balance empty. Top up instantly via MoMo / Card.'}
                      </span>
                      {walletBalance < cartTotal && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAddMoneyModalOpen(true);
                          }}
                          className="text-amber-700 font-bold hover:underline flex items-center gap-1 shrink-0 ml-2"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>+ Top Up</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {[
                    {
                      id: 'MTN Mobile Money',
                      name: 'MTN Mobile Money (MoMo)',
                      desc: 'Dial *182# prompt will be sent to your phone',
                      badge: 'Most Popular in Rwanda'
                    },
                    {
                      id: 'Airtel Money',
                      name: 'Airtel Money Rwanda',
                      desc: 'Instant push payment notification',
                      badge: 'Instant'
                    },
                    {
                      id: 'Cash on Delivery',
                      name: 'Cash on Delivery',
                      desc: 'Pay the Ishema driver when package arrives',
                      badge: 'Available Kigali'
                    },
                    {
                      id: 'Card',
                      name: 'Visa / Mastercard',
                      desc: 'Credit or Debit Card online payment',
                      badge: 'Secured 3D'
                    }
                  ].map(m => {
                    const isSelected = paymentMethod === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="payment"
                              checked={isSelected}
                              onChange={() => setPaymentMethod(m.id as any)}
                              className="accent-amber-500"
                            />
                            <span className="font-interface font-semibold text-xs text-slate-900">
                              {m.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/60 px-1.5 py-0.5 rounded-md">
                            {m.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-body pl-6">{m.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Cart Items ({cart.length}):</span>
                  <span>{formatRWF(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Express Courier Delivery Fee:</span>
                  <span>{formatRWF(estimatedDeliveryFee)}</span>
                </div>
                {isEmergencyDelivery && (
                  <div className="flex justify-between items-center text-xs text-red-300">
                    <span>15-Min Emergency Priority Dispatch:</span>
                    <span>+1,000 RWF</span>
                  </div>
                )}
                {isNeighborhoodPooling && (
                  <div className="flex justify-between items-center text-xs text-emerald-400 font-semibold">
                    <span>Neighborhood Delivery Pooling:</span>
                    <span>-500 RWF</span>
                  </div>
                )}
                {pointsRedeemed > 0 && (
                  <div className="flex justify-between items-center text-xs text-amber-300 font-semibold">
                    <span>Rewards Points Redeemed:</span>
                    <span>-{formatRWF(pointsRedeemed)}</span>
                  </div>
                )}
                {isSurpriseGiftMode && (
                  <>
                    <div className="flex justify-between items-center text-xs text-rose-300">
                      <span>Luxury Gift Packaging & Card:</span>
                      <span>+{formatRWF(giftPackagingFee)}</span>
                    </div>
                    {addOnsFee > 0 && (
                      <div className="flex justify-between items-center text-xs text-amber-300">
                        <span>Celebration Add-ons:</span>
                        <span>+{formatRWF(addOnsFee)}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="font-heading font-bold text-sm">Total to Pay:</span>
                  <span className="font-heading font-extrabold text-2xl text-amber-400">
                    {formatRWF(cartTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-3 cursor-pointer"
                >
                  <span>
                    {paymentMethod === 'Cash on Delivery'
                      ? 'Confirm Cash on Delivery Order'
                      : `Pay ${formatRWF(cartTotal)}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Official Tax & Payment Receipt Modal */}
      {completedOrderNumber && (
        <OrderReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          order={
            orders.find(o => o.id === completedOrderNumber) || {
              id: completedOrderNumber,
              trackingNumber: completedTrackingNumber || completedOrderNumber,
              customer: { fullName, phone, email, address, district },
              items: cart,
              subtotal: cartSubtotal,
              deliveryFee: 1500,
              total: cartTotal,
              paymentMethod: paymentMethod as any,
              paymentStatus: 'Paid',
              status: 'Order Placed',
              createdAt: new Date().toISOString(),
              timeline: []
            }
          }
        />
      )}

      {/* Server-Side Authoritative Payment Processing Modal */}
      <PaymentProcessingModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payload={{
          amount: cartTotal,
          currency: 'RWF',
          paymentMethod:
            paymentMethod === 'MTN Mobile Money'
              ? 'momo_rwanda'
              : paymentMethod === 'Airtel Money'
              ? 'airtel_rwanda'
              : paymentMethod === 'Card'
              ? 'card'
              : paymentMethod === 'Cash on Delivery'
              ? 'cash_on_delivery'
              : 'ishema_wallet',
          customer: {
            fullName: isSurpriseGiftMode ? (surpriseConfig.senderRealName || 'Valued Customer') : fullName,
            phone: isSurpriseGiftMode ? (surpriseConfig.senderRealPhone || phone) : phone,
            email: currentUser?.email || 'customer@ishema.rw'
          },
          orderId: `ORD-${Date.now().toString().slice(-6)}`,
          type: 'order_payment',
          sellerName: cart[0]?.product?.seller?.name || 'Ishema Marketplace'
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
