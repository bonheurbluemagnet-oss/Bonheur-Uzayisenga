import React, { useState, useEffect, useMemo } from 'react';
import {
  Bike,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Share2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Store,
  Navigation,
  Sparkles,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Order, OrderStatus, Driver } from '../../types';
import { useStore } from '../../context/StoreContext';
import { LeafletMapContainer } from './LeafletMapContainer';
import { GoogleMapCanvas } from './GoogleMapCanvas';
import { useGoogleMapsConfig } from './useGoogleMapsConfig';
import { MapErrorBoundary } from './MapErrorBoundary';
import {
  generateDeliveryRoute,
  getInterpolatedPoint,
  calculateDistanceKm,
  ISHEMA_CENTRAL_HUB,
  getClosestLandmark,
  fetchRouteAndDeliveryFee
} from './mapData';
import { INITIAL_DRIVERS } from '../../data/mockData';

export interface LiveDeliveryTrackingMapProps {
  order: Order;
  onRefresh?: () => void;
  className?: string;
}

// 6-step progress tracker as requested in prompt:
// Order Confirmed → Preparing → Driver Assigned → Picked Up → On the Way → Delivered
const TRACKER_STAGES = [
  { id: 'confirmed', label: 'Order Confirmed', icon: '📝' },
  { id: 'preparing', label: 'Preparing', icon: '🍳' },
  { id: 'driver_assigned', label: 'Driver Assigned', icon: '👤' },
  { id: 'picked_up', label: 'Picked Up', icon: '📦' },
  { id: 'on_the_way', label: 'On the Way', icon: '🚴' },
  { id: 'delivered', label: 'Delivered', icon: '🎉' }
];

