import { DataItem } from "@/app/prakata/interfaces/data-item.interface";

export interface ModalHapusPrakataProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
