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
    if (pathname.startsWith("/berita")) return "Data Berita";
    if (pathname.startsWith("/prakata")) return "Data Prakata";
    if (pathname.startsWith("/seputar-cabdin")) return "Data Seputar Cabdin";
    if (pathname.startsWith("/cerita-praktik-baik"))
      return "Data Cerita Praktik Baik";
    if (pathname.startsWith("/inovasi")) return "Data Inovasi";
    return "Beranda";
  }, [pathname]);

  return active;
};
