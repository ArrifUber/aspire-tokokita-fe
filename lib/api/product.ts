import { ApiResponse } from "@/types/api/base.types";
import {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "@/types/api/product.types";
import { apiClient } from "./client";


export interface ProductQueryParams {
  search?: string;
  categoryId?: string;
  isActive?: boolean | "";
  lowStock?: boolean;
}

export async function getAllProducts(params?: ProductQueryParams): Promise<Product[]> {
  const res =
    await apiClient.get<ApiResponse<Product[]>>("/products", {params});
  return res.data.data;
}

export async function createNewProduct(
  payload: CreateProductRequest,
): Promise<Product> {
  
  const res = await apiClient.post<ApiResponse<Product>>(
    "/products/",
    payload,
  );
  return res.data.data;
}

export async function getProductById(id: string): Promise<Product> {
  const res = await apiClient.get<ApiResponse<Product>>(
    `/products/${id}`
  );
  return res.data.data;
}

export async function updateProduct({
  id,
  payload,
}: UpdateProductRequest): Promise<Product> {
  const res = await apiClient.put<ApiResponse<Product>>(
    `/products/${id}`,
    payload,
  );
  return res.data.data;
}

// Fitur Soft Delete / Toggle Active Status
export async function toggleProductStatus(id: string): Promise<Product> {
  const res = await apiClient.patch<ApiResponse<Product>>(
    `/products/${id}/toggle`
  );
  return res.data.data;
}

export async function deleteProductById(id: string): Promise<Product> {
  const res = await apiClient.delete<ApiResponse<Product>>(
    `/products/${id}`
  );
  return res.data.data;
}
