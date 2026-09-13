"use client";

import { useState } from "react";
import { buttonVariants } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { usePagination } from "@/hooks/usePagination";
import { ReusableTable } from "@/components/Shared/ReusableTable";
import TableSearchField from "../../Shared/TableSearchField";
import SelectList, { createList } from "@/components/Shared/SelectList";
import { useDebounce } from "@/hooks/useDebounce";

import { useGetAllVendor } from "@/hooks/vendor/useGetAllVendor";

export default function SettlementSection() {
  // 1. State untuk menampung filter & seleksi baris
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [vendorId, setVendorId] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const debouncedSearch = useDebounce(search, 400);

  // 2. Susun parameter query untuk SWR Hook
  const queryParams: SettlementQueryParams = {
    search: debouncedSearch || undefined,
    status: status === "all" ? undefined : (status as SettlementStatus),
    vendorId: vendorId === "all" ? undefined : vendorId || undefined,
  };

  // 3. Panggil data settlement & vendor langsung dari SWR Hook
  const { settlements, isLoading, refetch } = useGetAllSettlement(queryParams);
  const { vendorList } = useGetAllVendor();
  const { trigger: processSettlement, isMutating: isProcessing } =
    useProcessSettlement();

  // 4. Client-side pagination untuk memotong data per halaman
  const { currentData, pagination } = usePagination({
    data: settlements,
    rowsPerPage: 10,
    itemLabel: "vendor",
  });

  const VendorFilterList = [
    { key: "all", textValue: "Semua Vendor" },
    ...vendorList,
  ];

  const StatusFilterList = createList([
    { key: "all", textValue: "Semua Status" },
    { key: "lunas", textValue: "Lunas" },
    { key: "pending", textValue: "Pending" },
    { key: "menunggu", textValue: "Menunggu" },
  ]);

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleProcessSettlement = async () => {
    if (selectedIds.length === 0) return;
    try {
      await processSettlement({ settlementIds: selectedIds });
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("Gagal memproses settlement:", error);
    }
  };

  const columns = createSettlementColumns({
    selectedIds,
    onToggleRow: handleToggleRow,
  });

  return (
    <div className="flex flex-col gap-6 bg-white rounded-2xl p-6 shadow border">
      <div className="flex flex-col bg-surface-tertiary border border-surface-border rounded-xl overflow-hidden">
        <div id="filter" className="flex gap-4 items-center p-6 w-full">
          {/* Input Search */}
          <TableSearchField
            placeholder="Cari vendor..."
            aria_label="Cari vendor"
            onChange={(e) => setSearch(e.target.value)}
          />

          <SelectList
            ListItems={StatusFilterList}
            placeholder="Semua Status"
            ariaLabel="Pilih status"
            selectedKey={status}
            width={160}
            onChange={(value) => setStatus(value)}
          />

          <SelectList
            ListItems={VendorFilterList}
            placeholder="Semua Vendor"
            ariaLabel="Pilih vendor"
            selectedKey={vendorId}
            width={200}
            onChange={(value) => setVendorId(value)}
          />

          <div className="ml-auto">
            <button
              type="button"
              onClick={handleProcessSettlement}
              disabled={selectedIds.length === 0 || isProcessing}
              className={`${buttonVariants({
                variant: "primary",
              })} text-white rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <FontAwesomeIcon icon={faFileInvoiceDollar} /> Proses Settlement
              {selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
            </button>
          </div>
        </div>

        <div id="table">
          <ReusableTable
            columns={columns}
            data={currentData}
            pagination={pagination}
            isLoading={isLoading}
            emptyMessage="Belum ada data settlement pada periode ini"
          />
        </div>
      </div>
    </div>
  );
}