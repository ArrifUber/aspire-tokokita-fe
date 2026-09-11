import { Vendor } from "@/types/api/vendor.types";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Description,
  FieldError,
  Input,
  Label,
  ListBox,
  NumberField,
  Select,
} from "@heroui/react";
import React from "react";

interface PriceFieldsProps {
  IDR_FORMAT_OPTIONS: Intl.NumberFormatOptions;
  updateField: (key: string) => (value: string | number) => void;
  form: {
    stock: number;
    minimumStock: number;

  };
  sellPrice: number;
  setSellPrice: (value: number) => void;
}

export default function PriceFields({
  IDR_FORMAT_OPTIONS,
  updateField,
  form,
  sellPrice,
  setSellPrice,
}: PriceFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div className="bg-green-100 p-2 rounded-md w-14 h-14 flex items-center justify-center">
          <FontAwesomeIcon icon={faCoins} size="xl" className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">3. Harga & Stok</h2>
          <p className="text-slate-500 text-sm">
            Atur harga dan ketersedian produk.
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-start flex-wrap md:flex-nowrap">


        <NumberField
          isRequired
          name="sellPrice"
          className={"w-full"}
          value={sellPrice}
          onChange={setSellPrice}
          minValue={0}
          formatOptions={IDR_FORMAT_OPTIONS}
        >
          <Label className="font-semibold">Harga Jual</Label>
          <Input placeholder="Contoh: Rp20.000" className="rounded" />
          <Description>Harga jual produk.</Description>

          <FieldError />
        </NumberField>

                <NumberField
          isRequired
          name="stock"
          className="w-full flex flex-col"
          value={form.stock}
          onChange={updateField("stock")}
          minValue={0}
          step={1}
        >
          <Label className="font-semibold">Jumlah Stok Awal</Label>
          <Input placeholder="Contoh: 10" className="rounded" />
          <Description>Stok tersedia saat produk ditambahkan.</Description>

          <FieldError />
        </NumberField>

        <NumberField
          isRequired
          name="minimumStock"
className={"w-full"}

          value={form.minimumStock}
          onChange={updateField("minimumStock")}
          minValue={1}
          step={1}
        >
          <Label className="font-semibold">Minimum Stock</Label>
          <Input placeholder="Contoh: 5" className="rounded" />
          <Description>
            Batas minimum stock, sebelum ditandai menipis.
          </Description>

          <FieldError />
        </NumberField>
      </div>
    </div>
  );
}

export function FieldContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-6 bg-gray-50 rounded-md border w-full">
      {children}
    </div>
  );
}
