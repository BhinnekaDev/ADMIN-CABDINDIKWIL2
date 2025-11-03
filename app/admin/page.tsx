"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/app/admin/hooks/useAdmin";
import TableAdmin from "@/app/admin/components/TableAdmin";
import ModalAdmin from "@/app/admin/components/ModalAdmin";
import HeaderAdmin from "@/app/admin/components/HeaderAdmin";
import { useEditAdmin } from "@/app/admin/hooks/UseEditAdmin";
import { DataItem } from "@/app/admin/interfaces/data-item.interface";

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState<DataItem>({
    id: 0,
    role: "",
    email: "",
    created_at: "",
    updated_at: "",
    status_approval: "",
  });

  const { data: fetchedData, loading } = useAdmin();
  const { editAdmin, loading: editing } = useEditAdmin();
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  useEffect(() => {
    if (fetchedData && Array.isArray(fetchedData)) {
      queueMicrotask(() => setData(fetchedData));
    }
  }, [fetchedData]);

  const filteredData = data.filter((d) =>
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingItem(null);
    setModalInput({
      id: 0,
      role: "",
      email: "",
      created_at: "",
      updated_at: "",
      status_approval: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);
    const { id, email, role, created_at, updated_at, status_approval } = item;

    setModalInput({
      id,
      role,
      email,
      created_at,
      updated_at,
      status_approval,
    });
    setModalOpen(true);
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;
    try {
      const updatedItem = await editAdmin(
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
      <HeaderAdmin search={search} loading={loading} setSearch={setSearch} />

      <TableAdmin
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
      />

      {modalOpen && (
        <ModalAdmin
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : openAddModal}
          loadingCreate={editing}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
