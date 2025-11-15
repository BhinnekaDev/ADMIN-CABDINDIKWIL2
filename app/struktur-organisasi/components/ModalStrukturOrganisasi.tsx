"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";
import { ModalStrukturOrganisasiProps } from "@/app/struktur-organisasi/interfaces/modal-struktur-organisasi.interface";

export default function ModalStrukturOrganisasi({
  onSubmit,
  modalInput,
  closeModal,
  editingItem,
  loadingCreate,
  setModalInput,
}: ModalStrukturOrganisasiProps) {
  const [previewDokumentasi, setPreviewDokumentasi] = useState<string | null>(
    modalInput.gambar_dokumentasi || null
  );

  const [previewStruktur, setPreviewStruktur] = useState<string | null>(
    modalInput.gambar_struktur || null
  );

  const [uploading, setUploading] = useState(false);

  const supabaseImageLoader = ({
    src,
    width,
  }: {
    src: string;
    width: number;
  }) => `${src}?width=${width}`;

  const uploadToSupabase = async (file: File, folder: string) => {
    const ext = file.name.split(".").pop();
    const fileName = `${folder}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("struktur-organisasi")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("struktur-organisasi")
      .getPublicUrl(fileName);

    return { url: data.publicUrl, fileName };
  };

  const handleUpload = async (file: File, type: "struktur" | "dokumentasi") => {
    try {
      setUploading(true);
      toast.loading("Uploading...", { id: type });

      const res = await uploadToSupabase(
        file,
        type === "struktur" ? "struktur" : "dokumentasi"
      );

      if (type === "struktur") {
        setPreviewStruktur(res.url);
        setModalInput((prev) => ({ ...prev, gambar_struktur: res.url }));
      } else {
        setPreviewDokumentasi(res.url);
        setModalInput((prev) => ({ ...prev, gambar_dokumentasi: res.url }));
      }

      toast.success("Upload sukses!", { id: type });
    } catch (e) {
      toast.error("Gagal upload!", { id: type });
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (
    url: string | undefined,
    type: "struktur" | "dokumentasi"
  ) => {
    if (!url) return;

    try {
      setUploading(true);
      const fileName = url.split("/").pop()!;

      const { error } = await supabase.storage
        .from("struktur-organisasi")
        .remove([fileName]);

      if (error) throw error;

      if (type === "struktur") {
        setPreviewStruktur(null);
        setModalInput((prev) => ({ ...prev, gambar_struktur: undefined }));
      } else {
        setPreviewDokumentasi(null);
        setModalInput((prev) => ({ ...prev, gambar_dokumentasi: undefined }));
      }

      toast.success("File dihapus!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal hapus!");
    } finally {
      setUploading(false);
    }
  };

  const renderUploadBox = (
    preview: string | null,
    type: "struktur" | "dokumentasi",
    label: string
  ) => (
    <div className="flex flex-col items-center gap-2 w-full">
      <p className="font-medium">{label}</p>

      {preview ? (
        <div className="relative w-48 h-48 border rounded-lg overflow-hidden">
          <Image
            loader={supabaseImageLoader}
            src={preview}
            alt={label}
            fill
            className="object-cover"
          />

          <button
            onClick={() => handleRemove(preview, type)}
            className="absolute top-2 right-2 btn btn-xs btn-error text-white rounded-full"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="relative w-48 h-48 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition">
          <span className="text-gray-500 dark:text-gray-400">
            Klik untuk upload gambar
          </span>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
            onChange={(e) =>
              e.target.files && handleUpload(e.target.files[0], type)
            }
          />
        </label>
      )}
    </div>
  );

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box relative shadow-xl rounded-lg bg-white dark:bg-[#1d232a] max-w-3xl w-full">
        <h3 className="font-bold text-lg mb-6 text-center">
          {editingItem
            ? "Edit Struktur Organisasi"
            : "Tambah Struktur Organisasi"}
        </h3>

        <div className="flex flex-col gap-6 items-center">
          {renderUploadBox(previewStruktur, "struktur", "Gambar Struktur")}
          {renderUploadBox(
            previewDokumentasi,
            "dokumentasi",
            "Gambar Dokumentasi"
          )}
        </div>

        <div className="flex justify-end gap-2 mt-8">
          <button
            className="btn btn-outline btn-secondary"
            onClick={closeModal}
            disabled={!!previewDokumentasi || !!previewStruktur}
            title={
              !!previewDokumentasi || !!previewStruktur
                ? "Tidak bisa batal, hapus gambar dulu"
                : "Batal"
            }
          >
            Batal
          </button>
          <button
            disabled={loadingCreate || uploading}
            className="btn btn-primary"
            onClick={onSubmit}
          >
            {loadingCreate ? "Loading..." : editingItem ? "Update" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
