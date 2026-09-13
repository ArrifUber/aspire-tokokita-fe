import { ColumnDef } from "@/components/Shared/ReusableTable";
import { Chip } from "@heroui/react";
import { Vendor } from "@/types/api/vendor.types";
import ActionVendorButton from "./ActionVendorButton";


export const vendorColumns: ColumnDef<Vendor>[] = [
  {
    key: "supplier",
    label: "Supplier",
    renderCell: (row) => (
      <div className="flex gap-2 items-center">
        <div className="min-w-8 min-h-8 flex justify-center items-center rounded-full bg-gray-200">
          {row.name[0]}
        </div>
        <p className="font-semibold text-gray-900 truncate">{row.name}</p>
      </div>
    ),
    minWidth: 200
  },
  {
    key: "picName",
    label: "Contact Person",
        minWidth: 160
  },
  {
    key: "picPhone",
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
          color={(row.isActive ? "success": "danger")}
          variant="soft"
          className="rounded-md capitalize"
        >
          {(row.isActive ? "Aktif": "Nonaktif")}
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
        <ActionVendorButton id={row.id}/>
      </div>
    ),
        minWidth: 150
  },
];