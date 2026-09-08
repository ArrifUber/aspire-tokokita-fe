import { ColumnDef } from "@/components/Shared/ReusableTable";
import { Chip } from "@heroui/react";
import ActionProductButton from "../product/ActionProductButton";
import { Transaction, TransactionResponse } from "@/types/api/transaction.types";
import { formatPrice } from "@/lib/formatPrice";
import {  formatDateShort } from "@/lib/formatDate";

const statusColorMap: Record<
  Transaction["status"],
  "success" | "warning" | "danger"
> = {
  SUCCESS: "success",
  PENDING: "warning",
  CANCELLED: "danger",
};

export const transactionColumn: ColumnDef<TransactionResponse>[] = [
  {
    key: "invoiceNumber",
    label: "No. Invoice",
    renderCell: (row) => (
      <div>
        <p className="font-semibold text-gray-900">{row.invoiceNumber}</p>
      </div>
    ),
    minWidth: 200,
  },
  {
    key: "createdAt",
    label: "Tanggal",
    renderCell: (row) => (
      <div>
        <p className="font-semibold text-gray-900">{formatDateShort( row.createdAt)}</p>
      </div>
    ),
    minWidth: 200,
  },
  {
    key: "name",
    label: "Nama Pelanggan",
    renderCell: (row) => (
      <div>
        <p className="font-semibold text-gray-900">
          {row.customerName || "Tidak tercatat"}
        </p>
      </div>
    ),
    minWidth: 110,
  },
  {
    key: "totalPrice",
    label: "Total",
    minWidth: 140,
    renderCell: (row) => (
      <div>
        <p className="font-semibold text-gray-900">
          {formatPrice(row.totalPrice)}
        </p>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    renderCell: (row) => {
      return (
        <Chip
          color={statusColorMap[row.status]}
          variant="soft"
          className="rounded-md capitalize"
        >
          {row.status}
        </Chip>
      );
    },
    minWidth: 110,
  },
];
