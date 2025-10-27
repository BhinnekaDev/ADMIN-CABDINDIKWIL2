import { DataItemSatuanPendidikan } from "@/app/satuan-pendidikan/interfaces/data-item.interface";
import { SatuanPendidikanData } from "@/app/satuan-pendidikan/interfaces/satuan-pendidikan-data.interface";

export interface CreateSatuanPendidikanProps {
  loading: boolean;
  createSatuanPendidikan: (
    data: SatuanPendidikanData
  ) => Promise<DataItemSatuanPendidikan | null>;
}
