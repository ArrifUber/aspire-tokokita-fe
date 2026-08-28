"use client";

import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Search } from "lucide-react";
import { ProductsWithCategoryName } from "@/types/api/product.types";
import { formatPrice } from "@/lib/formatPrice";
import ProductImageCell from "../../product/ProductImageCell";

export interface ProductSearchInputHandle {
  focus: () => void;
}

interface ProductSearchInputProps {
  products: ProductsWithCategoryName[];
  isLoadingProducts: boolean;
  onSelectProduct: (product: ProductsWithCategoryName) => void;
}

export const ProductSearchInput = forwardRef<
  ProductSearchInputHandle,
  ProductSearchInputProps
>(function ProductSearchInput(
  { products, isLoadingProducts, onSelectProduct },
  ref,
) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.code ?? "").toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query, products]);

  function handleSelect(product: ProductsWithCategoryName) {
    onSelectProduct(product);
    setQuery("");
  }

  return (
    <div className="relative w-64">
      <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari Produk..."
        className="w-full rounded-lg border border-gray-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/40"
      />
      {searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
          {searchResults.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              disabled={p.stock === 0}
              className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed flex gap-2 items-center"
            >
              <div className="flex justify-center items-center w-12 h-12 bg-primary-50 rounded-md shrink-0 overflow-hidden border">
                <ProductImageCell filename={p.image} />
              </div>
              <div className="flex flex-col">
              <span>{p.name}</span>
              <span className="text-gray-500">{formatPrice(p.sellPrice)}</span>

              </div>
            </button>
          ))}
        </div>
      )}
      {isLoadingProducts && (
        <p className="text-xs text-gray-400 mt-1">Memuat produk...</p>
      )}
    </div>
  );
});
