import { useState } from "react";
import toast from "react-hot-toast";
import { UseDeleteSatuanPendidikanProps } from "@/app/satuan-pendidikan/interfaces/use-satuan-pendidikan-props.interface";

export function useDeleteSatuanPendidikan(): UseDeleteSatuanPendidikanProps {
  const [loading, setLoading] = useState(false);

  const deleteSatuanPendidikan = async (id: number): Promise<boolean> => {
    setLoading(true);

    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${prodUrl}satpen?npsnParam=${Number(id)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      toast.success("Lokasi sekolah berhasil dihapus!");
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteSatuanPendidikan, loading };
}
