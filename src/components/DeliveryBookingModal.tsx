import React, { useState } from 'react';
import {
  X,
  Package,
  MapPin,
  Phone,
  Clock,
  Bike,
  Car,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { RWANDA_LOCATIONS } from '../data/mockData';
import { IshemaLogo } from './IshemaLogo';

export const DeliveryBookingModal: React.FC = () => {
  const { isBookingModalOpen, setIsBookingModalOpen, createCourierBooking, setCurrentView } = useStore();

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('+250 78');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupDistrict, setPickupDistrict] = useState('Gasabo (Kimihurura)');

  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('+250 78');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDistrict, setDeliveryDistrict] = useState('Nyarugenge (Kiyovu)');

  const [packageType, setPackageType] = useState<'Documents' | 'Parcel' | 'Fragile / Electronics' | 'Food & Groceries' | 'Heavy Cargo'>('Parcel');
  const [vehicleType, setVehicleType] = useState<'Moto Express' | 'Standard Car' | 'Cargo Van'>('Moto Express');
  const [preferredTime, setPreferredTime] = useState('Immediate Express (20–40 mins)');
  const [notes, setNotes] = useState('');
  const [createdBookingCode, setCreatedBookingCode] = useState<string | null>(null);

  if (!isBookingModalOpen) return null;

  // Calculate dynamic delivery fee
  const calculateFee = (): number => {
    let base = 1500;
    if (deliveryDistrict.includes('Provinces') || deliveryDistrict.includes('Musanze') || deliveryDistrict.includes('Rubavu')) {
      base = 4500;
    }
    if (vehicleType === 'Moto Express') base *= 1;
    if (vehicleType === 'Standard Car') base *= 2.2;
    if (vehicleType === 'Cargo Van') base *= 4.5;
    if (packageType === 'Fragile / Electronics') base += 500;
    if (packageType === 'Heavy Cargo') base += 2000;
    return Math.round(base);
  };

  const estimatedFee = calculateFee();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupAddress || !deliveryAddress || !senderName || !recipientName) {
      alert('Please fill in pickup, delivery address, and contact names.');
      return;
    }

    const booking = createCourierBooking({
      senderName,
      senderPhone,
      pickupAddress,
      pickupDistrict,
      recipientName,
      recipientPhone,
      deliveryAddress,
      deliveryDistrict,
      packageType,
      vehicleType,
      preferredTime,
      fee: estimatedFee,
      estimatedArrival: 'In 35–45 minutes',
      notes
    });

    setCreatedBookingCode(booking.trackingNumber);
  };

  const handleTrackCreated = () => {
    setIsBookingModalOpen(false);
    setCreatedBookingCode(null);
    setCurrentView('track');
  };

  return (
    <div
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={() => setIsBookingModalOpen(false)}
    >
      <div
        id="booking-modal-content"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-500/10 shrink-0">
          <div className="flex items-center gap-3">
            <IshemaLogo variant="mark" size="sm" />
            <div>
              <h2 className="font-heading font-bold text-slate-900 text-lg">Order a Delivery</h2>
              <p className="text-xs text-slate-500 font-body">Door-to-door courier service across Rwanda</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsBookingModalOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6">
          {createdBookingCode ? (
            /* Success confirmation */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-1">
                Delivery Successfully Booked!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-body mb-4">
                A nearby Ishema driver has been notified and will arrive at the pickup address shortly.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block text-left mb-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500">Tracking Code:</span>
                  <span className="font-mono font-bold text-base text-amber-600 bg-amber-50 px-2 py-0.5 rounded-sm">
                    {createdBookingCode}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-slate-500">Estimated Delivery Fee:</span>
                  <span className="font-bold text-slate-900">{formatRWF(estimatedFee)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Vehicle Assigned:</span>
                  <span className="font-medium text-slate-800">{vehicleType}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleTrackCreated}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-sm shadow-md inline-flex items-center justify-center gap-2"
                >
                  Track Package Status Live
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-interface font-semibold text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pickup Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  1. Pickup Details (Sender)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sender Name *</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={e => setSenderName(e.target.value)}
                      placeholder="e.g. Paul Kagabo"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sender Phone (MTN/Airtel) *</label>
                    <input
                      type="tel"
                      required
                      value={senderPhone}
                      onChange={e => setSenderPhone(e.target.value)}
                      placeholder="+250 788 000 000"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Address / Street *</label>
                    <input
                      type="text"
                      required
                      value={pickupAddress}
                      onChange={e => setPickupAddress(e.target.value)}
                      placeholder="House No, Street (e.g. KG 674 St)"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Sector / Zone</label>
                    <select
                      value={pickupDistrict}
                      onChange={e => setPickupDistrict(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {RWANDA_LOCATIONS.map(loc => (
                        <option key={`pick-${loc.sector}`} value={`${loc.district} (${loc.sector})`}>
                          {loc.district} - {loc.sector}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  2. Dropoff Details (Recipient)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Name *</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                      placeholder="e.g. Marie Uwase"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Phone *</label>
                    <input
                      type="tel"
                      required
                      value={recipientPhone}
                      onChange={e => setRecipientPhone(e.target.value)}
                      placeholder="+250 788 111 222"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. Kigali Heights, 3rd Floor"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Sector / Zone</label>
                    <select
                      value={deliveryDistrict}
                      onChange={e => setDeliveryDistrict(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {RWANDA_LOCATIONS.map(loc => (
                        <option key={`drop-${loc.sector}`} value={`${loc.district} (${loc.sector})`}>
                          {loc.district} - {loc.sector} ({formatRWF(loc.fee)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Package & Vehicle Selection */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  3. Package & Vehicle Type
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {(['Moto Express', 'Standard Car', 'Cargo Van'] as const).map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVehicleType(v)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        vehicleType === v
                          ? 'border-amber-500 bg-amber-50/70 text-slate-950 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {v === 'Moto Express' && <Bike className="w-5 h-5 text-amber-600" />}
                      {v === 'Standard Car' && <Car className="w-5 h-5 text-amber-600" />}
                      {v === 'Cargo Van' && <Truck className="w-5 h-5 text-amber-600" />}
                      <span className="text-xs">{v}</span>
                      <span className="text-[10px] text-slate-400">
                        {v === 'Moto Express' ? 'Fastest for Parcels' : v === 'Standard Car' ? 'Boxes & Fragile' : 'Bulk & Furniture'}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Package Category</label>
                    <select
                      value={packageType}
                      onChange={e => setPackageType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="Documents">Legal Documents / Envelopes</option>
                      <option value="Parcel">Standard Parcel (Up to 5kg)</option>
                      <option value="Fragile / Electronics">Fragile / Electronics / Laptops</option>
                      <option value="Food & Groceries">Hot Food & Cold Groceries</option>
                      <option value="Heavy Cargo">Heavy Cargo (Above 20kg)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time</label>
                    <select
                      value={preferredTime}
                      onChange={e => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="Immediate Express (20–40 mins)">⚡ Immediate Express (20–40 mins)</option>
                      <option value="Today Afternoon (1:00 PM – 4:00 PM)">Today Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="Tonight (6:00 PM – 9:00 PM)">Tonight (6:00 PM – 9:00 PM)</option>
                      <option value="Tomorrow Morning (8:00 AM – 12:00 PM)">Tomorrow Morning (8:00 AM – 12:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Special Delivery Notes</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Gate code, landmark, or specific instructions..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price estimation and CTA */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Estimated Delivery Fee:</span>
                  <span className="font-heading font-bold text-2xl text-amber-400">
                    {formatRWF(estimatedFee)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Pay cash on pickup or via MTN MoMo</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  Confirm & Dispatch
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
