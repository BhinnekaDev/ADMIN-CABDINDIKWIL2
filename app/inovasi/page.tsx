"use client";

import {
  DataItem,
  DataItemNonId,
} from "@/app/inovasi/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { useInovasi } from "@/app/inovasi/hooks/useInovasi";
import TableInovasi from "@/app/inovasi/components/TableInovasi";
import ModalInovasi from "@/app/inovasi/components/ModalInovasi";
import HeaderInovasi from "@/app/inovasi/components/HeaderInovasi";
import { useEditInovasi } from "@/app/inovasi/hooks/UseEditInovasi";
import { useCreateInovasi } from "@/app/inovasi/hooks/useCreateInovasi";
import { useDeleteInovasi } from "@/app/inovasi/hooks/useDeleteInovasi";
import ModalHapusInovasi from "@/app/inovasi/components/ModalHapusInovasi";

export default function InovasiPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    isi: "",
    judul: "",
    penulis: "",
    id: undefined,
    inovasi_gambar: [],
    tanggal_diterbitkan: new Date().toISOString(),
  });

  const { data: fetchedData, loading } = useInovasi();
  const { editInovasi, loading: editing } = useEditInovasi();
  const { deleteInovasi, loading: deleting } = useDeleteInovasi();
  const { createInovasi, loading: creating } = useCreateInovasi();
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  useEffect(() => {
    if (fetchedData && Array.isArray(fetchedData)) {
      queueMicrotask(() => setData(fetchedData));
    }
  }, [fetchedData]);

  const filteredData = data.filter((d) =>
    d.judul.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingItem(null);
    setModalInput({
      isi: "",
      judul: "",
      inovasi_gambar: [],
      penulis: localStorage.getItem("fullName") || "",
      tanggal_diterbitkan: new Date().toISOString(),
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    const { id, isi, judul, penulis, inovasi_gambar, tanggal_diterbitkan } =
      item;

    setModalInput({
      id,
      isi,
      judul,
      penulis,
      inovasi_gambar,
      tanggal_diterbitkan,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    if (!modalInput.judul || !modalInput.penulis) return;
    const newItem = await createInovasi(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editInovasi(
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
    const success = await deleteInovasi(id);
    if (success) {
      setData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderInovasi
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableInovasi
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalInovasi
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusInovasi
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={() => handleDelete(hapusItem.id)}
        />
      )}
    </div>
  );
}
