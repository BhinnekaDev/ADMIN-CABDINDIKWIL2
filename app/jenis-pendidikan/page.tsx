"use client";

import { useState, useEffect } from "react";
import { useJenisSekolah } from "@/app/jenis-pendidikan/hooks/useJenisSekolah";
import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";
import TableJenisSekolah from "@/app/jenis-pendidikan/components/TableJenisSekolah";
import ModalJenisSekolah from "@/app/jenis-pendidikan/components/ModalJenisSekolah";
import HeaderJenisSekolah from "@/app/jenis-pendidikan/components/HeaderJenisSekolah";

export default function JenisSekolahPage() {
  const { data: fetchedData, loading } = useJenisSekolah();
  const [data, setData] = useState<DataItem[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  useEffect(() => {
    setData(fetchedData);
  }, [fetchedData]);

  const filteredData = data.filter((d) =>
    d.nama_jenis.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((d) => d.id !== id));
    }
  };

  const handleModalSubmit = () => {
    if (!modalInput.trim()) return;
    if (editingItem) {
      setData(
        data.map((d) =>
          d.id === editingItem.id ? { ...d, nama_jenis: modalInput } : d
        )
      );
    } else {
      const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      setData([...data, { id: newId, nama_jenis: modalInput }]);
    }
    setModalOpen(false);
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
        handleDelete={handleDelete}
      />
      {modalOpen && (
        <ModalJenisSekolah
          modalInput={modalInput}
          setModalInput={setModalInput}
          editingItem={editingItem}
          closeModal={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
