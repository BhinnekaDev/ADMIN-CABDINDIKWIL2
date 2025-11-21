import { DataItem } from "@/app/gambar/interfaces/data-item.interface";

export interface TableGambarProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
