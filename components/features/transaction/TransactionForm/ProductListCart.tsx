"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";
import { Product } from "@/types/api/product.types";
import { ProductSearchInput, ProductSearchInputHandle } from "./ProductSearchInput";
import { CartItemRow } from "./CartItemRow";
import { CartItem } from "@/types/transactions/transaction-form.types";

interface ProductListCardProps {
  products: Product[];
  isLoadingProducts: boolean;
  cartItems: CartItem[];
  onAddProduct: (product: Product) => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
}

export function ProductListCard({
  products,
  isLoadingProducts,
  cartItems,
  onAddProduct,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: ProductListCardProps) {
  const searchRef = useRef<ProductSearchInputHandle>(null);

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-900">Daftar Produk</h2>
        <ProductSearchInput
          ref={searchRef}
          products={products}
          isLoadingProducts={isLoadingProducts}
          onSelectProduct={onAddProduct}
        />
      </div>

      {cartItems.length === 0 ? (
        <button
          onClick={() => searchRef.current?.focus()}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-10 flex flex-col items-center gap-2 text-gray-400 hover:border-green-700 hover:text-green-700 transition"
        >
          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </span>
          <span className="text-sm font-medium">Tambah Produk Dari Katalog</span>
        </button>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {cartItems.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onIncrease={onIncreaseQuantity}
              onDecrease={onDecreaseQuantity}
              onRemove={onRemoveItem}
            />
          ))}
          <button
            onClick={() => searchRef.current?.focus()}
            className="mt-3 w-full border border-gray-300 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Tambah Produk Lainnya
          </button>
        </div>
      )}
    </section>
  );
}