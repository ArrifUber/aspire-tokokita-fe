"use client";

import { formatPrice } from "@/lib/formatPrice";
import { CartItem } from "@/types/transactions/transaction-form.types";
import { Minus, Plus, X } from "lucide-react";
import ProductImageCell from "../../product/ProductImageCell";

interface CartItemRowProps {
  item: CartItem;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex-1 min-w-0 flex items-center gap-4">
        <div className="flex justify-center items-center w-12 h-12 bg-primary-50 rounded-md shrink-0 overflow-hidden border">
          <ProductImageCell filename={item.image} />
        </div>
        <div>
          <p className="font-medium text-gray-900 truncate">
            {item.name}
          </p>
          <p className="text-sm text-gray-500">
            {formatPrice(item.sellPrice)} / item
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item.productId)}
          className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center text-sm">{item.quantity}</span>
        <button
          onClick={() => onIncrease(item.productId)}
          disabled={item.quantity >= item.stock}
          className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="w-24 text-right text-sm font-medium text-gray-900">
        {formatPrice(item.sellPrice * item.quantity)}
      </p>
      <button
        onClick={() => onRemove(item.productId)}
        className="text-gray-400 hover:text-red-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
