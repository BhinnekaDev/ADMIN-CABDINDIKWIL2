import { useState } from "react";
import toast from "react-hot-toast";
import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";
import { CreateJenisSekolahProps } from "@/app/jenis-pendidikan/interfaces/create-jenis-sekolah-props.interface";

export function useCreateJenisSekolah(): CreateJenisSekolahProps {
  const [loading, setLoading] = useState(false);

  const createJenis = async (namaJenis: string): Promise<DataItem | null> => {
    setLoading(true);

    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${prodUrl}satpen/jenis`, {
        method: "POST",
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
      toast.success("Jenis sekolah berhasil dibuat!");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createJenis, loading };
}
