import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, Label, Input, Description, FieldError } from "@heroui/react";

interface StaffBasicFieldsProps {
  form: { name: string; email: string };
  updateField: (key: "name" | "email") => (value: string) => void;
}

export default function StaffBasicFields({ form, updateField }: StaffBasicFieldsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <div className="bg-green-100 p-2 rounded-md w-14 h-14 flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} size="xl" className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">1. Informasi Dasar</h2>
          <p className="text-slate-500 text-sm">Data diri staff yang akan ditambahkan.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 items-start flex-1">
        <TextField isRequired className="w-full" name="name" type="text">
          <Label className="font-semibold">Nama Lengkap</Label>
          <Input
            placeholder="Contoh: Budi Santoso"
            className="rounded"
            onChange={(e) => updateField("name")(e.target.value)}
            value={form.name}
            maxLength={100}
          />
          <Description className="self-end text-sm">{`${form.name.length} / 100`}</Description>
          <FieldError />
        </TextField>

        <TextField isRequired className="w-full" name="email" type="email">
          <Label className="font-semibold">Email</Label>
          <Input
            placeholder="Contoh: budi@tokokita.com"
            className="rounded"
            onChange={(e) => updateField("email")(e.target.value)}
            value={form.email}
          />
          <FieldError />
        </TextField>
      </div>
    </div>
  );
}