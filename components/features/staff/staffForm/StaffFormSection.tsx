"use client";
import { ErrorAlert, SuccessAlert } from "@/components/Shared/CustomAlert";
import { AlertDialog, Button, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StaffBasicFields from "./StaffBasicFields";
import StaffAccessFields from "./StaffAccessFields";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useCreateStaff } from "@/hooks/staff/useCreateStaff";
import { roles } from "@/lib/listRoles";

const EMPTY_FORM_STATE = {
  name: "",
  email: "",
  password: "",
  role: "",
};

export default function StaffFormSection() {
  const router = useRouter();

//   const { roles, isLoading: isRolesLoading } = useRoles();

  const { createStaff, isLoading, error, isSuccess, clearError, clearSuccess } =
    useCreateStaff();

  const [form, setForm] = useState(EMPTY_FORM_STATE);

  const updateField = (key: keyof typeof EMPTY_FORM_STATE) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await createStaff(form);

    if (success) {
      setForm(EMPTY_FORM_STATE);
      router.push("/staff");
    }
  };

  return (
    <div>
      {error && (
        <ErrorAlert desc={error} clearAlert={clearError} title="Gagal Menambahkan Staff" />
      )}
      {isSuccess && (
        <SuccessAlert title="Berhasil menambahkan staff" clearAlert={clearSuccess} />
      )}

      <Form
        className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border"
        onSubmit={handleSubmit}
      >
        <StaffBasicFields form={form} updateField={updateField} />
        <hr />
        <StaffAccessFields
          form={form}
          updateField={updateField}
          roles={roles}
        />
        <hr />
        <div className="flex gap-4 items-center w-full justify-end">
          <CancelButton router={router} />
          <Button
            variant="primary"
            className="rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700"
            type="submit"
            isDisabled={isLoading}
          >
            {isLoading ? "Menambahkan..." : "Tambahkan Staff"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

interface CancelButtonProps {
  router: AppRouterInstance;
}

function CancelButton({ router }: CancelButtonProps) {
  return (
    <AlertDialog>
      <Button variant="tertiary" className="rounded-md shadow-sm border-0">
        Batal
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] rounded-md">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="warning" />
              <AlertDialog.Heading>Batalkan penambahan staff?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>Data yang sudah Anda isi belum disimpan dan akan hilang kalau Anda keluar sekarang.</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" className="rounded">
                Lanjutkan Mengisi
              </Button>
              <Button onPress={() => router.push("/staff")} variant="danger-soft" className="rounded">
                Ya, Batalkan
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}