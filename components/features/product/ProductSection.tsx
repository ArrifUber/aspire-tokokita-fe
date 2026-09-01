"use client";
import { Button, buttonVariants } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { usePagination } from "@/hooks/usePagination";
import { ReusableTable } from "@/components/Shared/ReusableTable";
import { productColumns } from "./product.columns";
import TableSearchField from "../../Shared/TableSearchField";
import SelectList, { createList } from "@/components/Shared/SelectList";
import { Product } from "@/types/api/product.types";
import Link from "next/link";


export default function ProductSection({ products }: { products: Product[] }) {
  const { currentData, pagination } = usePagination({
    data: products,
    rowsPerPage: 5,
    itemLabel: "produk",
  });

  const CategoriesList = createList([
    { key: "semuaKategori", textValue: "Semua Kategori" },
    { key: "makananDanMinuman", textValue: "Makanan & Minuman" },
    { key: "pakaian", textValue: "Pakaian & Aksesoris" },
    { key: "gadget", textValue: "Elektronik & Gadget" },
  ]);
  const StatusList = createList([
    { key: "aktif", textValue: "Aktif" },
    { key: "nonaktif", textValue: "Tidak Aktif" },
  ]);

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
              href={"/produk/tambah"}
              className={`${buttonVariants({ variant: "primary" })} text-white rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700`}
            >
              <FontAwesomeIcon icon={faPlus} /> Tambah Produk
            </Link>
          </div>
        </div>
        <div id="table">
          <ReusableTable
            columns={productColumns}
            data={currentData}
            pagination={pagination}
            emptyMessage="Belum ada produk terdaftar"
          />
        </div>
      </div>
    </div>
  );
}
