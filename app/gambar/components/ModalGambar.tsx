"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImagePlus, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Jenis_Sekolah } from "@/app/gambar/interfaces/data-item.interface";
import { ModalGambarProps } from "@/app/gambar/interfaces/modal-gambar.interface";

export default function ModalGambar({
  onSubmit,
  modalInput,
  closeModal,
  editingItem,
  loadingCreate,
  setModalInput,
  jenisSekolahOptions = [],
}: ModalGambarProps & { jenisSekolahOptions?: Jenis_Sekolah[] }) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    modalInput.url_gambar || null
  );
  const [uploading, setUploading] = useState(false);

  const supabaseImageLoader = ({
    src,
    width,
  }: {
    src: string;
    width: number;
  }) => `${src}?width=${width}`;

  const handleUploadImage = async (file: File) => {
    try {
      setUploading(true);
      toast.loading("Mengunggah gambar...", { id: "upload" });

      const ext = file.name.split(".").pop();
      const fileName = `jenis-${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from("satpen-icons")
        .upload(fileName, file);
      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("satpen-icons")
        .getPublicUrl(fileName);
      setPreviewImage(publicData.publicUrl);

      setModalInput({ ...modalInput, url_gambar: publicData.publicUrl });
      toast.success("Gambar berhasil diunggah!", { id: "upload" });
    } catch (err) {
      console.error(err);
      toast.error("Upload gagal, coba lagi.", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!modalInput.url_gambar) return;

    try {
      setUploading(true);
      const fileName = modalInput.url_gambar.split("/").pop();
      const { error } = await supabase.storage
        .from("gambar")
        .remove([fileName!]);
      if (error) throw error;

      setPreviewImage(null);
      setModalInput({ ...modalInput, url_gambar: "" });
      toast.success("Gambar berhasil dihapus!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus gambar.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-[#1d232a] rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-center text-xl font-bold mb-6">
          {editingItem ? "Edit Gambar" : "Tambah Gambar"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Jenis Sekolah
          </label>
          <select
            value={modalInput.jenis_sekolah?.id || ""}
            onChange={(e) => {
              const selected = jenisSekolahOptions.find(
                (j) => j.id === Number(e.target.value)
              );
              setModalInput({ ...modalInput, jenis_sekolah: selected });
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#1d232a] dark:text-white"
          >
            <option value="">Pilih Jenis Sekolah</option>
            {(jenisSekolahOptions || []).map((j) => (
              <option key={j.id} value={j.id}>
                {j.nama_jenis}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex flex-col items-center">
          <label className="block text-sm font-medium mb-2">Gambar</label>
          {previewImage ? (
            <div className="relative w-48 h-48 rounded-lg overflow-hidden border">
              <Image
                loader={supabaseImageLoader}
                src={previewImage}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 btn btn-xs btn-error text-white rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              {uploading ? (
                <span className="text-gray-400 text-sm">Mengunggah...</span>
              ) : (
                <>
                  <ImagePlus size={32} className="text-gray-400" />
                  <span className="text-sm text-gray-500 mt-1">
                    Upload Gambar
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadImage(file);
                }}
              />
            </label>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-outline btn-secondary"
            onClick={closeModal}
            disabled={uploading || loadingCreate}
          >
            Batal
          </button>
          <button
            className="btn btn-primary"
            onClick={onSubmit}
            disabled={
              uploading ||
              loadingCreate ||
              !modalInput.url_gambar ||
              !modalInput.jenis_sekolah?.id
            }
          >
            {loadingCreate || uploading
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
