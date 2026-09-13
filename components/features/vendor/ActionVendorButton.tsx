"use client";
import {
  ErrorAlert,
  LoadingAlert,
  SuccessAlert,
} from "@/components/Shared/CustomAlert";
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct";
import {
  faEllipsis,
  faEye,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertDialog, Button, Dropdown, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import {  useState } from "react";

interface Props {
  id: string;
}

export default function ActionVendorButton({ id }: Props) {
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    clearError,
    clearSuccess,
    deleteProduct,
    error,
    isLoading,
    isSuccess,
  } = useDeleteProduct();

  const handleActionAlert = () => {
    setTimeout(() => {
      setIsAlertOpen(true);
    }, 100);
  };

  const handleActionModal = () => {
    setTimeout(() => {
      router.push(`/vendor/detail/${id}`)
    }, 100);
  };

  const handleDelete = async () => {
    deleteProduct(id);

    setIsAlertOpen(false);
  };

  return (
    <>
      {isLoading && <LoadingAlert title="Sedang menghapus produk..." />}
      {error && (
        <ErrorAlert
          desc={error}
          clearAlert={clearError}
          title="Gagal Menghapus Produk"
        />
      )}
      {isSuccess && (
        <SuccessAlert
          title="Berhasil Menghapus Produk"
          clearAlert={clearSuccess}
        />
      )}
      <div className="flex items-center gap-2">
        <Button
          aria-label="edit-data"
          isIconOnly
          variant="outline"
          className={"rounded-md"}
          onPress={() => router.push(`/vendor/edit/${id}`)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
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
                onAction={handleActionModal}
              >
                <FontAwesomeIcon icon={faEye} />

                <Label>Lihat Detail</Label>
              </Dropdown.Item>
              <Dropdown.Item
                id="delete-product"
                textValue="Hapus Produk"
                variant="danger"
                className="rounded"
                onAction={handleActionAlert}
              >
                <FontAwesomeIcon icon={faTrash} className="text-danger" />
                <Label>Hapus Produk</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        <AlertDialog isOpen={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px] rounded-md">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading>
                    Hapus vendor ini?
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>Tindakan ini tidak dapat dibatalkan. Data vendor akan dihapus secara permanen.</p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button
                    variant="tertiary"
                    className="rounded"
                    onPress={() => setIsAlertOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="danger-soft"
                    className="rounded"
                    onPress={handleDelete}
                  >
                    Ya, Hapus Vendor
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      </div>
    </>
  );
}
