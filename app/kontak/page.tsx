"use client";

import {
  DataItem,
  DataItemNonId,
} from "@/app/kontak/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { useKontak } from "@/app/kontak/hooks/useKontak";
import TableKontak from "@/app/kontak/components/TableKontak";
import ModalKontak from "@/app/kontak/components/ModalKontak";
import HeaderKontak from "@/app/kontak/components/HeaderKontak";
import { useEditKontak } from "@/app/kontak/hooks/UseEditKontak";

export default function KontakPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    email: "",
    alamat: "",
    no_telp: "",
    id: undefined,
    dibuat_pada: "",
  });

  const { data: fetchedData, loading } = useKontak();
  const { editKontak, loading: editing } = useEditKontak();
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  useEffect(() => {
    if (fetchedData && Array.isArray(fetchedData)) {
      queueMicrotask(() => setData(fetchedData));
    }
  }, [fetchedData]);

  const filteredData = data.filter((d) =>
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    const { id, email, alamat, no_telp } = item;

    setModalInput({
      id,
      email: email,
      alamat: alamat,
      no_telp: no_telp,
    });
    setModalOpen(true);
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editKontak(
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

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderKontak search={search} setSearch={setSearch} loading={loading} />

      <TableKontak
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
      />

      {modalOpen && (
        <ModalKontak
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : () => {}}
          loadingCreate={editingItem ? editing : loading}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
