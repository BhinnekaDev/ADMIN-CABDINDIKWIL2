import { DataItem } from "@/app/struktur-organisasi/interfaces/data-item.interface";

export interface ModalHapusStrukturOrganisasiProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
