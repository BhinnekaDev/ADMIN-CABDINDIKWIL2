import { useState } from "react";
import { Edit2, AlertTriangle } from "lucide-react";
import { TableKontakProps } from "@/app/kontak/interfaces/table-kontak.interface";

export default function TableKontak({
  data,
  loading,
  openEditModal,
}: TableKontakProps) {
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
              <th>Email</th>
              <th className="hidden sm:table-cell">Nomor Telepon</th>
              <th className="hidden md:table-cell">Alamat</th>
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
                    <div className="h-4 w-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="h-4 w-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="hidden xl:table-cell">
                    <div className="h-4 w-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="hidden xl:table-cell">
                    <div className="h-4 w-32 bg-gray-100  dark:bg-gray-700 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-20 bg-gray-100  dark:bg-gray-700 rounded"></div>
                  </td>
                </tr>
              ))
            ) : paginatedData.length ? (
              paginatedData.map((kontak, index) => (
                <tr key={kontak.id}>
                  <td className="hidden sm:table-cell">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="max-w-[50px] sm:max-w-full">
                    <span className="block truncate sm:overflow-visible">
                      {kontak.email}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell">{kontak.no_telp}</td>
                  <td className="hidden md:table-cell">{kontak.alamat}</td>
                  <td>
                    <div className="sm:hidden">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => setMobileActionItem(kontak.id)}
                      >
                        ⋮
                      </button>
                    </div>

                    <div className="hidden sm:flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                        onClick={() => openEditModal(kontak)}
                      >
                        <Edit2 size={14} /> Sunting
                      </button>
                    </div>

                    {mobileActionItem === kontak.id && (
                      <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                        <div className="bg-white dark:bg-[#1d232a] w-full max-w-md p-4 rounded-t-lg animate-slide-up">
                          <h3 className="text-lg font-semibold mb-4">
                            Pilih Aksi
                          </h3>
                          <button
                            className="btn btn-block text-white btn-info mb-2 flex items-center justify-center gap-2"
                            onClick={() => {
                              openEditModal(kontak);
                              setMobileActionItem(null);
                            }}
                          >
                            <Edit2 size={16} /> Sunting
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
