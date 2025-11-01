import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { DataItem } from "@/app/cerita-praktik-baik/interfaces/data-item.interface";

export function useCeritaPraktikBaik() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

        const response = await fetch(`${prodUrl}cerita-praktik-baik`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const json: DataItem[] = await response.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
}
