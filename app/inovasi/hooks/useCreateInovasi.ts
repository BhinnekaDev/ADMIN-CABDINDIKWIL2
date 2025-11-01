import {
  DataItem,
  DataItemNonId,
} from "@/app/inovasi/interfaces/data-item.interface";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreateInovasiProps } from "@/app/inovasi/interfaces/create-inovasi-props.interface";

export function useCreateInovasi(): CreateInovasiProps {
  const [loading, setLoading] = useState(false);

  const createInovasi = async (
    data: DataItemNonId
  ): Promise<DataItem | null> => {
    setLoading(true);

    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${prodUrl}inovasi`, {
        method: "POST",
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

      toast.success("Inovasi berhasil dibuat!");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createInovasi, loading };
}
