import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";

export interface ModalHapusJenisSekolahProps {
  item: DataItem;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
