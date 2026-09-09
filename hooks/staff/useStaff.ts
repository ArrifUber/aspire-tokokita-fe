import useSWR from "swr";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { getAllUsers } from "@/lib/api/user";

export function useStaff() {
  const { data, error, isLoading, mutate } = useSWR("staff:all", getAllUsers);

  return {
    staff: data ?? [],
    error: getErrorMessage(error, "Gagal mengambil data staff"),
    isLoading,
    refetch: mutate,
  };
}