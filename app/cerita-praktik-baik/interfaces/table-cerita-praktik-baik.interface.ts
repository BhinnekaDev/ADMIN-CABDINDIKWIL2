import { DataItem } from "@/app/cerita-praktik-baik/interfaces/data-item.interface";

export interface TableCeritaPraktikBaikProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
