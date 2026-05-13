"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  File,
  Link2,
  Edit2,
  Trash2,
  ImageOff,
  AlertTriangle,
} from "lucide-react";
import { TableSpmbProps } from "@/app/pengumuman-smpmb/interfaces/table-spmb.interface";

export default function TableSpmb({
  data,
  loading,
  openEditModal,
  openDeleteModal,
}: TableSpmbProps) {
  const [mobileActionItem, setMobileActionItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const supabaseImageLoader = ({
    src,
    width,
  }: {
    src: string;
    width: number;
  }) => {
    return `${src}?width=${width}`;
  };

  const generateMobilePages = () => {
    const windowSize = 4;

    if (totalPages <= windowSize) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - 1;

    if (start < 1) start = 1;

    let end = start + windowSize - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - windowSize + 1;
    }

    return Array.from({ length: windowSize }, (_, i) => start + i);
  };

  const generatePages = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > maxVisible) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - maxVisible) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  if (loading) {
    return (
      <div className="overflow-x-auto w-full max-w-5xl shadow-lg rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Thumbnail</th>
              <th>File/Link</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </td>
                <td>
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </td>
                <td>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </td>
                <td>
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full max-w-5xl p-8 text-center border rounded-lg bg-gray-50 dark:bg-gray-800">
        <AlertTriangle size={48} className="mx-auto text-gray-400 mb-3" />
        <p className="text-gray-500">Belum ada pengumuman</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto w-full max-w-5xl shadow-lg rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="hidden sm:table-cell">No</th>
              <th className="hidden sm:table-cell">Thumbnail</th>
              <th>Judul</th>
              <th>Media</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id}>
                <td className="hidden sm:table-cell">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="hidden sm:table-cell">
                  {item.spmb_media_image?.[0]?.image_url ? (
                    <div className="relative w-12 h-12">
                      <Image
                        loader={supabaseImageLoader}
                        src={item.spmb_media_image[0].image_url}
                        alt={item.judul}
                        fill
                        className="object-cover rounded-lg border"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center border rounded-lg bg-gray-100 dark:bg-gray-700">
                      <ImageOff size={20} className="text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="max-w-48 truncate font-medium">{item.judul}</td>
                <td>
                  <div className="flex gap-2">
                    {item.spmb_media_file?.[0] && (
                      <a
                        href={item.spmb_media_file[0].file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tooltip"
                        data-tip="File"
                      >
                        <File size={18} className="text-blue-500" />
                      </a>
                    )}
                    {item.link_url && (
                      <a
                        href={item.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tooltip"
                        data-tip={item.link_text || "Link"}
                      >
                        <Link2 size={18} className="text-green-500" />
                      </a>
                    )}
                    {!item.spmb_media_file?.length && !item.link_url && (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="sm:hidden">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => setMobileActionItem(item.id)}
                    >
                      ⋮
                    </button>
                  </div>
                  <div className="hidden sm:flex gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                      onClick={() => openEditModal(item)}
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                      onClick={() => openDeleteModal(item)}
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>

                  {mobileActionItem === item.id && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                      <div className="bg-white dark:bg-[#1d232a] w-full max-w-md p-4 rounded-t-lg">
                        <h3 className="text-lg font-semibold mb-4">
                          Pilih Aksi
                        </h3>
                        <button
                          className="btn btn-block btn-info mb-2 text-white flex items-center justify-center gap-2"
                          onClick={() => {
                            openEditModal(item);
                            setMobileActionItem(null);
                          }}
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          className="btn btn-block btn-error mb-2 text-white flex items-center justify-center gap-2"
                          onClick={() => {
                            openDeleteModal(item);
                            setMobileActionItem(null);
                          }}
                        >
                          <Trash2 size={16} /> Hapus
                        </button>
                        <button
                          className="btn btn-outline btn-secondary w-full"
                          onClick={() => setMobileActionItem(null)}
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Sebelum
          </button>
          {(isMobile ? generateMobilePages() : generatePages()).map((p, i) => (
            <button
              key={i}
              disabled={p === "..."}
              className={`btn btn-sm ${p === currentPage ? "btn-primary" : ""}`}
              onClick={() => typeof p === "number" && goToPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="btn btn-sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </button>
        </div>
      )}
    </>
  );
}
