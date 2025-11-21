"use client";

import {
  DataItem,
  DataItemNonId,
  Jenis_Sekolah,
} from "@/app/gambar/interfaces/data-item.interface";
import { useState, useEffect } from "react";
import { useGambar } from "@/app/gambar/hooks/useGambar";
import TableGambar from "@/app/gambar/components/TableGambar";
import ModalGambar from "@/app/gambar/components/ModalGambar";
import HeaderGambar from "@/app/gambar/components/HeaderGambar";
import { useEditGambar } from "@/app/gambar/hooks/UseEditGambar";
import { useCreateGambar } from "@/app/gambar/hooks/useCreateGambar";
import { useDeleteGambar } from "@/app/gambar/hooks/useDeleteGambar";
import ModalHapusGambar from "@/app/gambar/components/ModalHapusGambar";
import { EditGambarRequest } from "@/app/gambar/interfaces/edit-gambar-request.interface";

export default function GambarPage() {
  const [search, setSearch] = useState("");
  const { data: fetchedData = [], loading } = useGambar();
  const [localData, setLocalData] = useState<DataItem[]>(fetchedData);

  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItem | null>(null);
  const [modalInput, setModalInput] = useState<DataItemNonId>({
    id: undefined,
    url_gambar: "",
    jenis_sekolah: undefined,
    dibuat_pada: new Date().toISOString(),
  });

  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  const { editGambar, loading: editing } = useEditGambar();
  const { deleteGambar, loading: deleting } = useDeleteGambar();
  const { createGambar, loading: creating } = useCreateGambar();

  // --- bikin dropdown unik dari fetchedData ---
  const [jenisSekolahOptions, setJenisSekolahOptions] = useState<
    Jenis_Sekolah[]
  >([]);

  useEffect(() => {
    if (fetchedData) {
      Promise.resolve().then(() => {
        setLocalData(fetchedData);

        const uniqueJenis: Jenis_Sekolah[] = Array.from(
          new Map(
            fetchedData.map((d) => [d.jenis_sekolah.id, d.jenis_sekolah])
          ).values()
        );
        setJenisSekolahOptions(uniqueJenis);
      });
    }
  }, [fetchedData]);

  const filteredData = localData.filter((d) => {
    if (!d.jenis_sekolah) return false;

    if (Array.isArray(d.jenis_sekolah)) {
      return d.jenis_sekolah.some((j) =>
        j.nama_jenis?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return d.jenis_sekolah.nama_jenis
      ?.toLowerCase()
      .includes(search.toLowerCase());
  });

  const openAddModal = () => {
    setEditingItem(null);
    setModalInput({
      id: undefined,
      url_gambar: "",
      jenis_sekolah: undefined,
      dibuat_pada: new Date().toISOString(),
    });
    setModalOpen(true);
  };

  const openEditModal = (item: DataItem) => {
    setEditingItem(item);

    const selectedJenis = jenisSekolahOptions.find(
      (j) => j.id === item.jenis_sekolah.id
    );

    setModalInput({
      id: item.id,
      url_gambar: item.url_gambar,
      dibuat_pada: item.dibuat_pada,
      jenis_sekolah: selectedJenis,
    });

    setModalOpen(true);
  };

  const openDeleteModal = (item: DataItem) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    if (!modalInput.jenis_sekolah?.id || !modalInput.url_gambar) return;

    const dataToSend = {
      url_gambar: modalInput.url_gambar,
      id_jenis: modalInput.jenis_sekolah.id,
    };

    const result = await createGambar(dataToSend);
    if (result) {
      setLocalData((prev) => [...prev, result]);
      setModalOpen(false);

      // update jenisSekolahOptions kalau ada jenis baru
      if (!jenisSekolahOptions.find((j) => j.id === result.jenis_sekolah.id)) {
        setJenisSekolahOptions((prev) => [...prev, result.jenis_sekolah]);
      }
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem || !modalInput.jenis_sekolah?.id) return;

    try {
      const payload: EditGambarRequest = {
        url_gambar: modalInput.url_gambar || "",
        id_jenis: modalInput.jenis_sekolah.id, // ID SMK
      };

      const updatedItem = await editGambar(editingItem.id, payload);

      if (!updatedItem) return;

      setLocalData((prev) =>
        prev.map((d) => (d.id === updatedItem.id ? updatedItem : d))
      );
      setModalOpen(false);
      setEditingItem(null);

      if (
        !jenisSekolahOptions.find((j) => j.id === updatedItem.jenis_sekolah.id)
      ) {
        setJenisSekolahOptions((prev) => [...prev, updatedItem.jenis_sekolah]);
      }
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleDelete = async (id: number) => {
    const success = await deleteGambar(id);
    if (success) {
      setLocalData((prev) => prev.filter((d) => d.id !== id));
      setHapusItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderGambar
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TableGambar
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && (
        <ModalGambar
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => setModalOpen(false)}
          jenisSekolahOptions={jenisSekolahOptions}
        />
      )}

      {hapusItem && (
        <ModalHapusGambar
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={() => handleDelete(hapusItem.id)}
        />
      )}
    </div>
  );
}
