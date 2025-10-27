import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";

export interface TableJenisSekolahProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
