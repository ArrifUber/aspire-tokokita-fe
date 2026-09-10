import {  UpdateVendorRequest, Vendor2, VendorFormData } from "@/types/api/vendor.types";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api/base.types";

export async function getAllVendor(): Promise<Vendor2[]> {
    const res = await apiClient.get<ApiResponse<Vendor2[]>>("/vendor")
    return res.data.data
}
export async function getVendorById(id: string): Promise<Vendor2> {
  const res = await apiClient.get<ApiResponse<Vendor2>>(
    `/vendor/${id}`
  );
  return res.data.data;
}

export async function createNewVendor(
  payload: VendorFormData,
): Promise<Vendor2> {
  
  const res = await apiClient.post<ApiResponse<Vendor2>>(
    "/vendor/",
    payload,
  );
  return res.data.data;
}

export async function updateVendor({
  id,
  payload,
}: UpdateVendorRequest): Promise<Vendor2> {
  const res = await apiClient.put<ApiResponse<Vendor2>>(
    `/vendor/${id}`,
    payload,
  );
  return res.data.data;
}

export async function toggleVendorStatus(id: string): Promise<Vendor2> {
  const res = await apiClient.patch<ApiResponse<Vendor2>>(
    `/vendor/${id}/toggle`
  );
  return res.data.data;
}

export async function deleteVendorById(id: string): Promise<Vendor2> {
  const res = await apiClient.delete<ApiResponse<Vendor2>>(
    `/vendor/${id}`
  );
  return res.data.data;
}
