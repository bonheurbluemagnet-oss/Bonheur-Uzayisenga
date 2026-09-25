import { useState, useEffect } from 'react';

interface GoogleMapsConfig {
  apiKey: string;
  isAvailable: boolean;
  isLoading: boolean;
  defaultCenter: { lat: number; lng: number };
  defaultZoom: number;
}

let cachedKey: string | null = null;

export function useGoogleMapsConfig(): GoogleMapsConfig {
  // Check client env var first
  const envKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();

  const [apiKey, setApiKey] = useState<string>(cachedKey || envKey);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedKey && !envKey);

  useEffect(() => {
    if (cachedKey || envKey) {
      setApiKey(cachedKey || envKey);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    fetch('/api/maps/config')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          const key = (data.apiKey || '').trim();
          cachedKey = key;
          setApiKey(key);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.warn('Failed to load Google Maps config from server:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [envKey]);

  return {
    apiKey,
    isAvailable: Boolean(apiKey),
    isLoading,
    defaultCenter: { lat: -1.9536, lng: 30.0931 }, // Kigali Convention Centre
    defaultZoom: 14
  };
}
