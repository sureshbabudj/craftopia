import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      className={cn(
        "flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl",
        className
      )}
      href="/"
    >
      🎨 Craftopia
    </Link>
  );
}
