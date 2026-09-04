"use client";
import { ErrorAlert, SuccessAlert } from "@/components/Shared/CustomAlert";
import { createList } from "@/components/Shared/SelectList";
import { useSaveProduct } from "@/hooks/product/useSaveProduct";
import { AlertDialog, Button, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BasicInfoFields from "./BasicInfoFields";
import PriceFields from "./PriceFields";
import DescriptionField from "./DescriptionField";
import { Product } from "@/types/api/product.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useGetAllCategory } from "@/hooks/product/useGetAllCategory";
import { useUploadFile } from "@/hooks/file/useUploadFile";

// const PRODUCT_CATEGORY_LIST = createList([
//   { key: "aksesoris", textValue: "Aksesoris" },
//   { key: "elektronik", textValue: "Elektronik" },
// ]);

const IDR_FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  currency: "IDR",
  currencyDisplay: "narrowSymbol",
  style: "currency",
  minimumFractionDigits: 0,
};

const EMPTY_FORM_STATE = {
  name: "",
  categoryId: "",
  stock: 0,
  description: "",
  image: null,
  minimumStock: 0,
};

interface ProductFormSectionProps {
  mode: "create" | "edit";
  initialData: null | Product;
}

export default function ProductFormSection({
  initialData,
  mode,
}: ProductFormSectionProps) {
  const router = useRouter();

  const { categoryList } = useGetAllCategory();

  const { saveProduct, isLoading, error, isSuccess, clearError, clearSuccess } =
    useSaveProduct();

  const { upload, isUploading, error: uploadError } = useUploadFile();

  const [form, setForm] = useState(() => ({
    name: initialData?.name ?? "",
    categoryId: initialData?.categoryId ?? "",
    stock: initialData?.stock ?? 0,
    description: initialData?.description ?? "",
    image: initialData?.image ?? null,
    minimumStock: initialData?.minimumStock ?? 5
  }));

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [buyPrice, setBuyPrice] = useState(initialData?.buyPrice ?? 0);
  const [sellPrice, setSellPrice] = useState(initialData?.sellPrice ?? 0);

  const updateField = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageFileName = form.image;

    if(form.image){
      imageFileName = form.image
    }
    else if (imageFile) {
      try {
        const uploadResult = await upload({ file: imageFile });
        imageFileName = uploadResult.filename;
      } catch (err) {
        return;
      }
    } else if (imageFile === null) {
      imageFileName = null;
    }

    const payload = {
      ...form,
      image: imageFileName,
      buyPrice,
      sellPrice,
    };

    const success = await saveProduct(payload, initialData?.id);

    if (success) {
      if (mode === "create") {
        setForm(EMPTY_FORM_STATE);
        setBuyPrice(0);
        setSellPrice(0);
        router.push("/produk");
      } else {
        router.push("/produk");
      }
    }
  };

  const isEditMode = mode === "edit";

  return (
    <div>
      {error && (
        <ErrorAlert
          desc={error}
          clearAlert={clearError}
          title={
            isEditMode ? "Gagal Memperbarui Produk" : "Gagal Menambahkan Produk"
          }
        />
      )}
      {isSuccess && (
        <SuccessAlert
          title={
            isEditMode
              ? "Berhasil memperbarui produk"
              : "Berhasil menambahkan produk"
          }
          clearAlert={clearSuccess}
        />
      )}

      <Form
        className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border"
        onSubmit={handleSubmit}
      >
        {/* <ImageField
          value={form.image}
          onChange={(file) => setImageFile(file)}
        /> */}
        <BasicInfoFields
          PRODUCT_CATEGORY_LIST={categoryList}
          form={form}
          updateField={updateField}
          setImageFile={setImageFile}
        />
        <hr />
        <PriceFields
          IDR_FORMAT_OPTIONS={IDR_FORMAT_OPTIONS}
          buyPrice={buyPrice}
          form={form}
          sellPrice={sellPrice}
          setBuyPrice={setBuyPrice}
          setSellPrice={setSellPrice}
          updateField={updateField}
        />
        <hr />
        <div className="flex flex-col gap-4">
          <DescriptionField form={form} updateField={updateField} />
          <hr />
          <div className="flex gap-4 items-center w-full justify-end">
            <CancelButton isEditMode={isEditMode} router={router} />
            <Button
              variant="primary"
              className="rounded-md shadow-sm border-0 bg-primary hover:bg-primary-700"
              type="submit"
              isDisabled={isLoading}
            >
              {isLoading
                ? isEditMode
                  ? "Menyimpan..."
                  : "Menambahkan..."
                : isEditMode
                  ? "Simpan Perubahan"
                  : "Tambahkan Produk"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

interface CancelButtonProps {
  router: AppRouterInstance;
  isEditMode: boolean;
}

function CancelButton({ router, isEditMode }: CancelButtonProps) {
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
              <AlertDialog.Heading>
                {isEditMode
                  ? "Batalkan perubahan produk?"
                  : "Batalkan penambahan produk?"}{" "}
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                {isEditMode
                  ? "Perubahan yang sudah Anda buat belum disimpan dan akan hilang kalau Anda keluar sekarang."
                  : "Data yang sudah Anda isi belum disimpan dan akan hilang kalau Anda keluar sekarang."}
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" className="rounded">
                Lanjutkan Mengisi
              </Button>
              <Button
                onPress={() => router.push("/produk")}
                variant="danger-soft"
                className="rounded"
              >
                Ya, Batalkan
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
