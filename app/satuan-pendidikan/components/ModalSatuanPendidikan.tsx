import { useLokasiSekolah } from "@/app/lokasi/hooks/useLokasiSekolah";
import { useJenisSekolah } from "@/app/jenis-pendidikan/hooks/useJenisSekolah";
import { ModalSatuanPendidikanProps } from "@/app/satuan-pendidikan/interfaces/modal-satuan-pendidikan.interface";

export default function ModalSatuanPendidikan({
  onSubmit,
  modalInput,
  closeModal,
  editingItem,
  loadingCreate,
  setModalInput,
}: ModalSatuanPendidikanProps) {
  const { data: fetchedJenis, loading: loadingJenis } = useJenisSekolah();
  const { data: fetchedLokasi, loading: loadingLokasi } = useLokasiSekolah();

  const isEdit = !!editingItem;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative shadow-xl rounded-lg">
        <h3 className="font-bold text-lg mb-4">
          {editingItem ? "Edit Satuan Pendidikan" : "Tambah Satuan Pendidikan"}
        </h3>
        <div className="relative mb-6">
          <input
            type="number"
            id="npsn"
            value={modalInput.npsn}
            onChange={(e) =>
              setModalInput({ ...modalInput, npsn: Number(e.target.value) })
            }
            placeholder=" "
            className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0"
          />
          <label
            htmlFor="npsn"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
            peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
          >
            NPSN
          </label>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            id="nama"
            value={modalInput.nama}
            onChange={(e) =>
              setModalInput({ ...modalInput, nama: e.target.value })
            }
            placeholder=" "
            className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0"
          />
          <label
            htmlFor="nama"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
            peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
          >
            Nama Sekolah
          </label>
        </div>
        <div className="relative mb-6">
          <select
            id="status"
            value={modalInput.status}
            onChange={(e) =>
              setModalInput({ ...modalInput, status: e.target.value })
            }
            className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-[#1D232A] text-gray-900 dark:text-gray-100 px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0 appearance-none"
          >
            <option value="" disabled>
              Pilih status
            </option>
            <option value="Negeri">Negeri</option>
            <option value="Swasta">Swasta</option>
          </select>
          <label
            htmlFor="status"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
            peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
          >
            Status
          </label>
        </div>
        <div className="relative mb-6">
          {loadingJenis && isEdit ? (
            <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
          ) : (
            <select
              id="jenisSekolah"
              value={
                isEdit
                  ? modalInput.jenis_sekolah.id
                  : modalInput.jenis_sekolah.id || ""
              }
              onChange={(e) => {
                const id = Number(e.target.value);
                const selected = fetchedJenis?.find((j) => j.id === id);
                if (!selected) return;

                setModalInput({
                  ...modalInput,
                  jenis_sekolah: {
                    id: selected.id,
                    nama_jenis: selected.nama_jenis,
                  },
                });
              }}
              disabled={isEdit && loadingJenis}
              className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-[#1D232A] text-gray-900 dark:text-gray-100 px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0 appearance-none"
            >
              <option value="" disabled>
                Pilih Jenis Sekolah
              </option>
              {!loadingJenis &&
                fetchedJenis?.map((jenis) => (
                  <option key={jenis.id} value={jenis.id}>
                    {jenis.nama_jenis}
                  </option>
                ))}
            </select>
          )}
          <label
            htmlFor="jenisSekolah"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
            peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
          >
            Jenis Sekolah
          </label>
        </div>
        <div className="relative mb-6">
          {loadingLokasi && isEdit ? (
            <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
          ) : (
            <select
              id="lokasiSekolah"
              value={isEdit ? modalInput.lokasi.id : modalInput.lokasi.id || ""}
              onChange={(e) =>
                setModalInput({
                  ...modalInput,
                  lokasi: {
                    ...modalInput.lokasi,
                    id: Number(e.target.value),
                    alamat:
                      fetchedLokasi?.find(
                        (l) => l.id === Number(e.target.value)
                      )?.alamat || "",
                  },
                })
              }
              disabled={isEdit && loadingLokasi}
              className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-[#1D232A] text-gray-900 dark:text-gray-100 px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0 appearance-none"
            >
              <option value="" disabled>
                Pilih Lokasi Sekolah
              </option>
              {!loadingLokasi &&
                fetchedLokasi?.map((lokasi) => (
                  <option key={lokasi.id} value={lokasi.id}>
                    {lokasi.alamat}
                  </option>
                ))}
            </select>
          )}
          <label
            htmlFor="lokasiSekolah"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
            peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
          >
            Lokasi Sekolah
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <button className="btn btn-secondary" onClick={closeModal}>
            Batal
          </button>
          <button
            disabled={loadingCreate}
            className="btn btn-primary"
            onClick={onSubmit}
          >
            {loadingCreate
              ? "Menyimpan..."
              : editingItem
              ? "Perbarui"
              : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
