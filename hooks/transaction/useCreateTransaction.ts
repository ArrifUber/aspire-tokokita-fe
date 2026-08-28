import { createTransaction } from "@/lib/api/transaction";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { SWR_KEYS } from "@/lib/swr-keys";
import { useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import {
  CreateTransactionReq,
  TransactionResponse,
} from "@/types/api/transaction.types";

export function useCreateTransaction() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    trigger,
    isMutating: isLoading,
    error: swrError,
    reset,
  } = useSWRMutation(
    SWR_KEYS.transaction.all,
    (_key: string, { arg: payload }: { arg: CreateTransactionReq }) =>
      createTransaction(payload),
  );

  const clearError = () => reset();
  const clearSuccess = () => setIsSuccess(false);

  async function postTransaction(
    payload: CreateTransactionReq,
  ): Promise<TransactionResponse | null> {
    setIsSuccess(false);

    try {
      const result = await trigger(payload);
      setIsSuccess(true);
      mutate(SWR_KEYS.transaction.all);
      return result;
    } catch {
      return null;
    }
  }

  const error = getErrorMessage(swrError, "Gagal membuat transaksi");

  return {
    isLoading,
    error,
    isSuccess,
    clearError,
    clearSuccess,
    postTransaction,
  };
}