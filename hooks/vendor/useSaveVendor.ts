import { createNewVendor, updateVendor as updateVendorApi} from "@/lib/api/vendor";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { SWR_KEYS } from "@/lib/swr-keys";
import { UpdateVendorRequest, VendorFormData } from "@/types/api/vendor.types";
import { useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

export function useSaveVendor() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    trigger: triggerAdd,
    isMutating: isAdding,
    error: addError,
    reset: resetAddError,
  } = useSWRMutation(
    SWR_KEYS.vendor.all,
    (_key: string, { arg }: { arg: VendorFormData }) => createNewVendor(arg),
  );

  const {
    trigger: triggerUpdate,
    isMutating: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = useSWRMutation(
    SWR_KEYS.product.all,
    (_key: string, { arg }: { arg: UpdateVendorRequest }) => updateVendorApi(arg),
  );

  const clearError = () => {
    resetAddError();
    resetUpdateError();
  };
  const clearSuccess = () => setIsSuccess(false);

  async function addVendor(payload: VendorFormData) {
    setIsSuccess(false);
    try {
      await triggerAdd(payload);
      setIsSuccess(true);
      mutate(SWR_KEYS.vendor.all);
      return true;
    } catch {
      return false;
    }
  }

  async function updateVendor({ id, payload }: UpdateVendorRequest) {
    setIsSuccess(false);
    try {
      await triggerUpdate({ id, payload });
      setIsSuccess(true);
      mutate(SWR_KEYS.vendor.all);
      mutate(SWR_KEYS.vendor.detail(id));
      return true;
    } catch {
      return false;
    }
  }

  async function saveProduct(payload: VendorFormData, vendorId?: string) {
    if (vendorId) {
      return updateVendor({ id: vendorId, payload });
    }
    return addVendor(payload);
  }

  return {
    addVendor,
    updateVendor,
    saveProduct,
    isLoading: isAdding || isUpdating,
    error:
      getErrorMessage(addError, "Gagal menambahkan vendor") ??
      getErrorMessage(updateError, "Gagal memperbarui vendor"),
    isSuccess,
    clearError,
    clearSuccess,
  };
}