import {
  DataItem,
  DataItemNonId,
} from "@/app/prakata/interfaces/data-item.interface";

export interface CreatePrakataProps {
  loading: boolean;
  createPrakata: (data: DataItemNonId) => Promise<DataItem | null>;
}
