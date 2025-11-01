import {
  DataItem,
  DataItemNonId,
} from "@/app/seputar-cabdin/interfaces/data-item.interface";

export interface CreateSeputarCabdinProps {
  loading: boolean;
  createSeputarCabdin: (data: DataItemNonId) => Promise<DataItem | null>;
}
