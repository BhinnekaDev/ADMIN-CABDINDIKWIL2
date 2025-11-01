import { DataItem } from "@/app/berita/interfaces/data-item.interface";

export interface TableBeritaProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
