import {
  DataItem,
  DataItemNonId,
} from "@/app/layanan/interfaces/data-item.interface";

export interface CreateLayananProps {
  loading: boolean;
  createLayanan: (data: DataItemNonId) => Promise<DataItem | null>;
}
