import { useState } from "react";
import { Edit2, Trash2, AlertTriangle } from "lucide-react";
import { TableJenisSekolahProps } from "@/app/jenis-pendidikan/interfaces/table-sekolah.interface";

export default function TableJenisSekolah({
  data,
  loading,
  openEditModal,
  openDeleteModal,
}: TableJenisSekolahProps) {
  const [mobileActionItem, setMobileActionItem] = useState<number | null>(null);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="overflow-x-auto w-full max-w-5xl shadow-lg rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="hidden sm:table-cell">Nomor</th>
              <th>Jenis Sekolah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="hidden sm:table-cell">
                    <div className="h-4 w-6 bg-gray-100 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-32 bg-gray-100 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-20 bg-gray-100 rounded"></div>
                  </td>
                </tr>
              ))
            ) : paginatedData.length ? (
              paginatedData.map((jenis, index) => (
                <tr key={jenis.id}>
                  <td className="hidden sm:table-cell">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td>{jenis.nama_jenis}</td>
                  <td>
                    <div className="sm:hidden">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => setMobileActionItem(jenis.id)}
                      >
                        ⋮
                      </button>
                    </div>

                    <div className="hidden sm:flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                        onClick={() => openEditModal(jenis)}
                      >
                        <Edit2 size={14} /> Sunting
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                        onClick={() => openDeleteModal(jenis)}
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>

                    {mobileActionItem === jenis.id && (
                      <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                        <div className="bg-white dark:bg-[#1d232a] w-full max-w-md p-4 rounded-t-lg animate-slide-up">
                          <h3 className="text-lg font-semibold mb-4">
                            Pilih Aksi
                          </h3>
                          <button
                            className="btn btn-block text-white btn-info mb-2 flex items-center justify-center gap-2"
                            onClick={() => {
                              openEditModal(jenis);
                              setMobileActionItem(null);
                            }}
                          >
                            <Edit2 size={16} /> Sunting
                          </button>
                          <button
                            className="btn btn-block text-white btn-error mb-2 flex items-center justify-center gap-2"
                            onClick={() => {
                              openDeleteModal(jenis);
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
                <td colSpan={3} className="text-center py-8">
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
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : ""
              }`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
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
