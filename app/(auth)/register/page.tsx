"use client";
import { useRegister } from "@/hooks/useRegister";
import {
  Button,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const role = "OWNER"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    register({ name, email, password, role });
  }

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full p-12 flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-primary mb-4">Daftar</h1>
        <p className="text-sm">
          Sudah punya akun?{" "}
          <Link className="underline text-blue-600" href={"/login"}>
            Login di sini!
          </Link>
        </p>
      </div>

      <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField isRequired name="username" type="text">
          <Label>Nama</Label>
          <Input
            className="rounded"
            placeholder="Budi Siregar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input
            className="rounded"
            placeholder="budi@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type={isVisible ? "text" : "password"}
          validate={(value) => {
            if (value.length < 8) {
              return "Wajib terdiri minimal 8 karakter";
            }
            if (!/[A-Z]/.test(value)) {
              return "Wajib memiliki minimal 1 huruf besar";
            }
            if (!/[0-9]/.test(value)) {
              return "Wajib memiliki minimal 1 angka";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input
            className="rounded"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Description>
            Minimal terdiri 8 karakter dengan 1 huruf besar dan 1 angka
          </Description>
          <FieldError />
          <Checkbox
            name="show-pass"
            isSelected={isVisible}
            onChange={toggleVisibility}
          >
            <Checkbox.Content className="flex flex-row items-center gap-2 text-sm mt-2">
              <Checkbox.Control className="rounded-sm before:rounded-sm">
                <Checkbox.Indicator />
              </Checkbox.Control>
              Tampilkan Password
            </Checkbox.Content>
          </Checkbox>
        </TextField>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          isDisabled={isLoading}
          type="submit"
          className="bg-primary hover:bg-primary-500 rounded w-full shadow"
        >
          {isLoading ? "Mendaftar..." : "Daftar"}
        </Button>
      </Form>
    </div>
  );
}
