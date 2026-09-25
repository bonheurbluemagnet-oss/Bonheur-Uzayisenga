export interface KigaliLocation {
  id: string;
  name: string;
  district: string;
  sector: string;
  lat: number;
  lng: number;
  popularLandmarks: string[];
  type: 'hub' | 'landmark' | 'commercial' | 'transit' | 'residential';
}

export const ISHEMA_CENTRAL_HUB: KigaliLocation = {
  id: 'hub-kigali-cbd',
  name: 'Ishema Express Central Fulfilment Hub',
  district: 'Nyarugenge',
  sector: 'Kiyovu',
  lat: -1.9441,
  lng: 30.0619,
  popularLandmarks: ['UTC Building', 'Kigali City Tower', 'Centenary House'],
  type: 'hub'
};

export const KIGALI_LANDMARKS: KigaliLocation[] = [
  {
    id: 'loc-kcc',
    name: 'Kigali Convention Centre & Kigali Heights',
    district: 'Gasabo',
    sector: 'Kimihurura',
    lat: -1.9536,
    lng: 30.0931,
    popularLandmarks: ['Radisson Blu Hotel', 'KBC Commercial Complex', 'Roundabout Fountain'],
    type: 'landmark'
  },
  {
    id: 'loc-bk-arena',
    name: 'BK Arena & Amahoro National Stadium',
    district: 'Gasabo',
    sector: 'Remera',
    lat: -1.9530,
    lng: 30.1130,
    popularLandmarks: ['BK Arena Gate 3', 'Amahoro Main Entrance', 'Remera Giporoso'],
    type: 'landmark'
  },
  {
    id: 'loc-simba-kimironko',
    name: 'Simba Supermarket & Kimironko Market',
    district: 'Gasabo',
    sector: 'Kimironko',
    lat: -1.9500,
    lng: 30.1265,
    popularLandmarks: ['Kimironko Market Bus Park', 'Simba Supermarket Entrance', 'KIE University'],
    type: 'commercial'
  },
  {
    id: 'loc-sonatubes',
    name: 'Sonatubes Roundabout',
    district: 'Kicukiro',
    sector: 'Kicukiro',
    lat: -1.9665,
    lng: 30.0910,
    popularLandmarks: ['Sonatubes Overpass', 'Rwanda Revenue Authority Depot', 'Gikondo T-Junction'],
    type: 'transit'
  },
  {
    id: 'loc-nyabugogo',
    name: 'Nyabugogo Bus Terminal & Market',
    district: 'Nyarugenge',
    sector: 'Gatsata',
    lat: -1.9372,
    lng: 30.0442,
    popularLandmarks: ['Nyabugogo Taxi Park', 'Modern Market', 'River Bridge'],
    type: 'transit'
  },
  {
    id: 'loc-kacyiru',
    name: 'Kacyiru Government & Embassy Quarter',
    district: 'Gasabo',
    sector: 'Kacyiru',
    lat: -1.9350,
    lng: 30.0820,
    popularLandmarks: ['Prime Minister Office', 'US Embassy', 'Kigali Public Library'],
    type: 'commercial'
  },
  {
    id: 'loc-chuk',
    name: 'CHUK Hospital & Kiyovu Quarter',
    district: 'Nyarugenge',
    sector: 'Kiyovu',
    lat: -1.9505,
    lng: 30.0590,
    popularLandmarks: ['CHUK Main Gate', 'Hotel des Mille Collines', 'Banque Nationale du Rwanda'],
    type: 'landmark'
  },
  {
    id: 'loc-gisementi',
    name: 'Gisementi Commercial Strip',
    district: 'Gasabo',
    sector: 'Remera',
    lat: -1.9550,
    lng: 30.1080,
    popularLandmarks: ['Chez Lando Roundabout', 'Gisementi Cafes', 'Airport Road Corner'],
    type: 'commercial'
  },
  {
    id: 'loc-nyarutarama',
    name: 'Green Hills Academy & Nyarutarama Lake',
    district: 'Gasabo',
    sector: 'Nyarutarama',
    lat: -1.9370,
    lng: 30.0990,
    popularLandmarks: ['Green Hills Gate', 'Kigali Golf Club', 'Nyarutarama MTN Center'],
    type: 'residential'
  },
  {
    id: 'loc-kanombe',
    name: 'Kigali International Airport & Kanombe',
    district: 'Kicukiro',
    sector: 'Kanombe',
    lat: -1.9686,
    lng: 30.1395,
    popularLandmarks: ['Airport Arrivals Hall', 'Military Hospital Gate', 'Kanombe Terminal'],
    type: 'transit'
  },
  {
    id: 'loc-nyamirambo',
    name: 'Nyamirambo Regional Stadium & Green Mosque',
    district: 'Nyarugenge',
    sector: 'Nyamirambo',
    lat: -1.9820,
    lng: 30.0480,
    popularLandmarks: ['Nyamirambo Stadium Main Gate', 'Green Mosque (Madina)', 'Biryogo Car-Free Zone'],
    type: 'landmark'
  },
  {
    id: 'loc-gisozi',
    name: 'Gisozi Memorial & Wood Market',
    district: 'Gasabo',
    sector: 'Gisozi',
    lat: -1.9215,
    lng: 30.0600,
    popularLandmarks: ['Kigali Genocide Memorial', 'ULK University Gate', 'Gisozi Timber Yard'],
    type: 'landmark'
  },
  {
    id: 'loc-rebero',
    name: 'Rebero Cultural Village & Panoramic Viewpoint',
    district: 'Kicukiro',
    sector: 'Gahanga',
    lat: -1.9880,
    lng: 30.0850,
    popularLandmarks: ['Canal Olympia Rebero', 'Rebero Viewpoint', 'Cultural Village Gate'],
    type: 'residential'
  }
];

