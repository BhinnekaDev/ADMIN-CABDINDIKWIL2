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

| Fitur                    | Deskripsi                                                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auto Theme Detection** | Menyesuaikan mode terang/gelap sesuai preferensi sistem (menggunakan `prefers-color-scheme`)                                                        |
| **DaisyUI Components**   | Memanfaatkan komponen siap pakai yang konsisten dan elegan                                                                                          |
| **Responsive Design**    | Tampilan optimal di semua ukuran layar (mobile hingga desktop)                                                                                      |
| **Authentication**       | Login, logout, dan manajemen sesi pengguna menggunakan token dan Supabase/Auth API, termasuk validasi email dan penyimpanan session di localStorage |
|                          |

---

## ⚙️ Teknologi

| Layer                | Stack                                           |
| -------------------- | ----------------------------------------------- |
| **Frontend**         | Next.js 15 (App Router), React 19, TypeScript 5 |
| **Styling**          | Tailwind CSS 4, DaisyUI Components              |
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
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── hooks/
│   │   ├── interfaces/
│   │   │   └── auth.interface.ts
│   │   └── useAuth.ts
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── Header.tsx
│   ├── MobileSidebar.tsx
│   ├── Sidebar.tsx
│   └── SidebarItem.tsx
├── hooks
│   ├── UseActiveMenu.tsx
│   └── UseAuthGuard.ts
├── interfaces
│   ├── HeaderProps.interface.tsx
│   ├── SidebarItemProps.interface.tsx
│   └── Sidebar.interface.tsx
├── package.json
└── README.md
```

---

## 🧰 Script npm

| Perintah          | Fungsi                         |
| ----------------- | ------------------------------ |
| `npm run dev`     | Menjalankan development server |
| `npm run build`   | Build production               |
| `npm run start`   | Menjalankan production build   |
| `npm run lint`    | Menjalankan ESLint             |
| `npm run db:push` | Sync schema database           |
| `npm run db:seed` | Seed data sample               |
| `npm run studio`  | Buka Prisma Studio             |

---

## 🔐 Default Login

```bash
Username: admin
Password: admin123
```

_Disarankan untuk mengganti credentials default setelah instalasi pertama_

---

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
