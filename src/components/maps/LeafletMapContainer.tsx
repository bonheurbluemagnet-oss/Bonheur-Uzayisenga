import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Navigation,
  Plus,
  Minus,
  Maximize2,
  AlertCircle,
  Locate,
  MapPin,
  Bike,
  Store,
  RefreshCw
} from 'lucide-react';
import { Driver, Order } from '../../types';
import { ISHEMA_CENTRAL_HUB, KIGALI_LANDMARKS } from './mapData';

export interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  draggablePin?: boolean;
  selectedPin?: { lat: number; lng: number; title?: string } | null;
  onPinSelect?: (coords: { lat: number; lng: number }) => void;
  driverMarker?: {
    lat: number;
    lng: number;
    name?: string;
    vehiclePlate?: string;
    heading?: number;
  } | null;
  pickupMarker?: {
    lat: number;
    lng: number;
    name?: string;
    address?: string;
  } | null;
  customerMarker?: {
    lat: number;
    lng: number;
    name?: string;
    address?: string;
  } | null;
  routeCoordinates?: [number, number][];
  fleetDrivers?: Driver[];
  fleetOrders?: Order[];
  onDriverClick?: (driver: Driver) => void;
  onOrderClick?: (order: Order) => void;
  onUseCurrentLocation?: () => void;
  isLocating?: boolean;
  showLocateButton?: boolean;
}

