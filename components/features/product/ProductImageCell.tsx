"use client";

import { useGetFileByName } from "@/hooks/file/useGetFileByName";

interface ProductImageCellProps {
  filename: string | null;
}

export default function ProductImageCell({ filename }: ProductImageCellProps) {
  const { imageUrl, isLoading } = useGetFileByName(filename);

  if (isLoading) {
    return <div className="w-full h-full bg-gray-200 animate-pulse" />;
  }

  if (!imageUrl) {
    // Fallback kalau produk belum punya gambar / gagal fetch
    return (
    <img
      src="/image-placeholder.png"
      alt="product-image"
      className="w-full h-full object-cover"
    />
    );
  }

  return (
    <img
      src={imageUrl}
      alt="product-image"
      className="w-full h-full object-cover"
    />
  );
}