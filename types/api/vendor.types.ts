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

export interface VendorFormData {
  name: string;
  picName: string;
  picPhone: string;
  rekening: string;
  noRekening: string;
  isActive: boolean;
}


export interface UpdateVendorRequest{
  id: string
  payload: VendorFormData
}