import { CartItem, PaymentMethodOption } from "@/types/transactions/transaction-form.types";


interface CalculateTransactionTotalsParams {
  cartItems: CartItem[];
  discount: number;
  paymentMethod: PaymentMethodOption| null;
  paymentAmount: number;
}

export function calculateTransactionTotals({
  cartItems,
  discount,
  paymentMethod,
  paymentAmount,
}: CalculateTransactionTotalsParams) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.sellPrice * item.quantity, 0);
  const totalCapital = cartItems.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0);
  const totalPrice = Math.max(subtotal - discount, 0);
  const totalProfit = totalPrice - totalCapital;
  const effectivePaymentAmount = paymentMethod === "CASH" ? paymentAmount : totalPrice;
  const changeAmount = Math.max(effectivePaymentAmount - totalPrice, 0);

  return { subtotal, totalCapital, totalPrice, totalProfit, effectivePaymentAmount, changeAmount };
}