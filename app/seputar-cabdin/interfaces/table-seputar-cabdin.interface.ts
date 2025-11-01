import { DataItem } from "@/app/seputar-cabdin/interfaces/data-item.interface";

export interface TableSeputarCabdinProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
