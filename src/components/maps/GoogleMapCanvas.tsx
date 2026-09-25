import React, { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap
} from '@vis.gl/react-google-maps';

export interface GoogleMapCanvasMarker {
  id: string;
  position: { lat: number; lng: number };
  title?: string;
  iconType?: 'hub' | 'customer' | 'driver' | 'pin';
  label?: string;
  draggable?: boolean;
  onDragEnd?: (coords: { lat: number; lng: number }) => void;
}

interface GoogleMapCanvasProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: GoogleMapCanvasMarker[];
  routeCoordinates?: [number, number][];
  onClick?: (coords: { lat: number; lng: number }) => void;
  className?: string;
  fallback?: React.ReactNode;
}

// Inner component to render route polyline using google.maps.Polyline
const DirectionsPolyline: React.FC<{ coordinates: [number, number][] }> = ({ coordinates }) => {
  const map = useMap();
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !coordinates || coordinates.length < 2) return;

    const path = coordinates.map(([lat, lng]) => ({ lat, lng }));

    if (!polylineRef.current) {
      polylineRef.current = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#f59e0b', // Amber-500 Ishema brand color
        strokeOpacity: 0.9,
        strokeWeight: 5,
        map
      });
    } else {
      polylineRef.current.setPath(path);
      polylineRef.current.setMap(map);
    }

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
    };
  }, [map, coordinates]);

  return null;
};

// Map click listener component
const MapClickHandler: React.FC<{ onClick?: (coords: { lat: number; lng: number }) => void }> = ({ onClick }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !onClick) return;

    const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, onClick]);

  return null;
};

export const GoogleMapCanvas: React.FC<GoogleMapCanvasProps> = ({
  apiKey,
  center,
  zoom = 13,
  markers = [],
  routeCoordinates,
  onClick,
  className = 'w-full h-full min-h-[300px]',
  fallback
}) => {
  const [hasError, setHasError] = useState(false);

  // If no API key or error occurred, render fallback
  if (!apiKey || hasError) {
    return <>{fallback || null}</>;
  }

  return (
    <div className={`relative ${className} overflow-hidden rounded-xl`}>
      <APIProvider
        apiKey={apiKey}
        libraries={['places', 'routes', 'geometry', 'marker']}
        onLoad={() => setHasError(false)}
        onError={(err) => {
          console.warn('Google Maps APIProvider failed, activating fallback:', err);
          setHasError(true);
        }}
      >
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          center={center}
          zoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="w-full h-full"
          internalUsageAttributionIds={['gmp_git_agentskills_v1']}
        >
          <MapClickHandler onClick={onClick} />
          {routeCoordinates && routeCoordinates.length > 1 && (
            <DirectionsPolyline coordinates={routeCoordinates} />
          )}

          {markers.map((m) => {
            const isDriver = m.iconType === 'driver';
            const isHub = m.iconType === 'hub';
            const isCustomer = m.iconType === 'customer' || m.iconType === 'pin';

            let background = '#f59e0b';
            let glyphColor = '#0f172a';
            let borderColor = '#b45309';

            if (isDriver) {
              background = '#0284c7';
              glyphColor = '#ffffff';
              borderColor = '#0369a1';
            } else if (isHub) {
              background = '#10b981';
              glyphColor = '#ffffff';
              borderColor = '#047857';
            } else if (isCustomer) {
              background = '#ef4444';
              glyphColor = '#ffffff';
              borderColor = '#b91c1c';
            }

            return (
              <AdvancedMarker
                key={m.id}
                position={m.position}
                title={m.title}
                draggable={Boolean(m.draggable)}
                onDragEnd={(e) => {
                  if (e.latLng && m.onDragEnd) {
                    m.onDragEnd({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                  }
                }}
              >
                <Pin
                  background={background}
                  glyphColor={glyphColor}
                  borderColor={borderColor}
                  scale={1.1}
                />
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  );
};
