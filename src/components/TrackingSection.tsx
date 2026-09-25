import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Bike,
  Package,
  AlertCircle,
  Truck,
  ArrowRight
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { IshemaLogo } from './IshemaLogo';
import { LiveDeliveryTrackingMap } from './maps/LiveDeliveryTrackingMap';
import { Order } from '../types';

export const TrackingSection: React.FC = () => {
  const { orders, bookings, activeTrackingNumber, setActiveTrackingNumber } = useStore();
  const [inputCode, setInputCode] = useState(activeTrackingNumber || 'ISH-RW-9021');

  // Search in orders and courier bookings
  const matchedOrder = orders.find(
    o =>
      o.trackingNumber.toLowerCase() === inputCode.trim().toLowerCase() ||
      o.id.toLowerCase() === inputCode.trim().toLowerCase()
  );
  const matchedBooking = bookings.find(
    b =>
      b.trackingNumber.toLowerCase() === inputCode.trim().toLowerCase() ||
      b.id.toLowerCase() === inputCode.trim().toLowerCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTrackingNumber(inputCode.trim().toUpperCase());
  };

  // Convert matched courier booking into Order format for LiveDeliveryTrackingMap if needed
  const orderForTracking: Order | null = matchedOrder
    ? matchedOrder
    : matchedBooking
    ? {
        id: matchedBooking.id,
        trackingNumber: matchedBooking.trackingNumber,
        customer: {
          fullName: matchedBooking.recipientName,
          phone: matchedBooking.recipientPhone,
          address: matchedBooking.deliveryAddress,
          district: matchedBooking.deliveryDistrict,
          notes: matchedBooking.notes
        },
        items: [
          {
            product: {
              id: 'pkg-' + matchedBooking.id,
              name: `${matchedBooking.packageType} (${matchedBooking.vehicleType})`,
              slug: 'package-delivery',
              categoryId: 'courier',
              subcategoryId: 'express',
              price: matchedBooking.fee,
              rating: 5,
              reviewsCount: 1,
              seller: {
                name: matchedBooking.senderName,
                location: matchedBooking.pickupAddress,
                verified: true,
                rating: 4.9,
                phone: matchedBooking.senderPhone
              },
              stock: 1,
              inStock: true,
              images: [
                'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80'
              ],
              shortDescription: `Express pickup from ${matchedBooking.pickupAddress}`,
              description: `Express pickup from ${matchedBooking.pickupAddress}`,
              specifications: {},
              estimatedDeliveryTime: matchedBooking.preferredTime,
              deliveryFee: 0
            },
            quantity: 1
          }
        ],
        subtotal: matchedBooking.fee,
        deliveryFee: 0,
        total: matchedBooking.fee,
        paymentMethod: 'Ishema Wallet',
        paymentStatus: 'Paid',
        status:
          matchedBooking.status === 'Picked Up'
            ? 'Picked Up'
            : matchedBooking.status === 'In Transit'
            ? 'On the Way'
            : matchedBooking.status === 'Delivered'
            ? 'Delivered'
            : 'Driver Assigned',
        createdAt: matchedBooking.createdAt,
        assignedDriver: matchedBooking.assignedDriver,
        timeline: matchedBooking.timeline,
        landmarkDetails: matchedBooking.landmarkDetails || {
          streetAddress: matchedBooking.deliveryAddress,
          district: matchedBooking.deliveryDistrict,
          sector: 'Kigali',
          nearbyLandmark: `Near ${matchedBooking.deliveryAddress.split(',')[0]}`,
          writtenDirections: matchedBooking.notes || ''
        }
      }
    : null;

  return (
    <div id="track-package-section" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header & Search Bar */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20 mb-3">
          <Truck className="w-3.5 h-3.5" />
          Real-Time Rwanda Logistics Tracking
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 mb-3">
          Track Your Package
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm font-body mb-6">
          Enter your Ishema Express tracking code (e.g. <strong>ISH-RW-9021</strong>,{' '}
          <strong>ISH-RW-7482</strong>) to follow your courier or store order live across Kigali &
          Rwanda.
        </p>

        {/* Input box */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputCode}
              onChange={e => setInputCode(e.target.value)}
              placeholder="Enter Tracking No (e.g. ISH-RW-9021)"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm uppercase tracking-wider font-semibold shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-sm shadow-md transition-colors"
          >
            Track Status
          </button>
        </form>

        {/* Quick Sample Numbers */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500 font-interface">
          <span>Try sample codes:</span>
          {['ISH-RW-9021', 'ISH-RW-7482', 'ISH-RW-8821'].map(code => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setInputCode(code);
                setActiveTrackingNumber(code);
              }}
              className="text-amber-700 hover:underline font-mono font-semibold"
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Tracking Result Card */}
      {orderForTracking ? (
        <div className="space-y-6">
          {/* Live Delivery Tracking Map (Requirement 3 & 4) */}
          <LiveDeliveryTrackingMap order={orderForTracking} />

          {/* Details Tabs: Items in Order & Chronological Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Items Summary */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-xs font-heading font-extrabold text-slate-800 uppercase tracking-wider mb-3">
                {matchedOrder ? 'Items in Order' : 'Courier Parcel Specifications'}
              </h4>

              {matchedOrder && (
                <div className="space-y-2.5">
                  {matchedOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-2.5">
                        {it.product.images[0] && (
                          <img
                            src={it.product.images[0]}
                            alt={it.product.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                          />
                        )}
                        <div>
                          <span className="font-bold text-slate-900 block">{it.product.name}</span>
                          <span className="text-[11px] text-slate-500">Qty: {it.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatRWF(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                    <span>Total Amount Paid:</span>
                    <span className="text-amber-600">{formatRWF(matchedOrder.total)}</span>
                  </div>
                </div>
              )}

              {matchedBooking && (
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Package Category:</span>
                    <span className="font-bold text-slate-900">{matchedBooking.packageType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Vehicle:</span>
                    <span className="font-bold text-slate-900">{matchedBooking.vehicleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sender:</span>
                    <span className="font-bold text-slate-900">
                      {matchedBooking.senderName} ({matchedBooking.senderPhone})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recipient:</span>
                    <span className="font-bold text-slate-900">
                      {matchedBooking.recipientName} ({matchedBooking.recipientPhone})
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-xs">
                    <span>Courier Fee:</span>
                    <span className="text-amber-700">{formatRWF(matchedBooking.fee)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Events */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-xs font-heading font-extrabold text-slate-800 uppercase tracking-wider mb-3">
                Chronological Event Log
              </h4>
              <div className="space-y-2.5 text-xs max-h-72 overflow-y-auto pr-1">
                {(matchedOrder ? matchedOrder.timeline : matchedBooking?.timeline || []).map(
                  (ev, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{ev.status}</span>
                        <span className="text-slate-600 font-body text-[11px]">{ev.note}</span>
                        <span className="text-[10px] text-amber-700 font-semibold block mt-1">
                          📍 {ev.location}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0 font-medium">
                        {ev.timestamp}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Not found notice */
        <div className="text-center py-12 px-4 bg-white rounded-3xl border border-slate-200">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
            Tracking Code "{inputCode}" Not Found
          </h3>
          <p className="text-xs text-slate-500 font-body max-w-sm mx-auto mb-4">
            Please verify your tracking code or check your SMS/WhatsApp confirmation message.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setInputCode('ISH-RW-9021');
                setActiveTrackingNumber('ISH-RW-9021');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-600"
            >
              Load Demo Package (ISH-RW-9021)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
