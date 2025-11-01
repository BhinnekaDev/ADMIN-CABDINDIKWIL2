"use client";

import {
  DataItem,
  DataItemNonId,
} from "@/app/prakata/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { usePrakata } from "@/app/prakata/hooks/usePrakata";
import TablePrakata from "@/app/prakata/components/TablePrakata";
import ModalPrakata from "@/app/prakata/components/ModalPrakata";
import HeaderPrakata from "@/app/prakata/components/HeaderPrakata";
import { useEditPrakata } from "@/app/prakata/hooks/UseEditPrakata";
import { useCreatePrakata } from "@/app/prakata/hooks/useCreatePrakata";
import { useDeletePrakata } from "@/app/prakata/hooks/useDeletePrakata";
import ModalHapusPrakata from "@/app/prakata/components/ModalHapusPrakata";

export default function PrakataPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    isi: "",
    judul: "",
    penutup: "",
    sub_judul: "",
    id: undefined,
  });

  const { data: fetchedData, loading } = usePrakata();
  const { editPrakata, loading: editing } = useEditPrakata();
  const { deletePrakata, loading: deleting } = useDeletePrakata();
  const { createPrakata, loading: creating } = useCreatePrakata();
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
      penutup: "",
      sub_judul: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    const { id, isi, judul, penutup, sub_judul } = item;

    setModalInput({
      id,
      isi,
      judul,
      penutup,
      sub_judul,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    if (!modalInput.judul || !modalInput.penutup) return;
    const newItem = await createPrakata(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editPrakata(
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
    const success = await deletePrakata(id);
    if (success) {
      setData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderPrakata
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TablePrakata
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalPrakata
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusPrakata
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={() => handleDelete(hapusItem.id)}
        />
      )}
    </div>
  );
}
