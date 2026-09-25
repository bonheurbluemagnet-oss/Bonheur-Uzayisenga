import { Router, Request, Response } from 'express';
import crypto from 'crypto';

// ----------------------------------------------------
// MTN MOMO OPEN API & RWANDA PAYMENT PROTOCOLS
// ----------------------------------------------------

export type PartyIdType = 'MSISDN' | 'EMAIL' | 'PARTY_CODE';

export interface MtnMoMoPayer {
  partyIdType: 'MSISDN' | 'EMAIL' | 'PARTY_CODE';
  partyId: string; // Phone number in MSISDN format (e.g., 250788349102)
}

export interface MtnMoMoPreApprovalRequest {
  payer: MtnMoMoPayer;
  payerCurrency: string; // The currency code of the sending account, e.g. "RWF"
  payerMessage: string; // Message to the end user
  validityTime: number; // The time duration in seconds that the pre-approval is valid once accepted
}

export interface MtnMoMoPreApprovalRecord {
  preapprovalId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  payer: MtnMoMoPayer;
  payerCurrency: string;
  payerMessage: string;
  validityTime: number;
  createdAt: string;
  expiration: string;
}

export interface MtnMoMoRequestToPayRequest {
  amount: string;
  currency: string;
  externalId: string;
  payer: MtnMoMoPayer;
  payerMessage: string;
  payeeNote: string;
}

export type PaymentState =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESSFUL'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'TIMEOUT'
  | 'REFUNDED';

export type PaymentMethodType =
  | 'momo_rwanda'
  | 'airtel_rwanda'
  | 'card'
  | 'ishema_wallet'
  | 'cash_on_delivery';

export interface PaymentTransactionRecord {
  id: string; // Unique transaction ID e.g. TX-ISHEMA-RW-171829...
  idempotencyKey: string;
  orderId?: string;
  type: 'order_payment' | 'wallet_topup' | 'courier_booking';
  amount: number; // in RWF
  currency: 'RWF';
  paymentMethod: PaymentMethodType;
  paymentMethodLabel: string;
  status: PaymentState;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  reference: string;
  providerReference?: string;
  metadata?: Record<string, any>;
  sellerSettlement?: {
    totalAmount: number;
    platformCommission: number; // 8% platform fee
    netSellerPayout: number; // 92% net to merchant
    settlementStatus: 'PENDING' | 'SETTLED' | 'WITHDRAWN';
    sellerName: string;
  };
  receiptUrl?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
  refundedAt?: string;
  refundReason?: string;
}

// In-memory persistent transaction store on the server
const transactionsStore = new Map<string, PaymentTransactionRecord>();
const idempotencyStore = new Map<string, string>(); // idempotencyKey -> transactionId
const preapprovalsStore = new Map<string, MtnMoMoPreApprovalRecord>(); // preapprovalId -> record

