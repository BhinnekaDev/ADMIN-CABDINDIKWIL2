import { DataItem } from "@/app/admin/interfaces/data-item.interface";

export interface TableAdminProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
}
