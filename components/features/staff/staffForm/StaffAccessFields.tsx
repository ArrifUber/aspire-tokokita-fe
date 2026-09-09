import { Role } from "@/types/api/roles.types";
import { faShieldHalved, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, Label, Input, FieldError, Select, ListBox } from "@heroui/react";

interface StaffAccessFieldsProps {
  form: { password: string; role: string };
  updateField: (key: "password" | "role") => (value: string) => void;
  roles: Role[];
}

export default function StaffAccessFields({
  form,
  updateField,
  roles,
}: StaffAccessFieldsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <div className="bg-green-100 p-2 rounded-md w-14 h-14 flex items-center justify-center">
          <FontAwesomeIcon icon={faShieldHalved} size="xl" className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">2. Akses & Keamanan</h2>
          <p className="text-slate-500 text-sm">Password login dan peran staff di sistem.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 items-start flex-1">
        <TextField isRequired className="w-full" name="password" type="password">
          <Label className="font-semibold">Password</Label>
          <Input
            placeholder="Minimal 8 karakter"
            className="rounded"
            type="password"
            onChange={(e) => updateField("password")(e.target.value)}
            value={form.password}
            minLength={8}
          />
          <FieldError />
        </TextField>

        <Select
          isRequired
          aria-label="pilih role staff"
          className="w-full"
          value={form.role}
          onChange={updateField("role")}
        >
          <Label className="font-semibold">Role</Label>
          <Select.Trigger className="rounded-md">
            <Select.Value  />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-md lowercase capitalize">
            <ListBox className="*:rounded-sm lowercase capitalize">
              {roles.map((role, i) => (
                <ListBox.Item key={i} id={i} textValue={role.name} className="lowercase capitalize">
                  {role.name}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>

        <div className="bg-primary-50 px-8 py-6 rounded-md flex flex-col gap-2 border w-full">
          <div className="flex gap-2 items-center text-primary">
            <FontAwesomeIcon icon={faLightbulb} />
            <h3 className="font-bold">Tips</h3>
          </div>
          <p className="text-gray-500">
            Sampaikan password ini langsung ke staff yang bersangkutan. Mereka bisa menggantinya
            kapan saja lewat halaman profil.
          </p>
        </div>
      </div>
    </div>
  );
}