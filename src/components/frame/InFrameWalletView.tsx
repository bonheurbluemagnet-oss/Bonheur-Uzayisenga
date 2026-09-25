import React, { useState } from 'react';
import {
  Wallet,
  PlusCircle,
  Send,
  History,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Filter,
  CheckCircle2,
  Receipt,
  Sparkles,
  Smartphone,
  CreditCard
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { WalletDashboardView } from '../wallet/WalletDashboardView';

export const InFrameWalletView: React.FC = () => {
  const {
    walletBalance,
    rewardPoints,
    setIsAddMoneyModalOpen,
    setIsSendMoneyModalOpen,
    setCurrentView,
    walletTransactions
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'deposits' | 'payments'>('all');

  const filteredTransactions = walletTransactions.filter(tx => {
    if (activeTab === 'deposits') return tx.type === 'Money Added' || tx.type === 'Wallet Reward' || tx.type === 'Refund';
    if (activeTab === 'payments') return tx.type === 'Order Payment' || tx.type === 'Withdrawal';
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in">
      {/* Breadcrumb & Title */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="hover:text-amber-600 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-700">Ishema Wallet</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950 flex items-center gap-2.5">
            <span>Ishema Wallet</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
              MTN & Airtel Integrated
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Store funds for 1-click checkout, earn 2% cashback, and send payments instantly across Rwanda.
          </p>
        </div>
      </div>

      {/* Prominent Balance Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 shadow-2xl border border-amber-500/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-400">
              Available Balance
            </span>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              {formatRWF(walletBalance || 25000)}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
              <span>Ishema Points: <strong>{rewardPoints.toLocaleString()} PTS</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">2% Cashback Active</span>
            </div>
          </div>

          {/* Action Buttons as requested: Add Money, Pay, Transaction History */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="wallet-add-money-btn"
              type="button"
              onClick={() => setIsAddMoneyModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Money</span>
            </button>

            <button
              id="wallet-pay-btn"
              type="button"
              onClick={() => setIsSendMoneyModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-interface font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Pay & Send</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('wallet-history-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-interface font-bold text-xs transition-colors flex items-center gap-2"
            >
              <History className="w-4 h-4 text-slate-400" />
              <span>Transaction History</span>
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Wallet Dashboard Details & Transactions */}
      <div id="wallet-history-section">
        <WalletDashboardView onNavigateToOrders={() => setCurrentView('orders')} />
      </div>
    </div>
  );
};
