"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export const useActiveMenu = () => {
  const pathname = usePathname();

  const active = useMemo(() => {
    if (pathname === "/dashboard") return "Beranda";
    if (pathname.startsWith("/admin")) return "Data Admin";
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
    if (pathname.startsWith("/layanan")) return "Data Layanan";
    if (pathname.startsWith("/kontak")) return "Data Kontak";
    if (pathname.startsWith("/struktur-organisasi"))
      return "Data Struktur Organisasi";
    return "Beranda";
  }, [pathname]);

  return active;
};
