"use client";

import {
  DataItem,
  DataItemNonId,
} from "@/app/struktur-organisasi/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { useStrukturOrganisasi } from "@/app/struktur-organisasi/hooks/useStrukturOrganisasi";
import TableStrukturOrganisasi from "@/app/struktur-organisasi/components/TableStrukturOrganisasi";
import ModalStrukturOrganisasi from "@/app/struktur-organisasi/components/ModalStrukturOrganisasi";
import HeaderStrukturOrganisasi from "@/app/struktur-organisasi/components/HeaderStrukturOrganisasi";
import { useEditStrukturOrganisasi } from "@/app/struktur-organisasi/hooks/UseEditStrukturOrganisasi";
import { useCreateStrukturOrganisasi } from "@/app/struktur-organisasi/hooks/useCreateStrukturOrganisasi";
import { useDeleteStrukturOrganisasi } from "@/app/struktur-organisasi/hooks/useDeleteStrukturOrganisasi";
import ModalHapusStrukturOrganisasi from "@/app/struktur-organisasi/components/ModalHapusStrukturOrganisasi";

export default function StrukturOrganisasiPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    id: undefined,
    gambar_struktur: "",
    gambar_dokumentasi: "",
    dibuat_pada: new Date().toISOString(),
  });

  const { data: fetchedData, loading } = useStrukturOrganisasi();
  const { editStrukturOrganisasi, loading: editing } =
    useEditStrukturOrganisasi();
  const { deleteStrukturOrganisasi, loading: deleting } =
    useDeleteStrukturOrganisasi();
  const { createStrukturOrganisasi, loading: creating } =
    useCreateStrukturOrganisasi();
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  useEffect(() => {
    if (fetchedData && Array.isArray(fetchedData)) {
      queueMicrotask(() => setData(fetchedData));
    }
  }, [fetchedData]);

  const filteredData = data.filter((d) =>
    d.dibuat_pada.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingItem(null);
    setModalInput({
      gambar_struktur: "",
      gambar_dokumentasi: "",
      dibuat_pada: new Date().toISOString(),
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    const { id, gambar_struktur, gambar_dokumentasi, dibuat_pada } = item;

    setModalInput({
      id,
      gambar_struktur,
      gambar_dokumentasi,
      dibuat_pada,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    if (!modalInput.gambar_dokumentasi || !modalInput.gambar_struktur) return;
    const newItem = await createStrukturOrganisasi(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editStrukturOrganisasi(
        editingItem.id,
        modalInput as DataItem
      );
      if (!updatedItem) return;
      setData((prev) =>
        prev.map((d) => (d.id === updatedItem.id ? updatedItem : d))
      );
      setModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleDelete = async (id: number) => {
    const success = await deleteStrukturOrganisasi(id);
    if (success) {
      setData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderStrukturOrganisasi
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableStrukturOrganisasi
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalStrukturOrganisasi
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusStrukturOrganisasi
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={() => handleDelete(hapusItem.id)}
        />
      )}
    </div>
  );
}
