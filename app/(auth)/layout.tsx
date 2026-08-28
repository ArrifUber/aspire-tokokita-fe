import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md h-[90%] max-h-[650px] bg-surface shadow rounded-md flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
