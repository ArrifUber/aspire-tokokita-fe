import { getAllVendor } from "@/lib/api/vendor";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { SWR_KEYS } from "@/lib/swr-keys";
import useSWR from "swr";

export function useGetAllVendor() {
  const {
    data: vendors,
    error: vendorError,
    isLoading,
    mutate,
  } = useSWR(
    [SWR_KEYS.vendor.all], 
    () => getAllVendor()
  );

  return {
    vendors: vendors || [],
    error: getErrorMessage(vendorError, "Gagal mengambil daftar vendor"),
    isLoading,
    refetch: mutate,
  };
}