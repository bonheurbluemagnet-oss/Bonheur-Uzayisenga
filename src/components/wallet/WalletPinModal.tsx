import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const WalletPinModal: React.FC = () => {
  const { isPinModalOpen, setIsPinModalOpen, currentUser, setWalletPin } = useStore();
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);

  if (!isPinModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError('PIN must be exactly 4 numerical digits (0-9).');
      return;
    }
    if (pin !== confirmPin) {
      setError('PINs do not match. Please re-enter.');
      return;
    }

    const success = setWalletPin(pin);
    if (success) {
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        setIsPinModalOpen(false);
      }, 1400);
    }
  };

  const handleClose = () => {
    setIsDone(false);
    setError('');
    setPin('');
    setConfirmPin('');
    setIsPinModalOpen(false);
  };

  return (
    <div
      id="pin-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={handleClose}
    >
      <div
        id="pin-modal-content"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <h3 className="font-heading font-bold text-sm text-white">
              {currentUser?.security?.walletPinSet ? 'Change Wallet PIN' : 'Set 4-Digit Security PIN'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isDone ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900">Wallet PIN Activated!</h4>
            <p className="text-xs text-slate-500 font-body">
              Your 4-digit PIN is now active to safeguard wallet payments and balance transfers.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-6 space-y-4">
            <p className="text-xs text-slate-600 font-body">
              Configure a 4-digit security PIN to authorize checkout payments and peer transfers from your Ishema Wallet.
            </p>

            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enter 4-Digit PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                placeholder="••••"
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full text-center text-xl font-mono tracking-widest py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm 4-Digit PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                placeholder="••••"
                value={confirmPin}
                onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full text-center text-xl font-mono tracking-widest py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>PIN is securely encrypted on your device.</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-colors"
            >
              Save Security PIN
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
