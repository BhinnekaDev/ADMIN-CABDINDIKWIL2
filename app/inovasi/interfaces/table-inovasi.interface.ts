import { DataItem } from "@/app/inovasi/interfaces/data-item.interface";

export interface TableInovasiProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
