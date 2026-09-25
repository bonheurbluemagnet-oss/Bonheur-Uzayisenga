import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  RotateCcw,
  FileText,
  ShieldCheck,
  Send,
  Zap,
  Building,
  Smartphone,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  Download,
  Eye,
  Check,
  Code2,
  Copy,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { PaymentTransaction, PaymentState, Order } from '../../types';
import { formatRWF, useStore } from '../../context/StoreContext';
import {
  fetchAdminTransactions,
  refundPaymentTransaction,
  simulatePaymentWebhook,
  verifyPayment,
  submitMtnMoMoPreApproval,
  submitMtnMoMoRequestToPay
} from '../../services/paymentService';
import { OrderReceiptModal } from '../payment/OrderReceiptModal';

export const AdminPaymentsView: React.FC = () => {
  const { orders } = useStore();
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [metrics, setMetrics] = useState<any>({
    totalCount: 0,
    totalVolumeRWF: 0,
    successfulCount: 0,
    failedCount: 0,
    pendingCount: 0,
    refundedCount: 0,
    successRatePercent: 100,
    totalSellerSettlementPending: 0,
    platformCommissionEarned: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<PaymentTransaction | null>(null);

  // Refund Modal State
  const [refundTargetTx, setRefundTargetTx] = useState<PaymentTransaction | null>(null);
  const [refundReason, setRefundReason] = useState('Customer cancelled delivery order');
  const [isRefunding, setIsRefunding] = useState(false);

  // Webhook Simulator Modal State
  const [simTargetTx, setSimTargetTx] = useState<PaymentTransaction | null>(null);
  const [simStatus, setSimStatus] = useState<PaymentState>('SUCCESSFUL');
  const [simReason, setSimReason] = useState('Simulated webhook operator callback');
  const [isSimulating, setIsSimulating] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // MTN MoMo Open API Testing Console & Inspector States
  const [momoConsoleOpen, setMomoConsoleOpen] = useState(false);
  const [selectedTxForMoMoSpec, setSelectedTxForMoMoSpec] = useState<PaymentTransaction | null>(null);
  const [momoApiTab, setMomoApiTab] = useState<'preapproval' | 'requesttopay'>('preapproval');
  const [momoTestMsisdn, setMomoTestMsisdn] = useState('250788349102');
  const [momoTestAmount, setMomoTestAmount] = useState('25000');
  const [momoTestValidity, setMomoTestValidity] = useState(300);
  const [momoTestMessage, setMomoTestMessage] = useState('Pre-approval for Ishema Express checkout');
  const [momoConsoleResult, setMomoConsoleResult] = useState<any>(null);
  const [isExecutingMoMo, setIsExecutingMoMo] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAdminTransactions({
        status: statusFilter,
        paymentMethod: methodFilter,
        search: searchQuery
      });
      if (data.success) {
        setTransactions(data.transactions);
        setMetrics(data.metrics);
      }
    } catch (err: any) {
      console.error('Error loading transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, methodFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleVerifyNow = async (txId: string) => {
    try {
      const res = await verifyPayment(txId);
      if (res.success) {
        setNotificationMsg(`Verified ${txId}: Status is ${res.status}`);
        loadData();
        setTimeout(() => setNotificationMsg(null), 3000);
      }
    } catch (err: any) {
      alert(`Verification failed: ${err.message}`);
    }
  };

  const handleExecuteRefund = async () => {
    if (!refundTargetTx) return;
    try {
      setIsRefunding(true);
      const res = await refundPaymentTransaction(refundTargetTx.id, refundReason);
      if (res.success) {
        setNotificationMsg(`Refund processed for ${refundTargetTx.id}`);
        setRefundTargetTx(null);
        loadData();
        setTimeout(() => setNotificationMsg(null), 3000);
      }
    } catch (err: any) {
      alert(`Refund error: ${err.message}`);
    } finally {
      setIsRefunding(false);
    }
  };

  const handleExecuteWebhookSimulation = async () => {
    if (!simTargetTx) return;
    try {
      setIsSimulating(true);
      const res = await simulatePaymentWebhook(simTargetTx.id, simStatus, simReason);
      if (res.success) {
        setNotificationMsg(`Webhook applied: Status changed to ${simStatus}`);
        setSimTargetTx(null);
        loadData();
        setTimeout(() => setNotificationMsg(null), 3000);
      }
    } catch (err: any) {
      alert(`Webhook error: ${err.message}`);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleExecuteMoMoTest = async () => {
    try {
      setIsExecutingMoMo(true);
      setMomoConsoleResult(null);

      if (momoApiTab === 'preapproval') {
        const payload = {
          payer: {
            partyIdType: 'MSISDN' as const,
            partyId: momoTestMsisdn.replace(/\D/g, '')
          },
          payerCurrency: 'RWF',
          payerMessage: momoTestMessage,
          validityTime: Number(momoTestValidity) || 300
        };
        const res = await submitMtnMoMoPreApproval(payload);
        setMomoConsoleResult(res);
        setNotificationMsg(`MTN MoMo Pre-Approval Created: ${res.preapprovalId}`);
      } else {
        const payload = {
          amount: momoTestAmount,
          currency: 'RWF',
          externalId: `ORD-${Date.now().toString().slice(-4)}`,
          payer: {
            partyIdType: 'MSISDN' as const,
            partyId: momoTestMsisdn.replace(/\D/g, '')
          },
          payerMessage: momoTestMessage,
          payeeNote: 'Ishema Express Open API Test Order'
        };
        const res = await submitMtnMoMoRequestToPay(payload);
        setMomoConsoleResult(res);
        setNotificationMsg(`MTN MoMo RequestToPay Dispatched: Ref ${res.referenceId}`);
        loadData();
      }
      setTimeout(() => setNotificationMsg(null), 4000);
    } catch (err: any) {
      setMomoConsoleResult({ error: true, message: err.message });
    } finally {
      setIsExecutingMoMo(false);
    }
  };

  // Helper to find matching order for receipt
  const getOrderForTransaction = (tx: PaymentTransaction): Order => {
    const found = orders.find(o => o.id === tx.orderId || o.trackingNumber === tx.reference);
    if (found) return found;

    return {
      id: tx.orderId || 'ORD-901',
      trackingNumber: tx.reference,
      customer: {
        fullName: tx.customer.fullName,
        phone: tx.customer.phone,
        email: tx.customer.email,
        address: 'Kigali City Center, Gasabo',
        district: 'Gasabo'
      },
      items: [
        {
          product: {
            id: 'prod-item-1',
            name: tx.sellerSettlement?.sellerName || 'Ishema Order Item',
            slug: 'ishema-item',
            categoryId: 'cat-food',
            subcategoryId: 'sub-food-1',
            price: tx.amount,
            rating: 4.9,
            reviewsCount: 12,
            stock: 10,
            inStock: true,
            images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'],
            shortDescription: 'Verified Ishema Marketplace item',
            description: 'Item purchased through Rwanda Payment API',
            specifications: {},
            estimatedDeliveryTime: '30 mins',
            deliveryFee: 1500,
            seller: {
              id: 'sel-1',
              name: tx.sellerSettlement?.sellerName || 'Simba Supermarket',
              phone: '+250 788 123 456',
              rating: 4.8,
              location: 'Kimihurura, Gasabo',
              verified: true
            }
          },
          quantity: 1
        }
      ],
      subtotal: Math.max(0, tx.amount - 1500),
      deliveryFee: 1500,
      total: tx.amount,
      paymentMethod: tx.paymentMethodLabel as any,
      paymentStatus: tx.status === 'SUCCESSFUL' ? 'Paid' : 'Pending',
      status: tx.status === 'SUCCESSFUL' ? 'Order Confirmed' : 'Order Placed',
      createdAt: tx.createdAt,
      timeline: []
    };
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      {notificationMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-between shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{notificationMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotificationMsg(null)}
            className="hover:opacity-80 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Rwanda Payment Gateway Engine
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mt-1">
            Admin Payments & Settlements
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time ledger for MTN Mobile Money, Airtel Money, Cards & Ishema Wallet with idempotency & webhook verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMomoConsoleOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>MTN MoMo API Console</span>
          </button>

          <button
            type="button"
            onClick={loadData}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Ledger</span>
          </button>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Volume */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider">
              Total Volume
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading font-black text-lg sm:text-xl text-slate-900 font-mono">
            {formatRWF(metrics.totalVolumeRWF)}
          </div>
          <p className="text-[10px] text-slate-500">{metrics.successfulCount} paid transactions</p>
        </div>

        {/* Success Rate */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider">
              Success Rate
            </span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-heading font-black text-lg sm:text-xl text-slate-900 font-mono">
            {metrics.successRatePercent}%
          </div>
          <p className="text-[10px] text-slate-500">{metrics.failedCount} declined / {metrics.refundedCount} refunded</p>
        </div>

        {/* Platform Fees */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider">
              Ishema Take (8%)
            </span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading font-black text-lg sm:text-xl text-amber-600 font-mono">
            {formatRWF(metrics.platformCommissionEarned)}
          </div>
          <p className="text-[10px] text-slate-500">Platform commission</p>
        </div>

        {/* Pending Seller Settlements */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider">
              Seller Payouts
            </span>
            <Building className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="font-heading font-black text-lg sm:text-xl text-indigo-700 font-mono">
            {formatRWF(metrics.totalSellerSettlementPending)}
          </div>
          <p className="text-[10px] text-slate-500">92% Net pending payout</p>
        </div>

        {/* Gateway Security Status */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider">
              Security & Webhooks
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-bold text-xs text-emerald-700 flex items-center gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>HTTPS & HMAC Active</span>
          </div>
          <p className="text-[10px] text-slate-500">Idempotency protection enabled</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by Tx ID, Reference, Customer Name, Phone..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="SUCCESSFUL">SUCCESSFUL</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>

            <select
              value={methodFilter}
              onChange={e => setMethodFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="all">All Methods</option>
              <option value="momo_rwanda">MTN Mobile Money</option>
              <option value="airtel_rwanda">Airtel Money</option>
              <option value="card">Credit / Debit Card</option>
              <option value="ishema_wallet">Ishema Wallet</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Main Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading font-extrabold text-base text-slate-900">
            Payment Transactions ({transactions.length})
          </h3>
          <span className="text-[11px] text-slate-400">
            Authoritative Server State • Never modified client-side
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-heading font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Amount (RWF)</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Gateway Reference</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No transactions match the selected filters.
                  </td>
                </tr>
              ) : (
                transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Tx ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      <div>{tx.id}</div>
                      {tx.orderId && (
                        <div className="text-[10px] text-slate-400 font-normal">Order: #{tx.orderId}</div>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900">
                      {formatRWF(tx.amount)}
                      {tx.sellerSettlement && (
                        <div className="text-[10px] text-slate-400 font-normal">
                          Seller: {formatRWF(tx.sellerSettlement.netSellerPayout)}
                        </div>
                      )}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{tx.customer.fullName}</div>
                      <div className="text-[10px] font-mono text-slate-500">{tx.customer.phone}</div>
                    </td>

                    {/* Method */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-700">
                        {tx.paymentMethod === 'momo_rwanda' && (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
                        {tx.paymentMethod === 'airtel_rwanda' && (
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                        )}
                        {tx.paymentMethod === 'card' && (
                          <CreditCard className="w-3 h-3 text-blue-600" />
                        )}
                        {tx.paymentMethod === 'ishema_wallet' && (
                          <Wallet className="w-3 h-3 text-emerald-600" />
                        )}
                        <span>{tx.paymentMethodLabel}</span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          tx.status === 'SUCCESSFUL'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tx.status === 'PROCESSING'
                            ? 'bg-amber-100 text-amber-800'
                            : tx.status === 'PENDING'
                            ? 'bg-blue-100 text-blue-800'
                            : tx.status === 'FAILED'
                            ? 'bg-rose-100 text-rose-800'
                            : tx.status === 'REFUNDED'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tx.status === 'SUCCESSFUL' && <CheckCircle2 className="w-3 h-3" />}
                        {tx.status === 'PROCESSING' && <Clock className="w-3 h-3 animate-spin" />}
                        {tx.status === 'FAILED' && <XCircle className="w-3 h-3" />}
                        {tx.status === 'REFUNDED' && <RotateCcw className="w-3 h-3" />}
                        <span>{tx.status}</span>
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      <div>{new Date(tx.createdAt).toLocaleDateString()}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Reference */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                      <div>{tx.reference}</div>
                      {tx.providerReference && (
                        <div className="text-[10px] text-slate-400">{tx.providerReference}</div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Server Verify Button */}
                        <button
                          type="button"
                          onClick={() => handleVerifyNow(tx.id)}
                          title="Verify with Gateway"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        {/* MoMo Spec Inspector */}
                        {(tx.paymentMethod === 'momo_rwanda' || tx.paymentMethod === 'airtel_rwanda') && (
                          <button
                            type="button"
                            onClick={() => setSelectedTxForMoMoSpec(tx)}
                            title="Inspect MoMo Open API Payload (MSISDN & Pre-Approval)"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* View Receipt */}
                        <button
                          type="button"
                          onClick={() => setSelectedTxForReceipt(tx)}
                          title="View Official Receipt"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        {/* Simulate Webhook */}
                        <button
                          type="button"
                          onClick={() => setSimTargetTx(tx)}
                          title="Simulate Webhook Event"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>

                        {/* Refund (if successful) */}
                        {tx.status === 'SUCCESSFUL' && (
                          <button
                            type="button"
                            onClick={() => setRefundTargetTx(tx)}
                            title="Refund Payment"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Modal */}
      {refundTargetTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Process Server-Side Refund
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                You are about to refund <strong className="text-slate-900 font-mono">{formatRWF(refundTargetTx.amount)}</strong> back to customer{' '}
                <strong className="text-slate-900">{refundTargetTx.customer.fullName}</strong> ({refundTargetTx.paymentMethodLabel}).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reason for Refund (Recorded in Audit Ledger)
              </label>
              <textarea
                value={refundReason}
                onChange={e => setRefundReason(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRefundTargetTx(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteRefund}
                disabled={isRefunding}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isRefunding ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Confirm Refund</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Simulator Modal */}
      {simTargetTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Payment Webhook Simulator
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Simulate an asynchronous operator webhook callback (MTN Rwanda / Airtel / Bank) for Tx <strong className="text-slate-900 font-mono">{simTargetTx.id}</strong>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Trigger Target Event / Status
              </label>
              <select
                value={simStatus}
                onChange={e => setSimStatus(e.target.value as PaymentState)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="SUCCESSFUL">SUCCESSFUL (charge.completed)</option>
                <option value="FAILED">FAILED (charge.failed - PIN/Balance Error)</option>
                <option value="CANCELLED">CANCELLED (charge.cancelled - USSD dismissed)</option>
                <option value="REFUNDED">REFUNDED (refund.processed)</option>
                <option value="PROCESSING">PROCESSING (charge.in_progress)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Operator Callback Note
              </label>
              <input
                type="text"
                value={simReason}
                onChange={e => setSimReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSimTargetTx(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteWebhookSimulation}
                disabled={isSimulating}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Dispatch Webhook</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Receipt Viewer Modal */}
      {selectedTxForReceipt && (
        <OrderReceiptModal
          isOpen={Boolean(selectedTxForReceipt)}
          onClose={() => setSelectedTxForReceipt(null)}
          order={getOrderForTransaction(selectedTxForReceipt)}
          transaction={selectedTxForReceipt}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 1: MTN MOMO OPEN API TRANSACTION SPEC INSPECTOR */}
      {/* ---------------------------------------------------- */}
      {selectedTxForMoMoSpec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">
                  📱
                </div>
                <div>
                  <h3 className="font-heading font-black text-base text-slate-900">
                    MTN MoMo Open API Spec
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Ref: {selectedTxForMoMoSpec.reference} • TX: {selectedTxForMoMoSpec.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTxForMoMoSpec(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Spec Attributes Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[9px] uppercase font-bold text-amber-800 block">partyIdType</span>
                <span className="font-mono font-black text-amber-950 text-xs">MSISDN</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">payerCurrency</span>
                <span className="font-mono font-black text-slate-900 text-xs">RWF</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">validityTime</span>
                <span className="font-mono font-black text-slate-900 text-xs">300s</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[9px] uppercase font-bold text-emerald-800 block">Current Status</span>
                <span className="font-mono font-black text-emerald-950 text-xs">{selectedTxForMoMoSpec.status}</span>
              </div>
            </div>

            {/* JSON Schema Code View */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Pre-Approval Payload Schema
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const cleanPhone = (selectedTxForMoMoSpec.customer.phone || '').replace(/\D/g, '');
                    const msisdnVal = cleanPhone.startsWith('250') ? cleanPhone : `250${cleanPhone.slice(-9)}`;
                    const jsonPayload = {
                      payer: {
                        partyIdType: 'MSISDN',
                        partyId: msisdnVal
                      },
                      payerCurrency: 'RWF',
                      payerMessage: `Payment of ${selectedTxForMoMoSpec.amount.toLocaleString()} RWF for order ${selectedTxForMoMoSpec.orderId} on Ishema Express`,
                      validityTime: 300
                    };
                    navigator.clipboard.writeText(JSON.stringify(jsonPayload, null, 2));
                    setCopiedSpec(true);
                    setTimeout(() => setCopiedSpec(false), 2000);
                  }}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSpec ? 'Copied!' : 'Copy Schema'}</span>
                </button>
              </div>

              {(() => {
                const cleanPhone = (selectedTxForMoMoSpec.customer.phone || '').replace(/\D/g, '');
                const msisdnVal = cleanPhone.startsWith('250') ? cleanPhone : `250${cleanPhone.slice(-9)}`;
                const jsonPayload = {
                  payer: {
                    partyIdType: 'MSISDN',
                    partyId: msisdnVal
                  },
                  payerCurrency: 'RWF',
                  payerMessage: `Payment of ${selectedTxForMoMoSpec.amount.toLocaleString()} RWF for order ${selectedTxForMoMoSpec.orderId} on Ishema Express`,
                  validityTime: 300
                };
                return (
                  <pre className="p-3 rounded-2xl bg-slate-950 text-amber-400 font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
                    {JSON.stringify(jsonPayload, null, 2)}
                  </pre>
                );
              })()}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Customer Name:</span>
                <span className="font-semibold text-slate-900">{selectedTxForMoMoSpec.customer.fullName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>MSISDN Handset:</span>
                <span className="font-mono font-bold text-slate-900">{selectedTxForMoMoSpec.customer.phone}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Telecom Network Reference:</span>
                <span className="font-mono text-slate-700">{selectedTxForMoMoSpec.providerReference || 'MTN-RW-NET-882'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTxForMoMoSpec(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 2: MTN MOMO OPEN API TESTING & SIMULATION STUDIO */}
      {/* ---------------------------------------------------- */}
      {momoConsoleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5 text-left max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-xs">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg text-slate-900">
                    MTN MoMo API Test Console
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live testing suite for MoMo Pre-Approval & Collection APIs
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMomoConsoleOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setMomoApiTab('preapproval');
                  setMomoConsoleResult(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  momoApiTab === 'preapproval'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Pre-Approval (MSISDN & Validity)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMomoApiTab('requesttopay');
                  setMomoConsoleResult(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  momoApiTab === 'requesttopay'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Collection RequestToPay
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* MSISDN Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    payer.partyId (MSISDN)
                  </label>
                  <input
                    type="text"
                    value={momoTestMsisdn}
                    onChange={e => setMomoTestMsisdn(e.target.value)}
                    placeholder="250788349102"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-slate-400">partyIdType: MSISDN</span>
                </div>

                {/* Amount / Validity */}
                {momoApiTab === 'preapproval' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      validityTime (seconds)
                    </label>
                    <input
                      type="number"
                      value={momoTestValidity}
                      onChange={e => setMomoTestValidity(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-[10px] text-slate-400">Pre-approval expiry window</span>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Amount (RWF)
                    </label>
                    <input
                      type="number"
                      value={momoTestAmount}
                      onChange={e => setMomoTestAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-[10px] text-slate-400">payerCurrency: RWF</span>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  payerMessage (Message to End User)
                </label>
                <input
                  type="text"
                  value={momoTestMessage}
                  onChange={e => setMomoTestMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Live Request Payload Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Request Payload (Transmitted to /api/payments/momo/{momoApiTab})
                </label>
                <pre className="p-3 rounded-2xl bg-slate-950 text-amber-400 font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
                  {momoApiTab === 'preapproval'
                    ? JSON.stringify(
                        {
                          payer: {
                            partyIdType: 'MSISDN',
                            partyId: momoTestMsisdn.replace(/\D/g, '')
                          },
                          payerCurrency: 'RWF',
                          payerMessage: momoTestMessage,
                          validityTime: Number(momoTestValidity) || 300
                        },
                        null,
                        2
                      )
                    : JSON.stringify(
                        {
                          amount: momoTestAmount,
                          currency: 'RWF',
                          externalId: 'ORD-TEST-9921',
                          payer: {
                            partyIdType: 'MSISDN',
                            partyId: momoTestMsisdn.replace(/\D/g, '')
                          },
                          payerMessage: momoTestMessage,
                          payeeNote: 'Ishema Express Open API'
                        },
                        null,
                        2
                      )}
                </pre>
              </div>

              {/* Live Response View */}
              {momoConsoleResult && (
                <div className="space-y-1 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Server & Network Response:</span>
                    <span className="text-[10px] text-emerald-600 font-mono">Status: 201 Created / 202 Accepted</span>
                  </div>
                  <pre className="p-3 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed">
                    {JSON.stringify(momoConsoleResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMomoConsoleOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleExecuteMoMoTest}
                disabled={isExecutingMoMo}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {isExecutingMoMo ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{isExecutingMoMo ? 'Calling Telecom API...' : `Execute ${momoApiTab === 'preapproval' ? 'Pre-Approval' : 'RequestToPay'}`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
