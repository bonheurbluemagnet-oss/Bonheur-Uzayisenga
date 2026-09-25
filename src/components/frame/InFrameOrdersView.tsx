import React, { useState } from 'react';
import {
  Package,
  Clock,
  MapPin,
  ChevronRight,
  Navigation,
  FileText,
  RotateCcw,
  CheckCircle2,
  Bike,
  AlertCircle,
  Truck,
  Phone,
  Eye,
  Store
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { Order } from '../../types';

export const InFrameOrdersView: React.FC = () => {
  const {
    orders,
    bookings,
    setCurrentView,
    addToCart,
    setSelectedReceiptTransaction,
    setActiveTrackingNumber
  } = useStore();

  const [activeTab, setActiveTab] = useState<'active' | 'previous'>('active');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Filter orders
  const activeOrders = orders.filter(
    o => o.status !== 'Delivered' && o.status !== 'Cancelled'
  );
  const previousOrders = orders.filter(
    o => o.status === 'Delivered' || o.status === 'Cancelled'
  );

  const displayedOrders = activeTab === 'active' ? activeOrders : previousOrders;

  const handleTrackOnMap = (order: Order) => {
    setActiveTrackingNumber(order.trackingNumber);
    setCurrentView('map');
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item.product, item.quantity);
    });
    setCurrentView('cart');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="hover:text-amber-600 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-700">Orders & Deliveries</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
            My Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View active moto deliveries, check receipts, and reorder your favorite supermarket goods.
          </p>
        </div>

        {/* Tab Controls: Active Orders & Previous Orders */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'active'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('previous')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'previous'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Previous Orders ({previousOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {displayedOrders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-slate-800">
            No {activeTab === 'active' ? 'Active' : 'Previous'} Orders
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            {activeTab === 'active'
              ? 'You do not have any orders in transit right now. Order fresh food or groceries to start tracking!'
              : 'You have not completed any past orders yet.'}
          </p>
          <button
            type="button"
            onClick={() => setCurrentView('supermarket')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-md"
          >
            Browse Supermarket
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedOrders.map(order => {
            const isDelivered = order.status === 'Delivered';
            const statusColors: Record<string, string> = {
              'Order Placed': 'bg-amber-100 text-amber-800 border-amber-200',
              'Order Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
              'Payment Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
              'Preparing': 'bg-purple-100 text-purple-800 border-purple-200',
              'Preparing Order': 'bg-purple-100 text-purple-800 border-purple-200',
              'Driver Assigned': 'bg-indigo-100 text-indigo-800 border-indigo-200',
              'Picked Up': 'bg-indigo-100 text-indigo-800 border-indigo-200',
              'On the Way': 'bg-emerald-100 text-emerald-800 border-emerald-200 animate-pulse',
              'Out for Delivery': 'bg-emerald-100 text-emerald-800 border-emerald-200 animate-pulse',
              'Delivered': 'bg-slate-100 text-slate-700 border-slate-200',
              'Cancelled': 'bg-rose-100 text-rose-800 border-rose-200'
            };
            const currentBadgeClass = statusColors[order.status] || 'bg-slate-100 text-slate-700';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-amber-400 transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                      <Bike className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-extrabold text-sm text-slate-950">
                          Order #{order.trackingNumber || order.id}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${currentBadgeClass}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{order.customer.district || 'Kigali'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="font-heading font-extrabold text-base text-slate-950">
                      {formatRWF(order.total)}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} • {order.paymentMethod || 'Wallet'}
                    </div>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3"
                    >
                      <img
                        src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover bg-white shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {item.quantity}x @ {formatRWF(item.product.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="p-2.5 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
                      +{order.items.length - 3} more items
                    </div>
                  )}
                </div>

                {/* Actions row: Map, Details, Reorder */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span className="truncate max-w-xs">{order.customer.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Live Map Button */}
                    {!isDelivered && (
                      <button
                        type="button"
                        onClick={() => handleTrackOnMap(order)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Track on Live Map</span>
                      </button>
                    )}

                    {/* Receipt Details Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedOrderDetails(order)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details & Receipt</span>
                    </button>

                    {/* Reorder Button */}
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>

                {/* Inline Expanded Receipt / Details */}
                {selectedOrderDetails?.id === order.id && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 mt-3 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-bold text-slate-900">Official Ishema Order Invoice</span>
                      <button
                        type="button"
                        onClick={() => setSelectedOrderDetails(null)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                      >
                        Close
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      {order.items.map((item, i) => (
                        <div key={i} className="py-1.5 flex justify-between">
                          <span>{item.quantity}x {item.product.name}</span>
                          <span className="font-semibold text-slate-900">
                            {formatRWF(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                      <div className="py-1.5 flex justify-between text-slate-600">
                        <span>Delivery Fee</span>
                        <span>{formatRWF(order.deliveryFee || 1500)}</span>
                      </div>
                      <div className="pt-2 flex justify-between font-extrabold text-sm text-slate-950">
                        <span>Total Paid</span>
                        <span className="text-amber-700">{formatRWF(order.total)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
