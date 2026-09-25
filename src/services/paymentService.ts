import {
  PaymentTransaction,
  PaymentState,
  PaymentMethodType,
  MtnMoMoPayer,
  MtnMoMoPreApprovalRequest,
  MtnMoMoPreApprovalResponse,
  MtnMoMoRequestToPayRequest
} from '../types';

export interface PaymentInitiationPayload {
  amount: number;
  currency?: 'RWF';
  paymentMethod: PaymentMethodType;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  orderId?: string;
  idempotencyKey?: string;
  type?: 'order_payment' | 'wallet_topup' | 'courier_booking';
  cardDetails?: {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
  };
  sellerName?: string;
}

export interface PaymentInitiationResponse {
  success: boolean;
  transaction: PaymentTransaction;
  ussdPromptInstruction?: string;
  verifyUrl?: string;
  status: PaymentState;
  momoApiPayload?: {
    payer: MtnMoMoPayer;
    payerCurrency: string;
    payerMessage: string;
    validityTime: number;
    requestToPay: MtnMoMoRequestToPayRequest;
  };
  error?: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  transactionId: string;
  status: PaymentState;
  isPaid: boolean;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethodType;
  paymentMethodLabel: string;
  orderId?: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  reference: string;
  verifiedAt?: string;
  sellerSettlement?: any;
  transaction: PaymentTransaction;
  error?: string;
}

// Fetch public payment configuration
export async function fetchPaymentConfig() {
  const res = await fetch('/api/payments/config');
  if (!res.ok) throw new Error('Failed to load payment configuration');
  return res.json();
}

// Initiate payment server-side with idempotency
export async function initiatePayment(payload: PaymentInitiationPayload): Promise<PaymentInitiationResponse> {
  const idempotencyKey = payload.idempotencyKey || `idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const res = await fetch('/api/payments/initiate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey
    },
    body: JSON.stringify({
      ...payload,
      idempotencyKey
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Payment initiation failed');
  }
  return data;
}

// Verify payment server-side (authoritative)
export async function verifyPayment(transactionId: string): Promise<PaymentVerificationResponse> {
  const res = await fetch(`/api/payments/verify/${encodeURIComponent(transactionId)}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Payment verification failed');
  }
  return data;
}

// Poll payment status until final state or timeout
export async function pollPaymentVerification(
  transactionId: string,
  onProgress?: (tx: PaymentTransaction) => void,
  maxAttempts = 15,
  intervalMs = 1800
): Promise<PaymentTransaction> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await verifyPayment(transactionId);
      if (res.transaction) {
        if (onProgress) onProgress(res.transaction);

        if (res.transaction.status === 'SUCCESSFUL') {
          return res.transaction;
        }
        if (res.transaction.status === 'FAILED' || res.transaction.status === 'CANCELLED') {
          throw new Error(res.transaction.failureReason || `Payment ${res.transaction.status.toLowerCase()}`);
        }
      }
    } catch (err: any) {
      if (err.message && (err.message.includes('declined') || err.message.includes('failed') || err.message.includes('cancelled'))) {
        throw err;
      }
      console.warn(`Polling attempt ${attempt + 1} warning:`, err);
    }

    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  // Final check
  const finalCheck = await verifyPayment(transactionId);
  return finalCheck.transaction;
}

// Admin: fetch all transactions
export async function fetchAdminTransactions(params?: { status?: string; paymentMethod?: string; search?: string }) {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.paymentMethod && params.paymentMethod !== 'all') query.set('paymentMethod', params.paymentMethod);
  if (params?.search) query.set('search', params.search);

  const res = await fetch(`/api/payments/transactions?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

// Admin: refund transaction
export async function refundPaymentTransaction(transactionId: string, reason: string) {
  const res = await fetch('/api/payments/refund', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transactionId, reason })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Refund failed');
  return data;
}

// Admin: simulate webhook event
export async function simulatePaymentWebhook(transactionId: string, targetStatus: PaymentState, reason?: string) {
  const res = await fetch('/api/payments/simulate-webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transactionId, targetStatus, reason })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Webhook simulation failed');
  return data;
}

// ----------------------------------------------------
// MTN MOMO OPEN API CLIENT SERVICES
// ----------------------------------------------------

// Submit MTN MoMo Pre-Approval Request
export async function submitMtnMoMoPreApproval(
  payload: MtnMoMoPreApprovalRequest
): Promise<MtnMoMoPreApprovalResponse> {
  const res = await fetch('/api/payments/momo/preapproval', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit MoMo Pre-Approval');
  return data;
}

// Query MTN MoMo Pre-Approval Status
export async function fetchMtnMoMoPreApproval(
  preapprovalId: string
): Promise<MtnMoMoPreApprovalResponse> {
  const res = await fetch(`/api/payments/momo/preapproval/${encodeURIComponent(preapprovalId)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch MoMo Pre-Approval');
  return data;
}

// Submit MTN MoMo Request to Pay (Collection)
export async function submitMtnMoMoRequestToPay(
  payload: MtnMoMoRequestToPayRequest,
  referenceId?: string
) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (referenceId) {
    headers['X-Reference-Id'] = referenceId;
  }

  const res = await fetch('/api/payments/momo/requesttopay', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit MoMo RequestToPay');
  return data;
}

// Query MTN MoMo Request to Pay Status
export async function fetchMtnMoMoRequestToPay(referenceId: string) {
  const res = await fetch(`/api/payments/momo/requesttopay/${encodeURIComponent(referenceId)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to query MoMo RequestToPay');
  return data;
}

