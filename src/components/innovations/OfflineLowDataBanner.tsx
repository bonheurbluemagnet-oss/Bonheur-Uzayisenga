import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  WifiOff,
  PhoneCall,
  Zap,
  CheckCircle2,
  X,
  MessageSquare
} from 'lucide-react';

export const OfflineLowDataBanner: React.FC = () => {
  const { isLowDataMode, toggleLowDataMode } = useStore();
  const [showUssdGuide, setShowUssdGuide] = useState(false);

  return (
    <>
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium">
            Rwanda Network: {isLowDataMode ? '⚡ Lite Data Mode Active (Saves 70% 3G/4G bundle)' : 'Standard HD Network'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLowDataMode}
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline"
          >
            {isLowDataMode ? 'Switch to HD Mode' : 'Enable Lite Data Mode'}
          </button>

          <span className="text-slate-600">|</span>

          <button
            type="button"
            onClick={() => setShowUssdGuide(true)}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3" />
            SMS & USSD Order Guide
          </button>
        </div>
      </div>

      {showUssdGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Order Offline via SMS / USSD
                </h3>
              </div>
              <button
                onClick={() => setShowUssdGuide(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When without mobile data in Rwanda, you can still dispatch couriers or order grocery staples using our toll-free USSD or SMS gateway:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
                  MTN / Airtel USSD Code:
                </span>
                <span className="text-base font-black font-mono text-slate-900 dark:text-white">
                  *182*8*1#
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Select "Ishema Express" from menu</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                  SMS Order Dispatch:
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  SMS: "ISH KIMIRONKO 10KG POTATOES" to 8080
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Toll-free across all Rwandan networks</p>
              </div>
            </div>

            <button
              onClick={() => setShowUssdGuide(false)}
              className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
