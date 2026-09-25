import React, { useState } from 'react';
import {
  Bike,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle,
  Clock,
  DollarSign,
  ShieldCheck,
  Power,
  Navigation,
  Package,
  ShoppingBag,
  ExternalLink,
  Gift,
  EyeOff,
  Sparkles,
  Info
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { OrderStatus, CourierStatus, Order } from '../types';
import { IshemaLogo } from './IshemaLogo';
import { DriverNavigationMap } from './maps/DriverNavigationMap';

export const DriverDashboard: React.FC = () => {
  const {
    drivers,
    activeDriverId,
    setActiveDriverId,
    orders,
    bookings,
    updateOrderStatus,
    updateCourierStatus,
    setCurrentView
  } = useStore();

  const [isOnline, setIsOnline] = useState(true);
  const [viewMode, setViewMode] = useState<'tasks' | 'map'>('tasks');
  const [navigatingOrderId, setNavigatingOrderId] = useState<string | null>(null);

  const currentDriver = drivers.find(d => d.id === activeDriverId) || drivers[0];

  // Assigned orders for this driver
  const assignedOrders = orders.filter(o => o.assignedDriver?.id === currentDriver.id);
  const assignedBookings = bookings.filter(b => b.assignedDriver?.id === currentDriver.id);

  const activeOrderForNav =
    assignedOrders.find(o => o.id === navigatingOrderId) ||
    assignedOrders.find(o => o.status === 'Out for Delivery') ||
    assignedOrders.find(o => o.status !== 'Delivered') ||
    assignedOrders[0] ||
    null;

  // Completed today earnings
  const completedOrders = assignedOrders.filter(o => o.status === 'Delivered');
  const completedBookings = assignedBookings.filter(b => b.status === 'Delivered');
  const todayEarnings =
    completedOrders.reduce((sum, o) => sum + o.deliveryFee * 0.85, 0) +
    completedBookings.reduce((sum, b) => sum + b.fee * 0.85, 0) +
    18500; // Base daily pay

  return (
    <div id="driver-dashboard-container" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Brand Banner */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <IshemaLogo variant="horizontal" size="sm" />
        <span className="text-xs font-interface font-semibold text-slate-500">
          Driver Partner Dispatch App
        </span>
      </div>

      {/* Top Driver Profile Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 mb-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentDriver.photo}
                alt={currentDriver.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                  isOnline ? 'bg-emerald-500' : 'bg-slate-500'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {currentDriver.name}
                </h1>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-md border border-amber-500/30">
                  {currentDriver.vehicle.split('(')[0]}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-body">
                Vehicle Plate: <strong>{currentDriver.vehicle.match(/\((.*?)\)/)?.[1] || 'Kigali Express'}</strong>
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span>⭐ {currentDriver.rating.toFixed(1)} Driver Rating</span>
                <span>•</span>
                <span>{currentDriver.totalDeliveries}+ Completed Deliveries</span>
              </div>
            </div>
          </div>

          {/* Switch Driver & Online Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Driver Switcher */}
            <div className="text-xs">
              <span className="block text-[10px] text-slate-400 font-medium mb-1">Switch Driver Demo:</span>
              <select
                value={activeDriverId}
                onChange={e => setActiveDriverId(e.target.value)}
                className="py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
              >
                {drivers.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.vehicle.split('(')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Status */}
            <div>
              <span className="block text-[10px] text-slate-400 font-medium mb-1">Status:</span>
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-interface flex items-center gap-1.5 transition-colors ${
                  isOnline
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                {isOnline ? 'Online (Accepting Deliveries)' : 'Offline'}
              </button>
            </div>
          </div>
        </div>

        {/* Driver Daily Earnings Strip */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-800/60">
            <span className="text-[11px] text-slate-400 block">Today's Earnings</span>
            <span className="font-heading font-extrabold text-lg text-amber-400">
              {formatRWF(todayEarnings)}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60">
            <span className="text-[11px] text-slate-400 block">Active Tasks</span>
            <span className="font-heading font-extrabold text-lg text-white">
              {assignedOrders.filter(o => o.status !== 'Delivered').length +
                assignedBookings.filter(b => b.status !== 'Delivered').length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60">
            <span className="text-[11px] text-slate-400 block">Operating Zone</span>
            <span className="font-medium text-xs text-slate-200 truncate block">
              {currentDriver.currentZone.split('(')[0]}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60">
            <span className="text-[11px] text-slate-400 block">Payout Method</span>
            <span className="font-bold text-xs text-emerald-400">MTN MoMo Direct</span>
          </div>
        </div>
      </div>

      {/* Active Tasks & Navigation Map */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <h2 className="font-heading font-bold text-slate-900 text-xl">
              Assigned Orders & Dispatch
            </h2>
            <p className="text-xs text-slate-500 font-body">
              Accept requests, inspect customer landmarks, navigate GPS, and complete dropoffs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('tasks')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'tasks'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📋 Tasks ({assignedOrders.length + assignedBookings.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'map'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                Driver Map
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 hidden sm:inline-block ml-2"
            >
              Marketplace
            </button>
          </div>
        </div>

        {viewMode === 'map' ? (
          /* Driver GPS Navigation View (Requirement 5) */
          <div className="space-y-4">
            {assignedOrders.length > 1 && (
              <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-700">Active Navigation Target:</span>
                <select
                  value={activeOrderForNav?.id || ''}
                  onChange={e => setNavigatingOrderId(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-slate-50 focus:outline-none"
                >
                  {assignedOrders.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.trackingNumber} — {o.customer.fullName} ({o.status})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeOrderForNav ? (
              <DriverNavigationMap
                driver={currentDriver}
                orders={assignedOrders}
                onUpdateOrderStatus={(orderId, newStatus) => {
                  updateOrderStatus(
                    orderId,
                    newStatus,
                    `Driver ${currentDriver.name} updated status to ${newStatus}`
                  );
                }}
              />
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
                <Bike className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No active delivery to navigate to right now.</p>
                <button
                  type="button"
                  onClick={() => setViewMode('tasks')}
                  className="mt-3 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Back to Tasks List
                </button>
              </div>
            )}
          </div>
        ) : (
        /* Standard Tasks List */
        <>
        {/* Assigned Orders */}
        {assignedOrders.length === 0 && assignedBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-6">
            <Bike className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-slate-900 text-base mb-1">
              No tasks currently assigned to {currentDriver.name}
            </h3>
            <p className="text-xs text-slate-500 font-body max-w-sm mx-auto mb-4">
              You can assign orders or courier packages to this driver from the Admin Dashboard.
            </p>
            <button
              type="button"
              onClick={() => setCurrentView('admin')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold"
            >
              Open Admin to Assign Tasks
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Store Orders */}
            {assignedOrders.map(order => {
              const isSurprise = order.isSurprise;
              const waText = isSurprise
                ? encodeURIComponent(`Muraho ${order.customer.fullName}! This is ${currentDriver.name} from Ishema Express. You have a special surprise delivery on the way! Please confirm if you are available at ${order.customer.address} to receive it.`)
                : encodeURIComponent(`Muraho ${order.customer.fullName}! This is ${currentDriver.name} from Ishema Express delivering your order.`);

              return (
              <div
                key={order.id}
                className={`rounded-2xl border shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all ${
                  isSurprise
                    ? 'bg-linear-to-r from-rose-50/40 via-white to-amber-50/30 border-rose-300 ring-1 ring-rose-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="space-y-2 max-w-lg">
                  <div className="flex flex-wrap items-center gap-2">
                    {isSurprise ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-linear-to-r from-rose-500 to-amber-500 text-white shadow-xs flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        SECRET SURPRISE GIFT
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                        Store Delivery
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-slate-700">
                      {order.trackingNumber}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {order.status}
                    </span>
                  </div>

                  <h3 className="font-interface font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>{isSurprise ? 'Recipient:' : 'Customer:'} {order.customer.fullName}</span>
                  </h3>

                  {isSurprise && (
                    <div className="p-3 rounded-xl bg-rose-100/70 border border-rose-300 text-xs space-y-1 text-rose-950">
                      <div className="flex items-center gap-1.5 font-bold text-rose-900">
                        <EyeOff className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>SECRET DRIVER PROTOCOL — SENDER MUST REMAIN HIDDEN</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        • When contacting recipient, say: <span className="font-bold underline">“You have a surprise delivery from Ishema Express.”</span>
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        • If recipient asks who sent it: <span className="font-bold underline">“I cannot disclose that, it is a surprise gift.”</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-700 font-medium">
                        {order.surpriseConfig?.scheduledTimeWindow && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            Time window: <strong>{order.surpriseConfig.scheduledTimeWindow}</strong>
                          </span>
                        )}
                        {order.surpriseConfig?.giftWrappingStyle && (
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                            Wrap: <strong className="capitalize">{order.surpriseConfig.giftWrappingStyle.replace('-', ' ')}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-slate-600 font-body space-y-1">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Delivery Location: <strong>{order.customer.address}</strong> ({order.customer.district})</span>
                    </div>
                    {order.customer.notes && (
                      <p className="text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                        <strong>Landmark / Instructions:</strong> {order.customer.notes}
                      </p>
                    )}
                    <div className="text-[11px] text-slate-500">
                      Package items: {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  {/* Contact Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${order.customer.phone}`}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {isSurprise ? 'Call Recipient' : 'Call Customer'}
                    </a>
                    <a
                      href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>

                  {/* Open Navigation Map button */}
                  <button
                    type="button"
                    onClick={() => {
                      setNavigatingOrderId(order.id);
                      setViewMode('map');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-300"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-600" />
                    Open Driver Map & GPS
                  </button>

                  {/* Status Progress Actions */}
                  {order.status === 'Driver Assigned' && (
                    <button
                      type="button"
                      onClick={() => updateOrderStatus(order.id, 'Out for Delivery', `${currentDriver.name} picked up package and is out for delivery`)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Start Delivery (Out for Delivery)
                    </button>
                  )}

                  {order.status === 'Out for Delivery' && (
                    <button
                      type="button"
                      onClick={() => updateOrderStatus(order.id, 'Delivered', `Surprise gift package handed over to recipient: ${order.customer.fullName}`)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {isSurprise ? 'Confirm Surprise Delivered' : 'Confirm Delivered'}
                    </button>
                  )}

                  {order.status === 'Delivered' && (
                    <span className="text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl flex items-center justify-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isSurprise ? 'Surprise Gift Handed Over' : 'Order Completed & Paid'}</span>
                    </span>
                  )}
                </div>
              </div>
              );
            })}

            {/* Courier Bookings */}
            {assignedBookings.map(bkg => (
              <div
                key={bkg.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="space-y-2 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      Courier Parcel
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700">
                      {bkg.trackingNumber}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {bkg.status}
                    </span>
                  </div>

                  <h3 className="font-interface font-bold text-slate-900 text-base">
                    {bkg.packageType} ({bkg.vehicleType})
                  </h3>

                  <div className="text-xs text-slate-600 font-body space-y-1">
                    <div>
                      Pickup: <strong>{bkg.pickupAddress}</strong> ({bkg.senderName} - {bkg.senderPhone})
                    </div>
                    <div>
                      Dropoff: <strong>{bkg.deliveryAddress}</strong> ({bkg.recipientName} - {bkg.recipientPhone})
                    </div>
                    {bkg.notes && (
                      <p className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded-lg">
                        Instructions: {bkg.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${bkg.recipientPhone}`}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Recipient
                    </a>
                    <a
                      href={`https://wa.me/${bkg.recipientPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>

                  {bkg.status === 'Driver Assigned' && (
                    <button
                      type="button"
                      onClick={() => updateCourierStatus(bkg.id, 'Picked Up', `${currentDriver.name} collected parcel from sender`)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold"
                    >
                      Confirm Package Picked Up
                    </button>
                  )}

                  {bkg.status === 'Picked Up' && (
                    <button
                      type="button"
                      onClick={() => updateCourierStatus(bkg.id, 'In Transit', `${currentDriver.name} is on route to recipient`)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold"
                    >
                      Start Transit (In Transit)
                    </button>
                  )}

                  {bkg.status === 'In Transit' && (
                    <button
                      type="button"
                      onClick={() => updateCourierStatus(bkg.id, 'Delivered', `Delivered directly to ${bkg.recipientName}`)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
                      Confirm Delivered
                    </button>
                  )}

                  {bkg.status === 'Delivered' && (
                    <span className="text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl">
                      ✓ Courier Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
};
