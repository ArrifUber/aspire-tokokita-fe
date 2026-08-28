"use client";

import { faCamera, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
} from "@heroui/react";
import EditAccountModal from "./EditAccountModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { useProfile } from "@/hooks/profile/useProfile";
import { ErrorAlert } from "@/components/Shared/CustomAlert";


export default function ProfileDetailSection() {
    const { user, error, isLoading } = useProfile();

  if (error) {
    return (
      <div className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border">
        <ErrorAlert desc={error} clearAlert={() => {}} title="Gagal Memuat Profil" />
      </div>
    );
  }

  if (isLoading || !user) {
    return (
      <div className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border animate-pulse">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-muted/30" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-muted/30" />
            <div className="h-3 w-20 rounded bg-muted/30" />
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 rounded bg-muted/30" />
          <div className="h-10 w-full rounded bg-muted/20" />
          <div className="h-10 w-full rounded bg-muted/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-surface rounded-2xl p-6 shadow border">
      {/* Header: foto profil + nama + role */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar size="lg" className="w-20 h-20">
            <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt={user.name} />
            <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
          </Avatar>
          <button
            type="button"
            className="absolute bottom-0 right-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white border-2 border-surface shadow-sm hover:bg-primary-700 transition-colors"
            aria-label="Ganti foto profil"
          >
            <FontAwesomeIcon icon={faCamera}/>
          </button>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-xl font-semibold text-foreground">
            {user.name}
          </p>
          <span className="w-fit text-sm font-medium px-2 py-0.5 rounded-md bg-primary-100 text-primary-700 lowercase first-letter:capitalize">
            {user.role}
          </span>
        </div>
      </div>

      <hr />

      {/* Informasi Akun */}
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold text-muted">Informasi Akun</p>

        <InfoRow label="Nama" value={user.name} >
          <EditAccountModal defaultName={user.name} trigger={<FontAwesomeIcon icon={faPencil}  />} />
        </InfoRow>

        <InfoRow label="Email" value={user.email}>
          <></>
        </InfoRow>
      </div>

      <hr />

      {/* Keamanan */}
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold text-muted">Keamanan</p>

        <InfoRow label="Kata Sandi" value="••••••••">
          <ChangePasswordModal
            trigger={
              <Button
                variant="tertiary"
                className="rounded-md shadow-sm border-0"
              >
                Ubah Kata Sandi
              </Button>
            }
          />
        </InfoRow>
      </div>
    </div>
  );
}

/* ---------- Helper components ---------- */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface InfoRowProps {
  label: string;
  value: string;
  children: React.ReactNode;
}

function InfoRow({ label, value, children }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm text-muted">{label}</p>
        <p className="text-base font-medium text-foreground">{value}</p>
      </div>
      {children}
    </div>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="tertiary"
      className="rounded-md shadow-sm border-0 w-9 h-9 p-0 flex items-center justify-center"
      aria-label="Edit"
    >
      {children}
    </Button>
  );
}


