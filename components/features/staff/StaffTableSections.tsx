'use client'
import { useMemo, useState } from "react";
import { ReusableTable } from "@/components/Shared/ReusableTable";
import SelectList, { createList } from "@/components/Shared/SelectList";
import TableSearchField from "@/components/Shared/TableSearchField";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import { staffColumns, type Staff } from "./staff.columns";
import { usePagination } from "@/hooks/usePagination";
import { useStaff } from "@/hooks/staff/useStaff";
import { useRouter } from "next/navigation";
import { roles } from "@/lib/listRoles";

export default function StaffTableSection() {
  const router = useRouter()
  const { staff, isLoading, error } = useStaff();

    

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const filteredStaff = useMemo(() => {
    return staff.filter((s: Staff) => {
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = !roleFilter || s.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [staff, search, roleFilter]);


  const { currentData, pagination } = usePagination({
    data: filteredStaff,
    rowsPerPage: 5,
    itemLabel: "staff",
  });

  const RoleList = createList(
    roles.map((r) => ({ key: r.id, textValue: r.name }))
  );

  return (
    <div className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border">
      <div className="flex flex-col bg-surface-tertiary border border-surface-border rounded-xl overflow-hidden">
        <div id="filter" className="flex gap-4 items-center p-6 w-full">
          <TableSearchField
            placeholder="Cari Staff..."
            aria_label="Cari Staff"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SelectList
            ListItems={RoleList}
            placeholder="Semua Role"
            width={160}
            ariaLabel="Pilih role"
            onSelectionChange={(key) => setRoleFilter(key as string)} 
          />
          <div className="ml-auto">
            <Button
              variant="primary"
              className="rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700"
              onPress={() => router.push("/staff/tambah")}
            >
              <FontAwesomeIcon icon={faPlus} /> Tambah Staff
            </Button>
          </div>
        </div>

        {error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : (
          <ReusableTable<Staff>
            columns={staffColumns}
            data={currentData}
            pagination={pagination}
            emptyMessage="Belum ada data staff tersedia"
          />
        )}
      </div>
    </div>
  );
}