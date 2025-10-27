"use client";

import { useState, useEffect } from "react";
import { useLokasiSekolah } from "@/app/lokasi/hooks/useLokasiSekolah";
import { DataItem } from "@/app/lokasi/interfaces/data-item.interface";
import TableLokasiSekolah from "@/app/lokasi/components/TableLokasiSekolah";
import ModalLokasiSekolah from "@/app/lokasi/components/ModalLokasiSekolah";
import HeaderLokasiSekolah from "@/app/lokasi/components/HeaderLokasiSekolah";
import { useCreateLokasiSekolah } from "@/app/lokasi/hooks/useCreateLokasiSekolah";
import { useDeleteLokasiSekolah } from "@/app/lokasi/hooks/useDeleteLokasiSekolah";
import { useEditLokasiSekolah } from "@/app/lokasi/hooks/UseEditLokasiSekolahProps";
import ModalHapusLokasiSekolah from "@/app/lokasi/components/ModalHapusLokasiSekolah";

export default function LokasiSekolahPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState({
    kelurahan: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
  });

  const { data: fetchedData, loading } = useLokasiSekolah();
  const { editLokasi, loading: editing } = useEditLokasiSekolah();
  const { deleteLokasi, loading: deleting } = useDeleteLokasiSekolah();
  const { createLokasi, loading: creating } = useCreateLokasiSekolah();
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  useEffect(() => {
    setData(fetchedData);
  }, [fetchedData]);

  const handleSubmit = async () => {
    const { kelurahan, kecamatan, kabupaten, provinsi } = modalInput;
    if (!kelurahan || !kecamatan || !kabupaten || !provinsi) return;

    const newItem = await createLokasi(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const filteredData = data
    .filter((d) => d && d.kelurahan)
    .filter((d) => d.kelurahan.toLowerCase().includes(search.toLowerCase()));

  const openAddModal = () => {
    setEditingItem(null);
    setModalInput({
      kelurahan: "",
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    setModalInput(item);
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleEditSubmit = async () => {
    if (!editingItem) return;

    const updatedItem = await editLokasi(editingItem.id, modalInput);
    if (updatedItem) {
      setData((prev) =>
        prev.map((d) => (d.id === updatedItem.id ? updatedItem : d))
      );
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderLokasiSekolah
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableLokasiSekolah
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalLokasiSekolah
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
        <ModalHapusLokasiSekolah
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={async (id: number) => {
            const success = await deleteLokasi(id);
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
