import { DataItem } from "@/app/prakata/interfaces/data-item.interface";

export interface UseEditPrakataProps {
  loading: boolean;
  editPrakata: (id: number, data: DataItem) => Promise<DataItem | null>;
}
