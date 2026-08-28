"use client";

import { formatPrice } from "@/lib/formatPrice";
import { PaymentMethodOption } from "@/types/transactions/transaction-form.types";
import { Loader2 } from "lucide-react";


interface PaymentSummaryCardProps {
  subtotal: number;
  discount: number;
  onChangeDiscount: (value: number) => void;
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
  subtotal,
  discount,
  onChangeDiscount,
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
    <section className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-900 mb-4">Ringkasan Pembayaran</h2>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500">Subtotal</span>
        <span className="text-gray-900">{formatPrice(subtotal)}</span>
      </div>

      <div className="flex justify-between items-center text-sm mb-4">
        <span className="text-gray-500">Diskon</span>
        <input
          type="number"
          min={0}
          value={discount}
          onChange={(e) => onChangeDiscount(Math.max(Number(e.target.value) || 0, 0))}
          className="w-28 text-right rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/40"
        />
      </div>

      <div className="flex justify-between items-center border-t border-gray-100 pt-3 mb-4">
        <span className="text-gray-700 font-medium">Total Bayar</span>
        <span className="text-green-700 font-bold text-lg">{formatPrice(totalPrice)}</span>
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
        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1 block">Jumlah Bayar</label>
          <input
            type="number"
            min={0}
            value={paymentAmount}
            onChange={(e) => onChangePaymentAmount(Math.max(Number(e.target.value) || 0, 0))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/40"
          />
          <p className="text-xs text-gray-500 mt-1">
            Kembalian: <span className="font-medium text-gray-800">{formatPrice(changeAmount)}</span>
          </p>
        </div>
      )}

      {errorMessage && <p className="text-xs text-red-600 mb-3">{errorMessage}</p>}
      {isSuccess && <p className="text-xs text-green-700 mb-3">Transaksi berhasil disimpan.</p>}

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