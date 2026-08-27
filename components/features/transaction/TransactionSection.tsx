import { ReusableTable } from "@/components/Shared/ReusableTable";
import TableSearchField from "@/components/Shared/TableSearchField";
import { usePagination } from "@/hooks/usePagination";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, buttonVariants } from "@heroui/react";
import Link from "next/link";
import { transactionColumn } from "./transaction.columns";
import { Transaction } from "@/types/api/transaction.types";

export default function TransactionSection({ transaction }: { transaction: Transaction[] }) {
  const { currentData, pagination } = usePagination({
    data: transaction,
    rowsPerPage: 5,
    itemLabel: "supplier",
  });
  return (
    <div className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border">
      <div className="flex flex-col bg-surface-tertiary border border-surface-border rounded-xl overflow-hidden">
        <div id="filter" className="flex gap-4 items-center p-6 w-full">
          <TableSearchField
            placeholder="Cari Produk..."
            aria_label="Cari Produk"
          />
          {/* <SelectList ListItems={CategoriesList} placeholder="Pilih Kategori" ariaLabel="Pilih Kategori" defaultValue="semuaKategori" width={200}/>
          <SelectList ListItems={StatusList} placeholder="Status" width={128} ariaLabel="pilih status"/> */}
          <Button
            variant="outline"
            className={
              "rounded-md shadow-sm border-0 bg-white hover:bg-gray-50"
            }
          >
            <FontAwesomeIcon icon={faFilter} /> Filter
          </Button>
          <div className="ml-auto">
            <Link
              href={"/penjualan/tambah-transaksi"}
              className={`${buttonVariants({ variant: "primary" })} text-white rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700`}
            >
              <FontAwesomeIcon icon={faPlus} /> Tambah Transaksi
            </Link>
          </div>
        </div>
        <div id="table">
          <ReusableTable
            columns={transactionColumn}
            data={currentData}
            pagination={pagination}
            emptyMessage="Belum ada transaksi yang terdaftar"
          />
        </div>
      </div>
    </div>
  );
}
