"use client";

import {
  DataItem,
  DataItemNonId,
} from "@/app/seputar-cabdin/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { useSeputarCabdin } from "@/app/seputar-cabdin/hooks/useSeputarCabdin";
import TableSeputarCabdin from "@/app/seputar-cabdin/components/TableSeputarCabdin";
import ModalSeputarCabdin from "@/app/seputar-cabdin/components/ModalSeputarCabdin";
import HeaderSeputarCabdin from "@/app/seputar-cabdin/components/HeaderSeputarCabdin";
import { useEditSeputarCabdin } from "@/app/seputar-cabdin/hooks/UseEditSeputarCabdin";
import { useCreateSeputarCabdin } from "@/app/seputar-cabdin/hooks/useCreateSeputarCabdin";
import { useDeleteSeputarCabdin } from "@/app/seputar-cabdin/hooks/useDeleteSeputarCabdin";
import ModalHapusSeputarCabdin from "@/app/seputar-cabdin/components/ModalHapusSeputarCabdin";

export default function SeputarCabdinPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    isi: "",
    judul: "",
    penulis: "",
    id: undefined,
    seputar_cabdin_gambar: [],
    tanggal_diterbitkan: new Date().toISOString(),
  });

  const { data: fetchedData, loading } = useSeputarCabdin();
  const { editSeputarCabdin, loading: editing } = useEditSeputarCabdin();
  const { deleteSeputarCabdin, loading: deleting } = useDeleteSeputarCabdin();
  const { createSeputarCabdin, loading: creating } = useCreateSeputarCabdin();
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
    const {
      id,
      isi,
      judul,
      penulis,
      tanggal_diterbitkan,
      seputar_cabdin_gambar,
    } = item;

    setModalInput({
      id,
      isi,
      judul,
      penulis,
      tanggal_diterbitkan,
      seputar_cabdin_gambar,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    if (!modalInput.judul || !modalInput.penulis) return;
    const newItem = await createSeputarCabdin(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editSeputarCabdin(
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
    const success = await deleteSeputarCabdin(id);
    if (success) {
      setData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderSeputarCabdin
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableSeputarCabdin
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalSeputarCabdin
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusSeputarCabdin
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={() => handleDelete(hapusItem.id)}
        />
      )}
    </div>
  );
}