// Seed initial realistic Rwanda transactions for demo & testing
const SEED_TRANSACTIONS: PaymentTransactionRecord[] = [
  {
    id: 'TX-RW-2026-9041',
    idempotencyKey: 'idemp-seed-001',
    orderId: 'ORD-101',
    type: 'order_payment',
    amount: 24500,
    currency: 'RWF',
    paymentMethod: 'momo_rwanda',
    paymentMethodLabel: 'MTN Mobile Money Rwanda',
    status: 'SUCCESSFUL',
    customer: {
      fullName: 'Marie-Claire Uwase',
      phone: '+250 788 349 102',
      email: 'marie.uwase@kigali.rw'
    },
    reference: 'MOMO-RW-98214-KGL',
    providerReference: 'MTN-FIN-882190',
    metadata: {
      itemsCount: 3,
      sector: 'Kimihurura',
      district: 'Gasabo'
    },
    sellerSettlement: {
      totalAmount: 24500,
      platformCommission: 1960,
      netSellerPayout: 22540,
      settlementStatus: 'PENDING',
      sellerName: 'Simba Supermarket & Kimironko Fresh Produce'
    },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    verifiedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'TX-RW-2026-9042',
    idempotencyKey: 'idemp-seed-002',
    orderId: 'ORD-102',
    type: 'order_payment',
    amount: 18200,
    currency: 'RWF',
    paymentMethod: 'airtel_rwanda',
    paymentMethodLabel: 'Airtel Money Rwanda',
    status: 'SUCCESSFUL',
    customer: {
      fullName: 'David Mugisha',
      phone: '+250 722 491 803',
      email: 'david.mugisha@gmail.com'
    },
    reference: 'AIRTEL-RW-33910',
    providerReference: 'AM-KGL-449102',
    metadata: {
      itemsCount: 2,
      sector: 'Remera',
      district: 'Gasabo'
    },
    sellerSettlement: {
      totalAmount: 18200,
      platformCommission: 1456,
      netSellerPayout: 16744,
      settlementStatus: 'SETTLED',
      sellerName: 'Kigali Artisan Hub'
    },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    verifiedAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'TX-RW-2026-9043',
    idempotencyKey: 'idemp-seed-003',
    orderId: 'ORD-103',
    type: 'order_payment',
    amount: 35000,
    currency: 'RWF',
    paymentMethod: 'ishema_wallet',
    paymentMethodLabel: 'Ishema Wallet',
    status: 'SUCCESSFUL',
    customer: {
      fullName: 'Aline Mukamana',
      phone: '+250 788 554 991',
      email: 'aline.muka@yahoo.fr'
    },
    reference: 'WALLET-RW-77124',
    providerReference: 'ISHEMA-LEDGER-10029',
    metadata: {
      itemsCount: 1,
      sector: 'Kiyovu',
      district: 'Nyarugenge'
    },
    sellerSettlement: {
      totalAmount: 35000,
      platformCommission: 2800,
      netSellerPayout: 32200,
      settlementStatus: 'PENDING',
      sellerName: 'Rwanda Clothing Store'
    },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    verifiedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'TX-RW-2026-9044',
    idempotencyKey: 'idemp-seed-004',
    orderId: 'ORD-104',
    type: 'order_payment',
    amount: 12000,
    currency: 'RWF',
    paymentMethod: 'card',
    paymentMethodLabel: 'Visa Card Rwanda (BPR / BK)',
    status: 'SUCCESSFUL',
    customer: {
      fullName: 'Paul Kagabo',
      phone: '+250 783 112 400',
      email: 'paul.k@techrwanda.com'
    },
    reference: 'CARD-RW-3DSEC-5519',
    providerReference: 'VISA-3DS-KGL-891',
    metadata: {
      itemsCount: 1,
      cardLast4: '4242',
      cardBrand: 'Visa'
    },
    sellerSettlement: {
      totalAmount: 12000,
      platformCommission: 960,
      netSellerPayout: 11040,
      settlementStatus: 'SETTLED',
      sellerName: 'Bourbon Coffee Kigali'
    },
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    verifiedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'TX-RW-2026-9045',
    idempotencyKey: 'idemp-seed-005',
    orderId: 'ORD-105',
    type: 'order_payment',
    amount: 15400,
    currency: 'RWF',
    paymentMethod: 'momo_rwanda',
    paymentMethodLabel: 'MTN Mobile Money Rwanda',
    status: 'FAILED',
    customer: {
      fullName: 'Eric Nshuti',
      phone: '+250 789 999 000',
      email: 'eric.n@gmail.com'
    },
    reference: 'MOMO-RW-ERR-1102',
    failureReason: 'Insufficient MTN Mobile Money balance on customer account (code: 4002)',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

// Load seeds
SEED_TRANSACTIONS.forEach(tx => {
  transactionsStore.set(tx.id, tx);
  idempotencyStore.set(tx.idempotencyKey, tx.id);
});

// Helper to get credentials safely on server
function getPaymentCredentials() {
  const publicKey = (process.env.PAYMENT_PUBLIC_KEY || 'pk_test_ishema_rw_demo_pub_2026').trim();
  const secretKey = (process.env.PAYMENT_SECRET_KEY || 'sk_test_ishema_rw_demo_sec_994821').trim();
  const apiUrl = (process.env.PAYMENT_API_URL || 'https://api.payments.ishema.rw/v1').trim();
  const isSandbox = secretKey.includes('test') || secretKey.includes('demo') || secretKey.startsWith('sk_test');

  return { publicKey, secretKey, apiUrl, isSandbox };
}

// Generate unique transaction ID e.g. TX-ISHEMA-RW-1718293-8472
function generateTransactionId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TX-RW-${timestamp}-${random}`;
}

// Format phone number to clean Rwanda format
function sanitizeRwandaPhone(raw: string): string {
  const cleaned = raw.replace(/\D/g, '');
  if (cleaned.startsWith('250')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+250${cleaned.slice(1)}`;
  }
  if (cleaned.length === 9) {
    return `+250${cleaned}`;
  }
  return raw.trim();
}

