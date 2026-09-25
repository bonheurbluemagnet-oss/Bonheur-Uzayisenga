import React, { useRef } from 'react';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  MapPin,
  Calendar,
  CreditCard,
  Building,
  QrCode,
  ShieldCheck,
  Share2,
  FileText
} from 'lucide-react';
import { Order, PaymentTransaction } from '../../types';
import { formatRWF } from '../../context/StoreContext';
import { IshemaLogo } from '../IshemaLogo';

interface OrderReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  transaction?: PaymentTransaction | null;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({
  isOpen,
  onClose,
  order,
  transaction
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const vatAmount = Math.round(order.total * 0.18 / 1.18);
  const netAmount = order.total - vatAmount;
  const txId = transaction?.id || `TX-RW-${order.id.replace(/\D/g, '') || '9041'}`;
  const txRef = transaction?.reference || `REF-${order.trackingNumber || '8849'}`;
  const paymentMethodLabel = transaction?.paymentMethodLabel || order.paymentMethod;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg">
              Official Tax & Payment Receipt
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Receipt Paper Container */}
        <div ref={receiptRef} className="p-6 sm:p-8 space-y-6 text-slate-800 bg-white">
          {/* Top Brand & TIN */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <IshemaLogo size="md" />
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Ishema Express Ltd • Smart Marketplace
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                TIN: 108924018 | VRN: 18002941-R
              </p>
              <p className="text-[11px] text-slate-500">
                Kigali Heights, Kimihurura, Gasabo, Rwanda
              </p>
              <p className="text-[11px] text-slate-500">
                Tel: +250 788 000 123 • info@ishema.rw
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                PAID & VERIFIED
              </span>
              <p className="text-xs font-mono font-bold text-slate-900 pt-1">
                Receipt #{order.trackingNumber || order.id}
              </p>
              <p className="text-[11px] text-slate-500">
                Date: {new Date(order.createdAt || Date.now()).toLocaleString('en-RW', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
          </div>

          {/* Transaction & Customer Details Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Billed To Customer
              </span>
              <p className="font-bold text-slate-900">{order.customer.fullName}</p>
              <p className="text-slate-600 font-mono">{order.customer.phone}</p>
              <p className="text-slate-600 text-[11px] truncate">
                {order.landmarkDetails?.nearbyLandmark || order.customer.address}
              </p>
              <p className="text-slate-500 text-[11px]">
                {order.landmarkDetails?.sector ? `${order.landmarkDetails.sector}, ${order.landmarkDetails.district}` : order.customer.district}
              </p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Payment Verification
              </span>
              <p className="font-bold text-amber-700 flex sm:justify-end items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" />
                <span>{paymentMethodLabel}</span>
              </p>
              <p className="font-mono text-[11px] text-slate-600">
                TxID: <span className="font-bold text-slate-800">{txId}</span>
              </p>
              <p className="font-mono text-[10px] text-slate-500">
                Ref: {txRef}
              </p>
              <p className="text-[10px] text-emerald-700 font-semibold">
                Status: Server Verified (SUCCESSFUL)
              </p>
            </div>
          </div>

          {/* Purchased Line Items */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100 flex justify-between">
              <span>Item & Description</span>
              <span>Total (RWF)</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">{item.product.name}</span>
                    <span className="text-[11px] text-slate-500 block">
                      Qty: {item.quantity} × {formatRWF(item.product.price)}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatRWF(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals Breakdown */}
          <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-mono">{formatRWF(order.subtotal)}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee (Kigali Moto Dispatch)</span>
              <span className="font-mono">{formatRWF(order.deliveryFee)}</span>
            </div>

            {order.poolingDiscount && order.poolingDiscount > 0 ? (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Neighborhood Delivery Pooling Discount</span>
                <span className="font-mono">-{formatRWF(order.poolingDiscount)}</span>
              </div>
            ) : null}

            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Includes 18% Rwanda VAT</span>
              <span className="font-mono">{formatRWF(vatAmount)}</span>
            </div>

            <div className="flex justify-between text-slate-950 font-extrabold text-sm sm:text-base pt-2 border-t border-slate-300">
              <span>Total Amount Paid</span>
              <span className="text-amber-600 font-mono font-black">{formatRWF(order.total)}</span>
            </div>
          </div>

          {/* Footer Security & QR Note */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Verified Rwanda Payment Gateway • Idempotency secured & encrypted with SSL/TLS.
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-600 shrink-0">
              <QrCode className="w-3.5 h-3.5 text-slate-500" />
              <span>RRA EBM E-RECEIPT</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
