export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'CANCELLED';

export type PaymentMethod = string;


export interface TransactionProduct {
  productId: string;
  quantity: number;
}

export interface TransactionDetail {
  totalCapital: number;
  totalProfit: number;
  discount: number;
  paymentAmount: number;
  changeAmount: number;
  paymentMethod: PaymentMethod;
  products: TransactionProduct[];
}

// ------------------------------------------
// Core entity
// ------------------------------------------

export interface Transaction {
  id?: string;
  userId: string;
  companyId?: string;
  customerName?: string;
  totalPrice: number;
  status: TransactionStatus;
  detail?: TransactionDetail;
  createdAt?: string;
  updatedAt?: string;
}

// ------------------------------------------
// Request payloads
// ------------------------------------------

export interface CreateTransactionReq {
  userId: string;
  companyId?: string;
  customerName?: string;
  totalPrice: number;
  status?: TransactionStatus;
  detail: TransactionDetail;
}

export interface UpdateTransactionReq {
  id: string;
  payload: Partial<{
    userId: string;
    companyId: string;
    customerName: string;
    totalPrice: number;
    status: TransactionStatus;
  }>;
}

// ------------------------------------------
// Response shapes (dari GET/POST result)
// ------------------------------------------

export interface BoughtProduct {
  id: string;
  productId: string;
  code: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  subtotal: number;
}

export interface TransactionDetailResponse {
  id: string;
  totalCapital: number;
  totalProfit: number;
  discount: number;
  paymentAmount: number;
  changeAmount: number;
  paymentMethod: PaymentMethod;
  boughtProducts: BoughtProduct[];
}

export interface TransactionResponse {
  id: string;
  userId: string;
  companyId?: string;
  customerName?: string;
  totalPrice: number;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  details: TransactionDetailResponse[];
}