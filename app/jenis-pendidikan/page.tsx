"use client";

import { useState, useEffect } from "react";
import { useJenisSekolah } from "@/app/jenis-pendidikan/hooks/useJenisSekolah";
import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";
import TableJenisSekolah from "@/app/jenis-pendidikan/components/TableJenisSekolah";
import ModalJenisSekolah from "@/app/jenis-pendidikan/components/ModalJenisSekolah";
import HeaderJenisSekolah from "@/app/jenis-pendidikan/components/HeaderJenisSekolah";
import { useCreateJenisSekolah } from "@/app/jenis-pendidikan/hooks/useCreateJenisSekolah";
import { useDeleteJenisSekolah } from "@/app/jenis-pendidikan/hooks/useDeleteJenisSekolah";
import { useEditJenisSekolah } from "@/app/jenis-pendidikan/hooks/UseEditJenisSekolahProps";
import ModalHapusJenisSekolah from "@/app/jenis-pendidikan/components/ModalHapusJenisSekolah";

export default function JenisSekolahPage() {
  const [search, setSearch] = useState("");
  const [modalInput, setModalInput] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);

  const { data: fetchedData, loading } = useJenisSekolah();
  const { editJenis, loading: editing } = useEditJenisSekolah();
  const { deleteJenis, loading: deleting } = useDeleteJenisSekolah();
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

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleEditSubmit = async () => {
    if (!modalInput.trim() || !editingItem) return;

    const updatedItem = await editJenis(editingItem.id, modalInput);
    if (updatedItem) {
      setData((prev) =>
        prev.map((d) => (d.id === updatedItem.id ? updatedItem : d))
      );
      setModalOpen(false);
      setModalInput("");
      setEditingItem(null);
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
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalJenisSekolah
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={
            editing ? (editingItem ? editing : creating) : creating
          }
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusJenisSekolah
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={async (id: number) => {
            const success = await deleteJenis(id);
            if (success) {
              setData((prev) => prev.filter((d) => d.id !== id));
              setHapusItem(null);
            }
          }}
        />
      )}
    </div>
  );
}
