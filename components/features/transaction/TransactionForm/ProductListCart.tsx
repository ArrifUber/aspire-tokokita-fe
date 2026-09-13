"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Product } from "@/types/api/product.types";
import { formatPrice } from "@/lib/formatPrice";
import { CartItem } from "@/types/transactions/transaction-form.types";
import ProductImageCell from "../../product/ProductImageCell";

interface ProductListCardProps {
  products: Product[];
  isLoadingProducts: boolean;
  cartItems: CartItem[];
  onAddProduct: (product: Product) => void;
}

export function ProductListCard({
  products,
  isLoadingProducts,
  cartItems,
  onAddProduct,
}: ProductListCardProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category?.name) set.add(p.category.name);
    });
    return ["Semua", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.code ?? "").toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "Semua" || p.category?.name === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, activeCategory]);

  function getQuantityInCart(productId: string) {
    return cartItems.find((item) => item.productId === productId)?.quantity ?? 0;
  }

  return (
    <section className="bg-surface rounded-xl border border-gray-200 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="font-semibold text-gray-900 shrink-0">Daftar Produk</h2>
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full rounded-full border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/40"
          />
        </div>
      </div>

      {isLoadingProducts ? (
        <p className="text-sm text-gray-400 py-10 text-center">Memuat produk...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-sm text-gray-400 py-10 text-center">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredProducts.map((product) => {
            const qty = getQuantityInCart(product.id!);
            const isOutOfStock = product.stock === 0;
            return (
              <button
                key={product.id}
                onClick={() => !isOutOfStock && onAddProduct(product)}
                disabled={isOutOfStock}
                className={`relative flex flex-col items-left text-left bg-white rounded-xl border p-3 transition ${
                  qty > 0
                    ? "border-green-700 ring-1 ring-green-700/30"
                    : "border-gray-200 hover:border-green-700/50 hover:shadow-sm"
                } ${isOutOfStock ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {qty > 0 && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-700 text-white text-[11px] font-semibold flex items-center justify-center">
                    {qty}
                  </span>
                )}
                <div className="w-full aspect-square rounded-lg bg-primary-50 overflow-hidden flex items-center justify-center mb-3">
                  <ProductImageCell filename={product.image} />
                </div>
                <p className="text-sm font-medium text-gray-900 line-clamp-2 w-full">
                  {product.name}
                </p>
                <p className="text-sm font-semibold text-green-700 mt-1">
                  {formatPrice(product.sellPrice)}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {categories.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-scroll pt-3 border-t border-gray-100 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 text-xs font-medium rounded-lg px-4 py-2 border transition ${
                activeCategory === cat
                  ? "bg-green-700 text-white border-green-700"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}