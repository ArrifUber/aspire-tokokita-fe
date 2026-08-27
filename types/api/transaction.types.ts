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
  paymentMethod: string;
  products: TransactionProduct[];
}

export interface Transaction {
  id?: string;
  userId: string;
  customerName?: string;
  totalPrice: number;
  status: 'PENDING' | 'SUCCESS' | 'CANCELLED';
  detail?: TransactionDetail;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTransactionReq {
  userId: string;
  companyId?: string;
  customerName?: string;
  totalPrice: number;
  status: 'PENDING' | 'COMPLETED';
  detail: TransactionDetail;
}

export interface UpdateTransactionReq {
  id: string;
  payload: {
    userId: string;
    companyId: string;
    customerName: string;
    totalPrice: number;
    status: 'COMPLETED' | 'PENDING';
  };
}
