import {
  DataItem,
  DataItemNonId,
} from "@/app/gambar/interfaces/data-item.interface";

export interface CreateGambarProps {
  loading: boolean;
  createGambar: (data: DataItemNonId) => Promise<DataItem | null>;
}
