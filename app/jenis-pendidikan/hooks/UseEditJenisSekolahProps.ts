import { useState } from "react";
import toast from "react-hot-toast";
import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";
import { UseEditJenisSekolahProps } from "@/app/jenis-pendidikan/interfaces/use-edit-jenis-sekolah-props.interface";

export function useEditJenisSekolah(): UseEditJenisSekolahProps {
  const [loading, setLoading] = useState(false);

  const editJenis = async (
    id: number,
    namaJenis: string
  ): Promise<DataItem | null> => {
    setLoading(true);
    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${prodUrl}satpen/jenis?idParam=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ namaJenis }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json: DataItem = await response.json();
      toast.success("Jenis sekolah berhasil diperbarui!");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editJenis, loading };
}
