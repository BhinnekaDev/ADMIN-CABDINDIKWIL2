"use client";

import {
  DataItem,
  DataItemNonId,
} from "@/app/cerita-praktik-baik/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { useCeritaPraktikBaik } from "@/app/cerita-praktik-baik/hooks/useCeritaPraktikBaik";
import TableCeritaPraktikBaik from "@/app/cerita-praktik-baik/components/TableCeritaPraktikBaik";
import ModalCeritaPraktikBaik from "@/app/cerita-praktik-baik/components/ModalCeritaPraktikBaik";
import HeaderCeritaPraktikBaik from "@/app/cerita-praktik-baik/components/HeaderCeritaPraktikBaik";
import { useEditCeritaPraktikBaik } from "@/app/cerita-praktik-baik/hooks/UseEditCeritaPraktikBaik";
import { useCreateCeritaPraktikBaik } from "@/app/cerita-praktik-baik/hooks/useCreateCeritaPraktikBaik";
import { useDeleteCeritaPraktikBaik } from "@/app/cerita-praktik-baik/hooks/useDeleteCeritaPraktikBaik";
import ModalHapusCeritaPraktikBaik from "@/app/cerita-praktik-baik/components/ModalHapusCeritaPraktikBaik";

export default function CeritaPraktikBaikPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    isi: "",
    judul: "",
    penulis: "",
    id: undefined,
    cerita_praktik_baik_gambar: [],
    tanggal_diterbitkan: new Date().toISOString(),
  });

  const { data: fetchedData, loading } = useCeritaPraktikBaik();
  const { editCeritaPraktikBaik, loading: editing } =
    useEditCeritaPraktikBaik();
  const { deleteCeritaPraktikBaik, loading: deleting } =
    useDeleteCeritaPraktikBaik();
  const { createCeritaPraktikBaik, loading: creating } =
    useCreateCeritaPraktikBaik();
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
      cerita_praktik_baik_gambar: [],
      penulis: localStorage.getItem("fullName") || "",
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
      cerita_praktik_baik_gambar,
      tanggal_diterbitkan,
    } = item;

    setModalInput({
      id,
      isi,
      judul,
      penulis,
      cerita_praktik_baik_gambar,
      tanggal_diterbitkan,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    if (!modalInput.judul || !modalInput.penulis) return;
    const newItem = await createCeritaPraktikBaik(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editCeritaPraktikBaik(
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
    const success = await deleteCeritaPraktikBaik(id);
    if (success) {
      setData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderCeritaPraktikBaik
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableCeritaPraktikBaik
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalCeritaPraktikBaik
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusCeritaPraktikBaik
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={() => handleDelete(hapusItem.id)}
        />
      )}
    </div>
  );
}
