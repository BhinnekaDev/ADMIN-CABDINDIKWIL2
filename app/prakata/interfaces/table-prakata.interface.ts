import { DataItem } from "@/app/prakata/interfaces/data-item.interface";

export interface TablePrakataProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
