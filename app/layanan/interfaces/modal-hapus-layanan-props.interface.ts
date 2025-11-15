import { DataItem } from "@/app/layanan/interfaces/data-item.interface";

export interface ModalHapusLayananProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
