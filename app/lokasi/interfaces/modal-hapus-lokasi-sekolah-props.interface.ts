import { DataItem } from "@/app/lokasi/interfaces/data-item.interface";

export interface ModalHapusLokasiSekolahProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
