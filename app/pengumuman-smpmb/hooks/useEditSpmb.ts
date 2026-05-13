import { useState } from "react";
import toast from "react-hot-toast";
import { DataItemSpmb } from "@/app/pengumuman-smpmb/interfaces/data-item.interface";

export function useEditSpmb() {
  const [loading, setLoading] = useState(false);

  const editSpmb = async (
    id: number,
    data: DataItemSpmb,
  ): Promise<DataItemSpmb | null> => {
    setLoading(true);
    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${prodUrl}spmb?idParam=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json: DataItemSpmb = await response.json();
      toast.success("Pengumuman berhasil diperbarui!");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editSpmb, loading };
}
