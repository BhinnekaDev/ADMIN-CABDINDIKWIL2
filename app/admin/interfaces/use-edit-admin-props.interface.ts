import { DataItem } from "@/app/admin/interfaces/data-item.interface";

export interface UseEditAdminProps {
  loading: boolean;
  editAdmin: (id: number, data: DataItem) => Promise<DataItem | null>;
}
