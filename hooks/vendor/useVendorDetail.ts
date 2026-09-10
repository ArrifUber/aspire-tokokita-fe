import { getVendorById } from "@/lib/api/vendor";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { SWR_KEYS } from "@/lib/swr-keys";
import useSWR from "swr";

export function useVendorDetail(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? SWR_KEYS.vendor.detail(id) : null,
    () => getVendorById(id),
  );

  return {
    vendor: data,
    error: getErrorMessage(error, "Gagal mengambil data vendor"),
    isLoading,
  };
}
