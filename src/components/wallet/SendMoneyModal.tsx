import React, { useState } from 'react';
import {
  X,
  Send,
  Phone,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';

export const SendMoneyModal: React.FC = () => {
  const {
    isSendMoneyModalOpen,
    setIsSendMoneyModalOpen,
    walletBalance,
    sendMoneyFromWallet,
    currentUser
  } = useStore();

  const [recipientPhone, setRecipientPhone] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [amount, setAmount] = useState<string>('5000');
  const [note, setNote] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isSendMoneyModalOpen) return null;

  const numAmount = parseInt(amount.replace(/\D/g, ''), 10) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!recipientPhone.trim()) {
      setError('Please enter a recipient phone number.');
      return;
    }
    if (numAmount <= 0) {
      setError('Please enter a valid transfer amount.');
      return;
    }
    if (numAmount > walletBalance) {
      setError(`Insufficient balance. You have ${formatRWF(walletBalance)} in your wallet.`);
      return;
    }

    if (currentUser?.security?.requirePinForPayments && currentUser?.security?.walletPin) {
      if (pin !== currentUser.security.walletPin) {
        setError('Incorrect 4-digit Wallet Security PIN.');
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(async () => {
      const res = await sendMoneyFromWallet(
        recipientPhone,
        recipientName || 'Recipient',
        numAmount,
        note
      );
      setIsSubmitting(false);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setError(res.message);
      }
    }, 1000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError('');
    setIsSendMoneyModalOpen(false);
  };

  return (
    <div
      id="send-money-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={handleClose}
    >
      <div
        id="send-money-modal-content"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Send Wallet Money</h2>
              <p className="text-[11px] text-slate-400">
                Balance: <strong className="text-amber-400">{formatRWF(walletBalance)}</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-7 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Transfer Completed!</h3>
              <p className="text-xs text-slate-600 mt-1 font-body">
                Sent <strong>{formatRWF(numAmount)}</strong> to {recipientName || 'Recipient'} ({recipientPhone}).
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
              New Wallet Balance: <strong className="text-amber-600">{formatRWF(walletBalance)}</strong>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recipient Rwandan Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+250 788 000 000"
                  value={recipientPhone}
                  onChange={e => setRecipientPhone(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recipient Name (Optional)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Marie Claire"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Transfer Amount (RWF)
              </label>
              <input
                type="number"
                placeholder="5,000"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min={100}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Note / Message (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Dinner contribution or gift"
                value={note}
                onChange={e => setNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {currentUser?.security?.requirePinForPayments && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enter 4-Digit Wallet Security PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-center font-mono text-base tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 block text-center mt-0.5">Demo PIN: 1234</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Sending...' : `Send ${formatRWF(numAmount)}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
