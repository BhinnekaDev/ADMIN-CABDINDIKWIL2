"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";
import { ImagePlus, X, File, Trash2 } from "lucide-react";
import { ModalSpmbProps } from "@/app/pengumuman-smpmb/interfaces/modal-spmb.interface";

export default function ModalSpmb({
  onSubmit,
  modalInput,
  closeModal,
  editingItem,
  loadingCreate,
  setModalInput,
}: ModalSpmbProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const supabaseLoader = ({ src, width }: { src: string; width: number }) => {
    return `${src}?width=${width}`;
  };

  const handleUploadImage = async (file: File) => {
    try {
      setUploadingImage(true);
      toast.loading("Mengunggah gambar...", { id: "upload-image" });

      const ext = file.name.split(".").pop();
      const fileName = `spmb-image-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("spmb-images")
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("spmb-images")
        .getPublicUrl(fileName);

      setModalInput({
        ...modalInput,
        spmb_media_image: [{ image_url: publicData.publicUrl }],
      });

      toast.success("Gambar berhasil diunggah!", { id: "upload-image" });
    } catch (err) {
      console.error("Upload gagal:", err);
      toast.error("Upload gambar gagal", { id: "upload-image" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUploadFile = async (file: File) => {
    try {
      setUploadingFile(true);
      toast.loading("Mengunggah file...", { id: "upload-file" });

      const ext = file.name.split(".").pop();
      const fileName = `spmb-file-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("spmb-files")
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("spmb-files")
        .getPublicUrl(fileName);

      setModalInput({
        ...modalInput,
        spmb_media_file: [{ file_url: publicData.publicUrl }],
      });
      setFileName(file.name);

      toast.success("File berhasil diunggah!", { id: "upload-file" });
    } catch (err) {
      console.error("Upload gagal:", err);
      toast.error("Upload file gagal", { id: "upload-file" });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleRemoveImage = () => {
    setModalInput({
      ...modalInput,
      spmb_media_image: [],
    });
  };

  const handleRemoveFile = () => {
    setModalInput({
      ...modalInput,
      spmb_media_file: [],
    });
    setFileName("");
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleLocalSubmit = () => {
    if (!modalInput.judul.trim()) {
      toast.error("Judul wajib diisi");
      return;
    }

    if (
      !editingItem &&
      (!modalInput.spmb_media_image || modalInput.spmb_media_image.length === 0)
    ) {
      toast.error("Gambar wajib diunggah");
      return;
    }

    if (modalInput.link_url && !isValidUrl(modalInput.link_url)) {
      toast.error("URL tidak valid. Gunakan format https://...");
      return;
    }

    onSubmit();
  };

  const previewImage = modalInput.spmb_media_image?.[0]?.image_url;

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box relative shadow-xl rounded-lg bg-white dark:bg-[#1d232a] max-w-2xl w-full">
        <h3 className="font-bold text-lg mb-4">
          {editingItem ? "Edit Pengumuman" : "Tambah Pengumuman"}
        </h3>

        {/* Judul */}
        <div className="relative mb-6">
          <input
            type="text"
            id="judul"
            value={modalInput.judul || ""}
            onChange={(e) =>
              setModalInput({ ...modalInput, judul: e.target.value })
            }
            placeholder=" "
            className="peer block w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0"
          />
          <label
            htmlFor="judul"
            className="absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
              peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
          >
            Judul Pengumuman *
          </label>
        </div>

        {/* Upload Gambar */}
        <div className="mb-6">
          <label className="font-medium mb-2 block">Gambar Utama *</label>
          {previewImage ? (
            <div className="relative w-40 h-40 border rounded-lg overflow-hidden">
              <Image
                loader={supabaseLoader}
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
            <label className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              {uploadingImage ? (
                <span className="text-gray-400 text-sm">Mengunggah...</span>
              ) : (
                <>
                  <ImagePlus size={32} className="text-gray-400" />
                  <span className="text-sm text-gray-500">Upload Gambar</span>
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

        {/* Upload File */}
        <div className="mb-6">
          <label className="font-medium mb-2 block">File (Opsional)</label>
          {modalInput.spmb_media_file?.[0]?.file_url ? (
            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <File size={20} className="text-blue-500" />
              <span className="text-sm flex-1 truncate">
                {fileName || "File terunggah"}
              </span>
              <button
                onClick={handleRemoveFile}
                className="btn btn-sm btn-ghost btn-circle text-error"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              {uploadingFile ? (
                <span className="text-gray-400 text-sm">Mengunggah...</span>
              ) : (
                <>
                  <File size={20} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Upload File (PDF, DOC, dll)
                  </span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadFile(file);
                }}
              />
            </label>
          )}
        </div>

        {/* Link */}
        <div className="mb-6">
          <label className="font-medium mb-2 block">Tautan (Opsional)</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Teks tautan"
              value={modalInput.link_text || ""}
              onChange={(e) =>
                setModalInput({ ...modalInput, link_text: e.target.value })
              }
              className="input input-bordered w-1/3"
            />
            <input
              type="url"
              placeholder="URL (https://...)"
              value={modalInput.link_url || ""}
              onChange={(e) =>
                setModalInput({ ...modalInput, link_url: e.target.value })
              }
              className="input input-bordered flex-1"
            />
          </div>
          {modalInput.link_url && !isValidUrl(modalInput.link_url) && (
            <p className="text-xs text-error mt-1">Format URL tidak valid</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="btn btn-outline btn-secondary"
            onClick={closeModal}
          >
            Batal
          </button>
          <button
            disabled={loadingCreate}
            className="btn btn-primary"
            onClick={handleLocalSubmit}
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
