import { DataItem } from "@/app/gambar/interfaces/data-item.interface";

export interface ModalHapusGambarProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
