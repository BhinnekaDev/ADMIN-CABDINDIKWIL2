import {
  DataItem,
  DataItemNonId,
} from "@/app/struktur-organisasi/interfaces/data-item.interface";

export interface CreateStrukturOrganisasiProps {
  loading: boolean;
  createStrukturOrganisasi: (data: DataItemNonId) => Promise<DataItem | null>;
}
