import React from 'react';
import {
  Smartphone,
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  Plus,
  Banknote
} from 'lucide-react';
import { PaymentMethodType } from '../../types';
import { formatRWF } from '../../context/StoreContext';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
  phoneNumber: string;
  onPhoneChange: (phone: string) => void;
  cardDetails: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
  onCardChange: (details: any) => void;
  walletBalance: number;
  totalAmount: number;
  walletPin: string;
  onWalletPinChange: (pin: string) => void;
  onOpenAddMoney?: () => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
  phoneNumber,
  onPhoneChange,
  cardDetails,
  onCardChange,
  walletBalance,
  totalAmount,
  walletPin,
  onWalletPinChange,
  onOpenAddMoney
}) => {
  const isWalletSufficient = walletBalance >= totalAmount;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Choose Payment Method
        </label>
        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Gateway</span>
        </span>
      </div>

      {/* Method Selection Cards (5 Methods) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* 1. 📱 MTN Mobile Money */}
        <div
          onClick={() => onSelectMethod('momo_rwanda')}
          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            selectedMethod === 'momo_rwanda'
              ? 'border-amber-500 bg-amber-50/70 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center font-heading shadow-xs">
                📱
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                  MTN Mobile Money
                </h4>
                <p className="text-[11px] text-slate-500">Rwanda *182# USSD Push</p>
              </div>
            </div>

            {selectedMethod === 'momo_rwanda' ? (
              <CheckCircle2 className="w-5 h-5 text-amber-600 fill-amber-100" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-300" />
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-amber-900 font-medium">
            <span>Instant phone push</span>
            <span className="font-mono bg-amber-200/70 px-1.5 py-0.5 rounded">078 / 079</span>
          </div>
        </div>

        {/* 2. 📱 Airtel Money */}
        <div
          onClick={() => onSelectMethod('airtel_rwanda')}
          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            selectedMethod === 'airtel_rwanda'
              ? 'border-rose-500 bg-rose-50/70 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center font-heading shadow-xs">
                📱
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                  Airtel Money
                </h4>
                <p className="text-[11px] text-slate-500">Instant USSD prompt</p>
              </div>
            </div>

            {selectedMethod === 'airtel_rwanda' ? (
              <CheckCircle2 className="w-5 h-5 text-rose-600 fill-rose-100" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-300" />
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center justify-between text-[10px] text-rose-900 font-medium">
            <span>Instant phone push</span>
            <span className="font-mono bg-rose-200/70 px-1.5 py-0.5 rounded">072 / 073</span>
          </div>
        </div>

        {/* 3. 💳 Visa / Mastercard */}
        <div
          onClick={() => onSelectMethod('card')}
          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            selectedMethod === 'card'
              ? 'border-blue-500 bg-blue-50/70 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs text-xs">
                💳
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                  Visa / Mastercard
                </h4>
                <p className="text-[11px] text-slate-500">3D Secure Tokenized</p>
              </div>
            </div>

            {selectedMethod === 'card' ? (
              <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-300" />
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[10px] text-blue-900 font-medium">
            <span>BK, BPR, Visa, MC</span>
            <span className="font-mono bg-blue-200/70 px-1.5 py-0.5 rounded">3D Secure</span>
          </div>
        </div>

        {/* 4. 💰 Ishema Wallet */}
        <div
          onClick={() => onSelectMethod('ishema_wallet')}
          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            selectedMethod === 'ishema_wallet'
              ? 'border-emerald-500 bg-emerald-50/70 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs text-xs">
                💰
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                  Ishema Wallet
                </h4>
                <p className="text-[11px] text-slate-500">Zero fee instant pay</p>
              </div>
            </div>

            {selectedMethod === 'ishema_wallet' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-300" />
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[10px]">
            <span className="text-slate-600">Balance:</span>
            <span className={`font-mono font-bold ${isWalletSufficient ? 'text-emerald-700' : 'text-rose-600'}`}>
              {formatRWF(walletBalance)}
            </span>
          </div>
        </div>

        {/* 5. 💵 Cash on Delivery */}
        <div
          onClick={() => onSelectMethod('cash_on_delivery')}
          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            selectedMethod === 'cash_on_delivery'
              ? 'border-slate-900 bg-slate-100 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs text-xs">
                💵
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                  Cash on Delivery
                </h4>
                <p className="text-[11px] text-slate-500">Where available</p>
              </div>
            </div>

            {selectedMethod === 'cash_on_delivery' ? (
              <CheckCircle2 className="w-5 h-5 text-slate-950 fill-slate-200" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-300" />
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-700 font-medium">
            <span>Pay courier upon arrival</span>
            <span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded">Kigali Zone</span>
          </div>
        </div>
      </div>

      {/* Dynamic Detail Form Based on Selected Method */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        {/* Mobile Money Phone Number Input (MTN or Airtel) */}
        {(selectedMethod === 'momo_rwanda' || selectedMethod === 'airtel_rwanda') && (
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Enter Mobile Money Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Smartphone className={`w-4 h-4 ${selectedMethod === 'momo_rwanda' ? 'text-amber-500' : 'text-rose-500'}`} />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => onPhoneChange(e.target.value)}
                placeholder="+250 XXX XXX XXX"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-amber-500 bg-white"
              />
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <span>📱 Handset Approval Prompt</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                After clicking Pay, an official payment request will be sent directly to your phone. You will enter your Mobile Money PIN <strong className="text-slate-900">on your phone</strong> to confirm.
              </p>
              <p className="text-[10px] text-amber-800 font-medium">
                🔒 Do NOT enter your Mobile Money PIN into this website.
              </p>
            </div>
          </div>
        )}

        {/* Ishema Wallet Details & PIN */}
        {selectedMethod === 'ishema_wallet' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Available Balance</span>
                <span className="font-heading font-extrabold text-base text-slate-900 font-mono">
                  {formatRWF(walletBalance)}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block text-right">Order Total</span>
                <span className="font-heading font-extrabold text-base text-amber-600 font-mono">
                  {formatRWF(totalAmount)}
                </span>
              </div>
            </div>

            {!isWalletSufficient ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Insufficient Wallet Balance</span>
                </div>
                <p className="text-[11px] text-rose-700">
                  You need {formatRWF(totalAmount - walletBalance)} more. Top up instantly with MTN MoMo or Airtel Money.
                </p>
                {onOpenAddMoney && (
                  <button
                    type="button"
                    onClick={onOpenAddMoney}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Top Up Wallet Now</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Enter 4-Digit Ishema Wallet PIN</span>
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={walletPin}
                  onChange={e => onWalletPinChange(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  className="w-32 px-3 py-2 rounded-xl border border-slate-300 text-center font-mono font-black text-lg tracking-widest text-slate-900 focus:outline-none focus:border-emerald-500 bg-white"
                />
                <span className="text-[11px] text-slate-400 block">Default demo PIN: 1234</span>
              </div>
            )}
          </div>
        )}

        {/* Card Form */}
        {selectedMethod === 'card' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800">Secure Card Interface</span>
              <span className="text-[10px] text-slate-500 font-mono">Tokenized PCI-DSS</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Card Number
              </label>
              <input
                type="text"
                maxLength={19}
                value={cardDetails.cardNumber}
                onChange={e => onCardChange({ ...cardDetails, cardNumber: e.target.value })}
                placeholder="4242 •••• •••• 4242"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Expiry (MM/YY)
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={cardDetails.expiryDate}
                  onChange={e => onCardChange({ ...cardDetails, expiryDate: e.target.value })}
                  placeholder="12/28"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  CVV / CVC
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={cardDetails.cvv}
                  onChange={e => onCardChange({ ...cardDetails, cvv: e.target.value })}
                  placeholder="•••"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardDetails.cardHolder}
                onChange={e => onCardChange({ ...cardDetails, cardHolder: e.target.value })}
                placeholder="Name on card"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/80 text-[11px] text-blue-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Zero Raw Card Storage</span>
              </div>
              <p className="text-slate-600 text-[10px]">
                Card details are tokenized securely through our payment provider. Raw card numbers and CVV are never stored on Ishema Express servers.
              </p>
            </div>
          </div>
        )}

        {/* Cash on Delivery Details */}
        {selectedMethod === 'cash_on_delivery' && (
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Banknote className="w-4 h-4 text-emerald-600" />
              <span>Cash on Delivery (Where Available)</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              You will hand over <strong className="text-slate-900 font-mono">{formatRWF(totalAmount)}</strong> directly to the Ishema Express motorcycle driver upon arrival at your doorstep.
            </p>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <span>💡 Please prepare the exact cash amount to facilitate prompt delivery.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
