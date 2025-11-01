import { DataItem } from "@/app/berita/interfaces/data-item.interface";

export interface ModalHapusBeritaProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
