import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Search,
  Camera,
  Upload,
  Clock,
  Wallet,
  CheckCircle2,
  X,
  Phone,
  Store,
  Sparkles,
  Send
} from 'lucide-react';

export const RequestAnythingModal: React.FC = () => {
  const {
    isRequestProductOpen,
    setIsRequestProductOpen,
    productRequests,
    submitProductRequest,
    selectedLocation
  } = useStore();

  const [activeTab, setActiveTab] = useState<'request' | 'my-requests'>('request');
  const [productDescription, setProductDescription] = useState('');
  const [targetBudget, setTargetBudget] = useState('');
  const [urgency, setUrgency] = useState<'asap' | 'today' | 'scheduled'>('today');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isRequestProductOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productDescription.trim()) return;

    submitProductRequest({
      description: productDescription,
      productDescription,
      category: 'General Request',
      customerName: 'Customer',
      targetBudget: targetBudget ? parseInt(targetBudget, 10) : 20000,
      urgency,
      customerPhone: '+250 788 123 456',
      location: `${selectedLocation}, Kigali`
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setActiveTab('my-requests');
      setProductDescription('');
      setTargetBudget('');
      setNotes('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Request Anything in Kigali</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Can't find it in the catalog? Our couriers will hunt for it across Kigali stores
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsRequestProductOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-100/50 dark:bg-slate-950/30">
          <button
            onClick={() => setActiveTab('request')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'request'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            New Custom Request
          </button>
          <button
            onClick={() => setActiveTab('my-requests')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'my-requests'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            My Active Requests ({productRequests.length})
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'request' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-800/40 text-xs text-teal-900 dark:text-teal-200">
                <span className="font-bold block mb-0.5">How it works:</span>
                Submit what you need (specific hardware screw, brand of medicine, rare spice, or specific textbook). Our fleet searches Nyabugogo, Quartier Commercial, and neighborhood shops and transmits offers with prices directly to you.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  What item do you need? (Describe brand, size, color, or model)
                </label>
                <textarea
                  required
                  rows={3}
                  value={productDescription}
                  onChange={e => setProductDescription(e.target.value)}
                  placeholder="e.g. 65W USB-C fast laptop charger (Original Dell/Lenovo compatible) or 5kg authentic Nyagatare raw honey."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Target Budget (RWF)
                  </label>
                  <input
                    type="number"
                    value={targetBudget}
                    onChange={e => setTargetBudget(e.target.value)}
                    placeholder="e.g. 25000"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    How urgently do you need it?
                  </label>
                  <select
                    value={urgency}
                    onChange={e => setUrgency(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="asap">Emergency ASAP (Within 1-2 hours)</option>
                    <option value="today">Today by evening</option>
                    <option value="scheduled">Within next 24-48 hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Delivery Destination & Landmark
                </label>
                <input
                  type="text"
                  defaultValue={`${selectedLocation}, Kigali (Near Simba Supermarket Kimironko)`}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {submittedSuccess ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium border border-emerald-400/40 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Request broadcast to partner stores in Kigali! Redirecting to status...
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Broadcast Request to Kigali Stores
                </button>
              )}
            </form>
          ) : (
            <div className="space-y-4">
              {productRequests.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">No requests submitted yet.</p>
              ) : (
                productRequests.map(req => (
                  <div
                    key={req.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {req.productDescription || req.description}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Target Budget: {req.targetBudget ? formatRWF(req.targetBudget) : 'Flexible'} • {req.createdAt}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                        {(req.status as string) === 'searching' || req.status === 'Searching Partner Stores' ? 'Searching Stores...' : req.status}
                      </span>
                    </div>

                    {/* Offers received */}
                    {req.offersReceived && req.offersReceived.length > 0 && (
                      <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-teal-500/30">
                        <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 block mb-1">
                          Merchant Offer Found:
                        </span>
                        {req.offersReceived.map((offer, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div>
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {offer.storeName}
                              </span>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                ETA: {(offer as any).deliveryTime || `${offer.etaMinutes || 35} mins`}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                                {formatRWF(offer.price)}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  alert(`Booking courier pickup from ${offer.storeName} to your address!`);
                                }}
                                className="block mt-1 text-[10px] font-bold text-teal-600 dark:text-teal-400 hover:underline"
                              >
                                Accept & Dispatch Rider
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
