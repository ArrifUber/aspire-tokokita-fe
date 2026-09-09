import { CreateUserReq, UpdateUserReq, User } from "@/types/api/auth.types";
import { ApiResponse } from "@/types/api/base.types";
import { apiClient } from "./client";
import { userStorage } from "../storage";

export async function getUserById(id: string): Promise<User> {
  const res = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return res.data.data
}

export async function getAllUsers(): Promise<User[]> {
  const res = await apiClient.get<ApiResponse<User[]>>('/users')
  return res.data.data
}

export async function createUser(payload: CreateUserReq): Promise<User> {
    const res = await apiClient.post<ApiResponse<User>>('/users', payload)
    return res.data.data
}

export async function updateUser(id: string, payload: UpdateUserReq): Promise<User> {
  console.log(payload)
  const res = await apiClient.put<ApiResponse<User>>(`/users/${id}`, payload);
  console.log(res.data)
  userStorage.set(res.data.data)
  return res.data.data;
}