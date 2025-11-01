import {
  DataItem,
  DataItemNonId,
} from "@/app/cerita-praktik-baik/interfaces/data-item.interface";

export interface CreateCeritaPraktikBaikProps {
  loading: boolean;
  createCeritaPraktikBaik: (data: DataItemNonId) => Promise<DataItem | null>;
}
