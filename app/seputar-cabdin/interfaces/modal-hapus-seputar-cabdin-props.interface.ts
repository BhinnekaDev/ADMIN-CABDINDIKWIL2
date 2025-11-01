import { DataItem } from "@/app/seputar-cabdin/interfaces/data-item.interface";

export interface ModalHapusSeputarCabdinProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
