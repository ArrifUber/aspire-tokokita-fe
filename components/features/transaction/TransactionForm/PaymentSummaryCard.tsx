"use client";

import { formatPrice } from "@/lib/formatPrice";
import { PaymentMethodOption } from "@/types/transactions/transaction-form.types";
import {
  Description,
  FieldError,
  Input,
  Label,
  NumberField,
} from "@heroui/react";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { IDR_FORMAT_OPTIONS } from "../../product/productForm/ProductFormSection";
import { CartItem } from "@/types/transactions/transaction-form.types";

interface PaymentSummaryCardProps {
  cartItems: CartItem[];
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  subtotal: number;
  totalPrice: number;
  paymentMethod: PaymentMethodOption | null;
  onChangePaymentMethod: (method: PaymentMethodOption) => void;
  paymentAmount: number;
  onChangePaymentAmount: (value: number) => void;
  changeAmount: number;
  isSubmitting: boolean;
  errorMessage: string | null;
  isSuccess: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const PAYMENT_METHODS: { value: PaymentMethodOption; label: string }[] = [
  { value: "CASH", label: "Tunai" },
  { value: "QRIS", label: "Qris" },
  { value: "TRANSFER", label: "Transfer" },
];

export function PaymentSummaryCard({
  cartItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  subtotal,
  totalPrice,
  paymentMethod,
  onChangePaymentMethod,
  paymentAmount,
  onChangePaymentAmount,
  changeAmount,
  isSubmitting,
  errorMessage,
  isSuccess,
  onSubmit,
  onCancel,
}: PaymentSummaryCardProps) {
  return (
    <section className="bg-surface rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-900 mb-4">Ringkasan Pembayaran</h2>

      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6 border-b border-gray-100 mb-4">
          Belum ada produk dipilih.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100 mb-4 max-h-64 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.productId} className="flex items-center gap-2 py-2.5">
              <button
                onClick={() => onRemoveItem(item.productId)}
                className="text-danger-foreground hover:text-danger shrink-0 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <p className="flex-1 min-w-0 text-sm text-gray-800 truncate">
                {item.name}
              </p>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onDecreaseQuantity(item.productId)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-xs">{item.quantity}</span>
                <button
                  onClick={() => onIncreaseQuantity(item.productId)}
                  disabled={item.quantity >= item.stock}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="w-20 text-right text-sm font-medium text-gray-900 shrink-0">
                {formatPrice(item.sellPrice * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500">Subtotal</span>
        <span className="text-gray-900">{formatPrice(subtotal)}</span>
      </div>

      <div className="flex justify-between items-center border-t border-gray-100 pt-3 mb-4">
        <span className="text-gray-700 font-medium">Total Bayar</span>
        <span className="text-green-700 font-bold text-lg">
          {formatPrice(totalPrice)}
        </span>
      </div>

      <p className="text-sm text-gray-700 font-medium mb-2">Metode pembayaran</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {PAYMENT_METHODS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChangePaymentMethod(value)}
            className={`text-xs font-medium rounded-lg py-2 border transition ${
              paymentMethod === value
                ? "bg-green-700 text-white border-green-700"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {paymentMethod === "CASH" && (
        <div className="mb-4 flex flex-col gap-4">
          <NumberField
            name="bayar"
            className="w-full"
            value={paymentAmount}
            onChange={(e) => onChangePaymentAmount(Math.max(Number(e) || 0, 0))}
            minValue={0}
            formatOptions={IDR_FORMAT_OPTIONS}
          >
            <Label className="font-semibold">Jumlah Bayar</Label>
            <Input className="rounded" />
            <FieldError />
          </NumberField>
          <NumberField
            isDisabled
            name="kembalian"
            className="w-full"
            value={changeAmount}
            formatOptions={IDR_FORMAT_OPTIONS}
          >
            <Label className="font-semibold">Kembalian</Label>
            <Input className="rounded" />
            <FieldError />
          </NumberField>
        </div>
      )}

      {errorMessage && <p className="text-xs text-red-600 mb-3">{errorMessage}</p>}
      {isSuccess && (
        <p className="text-xs text-green-700 mb-3">Transaksi berhasil disimpan.</p>
      )}

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white font-medium rounded-lg py-2.5 flex items-center justify-center gap-2 mb-2"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Simpan Transaksi
      </button>
      <button
        onClick={onCancel}
        disabled={isSubmitting}
        className="w-full border border-gray-300 text-gray-700 font-medium rounded-lg py-2.5 hover:bg-gray-50"
      >
        Batal
      </button>
    </section>
  );
}