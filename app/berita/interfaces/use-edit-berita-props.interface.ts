import { DataItem } from "@/app/berita/interfaces/data-item.interface";

export interface UseEditBeritaProps {
  loading: boolean;
  editBerita: (id: number, data: DataItem) => Promise<DataItem | null>;
}
