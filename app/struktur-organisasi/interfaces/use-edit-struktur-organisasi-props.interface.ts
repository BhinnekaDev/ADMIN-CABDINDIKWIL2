import { DataItem } from "@/app/struktur-organisasi/interfaces/data-item.interface";

export interface UseEditStrukturOrganisasiProps {
  loading: boolean;
  editStrukturOrganisasi: (
    id: number,
    data: DataItem
  ) => Promise<DataItem | null>;
}
