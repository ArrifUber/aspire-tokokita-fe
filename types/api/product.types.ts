// export interface Product {
//   id: string;
//   code: string;
//   name: string;
//   description: string | null;
//   image: string | null;
//   categoryId?: string 
//   category: {
//     id: string;
//     name: string;
//   };
//   buyPrice: number;
//   sellPrice: number;
//   stock: number;
//   minimumStock: number;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateProductRequest{
//   name: string
//   description: string | null 
//   image: string | null
//   categoryId: string
//   buyPrice: number
//   sellPrice: number
//   stock: number
//   minimumStock?: number
// }

// // export interface UpdateProductRequest extends CreateProductRequest{
// //   isActive: boolean
// // }

// // export interface ProductsWithCategoryName extends Product {
// //   categoryName: string;
// // }

// // export interface getAllProductsRes extends Product {
// //   createdAt?: string;
// //   updatedAt?: string;
// // }


// // export interface getDetailProductRes extends Product {
// //   createdAt: string;
// //   updatedAt: string;
// // }

// export interface UpdateProductRequest {
//   id: string;
//   payload: {
//     categoryId: string;
//     buyPrice: number;
//     sellPrice: number;
//     stock: number;
//     name: string;
//     description: string | null;
//     isActive?: boolean
//   };
// }


// =========== FOKUS KONSINYASI
export interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  image: string | null;
  category: {
    id: string;
    name: string;
  };
  vendor: {
    id: string;
    name: string;
  };
  commissionPercent: number; // 0 - 100
  sellPrice: number;
  stock: number;
  minimumStock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string | null;
  image: string | null;
  categoryId: string;
  vendorId: string;
  commissionPercent: number;
  sellPrice: number;
  stock: number;
  minimumStock?: number;
}

export interface UpdateProductRequest {
  id: string;
  payload: {
    categoryId: string;
    vendorId: string;
    commissionPercent: number;
    sellPrice: number;
    stock: number;
    name: string;
    description: string | null;
    isActive?: boolean;
  };
}