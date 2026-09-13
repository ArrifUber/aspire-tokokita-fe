export type PaymentMethodOption = "CASH" | "QRIS" | "TRANSFER";

export interface CartItem {
  productId: string;
  code: string;
  name: string;
  sellPrice: number;
  quantity: number;
  stock: number;
  image: string | null
  categoryName: string
}