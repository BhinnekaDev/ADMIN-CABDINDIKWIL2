"use client";

import {
  DataItem,
  DataItemNonId,
} from "@/app/berita/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { useBerita } from "@/app/berita/hooks/useBerita";
import TableBerita from "@/app/berita/components/TableBerita";
import ModalBerita from "@/app/berita/components/ModalBerita";
import HeaderBerita from "@/app/berita/components/HeaderBerita";
import { useEditBerita } from "@/app/berita/hooks/UseEditBerita";
import { useCreateBerita } from "@/app/berita/hooks/useCreateBerita";
import { useDeleteBerita } from "@/app/berita/hooks/useDeleteBerita";
import ModalHapusBerita from "@/app/berita/components/ModalHapusBerita";

export default function BeritaPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    isi: "",
    judul: "",
    penulis: "",
    id: undefined,
    berita_gambar: [],
    tanggal_diterbitkan: new Date().toISOString(),
  });

  const { data: fetchedData, loading } = useBerita();
  const { editBerita, loading: editing } = useEditBerita();
  const { deleteBerita, loading: deleting } = useDeleteBerita();
  const { createBerita, loading: creating } = useCreateBerita();
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
      penulis: "",
      url_gambar: [],
      tanggal_diterbitkan: new Date().toISOString(),
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    const { id, isi, judul, penulis, tanggal_diterbitkan, berita_gambar } =
      item;

    setModalInput({
      id,
      isi,
      judul,
      penulis,
      tanggal_diterbitkan,
      berita_gambar,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    if (!modalInput.judul || !modalInput.penulis) return;
    const newItem = await createBerita(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editBerita(
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
    const success = await deleteBerita(id);
    if (success) {
      setData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderBerita
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableBerita
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalBerita
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusBerita
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={() => handleDelete(hapusItem.id)}
        />
      )}
    </div>
  );
}
