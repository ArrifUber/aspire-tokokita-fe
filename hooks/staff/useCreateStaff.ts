import { useState } from "react";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { mutate } from "swr";
import { CreateUserReq } from "@/types/api/auth.types";
import { createUser } from "@/lib/api/user";

export function useCreateStaff() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function createStaff(payload: CreateUserReq): Promise<boolean> {
    setIsLoading(true);
    setError(null);

    try {
      await createUser(payload);
      await mutate("staff:all"); 
      setIsSuccess(true);
      return true;
    } catch (err) {
      setError(getErrorMessage(err, "Gagal menambahkan staff"));
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  function clearSuccess() {
    setIsSuccess(false);
  }

  return { createStaff, isLoading, error, isSuccess, clearError, clearSuccess };
}