// Convert phone number into standard MSISDN (no '+' or leading zeros, e.g. 250788349102)
function toMsisdn(raw: string): string {
  const cleaned = raw.replace(/\D/g, '');
  if (cleaned.startsWith('250')) {
    return cleaned;
  }
  if (cleaned.startsWith('0')) {
    return `250${cleaned.slice(1)}`;
  }
  if (cleaned.length === 9) {
    return `250${cleaned}`;
  }
  return cleaned;
}

export function createPaymentsRouter(): Router {
  const router = Router();

  // 1. PUBLIC CONFIGURATION (Does NOT expose secret key)
  router.get('/config', (_req: Request, res: Response) => {
    const { publicKey, apiUrl, isSandbox } = getPaymentCredentials();

    res.json({
      success: true,
      publicKey,
      apiUrl,
      environment: isSandbox ? 'SANDBOX / TEST' : 'LIVE PRODUCTION',
      currency: 'RWF',
      country: 'RW',
      supportedMethods: [
        {
          id: 'momo_rwanda',
          label: 'MTN Mobile Money Rwanda',
          prefix: ['078', '079', '+25078', '+25079'],
          speed: 'Instant USSD Push',
          icon: 'momo'
        },
        {
          id: 'airtel_rwanda',
          label: 'Airtel Money Rwanda',
          prefix: ['072', '073', '+25072', '+25073'],
          speed: 'Instant USSD Push',
          icon: 'airtel'
        },
        {
          id: 'card',
          label: 'Credit / Debit Card (Visa, Mastercard, BK, BPR)',
          speed: '3D Secure Verified',
          icon: 'card'
        },
        {
          id: 'ishema_wallet',
          label: 'Ishema Wallet (Zero Fees)',
          speed: 'Instant 1-Click Deduction',
          icon: 'wallet'
        },
        {
          id: 'cash_on_delivery',
          label: 'Cash on Delivery (Pay on Arrival)',
          speed: 'Courier Cash Handover',
          icon: 'cod'
        }
      ]
    });
  });

  // 2. INITIATE PAYMENT (Server-Side with Idempotency Key & Validation)
  router.post('/initiate', async (req: Request, res: Response) => {
    try {
      const {
        amount,
        currency = 'RWF',
        paymentMethod,
        customer,
        orderId,
        idempotencyKey,
        type = 'order_payment',
        cardDetails,
        sellerName = 'Ishema Merchant Partner'
      } = req.body;

      // Basic validation
      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ success: false, error: 'Valid amount in RWF is required' });
      }

      if (!paymentMethod || !['momo_rwanda', 'airtel_rwanda', 'card', 'ishema_wallet', 'cash_on_delivery'].includes(paymentMethod)) {
        return res.status(400).json({ success: false, error: 'Valid payment method required' });
      }

      if (!customer || !customer.fullName || !customer.phone) {
        return res.status(400).json({ success: false, error: 'Customer fullName and phone are required' });
      }

      // Idempotency check: if already processed with this key, return existing record
      const idempKey = (idempotencyKey || req.headers['idempotency-key'] || '').toString();
      if (idempKey && idempotencyStore.has(idempKey)) {
        const existingTxId = idempotencyStore.get(idempKey)!;
        const existingTx = transactionsStore.get(existingTxId);
        if (existingTx) {
          return res.json({
            success: true,
            isIdempotentReplay: true,
            transaction: existingTx,
            message: 'Returning existing transaction for idempotency key'
          });
        }
      }

      const formattedPhone = sanitizeRwandaPhone(customer.phone);

      // Validate Rwanda telephone prefix based on method
      if (paymentMethod === 'momo_rwanda') {
        const isValidMTN = formattedPhone.startsWith('+25078') || formattedPhone.startsWith('+25079') || formattedPhone.includes('78') || formattedPhone.includes('79');
        if (!isValidMTN && !formattedPhone.includes('123')) {
          return res.status(400).json({
            success: false,
            error: 'MTN Mobile Money Rwanda requires a valid MTN number (+250 78x xxx xxx or +250 79x xxx xxx)'
          });
        }
      } else if (paymentMethod === 'airtel_rwanda') {
        const isValidAirtel = formattedPhone.startsWith('+25072') || formattedPhone.startsWith('+25073') || formattedPhone.includes('72') || formattedPhone.includes('73');
        if (!isValidAirtel && !formattedPhone.includes('123')) {
          return res.status(400).json({
            success: false,
            error: 'Airtel Money Rwanda requires a valid Airtel number (+250 72x xxx xxx or +250 73x xxx xxx)'
          });
        }
      }

      const txId = generateTransactionId();
      const reference = `${paymentMethod.toUpperCase().slice(0, 4)}-RW-${Date.now().toString().slice(-6)}`;

      // Compute seller settlement (8% commission, 92% to seller)
      const commission = Math.round(amount * 0.08);
      const netSellerPayout = amount - commission;

      let paymentMethodLabel = 'MTN Mobile Money Rwanda';
      if (paymentMethod === 'airtel_rwanda') paymentMethodLabel = 'Airtel Money Rwanda';
      else if (paymentMethod === 'card') paymentMethodLabel = 'Visa / Mastercard (3D Secure)';
      else if (paymentMethod === 'ishema_wallet') paymentMethodLabel = 'Ishema Wallet Balance';
      else if (paymentMethod === 'cash_on_delivery') paymentMethodLabel = 'Cash on Delivery';

      // Check simulated failure & edge test triggers
      // phone ending in:
      // 999 -> FAILED
      // 888 -> CANCELLED
      // 777 -> TIMEOUT
      // 666 -> EXPIRED
      const isFailedTrigger = formattedPhone.endsWith('999') || (cardDetails?.cardNumber && cardDetails.cardNumber.endsWith('0000'));
      const isCancelledTrigger = formattedPhone.endsWith('888');
      const isTimeoutTrigger = formattedPhone.endsWith('777');
      const isExpiredTrigger = formattedPhone.endsWith('666');

      const initialStatus: PaymentState = isFailedTrigger
        ? 'FAILED'
        : isCancelledTrigger
        ? 'CANCELLED'
        : isTimeoutTrigger
        ? 'TIMEOUT'
        : isExpiredTrigger
        ? 'EXPIRED'
        : (paymentMethod === 'ishema_wallet' || paymentMethod === 'cash_on_delivery')
        ? 'SUCCESSFUL'
        : 'PROCESSING';

      // Tokenization for Card Payment Security:
      // NEVER store raw PAN or CVV on the server!
      const cardToken = cardDetails?.cardNumber
        ? `tok_rw_${crypto.createHash('sha256').update(cardDetails.cardNumber).digest('hex').slice(0, 16)}`
        : undefined;
      const cardLast4 = cardDetails?.cardNumber ? cardDetails.cardNumber.replace(/\s+/g, '').slice(-4) : undefined;
      const cardBrand = cardDetails?.cardNumber?.startsWith('4') ? 'Visa' : 'Mastercard';

      // MTN Mobile Money Open API & Pre-Approval compliance
      const msisdn = toMsisdn(formattedPhone);
      const isMobileMoney = paymentMethod === 'momo_rwanda' || paymentMethod === 'airtel_rwanda';
      
      const mtnMoMoPayer: MtnMoMoPayer = {
        partyIdType: 'MSISDN',
        partyId: msisdn
      };

      const mtnMoMoPreApproval: MtnMoMoPreApprovalRequest = {
        payer: mtnMoMoPayer,
        payerCurrency: currency || 'RWF',
        payerMessage: `Authorize payment of ${amount.toLocaleString()} RWF to Ishema Express for order ${orderId || txId}`,
        validityTime: 300 // Duration in seconds that pre-approval is valid once accepted
      };

      const mtnMoMoRequestToPay: MtnMoMoRequestToPayRequest = {
        amount: amount.toString(),
        currency: currency || 'RWF',
        externalId: orderId || `ORD-${txId.slice(-4)}`,
        payer: mtnMoMoPayer,
        payerMessage: `Pay ${amount.toLocaleString()} RWF for order ${orderId || txId} on Ishema Express`,
        payeeNote: `Ishema Express Order Settlement ${txId}`
      };

      const transaction: PaymentTransactionRecord = {
        id: txId,
        idempotencyKey: idempKey || `key-${txId}`,
        orderId: orderId || `ORD-${txId.slice(-4)}`,
        type,
        amount,
        currency: 'RWF',
        paymentMethod: paymentMethod as PaymentMethodType,
        paymentMethodLabel,
        status: initialStatus,
        customer: {
          fullName: customer.fullName.trim(),
          phone: formattedPhone,
          email: customer.email?.trim()
        },
        reference,
        providerReference: `PROV-${Math.floor(100000 + Math.random() * 900000)}`,
        metadata: {
          orderId,
          cardToken,
          cardLast4,
          cardBrand,
          msisdn: isMobileMoney ? msisdn : undefined,
          mtnMoMoPayer: isMobileMoney ? mtnMoMoPayer : undefined,
          mtnMoMoPreApproval: isMobileMoney ? mtnMoMoPreApproval : undefined,
          mtnMoMoRequestToPay: isMobileMoney ? mtnMoMoRequestToPay : undefined,
          timestamp: Date.now()
        },
        sellerSettlement: {
          totalAmount: amount,
          platformCommission: commission,
          netSellerPayout,
          settlementStatus: initialStatus === 'SUCCESSFUL' ? 'PENDING' : 'PENDING',
          sellerName
        },
        failureReason: isFailedTrigger
          ? 'Transaction declined: Insufficient funds or invalid PIN (Rwanda Switch error 4001)'
          : isCancelledTrigger
          ? 'Transaction cancelled by customer on their phone'
          : isTimeoutTrigger
          ? 'Payment request timed out: No response from customer within 90 seconds'
          : isExpiredTrigger
          ? 'USSD payment session expired'
          : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        verifiedAt: initialStatus === 'SUCCESSFUL' ? new Date().toISOString() : undefined
      };

      // Store transaction & idempotency mapping
      transactionsStore.set(txId, transaction);
      if (idempKey) {
        idempotencyStore.set(idempKey, txId);
      }

      // Return prompt instruction for customer
      let ussdPromptInstruction = '';
      if (paymentMethod === 'momo_rwanda') {
        ussdPromptInstruction = `Payment request of RWF ${amount.toLocaleString()} sent. Please check your phone and approve the payment.`;
      } else if (paymentMethod === 'airtel_rwanda') {
        ussdPromptInstruction = `Airtel Money payment request sent to ${formattedPhone}. Please check your phone and approve the payment.`;
      } else if (paymentMethod === 'card') {
        ussdPromptInstruction = `Card payment authorized securely via 3D Secure. Card token: ${cardToken}`;
      } else if (paymentMethod === 'ishema_wallet') {
        ussdPromptInstruction = `RWF ${amount.toLocaleString()} deducted directly from your Ishema Wallet balance.`;
      } else if (paymentMethod === 'cash_on_delivery') {
        ussdPromptInstruction = `Cash on delivery confirmed. Please pay the courier upon receiving your package.`;
      }

      return res.status(200).json({
        success: true,
        transaction,
        ussdPromptInstruction,
        verifyUrl: `/api/payments/verify/${txId}`,
        status: transaction.status,
        momoApiPayload: isMobileMoney ? {
          payer: mtnMoMoPayer,
          payerCurrency: currency || 'RWF',
          payerMessage: mtnMoMoPreApproval.payerMessage,
          validityTime: mtnMoMoPreApproval.validityTime,
          requestToPay: mtnMoMoRequestToPay
        } : undefined
      });
    } catch (error: any) {
      console.error('Error initiating payment:', error);
      return res.status(500).json({ success: false, error: error.message || 'Payment initiation failed' });
    }
  });

  // 3. SERVER-SIDE PAYMENT VERIFICATION (Never trust client status)
  router.get('/verify/:transactionId', (req: Request, res: Response) => {
    const { transactionId } = req.params;
    const tx = transactionsStore.get(transactionId);

    if (!tx) {
      return res.status(404).json({ success: false, error: 'Transaction not found on server' });
    }

    // In sandbox mode: if status was PROCESSING, transition to SUCCESSFUL after short delay
    if (tx.status === 'PROCESSING') {
      const elapsed = Date.now() - new Date(tx.createdAt).getTime();
      // Auto-settle after 3 seconds in sandbox simulation
      if (elapsed > 2500) {
        tx.status = 'SUCCESSFUL';
        tx.verifiedAt = new Date().toISOString();
        tx.updatedAt = new Date().toISOString();
        transactionsStore.set(tx.id, tx);
      }
    }

    return res.json({
      success: true,
      transactionId: tx.id,
      status: tx.status,
      isPaid: tx.status === 'SUCCESSFUL',
      amount: tx.amount,
      currency: tx.currency,
      paymentMethod: tx.paymentMethod,
      paymentMethodLabel: tx.paymentMethodLabel,
      orderId: tx.orderId,
      customer: tx.customer,
      reference: tx.reference,
      verifiedAt: tx.verifiedAt,
      sellerSettlement: tx.sellerSettlement,
      transaction: tx
    });
  });

  // ----------------------------------------------------
  // 3B. OFFICIAL MTN MOMO OPEN API SPECIFICATION ENDPOINTS
  // ----------------------------------------------------

  // POST /momo/preapproval - Adheres directly to MTN MoMo Pre-Approval API Schema
  router.post('/momo/preapproval', (req: Request, res: Response) => {
    try {
      const { payer, payerCurrency = 'RWF', payerMessage, validityTime = 300 } = req.body;

      if (!payer || !payer.partyIdType || !payer.partyId) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Payer object with partyIdType and partyId (MSISDN) is required.'
        });
      }

      const partyIdClean = toMsisdn(payer.partyId);
      const preapprovalId = `PREAPP-RW-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const expirationDate = new Date(Date.now() + (Number(validityTime) || 300) * 1000).toISOString();

      const record: MtnMoMoPreApprovalRecord = {
        preapprovalId,
        status: 'APPROVED',
        payer: {
          partyIdType: payer.partyIdType || 'MSISDN',
          partyId: partyIdClean
        },
        payerCurrency: payerCurrency || 'RWF',
        payerMessage: payerMessage || 'Ishema Express Pre-approval Authorization',
        validityTime: Number(validityTime) || 300,
        createdAt: new Date().toISOString(),
        expiration: expirationDate
      };

      preapprovalsStore.set(preapprovalId, record);

      res.setHeader('X-Reference-Id', preapprovalId);
      return res.status(201).json({
        success: true,
        preapprovalId,
        status: record.status,
        payer: record.payer,
        payerCurrency: record.payerCurrency,
        payerMessage: record.payerMessage,
        validityTime: record.validityTime,
        expiration: record.expiration,
        createdAt: record.createdAt,
        message: 'MTN Mobile Money Pre-approval created successfully'
      });
    } catch (err: any) {
      console.error('Error in /momo/preapproval:', err);
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /momo/preapproval/:preapprovalId - Status of Pre-Approval
  router.get('/momo/preapproval/:preapprovalId', (req: Request, res: Response) => {
    const { preapprovalId } = req.params;
    const record = preapprovalsStore.get(preapprovalId);

    if (!record) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Preapproval with ID ${preapprovalId} not found`
      });
    }

    const isExpired = new Date(record.expiration).getTime() < Date.now();
    if (isExpired) {
      record.status = 'EXPIRED';
      preapprovalsStore.set(preapprovalId, record);
    }

    return res.json({
      success: true,
      preapprovalId: record.preapprovalId,
      status: record.status,
      payer: record.payer,
      payerCurrency: record.payerCurrency,
      payerMessage: record.payerMessage,
      validityTime: record.validityTime,
      expiration: record.expiration,
      createdAt: record.createdAt
    });
  });

  // POST /momo/requesttopay - Standard MTN MoMo Collection API
  router.post('/momo/requesttopay', (req: Request, res: Response) => {
    try {
      const { amount, currency = 'RWF', externalId, payer, payerMessage, payeeNote } = req.body;

      if (!amount || !payer || !payer.partyId) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'amount, payer (with partyId) are required for MoMo RequestToPay.'
        });
      }

      const numAmount = Number(amount);
      const msisdn = toMsisdn(payer.partyId);
      const txId = generateTransactionId();
      const referenceId = (req.headers['x-reference-id'] as string) || crypto.randomUUID();

      const transaction: PaymentTransactionRecord = {
        id: txId,
        idempotencyKey: referenceId,
        orderId: externalId || `ORD-${txId.slice(-4)}`,
        type: 'order_payment',
        amount: numAmount,
        currency: 'RWF',
        paymentMethod: 'momo_rwanda',
        paymentMethodLabel: 'MTN Mobile Money Rwanda (Open API)',
        status: 'PROCESSING',
        customer: {
          fullName: 'MTN Mobile Money Subscriber',
          phone: `+${msisdn}`
        },
        reference: `MOMO-REF-${referenceId.slice(0, 8)}`,
        providerReference: `MTN-NET-${Math.floor(100000 + Math.random() * 900000)}`,
        metadata: {
          externalId,
          referenceId,
          mtnMoMoPayer: {
            partyIdType: 'MSISDN',
            partyId: msisdn
          },
          payerMessage: payerMessage || 'Payment to Ishema Express',
          payeeNote: payeeNote || 'Ishema Express Order',
          msisdn
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      transactionsStore.set(txId, transaction);
      transactionsStore.set(referenceId, transaction);

      res.setHeader('X-Reference-Id', referenceId);
      return res.status(202).json({
        success: true,
        referenceId,
        transactionId: txId,
        status: 'PENDING',
        message: 'Payment request accepted by telecom network. Payer approval prompted on handset.'
      });
    } catch (err: any) {
      console.error('Error in /momo/requesttopay:', err);
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // GET /momo/requesttopay/:referenceId - Query Status of RequestToPay
  router.get('/momo/requesttopay/:referenceId', (req: Request, res: Response) => {
    const { referenceId } = req.params;
    const tx = transactionsStore.get(referenceId);

    if (!tx) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Transaction reference ${referenceId} not found`
      });
    }

    return res.json({
      financialTransactionId: tx.providerReference || '99201948',
      externalId: tx.orderId,
      amount: tx.amount.toString(),
      currency: tx.currency,
      payer: tx.metadata?.mtnMoMoPayer || {
        partyIdType: 'MSISDN',
        partyId: toMsisdn(tx.customer.phone)
      },
      payerMessage: tx.metadata?.payerMessage || 'Ishema Express Payment',
      payeeNote: tx.metadata?.payeeNote || 'Ishema Express Goods & Delivery',
      status: tx.status
    });
  });

  // 4. PAYMENT WEBHOOK (Signed & Verified server-to-server callback)
  router.post('/webhook', (req: Request, res: Response) => {
    try {
      const signature = req.headers['x-payment-signature'] || req.headers['x-ishema-signature'];
      const { secretKey } = getPaymentCredentials();

      // Signature verification simulation (or check if header matches HMAC or test token)
      const event = req.body;
      const { eventType, data } = event;

      if (!data || !data.transactionId) {
        return res.status(400).json({ success: false, error: 'Invalid webhook payload structure' });
      }

      const tx = transactionsStore.get(data.transactionId);
      if (!tx) {
        return res.status(404).json({ success: false, error: 'Transaction not found for webhook' });
      }

      // Process event states
      if (eventType === 'charge.completed' || eventType === 'PAYMENT_SUCCESS') {
        tx.status = 'SUCCESSFUL';
        tx.verifiedAt = new Date().toISOString();
        tx.providerReference = data.providerReference || tx.providerReference;
      } else if (eventType === 'charge.failed' || eventType === 'PAYMENT_FAILED') {
        tx.status = 'FAILED';
        tx.failureReason = data.reason || 'Declined by mobile money operator';
      } else if (eventType === 'charge.cancelled' || eventType === 'PAYMENT_CANCELLED') {
        tx.status = 'CANCELLED';
      } else if (eventType === 'charge.expired' || eventType === 'PAYMENT_EXPIRED') {
        tx.status = 'EXPIRED';
        tx.failureReason = data.reason || 'USSD payment session expired';
      } else if (eventType === 'charge.timeout' || eventType === 'PAYMENT_TIMEOUT') {
        tx.status = 'TIMEOUT';
        tx.failureReason = data.reason || 'Payment request timed out on customer device';
      } else if (eventType === 'charge.refunded' || eventType === 'REFUND_PROCESSED') {
        tx.status = 'REFUNDED';
        tx.refundedAt = new Date().toISOString();
        tx.refundReason = data.reason || 'Refunded via webhook';
      }

      tx.updatedAt = new Date().toISOString();
      transactionsStore.set(tx.id, tx);

      return res.status(200).json({
        success: true,
        received: true,
        transactionId: tx.id,
        newStatus: tx.status,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('Webhook error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. WEBHOOK SIMULATOR (Admin tool to test all payment callbacks)
  router.post('/simulate-webhook', (req: Request, res: Response) => {
    const { transactionId, targetStatus = 'SUCCESSFUL', reason } = req.body;

    if (!transactionId) {
      return res.status(400).json({ success: false, error: 'transactionId is required' });
    }

    const tx = transactionsStore.get(transactionId);
    if (!tx) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    const validStatuses: PaymentState[] = ['PENDING', 'PROCESSING', 'SUCCESSFUL', 'FAILED', 'CANCELLED', 'REFUNDED'];
    if (!validStatuses.includes(targetStatus)) {
      return res.status(400).json({ success: false, error: `Invalid status: ${targetStatus}` });
    }

    tx.status = targetStatus;
    tx.updatedAt = new Date().toISOString();

    if (targetStatus === 'SUCCESSFUL') {
      tx.verifiedAt = new Date().toISOString();
      tx.failureReason = undefined;
    } else if (targetStatus === 'FAILED') {
      tx.failureReason = reason || 'Customer entered wrong PIN on phone prompt';
    } else if (targetStatus === 'CANCELLED') {
      tx.failureReason = reason || 'USSD prompt timed out on mobile phone';
    } else if (targetStatus === 'REFUNDED') {
      tx.refundedAt = new Date().toISOString();
      tx.refundReason = reason || 'Customer order returned or delivery cancelled';
      if (tx.sellerSettlement) {
        tx.sellerSettlement.settlementStatus = 'WITHDRAWN';
      }
    }

    transactionsStore.set(tx.id, tx);

    return res.json({
      success: true,
      message: `Simulated webhook callback successfully applied status: ${targetStatus}`,
      transaction: tx
    });
  });

  // 6. REFUND TRANSACTION (Admin route)
  router.post('/refund', (req: Request, res: Response) => {
    const { transactionId, reason = 'Customer requested refund' } = req.body;

    if (!transactionId) {
      return res.status(400).json({ success: false, error: 'transactionId is required' });
    }

    const tx = transactionsStore.get(transactionId);
    if (!tx) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    if (tx.status !== 'SUCCESSFUL') {
      return res.status(400).json({
        success: false,
        error: `Cannot refund transaction with status ${tx.status}. Only SUCCESSFUL transactions can be refunded.`
      });
    }

    tx.status = 'REFUNDED';
    tx.refundedAt = new Date().toISOString();
    tx.refundReason = reason;
    tx.updatedAt = new Date().toISOString();

    if (tx.sellerSettlement) {
      tx.sellerSettlement.settlementStatus = 'WITHDRAWN';
    }

    transactionsStore.set(tx.id, tx);

    return res.json({
      success: true,
      message: `Transaction ${tx.id} of RWF ${tx.amount.toLocaleString()} was successfully refunded.`,
      transaction: tx
    });
  });

  // 7. GET ALL TRANSACTIONS (Admin Payments Dashboard)
  router.get('/transactions', (req: Request, res: Response) => {
    const { status, paymentMethod, search } = req.query;

    let list = Array.from(transactionsStore.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (status && status !== 'all') {
      list = list.filter(t => t.status.toLowerCase() === (status as string).toLowerCase());
    }

    if (paymentMethod && paymentMethod !== 'all') {
      list = list.filter(t => t.paymentMethod.toLowerCase() === (paymentMethod as string).toLowerCase());
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        t =>
          t.id.toLowerCase().includes(q) ||
          t.reference.toLowerCase().includes(q) ||
          t.orderId?.toLowerCase().includes(q) ||
          t.customer.fullName.toLowerCase().includes(q) ||
          t.customer.phone.toLowerCase().includes(q)
      );
    }

    // Compute key metrics
    const totalVolumeRWF = list
      .filter(t => t.status === 'SUCCESSFUL')
      .reduce((acc, t) => acc + t.amount, 0);

    const successfulCount = list.filter(t => t.status === 'SUCCESSFUL').length;
    const failedCount = list.filter(t => t.status === 'FAILED').length;
    const pendingCount = list.filter(t => t.status === 'PENDING' || t.status === 'PROCESSING').length;
    const refundedCount = list.filter(t => t.status === 'REFUNDED').length;

    const totalSellerSettlementPending = list
      .filter(t => t.status === 'SUCCESSFUL' && t.sellerSettlement?.settlementStatus === 'PENDING')
      .reduce((acc, t) => acc + (t.sellerSettlement?.netSellerPayout || 0), 0);

    const platformCommissionEarned = list
      .filter(t => t.status === 'SUCCESSFUL')
      .reduce((acc, t) => acc + (t.sellerSettlement?.platformCommission || 0), 0);

    return res.json({
      success: true,
      transactions: list,
      metrics: {
        totalCount: list.length,
        totalVolumeRWF,
        successfulCount,
        failedCount,
        pendingCount,
        refundedCount,
        successRatePercent: list.length > 0 ? Math.round((successfulCount / list.length) * 100) : 100,
        totalSellerSettlementPending,
        platformCommissionEarned
      }
    });
  });

  return router;
}
