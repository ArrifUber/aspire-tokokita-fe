import {
  FieldError,
  Input,
  TextField,
  Label,
  Select,
  ListBox,
  Description,
} from "@heroui/react";
import ImageField from "./ImageField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faLightbulb } from "@fortawesome/free-solid-svg-icons";

interface BasicInfoFieldsProps {
  form: {
    name: string;
    categoryId: string;
    image: string | null;
  };
  updateField: (key: string) => (value: string) => void;
  PRODUCT_CATEGORY_LIST: { key: string; textValue: string }[];
  setImageFile: (file) => void;
}

export default function BasicInfoFields({
  form,
  updateField,
  PRODUCT_CATEGORY_LIST,
  setImageFile,
}: BasicInfoFieldsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <div className="bg-green-100 p-2 rounded-md w-14 h-14 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faCircleInfo}
            size="xl"
            className="text-primary"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">1. Informasi Dasar</h2>
          <p className="text-slate-500 text-sm">
            Informasi utama tentang produk anda.
          </p>
        </div>
      </div>
      <div className="flex gap-12 items-start">
        <ImageField
          onChange={(file) => setImageFile(file)}
          value={form.image}
        />
        <div className="flex flex-col gap-4 items-start flex-1">
          <TextField isRequired className="w-full " name="name" type="text">
            <Label className="font-semibold">Nama Produk</Label>
            <Input
              placeholder="Contoh: Beras"
              className="rounded"
              onChange={(e) => updateField("name")(e.target.value)}
              value={form.name}
              maxLength={100}
            />
            <Description className="self-end text-sm">
              {`${form.name.length} / ${100}`}
            </Description>
            <FieldError />
          </TextField>
          <Select
            isRequired
            aria-label="pilih category"
            className="w-full"
            value={form.categoryId}
            onChange={updateField("categoryId")}
          >
            <Label className="font-semibold">Kategori</Label>
            <Select.Trigger className={"rounded-md"}>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className={"rounded-md"}>
              <ListBox className="*:rounded-sm">
                {PRODUCT_CATEGORY_LIST.map((item) => {
                  return (
                    <ListBox.Item
                      key={item.key}
                      id={item.key}
                      textValue={item.textValue}
                    >
                      {item.textValue}
                    </ListBox.Item>
                  );
                })}
              </ListBox>
            </Select.Popover>
            <FieldError />
          </Select>
          <div className="bg-primary-50 px-8 py-6 rounded-md flex flex-col gap-2 border w-full">
            <div className="flex gap-2 items-center text-primary">
                <FontAwesomeIcon icon={faLightbulb}/>
                <h3 className="font-bold">Tips</h3>
            </div>
            <p className="text-gray-500 ">Pastikan nama dan kategori sudah sesuai agar produk lebih mudah ditemukan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
