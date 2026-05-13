import { DataItemSpmb } from "@/app/pengumuman-smpmb/interfaces/data-item.interface";

export interface TableSpmbProps {
  data: DataItemSpmb[];
  loading: boolean;
  openEditModal: (item: DataItemSpmb) => void;
  openDeleteModal: (item: DataItemSpmb) => void;
}
