// Untuk real datanya nanti
export type VendorStatus = "Aktif" | "Nonaktif";

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  noWhatsapp: string;
  rekening: string;
  noRekening: string;
  jumlahProduk: number;
  status: VendorStatus;
}

export interface VendorFormData {
  name: string;
    contactPerson: string;
  noWhatsapp: string;
  rekening: string;
  noRekening: string;
  status: VendorStatus;
}


export interface UpdateVendorRequest{
  id: string
  payload: VendorFormData
}