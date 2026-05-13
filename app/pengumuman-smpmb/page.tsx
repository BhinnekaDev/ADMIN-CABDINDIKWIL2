"use client";

import { useState, useEffect } from "react";
import { useSpmb } from "@/app/pengumuman-smpmb/hooks/useSpmb";
import TableSpmb from "@/app/pengumuman-smpmb/components/TableSpmb";
import ModalSpmb from "@/app/pengumuman-smpmb/components/ModalSpmb";
import HeaderSpmb from "@/app/pengumuman-smpmb/components/HeaderSpmb";
import { useEditSpmb } from "@/app/pengumuman-smpmb/hooks/useEditSpmb";
import { useCreateSpmb } from "@/app/pengumuman-smpmb/hooks/useCreateSpmb";
import { useDeleteSpmb } from "@/app/pengumuman-smpmb/hooks/useDeleteSpmb";
import ModalHapusSpmb from "@/app/pengumuman-smpmb/components/ModalHapusSpmb";
import {
  DataItemSpmb,
  DataItemNonIdSpmb,
} from "@/app/pengumuman-smpmb/interfaces/data-item.interface";

export default function SpmbPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItemSpmb[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItemSpmb | null>(null);
  const [editingItem, setEditingItem] = useState<DataItemSpmb | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonIdSpmb>({
    judul: "",
    link_text: "",
    link_url: "",
    spmb_media_image: [],
    spmb_media_file: [],
  });

  const { data: fetchedData, loading } = useSpmb();
  const { editSpmb, loading: editing } = useEditSpmb();
  const { deleteSpmb, loading: deleting } = useDeleteSpmb();
  const { createSpmb, loading: creating } = useCreateSpmb();

  useEffect(() => {
    if (fetchedData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(fetchedData);
    }
  }, [fetchedData]);

  const filteredData = data.filter((d) =>
    d.judul.toLowerCase().includes(search.toLowerCase()),
  );

  const openAddModal = () => {
    setEditingItem(null);
    setModalInput({
      judul: "",
      link_text: "",
      link_url: "",
      spmb_media_image: [],
      spmb_media_file: [],
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItemSpmb) => {
    setEditingItem(item);
    setModalInput({
      id: item.id,
      judul: item.judul,
      link_text: item.link_text,
      link_url: item.link_url,
      spmb_media_image: item.spmb_media_image,
      spmb_media_file: item.spmb_media_file,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItemSpmb) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    const newItem = await createSpmb(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editingItem) return;
    const updatedItem = await editSpmb(editingItem.id, {
      ...modalInput,
      id: editingItem.id,
      dibuat_pada: editingItem.dibuat_pada,
      diperbarui_pada: editingItem.diperbarui_pada,
    } as DataItemSpmb);
    if (updatedItem) {
      setData((prev) =>
        prev.map((d) => (d.id === updatedItem.id ? updatedItem : d)),
      );
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleDelete = async (id: number) => {
    const success = await deleteSpmb(id);
    if (success) {
      setData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderSpmb
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableSpmb
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalSpmb
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {hapusItem && (
        <ModalHapusSpmb
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
