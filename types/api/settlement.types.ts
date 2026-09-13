import type { Vendor } from "@/types/api/vendor.types";

export type SettlementStatus = "lunas" | "pending" | "menunggu";
export type SettlementStatusFilter = "semua" | SettlementStatus;
export type SettlementTimelineStep =
  | "diproses"
  | "pembayaran_berhasil"
  | "laporan_dikirim";
export type TimelineStepStatus = "completed" | "in_progress" | "pending";


export interface SettlementTimelineEntry {
  step: SettlementTimelineStep;
  label: string;
  status: TimelineStepStatus;
  /** Format bebas sesuai tampilan, mis. "12 Sep 2025, 10:24". Null/undefined jika belum terjadi. */
  timestamp?: string | null;
}

export interface SettlementListItem {
  id: string;
  vendor: Pick<Vendor, "id" | "name" | "jumlahProduk">;
  period: string;
  totalSales: number;
  vendorShare: number;
  storeCommission: number;
  status: SettlementStatus;
}

export interface SettlementSummary {
  totalSales: number;
  vendorShare: {
    amount: number;
    percentage: number;
  };
  storeCommission: {
    amount: number;
    percentage: number;
  };
  transactionCount: number;
}