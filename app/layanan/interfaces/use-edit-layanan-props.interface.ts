import { DataItem } from "@/app/layanan/interfaces/data-item.interface";

export interface UseEditLayananProps {
  loading: boolean;
  editLayanan: (id: number, data: DataItem) => Promise<DataItem | null>;
}