export const LeafletMapContainer: React.FC<LeafletMapProps> = ({
  center = [-1.9536, 30.0605],
  zoom = 13,
  height = '340px',
  className = '',
  draggablePin = false,
  selectedPin,
  onPinSelect,
  driverMarker,
  pickupMarker,
  customerMarker,
  routeCoordinates,
  fleetDrivers,
  fleetOrders,
  onDriverClick,
  onOrderClick,
  onUseCurrentLocation,
  isLocating = false,
  showLocateButton = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const [mapFailed, setMapFailed] = useState(false);
  const [isTileLoaded, setIsTileLoaded] = useState(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(containerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
        attributionControl: false
      });

      // CartoDB Voyager tiles (clean, modern, Rwanda road names in English & Kinyarwanda)
      const tileLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          subdomains: 'abcd'
        }
      );

      tileLayer.on('load', () => {
        setIsTileLoaded(true);
      });

      tileLayer.on('tileerror', () => {
        // Soft tile error, fallback can still show vector base
        console.warn('Map tile failed to load, keeping vector overlay active');
      });

      tileLayer.addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Handle map click for draggable pin
      if (draggablePin && onPinSelect) {
        map.on('click', (e: L.LeafletMouseEvent) => {
          onPinSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
        });
      }

      // Resize observer to ensure Leaflet recalculates dimensions when tab/modal opens
      const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
        map.remove();
        mapInstanceRef.current = null;
      };
    } catch (err) {
      console.error('Failed to initialize Leaflet map:', err);
      setMapFailed(true);
    }
  }, []);

  // Update center or zoom when props change
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  }, [center[0], center[1], zoom]);

  // Update Markers and Routes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = markersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // 1. Render Route Polyline if provided
    if (routeCoordinates && routeCoordinates.length > 1) {
      if (routeLayerRef.current) {
        routeLayerRef.current.remove();
      }

      // Outer glow polyline (Ishema Yellow accent)
      const glowLine = L.polyline(routeCoordinates, {
        color: '#f59e0b',
        weight: 6,
        opacity: 0.7,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(group);

      // Inner solid polyline (Ishema Navy)
      const innerLine = L.polyline(routeCoordinates, {
        color: '#0f172a',
        weight: 3,
        opacity: 0.9,
        dashArray: '6, 6'
      }).addTo(group);

      routeLayerRef.current = innerLine;
    }

    // 2. Selected Pin (Interactive Map Pin Drop)
    if (selectedPin) {
      const pinHtml = `
        <div class="relative flex flex-col items-center -translate-x-1/2 -translate-y-full cursor-pointer animate-bounce">
          <div class="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-md text-[10px] shadow-md border border-amber-300 whitespace-nowrap mb-1 flex items-center gap-1">
            <span>📍 ${selectedPin.title || 'Selected Location'}</span>
          </div>
          <div class="relative">
            <div class="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-500 rotate-45"></span>
          </div>
          <div class="w-3 h-1 bg-black/30 rounded-full blur-[1px] mt-1"></div>
        </div>
      `;
      const icon = L.divIcon({
        html: pinHtml,
        className: 'custom-selected-pin',
        iconSize: [32, 48],
        iconAnchor: [16, 48]
      });

      const marker = L.marker([selectedPin.lat, selectedPin.lng], {
        icon,
        draggable: draggablePin
      }).addTo(group);

      if (draggablePin && onPinSelect) {
        marker.on('dragend', (e: any) => {
          const latlng = e.target.getLatLng();
          onPinSelect({ lat: latlng.lat, lng: latlng.lng });
        });
      }
    }

    // 3. Customer Destination Marker
    if (customerMarker) {
      const custHtml = `
        <div class="relative flex flex-col items-center -translate-x-1/2 -translate-y-full">
          <div class="bg-slate-900 text-amber-400 font-bold px-2 py-0.5 rounded-md text-[10px] shadow-lg border border-amber-400/40 whitespace-nowrap mb-1">
            Customer: ${customerMarker.name || 'Dropoff'}
          </div>
          <div class="relative">
            <div class="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-xl border-2 border-amber-400 ring-2 ring-amber-400/20">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-amber-400"></span>
          </div>
        </div>
      `;
      const custIcon = L.divIcon({
        html: custHtml,
        className: 'custom-customer-marker',
        iconSize: [32, 48],
        iconAnchor: [16, 48]
      });
      L.marker([customerMarker.lat, customerMarker.lng], { icon: custIcon }).addTo(group);
    }

    // 4. Pickup Merchant / Hub Marker
    if (pickupMarker) {
      const pickupHtml = `
        <div class="relative flex flex-col items-center -translate-x-1/2 -translate-y-full">
          <div class="bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-md text-[10px] shadow-md whitespace-nowrap mb-1">
            Store: ${pickupMarker.name || 'Pickup Hub'}
          </div>
          <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>
          </div>
        </div>
      `;
      const pickupIcon = L.divIcon({
        html: pickupHtml,
        className: 'custom-pickup-marker',
        iconSize: [28, 42],
        iconAnchor: [14, 42]
      });
      L.marker([pickupMarker.lat, pickupMarker.lng], { icon: pickupIcon }).addTo(group);
    }

    // 5. Driver Motorcycle Marker (Animated Pulse + Heading)
    if (driverMarker) {
      const driverHtml = `
        <div class="relative flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer">
          <div class="bg-amber-500 text-slate-950 font-extrabold px-2 py-0.5 rounded-full text-[10px] shadow-lg border border-amber-300 whitespace-nowrap mb-1 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
            <span>${driverMarker.name || 'Ishema Courier'} (${driverMarker.vehiclePlate || 'GPS'})</span>
          </div>
          <div class="relative flex items-center justify-center">
            <div class="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 border-2 border-amber-400 flex items-center justify-center shadow-2xl ring-4 ring-amber-500/30" style="transform: rotate(${driverMarker.heading || 0}deg);">
              <span class="text-base select-none">🏍️</span>
            </div>
            <div class="absolute inset-0 rounded-2xl border-2 border-amber-400 animate-ping opacity-30 pointer-events-none"></div>
          </div>
        </div>
      `;
      const driverIcon = L.divIcon({
        html: driverHtml,
        className: 'custom-driver-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
      L.marker([driverMarker.lat, driverMarker.lng], { icon: driverIcon }).addTo(group);
    }

    // 6. Fleet Drivers (for Admin Live Fleet View)
    if (fleetDrivers && fleetDrivers.length > 0) {
      fleetDrivers.forEach(d => {
        const coords = d.currentLocation || {
          lat: -1.9536 + ((d.id.charCodeAt(d.id.length - 1) % 5) - 2) * 0.015,
          lng: 30.0605 + ((d.id.charCodeAt(d.id.length - 2) % 5) - 2) * 0.018
        };
        const isDelivering = d.status === 'On Delivery' || d.totalDeliveries > 1000;
        const colorClass = isDelivering ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white';

        const fleetHtml = `
          <div class="relative flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform">
            <div class="${colorClass} font-bold px-1.5 py-0.5 rounded-md text-[9px] shadow-sm whitespace-nowrap mb-0.5">
              ${d.name.split(' ')[0]} • ${isDelivering ? 'Delivering' : 'Ready'}
            </div>
            <div class="w-7 h-7 rounded-xl bg-slate-900 text-amber-400 border-2 border-amber-400 flex items-center justify-center shadow-md">
              <span class="text-xs">🏍️</span>
            </div>
          </div>
        `;

        const fleetIcon = L.divIcon({
          html: fleetHtml,
          className: 'custom-fleet-driver',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([coords.lat, coords.lng], { icon: fleetIcon }).addTo(group);
        if (onDriverClick) {
          marker.on('click', () => onDriverClick(d));
        }
      });
    }

    // 7. Fleet Orders (for Admin Live Fleet View)
    if (fleetOrders && fleetOrders.length > 0) {
      fleetOrders.forEach(o => {
        const coords = o.deliveryCoordinates || o.landmarkDetails?.mapCoordinates || {
          lat: -1.95 + ((o.id.charCodeAt(o.id.length - 1) % 5) - 2) * 0.012,
          lng: 30.07 + ((o.id.charCodeAt(o.id.length - 2) % 5) - 2) * 0.014
        };

        const statusColor =
          o.status === 'Out for Delivery' || o.status === 'On the Way'
            ? 'bg-blue-600'
            : o.status === 'Preparing Order' || o.status === 'Preparing'
            ? 'bg-amber-500'
            : 'bg-emerald-600';

        const orderHtml = `
          <div class="relative flex flex-col items-center -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-110 transition-transform">
            <div class="${statusColor} text-white font-mono font-bold px-1.5 py-0.5 rounded-md text-[9px] shadow-sm whitespace-nowrap mb-0.5">
              ${o.trackingNumber}
            </div>
            <div class="w-6 h-6 rounded-full ${statusColor} text-white flex items-center justify-center shadow-md border border-white">
              <span class="text-[10px]">📦</span>
            </div>
          </div>
        `;

        const orderIcon = L.divIcon({
          html: orderHtml,
          className: 'custom-fleet-order',
          iconSize: [24, 36],
          iconAnchor: [12, 36]
        });

        const marker = L.marker([coords.lat, coords.lng], { icon: orderIcon }).addTo(group);
        if (onOrderClick) {
          marker.on('click', () => onOrderClick(o));
        }
      });
    }
  }, [
    selectedPin,
    driverMarker,
    pickupMarker,
    customerMarker,
    routeCoordinates,
    fleetDrivers,
    fleetOrders
  ]);

  // Zoom controls
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    if (selectedPin) {
      mapInstanceRef.current?.setView([selectedPin.lat, selectedPin.lng], 14, { animate: true });
    } else if (driverMarker) {
      mapInstanceRef.current?.setView([driverMarker.lat, driverMarker.lng], 14, { animate: true });
    } else {
      mapInstanceRef.current?.setView(center, zoom, { animate: true });
    }
  };

  // Graceful Fallback if Leaflet fails
  if (mapFailed) {
    return (
      <div
        className={`w-full rounded-2xl border border-amber-300 bg-amber-50/80 p-6 text-center flex flex-col items-center justify-center ${className}`}
        style={{ height }}
      >
        <MapPin className="w-8 h-8 text-amber-600 mb-2" />
        <h4 className="font-heading font-bold text-slate-900 text-sm mb-1">
          Map unavailable. Please enter your delivery address manually.
        </h4>
        <p className="text-xs text-slate-600 max-w-sm mb-3">
          Our Kigali vector map is temporarily offline. Please provide your Kigali street address and nearest landmark.
        </p>
        <button
          type="button"
          onClick={() => setMapFailed(false)}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-600 flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Map
        </button>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm ${className}`}>
      {/* Real Leaflet Map Container */}
      <div
        ref={containerRef}
        id="ishema-leaflet-map"
        style={{ height, width: '100%' }}
        className="z-0 bg-slate-100"
      />

      {/* Floating Modern Brand Controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-amber-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-amber-50 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleRecenter}
          title="Recenter"
          className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-amber-50 transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Locate Button */}
      {showLocateButton && onUseCurrentLocation && (
        <button
          type="button"
          onClick={onUseCurrentLocation}
          disabled={isLocating}
          className="absolute bottom-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 text-xs font-semibold shadow-lg border border-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <Locate className={`w-3.5 h-3.5 text-amber-400 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'Locating...' : 'Use My Current Location'}</span>
        </button>
      )}

      {/* Bottom info pill */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none hidden sm:flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg border border-slate-200/80 text-[10px] text-slate-600 font-medium shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span>Ishema Kigali GIS System</span>
      </div>
    </div>
  );
};
