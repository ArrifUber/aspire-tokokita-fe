import { ColumnDef } from "@/components/Shared/ReusableTable";
import { Chip } from "@heroui/react";
import ActionProductButton from "./ActionProductButton";
import { Product } from "@/types/api/product.types";
import { formatPrice } from "@/lib/formatPrice";
import ProductImageCell from "./ProductImageCell";




const statusColorMap: { [K in Product["isActive"]]: "success" | "warning" } = {
  true: "success",
  false: "danger",
};

export const productColumns: ColumnDef<Product>[] = [
  {
    key: "produk",
    label: "Produk",
    minWidth: 220,
    renderCell: (row) => (
      <div className="flex items-center gap-2">
        <div className="flex justify-center items-center w-12 h-12 bg-primary-50 rounded-md shrink-0 overflow-hidden border">
          <ProductImageCell filename={row.image} />
        </div>
        <div className="truncate">
          <p className="truncate font-semibold">{row.name}</p>
          <p className="text-sm text-gray-500">SKU: {row.code}</p>
        </div>
      </div>
    ),
  },
  {
    key: "categoryName",
    label: "Kategori",
    minWidth: 160
  },
  {
    key: "stock",
    label: "Stok",
    minWidth: 100,
    renderCell: (row) => (
      <div className="flex flex-col ">
        <p className="text-success-foreground font-semibold">{row.stock}</p>
        <p className="text-sm text-gray-500">Tersedia</p>
      </div>
    ),
  },
  { key: "buyPrice", label: "Harga Beli", minWidth: 140, renderCell: (row) => (
    <p>{formatPrice(row.buyPrice)}</p>
  )},
  { key: "sellPrice", label: "Harga Jual", minWidth: 140, renderCell: (row) => (
    <p>{formatPrice(row.sellPrice)}</p>
  )},
  {
    key: "status",
    label: "Status",
    minWidth: 110,
    renderCell: (row) => (
      <Chip
        color={statusColorMap[row.isActive]}
        variant="soft"
        className="rounded-md capitalize"
      >
        {row.isActive ? "Aktif" : "Nonaktif"}
      </Chip>
    ),
  },
  {
    key: "aksi",
    label: "Aksi",
    minWidth: 160,
    renderCell: (row) =>  (
      <div className="flex items-center gap-2">
        <ActionProductButton id={row.id} code={row.code}/>
      </div>
    ),
  },
];
