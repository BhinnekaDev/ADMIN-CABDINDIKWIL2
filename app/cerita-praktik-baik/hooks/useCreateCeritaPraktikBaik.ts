import {
  DataItem,
  DataItemNonId,
} from "@/app/cerita-praktik-baik/interfaces/data-item.interface";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreateCeritaPraktikBaikProps } from "@/app/cerita-praktik-baik/interfaces/create-cerita-praktik-baik-props.interface";

export function useCreateCeritaPraktikBaik(): CreateCeritaPraktikBaikProps {
  const [loading, setLoading] = useState(false);

  const createCeritaPraktikBaik = async (
    data: DataItemNonId
  ): Promise<DataItem | null> => {
    setLoading(true);

    try {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${prodUrl}cerita-praktik-baik`, {
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

      toast.success("Cerita praktik baik berhasil dibuat!");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createCeritaPraktikBaik, loading };
}