// Distance between two GPS coordinates using Haversine formula (km)
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Find closest Kigali landmark to given coordinates
export function getClosestLandmark(lat: number, lng: number): KigaliLocation {
  let closest = KIGALI_LANDMARKS[0];
  let minDistance = calculateDistanceKm(lat, lng, closest.lat, closest.lng);

  for (const loc of KIGALI_LANDMARKS) {
    const dist = calculateDistanceKm(lat, lng, loc.lat, loc.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = loc;
    }
  }
  return closest;
}

// Generate realistic road route points between two coordinates in Kigali
export function generateDeliveryRoute(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): [number, number][] {
  const points: [number, number][] = [[startLat, startLng]];

  // If start and end are close, direct curve
  const steps = 6;
  const midLat = (startLat + endLat) / 2;
  const midLng = (startLng + endLng) / 2;

  // Add realistic Kigali road curvature based on hills/valleys
  const curveFactor = ((startLat * 1000) % 3 === 0 ? 0.003 : -0.003);

  for (let i = 1; i < steps; i++) {
    const ratio = i / steps;
    const lat = startLat + (endLat - startLat) * ratio + Math.sin(ratio * Math.PI) * curveFactor;
    const lng = startLng + (endLng - startLng) * ratio + Math.cos(ratio * Math.PI) * (curveFactor * 0.8);
    points.push([lat, lng]);
  }

  points.push([endLat, endLng]);
  return points;
}

// Calculate interpolated motorcycle position along route for progress (0.0 to 1.0)
export function getInterpolatedPoint(
  route: [number, number][],
  progress: number
): { lat: number; lng: number; heading: number } {
  if (!route || route.length === 0) {
    return { lat: ISHEMA_CENTRAL_HUB.lat, lng: ISHEMA_CENTRAL_HUB.lng, heading: 0 };
  }
  if (route.length === 1 || progress <= 0) {
    return { lat: route[0][0], lng: route[0][1], heading: 0 };
  }
  if (progress >= 1) {
    const last = route[route.length - 1];
    const prev = route[route.length - 2];
    const dLat = last[0] - prev[0];
    const dLng = last[1] - prev[1];
    const heading = (Math.atan2(dLng, dLat) * 180) / Math.PI;
    return { lat: last[0], lng: last[1], heading };
  }

  const totalSegments = route.length - 1;
  const segmentIndex = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
  const segmentProgress = progress * totalSegments - segmentIndex;

  const p1 = route[segmentIndex];
  const p2 = route[segmentIndex + 1];

  const lat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
  const lng = p1[1] + (p2[1] - p1[1]) * segmentProgress;

  const dLat = p2[0] - p1[0];
  const dLng = p2[1] - p1[1];
  const heading = (Math.atan2(dLng, dLat) * 180) / Math.PI;

  return { lat, lng, heading };
}

// Calculate delivery fee according to Ishema Express Rwandan pricing rules
export function calculateDeliveryFee(
  distanceKm: number,
  options?: { isEmergency?: boolean; isNeighborhoodPooling?: boolean }
): number {
  const baseDistance = 3.0; // Base included distance in km
  const basePrice = 1000; // Base fee in RWF for up to 3 km
  const perKmPrice = 350; // Price per additional km

  let total = basePrice;
  if (distanceKm > baseDistance) {
    const extraKm = distanceKm - baseDistance;
    total += Math.round(extraKm * perKmPrice);
  }

  // Round to nearest 50 RWF for practical cash / mobile money
  total = Math.ceil(total / 50) * 50;

  if (options?.isEmergency) {
    total += 1500; // Priority courier rush fee
  }

  if (options?.isNeighborhoodPooling) {
    total = Math.max(800, total - 500); // 500 RWF pooling discount
  }

  return Math.max(1000, total);
}

// Polyline decoder for Google Routes API encoded polyline
export function decodePolyline(encoded: string): [number, number][] {
  if (!encoded) return [];
  const points: [number, number][] = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

// Fetch Google Routes API route & delivery fee calculation
export async function fetchRouteAndDeliveryFee(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  options?: { isEmergency?: boolean; isNeighborhoodPooling?: boolean }
): Promise<{
  distanceKm: number;
  durationMinutes: number;
  deliveryFeeRWF: number;
  routeCoordinates: [number, number][];
  isGoogleRoutes: boolean;
}> {
  try {
    const res = await fetch('/api/maps/calculate-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin,
        destination,
        isEmergency: options?.isEmergency,
        isNeighborhoodPooling: options?.isNeighborhoodPooling
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          distanceKm: data.distanceKm,
          durationMinutes: data.durationMinutes,
          deliveryFeeRWF: data.deliveryFeeRWF,
          routeCoordinates: data.routeCoordinates?.length > 0 ? data.routeCoordinates : generateDeliveryRoute(origin.lat, origin.lng, destination.lat, destination.lng),
          isGoogleRoutes: Boolean(data.isGoogleRoutes)
        };
      }
    }
  } catch (err) {
    console.warn('Google Routes proxy failed, calculating locally:', err);
  }

  // Graceful fallback
  const distanceKm = calculateDistanceKm(origin.lat, origin.lng, destination.lat, destination.lng);
  const durationMinutes = Math.max(12, Math.round(distanceKm * 4.2 + 8));
  const deliveryFeeRWF = calculateDeliveryFee(distanceKm, options);
  const routeCoordinates = generateDeliveryRoute(origin.lat, origin.lng, destination.lat, destination.lng);

  return {
    distanceKm,
    durationMinutes,
    deliveryFeeRWF,
    routeCoordinates,
    isGoogleRoutes: false
  };
}

