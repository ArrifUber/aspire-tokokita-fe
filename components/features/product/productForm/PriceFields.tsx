import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Description,
  FieldError,
  Input,
  Label,
  NumberField,
} from "@heroui/react";
import React from "react";

interface PriceFieldsProps {
  IDR_FORMAT_OPTIONS: Intl.NumberFormatOptions;
  updateField: (key: string) => (value: string | number) => void;
  buyPrice: number;
  setBuyPrice: (value: number) => void;
  form: {
    stock: number;
    minimumStock: number;
  };
  sellPrice: number;
  setSellPrice: (value: number) => void;
}

export default function PriceFields({
  IDR_FORMAT_OPTIONS,
  buyPrice,
  setBuyPrice,
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
          <h2 className="text-xl font-semibold">2. Harga & Stok</h2>
          <p className="text-slate-500 text-sm">Atur harga dan stok produk.</p>
        </div>
      </div>
      <div className="flex gap-4 items-start flex-wrap">
        <FieldContainer>
          <NumberField
            isRequired
            name="buyPrice"
            className="w-full "
            value={buyPrice}
            onChange={setBuyPrice}
            minValue={0}
            formatOptions={IDR_FORMAT_OPTIONS}
          >
            <Label>Harga Beli</Label>
            <Input placeholder="Contoh: Rp10.000" className="rounded" />
            <Description>Modal atau harga pembelian produk.</Description>
            <FieldError />
          </NumberField>
        </FieldContainer>

        <FieldContainer>
          <NumberField
            isRequired
            name="sellPrice"
            className="w-full "
            value={sellPrice}
            onChange={setSellPrice}
            minValue={0}
            formatOptions={IDR_FORMAT_OPTIONS}
            validate={(value) => {
              if (value <= buyPrice) {
                return "Harga jual harus lebih besar dari harga beli.";
              }
              return null;
            }}
          >
            <Label>Harga Jual</Label>
            <Input placeholder="Contoh: Rp20.000" className="rounded" />
            <Description>Harga yang ditampilkan ke pelanggan.</Description>

            <FieldError />
          </NumberField>
        </FieldContainer>

        <FieldContainer>
          <NumberField
            isRequired
            name="minimumStock"
            className="w-full "
            value={form.minimumStock}
            onChange={updateField("minimumStock")}
            minValue={1}
            step={1}
          >
            <Label >Minimum Stock</Label>
            <Input placeholder="Contoh: 5" className="rounded" />
            <Description>Batas minimum stock, sebelum ditandai menipis.</Description>

            <FieldError />
          </NumberField>
        </FieldContainer>
        <FieldContainer>
          <NumberField
            isRequired
            name="stock"
            className="w-full "
            value={form.stock}
            onChange={updateField("stock")}
            minValue={0}
            step={1}
          >
            <Label >Jumlah Stok Awal</Label>
            <Input placeholder="Contoh: 10" className="rounded" />
            <Description>Stok tersedia saat produk ditambahkan.</Description>

            <FieldError />
          </NumberField>
        </FieldContainer>
      </div>
    </div>
  );
}

export function FieldContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-6 bg-gray-50 rounded-md border w-full">{children}</div>
  );
}
