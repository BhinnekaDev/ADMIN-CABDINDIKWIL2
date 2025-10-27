import { ModalJenisSekolahProps } from "@/app/jenis-pendidikan/interfaces/modal-jenis-sekolah.interface";

export default function ModalJenisSekolah({
  onSubmit,
  modalInput,
  closeModal,
  editingItem,
  loadingCreate,
  setModalInput,
}: ModalJenisSekolahProps) {
  return (
    <div className="modal modal-open">
      <div className="modal-box relative shadow-xl rounded-lg">
        <h3 className="font-bold text-lg mb-4">
          {editingItem ? "Edit Jenis Sekolah" : "Tambah Jenis Sekolah"}
        </h3>
        <div className="relative mb-6">
          <input
            type="text"
            id="provinsi"
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
            placeholder=" "
            className="peer block w-full border-0 border-b-2 border-gray-300  dark:border-gray-600 bg-transparent px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0"
          />
          <label
            htmlFor="provinsi"
            className={`absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
      peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0
peer-not-placeholder-shown:text-xs
`}
          >
            Jenis Sekolah
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
