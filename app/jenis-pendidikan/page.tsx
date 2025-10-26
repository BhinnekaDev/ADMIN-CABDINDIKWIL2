"use client";

import { useState, useEffect } from "react";
import { useJenisSekolah } from "@/app/jenis-pendidikan/hooks/useJenisSekolah";
import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";
import TableJenisSekolah from "@/app/jenis-pendidikan/components/TableJenisSekolah";
import ModalJenisSekolah from "@/app/jenis-pendidikan/components/ModalJenisSekolah";
import HeaderJenisSekolah from "@/app/jenis-pendidikan/components/HeaderJenisSekolah";
import { useCreateJenisSekolah } from "@/app/jenis-pendidikan/hooks/useCreateJenisSekolah";

export default function JenisSekolahPage() {
  const [search, setSearch] = useState("");
  const [modalInput, setModalInput] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: fetchedData, loading } = useJenisSekolah();
  const { createJenis, loading: creating } = useCreateJenisSekolah();
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  useEffect(() => {
    setData(fetchedData);
  }, [fetchedData]);

  const handleSubmit = async () => {
    if (!modalInput.trim()) return;

    const newItem = await createJenis(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
      setModalInput("");
    }
  };

  const filteredData = data
    .filter((d) => d && d.nama_jenis)
    .filter((d) => d.nama_jenis.toLowerCase().includes(search.toLowerCase()));

  const openAddModal = () => {
    setEditingItem(null);
    setModalInput("");
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    setModalInput(item.nama_jenis);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderJenisSekolah
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />
      <TableJenisSekolah
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        handleDelete={handleDelete}
      />
      {modalOpen && (
        <ModalJenisSekolah
          modalInput={modalInput}
          onSubmit={handleSubmit}
          loadingCreate={creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
