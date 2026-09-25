import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  MapPin,
  Compass,
  Navigation,
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Eye
} from 'lucide-react';
import { LandmarkDeliveryDetails } from '../../types';

interface SmartLandmarkFieldProps {
  details: LandmarkDeliveryDetails;
  onChange: (updated: Partial<LandmarkDeliveryDetails>) => void;
  isCompact?: boolean;
}

const COMMON_KIGALI_LANDMARKS = [
  'Simba Supermarket Kimironko',
  'BK Arena Gate 3',
  'Chez Lando Roundabout',
  'Kigali Heights / Convention Centre',
  'Sonatubes Roundabout (Kicukiro)',
  'UTC Kigali City Center',
  'Green Hills Academy Gate',
  'Gisementi Commercial Strip',
  'Nyamirambo Stadium / Green Mosque',
  'KBC Commercial Complex'
];

const SAMPLE_ENTRANCE_PHOTOS = [
  {
    name: 'Black Iron Sliding Gate',
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Yellow MTN Paint Compound Wall',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Commercial Glass Entrance & Pavers',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
  }
];

export const SmartLandmarkField: React.FC<SmartLandmarkFieldProps> = ({
  details,
  onChange,
  isCompact = false
}) => {
  const [isLocatingGPS, setIsLocatingGPS] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(Boolean(details.gpsCoordinates));
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);

  const handleSimulateGPS = () => {
    setIsLocatingGPS(true);
    setTimeout(() => {
      onChange({
        gpsCoordinates: {
          lat: -1.9536 + (Math.random() - 0.5) * 0.01,
          lng: 30.0605 + (Math.random() - 0.5) * 0.01,
          accuracyMeters: 4.2
        }
      });
      setIsLocatingGPS(false);
      setGpsSuccess(true);
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      onChange({ entrancePhotoUrl: fakeUrl });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 space-y-4">
      {/* Title & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Smart Landmark Delivery</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Helps Kigali drivers find exact gate without calling 5 times</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-300/40 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Driver GPS Navigation Ready
        </span>
      </div>

      {/* Row 1: GPS Pin & District / Sector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            GPS Live Pin (Rwanda Coordinate)
          </label>
          <button
            type="button"
            onClick={handleSimulateGPS}
            disabled={isLocatingGPS}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
              gpsSuccess
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-800 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-400'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Navigation className={`w-3.5 h-3.5 ${isLocatingGPS ? 'animate-spin text-amber-500' : 'text-emerald-500'}`} />
              {details.gpsCoordinates
                ? `GPS: ${details.gpsCoordinates.lat.toFixed(4)}, ${details.gpsCoordinates.lng.toFixed(4)} (±4m)`
                : 'Capture My Current GPS Pin'}
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 shrink-0 ml-1">
              {isLocatingGPS ? 'Locating...' : gpsSuccess ? 'Updated' : 'Detect'}
            </span>
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Nearby Landmark
          </label>
          <div className="relative">
            <input
              type="text"
              list="kigali-landmarks"
              value={details.nearbyLandmark || ''}
              onChange={e => onChange({ nearbyLandmark: e.target.value })}
              placeholder="e.g. 50m past Simba Supermarket Kimironko"
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <datalist id="kigali-landmarks">
              {COMMON_KIGALI_LANDMARKS.map((lm, i) => (
                <option key={i} value={lm} />
              ))}
            </datalist>
          </div>
        </div>
      </div>

      {/* Row 2: Written Directions */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Written Directions for Driver (Kinyarwanda or English)
        </label>
        <textarea
          rows={2}
          value={details.writtenDirections || ''}
          onChange={e => onChange({ writtenDirections: e.target.value })}
          placeholder="e.g., Take tarmac road from Chez Lando, branch at yellow MTN umbrella, 2nd black gate with small white stone outside."
          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
        />
      </div>

      {/* Row 3: Photo of Entrance */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            Photo of the Entrance / Gate (Optional but Recommended)
          </label>
          <button
            type="button"
            onClick={() => setShowPhotoGallery(!showPhotoGallery)}
            className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-medium"
          >
            {showPhotoGallery ? 'Hide Presets' : 'Choose Sample Gate Photo'}
          </button>
        </div>

        {/* Selected Photo Preview */}
        {details.entrancePhotoUrl ? (
          <div className="relative inline-block rounded-xl overflow-hidden border border-emerald-500/50 shadow-sm group">
            <img
              src={details.entrancePhotoUrl}
              alt="Entrance gate preview"
              referrerPolicy="no-referrer"
              className="w-32 h-20 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => onChange({ entrancePhotoUrl: '' })}
                className="bg-red-600 text-white text-[10px] px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
            <div className="absolute bottom-1 left-1 bg-emerald-600/90 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-2.5 h-2.5" /> Attached
            </div>
          </div>
        ) : (
          <label className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-amber-500 transition-colors">
            <Upload className="w-4 h-4 text-slate-400" />
            <div className="text-xs">
              <span className="font-semibold text-amber-600 dark:text-amber-400">Click to upload photo</span>
              <span className="text-slate-500 dark:text-slate-400"> of gate, compound, or house sign</span>
            </div>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        )}

        {/* Sample Gallery Drawer */}
        {showPhotoGallery && (
          <div className="mt-3 p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-3 gap-2">
            {SAMPLE_ENTRANCE_PHOTOS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange({ entrancePhotoUrl: sample.url });
                  setShowPhotoGallery(false);
                }}
                className="text-left group"
              >
                <img
                  src={sample.url}
                  alt={sample.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-14 object-cover rounded-lg border border-slate-300 dark:border-slate-700 group-hover:border-amber-500 transition-all"
                />
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 truncate group-hover:text-amber-500">
                  {sample.name}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