export const LiveDeliveryTrackingMap: React.FC<LiveDeliveryTrackingMapProps> = ({
  order,
  onRefresh,
  className = ''
}) => {
  const { trackWhatsAppSupportClick } = useStore();
  const { apiKey, isAvailable: isGoogleMapsAvailable } = useGoogleMapsConfig();

  // Assigned driver (fallback to first mock driver)
  const driver: Driver = useMemo(() => {
    return (
      order.assignedDriver ||
      INITIAL_DRIVERS[0] || {
        id: 'drv-01',
        name: 'Jean-Paul Habimana',
        phone: '+250 788 349 102',
        rating: 4.9,
        totalDeliveries: 1420,
        vehicle: 'TVS Apache 160 (Plate: RAD 742B)',
        photo:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        currentZone: 'Kigali - Gasabo (Kimihurura / Kacyiru)'
      }
    );
  }, [order.assignedDriver]);

  // Customer destination coordinates
  const customerCoords = useMemo(() => {
    if (order.landmarkDetails?.mapCoordinates) {
      return order.landmarkDetails.mapCoordinates;
    }
    if (order.landmarkDetails?.gpsCoordinates) {
      return {
        lat: order.landmarkDetails.gpsCoordinates.lat,
        lng: order.landmarkDetails.gpsCoordinates.lng
      };
    }
    if (order.deliveryCoordinates) {
      return order.deliveryCoordinates;
    }
    // Fallback: estimate from address/landmark or Kigali Convention Centre
    const closest = getClosestLandmark(-1.9536, 30.0931);
    return { lat: closest.lat, lng: closest.lng };
  }, [order.landmarkDetails, order.deliveryCoordinates]);

  // Store/Pickup hub coordinates
  const pickupCoords = useMemo(() => {
    if (order.pickupLocation) {
      return { lat: order.pickupLocation.lat, lng: order.pickupLocation.lng };
    }
    return { lat: ISHEMA_CENTRAL_HUB.lat, lng: ISHEMA_CENTRAL_HUB.lng };
  }, [order.pickupLocation]);

  // Calculate route between pickup and customer
  const deliveryRoute = useMemo(() => {
    return generateDeliveryRoute(
      pickupCoords.lat,
      pickupCoords.lng,
      customerCoords.lat,
      customerCoords.lng
    );
  }, [pickupCoords, customerCoords]);

  // Real-time animated driver progress (0.0 to 1.0)
  const [driverProgress, setDriverProgress] = useState(0.55);

  // Normalize order status to stage index (0 to 5)
  const currentStageIndex = useMemo(() => {
    const s = order.status;
    if (s === 'Delivered') return 5;
    if (s === 'Out for Delivery' || s === 'On the Way') return 4;
    if (s === 'Picked Up') return 3;
    if (s === 'Driver Assigned') return 2;
    if (s === 'Preparing' || s === 'Preparing Order') return 1;
    return 0; // 'Order Placed' or 'Payment Confirmed' or 'Order Confirmed'
  }, [order.status]);

  // Animate driver motorcycle in real-time if order is on the way
  useEffect(() => {
    if (currentStageIndex === 4) {
      // Driver is moving on the way
      const interval = setInterval(() => {
        setDriverProgress(prev => {
          const next = prev + 0.015;
          return next > 0.95 ? 0.4 : next;
        });
      }, 2000);
      return () => clearInterval(interval);
    } else if (currentStageIndex === 5) {
      setDriverProgress(1.0); // At destination
    } else if (currentStageIndex === 3) {
      setDriverProgress(0.15); // Just picked up
    } else {
      setDriverProgress(0.05); // At merchant store
    }
  }, [currentStageIndex]);

  // Current interpolated driver position
  const currentDriverPos = useMemo(() => {
    return getInterpolatedPoint(deliveryRoute, driverProgress);
  }, [deliveryRoute, driverProgress]);

  // Dynamic ETA calculation
  const etaMinutes = useMemo(() => {
    if (currentStageIndex === 5) return 0;
    if (order.estimatedMinutesAway) return order.estimatedMinutesAway;

    // Calculate remaining distance in km
    const remainingKm = calculateDistanceKm(
      currentDriverPos.lat,
      currentDriverPos.lng,
      customerCoords.lat,
      customerCoords.lng
    );

    // Approximate speed in Kigali traffic: 25 km/h -> ~2.4 mins per km + 2 min buffer
    const mins = Math.max(3, Math.round(remainingKm * 2.5 + 2));
    return mins;
  }, [currentStageIndex, order.estimatedMinutesAway, currentDriverPos, customerCoords]);

  // Copy tracking link to clipboard
  const [copiedLink, setCopiedLink] = useState(false);
  const handleShareTracking = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Live Headline (Requirement 3: "Your order is on the way 🚴") */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-5 shadow-lg border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              Live Real-Time GPS Tracking
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white flex items-center gap-2">
            <span>
              {currentStageIndex === 5
                ? 'Your order has been delivered! 🎉'
                : 'Your order is on the way 🚴'}
            </span>
          </h2>

          <p className="text-xs text-slate-300 font-body">
            Tracking #{order.trackingNumber} • {order.items.length} item(s) •{' '}
            {order.landmarkDetails?.nearbyLandmark || order.customer.address}
          </p>
        </div>

        {/* Dynamic ETA Pill Badge */}
        <div className="sm:text-right shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-inner">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="text-left">
              <span className="block text-[10px] text-amber-200 uppercase font-semibold">
                Estimated Arrival
              </span>
              <span className="font-heading font-extrabold text-sm sm:text-base text-white">
                {currentStageIndex === 5 ? 'Completed' : `Driver is ${etaMinutes} minutes away`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Stage Visual Progress Tracker (Requirement 4) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider">
            Delivery Status Progress
          </h4>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {TRACKER_STAGES[currentStageIndex].label}
          </span>
        </div>

        <div className="relative">
          {/* Connecting Progress Bar */}
          <div className="hidden sm:block absolute top-4 left-4 right-4 h-1 bg-slate-200 -z-0">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-700 rounded-full"
              style={{
                width: `${(currentStageIndex / (TRACKER_STAGES.length - 1)) * 100}%`
              }}
            />
          </div>

          {/* 6 Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-1 relative z-10">
            {TRACKER_STAGES.map((stage, idx) => {
              const isCompleted = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isUpcoming = idx > currentStageIndex;

              return (
                <div
                  key={stage.id}
                  className={`flex sm:flex-col items-center gap-2 sm:gap-1.5 p-2 rounded-xl text-left sm:text-center transition-all ${
                    isCurrent
                      ? 'bg-amber-50/80 border border-amber-300 font-bold shadow-xs'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-400 opacity-70'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-transform ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 scale-110'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stage.icon}
                  </div>

                  <span
                    className={`text-[11px] leading-tight ${
                      isCurrent ? 'text-slate-900 font-extrabold' : 'text-slate-600'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Live Map (Leaflet) with Error Boundary */}
      <MapErrorBoundary fallbackMessage="Map unavailable. Please enter your delivery address manually.">
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
            <div className="flex items-center gap-3 font-semibold text-slate-700">
              <span className="flex items-center gap-1 text-emerald-700">
                <Store className="w-3.5 h-3.5" />
                Store Hub
              </span>
              <span className="text-slate-300">→</span>
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Bike className="w-3.5 h-3.5" />
                Driver Live Position
              </span>
              <span className="text-slate-300">→</span>
              <span className="flex items-center gap-1 text-slate-900">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Your Gate
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GPS Updated 2s ago</span>
              {isGoogleMapsAvailable && (
                <span className="ml-1.5 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm">
                  Google Maps
                </span>
              )}
            </div>
          </div>

          <div className="h-[360px] w-full rounded-xl overflow-hidden border border-slate-200 relative">
            {isGoogleMapsAvailable && apiKey ? (
              <GoogleMapCanvas
                apiKey={apiKey}
                center={{ lat: currentDriverPos.lat, lng: currentDriverPos.lng }}
                zoom={14}
                markers={[
                  {
                    id: 'pickup-hub',
                    position: pickupCoords,
                    title: order.pickupLocation?.name || 'Ishema Hub',
                    iconType: 'hub'
                  },
                  {
                    id: 'customer-gate',
                    position: customerCoords,
                    title: order.landmarkDetails?.nearbyLandmark || order.customer.address,
                    iconType: 'customer'
                  },
                  {
                    id: 'driver-moto',
                    position: { lat: currentDriverPos.lat, lng: currentDriverPos.lng },
                    title: `${driver.name} (${driver.vehicle})`,
                    iconType: 'driver'
                  }
                ]}
                routeCoordinates={deliveryRoute}
                fallback={
                  <LeafletMapContainer
                    center={[currentDriverPos.lat, currentDriverPos.lng]}
                    zoom={14}
                    height="360px"
                    pickupMarker={{
                      lat: pickupCoords.lat,
                      lng: pickupCoords.lng,
                      name: order.pickupLocation?.name || 'Ishema Hub',
                      address: order.pickupLocation?.address || 'Kigali CBD'
                    }}
                    customerMarker={{
                      lat: customerCoords.lat,
                      lng: customerCoords.lng,
                      name: order.customer.fullName,
                      address: order.landmarkDetails?.nearbyLandmark || order.customer.address
                    }}
                    driverMarker={{
                      lat: currentDriverPos.lat,
                      lng: currentDriverPos.lng,
                      name: driver.name,
                      vehiclePlate: driver.vehicle,
                      heading: currentDriverPos.heading
                    }}
                    routeCoordinates={deliveryRoute}
                    showLocateButton={false}
                  />
                }
                className="w-full h-full"
              />
            ) : (
              <LeafletMapContainer
                center={[currentDriverPos.lat, currentDriverPos.lng]}
                zoom={14}
                height="360px"
                pickupMarker={{
                  lat: pickupCoords.lat,
                  lng: pickupCoords.lng,
                  name: order.pickupLocation?.name || 'Ishema Hub',
                  address: order.pickupLocation?.address || 'Kigali CBD'
                }}
                customerMarker={{
                  lat: customerCoords.lat,
                  lng: customerCoords.lng,
                  name: order.customer.fullName,
                  address: order.landmarkDetails?.nearbyLandmark || order.customer.address
                }}
                driverMarker={{
                  lat: currentDriverPos.lat,
                  lng: currentDriverPos.lng,
                  name: driver.name,
                  vehiclePlate: driver.vehicle,
                  heading: currentDriverPos.heading
                }}
                routeCoordinates={deliveryRoute}
                showLocateButton={false}
              />
            )}
          </div>
        </div>
      </MapErrorBoundary>

      {/* Driver Profile Card & Delivery Landmark Notes (Requirement 3 & 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Driver Profile Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Ishema Courier</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ★ {driver.rating} ({driver.totalDeliveries}+ trips)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={driver.photo}
                alt={driver.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md shrink-0"
              />
              <div>
                <h4 className="font-heading font-extrabold text-slate-900 text-base">
                  {driver.name}
                </h4>
                <p className="text-xs text-slate-600 font-semibold flex items-center gap-1 mt-0.5">
                  <span>🏍️</span>
                  <span>{driver.vehicle}</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Operating Zone: {driver.currentZone}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Call & WhatsApp */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <a
              href={`tel:${driver.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Courier</span>
            </a>

            <a
              href={`https://wa.me/${driver.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                driver.name
              )},%20I%20am%20tracking%20my%20Ishema%20Express%20order%20${order.trackingNumber}`}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackWhatsAppSupportClick({
                  sourceView: 'delivery-map-driver',
                  notes: `Contacted driver ${driver.name} via WhatsApp for order #${order.trackingNumber || order.id}`
                })
              }
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Courier</span>
            </a>
          </div>
        </div>

        {/* Customer Landmark & Delivery Instructions Card */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Delivery Destination Details
              </span>
              <button
                type="button"
                onClick={handleShareTracking}
                className="text-[11px] text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-slate-200"
              >
                <Share2 className="w-3 h-3" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Live Tracking'}</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 font-medium block">Address / Street</span>
                <span className="font-bold text-slate-900">
                  {order.landmarkDetails?.streetAddress || order.customer.address}
                </span>
              </div>

              {order.landmarkDetails?.nearbyLandmark && (
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">Landmark</span>
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 inline-block mt-0.5">
                    📍 {order.landmarkDetails.nearbyLandmark}
                  </span>
                </div>
              )}

              {(order.landmarkDetails?.buildingName || order.landmarkDetails?.gateDescription) && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {order.landmarkDetails.buildingName && (
                    <div>
                      <span className="text-[10px] text-slate-500 block">Building</span>
                      <span className="font-semibold text-slate-800">
                        {order.landmarkDetails.buildingName}
                      </span>
                    </div>
                  )}
                  {order.landmarkDetails.gateDescription && (
                    <div>
                      <span className="text-[10px] text-slate-500 block">Gate / Entrance</span>
                      <span className="font-semibold text-slate-800">
                        {order.landmarkDetails.gateDescription}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {(order.landmarkDetails?.deliveryInstructions ||
                order.landmarkDetails?.writtenDirections ||
                order.customer.notes) && (
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 mt-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                    Courier Instructions:
                  </span>
                  <p className="text-xs text-slate-800 font-medium italic">
                    “
                    {order.landmarkDetails?.deliveryInstructions ||
                      order.landmarkDetails?.writtenDirections ||
                      order.customer.notes}
                    ”
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>District: {order.customer.district}</span>
            <span>Safety verified by Ishema Express Rwanda</span>
          </div>
        </div>
      </div>

      {/* Central WhatsApp Dispatch Support Banner inside Delivery Map */}
      <div className="p-4 rounded-2xl bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-sm shrink-0">
            <MessageCircle className="w-5 h-5" />
          </span>
          <div>
            <h5 className="font-heading font-bold text-slate-900 text-xs flex items-center gap-2">
              <span>Need Help with this Delivery?</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                24/7 WhatsApp Hotline
              </span>
            </h5>
            <p className="text-[11px] text-slate-500">
              Our central Kigali dispatch team can redirect your courier, adjust gate landmarks, or expedite delivery.
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/250780837936?text=${encodeURIComponent(
            `Hello Ishema Dispatch, I need support with my live delivery order #${order.trackingNumber || order.id}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppSupportClick({
              sourceView: 'delivery-map-dispatch',
              notes: `Clicked Dispatch WhatsApp for delivery order #${order.trackingNumber || order.id}`
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with Dispatch</span>
        </a>
      </div>
    </div>
  );
};
