"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathName = usePathname();
  const params = useParams();
  const routes = [
    {
      label: "Overview",
      href: `/${params.storeId}`,
      active: pathName === `/${params.storeId}`,
    },
    {
      label: "Billboards",
      href: `/${params.storeId}/billboards`,
      active: pathName === `/${params.storeId}/billboards`,
    },
    {
      label: "Categories",
      href: `/${params.storeId}/categories`,
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      label: "Sizes",
      href: `/${params.storeId}/sizes`,
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      label: "Settings",
      href: `/${params.storeId}/settings`,
      active: pathName === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
