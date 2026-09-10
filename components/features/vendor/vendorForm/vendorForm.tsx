"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Label,
  ListBox,
  NumberField,
  NumberFieldGroup,
  Select,
  TextField,
} from "@heroui/react";
import type { VendorFormData, VendorStatus } from "@/types/api/vendor.types";

interface VendorFormProps {
  mode: "create" | "edit";
  initialData?: VendorFormData;
  onSubmit?: (data: VendorFormData) => void | Promise<void>;
}

const defaultValues: VendorFormData = {
  name: "",
  kontak: "",
  namaKontak: "",
  rekening: "",
  noRekening: "",
  status: "Aktif",
};

export function VendorForm({
  mode,
  initialData = defaultValues,
  onSubmit,
}: VendorFormProps) {
  const router = useRouter();

  const isEdit = mode === "edit";

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: VendorFormData = {
      name: String(formData.get("name") ?? ""),
      kontak: String(formData.get("kontak") ?? ""),
      rekening: String(formData.get("rekening") ?? ""),
      noRekening: String(formData.get("noRekening") ?? ""),
      namaKontak: String(formData.get("namaKontak") ?? ""),
      status: String(
        formData.get("status") ?? "Aktif",
      ) as VendorStatus,
    };

    await onSubmit?.(data);

    // Untuk sementara, setelah submit kembali ke list.
    // Nanti bisa diganti setelah API backend tersedia.
    router.push("/vendor");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border"
    >
      {/* Nama Vendor */}
      <TextField
        name="name"
        isRequired
        defaultValue={initialData.name}
        className="w-full"
      >
        <Label>Nama Vendor</Label>
        <Input placeholder="Masukkan nama vendor" className={"rounded"} />
      </TextField>

      {/* Kontak */}
      <TextField
        name="kontak"
        isRequired
        defaultValue={initialData.kontak}
        className="w-full"
        minLength={4}
      >
        <Label>No. WhatsApp</Label>
        <Input placeholder="Contoh: 081234567890" className={"rounded"} type="number" inputMode="tel"/>
      </TextField>

      <TextField
        name="namaKontak"
        isRequired
        defaultValue={initialData.namaKontak}
        className="w-full"
      >
        <Label>Contact Person</Label>
        <Input placeholder="Contoh: Pak Budi " className={"rounded"}/>
      </TextField>

      {/* Bank */}
      <Select
        name="rekening"
        isRequired
        defaultValue={initialData.rekening}
        className="w-full"
        placeholder="Pilih bank"
      >
        <Label>Bank</Label>

        <Select.Trigger className={"rounded-md"}>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover className={"rounded-md"}>
          <ListBox className="*:rounded-sm">
            <ListBox.Item id="BCA" textValue="BCA">
              BCA
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="BRI" textValue="BRI">
              BRI
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="BNI" textValue="BNI">
              BNI
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Mandiri" textValue="Mandiri">
              Mandiri
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      {/* Nomor Rekening */}
      <TextField
        name="noRekening"
        isRequired
        defaultValue={initialData.noRekening}
        className="w-full"
        minLength={9}
      >
        <Label>Nomor Rekening</Label>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Masukkan nomor rekening"
          className={"rounded"}
        />
      </TextField>

      {/* Status hanya pada Edit */}
      {isEdit && (
        <Select
          name="status"
          isRequired
          defaultValue={initialData.status}
          className="w-full"
        >
          <Label>Status Vendor</Label>

          <Select.Trigger className={"rounded-md"}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover className={"rounded-md"}>
            <ListBox className={"*:rounded-sm"}>
              <ListBox.Item
                id="Aktif"
                textValue="Aktif"
              >
                Aktif
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item
                id="Nonaktif"
                textValue="Nonaktif"
              >
                Nonaktif
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="tertiary" className="rounded-md shadow-sm border-0"

          onPress={() => router.push("/vendor")}
        >
          Batal
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700"
        >
          {isEdit ? "Simpan Perubahan" : "Simpan Vendor"}
        </Button>
      </div>
    </Form>
  );
}