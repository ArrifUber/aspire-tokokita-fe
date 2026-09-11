import { Vendor } from "@/types/api/vendor.types";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Description,
  Label,
  ListBox,
  NumberField,
  Select,
  Input,
  FieldError,
} from "@heroui/react";

interface KonsinyasiFieldsProps {
  updateField: (key: string) => (value: string | number) => void;
  form: {
    vendorId: string;
    commissionPercent: number;
  };
  VENDOR_CATEGORY_LIST: Vendor[];
}

export default function KonsinyasiField({
  updateField,
  VENDOR_CATEGORY_LIST,
  form,
}: KonsinyasiFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div className="bg-green-100 p-2 rounded-md w-14 h-14 flex items-center justify-center">
          <FontAwesomeIcon icon={faStore} size="xl" className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">2. Vendor & Komisi</h2>
          <p className="text-slate-500 text-sm">
            Pilih vendor dan atur komisi toko untuk produk ini.
          </p>
        </div>
      </div>
      <div className="flex gap-4  items-start">
        <Select
          isRequired
          aria-label="pilih category"
          className={"w-1/2"}
          value={form.vendorId}
          onChange={updateField("vendorId")}
        >
          <Label className="font-semibold">Vendor</Label>
          <Select.Trigger className={"rounded-md"}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className={"rounded-md"}>
            <ListBox className="*:rounded-sm">
              {VENDOR_CATEGORY_LIST.map((item) => {
                return (
                  <ListBox.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.name}
                  >
                    {item.name}
                  </ListBox.Item>
                );
              })}
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>

        <NumberField
          isRequired
          name="commisionPercent"
          className={"w-1/2"}
          formatOptions={{ style: "percent" }}
          value={form.commissionPercent}
          onChange={updateField("commissionPercent")}
          maxValue={1}
          minValue={0}
        >
          <Label className="font-semibold">Komisi Toko (%)</Label>
          <Input placeholder="Contoh: 10" className="rounded" />
          <Description>Jumlah komisi toko dalam bentuk persen.</Description>
          <FieldError>Percentage must be between 0 and 100</FieldError>{" "}
        </NumberField>
      </div>
    </div>
  );
}
