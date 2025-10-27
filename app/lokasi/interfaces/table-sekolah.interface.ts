import { DataItem } from "@/app/lokasi/interfaces/data-item.interface";

export interface TableLokasiSekolahProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
