import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import React from "react";

export async function RightPane({
  title = "Sign In",
  subtitle = "Welcome Back!",
  err,
  children,
}: React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
  err?: string;
}>) {
  return (
    <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <Logo className="mb-8 justify-center text-4xl" />
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          {title}
        </h1>
        <h1
          className={cn(
            "text-sm font-semibold mb-6 text-gray-500 text-center",
            { "text-red-500 text-2xl": err }
          )}
        >
          {err ? err : subtitle}
        </h1>
        {children}
      </div>
    </div>
  );
}
