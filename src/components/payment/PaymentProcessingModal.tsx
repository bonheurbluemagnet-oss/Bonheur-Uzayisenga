import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  CreditCard,
  Wallet,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  Lock,
  ArrowRight,
  Clock,
  Check,
  Banknote,
  Store,
  Bike,
  PackageCheck,
  Code2,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PaymentTransaction, PaymentState } from '../../types';
import { formatRWF } from '../../context/StoreContext';
import {
  initiatePayment,
  verifyPayment,
  PaymentInitiationPayload
} from '../../services/paymentService';

interface PaymentProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: PaymentInitiationPayload;
  onPaymentSuccess: (verifiedTransaction: PaymentTransaction) => void;
  onPaymentFailure?: (error: string) => void;
}

export const PaymentProcessingModal: React.FC<PaymentProcessingModalProps> = ({
  isOpen,
  onClose,
  payload,
  onPaymentSuccess,
  onPaymentFailure
}) => {
  const [status, setStatus] = useState<PaymentState>('PENDING');
  const [transaction, setTransaction] = useState<PaymentTransaction | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(90);
  const [ussdDelivered, setUssdDelivered] = useState(false);
  const [pinEnteredOnPhone, setPinEnteredOnPhone] = useState(false);
  const [isManualChecking, setIsManualChecking] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(1); // 1: Payment, 2: Order Confirmed, 3: Store Notified, 4: Driver Assignment, 5: Delivery
  const [showMomoApiSpec, setShowMomoApiSpec] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);

  const isMoMo = payload.paymentMethod === 'momo_rwanda' || payload.paymentMethod === 'airtel_rwanda';
  const isCard = payload.paymentMethod === 'card';
  const isCOD = payload.paymentMethod === 'cash_on_delivery';

  // Compute clean MSISDN from phone
  const cleanPhoneDigits = (payload.customer.phone || '').replace(/\D/g, '');
  const msisdn = cleanPhoneDigits.startsWith('250')
    ? cleanPhoneDigits
    : cleanPhoneDigits.startsWith('0')
    ? `250${cleanPhoneDigits.slice(1)}`
    : `250${cleanPhoneDigits}`;

  // MTN MoMo Open API specification payload structure
  const mtnMoMoPreApprovalSpec = {
    payer: {
      partyIdType: 'MSISDN' as const,
      partyId: msisdn || '250788349102'
    },
    payerCurrency: 'RWF',
    payerMessage: `Payment of ${payload.amount.toLocaleString()} RWF for order ${payload.orderId || 'ORD-ISHEMA'} on Ishema Express`,
    validityTime: 300
  };

  const handleCopySpec = () => {
    navigator.clipboard.writeText(JSON.stringify(mtnMoMoPreApprovalSpec, null, 2));
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  // Manual payment status check button handler
  const handleManualCheckStatus = async () => {
    if (!transaction?.id) return;
    setIsManualChecking(true);
    try {
      const res = await verifyPayment(transaction.id);
      if (res.transaction) {
        setTransaction(res.transaction);
        setStatus(res.transaction.status);
        if (res.transaction.status === 'SUCCESSFUL') {
          triggerSuccessPipeline(res.transaction);
        } else if (['FAILED', 'CANCELLED', 'EXPIRED', 'TIMEOUT'].includes(res.transaction.status)) {
          setErrorMessage(res.transaction.failureReason || `Payment ${res.transaction.status.toLowerCase()}`);
        }
      }
    } catch (e: any) {
      console.warn('Manual check error:', e);
    } finally {
      setIsManualChecking(false);
    }
  };

  // Pipeline progression after confirmed payment
  const triggerSuccessPipeline = (tx: PaymentTransaction) => {
    setStatus('SUCCESSFUL');
    setPipelineStep(1);

    // Step 2: Order Confirmed
    setTimeout(() => setPipelineStep(2), 600);
    // Step 3: Store/Seller Notified
    setTimeout(() => setPipelineStep(3), 1300);
    // Step 4: Driver Assignment
    setTimeout(() => setPipelineStep(4), 2100);
    // Step 5: Ready for Delivery -> automatically complete
    setTimeout(() => {
      setPipelineStep(5);
      setTimeout(() => {
        onPaymentSuccess(tx);
      }, 1000);
    }, 2800);
  };

  useEffect(() => {
    if (!isOpen) {
      setStatus('PENDING');
      setTransaction(null);
      setErrorMessage(null);
      setCountdown(90);
      setUssdDelivered(false);
      setPinEnteredOnPhone(false);
      setPipelineStep(1);
      return;
    }

    let isMounted = true;
    let timer: NodeJS.Timeout;
    let poller: NodeJS.Timeout;

    // Start 90s countdown for timeout handling
    timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer);
          if (isMounted && (status === 'PENDING' || status === 'PROCESSING')) {
            setStatus('TIMEOUT');
            setErrorMessage('Payment request timed out. No confirmation was received within 90 seconds.');
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    async function executePaymentFlow() {
      try {
        setStatus('PENDING');
        setErrorMessage(null);

        // 1. Initiate payment server-side with unique transaction ID & idempotency
        const initRes = await initiatePayment(payload);
        if (!isMounted) return;

        setTransaction(initRes.transaction);
        const currentInitialStatus = initRes.status || 'PROCESSING';
        setStatus(currentInitialStatus);

        // Instant completion for wallet or cash on delivery
        if (currentInitialStatus === 'SUCCESSFUL') {
          triggerSuccessPipeline(initRes.transaction);
          return;
        }

        if (['FAILED', 'CANCELLED', 'EXPIRED', 'TIMEOUT'].includes(currentInitialStatus)) {
          setErrorMessage(initRes.transaction.failureReason || `Payment ${currentInitialStatus.toLowerCase()}`);
          if (onPaymentFailure) onPaymentFailure(initRes.transaction.failureReason || 'Payment failed');
          return;
        }

        // 2. Deliver USSD prompt simulation to customer's phone
        setTimeout(() => {
          if (isMounted) setUssdDelivered(true);
        }, 1200);

        // 3. Customer approves on phone (enters PIN on their handset)
        setTimeout(() => {
          if (isMounted) setPinEnteredOnPhone(true);
        }, 2600);

        // 4. Server-side authoritative verification polling
        let pollCount = 0;
        poller = setInterval(async () => {
          if (!isMounted) return;
          pollCount++;

          try {
            const verifyRes = await verifyPayment(initRes.transaction.id);
            if (!isMounted) return;

            if (verifyRes.transaction) {
              setTransaction(verifyRes.transaction);
              const txStatus = verifyRes.transaction.status;

              if (txStatus === 'SUCCESSFUL') {
                clearInterval(poller);
                triggerSuccessPipeline(verifyRes.transaction);
              } else if (['FAILED', 'CANCELLED', 'EXPIRED', 'TIMEOUT'].includes(txStatus)) {
                clearInterval(poller);
                setStatus(txStatus);
                const reason = verifyRes.transaction.failureReason || `Payment ${txStatus.toLowerCase()}`;
                setErrorMessage(reason);
                if (onPaymentFailure) onPaymentFailure(reason);
              }
            }

            if (pollCount > 25) {
              clearInterval(poller);
              if (status === 'PROCESSING' || status === 'PENDING') {
                setStatus('TIMEOUT');
                setErrorMessage('Payment request timed out while waiting for operator confirmation.');
              }
            }
          } catch (e: any) {
            console.warn('Polling check error:', e);
          }
        }, 1800);

      } catch (err: any) {
        if (!isMounted) return;
        setStatus('FAILED');
        const errStr = err.message || 'Payment initiation failed';
        setErrorMessage(errStr);
        if (onPaymentFailure) onPaymentFailure(errStr);
      }
    }

    executePaymentFlow();

    return () => {
      isMounted = false;
      clearInterval(timer);
      if (poller) clearInterval(poller);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden text-center p-6 sm:p-8 space-y-6">

        {/* ---------------------------------------------------- */}
        {/* STATE 1: PENDING / PROCESSING (WAITING CONFIRMATION) */}
        {/* ---------------------------------------------------- */}
        {(status === 'PENDING' || status === 'PROCESSING') && (
          <div className="space-y-5 animate-in zoom-in-95">
            {/* Operator & Handset Icon Radar */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-amber-300 border-t-amber-600 animate-spin" />
              <div className="absolute inset-2 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
                {isMoMo ? (
                  <Smartphone className="w-8 h-8 animate-pulse text-amber-600" />
                ) : isCard ? (
                  <CreditCard className="w-8 h-8 animate-pulse text-blue-600" />
                ) : (
                  <Wallet className="w-8 h-8 animate-pulse text-emerald-600" />
                )}
              </div>
            </div>

            {/* Headers matching user specifications */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Session expires in {countdown}s</span>
              </div>

              {isMoMo ? (
                <>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 flex items-center justify-center gap-2">
                    <span>Payment Request Sent</span>
                    <span className="text-xl">📱</span>
                  </h3>
                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    “Please check your phone and approve the payment.”
                  </p>
                </>
              ) : isCard ? (
                <>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900">
                    Authorizing Card Payment
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Performing 3D Secure bank verification for <strong className="font-mono text-slate-900">{formatRWF(payload.amount)}</strong>
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900">
                    Processing Ishema Wallet Payment
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Verifying PIN & deducting {formatRWF(payload.amount)}
                  </p>
                </>
              )}

              {/* Waiting status subtitle */}
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>Waiting for payment confirmation...</span>
              </div>
            </div>

            {/* Mobile Handset USSD Approval Prompt Simulation */}
            {isMoMo && (
              <div className="p-4 rounded-2xl bg-slate-950 text-white text-left font-mono text-xs space-y-2 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between text-[11px] text-amber-400 border-b border-slate-800 pb-1.5">
                  <span className="font-bold flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{payload.paymentMethod === 'momo_rwanda' ? 'MTN MoMo (*182#)' : 'Airtel Money (*500#)'}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans">Handset Push</span>
                </div>

                <div className="text-[11px] text-slate-200">
                  {ussdDelivered ? (
                    <div className="space-y-1.5">
                      <p className="text-amber-300 font-bold">
                        Do you want to pay {formatRWF(payload.amount)} to ISHEMA EXPRESS LTD?
                      </p>
                      <p className="text-slate-400 text-[10px]">
                        Ref: {transaction?.reference || 'MOMO-RW-TX'} • Phone: {payload.customer.phone}
                      </p>
                      <div className="pt-1.5 border-t border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                        {pinEnteredOnPhone ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>PIN confirmed on phone. Awaiting network settlement...</span>
                          </span>
                        ) : (
                          <span className="text-amber-200 animate-pulse">
                            👉 Enter your Mobile Money PIN on your phone handset to approve
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Connecting to Rwanda Telecom Network...</span>
                  )}
                </div>
              </div>
            )}

            {/* Notice: Never enter PIN on website */}
            {isMoMo && (
              <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                🔒 <strong>Security Notice:</strong> Do NOT enter your Mobile Money PIN into this website. Always approve and enter your PIN directly on your phone.
              </p>
            )}

            {/* MTN MoMo Open API Specification Inspector Accordion */}
            {isMoMo && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 text-left overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowMomoApiSpec(!showMomoApiSpec)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>MTN MoMo Open API Payload (MSISDN & Pre-Approval)</span>
                  </span>
                  {showMomoApiSpec ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {showMomoApiSpec && (
                  <div className="p-3.5 pt-0 border-t border-slate-200 text-xs space-y-2.5">
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono font-bold text-[10px]">
                          partyIdType: MSISDN
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono font-bold text-[10px]">
                          validityTime: 300s
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopySpec}
                        className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedSpec ? 'Copied!' : 'Copy JSON'}</span>
                      </button>
                    </div>

                    <pre className="p-2.5 rounded-xl bg-slate-950 text-amber-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                      {JSON.stringify(mtnMoMoPreApprovalSpec, null, 2)}
                    </pre>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600">
                      <div className="p-2 rounded-lg bg-white border border-slate-200">
                        <span className="font-bold text-slate-800 block">MSISDN Destination:</span>
                        <span className="font-mono text-slate-900 font-bold">{mtnMoMoPreApprovalSpec.payer.partyId}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-slate-200">
                        <span className="font-bold text-slate-800 block">Currency & Scheme:</span>
                        <span className="font-mono text-slate-900 font-bold">RWF (Rwanda Telecom)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Check Payment Status Button */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleManualCheckStatus}
                disabled={isManualChecking}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isManualChecking ? 'animate-spin' : ''}`} />
                <span>{isManualChecking ? 'Verifying with Provider...' : 'Check Payment Status'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STATE 2: SUCCESSFUL (PAYMENT → ORDER → SELLER → DRIVER → DELIVERY) */}
        {/* ---------------------------------------------------- */}
        {status === 'SUCCESSFUL' && (
          <div className="space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-heading font-black text-2xl text-slate-900">
                {isCard ? 'Card Payment Successful ✓' : 'Payment Successful ✓'}
              </h3>
              <p className="text-base font-extrabold text-emerald-700 font-mono mt-1">
                {formatRWF(payload.amount)} paid successfully.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Authoritative server verification confirmed.
              </p>
            </div>

            {/* Automatic Progression Pipeline:
                Payment → Order Confirmed → Store/Seller Notified → Driver Assignment → Delivery */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
                <span>Order Processing Pipeline</span>
                <span className="text-[10px] text-emerald-700 font-mono">Step {pipelineStep} of 5</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* 1. Payment */}
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-900">Payment</span>
                    <span className="text-[11px] text-emerald-700 block">Verified & Settled in RWF</span>
                  </div>
                </div>

                {/* 2. Order Confirmed */}
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    pipelineStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {pipelineStep >= 2 ? '✓' : '2'}
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold ${pipelineStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Order Confirmed</span>
                    <span className="text-[11px] text-slate-500 block">Digital invoice & receipt generated</span>
                  </div>
                </div>

                {/* 3. Store/Seller Notified */}
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    pipelineStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {pipelineStep >= 3 ? '✓' : '3'}
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold ${pipelineStep >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Store / Seller Notified</span>
                    <span className="text-[11px] text-slate-500 block">Simba Supermarket packaging order</span>
                  </div>
                </div>

                {/* 4. Driver Assignment */}
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    pipelineStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {pipelineStep >= 4 ? '✓' : '4'}
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold ${pipelineStep >= 4 ? 'text-slate-900' : 'text-slate-400'}`}>Driver Assignment</span>
                    <span className="text-[11px] text-slate-500 block">Nearby motorcycle courier matched</span>
                  </div>
                </div>

                {/* 5. Delivery */}
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    pipelineStep >= 5 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {pipelineStep >= 5 ? '✓' : '5'}
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold ${pipelineStep >= 5 ? 'text-slate-900' : 'text-slate-400'}`}>Delivery</span>
                    <span className="text-[11px] text-slate-500 block">Live GPS tracking dispatched</span>
                  </div>
                </div>
              </div>
            </div>

            {transaction && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-bold text-slate-900">{transaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Method:</span>
                  <span className="text-slate-800">{transaction.paymentMethodLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gateway Ref:</span>
                  <span className="text-slate-800">{transaction.reference}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STATE 3: FAILED / CANCELLED / EXPIRED / TIMEOUT */}
        {/* ---------------------------------------------------- */}
        {(['FAILED', 'CANCELLED', 'EXPIRED', 'TIMEOUT'].includes(status)) && (
          <div className="space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <XCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs">
                {status === 'CANCELLED'
                  ? 'PAYMENT CANCELLED'
                  : status === 'TIMEOUT'
                  ? 'PAYMENT TIMED OUT'
                  : status === 'EXPIRED'
                  ? 'PAYMENT EXPIRED'
                  : 'PAYMENT FAILED'}
              </span>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 mt-2">
                Transaction Could Not Be Completed
              </h3>
              <p className="text-xs text-rose-600 mt-1 max-w-xs mx-auto">
                {errorMessage || 'The payment request was not approved or timed out on your device.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-slate-800">Next Steps & Troubleshooting:</p>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                <li>Check your MTN MoMo (*182#) or Airtel Money (*500#) balance</li>
                <li>Ensure your phone is on with active cellular connection</li>
                <li>Try selecting <strong>Ishema Wallet</strong> or <strong>Credit/Debit Card</strong></li>
                <li>Or choose <strong>Cash on Delivery</strong> for Kigali courier delivery</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Choose Another Method
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatus('PENDING');
                  setErrorMessage(null);
                  setCountdown(90);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Payment</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
