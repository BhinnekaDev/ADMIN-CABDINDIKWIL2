import { useState } from "react";
import toast from "react-hot-toast";
import { DataItem } from "@/app/struktur-organisasi/interfaces/data-item.interface";
import { UseEditStrukturOrganisasiProps } from "@/app/struktur-organisasi/interfaces/use-edit-struktur-organisasi-props.interface";

export function useEditStrukturOrganisasi(): UseEditStrukturOrganisasiProps {
  const [loading, setLoading] = useState(false);

  const editStrukturOrganisasi = async (
    id: number,
    data: DataItem
  ): Promise<DataItem | null> => {
    setLoading(true);
    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(
        `${prodUrl}struktur-organisasi?idParam=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json: DataItem = await response.json();
      toast.success("Struktur Organisasi berhasil diperbarui!");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editStrukturOrganisasi, loading };
}
