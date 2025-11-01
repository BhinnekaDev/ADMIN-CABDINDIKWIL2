"use client";

import { Construction, Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center p-6 sm:p-12">
      <div className="text-accent mb-6 animate-bounce">
        <Construction className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto" />
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-base-content">
        Sedang Dalam Pengerjaan
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-base-content max-w-xs sm:max-w-md md:max-w-lg mb-6">
        Halaman ini sedang dalam proses pengembangan. Mohon bersabar dan kembali
        lagi nanti untuk versi lengkapnya.
      </p>

      <div className="flex items-center justify-center gap-2 text-accent">
        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-spin" />
        <span className="font-medium text-sm sm:text-base md:text-lg">
          Sedang Memuat...
        </span>
      </div>
    </div>
  );
}
