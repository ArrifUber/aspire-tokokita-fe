import { Button, buttonVariants } from "@heroui/react";
import {
  User,
  Phone,
  Landmark,
  Package,
  Pencil,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

const vendor = {
  name: "Kopi Nusantara",
  status: "Aktif",
  contactPerson: "Budi Santoso",
  whatsapp: "081234567890",
  bank: "BCA",
  nomerRekening: "1234 5678 90",
  jumlahProduk: "12 jenis",
  products: [
    { name: "Kopi Arabica", count: "5 jenis" },
    { name: "Kopi Robusta", count: "3 jenis" },
  ],
};

function InfoRow({ icon: Icon, label, value, valueClassName = "" }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Icon className="w-6 h-6 text-gray-700" />
        <span>{label}</span>
      </div>
      <span className={`text-sm font-medium text-gray-800 ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

export default function DetailVendorSection() {
  return (
    <div className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
          <span className="text-2xl">{vendor.name[0]}</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-start flex-col gap-2">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {vendor.name}
            </h3>
            <span className="text-sm font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
              {vendor.status}
            </span>
          </div>
        </div>
      </div>

      {/* Info rows */}
      <div className="divide-y divide-gray-100 border-t border-b border-gray-100 px-4">
        <InfoRow
          icon={User}
          label="Contact Person"
          value={vendor.contactPerson}
        />
        <InfoRow icon={Phone} label="No. WhatsApp" value={vendor.whatsapp} />

        <InfoRow icon={Landmark} label="Bank" value={vendor.bank} />
        <InfoRow
          icon={CreditCard}
          label="Nomor Rekening"
          value={vendor.nomerRekening}
        />
        <InfoRow
          icon={Package}
          label="Jumlah Produk Titipan"
          value={vendor.jumlahProduk}
        />
      </div>

      {/* Products */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-3">
          Produk yang Dititipkan
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {vendor.products.map((product) => (
              <div key={product.name} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-sm shrink-0">
                  ☕
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800 leading-tight">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400 leading-tight">
                    {product.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        </div>
      </div>
      <div className="flex w-full gap-2 justify-end">
        <Link
          href={`/vendor`}
          className={`${buttonVariants({ variant: "tertiary" })}  rounded-md shadow-sm `}
        >
          Kembali
        </Link>
        <Link
          href={`/produk/edit/1`}
          className={`${buttonVariants({ variant: "primary" })} text-white rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700`}
        >
          <Pencil className="w-4 h-4" />
          Edit Produk
        </Link>
      </div>
    </div>
  );
}
