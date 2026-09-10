import { ColumnDef } from "@/components/Shared/ReusableTable";
import { Chip } from "@heroui/react";
import { Vendor } from "@/types/api/vendor.types";
import ActionVendorButton from "./ActionVendorButton";



const statusColorMap: Record<Vendor["status"], "success"  | "danger"> = {
  Aktif:    "success",
  Nonaktif: "danger",
};

export const vendorColumns: ColumnDef<Vendor>[] = [
  {
    key: "supplier",
    label: "Supplier",
    renderCell: (row) => (
      <div>
        <p className="font-semibold text-gray-900">{row.name}</p>
        {/* <p className="text-xs text-gray-400 mt-0.5">PIC: {row.pic}</p> */}
      </div>
    ),
    minWidth: 200
  },
  {
    key: "kontak",
    label: "Kontak",
        minWidth: 160
  },
  {
  key: "rekening",
  label: "Rekening Bank",
  minWidth: 250,
  renderCell: (row) => {
    return(
            <div>
        <p className="font-semibold text-gray-900">{row.rekening}</p>
        <p className="text-sm text-gray-400 mt-0.5">{row.noRekening}</p>
      </div>
    )
  },
  },
  {
  key: "jumlahProduk",
  label: "Jumlah Produk",
  minWidth: 140
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
        minWidth: 110
  },
  {
    key: "aksi",
    label: "Aksi",
    renderCell: (row) => (
      <div className="flex items-center gap-2">
        <ActionVendorButton />
      </div>
    ),
        minWidth: 150
  },
];