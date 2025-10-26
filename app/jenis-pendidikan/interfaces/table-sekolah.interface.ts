import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";

export interface TableJenisSekolahProps {
  data: DataItem[];
  loading: boolean;
  handleDelete: (id: number) => void;
  openEditModal: (item: DataItem) => void;
}
