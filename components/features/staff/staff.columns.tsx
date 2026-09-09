import type { ColumnDef } from "@/components/Shared/ReusableTable"; 
import { User } from "@/types/api/auth.types";
import { faEllipsis, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Label } from "@heroui/react";

export type Staff = User;

export const staffColumns: ColumnDef<Staff>[] = [
  {
    key: "name",
    label: "Nama & Email",
    minWidth: 200,
    renderCell: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">{row.name}</span>
        <span className="text-sm text-gray-400 mt-0.5">{row.email}</span>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    minWidth: 150,
    renderCell: (row) => (
      <span className="capitalize">
        {row.role ?? <span className="text-slate-400 italic">Belum diatur</span>}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Aksi",
    minWidth: 140,
    renderCell: (row) => (
      <div className="flex gap-2">
                <Dropdown>
                  <Button
                    aria-label="more-action"
                    isIconOnly
                    variant="outline"
                    className={"rounded-md"}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </Button>
        
                  <Dropdown.Popover className="rounded-md min-w-0 w-42">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        id="view-product"
                        textValue="Lihat Detail"
                        className="rounded"
                        // onAction={handleActionModal}
                      >
                        <FontAwesomeIcon icon={faEye} />
        
                        <Label>Lihat Detail</Label>
                      </Dropdown.Item>
                      <Dropdown.Item
                        id="delete-product"
                        textValue="Hapus Produk"
                        variant="danger"
                        className="rounded"
                        // onAction={handleActionAlert}
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-danger" />
                        <Label>Hapus Produk</Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
      </div>
    ),
  },
];