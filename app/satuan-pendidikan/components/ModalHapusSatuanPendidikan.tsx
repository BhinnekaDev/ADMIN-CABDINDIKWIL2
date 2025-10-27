"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ModalHapusSatuanPendidikanProps } from "@/app/satuan-pendidikan/interfaces/modal-hapus-satuan-pendidikan-props.interface";

export default function ModalHapusSatuanPendidikan({
  item,
  loading,
  onDelete,
  closeModal,
}: ModalHapusSatuanPendidikanProps) {
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    if (confirmationText !== item.nama) return;
    await onDelete(item.npsn);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-[#1d232a] w-full max-w-md p-6 rounded-lg animate-slide-up">
        <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
        <p className="mb-4">
          Ketik <strong>{item.nama}</strong> untuk menghapus data ini.
        </p>
        <input
          type="text"
          className="input input-bordered w-full mb-4"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder="Ketik nama satuan pendidikan di sini"
        />
        <div className="flex gap-2 justify-end">
          <button
            className="btn btn-outline btn-secondary"
            onClick={closeModal}
            disabled={loading}
          >
            Batal
          </button>
          <button
            className="btn btn-error text-white flex items-center gap-2"
            onClick={handleDelete}
            disabled={confirmationText !== item.nama || loading}
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
