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
        name: "Data Berita",
        path: "/berita",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
      {
        name: "Data Prakata",
        path: "/prakata",
        icon: createElement(DatabaseBackup, { className: "h-5 w-5" }),
      },
    ],
  },
];
