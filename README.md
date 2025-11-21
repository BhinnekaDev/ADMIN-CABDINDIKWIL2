# 🏫 ADMIN-CABDINDIKWIL2

**Sistem Admin Website Cabang Dinas Pendidikan Wilayah II Kabupaten Rejang Lebong**

> Panel administrasi untuk mengelola konten dan data website resmi **Dinas Pendidikan Kabupaten Rejang Lebong** sejak 2025.

![Platform](https://img.shields.io/badge/platform-Web-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/built%20with-Next.js-000000?logo=nextdotjs&style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)
![Admin Dashboard](https://img.shields.io/badge/Dashboard-Admin-10b981?style=flat-square)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white&style=flat-square)

---

## 🌐 Demo

Akses panel admin: **[https://admin-cabdindikwil-2.vercel.app/](https://admin-cabdindikwil-2.vercel.app/)** _(hosted on Vercel)_

---

## ✨ Fitur Admin

| Fitur                               | Deskripsi                                                                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Auto Theme Detection**            | Menyesuaikan mode terang/gelap sesuai preferensi sistem (menggunakan `prefers-color-scheme`).                                                                |
| **DaisyUI Components**              | Memanfaatkan komponen siap pakai yang konsisten dan elegan.                                                                                                  |
| **Responsive Design**               | Tampilan optimal di semua ukuran layar (mobile hingga desktop).                                                                                              |
| **Authentication**                  | Login, Daftar, logout, dan manajemen sesi pengguna menggunakan token dan Supabase/Auth API, termasuk validasi email dan penyimpanan session di localStorage. |
| **CRUD Satuan Pendidikan (Satpen)** | Menambah, melihat, mengedit, dan menghapus data satuan pendidikan di Cabang Dinas Wilayah II.                                                                |
| **CRUD Berita**                     | Menambah, melihat, mengedit, dan menghapus berita terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                                          |
| **CRUD Prakata**                    | Menambah, melihat, mengedit, dan menghapus prakata terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                                         |
| **CRUD Seputar Cabdin**             | Menambah, melihat, mengedit, dan menghapus seputar cabdin terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                                  |
| **CRUD Cerita Praktik Baik**        | Menambah, melihat, mengedit, dan menghapus cerita praktik baik terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                             |
| **CRUD Inovasi**                    | Menambah, melihat, mengedit, dan menghapus inovasi terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                                         |
| **CRUD Layanan**                    | Menambah, melihat, mengedit, dan menghapus layanan terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                                         |
| **CRUD Kontak**                     | Melihat, dan mengedit kontak terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                                                               |
| **CRUD Struktur Organisasi**        | Menambah, melihat, mengedit, dan menghapus struktur organisasi terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                             |
| **CRUD Gambar Jenis Pendidikan**    | Menambah, melihat, mengedit, dan menghapus gambar jenis pendidikan terkait Dinas Pendidikan Kabupaten Rejang Lebong.                                         |
| **Dashboard Interaktif**            | Menampilkan visualisasi data berupa grafik interaktif (Admin, Berita, dan Sekolah) yang responsif dan otomatis menyesuaikan tema terang/gelap.               |

---

## ⚙️ Teknologi

| Layer                | Stack                                           |
| -------------------- | ----------------------------------------------- |
| **Frontend**         | Next.js 15 (App Router), React 19, TypeScript 5 |
| **Styling**          | Tailwind CSS 4, DaisyUI Components              |
| **Animation**        | Framer Motion                                   |
| **State Management** | Zustand                                         |
| **Form Handling**    | React Hook Form + Zod Validation                |
| **Tables**           | TanStack Table v8                               |
| **Authentication**   | NextAuth.js                                     |
| **Database**         | PostgreSQL dengan Prisma ORM                    |
| **UI Components**    | Shadcn/ui, Lucide React Icons                   |
| **Development**      | ESLint, Prettier, TypeScript                    |

---

## 🛠️ Instalasi

```bash
# Klon repository
$ git clone https://github.com/BhinnekaDev/ADMIN-CABDINDIKWIL2
$ cd ADMIN-CABDINDIKWIL2

# Instal dependensi
$ npm install
```

Setup environment variables:

```bash
# Salin file environment
$ cp .env.example .env.local

# Edit .env.local dengan konfigurasi database dan auth
```

Jalankan development server:

```bash
$ npm run dev
```

Akses melalui [http://localhost:3000](http://localhost:3000).

---

## 📁 Struktur Project

```
admin-cabdindikwil2/
├── app/
│   ├── admin/
│   │   ├── components/
│   │   │   ├── HeaderAdmin.tsx
│   │   │   ├── ModalAdmin.tsx
│   │   │   └── TableAdmin.tsx
│   │   ├── hooks/
│   │   │   ├── useAdmin.ts
│   │   │   └── UseEditAdmin.ts
│   │   ├── interfaces/
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-admin.interface.ts
│   │   │   ├── modal-admin.interface.ts
│   │   │   ├── table-admin.interface.ts
│   │   │   └── use-edit-admin-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── ajukan/
│   │   ├── hooks/
│   │   │   ├── interfaces
│   │   │   │   └── auth.interface.ts
│   │   │   └── useAuth.ts
│   │   └── page.tsx
│   ├── api/
│   │   ├── parse-csv/
│   │   │   └── route.ts
│   │   └── parse-excel/
│   │       └── route.ts
│   ├── berita/
│   │   ├── components/
│   │   │   ├── HeaderBerita.tsx
│   │   │   ├── ModalHapusBerita.tsx
│   │   │   ├── ModalBerita.tsx
│   │   │   └── TableBerita.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateBerita.ts
│   │   │   ├── useDeleteBerita.ts
│   │   │   ├── UseEditBerita.ts
│   │   │   └── useBerita.ts
│   │   ├── interfaces/
│   │   │   ├── create-berita-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-berita.interface.ts
│   │   │   ├── modal-berita.interface.ts
│   │   │   ├── modal-hapus-berita-props.interface.ts
│   │   │   ├── table-berita.interface.ts
│   │   │   ├── use-delete-berita-props.interface.ts
│   │   │   └── use-edit-berita-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── cerita-praktik-baik/
│   │   ├── components/
│   │   │   ├── HeaderCeritaPraktikBaik.tsx
│   │   │   ├── ModalHapusCeritaPraktikBaik.tsx
│   │   │   ├── ModalCeritaPraktikBaik.tsx
│   │   │   └── TableCeritaPraktikBaik.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateCeritaPraktikBaik.ts
│   │   │   ├── useDeleteCeritaPraktikBaik.ts
│   │   │   ├── UseEditCeritaPraktikBaik.ts
│   │   │   └── useCeritaPraktikBaik.ts
│   │   ├── interfaces/
│   │   │   ├── create-cerita-praktik-baik-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-cerita-praktik-baik.interface.ts
│   │   │   ├── modal-cerita-praktik-baik.interface.ts
│   │   │   ├── modal-hapus-cerita-praktik-baik-props.interface.ts
│   │   │   ├── table-cerita-praktik-baik.interface.ts
│   │   │   ├── use-delete-cerita-praktik-baik-props.interface.ts
│   │   │   └── use-edit-cerita-praktik-baik-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── gambar/
│   │   ├── components/
│   │   │   ├── HeaderGambar.tsx
│   │   │   ├── ModalHapusGambar.tsx
│   │   │   ├── ModalGambar.tsx
│   │   │   └── TableGambar.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateGambar.ts
│   │   │   ├── useDeleteGambar.ts
│   │   │   ├── UseEditGambar.ts
│   │   │   └── useGambar.ts
│   │   ├── interfaces/
│   │   │   ├── create-gambar-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── edit-gambar-request.interface.ts
│   │   │   ├── header-gambar.interface.ts
│   │   │   ├── modal-gambar.interface.ts
│   │   │   ├── modal-hapus-gambar-props.interface.ts
│   │   │   ├── table-gambar.interface.ts
│   │   │   ├── use-delete-gambar-props.interface.ts
│   │   │   └── use-edit-gambar-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── hooks/
│   │   ├── interfaces/
│   │   │   └── auth.interface.ts
│   │   └── useAuth.ts
│   ├── inovasi/
│   │   ├── components/
│   │   │   ├── HeaderCeritaInovasi.tsx
│   │   │   ├── ModalHapusCeritaInovasi.tsx
│   │   │   ├── ModalCeritaInovasi.tsx
│   │   │   └── TableCeritaInovasi.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateCeritaInovasi.ts
│   │   │   ├── useDeleteCeritaInovasi.ts
│   │   │   ├── UseEditCeritaInovasi.ts
│   │   │   └── useCeritaInovasi.ts
│   │   ├── interfaces/
│   │   │   ├── create-inovasi-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-inovasi.interface.ts
│   │   │   ├── modal-inovasi.interface.ts
│   │   │   ├── modal-hapus-inovasi-props.interface.ts
│   │   │   ├── table-inovasi.interface.ts
│   │   │   ├── use-delete-inovasi-props.interface.ts
│   │   │   └── use-edit-inovasi-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── jenis-pendidikan/
│   │   ├── components/
│   │   │   ├── HeaderJenisSekolah.tsx
│   │   │   ├── ModalHapusJenisSekolah.tsx
│   │   │   ├── ModalJenisSekolah.tsx
│   │   │   └── TableJenisSekolah.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateJenisSekolah.ts
│   │   │   ├── useDeleteJenisSekolah.ts
│   │   │   ├── UseEditJenisSekolahProps.ts
│   │   │   └── useJenisSekolah.ts
│   │   ├── interfaces/
│   │   │   ├── create-jenis-sekolah-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-jenis-sekolah.interface.ts
│   │   │   ├── jenis-sekolah.interface.ts
│   │   │   ├── modal-hapus-jenis-sekolah-props.interface.ts
│   │   │   ├── modal-jenis-sekolah.interface.ts
│   │   │   ├── table-sekolah.interface.ts
│   │   │   ├── use-delete-jenis-sekolah-props.interface.ts
│   │   │   └── use-edit-jenis-sekolah-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layanan/
│   │   ├── components/
│   │   │   ├── HeaderCeritaLayanan.tsx
│   │   │   ├── ModalHapusCeritaLayanan.tsx
│   │   │   ├── ModalCeritaLayanan.tsx
│   │   │   └── TableCeritaLayanan.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateCeritaLayanan.ts
│   │   │   ├── useDeleteCeritaLayanan.ts
│   │   │   ├── UseEditCeritaLayanan.ts
│   │   │   └── useCeritaLayanan.ts
│   │   ├── interfaces/
│   │   │   ├── create-layanan-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-layanan.interface.ts
│   │   │   ├── modal-layanan.interface.ts
│   │   │   ├── modal-hapus-layanan-props.interface.ts
│   │   │   ├── table-layanan.interface.ts
│   │   │   ├── use-delete-layanan-props.interface.ts
│   │   │   └── use-edit-layanan-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── kontak/
│   │   ├── components/
│   │   │   ├── HeaderKontak.tsx
│   │   │   ├── ModalKontak.tsx
│   │   │   └── TableKontak.tsx
│   │   ├── hooks/
│   │   │   ├── UseEditKontak.ts
│   │   │   └── useKontak.ts
│   │   ├── interfaces/
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-kontak.interface.ts
│   │   │   ├── modal-kontak.interface.ts
│   │   │   ├── table-kontak.interface.ts
│   │   │   └── use-edit-kontak-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lokasi/
│   │   ├── components/
│   │   │   ├── HeaderLokasiSekolah.tsx
│   │   │   ├── ModalHapusLokasiSekolah.tsx
│   │   │   ├── ModalLokasiSekolah.tsx
│   │   │   └── TableLokasiSekolah.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateLokasiSekolah.ts
│   │   │   ├── useDeleteLokasiSekolah.ts
│   │   │   ├── UseEditLokasiSekolahProps.ts
│   │   │   └── useLokasiSekolah.ts
│   │   ├── interfaces/
│   │   │   ├── create-lokasi-sekolah-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-lokasi-sekolah.interface.ts
│   │   │   ├── lokasi-data.interface.ts
│   │   │   ├── lokasi-sekolah.interface.ts
│   │   │   ├── modal-hapus-lokasi-sekolah-props.interface.ts
│   │   │   ├── modal-lokasi-sekolah.interface.ts
│   │   │   ├── table-sekolah.interface.ts
│   │   │   ├── use-delete-lokasi-sekolah-props.interface.ts
│   │   │   └── use-edit-lokasi-sekolah-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── prakata/
│   │   ├── components/
│   │   │   ├── HeaderPrakata.tsx
│   │   │   ├── ModalHapusPrakata.tsx
│   │   │   ├── ModalPrakata.tsx
│   │   │   └── TablePrakata.tsx
│   │   ├── hooks/
│   │   │   ├── useCreatePrakata.ts
│   │   │   ├── useDeletePrakata.ts
│   │   │   ├── UseEditPrakata.ts
│   │   │   └── usePrakata.ts
│   │   ├── interfaces/
│   │   │   ├── create-prakata-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-prakata.interface.ts
│   │   │   ├── modal-prakata.interface.ts
│   │   │   ├── modal-hapus-prakata-props.interface.ts
│   │   │   ├── table-prakata.interface.ts
│   │   │   ├── use-delete-prakata-props.interface.ts
│   │   │   └── use-edit-prakata-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── satuan-pendidikan/
│   │   ├── components/
│   │   │   ├── HeaderSatuanPendidikan.tsx
│   │   │   ├── ModalHapusSatuanPendidikan.tsx
│   │   │   ├── ModalSatuanPendidikan.tsx
│   │   │   └── TableSatuanPendidikan.tsx
│   │   ├── hooks/
│   │   │   ├── useSatuanPendidikan.ts
│   │   │   ├── useDeleteSatuanPendidikan.ts
│   │   │   ├── UseEditSatuanPendidikanProps.ts
│   │   │   └── useSatuanPendidikanSekolah.ts
│   │   ├── interfaces/
│   │   │   ├── create-satuan-pendidikan-payload-props.interface.ts
│   │   │   ├── create-lokasi-sekolah-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-lokasi-sekolah.interface.ts
│   │   │   ├── jenis-sekolah-data.interface.ts
│   │   │   ├── lokasi-data.interface.ts
│   │   │   ├── modal-hapus-satuan-pendidikan-props.interface.ts
│   │   │   ├── modal-satuan-pendidikan.interface.ts
│   │   │   ├── satuan-pendidikan-data.interface.ts
│   │   │   ├── satuan-pendidikan.interface.ts
│   │   │   ├── table-satuan-pendidikan.interface.ts
│   │   │   ├── use-delete-satuan-pendidikan-props.interface.ts
│   │   │   ├── use-edit-satuan-pendidikan-props.interface.ts
│   │   │   └── use-satuan-pendidikan-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── seputar-cabdin/
│   │   ├── components/
│   │   │   ├── HeaderSeputarCabdin.tsx
│   │   │   ├── ModalHapusSeputarCabdin.tsx
│   │   │   ├── ModalSeputarCabdin.tsx
│   │   │   └── TableSeputarCabdin.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateSeputarCabdin.ts
│   │   │   ├── useDeleteSeputarCabdin.ts
│   │   │   ├── UseEditSeputarCabdin.ts
│   │   │   └── useSeputarCabdin.ts
│   │   ├── interfaces/
│   │   │   ├── create-seputar-cabdin-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-seputar-cabdin.interface.ts
│   │   │   ├── modal-seputar-cabdin.interface.ts
│   │   │   ├── modal-hapus-seputar-cabdin-props.interface.ts
│   │   │   ├── table-seputar-cabdin.interface.ts
│   │   │   ├── use-delete-seputar-cabdin-props.interface.ts
│   │   │   └── use-edit-seputar-cabdin-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── struktur-organisasi/
│   │   ├── components/
│   │   │   ├── HeaderStrukturOrganisasi.tsx
│   │   │   ├── ModalHapusStrukturOrganisasi.tsx
│   │   │   ├── ModalStrukturOrganisasi.tsx
│   │   │   └── TableStrukturOrganisasi.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateStrukturOrganisasi.ts
│   │   │   ├── useDeleteStrukturOrganisasi.ts
│   │   │   ├── UseEditStrukturOrganisasi.ts
│   │   │   └── useStrukturOrganisasi.ts
│   │   ├── interfaces/
│   │   │   ├── create-struktur-organisasi-props.interface.ts
│   │   │   ├── data-item.interface.ts
│   │   │   ├── header-struktur-organisasi.interface.ts
│   │   │   ├── modal-struktur-organisasi.interface.ts
│   │   │   ├── modal-hapus-struktur-organisasi-props.interface.ts
│   │   │   ├── table-struktur-organisasi.interface.ts
│   │   │   ├── use-delete-struktur-organisasi-props.interface.ts
│   │   │   └── use-edit-struktur-organisasi-props.interface.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── interfaces/
│   ├── HeaderProps.interface.tsx
│   ├── Sidebar.interface.tsx
│   └── SidebarItemProps.interface.tsx
├── lib/
│   └── supabaseClient.ts
├── components/
│   ├── Header.tsx
│   ├── MobileSidebar.tsx
│   ├── Sidebar.tsx
│   ├── SidebarItem.tsx
│   └── menuItems.tsx
├── hooks/
│   ├── useActiveMenu.ts
│   └── useAuthGuard.ts
├── constants/
│   └── menuItems.ts
├── package.json
└── README.md
```

---

## 🧰 Script npm

| Perintah        | Fungsi                         |
| --------------- | ------------------------------ |
| `npm run dev`   | Menjalankan development server |
| `npm run build` | Build production               |
| `npm run start` | Menjalankan production build   |
| `npm run lint`  | Menjalankan ESLint             |

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/namafitur`)
3. Commit changes (`git commit -m 'feat: tambah fitur x'`)
4. Push to branch (`git push origin feature/namafitur`)
5. Buat Pull Request

---

## 📜 Lisensi

MIT © 2025 [Bhinneka Dev](https://github.com/BhinnekaDev)

---

<p align="center">
  <img alt="Admin Dashboard Preview" src="https://github.com/user-attachments/assets/545535b8-a50c-44ae-8de3-5b3bba911a46" width="80%" />
</p>

<p align="center"><sub>Panel Admin Cabang Dinas Pendidikan Wilayah II – Rejang Lebong</sub></p>
