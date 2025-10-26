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
        <input
          type="text"
          value={modalInput}
          placeholder="Nama jenis sekolah"
          className="input input-bordered w-full mb-4"
          onChange={(e) => setModalInput(e.target.value)}
        />
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
