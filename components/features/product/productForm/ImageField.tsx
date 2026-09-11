"use client";
import { useGetFileByName } from "@/hooks/file/useGetFileByName";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ImageFieldProps {
  value: string | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export default function ImageField({
  value,
  onChange,
  error,
}: ImageFieldProps) {
  const {
    imageUrl: fetchedImageUrl,
    isLoading: isLoadingImage,
    error: fetchError,
  } = useGetFileByName(value ?? "");

  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [removedExisting, setRemovedExisting] = useState(false);

  const [localError, setLocalError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  useEffect(() => {
    setRemovedExisting(false);
  }, [value]);

  const preview = localPreview ?? (removedExisting ? null : fetchedImageUrl);

  const validateFile = (file: File): string => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Format file harus JPG, PNG, atau WebP";
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `Ukuran file maksimal ${MAX_SIZE_MB}MB`;
    }
    return "";
  };

  const handleFile = (file: File | undefined | null) => {
    if (!file) return;

    const errMsg = validateFile(file);
    if (errMsg) {
      setLocalError(errMsg);
      return;
    }

    setLocalError("");
    setLocalPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    setLocalPreview(null);
    setRemovedExisting(true);
    setLocalError("");
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-6 bg-surface-tertiary rounded-md border">
      <h2 className="text-sm font-semibold">Gambar Produk</h2>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="rounded-lg flex flex-col items-center justify-center gap-3"
      >
        {isLoadingImage && !localPreview ? (
          <div className="w-48 h-48 rounded-lg bg-muted animate-pulse border" />
        ) : preview ? (
          <div className="relative w-48 h-48 border rounded-lg bg-primary-50">
            <img
              src={preview}
              alt="Preview produk"
              className="w-full h-full object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="danger"
              onPress={handleRemove}
              className="absolute -top-2 -right-2 rounded-full w-6 h-6 min-w-0 p-0 flex items-center justify-center text-xs"
              aria-label="Hapus gambar"
            >
              ✕
            </Button>
          </div>
        ) : (
          <div className="relative w-48 h-48 border rounded-lg bg-primary-50">
            <img
              src="/image-placeholder.png"
              alt="Preview produk"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <Button
          type="button"
          variant="ghost"
          onPress={() => inputRef.current?.click()}
          className="mt-2 rounded-md w-full border"
        >
          <FontAwesomeIcon icon={faUpload} /> Upload File
        </Button>
        <p className="text-xs text-start self-start text-slate-400">{"Format: JPG, PNG, WebP (maks. 5MB)"} </p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {(localError || error || fetchError) && (
        <p className="text-sm text-danger">
          {localError || error || fetchError}
        </p>
      )}
    </div>
  );
}
