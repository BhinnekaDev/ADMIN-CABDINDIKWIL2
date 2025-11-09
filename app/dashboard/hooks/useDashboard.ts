import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export interface DashboardItem {
  name?: string;
  bulan?: string;
  jumlah: number;
  [key: string]: string | number | undefined;
}

export function useAdmin() {
  const [data, setData] = useState<DashboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Access token not found");

        const response = await fetch(`${prodUrl}dashboard/admin-count`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const json: DashboardItem[] = await response.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
}

export function useBerita(params?: {
  tahun?: number;
  tahunMulai?: number;
  tahunAkhir?: number;
  bulanMulai?: number;
  bulanAkhir?: number;
  tanggalMulai?: string;
  tanggalAkhir?: string;
}) {
  const [data, setData] = useState<DashboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Access token not found");

        const query = new URLSearchParams(
          params as Record<string, string>
        ).toString();

        const response = await fetch(
          `${prodUrl}dashboard/berita-count?${query}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const json: DashboardItem[] = await response.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return { data, loading };
}

export function useSekolah() {
  const [data, setData] = useState<DashboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!prodUrl) throw new Error("NEXT_PUBLIC_API_URL not set");

        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Access token not found");

        const response = await fetch(`${prodUrl}dashboard/sekolah-count`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const json: DashboardItem[] = await response.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
}
