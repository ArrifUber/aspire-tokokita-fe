"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/hooks/profile/useProfile";
import { canAccessPath } from "@/lib/permission/menuConfig";

interface RoleGuardProps {
  children: React.ReactNode;
  fallbackHref?: string;
}

export function RoleGuard({ children, fallbackHref = "/" }: RoleGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useProfile();

  const isAllowed = !isLoading && user ? canAccessPath(user.role, pathname) : true;

  useEffect(() => {
    if (!isLoading && user && !canAccessPath(user.role, pathname)) {
      router.replace(fallbackHref);
    }
  }, [isLoading, user, pathname, fallbackHref, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-20 text-gray-400 text-sm">
        Memuat...
      </div>
    );
  }

  if (!isAllowed) {
    return null; // sedang proses redirect
  }

  return <>{children}</>;
}