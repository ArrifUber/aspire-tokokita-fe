import { deleteVendorById } from "@/lib/api/vendor";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { SWR_KEYS } from "@/lib/swr-keys";
import { useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

export function useDeleteProduct() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    trigger,
    isMutating: isLoading,
    error: swrError,
    reset,
  } = useSWRMutation(
    SWR_KEYS.vendor.all,
    (_key: string, { arg: id }: { arg: string }) => deleteVendorById(id),
  );

  const clearError = () => reset();
  const clearSuccess = () => setIsSuccess(false);

  async function deletevendor(id: string) {
    setIsSuccess(false);

    try {
      await trigger(id);
      setIsSuccess(true);
      mutate(SWR_KEYS.vendor.all);
      return true;
    } catch {
      return false;
    }
  }

  const error = getErrorMessage(swrError, "Gagal menghapus data vendor")
  return {
    isLoading,
    error,
    isSuccess,
    clearError,
    clearSuccess,
    deletevendor,
  };
}