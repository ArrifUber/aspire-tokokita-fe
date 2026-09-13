import {  UpdateVendorRequest, Vendor, VendorDetailResponse, VendorFormData } from "@/types/api/vendor.types";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api/base.types";

export async function getAllVendor(): Promise<Vendor[]> {
    const res = await apiClient.get<ApiResponse<Vendor[]>>("/vendor")
    return res.data.data
}
export async function getVendorById(id: string): Promise<VendorDetailResponse> {
  const res = await apiClient.get<ApiResponse<VendorDetailResponse>>(
    `/vendor/${id}`
  );
  return res.data.data;
}

export async function createNewVendor(
  payload: VendorFormData,
): Promise<Vendor> {
  
  const res = await apiClient.post<ApiResponse<Vendor>>(
    "/vendor/create",
    payload,
  );
  return res.data.data;
}

export async function updateVendor({
  id,
  payload,
}: UpdateVendorRequest): Promise<Vendor> {
  const res = await apiClient.put<ApiResponse<Vendor>>(
    `/vendor/${id}`,
    payload,
  );
  return res.data.data;
}

export async function toggleVendorStatus(id: string): Promise<Vendor> {
  const res = await apiClient.patch<ApiResponse<Vendor>>(
    `/vendor/${id}/toggle`
  );
  return res.data.data;
}

export async function deleteVendorById(id: string): Promise<Vendor> {
  const res = await apiClient.delete<ApiResponse<Vendor>>(
    `/vendor/${id}`
  );
  return res.data.data;
}
