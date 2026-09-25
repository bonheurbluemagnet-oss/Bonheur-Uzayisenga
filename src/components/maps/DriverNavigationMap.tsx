import React, { useState, useMemo } from 'react';
import {
  Bike,
  Navigation,
  MapPin,
  Store,
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink,
  Layers,
  Clock,
  Compass,
  Building,
  Key,
  MessageSquare
} from 'lucide-react';
import { Order, OrderStatus, Driver } from '../../types';
import { LeafletMapContainer } from './LeafletMapContainer';
import { GoogleMapCanvas } from './GoogleMapCanvas';
import { useGoogleMapsConfig } from './useGoogleMapsConfig';
import { MapErrorBoundary } from './MapErrorBoundary';
import {
  generateDeliveryRoute,
  getClosestLandmark,
  ISHEMA_CENTRAL_HUB,
  calculateDistanceKm
} from './mapData';

export interface DriverNavigationMapProps {
  driver: Driver;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  className?: string;
}

export const DriverNavigationMap: React.FC<DriverNavigationMapProps> = ({
  driver,
  orders,
  onUpdateOrderStatus,
  className = ''
}) => {
  const { apiKey, isAvailable: isGoogleMapsAvailable } = useGoogleMapsConfig();

  // Active deliveries assigned to this driver
  const assignedOrders = useMemo(() => {
    return orders.filter(
      o =>
        (o.assignedDriver?.id === driver.id || o.assignedDriver?.name === driver.name) &&
        o.status !== 'Delivered' &&
        o.status !== 'Cancelled'
    );
  }, [orders, driver]);

  // Selected active delivery (or first one)
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    assignedOrders[0]?.id || orders[0]?.id || ''
  );

  const activeOrder = useMemo(() => {
    return orders.find(o => o.id === selectedOrderId) || assignedOrders[0] || orders[0];
  }, [orders, assignedOrders, selectedOrderId]);

  // Driver current coordinates (Kimihurura / near hub by default)
  const driverCoords = useMemo(() => {
    return (
      driver.currentLocation || {
        lat: -1.9540,
        lng: 30.0910
      }
    );
  }, [driver.currentLocation]);

  // Customer dropoff coordinates
  const customerCoords = useMemo(() => {
    if (!activeOrder) return { lat: -1.9536, lng: 30.0931 };
    if (activeOrder.landmarkDetails?.mapCoordinates) {
      return activeOrder.landmarkDetails.mapCoordinates;
    }
    if (activeOrder.landmarkDetails?.gpsCoordinates) {
      return {
        lat: activeOrder.landmarkDetails.gpsCoordinates.lat,
        lng: activeOrder.landmarkDetails.gpsCoordinates.lng
      };
    }
    if (activeOrder.deliveryCoordinates) {
      return activeOrder.deliveryCoordinates;
    }
    const closest = getClosestLandmark(-1.9536, 30.0931);
    return { lat: closest.lat, lng: closest.lng };
  }, [activeOrder]);

  // Pickup location coordinates
  const pickupCoords = useMemo(() => {
    if (activeOrder?.pickupLocation) {
      return { lat: activeOrder.pickupLocation.lat, lng: activeOrder.pickupLocation.lng };
    }
    return { lat: ISHEMA_CENTRAL_HUB.lat, lng: ISHEMA_CENTRAL_HUB.lng };
  }, [activeOrder]);

  // Delivery route
  const deliveryRoute = useMemo(() => {
    return generateDeliveryRoute(
      driverCoords.lat,
      driverCoords.lng,
      customerCoords.lat,
      customerCoords.lng
    );
  }, [driverCoords, customerCoords]);

  // Distance remaining
  const distanceKm = useMemo(() => {
    return calculateDistanceKm(
      driverCoords.lat,
      driverCoords.lng,
      customerCoords.lat,
      customerCoords.lng
    );
  }, [driverCoords, customerCoords]);

  // Turn-by-turn Navigation external links
  const googleMapsNavUrl = `https://www.google.com/maps/dir/?api=1&origin=${driverCoords.lat},${driverCoords.lng}&destination=${customerCoords.lat},${customerCoords.lng}&travelmode=driving`;
  const appleMapsNavUrl = `http://maps.apple.com/?saddr=${driverCoords.lat},${driverCoords.lng}&daddr=${customerCoords.lat},${customerCoords.lng}&dirflg=d`;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Bar with Multiple Deliveries Selector */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-md">
            🏍️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Driver Navigation Active
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
              {driver.name} • {driver.vehicle}
            </h3>
          </div>
        </div>

        {/* Multi-Delivery Selector if driver has multiple assigned orders */}
        {assignedOrders.length > 1 && (
          <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <span className="text-[11px] font-bold text-slate-300 px-2 shrink-0">
              Active Orders ({assignedOrders.length}):
            </span>
            <div className="flex gap-1 overflow-x-auto">
              {assignedOrders.map(order => (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    activeOrder?.id === order.id
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  #{order.trackingNumber}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map Column (2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Bike className="w-4 h-4" />
                    You ({distanceKm} km away)
                  </span>
                  <span className="text-slate-300">→</span>
                  <span className="flex items-center gap-1 text-slate-900 font-bold">
                    <MapPin className="w-4 h-4 text-red-500" />
                    {activeOrder.customer.fullName}
                  </span>
                </div>

                {/* External Navigation Links */}
                <div className="flex items-center gap-1.5">
                  <a
                    href={googleMapsNavUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Navigate (Google Maps)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href={appleMapsNavUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    <span>Apple Maps</span>
                  </a>
                </div>
              </div>

              {/* Interactive Map with Error Boundary */}
              <MapErrorBoundary fallbackMessage="Map unavailable. Please use the address details below to complete your delivery.">
                <div className="h-[380px] w-full rounded-xl overflow-hidden border border-slate-200 relative">
                  {isGoogleMapsAvailable && apiKey ? (
                    <GoogleMapCanvas
                      apiKey={apiKey}
                      center={{ lat: driverCoords.lat, lng: driverCoords.lng }}
                      zoom={14}
                      markers={[
                        {
                          id: 'pickup',
                          position: pickupCoords,
                          title: activeOrder.pickupLocation?.name || 'Store Pickup',
                          iconType: 'hub'
                        },
                        {
                          id: 'driver',
                          position: { lat: driverCoords.lat, lng: driverCoords.lng },
                          title: `${driver.name} (${driver.vehicle})`,
                          iconType: 'driver'
                        },
                        {
                          id: 'customer',
                          position: customerCoords,
                          title: activeOrder.landmarkDetails?.nearbyLandmark || activeOrder.customer.address,
                          iconType: 'customer'
                        }
                      ]}
                      routeCoordinates={deliveryRoute}
                      fallback={
                        <LeafletMapContainer
                          center={[driverCoords.lat, driverCoords.lng]}
                          zoom={14}
                          height="380px"
                          driverMarker={{
                            lat: driverCoords.lat,
                            lng: driverCoords.lng,
                            name: driver.name,
                            vehiclePlate: driver.vehicle,
                            heading: 45
                          }}
                          pickupMarker={{
                            lat: pickupCoords.lat,
                            lng: pickupCoords.lng,
                            name: activeOrder.pickupLocation?.name || 'Store Pickup',
                            address: activeOrder.pickupLocation?.address
                          }}
                          customerMarker={{
                            lat: customerCoords.lat,
                            lng: customerCoords.lng,
                            name: activeOrder.customer.fullName,
                            address: activeOrder.landmarkDetails?.nearbyLandmark || activeOrder.customer.address
                          }}
                          routeCoordinates={deliveryRoute}
                          showLocateButton={false}
                        />
                      }
                      className="w-full h-full"
                    />
                  ) : (
                    <LeafletMapContainer
                      center={[driverCoords.lat, driverCoords.lng]}
                      zoom={14}
                      height="380px"
                      driverMarker={{
                        lat: driverCoords.lat,
                        lng: driverCoords.lng,
                        name: driver.name,
                        vehiclePlate: driver.vehicle,
                        heading: 45
                      }}
                      pickupMarker={{
                        lat: pickupCoords.lat,
                        lng: pickupCoords.lng,
                        name: activeOrder.pickupLocation?.name || 'Store Pickup',
                        address: activeOrder.pickupLocation?.address
                      }}
                      customerMarker={{
                        lat: customerCoords.lat,
                        lng: customerCoords.lng,
                        name: activeOrder.customer.fullName,
                        address: activeOrder.landmarkDetails?.nearbyLandmark || activeOrder.customer.address
                      }}
                      routeCoordinates={deliveryRoute}
                      showLocateButton={false}
                    />
                  )}
                </div>
              </MapErrorBoundary>
            </div>
          </div>

          {/* Sidebar Column: Customer Landmark, Gate, Delivery Instructions & Status Updater */}
          <div className="space-y-4">
            {/* Quick Status Updater Controls (Requirement 5) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-700">
                  Update Delivery Status
                </h4>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {activeOrder.status}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onUpdateOrderStatus(activeOrder.id, 'Picked Up')}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    activeOrder.status === 'Picked Up'
                      ? 'bg-purple-700 text-white shadow-md'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                  }`}
                >
                  <span>📦</span>
                  <span>1. Mark Picked Up from Merchant</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateOrderStatus(activeOrder.id, 'On the Way')}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    activeOrder.status === 'On the Way' || activeOrder.status === 'Out for Delivery'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <span>🚴</span>
                  <span>2. Mark On the Way to Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateOrderStatus(activeOrder.id, 'Delivered')}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    activeOrder.status === 'Delivered'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3. Mark Delivered & Complete</span>
                </button>
              </div>
            </div>

            {/* Smart Landmark Details Card */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Customer Destination</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-600">
                  {activeOrder.customer.district}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                    Customer Name & Contact
                  </span>
                  <span className="font-extrabold text-slate-900 text-sm block">
                    {activeOrder.customer.fullName}
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <a
                      href={`tel:${activeOrder.customer.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{activeOrder.customer.phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/${activeOrder.customer.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                    Street Address
                  </span>
                  <span className="font-semibold text-slate-800 block">
                    {activeOrder.landmarkDetails?.streetAddress || activeOrder.customer.address}
                  </span>
                </div>

                {activeOrder.landmarkDetails?.nearbyLandmark && (
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] text-amber-800 uppercase font-bold block mb-0.5">
                      📍 Nearby Landmark
                    </span>
                    <span className="font-extrabold text-amber-950 text-xs">
                      {activeOrder.landmarkDetails.nearbyLandmark}
                    </span>
                  </div>
                )}

                {(activeOrder.landmarkDetails?.buildingName ||
                  activeOrder.landmarkDetails?.gateDescription) && (
                  <div className="grid grid-cols-2 gap-2">
                    {activeOrder.landmarkDetails.buildingName && (
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Building</span>
                        <span className="font-bold text-slate-900 text-xs">
                          {activeOrder.landmarkDetails.buildingName}
                        </span>
                      </div>
                    )}
                    {activeOrder.landmarkDetails.gateDescription && (
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Gate</span>
                        <span className="font-bold text-slate-900 text-xs">
                          {activeOrder.landmarkDetails.gateDescription}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {(activeOrder.landmarkDetails?.deliveryInstructions ||
                  activeOrder.landmarkDetails?.writtenDirections ||
                  activeOrder.customer.notes) && (
                  <div className="p-2.5 rounded-xl bg-slate-900 text-white border border-slate-800">
                    <span className="text-[10px] text-amber-400 uppercase font-bold block mb-0.5">
                      Delivery Instructions:
                    </span>
                    <p className="text-xs font-semibold text-slate-200">
                      “
                      {activeOrder.landmarkDetails?.deliveryInstructions ||
                        activeOrder.landmarkDetails?.writtenDirections ||
                        activeOrder.customer.notes}
                      ”
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">No active delivery assigned at the moment.</p>
        </div>
      )}
    </div>
  );
};
