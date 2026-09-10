export interface Vendor {
  name: string;
  kontak: string;
  rekening: string;
  noRekening: string;
  jumlahProduk: string
  status: "Aktif" | "Nonaktif";
}


// Untuk real datanya nanti
export type VendorStatus = "Aktif" | "Nonaktif";

export interface Vendor2 {
  id: string;
  name: string;
  kontak: string;
  rekening: string;
  noRekening: string;
  jumlahProduk: number;
  status: VendorStatus;
}

export interface VendorFormData {
  name: string;
  kontak: string;
  rekening: string;
  noRekening: string;
  namaKontak: string;
  status: VendorStatus;
}