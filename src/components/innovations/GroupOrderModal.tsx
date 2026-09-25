import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Users,
  Share2,
  Copy,
  Check,
  Plus,
  Trash2,
  CreditCard,
  Phone,
  Clock,
  MapPin,
  X,
  Sparkles,
  DollarSign
} from 'lucide-react';

export const GroupOrderModal: React.FC = () => {
  const {
    isGroupOrderModalOpen,
    setIsGroupOrderModalOpen,
    groupOrders,
    activeGroupOrder,
    setActiveGroupOrder,
    createGroupOrder,
    joinGroupOrder,
    selectedLocation
  } = useStore();

  const [activeTab, setActiveTab] = useState<'current' | 'create' | 'join'>('current');
  const [copied, setCopied] = useState(false);

  // Form states for creating
  const [title, setTitle] = useState('Office Friday Lunch & Smoothies');
  const [hostName, setHostName] = useState('Eric Mugisha');
  const [hostPhone, setHostPhone] = useState('+250 788 412 900');
  const [cutoffTime, setCutoffTime] = useState('12:45 PM');
  const [billSplitMode, setBillSplitMode] = useState<'split_momo' | 'host_pays'>('split_momo');

  // Form state for joining
  const [joinCode, setJoinCode] = useState('');
  const [joinMemberName, setJoinMemberName] = useState('');
  const [joinMemberPhone, setJoinMemberPhone] = useState('+250 78');
  const [joinFeedback, setJoinFeedback] = useState<string | null>(null);

  if (!isGroupOrderModalOpen) return null;

  const currentGroup = activeGroupOrder || groupOrders[0];

  const handleCopyCode = () => {
    if (currentGroup) {
      navigator.clipboard.writeText(`https://ishema.rw/group/${currentGroup.shareCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createGroupOrder({
      title,
      hostName,
      hostPhone,
      deliveryLocation: `${selectedLocation}, Kigali`,
      cutoffTime,
      billSplitMode
    });
    setActiveTab('current');
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = joinGroupOrder(joinCode, joinMemberName, joinMemberPhone);
    if (ok) {
      setJoinFeedback('Successfully joined group order! You can now add your items.');
      setTimeout(() => {
        setJoinFeedback(null);
        setActiveTab('current');
      }, 1500);
    } else {
      setJoinFeedback('Group code not found. Please verify the code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ishema Group Ordering</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Order together for offices, schools, & families with automated MoMo bill splitting
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsGroupOrderModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-100/50 dark:bg-slate-950/30">
          <button
            onClick={() => setActiveTab('current')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'current'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Active Order {currentGroup ? `(${currentGroup.shareCode})` : ''}
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'create'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Create New Group
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'join'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Join with Code
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'current' && currentGroup && (
            <div className="space-y-5">
              {/* Share Code Card */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 rounded-2xl border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-700 dark:text-emerald-400">
                    Group Share Code
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-wide">
                      {currentGroup.shareCode}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded">
                      Open for orders
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Cutoff: <strong>{currentGroup.cutoffTime || '12:30 PM'}</strong> • Destination: <strong>{currentGroup.deliveryLocation || currentGroup.location || 'Kigali'}</strong>
                  </p>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition-all active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Link Copied!' : 'Copy Invite Link'}
                </button>
              </div>

              {/* Members Contributions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Participants & Selections ({currentGroup.members.length})
                  </h4>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Combined Total: {formatRWF((currentGroup.totalSubtotal || currentGroup.totalAmount || 0) + (currentGroup.deliveryFee || 1500))}
                  </span>
                </div>

                <div className="space-y-3">
                  {currentGroup.members.map(member => {
                    const isPaid = member.hasPaid ?? member.paid ?? false;
                    return (
                      <div
                        key={member.id}
                        className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{member.name}</span>
                            {(member.isHost || member.name.includes('(Host)')) && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.2 rounded font-bold">
                                Host
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {member.items.length > 0
                              ? member.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')
                              : 'Browsing store...'}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {formatRWF(member.subtotal)}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              isPaid
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {isPaid ? 'Paid via MoMo' : 'Pending MoMo Push'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bill Split Mechanism */}
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Bill Splitting Strategy:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {currentGroup.billSplitMode === 'split_momo'
                      ? 'Automated Split MTN MoMo Push to Each Person'
                      : 'Host Pays Full Order'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Combined Delivery Fee:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formatRWF(currentGroup.deliveryFee || 1500)} (Divided equally: {formatRWF(Math.round((currentGroup.deliveryFee || 1500) / (currentGroup.members.length || 1)))} / person)
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Group Order Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Kigali Heights 4th Floor Lunch"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name (Host)
                  </label>
                  <input
                    type="text"
                    required
                    value={hostName}
                    onChange={e => setHostName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your MTN / Airtel Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={hostPhone}
                    onChange={e => setHostPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Order Lock Cutoff Time
                  </label>
                  <input
                    type="text"
                    value={cutoffTime}
                    onChange={e => setCutoffTime(e.target.value)}
                    placeholder="e.g. 12:45 PM"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bill Payment Mode
                  </label>
                  <select
                    value={billSplitMode}
                    onChange={e => setBillSplitMode(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="split_momo">Split Bill via Individual MoMo Push</option>
                    <option value="host_pays">Host Pays Entire Consolidated Bill</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
              >
                Create Group & Generate Invite Link
              </button>
            </form>
          )}

          {activeTab === 'join' && (
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Enter 6-Character Group Code
                </label>
                <input
                  type="text"
                  required
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="e.g. KGL-882"
                  className="w-full uppercase tracking-wider font-bold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={joinMemberName}
                  onChange={e => setJoinMemberName(e.target.value)}
                  placeholder="e.g. Diane Uwase"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your MTN / Airtel Phone (For MoMo Prompt)
                </label>
                <input
                  type="tel"
                  required
                  value={joinMemberPhone}
                  onChange={e => setJoinMemberPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {joinFeedback && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium border border-emerald-400/40">
                  {joinFeedback}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
              >
                Join Group Order
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
