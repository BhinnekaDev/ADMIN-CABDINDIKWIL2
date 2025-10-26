"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export const useActiveMenu = () => {
  const pathname = usePathname();

  const active = useMemo(() => {
    if (pathname === "/dashboard") return "Beranda";
    if (pathname.startsWith("/dashboard/profile")) return "Profile";
    if (pathname.startsWith("/dashboard/settings")) return "Settings";
    return "Beranda";
  }, [pathname]);

  return active;
};
