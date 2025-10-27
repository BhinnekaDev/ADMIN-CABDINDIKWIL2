import { DataItemSatuanPendidikan } from "@/app/satuan-pendidikan/interfaces/data-item.interface";

export interface ModalHapusSatuanPendidikanProps {
  item: DataItemSatuanPendidikan;
  loading: boolean;
  closeModal: () => void;
  onDelete: (id: number) => Promise<void>;
}
