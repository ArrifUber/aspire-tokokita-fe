// Untuk real datanya nanti

export interface Vendor {
  id: string;
  name: string;
  picName: string;
  picPhone: string;
  rekening: string;
  noRekening: string;
  jumlahProduk: number;
  isActive: boolean;
}

export interface VendorDetailResponse extends Vendor {
  createdAt: string;
  updatedAt: string;
  products: {
    id: string;
    code: string;
    name: string;
    description: string | null;
    image: string | null;
    category: {
      id: string;
      name: string;
    };
    commissionPercent: number; // 0 - 100
    sellPrice: number;
    stock: number;
    minimumStock: number;
    isActive: boolean;
  }[];
}

export interface VendorFormData {
  name: string;
  picName: string;
  picPhone: string;
  rekening: string;
  noRekening: string;
  isActive: boolean;
}

export interface UpdateVendorRequest {
  id: string;
  payload: VendorFormData;
}
