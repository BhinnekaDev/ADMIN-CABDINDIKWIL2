import { useState } from "react";
import toast from "react-hot-toast";
import { SatuanPendidikanData } from "@/app/satuan-pendidikan/interfaces/satuan-pendidikan-data.interface";
import { DataItemSatuanPendidikan } from "@/app/satuan-pendidikan/interfaces/data-item.interface";
import { UseEditSatuanPendidikanProps } from "@/app/satuan-pendidikan/interfaces/use-edit-satuan-pendidikan-props.interface";

export function useEditSatuanPendidikan(): UseEditSatuanPendidikanProps {
  const [loading, setLoading] = useState(false);

  const editSatuanPendidikan = async (
    id: number,
    data: SatuanPendidikanData
  ): Promise<DataItemSatuanPendidikan | null> => {
    setLoading(true);
    const payload = {
      npsn: Number(data.npsn),
      nama: data.nama,
      status: data.status,
      alamat: data.alamat,
      jenis_id: data.jenis_sekolah.id,
      lokasi_id: data.lokasi.id,
    };
    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${prodUrl}satpen?npsnParam=${Number(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json: DataItemSatuanPendidikan = await response.json();
      toast.success("Satuan pendidikan berhasil diperbarui!");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editSatuanPendidikan, loading };
}
