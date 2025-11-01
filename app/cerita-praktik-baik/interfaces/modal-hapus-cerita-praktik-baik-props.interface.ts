import { DataItem } from "@/app/cerita-praktik-baik/interfaces/data-item.interface";

export interface ModalHapusCeritaPraktikBaikProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
