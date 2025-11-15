import { useState } from "react";
import toast from "react-hot-toast";
import { UseDeleteStrukturOrganisasiProps } from "@/app/struktur-organisasi/interfaces/use-delete-struktur-organisasi-props.interface";

export function useDeleteStrukturOrganisasi(): UseDeleteStrukturOrganisasiProps {
  const [loading, setLoading] = useState(false);

  const deleteStrukturOrganisasi = async (id: number): Promise<boolean> => {
    setLoading(true);

    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(
        `${prodUrl}struktur-organisasi/?idParam=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      toast.success("Struktur Organisasi berhasil dihapus!");
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteStrukturOrganisasi, loading };
}
