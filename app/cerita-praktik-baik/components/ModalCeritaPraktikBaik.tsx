"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { ImagePlus, X } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";
import { supabase } from "@/lib/supabaseClient";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import { ModalCeritaPraktikBaikProps } from "@/app/cerita-praktik-baik/interfaces/modal-cerita-praktik-baik.interface";

export default function ModalCeritaPraktikBaik({
  onSubmit,
  modalInput,
  closeModal,
  editingItem,
  loadingCreate,
  setModalInput,
}: ModalCeritaPraktikBaikProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    modalInput.cerita_praktik_baik_gambar?.[0]?.url_gambar || null
  );

  const [uploading, setUploading] = useState(false);

  const supabaseImageLoader = ({
    src,
    width,
  }: {
    src: string;
    width: number;
  }) => {
    return `${src}?width=${width}`;
  };

  const handleUploadImage = async (file: File) => {
    try {
      setUploading(true);
      toast.loading("Mengunggah gambar...", { id: "upload" });

      const ext = file.name.split(".").pop();
      const fileName = `cerita_praktik_baik-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("cerita_praktik_baik")
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("cerita_praktik_baik")
        .getPublicUrl(fileName);

      const publicUrl = publicData.publicUrl;

      setPreviewImage(publicUrl);
      setModalInput({
        ...modalInput,
        cerita_praktik_baik_gambar: [{ url_gambar: publicUrl, keterangan: "" }],
      });

      toast.success("Gambar berhasil diunggah!", { id: "upload" });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Upload gagal:", err.message);
        toast.error(`Upload gagal: ${err.message}`, { id: "upload" });
      } else {
        console.error("Upload gagal:", err);
        toast.error("Upload gagal. Coba lagi.", { id: "upload" });
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box relative shadow-xl rounded-lg bg-white dark:bg-[#1d232a] max-w-3xl w-full">
        <h3 className="font-bold text-lg mb-4 text-center">
          {editingItem
            ? "Edit Cerita Praktik Baik"
            : "Tambah Cerita Praktik Baik"}
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
            className="peer block w-full border-0 border-b-2 border-gray-300  dark:border-gray-600 bg-transparent px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0"
          />
          <label
            htmlFor="judul"
            className={`absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
      peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0
peer-not-placeholder-shown:text-xs
`}
          >
            Judul
          </label>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            id="penulis"
            value={
              editingItem
                ? editingItem.penulis
                : localStorage.getItem("fullName") ?? ""
            }
            onChange={(e) =>
              setModalInput({ ...modalInput, penulis: e.target.value })
            }
            placeholder=" "
            className="peer block w-full border-0 border-b-2 border-gray-300  dark:border-gray-600 bg-transparent px-0 pt-4 pb-2 text-sm focus:outline-none focus:ring-0 cursor-not-allowed"
          />
          <label
            htmlFor="penulis"
            className={`absolute left-0 top-4 text-sm text-gray-500 dark:text-gray-400 transition-all
      peer-focus:-top-1 peer-focus:text-xs peer-not-placeholder-shown:top-0
peer-not-placeholder-shown:text-xs
`}
          >
            Penulis
          </label>
        </div>

        <div className="mb-6">
          <label className="font-medium mb-2 block">Isi Cerita</label>
          <ReactQuill
            theme="snow"
            value={modalInput.isi}
            onChange={(value) => setModalInput({ ...modalInput, isi: value })}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            className="bg-white dark:bg-[#1d232a]"
          />
        </div>

        <div className="relative mb-6 flex flex-col items-center gap-3">
          <label className="font-medium">Gambar Utama</label>

          {previewImage ? (
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-48 h-48 border rounded-lg overflow-hidden">
                <Image
                  loader={supabaseImageLoader}
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => {
                    setPreviewImage(null);
                    setModalInput({
                      ...modalInput,
                      cerita_praktik_baik_gambar: [],
                    });
                    toast("Gambar dihapus", { icon: "🗑️" });
                  }}
                  className="absolute top-2 right-2 btn btn-xs btn-error text-white rounded-full"
                >
                  <X size={14} />
                </button>
              </div>

              <input
                type="text"
                value={
                  modalInput.cerita_praktik_baik_gambar?.[0]?.keterangan || ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  setModalInput({
                    ...modalInput,
                    cerita_praktik_baik_gambar: [
                      {
                        ...modalInput.cerita_praktik_baik_gambar?.[0],
                        keterangan: value,
                      },
                    ],
                  });
                }}
                placeholder="Keterangan gambar"
                className="input input-sm input-bordered w-48"
              />
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              {uploading ? (
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
