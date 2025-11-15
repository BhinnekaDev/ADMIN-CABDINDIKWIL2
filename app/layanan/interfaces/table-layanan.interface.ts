import { DataItem } from "@/app/layanan/interfaces/data-item.interface";

export interface TableLayananProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
