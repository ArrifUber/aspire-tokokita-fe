import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import {
  Button,
  Form,
  Input,
  Modal,
  TextField,
  Label,
  useOverlayState,
} from "@heroui/react";
import React, { useEffect, useState } from "react";

interface EditAccountModalProps {
  trigger: React.ReactNode;
  defaultName: string;
}

export default function EditAccountModal({
  trigger,
  defaultName,
}: EditAccountModalProps) {
  const state = useOverlayState();
  const { updateProfile, isLoading, error, clearError } = useUpdateProfile();

  const [name, setName] = useState(defaultName);

  useEffect(() => {
    if (state.isOpen) {
      setName(defaultName);
      clearError();
    }
  }, [state.isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile({ name });
    if (success) {
      state.close();
    }
  };
  return (
    <Modal state={state}>
      <Modal.Trigger>{trigger}</Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[420px] rounded-md">
            <Modal.CloseTrigger />
            <Form onSubmit={handleSubmit} className="flex flex-col">
              <Modal.Header>
                <Modal.Heading>Edit Informasi Akun</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="flex flex-col gap-4">
                {error && <p className="text-sm text-danger">{error}</p>}
                <TextField>
                  <Label>Nama</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap"
                  />
                </TextField>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="button"
                  slot="close"
                  variant="tertiary"
                  className="rounded"
                  isDisabled={isLoading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded bg-primary hover:bg-primary-700 border-0"
                  isDisabled={isLoading}
                >
                  {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
