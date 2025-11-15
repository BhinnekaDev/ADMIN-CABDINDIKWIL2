"use client";

import {
  DataItem,
  DataItemNonId,
} from "@/app/layanan/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { useLayanan } from "@/app/layanan/hooks/useLayanan";
import TableLayanan from "@/app/layanan/components/TableLayanan";
import ModalLayanan from "@/app/layanan/components/ModalLayanan";
import HeaderLayanan from "@/app/layanan/components/HeaderLayanan";
import { useEditLayanan } from "@/app/layanan/hooks/UseEditLayanan";
import { useCreateLayanan } from "@/app/layanan/hooks/useCreateLayanan";
import { useDeleteLayanan } from "@/app/layanan/hooks/useDeleteLayanan";
import ModalHapusLayanan from "@/app/layanan/components/ModalHapusLayanan";

export default function LayananPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    id: undefined,
    judul: "",
    url_file: "",
    nama_file: "",
    jenis_file: "",
    ukuran_file: 0,
    dibuat_pada: "",
    jenis_layanan: "",
  });

  const { data: fetchedData, loading } = useLayanan();
  const { editLayanan, loading: editing } = useEditLayanan();
  const { deleteLayanan, loading: deleting } = useDeleteLayanan();
  const { createLayanan, loading: creating } = useCreateLayanan();
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
      id: undefined,
      judul: "",
      url_file: "",
      nama_file: "",
      jenis_file: "",
      ukuran_file: 0,
      dibuat_pada: "",
      jenis_layanan: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    const {
      id,
      judul,
      url_file,
      nama_file,
      jenis_file,
      ukuran_file,
      dibuat_pada,
      jenis_layanan,
    } = item;

    setModalInput({
      id,
      judul,
      url_file,
      nama_file,
      jenis_file,
      ukuran_file,
      dibuat_pada,
      jenis_layanan,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    if (!modalInput.judul || !modalInput.url_file) return;
    const newItem = await createLayanan(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editLayanan(
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
    const success = await deleteLayanan(id);
    if (success) {
      setData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderLayanan
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableLayanan
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalLayanan
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusLayanan
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={() => handleDelete(hapusItem.id)}
        />
      )}
    </div>
  );
}
