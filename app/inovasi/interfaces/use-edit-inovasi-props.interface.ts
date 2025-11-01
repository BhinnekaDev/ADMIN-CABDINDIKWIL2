import { DataItem } from "@/app/inovasi/interfaces/data-item.interface";

export interface UseEditInovasiProps {
  loading: boolean;
  editInovasi: (id: number, data: DataItem) => Promise<DataItem | null>;
}
