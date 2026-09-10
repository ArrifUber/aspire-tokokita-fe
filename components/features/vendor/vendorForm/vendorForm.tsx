"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import type { Vendor, VendorFormData } from "@/types/api/vendor.types";
import { useSaveVendor } from "@/hooks/vendor/useSaveVendor";
import { useState } from "react";

interface VendorFormProps {
  mode: "create" | "edit";
  initialData?: Vendor;
  onSubmit?: (data: VendorFormData) => void | Promise<void>;
}

const defaultValues = {
  name: "",
  picName: "",
  picPhone: "",
  rekening: "",
  noRekening: "",
  isActive: true,
};


export function VendorForm({
  mode,
  initialData,
  onSubmit,
}: VendorFormProps) {
  console.log(initialData)
  const {saveVendor, isLoading, isSuccess, clearError, clearSuccess, error} = useSaveVendor() 
  const router = useRouter();

   const [form, setForm] = useState(() => ({
      name: initialData?.name ?? "",
      picName: initialData?.picName ?? "",
      picPhone: initialData?.picPhone ?? "",
      rekening: initialData?.rekening ?? "",
      noRekening: initialData?.noRekening ?? "",
      isActive: initialData?.isActive ?? false,
    }));

  const updateField = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  

  const isEdit = mode === "edit";

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault();

    const payload = {
      ...form
    }

    console.log(payload)

    const success = await saveVendor(payload, initialData?.id);

    if (success) {
      if (mode === "create") {
        setForm(defaultValues);
        router.push("/vendor");
      } else {
        router.push("/vendor");
      }
    }
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
        defaultValue={form.name}
        className="w-full"
      >
        <Label>Nama Vendor</Label>
        <Input placeholder="Masukkan nama vendor" className={"rounded"} onChange={(e) => updateField("name")(e.target.value)}/>
      </TextField>

      {/* Kontak */}
      <TextField
        name="kontak"
        isRequired
        defaultValue={form.picPhone}
        className="w-full"
        minLength={4}
      >
        <Label>No. WhatsApp</Label>
        <Input placeholder="Contoh: 081234567890" className={"rounded"} type="number" inputMode="tel" onChange={(e) => updateField("picPhone")(e.target.value)}/>
      </TextField>

      <TextField
        name="namaKontak"
        isRequired
        defaultValue={form.picName}
        className="w-full"
      >
        <Label>Contact Person</Label>
        <Input placeholder="Contoh: Pak Budi " className={"rounded"} onChange={(e) => updateField("picName")(e.target.value)}/>
      </TextField>

      {/* Bank */}
      <Select
        name="rekening"
        isRequired
        defaultValue={form.rekening}
        className="w-full"
        placeholder="Pilih bank"
        onChange={updateField("rekening")}
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
        defaultValue={form.noRekening}
        className="w-full"
        minLength={9}
      >
        <Label>Nomor Rekening</Label>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Masukkan nomor rekening"
          className={"rounded"}
          onChange={(e) => updateField("noRekening")(e.target.value)}
        />
      </TextField>

      {/* Status hanya pada Edit */}
      {isEdit && (
        <Select
          name="status"
          isRequired
          defaultValue={(form.isActive ? "Aktif" : "Nonaktif")}
          className="w-full"
          onChange={updateField("isActive")}
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