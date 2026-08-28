import { ApiResponse } from "@/types/api/base.types";
import {
  CreateTransactionReq,
  UpdateTransactionReq,
  TransactionResponse,
} from "@/types/api/transaction.types";
import { apiClient } from "./client";

export async function getAllTransactions(): Promise<TransactionResponse[]> {
  const res =
    await apiClient.get<ApiResponse<TransactionResponse[]>>("/transactions");
  return res.data.data;
}

export async function getTransactionById(
  id: string,
): Promise<TransactionResponse> {
  const res = await apiClient.get<ApiResponse<TransactionResponse>>(
    `/transactions/${id}`,
  );
  return res.data.data;
}

export async function createTransaction(
  payload: CreateTransactionReq,
): Promise<TransactionResponse> {
  const res = await apiClient.post<ApiResponse<TransactionResponse>>(
    "/transactions",
    payload,
  );
  return res.data.data;
}

export async function updateTransaction({
  id,
  payload,
}: UpdateTransactionReq): Promise<TransactionResponse> {
  const res = await apiClient.put<ApiResponse<TransactionResponse>>(
    `/transactions/${id}`,
    payload,
  );
  return res.data.data;
}

export async function deleteTransaction(id: string): Promise<void> {
  await apiClient.delete<ApiResponse<void>>(`/transactions/${id}`);
}
