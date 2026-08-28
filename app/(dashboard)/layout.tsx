"use client";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden ">
        <main className="flex-1 p-6">
          <RoleGuard>{children}</RoleGuard>
        </main>
      </div>
    </>
  );
}
