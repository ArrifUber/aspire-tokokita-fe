"use client";
import { accessTokenStorage } from "@/lib/storage";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PUBLIC_ROUTES = ["/login", "/register"];

const AUTH_ONLY_ROUTES = ["/login", "/register"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

function isAuthOnlyRoute(pathname: string) {
  return AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route));
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = accessTokenStorage.get();
    const isAuthenticated = Boolean(token);

    if (!isPublicRoute(pathname) && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (isAuthOnlyRoute(pathname) && isAuthenticated) {
      router.replace("/");
      return;
    }

    setIsChecking(false);
  }, [pathname, router]);

  if (isChecking) return null; // atau <GlobalSkeleton />

  return <>{children}</>;
}