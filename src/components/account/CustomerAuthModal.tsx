import React, { useState } from 'react';
import {
  X,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Smartphone,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { IshemaLogo } from '../IshemaLogo';

export const CustomerAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    verifyOtp,
    currentUser
  } = useStore();

  const [identifier, setIdentifier] = useState<string>('+250 788 123 456');
  const [fullName, setFullName] = useState<string>('Patrick Habimana');
  const [phone, setPhone] = useState<string>('+250 788 123 456');
  const [email, setEmail] = useState<string>('patrick.habimana@ishema.rw');
  const [otpCode, setOtpCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identifier.trim()) {
      setErrorMessage('Please enter your phone number or email.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      await login(identifier);
      setIsLoading(false);
      setIsAuthModalOpen(false);
    }, 800);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Full name and phone number are required.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      await register({ fullName, phone, email });
      setIsLoading(false);
      setAuthModalMode('otp');
    }, 800);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 4 or 6-digit OTP sent to your phone.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      const ok = await verifyOtp(otpCode);
      setIsLoading(false);
      if (!ok) {
        setErrorMessage('Invalid verification code. Please try again or use 8291.');
      }
    }, 800);
  };

  const handleAutoFillDemoOtp = () => {
    setOtpCode('8291');
    setErrorMessage('');
  };

  return (
    <div
      id="customer-auth-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        id="customer-auth-modal-content"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 text-center relative">
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex justify-center mb-3">
            <IshemaLogo variant="full" size="md" />
          </div>

          <h2 className="font-heading font-bold text-lg text-white">
            {authModalMode === 'login' && 'Sign in to Ishema Express'}
            {authModalMode === 'register' && 'Create Your Customer Account'}
            {authModalMode === 'otp' && 'Verify Rwandan Phone Number'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-body">
            {authModalMode === 'login' && 'Access your orders, saved addresses, and Ishema Wallet.'}
            {authModalMode === 'register' && 'Includes 25,000 RWF starter digital wallet balance.'}
            {authModalMode === 'otp' && `Enter the SMS code sent to ${currentUser?.phone || phone}`}
          </p>

          {/* Mode Switch Tabs */}
          {authModalMode !== 'otp' && (
            <div className="flex p-1 bg-slate-800/90 rounded-xl mt-4 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  setErrorMessage('');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  authModalMode === 'login'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('register');
                  setErrorMessage('');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  authModalMode === 'register'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rwandan Phone Number or Email
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="+250 788 123 456 or patrick@ishema.rw"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1 text-amber-800">
                  <Sparkles className="w-3 h-3" /> Quick Demo Sign In:
                </span>
                <p>
                  Click below to instantly access Patrick Habimana’s pre-loaded account with active orders, wallet, and saved addresses.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In with Phone / Email'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('otp')}
                  className="text-xs text-amber-600 font-semibold hover:underline"
                >
                  Or sign in with 1-time SMS OTP code
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {authModalMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Diane Uwase"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rwandan Phone Number (MTN / Airtel)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Protected by Ishema Rwanda 2-Factor Authentication.</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Creating...' : 'Create Account & Verify Phone'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* OTP VERIFICATION */}
          {authModalMode === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 text-center">
                  Enter 4-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="8291"
                  required
                  className="w-full py-3 px-4 text-center font-mono text-2xl tracking-widest rounded-xl border-2 border-amber-400 bg-amber-50/40 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Didn't receive SMS?</span>
                <button
                  type="button"
                  onClick={handleAutoFillDemoOtp}
                  className="text-amber-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Auto-Fill Demo Code (8291)
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLoading ? 'Verifying...' : 'Verify Phone & Continue'}</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
