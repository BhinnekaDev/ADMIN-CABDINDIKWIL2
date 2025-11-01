import {
  DataItem,
  DataItemNonId,
} from "@/app/berita/interfaces/data-item.interface";

export interface CreateBeritaProps {
  loading: boolean;
  createBerita: (data: DataItemNonId) => Promise<DataItem | null>;
}
