import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Users,
  MapPin,
  Building,
  CheckCircle2,
  Package,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CommunityHub } from '../../types';

export const CommunityMarketplaceView: React.FC = () => {
  const { communityHubs, selectedHub, setSelectedHub, setIsNeighborhoodPooling } = useStore();
  const [activeHubId, setActiveHubId] = useState<string>(communityHubs[0]?.id || '');
  const [poolingJoined, setPoolingJoined] = useState(false);

  const currentHub = communityHubs.find(h => h.id === activeHubId) || communityHubs[0];

  const handleJoinHubPool = () => {
    setIsNeighborhoodPooling(true);
    setPoolingJoined(true);
    setTimeout(() => {
      alert(`Joined ${currentHub.name} order pool! Next consolidated courier batch departs at ${currentHub.nextBatchDelivery}. You saved 500 RWF on delivery!`);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-blue-500/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 rounded-full px-4 py-1 mb-3 text-xs font-semibold text-blue-300">
            <Building className="w-3.5 h-3.5 text-blue-400" />
            <span>Feature 20 • Community Hubs & Pooled Delivery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Order with neighbors in Vision City, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-200">
              Universities, & Corporate Hubs.
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            Pool orders with your estate or office tower to cut delivery fees, reduce traffic in Kigali, and pick up safely from trusted concierge desks.
          </p>
        </div>
      </div>

      {/* Hub Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {communityHubs.map(hub => {
          const isSelected = hub.id === currentHub?.id;
          return (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveHubId(hub.id)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-md ring-2 ring-blue-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {hub.location}
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {hub.activeMembers} Members
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {hub.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  Pickup: {hub.conciergeDesk}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Batch: {hub.nextBatchDelivery}</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">Select</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Hub Deep-Dive */}
      {currentHub && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Official Community Hub
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {currentHub.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Concierge Pickup: <strong>{currentHub.conciergeDesk}</strong> ({currentHub.location})
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleJoinHubPool}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition-all active:scale-95 flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                {poolingJoined ? 'Pool Joined (500 RWF Saved) ✓' : 'Join Today\'s Community Pool'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Next Courier Departure:</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                {currentHub.nextBatchDelivery}
              </span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Hub Fee vs Direct:</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                1,000 RWF Flat (Save 500-1,000 RWF)
              </span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Estate Verification:</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Verified Concierge Gate
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
