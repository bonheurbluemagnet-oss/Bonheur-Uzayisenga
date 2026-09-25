import React, { useState } from 'react';
import {
  Compass,
  Bike,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  Package,
  CheckCircle2,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { LiveDeliveryTrackingMap } from '../maps/LiveDeliveryTrackingMap';
import { Order } from '../../types';

export const InFrameLiveMapView: React.FC = () => {
  const { orders, setCurrentView } = useStore();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || 'ord-101');

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

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
            <button
              type="button"
              onClick={() => setCurrentView('orders')}
              className="hover:text-amber-600 transition-colors"
            >
              Orders
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-700">Live Delivery Map</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950 flex items-center gap-2.5">
            <span>Live Kigali Delivery Map</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              GPS Live
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track courier movement, route polyline, and estimated arrival in real time inside the application frame.
          </p>
        </div>

        {/* Order Selector */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Active Order:</span>
            <select
              value={selectedOrderId}
              onChange={e => setSelectedOrderId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
            >
              {orders.map(o => (
                <option key={o.id} value={o.id}>
                  #{o.trackingNumber || o.id} - {o.status.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Map Frame */}
      {currentOrder ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <LiveDeliveryTrackingMap order={currentOrder} />
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-slate-800">No Active Deliveries</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Place an order from any supermarket or restaurant to watch the live motorcycle courier on the map.
          </p>
          <button
            type="button"
            onClick={() => setCurrentView('supermarket')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-md"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};
