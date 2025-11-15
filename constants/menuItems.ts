import { createElement } from "react";
import { Home, Database, DatabaseBackup } from "lucide-react";

export const menuItems = [
  {
    name: "Beranda",
    path: "/dashboard",
    icon: createElement(Home, { className: "h-5 w-5" }),
  },
  {
    name: "Satuan Pendidikan",
    icon: createElement(Database, { className: "h-5 w-5" }),
    subItems: [
      {
        name: "Data Satuan Pendidikan",
        path: "/satuan-pendidikan",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Jenis Pendidikan",
        path: "/jenis-pendidikan",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Lokasi",
        path: "/lokasi",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
    ],
  },
  {
    name: "Kelola Data",
    icon: createElement(Database, { className: "h-5 w-5" }),
    subItems: [
      {
        name: "Data Admin",
        path: "/admin",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Berita",
        path: "/berita",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Prakata",
        path: "/prakata",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Seputar Cabdin",
        path: "/seputar-cabdin",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Cerita Praktik Baik",
        path: "/cerita-praktik-baik",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Inovasi",
        path: "/inovasi",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Layanan",
        path: "/layanan",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
    ],
  },
];
