import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { JenisSekolah } from "@/app/jenis-pendidikan/interfaces/jenis-sekolah.interface";

export function useJenisSekolah() {
  const [data, setData] = useState<JenisSekolah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

        const response = await fetch(`${prodUrl}satpen/jenis`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const json: JenisSekolah[] = await response.json();
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
