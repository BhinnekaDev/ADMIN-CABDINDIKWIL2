import { useState } from "react";
import toast from "react-hot-toast";
import { DataItem } from "@/app/seputar-cabdin/interfaces/data-item.interface";
import { UseEditSeputarCabdinProps } from "@/app/seputar-cabdin/interfaces/use-edit-seputar-cabdin-props.interface";

export function useEditSeputarCabdin(): UseEditSeputarCabdinProps {
  const [loading, setLoading] = useState(false);

  const editSeputarCabdin = async (
    id: number,
    data: DataItem
  ): Promise<DataItem | null> => {
    setLoading(true);
    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${prodUrl}seputar-cabdin?idParam=${id}`, {
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

      const json: DataItem = await response.json();
      toast.success("Seputar cabdin berhasil diperbarui!");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editSeputarCabdin, loading };
}
