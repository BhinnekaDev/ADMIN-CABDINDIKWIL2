import { DataItem } from "@/app/kontak/interfaces/data-item.interface";

export interface TableKontakProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
}
