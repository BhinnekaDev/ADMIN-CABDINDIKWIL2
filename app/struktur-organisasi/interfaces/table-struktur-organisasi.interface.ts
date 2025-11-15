import { DataItem } from "@/app/struktur-organisasi/interfaces/data-item.interface";

export interface TableStrukturOrganisasiProps {
  data: DataItem[];
  loading: boolean;
  openEditModal: (item: DataItem) => void;
  openDeleteModal: (item: DataItem) => void;
}
