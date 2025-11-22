import Image from "next/image";
import { useState, useEffect } from "react";
import { Edit2, Trash2, ImageOff, AlertTriangle } from "lucide-react";
import { TableStrukturOrganisasiProps } from "@/app/struktur-organisasi/interfaces/table-struktur-organisasi.interface";

export default function TableStrukturOrganisasi({
  data,
  loading,
  openEditModal,
  openDeleteModal,
}: TableStrukturOrganisasiProps) {
  const [mobileActionItem, setMobileActionItem] = useState<number | null>(null);

  const itemsPerPage = 5;
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const supabaseImageLoader = ({
    src,
    width,
  }: {
    src: string;
    width: number;
  }) => {
    return `${src}?width=${width}`;
  };

  const generateMobilePages = () => {
    const windowSize = 4;

    if (totalPages <= windowSize) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - 1;

    if (start < 1) start = 1;

    let end = start + windowSize - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - windowSize + 1;
    }

    return Array.from({ length: windowSize }, (_, i) => start + i);
  };

  const generatePages = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > maxVisible) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - maxVisible) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  return (
    <>
      <div className="overflow-x-auto w-full max-w-5xl shadow-lg rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="hidden sm:table-cell">Nomor</th>
              <th className="hidden sm:table-cell">Gambar Struktur</th>
              <th>Gambar Dokumentasi</th>
              <th className="hidden xl:table-cell">Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="hidden sm:table-cell">
                    <div className="h-4 w-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="h-4 w-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-20 bg-gray-100  dark:bg-gray-700 rounded"></div>
                  </td>
                </tr>
              ))
            ) : paginatedData.length ? (
              paginatedData.map((strukturOrganisasi, index) => (
                <tr key={strukturOrganisasi.id}>
                  <td className="hidden sm:table-cell">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td>
                    {strukturOrganisasi.gambar_struktur?.length ? (
                      <div className="relative w-16 h-16">
                        <Image
                          loader={supabaseImageLoader}
                          src={
                            strukturOrganisasi.gambar_struktur ||
                            "/placeholder.png"
                          }
                          alt="Gambar"
                          fill
                          className="object-cover rounded-lg border"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400">
                        <ImageOff size={20} />
                      </div>
                    )}
                  </td>
                  <td className="hidden xl:table-cell">
                    {new Date(
                      strukturOrganisasi.dibuat_pada
                    ).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <div className="sm:hidden">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() =>
                          setMobileActionItem(strukturOrganisasi.id)
                        }
                      >
                        ⋮
                      </button>
                    </div>

                    <div className="hidden sm:flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                        onClick={() => openEditModal(strukturOrganisasi)}
                      >
                        <Edit2 size={14} /> Sunting
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                        onClick={() => openDeleteModal(strukturOrganisasi)}
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>

                    {mobileActionItem === strukturOrganisasi.id && (
                      <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                        <div className="bg-white dark:bg-[#1d232a] w-full max-w-md p-4 rounded-t-lg animate-slide-up">
                          <h3 className="text-lg font-semibold mb-4">
                            Pilih Aksi
                          </h3>
                          <button
                            className="btn btn-block text-white btn-info mb-2 flex items-center justify-center gap-2"
                            onClick={() => {
                              openEditModal(strukturOrganisasi);
                              setMobileActionItem(null);
                            }}
                          >
                            <Edit2 size={16} /> Sunting
                          </button>
                          <button
                            className="btn btn-block text-white btn-error mb-2 flex items-center justify-center gap-2"
                            onClick={() => {
                              openDeleteModal(strukturOrganisasi);
                              setMobileActionItem(null);
                            }}
                          >
                            <Trash2 size={16} /> Hapus
                          </button>
                          <button
                            className="btn btn-outline btn-secondary w-full"
                            onClick={() => setMobileActionItem(null)}
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                    <div className="w-16 h-16 flex items-center justify-center border rounded-lg bg-gray-100 dark:bg-gray-700">
                      <AlertTriangle size={32} />
                    </div>
                    <span className="text-sm font-semibold">
                      Tidak ada data
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Sebelum
          </button>
          {(isMobile ? generateMobilePages() : generatePages()).map((p, i) => (
            <button
              key={i}
              disabled={p === "..."}
              className={`btn btn-sm ${p === currentPage ? "btn-primary" : ""}`}
              onClick={() => typeof p === "number" && goToPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="btn btn-sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </button>
        </div>
      )}
    </>
  );
}
