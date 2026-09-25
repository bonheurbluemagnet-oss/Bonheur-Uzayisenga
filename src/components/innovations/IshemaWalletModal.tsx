import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Wallet,
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  X,
  Gift,
  ArrowRight
} from 'lucide-react';

interface IshemaWalletModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const IshemaWalletModal: React.FC<IshemaWalletModalProps> = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const {
    isWalletModalOpen,
    setIsWalletModalOpen,
    rewardPoints,
    pointsRedeemed,
    setPointsRedeemed,
    cartSubtotal
  } = useStore();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isWalletModalOpen;
  const onClose = propOnClose || (() => setIsWalletModalOpen(false));
  const [redeemInput, setRedeemInput] = useState<number>(pointsRedeemed || 0);

  if (!isOpen) return null;

  const handleApplyPoints = () => {
    setPointsRedeemed(redeemInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Ishema Rewards Wallet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Earn points on every order in Kigali</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Balance card */}
          <div className="p-5 bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-2xl shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-200">
                  Your Available Points
                </span>
                <div className="text-3xl font-black mt-0.5">
                  {rewardPoints.toLocaleString()} <span className="text-sm font-semibold">PTS</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-200" />
                <span>Gold Citizen</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-amber-100">
              <span>Points Worth in Cash:</span>
              <strong className="text-white text-sm">{formatRWF(rewardPoints)}</strong>
            </div>
          </div>

          {/* How earning works */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Cashback Rule:
            </div>
            <p>
              Earn <strong>1 Point</strong> for every <strong>100 RWF</strong> spent on groceries, medicine, or food.
              Points can be deducted directly from your next order total!
            </p>
          </div>

          {/* Redemption control */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Redeem Points on Current Cart
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={Math.min(rewardPoints, cartSubtotal)}
                step={100}
                value={redeemInput}
                onChange={e => setRedeemInput(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white w-20 text-right">
                {formatRWF(redeemInput)}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Slide to apply up to {formatRWF(Math.min(rewardPoints, cartSubtotal))} discount
            </p>
          </div>

          <button
            type="button"
            onClick={handleApplyPoints}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            Apply {formatRWF(redeemInput)} Discount to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
