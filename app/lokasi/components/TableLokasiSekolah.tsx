import { useState, useEffect } from "react";
import { Edit2, Trash2, AlertTriangle } from "lucide-react";
import { TableLokasiSekolahProps } from "@/app/lokasi/interfaces/table-sekolah.interface";

export default function TableLokasiSekolah({
  data,
  loading,
  openEditModal,
  openDeleteModal,
}: TableLokasiSekolahProps) {
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
              <th>Nama Jalan</th>
              <th className="hidden sm:table-cell">Kelurahan</th>
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
                  <td className="hidden sm:table-cell">
                    <div className="h-4 w-20 bg-gray-100  dark:bg-gray-700 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-20 bg-gray-100  dark:bg-gray-700 rounded"></div>
                  </td>
                </tr>
              ))
            ) : paginatedData.length ? (
              paginatedData.map((lokasi, index) => (
                <tr key={lokasi.id}>
                  <td className="hidden sm:table-cell">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="max-w-32 sm:max-w-none truncate">
                    {lokasi.alamat}
                  </td>
                  <td className="hidden sm:table-cell">{lokasi.kelurahan}</td>
                  <td>
                    <div className="sm:hidden">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => setMobileActionItem(lokasi.id)}
                      >
                        ⋮
                      </button>
                    </div>

                    <div className="hidden sm:flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                        onClick={() => openEditModal(lokasi)}
                      >
                        <Edit2 size={14} /> Sunting
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                        onClick={() => openDeleteModal(lokasi)}
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>

                    {mobileActionItem === lokasi.id && (
                      <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                        <div className="bg-white dark:bg-[#1d232a] w-full max-w-md p-4 rounded-t-lg animate-slide-up">
                          <h3 className="text-lg font-semibold mb-4">
                            Pilih Aksi
                          </h3>
                          <button
                            className="btn btn-block text-white btn-info mb-2 flex items-center justify-center gap-2"
                            onClick={() => {
                              openEditModal(lokasi);
                              setMobileActionItem(null);
                            }}
                          >
                            <Edit2 size={16} /> Sunting
                          </button>
                          <button
                            className="btn btn-block text-white btn-error mb-2 flex items-center justify-center gap-2"
                            onClick={() => {
                              openDeleteModal(lokasi);
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
                <td colSpan={7} className="text-center py-8">
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
