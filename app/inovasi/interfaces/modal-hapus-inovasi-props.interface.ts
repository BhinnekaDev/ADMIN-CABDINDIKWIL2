import { DataItem } from "@/app/inovasi/interfaces/data-item.interface";

export interface ModalHapusInovasiProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
