"use client";
// import { vendorData } from "@/components/features/vendor/mock/vendor.mock";

import NavBanner from "@/components/Shared/NavBanner";
import { ReusableTable } from "@/components/Shared/ReusableTable";
import SelectList, { ListItemsDef } from "@/components/Shared/SelectList";
import { usePagination } from "@/hooks/usePagination";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, buttonVariants } from "@heroui/react";
import TableSearchField from "@/components/Shared/TableSearchField";
import { vendorColumns } from "@/components/features/vendor/vendor.columns";
import { Vendor } from "@/types/api/vendor.types";
import Link from "next/link";
import { useGetAllVendor } from "@/hooks/vendor/useGetAllVendor";

export default function SupplierPage() {
  const {error, isLoading, vendors} = useGetAllVendor()
  const { currentData, pagination } = usePagination({
    data: vendors,
    rowsPerPage: 5,
    itemLabel: "supplier",
  });

  const createList = <K extends string>(items: ListItemsDef<K>[]) => items;

  const CategoriesList = createList([
    { key: "semuaKategori", textValue: "Semua Kategori" },
    { key: "fAndB", textValue: "F&B" },
    { key: "toys", textValue: "Toys" },
    { key: "frozenFood", textValue: "Frozen Food" },
  ]);
  const StatusList = createList([
    { key: "semuaStatus", textValue: "Semua Status" },
    { key: "aktif", textValue: "Aktif" },
    { key: "pending", textValue: "Pending" },
    { key: "nonaktif", textValue: "Nonaktif" },
  ]);

  return (
    <div className="w-full flex flex-col gap-4 mx-auto">
      <section id="navBanner" className="w-full">
        <NavBanner bannerTitle="Daftar Vendor" />
      </section>
      <section className="w-full">
        <div className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border">
          <div className="flex flex-col bg-surface-tertiary border border-surface-border rounded-xl overflow-hidden">
            <div id="filter" className="flex gap-4 items-center p-6 w-full">
              <TableSearchField placeholder="Cari Supplier..." aria_label="Cari Supplier"/>
              {/* <SelectList
                ListItems={CategoriesList}
                placeholder="Pilih Kategori"
                defaultValue="semuaKategori"
                width={150}
                ariaLabel="Pilih kategori"
              /> */}
              <SelectList
                ListItems={StatusList}
                placeholder="Pilih Status"
                defaultValue="semuaStatus"
                width={150}
                ariaLabel="Pilih status"
              />
              <div className="ml-auto">
            <Link
              href={"/vendor/tambah"}
              className={`${buttonVariants({
                variant: "primary",
              })} text-white rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700`}
            >
              <FontAwesomeIcon icon={faPlus} /> Tambah Vendor
            </Link>
              </div>
            </div>
            <ReusableTable<Vendor>
              columns={vendorColumns}
              data={currentData}
              pagination={pagination}
              emptyMessage="Belum ada vendor terdaftar"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
