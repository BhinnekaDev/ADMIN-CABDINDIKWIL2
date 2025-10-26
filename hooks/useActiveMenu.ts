"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export const useActiveMenu = () => {
  const pathname = usePathname();

  const active = useMemo(() => {
    if (pathname === "/dashboard") return "Beranda";
    if (pathname.startsWith("/satuan-pendidikan"))
      return "Data Satuan Pendidikan";
    if (pathname.startsWith("/jenis-pendidikan"))
      return "Data Jenis Pendidikan";
    if (pathname.startsWith("/lokasi")) return "Data Lokasi";
    return "Beranda";
  }, [pathname]);

  return active;
};
