import {
  DataItem,
  DataItemNonId,
} from "@/app/inovasi/interfaces/data-item.interface";

export interface CreateInovasiProps {
  loading: boolean;
  createInovasi: (data: DataItemNonId) => Promise<DataItem | null>;
}
