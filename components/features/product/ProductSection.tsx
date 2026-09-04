"use client";

import { useState } from "react";
import { buttonVariants } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { usePagination } from "@/hooks/usePagination";
import { ReusableTable } from "@/components/Shared/ReusableTable";
import { productColumns } from "./product.columns";
import TableSearchField from "../../Shared/TableSearchField";
import SelectList, { createList } from "@/components/Shared/SelectList";
import Link from "next/link";
import { useGetAllCategory } from "@/hooks/product/useGetAllCategory";
import { useGetAllProduct } from "@/hooks/product/useGetAllProduct";
import { ProductQueryParams } from "@/lib/api/product";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductSection() {
  // 1. State untuk menampung filter
  const [search, setSearch] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [status, setStatus] = useState<string>("all");

  const debouncedSearch = useDebounce(search, 400);

  // 2. Susun parameter query untuk SWR Hook
  const queryParams: ProductQueryParams = {
    search: debouncedSearch || undefined,
    categoryId: categoryId === "all" ? undefined : categoryId || undefined,
    isActive:
    status === "all" ? undefined : status === "aktif" ? true : status === "nonaktif" ? false : undefined
  };


  // 3. Panggil data produk langsung dari SWR Hook (Bukan via Props Static)
  const { products, isLoading, refetch } = useGetAllProduct(queryParams);
  const { categoryList } = useGetAllCategory();

  // 4. Client-side pagination untuk memotong data per halaman
  const { currentData, pagination } = usePagination({
    data: products,
    rowsPerPage: 5,
    itemLabel: "produk",
  });

  const CategoriesList = [
    { key: "all", textValue: "Semua Kategori" },
    ...categoryList,
  ];

  const StatusList = createList([
    { key: "aktif", textValue: "Aktif" },
    { key: "nonaktif", textValue: "Tidak Aktif" },
    {key: "all", textValue: "Semua"}
  ]);

  return (
    <div className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border">
      <div className="flex flex-col bg-surface-tertiary border border-surface-border rounded-xl overflow-hidden">
        <div id="filter" className="flex gap-4 items-center p-6 w-full">
          {/* Input Search */}
          <TableSearchField
            placeholder="Cari Produk..."
            aria_label="Cari Produk"
            onChange={(e) => setSearch(e.target.value)}
          />

          <SelectList
            ListItems={CategoriesList}
            placeholder="Pilih Kategori"
            ariaLabel="Pilih Kategori"
            selectedKey={categoryId || "all"}
            width={200}
            onChange={(value) => setCategoryId(value)}
          />

          <SelectList
            ListItems={StatusList}
            placeholder="Status"
            width={128}
            ariaLabel="pilih status"
            selectedKey={status}
            onChange={(value) => setStatus(value)}
          />

          <div className="ml-auto">
            <Link
              href={"/produk/tambah"}
              className={`${buttonVariants({
                variant: "primary",
              })} text-white rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700`}
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
            isLoading={isLoading}

            emptyMessage="Belum ada produk terdaftar"
          />
        </div>
      </div>
    </div>
  );
}
