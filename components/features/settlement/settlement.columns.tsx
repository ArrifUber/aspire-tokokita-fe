import { ColumnDef } from "@/components/Shared/ReusableTable";
import { SettlementListItem } from "@/types/api/settlement.types";
import { formatPrice } from "@/lib/formatPrice";
import SettlementStatusBadge from "./SettlementStatusBadge";
import VendorCell from "./VendorCell";
import ActionSettlementButton from "./ActionSettlementButton";



export const settlementColumns: ColumnDef<SettlementListItem>[] = [
    {
      key: "vendor",
      label: "Vendor",
      minWidth: 220,
      renderCell: (row) => (
        <VendorCell
          name={row.vendor.name}
          jumlahProduk={row.vendor.jumlahProduk}
        />
      ),
    },
    {
      key: "periode",
      label: "Periode",
      renderCell: (row) => <p>{row.period}</p>,
    },
    {
      key: "totalSales",
      label: "Total Penjualan",
      minWidth: 150,
      renderCell: (row) => <p>{formatPrice(row.totalSales)}</p>,
    },
    {
      key: "vendorShare",
      label: "Hak Vendor",
      minWidth: 150,
      renderCell: (row) => <p>{formatPrice(row.vendorShare)}</p>,
    },
    {
      key: "storeCommission",
      label: "Komisi Toko",
      minWidth: 150,
      renderCell: (row) => <p>{formatPrice(row.storeCommission)}</p>,
    },
    {
      key: "status",
      label: "Status",
      renderCell: (row) => <SettlementStatusBadge status={row.status} />,
    },
    {
      key: "aksi",
      label: "Aksi",
      minWidth: 100,
      renderCell: (row) => <ActionSettlementButton id={row.id} />,
    },
]