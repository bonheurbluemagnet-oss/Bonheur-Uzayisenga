import React from 'react';
import {
  X,
  CheckCircle2,
  Receipt,
  Download,
  Share2,
  Calendar,
  Clock,
  CreditCard,
  Hash,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { useStore, formatRWF } from '../../context/StoreContext';
import { IshemaLogo } from '../IshemaLogo';

export const TransactionReceiptModal: React.FC = () => {
  const { selectedReceiptTransaction, setSelectedReceiptTransaction } = useStore();

  if (!selectedReceiptTransaction) return null;

  const txn = selectedReceiptTransaction;
  const isCredit = txn.amount > 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="receipt-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={() => setSelectedReceiptTransaction(null)}
    >
      <div
        id="receipt-modal-content"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200"
      >
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IshemaLogo variant="mark" size="sm" />
            <div>
              <h3 className="font-heading font-bold text-sm text-white">Ishema Express</h3>
              <p className="text-[10px] text-slate-400">Official Digital Wallet Receipt</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedReceiptTransaction(null)}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-5">
          {/* Status & Amount Hero */}
          <div className="text-center pb-5 border-b border-dashed border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
              {txn.type} • {txn.status}
            </span>
            <div className={`text-3xl font-heading font-extrabold ${isCredit ? 'text-emerald-600' : 'text-slate-900'}`}>
              {isCredit ? '+' : ''}{formatRWF(txn.amount)}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-body">{txn.description}</p>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 text-xs font-body">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                Transaction Ref
              </span>
              <span className="font-mono font-bold text-slate-900">{txn.referenceId}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Date & Time
              </span>
              <span className="font-semibold text-slate-800">{txn.date} at {txn.time}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                Payment Method
              </span>
              <span className="font-semibold text-slate-900">{txn.paymentMethodUsed}</span>
            </div>

            {txn.phoneOrAccount && (
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Account / Phone</span>
                <span className="font-semibold text-slate-800">{txn.phoneOrAccount}</span>
              </div>
            )}

            {txn.orderId && (
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Linked Order</span>
                <span className="font-bold text-amber-600 font-mono">{txn.orderId}</span>
              </div>
            )}

            {/* Balance Progression Box */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150 space-y-2 mt-2">
              <div className="flex justify-between items-center text-[11px] text-slate-500">
                <span>Previous Balance</span>
                <span className="font-semibold">{formatRWF(txn.previousBalance)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>New Wallet Balance</span>
                <span className="text-amber-600">{formatRWF(txn.newBalance)}</span>
              </div>
            </div>

            {txn.receiptNote && (
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-[11px] text-amber-900">
                <strong>Note:</strong> {txn.receiptNote}
              </div>
            )}
          </div>

          {/* Security & Verification Seal */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cryptographically Verified • Ishema Express Rwanda Ledger</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-interface font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedReceiptTransaction(null)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-interface font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
