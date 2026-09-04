import { getAllProducts, ProductQueryParams } from "@/lib/api/product";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { SWR_KEYS } from "@/lib/swr-keys";
import useSWR from "swr";

export function useGetAllProduct(params?: ProductQueryParams) {
  // SWR Key menggunakan array agar bereaksi saat nilai params berubah
  const {
    data: products,
    error: productError,
    isLoading,
    mutate,
  } = useSWR(
    [SWR_KEYS.product.all, params], 
    () => getAllProducts(params)
  );

  return {
    products: products || [],
    error: getErrorMessage(productError, "Gagal mengambil daftar produk"),
    isLoading,
    refetch: mutate,
  };
}