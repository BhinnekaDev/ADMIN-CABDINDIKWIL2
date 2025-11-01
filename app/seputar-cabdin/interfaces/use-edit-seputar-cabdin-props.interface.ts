import { DataItem } from "@/app/seputar-cabdin/interfaces/data-item.interface";

export interface UseEditSeputarCabdinProps {
  loading: boolean;
  editSeputarCabdin: (id: number, data: DataItem) => Promise<DataItem | null>;
}
