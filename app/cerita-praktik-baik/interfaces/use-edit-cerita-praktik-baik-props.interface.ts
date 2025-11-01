import { DataItem } from "@/app/cerita-praktik-baik/interfaces/data-item.interface";

export interface UseEditCeritaPraktikBaikProps {
  loading: boolean;
  editCeritaPraktikBaik: (
    id: number,
    data: DataItem
  ) => Promise<DataItem | null>;
}
