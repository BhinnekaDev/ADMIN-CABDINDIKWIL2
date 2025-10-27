import { DataItemSatuanPendidikan } from "@/app/satuan-pendidikan/interfaces/data-item.interface";
import { SatuanPendidikanData } from "@/app/satuan-pendidikan/interfaces/satuan-pendidikan-data.interface";

export interface UseEditSatuanPendidikanProps {
  loading: boolean;
  editSatuanPendidikan: (
    id: number,
    data: SatuanPendidikanData
  ) => Promise<DataItemSatuanPendidikan | null>;
}
