"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";
import { ModalLayananProps } from "@/app/layanan/interfaces/modal-layanan.interface";

export default function ModalLayanan({
  onSubmit,
  modalInput,
  closeModal,
  editingItem,
  loadingCreate,
  setModalInput,
}: ModalLayananProps) {
  const [previewFile, setPreviewFile] = useState<string | null>(
    modalInput.url_file || null
  );
  const [uploading, setUploading] = useState(false);

  const supabaseImageLoader = ({
    src,
    width,
  }: {
    src: string;
    width: number;
  }) => `${src}?width=${width}`;

  const handleUploadFile = async (file: File) => {
    try {
      setUploading(true);
      toast.loading("Mengunggah file...", { id: "upload" });

      const ext = file.name.split(".").pop();
      const fileName = `layanan-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("layanan")
        .upload(fileName, file);
      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("layanan")
        .getPublicUrl(fileName);
      const publicUrl = publicData.publicUrl;

      setPreviewFile(publicUrl);
      setModalInput({
        ...modalInput,
        url_file: publicUrl,
        nama_file: file.name,
        jenis_file: file.type,
        ukuran_file: file.size,
      });

      toast.success("File berhasil diunggah!", { id: "upload" });
    } catch (err) {
      console.error("Upload gagal:", err);
      toast.error("Upload gagal. Coba lagi.", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = async () => {
    if (!modalInput.url_file) return;

    try {
      setUploading(true);
      const url = modalInput.url_file;
      const fileName = url.split("/").pop();

      const { error } = await supabase.storage
        .from("layanan")
        .remove([fileName!]);
      if (error) throw error;

      setPreviewFile(null);
      setModalInput({
        ...modalInput,
        url_file: undefined,
        nama_file: "",
        jenis_file: "",
        ukuran_file: 0,
      });

      toast.success("File berhasil dihapus");
    } catch (err) {
      console.error("Gagal menghapus file:", err);
      toast.error("Gagal menghapus file, coba lagi");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box relative shadow-xl rounded-lg bg-white dark:bg-[#1d232a] max-w-3xl w-full">
        <h3 className="font-bold text-lg mb-4 text-center">
          {editingItem ? "Edit Layanan" : "Tambah Layanan"}
        </h3>

        <div className="relative mb-6">
          <input
            type="text"
            id="judul"
            value={modalInput.judul}
            onChange={(e) =>
              setModalInput({ ...modalInput, judul: e.target.value })
            }
            placeholder=" "
            className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0"
          />
          <label
            htmlFor="judul"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
              peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0
              peer-not-placeholder-shown:text-xs"
          >
            Judul
          </label>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            id="namaFile"
            value={modalInput.nama_file}
            onChange={(e) =>
              setModalInput({ ...modalInput, nama_file: e.target.value })
            }
            placeholder=" "
            className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0"
          />
          <label
            htmlFor="namaFile"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
              peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0
              peer-not-placeholder-shown:text-xs"
          >
            Nama File
          </label>
        </div>

        <div className="relative mb-6">
          <select
            id="jenisLayanan"
            value={modalInput.jenis_layanan}
            onChange={(e) =>
              setModalInput({ ...modalInput, jenis_layanan: e.target.value })
            }
            className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-[#1D232A] text-gray-900 dark:text-gray-100 px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0 appearance-none"
          >
            <option value="" disabled>
              Pilih jenis layanan
            </option>
            <option value="Rekomendasi_Penelitian">
              Rekomendasi Penelitian
            </option>
            <option value="Rekomendasi_Pindah_Sekolah">
              Rekomendasi Pindah Sekolah
            </option>
            <option value="Legalisir_Ijazah_SKHU">
              Legalisir Ijazah / SKHU (SMA/SMK/SLB)
            </option>
            <option value="Perbaikan_Ijzah_SKHU">
              Surat Keterangan Kesalahan Penulisan Ijazah / SKHU (SMA/SMK/SLB)
            </option>
            <option value="Kehilangan_Ijazah">
              Surat Keterangan Kehilangan Ijazah (SMA/SMK/SLB)
            </option>
            <option value="Usulan_Karpeg">
              Pembuatan Usulan Kartu Pegawai (KARPEG)
            </option>
            <option value="Usulan_Karis">
              Pembuatan Usulan Kartu Istri (KARIS)
            </option>
            <option value="Usulan_Karsu">
              Pembuatan Usulan Kartu Suami (KARSU)
            </option>
            <option value="Kenaikan_Pangkat_Fungsional">
              Pembuatan Usulan Kenaikan Pangkat Fungsional
            </option>
            <option value="Kenaikan_Pangkat_Reguler">
              Pembuatan Usulan Kenaikan Pangkat Reguler
            </option>
            <option value="Pensiun">Pembuatan Usulan Pensiun</option>
            <option value="Tabel_Basis">Pembuatan Tabel Basis</option>
          </select>
          <label
            htmlFor="jenisLayanan"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
            peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
          >
            Jenis Layanan
          </label>
        </div>

        <div className="relative mb-6 flex flex-col items-center gap-3">
          <label className="font-medium">File Layanan</label>

          {previewFile ? (
            modalInput.jenis_file === "application/pdf" ? (
              <div className="relative w-48 h-48 border border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center bg-white dark:bg-gray-800 shadow hover:shadow-lg transition p-3 gap-2">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-red-500 dark:text-red-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zM6 4h9v5h5v11H6V4z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100 text-center truncate w-36">
                    {modalInput.nama_file || "File PDF"}
                  </span>
                </div>

                <a
                  href={previewFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-sm underline hover:text-blue-800 dark:hover:text-blue-300 transition"
                >
                  Buka PDF
                </a>

                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 btn btn-xs btn-error text-white rounded-full hover:bg-red-600 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="relative w-48 h-48 border rounded-lg overflow-hidden">
                <Image
                  loader={supabaseImageLoader}
                  src={previewFile}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 btn btn-xs btn-error text-white rounded-full"
                >
                  <X size={14} />
                </button>
              </div>
            )
          ) : (
            <label
              htmlFor="fileUpload"
              className="relative w-48 h-48 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 dark:hover:border-gray-500 transition"
            >
              <span className="text-gray-500 dark:text-gray-400">
                Klik untuk upload
              </span>
              <input
                type="file"
                id="fileUpload"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
                onChange={(e) =>
                  e.target.files && handleUploadFile(e.target.files[0])
                }
              />
            </label>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="btn btn-outline btn-secondary"
            onClick={closeModal}
            disabled={!!previewFile}
            title={previewFile ? "Tidak bisa batal, hapus file dulu" : "Batal"}
          >
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
