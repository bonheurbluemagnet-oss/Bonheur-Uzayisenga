import React, { useState } from 'react';
import {
  Wallet,
  PlusCircle,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Search,
  Filter,
  ShieldCheck,
  Lock,
  Gift,
  Send,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Receipt,
  AlertTriangle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { WalletTransaction } from '../../types';

export const WalletDashboardView: React.FC<{ onNavigateToOrders?: () => void }> = ({ onNavigateToOrders }) => {
  const {
    walletBalance,
    walletTransactions,
    rewardPoints,
    setIsAddMoneyModalOpen,
    setIsSendMoneyModalOpen,
    setIsPinModalOpen,
    setSelectedReceiptTransaction,
    convertRewardsToWallet,
    currentUser
  } = useStore();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Added' | 'Payments' | 'Refunds' | 'Rewards'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate statistics
  const totalAdded = walletTransactions
    .filter(t => t.type === 'Money Added')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalSpent = walletTransactions
    .filter(t => t.type === 'Order Payment')
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const totalRefunds = walletTransactions
    .filter(t => t.type === 'Refund')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalRewards = walletTransactions
    .filter(t => t.type === 'Wallet Reward')
    .reduce((acc, t) => acc + t.amount, 0);

  // Filter transactions
  const filteredTransactions = walletTransactions.filter(t => {
    if (activeFilter === 'Added' && t.type !== 'Money Added') return false;
    if (activeFilter === 'Payments' && t.type !== 'Order Payment') return false;
    if (activeFilter === 'Refunds' && t.type !== 'Refund') return false;
    if (activeFilter === 'Rewards' && t.type !== 'Wallet Reward') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.referenceId.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.paymentMethodUsed.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleConvertRewards = () => {
    if (rewardPoints <= 0) {
      alert('You currently have 0 reward points to convert.');
      return;
    }
    convertRewardsToWallet();
  };

  return (
    <div id="wallet-dashboard-view" className="space-y-6">
      {/* Top Main Hero Balance Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-blue-900/40">
        {/* Background glow & subtle motif */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none">
          <Wallet className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-heading">
                Ishema Digital Wallet
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active • 0 RWF Fee
              </span>
            </div>

            <div className="pt-2">
              <span className="text-xs text-slate-300 block font-body">Available Balance</span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
                {formatRWF(walletBalance)}
              </div>
            </div>

            <p className="text-xs text-slate-400 font-body flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Instant 1-click checkout for food, groceries & courier delivery across Rwanda
            </p>
          </div>

          {/* Wallet Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="wallet-add-money-btn"
              type="button"
              onClick={() => setIsAddMoneyModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add Money</span>
            </button>

            <button
              id="wallet-send-money-btn"
              type="button"
              onClick={() => setIsSendMoneyModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-interface font-semibold text-xs sm:text-sm border border-white/10 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Send Money</span>
            </button>

            <button
              id="wallet-pin-btn"
              type="button"
              onClick={() => setIsPinModalOpen(true)}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center justify-center cursor-pointer"
              title="Configure Security PIN"
            >
              <Lock className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Loyalty Points Conversion Strip */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-amber-400/20 text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>
              You have <strong className="text-amber-300 font-bold">{rewardPoints.toLocaleString()} Reward Points</strong> ({formatRWF(rewardPoints)})
            </span>
          </div>
          <button
            type="button"
            onClick={handleConvertRewards}
            disabled={rewardPoints <= 0}
            className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Convert to Wallet Balance</span>
          </button>
        </div>
      </div>

      {/* Financial Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-body">Total Added</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
            {formatRWF(totalAdded)}
          </div>
          <span className="text-[10px] text-slate-400">Via MoMo, Airtel, Cards</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-body">Total Spent</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
            {formatRWF(totalSpent)}
          </div>
          <span className="text-[10px] text-slate-400">On deliveries & goods</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-body">Refunds Credited</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
            {formatRWF(totalRefunds)}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">100% Instant to wallet</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-body">Cashback & Rewards</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
            {formatRWF(totalRewards)}
          </div>
          <span className="text-[10px] text-slate-400">Loyalty points converted</span>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Header & Filter Controls */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              Wallet Transaction History
            </h3>
            <p className="text-xs text-slate-500 font-body">
              All deposits, purchases, refunds, and peer transfers
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search reference or note..."
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-semibold">
              {(['All', 'Added', 'Payments', 'Refunds', 'Rewards'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
                    activeFilter === tab
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Table / List */}
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Receipt className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No transactions match your criteria</p>
            <p className="text-xs text-slate-400">Try adjusting your filter or search keyword.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTransactions.map(txn => {
              const isCredit = txn.amount > 0;
              return (
                <div
                  key={txn.id}
                  onClick={() => setSelectedReceiptTransaction(txn)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        txn.type === 'Money Added'
                          ? 'bg-emerald-100 text-emerald-700'
                          : txn.type === 'Refund'
                          ? 'bg-amber-100 text-amber-700'
                          : txn.type === 'Wallet Reward'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {txn.type === 'Money Added' && <ArrowDownLeft className="w-5 h-5" />}
                      {txn.type === 'Refund' && <RefreshCw className="w-5 h-5" />}
                      {txn.type === 'Wallet Reward' && <Gift className="w-5 h-5" />}
                      {txn.type === 'Order Payment' && <ArrowUpRight className="w-5 h-5" />}
                      {txn.type === 'Withdrawal' && <Send className="w-5 h-5" />}
                    </div>

                    {/* Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                          {txn.description}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                          {txn.referenceId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-body mt-0.5">
                        <span>{txn.date} at {txn.time}</span>
                        <span>•</span>
                        <span>{txn.paymentMethodUsed}</span>
                        {txn.orderId && (
                          <>
                            <span>•</span>
                            <span className="text-amber-600 font-semibold font-mono">{txn.orderId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amount & Receipt Arrow */}
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className={`font-heading font-bold text-xs sm:text-sm ${isCredit ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {isCredit ? '+' : ''}{formatRWF(txn.amount)}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Bal: {formatRWF(txn.newBalance)}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
