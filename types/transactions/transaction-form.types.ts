export type PaymentMethodOption = "CASH" | "QRIS" | "TRANSFER";

export interface CartItem {
  productId: string;
  code: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  stock: number;
  image: string | null
  categoryName: string
}