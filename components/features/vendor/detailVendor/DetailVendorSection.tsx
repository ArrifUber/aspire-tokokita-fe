import { formatRupiah } from "@/components/Functions/FormatRupiah";
import { useGetFileByName } from "@/hooks/file/useGetFileByName";
import { formatPrice } from "@/lib/formatPrice";
import { VendorDetailResponse } from "@/types/api/vendor.types";
import { Button, buttonVariants, Chip } from "@heroui/react";
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

interface DetailVendorSectionProps {
  vendor: VendorDetailResponse;
}

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

interface ProductImageCellProps {
  filename: string | null;
}

function ProductImageCell({ filename }: ProductImageCellProps) {
  const { imageUrl, isLoading } = useGetFileByName(filename);

  if (isLoading) {
    return <div className="w-24 h-24 bg-gray-200 animate-pulse" />;
  }

  if (!imageUrl) {
    return (
      <img
        src="/image-placeholder.png"
        alt="product-image"
        className="w-24 h-24 object-cover p-2"
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt="product-image"
      className="w-24 h-24 object-cover"
    />
  );
}

export default function DetailVendorSection({
  vendor,
}: DetailVendorSectionProps) {
  console.log(vendor)
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
              {vendor.isActive ? "Aktif" : "Nonaktif"}
            </span>
          </div>
        </div>
      </div>

      {/* Info rows */}
      <div className="divide-y divide-gray-100 border-t border-b border-gray-100 px-4">
        <InfoRow icon={User} label="Contact Person" value={vendor.picName} />
        <InfoRow icon={Phone} label="No. WhatsApp" value={vendor.picPhone} />

        <InfoRow icon={Landmark} label="Bank" value={vendor.rekening} />
        <InfoRow
          icon={CreditCard}
          label="Nomor Rekening"
          value={vendor.noRekening}
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
        <div className="flex items-center justify-center">
          {vendor.products.length != 0 ? (
            <div className="flex items-center flex-wrap gap-3">
              {vendor.products.map((product) => (
                <VendorProductListCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-gray-800 leading-tight">
              Belum ada produk
            </p>
          )}
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
          href={`/vendor/edit/${vendor.id}`}
          className={`${buttonVariants({ variant: "primary" })} text-white rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700`}
        >
          <Pencil className="w-4 h-4" />
          Edit Vendor
        </Link>
      </div>
    </div>
  );
}

interface VendorProductListCardProps {
  product: VendorDetailResponse["products"][number];
}

function VendorProductListCard({ product }: VendorProductListCardProps) {
  return (
    <div className="bg-surface-secondary border-surface-border p-4 border rounded-sm  min-w-72  max-w-72 flex flex-col gap-2 shadow">
      <div className="flex gap-4 items-start">
        <div
          id="gambarProduk"
          className="flex justify-center items-center w-12 h-12 bg-primary-50 rounded-md shrink-0 overflow-hidden border"
        >
          <ProductImageCell filename={product.image} />
        </div>
        <div id="namaProduk">
          <p className="text-sm font-semibold text-gray-800">{product.name}</p>
          <p className="text-sm text-gray-500">{product.category.name}</p>
        </div>
      </div>

      <hr />

      <div className="flex flex-col  py-2.5">
        <div className="flex items-center gap-2 text-sm text-gray-500 justify-between">
          <span>Harga Jual</span>
          <span className={`text-sm font-medium text-gray-800`}>
            {formatPrice(product.sellPrice)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 justify-between">
          <span>Komisi</span>
          <span className={`text-sm font-medium text-gray-800`}>
            {product.commissionPercent * 100}%
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 justify-between">
          <span>Stock</span>
          <span className={`text-sm font-medium text-gray-800`}>
            {product.stock}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 justify-between">
          <span>Minimum Stock</span>
          <span className={`text-sm font-medium text-gray-800`}>
            {product.minimumStock}
          </span>
        </div>
      </div>

      <hr />

      <Link
        href={`/produk`}
        className={`${buttonVariants({ variant: "tertiary" })}  rounded-md shadow-sm self-end `}
      >
        <Pencil className="w-4 h-4" />
        Edit Produk
      </Link>
    </div>
  );
}
