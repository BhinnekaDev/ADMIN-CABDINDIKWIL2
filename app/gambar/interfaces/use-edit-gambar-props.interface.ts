import { DataItem } from "@/app/gambar/interfaces/data-item.interface";

export interface UseEditGambarProps {
  loading: boolean;
  editGambar: (id: number, data: DataItem) => Promise<DataItem | null>;
}
