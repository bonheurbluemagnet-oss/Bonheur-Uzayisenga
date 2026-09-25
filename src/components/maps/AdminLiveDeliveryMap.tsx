import React, { useState, useMemo } from 'react';
import {
  Bike,
  Package,
  MapPin,
  Store,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  AlertCircle,
  Filter,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  Eye
} from 'lucide-react';
import { Order, Driver, OrderStatus } from '../../types';
import { LeafletMapContainer } from './LeafletMapContainer';
import { MapErrorBoundary } from './MapErrorBoundary';
import { ISHEMA_CENTRAL_HUB, KIGALI_LANDMARKS } from './mapData';

export interface AdminLiveDeliveryMapProps {
  orders: Order[];
  drivers: Driver[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  className?: string;
}

export const AdminLiveDeliveryMap: React.FC<AdminLiveDeliveryMapProps> = ({
  orders,
  drivers,
  onUpdateOrderStatus,
  className = ''
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'in_transit' | 'preparing' | 'drivers'>('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Active orders (not yet delivered or cancelled)
  const activeOrders = useMemo(() => {
    return orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  }, [orders]);

  // Filtered orders for the map
  const displayOrders = useMemo(() => {
    let list = activeOrders;
    if (filterMode === 'in_transit') {
      list = list.filter(o => o.status === 'Out for Delivery' || o.status === 'On the Way');
    } else if (filterMode === 'preparing') {
      list = list.filter(o => o.status === 'Preparing Order' || o.status === 'Preparing' || o.status === 'Driver Assigned');
    } else if (filterMode === 'drivers') {
      return [];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        o =>
          o.trackingNumber.toLowerCase().includes(q) ||
          o.customer.fullName.toLowerCase().includes(q) ||
          o.customer.address.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeOrders, filterMode, searchQuery]);

  // Display drivers
  const displayDrivers = useMemo(() => {
    if (filterMode === 'preparing') return [];
    return drivers;
  }, [drivers, filterMode]);

  // Quick stats
  const stats = useMemo(() => {
    const inTransit = activeOrders.filter(o => o.status === 'Out for Delivery' || o.status === 'On the Way').length;
    const preparing = activeOrders.filter(o => o.status === 'Preparing Order' || o.status === 'Preparing' || o.status === 'Driver Assigned').length;
    const availableDrivers = drivers.length - inTransit;
    return {
      activeOrdersCount: activeOrders.length,
      inTransit,
      preparing,
      driversCount: drivers.length,
      availableDrivers: Math.max(0, availableDrivers)
    };
  }, [activeOrders, drivers]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Header & Fleet Statistics */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                Ishema Dispatch Operations
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">
              Admin Live Kigali Delivery Map
            </h3>
            <p className="text-xs text-slate-400">
              Real-time monitoring of Kigali drivers, active deliveries, hubs, and customer dropoff pins.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search order # or customer..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Deliveries</span>
            <span className="font-heading font-extrabold text-lg text-amber-400">{stats.activeOrdersCount}</span>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">In Transit (On the Way)</span>
            <span className="font-heading font-extrabold text-lg text-blue-400">{stats.inTransit}</span>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Preparing at Merchant</span>
            <span className="font-heading font-extrabold text-lg text-amber-300">{stats.preparing}</span>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Drivers (Kigali)</span>
            <span className="font-heading font-extrabold text-lg text-emerald-400">
              {stats.driversCount} <span className="text-xs font-normal text-slate-300">({stats.availableDrivers} ready)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Live Fleet ({activeOrders.length + drivers.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('in_transit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'in_transit'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            On the Way ({stats.inTransit})
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('preparing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'preparing'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Merchant Prep ({stats.preparing})
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('drivers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'drivers'
                ? 'bg-slate-900 text-amber-400 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Drivers Fleet Only ({drivers.length})
          </button>
        </div>

        <span className="text-[11px] text-slate-500">
          💡 Click any driver or order pin on the map to inspect details
        </span>
      </div>

      {/* Main Map View */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs space-y-3">
        <MapErrorBoundary fallbackMessage="Admin live delivery map temporarily offline. Please view active orders in the table below.">
          <LeafletMapContainer
            center={[-1.9536, 30.0605]}
            zoom={13}
            height="460px"
            fleetDrivers={displayDrivers}
            fleetOrders={displayOrders}
            onDriverClick={d => {
              setSelectedDriver(d);
              setSelectedOrder(null);
            }}
            onOrderClick={o => {
              setSelectedOrder(o);
              setSelectedDriver(null);
            }}
            pickupMarker={{
              lat: ISHEMA_CENTRAL_HUB.lat,
              lng: ISHEMA_CENTRAL_HUB.lng,
              name: ISHEMA_CENTRAL_HUB.name,
              address: 'Kigali CBD'
            }}
            showLocateButton={false}
          />
        </MapErrorBoundary>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-slate-600 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Available Driver
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Driver On Delivery
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Order In Transit
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
              Ishema Central Hub
            </span>
          </div>

          <span className="text-slate-400">Synced with Rwanda GPS telemetry</span>
        </div>
      </div>

      {/* Selected Driver Modal / Inspector */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Bike className="w-5 h-5 text-amber-600" />
                <h4 className="font-heading font-extrabold text-base text-slate-900">
                  Driver Fleet Details
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDriver(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={selectedDriver.photo}
                alt={selectedDriver.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <div>
                <h5 className="font-heading font-extrabold text-lg text-slate-900">
                  {selectedDriver.name}
                </h5>
                <p className="text-xs text-slate-600 font-semibold">{selectedDriver.vehicle}</p>
                <p className="text-xs text-amber-600 font-bold mt-0.5">
                  ★ {selectedDriver.rating} ({selectedDriver.totalDeliveries} total deliveries)
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Operating Zone:</span>
                <span className="font-semibold text-slate-800">{selectedDriver.currentZone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone Contact:</span>
                <span className="font-bold text-slate-900">{selectedDriver.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fleet Status:</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Active On Duty
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${selectedDriver.phone.replace(/\s+/g, '')}`}
                className="py-2.5 px-3 rounded-xl bg-slate-950 text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedDriver(null)}
                className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Order Modal / Inspector */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-600" />
                  <h4 className="font-heading font-extrabold text-base text-slate-900">
                    Order #{selectedOrder.trackingNumber}
                  </h4>
                </div>
                <span className="text-xs text-slate-400">Created {selectedOrder.createdAt}</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-4">
              {/* Customer Details */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-bold text-slate-900">{selectedOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-bold text-slate-900">{selectedOrder.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.landmarkDetails?.streetAddress || selectedOrder.customer.address}
                  </span>
                </div>
                {selectedOrder.landmarkDetails?.nearbyLandmark && (
                  <div className="flex justify-between text-amber-800 font-semibold">
                    <span>Landmark:</span>
                    <span>📍 {selectedOrder.landmarkDetails.nearbyLandmark}</span>
                  </div>
                )}
                {(selectedOrder.landmarkDetails?.deliveryInstructions ||
                  selectedOrder.customer.notes) && (
                  <div className="pt-1.5 border-t border-slate-200 text-slate-700 italic">
                    Instructions: “
                    {selectedOrder.landmarkDetails?.deliveryInstructions ||
                      selectedOrder.customer.notes}
                    ”
                  </div>
                )}
              </div>

              {/* Items Summary */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Ordered Items ({selectedOrder.items.length})
                </span>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-slate-800 font-medium">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-bold text-slate-900">
                      {(item.product.price * item.quantity).toLocaleString()} RWF
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 border-t border-slate-200 font-extrabold text-slate-900">
                  <span>Total Amount:</span>
                  <span>{selectedOrder.total.toLocaleString()} RWF</span>
                </div>
              </div>

              {/* Quick Status Changer */}
              <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">
                  Update Order Dispatch Status
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateOrderStatus(selectedOrder.id, 'Picked Up');
                      setSelectedOrder({ ...selectedOrder, status: 'Picked Up' });
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold ${
                      selectedOrder.status === 'Picked Up'
                        ? 'bg-purple-700 text-white'
                        : 'bg-white text-purple-800 border border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    Picked Up
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onUpdateOrderStatus(selectedOrder.id, 'On the Way');
                      setSelectedOrder({ ...selectedOrder, status: 'On the Way' });
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold ${
                      selectedOrder.status === 'On the Way' || selectedOrder.status === 'Out for Delivery'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    On the Way
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onUpdateOrderStatus(selectedOrder.id, 'Delivered');
                      setSelectedOrder({ ...selectedOrder, status: 'Delivered' });
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold ${
                      selectedOrder.status === 'Delivered'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    Delivered
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-800"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
