"use client";

import { useState, useEffect } from "react";
import { useLokasiSekolah } from "@/app/lokasi/hooks/useLokasiSekolah";
import { useJenisSekolah } from "@/app/jenis-pendidikan/hooks/useJenisSekolah";
import TablesatuanPendidikan from "@/app/satuan-pendidikan/components/TableSatuanPendidikan";
import ModalSatuanPendidikan from "@/app/satuan-pendidikan/components/ModalSatuanPendidikan";
import HeaderSatuanPendidikan from "@/app/satuan-pendidikan/components/HeaderSatuanPendidikan";
import { useCreateSatuanPendidikan } from "@/app/satuan-pendidikan/hooks/useSatuanPendidikan";
import { useSatuanPendidikan } from "@/app/satuan-pendidikan/hooks/useSatuanPendidikanSekolah";
import { useEditSatuanPendidikan } from "@/app/satuan-pendidikan/hooks/useEditSatuanPendidikan";
import { DataItemSatuanPendidikan } from "@/app/satuan-pendidikan/interfaces/data-item.interface";
import { useDeleteSatuanPendidikan } from "@/app/satuan-pendidikan/hooks/useDeleteSatuanPendidikan";
import ModalHapusLokasiSekolah from "@/app/satuan-pendidikan/components/ModalHapusSatuanPendidikan";

export default function LokasiSekolahPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataItemSatuanPendidikan[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hapusItem, setHapusItem] = useState<DataItemSatuanPendidikan | null>(
    null
  );
  const [editingItem, setEditingItem] =
    useState<DataItemSatuanPendidikan | null>(null);
  const [pendingEditItem, setPendingEditItem] =
    useState<DataItemSatuanPendidikan | null>(null);
  const [modalReady, setModalReady] = useState(false);

  const [modalInput, setModalInput] = useState({
    npsn: 0,
    nama: "",
    status: "",
    alamat: "",
    jenis_sekolah: { id: 0, nama_jenis: "" },
    lokasi: {
      id: 0,
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
    },
  });

  const { data: fetchedData, loading } = useSatuanPendidikan();
  const { editSatuanPendidikan, loading: editing } = useEditSatuanPendidikan();
  const { deleteSatuanPendidikan, loading: deleting } =
    useDeleteSatuanPendidikan();
  const { createSatuanPendidikan, loading: creating } =
    useCreateSatuanPendidikan();
  const { data: fetchedJenis } = useJenisSekolah();
  const { data: fetchedLokasi } = useLokasiSekolah();

  useEffect(() => {
    setData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    if (pendingEditItem && fetchedJenis && fetchedLokasi) {
      setEditingItem(pendingEditItem);

      const jenis = fetchedJenis.find(
        (j) => j.nama_jenis === pendingEditItem.jenis_sekolah?.nama_jenis
      );

      const lokasi = fetchedLokasi.find(
        (l) =>
          l.kelurahan === pendingEditItem.lokasi?.kelurahan &&
          l.kecamatan === pendingEditItem.lokasi?.kecamatan &&
          l.kabupaten === pendingEditItem.lokasi?.kabupaten &&
          l.provinsi === pendingEditItem.lokasi?.provinsi
      );

      setModalInput({
        npsn: pendingEditItem.npsn,
        nama: pendingEditItem.nama,
        status: pendingEditItem.status,
        alamat: pendingEditItem.alamat || "",
        jenis_sekolah: {
          id: jenis?.id || 0,
          nama_jenis: pendingEditItem.jenis_sekolah?.nama_jenis || "",
        },
        lokasi: {
          id: lokasi?.id || 0,
          kelurahan: pendingEditItem.lokasi?.kelurahan || "",
          kecamatan: pendingEditItem.lokasi?.kecamatan || "",
          kabupaten: pendingEditItem.lokasi?.kabupaten || "",
          provinsi: pendingEditItem.lokasi?.provinsi || "",
        },
      });

      setPendingEditItem(null);
      setModalReady(true);
      setModalOpen(true);
    }
  }, [pendingEditItem, fetchedJenis, fetchedLokasi]);

  const openAddModal = () => {
    setEditingItem(null);
    setModalInput({
      npsn: 0,
      nama: "",
      status: "",
      alamat: "",
      jenis_sekolah: { id: 0, nama_jenis: "" },
      lokasi: {
        id: 0,
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
      },
    });
    setModalReady(true);
    setModalOpen(true);
  };

  const openEditModal = (item: DataItemSatuanPendidikan) => {
    setPendingEditItem(item);
  };

  const openDeleteModal = (item: DataItemSatuanPendidikan) => {
    setHapusItem(item);
  };

  const handleSubmit = async () => {
    const newItem = await createSatuanPendidikan(modalInput);
    if (newItem) {
      setData((prev) => [...prev, newItem]);
      setModalOpen(false);
      setModalReady(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editingItem) return;
    const updatedItem = await editSatuanPendidikan(
      editingItem.npsn,
      modalInput
    );
    if (updatedItem) {
      setData((prev) =>
        prev.map((d) => (d.npsn === updatedItem.npsn ? updatedItem : d))
      );
      setModalOpen(false);
      setModalReady(false);
      setEditingItem(null);
    }
  };

  const filteredData = data
    .filter((d) => d && d.nama)
    .filter((d) => d.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <HeaderSatuanPendidikan
        search={search}
        setSearch={setSearch}
        loading={loading}
        openAddModal={openAddModal}
      />

      <TablesatuanPendidikan
        data={filteredData}
        loading={loading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      {modalOpen && modalReady && (
        <ModalSatuanPendidikan
          modalInput={modalInput}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          loadingCreate={editingItem ? editing : creating}
          editingItem={editingItem}
          setModalInput={setModalInput}
          closeModal={() => {
            setModalOpen(false);
            setModalReady(false);
          }}
        />
      )}

      {hapusItem && (
        <ModalHapusLokasiSekolah
          item={hapusItem}
          loading={deleting}
          closeModal={() => setHapusItem(null)}
          onDelete={async (id: number) => {
            const success = await deleteSatuanPendidikan(id);
            if (success) {
              setData((prev) => prev.filter((d) => d.npsn !== id));
              setHapusItem(null);
            }
          }}
        />
      )}
    </div>
  );
}
