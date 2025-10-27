import { DataItemSatuanPendidikan } from "@/app/satuan-pendidikan/interfaces/data-item.interface";

export interface TableSatuanPendidikanProps {
  data: DataItemSatuanPendidikan[];
  loading: boolean;
  openEditModal: (item: DataItemSatuanPendidikan) => void;
  openDeleteModal: (item: DataItemSatuanPendidikan) => void;
}
