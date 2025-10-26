import { Edit2, Trash2 } from "lucide-react";
import { TableJenisSekolahProps } from "@/app/jenis-pendidikan/interfaces/table-sekolah.interface";

export default function TableJenisSekolah({
  data,
  loading,
  handleDelete,
  openEditModal,
}: TableJenisSekolahProps) {
  return (
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
          ) : data.length ? (
            data.map((user) => (
              <tr key={user.id}>
                <td className="hidden sm:table-cell">{user.id}</td>
                <td>{user.nama_jenis}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                    onClick={() => openEditModal(user)}
                  >
                    <Edit2 size={14} /> Sunting
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">
                Data tidak ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
