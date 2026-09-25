import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Gift,
  Heart,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Volume2,
  VolumeX,
  Lock,
  Calendar,
  MapPin,
  Smile
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { Order } from '../types';

export const SurpriseRevealView: React.FC = () => {
  const {
    activeSurpriseOrder,
    orders,
    setActiveSurpriseOrder,
    setCurrentView,
    markSurpriseRevealed,
    reportSurpriseOrder,
    sendThankYouNote
  } = useStore();

  // If activeSurpriseOrder is null, find the first surprise order in demo data
  const currentOrder: Order | undefined =
    activeSurpriseOrder || orders.find(o => o.isSurprise) || orders[0];

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [thankYouMessage, setThankYouMessage] = useState<string>('');
  const [isThankYouSent, setIsThankYouSent] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>('');
  const [isReportSubmitted, setIsReportSubmitted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const audioContextRef = useRef<AudioContext | null>(null);

  const triggerChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch {
      // Audio might be blocked by browser policy
    }
  };

  const launchConfetti = () => {
    try {
      // Multiple bursts
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch {
      // fallback
    }
  };

  const handleOpenGift = () => {
    setIsOpening(true);
    triggerChime();
    setTimeout(() => {
      setIsOpened(true);
      setIsOpening(false);
      launchConfetti();
      if (currentOrder) {
        markSurpriseRevealed(currentOrder.id);
      }
    }, 900);
  };

  const handleSendThankYou = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thankYouMessage.trim() || !currentOrder) return;
    sendThankYouNote(currentOrder.id, thankYouMessage);
    setIsThankYouSent(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim() || !currentOrder) return;
    reportSurpriseOrder(currentOrder.id, reportReason);
    setIsReportSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
    }, 2000);
  };

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Gift className="w-16 h-16 text-rose-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 font-display">No Surprise Gift Found</h2>
        <p className="text-sm text-slate-600 mt-2">
          Select or track a surprise gift order from Ishema Express.
        </p>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  const config = currentOrder.surpriseConfig;
  const isRevealed = config?.isRevealed || isOpened;
  const showSenderIdentity =
    config?.revealOption !== 'keep_anonymous' &&
    (config?.revealOption === 'reveal_after_delivery' ? isOpened : isOpened);

  return (
    <div id="surprise-reveal-page" className="min-h-screen bg-radial from-rose-100/60 via-amber-50/40 to-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Navigation Bar Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
              title={soundEnabled ? 'Mute celebratory chimes' : 'Enable sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-600" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <div className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Surprise Delivery</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Area */}
        <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden p-6 sm:p-10 text-center relative">
          {/* Background Decorative Circles */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-rose-200/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>

          {!isOpened ? (
            /* UNOPENED STATE */
            <div className="relative z-10 py-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wide uppercase">
                <Gift className="w-4 h-4" />
                <span>You Have a Special Delivery!</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                Someone Sent You a Surprise! 🎁
              </h1>

              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                An anonymous friend or loved one arranged this special gift package via{' '}
                <strong className="text-slate-800">Ishema Express</strong>. Tap below to unwrap and read your secret card!
              </p>

              {/* 3D-styled animated Gift Box */}
              <div className="py-6 flex justify-center">
                <div
                  id="interactive-surprise-box"
                  onClick={handleOpenGift}
                  className={`relative cursor-pointer select-none transition-transform duration-500 group ${
                    isOpening ? 'scale-115 animate-bounce' : 'hover:scale-105 active:scale-95'
                  }`}
                >
                  {/* Gift Box Container */}
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-linear-to-tr from-rose-500 via-rose-600 to-amber-500 shadow-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden border-4 border-amber-300">
                    {/* Ribbon Cross */}
                    <div className="absolute inset-y-0 w-8 bg-linear-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-md"></div>
                    <div className="absolute inset-x-0 h-8 bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-md"></div>

                    {/* Ribbon Bow */}
                    <div className="absolute -top-3 w-16 h-10 rounded-full bg-amber-300 border-2 border-yellow-100 shadow-lg flex items-center justify-center z-10">
                      <Sparkles className="w-5 h-5 text-amber-900 animate-spin" />
                    </div>

                    <div className="relative z-20 text-center text-white space-y-1">
                      <Heart className="w-10 h-10 mx-auto text-amber-200 fill-amber-200 animate-pulse drop-shadow-md" />
                      <span className="block font-display font-black text-lg tracking-wider drop-shadow-sm">
                        TAP TO OPEN
                      </span>
                    </div>

                    <div className="absolute bottom-2 inset-x-0 text-center text-[10px] font-bold text-amber-100 z-20">
                      Ishema Express Secret Delivery
                    </div>
                  </div>

                  {/* Pulsing Hint */}
                  <div className="absolute -bottom-8 inset-x-0 text-center">
                    <span className="text-xs font-bold text-rose-600 animate-pulse">
                      ✨ Click or tap the gift box to unwrap!
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  id="unwrap-surprise-button"
                  type="button"
                  onClick={handleOpenGift}
                  className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Unwrap Your Surprise Now
                </button>
              </div>
            </div>
          ) : (
            /* OPENED / REVEALED STATE */
            <div className="relative z-10 py-4 space-y-6 text-left animate-fadeIn">
              {/* Celebration Top Header */}
              <div className="text-center pb-4 border-b border-rose-100 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                  <span>Surprise Unwrapped!</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 font-display">
                  Celebration for {config?.recipientName || 'You'}! 🎉
                </h2>
                <p className="text-xs text-slate-500">
                  Delivered safely via Ishema Secret Courier • Tracking: {currentOrder.trackingNumber}
                </p>
              </div>

              {/* Secret Handwritten Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/80 border-2 border-amber-200/90 shadow-inner relative overflow-hidden">
                <div className="absolute top-3 right-3 text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <span>💌 Sealed Secret Message</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[10px]">
                    {config?.occasion || 'Special Occasion'}
                  </span>
                </div>

                <div className="text-slate-800 text-base sm:text-lg leading-relaxed italic font-serif my-4 pl-3 border-l-4 border-rose-400">
                  “{config?.secretMessage || 'Someone special is thinking about you today with all their heart! May this surprise bring warmth and a smile to your face.'}”
                </div>

                {/* Sender Identity Section */}
                <div className="mt-6 pt-4 border-t border-amber-200 flex flex-wrap items-center justify-between gap-3">
                  {showSenderIdentity && config?.senderRealName ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                        <Smile className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold">Sent with love by:</div>
                        <div className="text-sm font-bold text-emerald-900">
                          {config.senderRealName}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center">
                        <EyeOff className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold">Sender Identity:</div>
                        <div className="text-xs font-bold text-slate-900">
                          Kept Anonymous • Sent with pure love ❤️
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-right text-xs text-slate-500">
                    <span className="block font-semibold text-slate-700">Delivered On</span>
                    <span>{config?.scheduledDate || 'Today'} ({config?.scheduledTimeWindow || 'Express'})</span>
                  </div>
                </div>
              </div>

              {/* Items in Package */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-rose-600" />
                  <span>Your Surprise Gift Package Contains:</span>
                </h3>

                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 sm:p-4 flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {item.product.shortDescription}
                        </p>
                        <div className="text-[11px] text-rose-600 font-semibold mt-0.5">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipient Interaction: Thank-You Note */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-rose-600" />
                  <span>Send an Anonymous Thank-You Message Back</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Your thank-you message will be relayed through Ishema Express to the sender.
                </p>

                {isThankYouSent ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your thank-you note has been safely transmitted to the sender!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSendThankYou} className="space-y-2">
                    <textarea
                      rows={2}
                      placeholder="e.g. Murakoze cyane! / Thank you so much, this made my whole week! ❤️"
                      value={thankYouMessage}
                      onChange={(e) => setThankYouMessage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-200 outline-hidden bg-white resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!thankYouMessage.trim()}
                        className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Thank You</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Safety & Report Option (Requirement 13) */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Ishema Surprise Delivery
                </span>
                <button
                  type="button"
                  onClick={() => setShowReportModal(true)}
                  className="text-slate-400 hover:text-rose-600 underline text-[11px]"
                >
                  Report unwanted or suspicious delivery
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Safety Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
              <AlertCircle className="w-5 h-5" />
              <span>Report Delivery Concern</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              If this delivery is unwanted, contains harassing material, or feels suspicious, our Trust & Safety team will immediately investigate and block future anonymous deliveries to your number.
            </p>

            {isReportSubmitted ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                Report logged. A customer protection officer will follow up with you.
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  placeholder="Describe why you wish to report or decline this delivery..."
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs outline-hidden focus:ring-2 focus:ring-rose-200"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
